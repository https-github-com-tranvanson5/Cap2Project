import { v4 as uuidv4 } from 'uuid';
import { CV_GROUP_TYPE } from '~/constants/constants';

const activityInitial = {
    type: CV_GROUP_TYPE.activity,
    heading: {
        id: uuidv4(),
        blocks: [
            {
                key: uuidv4(),
                text: 'Hoạt động',
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
                        text: 'CÁC CLB ĐỘI NHÓM SINH VIÊN ',
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
                        text: 'Đoàn Thanh niên Viện – ISB Youth Union',
                        type: 'unordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Ban Phong trào Đoàn Viện – ISB Event Team',
                        type: 'unordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Ban Học tập Đoàn Viện – ISB Academic Team',
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

export default activityInitial;
