import React from 'react';

class Find extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            url: ''}

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            text: event.target.value,
            url: event.target.value
        })
    } 
    render() {
        return(
            <form>
                <h3>Search here to find out</h3>
                <p>Enter any word here:</p>
                <input type="text" onChange={this.handleChange}/>
            </form>
        )
    }

}

export default Find;