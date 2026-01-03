import { useEffect, useState } from "react";

export default function Admin_Notification() {
  const [challenges, setChallenges] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    time_limit: 300,
    rules: ""
  });

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    const res = await fetch("http://localhost:5000/challenges");
    const data = await res.json();
    setChallenges(data);
  };

  const addChallenge = async () => {
    if (!form.title.trim()) return;

    const res = await fetch("http://localhost:5000/challenges", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ title: "", description: "", time_limit: 300, rules: "" });
      fetchChallenges();
    }
  };

  const deleteChallenge = async (id) => {
    await fetch(`http://localhost:5000/challenges/${id}`, {
      method: "DELETE",
    });
    fetchChallenges();
  };

  return (
    <div className="Challenge_Management">
      <h2>Challenge Management</h2>

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        type="number"
        value={form.time_limit}
        onChange={(e) =>
          setForm({ ...form, time_limit: Number(e.target.value) })
        }
      />

      <textarea
        placeholder="Rules"
        value={form.rules}
        onChange={(e) => setForm({ ...form, rules: e.target.value })}
      />

      <button onClick={addChallenge}>Add Challenge</button>

      <ul>
        {challenges.map((c) => (
          <li key={c.challenge_id}>
            <strong>{c.title}</strong> ({c.time_limit}s)
            <button onClick={() => deleteChallenge(c.challenge_id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
