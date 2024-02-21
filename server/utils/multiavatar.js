const { generateId } = require("./id");

const apiAvatar = 'https://api.multiavatar.com/'

const generateRandomDefaultAvatar = () => {
    let avatarId = generateId(); 
    let randomDefaultAvatar = apiAvatar + avatarId + '.png';
    return randomDefaultAvatar;
};

const generateNewAvatar = (newAvatarName) => {
    let newAvatar = apiAvatar + newAvatarName + '.png';
    return newAvatar;
};

module.exports = { generateRandomDefaultAvatar, generateNewAvatar };