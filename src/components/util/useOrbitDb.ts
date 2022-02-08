import { useEffect, useState} from "react";
import { useIpfs } from "../../providers/IpfsProvider";
import { useOrbit } from "../../providers/OrbitProvider";


/**
 * Adds or updates a world entry in the top level world-db indexed by its worldname
 * 
 * Uses the following structure:
 * 
 * {
 *    course: "worldname",
 *    CID: "orbitCID"
 * }
 * 
 * @param database The orbit docstore database object that is provided by useorbitdb hook
 * @param worldname The worldname of the soon to be added world
 * @param orbitCID The CID (location) of the soon to be added world
 * @returns A multihash of the added entry as a string
 */
export const addWorld = async (database: any, worldname: string, orbitCID: string) => {
  const existing = database.get(worldname);
  if(isEmpty(existing)){
    const multihash = await database.put({course: worldname, CID: orbitCID});
    return multihash;
  } else {
    return await updateWorld(database, worldname, orbitCID, existing);
  }
};

/**
 * This function updates the orbitCID of the specified world entry (provided by worldname)
 * 
 * @param database The orbit docstore database object that is provided by useorbitdb hook
 * @param worldname The worldname of the soon to be changed world
 * @param orbitCID  The new CID (location) of the provided world
 * @param existing The existing entry which will be modified/manipulated
 * @returns A multihash of the added entry as a string
 */
const updateWorld = async (database: any, worldname: string, orbitCID: string, existing: any) => {
  existing[0].course = worldname;
  existing[0].CID = orbitCID;
  return await database.put(existing[0]);
};

/**
 * This function deletes a world entry in the top level world-db
 * 
 * @param database The orbit docstore database object that is provided by useorbitdb hook
 * @param worldname The worldname of the soon to be deleted world entry
 * @returns the multihash of the entry as a String
 */
export const deleteWorld = async (database: any, worldname: string) => {
  if(database.get(worldname).length>0) {return await database.del(worldname);}
};

/**
 * Helper function to test if an object is empty
 * @param obj The object that needs to be checked if it is empty
 * @returns true/1 when an object is empty.
 */
function isEmpty(obj: any) {
  return Object.keys(obj).length === 0;
}


export const addCourse = async (orbit: any, worlddb: any, coursename: string, url: string, description: string, quiz: string, quickLinks: any, content: any, earn: any, connect: any, team: any) => {
  const defaultOptions = {
    accessController: {write: ["*"]},
  };
  const courseOptions = {
    ...defaultOptions,
    indexBy: 'course'
  };
  
  const existing = worlddb.get(coursename);
  let courseContent;
  if(isEmpty(existing)) {
    courseContent = await orbit.docstore(coursename, courseOptions);
    console.log("Created datastore, accessible at CID: " + courseContent.id);
  }
  else {
    console.log("Exists, The CID: " + existing[0].CID);
    courseContent = await orbit.open(existing[0].CID, courseOptions);
    await courseContent.load();
  }
  updateCourse(courseContent, coursename, url, description, quiz, quickLinks, content, earn, connect, team);
};

const updateCourse = async (coursedb: any, coursename: string, url: string, description: string, quiz: string, quickLinks: any, content: any, earn: any, connect: any, team: any) => {
  console.log(coursedb);
  coursedb.put({course:coursename, url:url, description:description, quiz:quiz, quickLinks:quickLinks, content:content, earn:earn, connect:connect, team:team});
};

export const getCourse = async (orbit:any, CID:string) => {
  const defaultOptions = {
    accessController: {write: ["*"]},
  };
  const courseOptions = {
    ...defaultOptions,
    indexBy: 'course'
  };
  const courseContent = await orbit.open(CID, courseOptions);
  await courseContent.load();
  console.log(courseContent.get("")[0]);
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