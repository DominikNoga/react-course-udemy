import React from 'react'

export default function QuestionTile({onSelectQuestion, question}) {
  return (
    <div className='answer'>
      <button onClick={onSelectQuestion}>{ question }</button>
    </div>
  )
}
