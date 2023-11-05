express = require("express"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	LocalStrategy = require("passport-local"),
	axios = require("axios")
passportLocalMongoose = require("passport-local-mongoose")



const User = require("../models/User");

var app = express();
app.use(express.static("public"))


mongoose.connect("mongodb+srv://admin:1234@api.w1sen0x.mongodb.net/?retryWrites=true&w=majority");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
const API_URL = "http://localhost:4000"
const API_URL_USER = "http://localhost:2000"

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

// app.get("/Avalibility", (req,res)=>{
// 	res.render("Avalibility.ejs")
// })
app.get("/Avalibility", async (req, res) => {
	try {
		const response = await axios.get(`${API_URL}/parking?key=123456789`);
		res.render("Avalibility.ejs", { parking: response.data });
	} catch (error) {
		res.status(500).json({ message: "Error fetching posts" });
	}
});

// Render seemore

app.get("/seemore", async (req, res) => {
	try {
		const response = await axios.get(`${API_URL}/parking?key=123456789`);
		res.render("seemore.ejs", { parking: response.data });
	} catch (error) {
		res.status(500).json({ message: "Error fetching posts" });
	}
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
				// res.render("secret");
				try {
					const response = await axios.get(`${API_URL_USER}/User?key=123456789`);
					res.render("secret.ejs", { User: response.data });
				} catch (error) {
					res.status(500).json({ message: "Error fetching posts" });
				}
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
