import React from 'react';

class Find extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            url: ''}

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            text: event.target.value,
            url: event.target.value
        })
    } ;

    handleSubmit(event) {
        console.log("Text: " + this.state.value.text);
        console.log("URL: " + this.state.value.url);
        event.preventDefault();
    }
    render() {
        return(
            <>
            <h3>Search here to find out</h3>
            <form>
                <p>Enter any word here:</p>
                <input type="text" id="text" onChange={this.handleChange}/>
            </form>
            <form>
                <p>Enter any url here:</p>
                <input type="url" id="url" onChange={this.handleChange}/>
            </form>
            <button id="submit-btn" onSubmit={this.handleSubmit}>Find</button>
            </>
        )
    }

}

export default Find;