import classNames from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import InputEditor from '~/components/Editor/InputEditor';
import { overviewSelector } from '~/redux/Selectors/cvSelector';
import BoxEditorItem from '../../BoxEditor/BoxEditorItem';
import { TitleLarge } from '../../styledComponents/Title';
import AvatarOverview from './Avatar';
import styles from './Overview.module.scss';

const cx = classNames.bind(styles);

function Overview() {
    const overviewData = useSelector(overviewSelector);

    return (
        <div className={cx('wrapper')}>
            <Row>
                <Col md={9}>
                    <div className={cx('header')}>
                        <TitleLarge>
                            <InputEditor
                                defaultValue={overviewData.iconic.name}
                            />
                        </TitleLarge>
                        <InputEditor
                            defaultValue={overviewData.iconic.position}
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
