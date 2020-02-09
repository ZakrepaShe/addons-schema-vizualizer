import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    //maxWidth: 300,
    '& .MuiInputBase-input': {
      fontSize: 14,
    }
  },
}));

export const TextArea = ({value, onChange}) => {
  const classes = useStyles();

  const handleChange = ({target: {value}}) => {
    onChange(value);
  };

  return (
    <TextField
      className={classes.root}
      id="outlined-multiline-flexible"
      label="Enter settings_schema array"
      multiline
      rowsMax="10"
      value={value}
      placeholder="Placeholder"
      onChange={handleChange}
      variant="outlined"
    />
  )
};