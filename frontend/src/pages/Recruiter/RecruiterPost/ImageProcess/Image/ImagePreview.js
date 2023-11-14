import React, { useState, useEffect } from 'react';
import './imagePreview.css';
import { useRef } from 'react';
import { getValue } from '@testing-library/user-event/dist/utils';

function ImagePreview({ callback, setValue, title, value }) {
  const [imagePreview, setImagePreview] = useState(setValue || null);
  const inputRef = useRef(null);

  useEffect(() => {
    // If a URL is provided, set the image preview
    setImagePreview(setValue || null);
  }, [setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // Check if the image file exists
        if (e.target.result) {
          setImagePreview(e.target.result);
          callback(file);
        } else {
          console.error('Error reading image file.');
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const clear = () => {
    setImagePreview(null);
    setValue=null;
    value(setValue);
    inputRef.current.value = '';
    callback(null);
  };

  return (
      <div>
        <div className="image-preview-container">
          {title && (
              <h2>{title}</h2>
          )}

          <label htmlFor="file-input" className="custom-upload-button">
            {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                </div>
            )}
            Chọn tệp
          </label>
          <input
              type="file"
              id="file-input"
              className="input-file"
              accept="image/*, application/pdf"
              onChange={handleImageChange}
              ref={inputRef}
          />
          <br />
          {imagePreview && (
              <button onClick={clear} className="clear-button">
                Xóa tệp
              </button>
          )}
        </div>
      </div>
  );
}

export default ImagePreview;
