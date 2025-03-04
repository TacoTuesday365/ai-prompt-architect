const frameworkSelect = document.getElementById('framework');
const inputFieldsDiv = document.getElementById('input-fields');
const promptOutput = document.getElementById('prompt-output');

frameworkSelect.addEventListener('change', updateInputFields);

function updateInputFields() {
    const selectedFramework = frameworkSelect.value;
    // Clear previous inputs
    if (selectedFramework == 'rtf') {
        inputFieldsDiv.innerHTML = `
         <label for="roleRtf">Role:</label>
         <input type="text" id="roleRtf" name="roleRtf" oninput="generatePrompt()">

         <label for="taskRtf">Task:</label>
         <textarea id="taskRtf" name="taskRtf" rows="3" oninput="generatePrompt()"></textarea>

         <label for="formatRtf">Format:</label>
         <input type="text" id="formatRtf" name="formatRtf" oninput="generatePrompt()">
         `
    }
    else if (selectedFramework == 'tag') {
        inputFieldsDiv.innerHTML = `
        <label for="taskTag">Task:</label>
        <input type="text" id="taskTag" name="taskTag" oninput="generatePrompt()">

        <label for="actionTag">Action:</label>
        <input type="text" id="actionTag" name="actionTag" oninput="generatePrompt()">

        <label for="goalTag">Goal:</label>
        <input type="text" id="goalTag" name="goalTag" oninput="generatePrompt()">
        `
    }
    else if (selectedFramework == 'bab') {
        inputFieldsDiv.innerHTML = `
        <label for="beforeBab">Before:</label>
        <input type="text" id="beforeBab" name="beforeBab" oninput="generatePrompt()">

        <label for="afterBab">After:</label>
        <input type="text" id="afterBab" name="afterBab" oninput="generatePrompt()">

        <label for="bridgeBab">Bridge:</label>
        <input type="text" id="bridgeBab" name="bridgeBab" oninput="generatePrompt()">
        `
    }
    else if (selectedFramework == 'care') {
        inputFieldsDiv.innerHTML = `
        <label for="contextCare">Context:</label>
        <input type="text" id="contextCare" name="contextCare" oninput="generatePrompt()">

        <label for="actionCare">Action:</label>
        <input type="text" id="actionCare" name="actionCare" oninput="generatePrompt()">

        <label for="resultCare">Result:</label>
        <input type="text" id="resultCare" name="resultCare" oninput="generatePrompt()">

        <label for="exampleCare">Example:</label>
        <input type="text" id="exampleCare" name="exampleCare" oninput="generatePrompt()">
        `
    }
    else if (selectedFramework == 'rise') {
        inputFieldsDiv.innerHTML = `
        <label for="roleRise">Role:</label>
        <input type="text" id="roleRise" name="roleRise" oninput="generatePrompt()">

        <label for="inputRise">Input:</label>
        <input type="text" id="inputRise" name="inputRise" oninput="generatePrompt()">

        <label for="stepsRise">Steps:</label>
        <input type="text" id="stepsRise" name="stepsRise" oninput="generatePrompt()">

        <label for="expectationRise">Expectation:</label>
        <input type="text" id="expectationRise" name="expectationRise" oninput="generatePrompt()">
        `
    }
    else if (selectedFramework == 'roleplay') {
        inputFieldsDiv.innerHTML = `
         <label for="role">Role:</label>
         <input type="text" id="role" name="role" oninput="generatePrompt()">

         <label for="task">Task:</label>
         <input type="text" id="task" name="task" oninput="generatePrompt()">
         `
    }
    else if (selectedFramework == 'question') {
        inputFieldsDiv.innerHTML = `
         <label for="questionText">Question:</label>
         <input type="text" id="questionText" name="questionText" oninput="generatePrompt()">
         `
    }
    else if (selectedFramework == 'simple') {
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
        case 'tag':
            const taskTag = document.getElementById('taskTag').value;
            const actionTag = document.getElementById('actionTag').value;
            const goalTag = document.getElementById('goalTag').value;
            prompt = `The task is to ${taskTag}. Act as a ${actionTag}. Goal is to ${goalTag}.`;
            break;
        case 'bab':
            const beforeBab = document.getElementById('beforeBab').value;
            const afterBab = document.getElementById('afterBab').value;
            const bridgeBab = document.getElementById('bridgeBab').value;
            prompt = `${beforeBab}. ${afterBab}.  ${bridgeBab}.`;
            break;
        case 'care':
            const contextCare = document.getElementById('contextCare').value;
            const actionCare = document.getElementById('actionCare').value;
            const resultCare = document.getElementById('resultCare').value;
            const exampleCare = document.getElementById('exampleCare').value;
            prompt = `${contextCare}. ${actionCare}. ${resultCare}. ${exampleCare}.`;
            break;
        case 'rise':
            const roleRise = document.getElementById('roleRise').value;
            const inputRise = document.getElementById('inputRise').value;
            const stepsRise = document.getElementById('stepsRise').value;
            const expectationRise = document.getElementById('expectationRise').value;
            prompt = `Imagine you are a ${roleRise}. ${inputRise}. ${stepsRise}. ${expectationRise}.`;
            break;
    }

    promptOutput.value = prompt;
}

// Initial input fields setup (for the default selected framework)
updateInputFields();
