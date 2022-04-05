// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("TravisCoin", "TRC")  public {
        _mint(msg.sender, initialSupply);
        _setupDecimals(0);
    }

    // person who creates token gets a set amount of token - set in deploy_contracts migration
    // no decimals (default is 18)
}