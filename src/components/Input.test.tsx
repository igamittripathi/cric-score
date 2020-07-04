import * as React from 'react';
import { Input } from './Input';
import { shallow } from "enzyme";
import { createShallow } from '@material-ui/core/test-utils';
import { act } from 'react-dom/test-utils';

describe("Input", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Input />);
    });

    test("Input should render properly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("allows us to set props", () => {
        expect(wrapper.props().value).toBeUndefined();
        wrapper.setProps({ value: 'india' });
        expect(wrapper.props().value).toEqual('india');
    });

    test('allows us to onChange events', () => {
        const onChange = jest.fn();
        wrapper = createShallow()(<div> <Input error={false} required={true} onChange={onChange}/></div>);
        act(() => {
            wrapper.find(Input).simulate('change', { target: { value: 'James' } });
        });
        wrapper.update();
        expect(wrapper.find(Input).at(0).props().error).toBeFalsy();
    });

});