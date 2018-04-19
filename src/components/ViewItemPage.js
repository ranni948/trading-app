import React from 'react';
import { connect } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import numeral from 'numeral';
//import ExpenseForm from './ExpenseForm';

export class ViewItemPage extends React.Component {
    // onSubmit = (expense) => {
    //     this.props.startEditExpense(this.props.expense.id, expense);
    //     this.props.history.push('/')
    // }
    // onRemove = () => {
    //     this.props.startRemoveExpense(this.props.expense);
    //     this.props.history.push('/')
    // }
    render() {
        const images = [];
        this.props.item.images.map((image) => {
            images.push({
                original: image.url,
                thumbnail: image.url
            })
        })
        return (
           <div className="content">
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Item Details</h1>
                    </div>
                </div>
                <div className="content-container">
                    {
                        <div className="image-item">
                            <div className="image-info">
                                <p>{this.props.item.title}</p>
                                <p>{numeral(this.props.item.price / 100).format('$0,0.00')}</p>
                                <p>{this.props.item.description}</p>
                            </div>
                            <div className="image">
                                <ImageGallery 
                                    showBullets={true}
                                    items={images} 
                                    showPlayButton={false}
                                    showFullscreenButton={false}
                                    showThumbnails={false}
                                />
                            </div>
                        </div>
                    }
                </div>
            </div> 
        )
    }
}

const mapStateToProps = (state, props) => ({
    item: state.items.find((item) => item.id === props.match.params.id)
});

export default connect(mapStateToProps)(ViewItemPage);