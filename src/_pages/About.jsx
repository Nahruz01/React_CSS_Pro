// src/_pages/About.jsx

import '../_styles/About.css';

export default function About() {
  return (
    <div className="pantun-container">
      <h1>About I-Pantun</h1>
      <h2>What is I-Pantun?</h2>
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

      <h2>Project Objectives</h2>

        <p>The primary objectives of I-Pantun are:</p>

        <ul className="objective-list">
        <li>
        To provide a guided pantun writing environment that helps users understand pantun structure.
        </li>
        <li>
        To automatically evaluate pantun based on traditional rules such as stanza completeness, rhyme patterns, syllable consistency, and moral expression.
        </li>
        <li>
        To promote learning through feedback, allowing users to improve their pantun iteratively.
        </li>
        <li>  
        To support the digital preservation and modernization of Malay literary heritage
        </li>

        </ul>


      <h2>How I-Pantun Works</h2>
      <p>
        I-Pantun is built around several core modules:
      </p>
      <ul className="objective-list">
        <li><h3>PantunPen</h3>
        Allows users to write and preview pantun following the traditional four-line structure.
        </li>
        <li><h3>Rule-Based Evaluator</h3>
        Evaluates pantun using rule-based linguistic checks and partial natural language processing (NLP), providing ratings, feedback, and recommendations.
        </li>
        <li><h3>Rhyme Dictionary</h3>
        Assists users in identifying rhyme patterns and exploring word similarities to support pantun composition.
        </li>
      </ul>

      <h2>About the Developer</h2>
      <p>I-Pantun was developed as a Final Year Project with a strong interest in software development, language processing, 
        and cultural preservation. The project reflects a belief that technology can play an important role in sustaining 
        traditional knowledge by making it relevant and approachable in a digital context. 
        The development approach prioritizes clarity, functionality, and learning value over unnecessary complexity. 
        Guided by the principle that “premature optimization is the root of all evil,” the project focuses on building a 
        stable and understandable foundation before introducing advanced features.
      </p>

      <h2>Inspiration Behind I-Pantun</h2>
      <p>
      Pantun has long been a key element of Malay oral and written tradition, yet its practice has gradually declined among younger generations. Many existing platforms either treat pantun as static content or lack meaningful feedback mechanisms for learners.
      I-Pantun was inspired by the need for a hands-on, interactive platform that not only showcases pantun but also teaches users how and why a pantun works. The goal is not to replace traditional learning, but to complement it through modern tools.
      </p>


      <h2>Future Plans</h2>
      <p>Planned near-term enhancements include: </p>
      <ul className="objective-list">
        <li>
        Completion of Pantun Classes with structured learning materials.
        </li>
        <li>
        Integration of advanced NLP techniques for more nuanced pantun evaluation.
        </li>
        <li>
        Expansion of the Rhyme Dictionary with improved linguistic data.
        </li>
        <li>
        Introduction of Community Space features for sharing and appreciating pantun.
        </li>
        <li>
        Exploration of collaborations with linguistic institutions such as Dewan Bahasa dan Pustaka (DBP) for verified language resources.
        </li>
        <li>
        Long-term goals include transforming I-Pantun into a comprehensive digital platform for Malay literary education, research, and cultural engagement.
        </li>
      </ul> 

      <h2>Contact Information</h2>
      <p>
        For inquiries, feedback, or collaboration opportunities, please reach out via email at wanhairulazmy@gmail.com
      </p>

      <h2>Acknowledgements</h2>
      <p>Special Thanks to my supervisor, Dr Suraya for guiding me throughout my final year project. Addtionally I want to
      extend my appreciation to my Dr Tan Soo Fun and Dr Siti for giving me meaningful advice and improvement as my examiners.
      I would also like to thanks all my lecturers from Faculty of Computer of Computer and Informatics for imparting their knowledge and skills during my studies.  
      To all my friends and colleagues who provided valuable feedback and support during the development of I-Pantun, I appreciate your act of support. 
      Lastly, I would like to express my gratitude to my family for their unwavering support and encouragement during this journey.
      </p>


    </div>
  );
}
