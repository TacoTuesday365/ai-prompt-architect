import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/.netlify/functions/hello');
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        setMessage('Error calling function: ' + error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Prompt Generator</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
