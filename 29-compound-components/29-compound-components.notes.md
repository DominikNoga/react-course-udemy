# Compound Components
Compound components are components that are made up of multiple smaller components. This is a common pattern in React, and it allows us to create more complex components by combining simpler ones. The compound components work together to provide a unified interface for the user. They are basically useless on their own, but when used together, they can provide a lot of functionality.
The good analogy is a <select> and <option> HTML elements. The <select> element is the compound component, and the <option> elements are the smaller components that make up the compound component. The <select> element provides a unified interface for the user to select an option from a list of options.

## Compound components in React
In our example we use the Accordion component which is made up of multiple AccordionItem components. The Accordion component provides a unified interface for the user to expand and collapse the AccordionItem components. Only one AccordionItem can be expanded at a time. We manage the shared state using the Context API.

```JSX
import { createContext, useContext, useState } from 'react';

import AccordionItem from './AccordionItem.jsx';
import AccordionTitle from './AccordionTitle.jsx';
import AccordionContent from './AccordionContent.jsx';

const AccordionContext = createContext();

export function useAccordionContext() {
  const ctx = useContext(AccordionContext);

  if (!ctx) {
    throw new Error(
      'Accordion-related components must be wrapped by <Accordion>.'
    );
  }

  return ctx;
}

export default function Accordion({ children, className }) {
  const [openItemId, setOpenItemId] = useState();

  function toggleItem(id) {
    setOpenItemId((prevId) => (prevId === id ? null : id));
  }

  const contextValue = {
    openItemId,
    toggleItem,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <ul className={className}>{children}</ul>
    </AccordionContext.Provider>
  );
}
// We can attach the subcomponents as static properties of the main component
// To make it clear that they are meant to be used together
Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;
```

Example usage:

```jsx
function App() {
  return (
    <Accordion className="accordion">
      <Accordion.Item id="experience" className="accordion-item">
        <Accordion.Title className="accordion-item-title">
          We got 20 years of experience
        </Accordion.Title>
        <Accordion.Content className="accordion-item-content">
          <article>
            <p>You can&apos;t go wrong with us.</p>
            <p>
              We are in the business of planning highly individualized
              vacation trips for more than 20 years.
            </p>
          </article>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item id="local-guides" className="accordion-item">
        <Accordion.Title className="accordion-item-title">
          We are working with local guides
        </Accordion.Title>
        <Accordion.Content className="accordion-item-content">
          <article>
            <p>We are not doing this along from our office.</p>
            <p>
              Instead, we are working with local guides to ensure a safe and
              pleasant vacation.
            </p>
          </article>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  )
}
```

## Render props
Render props is a pattern in React that allows us to share code between components using a prop whose value is a function. This is useful when we want to create a component that can be used in multiple ways. In our example we use the SearchableList component which takes a list of items and a render prop as children. The render prop is a function that takes an item and returns a React element. This allows us to customize how each item is rendered.

```jsx
<SearchableList items={data} itemKeyFn={(item) => item.id}>
  {(item) => <Place item={item} />}
</SearchableList>
```