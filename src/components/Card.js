import React, {Fragment, memo, useCallback, useMemo} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {updateVisibility} from "../store/actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
  card: {
    //maxWidth: 300,
    marginBottom: 20
  },
  button: {
    margin: theme.spacing(1),
    marginLeft: 0
  },
  media: {
    objectFit: 'cover',
    height: 250,
  },
}));

const BlockCard = memo(({
                                 name,
                                 values,
                                 currentValue,
                                 isVisible,
                                 alwaysVisible,
                                 updateVisibility,
  enabledIf,
}) => {

  const classes = useStyles();
  const selectedValue = currentValue[0];

  const handleChange = useCallback(({target: {value}}) => {
    updateVisibility(name, value);
  },[name]);

  const getInputProps = value => ({'aria-label': value});

  return (
    <Card className={classes.card}>
      <CardContent>
        {
          name
            ? <Typography component="h6" variant="h6">
              {name}
            </Typography>
            : ''
        }
        <Grid container justify="center" >
        {
          values.map(value => {
              const inputProps = useMemo(() =>getInputProps(value),[value]);
              return (<FormControlLabel
                key={value}
                checked={selectedValue === value}
                onChange={handleChange}
                value={value}
                control={<Radio
                  color="primary"
                  name="radio-button-demo"
                  inputProps={inputProps}
                />}
                label={value}
                labelPlacement="bottom"
              />);
            }
          )
        }
        </Grid>
        {enabledIf.length > 0
          ? <Fragment>
            <Typography component="p" variant="subtitle2">
              Dependencies
            </Typography>
            { enabledIf.map(({element, value}) =>
              <Typography component="p" variant="caption" key={element}>
                {element}: {''+value}
              </Typography>)}
          </Fragment>

          : ''
        }
        {/*{*/}
          {/*!alwaysVisible*/}
            {/*? <Typography component="p">*/}
                {/*{'isVisible: ' + isVisible}*/}
              {/*</Typography>*/}
            {/*: ''*/}
        {/*}*/}
      </CardContent>
    </Card>
  )
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateVisibility: updateVisibility,
}, dispatch);

export default connect(null, mapDispatchToProps)(BlockCard);
