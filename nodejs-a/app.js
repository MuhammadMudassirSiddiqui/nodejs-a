var express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')



const TWO_HOURS = 1000 * 60 * 60 * 2

const {
    PORT = 3000,
        SESS_NAME = 'sid',
        SESS_LIFETIME = TWO_HOURS,
        NODE_ENV = 'devolopment',
        SESS_SECRET = 'ssh!auite.it\'asecret!'
} = process.env


const IN_PROD = NODE_ENV === 'production'
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

const users = [
    { id: 1, name: 'alix', email: 'alix@gmail.com', password: 'test' },
    { id: 2, name: 'max', email: 'max@gmail.com', password: 'test' },
    { id: 3, name: 'ali', email: 'ali@gmail.com', password: 'test' }
]


app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        maxAge: SESS_LIFETIME,
        sameStite: true,
        secure: IN_PROD
    }
}))

const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/login')
    } else {
        next()
    }
}

const redirectHome = (req, res, next) => {
    if (req.session.userId) {
        res.redirect('/home')
    } else {
        next()
    }
}


app.get('/', (req, res) => {
            const userId = 1
            console.log(userId)
            res.send(`
    <h1>Welcome</h1>
    ${userId ? `
        <a href='/home'>home</a>

       <form action='/logout' method='post'>
        <input type = 'submit' value = 'Submit' />
        </form>
        ` :`
        <a href='/login'>logIn</a><a href='/register'>register</a>
        `}
    
    `)
})

app.use((req,res,next) => {
    const {userId} = req.session
    if(userId){
        res.locals.user = users.find(
        res.locals.user= userId

        )
    }
        next()
})


app.get('/home', redirectLogin,(req, res) => {
const {user} =res.locals 
    res.send(`
<h1>Home</h1>
<a href='/'>Main</a>
<ul>
<li>Name:${user.name}</li>
<li>Email:${user.email}</li>

</ul>
`)
})

// app.get('/profile',redirectLogin,(req,res)=>{
//     const {user} = res.locals
// })


app.get('/login',redirectHome, (req, res) => {
    res.send(`
    <h1>Login</h1>
    <form method='post' action='/login'>
    <input type= 'email' name='email' placeholder = 'Email' required>
    <input type= 'password' name= 'password' required>
    <input type='submit' value='Submit'>
    </form>
    <a href = '/register'>register</a>
    `)
})

app.get('/register',redirectHome, (req, res) => {
    res.send(`
    <h1>Register</h1>
    <form method='post' action = '/register'>
    <input type= 'text' name= 'name' placeholder= 'Name' required>
    <input type= 'email' name='email' placeholder = 'Email' required>
    <input type= 'password' name= 'password' required>
    <input type='submit' value='Submit'>
    </form>
    <a href = '/login'>login</a>

    `)
})

app.post('/login',redirectHome, (req, res) => {
    const {email,password} = req.body
    if(email && password){
        const user = users.find(user => user.email === email && user.password === password)

        if(user){
            req.session.userId = userId
            return res.redirect('/home')
        }
    }
    
    res.redirect('/login')

})

app.post('/register',redirectHome, (req, res) => {
    const {name,email,password} = req.body

    if(name && eamil && password){ 
        const exists = user.some(
            user => user.email === email 
        )
        if(!exists){
            const user ={
                id:users.length+1,
                name,
                email,
                password

            }
            users.push(user)

            req.session.userId = user.id
            return res.redirect('/home')

        }
    }
    res.redirect('/register')

})


app.post('/logout',redirectLogin,(req, res) => {
    req.session.destroy(err =>{
        if(err){
            return res.redirect('/home')
        }
        res.clearCookie(SESS_NAME)
        res.redirect('/login')
    })

})


app.listen(PORT, () => {
    console.log('you are listing at port 3000')
})