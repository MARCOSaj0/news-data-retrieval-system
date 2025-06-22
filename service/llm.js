const axios = require('axios');
const { GROQ_API_URL, GROQ_API_KEY } = require('../config/index');

const getEntityAndIntent = async (query) => {
    try {
        const prompt = buildPrompt(query);
        const response = await axios.post(GROQ_API_URL, {
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: prompt }]
        }, {
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        let content = response.data.choices[0].message.content;
        content = JSON.parse(content);

        return content;
    } catch (err) {
        console.error("Error at getEntityAndIntent", err);
        return {};
    }
};

function buildPrompt(userQuery) {
    return `
        You are an AI that extracts structured information from user queries.

        Your task is to:
        - Extract named entities (e.g., people, organizations, locations, events)
        - Identify the user's intent (e.g., "category", "source", "nearby", "event", "location")

        ⚠️ Output only a valid JSON object with the following format:
        {
        "entity": ["entity1", "entity2"],
        "intent": ["intent1", "intent2"]
        }

        ✅ Only include the entity names as strings (no type objects or metadata).
        ✅ Use double quotes for all strings.
        ✅ Do not add any explanation or extra text.

        Examples:

        Query: "Top technology news from the New York Times"
        Response:
        {
            "entity": ["New York Times"],
            "intent": ["category", "source"]
        }

        Query: "Latest developments in the Elon Musk Twier acquisition near Palo Alto"
        Response:
        {
            "entity": ["Elon Musk", "Twier", "Palo Alto"],
            "intent": ["nearby"]
        }

        Now analyze this query:
        "${userQuery}"
        Response:
    `;
};

const getLlmSummery = async (text) => {
    try {
        const res = await axios.post(GROQ_API_URL, {
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: `Generate llm summery of the following article in 1-2 sentences. Respond with only the summary, no introduction, no conclusion, and no extra text:\n\n${text}` }]
        }, {
            headers: { Authorization: `Bearer ${GROQ_API_KEY}` }
        });

        const content = res.data.choices[0].message.content || '';
        return content.trim();
    } catch (err) {
        console.error("Error at getLlmSummery", err);
        return '';
    }
};

module.exports = {
    getEntityAndIntent,
    getLlmSummery
};