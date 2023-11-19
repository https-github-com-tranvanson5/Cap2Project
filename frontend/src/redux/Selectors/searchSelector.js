export const searchCategoriesSelector = (state) => {
    return state.search?.categories;
};

export const searchJobListSelector = (state) => {
    return state.search?.results;
};
