import fetch from 'node-fetch';
import { NextResponse } from "next/server";

const endpoint = "https://ap-south-1.aws.data.mongodb-api.com/app/data-arspkyb/endpoint/data/v1/action";
const headers = {
    'Content-Type': 'application/json',
    'api-key': process.env.MONGO_KEY,
};
const payload = JSON.stringify({
    collection: "therapy",
    database: "embeddings",
    dataSource: "hs-rag",
    filter: {}, // Adjust filter as needed
});

async function fetchEmbeddings(query) {
    // Make a GET request to your embedding endpoint
    const response = await fetch(`https://Anushka12.pythonanywhere.com/chatbot?query=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error("Failed to fetch embeddings");
    const data = await response.json();
    return data.answer;
}

// async function fetchResults(query, docs) {
//     // Make a GET request to your embedding endpoint
//     const requestBody = {
//         query: query,
//         docs: docs,
//         // Add more key-value pairs as needed
//     };
//     const response = await fetch(` https://Anushka12.pythonanywhere.com/sim`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(requestBody)  // Convert the body object to a JSON string
//     })
//     if (!response.ok) throw new Error("Failed to fetch embeddings");
//     const data = await response.json();
//     return data.answer;
// }

async function fetchDocuments() {
    const response = await fetch(`${endpoint}/find`, {
        method: 'POST',
        headers: headers,
        body: payload,
    });

    // Check if the request was successful
    if (!response.ok) {
        throw new Error(`Failed to fetch documents: ${response.statusText}`);
    }

    // Parse the response to JSON
    const data = await response.json();

    // Return the documents array from the response
    return data.documents;
}

// Function to calculate cosine similarity
function cosineSimilarity(v1, v2) {
    const dotProduct = v1.reduce((sum, a, idx) => sum + a * v2[idx], 0);
    const normV1 = Math.sqrt(v1.reduce((sum, a) => sum + a * a, 0));
    const normV2 = Math.sqrt(v2.reduce((sum, a) => sum + a * a, 0));
    return dotProduct / (normV1 * normV2);
}

// Handler function for POST requests
export async function POST(req, res) {
    // Parse the request body (assuming JSON format)
    const { question } = await req.json();

    if (!question) {
        return NextResponse.json({ message: "Question is required" }, { status: 400 });
    }

    try {
        // Fetch query embeddings
        const queryEmbedding = await fetchEmbeddings(question);
        // Fetch documents from MongoDB
        const docs = await fetchDocuments();

        // const preparedDocs = docs.map(doc => ({
        //     embedding: doc.embedding,
        //     answer: doc.answer
        // }));
        // const context = await fetchResults(queryEmbedding, preparedDocs);

        // Calculate similarity scores
        const scores = docs.map(doc => ({
            ...doc,
            score: cosineSimilarity(queryEmbedding, doc.embedding)
        }));

        // Sort documents by similarity score in descending order
        scores.sort((a, b) => b.score - a.score);

        // Get the top 5 results
        const topResults = scores.slice(0, 5);

        // Combine the answers from the top results
        const context = topResults.map(result => result.answer).join("\n---\n");

        const prompt = `Here are 5 answers you can refer to & answer similarly, if relevant: 
        "${context}". 
        Here is the user question:
        "${question}"`;
        console.log(prompt);
        return NextResponse.json({ prompt }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "An error occurred" }, { status: 500 });
    }
}
