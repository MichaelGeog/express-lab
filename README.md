# Express Lab – Views, Routes, and Middleware

A minimal Express.js app demonstrating routes, templates, forms, route parameters, and middleware. Built with **EJS** templates and both **custom** and **third-party** middleware.

---

## ✨ Features (Lab Requirements)

- **View engine**: EJS configured (`app.set('view engine', 'ejs')`)
- **Multiple views**: `index.ejs`, `profile.ejs`, `hello.ejs`, `success.ejs`, `404.ejs`, plus `partials/_nav.ejs`
- **Navigation** between views (simple anchor links)
- **POST form** on Home → logs request body and renders a success view
- **Route parameter** via `/hello/:name` (and optional `?mood=` query)
- **Middleware**:
  - Custom: request timestamp + duration logger (also exposes `res.locals.requestTime` to views)
  - Route-level validator (`requireFields`) for the POST route
  - Third-party: `morgan('dev')` HTTP logger
- **404** catch-all and **global error handler** (renders `error.ejs`)

---

## 🧱 Tech Stack

- Node.js + Express
- EJS (server-side templates)
- Morgan (HTTP logging)
- Nodemon (dev)
