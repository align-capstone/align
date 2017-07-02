import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import {Card, CardActions, CardHeader, CardMedia, CardText} from 'material-ui/Card'
import ContentEdit from 'material-ui/svg-icons/content/create'

// MPM do we want to be able to add title / text to upload cards??
// put that stuff on state?

export default function UploadCard(props) {
  console.log('props in upload card??', props)
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <Card className="upload-card" style={{width: 300}}>
        <CardMedia style={{padding: 15}}>
          <img src={props.url} className="upload-media" />
        </CardMedia>
        <CardText>
          <TextField hintText='Add a caption for this upload' />
        </CardText>
        {/* <CardActions expandable={true}>
          <FlatButton
            label="Edit upload description"
            icon={<ContentEdit />}
          />
        </CardActions> */}
      </Card>
    </MuiThemeProvider>
  )
}
