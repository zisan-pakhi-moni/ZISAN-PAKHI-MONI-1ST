module.exports.config = {
  name: "funreply",
  version: "1.0.0",
  hasPermission: 0, // সবাই ব্যবহার করতে পারবে
  credits: "Zisan",
  description: "মজার auto reply command 😄",
  commandCategory: "fun",
  usages: "funreply <text>",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const input = args.join(" ");

  if (!input) {
    return api.sendMessage(
      "❎ কিছু লিখো ভাই 😅\nউদাহরণ: funreply আমি আজ অনেক happy",
      event.threadID,
      event.messageID
    );
  }

  let replyText = 
`😎 তোর কথার রিপ্লাই রেডি!

📝 তুমি লিখেছো:
"${input}"

💬 বট বলছে:
জীবন ছোট, টেনশন নিস না 😄
চা খা ☕, হাস 😁, আর সামনে আগাও 💪

— Zisan Bot 🤖`;

  api.sendMessage(replyText, event.threadID, event.messageID);
};
