const fs = require('fs');


async function addUser(userinfo) {
    const newUser = {
        username: userinfo.username,
        email: userinfo.email,
        role: userinfo.role,
        houses:[{
            code: userinfo.password,
            codeConfirm: userinfo.passwordConfirm,
            name: userinfo.houseName
        }]
      };

      fs.readFile(require.resolve('../json/users.json'), (err, data) => {
        if (err) throw err;
    
        const users = JSON.parse(data);
        users.push(newUser);
    
        fs.writeFile(require.resolve('../json/users.json'), JSON.stringify(users, null, 2), err => {
          if (err) throw err;
        });
      });
}

module.exports = {
    addUser,
  };