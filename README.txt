YUSRA SKIN CARE - ADMIN DASHBOARD

This ZIP contains the main skincare website and the Admin Dashboard.

Files:
index.html
style.css
script.js
firebaseconfig.js
admin.html
admin.css
admin.js

IMPORTANT:
1. Open Firebase Console.
2. Authentication -> Users.
3. Find YOUR admin account.
4. Copy its User UID.
5. Open admin.js.
6. Find:
const ADMIN_UID="PUT_YOUR_ADMIN_UID_HERE";
7. Replace the text inside the quotes with your UID.
8. Save admin.js.

Then open admin.html while logged in with that admin account.

The dashboard reads:
users collection = registered users
messages collection = website contact messages

Never put your Firebase password or service-account private key in these files.

Firestore Rules must also restrict reading all users/messages to your admin UID.
