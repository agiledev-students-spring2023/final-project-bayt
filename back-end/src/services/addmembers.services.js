const fs = require('fs');
const multer = require('multer');
const path = require('path'); 

//This works for now but ideally when we have database and start a session for a user I need to access the logged in user info
//in order to place the new added user in the same household as the user who invited them



async function savingUser(req,res, err) {
  const {username, email, role, file} = req.body;
    const newUser = {
        username: username,
        email: email,
        role: role
      };

  if(file){
    const {base64, filename} = file;
    const buffer = Buffer.from(base64, "base64");
    const timestamp = Date.now();
    const extension = path.extname(filename);
    const pathy = path.join(__dirname, '../uploads');
    const newFilename = `${pathy}/${timestamp}_${username}${extension}`;
    const dbName = `${timestamp}/_${username}${extension}`;
    fs.writeFileSync(newFilename, buffer);
    newUser.profile_pic = dbName;
  }    
      

  fs.readFile(require.resolve('../json/household_info.json'), (err, data) => {
           if (err) throw err;
           console.log('err',err)
      
           const users = JSON.parse(data);
           users.push(newUser);
      
           fs.writeFile(require.resolve('../json/household_info.json'), JSON.stringify(users, null, 2), err => {
             if (err) throw err;
             console.log('err',err)
           });
         });
}

module.exports = {
    savingUser
  };