const IPFS_CONFIG = {
  relay: {
    enabled: false, // enable relay dialer/listener (STOP)
    hop: {
      enabled: false, // make this node a relay (HOP)
    },
  },
  // preload: {
  //   enabled: false,
  // },
  repo: ".ipfs",
  EXPERIMENTAL: { ipnsPubsub: true },
  config: {
  // Bootstrap: [
  //   "/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt",
    //   "/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb",
    //   "/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa",
    //   "/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt",
    //   "/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN",
    //   "/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ"
    // ],
    Addresses: {
      Swarm: [
        "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
        "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star"]}}
  //     "/dns4/mgatsonides.nl/tcp/4002/wss/p2p/12D3KooWRhMBxbNnDUD97Y2nV3VgGBXGGTtKiGwXjLbqjCyyktNC",
  //     "/dns4/srv1.web3examples.com/tcp/4004/wss/p2p/12D3KooWPRLZ79rpVqfobJBWRrTp1TPiXBgaFHr7Zt56gYgDqGpJ"
  //   ],
  // },
  // },
};
  
export default IPFS_CONFIG;