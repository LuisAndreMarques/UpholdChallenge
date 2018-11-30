import React, { Component } from "react";

class Currencies extends Component {
  getImage(currency) {
    const images = require.context("../images", true);
    const imagePath = name => images(name, true);

    try {
      return imagePath("./" + currency + ".png");
    } catch (err) {
      return null;
    }
  }

  render() {
    const { currenciesList, inputValue } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col-md-6 col-sm-6 offset-md-3">
            <table className="table table-borderless result-table">
              <tbody>
                {currenciesList.map((c, i) => (
                  <tr key={i}>
                    <td>
                      <div className="bid">
                        {inputValue ? inputValue * c.bid : c.bid}
                      </div>
                    </td>
                    <td>
                      <div className="currencyLogo">
                        <img
                          src={this.getImage(c.currency)}
                          alt={c.currency}
                          height="30px"
                          width="30px"
                        />
                      </div>

                      <div className="currencyDesc">{c.currency}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Currencies;
