var MyToken = artifacts.require("../contracts/MyToken.sol");
var MyTokenSales = artifacts.require("../contracts/MyTokenSale.sol");

module.exports = async function (deployer) {
  let addr = await web3.eth.getAccounts();
  // deploys token and writes an address to the smart contract
  await deployer.deploy(MyToken, 1000000000);
  // takes 3 args (rate, address that gets money, token smart contract address)
  await deployer.deploy(MyTokenSales, 1, addr[0], MyToken.address);
  // send tokens from addr[0] to tokensale contract
  let tokenInstance = await MyToken.deployed();
  await tokenInstance.transfer(MyTokenSales.address, 1000000000)
};

