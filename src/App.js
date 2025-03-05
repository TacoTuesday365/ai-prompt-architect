import React, { useState, useEffect } from 'react';

function App() {
  const [frameworksData, setFrameworksData] = useState([]);
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [componentValues, setComponentValues] = useState({});
  const [message, setMessage] = useState('PromptArchi helps you design effective AI prompts using structured frameworks!');

  useEffect(() => {
    const fetchFrameworks = async () => {
      try {
        const response = await fetch('/frameworks.json'); // Path to your frameworks.json file
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFrameworksData(data);
        setSelectedFramework(data[0]); // Select the first framework by default
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
  };

  const handleComponentValueChange = (label, value) => {
    setComponentValues({ ...componentValues, [label]: value });
  };

  const generatePrompt = () => {
    let promptText = '';
    if (selectedFramework && selectedFramework.components) {
      selectedFramework.components.forEach((component) => {
        promptText += `${component.label}: ${componentValues[component.label] || ''}\n`;
      });
    }
    setPrompt(promptText);
  };

  if (!frameworksData || frameworksData.length === 0) {
    return <div>Loading frameworks...</div>;
  }

  return (
    <div className="App">
      <h1 style={{ backgroundColor: '#222', padding: '10px', borderRadius: '5px' }}>
        Prompt Archi - Pro AI Prompt Architect
      </h1>
      <p>{message}</p>
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
                type={component.type}
                id={component.label}
                value={componentValues[component.label] || ''}
                onChange={(e) => handleComponentValueChange(component.label, e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box' }}
              />
              <p style={{ fontSize: '0.8em', color: '#999' }}>
                {component.helpText}
                <br />
                Example: {component.example}
              </p>
            </div>
          ))}
        </div>
      )}
      <button onClick={generatePrompt}>Generate Prompt</button>
      <div>
        <h2>Generated Prompt:</h2>
        <pre>{prompt}</pre>
      </div>
    </div>
  );
}

export default App;
