import { createSelector } from '@reduxjs/toolkit';

export const isLoadingSelector = (state) => state.cv.isLoading;

export const themeSelector = (state) => state.cv.theme;

export const overviewSelector = (state) => state.cv.data.overview;

export const contentCvSelector = (state) => state.cv.data.content;

export const typeUsedContentSelector = createSelector(
    (state) => state.cv.data.content,
    (typeUsedList) => typeUsedList.map((group) => group.type),
);
