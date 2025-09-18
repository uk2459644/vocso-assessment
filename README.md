
# React Native Chatroom App

A simple **React Native chatroom app** with Firebase integration. Users can join with a username, send messages in real-time, and view all messages in chronological order.

> **Note:** Push notifications were planned but not implemented due to Firebase Functions requiring a paid Blaze plan. Messages work in real-time while the app is open or in the foreground.

---

## Features

- User login with a unique username.
- Real-time chatroom using **Firebase Realtime Database**.
- Messages displayed in chronological order.
- Own messages and others’ messages styled differently.
- Theme toggle (light/dark mode).
- Clean, modular code structure.


## Tech Stack

- **React Native** (CLI)
- **Firebase Realtime Database**
- **React Context API** for authentication and theme
- **AsyncStorage** for persisting login state
- **React Native Vector Icons** for UI elements

---

## Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/your-username/chatroom-app.git
cd chatroom-app
````

2. **Install dependencies**

```bash
npm install

```

3. **Configure Firebase**

* Create a Firebase project.
* Add a **Realtime Database**.
* Copy your `firebaseConfig` from Firebase and replace in `src/firebase.js`.

4. **Run the App**

```bash
npx react-native run-android

```

5. **Login**

* Enter a unique username.
* Your username is saved locally, so you remain logged in until you log out.

---

## Limitations / Notes

* **Push notifications not implemented:**
  We attempted to use Firebase Cloud Functions to send notifications when a message is sent, but deploying functions requires the **Blaze (pay-as-you-go) plan**. As this was not feasible within free-tier limits, push notifications are not functional in this version.

* The app works fully for:

  * Sending/receiving messages in real-time while the app is open.
  * Persisting the username locally.

* Future improvement: Implement push notifications with FCM once a paid plan is available.

---

## Folder Structure

```
chatroom-app/
│
├─ src/
│   ├─ components/
│   │   ├─ ChatRoom.jsx
│   │   ├─ LoginScreen.jsx
│   │   ├─ Message.jsx
│   │   └─ ui/
│   │       ├─ Input.jsx
│   │       └─ SendButton.jsx
│   ├─ contexts/
│   │   ├─ AuthContext.jsx
│   │   └─ ThemeContext.jsx
│   └─ firebase.js
│
├─ App.js
├─ package.json
└─ README.md
```

---

## Deliverables

* **GitHub Repository:**
  [Repo](https://github.com/uk2459644/vocso-assessment)

* **Android APK:**
  The compiled APK is included in the repository or attached separately.

* **Demo Video:**
  Showcase:

  * Logging in with a username.
  * Sending and receiving messages in real-time.
  * Theme toggle.
  * Logout and re-login with the same username.

---

⚠️ Firebase Setup
1. Create a Firebase project.
2. Add a Realtime Database.
3. Download `google-services.json` (Android) and place in `android/app/`.
4. Create a `firebase.js` in `src/` with your Firebase config.



"# vocso-assessment" 
