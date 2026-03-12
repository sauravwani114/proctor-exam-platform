<p align="center">

# 🎓 ProctorAI

### 🧠 AI-Powered Privacy-First Online Examination Platform

Detect cheating in real-time using **client-side Artificial Intelligence** — without requiring intrusive software installations.

</p>

<p align="center">

<img src="https://img.shields.io/badge/Frontend-React.js-blue?logo=react"/>
<img src="https://img.shields.io/badge/Backend-Node.js-green?logo=node.js"/>
<img src="https://img.shields.io/badge/Database-MongoDB-darkgreen?logo=mongodb"/>
<img src="https://img.shields.io/badge/Realtime-Socket.io-black?logo=socket.io"/>
<img src="https://img.shields.io/badge/AI-MediaPipe-orange"/>
<img src="https://img.shields.io/badge/License-MIT-yellow"/>

</p>

---

# 📖 Overview

The shift to **remote education and online examinations** has made it difficult to maintain academic integrity.
Most existing proctoring systems require **heavy desktop software, invasive permissions, and constant video streaming**, which raises privacy and bandwidth concerns.

**ProctorAI solves this problem.**

Instead of sending video streams to servers, ProctorAI runs **Computer Vision models directly inside the student's browser** using **Google MediaPipe**.

This enables:

✔ Real-time cheating detection
✔ Zero software installation
✔ Strong privacy protection
✔ Minimal bandwidth usage

Only **lightweight violation events** are sent to the backend server.

---

# ⚡ Feature Overview

| Feature                      | Description                                    |
| ---------------------------- | ---------------------------------------------- |
| 🔀 Tab Switch Detection      | Detects when students leave the exam tab       |
| 👤 Face Detection            | Flags when the student leaves the camera frame |
| 👥 Multiple Person Detection | Detects unauthorized persons in camera         |
| 👀 Gaze Tracking             | Detects repeated off-screen eye movement       |
| 🙈 Camera Obstruction        | Detects covered or blocked webcams             |
| ⛔ Auto Exam Submission       | Exam auto-submits after violation threshold    |
| ⚡ Real-Time Monitoring       | Teachers receive violation logs instantly      |
| 🔒 Privacy-First             | AI runs locally in the browser                 |

---

# 👨‍🏫 Educator Dashboard (Admin)

### 📝 Exam Creation

Teachers can create dynamic exams including:

* Multiple Choice Questions (auto-graded)
* Subjective questions
* Custom exam durations

---

### 📊 Student Performance Analytics

View:

* Student scores
* Submission history
* Exam attempt data

---

### 🚨 Malpractice Logs

Every exam generates a **timestamped violation report** including:

* Tab switching
* Face missing
* Multiple people detected
* Camera obstruction

---

# 👩‍🎓 Student Experience

### ⚡ Zero Installation

Students simply:

1. Open the exam link
2. Enter exam code
3. Start the exam

No plugins or additional software required.

---

### ⚠ Live Violation Counter

A **real-time warning counter** acts as a psychological deterrent to cheating.

---

### 🧾 Instant Results

Multiple-choice questions are graded **instantly after submission**.

---

# 🤖 AI Proctoring Engine (Client-Side)

The AI engine runs **completely inside the student's browser** using **Google MediaPipe face landmark detection**.

### Detected Violations

🔀 **Tab Switching Detection**

Detects when students change tabs or minimize the browser.

---

🙈 **Camera Obstruction Detection**

Detects if the webcam becomes:

* covered
* dark
* blurred

---

👤 **Missing Face Detection**

If the student leaves the camera frame for **more than 5 seconds**, a violation is recorded.

---

👥 **Multiple Person Detection**

If more than one face appears in the camera feed, a violation is triggered.

---

👀 **Gaze & Head Pose Detection**

Using facial landmark ratios (nose-eye alignment), the system detects if the student repeatedly looks away from the screen.

---

⛔ **Automatic Exam Termination**

If violations exceed the allowed limit:

➡ The exam is **automatically submitted**

---

# 🏗 System Architecture

```
Student Browser
     │
     │ Webcam Feed
     ▼
MediaPipe AI Detection (Client-Side)
     │
Violation Events
     │
Socket.io
     │
Node.js Backend
     │
MongoDB Database
     │
Teacher Dashboard
```

The architecture ensures:

* **AI inference happens locally**
* **Only lightweight violation events reach the server**
* **Minimal bandwidth usage**

---

# 🛠 Tech Stack

| Layer                  | Technology                    |
| ---------------------- | ----------------------------- |
| Frontend               | React.js (Vite), Tailwind CSS |
| Routing                | React Router                  |
| Backend                | Node.js, Express.js           |
| Database               | MongoDB, Mongoose             |
| Realtime Communication | Socket.io                     |
| AI / Computer Vision   | MediaPipe Tasks Vision        |
| Video Processing       | HTML5 Canvas API              |
| Media Streaming        | WebRTC                        |

---

# 📸 Screenshots

### Teacher Dashboard

<img width="1916" height="907" src="https://github.com/user-attachments/assets/a6a9250c-172a-4985-b69b-12335c16b878" />

---

### Student Exam Room

<img width="1917" height="914" src="https://github.com/user-attachments/assets/d58ed9b9-591b-41a8-a373-08390ccbdeb5" />

---

### Violation Logs

<img width="1919" height="907" src="https://github.com/user-attachments/assets/4ac3c8b8-32fe-441b-9b59-a9034e2cbc08" />

---

### Live AI Monitoring

<img width="1919" height="1079" src="https://github.com/user-attachments/assets/a7272ce9-9b2f-42b7-adfb-2ba3c74a5a9e" />

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

* Node.js (v16 or higher)
* MongoDB (local or MongoDB Atlas)

---

# ⚙ Installation

## Clone the Repository

```bash
git clone https://github.com/your-username/ProctorAI.git
cd ProctorAI
```

---

# Backend Setup

```bash
cd server
npm install
```

Create `.env` file inside **server** directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

Start backend server:

```
npm run dev
```

---

# Frontend Setup

```
cd client
npm install
```

Create `.env` file inside **client** directory:

```
VITE_API_URL=http://localhost:5000
```

Start frontend:

```
npm run dev
```

Open the application in your browser:

```
http://localhost:5173
```

---

# 📂 Project Structure

```
ProctorAI
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── hooks
│   │   ├── utils
│   │   └── App.jsx
│   │
│   └── vite.config.js
│
├── server
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   └── server.js
│
├── demo
│   └── demo.gif
│
└── README.md
```

---

# 🧠 Technical Highlights

### ⚡ Optimized AI Inference

Running face detection at **60 FPS** can overload browsers.

ProctorAI uses a **throttled inference loop**:

* AI inference runs every **500ms**
* CPU usage reduced by **~95%**
* Real-time monitoring maintained

---

### ⚙ Ref-Based State Management

Continuous AI detection can cause React UI issues like:

* UI flickering
* Input deselection
* Excessive re-renders

To solve this:

* Core logic uses **useRef**
* UI updates controlled via **useState**

This ensures **smooth user experience during monitoring**.

---

# 🌟 Why This Project Matters

Online examination systems struggle with **cheating detection and privacy concerns**.

ProctorAI demonstrates how **modern browser-based AI** can solve both challenges simultaneously.

Key innovations:

* Client-side AI monitoring
* Privacy-preserving design
* Real-time violation logging
* Scalable full-stack architecture

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Submit a pull request

You can also open issues for **bug reports or feature requests**.

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Saurav Wani**
BTech IT Student | Java Backend Developer | AI Enthusiast

---

<p align="center">

⭐ If you like this project, consider **starring the repository**!

</p>
