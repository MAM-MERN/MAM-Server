# MAM-Server

## Routes

### Authorisation
----
POST '/auth/login'
- Login for Admin

GET '/auth/logout'
- Logout for Admin

### Artwork
---
GET '/artwork'
- Retrieve all artworks in the database

POST '/artworks/new'
- Create a new artwork in database and image on amazon S3

** input name must be 'image' for file upload ie. ```<input name="image" type="file" />``` **

GET '/:id'
- Retrieve a single artwork by ID

DELETE '/:id'
- Delete a single artwork by ID both from the database and its image on amazon S3