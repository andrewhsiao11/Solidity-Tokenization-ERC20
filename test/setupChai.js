"use strict";
var chai = require("chai");
//using chai.expect rather than old way
const expect = chai.expect;

//bring in Big Number Chai (see openzeppelin-test-helpers)
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

//bring in chai as promised (see domenic/chai-as-promised)
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

// export it
module.exports = chai;
