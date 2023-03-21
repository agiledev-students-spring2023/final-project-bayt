import React from 'react';

function generatePassword() {
    const length = 6;
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
}

function Signup(props) {
    
}