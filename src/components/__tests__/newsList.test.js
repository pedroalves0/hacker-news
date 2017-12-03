import React from 'react';
import { shallow } from 'enzyme';
import NewsList from '../newsList/newsList';

describe('components/newsList', () => {
    const items = [
        { 
            id: 10,
            by: 'author',
            time: 1512157581,
            title: 'title',
            url: 'http://www.url.com/url/url/'
        },
        { 
            id: 20,
            by: 'author2',
            time: 1512157582,
            title: 'title2',
            url: 'http://www.url2.com/url2/url2/'
        }
    ];

    test('should render correctly', () => {
        const wrapper = shallow(
            <NewsList
                isFetching={false}
                isOffline={false}
                items={items}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('should render correctly when fetching', () => {
        const wrapper = shallow(
            <NewsList
                isFetching={true}
                isOffline={false}
                items={items}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });
});