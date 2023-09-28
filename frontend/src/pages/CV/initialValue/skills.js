import { v4 as uuidv4 } from 'uuid';
import { CV_GROUP_TYPE } from '~/constants/constants';

const skillsInitial = {
    type: CV_GROUP_TYPE.skills,
    heading: {
        id: uuidv4(),
        blocks: [
            {
                key: uuidv4(),
                text: 'Kỹ năng',
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
                        text: 'Tin học văn phòng',
                        type: 'unstyled',
                        depth: 0,
                        inlineStyleRanges: [
                            {
                                offset: 0,
                                length: 17,
                                style: 'BOLD',
                            },
                        ],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Sử dụng thành thạo các công cụ Word, Excel, Power Point',
                        type: 'unordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Ngoại ngữ',
                        type: 'unstyled',
                        depth: 0,
                        inlineStyleRanges: [
                            {
                                offset: 0,
                                length: 9,
                                style: 'BOLD',
                            },
                        ],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Khả năng giao tiếp tiếng Anh trôi chảy',
                        type: 'unordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Chứng chỉ tiếng Nhật N2',
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

export default skillsInitial;
