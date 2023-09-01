import Tippy from '@tippyjs/react/headless';

import SubMenu from '../../SubMenu';
import MenuItem from '../../MenuItem';

function TemplateControl() {
    return (
        <Tippy
            interactive
            hideOnClick
            trigger="click"
            appendTo={document.body}
            render={(attrs) => (
                <div {...attrs} tabIndex="-1">
                    <SubMenu title="Mẫu CV"></SubMenu>
                </div>
            )}
        >
            <div>
                <MenuItem
                    title="Mẫu CV"
                    icon={<ion-icon name="layers-outline"></ion-icon>}
                />
            </div>
        </Tippy>
    );
}

export default TemplateControl;
