//Items Reducer
const itemsReducerDefaultState = []

export default (state = itemsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
        console.log('Action items', action.item);
        console.log('State', state);
            return [
                ...state,
                action.item
            ]
        case 'SET_ITEMS':
            return action.items
        case 'REMOVE_ITEM':
            return state.filter(({ id }) => id !== action.id)
        case 'EDIT_ITEM':
            return state.map((item) => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        ...action.updates
                    }
                } else {
                    return item;
                };
            });
        default:
            return state
    }
};
