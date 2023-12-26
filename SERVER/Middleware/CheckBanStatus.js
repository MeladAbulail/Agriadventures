const checkBanStatus = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const existingUser = await User.findByPk(userId);
    if (existingUser && existingUser.isBanned) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. User is banned.',
      });
    }
    next();
  } catch (error) {
    console.error('An error occurred while checking ban status:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while checking ban status',
      error: error.message,
    });
  }
};

module.exports = { 
  checkBanStatus
};