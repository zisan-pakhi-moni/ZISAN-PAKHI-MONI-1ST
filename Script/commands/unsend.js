module.exports.config = {
  name: "unseed",
  version: "1.0.2",
  hasPermission: 2,
  credits: "omit",
  description: "Unsend bot message if user replies or reacts with trigger",
  commandCategory: "system",
  usages: "",
  cooldowns: 0
};

module.exports.languages = {
  "vi": {
    "returnCant": "Không thể gỡ tin nhắn của người khác.",
    "missingReply": "Hãy reply tin nhắn cần gỡ."
  },
  "en": {
    "returnCant": "",
    "missingReply": "Please reply to the message you want to unsend."
  }
};

// 🧠 Optional helper
module.exports.run = function ({ api, event }) {
  return api.sendMessage("React to a bot message with /uns or react on bot massege 🤬 to unsend it.", event.threadID, event.messageID);
};

module.exports.handleEvent = async function ({ api, event, getText }) {
  const botID = api.getCurrentUserID();

  // ✅ Handle reaction
  if (event.type === "message_reaction") {
    const { reaction, messageID, userID } = event;

    if (reaction === "🤬" && userID !== botID) {
      try {
        await api.unsendMessage(messageID);
      } catch (e) {
        console.log("❌ Failed to unsend (reaction):", e.message);
      }
    }
  }

  // ✅ Handle reply with trigger
  else if (event.type === "message_reply") {
    const { messageReply, body, threadID, messageID } = event;

    if (messageReply.senderID == botID) {
      const triggers = ["/uns", "/u", "🤬", "."];
      if (triggers.includes(body.trim().toLowerCase())) {
        try {
          await api.unsendMessage(messageReply.messageID);
        } catch (e) {
          console.log("❌ Failed to unsend (reply):", e.message);
        }
      }
    } else {
      return api.sendMessage(getText("returnCant"), threadID, messageID);
    }
  }
};
