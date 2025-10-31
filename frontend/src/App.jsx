import React, { useEffect, useState } from "react";
import axios from "axios";
import EventForm from "./components/EventForm";

const App = () => {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);

  const fetchEvents = async () => {
    const res = await axios.get("http://localhost:5000/api/events");
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleRefresh = () => {
    fetchEvents();
    setEditEvent(null);
  };

  const handleEdit = (event) => {
    setEditEvent(event);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      fetchEvents();
    }
  };

  // sirf last event hi dikhana
  const latestEvent = events.length > 0 ? events[events.length - 1] : null;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎯 Event Listing App</h1>
        <p style={styles.subtitle}>Add, edit, or delete your events easily</p>

        <EventForm onEventAdded={handleRefresh} editEvent={editEvent} />

        <div style={styles.list}>
          {latestEvent ? (
            <div key={latestEvent._id} style={styles.eventBox}>
              <div>
                <h3 style={styles.eventTitle}>{latestEvent.title}</h3>
                <p>📅 {latestEvent.date} | 📍 {latestEvent.location}</p>
                <p>{latestEvent.description}</p>
              </div>

              <div style={styles.buttons}>
                <button
                  style={styles.editBtn}
                  onClick={() => handleEdit(latestEvent)}
                >
                  ✏️ Edit
                </button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(latestEvent._id)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "#6b7280" }}>
              No events yet — add your first event!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// 🎨 same styles as before
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(120deg, #667eea, #764ba2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Poppins', sans-serif",
    padding: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "18px",
    boxShadow: "0 10px 35px rgba(0,0,0,0.15)",
    padding: "35px 30px",
    width: "100%",
    maxWidth: "500px",
  },
  title: {
    fontSize: "1.8rem",
    textAlign: "center",
    marginBottom: "8px",
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: "25px",
  },
  list: {
    marginTop: "25px",
  },
  eventBox: {
    background: "#f9fafb",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventTitle: { color: "#4f46e5", marginBottom: "6px" },
  buttons: { display: "flex", gap: "8px" },
  editBtn: {
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  deleteBtn: {
    backgroundColor: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default App;
