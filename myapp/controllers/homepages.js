module.exports.getIndex = function(req, res) {
    res.render('pages/index', { title: 'Добро пожаловать', msg: req.query.msg  });
  };

module.exports.autorization = function(req, res) {
  if (!req.body.login || !req.body.password)
  {
      return res.redirect('/?msg=Все поля нужно заполнить');
  }

  res.redirect('/admin');
};