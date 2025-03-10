import React from 'react'
import headerImage from '../../assets/investment-calculator-logo.png';

export default function Header() {
  return (
    <header id='header'>
        <img src={headerImage} alt="Money bag" />
        <h1>Investment Calculator</h1>
    </header>
  )
}
