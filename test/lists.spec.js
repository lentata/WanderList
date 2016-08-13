import React from 'react';
import { connect, Provider } from 'react-redux';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';
import { readFileSync } from 'fs';
import { join } from 'path';
import jsdom from 'jsdom';

import { Lists } from '../client/containers/lists';
import reducers from '../client/reducers/index';

var rawJson = JSON.parse(readFileSync(join(__dirname, '../public/dummy.JSON'), 'utf8'));

var dummyList = rawJson.lists[0];

console.log("dummy listtt", dummyList);

describe('Lists Container', function() {
  let wrapper = mount(
    <Lists list={dummyList} i={4} upvote={() => true} downvote={() => true} />
  );

  it('should have props', function() {
    sinon.spy(someUpvoteFunction)
    // console.log('WRAPPER', wrapper);
    expect(wrapper.props()).to.be.defined;
  });

  it('should have an upvote function', function() {
    console.log('this is a proppsps', wrapper.props());
    expect(wrapper.props().upvote).to.be.a.Function;
  });

  it('should have an downvote function', function() {
    expect(wrapper.props().downvote).to.be.a.Function;
  });

});
