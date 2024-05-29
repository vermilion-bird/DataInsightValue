// Action Types
export const SET_VALUE = 'SET_VALUE';
export const REMOVE_VALUE = 'REMOVE_VALUE';

// Action Creators
export function setValue(key, value) {
    return { type: SET_VALUE, payload: { key, value } };
}

export function removeValue(key) {
    return { type: REMOVE_VALUE, payload: { key } };
}


export function keyValueStore(state = {}, action) {
    switch (action.type) {
        case SET_VALUE:
            // 使用键来设置值
            const { key, value } = action.payload;
            return {
                ...state,
                [key]: value
            };
        case REMOVE_VALUE:
            // 使用键来移除一个值
            const newState = { ...state };
            delete newState[action.payload.key];
            return newState;
        default:
            return state;
    }
}
