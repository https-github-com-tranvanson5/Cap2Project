import { v4 as uuidv4 } from 'uuid';
import { CV_GROUP_TYPE } from '~/constants/constants';

const languageInitial = {
    type: CV_GROUP_TYPE.lang,
    heading: {
        id: uuidv4(),
        blocks: [
            {
                key: uuidv4(),
                text: 'Ngôn ngữ',
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
            },
        ],
        entityMap: {},
    },
    data: [
        {
            id: uuidv4(),
            timeline: {
                id: uuidv4(),
                blocks: [
                    {
                        key: uuidv4(),
                        text: '',
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
                        text: 'Ngôn ngữ Anh ',
                        type: 'unstyled',
                        depth: 0,
                        inlineStyleRanges: [
                            {
                                offset: 0,
                                length: 16,
                                style: 'BOLD',
                            },
                        ],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Toeic 800',
                        type: 'unordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Ielts 800',
                        type: 'unordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                    },
                ],
                entityMap: {},
            },
        },
    ],
};

export default languageInitial;
