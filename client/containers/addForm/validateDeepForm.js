const requireFields = (...names) => data =>
  names.reduce((errors, name) => {
    if (!data[name]) {
      errors[name] = 'Required'
    }
    return errors
  }, {})

const validateChild = requireFields('ListHeader', 'age')
const validateDeepForm = data => {
  const errors = {}
  if (!data.ListHeader) {
    errors.ListHeader = 'Required'
  }


  errors.children = data.children.map(validateChild)
  return errors
}

export default validateDeepForm
