import React from 'react';
import { shallow } from 'enzyme';
import { ViewMyItemsPage } from '../../components/ViewMyItemsPage';
import items from '../fixtures/items';

test('should render ViewMyItemsPage', () => {
    const wrapper = shallow(<ViewMyItemsPage items={items}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render ViewMyItemsPage with no items', () => {
    const wrapper = shallow(<ViewMyItemsPage items={[]}/>);
    expect(wrapper).toMatchSnapshot();
});