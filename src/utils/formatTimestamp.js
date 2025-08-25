const formatTimestamp = (timestamp, showTime = false) => {
  if (!timestamp) return "";

  const { seconds = 0, nanoseconds = 0 } = timestamp;
  const date = new Date(seconds * 1000 + nanoseconds / 1e6);

  // Date options
  const dateOptions = { day: "numeric", month: "short", year: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit" };

  // Format base date and time
  let formattedDate = date.toLocaleDateString("en-US", dateOptions);
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

  // Add suffix (1st, 2nd, 3rd, 4th, etc.)
  const day = date.getDate();
  const suffix =
    day >= 11 && day <= 13
      ? "th"
      : day % 10 === 1
      ? "st"
      : day % 10 === 2
      ? "nd"
      : day % 10 === 3
      ? "rd"
      : "th";

  formattedDate = formattedDate.replace(/(\d+)/, `$1${suffix}`);

  // Return with or without time
  return showTime ? `${formattedDate}, ${formattedTime}` : formattedDate;
};
export default formatTimestamp;
