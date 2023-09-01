import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import Button from '~/components/Button';
import ColorControl from './Menu/ColorControl';
import FontsControl from './Menu/FontsControl';
import ImageControl from './Menu/ImageControl';
import TemplateControl from './Menu/TemplateControl';
import styles from './ToolBar.module.scss';

const cx = classNames.bind(styles);

function ToolBar({ cvRef }) {
    const generatePDF = () => {
        const pageWidth = 210;
        const pageHeight = 297;

        html2canvas(cvRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('/image/png', 1.0);
            const imgHeight = (canvas.height * pageWidth) / canvas.width;
            let heightLeft = imgHeight;

            const doc = new jsPDF('p', 'mm');

            let position = 0;
            doc.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            doc.save('jobcare.pdf');
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('menu')}>
                <ColorControl />
                <FontsControl />
                <TemplateControl />
                <ImageControl />
            </div>
            <div className={cx('manager')}>
                <Button
                    onClick={() => {
                        generatePDF();
                    }}
                    primary
                    rounded
                    small
                >
                    Tải xuống
                </Button>
                <Link to="/manager-cv">
                    <Button rounded white small>
                        Quản lý CV
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default ToolBar;
