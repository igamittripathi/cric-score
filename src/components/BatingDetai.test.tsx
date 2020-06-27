import * as React from 'react';
import { BatingDetail } from './BatingDetail';
import { shallow, mount } from "enzyme";
import { initialState } from '../constants'
import { TableHead, TableBody } from '@material-ui/core';


describe("BatingDetail", () => {
    const team = initialState.team_a;
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<BatingDetail  {...team} />);
    })


    test("BatingDetail should render properly", () => {
        wrapper = shallow(<BatingDetail  {...team} />);
        expect(wrapper).toMatchSnapshot();
    });

    test("BatingDetail should render TableHead", () => {
        expect(wrapper.find(TableHead)).toHaveLength(1);
    });

    test("BatingDetail should render TableBody", () => {
        expect(wrapper.find(TableBody)).toHaveLength(1);
    });

    test("allows us to set props", () => {
        expect(wrapper.props().name).toEqual('India');
        wrapper.setProps({ name: 'England' });
        expect(wrapper.props().name).toEqual('England');
    });
});
