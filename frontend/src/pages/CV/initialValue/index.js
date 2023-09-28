import { v4 as uuidv4 } from 'uuid';

import educationInitial from './education';
import experienceInitial from './experience';
import introduceInitial from './introduce';
import projectsInitial from './projects';
import skillsInitial from './skills';

const contentInitialValues = [
    {
        id: uuidv4(),
        ...introduceInitial,
    },
    {
        id: uuidv4(),
        ...educationInitial,
    },
    {
        id: uuidv4(),
        ...skillsInitial,
    },
    {
        id: uuidv4(),
        ...experienceInitial,
    },
];

export const contentGroupList = [
    { ...introduceInitial },
    { ...educationInitial },
    { ...skillsInitial },
    { ...experienceInitial },
    { ...projectsInitial },
];

export default contentInitialValues;
