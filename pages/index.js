import { useRef, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  const emailRef = useRef();
  const textRef = useRef();

  const [feedbackData, setFeedbackData] = useState([]);

  const submithandler = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const text = textRef.current.value;

    const formData = {
      email: email,
      text: text,
    };
    console.log(formData);

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  const handleButtonClick = () => {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedbacks);
      });
  };

  return (
    <div>
      <h1>Home</h1>
      <form onSubmit={submithandler}>
        <div>
          <label htmlFor="email">Deine E-Mail Adress</label>
          <input type="email" id="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="feedback">Dein Feedback</label>
          <textarea rows="5" id="feedback" ref={textRef}></textarea>
        </div>
        <button>Senden</button>
      </form>
      <hr />
      <button onClick={handleButtonClick}>Alle Feedbacks laden</button>
      <ul>
        {feedbackData.map((feedback) => (
          <li key={feedback.id}>
            {feedback.email}
            <br />
            {feedback.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
