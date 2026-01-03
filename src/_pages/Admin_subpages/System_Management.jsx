import { useEffect, useState } from "react";

export default function UserManagement() {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    const res = await fetch("http://localhost:5000/tags");
    const data = await res.json();
    setTags(data);
  };

  const addTag = async () => {
    if (!newTag.trim()) return;

    const res = await fetch("http://localhost:5000/tags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tag_name: newTag }),
    });

    if (res.ok) {
      setNewTag("");
      fetchTags();
    }
  };

  const deleteTag = async (id) => {
    await fetch(`http://localhost:5000/tags/${id}`, {
      method: "DELETE",
    });
    fetchTags();
  };

  return (
    <div>
      <div className="System_Management_Cards">
        <div className="Tags_Management">
          <h2>Category Management</h2>
          <div>
            <input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="New tag"
            />
            <button onClick={addTag}>Add</button>
          </div>

          <ul>
            {tags.map((tag) => (
              <li key={tag.tag_id}>
                {tag.tag_name}
                <button onClick={() => deleteTag(tag.tag_id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>




    </div>
  );
}