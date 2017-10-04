import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors'
import {fade} from 'material-ui/utils/colorManipulator'
import spacing from 'material-ui/styles/spacing'

export default {
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#888888',
    primary2Color: '#888888',
    primary3Color: '#888888',
    accent1Color: '#D17A83',
    accent2Color: '#D17A83',
    accent3Color: '#D17A83',
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  flatButton: { primaryTextColor: '#888888'}
}
