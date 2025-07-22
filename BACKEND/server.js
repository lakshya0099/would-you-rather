// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Question from './models/Question.js'; // must use .js in ES modules
import questionRoutes from './routes/questionRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/question', questionRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Would You Rather API is running with ES Modules!');
});

// DB Test route
app.get('/api/test-db', async (req, res) => {
  try {
    const q = new Question({
      question: "Would you rather have super strength or super speed?",
      optionA: "Super strength",
      optionB: "Super speed"
    });
    await q.save();
    res.json({ message: "Test question saved!", id: q._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save test question" });
  }
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');

    // ✅ Start the server after successful DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

