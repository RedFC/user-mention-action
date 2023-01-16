const core = require('@actions/core');
const github = require('@actions/github');

try {
    // `who-to-greet` input defined in action metadata file
    const ArrayOfObjects = '[{"github": "RedFC", "slack_id": "U04167GDGJG", "name": "Saad jawaid"}]';
    let parsingArray = JSON.parse(ArrayOfObjects)
    // const ArrayOfObjects = core.getInput('who-to-greet');
    let data = parsingArray.map(element => {
        if(element.github == github.context.actor){
           return element.slack_id
        }
    });
    
    console.log(`Hello ${parsingArray}!`);
    console.log(`Hello ${github.context.actor}!`);
    console.log(`slack id ${data}!`);
    core.setOutput("slackid", data);
    core.setOutput("actor", github.context.actor);
    //   // Get the JSON webhook payload for the event that triggered the workflow
    //   const payload = JSON.stringify(github.context.payload, undefined, 2)
    //   console.log(`The event payload: ${payload}`);
} catch (error) {
    //   core.setFailed(error.message);
}