// src/_pages/Game_pages/Challenge_Info.jsx
import { useOutletContext } from "react-router-dom";
import "../../_styles/Challenge_Info.css";

export default function Challenge_Info() {
  const { activeChallenge, timeLeft, challengeStarted, startChallenge, startRandomChallenge, challenges, clearChallenge   } = useOutletContext();

  return (
    <div className="ChallengeFrame">
      <div className="ChallengeContent">
        <div className="Challenge_Selection">
          <h3>Challenge Selection</h3>
          <button onClick={startRandomChallenge}>Random Challenge</button>
          <p>Choose a challenge to participate in:</p>

          {!challengeStarted ? (
            challenges.length > 0 ? (
              challenges.map(c => (
                <button key={c.challenge_id} className="ChallengeBtn" onClick={() => startChallenge(c)}>
                  {c.title}
                </button>
              ))
            ) : (
              <p>Loading challenges...</p>
            )
          ) : (
            activeChallenge && (
              <div className="ChallengeSection">
                <h3>Pantun Challenge: {activeChallenge.title}</h3>
                {timeLeft !== null && (
                  <p className="ChallengeTimer">
                    Time Remaining: {Math.floor(timeLeft / 60)}:
                    {(timeLeft % 60).toString().padStart(2, "0")}
                  </p>
                )}
                <p>{activeChallenge.description}</p>
                {activeChallenge.rules && <p><strong>Rules:</strong> {activeChallenge.rules}</p>}

                <button onClick={() => clearChallenge()}>
                  Back to Challenge List
                </button>
              </div>
            )
          )}



          <p>Pantun, whether shared in everyday life or in friendly competitions, challenges people to think quickly and creatively to craft clever and meaningful responses.</p>
        </div>
      </div>
    </div>
  );
}
