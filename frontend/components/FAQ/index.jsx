import React, { useState } from "react";
import "./index.scss"; // Import the combined SCSS file

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFaq = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq-item">
      <div className="faq-question" onClick={toggleFaq}>
        <span>{question}</span>
        <span className="faq-toggle">{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

const FaqList = () => {
  const faqs = [
    {
      question: "What is the origin of Koi fish at Golden Koi Farm?",
      answer:
        "Koi fish at Golden Koi Farm include imported fish from Japan and Vietnamese F1 Koi. The F1 Koi is bred according to Japanese standards at the Golden Koi Farm's 20-hectare facility.",
    },
    {
      question: "What sizes are available for Koi fish at Golden Koi Farm?",
      answer:
        "Koi fish at Golden Koi Farm come in a variety of sizes, ranging from 10 cm to 65 cm.",
    },
    {
      question: "Are Koi fish prone to disease?",
      answer:
        "Like humans, Koi fish can fall ill. It is essential to work with Golden Koi Farm to ensure your Koi fish remain healthy.",
    },
    // Add more FAQs if necessary
  ];

  return (
    <div className="faq-list">
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <FaqItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

export default FaqList;
