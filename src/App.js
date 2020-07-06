import "regenerator-runtime/runtime";
import React, { Component } from "react";
import "./App.css";
import IPFS from "./components/ipfs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      speech: null,
      balance: 0,
    };
    this.signedInFlow = this.signedInFlow.bind(this);
    this.requestSignIn = this.requestSignIn.bind(this);
    this.requestSignOut = this.requestSignOut.bind(this);
    this.signedOutFlow = this.signedOutFlow.bind(this);
    this.findBalance = this.findBalance.bind(this);
  }

  componentDidMount() {
    let loggedIn = this.props.wallet.isSignedIn();
    if (loggedIn) {
      this.signedInFlow();
    } else {
      this.signedOutFlow();
    }
  }

  async signedInFlow() {
    console.log("come in sign in flow");
    this.setState({
      login: true,
    });
    const accountId = await this.props.wallet.getAccountId();
    if (window.location.search.includes("account_id")) {
      window.location.replace(
        window.location.origin + window.location.pathname
      );
    }

    await this.welcome();
  }

  async welcome() {
    const response = await this.props.contract.welcome({
      account_id: accountId,
    });
    this.setState({ speech: response.text });
  }

  async requestSignIn() {
    const appTitle = "NEAR React template";
    await this.props.wallet.requestSignIn(
      window.nearConfig.contractName,
      appTitle
    );
  }

  requestSignOut() {
    this.props.wallet.signOut();
    setTimeout(this.signedOutFlow, 500);
    console.log("after sign out", this.props.wallet.isSignedIn());
  }

  signedOutFlow() {
    if (window.location.search.includes("account_id")) {
      window.location.replace(
        window.location.origin + window.location.pathname
      );
    }
    this.setState({
      login: false,
      speech: null,
    });
  }

  // To find the balance of the logged in user of separate token, still in testing
  async findBalance() {
    var accountBalance = await this.props.contract.balanceOf({
      tokenOwner: walletAccount.getAccountId(),
    });
    this.setState({ balance: accountBalance });
  }

  // For testing purposes if the user does not have sufficient tokens to access editor features
  balanceDown = () => {
    this.setState({
      balance: 0,
    });
  };

  render() {
    let style = {
      fontSize: "1.5rem",
      color: "#0072CE",
      textShadow: "1px 1px #D1CCBD",
    };
    return (
      <div className="Page-Layout">
        <div className="First-Column">
          <div className="School-List-Column">
            <IPFS />
          </div>
        </div>
        <div className="App-header">
          <div>
            <h1>SchoolChain News</h1>
            <p>A decentralized website for your school news.</p>
            <p>
              {" "}
              Where you can make posts about your college or university without
              worry of it being taken down while being anonymous.
            </p>

            <button onClick={this.findBalance}>Show Balance</button>
            <button onClick={this.balanceDown}>
              Set Balance to 0 for testing
            </button>
          </div>
          <div>
            {this.state.login && this.state.balance >= 1 ? (
              <div>
                <p style={style}>{this.state.speech}</p>

                <button onClick={this.requestSignOut}>Log out</button>
                <button onClick={this.postForm}>Post a Form</button>
                <p>The balance is {this.state.balance}</p>
              </div>
            ) : (
              <button onClick={this.requestSignIn}>
                Not an Editor? Log in with NEAR
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
