import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { StellarTools } from 'stellar-toolkit';

import { loginWithSeed } from 'js/business/account/action-creators';
import Component from './component';

const FORM_NAME = 'login-seed';

const mapDispatchToProps = dispatch => ({
  onSubmit(values, d, props) {
    return dispatch(loginWithSeed(values.seed)).then(() => {
      props.reset();
    });
  },
});

function validate(values) {
  const errors = {};
  if (!values.seed) {
    errors.seed = 'This field could not be empty';
  }
  if (values.seed && !StellarTools.validSeed(values.seed)) {
    errors.seed = 'Invalid seed';
  }
  return errors;
}

export default connect(null, mapDispatchToProps)(reduxForm({
  form: FORM_NAME,
  initialValues: {},
  validate,
})(Component));
