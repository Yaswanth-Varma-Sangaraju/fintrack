# FinTrack - Personal Finance Management System

FinTrack is a comprehensive full-stack application designed to help users track their personal finances, manage transactions, set financial goals, and visualize their spending habits.

## 🚀 Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, Redux Toolkit
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (implied by models)
- **State Management:** Redux Toolkit
- **Authentication:** JWT (JSON Web Tokens)

---

## 📁 Project Structure

```text
my proj/
├── fintrack/               # Main application directory
│   ├── client/             # Frontend React application (Vite-based)
│   │   ├── src/
│   │   │   ├── app/        # Redux store configuration
│   │   │   ├── components/ # Reusable UI and layout components
│   │   │   ├── features/   # Redux slices and thunks (auth, goal, transactions)
│   │   │   ├── pages/      # Application pages (Dashboard, Login, Transactions)
│   │   │   ├── utils/      # Client-side utility functions
│   │   │   └── main.jsx    # Client entry point
│   │   └── package.json
│   │
│   └── server/             # Backend Node.js/Express application
│       ├── config/         # Configuration files (DB, AI services)
│       ├── controllers/    # Route handlers/Logic
│       ├── middleware/     # Custom express middleware (Auth, error handling)
│       ├── models/         # Database schemas (Mongoose)
│       ├── routes/         # API route definitions
│       ├── services/       # External service integrations (AI, etc.)
│       ├── utils/          # Backend utility functions
│       └── server.js       # Server entry point
│
├── .gitignore              # Global git ignore file
└── README.md               # Project documentation (this file)
```

---

## ⚙️ How it Works

1.  **Backend (Server):** 
    - The server is built with **Node.js and Express**.
    - It uses **Mongoose/MongoDB** to store user data, transactions, and goals.
    - **JWT** is used for secure authentication. 
    - There are specialized **services** (like `aiService.js`) to provide intelligent financial insights.

2.  **Frontend (Client):**
    - The client is a modern **React SPA** (Single Page Application) built with **Vite**.
    - **Redux Toolkit** handles global state management, ensuring a smooth and responsive UI.
    - **Tailwind CSS** provides a modern, responsive design with premium aesthetics.
    - **Axios** is used for communication between the frontend and the backend API.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB account or local instance

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```

2.  **Setup Backend:**
    ```bash
    cd fintrack/server
    npm install
    # Create a .env file based on .env.example
    npm start
    ```

3.  **Setup Frontend:**
    ```bash
    cd fintrack/client
    npm install
    # Create a .env file
    npm run dev
    ```

---


