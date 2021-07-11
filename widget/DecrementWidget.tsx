import React, { useState, useCallback } from 'react';

const DecrementWidget = () => {
  const [count, setCount] = useState(100);

  const decrement = useCallback(() => {
    setCount(count - 1);
  }, [count]);

  return (
    <div style={{ border: '1px solid blue', padding: 20 }}>
      <div>Current Value = {count}</div>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default DecrementWidget;
