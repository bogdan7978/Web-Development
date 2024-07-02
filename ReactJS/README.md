After version 16.8 React hooks are a better use than classes
Hooks are a more ergonomic way to build components, 
React has 10 built-in hooks
Hooks are function that always start with `use`
Hooks need to be called only at the top level of a function (except custom hooks)

### `useState()`
When data changes re-render the UI
```JS
import { useState } from 'react';

function App() {
  // The (0) is the initial state. The 1st argument from the variable is the `reactive value/state`
  // second value is the `setter`
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
### `useEffect()`
