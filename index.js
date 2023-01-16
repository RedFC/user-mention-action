const core = require('@actions/core');
const github = require('@actions/github');
const { IncomingWebhook } = require('@slack/webhook');

let run =  async () => {
    try {
        // `who-to-greet` input defined in action metadata file
        // const ArrayOfObjects = '[{"github": "RedFC", "slack_id": "U04167GDGJG", "name": "Saad jawaid"}]';
        // github.context.actor = "RedFC"
        // const url = 'https://hooks.slack.com/services/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';
        const url = core.getInput('slack-webhook-url') || process.env.SLACK_WEBHOOK_URL;
        const webhook = new IncomingWebhook(url);
        const ArrayOfObjects = core.getInput('who-to-mention-array');
        let parsingArray = JSON.parse(ArrayOfObjects)
        let data = parsingArray.map(element => {
            if(element.github == github.context.actor){
               return element.slack_id
            }
        });
        // let slackid = 'U0313EK6DQR';
        let slackid = data[0].toString();
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