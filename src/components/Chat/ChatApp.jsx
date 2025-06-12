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
    if (!input.trim() || isLoading) return;
  
    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
  
    try {
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
      let buffer = '';
  
      // Add assistant message with empty content
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
  
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
  
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();
  
        for (const line of lines) {
          if (!line.trim().startsWith('data:')) continue;
  
          const data = line.replace(/^data:\s*/, '');
          if (data === '[DONE]') {
            setIsLoading(false);
            return;
          }
  
          // Clean repeated words like "hellohello" -> "hello"
          const cleaned = data.replace(/\b(\w+)\1\b/g, '$1');
  
          setMessages((prev) => {
            const updated = [...prev];
            const lastMsg = updated[updated.length - 1];
            if (!lastMsg) return updated;
  
            const lastContent = lastMsg.content;
            // Add a space if last content does not end with space and new chunk doesn't start with space or newline
            const needsSpace =
              lastContent &&
              !lastContent.endsWith(' ') &&
              !cleaned.startsWith(' ') &&
              !cleaned.startsWith('\n');
  
            lastMsg.content += (needsSpace ? ' ' : '') + cleaned;
            return updated;
          });
        }
      }
  
      setIsLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
      setIsLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col h-[500px] w-full bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl overflow-hidden animate-fade-in">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-3 text-lg font-semibold">
        AI Assistant
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow-md ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left text-sm text-gray-500 animate-pulse">
            Assistant is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center p-3 border-t bg-white"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          aria-label="Type your message"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          disabled={isLoading}
          aria-label="Send message"
          className="ml-2 bg-indigo-600 text-white px-4 py-2 text-sm rounded-full hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatApp;
