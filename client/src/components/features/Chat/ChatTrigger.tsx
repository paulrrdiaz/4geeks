import { Button, ButtonProps } from "@/components/ui/button";

const ChatTrigger = (props: ButtonProps) => {
  return (
    <Button className="w-40 rounded-b-none" {...props}>
      Asistente
    </Button>
  );
};

export default ChatTrigger;
