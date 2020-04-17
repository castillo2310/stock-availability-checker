const nodemailer = require('nodemailer');

const sendMail = async () => {

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });

    return transporter.sendMail({
        from: '"Castillo" <foo@example.com>', // sender address
        to: "castillo2310@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>" // html body
    });

};

sendMail().then((result) => {
    console.log('result', result);
}).catch((error) => {
    console.log('error', error);
});
