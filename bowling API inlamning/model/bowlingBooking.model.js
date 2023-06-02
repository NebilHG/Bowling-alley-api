const { calculateTotalPrice, generateBookingNr } = require('../utils/utils');
const Booking = require('./bowlingBooking.schema');
const moment =  require('moment');


async function createBooking(bookingData){
    try {
        const {date, time, email, numberOfPlayers, lane, shoeSizes} = bookingData;
        const bookingDuration = 59;

        const startTime = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm');
        const endTime = moment(startTime).add(bookingDuration, 'minutes').toDate();

        const alreadyBooked = await Booking.findOne({
          date, 
          lane, 
          $or: [
            { startTime: { $lte: startTime }, endTime: { $gt: startTime } },
            { startTime: { $lt: endTime }, endTime: { $gte: endTime } },
            { startTime: { $gte: startTime }, endTime: { $lte: endTime } },
          ],
          
        });

        if (alreadyBooked){
          throw new Error('Lane already taken');
        }

         const newBooking = await Booking.create({
          date,
          time,
          email,
          numberOfPlayers,
          lane,
          shoeSizes,
          bookingNumber: generateBookingNr(), 
          orderDate: moment().format('YYYY-MM-DD HH:mm'),
          totalPrice: calculateTotalPrice(numberOfPlayers,lane),
          startTime: startTime.toDate(),
          endTime: endTime
        });
        return newBooking;
      } catch (error) {
        console.log(error);
        if (error.message === 'Lane already taken') {
          throw new Error(error.message);
        } else {
          throw new Error('Failed to create booking');
        }
      }
};


async function updateBooking(bookingId, updatedData) {
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return;
    }

    const { date, time, email, numberOfPlayers, lane, shoeSizes } = updatedData;

    booking.date = date;
    booking.time = time;
    booking.email = email;
    booking.numberOfPlayers = numberOfPlayers;
    booking.lane = lane;
    booking.shoeSizes = shoeSizes;
    booking.totalPrice = calculateTotalPrice(numberOfPlayers, lane);

    const updatedBooking = await booking.save();
    return updatedBooking;

  } catch (error) {
    console.log(error);
    throw new Error('Failed to update booking');
    
  }
}


async function findBookingByNumber(bookingNumber) {
  try {
    const booking = await Booking.findOne({ bookingNumber });
  
    return booking;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to retrieve booking');
  }
}



async function deleteBooking(bookingId) {
  
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new Error('Booking not found');
  }
  await booking.deleteOne();
  
}



module.exports = { createBooking, updateBooking, findBookingByNumber,deleteBooking };