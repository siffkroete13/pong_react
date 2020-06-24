export const SET_LEFT_PADDLE = 'SET_LEFT_PADDLE';
export const set_left_paddle = (move_object) => ({
    type: SET_LEFT_PADDLE,
    payload: {
        x: move_object.x,
        y: move_object.y,
        width: move_object.width,
        height: move_object.height
    }
});

export const SET_RIGHT_PADDLE = 'SET_RIGHT_PADDLE';
export const set_right_paddle = (move_object) => ({
    type: SET_RIGHT_PADDLE,
    payload: {
        x: move_object.x,
        y: move_object.y,
        width: move_object.width,
        height: move_object.height
    }
});

export const MOVE_LEFT_PADDLE = 'MOVE_LEFT_PADDLE';
export const move_left_paddle = (move_object) => ({
    type: 'MOVE_LEFT_PADDLE',
    payload: {
        x: move_object.x,
        y: move_object.y
    }
});

export const MOVE_RIGHT_PADDLE = 'MOVE_RIGHT_PADDLE';
export const move_right_paddle = (move_object) => ({
    type: 'MOVE_RIGHT_PADDLE',
    payload: {
        x: move_object.x,
        y: move_object.y
    }
});

export const MOVE_BALL = 'MOVE_BALL';
export const move_ball = (move_object) => ({
    type: 'MOVE_BALL',
    payload: {
        x: move_object.x,
        y: move_object.y
    }
});
