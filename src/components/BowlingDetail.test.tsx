import * as React from 'react';
import { BowlingDetail } from './BowlingDetail';
import { shallow, mount } from "enzyme";
import { initialState } from '../constants'
import { TableHead, TableBody } from '@material-ui/core';


describe("BowlingDetail", () => {
    const team = initialState.team_a;
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<BowlingDetail  {...team} />);
    })


    test("BowlingDetail should render properly", () => {
        wrapper = shallow(<BowlingDetail  {...team} />);
        expect(wrapper).toMatchSnapshot();
    });

    test("BowlingDetail should render TableHead", () => {
        expect(wrapper.find(TableHead)).toHaveLength(1);
    });

    test("BowlingDetail should render TableBody", () => {
        expect(wrapper.find(TableBody)).toHaveLength(1);
    });

    test("allows us to set props", () => {
        expect(wrapper.props().noBowls).toBeUndefined();
        wrapper.setProps({ noBowls: 5 });
        expect(wrapper.props().noBowls).toEqual(5);
    });
});
