const { sendMail } = require('./Mailer')
await sendMail({
    from: 'seif.elbosaty3@gmail.com',
    to: 'seif.elbosaty90@gmail.com',
    subject: `Buddy budget`,
    text: 'todays update',
    html: `<h1>new updates</h1>`
  });
  await sendMail({
    from: 'seif.elbosaty3@gmail.com',
    to: 'seif.elbosaty90@gmail.com',
    subject: `Buddy budget`,
    text: 'todays update',
    html: `<h1>new updates</h1>`
  });
