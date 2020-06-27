import React, {Component} from 'react';

class Paddle extends Component {
    constructor(props) {
        super(props);
        this.side = props.side;
    }

    feldStyle = {
        fill: '#000000',
        stroke: '#000000'
    };
  
    render() {
        return (
            <rect
                id="paddle_rand"
                data-name="paddle"
                style={this.feldStyle}
                x={ this.props.x }
                y={ this.props.y }
                width={ this.props.width }
                height={ this.props.height }
            />
        );
    }
};

export default Paddle;