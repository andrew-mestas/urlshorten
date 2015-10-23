var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var db = require("./models");
var Hashids = require("hashids"),
	hashids = new Hashids("oohSalty");
var uniqueId = null;
var ejsLayout = require("express-ejs-layouts");
app.use(ejsLayout);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false}));
app.use("/", express.static(__dirname + "/static"));

app.get("/", function(req, res){
    db.link.findAndCountAll({}).then(function(result){
    console.log(result.rows.length);
    uniqueId = result.rows.length;
});
	res.render("index");
});

// db.link.findAll().then(function(users){
//  users.forEach(function(user){
//  user.destroy().then(function(){});
//  });
// })
var theId = {};
app.post("/createLink", function(req, res){
console.log(uniqueId);

    db.link.findOrCreate({where : {url: req.body.long_url
            }}).spread(function(user, created){
                console.log(user.get());
                console.log(created);
                if(created == false){
                    console.log("Already created");
                    console.log(user.get().click_count);
                    theId.click_count = user.get().click_count;
                    theId.hash = user.get().hash;
                }

            else{
                    theId = {hash : hashids.encode(uniqueId) };
                    console.log("Going to create");
                    db.link.find({where :{
                    url: req.body.long_url}})
                    .then(function(linkSel){
                    linkSel.hash = theId.hash;
                    linkSel.save().then(function(){
                    console.log("saved!");
                    });
                    theId.click_count = linkSel.click_count;
           });
        }
          res.render("createdLink", {newUrl:theId});
   });
});

	
app.get("/links", function(req, res){

    db.link.findAll({where: {click_count : null}}).then(function(nulls){
        nulls.forEach(function(num){num.click_count = 0; num.save();})});
    
        db.link.findAll({order:['click_count']}).then(
        function(f){
         var pop = [];
         f.forEach(function(g){
         // console.log(g.url + " " + g.click_count);
         pop.push("URL : " + g.url + " | Click Count: " + g.click_count
                    + " | Short URL: nps.go." + g.hash);
        })
         pop.reverse();
         console.log(pop);
         
         res.render("links", {pop: pop});
     })
});

app.get("/:hash", function(req, res){
    var t =	req.params.hash;
    var hashVal = t.replace("nps.go.","");
    console.log(hashVal);
    db.link.find({where: {hash : hashVal}}).then(function(links) {
        console.log("URL : " + links.url + "\nClick Count: " + links.click_count
                    + "\nShort URL nps.go." + links.hash);
         links.click_count += 1;
         links.save();
    	res.render("showLinks",{links : links});
 });

 });

app.listen(3000);
