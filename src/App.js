// src/App.js
import React, { useState, useEffect, useCallback } from 'react';

function App() {
  const [frameworksData, setFrameworksData] = useState([]);
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [componentValues, setComponentValues] = useState({});
  const [message, setMessage] = useState('PromptArchi helps you design effective AI prompts using structured frameworks!');
  const [generatedResponse, setGeneratedResponse] = useState('');

  useEffect(() => {
    const fetchFrameworks = async () => {
      try {
        const response = await fetch('/frameworks.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFrameworksData(data);
        setSelectedFramework(data[0]);
      } catch (error) {
        console.error('Could not fetch frameworks:', error);
        setMessage('Error loading frameworks. Please check the console.');
      }
    };

    fetchFrameworks();
  }, []);

  const handleFrameworkChange = (event) => {
    const selectedName = event.target.value;
    const framework = frameworksData.find((f) => f.name === selectedName);
    setSelectedFramework(framework);
    setComponentValues({});
    setPrompt('');
    setGeneratedResponse(''); // Clear the generated response when the framework changes
  };

  const handleComponentValueChange = (label, value) => {
    setComponentValues({ ...componentValues, [label]: value });
  };

  const generatePrompt = useCallback(async () => {
    let promptText = '';
    if (selectedFramework && selectedFramework.components) {
      selectedFramework.components.forEach((component) => {
        promptText += `${component.label}: ${componentValues[component.label] || ''}\n`;
      });
    }
    setPrompt(promptText);

    // Construct the request to your Netlify function
    try {
      const response = await fetch('/.netlify/functions/generatePrompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: promptText }), // Send the prompt text to the API
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGeneratedResponse(data.refinedPrompt); // Adjust based on the response structure
    } catch (error) {
      console.error('Error calling function:', error);
      setGeneratedResponse('Error calling function: ' + error);
    }
  }, [selectedFramework, componentValues]);

  if (!frameworksData || frameworksData.length === 0) {
    return <div>Loading frameworks...</div>;
  }

  return (
    <div className="App">
      <h1 style={{ padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
        Prompt Archi - Pro AI Prompt Architect
      </h1>
      <div>
        <label htmlFor="framework">Select Framework:</label>
        <select
          id="framework"
          onChange={handleFrameworkChange}
          value={selectedFramework ? selectedFramework.name : ''}
          style={{ width: '400px' }}
        >
          {frameworksData.map((framework) => (
            <option key={framework.name} value={framework.name}>
              {framework.name} - {framework.description}
            </option>
          ))}
        </select>
      </div>
      {selectedFramework && selectedFramework.components && (
        <div>
          {selectedFramework.components.map((component) => (
            <div key={component.label}>
              <label htmlFor={component.label}>{component.label}:</label>
              <input
                type="text"
                id={component.label}
                value={componentValues[component.label] || ''}
                onChange={(e) => handleComponentValueChange(component.label, e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box' }}
              />
              <p style={{ color: '#d1d5db' }}>
                {component.helpText}
                <br />
                Example: {component.example}
              </p>
            </div>
          ))}
        </div>
      )}
      <button onClick={generatePrompt}>Generate Optimized Prompt</button>
      <div>
        <h2>Optimized Prompt:</h2>
        <pre>{generatedResponse}</pre>
      </div>
    </div>
  );
}

export default App;
