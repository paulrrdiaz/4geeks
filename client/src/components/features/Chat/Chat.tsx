import { useState } from "react";
import ChatTrigger from "./ChatTrigger";
import ChatContainer from "./ChatContainer";

const Chat = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="fixed right-4 bottom-0">
      {open && <ChatContainer onClose={() => setOpen(false)} />}

      <ChatTrigger onClick={() => setOpen(true)} />
    </div>
  );
};

export default Chat;
