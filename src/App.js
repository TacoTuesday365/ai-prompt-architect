import React, { useState, useEffect } from 'react';

const frameworksData = [
  {
    name: 'R-T-F',
    components: [
      { label: 'Role', type: 'text' },
      { label: 'Task', type: 'text' },
      { label: 'Format', type: 'text' },
    ],
  },
  {
    name: 'T-A-G',
    components: [
      { label: 'Task', type: 'text' },
      { label: 'Action', type: 'text' },
      { label: 'Goal', type: 'text' },
    ],
  },
  {
    name: 'B-A-B',
    components: [
      { label: 'Before', type: 'text' },
      { label: 'After', type: 'text' },
      { label: 'Bridge', type: 'text' },
    ],
  },
];

function App() {
  const [selectedFramework, setSelectedFramework] = useState(frameworksData[0]);
  const [prompt, setPrompt] = useState('');
  const [componentValues, setComponentValues] = useState({});
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

  const handleFrameworkChange = (event) => {
    const selectedName = event.target.value;
    const framework = frameworksData.find((f) => f.name === selectedName);
    setSelectedFramework(framework);
    setComponentValues({}); // Reset component values when framework changes
    setPrompt(''); // Reset the prompt as well
  };

  const handleComponentValueChange = (label, value) => {
    setComponentValues({ ...componentValues, [label]: value });
  };

  const generatePrompt = () => {
    let promptText = '';
    selectedFramework.components.forEach((component) => {
      promptText += `${component.label}: ${componentValues[component.label] || ''}\n`;
    });
    setPrompt(promptText);
  };

  return (
    <div className="App">
      <h1>Prompt Generator</h1>
      <p>{message}</p>
      <div>
        <label htmlFor="framework">Select Framework:</label>
        <select id="framework" onChange={handleFrameworkChange} value={selectedFramework.name}>
          {frameworksData.map((framework) => (
            <option key={framework.name} value={framework.name}>
              {framework.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        {selectedFramework.components.map((component) => (
          <div key={component.label}>
            <label htmlFor={component.label}>{component.label}:</label>
            <input
              type={component.type}
              id={component.label}
              value={componentValues[component.label] || ''}
              onChange={(e) => handleComponentValueChange(component.label, e.target.value)}
            />
          </div>
        ))}
      </div>
      <button onClick={generatePrompt}>Generate Prompt</button>
      <div>
        <h2>Generated Prompt:</h2>
        <pre>{prompt}</pre>
      </div>
    </div>
  );
}

export default App;
