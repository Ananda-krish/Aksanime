import React, { useRef, useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ChatBot from './../ChatBot/ChatBot';



const ChatLauncher = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        title="Open chat"
      >
        <MessageCircle size={24} className="sm:w-7 sm:h-7" />
      </button>

      <div
        className={`fixed bottom-4 right-4 z-50 w-[90%] max-w-[360px] sm:w-[380px] lg:w-[420px] transition-all duration-300 transform ${
          isOpen
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-95 opacity-0 translate-y-12 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-lg shadow-2xl flex flex-col h-[500px] sm:h-[600px]">
          <div className="flex items-center justify-between p-3 border-b sm:p-4">
            <h2 className="text-lg font-bold text-gray-800 sm:text-xl">Customer Support</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 transition-colors rounded-full hover:bg-gray-100"
              title="Close chat"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          <div className="flex-1 overflow-hidden">
            <ChatBot />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatLauncher;