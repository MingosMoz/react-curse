import './ChatMessage.css';


export function ChatMessage({ message, sender }) {
  //const message = props.message;
  //const sender = props.sender;
  // const { message, sender } = props;

  /*
  if (sender === 'robot') {
    return (
      <div>
        <img src="robot.png" width="50" />
        {message} 
    </div>
    );
  }
    */

  return (
    <div className={
      sender === 'user'
        ? 'chat-message-user'
        : 'chat-message-robot'
    }>
      {sender === 'robot' && (
        <img src="https://cdn-icons-png.flaticon.com/512/4712/4712036.png" className="chat-message-profile" />
      )}
      <div
        className="chat-message-text">
        {message}
      </div>
      {sender === 'user' && (
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" className="chat-message-profile" />
      )}
    </div>
  );
}