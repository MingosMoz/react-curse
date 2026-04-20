import { useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css';

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="chat-messages-container"
      ref={chatMessagesRef}>

      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            key={chatMessage.id}
            message={chatMessage.message}
            sender={chatMessage.sender}
          />
        );
      })}
    </div>
  );
}

export default ChatMessages;