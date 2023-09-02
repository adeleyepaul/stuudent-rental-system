export const checkUserRole = (role) => {
    return async (req, res, next) => {
        // get user role
      const userRole = req.user.role;
  
      if (userRole === role) {
        // User has the required role, proceed to the next middleware (or route handler)
        next();
      } else {
        res.status(403).json({ message: "Access denied. You are not a landlord." });
      }
    };
  };
  