AddVentures
**project idea**
AddVentures is a travel mapping app that allows users to pin and share the places they've visited around the world. Users can showcase their memories, pictures, and comments about each location. This app is beautiful way to log your journeys.

**Your tech stack (frontend, backend, database)**
Frontend: React.js
Backend: Node.js and Express Restful API
Database: MongoDB with Mongoose and Database validations
Map Integration: Mapbox for displaying pinned places on the map
List of backend models and their properties
User

username
email
password (hashed)
VisitedPlace

userId (reference to User model)
name
description
images
comments
location (coordinates)
WishlistPlace

userId (reference to User model)
name
description
images
targetDate(optional)
location (coordinates)
React component hierarchy (if applicable)
App
Navbar
Home
Map
VisitedPlacesList
WishlistPlacesList
UserProfile
UserInformation
VisitedPlacesList
WishlistPlacesList

**User stories**
As a user, I want to be able to log in and create a profile.
As a user, I want to pin and share places I've visited with pictures and comments.
As a user, I want to add places to my wishlist for future visits.
As a user, I want to see my pinned places on a map.

Wireframes
[Link to Wireframes]

Anything else your squad lead should know
Utilizes Mapbox or Leaflet for displaying places on the map.
User authentication is implemented for secure access to profile features.
MVP
The Minimum Viable Product (MVP) for AddVentures includes the following features:

User authentication and profile creation.
Ability to add, edit, and delete visited places with images and comments.
Wishlist functionality for adding places to visit in the future.
