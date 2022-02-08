//imports
import { useContext, useEffect, useState } from 'react';
import { useIpfs } from '../providers/IpfsProvider';
import useOrbitDb, {
  addWorld,
  deleteWorld,
  addCourse,
  getCourse,
} from '../components/util/useOrbitDb';

/**
 *  A test database page which holds some buttons to interact with the orbitdb functions to get a feeling how it works
 * @returns The Database page where an administrative user can add new courses.
 */
export const Database = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { ipfs, ipfsLoaded } = useIpfs();
  const { orbit, database, recordsInDB } = useOrbitDb();
  const [worldname, setWorldname] = useState('');
  const [urlname, setUrlname] = useState('');
  const [worldCID, setWorldcid] = useState('');
  const [description, setDescription] = useState('');
  const [quiz, setQuiz] = useState('');

  /**
   * Connects to the pinning database server whenever the ipfs object gets loaded
   */
  useEffect(() => {
    // if (ipfsLoaded.current) {
    //   ipfs.swarm
    //     .connect(
    //       '/dns4/mgatsonides.nl/tcp/4002/wss/p2p/12D3KooWRhMBxbNnDUD97Y2nV3VgGBXGGTtKiGwXjLbqjCyyktNC'
    //     )
    //     .then(
    //       function (value: any) {
    //         console.log('swarm connected message: ' + value);
    //       },
    //       function (error: any) {
    //         console.error('Swarm not connected because of: ' + error);
    //       }
    //     );
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ipfsLoaded.current]);

  useEffect(() => {
    if (database) {
      console.log(database);
    }
  }, [database]);

  useEffect(() => {
    if (orbit) {
      console.log(orbit);
    }
  }, [orbit]);

  useEffect(() => {
    if (recordsInDB) console.log(recordsInDB);
  }, [recordsInDB]);

  /**
   * A button handler function that updates/adds a world to the top world-db
   *
   * {
   *    course: "worldname",
   *    CID: "orbitCID"
   *  }
   *
   */
  const updater = () => {
    addWorld(database, worldname, worldCID);
  };

  /**
   * A button handler function that deletes a world to the top world-db based upon its worldname
   *
   */
  const deleter = () => {
    deleteWorld(database, worldname);
  };

  /**
   * A button handler function that adds a course to the world-instance based upon its worldname/coursename
   *
   */
  const addcourse = () => {
    addCourse(
      orbit,
      database,
      worldname,
      'test',
      'test',
      'test',
      'test',
      'test',
      'test',
      'test',
      'test'
    );
  };

  /**
   * A button handler function that gets a course from the world-instance level based upon its worldCID
   *
   */
  const view = () => {
    getCourse(orbit, worldCID);
  };

  /**
   * A button handler function which logs the records of the top level world-db in the console
   *
   */
  const showRecordsHandler = () => {
    console.log(recordsInDB);
  };

  return (
    <div className="database container">
      <h1 className="database__header">Database</h1>
      <button onClick={showRecordsHandler}>Show Records in console</button>
      <br />
      <br />
      <br />
      <form>
        <label>WorldName</label>
        <br />
        <input
          type="text"
          required
          value={worldname}
          onChange={(e) => setWorldname(e.target.value)}
        />
        <br />
        <br />
        <label>WorldCID</label>
        <br />
        <input
          type="text"
          required
          value={worldCID}
          onChange={(e) => setWorldcid(e.target.value)}
        />
      </form>
      <br />
      <button onClick={updater}>Update/Create Record</button>
      <br />
      <br />
      <button onClick={deleter}>Delete</button>
      <br />
      <br />
      <button onClick={addcourse}>Add Course</button>
      <br />
      <br />
      <button onClick={view}>View Course</button>
    </div>
  );
};
