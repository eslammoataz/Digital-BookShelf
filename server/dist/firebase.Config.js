"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebaseConfig = {
    apiKey: String(process.env.FIREBASE_API_KEY),
    authDomain: String(process.env.FIREBASE_AUTH_DOMAIN),
    projectId: String(process.env.PROJECT_ID),
    storageBucket: String(process.env.STORAGE_BUCKET),
    messagingSenderId: String(process.env.MESSAGING_SENDER_ID),
    appId: String(process.env.APP_ID),
    measurementId: String(process.env.MEASURE_ID),
};
exports.default = firebaseConfig;
//# sourceMappingURL=firebase.Config.js.map