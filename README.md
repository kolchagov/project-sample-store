# MyMAG project 
SoftUni React Course Project
MyMAG is a simple online shop. It's build by me as a project assignment for ReactJS course.

## Objectives

The final code must adhere to project requirements and include both public and private application parts.

## Server used

As backend server the decision was made to use softuni-practice-server (non-persistent). If time allows, other cloud solutions can be used.

## Project Structure
The project is splitted into 2 parts: client and server. Each part has its own folder. Server has preseeded data to allow normal client operation

## How to start the project
### Client
Change directory to client and install dependencies, then run it:
```
cd client
npm install
npm run dev
```
### Server
Change directory to server, then run it with node.js:
```
cd server
node server.js
```

## How to use MyMAG store:
The store has public, private and admin parts. There are some predefined users:
- admin: admin@abv.bg, password: admin
- normal user: peter@abv.bg password: 123456
- normal user: george@abv.bg password: 123456

### Public part contains
- Home page with products: you can browse the products, hover over them and see details. Clicking button Add to card adds the selected product to the cart
- About page
- Login page with login form 
- Registration is publicly available via Login form's Register button
- Registration form is controlled and has validation and rules checking: 
    - username has length between 3 and 15 chars
    - password has length between 5 and 15 chars
    - address is required and has minimum length of 8 chars
    - state is required and selectable from predefined list
    - city and zip are required

Failing to meet any of the above requirements will result in an error message with detailed description. Validation is performed on blur and on submit.
    
- Shopping cart page, which is visible by guest user, but requires login or registration to checkout

### Private part additional functionality
- User profile page, where you can see your profile details and edit them. There is some limitations from the practice server:
> - users can't change their email or username
> - users can't change their password
- Logout page
- Shopping cart page with checkout button

### Admin part additional functionality
- Users page with RUD functionality
- Categories page with CRUD functionality
> 'No category' is fall-back category for all products. It's hard-coded and non-removable

- Catalog page with CRUD functionality
> Product form accepts image URLs from Internet
    
# Development stages
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
    - Add product card
    - Add product details modal
- Login page with login form
- Logout page
- Add Register page with User form
- Add Edit page with User form
- Add Users table page with edit/delete actions
- Add Category table with add/edit/delete category actions
    - Add category form with validation
- Add error handling to users table page
- Add error handling to category table page
- Add catalog page for admin with product table
    - Add product form
    - Add edit product
    - Add create product
        - Add category selector component
- Add shopping cart page
    - Add shopping cart context and provider component
    - Add checkout page with order processing simulation
- Add 404 - not found page 
## 4. Service implementations
- User service implementation: user login
    - Register new user
    - Edit user
    - Delete user
- Logout user
- Hard-coded default users into server
    - Migrated users from jsonstore to collections
    - Fix account handling after migration
## 5. Category service implementation:
- Add read categories
- Add category context
    - Migrate categories from jsonstore to collections
- Add create category
- Add delete category
## 6. Product service implementation:
- Add catalog and product table 
    - Move hardcoded products to catalog collection
- Add get product by id
- Add update product
- Moved price formatter into Product service
- Add delete product
## 7. Add route guards
- Add admin guard
- Add private guard
- Add logged user guard around login and register routes
## 8. Implement shopping cart custom hook
- Add item into cart
- Calculate item amount
- Calculate cart total price
- Implement account state checking before checkout
    - Implement quantity change in the cart
## 9. Implement category filter
- Add custom hook for filtering products by category
- Add route with parameters
- Add handler for category change