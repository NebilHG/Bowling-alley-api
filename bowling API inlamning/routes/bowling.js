const {Router} = require('express');
const router = new Router();
const {createBooking, updateBooking , findBookingByNumber, deleteBooking} = require('../model/bowlingBooking.model')

router.post('/booking', async (req, res)=>{
    try {
        const bookingData = req.body; 
    
        const newBooking = await createBooking(bookingData);
    
        res.status(201).json(newBooking);
      } catch (error) {
        console.error(error);
        if (error.message === 'Lane already taken') {
          res.status(400).json({ error: 'The selected lane is already booked for the specified time.' });
        } else {
          res.status(500).json({ error: 'Failed to create booking' });
        }
      }

});




router.put('/booking/:id', async (req, res) => {
  try {
    const bookingId = req.params.id;
    const bookingData = req.body;
    const updatedBooking = await updateBooking(bookingId, bookingData);

    if (!updatedBooking) {
      res.status(404).json({ error: 'Booking not found' });
    }else {
    res.json(updatedBooking);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});





router.get('/booking/:bookingNumber', async (req, res) => {
  try {
    const bookingNumber = req.params.bookingNumber;
    const booking = await findBookingByNumber(bookingNumber);
  
    if (!booking) {
      res.status(404).json({ error: 'Booking not found' });
    } else{
      res.json(booking);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve booking' });
    
  }
});




router.delete('/booking/:id', async (req, res) => {
  try {
    const bookingId = req.params.id;
    await deleteBooking(bookingId);
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error(error);
    if (error.message === 'Booking not found') {
      res.status(404).json({ error: 'Booking not found' });
    } else {
      res.status(500).json({ error: 'Failed to delete booking' });
    }
  }
});



module.exports = router