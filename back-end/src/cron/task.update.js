const CronJob = require('cron').CronJob
const Task = require('../models/task.list.model.js');

const job = new CronJob('0 */30 * * * *', async function () {
    // Update task data complete if current date + repeat days has passed

    // If due time + repeat is greater than current date set due time to current date
    Task.updateMany({
        repeat: {
            $ne: 0
        },
        $expr: {
            $gt: [{
                $add: ['$due_time', {
                    $multiply: ['$repeat', 24 * 60 * 60 * 1000]
                }]
            }, Date.now().valueOf()]
        },
        complete: true
    }, {
        due_time: Date.now().valueOf(),
        complete: false
    }).exec().then((result) => {
        console.log('Updated Task Data');
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });

});

job.start();

module.exports = job;