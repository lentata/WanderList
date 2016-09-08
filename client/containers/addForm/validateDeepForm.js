const requireFields = (...names) => data =>
  names.reduce((errors, name) => {
    if (!data[name]) {
      errors[name] = 'Required'
    }
    return errors;
  }, {})

const validateDeepForm = data => {
  const errors = {};

  if (!data.title || data.title.trim() === '') {
    errors.title = 'Enter a Header for Your List';
  }

  if (!data.categories || data.categories.trim() === '') {
    errors.categories = 'Enter Categories for Your List';
  }

  return errors;
}

export default validateDeepForm
