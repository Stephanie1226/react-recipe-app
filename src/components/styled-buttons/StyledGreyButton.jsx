import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const StyledGreyButton = withStyles({
  root: {
    background: '#ffffff',
    borderRadius: 3,
    border: '2px solid #2A356C',
    width: "230px",
    color: 'black',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

export default StyledGreyButton;