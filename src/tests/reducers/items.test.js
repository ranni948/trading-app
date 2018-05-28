import itemsReducer from '../../reducers/items';
import items from '../fixtures/items';

test('should set default state', () => {
    const state = itemsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should add an item', () => {
    const item = {
        id: '5',
        title: 'chair',
        description: 'New Chair',
        price: 5000,
        category: 'furniture',
        location: 'Dunedin'
    };

    const action = {
        type: 'ADD_ITEM',
        item
    };
    const state = itemsReducer(items, action);
    expect(state).toEqual([ ...items, item ]);
});