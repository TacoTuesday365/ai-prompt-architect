const frameworkSelect = document.getElementById('framework');
const inputFieldsDiv = document.getElementById('input-fields');
const promptOutput = document.getElementById('prompt-output');

frameworkSelect.addEventListener('change', updateInputFields);

function updateInputFields() {
    const selectedFramework = frameworkSelect.value;
    inputFieldsDiv.innerHTML = ''; // Clear previous inputs

    switch (selectedFramework) {
        case 'simple':
            createInputField('instruction', 'Instruction:');
            break;
        case 'roleplay':
            createInputField('role', 'Role:');
            createInputField('task', 'Task:');
            break;
        case 'question':
            createInputField('questionText', 'Question:');
            break;
        case 'rtf': // Added R-T-F
            createInputField('roleRtf', 'Role:');
            createInputField('taskRtf', 'Task:');
            createInputField('formatRtf', 'Format:');
            break;
    }
}

function createInputField(id, labelText) {
    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.textContent = labelText;

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', id);
    input.setAttribute('name', id);

    inputFieldsDiv.appendChild(label);
    inputFieldsDiv.appendChild(input);

    input.addEventListener('input', generatePrompt); // Generate prompt on input
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
