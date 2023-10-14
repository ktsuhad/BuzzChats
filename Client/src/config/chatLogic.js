import dayjs from "dayjs";  //importing dayjs libery

//sender info
export const getSender = (loggedUser, users) => {
  return loggedUser._id === users[0]._id ? users[1] : users[0];
};

//format timeStamp
export const formatTimestamp = (createdAt) => {
  const now = dayjs();
  const createdAtDate = dayjs(createdAt);

  if (now.isSame(createdAtDate, "day")) {
    return createdAtDate.format("h:mm A"); // Today, display time (e.g., 9:00 PM)
  } else if (now.isSame(createdAtDate, "yesterday")) {
    return "Yesterday"; // Yesterday
  } else if (now.diff(createdAtDate, "day") <= now.day() - 1) {
    return createdAtDate.format("dddd"); // This week, display day (e.g., Tuesday)
  } else {
    return createdAtDate.format("MM/DD/YYYY"); // Before this week, display date (e.g., 05/05/2023)
  }
};
