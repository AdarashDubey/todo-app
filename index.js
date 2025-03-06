const express = require("express")
const PORT = 8005
const app = express()
const path = require("path")


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded())

const tasks = []

app.get("/", (req, res) => {
    res.render("home", {
        "tasks": tasks
    })
})

app.post('/inputdata', (req, res) => {
    const { title, description, date } = req.body;
    if (title && description && date) {
        tasks.push({ title, description, date, status: 'pending' });
    }
    res.redirect('/');
});

app.get('/deletetask', (req, res) => {
    const index = req.query.id;
    tasks.splice(index, 1);
    res.redirect('/');
});
app.get('/movetoprogress', (req, res) => {
    const index = req.query.id;
    if (tasks[index]) {
        tasks[index].status = 'progress';
    }
    res.redirect('/');
});
app.get('/movetocompleted', (req, res) => {
    const index = req.query.id;
    if (tasks[index]) {
        tasks[index].status = 'completed';
    }
    res.redirect('/');
});



app.listen(PORT, (err) => err ? console.log(err) : console.log(`Server runnig on ${PORT}`)) 