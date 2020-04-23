const nodemailer = require('nodemailer');

const notify = async (data, product) => {
    return new Promise((resolve, reject) => {
        if (!data.smtp || !data.port || !data.user || !data.password) reject('Invalid SMTP data');

        const transporter = nodemailer.createTransport({
            host: data.smtp,
            port: data.port,
            secure: false,
            auth: {
                user: data.user,
                pass: data.password
            }
        });

        transporter.sendMail({
            from: '<'+data.user+'>',
            to: data.user,
            subject: "StockAvailabilityChecker: Product available ✔",
            html: `Product <a href="${product.url}">${product.url}</a> is AVAILABLE.`
        }).then(() => resolve()).catch((error) => reject(error));
    });
};

module.exports = notify;
