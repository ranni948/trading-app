import uuid from 'uuid';
import database, { storage } from '../firebase/firebase';

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
        database.ref(`users/${uid}/items/${id}`).once('value').then((snapshot) => {
            return snapshot.val();
        }).then((result) => {
            //delete item from DB first so that any reference to the images is gone, if something
            //goes wrong with deletinf the images it won;t matter since there is no reference to them anymore
            database.ref(`users/${uid}/items/${id}`).remove().then(() => {
                dispatch(removeItem({ id }));
            }).then(() => {
                result.images.map((image, index) => {
                    storage.ref(`images/${image.filename}`).delete();
                });
            });
    
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