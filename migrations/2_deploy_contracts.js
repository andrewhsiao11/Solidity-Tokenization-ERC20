var MyToken = artifacts.require("../contracts/MyToken.sol");
var MyTokenSales = artifacts.require("../contracts/MyTokenSale.sol");
var KycContract = artifacts.require("../contracts/KycContract.sol");
require('dotenv').config({path: "../.env"});

module.exports = async function (deployer) {
  let addr = await web3.eth.getAccounts();
  // deploys token and writes an address to the smart contract
  await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
  // deploy Know-Your-Customer contract
  await deployer.deploy(KycContract);
  // takes 4 args (rate, address that gets money, token smart contract address, kyc contract address)
  await deployer.deploy(MyTokenSales, 1, addr[0], MyToken.address, KycContract.address);
  // send tokens from addr[0] to tokensale contract
  let tokenInstance = await MyToken.deployed();
  await tokenInstance.transfer(MyTokenSales.address, process.env.INITIAL_TOKENS);
};

