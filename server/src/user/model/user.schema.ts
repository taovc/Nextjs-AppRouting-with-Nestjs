import { Schema } from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');

export const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    like: [{ type: String, required: false, unique: true }],
    playlist: [
      {
        title: { type: String, required: false },
        movies: [{ type: String, required: false }],
      },
    ],
    history: [{ type: String, required: false, unique: true }],
    genre: { type: String, required: false, default: null },
  },
});

userSchema.plugin(uniqueValidator);

userSchema.pre('save', function (next) {
  if (
    this.profile.like.length !== new Set(this.profile.like).size ||
    this.profile.history.length !== new Set(this.profile.history).size
  ) {
    console.log('Duplicate values in the "like" array.');
    throw new Error('Duplicate values in the "like" array.');
  } else {
    next();
  }
});
