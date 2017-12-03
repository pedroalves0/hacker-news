import React from 'react';
import { shallow } from 'enzyme';
import NewsListItem from '../newsList/newsListItem';

describe('components/newsList/newsListItem', () => {
    test('should render a story if url is passed', () => {
        const wrapper = shallow(
            <NewsListItem
                id={100}
                by={'author'}
                time={1512157581}
                title={'title'}
                url={'http://www.url.com/url/url/'}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('should render an ask story if url is not passed', () => {
        const wrapper = shallow(
            <NewsListItem
                id={100}
                by={'author'}
                time={1512157581}
                title={'title'}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });
});