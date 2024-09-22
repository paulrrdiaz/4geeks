import ChatMessage from "./ChatMessage";

const ChatMessages = (props) => {
  const { messages } = props;
  return (
    <div className="flex flex-col flex-1 overflow-auto gap-2">
      {messages.map((message) => (
        <ChatMessage {...message} />
      ))}
    </div>
  );
};

export default ChatMessages;
