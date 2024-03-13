import bcrypt from 'bcryptjs';

export const hashing = (password, req, next) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return console.log('Error generating salt:', err);
        }

        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                return console.log('Error hashing password:', err);
            }
            req.hashPassword = hash;
            next();
        });
    });
};
