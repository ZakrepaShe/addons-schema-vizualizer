import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import {treeStructureSelector} from "../store/reducers/componentsArray";
import Card from "../components/Card";
import Grid from '@material-ui/core/Grid';


const EnableIfTree = ({
  treeStructure: {blocksWithConditionsBranches, conditionsMap},
}) =>
  <Grid container spacing={3}>
    {Object.keys(conditionsMap).map(conditionColumnIndex => (
      <Grid item key={conditionColumnIndex}>
        {conditionsMap[conditionColumnIndex].map(({element,value})=>
          <Fragment>
            <Card
              key={element}
              name={element}
              values={[''+value]}
              currentValue={[''+value]}
              enabledIf={[]}
            />
            {blocksWithConditionsBranches.filter(
              ({enabledIf, branchIndex, values}) =>
                '' + branchIndex === conditionColumnIndex
                && enabledIf[enabledIf.length-1].element === element
                && values.length === 0
            ).map(block=>
              <Card
                key={block.name}
                {...block}
              />)}
          </Fragment>
        )}
      </Grid>

    ))}
  </Grid>;

const mapStateToProps = state => ({
  treeStructure: treeStructureSelector(state),
});

export default connect(mapStateToProps)(EnableIfTree);
