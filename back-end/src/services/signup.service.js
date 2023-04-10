const fs = require('fs');


async function addUser(userinfo) {
   /* const newUser = {
        username: userinfo.username,
        email: userinfo.email,
        role: userinfo.role
      };*/

      fs.readFile(require.resolve('../json/signups.json'), (err, data) => {
        if (err) throw err;
    
        const users = JSON.parse(data);
        users.push(userinfo);
    
        fs.writeFile(require.resolve('../json/signups.json'), JSON.stringify(users, null, 2), err => {
          if (err) throw err;
          console.log('New user added!');
        });
      });
}

module.exports = {
    addUser,
  };