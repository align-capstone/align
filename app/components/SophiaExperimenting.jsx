import React, { Component } from 'react'
import firebase from 'firebase'
import FileUploader from 'react-firebase-file-uploader'

const db = firebase.database();

/*

This is an example component using react-firebase-file-uploader - it renders a file uploader
and sends any uploaded images to an "images" directory in firebase storage

*/

class SophiaExperimenting extends Component {
    constructor() {
        super()
        this.state = {
            image: '',
            isUploading: false,
            progress: 0,
            imageURL: ''
        }

        this.writeGoal = this.writeGoal.bind(this);
    }

    writeGoal (event, goalId, name, description, status, color, hasEnd) {
        console.log("IN WRITEGOAL")
        console.log("what is event?", event)
        event.preventDefault();
        console.log("event.target.value", event.target.value)
        firebase.database().ref('goals').child(111117).set({
            name: 'make pancakes',
            description: 'gotta flip them well',
            status: 'open',
            startDate: new Date(),
            createdDate: new Date(),
            hasEnd: false,
            color: "#000f00",
            activityLevel: 1
        })
    };

    //   handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    //   handleProgress = (progress) => this.setState({progress});
    //   handleUploadError = (error) => {
    //     this.setState({isUploading: false})
    //     console.error(error)
    //   }
    //   handleUploadSuccess = (filename) => {
    //     this.setState({image: filename, progress: 100, isUploading: false})
    //     firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({imageURL: url}))
    //   };

    render() {
        console.log("what is database db? ", db)
        return (
            <div>
                <h1>Hello, this is Sophia's experimenting page!</h1>
                <form id='create-goal-form' onSubmit={this.writeGoal}>
                    <label name='goal'>Goal</label>
                    <input type='text' name='goal'/>
                    <button>Write goal</button>

                </form>
            </div>
        )
    }
}

export default SophiaExperimenting