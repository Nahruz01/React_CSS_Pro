export default function Categories() {

  const samplePosts = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    author: "Author " + (i + 1),
    title: "Pantun Title " + (i + 1),
    tag: "love",
    lines: [
      "Line 1 of pantun...",
      "Line 2 of pantun...",
      "Line 3 of pantun...",
      "Line 4 of pantun..."
    ]
  }));

  
const categories = [
  "Love",
  "Humour",
  "Classic",
  "Patriotic",
  "Tragic"
];

  return (
    <div>
      <h2>Categories Page</h2>
      <p>This is a placeholder for now.</p>

    <div className="Categories_Wrapper">
      <h3>Pantun Categories</h3>

      <div nav className="Categories_List">
        <nav>
          <p></p>
          {categories.map(cate => (
            <p>{cate}</p>
          ))}

        </nav>
      </div>


    </div>

    <>

      {samplePosts.map(post => (
        <div key={post.id} className="Post_Card">
          <h4>{post.author}</h4>

          <div className="Post_Content">
            <h3>{post.title}</h3>
            <h3>{post.tag}</h3>

            {post.lines.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          <div className="Post_Buttons">
            <button>Like</button>
            <button>Comment</button>
          </div>
        </div>
      ))}
    </>

    </div>
  );
}