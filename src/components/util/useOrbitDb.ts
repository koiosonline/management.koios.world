import { useEffect, useState} from "react";
import { useIpfs } from "../../providers/IpfsProvider";
import { useOrbit } from "../../providers/OrbitProvider";

const useOrbitDb = (options = {}) => {
  
  const { orbit, orbitLoaded } = useOrbit();
  const [records, setRecords] = useState(null);
  const [db, setDb] = useState(null);
  useEffect(() => {
    if (db) return;
    const createDb = async () => {
      const defaultOptions = {
        accessController: {write: ["*"]},
      };
      const worldOptions = {
        ...defaultOptions,
        indexBy: 'course'
      };
      
      const worlds = await orbit.docstore('worlds', worldOptions);
      await worlds.load();
      setDb(worlds);

      const refreshDb = async () => {
        await worlds.load();
        setRecords(worlds.get(""));
        
      };
  
      worlds.events.on("replicate", (address) => {
        console.log("replicate");
      });
  
      worlds.events.on("replicated", (address) => {
        refreshDb();
      });
  
      worlds.events.on("write", (address) => {
        refreshDb();
      });
      refreshDb();
    };


    if (orbitLoaded.current){createDb();}
    // eslint-disable-next-line
  }, [orbitLoaded.current]);

  const state = { orbit, database: db, recordsInDB: records};
  return state;
};

export default useOrbitDb;