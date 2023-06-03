import { connect } from "./db/index.js";
import app from "./app.js";

const port = process.env.PORT || 3002;
app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server listening on ${port}`);
  connect();
});
