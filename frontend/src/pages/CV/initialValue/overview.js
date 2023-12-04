import { v4 as uuidv4 } from 'uuid';
import { CV_GROUP_TYPE } from '~/constants/constants';

const overviewInitialValues = {
    type: CV_GROUP_TYPE.overview,
    iconic: {
        name: {
            blocks: [
                {
                    key: uuidv4(),
                    text: 'Nguyen Van A',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                },
            ],
            entityMap: {},
        },
        position: {
            blocks: [
                {
                    key: uuidv4(),
                    text: 'Fullstack Developer',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [],
                    entityRanges: [],
                    data: {},
                },
            ],
            entityMap: {},
        },
    },
    container: [
        {
            id: uuidv4(),
            title: {
                blocks: [
                    {
                        key: uuidv4(),
                        text: 'Họ tên',
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
                        text: 'Nguyễn Văn A',
                        type: 'unstyled',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                    },
                ],
                entityMap: {},
            },
        },
        {
            id: uuidv4(),
            title: {
                blocks: [
                    {
                        key: uuidv4(),
                        text: 'Ngày sinh',
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
                        text: '20/04/2000',
                        type: 'unstyled',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                    },
                ],
                entityMap: {},
            },
        },
        {
            id: uuidv4(),
            title: {
                blocks: [
                    {
                        key: uuidv4(),
                        text: 'Địa chỉ',
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
                        text: '03 TNV - Đà Nẵng',
                        type: 'unstyled',
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

export default overviewInitialValues;
