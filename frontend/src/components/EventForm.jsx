import React, { useEffect, useState } from "react";
import axios from "axios";

const EventForm = ({ onEventAdded, editEvent }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (editEvent) setFormData(editEvent);
  }, [editEvent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editEvent) {
      await axios.put(
        `http://localhost:5000/api/events/${editEvent._id}`,
        formData
      );
    } else {
      await axios.post("http://localhost:5000/api/events", formData);
    }

    setFormData({ title: "", date: "", location: "", description: "" });
    setShowPopup(true);
  };

  const handlePopupOk = () => {
    setShowPopup(false);
    onEventAdded();
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="🎯 Event Title"
          value={formData.title}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="📍 Location"
          value={formData.location}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <textarea
          name="description"
          placeholder="📝 Description..."
          value={formData.description}
          onChange={handleChange}
          style={styles.textarea}
        />

        <button type="submit" style={styles.button}>
          {editEvent ? "💾 Update Event" : "+ Add Event"}
        </button>
      </form>

      {showPopup && (
        <div style={styles.popup}>
          ✅ {editEvent ? "Event Updated!" : "Event Added Successfully!"}
          <br />
          <button onClick={handlePopupOk} style={styles.okButton}>
            OK
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: { position: "relative" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: {
    padding: "12px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    fontSize: "0.95rem",
    outline: "none",
    backgroundColor: "#f9fafb",
  },
  textarea: {
    padding: "12px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    fontSize: "0.95rem",
    resize: "none",
    height: "90px",
    backgroundColor: "#f9fafb",
  },
  button: {
    background:
      "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)",
    border: "none",
    color: "white",
    padding: "12px",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
  },
  popup: {
    position: "absolute",
    top: "-60px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#22c55e",
    color: "#fff",
    padding: "10px 25px",
    borderRadius: "10px",
    fontWeight: "600",
    boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
  },
  okButton: {
    marginTop: "8px",
    backgroundColor: "#fff",
    color: "#22c55e",
    border: "none",
    padding: "4px 10px",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default EventForm;
