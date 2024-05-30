function comparePasswords(login_password, user_password) {
  try {
    if (login_password == user_password) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error;
  }
}

module.exports = { comparePasswords };
