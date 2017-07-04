import React, { Component } from 'react'
import firebase from 'APP/fire'
import FileUploader from 'react-firebase-file-uploader'
import Add from 'material-ui/svg-icons/content/add'
import CircularProgress from 'material-ui/CircularProgress'
import RaisedButton from 'material-ui/RaisedButton'
const db = firebase.database()

class InputButton extends Component {
  constructor(props) {
    super()
    this.state = {

    }
  }

  componentWillReceiveProps (newProps, oldProps) {
    this.setState({onChange: newProps.onChange})
  }

  render() {
    return (
      <RaisedButton
        containerElement='label'
        label='Upload'
        icon={<Add />}
        primary={true}
      >
        <input type="file" onChange={this.state.onChange} />
      </RaisedButton>
    )
  }
}

class Upload extends Component {
  constructor(props) {
    super()
    this.state = {
      image: '',
      isUploading: false,
      progress: 0
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
      // check to see if upload is to milestone, check in, or just goal:
      const key = this.props.goalRef.push().key
      if (this.props.milestoneRef) {
        // add image URL to parent goal's uploads:
        this.props.goalRef.child('uploads').child(key).set({
          imageURL: url,
          milestoneId: this.props.milestoneId
        })
        // add image URL to milestone:
        this.props.milestoneRef.child(key).set({
          imageURL: url
        })
      } else if (this.props.checkInRef) {
        // add image URL to parent goal's uploads:
        this.props.goalRef.child('uploads').child(key).set({
          imageURL: url,
          checkInId: this.props.checkInId
        })
        // add image URL to check in:
        this.props.checkInRef.child(key).set({
          imageURL: url
        })
      } else {
        this.props.goalRef.child(key).set({
          imageURL: url
        })
      }
    })
  };

  render() {
    return (
      <div>
        <form>
          <label></label>
          {this.state.isUploading &&
            <p>Progress: {this.state.progress}</p>
          }
          {this.state.isUploading &&
            <CircularProgress
              mode="determinate"
              value={this.state.progress}
              size={60}
              thickness={8}
            />
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
            as={InputButton}
          />
        </form>
      </div>
    )
  }
}

export default Upload
