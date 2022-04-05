// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import "./Crowdsale.sol";

// From openzepplin docs v2
// docs.openzeppelin.com/contracts/2.x/crowdsales

contract MyTokenSale is Crowdsale {
    // KycContract kyc;
    constructor(
        uint256 rate, // rate is in TKNbits
        address payable wallet,
        IERC20 token
    ) public Crowdsale(rate, wallet, token) {}

    // rate: for how many wei can you purchase a token (currently: 1 wei = 1 token)
    // wallet for money to be sent to 
    // tokens to be sent to buyer of token

    // this contract will hold the tokens that are initially created
    // sent here from owner in deploy_contracts migration file
}
