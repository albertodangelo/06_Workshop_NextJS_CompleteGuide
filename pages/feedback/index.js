import React, { useState } from "react";
import { buildFeedbackPath, handleFeedbackData } from "../api/feedback";

const Feedback = (props) => {
  const [feedbackData, setFeedbackData] = useState();

  const loadFeedbackHander = (id) => {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFeedbackData(data.feedback);
      });
  };

  return (
    <div>
      <h1>{feedbackData && feedbackData.email}</h1>
      <ul>
        {props.data.map((item) => {
          return (
            <li key={item.id}>
              {item.text}
              <button onClick={loadFeedbackHander.bind(null, item.id)}>
                Email anzeigen
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  const path = buildFeedbackPath();
  const data = handleFeedbackData(path);

  return {
    props: { data: data },
  };
}

export default Feedback;
