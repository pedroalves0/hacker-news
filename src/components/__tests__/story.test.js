import React from 'react';
import { shallow } from 'enzyme';
import Story from '../story';

describe('components/story', () => {
    test('should render correctly', () => {
        const wrapper = shallow(
            <Story
                by={'author'}
                time={1512157581}
                title={'title'}
                url={'http://www.url.com/url/url/'}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });
});