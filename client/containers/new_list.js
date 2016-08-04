import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createList } from '../actions/index';
import { Link, browserHistory} from 'react-router';

class ListsNew extends Component {

  onSubmit(props) {
    console.log('PROPS TEST', props);

    var list = {
      title: props.title,
      author: 'somebody baaaad',
      upvote: '0',
      downvote: '0',
      categories: [props.categories],
      id: '6',
      content: [
        {headline: props.headline1,
         img: props.image1,
         desc: props.description1
        }
      ],
      comments: [
        {
          user: '',
          upvote: 0,
          downvote: 0,
          text: ''
        }
      ]
    };

    id++;

    console.log('LIST TEST', list);

    this.props.createList(list)
      .then(() => {
        console.log('did this even run, bro?!');
        // this.context.router.push('/');
        //  this.props.router.push('/');
         browserHistory.push('/');
      })
  }

  // ,headline2, image2, description2,
  // headline3, image3, description3,
  // headline4, image4, description4,
  // headline5, image5, description5,
  // headline6, image6, description6,
  // headline7, image7, description7,
  // headline8, image8, description8,
  // headline9, image9, description9,
  // headline10, image10, description10

  render() {
    const { asyncValidating, fields: { title, categories,
      headline1, image1, description1 }, handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a New List</h3>

        <div className={`form-group ${title.touched && title.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Title*</label>
          <input type="text" className="form-control" {...title} />
          <div className="help-block">
            {title.touched ? title.error : ''}
          </div>
          <div className="help-block">
            {asyncValidating === 'title'? 'validating..': ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Categories*</label>
          <input type="text" className="form-control" {...categories} />
          <div className="help-block">
            {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${headline1.touched && headline1.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Headline 1*</label>
          <input type="text" className="form-control" {...headline1} />
          <div className="help-block">
            {headline1.touched ? headline1.error : ''}
          </div>
        </div>

        <div className={`form-group ${image1.touched && image1.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Image 1 URL*</label>
          <input type="text" className="form-control" {...image1} />
          <div className="help-block">
            {image1.touched ? image1.error : ''}
          </div>
        </div>

        <div className={`form-group ${description1.touched && description1.invalid ? 'has-error' : ''}`}>
          <label className="control-label">Description 1*</label>
          <textarea className="form-control" {...description1} />
          <div className="help-block">
            {description1.touched ? description1.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary"  disabled={submitting} >Submit</button>
        <Link to="/" className="btn btn-error">Cancel</Link>
      </form>
    );
  }
}

//merge
//Client side validation
function validate(values) {
  const errors = {};

  if (!values.title || values.title.trim() === '') {
    errors.title = 'Enter a Title';
  }
  if (!values.categories || values.categories.trim() === '') {
    errors.categories = 'Enter categories';
  }
  if (!values.headline1 || values.headline1.trim() === '') {
    errors.headline1 = 'Enter some content';
  }
  if (!values.image1 || values.image1.trim() === '') {
    errors.image1 = 'Enter some content';
  }
  if (!values.description1 || values.description1.trim() === '') {
    errors.description1 = 'Enter some content';
  }

  return errors;
}

// ,'headline2', 'image2', 'description2',
// 'headline3', 'image3', 'description3',
// 'headline4', 'image4', 'description4',
// 'headline5', 'image5', 'description5',
// 'headline6', 'image6', 'description6',
// 'headline7', 'image7', 'description7',
// 'headline8', 'image8', 'description8',
// 'headline9', 'image9', 'description9',
// 'headline10', 'image10', 'description10'

export default reduxForm({
  form: 'ListsNewForm',
  fields: ['title', 'categories', 'headline1', 'image1', 'description1'],
  validate
}, null, { createList })(ListsNew);
