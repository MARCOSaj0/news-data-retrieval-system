const { News } = require('../model/news');
const { Interaction } = require('../model/interaction');
const httpConst = require('../config/httpConst');
const { commonErrMsg } = require('../config/commonConst');
const { ReS } = require('../service/util');
const mongoose = require('mongoose');
const { getLlmSummery, getEntityAndIntent } = require('../service/llm');

const newsByCategory = async (req, res) => {
    try {
        let { page, limit, category } = req.query;
        if (!category) {
            return ReS(res, httpConst.BadRequest, "'category' query parameter is required.");
        }

        page = Number(page) || 1;
        limit = Number(limit);
        limit = limit > 0 && limit <= 10 ? limit : httpConst.perPageLimit;
        const skip = (page - 1) * limit;

        const query = { category };
        const [result, count] = await Promise.all([
            News.find(query, {
                title: 1,
                description: 1,
                url: 1,
                publication_date: 1,
                source_name: 1,
                category: 1,
                relevance_score: 1,
                latitude: 1,
                longitude: 1,
                llm_summary: 1
            }).sort({
                publication_date: -1
            }).skip(skip).limit(limit),
            News.countDocuments(query)
        ]);
        const resToSend = {
            docs: result,
            page: page,
            totalDocs: count
        };
        return ReS(res, httpConst.Ok, "News feched successfully.", resToSend);
    } catch (err) {
        console.error("Error at newsByCategory", err);
        return ReS(res, httpConst.InternalServerError, commonErrMsg);
    }
};

const newsByScore = async (req, res) => {
    try {
        let { page, limit, score } = req.query;
        score = parseFloat(score);
        if (isNaN(score) || score < 0) {
            return ReS(res, httpConst.BadRequest, "'score' query parameter is required.");
        }

        page = Number(page) || 1;
        limit = Number(limit);
        limit = limit > 0 && limit <= 10 ? limit : httpConst.perPageLimit;
        const skip = (page - 1) * limit;

        const query = {
            relevance_score: {
                $gt: score
            }
        };
        const [result, count] = await Promise.all([
            News.find(query, {
                title: 1,
                description: 1,
                url: 1,
                publication_date: 1,
                source_name: 1,
                category: 1,
                relevance_score: 1,
                latitude: 1,
                longitude: 1,
                llm_summary: 1
            }).sort({
                publication_date: -1
            }).skip(skip).limit(limit),
            News.countDocuments(query)
        ]);
        const resToSend = {
            docs: result,
            page: page,
            totalDocs: count
        };
        return ReS(res, httpConst.Ok, "News feched successfully.", resToSend);
    } catch (err) {
        console.error("Error at newsByScore", err);
        return ReS(res, httpConst.InternalServerError, commonErrMsg);
    }
};

const newsBySearch = async (req, res) => {
    try {
        let { page, limit, search } = req.query;
        if (!search) {
            return ReS(res, httpConst.BadRequest, "'search' query parameter is required.");
        }

        page = Number(page) || 1;
        limit = Number(limit);
        limit = limit > 0 && limit <= 10 ? limit : httpConst.perPageLimit;
        const skip = (page - 1) * limit;

        const query = {
            $or: [
                { title: new RegExp(search, 'i') },
                { description: new RegExp(search, 'i') }
            ]
        };
        const [result, count] = await Promise.all([
            News.find(query, {
                title: 1,
                description: 1,
                url: 1,
                publication_date: 1,
                source_name: 1,
                category: 1,
                relevance_score: 1,
                latitude: 1,
                longitude: 1,
                llm_summary: 1
            }).sort({
                publication_date: -1
            }).skip(skip).limit(limit),
            News.countDocuments(query)
        ]);
        const resToSend = {
            docs: result,
            page: page,
            totalDocs: count
        };
        return ReS(res, httpConst.Ok, "News feched successfully.", resToSend);
    } catch (err) {
        console.error("Error at newsBySearch", err);
        return ReS(res, httpConst.InternalServerError, commonErrMsg);
    }
};

const newsBySource = async (req, res) => {
    try {
        let { page, limit, source } = req.query;
        if (!source) {
            return ReS(res, httpConst.BadRequest, "'source' query parameter is required.");
        }

        page = Number(page) || 1;
        limit = Number(limit);
        limit = limit > 0 && limit <= 10 ? limit : httpConst.perPageLimit;
        const skip = (page - 1) * limit;

        const query = {
            source_name: source
        };
        const [result, count] = await Promise.all([
            News.find(query, {
                title: 1,
                description: 1,
                url: 1,
                publication_date: 1,
                source_name: 1,
                category: 1,
                relevance_score: 1,
                latitude: 1,
                longitude: 1,
                llm_summary: 1
            }).sort({
                publication_date: -1
            }).skip(skip).limit(limit),
            News.countDocuments(query)
        ]);
        const resToSend = {
            docs: result,
            page: page,
            totalDocs: count
        };
        return ReS(res, httpConst.Ok, "News feched successfully.", resToSend);
    } catch (err) {
        console.error("Error at newsBySource", err);
        return ReS(res, httpConst.InternalServerError, commonErrMsg);
    }
};

const newsByNearby = async (req, res) => {
    try {
        let { page, limit, lat, lon, radius } = req.query;
        lat = parseFloat(lat);
        lon = parseFloat(lon);
        radius = Number(radius);
        if (isNaN(lat) || isNaN(lon)) {
            return ReS(res, httpConst.BadRequest, "'lat' and 'lon' must be valid numbers.");
        }

        if (isNaN(radius) || radius <= 0) {
            return ReS(res, httpConst.BadRequest, "'radius' must be a number greater than 0.");
        }

        page = Number(page) || 1;
        limit = Number(limit);
        limit = limit > 0 && limit <= 10 ? limit : httpConst.perPageLimit;
        const skip = (page - 1) * limit;

        const query = {
            location: {
                $geoWithin: {
                    $centerSphere: [[lon, lat], radius / 6371]
                }
            }
        };
        const [result, count] = await Promise.all([
            News.find(query, {
                title: 1,
                description: 1,
                url: 1,
                publication_date: 1,
                source_name: 1,
                category: 1,
                relevance_score: 1,
                latitude: 1,
                longitude: 1,
                llm_summary: 1
            }).sort({
                publication_date: -1
            }).skip(skip).limit(limit),
            News.countDocuments(query)
        ]);
        const resToSend = {
            docs: result,
            page: page,
            totalDocs: count
        };
        return ReS(res, httpConst.Ok, "News feched successfully.", resToSend);
    } catch (err) {
        console.error("Error at newsByNearby", err);
        return ReS(res, httpConst.InternalServerError, commonErrMsg);
    }
};

const trendingNews = async (req, res) => {
    try {
        let { page, limit, lat, lon, userId } = req.query;
        lat = parseFloat(lat);
        lon = parseFloat(lon);
        radius = 50;
        if (isNaN(lat) || isNaN(lon)) {
            return ReS(res, httpConst.BadRequest, "'lat' and 'lon' must be valid numbers.");
        }

        page = Number(page) || 1;
        limit = Number(limit);
        limit = limit > 0 && limit <= 10 ? limit : httpConst.perPageLimit;
        const skip = (page - 1) * limit;

        const interactionQuery = {
            location: {
                $geoWithin: {
                    $centerSphere: [[lon, lat], radius / 6371]
                }
            },
            createdAt: {
                $gte: new Date(new Date().setDate(new Date().getDate() - 3))
            }
        };
        if (userId) {
            interactionQuery.userId = userId;
        }
        const interactions = await Interaction.find(interactionQuery).distinct('newsId');

        const query = {
            _id: {
                $in: interactions
            }
        };
        const [result, count] = await Promise.all([
            News.find(query, {
                title: 1,
                description: 1,
                url: 1,
                publication_date: 1,
                source_name: 1,
                category: 1,
                relevance_score: 1,
                latitude: 1,
                longitude: 1,
                llm_summary: 1
            }).sort({
                publication_date: -1
            }).skip(skip).limit(limit),
            News.countDocuments(query)
        ]);
        const resToSend = {
            docs: result,
            page: page,
            totalDocs: count
        };
        return ReS(res, httpConst.Ok, "News feched successfully.", resToSend);
    } catch (err) {
        console.error("Error at trendingNews", err);
        return ReS(res, httpConst.InternalServerError, commonErrMsg);
    }
};

const generateLlmSummeryByNewsId = async (req, res) => {
    try {
        const { id } = req.query;
        if (!mongoose.isObjectIdOrHexString(id)) {
            return ReS(res, httpConst.BadRequest, "'news id' must be valid format.");
        }
        const news = await News.findById(id, {
            title: 1,
            description: 1,
            url: 1,
            publication_date: 1,
            source_name: 1,
            category: 1,
            relevance_score: 1,
            latitude: 1,
            longitude: 1,
            llm_summary: 1
        }).lean();
        const llmSummery = await getLlmSummery(news.description);
        const entities = await getEntityAndIntent(llmSummery);
        news.llm_summary = llmSummery;
        news.entity = entities.entity;
        news.intent = entities.intent;

        return ReS(res, httpConst.Ok, "Summery generated successfully.", news);
    } catch (err) {
        console.error("Error at trendingNews", err);
        return ReS(res, httpConst.InternalServerError, commonErrMsg);
    }
};

module.exports = {
    newsByCategory,
    newsByScore,
    newsBySearch,
    newsBySource,
    newsByNearby,
    trendingNews,
    generateLlmSummeryByNewsId
};