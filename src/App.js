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
    console.log("pr1232131");
    fetch(
      `https://data.fixer.io/api/latest?access_key=cfae4f949a2c5f96e10fff5188108b4f`
    )
      .then((res) => res.json())
      .then((json) => {
        setRates(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("Не удалось получить информацию");
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / rates.rates[fromCurrency];
    const result = price * rates.rates[toCurrency];
    console.log("rates.rates[toCurrency]", rates.rates[toCurrency]);
    setToPrice(result);
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const result =
      (rates.rates[fromCurrency] / rates.rates[toCurrency]) * value;
    setFromPrice(result);
    setToPrice(value);
  };

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={(cur) => setFromCurrency(cur)}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={(cur) => setToCurrency(cur)}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
