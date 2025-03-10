import React from 'react'

export default function InvestmentValue({ result }) {
  return (
    <section id='result' className='center'>
      <table>
        <thead>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Intrest(Year)</th>
          <th>Total Intrest</th>
          <th>Invested Capital</th>
        </thead>
        <tbody>
          {
            result.map(data => (
              <tr>
                <td>
                  {data.year}
                </td>
                <td>
                  {data.valueEndOfYear}
                </td>
                <td>
                  {data.annualInvestment}
                </td>
                <td>
                  {data.annualInvestment}
                </td>
                <td>
                  {data.annualInvestment}
                </td>
              </tr>

            ))
          }
        </tbody>
      </table>
    </section>
  )
}
