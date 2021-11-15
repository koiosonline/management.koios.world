//const ipfsHttpClient = require('ipfs-http-client')
//const ipfs = ipfsHttpClient('https://ipfs.infura.io:5001');

const ipfsprefix1 = "https://ipfs.io/ipfs/";
const ipfsprefix2 = "ipfs://ipfs/";
const ipfsprefix3 = "ipfs://";

const stripipfsprefix = (cid:any) => {
  if (cid.includes(ipfsprefix1)) {
    cid = cid.replace(ipfsprefix1, "");// just keep the cid
  }
  if (cid.includes(ipfsprefix2)) {
    cid = cid.replace(ipfsprefix2, "");// just keep the cid
  }
  if (cid.includes(ipfsprefix3)) {
    cid = cid.replace(ipfsprefix3, "");// just keep the cid
  }
  return cid;
};

export const FetchImage = async (ipfs: any, hash: string) => {
  hash = stripipfsprefix(hash);
  const ui8arr: any = [];
  for await (const result of ipfs.cat(hash)) {
    ui8arr.push(result);
  }
  const blob = new Blob(ui8arr, { type: "image/jpeg" });
  const url = URL.createObjectURL(blob);
  return url;
};

export const FetchJson = async (ipfs: any, hash: string) => {
  hash = stripipfsprefix(hash);
  let str="";
  for await (const result of ipfs.cat(hash)) {
    str += String.fromCharCode.apply(null, result);
  }

  if (str === "") {
    return undefined;
  } 

  const json = JSON.parse(str);
  return json;
};