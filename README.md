![Screenshot 2025-02-04 041926](https://github.com/user-attachments/assets/de38ed61-1e72-45b7-95b8-06e98e86071f)



# **PawPal - A Pet Donation and Adoption Platform** 🐾

## **Introduction**
PawPal is a platform designed to connect pet lovers, donors, and adopters. It allows users to create and manage pet donation campaigns while also providing a streamlined process for adopting pets. The goal is to help pets in need find loving homes and secure financial support for their care.

## **Live Demo**
🔗 [Live Demo](https://pawpal-364b2.web.app)

---

## **Table of Contents**
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Troubleshooting](#troubleshooting)
- [Contribution Guidelines](#contribution-guidelines)
- [Author & Acknowledgments](#author--acknowledgments)

---

## **Key Features**
### 🏆 **Donation Features**
- **Campaign Management**: Create, edit, pause, and delete donation campaigns.
- **Secure Donation System**: Integrated with Stripe for secure payments.
- **Real-time Donation Tracking**: Users can monitor donation progress.
- **Donor Management**: View donation history and request refunds.

### 🏠 **Pet Adoption Features**
- **Pet Listings**: Users can list and view pets available for adoption.
- **Adoption Requests**: Users can submit requests, and admins can approve or reject them.
- **Real-time Adoption Status**: Pets' status updates dynamically (e.g., "Adopted" or "Available").

### 🎨 **User-Friendly Design**
- Fully responsive for desktop,tablet and mobile devices.

---

## **Technologies Used**
### **Frontend**
- React, Tailwind CSS
- State Management: TanStack Query

### **Backend**
- Node.js, Express.js

### **Database**
- MongoDB

### **Authentication**
- Firebase, JWT

### **Payment Integration**
- Stripe

---

## **Installation**
### Prerequisites
- Node.js installed (`v16+` recommended)
- MongoDB instance (local or cloud-based)
- Firebase configuration

### Steps
1. **Clone the repository**:
   ```sh
   git clone https://github.com/DilligentArch/PawPal-Client-Side.git
   cd pawpal
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory.
   - Add the required variables:
     ```
     MONGO_URI=your_mongodb_connection_string
     FIREBASE_API_KEY=your_firebase_api_key
     STRIPE_SECRET_KEY=your_stripe_secret_key
     JWT_SECRET=your_jwt_secret
     ```

4. **Run the development server**:
   ```sh
   npm run dev
   ```

---

## **Usage**
- **Start the frontend**:
  ```sh
  npm run dev
  ```
- **Run the backend** (if separate):
  ```sh
  node server.js
  ```
- Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## **Configuration**
- Firebase Authentication setup required.
- Stripe API keys must be configured in the `.env` file.
- MongoDB should be connected and seeded with initial data if necessary.

---

## **Dependencies**
### **Frontend**
- `react`, `react-router-dom`
- `@stripe/react-stripe-js`, `@stripe/stripe-js`
- `axios`, `sweetalert2`
- `react-icons`, `react-loading-skeleton`
- `react-intersection-observer`
- `@tanstack/react-query`, `@tanstack/react-table`
- `formik`, `react-hook-form`, `react-hot-toast`

### **Backend**
- `express`, `cors`, `dotenv`
- `mongodb`, `jsonwebtoken`, `stripe`

### **Dev Dependencies**
- `eslint`, `eslint-plugin-react`
- `tailwindcss`, `vite`

---

## **Troubleshooting**
### 🔹 Common Issues & Solutions
1. **Server Not Starting?**
   - Ensure MongoDB is running.
   - Check `.env` file configuration.

2. **Payment Errors?**
   - Verify Stripe API keys.

3. **Authentication Failing?**
   - Ensure Firebase credentials are correct.

---

## **Contribution Guidelines**
We welcome contributions! Follow these steps to contribute:
1. **Fork the repository**.
2. **Create a new branch** (`feature-new-feature`).
3. **Make changes and commit** (`git commit -m "Added new feature"`).
4. **Push to GitHub** and open a Pull Request.

---



## **Author & Acknowledgments**
👨‍💻 Developed by [Nayeb Ahmed Qureshi](https://github.com/DilligentArch).  


---

### 🚀 **Happy Coding & Helping Pets!** 🐶🐱
