export function saltAndHashPassword(password: string): string {
  if (!password) {
    throw new Error("Password is required");
  }

  const bcrypt = require('bcryptjs');
  const saltRounds = 12;
  
  return bcrypt.hashSync(password, saltRounds);
}