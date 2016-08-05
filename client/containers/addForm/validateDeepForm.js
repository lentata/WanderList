const requireFields = (...names) => data =>
  names.reduce((errors, name) => {
    if (!data[name]) {
      errors[name] = 'Required'
    }
    return errors
  }, {})

const validateChild = requireFields('name', 'age')
const validateDeepForm = data => {
  const errors = {}
  if (!data.name) {
    errors.name = 'Required'
  }


  errors.children = data.children.map(validateChild)
  return errors
}

export default validateDeepForm