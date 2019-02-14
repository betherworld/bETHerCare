module.exports = {
  networks: {
     development: {
       host: "localhost",
       port: 7545,
       network_id: "*"
       // gas: 3500000
     }
   },
   mocha: {
    useColors: true
   }
};
