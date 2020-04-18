const nodemailer = require('nodemailer');
/**
 * Sends email to the provided email.
 * @param smtp
 * @param port
 * @param account
 * @param password
 * @param productUrl
 * @returns {Promise<void>}
 */
const sendMail = async (smtp, port, account, password, productUrl) => {

    const transporter = nodemailer.createTransport({
        host: smtp,
        port: port,
        secure: false,
        auth: {
            user: account,
            pass: password
        }
    });

    return transporter.sendMail({
        from: '<'+account+'>',
        to: account,
        subject: "ECIStockCheck: Product available ✔",
        html: "Product <a href='"+productUrl+"'>"+productUrl+"</a> is AVAILABLE."
    });

};

module.exports = sendMail;
