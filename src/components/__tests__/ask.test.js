import React from 'react';
import { shallow } from 'enzyme';
import Ask from '../ask';

describe('components/ask', () => {
    test('should render correctly', () => {
        const wrapper = shallow(
            <Ask
                by={'author'}
                text={'text'}
                time={1512157581}
                title={'title'}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('should render the ask text if the toggle button is clicked', () => {
        const wrapper = shallow(
            <Ask
                by={'author'}
                text={'text'}
                time={1512157581}
                title={'title'}
            />
        );

        expect(wrapper).toMatchSnapshot();

        wrapper.find('.ask-title-toggle').simulate('click');

        expect(wrapper).toMatchSnapshot();
    });

    test('should not render the toggle button if theres no text', () => {
        const wrapper = shallow(
            <Ask
                by={'author'}
                time={1512157581}
                title={'title'}
            />
        );

        expect(wrapper.find('.ask-title-toggle').exists()).toBe(false);
    });
});