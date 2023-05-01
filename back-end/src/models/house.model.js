const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs");
// Mongoose house schema following this json file format:
// {
//     "_id": "64320bf0fc13ae1e696b0efc"
//     "code": "12345",
//     "name": "Gloriane",
//     "users": [
//       {
//         "user": "Kaylyn"
//       },
//       {
//         "user": "Jacynth"
//       },
//       {
//         "user": "Joel"
//       },
//       {
//         "user": "Hervey"
//       },
//       {
//         "user": "Hashim"
//       }
//     ]
//   }

const HouseSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    rooms: [{
        type: Schema.Types.ObjectId,
        ref: 'room'
    }],
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'task'
    }],
    finances: [{
        type: Schema.Types.ObjectId,
        ref: 'transactions'
    }]
});

// hash the password before the user is saved
HouseSchema.pre("save", function (next) {
    const house = this;
    if (!house.isModified("code")) return next();
    // otherwise, the password is being modified, so hash it
    bcrypt.hash(house.code, 10, (err, hash) => {
      if (err) return next(err);
      house.code = hash; // update the password to the hashed version
      next();
    });
});

HouseSchema.methods.toAuthJSON = function () {
    return {
        name: this.name,
        // token: this.generateJWT(),
    };
}

module.exports = mongoose.model('house', HouseSchema);