// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';

class ChatForm extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            field1: '',
            field2: ''
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
        this.props.handleSubmit(this.state.field1);
    };
    
    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text"
                        onChange={this.handleInputChange}
                        name="field1"
                        value={this.state.field1} />
                    </label>
                    <label>
                        <input type="text"
                        onChange={this.handleInputChange}
                        name="field2"
                        value={this.state.field2} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </>
        );
    }
}

export default ChatForm;
