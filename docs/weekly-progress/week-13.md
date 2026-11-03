
# Week 13 — Frontend and Backend Integration

**Project:** RentFlow — Equipment Rental & Resource Management System
**Development Week:** 13
**Development Focus:** React–Express API Integration
**Development Status:** Integration Testing Completed (Partial Feature Integration)

## 1. Objectives

- Establish communication between React and Express.
- Retrieve equipment records from MongoDB Atlas.
- Replace static equipment data with live API data.
- Develop a reservation form using database equipment records.
- Test reservation creation and retrieval.
- Verify API responses and database persistence.

## 2. Technologies Used

- React
- Vite
- Tailwind CSS
- React Router
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Thunder Client
- Git and GitHub

## 3. Accomplished Tasks

### 3.1 API Connectivity

Configured frontend communication with the Express backend.

Verified that React successfully retrieved equipment records
from MongoDB Atlas through the REST API.

### 3.2 Equipment Catalog Integration

Replaced static equipment records with database-driven data.

Implemented:
- Equipment retrieval
- Active equipment filtering
- Loading state
- Error state
- Empty state
- Equipment information display

### 3.3 Reservation Form

Developed a reservation form containing:
- Equipment selection
- Quantity
- Start date
- End date
- Additional notes
- Estimated rental cost

The form retrieves equipment information from the backend.

Reservation submission remains disabled until secure
customer authentication is implemented.

### 3.4 Reservation API Testing

Verified the following endpoints using Thunder Client:

| Method | Endpoint | Result |
|---|---|---|
| GET | /api/equipment | 200 OK |
| GET | /api/reservations | 200 OK |
| POST | /api/reservations | 201 Created |
| GET | /api/reservations/:id | 200 OK |

The reservation creation test used:
- Equipment: Folding Table
- Quantity: 2
- Rental period: November 20–22, 2026
- Daily rate: PHP 150
- Total amount: PHP 900
- Initial status: pending

The newly created reservation was successfully retrieved
from the database.

### 3.5 Customer Reservation Page

Removed fictional reservation records.

Prepared the reservation table for future authenticated
customer-specific data retrieval.

## 4. Validation

Frontend linting and production build completed successfully.

Backend reservation API tests returned the expected
HTTP status codes and response data.

## 5. Current Limitations

- Customer authentication is not yet implemented.
- Role-based authorization is not yet enforced.
- Reservation submission is disabled in the frontend.
- Customer-specific reservation retrieval is not yet connected.
- Reservation availability does not yet account for
  overlapping rental dates.
- The backend endpoints are intended for local development
  until authentication and authorization are implemented.

## 6. Evidence

Screenshots are stored in:

docs/screenshots/week-13/

## 7. Next Development Focus

Week 14 — Role-Based User Interface and Error Handling

Planned improvements:
- Implement secure authentication.
- Enforce backend role-based authorization.
- Connect authenticated customers to their reservations.
- Improve frontend error handling.
- Prepare role-specific dashboards and navigation.

## 8. Summary

Week 13 established working communication between the
React frontend, Express backend, and MongoDB Atlas.

Live equipment retrieval was integrated into the frontend,
while reservation creation and retrieval were successfully
verified using Thunder Client.

Customer-specific reservation functionality remains pending
until authentication and authorization are implemented.
