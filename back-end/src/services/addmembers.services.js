const fs = require('fs');

//This works for now but ideally when we have database and start a session for a user I need to access the logged in user info
//in order to place the new added user in the same household as the user who invited them
async function savingUser(userinfo) {
    const newUser = {
        username: userinfo.username,
        email: userinfo.email,
        role: userinfo.role
      };

      fs.readFile(require.resolve('../json/household_info.json'), (err, data) => {
        if (err) throw err;
    
        const users = JSON.parse(data);
        users.push(newUser);
    
        fs.writeFile(require.resolve('../json/household_info.json'), JSON.stringify(users, null, 2), err => {
          if (err) throw err;
          console.log('New user added!');
        });
      });
}

module.exports = {
    savingUser
  };