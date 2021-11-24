const Campground = require('../models/campground');
const cities = require('./cities');
const mongoose = require('mongoose');
const {places, descriptors } = require('./seedHelpers');

const dbUrl = process.env.DB_URL ||  "mongodb://localhost:27017/yelp-camp";
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 400; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '619934a7b4f2ddbf61be43d4',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora culpa dolorem quos! Voluptates perspiciatis similique, nisi enim consectetur culpa sint laudantium fuga magnam quidem quas ea obcaecati sed nobis et.',
      price,
      geometry: {
        type: 'Point',
        coordinates: [ 
            cities[random1000].longitude,
            cities[random1000].latitude,
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dk6enleic/image/upload/v1637515784/YelpCamp/slunz4znplgfrkheyhbz.jpg',
          filename: 'YelpCamp/slunz4znplgfrkheyhbz'
        },
        {
          url: 'https://res.cloudinary.com/dk6enleic/image/upload/v1637515785/YelpCamp/bt0gxziz6rj16slcz3wr.jpg',
          filename: 'YelpCamp/bt0gxziz6rj16slcz3wr'
        }
      ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
});