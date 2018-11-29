import React, { Component } from "react";

class Main extends Component {
  render() {
    const {
      onChangeRate,
      currencies,
      selectedCurrency,
      onChangeValue
    } = this.props;

    return (
      <React.Fragment>
        <div className="col-md-6 col-sm-6 offset-md-3">
          <div className="row initialDiv">
            <div className="inputDiv">
              <input
                type="number"
                className="value-input"
                placeholder="0.00"
                onChange={c => onChangeValue(c.target.value)}
              />
            </div>
            <div className="inputCurrency">
              <select
                className="currency-input"
                onChange={c => onChangeRate(c.target.value)}
                value={selectedCurrency}
                dir="rtl"
              >
                {currencies.map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Main;
