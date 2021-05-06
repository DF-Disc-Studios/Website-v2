const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const crypto = require('crypto');
const fs = require('fs')

const fetch = require('node-fetch');

const Strategy = require("passport-discord").Strategy;
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require("express-session");

//Get .env stuff
const CLIENT_SECRET = process.env.CLIENT_SECRET;

String.prototype.insert_at = function (index, string) {
    return this.substr(0, index) + string + this.substr(index);
}

let path = require('path')

const {
    Ref,
    Paginate,
    Get,
    Match,
    Select,
    Index,
    Create,
    Collection,
    Join,
    Call,
    Exists,
    Function: Fn,
    Update,
    Lambda,
    Delete,
    Var: Fvar,
    Documents,
    Map: Fmap,
} = faunadb.query;

let pages = [
    "index",
    "info",
    "ourgames",
    "reportbug",
    "statsview",
    "nab",
    "nav",
    "eventNav",
    "rules"
]

let domain = "hdao872hsd8uethf8934rth.herokuapp.com"

app.use(express.json());

app.use(express.static(path.join(__dirname, 'site'),{index:false,extensions:['html']}));

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
  
  app.get("/auth/login", (req, res, next) => {	
  next();
  });
  
    passport.use(new Strategy({
      clientID:  "820019893453193218",
      clientSecret: CLIENT_SECRET,
      callbackURL: "https://discstudios.herokuapp.com/auth/callback",

      scope: ["identify"]
    }, 
    (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => done(null, profile)); 
    }));
    app.use(session ({
      secret: "eeee",
      resave: false,
      saveUninitialized: false
    }))
    .use(passport.initialize())
    .use(passport.session())
    
    app.use(passport.initialize());
    app.use(passport.session());
    app.locals.domain = "discstudios.xyz";
    
    app.get("/auth/login", (req, res, next) => {	
    next();
    },
  
  passport.authenticate("discord"));
  app.get('/auth/', passport.authenticate('discord'));
  app.get('/auth/callback', passport.authenticate('discord', {
      failureRedirect: '/'
  }), function(req, res) {    
  if(req.session.backURL) {
      res.redirect(req.session.backURL)
  } else { res.redirect("/"); }
  
  });
      
  app.get("/auth/logout", function(req, res) {
      req.session.destroy(() => {
          req.logout();
          res.redirect("/")
      });
  });
  
      app.get("/test", (req,res) => {
        res.json({user: req.user});
      });

      app.get("/login", (req,res) => {
        res.redirect('/auth')
      });

      app.get("/home", (req,res) => {
        res.redirect('/')
      });

      app.get("/games", (req,res) => {
        res.redirect('/ourgames')
      });

      app.get("/games", (req,res) => {
        res.redirect('/ourgames')
      });

      app.get("/stats", (req,res) => {
        res.redirect('/statsview')
      });

      app.get("/stats", (req,res) => {
        res.redirect('/statsview')
      });
  
      app.get('/', (req, res) => {
        
        
        
        if (!req.user) return res.sendFile(__dirname + '/site/index.html')//res.send("Not logined!");
        if (req.user) return res.redirect('/loggedin/index')
      })

app.use(function (req, res, next) {
    //res.header("Access-Control-Allow-Origin", 'https://discstudios.xyz');
    res.header("Access-Control-Allow-Origin", 'https://discstudios.netlify.app');
    //res.header("Access-Control-Allow-Origin", 'http://127.0.0.1:5500');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.get("/loggedin/:site", (req,res) => {

    let ee = req.params.site

    if(ee == "home") {
        ee = "index.html"
    }

    if(ee == undefined) {
        ee = "index.html"
    }

    let e
if(pages.includes(req.params.site)) {
    e = fs.readFileSync(`./site/${ee}.html`, 'utf8')
} else {
    e = fs.readFileSync(`./site/${ee}`, 'utf8')
}

    

    e = e.replace('<script defer type="text/javascript" src="discstudios.js"></script>', '<script defer type="text/javascript" src="glasspanestudios.js"></script>')

    res.send(e)

  });

app.listen(
    PORT,
    () => console.log(`its alive!`)
);
