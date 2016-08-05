import React, { Component, PropTypes } from 'react'
import { reduxForm, addArrayValue } from 'redux-form'
import Address from './Address'
import PureInput from './PureInput'
import validate from './validateDeepForm'
export const fields = [
  'name',
  'shipping.street',
  'shipping.city',
  'shipping.phones[]',
  'billing.street',
  'billing.city',
  'billing.phones[]',
  'children[].name',
  'children[].age',
  'children[].awards[]'
]

class DeepForm extends Component {
  render() {
    const {
      addValue,
      fields: { name, shipping, billing, children },
      handleSubmit,
      resetForm,
      invalid,
      submitting
    } = this.props
    return (<form onSubmit={handleSubmit}>
        <div>
          <button type="button" onClick={() => {
            for (let childIndex = 0; childIndex < 30; childIndex++) {
              addValue('deep', 'children')
              for (let awardIndex = 0; awardIndex < 10; awardIndex++) {
                addValue('deep', `children[${childIndex}].awards`)
              }
            }
          }}><i/> Make Form Enormous!</button>
        </div>
        <div>
          <label>Name</label>
          <div>
            <PureInput type="text" placeholder="Name" field={name} title={name.error}/>
          </div>
        </div>
        <div>
          <fieldset>
            <legend>Shipping</legend>
            <Address {...shipping}/>
          </fieldset>
          <fieldset>
            <legend>Billing</legend>
            <Address {...billing}/>
          </fieldset>
        </div>
        <div>
          <button type="button" onClick={() => {
            children.addField()    // pushes empty child field onto the end of the array
          }}><i/> Add Child
          </button>
          <button type="button" onClick={() => {
            children.addField({     // pushes child field with initial values onto the end of the array
              name: 'Bobby Tables',
              age: 13,
              awards: [ 'Input Sanitation', 'Best XKCD Meme' ]
            })
          }}><i/> Add Bobby
          </button>
        </div>
        {!children.length && <div>No Children</div>}
        {children.map((child, index) => <div key={index}>
          <div>
            <label>Child #{index + 1}</label>
            <div>
              <PureInput type="text" placeholder="Child Name" field={child.name}/>
            </div>
            <div>
              <PureInput type="text" placeholder="Child Age" field={child.age}/>
            </div>
            <div>
              <button type="button" onClick={() => {
                child.awards.addField()  // pushes empty award field onto the end of the array
              }}><i/> Add Award
              </button>
              <div>
                <button type="button" disabled={index === 0} onClick={() => {
                  children.swapFields(index, index - 1)  // swap field with it's predecessor
                }}><i/>
                </button>
                <button type="button" disabled={index === children.length - 1} onClick={() => {
                  children.swapFields(index, index + 1)  // swap field with it's successor
                }}><i/>
                </button>
              </div>
              <button type="button" onClick={() => {
                children.removeField(index)  // remove from index
              }}><i/> Remove
              </button>
            </div>
          </div>
          {child.awards.map((award, awardIndex) => <div key={awardIndex}>
            <div>
              <label>Award #{awardIndex + 1}</label>
              <div>
                <PureInput type="text" placeholder="Award" field={award}/>
              </div>
              <div>
                <button type="button" onClick={() => {
                  child.awards.removeField(awardIndex) // remove from awardIndex
                }}><i/></button>
              </div>
            </div>
          </div>)}
        </div>)}
        <div>
          <button type="submit" disabled={submitting || invalid}>
            {submitting ? <i/> : <i/>} Submit
          </button>
          <button type="button" disabled={submitting} onClick={resetForm}>
            Clear Values
          </button>
        </div>
      </form>
    )
  }
}

DeepForm.propTypes = {
  addValue: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'deep',
  fields,
  validate
}, undefined, {
  addValue: addArrayValue // mapDispatchToProps (will bind action creator to dispatch)
})(DeepForm)