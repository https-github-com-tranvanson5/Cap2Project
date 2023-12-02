import { v4 as uuidv4 } from 'uuid';
import { CV_GROUP_TYPE } from '~/constants/constants';

const experienceInitial = {
    type: CV_GROUP_TYPE.experience,
    heading: {
        id: uuidv4(),
        blocks: [
            {
                key: uuidv4(),
                text: 'Kinh nghiệm làm việc',
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
                        text: '08/2022 - 11/2022',
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
                        text: 'Nhân viên bán hàng',
                        type: 'unstyled',
                        depth: 0,
                        inlineStyleRanges: [
                            {
                                offset: 0,
                                length: 18,
                                style: 'BOLD',
                            },
                        ],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Công ty Winmart',
                        type: 'unstyled',
                        depth: 0,
                        inlineStyleRanges: [
                            {
                                offset: 0,
                                length: 15,
                                style: 'ITALIC',
                            },
                        ],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Hỗ trợ viết bài quảng cáo qua các trang mạng xã hội như Facebook, Instagram...',
                        type: 'unordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [
                            {
                                offset: 0,
                                length: 78,
                                style: 'ITALIC',
                            },
                        ],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Giới thiệu, tư vấn sản phẩm, giải đáp thắc mắc của khách hàng',
                        type: 'unordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [
                            {
                                offset: 0,
                                length: 61,
                                style: 'ITALIC',
                            },
                        ],
                        entityRanges: [],
                        data: {},
                    },
                ],
                entityMap: {},
            },
        },
        {
            id: uuidv4(),
            timeline: {
                id: uuidv4(),
                blocks: [
                    {
                        key: uuidv4(),
                        text: '02/2020 - 08/2022',
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
                        text: 'Nhân viên bán hàng',
                        type: 'unstyled',
                        depth: 0,
                        inlineStyleRanges: [
                            {
                                offset: 0,
                                length: 18,
                                style: 'BOLD',
                            },
                        ],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Cửa hàng Bách Hóa Xanh',
                        type: 'unstyled',
                        depth: 0,
                        inlineStyleRanges: [
                            {
                                offset: 0,
                                length: 22,
                                style: 'ITALIC',
                            },
                        ],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Bán hàng trực tiếp tại cửa hàng cho khách hàng người nước ngoài và người Việt Nam',
                        type: 'unordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [
                            {
                                offset: 0,
                                length: 81,
                                style: 'ITALIC',
                            },
                        ],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Quảng bá sản phẩm thông qua các ấn phẩm truyền thông: banner, poster...',
                        type: 'unordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [
                            {
                                offset: 0,
                                length: 71,
                                style: 'ITALIC',
                            },
                        ],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Lập báo cáo sản lượng bán ra hàng ngày',
                        type: 'unordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [
                            {
                                offset: 0,
                                length: 38,
                                style: 'ITALIC',
                            },
                        ],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Kiểm kho cho cửa hàng',
                        type: 'unordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [
                            {
                                offset: 0,
                                length: 21,
                                style: 'ITALIC',
                            },
                        ],
                        entityRanges: [],
                        data: {},
                    },
                ],
                entityMap: {},
            },
        },
    ],
};

export default experienceInitial;
