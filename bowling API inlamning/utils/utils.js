function generateBookingNr() {
    let letters = ['X','Y','Z' ];
    return `AB${Date.now()}${letters[Math.floor(Math.random()*letters.length)]}`;
}


function calculateTotalPrice(numberOfPlayers, lanes) {
    const pricePerPerson = 120;
    const laneCost = 100;
  
    const totalLaneCost = laneCost * lanes.length;
    const totalPersonCost = pricePerPerson * numberOfPlayers;
  
    const totalPrice = totalPersonCost + totalLaneCost;
  
    return totalPrice;
  }
  



module.exports = { generateBookingNr, calculateTotalPrice }