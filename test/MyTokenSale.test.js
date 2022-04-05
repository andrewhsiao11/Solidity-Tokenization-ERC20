const Token = artifacts.require("MyToken");
const TokenSale = artifacts.require("MyTokenSale");

const chai = require("./setupChai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("TokenSale", async accounts => {
    const [initialHolder, recipient, anotherAccount] = accounts;
    // TEST 1
    it("There shouldn't be any coins in my account", async () => {
        let instance = await Token.deployed();
        // check id initial holder's balance is zero
        return expect(instance.balanceOf.call(initialHolder)).to.eventually.be.a.bignumber.equal(new BN(0));
    });
    // TEST 2
    it("All coins should be in the TokenSale smart contract", async () => {
        let instance = await Token.deployed();
        // get balance of token sale contract
        let balance = await instance.balanceOf.call(TokenSale.address);
        // get total supply of tokens
        let totalSupply = await instance.totalSupply.call();
        // compare that they are equal (means entire supply of tokens is on token sale contract)
        return expect(balance).to.be.a.bignumber.equal(totalSupply);
    });
    // TEST 3
    it("Should be possible to buy one token by simply sending ether to the smart contract", async () => {
        let tokenInstance = await Token.deployed();
        let tokenSaleInstance = await TokenSale.deployed();
        // getting balance before transaction occurs
        let balanceBeforeAccount = await tokenInstance.balanceOf.call(recipient);
        // buy tokens (send 1 wei to contract) --> check this promise fufills
        await expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
        // comparing what token balance of account should be to what it is (should have one more token)
        return expect(balanceBeforeAccount + 1).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));
    })

})