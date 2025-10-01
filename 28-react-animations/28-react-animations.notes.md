# Animating React apps
For animations in React apps, we can use CSS animations or libraries like Framer Motion or React Spring.
The good way can be to use CSS animations for simple effects and libraries for complex ones.
For example with modal, css is fine for animating the showing, but it does not have access to the modal when it is closed, so we can use a library for that.

## Framer Motion
This is a popular library for animations in React apps. It provides a simple API and powerful features for creating complex animations in a simple way.
In order to start, first install the library: `npm install framer-motion`.
Then we can import the `motion` component from the library and use it to wrap the elements we want to animate.

The simplest way to animate an element is to use the `animate` prop, which takes an object with the properties we want to animate and their target values.
For example, to rotate an icon when a button is clicked, we can do the following:
```jsx
import { motion } from 'framer-motion';
// ...
<motion.span
{/* animate prop allows to select the properties that we want to animate */}
  animate={{ rotate: isExpanded ? 180 : 0 }}
  {/* transition prop allows to define the animation details, like duration, easing or type of animation */}
  transition={{ duration: 0.2 }}
  className="challenge-item-details-icon"
>
  &#9650;
</motion.span>
```

### Animating presence
To animate the presence of an element, we can use the `AnimatePresence` component from Framer Motion.
This component allows us to animate elements when they are added or removed from the DOM.
To use it, we need to wrap the elements we want to animate with the `AnimatePresence` component and use the `initial`, `animate` and `exit` props on the elements we want to animate.

```jsx
import { motion, AnimatePresence } from 'framer-motion';
// ...
return (
  {/* it will make sure that before removing the modal from DOM, if it has the exit animation defined, it will run it */}
  <AnimatePresence>
    {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
  </AnimatePresence>
)
```

### Animating on event
We can also animate elements on events like hover or tap using the `whileHover` and `whileTap` props.
For example, to scale a button when it is hovered or tapped, we can do the following:
```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="add-challenge-button"
  onClick={() => setIsCreatingNewChallenge(true)}
>
  + Add Challenge
</motion.button>
```

### Re-using animations
We can also re-use animations by defining them as objects and passing them to the motion components.
Also we can use variants to define multiple animations for a component and switch between them using the `animate` prop.

```jsx
export default function Modal({ title, children, onClose }) {
  const hiddenAnimation = {
    opacity: 0,
    y: '5rem',
    scale: 0.7
  };

  return (
    <>
      <motion.dialog
        variants={{
          hidden: hiddenAnimation,
          visible: { opacity: 1, y: '0', scale: 1 }
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.2, ease: 'easeOut' }}
      ></motion.dialog>
    </>
  )
}
```

### Animation variants
Variants are a powerful feature in Framer Motion that allow us to define multiple animation states for a component and switch between them using the `animate` prop. We can use it for more than just re-using the animation in the same component, we can also use it to coordinate animations between multiple components.

```jsx
// We have the modal parent component which defines the variants visible and hidden
// when we will use those variants in child components, they will also trigger the animation
<motion.dialog
  open
  variants={{
    hidden: hiddenAnimation,
    visible: { opacity: 1, y: '0', scale: 1 }
  }}
  className="modal"
  initial="hidden"
  animate="visible"
  exit="hidden"
  transition={{ duration: 0.2, ease: 'easeOut' }}
>
  <h2>{title}</h2>
  {children}
</motion.dialog>

<motion.ul
  variants={{
    visible: {
      // staggerChildren will make sure that the children animations will be triggered one after another with a delay of 0,1s
      transition: { staggerChildren: 0.1 }
    }
  }}
>
  {images.map((image) => (
    <motion.li
      variants={{
        hidden: { opacity: 0, scale: 0.5 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { type: 'spring' }
        }
      }}
    >
    </motion.li>
  ))}
</motion.ul>
```

### Animating keyframes
We can also animate keyframes using Framer Motion by passing an array of values to the animation properties.
```jsx
function Component() {
  const test = '';
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, scale: 0.5 },
        visible: {
          opacity: 1,
          // scale: [1, 1.2, 1],
          transition: { type: 'spring' }
        }
      }}
    >
      ...content
    </motion.li>
  );
}
```

### Imperative animations
We can also trigger animations imperatively using the `useAnimate` hook from Framer Motion.
This hook returns a scope ref and an animate function that we can use to trigger animations on the elements within the scope.
```jsx
import { motion, useAnimate } from 'framer-motion';
// ...
const [scope, animate] = useAnimate();
// ...
const validate = () => {
  if (/* some validation fails */) {
    animate(
      'input, textarea',
      {
        x: [-10, 0, 10, 0]
      },
      { duration: 0.2, delay: stagger(0.05) }
    );
    return;
  }
}
// ...
return (
  <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
    {/* form content */}
  </form>
);
```
