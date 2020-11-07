const INITIAL_STATE = {
    userName: '',
    password: '',
    token: '',
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_PASSSWORD':
            return { ...state, password: action.payload };
        case 'SET_USER_NAME':
            return { ...state, userName: action.payload };
        case 'SET_TOKEN':
            return { ...state, token: action.payload };
        default:
            return state;
    }
};
