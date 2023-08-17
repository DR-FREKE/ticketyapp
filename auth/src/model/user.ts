import mongoose, { Schema, model } from 'mongoose';
import { PasswordHash } from '../services/password';

interface UserAttr {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phone: string;
}

/** an interface that describes the properties that a user model has
 *  i.e we are going to tell typescript that there's going to be a build function available on this User Model
 * and also tell what arguement are required
 * */
// take all the properties from the mongoose.Model interface and send them to UserModel interface
interface UserModel extends mongoose.Model<UserDoc> {
  build(attr: UserAttr): UserDoc; // i.e the build method should return something with the same property structure as UserDoc
}

/** an interface that describes the properties that a user document has i.e the properties a single user has.
 * this is needed so typescript understands that the properties we used in creating a user might be different from
 * the actual property a user can have in the document in the DB
 */
interface UserDoc extends mongoose.Document {
  email: string; // so the document should have email
  password: string;
  firstname: string;
  lastname: string;
  phone: string;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    toJSON: {
      // use this transform the original object of what mongoose returns to what object we want
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
      versionKey: false,
    },
  } // a second object to override what the model returns to us
);

// create a middleware that will always intercept the hashing of password and saving the document to database
userSchema.pre('save', async function (done) {
  // hash password before saving to DB

  // check if password has been modified before hashing.
  //this is to prevent hashing of an already hashed password maybe because of an update in user profile
  if (this.isModified('password')) {
    const hashed = await PasswordHash.toHash(this.get('password')); // get the password from the user document by calling the get() method

    //update the password to the hashed password by calling the set() method to update the user document
    this.set('password', hashed);
  }
  done();
});

// how we add a function to a model in mongoose but typescript still won't understand this. To let typescript
// understand, we need to create an interface and bind it to this user model in this case is the UserModel above.
userSchema.statics.build = (attr: UserAttr) => {
  return new User(attr);
};

const User = model<UserDoc, UserModel>('User', userSchema);

// const user = User.build({ email: '', password: '' });
// user.email;

// one way to make typescript understand mongoose is to build an extra function like this
// const buildUser = (attr: userAttr) => {
//   new User(attr);
// };

export { User };
