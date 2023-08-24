const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const mongoose = require('mongoose');
const Item = require('./models/item'); 
const path = require('path');
const item = require('./models/item');


const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors()); 
app.use(express.json());




mongoose.connect("mongodb://127.0.0.1:27017/test_technique", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((error) => {
  console.log('MongoDB connection error', error);
});


app.post('/items', async (req, res) => {
    try {
      const newItem = await item.create(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create item' });
    }
  });

  app.get('/items', async (req, res) => {
    try {
      const items = await item.find();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve items' });
    }
  });

  app.delete('/items/:id', async (req, res) => {
    const itemId = req.params.id;
    try {
      const deletedItem = await Item.findByIdAndDelete(itemId);
      if (deletedItem) {
        res.status(200).json({ message: 'Item deleted successfully' });
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete item' });
    }
  });





const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
