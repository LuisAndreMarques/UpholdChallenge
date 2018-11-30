import React, { Component } from "react";
import "./components/main.css";
import Main from "./components/main";
import Currencies from "./components/currencies";

import "bootstrap/dist/css/bootstrap.css";
import github from "./images/github.svg";

import Uphold from "@uphold/uphold-sdk-javascript";

const sdk = new Uphold({
  baseUrl: "http://api-sandbox.uphold.com",
  clientId: "foo",
  clientSecret: "bar"
});

class App extends Component {
  _isMouted = false;

  state = {
    error: null,
    isLoaded: false,
    items: [],
    itemsList: [],
    selectedCurrency: "USD",
    currencies: [],
    cImagens: [],
    inputValue: 0.0
  };

  componentWillMount() {
    this._isMouted = true;
    if (this._isMouted) {
      this.state.items.length === 0
        ? this.fetchData()
        : this.setState.selectedCurrency("USD");
    }
  }

  componentWillUnmount() {
    this._isMouted = false;
  }
  fetchData = () => {
    sdk.getTicker().then(data => {
      this.setState({
        items: data
      });
      this.getCurrencies();
      this.changeRate();
      return data;
    });
  };

  getDataWithCurrency = currency => {
    sdk.getTicker(currency).then(data => {
      this.setState({
        itemsList: data
      });

      return data;
    });
  };

  changeRate = selectedCurrency => {
    let selected = selectedCurrency
      ? selectedCurrency
      : this.state.selectedCurrency;

    this.setState({ selectedCurrency: selected });
    this.getDataWithCurrency(selected);
  };

  componentDidUpdate() {}

  getCurrencies = () => {
    const currencies = [
      ...new Set(this.state.items.map(item => item.currency))
    ];
    this.setState({ currencies: currencies });
  };

  checkInputValue = inputValue => {
    this.setState({ inputValue });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="title">
            <h1>Currency converter</h1>
          </div>

          <Main
            id={this.state.items.id}
            currencies={this.state.currencies}
            onChangeRate={this.changeRate}
            selectedCurrency={this.state.selectedCurrency}
            inputValue={this.state.inputValue}
            onChangeValue={this.checkInputValue}
          />

          <Currencies
            currenciesList={this.state.itemsList}
            inputValue={this.state.inputValue}
          />
        </div>

        <footer>
          <a href="https://github.com/LuisAndreMarques">
            <img src={github} alt="" width="20px" height="20px" />
          </a>
          Luís André Marques
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
