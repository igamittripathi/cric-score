import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  let wrapper:any;
  beforeEach(()=>{
    wrapper = shallow(<App/>);
  })
  
  test('should render Component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('renders the div',()=>{
    expect(wrapper.find('div').hasClass('App')).toEqual(true);
  });
});