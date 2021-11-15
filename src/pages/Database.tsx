//imports
import { useContext, useEffect, useState } from 'react';
import { useIpfs } from '../providers/IpfsProvider';
import useOrbitDb from '../components/util/useOrbitDb';

export const Database = () => {
  const { ipfs, ipfsLoaded } = useIpfs();
  const { orbit, database, recordsInDB } = useOrbitDb();
  const [inputfield, setInputfield] = useState('');

  useEffect(() => {
    if (ipfsLoaded.current) {
      ipfs.swarm
        .connect(
          '/dns4/mgatsonides.nl/tcp/4002/wss/p2p/12D3KooWRhMBxbNnDUD97Y2nV3VgGBXGGTtKiGwXjLbqjCyyktNC'
        )
        .then(
          function (value) {
            console.log('swarm connected message: ' + value);
          },
          function (error) {
            console.error('Swarm not connected because of: ' + error);
          }
        );
    }
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

  const testHandler = () => {
    database.put({ course: 'Hi', hoi: 'hallo' });
  };

  const showRecordsHandler = () => {
    console.log(recordsInDB);
  };

  const showData = () => {
    if (!recordsInDB) {
      return null;
    } else {
      return recordsInDB.keys().map((data) => <h3>data</h3>);
    }
  };

  return (
    <div className="database container">
      <h1 className="database__header">Database</h1>
      <button onClick={testHandler}>Test</button>
      <button onClick={showRecordsHandler}>Show Records</button>
      <form>
        <label>Input field</label>
        <input
          type="text"
          required
          value={inputfield}
          onChange={(e) => setInputfield(e.target.value)}
        />
      </form>
    </div>
  );
};
