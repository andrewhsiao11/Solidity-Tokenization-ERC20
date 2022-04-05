// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import "./Crowdsale.sol";
import "./KycContract.sol";

// From openzepplin docs v2
// docs.openzeppelin.com/contracts/2.x/crowdsales

// this contract will hold the tokens that are initially created
// sent here from owner in deploy_contracts migration file
contract MyTokenSale is Crowdsale {

    KycContract kyc;

    // rate: for how many wei can you purchase a token (currently: 1 wei = 1 token)
    // wallet for money to be sent to 
    // tokens to be sent to buyer of token
    constructor(
        uint256 rate, // rate is in TKNbits
        address payable wallet,
        IERC20 token,
        KycContract _kyc
    ) public Crowdsale(rate, wallet, token) {
        //get instance of kyc smart contract once deployed
        kyc = _kyc;
    }

    // check if user is allowed to purchase tokens (ovverride from Crowdsale)
    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
        // calling base function
        super._preValidatePurchase(beneficiary, weiAmount);
        // adding kyc check to it
        require(kyc.kycCompleted(beneficiary), "KYC not completed yet, aborting");
    }
}
