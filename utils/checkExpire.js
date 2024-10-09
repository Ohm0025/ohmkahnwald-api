exports.checkExpiredCode = (checkedDate) => {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" })
  );
  const createdAt = new Date(
    new Date(checkedDate).toLocaleString("en-US", {
      timeZone: "Asia/Bangkok",
    })
  );

  const ageMs = now - createdAt;
  const hours = Math.floor(ageMs / (1000 * 60 * 60));

  return hours;
};
