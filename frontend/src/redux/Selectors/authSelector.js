export const isAuthSelector = (state) => {
    return state.accounts.isAuth;
};

export const isSuccessSelector = (state) => {
    return state.accounts.success;
};

export const accountsStatusSelector = (state) => {
    return state.accounts.status;
};

export const accountsDataSelector = (state) => {
    return state.accounts.data;
};

export const accountsMessageSelector = (state) => {
    return state.accounts.message;
};

export const roleSelector = (state) => state.accounts.data.role;
