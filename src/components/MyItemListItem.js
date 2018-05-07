import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import numeral from 'numeral';
import { startRemoveItem } from '../actions/items';

export class MyItemListItem extends React.Component {
    onRemove = () => {
        this.props.startRemoveItem(this.props.item);
    }
    render() {
        return (
            <div className="list-items my-list-item">
                <NavLink to={`/view/${this.props.item.id}`}>
                    <img className="my-list-item-image" src={this.props.item.images[0].url}/>
                </NavLink>
                <div className="my-list-item__content">
                <div className="my-list-item__text">
                    <div className="my-list-item__text-item my-list-item-price">{numeral(this.props.item.price / 100).format('$0,0.00')}</div>
                    <div className="my-list-item__text-item">-</div>
                    <div className="my-list-item__text-item">{this.props.item.title}</div>
                </div>
                <div className="my-list-item__text">
                    <button className="button button-selling" onClick={this.onRemove}>Delete</button>
                    <Link className="button button-selling" to={`/edit/${this.props.item.id}`}>Edit</Link>  
                </div>
                </div>
            </div>
            
        )
    }
};

const mapDispatchToProps = (dispatch, props) => ({
    startRemoveItem: (data) => dispatch(startRemoveItem(data))
});

export default connect(undefined, mapDispatchToProps)(MyItemListItem);