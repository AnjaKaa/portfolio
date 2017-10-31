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
        to: config.mail.smtp.auth.user,
        subject: config.mail.subject,
        text: req
            .body
            .message
            .trim()
            .slice(0,500)+ `\n Отправлено с <${req.body.email}>`
    }
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function (error, info){
        console.log(error);
        console.log(info);
        if (error) {
            console.log(error);
            return res.json({message: 'При отправке произошла ошибка'+error});
        }
        
    //console.log(req.body);
        res.json({message: 'Письмо успешно отправлено'})
    })
  };

