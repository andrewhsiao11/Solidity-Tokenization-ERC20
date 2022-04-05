const Token = artifacts.require("MyToken");
require("dotenv").config({ path: "../.env" });


var chai = require("chai");

//bring in Big Number Chai (see openzeppelin-test-helpers)
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

//bring in chai as promised (see domenic/chai-as-promised)
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

//using chai.expect rather than old way
const expect = chai.expect;

contract("Token Test", async (accounts) => {
  const [initialHolder, recipient, anotherAccount] = accounts;

  // want to test Token contract on its own (not in conjunction with tokenSale)
  // this hook is called before each of these tests is run 
  // now deploys new instance of smart contract (not using instance created from migrations file)
  beforeEach(async () => {
    this.myToken = await Token.new(process.env.INITIAL_TOKENS);
  })

    // TEST 1
  it("All tokens should be in my account", async () => {
    let instance = this.myToken
    let totalSupply = await instance.totalSupply();
    // old way:
    //let balance = await instance.balanceOf.call(initialHolder);
    //assert.equal(balance.valueOf(), 0, "Account 1 has a balance");
    //condensed, easier readable style:
    await expect(
      instance.balanceOf(initialHolder)
    ).to.eventually.be.a.bignumber.equal(totalSupply);
  });

  //TEST 2
  it("I can send tokens from Account 1 to Account 2", async () => {
      const sendTokens = 1;
      let instance = this.myToken;
      let totalSupply = await instance.totalSupply();
      // check initial holder has total supply
      await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
      // check if transfer promise is fufilled
      await expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
      // check initial holders balance was decreased by amount
      await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
      // check if recipient balance equals amount recieved
      await expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
  });

  it("It's not possible to send more tokens than Account 1 has", async () => {
      let instance = this.myToken;
      let balanceOfAccount = await instance.balanceOf(initialHolder);
      // confirm error if try to tranfer more than account balance
      await expect(instance.transfer(recipient, new BN(balanceOfAccount + 1))).to.eventually.be.rejected;
      // Check if balance is still the same
      await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
  });
});
