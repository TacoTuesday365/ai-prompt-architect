import React, { useState } from "react";

function App() {
  const [generatePrompt, setGeneratePrompt] = useState(""); // Updated variable name
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generatePromptHandler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/.netlify/functions/generatePrompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: "Explain how AI works" }),
      });

      const result = await response.json();
      if (response.ok) {
        setGeneratePrompt(result.generatePrompt); // Update to the correct field
      } else {
        setError(result.error); // If an error occurs
      }
    } catch (error) {
      setError(error.message); // Handle any network errors
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={generatePromptHandler}>Generate Prompt</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div>
        <h3>Generated Prompt:</h3>
        <p>{generatePrompt}</p> {/* This is where the result will be displayed */}
      </div>
    </div>
  );
}

export default App;
