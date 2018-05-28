import React from 'react';
import { shallow } from 'enzyme';
import { AddItemPage } from '../../components/AddItemPage';
import items from '../fixtures/items'

test('should render add item page correctly', () => {
    const wrapper = shallow(<AddItemPage startAddItem={() => { }}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should call startAddItem on button click', () => {
    const startAddItemSpy = jest.fn();
    let history = { push: jest.fn() }
    const wrapper = shallow(<AddItemPage startAddItem={startAddItemSpy} history={history}/>);
    wrapper.find('ItemForm').prop('onSubmit')(items[1]);
    expect(startAddItemSpy).toHaveBeenLastCalledWith(items[1]);
});