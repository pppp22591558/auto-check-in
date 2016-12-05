const schedule = require('node-schedule');
const Nightmare = require('nightmare');

const nightmare = Nightmare({ openDevTools: {
    mode: 'detach'
  }, show: true });

const checkInRule = new schedule.RecurrenceRule();
checkInRule.dayOfWeek = [0, new schedule.Range(1, 5)];
checkInRule.hour = 1;
checkInRule.minute = 0;

const checkOutRule = new schedule.RecurrenceRule();
checkOutRule.dayOfWeek = [0, new schedule.Range(1, 5)];
checkOutRule.hour = 10;
checkOutRule.minute = 0;

const i = schedule.scheduleJob(checkInRule, function() {
  console.log('Checked in');
  startCheck('in');
});

const o = schedule.scheduleJob(checkOutRule, function() {
  console.log('Checked out');
  startCheck('out');
});

function startCheck(option) {
  let s;
  if (option === 'out') {
    s = 'check-out';
  } else {
    s = 'check-in';
  }
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
    .click('#' + s)
    .wait(5000)
    .end()
    .catch(err => console.error(err));
}
