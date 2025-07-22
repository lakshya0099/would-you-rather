// routes/questionRoutes.js
import express from 'express';
import { generateQuestion } from '../utils/gemini.js';
import Question from '../models/Question.js';

const router = express.Router();

// ✅ Route to generate a new AI-based question
router.get('/generate', async (req, res) => {
  try {
    const aiQuestion = await generateQuestion();

    if (!aiQuestion || !aiQuestion.question || !aiQuestion.optionA || !aiQuestion.optionB) {
      return res.status(400).json({ message: 'Failed to generate valid question' });
    }

    const newQuestion = new Question({
      question: aiQuestion.question,
      optionA: aiQuestion.optionA,
      optionB: aiQuestion.optionB
    });

    await newQuestion.save();

    res.status(201).json(newQuestion);
  } catch (error) {
    console.error("❌ Gemini route error:", error);
    res.status(500).json({ message: 'Server error while generating question' });
  }
});


// ✅ Route to vote for a question option
router.post('/vote/:id', async (req, res) => {
  const { id } = req.params;
  const cleanId = id.trim();
  const { option } = req.body; // expected to be "A" or "B"

  try {
    const question = await Question.findById(cleanId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Update the corresponding vote count
    if (option === 'A') {
      question.votesA += 1;
    } else if (option === 'B') {
      question.votesB += 1;
    } else {
      return res.status(400).json({ message: "Invalid option. Use 'A' or 'B'" });
    }

    await question.save();

    const totalVotes = question.votesA + question.votesB;
    const percentageA = ((question.votesA / totalVotes) * 100).toFixed(1);
    const percentageB = ((question.votesB / totalVotes) * 100).toFixed(1);

    res.json({
      message: "Vote recorded successfully",
      percentages: {
        optionA: `${percentageA}%`,
        optionB: `${percentageB}%`
      },
      votes: {
        optionA: question.votesA,
        optionB: question.votesB
      }
    });

  } catch (error) {
    console.error("❌ Voting error:", error.message);
    res.status(500).json({ message: "Server error while recording vote" });
  }
});

export default router;
