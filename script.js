const frameworkSelect = document.getElementById('framework');
const inputFieldsDiv = document.getElementById('input-fields');
const promptOutput = document.getElementById('prompt-output');

frameworkSelect.addEventListener('change', updateInputFields);

function updateInputFields() {
    const selectedFramework = frameworkSelect.value;
    // Clear previous inputs
    if(selectedFramework == 'rtf'){
         inputFieldsDiv.innerHTML = `
         <label for="roleRtf">Role:</label>
         <input type="text" id="roleRtf" name="roleRtf" oninput="generatePrompt()">

         <label for="taskRtf">Task:</label>
         <input type="text" id="taskRtf" name="taskRtf" oninput="generatePrompt()">

         <label for="formatRtf">Format:</label>
         <input type="text" id="formatRtf" name="formatRtf" oninput="generatePrompt()">
         `
    }
    if(selectedFramework == 'roleplay'){
         inputFieldsDiv.innerHTML = `
         <label for="role">Role:</label>
         <input type="text" id="role" name="role" oninput="generatePrompt()">

         <label for="task">Task:</label>
         <input type="text" id="task" name="task" oninput="generatePrompt()">
         `
    }
    if(selectedFramework == 'question'){
         inputFieldsDiv.innerHTML = `
         <label for="questionText">Question:</label>
         <input type="text" id="questionText" name="questionText" oninput="generatePrompt()">
         `
    }
    if(selectedFramework == 'simple'){
         inputFieldsDiv.innerHTML = `
         <label for="instruction">Instruction:</label>
         <input type="text" id="instruction" name="instruction" oninput="generatePrompt()">
         `
    }
}

function createInputField(id, labelText) {
    //Not needed anymore
}

function generatePrompt() {
    const selectedFramework = frameworkSelect.value;
    let prompt = '';

    switch (selectedFramework) {
        case 'simple':
            prompt = document.getElementById('instruction').value;
            break;
        case 'roleplay':
            const role = document.getElementById('role').value;
            const task = document.getElementById('task').value;
            prompt = `Act as a ${role}.  ${task}`;
            break;
        case 'question':
            prompt = document.getElementById('questionText').value;
            break;
        case 'rtf': // Added R-T-F
            const roleRtf = document.getElementById('roleRtf').value;
            const taskRtf = document.getElementById('taskRtf').value;
            const formatRtf = document.getElementById('formatRtf').value;
            prompt = `Act as a ${roleRtf}.  ${taskRtf}. Show as ${formatRtf}.`;
            break;
    }

    promptOutput.value = prompt;
}

// Initial input fields setup (for the default selected framework)
updateInputFields();
