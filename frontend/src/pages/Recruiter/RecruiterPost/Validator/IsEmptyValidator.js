import React from 'react';

function IsEmptyValidator({ data = '', messageIsEmpty = '', onValidation }) {
    let isValid = true;

    if (typeof data === 'string') {
        // Trim the string
        data = data.trim();

        // Check if the trimmed string is empty
        if (!data) {
            isValid = false;
        }
    } else if (typeof data === 'number') {
        // Check if the number is zero
        if (data === 0) {
            isValid = false;
        }
    } else if (Array.isArray(data)) {
        // Check if the array is empty
        if (data.length === 0) {
            isValid = false;
        }
    } else {
        isValid = false; // Set isValid to false if data is neither string nor number nor array
    }

    onValidation(isValid);

    return (
        <div>
            {!isValid && (
                <div>
                    <p style={{ color: 'red' }}>{messageIsEmpty}</p>
                </div>
            )}
        </div>
    );
}

export default IsEmptyValidator;
