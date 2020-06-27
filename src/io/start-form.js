// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';

class StartForm extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    startGame = (e) => {
        this.props.handleSubmit(e);
    };
    
    render() {
        return (
            <>
                <input type="button" value='Spiel starten' name="submit" onClick={this.startGame}/>
            </>
        );
    }
}

export default StartForm;
