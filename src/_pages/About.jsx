import { useState } from "react";
import '../_styles/About.css';

export default function About() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      title: "What is I-Pantun?",
      content: (
        <p>
          I-Pantun is a web-based learning platform designed to support the creation, 
          evaluation, and appreciation of Malay pantun through technology. 
          The system combines traditional pantun principles with computational 
          linguistics to provide an interactive environment where users can write, 
          learn, and refine pantun in a structured and engaging way. By integrating 
          rule-based language processing and real-time feedback, 
          I-Pantun aims to make pantun composition more accessible especially to 
          younger audiences while preserving the cultural and literary values of 
          this traditional Malay art form.
        </p>
      ),
    },
    {
      title: "Project Objectives",
      content: (
        <ul className="objective-list">
          <li>Guided pantun writing environment to understand structure.</li>
          <li>Automatic evaluation based on traditional rules: stanza completeness, rhyme patterns, syllables, moral expression.</li>
          <li>Feedback-driven iterative learning.</li>
          <li>Support digital preservation of Malay literary heritage.</li>
        </ul>
      ),
    },
    {
      title: "How I-Pantun Works",
      content: (
        <ul className="objective-list">
          <li><strong>PantunPen:</strong> Write and preview pantun in the traditional four-line structure.</li>
          <li><strong>Rule-Based Evaluator:</strong> Provides feedback and ratings using linguistic rules and partial NLP.</li>
          <li><strong>Rhyme Dictionary:</strong> Helps explore rhyme patterns and word similarities.</li>
        </ul>
      ),
    },
    {
      title: "About the Developer",
      content: (
        <p>
          I-Pantun was developed as a Final Year Project with a focus on software development, language processing, 
          and cultural preservation. It emphasizes clarity, functionality, and learning value over unnecessary complexity.
        </p>
      ),
    },
    {
      title: "Inspiration Behind I-Pantun",
      content: (
        <p>
          Pantun has long been a key element of Malay tradition, yet its practice has declined among younger generations. 
          I-Pantun provides an interactive platform for learning and appreciating pantun, complementing traditional methods.
        </p>
      ),
    },
    {
      title: "Future Plans",
      content: (
        <ul className="objective-list">
          <li>Complete Pantun Classes with structured materials.</li>
          <li>Integrate advanced NLP for nuanced evaluation.</li>
          <li>Expand Rhyme Dictionary.</li>
          <li>Introduce Community Space features.</li>
          <li>Collaborate with linguistic institutions like DBP.</li>
          <li>Long-term: build a full digital platform for Malay literary education.</li>
        </ul>
      ),
    },
    {
      title: "Contact Information",
      content: (
        <p>Email: <a href="mailto:wanhairulazmy@gmail.com">wanhairulazmy@gmail.com</a></p>
      ),
    },
    {
      title: "Acknowledgements",
      content: (
        <p>
          Special thanks to my supervisor Dr Suraya, examiners Dr Tan Soo Fun and Dr Siti, 
          lecturers, friends, colleagues, and my family for their support and guidance.
        </p>
      ),
    },
  ];

  return (
    <div className="pantun-container">
      <h1>About I-Pantun</h1>
      {sections.map((section, idx) => (
        <div key={idx} className="about-card">
          <div 
            className="about-card-header" 
            onClick={() => toggleSection(idx)}
          >
            <h2>{section.title}</h2>
            <span className="toggle-icon">{openSection === idx ? "−" : "+"}</span>
          </div>
          {openSection === idx && (
            <div className="about-card-body">
              {section.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
