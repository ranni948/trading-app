import React from 'react';
import { connect } from 'react-redux';
import ItemForm from './ItemForm';
import { startEditItem } from '../actions/items';  

class EditItemPage extends React.Component {
    onSubmit = (item) => {
        this.props.startEditItem(this.props.item.id, item);
        this.props.history.push('/');
    };
    render() {
        return (
            <div className="content">
                <div className="page-header">
                    <div className="content-container">
                    <h1 className="page-header__title">Edit Item</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ItemForm 
                        item={this.props.item}
                        onSubmit={this.onSubmit}
                    />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    startEditItem: (id, item) => dispatch(startEditItem(id, item))
});

const mapStateToProps = (state, props) => ({
    item: state.items.find((item) => item.id === props.match.params.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditItemPage);