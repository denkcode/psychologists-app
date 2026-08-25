# Psychologists Services

A responsive web application for finding psychologists and booking appointments.

Users can browse psychologists, filter and sort them, add psychologists to favorites, and book an appointment.

## Features

- User registration and login
- Firebase authentication
- Protected Favorites page
- Psychologists list
- Sorting and filtering psychologists
- Favorites with user-specific local storage
- Load More functionality
- Psychologist details and reviews
- Appointment booking form
- Form validation with Yup
- Responsive design for desktop, tablet, and mobile
- Three color themes:
  - Green
  - Blue
  - Orange
- Theme persistence using localStorage
- SVG sprite icons

## Technologies

- React
- React Router
- Vite
- Firebase
- React Hook Form
- Yup
- CSS Modules
- JavaScript
- ESLint

## Pages

### Home

The main landing page with information about the service and a link to the psychologists catalog.

### Psychologists

A list of available psychologists.

Users can:

- Sort psychologists by name
- Sort by price
- Filter by price
- Sort by rating
- Load more psychologists
- Add psychologists to favorites
- Open an appointment form

### Favorites

A protected page available only to authenticated users.

Each user has their own favorites stored using their Firebase user ID.

### Authentication

Users can:

- Register
- Log in
- Log out

Authentication is handled with Firebase Authentication.

## Themes

The application supports three color themes:

- Green
- Blue
- Orange

The selected theme is stored in `localStorage`, so it remains after page reload.

## Installation

Clone the repository:

```bash
git clone <repository-url>
```
