const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = {
    validatePostInput(data) {
        let errors = {};

        data.content = !isEmpty(data.content) ? data.content : '';

        if (!Validator.isLength(data.content, { min: 10, max: 300 })) {
            errors.content = 'Post must be between 10 and 300 characters';
        }

        if (Validator.isEmpty(data.content)) {
            errors.content = 'Text field is required';
        }

        return {
            errors,
            isValid: isEmpty(errors)
        };
    }
};