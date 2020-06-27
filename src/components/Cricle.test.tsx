import * as React from 'react';
import { Cricle } from './Cricle';
import { shallow, mount } from "enzyme";
import { Avatar } from '@material-ui/core';


describe("Cricle", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<Cricle result={0} />);
    })


    test("Cricle should render properly", () => {
        wrapper = shallow(<Cricle/>);
        expect(wrapper).toMatchSnapshot();
    });

    test("Cricle should render Avatar", () => {
        expect(wrapper.find(Avatar)).toHaveLength(1);
    });

    test("allows us to set props", () => {
        expect(wrapper.props().result).toEqual(0);
        wrapper.setProps({ result: 6 });
        expect(wrapper.props().result).toEqual(6);
    });

});