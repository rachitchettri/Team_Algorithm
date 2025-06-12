import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: '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'
});

/**
 * Streams chat responses from GroqCloud.
 * @param {Array} messages - Array of message objects: { role: 'user' | 'assistant', content: string }
 */
export async function streamChat(messages) {
  const response = await groq.chat.completions.create({
    messages,
    model: "llama3-8b-8192",
    stream: true
  });

  return response;
}
