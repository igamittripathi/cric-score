import * as React from 'react';
import { Dropdwon } from './Dropdown';
import { shallow, mount } from "enzyme";
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { BowlResults } from '../constants';


describe("Dropdwon", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<Dropdwon options={BowlResults} value={0} />);
    });

    test("Cricle should render properly", () => {
        wrapper = shallow(<Dropdwon />);
        expect(wrapper).toMatchSnapshot();
    });

    test("Dropdwon should render FormControl", () => {
        expect(wrapper.find(FormControl)).toHaveLength(1);
    });

    test("Dropdwon should render InputLabel", () => {
        expect(wrapper.find(InputLabel)).toHaveLength(1);
    });

    test("Dropdwon should render Select", () => {
        expect(wrapper.find(Select)).toHaveLength(1);
    });

    test("Dropdwon should render MenuItem", () => {
        expect(wrapper.find(MenuItem)).toBeDefined();
    });

    test("allows us to set props", () => {
        expect(wrapper.props().value).not.toEqual(1);
        wrapper.setProps({ value: 6 });
        expect(wrapper.props().value).toEqual(6);
    });

});