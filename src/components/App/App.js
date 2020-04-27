import React, { Component } from 'react';
import './App.css';
import Home from '../Home/Home';
// import ImageUploader from './ImageUploader/ImageUploader';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <p>Image Uploader!</p>
        {/* <ImageUploader /> */}
        <Home/>
      </div>
    );
  }
}

export default App;
