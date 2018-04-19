import React from 'react';
import { NavLink } from 'react-router-dom';
import numeral from 'numeral';

const ItemListItem = ({item}) => (
    <NavLink className="list-items list-item" to={`/view/${item.id}`}>
        <img className="list-item-image" src={item.images[0].url}/>
        <span className="list-item__price">{numeral(item.price / 100).format('$0,0.00')}</span>
        <div>{item.title}</div>
    </NavLink>
);

export default ItemListItem;