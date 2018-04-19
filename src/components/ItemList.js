import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ItemListItem from './ItemListItem';

export const ItemList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <Link className="button" to="/create">+ Add Item</Link>
        </div>
        <div className="list-body">
        <div className="list-item--message">
                        <span>Items</span>
                    </div>
        {
            props.items.length === 0 ? (
                <div className="list-items list-item--message">
                    <span>No items</span>
                </div>
            ) : (
                <div className="list-items">
                    {console.log(props.items)}
                    {
                        props.items.map((item) => {
                        return <ItemListItem key={item.id} item={item} />
                    })}
                </div>
            )
        }
        </div>
    </div>
);

const mapStateToProps = (state) => {
    return  {
        items: state.items
    };
};

export default connect(mapStateToProps)(ItemList);