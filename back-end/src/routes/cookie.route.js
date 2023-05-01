const express = require("express") // CommonJS import style!

const requestLogger = (req, res, next) => {
  console.log(`Request Method : ${req.method}`);
  console.log(`Request Path : ${req.path}`);
  console.log('Request Query : ', req.query);
  console.log('Request Body : ', JSON.parse(JSON.stringify(req.body)));
  let cookie = 'Request Cookies : ';
  for (const [key, value] of Object.entries(req.myCookies)) {
      if (key === 'connect.sid') {
          cookie+='\n\tconnect.sid=[REDACTED]';
      }
      else {
          cookie+=`\n\t${key}=${value}`;
      }
  }
  console.log(cookie);
  next();
};

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


// import bcrypt from 'bcryptjs';
// import mongoose from 'mongoose';

// // assumes that User was registered in `./db.mjs`
// const User = mongoose.model('User');

// const startAuthenticatedSession = (req, user, cb) => {
//   // TODO: implement startAuthenticatedSession
//   req.session.regenerate((err) => {
//     if (!err) {
//       // set a property on req.session that represents the user
//       req.session.user = user; 
//     }
//     else {
//       // log out error
//       console.log(err);
//     }
//     // call callback with error
//     cb(err);
//   });
// };

// const endAuthenticatedSession = (req, cb) => {
//   // TODO: implement endAuthenticatedSession
//   req.session.destroy((err) => {
//     cb(err);
//   });
// };


// const register = (username, email, password, errorCallback, successCallback) => {
//   // TODO: implement register
//   if (username.length < 8 || password.length < 8) {// check length of username and password, if < 8, call errorCallback
//     console.log('USERNAME PASSWORD TOO SHORT');
//     errorCallback({message: 'USERNAME PASSWORD TOO SHORT'});
//   }
//   else {
//     User.findOne({username: username}, (err, result) => {// check if username exists
//       if (err) {
//         console.log(err);
//       }
//       else if (result) {
//         console.log('USERNAME ALREADY EXISTS');
//         errorCallback({message: 'USERNAME ALREADY EXISTS'});
//       }
//       else {
//         bcrypt.hash(password, 10, (err, hash) => {// hash password and save new user
//           if (err) {
//             console.log(err);
//           }
//           else {
//             const user = new User({
//               username: username,
//               email: email,
//               password: hash
//             });
//             user.save((err, u) => {
//               if (err) {
//                 console.log('DOCUMENT SAVE ERROR');
//                 errorCallback({message: 'DOCUMENT SAVE ERROR'});
//               }
//               else {
//                 successCallback(u);
//               }
//             });
//           }
//         });
//       }
//     });
//   }
// };

// const login = (username, password, errorCallback, successCallback) => {
//   // TODO: implement login
//   User.findOne({username: username}, (err, user) => {// find user by username
//     if (err) {
//       console.log(err);
//     }
//     else if (user) { //if user exists
//       bcrypt.compare(password, user.password, (err, passwordMatch) => {
//         if (err) {
//           console.log(err);
//         }
//         else if (passwordMatch) { //password match
//           successCallback(user);
//         }
//         else { //password doesn't match
//           errorCallback({message: 'PASSWORDS DO NOT MATCH'});
//         }
//       });
//     }
//     else { // no such user is found
//       errorCallback({message: 'USER NOT FOUND'});
//     }
//   });
// };

// // creates middleware that redirects to login if path is included in authRequiredPaths
// const authRequired = authRequiredPaths => {
//   return (req, res, next) => {
//     if(authRequiredPaths.includes(req.path)) {
//       if(!req.session.user) {
//         res.redirect('/login'); 
//       } else {
//         next(); 
//       }
//     } else {
//       next(); 
//     }
//   };
// };

// export {
//   startAuthenticatedSession,
//   endAuthenticatedSession,
//   register,
//   login,
//   authRequired
// };

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