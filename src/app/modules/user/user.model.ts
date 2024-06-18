import { Schema, model } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt';


const userSchema = new Schema<TUser,UserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    passwordChangedAt: {
      type: Date,
     
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      required: true,
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
)

userSchema.pre('save',async function(next){
    const user=this;
    user.password=await bcrypt.hash(user.password,12);
    next();
})

userSchema.statics.isUserExists =async function  (name:string){
    return await User.findOne({name}).select('+password');
}
userSchema.statics.isPasswordMatched= async function(pass,hashedPass){
    return bcrypt.compare(pass,hashedPass);
}

export const User = model<TUser,UserModel>('User', userSchema)
