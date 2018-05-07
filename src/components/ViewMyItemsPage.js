import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MyItemListItem from './MyItemListItem';

export const ViewMyItemsPage = (props) => (
    <div className="content">
        <div className="content-container">
            <div className="list-body my-list-body">
            {
                props.items.length === 0 ? (
                    <div className="list-items list-item--message">
                        <span>No items</span>
                    </div>
                ) : (
                    <div className="list-items my-list-items">
                        {console.log(props.items)}
                        {
                            props.items.map((item) => {
                            return <MyItemListItem key={item.id} item={item} />
                        })}
                    </div>
                )
            }
            </div>
        </div>
    </div>
);

const mapStateToProps = (state) => {
    return  {
        items: state.items.filter((item) => state.auth.uid === item.userId)
    };
};

export default connect(mapStateToProps)(ViewMyItemsPage);