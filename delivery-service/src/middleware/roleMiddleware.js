export const deliveryPersonOnly = async (req, res, next) => {
  if (req.user.role !== 'delivery_person') {
    return res.status(403).json({ message: 'Access denied: Delivery persons only' });
  }
  next();
};

export const customerOnly = async (req, res, next) => {
  if (req.user.role !== 'customer') {
    return res.status(403).json({ message: 'Access denied: Customers only' });
  }
  next();
};