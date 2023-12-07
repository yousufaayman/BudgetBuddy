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


// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
