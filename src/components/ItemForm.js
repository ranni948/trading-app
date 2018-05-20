import React from 'react';
//import moment from 'moment';
import FileUploader from 'react-firebase-file-uploader';
import { storage } from '../firebase/firebase';

export default class ItemForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.item ? props.item.title : '',
            description: props.item ? props.item.description : '',
            price: props.item ? (props.item.price / 100).toString() : '',
            category: props.item ? (props.item.category) : '',
            location: props.item ? (props.item.location) : '',
            error: '',
            filename: '',
            isUploading: false,
            progress: 0,
            images: props.item ? (props.item.images) : [],
            operation: props.operation ? 'edit' : ''
        }
    }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };
    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState(() => ({ title }))
    };
    onPriceChange = (e) => {
        const price = e.target.value;
        if (!price || price.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ price }))
        }
    };
    onCategoryChange = (e) => {
        const category = e.target.value;
        this.setState(() => ({ category }))
    };
    onLocationChange = (e) => {
        const location = e.target.value;
        this.setState(() => ({ location }))
    };
    handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    handleProgress = (progress) => this.setState({progress});
    handleUploadError = (error) => {
        this.setState({isUploading: false});
        console.error(error);
    }
    handleUploadSuccess = (filename, task) => {
        this.setState({filename, progress: 100, isUploading: false});
        storage.ref('images').child(filename).getDownloadURL().then(url => this.setState((prevState) => ({ 
            images: [...prevState.images, {
                url,
                filename,
                deleted: false 
            }] 
        })));
    };
    handleImageDelete = (filename, e) => {
        e.preventDefault();
        if (this.state.operation === "edit") {
            //modify object
            const indexOfFileToDelete = this.state.images.findIndex(image => image.filename === filename);
            const imageToModify = this.state.images[indexOfFileToDelete];
            imageToModify.deleted = true;
            //replace existing object
            const originalImagesState = this.state.images;
            originalImagesState.splice(indexOfFileToDelete, 1, imageToModify)
            this.setState((prevState) => ({
                images: originalImagesState
            }));
        } else {
            storage.ref(`images/${filename}`).delete().then(() => {
                this.setState((prevState) => ({
                    images: prevState.images.filter((image) => filename !== image.filename)
                }));
            }).catch(function(error) {
                console.error(error);
            });
        }
    }
    handleImageDeleteUndo = (filename, e) => {
        e.preventDefault();
        //modify object
        const indexOfFileToDelete = this.state.images.findIndex(image => image.filename === filename);
        const imageToModify = this.state.images[indexOfFileToDelete];
        imageToModify.deleted = false;
        //replace existing object
        const originalImagesState = this.state.images;
        originalImagesState.splice(indexOfFileToDelete, 1, imageToModify)
        this.setState((prevState) => ({
            images: originalImagesState
        }));
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.title || !this.state.price || !this.state.category || !this.state.location) {
            this.setState(() => ({ error: 'Please provide description and amount' }));
        } else if (this.state.images.length === 0 || (this.state.images.filter(image => !image.deleted).length === 0)) {
            this.setState(() => ({ error: 'Please add at least 1 image' }));
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                title: this.state.title,
                description: this.state.description,
                price: parseFloat(this.state.price, 10) * 100,
                category: this.state.category,
                location: this.state.location,
                images: this.state.images
            })
        }
    }
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {
                    this.state.isUploading && <p>Progress: {this.state.progress}</p>
                }
                <div className="form-image-list">
                    {
                        this.state.images.map((image, index) => {
                            return !image.deleted ? 
                            (
                                <div className="form-image-list__item" key={index}>
                                    <img className="list-item-image" src={image.url} />
                                    <i className="material-icons button--image" onClick={(e) => this.handleImageDelete(image.filename, e)}>delete</i>
                                </div>
                            ) : (
                                <div className="form-image-list__item" key={index}>
                                    <img className="list-item-image" src={image.url} />
                                    <div className="list-item-image list-item-image__deleted"></div>
                                    <i className="material-icons button--image" onClick={(e) => this.handleImageDeleteUndo(image.filename, e)}>cancel</i>
                                </div>
                            )
                        })
                    }
                </div>
                <label className="form-image">
                + Add Image(s)
                    <FileUploader
                        accept="image/*"
                        name="item"
                        hidden
                        randomizeFilename
                        multiple
                        storageRef={storage.ref('images')}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                    />
                </label>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    type="text"
                    placeholder="What are you trading?"
                    autoFocus
                    className="text-input"
                    value={this.state.title}
                    onChange={this.onTitleChange}
                />
                <input
                    type="text"
                    placeholder="Price"
                    className="text-input"
                    value={this.state.price}
                    onChange={this.onPriceChange}
                />
                <input
                    type="text"
                    placeholder="Select Category"
                    className="text-input"
                    value={this.state.category}
                    onChange={this.onCategoryChange}
                />
                <input
                    type="text"
                    placeholder="Location"
                    className="text-input"
                    value={this.state.location}
                    onChange={this.onLocationChange}
                />
                <input
                    type="text"
                    placeholder="Decription"
                    className="text-input"
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                />
                <div>
                    <button className="button">Save Item</button>
                </div>
            </form>
        )
    }
}