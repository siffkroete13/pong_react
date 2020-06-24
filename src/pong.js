import React, { Component } from 'react';
import { connect } from 'react-redux';
import Canvas from './components/Canvas';
import { getCanvasPosition } from './utils/formulas';
import {
    // eslint-disable-next-line
    move_left_paddle, MOVE_LEFT_PADDLE,
    // eslint-disable-next-line
    move_right_paddle, MOVE_RIGHT_PADDLE,
    // eslint-disable-next-line
    move_ball, MOVE_BALL
} from './actions/move_actions';

// import InputListener from './InputListener';
// import './css/canvas.css';


class Pong extends Component {

    framesPerSec = 50;

    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.fieldWidth = 600;
        this.fieldHeight = 400;
        this.trackMouse = this.trackMouse.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleKeyup = this.handleKeyup.bind(this);

        this.key_state = {
            up_arrow: 0, // key-code = 38
            down_arrow: 0, // key-code = 40
            left_arrow: 0, // key-code = 37,
            right_arrow: 0 /// key-code = 39
        }
    }

    componentDidMount() {
        const self =  this;
        self.repetitions = 0;
        
        const delta = 1 / this.framesPerSec;
        self.h = setInterval( () => {
            const move_down = {x: 0 * this.fieldWidth,y: delta * this.fieldHeight};
            const move_up = {x: 0 * this.fieldWidth,y: -delta * this.fieldHeight};

            if(this.key_state.up_arrow === 1) { // Up-Arrow pressed
                self.props.move_left_paddle(move_up);
            } else if(this.key_state.down_arrow === 1) { // Dopwn-Arrow pressed
                self.props.move_left_paddle(move_down);
            }
           
            if(++self.repetitions >= 1115) { clearInterval(self.h); }
        }, 1000/this.framesPerSec);
    }

    trackMouse(e) {
        this.canvasMousePosition = getCanvasPosition(e);
    }

    handleKeyup(e) {
        // e.preventDefault();
         console.log('keycode', e.keyCode);
         if(e.keyCode === 38) { // Up Arrow loslassen
             this.key_state.up_arrow = 0;
         } else if(e.keyCode === 40) { // Down Arrow loslassen
             this.key_state.down_arrow = 0;
         }
    }

    handleKeydown(e) {
       // e.preventDefault();
        // console.log('keycode', e.keyCode);
        if(e.keyCode === 38) { // Up Arrow drücken
            this.key_state.up_arrow = 1;
        } else if(e.keyCode === 40) { // Down Arrow drücken
             this.key_state.down_arrow = 1;
        }
    }

   


    render() {
        return(
            <Canvas
                fieldWidth={this.fieldWidth}
                fieldHeight={this.fieldHeight}
                ball_state={this.props.ball_state}
                paddle_state={this.props.paddle_state}
                key_state={this.key_state}
                trackMouse={this.trackMouse}
                handleKeyDown={this.handleKeydown}
                handleKeyUp={this.handleKeyup}
                tabIndex="0"
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        ball_state: state.ball_reducer,
        paddle_state: state.paddle_reducer,
    };
}


function mapDispatchToProps(dispatch) {
    const dispatchPropsObject = {
        move_left_paddle: (move_object) => {
            dispatch(move_left_paddle(move_object));
        },
        move_right_paddle: (move_object) => {
            dispatch(move_right_paddle(move_object));
        },
        move_ball: (move_object) => {
            dispatch(move_ball(move_object));
        }
    }
    return dispatchPropsObject;
}

export default connect(mapStateToProps, mapDispatchToProps)(Pong);
