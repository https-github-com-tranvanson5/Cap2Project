import React, { useState } from 'react';
import './FilePreview.css';
import { useRef } from 'react';
function FilePreview({ callback }) {
    // Sử dụng useState để tạo state cho "data"
    const [imagePreview, setImagePreview] = useState(null);
    const clearImg = null;
    const inputRef = useRef(null); // import useRef from react

    // Hàm này được gọi khi người dùng chọn một tệp hình ảnh
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = URL.createObjectURL(file);

            // Đọc dữ liệu từ tệp hình ảnh và cập nhật state "data" và "imagePreview"
            setImagePreview(reader);

            console.log(file);

            // Gọi callback function với dữ liệu hình ảnh
            callback(file);
        }
    };
    const clear = () => {
        // Xóa hình ảnh bằng cách đặt giá trị trạng thái của nó thành null
        setImagePreview(clearImg);
        inputRef.current.value = '';
        console.log(setImagePreview(clearImg));

        // Call the callback function to notify that the image has been cleared
        callback(setImagePreview(clearImg));
    };

    return (
        <div>
            <div className="image-preview-container">
                <h2>Image Preview</h2>

                <label htmlFor="file-input" className="custom-upload-button">
                    <div>
                        {imagePreview}
                    </div>
                    Chọn tệp
                </label>
                <input
                    type="file"
                    id="file-input"
                    className="input-file"
                    accept="image/ , application/pdf*"
                    onChange={handleImageChange}
                    ref={inputRef}
                />
                <br></br>
                {imagePreview && (
                    <button onClick={clear} className="clear-button">
                        Xóa tệp
                    </button>
                )}
            </div>
        </div>
    );
}

export default FilePreview;
