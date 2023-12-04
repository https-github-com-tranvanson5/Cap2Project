import { v4 as uuidv4 } from 'uuid';
import { CV_GROUP_TYPE } from '~/constants/constants';

const projectsInitial = {
    type: CV_GROUP_TYPE.projects,
    heading: {
        id: uuidv4(),
        blocks: [
            {
                key: uuidv4(),
                text: 'Dự án đã làm',
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
                        text: '09/2022 - Hiện tại',
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
                        text: 'JobCare',
                        type: 'unstyled',
                        depth: 0,
                        inlineStyleRanges: [
                            {
                                offset: 0,
                                length: 7,
                                style: 'BOLD',
                            },
                        ],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Description:  Dự án được phát triển nhằm mục đích giải quyết những khó khăn về nhu cầu tuyển dụng. Với các tính năng như làm bài kiểm tra, chỉnh sửa CV, đọc Blog. Giúp nhà tuyển dụng và các ứng viên dễ dàng kết nối với nhau hơn.',
                        type: 'unstyled',
                        depth: 0,
                        inlineStyleRanges: [
                            {
                                offset: 0,
                                length: 13,
                                style: 'BOLD',
                            },
                            {
                                offset: 14,
                                length: 214,
                                style: 'color-black',
                            },
                            {
                                offset: 14,
                                length: 214,
                                style: 'fontsize-12pt',
                            },
                        ],
                        entityRanges: [],
                        data: {
                            'text-align': 'justify',
                        },
                    },
                    {
                        key: uuidv4(),
                        text: 'Công nghệ sử dụng: ',
                        type: 'unstyled',
                        depth: 0,
                        inlineStyleRanges: [
                            {
                                offset: 0,
                                length: 19,
                                style: 'color-black',
                            },
                            {
                                offset: 0,
                                length: 19,
                                style: 'fontsize-12pt',
                            },
                            {
                                offset: 0,
                                length: 19,
                                style: 'fontfamily-Times New Roman", serif',
                            },
                            {
                                offset: 0,
                                length: 19,
                                style: 'BOLD',
                            },
                        ],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Front-end: : ReactJS, Redux (Toolkit + Thunk), Bootstrap, Styled\nComponent, DraftJS Editor, Firebase, Formik & Yup, Axios (Interceptor),\nSCSS ',
                        type: 'unordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [
                            {
                                offset: 0,
                                length: 141,
                                style: 'color-black',
                            },
                            {
                                offset: 0,
                                length: 141,
                                style: 'fontsize-12pt',
                            },
                            {
                                offset: 0,
                                length: 141,
                                style: 'fontfamily-Times New Roman", serif',
                            },
                            {
                                offset: 0,
                                length: 11,
                                style: 'ITALIC',
                            },
                        ],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Back-end: NodeJS, Express, Sequelize, JWT, MySQL',
                        type: 'unordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [
                            {
                                offset: 0,
                                length: 48,
                                style: 'ITALIC',
                            },
                        ],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Vai trò trong dự án: ',
                        type: 'unstyled',
                        depth: 0,
                        inlineStyleRanges: [
                            {
                                offset: 0,
                                length: 21,
                                style: 'color-black',
                            },
                            {
                                offset: 0,
                                length: 21,
                                style: 'fontsize-12pt',
                            },
                            {
                                offset: 0,
                                length: 21,
                                style: 'fontfamily-Times New Roman", serif',
                            },
                            {
                                offset: 0,
                                length: 21,
                                style: 'BOLD',
                            },
                        ],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Quyết định các công nghệ được sử dụng.',
                        type: 'unordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [
                            {
                                offset: 0,
                                length: 38,
                                style: 'color-black',
                            },
                            {
                                offset: 0,
                                length: 38,
                                style: 'fontsize-12pt',
                            },
                            {
                                offset: 0,
                                length: 38,
                                style: 'fontfamily-Times New Roman", serif',
                            },
                        ],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Tạo Database và API.',
                        type: 'unordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [
                            {
                                offset: 0,
                                length: 20,
                                style: 'color-black',
                            },
                            {
                                offset: 0,
                                length: 20,
                                style: 'fontsize-12pt',
                            },
                            {
                                offset: 0,
                                length: 20,
                                style: 'fontfamily-Times New Roman", serif',
                            },
                        ],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Thiết kế UX/UI.',
                        type: 'unordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [
                            {
                                offset: 0,
                                length: 15,
                                style: 'color-black',
                            },
                            {
                                offset: 0,
                                length: 15,
                                style: 'fontsize-12pt',
                            },
                            {
                                offset: 0,
                                length: 15,
                                style: 'fontfamily-Times New Roman", serif',
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

export default projectsInitial;
