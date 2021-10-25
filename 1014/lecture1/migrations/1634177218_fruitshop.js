var Fruitshop = artifacts.require("./Fruitshop.sol");

module.exports = function(_deployer) {
  _deployer.deploy(Fruitshop);
};
