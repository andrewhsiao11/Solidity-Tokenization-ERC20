import React, { Component } from "react";
import MyToken from "./contracts/MyToken.json";
import MyTokenSale from "./contracts/MyTokenSale.json";
import KycContract from "./contracts/KycContract.json";
import getWeb3 from "./getWeb3";
import bunny from "./assets/BunnyCoin.png";
import backgroundBunny from "./assets/backgroundBunny.jpg";
import bunnyRow from "./assets/bunnyRow.jpg";

import "./App.css";

class App extends Component {
  state = {
    loaded: false,
    kycAddress: "0x123...",
    tokenSaleAddress: "",
    userTokens: 0,
  };

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
      this.listenToTokenTransfer();
      this.setState(
        {
          loaded: true,
          tokenSaleAddress: this.myTokenSale._address,
        },
        this.updateUserTokens
      );
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

  handleBuyToken = async () => {
    await this.myTokenSale.methods
      .buyTokens(this.accounts[0])
      .send({ from: this.accounts[0], value: 1 });
  };

  // update user's token state
  updateUserTokens = async () => {
    let userTokens = await this.myToken.methods
      .balanceOf(this.accounts[0])
      .call();
    this.setState({ userTokens: userTokens });
  };

  // listening to event emmitted from ERC20 contract's transfer function
  // defined in IERC20.sol and address is indexed (to)
  // listen to when "to" field is set to this account, then call updateusertokens
  /// data is what we are listening to when there is transfer transaction
  listenToTokenTransfer = async () => {
    this.myToken.events
      .Transfer({ to: this.accounts[0] })
      .on("data", this.updateUserTokens);
  };

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <nav
          className="navbar navbar-light justify-content-md-center"
          style={{ backgroundColor: "#e3f2fd" }}
        >
          <a className="navbar-brand" href="#">
            <img src={bunny} width="55" height="55" />
          </a>
          <h1>TravisCoin Token Sale</h1>
        </nav>

        <div className="card">
          <div className="card-body">
            <h2>Whitelist an account</h2>

            <div className="container input-group justify-content-md-center ">
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
                  className="btn btn-secondary"
                >
                  Add Address to Whitelist
                </button>
              </label>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h2>
              <img src={bunny} width="30" height="30" />
              Buy TravisCoin Tokens
              <img src={bunny} width="30" height="30" />
            </h2>
            <p>
              Send Ether to this address:{" "}
              <span className="user-select-all fw-bold">
                {this.state.tokenSaleAddress}
              </span>
            </p>
            <img src={bunnyRow} width="225" height="100" />
            <h5>
              You have: {this.state.userTokens} TravisCoin Token
              {this.state.userTokens != 1 && "s"}
            </h5>
            <button
              type="button"
              onClick={this.handleBuyToken}
              className="btn btn-outline-success btn-lg"
            >
              Buy more tokens
            </button>
          </div>
        </div>
        <br />
        <img src={backgroundBunny} width="600" height="400" />
      </div>
    );
  }
}

export default App;
