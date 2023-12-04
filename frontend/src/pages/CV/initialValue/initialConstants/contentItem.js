import { v4 as uuidv4 } from 'uuid';

const newContentBoxItem = {
    timeline: {
        id: uuidv4(),
        blocks: [
            {
                key: uuidv4(),
                text: 'Ngày tháng',
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
                text: 'Tiêu đề chính',
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: [
                    {
                        offset: 0,
                        length: 13,
                        style: 'BOLD',
                    },
                ],
                entityRanges: [],
                data: {},
            },
            {
                key: uuidv4(),
                text: 'Mô tả tổng quát',
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
            },
            {
                key: uuidv4(),
                text: 'Ý thứ nhất',
                type: 'unordered-list-item',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
            },
            {
                key: uuidv4(),
                text: 'Ý thứ hai',
                type: 'unordered-list-item',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {},
            },
        ],
        entityMap: {},
    },
};

export default newContentBoxItem;
