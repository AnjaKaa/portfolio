const nodemailr = require('nodemailer');
const config = require('../config.json');
const http = require('request');

const apiOptions = {
    server: config.http.server
}

module.exports.getWorks = function(req, res) {
    const pathAPI = '/api/work';
    const requestOptions = {
      url: apiOptions.server + pathAPI,
      method: 'GET'
    };
    const sendObj = { 
      'title': 'Мои работы'
    };

    http(requestOptions, function(error,response,body){
     
      sendObj.listSlides = JSON.parse(body).listSlides;
      console.log(sendObj)
      res.render('pages/my-works', sendObj);
    });
  };

module.exports.sendEmail = function(req, res) {
    // console.log(req.body);
    // res.json(req.body);

     if (!req.body.name || !req.body.email || !req.body.message)
        {
            return res.redirect('/?msg=Все поля нужно заполнить');
        }

    
        
    const transporter = nodemailr.createTransport(config.mail.smtp);
    const mailOptions = {
        from: `"${req.body.name}" <${req.body.email}>`,
        to: config.mail.auth.user,
        subject: config.mail.subject,
        text: req
            .body
            .message
            .trim()
            .slice(0,500)+ `\n Отправлено с <${req.body.email}>`
    }
    transporter.sendEmail(mailOptions, function (error, info){
        if (error) {
            console.log(error);
            return res.redirect('/?msg = При отправке произошла ошибка');
        }
        
    console.log(req.body);
        res.redirect('/?msg=Письмо успешно отправлено')
    })
  };

