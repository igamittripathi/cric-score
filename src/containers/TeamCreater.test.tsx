import React,{ useState as useStateMock } from "react";
import { shallow, mount } from "enzyme";
import configureStore from "redux-mock-store";
import { TeamCreater } from './TeamCreater';
import { Team } from '../components'
import reactMock from "react";

import { useSelector as originalUseSelector, useDispatch as originalUseDispatch, Provider } from "react-redux";
import { RootState } from "../reducers";
import { CircularProgress } from "@material-ui/core";
import { initialState } from "../constants";

const useSelector = (state: any) => originalUseSelector(state);
const useDispatch = () => originalUseDispatch();

const ReactReduxHooks = { useSelector, useDispatch };

const setHookState = (newState: {}) => jest.fn().mockImplementation((state: {}) => [
  newState,
  (newState: {}) => { }
])

describe("TeamCreater", () => {
  let wrapper:any;
  let useEffect:any;
  let store:any;
  let initialStore = initialState;

  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState')
  
  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f: Function) => f());
  };
  beforeEach(() => {
    /* mocking store */
    store = configureStore()(initialStore);
    useEffect = jest.spyOn(React, "useEffect");

    const useStateMock: any = (initState: any) => [initState, setState];

    mockUseEffect();
    mockUseEffect();

    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation(state => store.getState());

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);
      wrapper = shallow(<Provider store={store}><TeamCreater /></Provider>);
  });

  describe("on start", () => {

    test('should render Component correctly', () => {
      wrapper.setProps({teams:initialStore});
      console.log(wrapper);
      //expect( wrapper.state('teams')).toEqual(initialStore)
    });

    test("should render CircularProgress if teams is empty", () => {
       //expect(wrapper.find(CircularProgress).exists()).toEqual(false);
    });

  });

});