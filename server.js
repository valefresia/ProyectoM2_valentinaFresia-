require("dotenv").config();
const { loadEnvFile } = require('node:process');
const app = require("./src/app");
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  loadEnvFile('.env');
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

