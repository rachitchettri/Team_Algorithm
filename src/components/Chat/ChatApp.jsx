// // import { useState, useRef, useEffect } from 'react';

// // const ChatApp = () => {
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const messagesEndRef = useRef(null);

// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //   }, [messages]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!input.trim()) return;

// //     const userMessage = { role: 'user', content: input };
// //     const updatedMessages = [...messages, userMessage];
// //     setMessages(updatedMessages);
// //     setInput('');
// //     setIsLoading(true);

// //     const res = await fetch('http://localhost:5000/api/chat', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ messages: updatedMessages }),
// //     });

// //     if (!res.body) {
// //       console.error('No response stream');
// //       setIsLoading(false);
// //       return;
// //     }

// //     const reader = res.body.getReader();
// //     const decoder = new TextDecoder();
// //     setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
// //     let assistantReply = '';

// //     const read = async () => {
// //       while (true) {
// //         const { done, value } = await reader.read();
// //         if (done) break;
// //         const chunk = decoder.decode(value);
// //         assistantReply += chunk;

// //         setMessages((prev) => {
// //           const updated = [...prev];
// //           updated[updated.length - 1].content += chunk;
// //           return updated;
// //         });
// //       }
// //       setIsLoading(false);
// //     };

// //     read();
// //   };

// //   return (
// //     <div className="max-w-2xl mx-auto mt-10 p-4 h-[90vh] flex flex-col border rounded-lg shadow bg-white">

// //       <h1 className="text-2xl font-bold mb-4 text-center">AI Chat</h1>
// //       <div className="flex-1 overflow-y-auto px-4 space-y-2">
// //         {messages.map((msg, idx) => (
// //           <div
// //             key={idx}
// //             className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
// //           >
// //             <div
// //               className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow
// //                 ${msg.role === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
// //             >
// //               {msg.content}
// //             </div>
// //           </div>
// //         ))}
// //         {isLoading && (
// //           <div className="text-left text-sm text-gray-500">Assistant is typing...</div>
// //         )}
// //         <div ref={messagesEndRef} />
// //       </div>

// //       <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
// //         <input
// //           type="text"
// //           value={input}
// //           onChange={(e) => setInput(e.target.value)}
// //           className="flex-1 border rounded-full px-4 py-2 shadow-sm focus:outline-none"
// //           placeholder="Type a message..."
// //         />
// //         <button
// //           type="submit"
// //           className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
// //         >
// //           Send
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default ChatApp;

// import { useState, useRef, useEffect } from 'react';
// import { FiMessageCircle } from 'react-icons/fi';

// const ChatApp = ({ className }) => {
//   // Your chat logic from the code you gave, but accept a className for styling
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = { role: 'user', content: input };
//     const updatedMessages = [...messages, userMessage];
//     setMessages(updatedMessages);
//     setInput('');
//     setIsLoading(true);

//     // Fake API call (replace with your own)
//     setTimeout(() => {
//       setMessages((prev) => [
//         ...prev,
//         { role: 'assistant', content: 'This is a simulated reply from AI.' },
//       ]);
//       setIsLoading(false);
//     }, 1500);
//   };

//   return (
//     <div className={`flex flex-col bg-white border rounded-lg shadow-lg ${className}`}>
//       <div className="p-3 border-b bg-blue-600 text-white font-bold rounded-t-lg">
//         AI Chat
//       </div>
//       <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-[300px]">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
//           >
//             <div
//               className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow
//                 ${msg.role === 'user'
//                   ? 'bg-blue-500 text-white rounded-br-none'
//                   : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
//             >
//               {msg.content}
//             </div>
//           </div>
//         ))}
//         {isLoading && (
//           <div className="text-left text-sm text-gray-500">Assistant is typing...</div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       <form onSubmit={handleSubmit} className="flex gap-2 p-3 border-t rounded-b-lg">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="flex-1 border rounded-full px-4 py-2 shadow-sm focus:outline-none"
//           placeholder="Type a message..."
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// const ChatPopup = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleChat = () => setIsOpen((open) => !open);

//   return (
//     <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
//       {/* Chat Icon */}
//       <button
//         onClick={toggleChat}
//         aria-label="Toggle chat"
//         className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
//       >
//         <FiMessageCircle size={24} />
//       </button>

//       {/* Chat Box Popup */}
//       {isOpen && (
//         <div className="mt-3 w-80">
//           <ChatApp />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatPopup;

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
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="ml-2 bg-indigo-600 text-white px-4 py-2 text-sm rounded-full hover:bg-indigo-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatApp;
