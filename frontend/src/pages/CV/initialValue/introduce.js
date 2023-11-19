import { v4 as uuidv4 } from 'uuid';
import { CV_GROUP_TYPE } from '~/constants/constants';

const introduceInitial = {
    type: CV_GROUP_TYPE.introduce,
    heading: {
        id: uuidv4(),
        blocks: [
            {
                key: uuidv4(),
                text: 'Giới thiệu bản thân',
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
            value: {
                blocks: [
                    {
                        key: uuidv4(),
                        text: 'Với hơn 10 năm kinh nghiệm làm việc trong lĩnh vực kế toán và tài chính cũng như kinh nghiệm chuyên môn với nhiều chương trình kế toán phổ biến nhất (MISA, FAST), tôi mong muốn tìm kiếm cơ hội làm việc trong môi trường chuyên nghiệp và góp phần cải thiện tài chính của tổ chức.',
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

export default introduceInitial;
