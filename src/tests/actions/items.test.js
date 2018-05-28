import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    addItem,
    startAddItem,
} from '../../actions/items';
import items from '../fixtures/items';
import database, { storage } from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState =  { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const itemsData = {};
    items.forEach(({ id, title, description, price, category, location, images}) => {
        itemsData[id] = { title, description, price, category, location, images };
    })
    database.ref(`users/${uid}/items`).set(itemsData).then(() => done());
});

test("should setup add item action object with provided values", () => {
    const action = addItem(items[2]);
    expect(action).toEqual({
        type: 'ADD_ITEM',
        item: items[2]
    });
});

test('should add item to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const itemData = {
        title: 'computer',
        description: 'some description',
        price: 3000,
        category: 'Computers',
        location: 'New Zealand',
        images: [{
            url: 'asfsdf',
            filename: 'www.5.com',
            disabled: false
        }]
    }

    store.dispatch(startAddItem(itemData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_ITEM',
            item: {
                id: expect.any(String),
                userId: uid,
                ...itemData,
            }
        });

        return database.ref(`users/${uid}/items/${actions[0].item.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(itemData);
        done();
    });
});

test('should add item with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const itemData = {
        title: '',
        description: '',
        price: 0,
        category: '',
        location: '',
        images: []
    }

    store.dispatch(startAddItem({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_ITEM',
            item: {
                id: expect.any(String),
                userId: uid,
                ...itemData
            }
        });

        return database.ref(`users/${uid}/items/${actions[0].item.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual({
            category: "", 
            description: "", 
            location: "", 
            price: 0, 
            title: ""
        });
        done();
    });
});
