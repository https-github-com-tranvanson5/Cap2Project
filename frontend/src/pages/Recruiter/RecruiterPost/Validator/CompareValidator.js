import React from 'react';

function CompareValidator({ value1, value2, operator, type, message }) {
  let isInvalid = false;
  if(value1 ==null || value2 ==null) {
    return ;
  }
  
  // Convert the values to numbers if they are provided as strings
  if (type=="number") {
    value1 = parseFloat(value1);
    value2 = parseFloat(value2);
  }
  if (type=="date") {
    value1 = new Date(Date.parse(value1));
    value2 =new Date(Date.parse(value2));
  }

  switch (operator) {
    case '==':
      isInvalid = value1 !== value2;
      break;
    case '!=':
      isInvalid = value1 === value2;
      break;
    case '<':
      isInvalid = value1 >= value2;
      break;
    case '<=':
      isInvalid = value1 > value2;
      break;
    case '>':
      isInvalid = value1 <= value2;
      break;
    case '>=':
      isInvalid = value1 < value2;
      break;
    default:
      break;
  }

  if (isInvalid) {
    return (
      <div>
        <p style={{ color: 'red' }}>{message}</p>
      </div>
    );
  } else {
    return null;
  }
}

export default CompareValidator;
