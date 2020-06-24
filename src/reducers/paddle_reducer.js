const initial_state = {
    left_paddle: {
        x: (-250),
        y: (-150),
        width: 3,
        height: 80
    },
    right_paddle: {
        x: (250),
        y: (-150),
        width: 3,
        height: 80
    }
}

export const paddle_reducer = (state = initial_state, action) => {
    // console.log(state);

    switch(action.type) {
        case 'MOVE_LEFT_PADDLE':
            // console.log('action in paddle_reducer', action);
            // console.log('y sollte sein: ', state.left_paddle.y + action.payload.y);
            return {
                left_paddle: {
                    x: state.left_paddle.x + action.payload.x,
                    y: state.left_paddle.y + action.payload.y,
                    width: state.left_paddle.width,
                    height: state.left_paddle.height  
                },
                right_paddle: state.right_paddle, // Rechts Bleibt gleich
            };
        case 'MOVE_RIGHT_PADDLE':
            return {
                left_paddle: state.left_paddle, // Links Bleibt gleich
                right_paddle: {
                    x: state.right_paddle.x + action.payload.x,
                    y: state.right_paddle.y + action.payload.y    
                },
                width: state.width,
                height: state.height
            };
        default: 
            return state;
    }
}

