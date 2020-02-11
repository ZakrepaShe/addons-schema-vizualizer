import React from 'react';
import { connect } from 'react-redux';
import {treeStructureSelector} from "../store/reducers/componentsArray";
import TreeNode from "../components/TreeNode";
import Grid from '@material-ui/core/Grid';


const EnableIfTree = ({
                                treeStructure: {blocksWithConditionsBranches, conditionsMap, tree},
                              }) =>
  <Grid container spacing={3}>
    <TreeNode tree={tree} blocks={blocksWithConditionsBranches} layer={0}/>
  </Grid>;

const mapStateToProps = state => ({
  treeStructure: treeStructureSelector(state),
});

export default connect(mapStateToProps)(EnableIfTree);
