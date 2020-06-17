import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    data: [],
    inputValue: ''
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

  handleChange(e) {
    this.setState({ 
      [e.target.word]: e.target.value
    })
  };

  onSubmit(e) {
    e.preventDefault();

  }

  render() {
    return (
      <>
      <h1>Find your name here</h1>
      <form>
        <lable>
          Search Here: 
          <input word="word"
            type="text"
            value={this.state.inputValue}
            placeholder="Enter First Name Here"
            onChange={e => this.handleChange(e)}
          />
        </lable>
        <button onClick={(e) => this.onSubmit(e)}>Search</button>
      </form>
      {/* <div>
        <h3>Random names and words</h3>
        <div>{this.state.data.map(item =>
          <p><strong>Word:</strong> {item}</p>
        )}
        </div>
      </div> */}
      </>
    )
  }
}


export default App;
