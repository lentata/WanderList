import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme'; 
import { connect } from 'react-redux';
import { Provider } from 'react-redux';

import { ListGrid} from '../client/containers/ListGrid';


describe('<ListGrid />', () => {
    it('should render the brand', () => {
    expect (
      shallow(
        <Provider>
          <ListGrid />
        </Provider>
        ).length

      ).to.equal(1); 
  });

});

