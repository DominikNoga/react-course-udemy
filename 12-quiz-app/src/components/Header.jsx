import React from 'react'
import logo from '../assets/quiz-logo.png';


export default function Header() {
  return (
    <header>
      <img src={logo} alt="Pink notebook" />
      <h1>Reactquiz</h1>
    </header>
  )
}
