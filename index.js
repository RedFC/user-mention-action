const core = require('@actions/core');
const github = require('@actions/github');

try {
    // `who-to-greet` input defined in action metadata file
    // const ArrayOfObjects = '[{"github": "RedFC", "slack_id": "U04167GDGJG", "name": "Saad jawaid"}]';
    const ArrayOfObjects = core.getInput('who-to-mention-array');
    let parsingArray = JSON.parse(ArrayOfObjects)
    let data = parsingArray.map(element => {
        if(element.github == github.context.actor){
           return element.slack_id
        }
    });
    
    console.log(`Hello ${parsingArray}!`);
    console.log(`Hello ${github.context.actor}!`);
    console.log(`slack id ${data}!`);
    core.setOutput("slackid", data[0]);
    core.setOutput("actor", github.context.actor);
    core.setOutput("footer",'mention action by saad jawaid aka @REDFC');
    //   // Get the JSON webhook payload for the event that triggered the workflow
    //   const payload = JSON.stringify(github.context.payload, undefined, 2)
    //   console.log(`The event payload: ${payload}`);
} catch (error) {
      core.setFailed(error.message);
}