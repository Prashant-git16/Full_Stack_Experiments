import { useState, useEffect } from "react";
import "./EventModal.css";

function EventModal({
  show,
  onClose,
  onSave,
  onDelete,
  selectedDate,
  editEvent,
}) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("Facebook");

  useEffect(() => {
    if (editEvent) {
      setTitle(editEvent.title);
      setPlatform(editEvent.platform);
    } else {
      setTitle("");
      setPlatform("Facebook");
    }
  }, [editEvent]);

  if (!show) return null;

  const handleSave = () => {
    if (title.trim() === "") {
      alert("Please enter a post title.");
      return;
    }

    onSave({
      title,
      platform,
    });

    setTitle("");
    setPlatform("Facebook");
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>
          {editEvent ? "Edit Post" : "Schedule Post"}
        </h2>

        <p>
          <b>Date:</b> {selectedDate}
        </p>

        <label>Post Title</label>

        <input
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Platform</label>

        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option>Facebook</option>
          <option>Instagram</option>
          <option>Twitter</option>
          <option>LinkedIn</option>
        </select>

        <div className="modal-buttons">

          <button onClick={handleSave}>
            {editEvent ? "Update" : "Save"}
          </button>

          {editEvent && (
            <button
              className="delete"
              onClick={() => onDelete(editEvent.id)}
            >
              Delete
            </button>
          )}

          <button
            className="cancel"
            onClick={onClose}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}

export default EventModal;