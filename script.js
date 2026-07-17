  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-analytics.js";
  import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCUdBL2TJECWcaDDx4R1H_lip79hWviSjo",
    authDomain: "ecosmart-city-webx.firebaseapp.com",
    projectId: "ecosmart-city-webx",
    storageBucket: "ecosmart-city-webx.firebasestorage.app",
    messagingSenderId: "918689525935",
    appId: "1:918689525935:web:d3860eca246db86d2f245a",
    measurementId: "G-KW8QEEKHJT"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);

  const form = document.getElementById("feedbackForm");
  const statusMessage = document.getElementById("statusMessage");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const selectedRating = document.querySelector('input[name="rating"]:checked')?.value || "Not rated";

      if (!name || !email || !message) {
        if (statusMessage) {
          statusMessage.textContent = "Please fill in your name, email, and message.";
          statusMessage.className = "status-message error";
        }
        return;
      }

      if (statusMessage) {
        statusMessage.textContent = "Sending your feedback...";
        statusMessage.className = "status-message";
      }

      try {
        await setDoc(doc(db, "contact-us", "contact"), {
          Name: name,
          email: email,
          msg: message,
          rating: selectedRating,
          submittedAt: new Date().toISOString()
        });

        if (statusMessage) {
          statusMessage.textContent = "Thank you! Your feedback has been saved.";
          statusMessage.className = "status-message success";
        }
        form.reset();
      } catch (error) {
        console.error("Firebase save failed:", error);
        if (statusMessage) {
          statusMessage.textContent = "Sorry, something went wrong. Please try again.";
          statusMessage.className = "status-message error";
        }
      }
    });
  } else {
    console.warn('Feedback form not found on this page.');
  }