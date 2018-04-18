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
            images: props.item ? (props.item.images) : []
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
    handleUploadSuccess = (filename) => {
        this.setState({filename, progress: 100, isUploading: false});
        // this.setState((prevState) => ({
        //     images: [...prevState.images, filename] 
        // }));
        storage.ref('images').child(filename).getDownloadURL().then(url => this.setState((prevState) => ({ 
            images: [...prevState.images, {
                url
            }] 
        })));
    };
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.title || !this.state.price || !this.state.category || !this.state.location) {
            this.setState(() => ({ error: 'Please provide description and amount' }));
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
                {
                    this.state.images.map((image, index) => (
                        <img src={image.url} key={index}/>
                    ))
                }
                <FileUploader
                    accept="image/*"
                    name="item"
                    randomizeFilename
                    multiple
                    storageRef={storage.ref('images')}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                />
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