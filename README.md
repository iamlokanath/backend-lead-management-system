# Lead Management System – Backend

This is the backend for the Lead Management System, built with Node.js, Express, and MongoDB (using Mongoose). It provides a RESTful API for managing leads, including advanced filtering, pagination, and CRUD operations.

## Features

- **RESTful API:** Endpoints for creating, reading, updating, and deleting leads.
- **Advanced Filtering:** Filter leads by status, type, broker, subscription, date range, and search terms.
- **Pagination:** Efficiently fetch leads in pages for scalable frontend rendering.
- **Seeding:** Easily populate the database with sample data using a seed script.
- **Error Handling:** Robust error handling for API requests.
- **Environment Configuration:** Uses environment variables for database connection and configuration.

## Architecture

- **Express.js:** Handles HTTP requests and routing.
- **Mongoose:** Defines the Lead schema and interacts with MongoDB.
- **Routes:**
  - `/api/leads` – Main endpoint for all lead operations (GET with filters, POST, PUT, DELETE).
- **Data Model:**
  - Each lead includes fields like name, phone, company, type, broker, status, subscription, and more.
- **Seed Script:**
  - `server/data/seed.js` reads from `server/data/leads.json` and populates the database.

## Project Structure

```
server/
├── data/
│   ├── leads.json      # Sample leads data
│   └── seed.js         # Script to seed the database
├── models/
│   └── Lead.js         # Mongoose schema for leads
├── routes/
│   └── leads.js        # Express routes for lead APIs
├── index.js            # Main server entry point
├── .env                # Environment variables (not committed)
└── README.md           # This file
```

## Getting Started

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```
2. **Set up environment variables:**
   - Create a `.env` file in the `server` directory with your MongoDB URI:
     ```
     MONGO_URI= your-connection-string
     ```
3. **Seed the database (optional):**
   ```bash
   node data/seed.js
   ```
4. **Start the server:**
   ```bash
   npm start
   ```
   The backend will run on the port specified in `.env` or default to 5000.

## API Endpoints

- `GET /api/leads` – List leads with filters and pagination
- `POST /api/leads` – Create a new lead
- `PUT /api/leads/:id` – Update a lead
- `DELETE /api/leads/:id` – Delete a lead

## Notes

- Make sure MongoDB is running before starting the backend.
- The backend is designed to work seamlessly with the React frontend in the `client` folder.

---

For any questions or contributions, please refer to the project repository or contact the maintainer.
