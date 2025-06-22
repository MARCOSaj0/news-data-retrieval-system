const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    url: String,
    publication_date: Date,
    source_name: String,
    category: [String],
    relevance_score: Number,
    latitude: Number,
    longitude: Number,
    location: {
        type: { type: String, enum: ['Point'], required: true, default: 'Point' },
        coordinates: { type: [Number], required: true } /* [longitude, latitude] */
    },
    llm_summary: String
}, {
    collection: 'news',
    timestamps: true
});

newsSchema.index({ category: 1, publication_date: -1 });
newsSchema.index({ relevance_score: 1, publication_date: -1 });
newsSchema.index({ title: 1, description: 1, publication_date: -1 });
newsSchema.index({ source_name: 1, publication_date: -1 });
newsSchema.index({ location: '2dsphere', publication_date: -1 });

const News = mongoose.model('news', newsSchema);

module.exports = {
    News
};