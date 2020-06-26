import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  let wrapped;
  beforeEach(()=>{
    wrapped = shallow(<App/>);
  })
  
  test('should render Component correctly', () => {   
    expect(wrapped).toMatchSnapshot();
  });

  test('renders the div',()=>{
    expect(wrapped.find('div').hasClass('App')).toEqual(true);
  });
});