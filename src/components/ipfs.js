import React, { Component } from "react";

class IPFS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cidSchools: [],
      schoolList: ["Rutgers University, New Jersey Institute of Technology"],
      newSchool: "",
      balance: 0,
      addSchool: false,
    };
    this.hashing = this.hashing.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async hashing() {
    const node = await window.Ipfs.create();
    var newData = this.state.schoolList + ", " + this.state.newSchool;
    const data = newData;
    const results = node.add(data);
    for await (const { cid } of results) {
      console.log(cid.toString());
      this.setState({
        cidSchools: cid.toString(),
      });
    }
    const stream = node.cat(this.state.cidSchools);
    var name = "";
    for await (const chunk of stream) {
      // chunks of data are returned as a Buffer, convert it back to a string
      name += chunk.toString();
      this.setState({
        schoolList: name,
      });
    }
    console.log(this.state.schoolList);
  }

  // This is for testing purposes
  balanceUp = () => {
    this.setState({
      balance: 1,
    });
  };

  addSchool = () => {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>Enter the School Name</p>
          <input
            type="text"
            value={this.state.newSchool}
            onChange={this.handleChange}
          ></input>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.hashing();

    this.setState({
      addSchool: false,
    });
  };

  handleChange = (event) => {
    this.setState({
      newSchool: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <h2>School List</h2>

        <div>
          {this.state.balance >= 1 ? (
            <div>
              <p>{this.state.schoolList}</p>
              <div>
                <button onClick={() => this.setState({ addSchool: true })}>
                  Add Your School
                </button>
                {this.state.addSchool ? this.addSchool() : null}
              </div>
            </div>
          ) : (
            <div>
              <p>{this.state.schoolList}</p>
              <button onClick={this.balanceUp}>Find balance</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default IPFS;
