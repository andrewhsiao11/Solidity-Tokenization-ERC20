import React, { Component } from "react";
import MyToken from "./contracts/MyToken.json";
import MyTokenSale from "./contracts/MyTokenSale.json";
import KycContract from "./contracts/KycContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { loaded: false, kycAddress: "0x123..." };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contracts' instances.
      //  this.networkId = await this.web3.eth.net.getId(); // --> doesn't work with metamask anymore
      this.networkId = await this.web3.eth.getChainId();

      this.myToken = new this.web3.eth.Contract(
        MyToken.abi,
        MyToken.networks[this.networkId] &&
          MyToken.networks[this.networkId].address
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
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleKycSubmit = async () => {
    const { kycAddress } = this.state;
    await this.kycContract.methods
      .setKycCompleted(kycAddress)
      .send({ from: this.accounts[0] });
    alert("Account " + kycAddress + " is now whitelisted");
  };

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>TravisCoin Token Sale</h1>
        {/* <p>Token Sale</p> */}
        <h2>Enable your account</h2>

        <div className="container input-group justify-content-md-center">
          <label className="form-label input-group-text">
            Address to allow:
            <input
              type="text"
              name="kycAddress"
              value={this.state.kycAddress}
              onChange={this.handleInputChange}
              className="form-control"
            />
            <button
              type="button"
              onClick={this.handleKycSubmit}
              className="btn btn-primary"
            >
              Add Address to Whitelist
            </button>
          </label>
        </div>
      </div>
    );
  }
}

export default App;
