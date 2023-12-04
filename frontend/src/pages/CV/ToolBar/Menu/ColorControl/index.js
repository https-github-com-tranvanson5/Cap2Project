import Tippy from '@tippyjs/react/headless';
import { Col, Row } from 'react-bootstrap';

import SubMenu from '../../SubMenu';
import MenuItem from '../../MenuItem';
import ColorItem from './ColorItem';
import { arrThemes } from '~/pages/CV/themes';

function ColorControl() {
    return (
        <Tippy
            interactive
            hideOnClick
            trigger="click"
            appendTo={document.body}
            render={(attrs) => (
                <div {...attrs} tabIndex="-1">
                    <SubMenu title="Màu chủ đạo">
                        <Row>
                            {arrThemes.map((theme, index) => {
                                return (
                                    <Col key={index} md={3}>
                                        <ColorItem color={theme.data.color} />
                                    </Col>
                                );
                            })}
                        </Row>
                    </SubMenu>
                </div>
            )}
        >
            <div>
                <MenuItem
                    title="Màu sắc"
                    icon={<ion-icon name="color-palette-outline"></ion-icon>}
                />
            </div>
        </Tippy>
    );
}

export default ColorControl;
