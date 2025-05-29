# React re-renders explained (source: https://www.developerway.com/posts/react-re-renders-guide#part1)
The initial render is the first render of a component, the re-render is an update of a component,
caused by changing some data on the screen, usually because of the user interaction or caused by external data.

## The re-renders can be divided into two types:
* Necessary -> This one happens because component was updated by the user or the data,
for example user has changed the theme of the app and it needs to be re-rendered.
Or user has sorted the table and it needs to be reflected on the screen.

* Unnecessary -> This will happen when the component re-renders but it's data was not updated.
This will be caused by placing state to high in the hierarchy. For example not needed re-render,
will be when navigation is re-rendered, because of some change in the sidebar component.

## When a component will re-render?
There  are 4 main reasons for a component to re-render:
* State has changed in the component -> root source of all re-renders

* Parent has updated -> In most cases child won't cause re-render of a parent,
but there are some edge cases (https://www.developerway.com/posts/react-elements-children-parents)

* Context has updated -> When any value inside of a context will be updated. <b>All</b> components,
consuming this context will be updated, no matter if they are using the updated portion of the context.
Those re-renders can be optimised (https://www.developerway.com/posts/react-re-renders-guide#part7)

* Hooks change -> Changing something state/context in the hook will still cause re-render of the host component.

* Props change -> It does NOT cause re-render, props will change when parent component updates,
so child re-render will happen anyway, but not cause of the props changing.

## How to prevent not needed re-renders
* Move state down -> do not keep state along with other components that does not depend on it
example (https://codesandbox.io/p/sandbox/part-3-2-moving-state-down-vlh4gf?file=%2Fsrc%2FApp.tsx%3A10%2C41)

* We can also pass components that do not need re-render as children, this is connected to the fact,
that props change do not cause the re-render.
example (https://codesandbox.io/p/sandbox/part-3-3-children-as-props-59icyq?file=%2Fsrc%2FApp.tsx)

* React.memo -> We can wrap this around component and prevent re-render when parent is re-rendered.
This will re-render component only when it props will change. (Also described in section 13 of the course)