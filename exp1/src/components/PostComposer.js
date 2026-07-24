import React, { useState } from "react";
import "./PostComposer.css";

function PostComposer() {

  const limits = {
    Twitter: 280,
    Facebook: 632,
    LinkedIn: 380,
    Instagram: 220,
  };

  // const icons = {
  //   Twitter: "",
  //   Facebook: "",
  //   LinkedIn: "",
  //   Instagram: "",
  // };

  const [post, setPost] = useState("");
  const [platforms, setPlatforms] = useState([]);

  const handlePlatform = (platform) => {
    if (platforms.includes(platform)) {
      setPlatforms(platforms.filter((p) => p !== platform));
    } else {
      setPlatforms([...platforms, platform]);
    }
  };

  const publishPost = () => {
    if (platforms.length === 0) {
      alert("Please select at least one platform.");
      return;
    }

    const invalid = platforms.find((p) => post.length > limits[p]);

    if (invalid) {
      alert(` Cannot publish.\n${invalid} character limit exceeded.`);
      return;
    }

    alert(" Post Published Successfully!");

    setPost("");
    setPlatforms([]);
  };

  const progress = Math.min((post.length / 3000) * 100, 100);

  return (
    <div className="container">

      <h1> Social Media Post Composer</h1>
      <p className="subtitle">
        Compose Once • Publish Everywhere
      </p>

      <textarea
        placeholder="What's on your mind today?"
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <div className="counter">
        Character Count : <b>{post.length}</b>
      </div>

      <div className="progress">
        <div
          className="fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <h3>Select Platforms</h3>

      <div className="platforms">

        {Object.keys(limits).map((platform) => (

          <label
            key={platform}
            className={`platform-card ${
              platforms.includes(platform) ? "selected" : ""
            }`}
          >

            <input
              type="checkbox"
              checked={platforms.includes(platform)}
              onChange={() => handlePlatform(platform)}
            />

            

            {platform}

          </label>

        ))}

      </div>

      <h3>Validation</h3>

      {platforms.length === 0 && (
        <p>Select a platform.</p>
      )}

      {platforms.map((platform) => (

        <p
          key={platform}
          className={
            post.length <= limits[platform]
              ? "success"
              : "error"
          }
        >

          {post.length <= limits[platform]
            ? ` ${platform} : Valid`
            : ` ${platform} : Limit Exceeded (${limits[platform]})`}

        </p>

      ))}

      <div className="buttons">

        <button onClick={publishPost}>
           Publish
        </button>

        <button
          className="reset"
          onClick={() => {
            setPost("");
            setPlatforms([]);
          }}
        >
          Reset
        </button>

      </div>

    </div>
  );
}

export default PostComposer;