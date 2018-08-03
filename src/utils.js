const typeToFormErrors = err => {
  const errors = {};
  err.inner.forEach(item => {
    if (!errors[item.path]) {
      errors[item.path] = item.message;
    }
  });
  return errors;
};

export const checkValidation = err => Object.keys(err).length === 0;

export const runValidation = (schema, values) => (
  new Promise(resolve => {
    schema.validate(values, { abortEarly: false }).then(() => {
      resolve({});
    }, err => {
      resolve(typeToFormErrors(err));
    });
  })
);
