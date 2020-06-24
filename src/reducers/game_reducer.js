const gameReducer = (state = {}, action) => {
    switch(action.type) {
        case 'MOVE_OBJECT':
            return {
                von: state.von,
                nach: state.nach
            }
        default:
            return state;
    }
}

export default gameReducer;