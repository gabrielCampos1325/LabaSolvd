# API documentation Hospital Appointment Scheduler

## Content

1. [Description](#description)
2. [Technical requirements](#technical-requirements)
3. [Base URL](#base-url)
4. [API Documentation](#api-documentation)
- 4.1 [User Registration and Login Endpoint](#user-registration-and-login-endpoint)
- 4.2 [Doctor Management Endpoints](#doctor-management-endpoints)
- 4.3 [Appointment Scheduling Endpoints](#appointment-scheduling-endpoints)
5. [Install](#install)
6. [Run](#run)

## Description

The Hospital Appointment Scheduling System API allows patients to book appointments with doctors based on their symptoms or required specialization. It also allows doctors to manage their availability.


## Technical requirements

- Programming language - Javascript
- Database - MySQL
- Docker

## Base URL

http://localhost:3000

## API Documentation

### User Registration and Login Endpoint

### api/v1/patients/register

#### - Register a new patient in the system

-  **Request**
```bash
curl -X 'POST' \\
  '/patients/register' \\
  -d '{
    "name": "username",
    "email": "username@email.com",
    "password": "usernamePassword"
  }'
```
-  **Response**
```bash
{
  "message": "Patient registered successfully"
}
```

### api/v1/doctors/register

#### - Register a new doctor in the system. Only available for the administrators

-  **Request**
```bash
curl -X 'POST' \\
  '/doctors/register' \\
  -d '{
    "name": "doctorUsername",
    "email": "doctorUsername@email.com",
    "password": "doctorUsernamePassword",
    "specialization": "doctorUsernameSpecialization"
  }'
```
-  **Response**
```bash
{
  "message": "Doctor registered successfully"
}
```

### api/v1/login

#### - Logs in a user (patient or doctor) and returns a JWT token

```bash
curl -X 'POST' \\
  '/login' \\
  -d '{
    "email": "username@email.com",
    "password": "usernamePassword"
  }'
```
-  **Response**
```bash
{
  "token": "MY.OWN.JWT"
}
```

### Doctor Management Endpoints

#### - Sets the availability for a doctor

### api/doctors/availability
```bash
curl -X 'POST' \\
  '/doctors/availability' \\
  -d '{
    "doctorId": 1,
    "availableFrom": "2024-08-01T09:00:00Z",
    "availableTo": "2024-08-01T17:00:00Z"
  }'
```
-  **Response**
```bash
{
  "message": "Availability set successfully"
}
```

### Appointment Scheduling Endpoints

#### - Schedules an appointment with a doctor based on specialization

### /api/v1/appointments/schedule
```bash
curl -X 'POST' \\
  '/appointments/schedule' \\
  -d '{
    "patientId": 1,
    "specialization": "Cardiology",
    "date": "2024-08-15T10:00:00Z",
    "duration": 30
  }'
```
-  **Response**
```bash
{
  "message": "Appointment scheduled successfully"
}
```

### /api/v1/appointments

#### - Retrieves a list of appointments for the authenticated user

```bash
curl -X 'GET' \\
  '/appointments' \\
```
-  **Response**
```bash
[
  {
    "id": 1,
    "patientId": 1,
    "doctorId": 1,
    "appointmentDate": "2024-08-15T10:00:00Z",
    "duration": 30
  },
  {
    "id": 2,
    "patientId": 1,
    "doctorId": 2,
    "appointmentDate": "2024-08-16T11:00:00Z",
    "duration": 30
  }
]
```
### /api/v1/appointments/:id

#### - Cancels an appointment

```bash
curl -X 'DELETE' \\
  '/appointments/:id' \\
```
-  **Response**
```bash
{
  "message": "Appointment cancelled successfully"
}
```

## Install


### Clone this repo with command
```
  git clone <https://github.com/.......>
```
### Go to project folder
```
  cd hospital-appointment-scheduler-solvd
```
### Install dependencies
```
  npm install
```

## Run
### For running application in Docker container you should have docker installed on your system

### Run app
```
  docker compose up
```
### Stop app
```
  docker compose down
```