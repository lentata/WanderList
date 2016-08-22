import React, { Component, PropTypes } from 'react';
import { reduxForm, addArrayValue } from 'redux-form';
import { Link, browserHistory } from 'react-router';
import { createList } from '../../actions/index'; //import our action creator
import PureInput from './PureInput';
import PureTextarea from './PureTextarea';
import validate from './validateDeepForm';
import Nav from '../../components/nav';


export const fields = [
  'title',
  'categories',
  'itemTitle',
  'itemImage',
  'itemDescription',
  'content[].headline',
  'content[].image',
  'content[].description'
]

export class DeepForm extends Component {

  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(props) {
    const firstListItem = {
      headline: props.itemTitle,
      image: props.itemImage,
      description: props.itemDescription
    };

    // Make categories distinct strings
    var tempCategories = props.categories.split(",");
    var finalCategories = [];
    for(var i = 0; i < tempCategories.length; i++) {
      finalCategories.push(tempCategories[i].trim())
    }
    props.categories = finalCategories;

    delete props.itemTitle;
    delete props.itemImage;
    delete props.itemDescription;

    props.content.unshift(firstListItem);
    props.authorId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;

    const author = firebase.auth().currentUser ? firebase.auth().currentUser.displayName : null;

    if(props.authorId) {
      this.props.createList(props);
      browserHistory.push('/');
    } else {
      alert("You must log in to post a list!")
    }
  }

  render() {
    const {
      asyncValidating,
      addValue,
      fields: { title, categories, itemTitle, itemImage, itemDescription, content },
      handleSubmit,
      invalid,
      submitting
    } = this.props

    var divStyle = {
      color: 'red',
    };

    if(localStorage.getItem('logged')) {
      return (
        <form className="container" onSubmit={ handleSubmit(this.onSubmit) }>
        <Nav />
          <div className="form-group add-list">
            <legend>Create your headline and categories!</legend>

            <div className={`form-group ${title.touched && title.invalid ? 'has-error' : ''}`}>
              <label className="control-label"><span style={divStyle}>*</span> List Headline</label>
              <PureInput type="text" className="form-control" placeholder="e.g. Next 5 Places Hamburglar Will Strike Again!" field={title}/>
              <div className="help-block">
                {title.touched ? title.error : ''}
              </div>
              <div className="help-block">
                {asyncValidating === 'title' ? 'validating..': ''}
              </div>
            </div>

            <div className={`form-group ${categories.touched && categories.invalid ? 'has-error' : ''}`}>
              <label className="control-label"><span style={divStyle}>*</span> Relevant Categories</label>
              <PureInput type="text" className="form-control" placeholder="e.g. hamburglar, funny, food, cities" field={categories}/>
              <div className="help-block">
                {categories.touched ? categories.error : ''}
              </div>
              <div className="help-block">
                {asyncValidating === 'categories' ? 'validating..': ''}
              </div>
            </div>

            <div className="form-group">
              <legend>Add some items to your list!</legend>
              <label className="control-label"><span style={divStyle}>*</span> Title for list item #1</label>
              <div>
                <PureInput className="form-control" type="text" placeholder="e.g. Ronald's house" field={itemTitle} required/>
              </div>
            </div>

            <div className="form-group">
              <label className="control-label"><span style={divStyle}>*</span> Image URL for list item #1</label>
              <div>
                <PureInput className="form-control" type="url" placeholder="e.g. http://www.ktvz.com/image/view/-/35908550/medRes/3/-/maxh/360/maxw/640/-/11prq7p/-/Ronald-McDonald-jpg.jpg" field={itemImage} pattern="https?:\/\/.+\.(gif|jpg|jpeg|tiff|png|GIF|JPG|JPEG|TIFF|PNG)" required/>
              </div>
            </div>

            <div className="form-group">
              <label className="control-label"> Details for list item #1</label>
              <div>
                <PureTextarea className="form-control" type="textfield" placeholder="e.g. No, we're not talking about the foundation. We're talking about where Ronald lives. You know Hamburglar loves robbing his pals, especially Ronald." field={itemDescription}/>
              </div>
            </div>

          </div>

          {!content.length && <div><label>Nice start, now add some more list items!</label></div>}

          <div className="form-group">
              <button className="btn btn-primary btn-sm" type="button" onClick={() => {
                  for (let childIndex = 1; childIndex < 5; childIndex++) {
                    addValue('deep', 'content')
                  }
                }}><i/>Add 4 more!</button>

              </div>

              {content.map((child, index) => <div key={index}>
              <div className="form-group">
                <label className="control-label"><span style={divStyle}>*</span> List item #{index+ 2}</label>
                <div>
                  <PureInput className="form-control" type="text" placeholder="Title for list item" field={child.headline} required/>
                </div>
              </div>

              <div className="form-group">
                <label className="control-label"><span style={divStyle}>*</span> Image url for list item #{index + 2}</label>
                <div>
                  <PureInput className="form-control" type="url" placeholder="URL for image. Use gif, jpg, jpeg, tiff, or png." field={child.image} pattern="https?:\/\/.+\.(gif|jpg|jpeg|tiff|png|GIF|JPG|JPEG|TIFF|PNG)" required/>
                </div>
              </div>

              <div className="form-group">
                <label className="control-label"> Details for list item #{index + 2}</label>
                <div>
                  <PureTextarea className="form-control" type="textfield" placeholder="Describe your list item" field={child.description}/>
                </div>
              </div>

                <div className="form-group">
                  <button className="fa fa-chevron-up btn-link" type="button" disabled={index === 0} onClick={() => {
                      content.swapFields(index, index - 1)  // swap field with it's predecessor
                    }}><i/>
                  </button>

                  <button className="fa fa-chevron-down btn-link" type="button" disabled={index === content.length - 1} onClick={() => {
                      content.swapFields(index, index + 1)  // swap field with it's successor
                    }}><i/>
                  </button>
                  <button className="btn btn-danger btn-sm" type="button" onClick={() => {
                      content.removeField(index)  // remove from index
                    }}><i/> Remove #{index + 2}
                  </button>
                </div>
            </div>, this)}

            <div className="form-group">
              <button className="btn btn-primary btn-sm" type="button" onClick={() => {
                  content.addField()    // pushes empty child field onto the end of the array
                }}><i/> Add Item
              </button>

              <legend className="list-legend">List done, time to submit!</legend>
              <button className="btn btn-success" type="submit" disabled={submitting || invalid}>
                {submitting ? <i/> : <i/>} Submit
              </button>
              <Link to="/" className="btn btn-error">Cancel</Link>
            </div>
          </form>

        )
    }

  } //closes render
} //closes class

DeepForm.propTypes = {
  addValue: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'deep',
  fields,
  validate
}, undefined, {
  addValue: addArrayValue, createList
})(DeepForm)
