import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { createList } from '../actions/index';
import { Link, browserHistory, withRouter } from 'react-router';

class ListsNew extends Component {
  // static contextTypes = {
  //   router: PropTypes.object.isRequired
  // }

  onSubmit(props) {
    this.props.createList(props)
      .then(() => {
        // this.context.router.push('/');
        // this.props.router.push('/');
        browserHistory.push('/');
      })
  }

  render() {

    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <Field name="title" component={title =>
            <div>
              <input type="text" className="form-control" {...title} placeholder="title of list here" />
              {title.touched && title.error && <span>{title.error}</span>}
            </div>
          }/>
        </div>
        <div className="form-group">
          <label>Categories</label>
          <Field name="categories" component={categories =>
            <div>
              <input type="text" className="form-control" {...categories} placeholder="categories of list here" />
              {categories.touched && categories.error && <span>{categories.error}</span>}
            </div>
          }/>
        </div>
        <div className="form-group">
          <label>Content</label>
          <Field name="content" component={content =>
            <div>
              <textarea className="form-control" {...content} placeholder="content of list here" />
              {content.touched && content.error && <span>{content.error}</span>}
            </div>
          }/>
        </div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </form>




    );
  }
}

export default function validate(values) {
  const errors = {};

  if(!values.title) {
    errors.title = "Enter a title";
  }
  if(!values.categories) {
    errors.categories = "Enter categories";
  }
  if(!values.content) {
    errors.content = "Enter top list!";
  }
  return errors;
}

// module.exports = withRouter(ListsNew);

export default reduxForm({
  form: 'ListsNewForm',
  validate
}, null, { createList })(ListsNew);



// import React, { Component, PropTypes } from 'react';
// import { Field, reduxForm } from 'redux-form';
// import { createList } from '../actions/index';
// import { Link, browserHistory, withRouter } from 'react-router';
//
// class ListsNew extends Component {
//   static contextTypes = {
//     router: PropTypes.object
//   }
//
//   onSubmit(props) {
//     this.props.createList(props)
//       .then(() => {
//         // this.context.router.push('/');
//          this.props.router.push('/');
//          browserHistory.push('/');
//       })
//   }
//
//   render() {
//     const { fields: { title, categories, content }, handleSubmit } = this.props;
//
//     return (
//       <form onSubmit={ handleSubmit(this.onSubmit.bind(this))}>
//         <h3>Create a New List</h3>
//
//         <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
//           <label>Title</label>
//           <input type="text" className="form-control" { ...title } />
//           <div className="text-help">
//             { title.touched ? title.error : '' }
//           </div>
//         </div>
//
//         <div className={ `form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}` }>
//           <label>Categories</label>
//           <input type="text" className="form-control" { ...categories } />
//           <div className="text-help">
//             { categories.touched ? categories.error : '' }
//           </div>
//         </div>
//
//         <div className={ `form-group ${content.touched && content.invalid ? 'has-danger' : ''}` }>
//           <label>Content</label>
//           <textarea className="form-control" { ...content } />
//           <div className="text-help">
//             { content.touched ? content.error : '' }
//           </div>
//         </div>
//
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//         <Link to="/" className="btn btn-danger">Cancel</Link>
//       </form>
//     );
//   }
// }
//
// function validate(values) {
//   const errors = {};
//
//   if(!values.title) {
//     errors.title = "Enter a title";
//   }
//   if(!values.categories) {
//     errors.categories = "Enter categories";
//   }
//   if(!values.content) {
//     errors.content = "Enter top list!";
//   }
//
//   return errors;
// }
//
// export default reduxForm({
//   form: 'ListsNewForm',
//   fields: ['title', 'categories', 'content'],
//   validate
// }, null, { createList })(ListsNew);
