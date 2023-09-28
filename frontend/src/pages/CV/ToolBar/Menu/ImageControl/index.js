import Tippy from '@tippyjs/react/headless';

import SubMenu from '../../SubMenu';
import MenuItem from '../../MenuItem';

function ImageControl() {
    return (
        <Tippy
            hideOnClick
            trigger="click"
            interactive
            appendTo={document.body}
            render={(attrs) => (
                <div {...attrs} tabIndex="-1">
                    <SubMenu title="Ảnh hồ sơ"></SubMenu>
                </div>
            )}
        >
            <div>
                <MenuItem
                    title="Ảnh hồ sơ"
                    icon={<ion-icon name="image-outline"></ion-icon>}
                />
            </div>
        </Tippy>
    );
}

export default ImageControl;
