import { promisify } from 'util';
import { randomBytes, scrypt } from 'crypto';

const scryptAsync = promisify(scrypt); // converts callback to promises or async/await

export class PasswordHash {
  // static methods are directly binded to the class making them class properties
  //and does not need us to create instance of the class first before we can use them

  public static async toHash(password: string): Promise<string> {
    const salted_password = randomBytes(10).toString('hex'); // generates a random string for us
    const buff_password = (await scryptAsync(password, salted_password, 64)) as Buffer; //actual hashing

    return `${buff_password.toString('hex')}.${salted_password}`; // concat the salted password and buffed password to give a more secure password hashing
  }

  public static async comparePassword(storedPassword: string, suppliedPassword: string): Promise<boolean> {
    const [hashedPassword, salted_password] = storedPassword.split('.'); // coming from the database then we split to get only the hashed password
    const buff_password = (await scryptAsync(suppliedPassword, salted_password, 64)) as Buffer; // hash supplied password

    return hashedPassword === buff_password.toString('hex');
  }
}
