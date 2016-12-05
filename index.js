const schedule = require('node-schedule');
const Nightmare = require('nightmare');

console.log(new Date().getHours());

const nightmare = Nightmare({ openDevTools: {
    mode: 'detach'
  }, show: true });

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 5)];
rule.hour = 1;
rule.minute = 0;

nightmare
  .goto('https://femascloud.com/bonio2016/accounts/login')
  .wait('#user_username')
  .type('input#user_username', 'neil.zheng')
  .type('input#user_passwd', 'aa55665566')
  .click('#s_buttom')
  .wait('.clock_enabled')
  .evaluate(function(){
    document.querySelector('input[value="第1段上班"]').id = 'check-in'
    document.querySelector('input[value="第1段下班"]').id = 'check-out'
    return null;
  })
  .click('#check-in')
  .wait(5000)
  .end()
  .catch(err => console.error(err));
