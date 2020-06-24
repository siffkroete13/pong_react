const initial_state = {
    x: 0.3,
    y: 0.3,
    speed: 0
};


export const ball_reducer = (state = initial_state, action) => {
    switch(action.type) {
        case 'MOVE_BALL':
            return {
                x: state.x + action.payload.x,
                y: state.y + action.payload.y,
                speed: 0
            };
        default: 
            return state;
    }
}

