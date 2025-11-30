const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: function() {
            return !this.googleId; // Password solo requerido si no es login Google
        },
        minlength: 6
    },
    googleId: {
        type: String,
        sparse: true,
        unique: true
    },
    photo: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'agrupacion', 'integrante', 'espectador'],
        default: 'admin'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving (solo si existe password)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
