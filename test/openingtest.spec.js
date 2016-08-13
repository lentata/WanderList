import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';

import App from '../client/components/app';

describe('Opening Test', () => {
  it('it is always true', () => {
    expect(true).to.be.true;
  });
});

describe("<App />", ()=>{
  it('should render mock comments', ()=>{
    let wrapper = shallow(<App />);
    // console.log(wrapper);
    expect(wrapper.props()).to.not.be.undefined;
  });
});
