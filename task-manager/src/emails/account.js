const sgMail = require('@sendgrid/mail')



sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//     to: 'aayushkumar0795@gmail.com',
//     from: 'namrta.saxena19@gmail.com',
//     subject: 'This is first creation',
//     text: 'I hope you got the mail.'
// })
const sendwelcomeEmail = (email, name) => {
   sgMail.send({
       to: email,
       from: 'namrta@saxena.io',
       subject: 'Thanks for joining!!',
       text: `Welcome to the app, ${name}, Let me know how you get along with the app.`
    })
} 

const sendCancleEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'namrta@saxena.io',
        subject: 'GoodBye!!!',
        text: `It was great journey with you, ${name}, please tell us what we could improve`
    })
}

module.exports = {
    sendwelcomeEmail,
    sendCancleEmail
}