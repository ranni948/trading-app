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
        // case 'REMOVE_EXPENSE':
        //     return state.filter(({ id }) => id !== action.id)
        // case 'EDIT_EXPENSE':
        //     return state.map((expense) => {
        //         if (expense.id === action.id) {
        //             return {
        //                 ...expense,
        //                 ...action.updates
        //             }
        //         } else {
        //             return expense;
        //         };
        //     });
        default:
            return state
    }
};
