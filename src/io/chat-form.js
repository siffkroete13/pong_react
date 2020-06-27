// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';

class ChatForm extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            username: props.playerName
        }
    }
   
    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleSubmit();
    };
    
    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text"
                        onChange={this.handleInputChange}
                        name="username"
                        value={this.state.username} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </>
        );
    }
}

export default ChatForm;
