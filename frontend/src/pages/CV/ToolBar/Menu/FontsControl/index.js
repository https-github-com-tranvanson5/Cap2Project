import Tippy from '@tippyjs/react/headless';

import SubMenu from '../../SubMenu';
import MenuItem from '../../MenuItem';
import { arrFonts } from '~/pages/CV/themes';
import FontItem from './FontItem';

function FontsControl() {
    return (
        <Tippy
            hideOnClick
            trigger="click"
            interactive
            appendTo={document.body}
            render={(attrs) => (
                <div {...attrs} tabIndex="-1">
                    <SubMenu title="Lựa chọn phông chữ">
                        {arrFonts.map((font, index) => {
                            return <FontItem key={index} name={font.name} />;
                        })}
                    </SubMenu>
                </div>
            )}
        >
            <div>
                <MenuItem
                    title="Phông chữ"
                    icon={<ion-icon name="text-outline"></ion-icon>}
                />
            </div>
        </Tippy>
    );
}

export default FontsControl;
