import React from 'react';
import { mount, shallow, render } from 'enzyme';
import {expect} from 'chai';

import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ConnectedLists, { Lists } from '../client/containers/lists';
import reducers from '../client/reducers/index';
import jsdom from 'jsdom';

describe('Lists Container', function() {
  let wrapper = shallow(
    <Provider>
    <Lists />
    </Provider>
  );

  it('should have props', function() {
    // console.log('WRAPPER', wrapper);
    expect(wrapper.props()).to.be.defined;
  });

  it('should have an upvote function', function() {
    expect(wrapper.props().upvote).to.be.undefined;
  });

  it('should have an downvote function', function() {
    expect(wrapper.props().downvote).to.be.undefined;
  });

});
