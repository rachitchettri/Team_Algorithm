import readline from 'readline';
import { streamChat } from './services/chatService.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'You: '
});

const messages = [];

const ask = () => {
  rl.prompt();
  rl.on('line', async (input) => {
    if (input.toLowerCase() === 'exit') {
      rl.close();
      return;
    }

    messages.push({ role: 'user', content: input });

    const stream = await streamChat(messages);
    let assistantReply = '';

    process.stdout.write('AI: ');
    for await (const chunk of stream) {
      const token = chunk.choices[0]?.delta?.content || '';
      process.stdout.write(token);
      assistantReply += token;
    }
    console.log(); // new line after response
    messages.push({ role: 'assistant', content: assistantReply });

    rl.prompt();
  });
};

console.log('Start chatting with the assistant (type "exit" to quit):');
ask();
