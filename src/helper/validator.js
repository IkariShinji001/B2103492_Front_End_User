class Validator {
  isNotQualified(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return value === null || value === undefined || value === "";
  }

  checkSelectedFields(payload, fieldsToCheck) {
    const keysWithNotQualified  = [];

    fieldsToCheck.forEach(field => {
      if (payload.hasOwnProperty(field) && this.isNotQualified(payload[field])) {
        keysWithNotQualified.push(field);
      }
    });

    if (keysWithNotQualified.length > 0) {
      console.error(`Tìm thấy giá trị null, undefined, hoặc chuỗi rỗng tại các trường: ${keysWithNotQualified.join(', ')}`);
      return false;
    }

    return true;
  }
}

export default new Validator()
