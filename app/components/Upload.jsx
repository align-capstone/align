import React, { Component } from 'react'
import firebase from 'APP/fire'
import FileUploader from 'react-firebase-file-uploader'
const db = firebase.database()
let propsStandInGoal = db.ref('goals').child(1234).child('uploads')

/*

This is an example component using react-firebase-file-uploader - it renders a file uploader
and sends any uploaded images to an "images" directory in firebase storage

*/

class Upload extends Component {
  constructor(props) {
    super()
    this.state = {
      image: '',
      isUploading: false,
      progress: 0,
      imageURL: ''
    }
  }

  handleUploadStart = () => this.setState({isUploading: true, progress: 0});
  handleProgress = (progress) => this.setState({progress});
  handleUploadError = (error) => {
    this.setState({isUploading: false})
    console.error(error)
  }
  handleUploadSuccess = (filename) => {
    this.setState({image: filename, progress: 100, isUploading: false})
    firebase.storage().ref('images').child(filename).getDownloadURL().then(url => {
      this.setState({imageURL: url})
      let key = this.props.fireRef.push().key
      this.props.fireRef.child(key).set(url)
    })
  };

  render() {
    return (
      <div>
        <form>
          <label>Image:</label>
          {this.state.isUploading &&
            <p>Progress: {this.state.progress}</p>
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
