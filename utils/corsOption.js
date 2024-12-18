require("dotenv").config();

const corsOption = {
  origin: [process.env.BASE_URL],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

module.exports = corsOption;
