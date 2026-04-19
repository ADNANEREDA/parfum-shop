#  ParfumShop - Premium E-Commerce Platform 

**ParfumShop** is a Full-Stack (MERN) e-commerce web application designed for selling luxury perfumes. It offers a premium user experience with an elegant interface (Dark Mode), a dynamic cart system, and secure order and authentication management.

##  Key Features

### 👤 Client Experience (User)
* **Dynamic Catalog:** Browse a curated selection of luxury perfumes.
* **Cart Management (Context API):** Add items, update quantities, and automatically calculate the total price.
* **Wishlist System:** Save your favorite fragrances to your user profile.
* **Secure Checkout:** Order validation with shipping information (Cash on Delivery).
* **Client Portal (Dashboard):** Complete order history with status tracking (In Preparation / Delivered).

### 🛡️ Security & Backend
* **JWT Authentication:** Secure login and registration using JSON Web Tokens.
* **Password Encryption:** Usage of `bcrypt.js` to securely hash and protect user data.
* **Protection Middlewares:** Secured API routes restricting access to logged-in users (`protect`) and administrators (`admin`).

### 👑 Administration Panel (Admin)
* Global overview of all orders placed on the website.
* Order status modification (Mark as "Delivered" / Shipped).
* Complete database management via MongoDB.

---

## 💻 Technologies Used

**Frontend:**
* React.js
* Tailwind CSS (Custom & Responsive Design)
* Axios (REST API Consumption)
* React Router DOM (SPA Navigation)
* React Context API (Global state management for the cart)

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose (Data Modeling)
* JSON Web Token (JWT)
* Bcrypt.js (Password Hashing)
