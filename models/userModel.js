const users = [];

module.exports = {
  addUser(email) {
    if (!users.includes(email)) {
      users.push(email);
    }
  },
  getAllUsers() {
    return users;
  },
};
