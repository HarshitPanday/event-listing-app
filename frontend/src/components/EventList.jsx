import React, { useState } from "react";
import axios from "axios";

const EventList = ({ events, onDelete, onUpdate }) => {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: "", date: "", location: "", description: "" });

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/events/${id}`);
    onDelete();
  };

  const startEdit = (event) => {
    setEditId(event._id);
    setEditData({
      title: event.title,
      date: event.date,
      location: event.location,
      description: event.description,
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/events/${editId}`, editData);
    setEditId(null);
    onUpdate();
  };

  return (
    <div style={styles.list}>
      {events.map((event) => (
        <div key={event._id} style={styles.card}>
          {editId === event._id ? (
            <form onSubmit={handleUpdate} style={styles.editForm}>
              <input
                type="text"
                name="title"
                value={editData.title}
                onChange={handleEditChange}
                required
              />
              <input
                type="date"
                name="date"
                value={editData.date}
                onChange={handleEditChange}
                required
              />
              <input
                type="text"
                name="location"
                value={editData.location}
                onChange={handleEditChange}
                required
              />
              <textarea
                name="description"
                value={editData.description}
                onChange={handleEditChange}
              />
              <div style={styles.btnGroup}>
                <button type="submit" style={styles.saveBtn}>💾 Save</button>
                <button type="button" onClick={() => setEditId(null)} style={styles.cancelBtn}>❌ Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <h3>{event.title}</h3>
              <p>📅 {event.date} | 📍 {event.location}</p>
              <p>{event.description}</p>
              <div style={styles.btnGroup}>
                <button style={styles.editBtn} onClick={() => startEdit(event)}>✏️ Edit</button>
                <button style={styles.deleteBtn} onClick={() => handleDelete(event._id)}>🗑 Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  list: { display: "flex", flexDirection: "column", gap: "15px" },
  card: {
    background: "#f9fafb",
    borderRadius: "10px",
    padding: "18px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
  },
  editForm: { display: "flex", flexDirection: "column", gap: "10px" },
  btnGroup: { display: "flex", gap: "10px", marginTop: "10px" },
  editBtn: { backgroundColor: "#2563eb", color: "white", border: "none", padding: "8px 12px", borderRadius: "5px" },
  saveBtn: { backgroundColor: "#16a34a", color: "white", border: "none", padding: "8px 12px", borderRadius: "5px" },
  cancelBtn: { backgroundColor: "#9ca3af", color: "white", border: "none", padding: "8px 12px", borderRadius: "5px" },
  deleteBtn: { backgroundColor: "#dc2626", color: "white", border: "none", padding: "8px 12px", borderRadius: "5px" },
};

export default EventList;
