<div align="center">
  <h1>🎉 Eventify</h1>
  <p>A modern, full-stack event booking application built with Next.js 15, NextAuth, and MySQL.</p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
  [![NextAuth](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://next-auth.js.org/)
</div>

---

## 📖 About

**Eventify** is a comprehensive platform designed to seamlessly browse, book, and manage events. With a highly responsive UI powered by Tailwind CSS and Framer Motion, it offers users an intuitive booking experience. Secure authentication is handled via NextAuth (supporting Credentials and GitHub OAuth), and data is persistently managed using MySQL.

---

## 📸 Screenshots


### 🏠 Home Page
![Home Page Screenshot](./public/screenshots/home-page.png)
*A welcoming landing page featuring animated text and quick navigation to upcoming events.*

### 🔐 Login Page
![Login Page Screenshot](./public/screenshots/login-page.png)
*Secure authentication supporting Email/Password and GitHub OAuth.*

### 📅 Events Page
![Events Page Screenshot](./public/screenshots/events-page.png)
*Browse and filter through a dynamic list of available events.*

### 🎫 Event Details Page
![Event Details Page Screenshot](./public/screenshots/event-details.png)
*In-depth view of a specific event, including date, location, description, and booking options.*

### 👤 User Dashboard
![User Dashboard Screenshot](./public/screenshots/user-dashboard.png)
*A personalized user space managing past and current event bookings.*

---

## ✨ Key Features

- **Modern Tech Stack**: Built on React 19 and Next.js 15 (App Router) for blazing-fast server-side rendering and client interaction.
- **Robust Authentication**: Secure login flows with **NextAuth.js**, supporting both Credentials and GitHub OAuth.
- **Relational Database**: Persistent, structured data storage using **MySQL** (via `mysql2`).
- **Event Management**: Create, view, and book events with ease.
- **Beautiful UI/UX**: Fully responsive, mobile-first design leveraging **Tailwind CSS**. Enhanced with advanced animations using **Framer Motion**.
- **Dynamic Interactions**: Includes interactive text animations utilizing `react-simple-typewriter` and `typewriter-effect`.

---

## 🛠 Tech Stack

- **Frontend**: Next.js (App Router), React 19, Tailwind CSS, Framer Motion, Lucide React, React Icons
- **Backend**: Next.js API Routes (Serverless)
- **Database**: MySQL (`mysql2`)
- **Authentication**: NextAuth.js, bcrypt, jsonwebtoken

---

## 🚀 Quick Start

Follow these steps to set up the project locally on your machine.

### Prerequisites

- **Node.js**: `v18+`
- **MySQL**: Installed and running locally
- **Package Manager**: npm, yarn, or pnpm

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd eventify-next
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
# Database Configuration
SQL_PASSWORD=your_mysql_root_password
DATABASE_URL="mysql://root:your_password%40host@localhost:3306/eventify_db"

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret_here

# GitHub OAuth
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
```

> **Note**: If your database password contains special characters like `@`, URL-encode them (e.g., `@` → `%40`). You can generate a strong `NEXTAUTH_SECRET` by running: `openssl rand -base64 32`

### 4. Database Setup

Ensure your local MySQL server is running, then create the database:

```bash
mysql -u root -p -e "CREATE DATABASE eventify_db;"
```

### 5. Start the Development Server

```bash
npm run dev
```

Your app will be running at [http://localhost:3000](http://localhost:3000).

---

## 👨‍💻 Developed By

Built with ❤️. Feel free to reach out if you need help with any of the planned features or further improvements!
