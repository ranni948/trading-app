import React from 'react';
import { shallow } from 'enzyme';
import { EditItemPage } from '../../components/EditItemPage';
import items from '../fixtures/items';

let startEditItem, history, wrapper;
beforeEach(() => {
    startEditItem = jest.fn();
    history = { push: jest.fn() }
    wrapper = shallow(
        <EditItemPage 
            startEditItem={startEditItem}
            history={history} 
            item={items[1]}
        />
    );
});

test('should render EditItemPage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle editItem', () => {
    wrapper.find('ItemForm').prop('onSubmit')(items[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startEditItem).toHaveBeenLastCalledWith(items[1].id, items[1]);
});