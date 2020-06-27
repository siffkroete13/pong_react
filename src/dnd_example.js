import React, { Component } from 'react';
import connect from 'react-redux';
import {
    move_ball, MOVE_BALL
} from './actions/move_actions';



class Dnd extends Component {
    render() {
        return (
            <div>
                DnD Example!
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    ball_state: state.ball_reducer
});

const mapDispatchToProps = (dispatch) => ({
    move_ball: (move_object) => {
        dispatch(move_ball(move_object));
    }
});

const connectToStore = connect(mapStateToProps, mapDispatchToProps); 
const connected_dnd = connectToStore(Dnd);
export default connected_dnd;
