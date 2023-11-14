import React from 'react';

function RegexValidator({ data = '', regex = /.{5,}/, messageRegex = '', onValidation }) {
    let isValid= true;
    if (data){
        isValid = regex.test(data.toString().trim());
    }
    onValidation(isValid);
    return (
        <div>
            {!isValid && (
                <div>
                    <p style={{ color: 'red' }}>{messageRegex}</p>
                </div>
            )}
        </div>
    );
}

export default RegexValidator;
