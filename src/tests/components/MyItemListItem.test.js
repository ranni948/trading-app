import React from 'react';
import { shallow } from 'enzyme';
import { MyItemListItem } from '../../components/MyItemListItem';
import items from '../fixtures/items';

test('should render MyItemListItem', () => {
    const wrapper = shallow(<MyItemListItem item={items[0]}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should handle removeItem', () => {
    const startRemoveItem = jest.fn();
    const wrapper = shallow(<MyItemListItem item={items[1]} startRemoveItem={startRemoveItem}/>);
    wrapper.find('button').at(0).simulate('click')
    expect(startRemoveItem).toHaveBeenLastCalledWith(items[1]);
});