import React from 'react';
import { shallow } from 'enzyme';
import { ViewItemPage } from '../../components/ViewItemPage';
import items from '../fixtures/items';

test('should render ViewItemPage', () => {
    const wrapper = shallow(<ViewItemPage item={items[1]}/>);
    expect(wrapper).toMatchSnapshot();
});