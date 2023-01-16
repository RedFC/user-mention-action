const core = require('@actions/core');
const github = require('@actions/github');
const { IncomingWebhook } = require('@slack/webhook');

let run =  async () => {
    try {
        // `who-to-greet` input defined in action metadata file
        // const ArrayOfObjects = '[{"name":"Talha Khadim","slack_id":"U040J7B4GD7","github":"talhakhadim"},{"name":"Muhammad Saad","slack_id":"U04167GDGJG","github":"RedFC"},{"name":"Shahrukh Nawaz","slack_id":"U04E5MKD82Y","github":"Shahrukh98"},{"name":"Muhammad Athar","slack_id":"U046CSRL937","github":"athar-mtech"}]';
        // github.context.actor = "RedFC"
        // const url = 'https://hooks.slack.com/services/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';
        // const url = core.getInput('slack-webhook-url') || process.env.SLACK_WEBHOOK_URL;
        const webhook = new IncomingWebhook(url);
        const ArrayOfObjects = core.getInput('who-to-mention-array');
        let parsingArray = JSON.parse(ArrayOfObjects);
        let slackid = "";
        console.log(parsingArray);
        let data = parsingArray.forEach(element => {
            if(element.github == github.context.actor){
               slackid = element.slack_id
            }
        });

        console.log(data);
        // let slackid = data[0].toString();
        console.log(`Actor ${github.context.actor} !`);
        console.log(`Slack Id `+slackid+' !');

        await webhook.send({
            text: `<@${slackid}>`,
        });

        core.setOutput("slackid", slackid);
        core.setOutput("actor", github.context.actor);
        core.setOutput("footer",'user mention action by saad jawaid aka @REDFC');
        //   // Get the JSON webhook payload for the event that triggered the workflow
        //   const payload = JSON.stringify(github.context.payload, undefined, 2)
        //   console.log(`The event payload: ${payload}`);
    } catch (error) {
          core.setFailed(error.message);
    }
}

run();