const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.sendMessageNotification = functions.database
  .ref("/chat/messages/{messageId}")
  .onCreate(async (snapshot, context) => {
    const message = snapshot.val();

    if (!message) return null;

    // Message info
    const { text, user: senderUsername } = message;

    try {
      // Get all users
      const usersSnapshot = await admin.database().ref("users").once("value");
      const users = usersSnapshot.val() || {};

      // Collect FCM tokens of all users except the sender
      const tokens = Object.values(users)
        .filter(u => u.username !== senderUsername && u.fcmToken)
        .map(u => u.fcmToken);

      if (tokens.length === 0) return null;

      // Create notification payload
      const payload = {
        notification: {
          title: `New message from ${senderUsername}`,
          body: text.length > 50 ? text.substring(0, 50) + "..." : text,
          sound: "default",
        },
      };

      // Send push notifications
      const response = await admin.messaging().sendToDevice(tokens, payload);
      console.log("Notifications sent:", response.successCount);
      return null;
    } catch (error) {
      console.error("Error sending notification:", error);
      return null;
    }
  });
