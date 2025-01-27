import Input from "@/components/ui/Input";

const ChatView = () => {
  const messages = [
    {
      id: 1,
      name: "Alice",
      message: "Hi there! How are you?",
      timestamp: "10:00 AM",
    },
    { id: 2, name: "Bob", message: "I'm good, thanks! What about you?" },
    { id: 3, name: "Charlie", message: "Hey everyone! What's up?" },
    { id: 4, name: "Diana", message: "Not much, just working on a project." },
    { id: 5, name: "Eve", message: "Sounds interesting! Need any help?" },
    { id: 1, name: "Alice", message: "Hi there! How are you?" },
    { id: 2, name: "Bob", message: "I'm good, thanks! What about you?" },
    { id: 3, name: "Charlie", message: "Hey everyone! What's up?" },
    { id: 4, name: "Diana", message: "Not much, just working on a project." },
    { id: 5, name: "Eve", message: "Sounds interesting! Need any help?" },
  ];
  return (
    <div className="flex h-full flex-col px-4">
      <div
        style={{ scrollbarWidth: "none" }}
        className="flex flex-grow flex-col gap-2 overflow-y-scroll"
      >
        {messages.map((message, index) => (
          <div
            key={index + message.message}
            className={`w-fit max-w-[80%] rounded-2xl border-2 p-2 dark:text-dark ${
              message.id === 1
                ? "self-start bg-green-200 text-left"
                : "self-end bg-blue-200 text-right"
            }`}
          >
            <span className="font-semibold">{message.name}</span>
            <p className="ml-2">
              {message.id === 1 ? message.message : ""}{" "}
              <span className="text-xs text-gray-500">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>{" "}
              {message.id !== 1 ? message.message : ""}
            </p>
          </div>
        ))}
      </div>
      <Input name="message" type="text" placeholder="Type a message..." />
    </div>
  );
};

export default ChatView;
