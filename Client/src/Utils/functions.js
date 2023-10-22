//sender info
export const getSender = (loggedUser, users) => {
  return loggedUser._id === users[0]._id ? users[1] : users[0];
};

export const isSameUser = (messages, message, i, userId) => {
  return (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== message.sender._id) ||
    (messages[i + 1].sender._id === undefined &&
      messages[i].sender._id !== userId)
  );
};
