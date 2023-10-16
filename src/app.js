express = require("express"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose")


const User = require("../model/User");
var app = express();
app.use(express.static("public"))

mongoose.connect("mongodb://localhost/27017");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
	secret: "Rusty is a dog",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Showing home page
app.get("/", function (req, res) {
	res.render("home");
});

// Showing secret page
app.get("/secret", isLoggedIn, async function (req, res) {

	// var user = await User.findOne({ username: req.body.username });
	// console.log(user.username);
	// const c =  '2';
	res.render("secret.ejs");

});

// Render Avalibility

app.get("/Avalibility", (req,res)=>{
	res.render("Avalibility.ejs")
})

// Render seemore

app.get("/seemore", (req,res)=>{
	res.render("seemore.ejs")
})

// Showing register form
app.get("/register", function (req, res) {
	res.render("register");
});

// Handling user registration
app.post("/register", async (req, res) => {
	const user = await User.create({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	});

	return res.render("login");
});

//Showing login form
app.get("/login", function (req, res) {
	res.render("login");
});

//Handling user login
app.post("/login", async function (req, res) {
	try {
		// check if the user exists
		const user = await User.findOne({ username: req.body.username });
		if (user) {
			//check if password matches
			const result = req.body.password === user.password;
			if (result) {
				// console.log(user.username);
				res.render("secret");
			} else {
				res.status(400).json({ error: "password doesn't match" });
			}
		} else {
			res.status(400).json({ error: "User doesn't exist" });
		}
	} catch (error) {
		res.status(400).json({ error });
	}
});

//Handling user logout
app.get("/logout", function (req, res) {
	req.logout(function (err) {
		if (err) { return next(err); }
		res.render('home.ejs');
	});
});



function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/login");
}



var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Server is running on port 3000!");
});
