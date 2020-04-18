const nodemailer = require('nodemailer');
/**
 * Sends email to the provided email.
 * @param smtp
 * @param port
 * @param user
 * @param password
 * @param productUrl
 * @returns {Promise<void>}
 */
const sendMail = async (smtp, port, user, password, productUrl) => {

    const transporter = nodemailer.createTransport({
        host: smtp,
        port: port,
        secure: false,
        auth: {
            user: user,
            pass: password
        }
    });

    return transporter.sendMail({
        from: '<'+user+'>',
        to: user,
        subject: "ECIStockCheck: Product available ✔",
        html: "Product <a href='"+productUrl+"'>"+productUrl+"</a> is AVAILABLE."
    });

};

module.exports = sendMail;
