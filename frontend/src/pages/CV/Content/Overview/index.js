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

const cx = classNames.bind(styles);

function Overview(onChange) {
    const dispatch = useDispatch();
    const overviewData = useSelector(overviewSelector);

    // console.log('overviewData' , overviewData)

    const [name , setName] = useState(overviewData.iconic.name)
    const [position , setPosition] = useState(overviewData.iconic.position)
    console.log('name' , name)
    function findArrayElementByTitle(array, title) {
        return array.find((element) => element.title === title);
    }

    console.log('overviewData', overviewData);

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
        console.log(findArrayElementByTitle(id), field, value);
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
        console.log(findArrayElementByTitle(id), field, value);
    };

    return (
        <div className={cx('wrapper')}>
            <Row>
                <Col md={9}>
                    <div className={cx('header')}>
                        <TitleLarge>
                            <InputEditor
                                defaultValue={name}
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
                            defaultValue={position}
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
                        {overviewData.container.map((overviewItem, index) => {
                            const length = overviewData.container.length - 1;
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
