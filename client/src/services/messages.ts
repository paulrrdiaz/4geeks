const API_URL = "http://127.0.0.1:5000/api/v1";

export const findAllMessages = async () => {
  const response = await fetch(API_URL + "/messages");
  return response.json();
};

export const createMessage = async (message: string) => {
  const response = await fetch(API_URL + "/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });
  return response.json();
};
