import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createMessage } from "@/services/messages";

const schema = yup.object({
  message: yup.string().required(),
});

const ChatForm = (props) => {
  const { setMessages } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setMessages((messages) => [
      ...messages,
      {
        role: "user",
        content: data.message,
      },
    ]);

    const response = await createMessage(data.message);
    setMessages((messages) => [...messages, response]);

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
      <Input {...register("message")} placeholder="Escribe un mensaje" />
      <Button type="submit" disabled={isSubmitting}>
        <SendIcon className="w-4" />
      </Button>
    </form>
  );
};

export default ChatForm;
