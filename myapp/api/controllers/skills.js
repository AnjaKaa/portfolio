const mongoose = require('mongoose');

module.exports.getSkills = function(req,res) {
    const skillsList=[
                 {
                     group:'Frontend',
                     skills: [
                         {
                             name:'HTML5',
                             knowledge: 90
                         },
                         {
                             name:'CSS',
                             knowledge: 80
                         },
                         {
                             name:'Javascript\n&jQuery',
                             knowledge: 85
                         }
                     ]    
                 },
                 {
                     group:'Backend',
                     skills: [
                         {
                             name:'PHP',
                             knowledge: 30
                         },
                         {
                             name:'mySQL',
                             knowledge: 55
                         },
                         {
                             name:'Node.js\n&npm',
                             knowledge: 30
                         },
                     
                         {
                             name:'Mongo.bd',
                             knowledge: 35
                         }
                     ]    
                 },
                 {
                     group:'WorkFlow',
                     skills: [
                         {
                             name:'Git',
                             knowledge: 70
                         },
                         {
                             name:'Gulp',
                             knowledge: 60
                         },
                         {
                             name:'Webpack',
                             knowledge: 50
                         },
                         {
                             name:'Bower',
                             knowledge: 30
                         }
                     ]    
                 }
             ];

    const blog = mongoose.model('skill');

    blog.find().then( items =>{
        if (!items.length) {
            res.status(200).json({skillsList: skillsList});
        } else {
            res.status(200).json({skillsList: items});
        }
    })
}


module.exports.updateSkills = function(req, res){
    let Model = mongoose.model('skill');
    models=req.body;
    // if (models.filter(m => m.validateSync()).length) {
    //     return res.json({error: 'Не удалсь сохранить данные!'});
    // }


    // обновить
    Model.remove({}).then(() =>
            Model.insertMany(models).then(() =>
            res.json({message: 'Сохранено!'})
            )
    );
  };


//   skill.find().then(items => {
//     skillsList = items.reduce((prev,cur) => {
//         prev[cur.group] = cur.skills.reduce((prev,cur) =>{
//             prev[cur.name] = cur.knowledge;
//             return prev;
//         }, {});

//         return prev;
//     },{});
//   });