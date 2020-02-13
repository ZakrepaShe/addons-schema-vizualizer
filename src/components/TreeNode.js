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
  col: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  treeValues: {
  },
  treeValue: {
    padding: 5,
    border: '1px solid black',
  },
  treeNode: {
    border: '1px solid black',
  }
}));

const TreeNode = memo(({tree, blocks, layer}) => {

  const classes = useStyles();


  return(
    <div className={`treeLayer ${classes.row}`}>
      {Object.keys(tree).map(treeName =>
        <div className={`${classes.treeNode} ${classes.col}`}>
          {
            treeName
              ? <Typography component="p" variant="subtitle1">
                  {treeName}
                </Typography>
              : ''
          }
          <div className={`${classes.treeValues} ${classes.row}`}>
            {
              Object.keys(tree[treeName]).map(treeValue => {
                  const blocksSlice = blocks.filter(
                    ({enabledIf}) =>
                      (enabledIf[layer] && enabledIf[layer].element) === treeName
                      && ('' + (enabledIf[layer] && enabledIf[layer].value)) === treeValue
                  );
                  const dependentDummyBlocks = blocksSlice.filter(
                    ({name, enabledIf, values}) => (enabledIf.length === layer + 1) && (values.length === 0)
                  );

                  return (
                    <div className={`${classes.treeValue} ${classes.col}`}>
                      {
                        treeValue
                          ? <Typography component="p" variant="body2">
                            {treeValue}
                          </Typography>
                          : ''
                      }
                      <div className={classes.col}>
                        {dependentDummyBlocks.map(({name}) =>
                          <Typography component="p" variant="caption">
                            {name}
                          </Typography>
                        )}
                      </div>
                      <TreeNode tree={tree[treeName][treeValue]} blocks={blocksSlice} layer={layer + 1}/>
                    </div>
                  );
                }
              )
            }
          </div>
        </div>
      )}
    </div>
  )
});

export default TreeNode;
