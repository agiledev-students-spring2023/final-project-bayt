const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtStrategy = require("../configs/jwt.config.js") // import setup options for using JWT in passport

// Should be a schema for users of the form:
// {
//     "_id": "67320bd0fc12ac1e606b8ke0",
//     "username": "fishc0",
//     "first_name": "Zander",
//     "last_name": "Chen",
//     "email": "zc2122@nyu.edu",
//     "assigned_tasks": [ // array of task ids to be populated
//       {
//         "_id": "64320bf0fc13ae1e696b0ee1"
//         "task_name": "cook spaghetti",
//         "description": "wake up dog",
//         "room": "Kadanwari",
//         "assignee": 64320bf0fc13ae1e696b0ee2",
//         "due_time": 166467332400
//         "repeat": 1
//       }
//     ]
//   }

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    assigned_tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'task',
    }],
    role: {
        type: String,
        required: true
    },
    profile_pic: {
        type: String,
        required: true
    },
    houses: [{
        type: Schema.Types.ObjectId,
        ref: 'house',
    }],
});

// hash the password before the user is saved
UserSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    // otherwise, the password is being modified, so hash it
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) return next(err);
      user.password = hash; // update the password to the hashed version
      next();
    });
});

// compare a given password with the database hash
UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

// return a JWT token for the user
UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + process.env.JWT_EXP_DAYS);

    return jwt.sign(
        {
            id: this._id,
            username: this.username,
            exp: parseInt(exp.getTime() / 1000),
        },
        process.env.JWT_SECRET
    );
}

// return the user information without sensitive data
UserSchema.methods.toAuthJSON = function () {
    return {
        username: this.username,
        token: this.generateJWT(),
    };
}

module.exports = User = mongoose.model('user', UserSchema);

