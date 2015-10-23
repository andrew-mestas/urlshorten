var db = require('./models');

// db.user.create({
//     firstName: 'Brian',
//     lastName: 'Hague',
//     age: 99,
//     email: 'brian.hague@ga.co'
// }).then(function(user) {
//     console.log(user.get());
// });

// var newUser = {
//     firstName: 'Josh',
//     lastName: 'Josh',
//     age: 58,
//     email: 'josh.josh@ga.co'
// };
 
// db.user.create(newUser).then(function(user) {
//     console.log(user.get());
// });

// db.user.findById(1).then(function(user) {
//     console.log(user.get());
// });

// db.user.findAll( {
//     where: {
//         firstName: 'Hague'
//     }
// }).then(function(users) {
//     console.log(users);
// });

// db.user.findOrCreate( {
//     where: {
//         firstName: 'Merit',
//         lastName: 'Female'
//     },
//     defaults: {
//         age: 99,
//         email: 'N/A'
//     }
// }).spread(function(user, created) {
//     console.log(user.get());
//     console.log(created)
// // });
// db.user.findById(1).then(function(user){
// 	user.firstName = 'Andreweeew';
// 	user.save().then(function(){
// 		console.log("saved!");
// 	})
// });


// db.user.find({where:{ firstName: 'Josh'
// 	}
// }).then(function(user){
// 	user.updateAttributes({
// 		firstName: 'Shell'
// 	}).then(function(){});
// });


// db.user.findAll().then(function(users){
// 	users.forEach(function(user){
// 	user.destroy().then(function(){});
// 	});
// })