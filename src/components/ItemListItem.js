import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ItemListItem = ({url}) => (
    //<Link className="list-item" to={`/edit/${id}`}>
        <img src={url} />
    //</Link>
);

export default ItemListItem;