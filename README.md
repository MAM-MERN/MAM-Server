# MAM-Server

## Routes

### Authorisation
----
POST '/auth/login'
- Login for Admin
- Passport uses fields 'username' and 'password'
- will automatically send session info to the client once logged in

GET '/auth/logout'
- Logout for Admin

GET '/auth/admin'
- retrieve Admin session info

### Artwork
---
GET '/artworks'
- Retrieve all artworks in the database

POST '/artworks/new'
- Create a new artwork in database and image on amazon S3

** input name must be 'image' for file upload ie. ```<input name="image" type="file" />``` **

GET '/artworks/:id'
- Retrieve a single artwork by ID

PUT '/artworks/edit/:id'
- Update/edit a single artwork by ID

DELETE '/artworks/:id'
- Delete a single artwork by ID both from the database and its image on amazon S3

