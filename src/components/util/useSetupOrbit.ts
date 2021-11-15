import { useEffect, useState } from "react";
import OrbitDB from "orbit-db";

const useSetupOrbit = (ipfs: any) => {
  const [orbit, setOrbit] = useState<any>(null);

  useEffect(() => {
    const createInstance = async () => {
      const instance = await OrbitDB.createInstance(ipfs);
      setOrbit(instance);
    };
    if (ipfs) createInstance();
    return () => {
      if (orbit && orbit.stop) {
        orbit.stop();
      }
    };
    // eslint-disable-next-line
  }, [ipfs]);
  return [orbit];
};

export default useSetupOrbit;