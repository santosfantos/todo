const express    = require("express");
const bodyParser = require("body-parser");
const path       = require("path");

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

require("./routes/todo.routes.js")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
