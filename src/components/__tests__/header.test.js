import React from 'react';
import { shallow } from 'enzyme';
import Header from '../header/header';

describe('components/header', () => {
    test('should render correctly', () => {
        const wrapper = shallow(
            <Header isOffline={false}/>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('should render a text info if the app is offline', () => {
        const wrapper = shallow(
            <Header isOffline={true}/>
        );

        expect(wrapper).toMatchSnapshot();
    });
});