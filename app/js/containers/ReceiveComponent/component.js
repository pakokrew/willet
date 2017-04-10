import React, { PropTypes } from 'react';
import { Field, propTypes } from 'redux-form';

import ReceiveDeposit from '../ReceiveDeposit';

class ReceiveComponent extends React.Component {
  getReceivableAssets() {
    return this.props.balances.map(
      balance =>
        <option
          key={balance.asset.uuid}
          value={balance.asset.uuid}
        >
          {balance.asset.shortName}
        </option>,
    );
  }

  render() {
    const {
      handleSubmit,
      submitting,
      getDepositLaunched,
    } = this.props;

    if (getDepositLaunched) {
      return <ReceiveDeposit />;
    }

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="currency">Currency</label>
          <Field
            name="currency"
            component="select"
          >
            {this.getReceivableAssets()}
          </Field>
          <button type="submit" disabled={submitting}>
            Generate address
          </button>
        </form>
      </div>
    );
  }
}

ReceiveComponent.propTypes = {
  balances: PropTypes.array.isRequired,
  getDepositLaunched: PropTypes.bool.isRequired,
  ...propTypes,
};

export default ReceiveComponent;
