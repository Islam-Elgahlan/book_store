// from clone
// commit
const express = require("express");
const cron = require('node-cron');
const app = express();
require("dotenv").config();
const port = process.env.port;
const connection = require("./configuration/configurationDB");

//* start Routes paths *//

const userRoutes = require("./modules/users/routes/user.routes");
const bookRoutes = require("./modules/book/routes/book.routes");
const cartRoutes = require("./modules/cart/routes/cart.routes");
//* end Routes paths *//

app.use(express.json());
connection();
app.use("/uploads" ,express.static("uploads"));
// cron.schedule('*/2 * * * * *', () => {
//     console.log('running a task every two seconds');
//   });
app.use(userRoutes);
app.use(bookRoutes);
app.use(cartRoutes);



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
