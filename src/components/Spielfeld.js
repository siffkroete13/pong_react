import React, {Component} from 'react';
import Paddle from './paddle';

class Spielfeld extends Component {

    constructor(props) {
        super(props);

        this.groundWidth = props.fieldWidth;
        this.groundHeight = props.fieldHeight;
    }

    feldStyle = {
        fill: '#00ffff',
        stroke: '#000000',
    };

    division = {
        stroke: '#458232',
        strokeWidth: '3px',
    };

    handleKeyUp(e) {
        // e.preventDefault();
        this.props.handleKeyUp(e);
    }

    handleKeyDown(e) {
        // e.preventDefault();
        this.props.handleKeyDown(e);
    }

  
    render() {

        return (
            <g id="spielfeld">
                <rect
                    id="spielfeld_rand"
                    data-name="spielfeld"
                    style={this.feldStyle}
                    x={ this.groundWidth / -2 }
                    y={this.groundHeight / -2}
                    width={this.groundWidth}
                    height={this.groundHeight}
                    onKeyUp={ e => this.handleKeyUp(e) }
                    onKeyDown={ e => this.handleKeyDown(e) }
                    tabIndex="0"
                />
                <line
                    x1={0}
                    y1={ this.groundHeight / -2 }
                    x2={0}
                    y2={this.groundHeight / 2}
                    style={this.division}
                />

                <Paddle
                    side='Left'
                    x={this.props.paddle_state.left_paddle.x}
                    y={this.props.paddle_state.left_paddle.y}
                    width={this.props.paddle_state.left_paddle.width}
                    height={this.props.paddle_state.left_paddle.height}
                />

                <Paddle
                    side='Right'
                    x={this.props.paddle_state.right_paddle.x}
                    y={this.props.paddle_state.right_paddle.y}
                    width={this.props.paddle_state.right_paddle.width}
                    height={this.props.paddle_state.right_paddle.height}
                />
            </g>
        );
    }
};

export default Spielfeld;