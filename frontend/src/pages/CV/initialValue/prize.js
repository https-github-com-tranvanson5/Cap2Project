import { v4 as uuidv4 } from 'uuid';
import { CV_GROUP_TYPE } from '~/constants/constants';

const prizeInitial = {
    type: CV_GROUP_TYPE.prize,
    heading: {
        id: uuidv4(),
        blocks: [
            {
                key: uuidv4(),
                text: 'Giải thưởng',
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
                        text: '08/2023 - 11/2023',
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
                        text: 'Giải thưởng các Cuộc thi trong nước ',
                        type: 'unstyled',
                        depth: 0,
                        inlineStyleRanges: [
                            {
                                offset: 0,
                                length: 40,
                                style: 'BOLD',
                            },
                        ],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Cuộc thi Olympic Toán học',
                        type: 'unordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Cuộc thi Olympic Tin học',
                        type: 'unordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Cuộc thi Olympic Vật Lý',
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

export default prizeInitial;
