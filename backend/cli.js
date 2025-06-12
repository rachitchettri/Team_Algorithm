import readline from 'readline';
import { streamChat } from './services/chatService.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'You: '
});

const messages = [];

console.log('Start chatting with the assistant (type "exit" to quit):');
rl.prompt();

rl.on('line', async (input) => {
  if (input.toLowerCase() === 'exit') {
    rl.close();
    return;
  }

  if (!input.trim()) {
    rl.prompt();
    return;
  }

  try {
    messages.push({ role: 'user', content: input });

    const stream = await streamChat(messages);
    let assistantReply = '';

    process.stdout.write('AI: ');
    for await (const chunk of stream) {
      const token = chunk.choices[0]?.delta?.content || '';
      process.stdout.write(token);
      assistantReply += token;
    }
    console.log();
    messages.push({ role: 'assistant', content: assistantReply });
  } catch (err) {
    console.error('\nError:', err.message || err);
  }

  rl.prompt();
});
