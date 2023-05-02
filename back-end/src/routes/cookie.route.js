const express = require("express") // CommonJS import style!

// a method that constains code to handle cookie-related routes
const cookieRouter = () => {
  // create a new router that we can customize
  const router = express.Router()

  router.get("/set", (req, res) => {
    res
      .cookie("userId", req.userId) // send a cookie in the response with the key 'foo' and value 'bar'
      .send({
        success: true,
        message: "Sent a cookie to the browser... hopefully it saved it.",
      })
  })

  // a route that looks for a Cookie header in the request and sends back whatever data was found in it.
  router.get("/", (req, res) => {
    console.log(`Incoming cookie data:`)
    console.log(`Incoming cookie data: ${req.cookies}`)
  })

  return router
}

// export the router
module.exports = cookieRouter





// import path from 'path';
// import { fileURLToPath } from 'url';
// import bodyParser from 'body-parser';
// import bcrypt from 'bcryptjs';
// import { User } from '../schemas/User.mjs';

// const app = express();
// const registerRouter = express.Router();

// app.set('view engine', 'pug');
// app.set('views', path.join(path.dirname(fileURLToPath(import.meta.url)), 'views'));

// app.use(bodyParser.urlencoded({ extended: false }));

// registerRouter.get('/', (req, res) => {
//     res.render('register', {pageTitle: 'Register'});
// });

// registerRouter.post('/', async (req, res) => {
//     //------------validation------------
//     const firstName = req.body.firstName.trim();
//     const lastName = req.body.lastName.trim();
//     const username = req.body.username.trim();
//     const email = req.body.email.trim();
//     const password = req.body.password;

//     const context = req.body;

//     if (firstName && lastName && username && email && password) {
//         const user = await User.findOne({
//             $or: [ //https://www.mongodb.com/docs/manual/reference/operator/query/or/
//                 {username: username},
//                 {email: email}
//             ]
//         }).catch((err) => {
//             console.log(err);
//             context.errorMessage = 'Oops, something went wrong.';
//             context.pageTitle = 'Register';
//             res.render('register', context);
//         });

//         if (user) { //user found
//             if (email === user.email) {
//                 context.errorMessage = 'Email already in use.';
//             }
//             else {
//                 context.errorMessage = 'Username already in use.';
//             }
//             context.pageTitle = 'Register';
//             res.render('register', context);
//         }
//         else { //no user found
//             req.body.password = await bcrypt.hash(password, 10);
            
//             User.create(req.body).then((user) => {
//                 req.session.user = user;
//                 console.log(user);
//                 res.redirect('/');
//             });
//         }
//     }
//     else {
//         context.errorMessage = 'Make sure each field is valid.';
//         context.pageTitle = 'Register';
//         res.render('register', context);
//     }
// });

// export {
//     registerRouter
// };