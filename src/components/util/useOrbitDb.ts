import { useEffect, useState} from "react";
import { useIpfs } from "../../providers/IpfsProvider";
import { useOrbit } from "../../providers/OrbitProvider";



export const addWorld = async (database: any, worldname: string, orbitCID: string, recordsInDB: any) => {
  const existing = database.get(worldname);;
  if(!existing){
    const cid = await database.put({course: worldname, CID: orbitCID});
    return cid;
  } else {
    return await updateWorld(database, worldname, orbitCID, recordsInDB, existing);
  }
};

const updateWorld = async (database: any, worldname: string, orbitCID: string, recordsInDB: any, existing: any) => {
  existing.course = worldname;
  existing.CID = orbitCID;
  return await database.put(existing);
};

export const deleteWorld = async (database: any, worldname: string, recordsInDB: any) => {
  if(database.get(worldname).length>0) {return await database.del(worldname);}
};

export const addCourse = async (orbit: any, coursename: string) => {
  //Check if it already exists
  //updateCourse()
  //else create and then update

  //Define options
  const defaultOptions = {
    accessController: {write: ["*"]},
  };
  const courseOptions = {
    ...defaultOptions,
    indexBy: 'course'
  };
  //create docstore
  const courseContent = await orbit.docstore(coursename, courseOptions);
  //fill docstore

  return courseContent.id;
};

const updateCourse = async (coursedb: any, coursename: string, coursevar: any) => {
  
  coursedb.put({course:coursename, var:coursevar});
};

const useOrbitDb = (options = {}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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
  
      worlds.events.on("replicate", (address:any) => {
        console.log("replicate");
      });
  
      worlds.events.on("replicated", (address:any) => {
        refreshDb();
      });
  
      worlds.events.on("write", (address:any) => {
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