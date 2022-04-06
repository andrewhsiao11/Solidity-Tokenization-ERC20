# Solidity-Tokenization-ERC20

A functional ERC20 Token (TRAVISCOIN) deployed with Infura to Goerli and Ropsten Test Networks. 
- The owner (first account in Metamask) has rights to add others to a whitelist. 
- This gives them access to buying TRAVISCOIN tokens (1 wei = 1 TRAVISCOIN token).
- This is managed by a smart contract that receives payments and distributes proper amounts of TRAVISCOIN.
- Whitelisted accounts can purchase more tokens through the UI.


## Features

* Smart contracts written in Solidity
* Unit Tests using Mocha, Chai, Chai-Expect, and Chai-as-Promised
* Contracts Deployed to Goerli and Ropsten Test Networks via Infura
* OpenZeppelin [ERC20 contract](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20) and [Ownership](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol)
* Multiple networks defined in truffle config as well as Mnemonic usage
* Interaction with Metamask and Truffle development console
* Send and receive Ether and TRAVISCOIN tokens
* React for frontend UI

## Real World Use-Cases

* Tokenize real world assets (precious metals, diamonds, anything with real world physical value)
* Gift-Cards/Vouchers in Organizations
* Bonus/Miles cards
* Automated Entrance Systems (theme park coins or arcades)

## Getting Started <a name = "getting_started"></a>

### Install dependencies

```bash
npm install
```

### Run app 

In project folder
Depending on network (see truffle-config.js)
```bash
(if running Node >= 17) --> export NODE_OPTIONS=--openssl-legacy-provider
truffle migrate --network <network name>  
```

* **Connect Metamask wallet to desired network**

In client folder
```bash
npm start 
```

For Unit Testing
```bash
truffle test
```
