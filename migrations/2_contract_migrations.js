var TimeTokens = artifacts.require("./TimeTokens.sol");

module.exports = function(deployer) {
  deployer.deploy(TimeTokens);
};
