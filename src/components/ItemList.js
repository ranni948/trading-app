import React from 'react';
import { connect } from 'react-redux';
import ItemListItem from './ItemListItem';

export const ItemList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div>Items</div>
        </div>
        <div className="list-body">
        {
            props.items.length === 0 ? (
                <div className="list-item list-item--message">
                    <span>No items</span>
                </div>
            ) : (
                props.items.map((item) => {
                return <ItemListItem key={item.id} url={item.images[0].url} />
            })
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