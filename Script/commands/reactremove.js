module.exports.config = {
  name: "reactremove",
  version: "1.3.0",
  hasPermission: 1,
  credits: "Zisan",
  description: "নির্দিষ্ট react দিলে ৩ সেকেন্ড পর মেসেজ remove",
  commandCategory: "admin",
  usages: "reactremove on/off",
  cooldowns: 0
};

let isEnabled = false;

// যেসব react দিলে remove হবে
const ALLOWED_REACTIONS = ["⚠️", "❌"];

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
    `✅ React Remove ${isEnabled ? "চালু" : "বন্ধ"}\n🎯 React: ${ALLOWED_REACTIONS.join("⚠️")}\n⏱️ Delay: 3s`,
    event.threadID,
    event.messageID
  );
};

// ⚠️ IMPORTANT: Mirai reaction register
module.exports.handleReaction = async function ({ api, event, handleReaction }) {
  if (!isEnabled) return;

  // শুধু নির্দিষ্ট react
  if (!ALLOWED_REACTIONS.includes(event.reaction)) return;

  setTimeout(async () => {
    try {
      await api.unsendMessage(handleReaction.messageID);
    } catch (e) {
      console.log("Unsend error:", e);
    }
  }, 3000);
};

// 🔑 Mirai hook (এইটা না থাকলে কাজ করবে না)
module.exports.onLoad = () => {
  if (!global.client.handleReaction) global.client.handleReaction = [];
};
