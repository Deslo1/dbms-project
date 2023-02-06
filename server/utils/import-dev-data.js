const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const activeCalls = require('./../models/activeCallsModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const activecalls = JSON.parse(
  fs.readFileSync(`./data.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await activeCalls.create(activecalls);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await activeCalls.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
