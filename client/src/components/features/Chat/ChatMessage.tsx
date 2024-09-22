import { PhoneCallIcon } from "lucide-react";

const ChatMessage = (props) => {
  const { role, content } = props;

  return (
    <>
      {role === "user" ? (
        <div className="flex justify-end">
          <div className="bg-blue-500 max-w-[80%] text-white p-2 rounded-md">
            {content}
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-start">
            <div className="bg-gray-200 max-w-[80%] p-2 rounded-md">
              {JSON.parse(content).text}
            </div>
          </div>

          {JSON.parse(content).contacts && (
            <div className="flex flex-col gap-2">
              {JSON.parse(content).contacts.map((contact) => (
                <div className="bg-gray-200 max-w-[80%] p-2 rounded-md">
                  <a className="flex gap-2" href={`/users/${contact.id}`}>
                    <PhoneCallIcon className="w-4" />
                    {contact.name} - {contact.phone}
                  </a>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ChatMessage;
