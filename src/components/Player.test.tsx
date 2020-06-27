import * as React from 'react';
import { Player } from './Player';
import { shallow, mount } from "enzyme";
import { PlayerTypes } from '../constants';
import { Dropdwon } from './Dropdown';
import { Textbox } from './Textbox';
import { act } from 'react-dom/test-utils';
import {createShallow} from '@material-ui/core/test-utils';

describe('Player', () => {
    let wrapper;
    const props = {
        onNameChange: jest.fn(),
        onPlayerTypeChange: jest.fn(),
        onNameFocus: jest.fn(),
        onNameBlur: jest.fn(),
        name: 'test player',
        isNameReqired: true,
        isNameError: false,
        type: 'batsman',
        options: PlayerTypes,
        placeholder: 'Name'
    }
    beforeEach(() => {
        wrapper = shallow(<Player />);
    });

    test("should render properly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("should render properly with props", () => {
        wrapper = mount(<Player {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    test("Dropdwon should render FormControl", () => {
        expect(wrapper.find(Dropdwon)).toHaveLength(1);
    });

    test("Textbox should render Textbox", () => {
        expect(wrapper.find(Textbox)).toHaveLength(1);
    });

    test('allows us to set props', () => {
        wrapper = mount(<Player {...props} />);
        expect(wrapper.props().name).toEqual('test player');
        wrapper.setProps({ name: 'test player change' });
        expect(wrapper.props().name).toEqual('test player change');
    });

    test('should change', () => {
        wrapper = createShallow()(<Player {...props} />);
        act(() => {
            wrapper.find(Textbox).simulate('change', { target: { value: 'James' } });
        });
        wrapper.update();
        expect(wrapper.find(Textbox).at(0).props().error).toBe(false);
    });

});