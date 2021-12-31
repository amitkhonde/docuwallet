var DocuWallet = artifacts.require("./DocuWallet.sol");

module.exports = function(deployer) {
  deployer.deploy(DocuWallet);
};
