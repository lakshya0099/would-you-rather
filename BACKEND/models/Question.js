// models/Question.js
import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  optionA: {
    type: String,
    required: true,
  },
  optionB: {
    type: String,
    required: true,
  },
  votesA: {
    type: Number,
    default: 0,
  },
  votesB: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Question = mongoose.model('Question', QuestionSchema);

export default Question;
