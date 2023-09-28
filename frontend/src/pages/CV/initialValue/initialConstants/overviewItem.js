import { v4 as uuidv4 } from 'uuid';

export const newIconicContainerItem = {
    title: {
        blocks: [
            {
                key: uuidv4(),
                text: 'Title',
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
            },
        ],
        entityMap: {},
    },
    value: {
        blocks: [
            {
                key: uuidv4(),
                text: 'Descriptions',
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
            },
        ],
        entityMap: {},
    },
};
