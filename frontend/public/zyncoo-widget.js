(function () {
  "use strict";

  // Prevent duplicate initialization
  if (window.ZyncooWidgetLoaded) return;
  window.ZyncooWidgetLoaded = true;

  // Read configuration from script tag
  const currentScript = document.currentScript || document.querySelector("script[src*='zyncoo-widget']");
  const storeName = currentScript?.getAttribute("data-store") || "Zyncoo AI Store";
  const brandColor = currentScript?.getAttribute("data-color") || "#10b981";
  const greeting = currentScript?.getAttribute("data-greeting") || "আসসালামু আলাইকুম! Zyncoo AI-তে আপনাকে স্বাগতম। কীভাবে সাহায্য করতে পারি?";
  const apiEndpoint = currentScript?.getAttribute("data-api") || "/api/ai/chat";

  // State
  let isOpen = false;
  let messages = [
    {
      sender: "bot",
      text: greeting,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ];

  // Container styling
  const style = document.createElement("style");
  style.textContent = `
    .zyncoo-widget-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .zyncoo-launcher-btn {
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: ${brandColor};
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: none;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      color: #ffffff;
    }
    .zyncoo-launcher-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
    }
    .zyncoo-chat-box {
      position: absolute;
      bottom: 74px;
      right: 0;
      width: 360px;
      max-width: calc(100vw - 32px);
      height: 520px;
      max-height: calc(100vh - 120px);
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
      display: none;
      flex-direction: column;
      overflow: hidden;
      border: 1px solid rgba(0,0,0,0.08);
      transform-origin: bottom right;
      animation: zyncooFadeIn 0.25s ease-out forwards;
    }
    @keyframes zyncooFadeIn {
      from { opacity: 0; transform: scale(0.92) translateY(12px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    .zyncoo-header {
      background: ${brandColor};
      color: #ffffff;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .zyncoo-header-title {
      font-weight: 700;
      font-size: 15px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .zyncoo-status-dot {
      width: 8px;
      height: 8px;
      background: #4ade80;
      border-radius: 50%;
      box-shadow: 0 0 8px #4ade80;
    }
    .zyncoo-close-btn {
      background: transparent;
      border: none;
      color: #ffffff;
      cursor: pointer;
      font-size: 20px;
      line-height: 1;
      opacity: 0.85;
    }
    .zyncoo-close-btn:hover { opacity: 1; }
    .zyncoo-messages {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .zyncoo-bubble {
      max-width: 82%;
      padding: 10px 14px;
      border-radius: 16px;
      font-size: 13.5px;
      line-height: 1.45;
      word-break: break-word;
    }
    .zyncoo-bubble.bot {
      align-self: flex-start;
      background: #ffffff;
      color: #1e293b;
      border: 1px solid #e2e8f0;
      border-bottom-left-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.03);
    }
    .zyncoo-bubble.user {
      align-self: flex-end;
      background: ${brandColor};
      color: #ffffff;
      border-bottom-right-radius: 4px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    }
    .zyncoo-input-area {
      padding: 12px;
      background: #ffffff;
      border-top: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .zyncoo-input {
      flex: 1;
      border: 1px solid #cbd5e1;
      border-radius: 24px;
      padding: 10px 14px;
      font-size: 13.5px;
      outline: none;
      font-family: inherit;
    }
    .zyncoo-input:focus {
      border-color: ${brandColor};
    }
    .zyncoo-send-btn {
      background: ${brandColor};
      color: #ffffff;
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    .zyncoo-send-btn:hover { opacity: 0.9; }
    .zyncoo-branding {
      text-align: center;
      font-size: 10px;
      color: #94a3b8;
      padding: 4px 0 8px;
      background: #ffffff;
    }
  `;
  document.head.appendChild(style);

  // Widget DOM
  const container = document.createElement("div");
  container.className = "zyncoo-widget-container";
  container.innerHTML = `
    <div class="zyncoo-chat-box" id="zyncooChatBox">
      <div class="zyncoo-header">
        <div>
          <div class="zyncoo-header-title">
            <span class="zyncoo-status-dot"></span>
            <span>${storeName}</span>
          </div>
          <div style="font-size: 11px; opacity: 0.85; margin-top: 2px;">⚡ Powered by Zyncoo AI (Online 24/7)</div>
        </div>
        <button class="zyncoo-close-btn" id="zyncooCloseBtn">×</button>
      </div>
      <div class="zyncoo-messages" id="zyncooMessages"></div>
      <div class="zyncoo-input-area">
        <input type="text" class="zyncoo-input" id="zyncooInput" placeholder="কিছু জিজ্ঞেস করুন (বাংলা / English)..." />
        <button class="zyncoo-send-btn" id="zyncooSendBtn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
      <div class="zyncoo-branding">Zyncoo AI Autonomous Business Assistant</div>
    </div>
    <button class="zyncoo-launcher-btn" id="zyncooLauncherBtn" aria-label="Open chat">
      <svg id="zyncooOpenIcon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <svg id="zyncooCloseIcon" style="display: none;" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  `;
  document.body.appendChild(container);

  // References
  const chatBox = document.getElementById("zyncooChatBox");
  const launcherBtn = document.getElementById("zyncooLauncherBtn");
  const closeBtn = document.getElementById("zyncooCloseBtn");
  const openIcon = document.getElementById("zyncooOpenIcon");
  const closeIcon = document.getElementById("zyncooCloseIcon");
  const messagesEl = document.getElementById("zyncooMessages");
  const inputEl = document.getElementById("zyncooInput");
  const sendBtn = document.getElementById("zyncooSendBtn");

  function renderMessages() {
    messagesEl.innerHTML = messages
      .map(
        (m) => `
        <div class="zyncoo-bubble ${m.sender}">
          <div>${m.text}</div>
          <div style="font-size: 10px; margin-top: 4px; opacity: 0.6; text-align: ${m.sender === "user" ? "right" : "left"};">
            ${m.time || ""}
          </div>
        </div>
      `
      )
      .join("");
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function toggleWidget() {
    isOpen = !isOpen;
    if (isOpen) {
      chatBox.style.display = "flex";
      openIcon.style.display = "none";
      closeIcon.style.display = "block";
      renderMessages();
      inputEl.focus();
    } else {
      chatBox.style.display = "none";
      openIcon.style.display = "block";
      closeIcon.style.display = "none";
    }
  }

  async function sendMessage() {
    const text = inputEl.value.trim();
    if (!text) return;

    inputEl.value = "";
    const userMsg = {
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    messages.push(userMsg);
    renderMessages();

    // Show typing placeholder
    const typingMsg = {
      sender: "bot",
      text: "...",
      time: "",
    };
    messages.push(typingMsg);
    renderMessages();

    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          channel: "website",
          storeName,
          conversationHistory: messages
            .filter((m) => m.text !== "...")
            .map((m) => ({ sender: m.sender === "user" ? "customer" : "bot", text: m.text })),
        }),
      });

      const data = await res.json();
      messages.pop(); // remove typing

      if (data && data.replyText) {
        messages.push({
          sender: "bot",
          text: data.replyText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        });
      } else {
        messages.push({
          sender: "bot",
          text: "ধন্যবাদ! আমরা আপনার মেসেজটি পেয়েছি। আমাদের টিম খুব শীঘ্রই যোগাযোগ করবে।",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        });
      }
    } catch (e) {
      messages.pop();
      messages.push({
        sender: "bot",
        text: "দুঃখিত, সংযোগে কিছুটা সমস্যা হচ্ছে। অনুগ্রহ করে একটু পরে আবার চেষ্টা করুন।",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });
    }

    renderMessages();
  }

  launcherBtn.addEventListener("click", toggleWidget);
  closeBtn.addEventListener("click", toggleWidget);
  sendBtn.addEventListener("click", sendMessage);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  renderMessages();
})();
