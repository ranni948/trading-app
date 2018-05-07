import uuid from 'uuid';
import database from '../firebase/firebase';

//ADD_EXPENSE
export const addItem = (item) => ({
    type: 'ADD_ITEM',
    item
});

export const startAddItem = (itemData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            title = '',
            description = '', 
            price = 0, 
            category = '', 
            location = '',
            images = []
        } = itemData;
        const item = { title, description, price, category, location, images };

        return database.ref(`users/${uid}/items`).push(item).then((ref) => {      

            dispatch(addItem({
                id: ref.key,
                userId: uid,
                ...item
            }));
        });
    };
};

//REMOVE_ITEM
export const removeItem = ({ id } = {}) => ({
    type: 'REMOVE_ITEM',
    id
});

export const startRemoveItem = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/items/${id}`).remove().then(() => {
            dispatch(removeItem({ id }));
        });
    }
}

//EDIT_ITEM
export const editItem = (id, updates) => ({
    type: 'EDIT_ITEM',
    id,
    updates
});

export const startEditItem = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/items/${id}`).update(updates).then(() => {
            dispatch(editItem(id, updates));
        });
    }
}

// SET_ITEMS
export const setItems = (items) => ({
    type: 'SET_ITEMS',
    items
});

export const startSetItems = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users`).once('value').then((snapshot) => {
            const items = [];

            snapshot.forEach((child) => {
                child.forEach((child1) => {
                    child1.forEach((childSnapshot) => {
                        items.push({
                            id: childSnapshot.key,
                            userId: child.key,
                            ...childSnapshot.val()
                        });
                    })
                })
            });
            dispatch(setItems(items));
        });
    };
};