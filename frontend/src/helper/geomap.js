const DATA_COUNTRY = require('../data/VN.json');

export const getAllProvinces = () => {
    return DATA_COUNTRY.province;
};

export const getAllDistricts = (id_district) => {
    return DATA_COUNTRY.district.filter(
        (district) => district.idProvince === id_district,
    );
};

export const getAllCommunes = (id_district) => {
    return DATA_COUNTRY.commune.filter(
        (commune) => commune.idDistrict === id_district,
    );
};

export const getProvince = (id_province) => {
    return (
        DATA_COUNTRY.province.find((item) => item.idProvince === id_province)
            ?.name || ''
    );
};

export const getDistrict = (id_district) => {
    return (
        DATA_COUNTRY.district.find((item) => item.idDistrict === id_district)
            ?.name || ''
    );
};
export const getCommune = (id_commune) => {
    return (
        DATA_COUNTRY.commune.find((item) => item.idCommune === id_commune)
            ?.name || ''
    );
};
export const getIDProvinceByName = (name) => {
    return (
        DATA_COUNTRY.province.find((item) => item.name === name)?.idProvince ||
        ''
    );
};
export const getIDDistrictByName = (name) => {
    return (
        DATA_COUNTRY.district.find((item) => item.name === name)?.idDistrict ||
        ''
    );
};

export const getIDWardByName = (name) => {
    return (
        DATA_COUNTRY.commune.find((item) => item.name === name)?.idCommune || ''
    );
};


export function fillMultipleStepInfo(stepInfo, initialValues, setValues) {
    let _values = { ...initialValues }
    Object.keys(stepInfo).forEach((prop) => {
      if (stepInfo[prop] === undefined || stepInfo[prop] === null || stepInfo[prop] === '') {
        _values[prop] = initialValues[prop]
      } else {
        _values[prop] = stepInfo[prop]
      }
    })
    setValues(_values)
    return _values
  }
  