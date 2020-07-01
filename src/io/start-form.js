// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';

class StartForm extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            username: 'Spielername'
        }
    }

    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    startGame = (e) => {
        e.preventDefault();
        this.props.handleSubmit(e);
    };
    
    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit} >
                    <input type="text" value={this.state.username} name="username" onChange={this.handleInputChange} />
                    <input type="submit" value='Spiel starten' name="startGame" onClick={this.startGame} />
                </form>
            </>
        );
    }
}

export default StartForm;
