const PengToken = artifacts.require("PengToken");

module.exports = function (_deployer) {
  _deployer.deploy(PengToken);
};

