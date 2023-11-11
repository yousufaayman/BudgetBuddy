export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if( emailPattern.test(email)){
    return true
  }else{
    throw new Error("Email is Invalid, Please Check It")
  }
};

export const validatePasswords = (password, check_password) => {
  const lengthRegex = /.{8,}/;
  const upperCaseRegex = /[A-Z]/;
  const lowerCaseRegex = /[a-z]/;
  const digitRegex = /\d/;

  if (
      lengthRegex.test(password) &&
      upperCaseRegex.test(password) &&
      lowerCaseRegex.test(password) &&
      digitRegex.test(password)
  ) {
      if (password !== check_password) {
          throw new Error("Passwords Do not Match!");
      } else {
          return true;
      }
  } else {
      throw new Error("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit!");
  }
};
