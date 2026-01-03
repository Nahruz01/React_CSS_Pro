import { useState, useEffect } from "react";
import "../../_styles/Challenge_Info.css";

export default function Challenge_Info() {
  const [showChallenge, setShowChallenge] = useState(false);
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [challenges, setChallenges] = useState([]); // store challenges

  // Fetch challenges from backend
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await fetch("http://localhost:5000/challenges");
        const data = await res.json();
        setChallenges(data);
      } catch (err) {
        console.error("Failed to fetch challenges:", err);
      }
    };

    fetchChallenges();
  }, []);

  const startChallenge = (challenge) => {
    setChallengeStarted(true);
    setTimeLeft(challenge.time_limit || 300); // use challenge time_limit if provided
    setShowChallenge(challenge); // set the selected challenge
  };

  // Timer
  useEffect(() => {
    if (!challengeStarted || timeLeft === null) return;
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [challengeStarted, timeLeft]);

  return (
    <div className="ChallengeFrame">
      <div className="ChallengeContent">
        <div className="Challenge_Selection">
          <h3>Challenge Selection</h3>
          <p>Choose a challenge to participate in:</p>

          {!challengeStarted ? (
            challenges.length > 0 ? (
              challenges.map(challenge => (
                <button
                  key={challenge.challenge_id}
                  className="ChallengeBtn"
                  onClick={() => startChallenge(challenge)}
                >
                  {challenge.title}
                </button>
              ))
            ) : (
              <p>Loading challenges...</p>
            )
          ) : (
            <div className="ChallengeSection">
              <h3>Pantun Challenge: {showChallenge.title}</h3>

              {timeLeft !== null && (
                <p className="ChallengeTimer">
                  Time Remaining: {Math.floor(timeLeft / 60)}:
                  {(timeLeft % 60).toString().padStart(2, "0")}
                </p>
              )}

              <p>{showChallenge.description}</p>
              {showChallenge.rules && (
                <p><strong>Rules:</strong> {showChallenge.rules}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
