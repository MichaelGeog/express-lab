// imports
import express from "express";
import morgan from "morgan";

// setup
const app = express();
const PORT = 3000;

//  Build Template engine definition
app.set("view engine", "ejs");

// Middleware
app.use((req, res, next) => {
  const started = Date.now();
  res.locals.requestTime = new Date().toISOString(); // usable in any view
  res.on("finish", () => {
    const ms = Date.now() - started;
    console.log(
      `[${res.locals.requestTime}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`
    );
  });
  next();
});

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: false }));

// Route-level validator for required fields
const requireFields = (fields) => (req, res, next) => {
  for (const f of fields) {
    if (!req.body?.[f]) {
      const err = new Error(`Missing required field: ${f}`);
      err.status = 400;
      return next(err);
    }
  }
  next();
};

// Routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    heading: "Welcome",
    currentView: "home",
  });
});

app.get("/profile", (req, res) => {
  res.render("profile", {
    title: "Profile",
    heading: "Your Profile",
    currentView: "profile",
  });
});

app.post("/feedback", requireFields(["name", "message"]), (req, res) => {
  console.log("Received feedback:", req.body);
  res.render("success", {
    title: "Thanks!",
    heading: "Form submitted",
    data: req.body,
    currentView: "home",
  });
});

app.get("/hello/:name", (req, res) => {
  const { name } = req.params;
  const mood = req.query.mood ?? "curious"; // query string is optional
  res.render("hello", {
    title: `Hello, ${name}`,
    heading: "Dynamic Hello",
    name,
    mood,
    currentView: "hello",
  });
});

// 404 Not Found (must be after routes, before error handler)
app.use((req, res) => {
  res.status(404).render("404", {
    title: "Not Found",
    heading: "404 — Page Not Found",
    url: req.originalUrl,
    currentView: "", // nothing highlighted in nav
  });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(err.status || 500).render("error", {
    title: "Error",
    heading: "Something went wrong",
    message: err.message || "Please try again later.",
    requestTime: res.locals.requestTime,
  });
});

// Server Listener
app.listen(PORT, () => {
  console.log(`Server Running on Port: ${PORT}`);
});
