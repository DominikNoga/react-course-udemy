import React from 'react'
import { calculateInvestmentResults, formatter } from '../../util/investment';

export default function InvestmentValue({ investmentData }) {
  const result = calculateInvestmentResults(investmentData);
  const inputValid = investmentData.duration > 0;
  const initialInvestment = inputValid ?
    result[0].valueEndOfYear - result[0].interest - result[0].annualInvestment :
    0;
  const getFormattedCurrency = (number) => formatter.format(number);
  const getTotalIntrest = (yearData) => {
    return yearData.valueEndOfYear -
      yearData.annualInvestment * yearData.year -
      initialInvestment;
  };
  const getTotalCapitalInvested = (yearData) =>
    initialInvestment + yearData.annualInvestment * yearData.year;

  return (
    <>
      {
        !inputValid ?
          <p className='center'>Duration must be at least one year</p> :
          <table id='result' className='center'>
            <thead>
              <tr>
                <th>Year</th>
                <th>Investment Value</th>
                <th>Intrest(Year)</th>
                <th>Total Intrest</th>
                <th>Invested Capital</th>
              </tr>
            </thead>
            <tbody>
              {
                result.map(data => (
                  <tr key={data.year}>
                    <td>
                      {data.year}
                    </td>
                    <td>
                      {getFormattedCurrency(data.valueEndOfYear)}
                    </td>
                    <td>
                      {getFormattedCurrency(data.interest)}
                    </td>
                    <td>
                      {getFormattedCurrency(getTotalIntrest(data))}
                    </td>
                    <td>
                      {getFormattedCurrency(getTotalCapitalInvested(data))}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
      }
    </>
  )
}
