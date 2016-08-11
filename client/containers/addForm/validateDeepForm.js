const requireFields = (...names) => data =>
  names.reduce((errors, name) => {
    if (!data[name]) {
      errors[name] = 'Required'
    }
    return errors
  }, {})

// const validateChild = requireFields('title', 'image', 'content')
const validateDeepForm = data => {
  const errors = {}

  if (!data.title || data.title.trim() === '') {
    errors.title = 'Enter a Header for Your List';
  }
  //DON'T DELETE COMMENTS BELOW FOR NOW
  // if (!data.ListHeader) {
  //   errors.ListHeader = 'Required'
  // }

  // if (!data.categories) {
  //   errors.categories = 'Required'
  // }

  // errors.children = data.children.map(validateChild)

  return errors
}

export default validateDeepForm
