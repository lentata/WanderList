import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import App from '../client/components/app';

describe('Opening Test', () => {
  it('it is always true', () => {
    expect(true).to.be.true;
  });
});

describe('App Component', function() {
  it('should have props', function() {
    const wrapper = shallow(<App/>);
    expect(wrapper.props()).to.be.defined;
  });
});
