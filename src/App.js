import React, { useState, useEffect } from 'react';

const frameworksData = [
  {
    name: 'R-T-F',
    description: "Defines the role, task, and format",
    components: [
      { label: 'Role', type: 'text', helpText: 'The persona or role the AI should adopt (e.g., "Facebook Ad Marketer")', example: "Facebook Ad Marketer" },
      { label: 'Task', type: 'text', helpText: 'The specific task you want the AI to perform (e.g., "Design a Facebook ad campaign")', example: "Design a compelling Facebook ad campaign to promote a new line of fitness apparel for a sports brand." },
      { label: 'Format', type: 'text', helpText: 'How the AI should present the output (e.g., "Create a storyboard")', example: "Create a storyboard outlining the sequence of ad creatives, including ad copy, visuals, and targeting strategy." },
    ],
  },
  {
    name: 'T-A-G',
    description: "Defines a task, an action, and a goal",
    components: [
      { label: 'Task', type: 'text', helpText: 'What task needs to be done', example: "The task is to evaluate the performance of team members" },
      { label: 'Action', type: 'text', helpText: 'What actions to take', example: "Act as a Direct manager and assess the strengths and weaknesses of team members" },
      { label: 'Goal', type: 'text', helpText: 'What is the goal', example: "Goal is to improve team performance so that the average user satisfaction score moves from 6 to 7.5 in the next quarter" },
    ],
  },
  {
    name: 'B-A-B',
    description: "Defines the before, after, and bridge",
    components: [
      { label: 'Before', type: 'text', helpText: 'Explain Problem', example: "We're nowhere to be seen on SEO rankings" },
      { label: 'After', type: 'text', helpText: 'State Outcome', example: "We want to be in top 10 SEO ranking in our niche in 90 days" },
      { label: 'Bridge', type: 'text', helpText: 'Ask for the solution', example: "Develop a detailed plan for mentioning all the measures we should take also include list of top 20 keywords" },
    ],
  },
];

function App() {
  const [selectedFramework, setSelectedFramework] = useState(frameworksData[0]);
  const [prompt, setPrompt] = useState('');
  const [componentValues, setComponentValues] = useState({});
  const [message, setMessage] = useState('Unlock the power of AI with structured prompt frameworks!');

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
      <h1 style={{ backgroundColor: '#222', padding: '10px', borderRadius: '5px' }}>Prompt Archi - Pro AI Prompt Architect</h1>
      <p>{message}</p>
      <div>
        <label htmlFor="framework">Select Framework:</label>
        <select id="framework" onChange={handleFrameworkChange} value={selectedFramework.name}>
          {frameworksData.map((framework) => (
            <option key={framework.name} value={framework.name}>
              {framework.name} - {framework.description}
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
              style={{ width: '400px' }} // Adjusted width here
            />
            <p style={{ fontSize: '0.8em', color: '#999' }}>
              {component.helpText}
              <br/>
              Example: {component.example}
            </p>
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
