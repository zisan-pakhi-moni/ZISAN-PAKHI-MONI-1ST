module.exports.config = {
  name: "reactremove",
  version: "1.1.0",
  hasPermission: 1, // admin only
  credits: "Zisan",
  description: "নির্দিষ্ট react দিলে মেসেজ remove করবে",
  commandCategory: "admin",
  usages: "reactremove on/off",
  cooldowns: 0
};

// ON / OFF switch
let isEnabled = false;

// যেসব react দিলে message remove হবে
const ALLOWED_REACTIONS = ["😡", "❌", "⚠️"]; // চাইলে এখানে add/remove করো

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
    `✅ React Remove ${isEnabled ? "চালু" : "বন্ধ"} করা হয়েছে\n🎯 React: ${ALLOWED_REACTIONS.join(" ")}`,
    event.threadID,
    event.messageID
  );
};

// React listener
module.exports.handleReaction = async function ({ api, event }) {
  if (!isEnabled) return;

  try {
    const reaction = event.reaction; // 😡 ❌ ⚠️ ইত্যাদি

    // শুধু নির্দিষ্ট react হলে কাজ করবে
    if (!ALLOWED_REACTIONS.includes(reaction)) return;

    if (event.messageID) {
      await api.unsendMessage(event.messageID);
    }
  } catch (err) {
    console.log("React remove error:", err);
  }
};
