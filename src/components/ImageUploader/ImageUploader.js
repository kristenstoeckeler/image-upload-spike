//**This is currently not being employed. Keeping for notes */

import React, { Component } from 'react';
import axios from 'axios';

class ImageUploader extends Component {

    state = {
        file: null
    }

    submitFile = (event) => {
        event.preventDefault();
        console.log('here is state.file:', this.state.file);

        const formData = new FormData();
        formData.append('file', this.state.file[0]);

        axios.post(`/test-upload`, formData) 
        .then(response => {
            // handle your response;
        }).catch(error => {
            // handle your error
        });
    }

    handleFileUpload = (event) => {
        console.log( 'here is event.target.files', event.target.files[0]);
        this.setState({ 
            file: event.target.files[0] 
        });
    }

    render() {
        return (
            <form onSubmit={this.submitFile}>
                <input label='upload file' type='file' onChange={this.handleFileUpload} />
                <button type='submit'>Send</button>
            </form>
        );
    }
}

export default ImageUploader;

