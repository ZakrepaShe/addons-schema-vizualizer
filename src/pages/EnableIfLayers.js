import React from 'react';
import { connect } from 'react-redux';
import {layersStructureSelector} from "../store/reducers/componentsArray";
import {LayerStructureLevel} from "../components/LayerStructureLevel";
import Grid from '@material-ui/core/Grid';


const EnableIfLayers = ({
  layersStructure,
}) =>
  <Grid container >
    {Object.keys(layersStructure).map(level => (
      <LayerStructureLevel
        layersStructure={layersStructure}
        level={level}
        key={level}
      />
    ))}
  </Grid>;

const mapStateToProps = state => ({
  layersStructure: layersStructureSelector(state),
});

export default connect(mapStateToProps)(EnableIfLayers);
