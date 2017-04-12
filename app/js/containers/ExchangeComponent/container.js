import { connect } from 'react-redux';
import { getFormValues, reduxForm } from 'redux-form';

import { selAccount, selBalances } from 'js/business/account/selectors';
import { exchangeOperation } from 'js/business/operations/action-creators';
import Component from './component';

const FORM_NAME = 'exchange-form';

const mapStateToProps = state => ({
  account: selAccount(state),
  balances: selBalances(state),
  formValues: getFormValues(FORM_NAME)(state),
});

const mapDispatchToProps = dispatch => ({
  onSubmit(values, d, props) {
    const asset_source = props.balances
      .find(b => b.asset.uuid === values.sourceAssetUuid).asset;
    const asset_destination = props.balances
      .find(b => b.asset.uuid === values.destinationAssetUuid).asset;
    const formData = {
      asset_source,
      asset_destination,
      amount_destination: values.destinationAmount,
      max_amount: values.sendMax,
    };
    return dispatch(exchangeOperation(formData))
      .then(() => {
        props.reset();
      });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: FORM_NAME,
  initialValues: {},
})(Component));
