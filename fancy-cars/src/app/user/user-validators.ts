export function emailValidator(email: string) {
    const pattern = /^[a-zA-Z0-9\.\_]{6,}@[a-zA-Z0-9]{3,}\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  }
  
  export function passwordValidator(password: string, rePassword: string) {
    return password.trim() === rePassword.trim();
  }
  