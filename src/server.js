express = require("express"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	LocalStrategy = require("passport-local"),
	axios = require("axios")
passportLocalMongoose = require("passport-local-mongoose")
var session = require('express-session');


const User = require("../models/User");
const Reservation = require("../models/Reservation");
const Parking = require("../models/Parking");
const { use } = require("passport");


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
// const API_URL = "https://bevri-restaraunt.onrender.com"
const API_URL = "http://localhost:2000"	
const ADMIN = "MOHIT0000";
const ADMIN_KEY = "1511";
// Date
const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

//  Home page
app.get("/", function (req, res) {
	res.render("home.ejs");
});


//  Secret page
app.get("/secret", isLoggedIn, async function (req, res) {
	res.render("C:secret.ejs");
});


// About page
app.get("/about", (req, res) => {
	res.render("About.ejs")
})


// Contact page

app.get("/contact", (req, res) => {
	res.render("Contact.ejs")
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
		const username = req.body.username; // Assuming you retrieve the username from the login form
		req.session.username = username;
		if (user) {
			const result = req.body.password === user.password;
			if (result) {
				res.render("secret.ejs", { name: req.session.username });
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
	res.redirect("login");
}



// Availibility page


app.get('/Availibility', async (req, res) => {
	try {
		var search = req.query.search
		const parking = await Parking.find(
			{
				"$or": [
					{ address: { $regex: '.*' + search + '.*', $options: 'i' } }
				]
			}
		);
		res.render("Avalibility.ejs", { parking });
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})



// Seemore

app.get("/seemore/:id", async (req, res) => {
	try {
		const parkingMain = await axios.get(`${API_URL}/parking/${req.params.id}`);

		res.render("seemore.ejs", { parking: parkingMain.data });
	} catch (error) {
		res.status(500).json({ message: error });
	}
});



// Booking Page

app.get("/booking/:id", async (req, res) => {
	try {

		let currentDate = `${day}-${month}-${year}`;
		console.log(currentDate)

		const parkingMain = await axios.get(`${API_URL}/parking/${req.params.id}`);

		// req.session.username = username;

		console.log(parkingMain.data);
		res.render("booking.ejs",
			{
				parking: parkingMain.data,
				currentDate,
				username: req.session.username
			});
	} catch (error) {
		res.status(500).json({ message: error });
	}
})



// Parking booking section 


app.post("/Reservation", async (req, res) => {
	try {

		const reservation = await Reservation.create({
			Username: req.body.Username,
			date: req.body.date,
			Entry_time: req.body.Entry_time,
			Exit_time: req.body.Exit_time,
			spot: req.body.spot,
			address: req.body.address
		});
		res.render("ReservationComplete.ejs")


	} catch (error) {
		console.log(error.message);
	}

});








//      ====-----==== Admin  Section ====-----====


// Admin

app.get('/Admin', async (req, res) => {
	const userKey = (req.query.key)
	if (ADMIN_KEY === userKey) {
		res.render("Admin.ejs")
	}
	else {
		res
			.status(404)
			.json({ error: "You are not authorized" })
	}

})


// Reservations Data//


app.get("/Reservation", async (req, res) => {
	try {
		const response = await axios.get(`${API_URL}/ParkingReservation/?key=123456789`);
		console.log(response);
		res.render("Reservation.ejs", { datas: response.data });
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

app.get("/api/Data/delete/:id", async (req, res) => {
	try {
		await axios.delete(`${API_URL}/Data/${req.params.id}/?key=123456789`);
		res.redirect("Reservation");
	} catch (error) {
		res.status(500).json({ message: "Error deleting post" });
	}
});



// Users Data//


app.get("/Users", async (req, res) => {
	try {
		const uresponse = await axios.get(`${API_URL}/Udata/?key=123456789`);
		console.log(uresponse);
		res.render("Users.ejs", { datas: uresponse.data });
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

app.get("/api/Udata/delete/:id", async (req, res) => {
	try {
		await axios.delete(`${API_URL}/Udata/${req.params.id}/?key=123456789`);
		res.redirect("users");
	} catch (error) {
		res.status(500).json({ error: error });
	}

});



// Parking Data//



app.get("/parking", async (req, res) => {
	try {
		const response = await axios.get(`${API_URL}/parking/?key=123456789`);
		console.log(response);
		res.render("parking.ejs", { datas: response.data });
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

app.get("/createparking", (req, res) => {
	res.render("createparking.ejs", {
		heading: "New Parking",
		submit: "Create"
	})
});
app.post("/createparking", async (req, res) => {

	try {

		const parking = await Parking.create(req.body)
		res.redirect("/parking");

	} catch (error) {
		console.log(error.message);
	}


})

app.get("/api/parking/delete/:id", async (req, res) => {
	try {
		await axios.delete(`${API_URL}/parking/${req.params.id}/?key=123456789`);
		res.redirect("/parking");
	} catch (error) {
		res.json({ message: error });
	}
});




app.listen("4000", function () {
	console.log("Server is running on port 4000!");
});
