// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

// Know-Your-Customer Whitelisting Smart Contract...
// will just whitelist addresses by the admin of the system.
// based on some criteria, someone get's the permission to do something.

import "@openzeppelin/contracts/access/Ownable.sol";

contract KycContract is Ownable {
    mapping(address => bool) allowed;

    // Owner whitelist someone
    function setKycCompleted(address _addr) public onlyOwner {
        allowed[_addr] = true;
    }

    // Owner remove whitelist status of someone
    function setKycRevoked(address _addr) public onlyOwner {
        allowed[_addr] = false;
    }

    // Anyone - check if someone if whitelisted or not
    function kycCompleted(address _addr) public view returns(bool) {
        return allowed[_addr];
    }
}