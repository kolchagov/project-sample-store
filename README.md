# MyMAG project 
SoftUni React Course Project
MyMAG is a simple online shop. It's build by me as a project assignment for ReactJS course.

## Objectives

The final code must adhere to project requirements and include both public and private application parts.

## Server used

As backend server the decision was made to use softuni-practice-server (non-persistent). If time allows, other cloud solutions can be used.

## 1. Initialize Project
- Initialize git repo
- Add base vite react project as client
- Add softuni practice server
- Converted html to jsx
- Refactored folders to allow softuni server to work
## 2. React Router
- Install react-router-dom
- Setup react-router-dom
- Add routes in App.jsx
- Add links in the navigation
    - Add personalized navigation
## 3. Page implementations
- Home page with products
- Login page with login form
- Logout page
- Add Register page with User form
- Add Edit page with User form
- Add Users table page with edit/delete actions
- Add Category table with add/edit/delete category actions
    - Add category form with validation
- Add error handling to users table page
- Add error handling to category table page
## 4. Service implementations
- User service implementation: user login
    - Register new user
    - Edit user
    - Delete user
- Logout user
- Hard-coded default users into server
    - Migrated users from jsonstore to collections
## 5. Category service implementation:
- Add read categories
- Add category context
    - Migrate categories from jsonstore to collections
- Add create category
- Add delete category
## 6. Product service implementation:
- Add catalog and product table 
    - Move hardcoded products to catalog collection
