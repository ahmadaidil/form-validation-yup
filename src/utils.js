const validateTypeSchema = (schema, values) => {
  let validateData = {};
  for (let value in values) {
    if (values.hasOwnProperty(value)) {
      const key = String(value)
      validateData[key] = values !== '' ? values[key] : undefined
    }
  };
  return schema.validate(validateData, { abortEarly: false });
}

const typeToFormErrors = err => {
  let errors = {};
  err.inner.forEach(item => {
    if (!errors[item.path]) {
      errors[item.path] = item.message;
    }
  });
  return errors;
};

export const checkValid = error => Object.keys(error).length === 0;

export const runValidation = (schema, values) => (
  new Promise(resolve => {
    validateTypeSchema(schema, values).then(() => {
      resolve({});
    }, err => {
      resolve(typeToFormErrors(err));
    })
  })
);
