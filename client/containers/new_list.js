import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { createList } from '../actions/index';
import { Link, browserHistory, withRouter } from 'react-router';

class ListsNew extends Component {

  onSubmit(props) {
    this.props.createList(props)
      .then(() => {
        browserHistory.push('/');
      });
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

export default reduxForm({
  form: 'ListsNewForm',
  validate
}, null, { createList })(ListsNew);
