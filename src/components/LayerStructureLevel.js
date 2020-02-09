import React, {Fragment, memo} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import BlockCard from "./Card";


export const LayerStructureLevel = memo(({
  layersStructure,
  level,
 }) => {

  const preparedLayersStructure = layersStructure[level].filter(({isVisible})=>isVisible);

  return (
    preparedLayersStructure.length > 0
    &&
    <Fragment>
      <Typography component="h6" variant="h6">
        Layer: {level}
      </Typography>
      <Grid container >
        <Grid item >
          <Grid container spacing={3}>
            {preparedLayersStructure
              .map(component => (
                <Grid item key={component.name}>
                  <BlockCard  {...component}/>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  )
});