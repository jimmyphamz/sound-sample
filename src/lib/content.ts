const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 */
const fetchContent = async () => {
    const responses = await fetch(API_URL);
    const json = await responses.json();
    return json;
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string) => {
    // Define a regular expression to match <s> tags and their content
    const regex = /<s>(.*?)<\/s>/g;

    // Extract sentences using the regular expression
    const sentences = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
        sentences.push(match[1]);
    }
    return sentences;
};

export { fetchContent, parseContentIntoSentences };
