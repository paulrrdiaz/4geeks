import React, { useEffect, useState } from "react";
import { XIcon } from "lucide-react";
import ChatMessages from "./ChatMessages";
import ChatForm from "./ChatForm";
import { Button } from "@/components/ui/button";
import { findAllMessages } from "@/services/messages";

type ChatContainerProps = {
  onClose: () => void;
};

const ChatContainer = (props: ChatContainerProps) => {
  const { onClose } = props;
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const messagesFetched = await findAllMessages();
    setMessages(messagesFetched);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="relative p-4 h-[400px] flex flex-col gap-2 shadow border border-gray-300 rounded-md w-[400px]">
      <Button
        onClick={onClose}
        variant="outline"
        className="absolute -top-12 right-0 rounded-full"
      >
        <XIcon className="w-4" />
      </Button>

      <ChatMessages messages={messages} />

      <ChatForm setMessages={setMessages} />
    </div>
  );
};

export default ChatContainer;
