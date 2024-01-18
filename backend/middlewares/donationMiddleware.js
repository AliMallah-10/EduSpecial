// middleware/donationMiddleware.js
const validateDonation = (req, res, next) => {
  const { username, amount, programOrEventName, eventDate } = req.body;

  // Check if required fields are provided
  if (!username || !amount || !programOrEventName || !eventDate) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Validate eventDate to be a valid date in the future
  const currentDate = new Date();
  const inputDate = new Date(eventDate);

  if (isNaN(inputDate) || inputDate <= currentDate) {
    return res.status(400).json({ error: 'Donation date must be a valid date in the future' });
  }

  // Validate amount
  if (amount < 0) {
    return res.status(400).json({ error: 'Amount must be a non-negative number' });
  }

  // If all validations pass, move on to the next middleware or controller
  next();
};

module.exports = {
  validateDonation,
};
