import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editJob, getCareer, getJobRecruiter, postJob } from '~/redux/apiRequest';
import RegexValidator from '../Validator/RegexValidator';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import Button from '~/components/Button';
import ImagePreview from '../ImageProcess/Image/ImagePreview';
import classNames from 'classnames/bind';
import styles from './RecruiterPost.module.scss';
import FirebaseFileUploader from '~/pages/Recruiter/RecruiterPost/ImageProcess/Firebase/FirebaseFileUploader';
import initializeFirebaseStorage from '~/pages/Recruiter/RecruiterPost/ImageProcess/Firebase/firebaseConfig';
import { ref } from 'firebase/storage';
import IsEmptyValidator from '~/pages/Recruiter/RecruiterPost/Validator/IsEmptyValidator';
import CompareValidator from '~/pages/Recruiter/RecruiterPost/Validator/CompareValidator';
import Dropdown from '../DropDown/DropDown'
import {
    categoryTypeOption,
    categoryGenderOption,
    categoryExperienceOption,
    categoryEducationOption,
    categoryPositionOption,
    categoryProvinceOption
} from '../Data/DataEntry';
import CheckBox from '~/pages/Recruiter/RecruiterPost/CheckBox/CheckBox';
import TextEditor from '~/pages/Calw/EditorContent';
const cx = classNames.bind(styles);
const initialState = {};
function RecruiterPost() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const careers = useSelector((state) => state.allJob.career?.careerCurrent);
    const isAuth = useSelector((state) => state.auth.login?.currentUser);
    const jobDataRecruiterDetail = useSelector(
        (state) => state.allJob.jobsRecruiter?.jobRecruiter,
    );
    const [isInputValid, setInputValid] = useState({});
    const [imageUpload, setImageUpload] = useState(null);
    const [formData, setFormData] = useState(initialState);
    const [listCareerId, setListCareerId] = useState([]);



    useEffect(() => {
        getCareer(isAuth?.jwt, dispatch);
        if (id) {
            getJobRecruiter(isAuth?.jwt, id, dispatch);
            console.log(jobDataRecruiterDetail);
        } else {
            getJobRecruiter(isAuth?.jwt, undefined, dispatch); // Fetch empty job data when creating a new job
        }
    }, [isAuth?.jwt, id]);
    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                console.log(jobDataRecruiterDetail);
                setFormData({

                    //thông tin job
                    imageUrl: jobDataRecruiterDetail?.imageUrl || '',
                    title: jobDataRecruiterDetail?.title || '',
                    address: jobDataRecruiterDetail?.address || '',
                    recruitmentStartDate: jobDataRecruiterDetail?.recruitmentStartDate || '',
                    recruitmentEndDate: jobDataRecruiterDetail?.recruitmentEndDate || '',
                    startSalary: jobDataRecruiterDetail?.startSalary || '',
                    endSalary: jobDataRecruiterDetail?.endSalary || '',
                    jobExperience: jobDataRecruiterDetail?.jobExperience || '',
                    jobEducation: jobDataRecruiterDetail?.jobEducation || '',
                    jobPosition: jobDataRecruiterDetail?.jobPosition || '',
                    jobType: jobDataRecruiterDetail?.jobType || '',
                    genderRequest: jobDataRecruiterDetail?.genderRequest || '',
                    jobDescription: jobDataRecruiterDetail?.jobDescription || '',
                    benefit: jobDataRecruiterDetail?.benefit || '',
                    careers: (jobDataRecruiterDetail?.careers || []).map(career => career.id),

                        //thông tin công ty
                    company: jobDataRecruiterDetail?.company || '',
                    companyLink: jobDataRecruiterDetail?.companyLink || '',
                    companyDescription: jobDataRecruiterDetail?.companyDescription || '',

                    //thông tin liên hệ
                    contactName: jobDataRecruiterDetail?.contactName || '',
                    contactAddress: jobDataRecruiterDetail?.contactAddress || '',
                    contactEmail: jobDataRecruiterDetail?.contactEmail || '',
                    contactPhone: jobDataRecruiterDetail?.contactPhone || '',
                    note: jobDataRecruiterDetail?.note || '',
                });
            }
            setListCareerId((jobDataRecruiterDetail?.careers || []).map(career => career.id));        };
        fetchData();
    }, [id, jobDataRecruiterDetail]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleValidation = (field, isValid) => {
        if (isInputValid[field] !== isValid) {
            setInputValid((prevInputValid) => ({
                ...prevInputValid,
                [field]: isValid,
            }));
        }
    };
    const isSubmitDisabled = () => {
        // Check if any input is invalid, including 'recruitmentEndDateIsEmpty'
        return Object.values(isInputValid).some((invalid) => !invalid);
    };
    const onChangeValue = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };
    const handleCallback = (data) => {
        setImageUpload(data);
        console.log(data);
    };
    const handleUploadFirebase = async () => {
        if (imageUpload === null) {
            console.error('imageUpload is null');
            return null;
        }

        const storageRef = ref(
            initializeFirebaseStorage(),
            `images/${Date.now()}_${imageUpload?.name}`
        );

        try {
            // Wrap the FirebaseFileUploader function in a Promise.resolve call
            const uploadedImageUrl = await Promise.resolve(FirebaseFileUploader(imageUpload, storageRef));
            return uploadedImageUrl;
        } catch (error) {
            console.error('Firebase upload error:', error);
            return null;
        }
    };
    const handleCallbackCheckBox = (data) => {
        setListCareerId(data);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        let newFormData = { ...formData,careers:listCareerId,jobStatus: "ACTIVE" }; // Create a copy of the existing formData
        if (imageUpload !== null) {
            const uploadedImageUrl = await handleUploadFirebase();
            newFormData.imageUrl = uploadedImageUrl;
            if (id){
                newFormData.id=id;
                console.log(newFormData);
                editJob(newFormData, isAuth, dispatch);
            }else{
                console.log(newFormData);
                postJob(newFormData, isAuth, dispatch);
            }

        }else{
            if (id){
                newFormData.id=id;
                console.log(newFormData);
                editJob(newFormData, isAuth, dispatch);
            }else{
                console.log(newFormData);
                postJob(newFormData, isAuth, dispatch);
            }
        }
    };

    return (
            <Container>
                <div className={cx('wrapper')}>
                    <section className={cx('wrapper')}>
                        <form onSubmit={handleSubmit}>
                            <div className={cx('title-header')}>
                                {id
                                    ? 'Chỉnh sửa bài tuyển dụng '
                                    : 'Tạo bài tuyển dụng mới'}
                            </div>
                            <div className={cx('post-title')}>Thông tin cơ bản</div>
                            <div className={cx('title-post')}>
                                <div className={cx('content-detail')}>
                                    <Row>
                                        <Col sm={12} md={12} className={'mb-5'}>
                                            <div>
                                                <ImagePreview
                                                    callback={handleCallback}
                                                    setValue={formData?.imageUrl}
                                                    value={(value)=> onChangeValue("imageUrl",value)}
                                                    title={"Image preview"}
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Row className={'mb-2'}>
                                            <Col sm={12} md={12}>
                                                <div className={cx('content-input')}>
                                                    <div className={cx('detail-name')}>
                                                        Tiêu đề
                                                    </div>
                                                    {/*Xử lý title*/}
                                                    <input
                                                        placeholder={"Nhập tiêu đề"}
                                                        className={cx('input-text')}
                                                        name={'title'}
                                                        type={'text'}
                                                        value={formData?.title}
                                                        onChange={handleInputChange}
                                                    />
                                                    <IsEmptyValidator
                                                        data={formData?.title}
                                                        messageIsEmpty="Tiêu đề không được để trống"
                                                        onValidation={(isValid) => handleValidation('titleIsEmpty', isValid)}
                                                    />
                                                    <RegexValidator
                                                        data={formData?.title}
                                                        regex={/.{5,}/}
                                                        messageRegex="Tiêu đề phải có ít nhất 5 kí tự"
                                                        onValidation={(isValid) => handleValidation('titleRegex', isValid)}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className={'mb-2'}>
                                            <Col sm={12} md={12}>
                                                <div className={cx('content-input')}>
                                                    <div className={cx('detail-name')}>
                                                        Địa chỉ làm việc
                                                    </div>
                                                    <input
                                                        placeholder={"Nhập địa chỉ"}
                                                        className={cx('input-text')}
                                                        name={'address'}
                                                        type={'text'}
                                                        value={formData?.address}
                                                        onChange={handleInputChange}
                                                    />
                                                    <IsEmptyValidator
                                                        data={formData?.address}
                                                        messageIsEmpty="Địa chỉ không được để trống"
                                                        onValidation={(isValid) => handleValidation('addressIsEmpty', isValid)}
                                                    />
                                                    <RegexValidator
                                                        data={formData?.address}
                                                        regex={/.{5,}/}
                                                        messageRegex="Địa chỉ phải có ít nhất 5 kí tự"
                                                        onValidation={(isValid) => handleValidation('addressRegex', isValid)}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Col>
                                            <Row className={'mb-2'}>
                                                <Col>
                                                    <div className={cx('content-input')}>
                                                        <div className={cx('detail-name')}>
                                                            Ngày tuyển dụng
                                                        </div>
                                                        <input
                                                            className={cx('input-text')}
                                                            name={'recruitmentStartDate'}
                                                            type={'date'}
                                                            value={formData?.recruitmentStartDate}
                                                            onChange={handleInputChange}
                                                        />
                                                        <IsEmptyValidator
                                                            data={formData?.recruitmentStartDate}
                                                            messageIsEmpty="Ngày tuyển dụng không được để trống"
                                                            onValidation={(isValid) => handleValidation('recruitmentStartDateIsEmpty', isValid)}
                                                        />
                                                        <CompareValidator
                                                            type={"date"}
                                                            value1={id?0:new Date()}
                                                            operator={"<="}
                                                            value2={formData?.recruitmentStartDate}
                                                            message={"Ngày tuyển dụng phải lớn hơn ngày hiện tại"}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className={cx('content-input')}>
                                                        <div className={cx('detail-name')}>
                                                            Ngày kết thúc
                                                        </div>
                                                        <input
                                                            className={cx('input-text')}
                                                            name={'recruitmentEndDate'}
                                                            type={'date'}
                                                            value={formData?.recruitmentEndDate}
                                                            onChange={handleInputChange}
                                                        />
                                                        <IsEmptyValidator
                                                            data={formData?.recruitmentEndDate}
                                                            messageIsEmpty="Ngày kết thúc không được để trống"
                                                            onValidation={(isValid) => handleValidation('recruitmentEndDateIsEmpty', isValid)}
                                                        />
                                                        <CompareValidator
                                                            type={"date"}
                                                            value1={formData?.recruitmentStartDate}
                                                            operator={"<="}
                                                            value2={formData?.recruitmentEndDate}
                                                            message={"Ngày kết thúc phải lớn hơn ngày tuyển dụng"}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className={cx('content-input')}>
                                                        <div className={cx('detail-name')}>
                                                            Lương khởi điểm
                                                        </div>
                                                        <input
                                                            placeholder={"Nhập lương VND"}
                                                            className={cx('input-text')}
                                                            name={'startSalary'}
                                                            type={'number'}
                                                            value={formData?.startSalary}
                                                            onChange={handleInputChange}
                                                            min={0}
                                                        />
                                                        <IsEmptyValidator
                                                            data={formData?.startSalary}
                                                            messageIsEmpty={"Lương khởi điểm không được để trống"}
                                                            onValidation={(isValid) => handleValidation('startSalaryIsEmpty', isValid)}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className={cx('content-input')}>
                                                        <div className={cx('detail-name')}>
                                                            Lương tối đa
                                                        </div>
                                                        <input
                                                            placeholder={"Nhập lương VND"}
                                                            className={cx('input-text')}
                                                            name={'endSalary'}
                                                            type={'number'}
                                                            value={formData?.endSalary}
                                                            onChange={handleInputChange}
                                                            min={0}
                                                        />
                                                        <IsEmptyValidator
                                                            data={formData?.startSalary}
                                                            messageIsEmpty={"Lương khởi điểm không được để trống"}
                                                            onValidation={(isValid) => handleValidation('startSalaryIsEmpty', isValid)}
                                                        />
                                                        <CompareValidator
                                                            type={"number"}
                                                            value1={formData?.startSalary}
                                                            operator={"<="} value2={formData?.endSalary}
                                                            message={"Lương tối đa không được thấp hơn lương khởi điểm"}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className={'mb-2'}>
                                                <Col>
                                                    <div className={cx('content-input')}>
                                                        <div className={cx('detail-name')}>
                                                            Kinh nghiệm
                                                        </div>
                                                        <Dropdown
                                                            data={categoryExperienceOption}
                                                            defaultValueProps={formData?.jobExperience}
                                                            onChange={(onChange) => onChangeValue("jobExperience", onChange.target.value)}
                                                        />

                                                        <IsEmptyValidator
                                                            data={formData?.jobExperience}
                                                            messageIsEmpty={"Kinh nghiệm không được để trống"}
                                                            onValidation={(isValid) => handleValidation('jobExperienceIsEmpty', isValid)}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className={cx('content-input')}>
                                                        <div className={cx('detail-name')}>
                                                            Trình độ
                                                        </div>
                                                        <Dropdown
                                                            data={categoryEducationOption}
                                                            defaultValueProps={formData?.jobEducation}
                                                            onChange={(onChange) => onChangeValue("jobEducation", onChange.target.value)}
                                                        />

                                                        <IsEmptyValidator
                                                            data={formData?.jobEducation}
                                                            messageIsEmpty={"Trình độ không được để trống"}
                                                            onValidation={(isValid) => handleValidation('jobEducationIsEmpty', isValid)}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className={cx('content-input')}>
                                                        <div className={cx('detail-name')}>
                                                            Vai trò
                                                        </div>
                                                        <Dropdown
                                                            data={categoryPositionOption}
                                                            defaultValueProps={formData?.jobPosition}
                                                            onChange={(onChange) => onChangeValue("jobPosition", onChange.target.value)}
                                                        />
                                                        <IsEmptyValidator
                                                            data={formData?.jobPosition}
                                                            messageIsEmpty={"Vai trò không được để trống"}
                                                            onValidation={(isValid) => handleValidation('jobPositionIsEmpty', isValid)}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className={cx('content-input')}>
                                                        <div className={cx('detail-name')}>
                                                            Kiểu công việc
                                                        </div>
                                                        <Dropdown
                                                            data={categoryTypeOption}
                                                            defaultValueProps={formData?.jobType}
                                                            onChange={(onChange) => onChangeValue("jobType", onChange.target.value)}
                                                        />
                                                        <IsEmptyValidator
                                                            data={formData?.jobType}
                                                            messageIsEmpty={"Kiểu công việc không được để trống"}
                                                            onValidation={(isValid) => handleValidation('jobTypeIsEmpty', isValid)}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className={'mb-2'}>
                                                <Col md={3} sm={3}>
                                                    <div className={cx('content-input')}>
                                                        <div className={cx('detail-name')}>
                                                            Yêu cầu giới tính
                                                        </div>
                                                        <Dropdown
                                                            data={categoryGenderOption}
                                                            defaultValueProps={formData?.genderRequest}
                                                            onChange={(onChange) => onChangeValue("genderRequest", onChange.target.value)}
                                                        />
                                                        <IsEmptyValidator
                                                            data={formData?.genderRequest}
                                                            messageIsEmpty={"Yêu cầu công việc không được để trống"}
                                                            onValidation={(isValid) => handleValidation('genderRequestIsEmpty', isValid)}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className={'mb-2'}>
                                                <Col>
                                                    <div className={cx('content-input')}>
                                                        <div className={cx('detail-name')}>
                                                            Mô tả về công việc
                                                        </div>
                                                        <div className={cx('text-editor')}>
                                                            <TextEditor
                                                                setContentBlog={
                                                                    (content) => onChangeValue("jobDescription", content)
                                                                }
                                                                sHidderTools={false}
                                                                isHidderTools={false}
                                                                className={cx(
                                                                    'item-text-editor',
                                                                )}
                                                                defaultValueProps={formData?.jobDescription}
                                                            />
                                                        </div>
                                                        <IsEmptyValidator
                                                            data={formData?.jobDescription}
                                                            messageIsEmpty="Mô tả công việc không được để trống"
                                                            onValidation={(isValid) => handleValidation('jobDescriptionIsEmpty', isValid)}
                                                        />
                                                        <RegexValidator
                                                            data={formData?.jobDescription}
                                                            regex={/.{12,}/}
                                                            messageRegex="Mô tả công việc có ít nhất 5 kí tự"
                                                            onValidation={(isValid) => handleValidation('jobDescriptionRegex', isValid)}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className={'mb-2'}>
                                                <Col>
                                                    <div className={cx('content-input')}>
                                                        <div className={cx('detail-name')}>
                                                            Mô tả phúc lợi
                                                        </div>
                                                        <div className={cx('text-editor')}>
                                                            <TextEditor
                                                                setContentBlog={
                                                                    (content) => onChangeValue("benefit", content)
                                                                }
                                                                sHidderTools={false}
                                                                isHidderTools={false}
                                                                className={cx(
                                                                    'item-text-editor',
                                                                )}
                                                                defaultValueProps={formData?.benefit}
                                                            />
                                                        </div>
                                                        <IsEmptyValidator
                                                            data={formData?.benefit}
                                                            messageIsEmpty="Mô tả phúc lợi không được để trống"
                                                            onValidation={(isValid) => handleValidation('benefitIsEmpty', isValid)}
                                                        />
                                                        <RegexValidator
                                                            data={formData?.benefit}
                                                            regex={/.{12,}/}
                                                            messageRegex="Mô tả phúc lợi phải có ít nhất 5 kí tự"
                                                            onValidation={(isValid) => handleValidation('benefitRegex', isValid)}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className={'mb-2'}>
                                                <Col>
                                                    <div className={cx('content-input')}>
                                                        <div className={cx('detail-name')}>
                                                            Nghành nghề
                                                        </div>
                                                        <div>
                                                            <CheckBox
                                                                objects={careers}
                                                                checked={listCareerId}
                                                                onListIdChange={handleCallbackCheckBox }
                                                            />
                                                        </div>
                                                        <IsEmptyValidator
                                                            data={listCareerId}
                                                            messageIsEmpty="Ngành nghề không được để trống"
                                                            onValidation={(isValid) => handleValidation('listCareerIdIsEmpty', isValid)}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row className={'mb-2'}>
                                                <Col sm={12} md={12}>
                                                    <div className={cx('content-input')}>
                                                        <div className={cx('detail-name')}>
                                                            Tên doanh nghiệp
                                                        </div>
                                                        <input
                                                            placeholder={"Nhập tên doanh nghiệp"}
                                                            className={cx('input-text')}
                                                            name={'company'}
                                                            type={'text'}
                                                            value={formData?.company}
                                                            onChange={handleInputChange}
                                                        />
                                                        <IsEmptyValidator
                                                            data={formData?.company}
                                                            messageIsEmpty="Tên doanh nghiệp không được để trống"
                                                            onValidation={(isValid) => handleValidation('companyIsEmpty', isValid)}
                                                        />
                                                        <RegexValidator
                                                            data={formData?.company}
                                                            regex={/.{5,}/}
                                                            messageRegex="Tên doanh nghiệp có ít nhất 5 kí tự"
                                                            onValidation={(isValid) => handleValidation('companyRegex', isValid)}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className={'mb-2'}>
                                                <Col sm={12} md={12}>
                                                    <div className={cx('content-input')}>
                                                        <div className={cx('detail-name')}>
                                                            Đường dẫn đến trang website doanh nghiệp
                                                        </div>
                                                        <input
                                                            placeholder={"Nhập đường dẫn"}
                                                            className={cx('input-text')}
                                                            name={'companyLink'}
                                                            type={'text'}
                                                            value={formData?.companyLink}
                                                            onChange={handleInputChange}
                                                        />
                                                        <IsEmptyValidator
                                                            data={formData?.companyLink}
                                                            messageIsEmpty="Đường dẫn không được để trống"
                                                            onValidation={(isValid) => handleValidation('companyLinkIsEmpty', isValid)}
                                                        />
                                                        <RegexValidator
                                                            data={formData?.companyLink}
                                                            regex={/.{5,}/}
                                                            messageRegex="Đường dẫn phải có ít nhất 5 kí tự"
                                                            onValidation={(isValid) => handleValidation('companyLinkRegex', isValid)}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className={'mb-2'}>
                                                <Col>
                                                    <div className={cx('content-input')}>
                                                        <div className={cx('detail-name')}>
                                                            Mô tả về doang nghiệp
                                                        </div>
                                                        <div className={cx('text-editor')}>
                                                            <TextEditor
                                                                setContentBlog={
                                                                    (content) => onChangeValue("companyDescription", content)
                                                                }
                                                                sHidderTools={false}
                                                                isHidderTools={false}
                                                                className={cx(
                                                                    'item-text-editor',
                                                                )}
                                                                defaultValueProps={formData?.companyDescription}
                                                            />
                                                        </div>
                                                        <IsEmptyValidator
                                                            data={formData?.companyDescription}
                                                            messageIsEmpty="Mô tả về doanh nghiệp không được để trống"
                                                            onValidation={(isValid) => handleValidation('companyDescriptionIsEmpty', isValid)}
                                                        />
                                                        <RegexValidator
                                                            data={formData?.companyDescription}
                                                            regex={/.{12,}/}
                                                            messageRegex="Mô tả về doanh nghiệp phải có ít nhất 5 kí tự"
                                                            onValidation={(isValid) => handleValidation('companyDescriptionRegex', isValid)}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className={'mb-2'}>
                                                <Col sm={12} md={12}>
                                                    <div className={cx('content-input')}>
                                                        <div className={cx('detail-name')}>
                                                            Tên người liên hệ
                                                        </div>
                                                        <input
                                                            placeholder={"Nhập tên người liên hệ"}
                                                            className={cx('input-text')}
                                                            name={'contactName'}
                                                            type={'text'}
                                                            value={formData?.contactName}
                                                            onChange={handleInputChange}
                                                        />
                                                        <IsEmptyValidator
                                                            data={formData?.contactName}
                                                            messageIsEmpty="Đường dẫn không được để trống"
                                                            onValidation={(isValid) => handleValidation('contactNameIsEmpty', isValid)}
                                                        />
                                                        <RegexValidator
                                                            data={formData?.contactName}
                                                            regex={/.{5,}/}
                                                            messageRegex="Đường dẫn phải có ít nhất 5 kí tự"
                                                            onValidation={(isValid) => handleValidation('contactNameRegex', isValid)}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className={'mb-2'}>
                                                <Col sm={12} md={12}>
                                                    <div className={cx('content-input')}>
                                                        <div className={cx('detail-name')}>
                                                            Địa chỉ liên hệ
                                                        </div>
                                                        <input
                                                            placeholder={"Nhập địa chỉ"}
                                                            className={cx('input-text')}
                                                            name={'contactAddress'}
                                                            type={'text'}
                                                            value={formData?.contactAddress}
                                                            onChange={handleInputChange}
                                                        />
                                                        <IsEmptyValidator
                                                            data={formData?.contactAddress}
                                                            messageIsEmpty="Đường dẫn không được để trống"
                                                            onValidation={(isValid) => handleValidation('contactAddressIsEmpty', isValid)}
                                                        />
                                                        <RegexValidator
                                                            data={formData?.contactAddress}
                                                            regex={/.{5,}/}
                                                            messageRegex="Đường dẫn phải có ít nhất 5 kí tự"
                                                            onValidation={(isValid) => handleValidation('contactAddressRegex', isValid)}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className={'mb-2'}>
                                                <Col sm={12} md={12}>
                                                    <div className={cx('content-input')}>
                                                        <div className={cx('detail-name')}>
                                                            Số điện thoại liên hệ
                                                        </div>
                                                        <input
                                                            placeholder={"Nhập số điện thoại"}
                                                            className={cx('input-text')}
                                                            name={'contactPhone'}
                                                            type={'text'}
                                                            value={formData?.contactPhone}
                                                            onChange={handleInputChange}
                                                        />
                                                        <IsEmptyValidator
                                                            data={formData?.contactPhone}
                                                            messageIsEmpty="Đường dẫn không được để trống"
                                                            onValidation={(isValid) => handleValidation('contactPhoneIsEmpty', isValid)}
                                                        />
                                                        <RegexValidator
                                                            data={formData?.contactPhone}
                                                            regex={/.{5,}/}
                                                            messageRegex="Đường dẫn phải có ít nhất 5 kí tự"
                                                            onValidation={(isValid) => handleValidation('contactPhoneRegex', isValid)}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className={'mb-2'}>
                                                <Col sm={12} md={12}>
                                                    <div className={cx('content-input')}>
                                                        <div className={cx('detail-name')}>
                                                            Email người liên hệ
                                                        </div>
                                                        <input
                                                            placeholder={"Nhập email người liên hệ"}
                                                            className={cx('input-text')}
                                                            name={'contactEmail'}
                                                            type={'text'}
                                                            value={formData?.contactEmail}
                                                            onChange={handleInputChange}
                                                        />
                                                        <IsEmptyValidator
                                                            data={formData?.contactEmail}
                                                            messageIsEmpty="Đường dẫn không được để trống"
                                                            onValidation={(isValid) => handleValidation('contactEmailIsEmpty', isValid)}
                                                        />
                                                        <RegexValidator
                                                            data={formData?.contactEmail}
                                                            regex={/.{5,}/}
                                                            messageRegex="Đường dẫn phải có ít nhất 5 kí tự"
                                                            onValidation={(isValid) => handleValidation('contactEmailRegex', isValid)}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className={'mb-2'}>
                                                <Col>
                                                    <div className={cx('content-input')}>
                                                        <div className={cx('detail-name')}>
                                                            Ghi chú
                                                        </div>
                                                        <div className={cx('text-editor')}>
                                                            <TextEditor
                                                                setContentBlog={
                                                                    (content) => onChangeValue("note", content)
                                                                }
                                                                sHidderTools={false}
                                                                isHidderTools={false}
                                                                className={cx(
                                                                    'item-text-editor',
                                                                )}
                                                                defaultValueProps={formData?.note}
                                                            />
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <div className={cx('submit-btn m-5')}>
                                <div className={cx('btn-right')}>
                                    <Button saveInput>Lưu nháp</Button>
                                    {/* <ModalDeleted></ModalDeleted> */}
                                    <Button type="submit" primary disabled={isSubmitDisabled()} className="ml-auto">
                                        {id ? 'Chỉnh sửa' : 'Đăng bài'}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </section>
                </div>
            </Container>
    );
}

export default RecruiterPost;
