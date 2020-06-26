import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      name: '',
      counter: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleChange(event) {
    event.preventDefault();
    this.setState({ name: event.target.value})
  };
  
  handleClick(event) {
    event.preventDefault();
    this.setState({ name: event.target.value});

    let input = this.state.name;
    let findName = this.state.data;
    let counting = 0;
    for(var i = 0; i < findName.length; i++) {
      if (findName[i] === input) {
        counting++;
        var showResult =  findName[i] +  " has appeared " + counting + " time";
        return alert(showResult)
      }
    }
  };

  componentDidMount() {
    this.getScrapedData(res => this.setState({ data: res.json}))
    .catch(err => console.log(err));
  };

  getScrapedData = async () => {
    await fetch("http://localhost:3000/search")
    .then(response => response.json())
    .then(res => {
      this.setState({ data: res});
    })
    .catch(error => {
      this.setState({ error: error})
    })
};
  render() {
    const showData = this.state.data.map((data, index) => {
      return (
        <tr key={index}>
          <td>{index}</td>
          <td>{data}</td>
        </tr>
      )
    });

    return (
      <>
      <div className="App">
        <header className="App-header">Find your name here</header>
      </div>
      <div className="card-body">
        <form className="form">
          Search here:
            <input
              type="text"
              name="userInput"
              className="input"
              placeholder="Enter Here"
              onChange={this.handleChange}
            />
            <button id="btn" onClick={this.handleClick}>Search</button>
        </form>
      </div>
      <div>
        <h3 id="title">Try these names/words: </h3>
          <table id="dataTable">
            <tbody>
              {showData}
            </tbody>
          </table>
    
      </div>
      </>
    )
  }
}

export default App;
