import { useState } from "react";
import Header from "./components/Header/Header"
import InputPanel from "./components/InputPanel/InputPanel"
import InvestmentValue from "./components/InvestmentValue/InvestmentValue"
import { calculateInvestmentResults } from "./util/investment";

function App() {
  const [investmentData, setInvestmentData] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  });

  const result = calculateInvestmentResults(investmentData);

  const onInputChange = (inputName, value) => {
    setInvestmentData(prevData => ({
      ...prevData,
      [inputName]: Number(value)
    }));
  };


  return (
    <main>
      <Header />
      <InputPanel investmentData={investmentData} onInputChange={onInputChange}/>
      <InvestmentValue result={result}/>
    </main>
  )
}

export default App
