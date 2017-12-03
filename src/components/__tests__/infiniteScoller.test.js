import React from 'react';
import { shallow, mount } from 'enzyme';
import InfiniteScroller from '../infiniteScroller';

describe('components/infiniteScroller', () => {
    let windowEventMap = {};

    beforeEach(() => {
        window.addEventListener = jest.fn((event, cb) => {
            windowEventMap[event] = cb;
        });
    });

    test('should render correctly', () => {
        const wrapper = shallow(
            <InfiniteScroller 
                isFetching={false}
                isOffline={false}
            >
                <span>test</span>
            </InfiniteScroller>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test('should trigger onScrollBottomReached', () => {
        const scrollSpy = jest.fn();

        mount(
            <InfiniteScroller 
                isFetching={false}
                isOffline={false}
                onScrollBottomReached={scrollSpy}
            >
                <span>test</span>
            </InfiniteScroller>
        );

        // set scroll amount and trigger a scroll event
        window.scrollY = 20;
        windowEventMap.scroll();

        expect(scrollSpy).toBeCalled();
    });

    test('should not trigger onScrollBottomReached when fetching', () => {
        const scrollSpy = jest.fn();

        mount(
            <InfiniteScroller 
                isFetching={true}
                isOffline={false}
                onScrollBottomReached={scrollSpy}
            >
                <span>test</span>
            </InfiniteScroller>
        );

        // set scroll amount and trigger a scroll event
        window.scrollY = 20;
        windowEventMap.scroll();

        expect(scrollSpy).not.toBeCalled();
    });

    test('should not trigger onScrollBottomReached when offline', () => {
        const scrollSpy = jest.fn();

        mount(
            <InfiniteScroller 
                isFetching={false}
                isOffline={true}
                onScrollBottomReached={scrollSpy}
            >
                <span>test</span>
            </InfiniteScroller>
        );

        // set scroll amount and trigger a scroll event
        window.scrollY = 20;
        windowEventMap.scroll();

        expect(scrollSpy).not.toBeCalled();
    });
});