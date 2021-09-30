const cron = require("node-cron");

cron.schedule("0 0 * * MON", function(){
console.log("Cron job is running...")
});