import { useEffect, useState, useDebugValue } from "react";
import * as IPFS from "ipfs-core";


// window.ipfsLoaded hack to keep a global ipfs instance
const useIpfsSetup = (config:any) => {
  const [ipfs, setIpfs] = useState<any>(null);

  useEffect(() => {
    const ipfsInit = async () => {
      if (!ipfs) {
        const ipfsObj = await IPFS.create(config);
        setIpfs(ipfsObj);
      //const peerId = (await ipfs.id()).id;
      //console.log(peerId)
      }
    };
    ipfsInit();
  }, [ipfs, config]);

  useDebugValue(ipfs ?? 'Loading...');

  return [ipfs];
};

export default useIpfsSetup;