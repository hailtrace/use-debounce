A simple hook that debounces with options.

```javascript
import React, { useState, useCallback } from 'react';
import useDebounce from '@hailtrace/use-debounce';

function MyComponent() {
  const [ text, setText ] = useState();
  
  const handleSetText = useDebounce(
    useCallback((event) => {
      setText(event.target.value);
    }),
    1000,
    { leading: true, trailing: true },
  );

  return <input onChange={event => handleSetText(event.target.value)} placeholder="Text Input" />
}

```