const express = require('express');

const port = 8000;

const app = express();



let task = [
    {
        id: 1,
        task: "breakFast",
        status: "default"
    },
    {
        id: 2,
        task: "Home Work",
        status: "default"
    },
    {
        id: 3,
        task: "Study",
        status: "default"
    },
]
app.use(express.urlencoded());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    return res.render('index', { task })
})

app.get('/editTask', (req, res) => {
    let id = req.query.id;
    let single = task.find(item => item.id == id)
    return res.render('edit', { single });
})

app.post('/editRecord', (req, res) => {
    let update = task.map((val) => {
        if (val.id == req.body.editId) {
            val.task = req.body.task;
            val.status = req.body.status;
        }
        return val;
    })

    task = update;
    return res.redirect('/');

})

app.get('/deleteData',(req,res)=>{
    let deleteId = req.query.deleteId;
    let deleteRecord = task.filter((val)=>{ 
        return val.id != deleteId;
    })
    task = deleteRecord;
    return res.redirect('/');
 })

app.listen(port, (err) => {
    if (err) {
        console.log('server is not running');
        return false
    }
    console.log('server is running');
})