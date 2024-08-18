import React from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [fromCurrency, setFromCurrency] = React.useState("RUB");
  const [toCurrency, setToCurrency] = React.useState("USD");

  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(0);

  const [rates, setRates] = React.useState({});

  React.useEffect(() => {
    fetch(
      `https://data.fixer.io/api/latest?access_key=06ab05bed2b9e6149a500b5cfe00de7b`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);

        setRates(json);
        onChangeToPrice(1);
      })
      .catch((err) => {
        console.warn(err);
        alert("Не удалось получить информацию");
      });
  }, []);

  const onChangeFromPrice = (value) => {
    if (!rates.rates) return false;
    const price = value / rates.rates[fromCurrency];
    const result = price * rates.rates[toCurrency];
    console.log("rates.rates[toCurrency]", rates.rates[toCurrency]);
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    if (!rates.rates) return false;

    const result =
      (rates.rates[fromCurrency] / rates.rates[toCurrency]) * value;
    setFromPrice(result.toFixed(3));
    setToPrice(value);
  };

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  React.useEffect(() => {
    onChangeFromPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
