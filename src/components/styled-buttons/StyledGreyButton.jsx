import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const StyledGreyButton = withStyles({
  root: {
    background: '#E0E0E0',
    borderRadius: 3,
    border: 0,
    width: "230px",
    color: 'black',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

export default StyledGreyButton;