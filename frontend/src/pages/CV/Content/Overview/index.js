import classNames from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import InputEditor from '~/components/Editor/InputEditor';
import { overviewSelector } from '~/redux/Selectors/cvSelector';
import BoxEditorItem from '../../BoxEditor/BoxEditorItem';
import { TitleLarge } from '../../styledComponents/Title';
import AvatarOverview from './Avatar';
import styles from './Overview.module.scss';
import { useState } from 'react';
import { cvSlice } from '../../cvSlice';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { cvDetail } from '~/redux/apiRequest';

const cx = classNames.bind(styles);

function Overview(onChange) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const overviewData = useSelector(overviewSelector);
    const [name , setName] = useState(overviewData.iconic.name)
    const [position , setPosition] = useState(overviewData.iconic.position)
    const isAuth = useSelector((state) => state.auth.login?.currentUser);
    const dataDetail = useSelector((state) => state.cvData.data?.cvDetail);
    const [formData, setFormData] = useState({
        content: overviewData ,
    });

    useEffect(() => {
        if (id) {
            cvDetail(isAuth?.jwt, id, dispatch);
        } else {
            cvDetail(isAuth?.jwt, undefined, dispatch); // Fetch empty job data when creating a new job
        }
    }, [isAuth?.jwt, id]);


    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                if (dataDetail?.content) {
                    try {
                        const data = JSON.parse(dataDetail.content);
                        setFormData({
                            content: data,
                        });
                        // Rest of your code
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                    }
                }
            }
        };
        fetchData();
    }, [id, dataDetail]);

    // console.log('overviewData' , overviewData)

    // console.log('name' , name)
    function findArrayElementByTitle(array, title) {
        return array.find((element) => element.title === title);
    }

    // console.log('overviewData', overviewData);

    const handleChangeValueName = (id, field, value) => {
        setName((prevValue) => ({
            ...prevValue,
            [id]: {
                ...prevValue[id],
                [field]: value,
            },
        }));
        dispatch(
            cvSlice.actions.changeContent({
                newText: value,
                typeBlock: "overview",
                key: findArrayElementByTitle(id),
            }),
        );
    };

    const handleChangeValuePositon = (id, field, value) => {
        setPosition((prevValue) => ({
            ...prevValue,
            [id]: {
                ...prevValue[id],
                [field]: value,
            },
        }));
        dispatch(
            cvSlice.actions.changeContent({
                newText: value,
                typeBlock: "overview",
                key: findArrayElementByTitle(id),
            }),
        );
    };

    console.log('formData',formData)
    console.log('name',name)
    return (
        <div className={cx('wrapper')}>
            <Row>
                <Col md={9}>
                    <div className={cx('header')}>
                        <TitleLarge>
                            <InputEditor
                                defaultValue={formData.content.iconic.name}
                                setContent={(content) =>
                                    handleChangeValueName(
                                        overviewData.iconic.name.blocks.map(
                                            (block) => block?.key,
                                        ),
                                        'text',
                                        content,
                                    )
                                }
                            />
                        </TitleLarge>
                        <InputEditor
                            defaultValue={formData.content.iconic.position}
                            setContent={(content) =>
                                handleChangeValuePositon(
                                    overviewData.iconic.position.blocks.map(
                                        (block) => block?.key,
                                    ),
                                    'text',
                                    content,
                                )
                            }
                        />
                    </div>
                    <Row>
                        {formData.content.container.map((overviewItem, index) => {
                            const length = formData.content.container.length - 1;
                            return (
                                <Col key={overviewItem.id} md={6}>
                                    <BoxEditorItem
                                        typeBlock="overview"
                                        length={length}
                                        index={index}
                                        boxId={overviewItem.id}
                                        title={overviewItem.title}
                                        editorValue={overviewItem.value}
                                        onChange={onChange}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                </Col>
                <Col md={3}>
                    <AvatarOverview />
                </Col>
            </Row>
        </div>
    );
}

export default Overview;
