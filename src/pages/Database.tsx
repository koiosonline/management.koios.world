//imports
import { useContext, useEffect, useState } from 'react';
import { useIpfs } from '../providers/IpfsProvider';
import useOrbitDb, {
  addWorld,
  deleteWorld,
} from '../components/util/useOrbitDb';

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

  const updater = () => {
    addWorld(database, worldname, worldCID, recordsInDB);
  };

  const deleter = () => {
    deleteWorld(database, worldname, recordsInDB);
  };

  const showRecordsHandler = () => {
    console.log(recordsInDB);
  };

  const showData = () => {
    if (!recordsInDB) {
      return null;
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return recordsInDB.keys().map((data) => <h3>data</h3>);
    }
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
    </div>
  );
};
