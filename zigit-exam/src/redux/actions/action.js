export const setPassword = (password) => {
    return {
        type: 'SET_PASSSWORD',
        payload: password,
    };
};

export const setUserName = (mail) => {
    return {
        type: 'SET_USER_NAME',
        payload: mail,
    };
};

export const setToken = (token) => {
    return {
        type: 'SET_TOKEN',
        payload: token,
    };
};
