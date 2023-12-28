import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import Button from '~/components/Button';
import ColorControl from './Menu/ColorControl';
import FontsControl from './Menu/FontsControl';
import ImageControl from './Menu/ImageControl';
import TemplateControl from './Menu/TemplateControl';
import styles from './ToolBar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { contentCvSelector, overviewSelector } from '~/redux/Selectors/cvSelector';
import { postCv, postJob } from '~/redux/apiRequest';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function ToolBar({ cvRef }) {
    const dispatch = useDispatch();
    const contentData = useSelector(contentCvSelector);
    const overviewData = useSelector(overviewSelector);
    const isAuth = useSelector((state) => state.auth.login?.currentUser);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here, e.g. make an API call
        const data = { content : contentData  , ...overviewData };

        const content = {
            content: JSON.stringify(data),
        };
        console.log('Form submitted with data:', data);
        postCv(content, isAuth?.jwt, dispatch);
        toast.success('Đã lưu thành công')
        navigate('/manager-cv')
    };
    const generatePDF = () => {
        const pageWidth = 210;
        const pageHeight = 297;

        html2canvas(cvRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('/image/png', 1.0);
            console.log('imgData', imgData);
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
            doc.save('jobFinded.pdf');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={cx('wrapper')}>
            <div className={cx('menu')}>
                <ColorControl />
                <FontsControl />
                <TemplateControl />
                <ImageControl />
            </div>
            <div className={cx('manager')} >
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
                <Button
                    type="submit"
                    primary
                    rounded
                    small
                >
                    Lưu
                </Button>
                <Link to="/manager-cv">
                    <Button rounded white small>
                        Quản lý CV
                    </Button>
                </Link>
            </div>
        </div>
        </form>
    );
}

export default ToolBar;
