const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://danielbaron894:sbhtk1992@cluster0.iyns47b.mongodb.net/customerTasks')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting', err));



const customerSchema = mongoose.Schema({
  name: String,
  occupation: String,
  phone: String,
  email: String
  
})

const tasksSchema = mongoose.Schema({
  title: String,
  isDone: Boolean,
  date: Date,
  customerId: String
});

const Task = mongoose.model('Task', tasksSchema);
const Customer = mongoose.model('Customer', customerSchema);

app.post('/api/tasks', (req, res) => {
  const { title, date, customerId } = req.body;

  const newTask = new Task({
    title,
    isDone: false,
    date,
    customerId  
  });

  newTask.save().then((result) => res.send(result));
});


app.get('/api/customer', (req, res) => {
  console.log("Received request to /api/customer");
  Customer.find({}).then((customer) => {
    console.log("Found customers:", customer);
    res.send(customer);
  });
});


app.get('/api/tasks', (req,res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks);
    });
});

app.delete('/api/tasks/:id', (req,res) => {
    const _id = req.params.id;

    Task.deleteOne({_id }).then((result) => {
        res.send(result);
    });
});

app.put('/api/tasks/:id', (req, res) => {
    const _id = req.params.id;
    const { isDone, title } = req.body;
  
    Task.findOneAndUpdate({ _id }, { isDone, title })
      .then((updatedTask) => {
        if (!updatedTask) {
          return res.status(404).send("Task not found");
        }
        res.send(updatedTask);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
        res.status(500).send("Server error");
      });
  });

  
  
  



app.listen(5050, console.log('listening to port 5050'));