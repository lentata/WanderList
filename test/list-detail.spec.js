import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme'; 
import { connect } from 'react-redux';
import { Provider } from 'react-redux';


import { ListDetail } from '../client/containers/list-detail';



describe('<ListDetail />', () => {
    it('should render the List Detail', () => {
      let wrapper = shallow(<Provider><ListDetail /></Provider>);
      expect (wrapper.length).to.equal(1); 
  });

});
