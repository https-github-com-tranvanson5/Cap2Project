import { v4 as uuidv4 } from 'uuid';
import { CV_GROUP_TYPE } from '~/constants/constants';

const goalsInitial = {
    type: CV_GROUP_TYPE.goals,
    heading: {
        id: uuidv4(),
        blocks: [
            {
                key: uuidv4(),
                text: 'Mục tiêu nghề nghiệp',
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
                        text: 'Hiện tại, khả năng sử dụng tin học văn phòng của tôi khá tốt, tuy nhiên trong thời gian tới tôi sẽ dành thời gian học hỏi, tìm hiểu thêm để có thể hoàn toàn tự tin và tôi tin rằng công cụ tin học văn phòng này sẽ hỗ trợ tôi rất nhiều trong công việc.',
                        type: 'unordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Tôi được mọi người đánh giá là khá giỏi trong giao tiếp bởi cách nói chuyện dễ nghe và biết dẫn dắt, tuy nhiên tôi mong muốn phát triển khả năng giao tiếp của bản thân hơn nữa.',
                        type: 'unordered-list-item',
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                    },
                    {
                        key: uuidv4(),
                        text: 'Trong quá trình học tập tại trường đại học, tôi được rèn luyện kỹ năng về quản lý, lãnh đạo đội nhóm và bản thân tôi cảm thấy mình rất nhiệt tình, năng nổ và phù hợp với những công việc này.',
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

export default goalsInitial;
