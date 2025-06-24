import { useState, useEffect } from 'react';

function ExampleComponent() {
  // useState: manages the count state
  const [count, setCount] = useState(0);

  // useEffect: runs whenever count changes
  useEffect(() => {
    console.log(`Count changed to: ${count}`);
    // This is a side effect - logging to console
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div style={{ textAlign: 'center' }}>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Let's try this again!
      </button>
    </div>
  );
}

export default ExampleComponent; 