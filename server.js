const cors = require('cors');
const jwt = require('jsonwebtoken');

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.use(cors({origin: 'http://localhost:4200'}));

server.get('/api/getFood', (req, res) => {
  res.jsonp(router.db.get('foods'))
})

server.get('/api/getUsers', (req, res) => {
  res.send(router.db.get('users'))
})

server.get('/api/getUser', (req, res) => {
  console.log(req.headers.authorization)
  const userToken = req.headers.authorization;
  const token = userToken.split(' ');
  const decoded = jwt.verify(token[1], 'secret-key');
  res.jsonp(decoded.authUser)
})

server.post('/api/login', (req, res) => {
  const username = req.body.email;
  const password = req.body.password;
  if (username && password) {
    const usersArr = router.db.getState()
    const userOk = usersArr.users.find((user) => user.email === username);
    const passOk = userOk.password === password;

    if (userOk && passOk) {
      const newUsersArr = usersArr.users.map((user) => {
        if (user.id === userOk.id) {
          jwt.sign({user}, 'secret-key', {expiresIn: '72h'}, (err, token) => {
            user.token = token;
            router.db.set("users", newUsersArr).write();
            res.jsonp(user)
          });
        }
        return user;
      })
    }
  } else {
    res.send('Please enter Username and Password!')
  }
})

server.post('/api/newUser', (req, res) => {
  const user = req.body.user;
  console.log(user)
  const usersArr = router.db.getState()

  if (usersArr.users.find(el => el.email === user.email)) {
    return res.send('User with this email already registered');
  } else {
    const newUsersArr = [...usersArr.users, user];
    router.db.set("users", newUsersArr).write();
    return res.send('User has been added successfully');
  }
});


server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})

