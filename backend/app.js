require('dotenv').config();

const express = require('express');
const cors = require("cors");

const app = express();
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN || "*",
//     exposedHeaders: ["Content-Disposition", "X-Compression-Metadata", "X-Download-Filename"],
//   }),
// );
app.use((req, res, next) => {

  console.log("REQUEST:", req.method, req.url);

  next();

});
 

app.use(cors({
   origin: 'http://localhost:5173'
}
));
app.use(express.json());  

const routes = require('./routes');

app.use('/api', routes);



const PORT =
process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
