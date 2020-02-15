import React, {useEffect, memo} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


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
  treeName: {
    boxShadow: '0 0 0px 1px black',
    borderRadius: 10,
    padding: '0px 5px',
  },
  treeValues: {
  },
  treeValue: {
    // padding: 5,
    // border: '1px solid black',
  },
  treeNode: {
    // boxShadow: '0 0 0px 1px black',
  },
  arrowHolder: {
    height: 20,
    position: 'relative',
    width: '100%'
  },
  rightArrow: {
    background: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 100 100'><line x1='0' y1='0' x2='100' y2='100' stroke='black' vector-effect='non-scaling-stroke'/></svg>")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: '100% 100%, auto',
  },
  leftArrow: {
    background: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 100 100'><line x1='0' y1='100' x2='100' y2='0' stroke='black' vector-effect='non-scaling-stroke'/></svg>")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: '100% 100%, auto',
  },
  padding: {
    padding: 5,
    boxShadow: '0 0 0px 1px black',
    borderRadius: 10,
    margin: '0 5px',
  }
}));

const TreeNode = memo(({tree, blocks, layer, path}) => {

  const classes = useStyles();

  useEffect(()=>{
    const parentElementPath = path.split('-').reverse().slice(1).reverse().join('-');
    const currentElement = document.getElementsByClassName(path)[0];
    const parentElement = document.getElementsByClassName(parentElementPath)[0];
    const pathValue = path.split('-').reverse()[0];
    if(parentElement && currentElement) {
      const {width: parentWidth, x: leftParentAbsolutePosition} = parentElement.getBoundingClientRect();
      const {width: currentWidth, x: leftCurrentAbsolutePosition} = currentElement.getBoundingClientRect();
      const middleParentAbsolutePoint = leftParentAbsolutePosition + parentWidth/2;
      const middleCurrentAbsolutePoint = leftCurrentAbsolutePosition + currentWidth/2;
      const arrow = document.createElement("div");
      arrow.style.position = 'absolute';
      arrow.style.display = 'flex';
      arrow.style.justifyContent = 'center';
      arrow.style.top = `0px`;
      arrow.style.bottom = `0px`;
      arrow.style.fontSize = `13px`;
      arrow.style.textShadow = `0px 0px 2px black`;
      // arrow.style.fontWeight = `bold`;
      arrow.style.color = `white`;
      arrow.textContent = pathValue;

      if (middleParentAbsolutePoint > middleCurrentAbsolutePoint) {
        //left
        const middleCurrentRelativePoint = middleCurrentAbsolutePoint - leftParentAbsolutePosition;
        arrow.style.left = `${middleCurrentRelativePoint}px`;
        arrow.style.right = `${parentWidth/2}px`;
        arrow.className = classes.leftArrow;
      } else {
        // right
        const middleCurrentRelativePoint = leftParentAbsolutePosition + parentWidth - middleCurrentAbsolutePoint;
        arrow.style.left = `${parentWidth/2}px`;
        arrow.style.right = `${middleCurrentRelativePoint}px`;
        arrow.className = classes.rightArrow;
      }
      parentElement.appendChild(arrow)

    }
  });


  return(
    <div className={`treeLayer ${classes.row}`}>
      {Object.keys(tree).map(treeName =>
        <div className={`${classes.treeNode} ${classes.col}`} key={treeName}>
          {
            treeName
              ? <div className={classes.treeName}>
                  <Typography component="p" variant="subtitle1">
                    {treeName}
                  </Typography>
                </div>
              : ''
          }
          <div className={`${classes.arrowHolder} ${path}-${treeName}`}/>
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
                    <div className={`${classes.treeValue} ${classes.col} ${path}-${treeName}-${treeValue}`} key={treeValue}>
                      {dependentDummyBlocks.length > 0 && (
                        <div className={`${classes.col} ${classes.padding}`}>
                          {dependentDummyBlocks.map(({name}) =>
                            <Typography component="p" variant="caption" key={name}>
                              {name}
                            </Typography>
                          )}
                        </div>
                      )}
                      <TreeNode tree={tree[treeName][treeValue]} blocks={blocksSlice} layer={layer + 1} path={`${path}-${treeName}-${treeValue}`}/>
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
