import React, {Fragment, useCallback} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {TextArea} from '../components/TextArea';
import testSchema from './schema'
import {
  settingsSchemaStateSelector,
  schemaStatusSelector,
  changeParsedSchemaStatus,
} from "../store/reducers/settingsSchema";
import {transformSettingsSchema} from "../store/actions";


const SchemaUploader = ({
                          settingsSchema,
                          setValue,
                          parsedStatusSuccess,
                          showTextArea,
                        }) => {
  const handleButtonClick = useCallback(arg => () => {
    showTextArea(arg)
  },[]);

  const loadTestSchema = useCallback(() => {
    setValue(JSON.stringify(testSchema))
  },[testSchema]);

  return (
    <Grid item xs={12} md={6} >
      <Grid container direction="column" justify="center">
        {parsedStatusSuccess
          ? <Button
              variant="contained" color="primary"
              onClick={handleButtonClick(false)}
            >
              Change Schema
            </Button>
          : <Fragment>
              <TextArea value={settingsSchema} onChange={setValue}/>
              <Grid container spacing={3}>
                <Grid item>
                  <Button
                    variant="contained" color="primary"
                    onClick={handleButtonClick(true)}
                  >
                    Save Schema
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={loadTestSchema}
                  >
                    Load test schema
                  </Button>
                </Grid>
              </Grid>
            </Fragment>
        }
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  settingsSchema: settingsSchemaStateSelector(state),
  parsedStatusSuccess: schemaStatusSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setValue: transformSettingsSchema,
  showTextArea: changeParsedSchemaStatus,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SchemaUploader);
