#  Event Listing App (MERN Stack Project)

A **Full Stack Event Management Application** built using **MongoDB, Express.js, React.js, and Node.js (MERN)**.  
This project allows users to **add, view, edit, and delete events** easily — with a beautiful and responsive interface.

---

## Features

✅ Add new events (title, date, location, description)  
✅ View latest added event  
✅ Edit or delete existing events  
✅ Success popup after event submission  
✅ Responsive and premium-looking UI design  
✅ MongoDB Atlas database integration  
✅ Backend API built with Express.js and Mongoose  
✅ Frontend powered by React + Vite  

---

##  Project Structure

event-listing-app/
│
├── backend/ # Express + MongoDB server
│ ├── server.js
│ ├── routes/
│ │ └── eventRoutes.js
│ ├── controllers/
│ │ └── eventController.js
│ ├── models/
│ │ └── Event.js
│ ├── config/
│ │ └── db.js
│ └── .env
│
├── frontend/ # React (Vite) client app
│ ├── src/
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── components/
│ │ ├── EventForm.jsx
│ │ └── EventList.jsx
│ ├── package.json
│ └── vite.config.js
│
└── README.md

---

## Project Workflow

User fills the event form → clicks Add Event

Data sent to backend API → stored in MongoDB Atlas

Latest event is displayed below the form

User can Edit or Delete the event

Popup shows successful add/update confirmation



## Developer

Name: Harshit Pandey
Project: Full Stack Development Internship Project
University: Dr. Ram Manohar Lohia Avadh University
Stack: MERN (MongoDB, Express.js, React.js, Node.js)
