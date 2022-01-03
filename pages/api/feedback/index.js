var fs = require("fs");
var path = require("path");

export const buildFeedbackPath = () => {
  return path.join(process.cwd(), "data", "feedback.json");
};
export const handleFeedbackData = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
};

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const text = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: text,
    };

    // store data in File
    const filePath = buildFeedbackPath();
    const data = handleFeedbackData(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.status(201).json({ message: "Success", feedback: newFeedback });
  } else {
    // get request
    const filePath = buildFeedbackPath();
    const data = handleFeedbackData(filePath);
    res.status(200).json({ feedbacks: data });
  }
}

export default handler;
