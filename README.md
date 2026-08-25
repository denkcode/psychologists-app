# Psychologists.Services

Psychologists.Services is a web application for finding psychologists and booking personal appointments with them.

The application allows users to browse psychologists, sort them by different criteria, add psychologists to favorites, view detailed information and submit an appointment request.

## Features

- Home page with a hero section and a link to the psychologists page
- Psychologists page with a list of psychologists
- Loading psychologists in portions using the "Load More" button
- Sorting psychologists:
  - A to Z
  - Z to A
  - lowest price
  - highest price
  - most popular
  - least popular
- Detailed psychologist information with client reviews
- Add and remove psychologists from favorites
- Favorites are saved for the authenticated user using `localStorage`
- Favorites remain saved after page refresh
- Private Favorites page available only to authenticated users
- User registration and login
- Display of the current authenticated user
- Logout functionality
- Appointment form
- Form validation using React Hook Form and Yup
- Modal windows with closing by:
  - close button
  - backdrop click
  - `Esc` key
- Responsive layout for desktop, tablet and mobile devices
- Multiple color themes based on the provided design

## Pages

### Home

The Home page contains:

- site logo
- navigation
- main slogan
- short description
- "Get started" button
- hero image
- additional decorative elements

The "Get started" button redirects the user to the Psychologists page.

### Psychologists

The Psychologists page displays psychologist cards containing:

- psychologist photo
- name
- experience
- license
- specialization
- initial consultation information
- price per hour
- rating
- description
- client reviews
- favorite button
- "Read more" functionality
- "Make an appointment" button

Initially, three psychologist cards are displayed. Additional cards can be loaded using the "Load More" button.

### Favorites

The Favorites page is a private page available only to authenticated users.

It displays psychologists that the current user has added to favorites.

Favorite data is stored separately for each authenticated user using `localStorage`.

## Authentication

Authentication is implemented using Firebase.

The application supports:

- user registration
- user login
- retrieving the current authenticated user
- logout

Authentication state is used to control access to the Favorites page and favorite functionality.

## Favorites

Authenticated users can add psychologists to their favorites by clicking the heart button.

The selected heart changes its appearance to indicate the active state.

Clicking the heart again removes the psychologist from favorites.

Favorite data is stored using a user-specific `localStorage` key, so the selected psychologists remain available after refreshing the page.

Unauthenticated users cannot use the favorites functionality and are prompted to authenticate.

## Appointment Form

Authenticated users can open an appointment form from a psychologist card.

The form contains fields for:

- name
- phone number
- meeting time
- email
- comment

Form validation is implemented using:

- React Hook Form
- Yup

All required fields must be completed before submitting the form.

The appointment modal can be closed using:

- the close button
- clicking the backdrop
- the `Esc` key

## Technologies

- React
- Vite
- React Router
- Firebase
- Firebase Realtime Database
- Firebase Authentication
- React Hook Form
- Yup
- CSS Modules
- JavaScript
- SVG sprite

## Routing

The application uses React Router.

Available routes:

```text
/                 Home
/psychologists    Psychologists
/favorites        Favorites (private)
```
