const cors = require("cors");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const unityRouter = require("./routes/unity");
const indexRouter = require("./routes/index")

const app = express();

const test = true;

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

app.use("/", indexRouter)
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/unidades", authMiddleware, unityMiddleware, unityRouter);

function authMiddleware(req, res, next){
    
    if (!req.session.user){
        res.redirect("/login");
        return
    } 
    next();
}

async function unityMiddleware(req, res, next){
    if (req.session.profile !== "Plantonista"){
        console.log("Usuario sem perfil de planotnista");
        res.end()
    }
    
    next()
}


app.listen(3000, (req, res)=>{
    console.log("Server is listening on port 3000...")
})
