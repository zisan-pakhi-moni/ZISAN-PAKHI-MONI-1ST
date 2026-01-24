module.exports.config = {
  name: "reactremove",
  version: "1.2.0",
  hasPermission: 1, // admin only
  credits: "Zisan",
  description: "নির্দিষ্ট react দিলে ৩ সেকেন্ড পর মেসেজ remove করবে",
  commandCategory: "admin",
  usages: "reactremove on/off",
  cooldowns: 0
};

// ON / OFF switch
let isEnabled = true;

// যেসব react দিলে কাজ করবে
const ALLOWED_REACTIONS = ["⚠️", "❌"]; // চাইলে পরিবর্তন করো

module.exports.run = async function ({ api, event, args }) {
  const option = args[0];

  if (!option || !["on", "off"].includes(option)) {
    return api.sendMessage(
      "ব্যবহার:\nreactremove on\nreactremove off",
      event.threadID,
      event.messageID
    );
  }

  isEnabled = option === "on";

  api.sendMessage(
    `✅ React Remove ${isEnabled ? "চালু" : "বন্ধ"} করা হয়েছে\n⏱️ Delay: 3s\n🎯 React: ${ALLOWED_REACTIONS.join("⚠️")}`,
    event.threadID,
    event.messageID
  );
};

// React listener
module.exports.handleReaction = async function ({ api, event }) {
  if (!isEnabled) return;

  try {
    const reaction = event.reaction;

    // শুধু নির্দিষ্ট react হলে
    if (!ALLOWED_REACTIONS.includes(reaction)) return;

    const messageID = event.messageID;
    if (!messageID) return;

    // ৩ সেকেন্ড পর remove
    setTimeout(async () => {
      try {
        await api.unsendMessage(messageID);
      } catch (e) {
        console.log("Unsend failed:", e);
      }
    }, 3000);

  } catch (err) {
    console.log("React remove error:", err);
  }
};
