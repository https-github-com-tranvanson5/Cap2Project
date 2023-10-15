import { v4 as uuidv4 } from 'uuid';

import educationInitial from './education';
import experienceInitial from './experience';
import introduceInitial from './introduce';
import projectsInitial from './projects';
import skillsInitial from './skills';
import languageInitial from './language';
import goalsInitial from './goals';
import certificateInitial from './certificate';
import prizeInitial from './prize';
import activityInitial from './activity';
import customeInitial from './custome';

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
    { ...languageInitial },
    { ...goalsInitial },
    { ...certificateInitial },
    { ...prizeInitial },
    { ...activityInitial },
    { ...customeInitial },
];

export default contentInitialValues;
