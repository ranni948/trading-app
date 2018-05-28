import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ItemForm from '../../components/ItemForm';
import items from '../fixtures/items';

test('should render ItemForm correctly', () => {
    const wrapper = shallow(<ItemForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ItemForm with items data', () => {
    const wrapper = shallow(<ItemForm item={items[1]}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ItemForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set title on input change', () => {
    const value = 'New title';
    const wrapper  = shallow(<ItemForm />);
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('title')).toBe(value);
});

test('should set price on input change', () => {
    const value = '50';
    const wrapper  = shallow(<ItemForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('price')).toBe(value);
});

test('should set category if valid input', () => {
    const value = 'new cartegory';
    const wrapper  = shallow(<ItemForm />);
    wrapper.find('input').at(2).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('category')).toBe(value);
});

test('should set location if invalid input', () => {
    const value = 'new location';
    const wrapper  = shallow(<ItemForm />);
    wrapper.find('input').at(3).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('location')).toBe(value);
});

test('should set description if invalid input', () => {
    const value = 'new description';
    const wrapper  = shallow(<ItemForm />);
    wrapper.find('input').at(4).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
});

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ItemForm item={items[0]} onSubmit={onSubmitSpy} />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        title: items[0].title,
        description: items[0].description,
        price: items[0].price,
        category: items[0].category,
        location: items[0].location,
        images: items[0].images
    });
});