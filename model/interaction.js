const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
    newsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'News',
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    eventType: {
        type: String,
        enum: ['view', 'click'],
        required: true
    },
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true } /* [longitude, latitude] */
    }
}, {
    collection: 'interaction',
    timestamps: true
});

interactionSchema.index({ location: '2dsphere' });
interactionSchema.index({ userId: 1 });

const Interaction = mongoose.model('interaction', interactionSchema);

module.exports = {
    Interaction
};