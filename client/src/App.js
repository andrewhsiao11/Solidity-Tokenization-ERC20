import React, { Component } from "react";
import MyToken from "./contracts/MyToken.json";
import MyTokenSale from "./contracts/MyTokenSale.json";
import KycContract from "./contracts/KycContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { loaded: false };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
       this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
       this.accounts = await this.web3.eth.getAccounts();

      // Get the contracts' instances.
      //  this.networkId = await this.web3.eth.net.getId(); --> doesn't work with metamask anymore
      this.networkId = await this.web3.eth.getChainId();  

       
       this.myToken = new this.web3.eth.Contract(
         MyToken.abi,
         MyToken.networks[this.networkId] && MyToken.networks[this.networkId].address
       );
       
       this.myTokenSale = new this.web3.eth.Contract(
         MyTokenSale.abi,
         MyTokenSale.networks[this.networkId] &&
           MyTokenSale.networks[this.networkId].address
       );

       this.kycContract = new this.web3.eth.Contract(
         KycContract.abi,
         KycContract.networks[this.networkId] &&
           KycContract.networks[this.networkId].address
       );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ loaded: true });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;
