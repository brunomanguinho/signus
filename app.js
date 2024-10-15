const cors = require("cors");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: false,
      secure: false
  },
  }));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.get("/", (req, res)=>{
    // res.json({connected: true});
    res.render("login", {message: "Mensagem 1"});
});

app.listen(3000, (req, res)=>{
    console.log("Server is listening on port 3000...")
})