const mongoose = require('mongoose');
const moment =  require('moment');

const bookingSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
      },
      time: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      numberOfPlayers: {
        type: Number,
        required: true
      },
      lane: {
        type: [Number],
        required: true,
        enum: [1, 2, 3, 4, 5, 6, 7, 8]
      },
      shoeSizes: {
        type: [Number],
        required: true,
        validate: {
          validator: function (sizes) {
            return sizes.length === this.numberOfPlayers;
          },
          message: 'Number of shoe sizes must match the number of players'
        }
      },
      totalPrice: {
        type: Number,
        required: true
      },
      bookingNumber: {
        type: String,
        required: true,
        unique: true
      },
      orderDate: {
        type: String,
        required: true,
        default: () => {
            moment().format('YYYY-MM-DD HH:mm')
        }
      },
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
})


const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;