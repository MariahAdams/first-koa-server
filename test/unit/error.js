
const getErrors = (validation, numberExpected) => {
  expect(validation).toBeDefined();
  const errors = validation.errors;
  expect(Object.keys(errors).length).toEqual(numberExpected);
  return errors;
};

module.exports = getErrors;