import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import Spielfeld from './Spielfeld';


class Canvas extends Component {
    // eslint-disable-next-line
    constructor(props) { 
        super(props);
        this.fieldWidth = props.fieldWidth;
        this.fieldHeight = props.fieldHeight;
    }

    viewBox = [
      -(window.innerWidth / 2),  - (window.innerHeight/2), 
      window.innerWidth, window.innerHeight
    ];

    handleKeyDown = (e) => {

    }

    handleKeyUp = (e) => {
        
    }


    // preserveAspectRatio="xMaxYMax none" weggenommen
    render() {
        // console.log('!!!!!!!!!!!!! : ', this.props.paddle_state);
        return (
            <svg
                id="PingPong"
                onMouseMove={this.props.trackMouse}
                viewBox={this.viewBox}
            >
                <Spielfeld
                    handleKeyUp={this.props.handleKeyUp}
                    handleKeyDown={this.props.handleKeyDown}
                    fieldWidth={this.props.fieldWidth}
                    fieldHeight={this.props.fieldHeight}
                    ball_state={this.props.ball_state}
                    paddle_state={this.props.paddle_state}
                />
            </svg>
        );
    }
};



export default Canvas;
