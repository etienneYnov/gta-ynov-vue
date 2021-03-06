"use strict";
const express = require('express');
const DB = require('./db');
const config = require('./config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const db = new DB("sqlitedb")
const app = express();
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// CORS middleware
const allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', '*');
	res.header('Access-Control-Allow-Headers', '*');
	next();
}

app.use(allowCrossDomain)

router.post('/register', function(req, res) {
	db.insert([
		req.body.name,
		req.body.email,
		bcrypt.hashSync(req.body.password, 8)
		],
		function (err) {
			if (err) return res.status(500).send("There was a problem registering the user.")
				db.selectByEmail(req.body.email, (err,user) => {
					if (err) return res.status(500).send("There was a problem getting user")
            let token = jwt.sign({ id: user.id }, config.secret, {expiresIn: 86400 // expires in 24 hours
            });
          res.status(200).send({ auth: true, token: token, user: user });
        }); 
		}); 
});

router.post('/register-admin', function(req, res) {
	db.insertAdmin([
		req.body.name,
		req.body.email,
		bcrypt.hashSync(req.body.password, 8),
		1
		],
		function (err) {
			if (err) return res.status(500).send("There was a problem registering the user.")
				db.selectByEmail(req.body.email, (err,user) => {
					if (err) return res.status(500).send("There was a problem getting user")
            let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 // expires in 24 hours
            });
          res.status(200).send({ auth: true, token: token, user: user });
        }); 
		}); 
});

router.post('/login', (req, res) => {
	db.selectByEmail(req.body.email, (err, user) => {
		if (err) return res.status(500).send('Error on the server.');
		if (!user) return res.status(404).send('No user found.');
		let passwordIsValid = bcrypt.compareSync(req.body.password, user.user_pass);
		if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token, user: user });
      });
});

router.get('/logout', function(req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        }
        else {
          return res.redirect('/');
        }
      });
    }
});

router.get('/allUsers', function(req, res) {
	db.selectAll(
		(err, allUsers) => {
		if (err) {return res.status(500).send('Error on the server.');}
		else { 
		  res.json(allUsers)
		}
	});
});

router.get('/allTimes', function(req, res) {
	db.selectAllTimes(
		(err, allTimes) => {
		if (err) {return res.status(500).send('Error on the server.');}
		else { 
		  res.json(allTimes)
		}
	});
});

router.get('/HorairePerso', function(req, res) {
	db.selectAllTimes(
		(err, timePerso) => {
		if (err) {return res.status(500).send('Error on the server.');}
		else { 
		  res.json(timePerso)
		}
	});
});

router.post('/saisieHoraire', function(req, res) {
	db.insertTime([
		req.body.name,
		req.body.debut_taf_temps,
		req.body.fin_taf_temps,
		req.body.H_start_temps,
        req.body.M_start_temps,
        req.body.H_end_temps,
        req.body.M_end_temps,
        req.body.FK_userID
		],
		function (err) {
			 
		}); 
});


app.use(router)

let port = process.env.PORT || 3000;

let server = app.listen(port, function() {
	console.log('Express server listening on port ' + port)
});
