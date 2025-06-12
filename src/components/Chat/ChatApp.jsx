import { useState, useRef, useEffect } from 'react';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    const res = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: updatedMessages }),
    });

    if (!res.body) {
      console.error('No response stream');
      setIsLoading(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
    let assistantReply = '';

    const read = async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        assistantReply += chunk;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].content += chunk;
          return updated;
        });
      }
      setIsLoading(false);
    };

    read();
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 h-[90vh] flex flex-col border rounded-lg shadow bg-white">

      <h1 className="text-2xl font-bold mb-4 text-center">AI Chat</h1>
      <div className="flex-1 overflow-y-auto px-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow
                ${msg.role === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left text-sm text-gray-500">Assistant is typing...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-full px-4 py-2 shadow-sm focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatApp;
