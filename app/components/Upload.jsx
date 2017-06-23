import React, { Component } from 'react'
import firebase from 'firebase'
import FileUploader from 'react-firebase-file-uploader'

/*

This is an example component using react-firebase-file-uploader - it renders a file uploader
and sends any uploaded images to an "images" directory in firebase storage

*/

class Upload extends Component {
  state = {
    image: '',
    isUploading: false,
    progress: 0,
    imageURL: ''
  };

  handleUploadStart = () => this.setState({isUploading: true, progress: 0});
  handleProgress = (progress) => this.setState({progress});
  handleUploadError = (error) => {
    this.setState({isUploading: false})
    console.error(error)
  }
  handleUploadSuccess = (filename) => {
    this.setState({image: filename, progress: 100, isUploading: false})
    firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({imageURL: url}))
  };

  render() {
    return (
      <div>
        <form>
          <label>Image:</label>
          {this.state.isUploading &&
            <p>Progress: {this.state.progress}</p>
          }
          {this.state.imageURL &&
            <img style="width: 50px;" src={this.state.imageURL} />
          }
          <FileUploader
            accept="image/*"
            name="image"
            randomizeFilename
            storageRef={firebase.storage().ref('images')}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </form>
      </div>
    )
  }
}

export default Upload
