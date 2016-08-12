import React, { Component, PropTypes } from 'react';
import { reduxForm, addArrayValue } from 'redux-form';
import { Link, browserHistory } from 'react-router';
import { createList } from '../../actions/index'; //import our action creator
import PureInput from './PureInput';
import PureTextarea from './PureTextarea';
import validate from './validateDeepForm';



export const fields = [
  'title',
  'categories',
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
    console.log('PROPS TEST', props);

    this.props.createList(props)
      .then(() => {
        console.log("BEFORE REDIRECT!!!!!")
        browserHistory.push('/');
      });
  }

  render() {
    const {
      asyncValidating,
      addValue,
      fields: { title, categories, content },
      handleSubmit,
      invalid,
      submitting
    } = this.props

    return (
      <form onSubmit={ handleSubmit(this.onSubmit) }>
        <div className="form-group">
            <legend>Create a new list!</legend>

          <div className={`form-group ${title.touched && title.invalid ? 'has-error' : ''}`}>
            <label className="control-label">Title for your list*</label>
            <PureInput type="text" className="form-control" placeholder="List Title" field={title}/>
            <div className="help-block">
              {title.touched ? title.error : ''}
            </div>
            <div className="help-block">
              {asyncValidating === 'title' ? 'validating..': ''}
            </div>
          </div>

          <div>
            <label className="control-label">Categories for your list</label>
            <PureInput className="form-control" type="text" placeholder="List categories" field={categories} title={categories.error} />
          </div>
        </div>

        {!content.length && <div><label>Add some items to your list!</label></div>}

        <div className="form-group">
          {/*
          <button className="btn btn-primary btn-sm" type="button" onClick={() => {
            content.addField()    // pushes empty child field onto the end of the array
          }}><i/> Add Item
          </button>
          */}

          <button className="btn btn-primary btn-sm" type="button" onClick={() => {
            for (let childIndex = 0; childIndex < 10; childIndex++) {
              addValue('deep', 'content')
            }
          }}><i/> Show me 10!</button>

        </div>

        {content.map((child, index) => <div key={index}>
          <div className="form-group">
            <label className="control-label">List item #{index + 1}</label>
            <div>
              <PureInput className="form-control" type="text" placeholder="Title for list item" field={child.headline} />
            </div>

            <label className="control-label">Image url for list item #{index + 1}</label>
            <div>
              <PureInput className="form-control" type="text" placeholder="img URL" field={child.image} />
            </div>

            <label className="control-label">Details for list item #{index + 1}</label>
            <div>
              <PureTextarea className="form-control" type="textfield" placeholder="Describe your list item" field={child.description} />
            </div>

            <div>
              <div>
                <button className="fa fa-chevron-up btn-link" type="button" disabled={index === 0} onClick={() => {
                  content.swapFields(index, index - 1)  // swap field with it's predecessor
                }}><i/>
                </button>

                <button className="fa fa-chevron-down btn-link" type="button" disabled={index === content.length - 1} onClick={() => {
                  content.swapFields(index, index + 1)  // swap field with it's successor
                }}><i/>
                </button>
              </div>

              <button className="btn btn-danger btn-sm" type="button" onClick={() => {
                content.removeField(index)  // remove from index
              }}><i/> Remove
              </button>
            </div>

          </div>
        </div>)}

        <div>
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
}

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
  addValue: addArrayValue, createList // mapDispatchToProps (will bind action creator to dispatch)
})(DeepForm)
