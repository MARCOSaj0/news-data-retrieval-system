# 📰 News Data Retrieval System

A backend system built to fetch, store, and retrieve news articles.

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose)
- **Axios**
- **dotenv**

---

## ⚙️ How to Run the Application

### 1. Clone the Repository

```bash
git clone https://github.com/MARCOSaj0/news-data-retrieval-system.git
cd news-data-retrieval-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following content:

```env
# ========== INFO ==========
PROJECT_NAME=NEWS-DATA-RETRIEVAL-SYSTEM

# ========== SERVER CONFIG ==========
IS_SERVER=development
PORT=5000

# SSL Certificate (Optional for HTTPS)
SERVER_CERT="-----BEGIN CERTIFICATE-----\nYOUR_CERT_HERE\n-----END CERTIFICATE-----"
SERVER_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----"

# ========== MONGODB CONFIG ==========
MongoDB_HOST=localhost
MongoDB_URI=mongodb://localhost:27017/newsDB

# ========== GROQ API ==========
GROQ_API_URL=https://api.groq.com/openai/v1/chat/completions
GROQ_API_KEY=your_groq_api_key
```

### 4. Start the Server

```bash
npm start
```

---