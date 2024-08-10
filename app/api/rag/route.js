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

async function fetchResults(query, docs) {
    // Make a GET request to your embedding endpoint
    const requestBody = {
        query: query,
        docs: docs,
        // Add more key-value pairs as needed
    };
    const response = await fetch(` https://Anushka12.pythonanywhere.com/sim`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)  // Convert the body object to a JSON string
    })
    if (!response.ok) throw new Error("Failed to fetch embeddings");
    const data = await response.json();
    return data.answer;
}

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

        const preparedDocs = docs.map(doc => ({
            embedding: doc.embedding,
            answer: doc.answer
        }));
        const context = await fetchResults(queryEmbedding, preparedDocs);

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
