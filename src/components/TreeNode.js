import React, {Fragment, memo} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
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

const TreeNode = memo(({tree, blocks, layer}) => {

  const classes = useStyles();


  return(
    <Grid container justify="center">
      {Object.keys(tree).map(treeName=>
      <Card className={classes.card}>
        <CardContent>
          <Grid container justify="center">
            {
              treeName
                ? <Typography component="p" variant="subtitle1">
                  {treeName}
                </Typography>
                : ''
            }
          </Grid>
          <Grid container justify="center">

            {
              Object.keys(tree[treeName]).map(treeValue => {
                  const blocksSlice = blocks.filter(
                    ({enabledIf}) =>
                      (enabledIf[layer] && enabledIf[layer].element) === treeName
                      && ('' + (enabledIf[layer] && enabledIf[layer].value)) === treeValue);
                const dependentBlocks = blocksSlice.filter(
                  ({enabledIf}) => enabledIf.length === layer+1);

                  return (<Grid container justify="center" direction="row">
                    <Grid container justify="center">
                      {
                        treeValue
                          ? <Typography component="p" variant="body2">
                            {treeValue}
                          </Typography>
                          : ''
                      }
                    </Grid>
                    <Grid container justify="center" direction="column" alignItems="center">
                      {dependentBlocks.map(({name}) =>
                        <Typography component="p" variant="caption">
                          {name}
                        </Typography>
                      )}
                    </Grid>
                    <Grid container justify="center">
                      <TreeNode tree={tree[treeName][treeValue]} blocks={blocksSlice} layer={layer+1}/>
                    </Grid>
                  </Grid>);
                }
              )
            }
          </Grid>
        </CardContent>
      </Card>
      )}
    </Grid>
  )
});

export default TreeNode;
