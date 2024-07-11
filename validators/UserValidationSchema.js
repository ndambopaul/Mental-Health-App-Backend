const { body } = require('express-validator');

const userValidationSchema = [
    body('first_name')
        .notEmpty().withMessage('First name is required')
        .isString().withMessage('First name must be a string'),

    body('last_name')
        .notEmpty().withMessage('Last name is required')
        .isString().withMessage('Last name must be a string'),

    body('username')
        .notEmpty().withMessage('Username is required')
        .isString().withMessage('Username must be a string'),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),

    body('phone_number')
        .notEmpty().withMessage('Phone number is required')
        .isMobilePhone().withMessage('Invalid phone number'),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    body('user_type')
        .notEmpty().withMessage('User type is required')
        .isIn(['Admin', 'Physician', 'Client']).withMessage('Invalid user type'),

    body('dob')
        .optional()
        .isISO8601().withMessage('Invalid date of birth'),

    body('gender')
        .optional()
        .isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),

    body('address')
        .optional()
        .isString().withMessage('Address must be a string'),

    body('bio')
        .optional()
        .isString().withMessage('Bio must be a string'),

    body('profile_picture')
        .optional()
        .isURL().withMessage('Profile picture must be a valid URL'),

    body('account_status')
        .optional()
        .isIn(['Active', 'Disabled', 'Pending Review']).withMessage('Invalid account status')
];

module.exports = userValidationSchema;
