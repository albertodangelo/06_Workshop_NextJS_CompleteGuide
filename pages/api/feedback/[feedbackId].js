import { buildFeedbackPath, handleFeedbackData } from ".";

function handler(req, res) {
  const feedbackId = req.query.feedbackId;

  const filePath = buildFeedbackPath();
  const feedbackData = handleFeedbackData(filePath);

  const selectedFeedback = feedbackData.find((item) => feedbackId === item.id);

  res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
