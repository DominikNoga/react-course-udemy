import React from 'react'
import './app-tabs.css';

export default function AppTabs({children, buttons, ButtonsContainer = 'menu'}) {
  // If this will be a string it will detect that we are passing a built-in component
  // If this will be a dynamic value, it will be a custom component
  return (
    <>
      <ButtonsContainer>
        {
          buttons
        }
      </ButtonsContainer>
      {
        children
      }
    </>
    
  )
}
