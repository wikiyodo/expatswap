const { z } = require("zod");

const isDateOfBirthValid = (value) => {
  // Split the date string into parts (month, day, year)
  const [year, month, day] = value.split("-");
  // Create a Date object with the provided year, month (0-based), and day
  const dob = new Date(year, month - 1, day);
  // Calculate the date two years ago
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
  // Return true if the date of birth is at least two years earlier than the current date
  return dob <= twoYearsAgo;
};

const userSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  phoneNumber: z.string().min(10).max(15),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one digit" })
    .regex(/[^a-zA-Z0-9\s]/, {
      message: "Password must contain at least one symbol",
    }),
  dateOfBirth: z.string().refine(isDateOfBirthValid, {
    message:
      "Date of birth must be at least 2 years earlier than the current date",
  }),
});

const validateUserSchema = (req, res, next) => {
  try {
    // Validate request body against user schema
    userSchema.parse(req.body);
    // If validation passes, proceed to next middleware or route handler
    next();
  } catch (error) {
    // If validation fails, send a 400 Bad Request response with validation errors

    const formattedErrors = {};

    error.errors.forEach((err) => {
      const fieldName = err.path.join(".");
      formattedErrors[fieldName] = err.message;
    });

    res.status(400).json({ error: formattedErrors });
  }
};

module.exports = validateUserSchema;
