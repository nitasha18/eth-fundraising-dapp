const FundraisingDapp = artifacts.require("FundraisingDapp");

module.exports = function(deployer) {
  deployer.deploy(FundraisingDapp);
};
