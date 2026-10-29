/**
 * Smart Voice Assistant warning engine (Bengali & English speech synthesis).
 */
class VoiceAlertEngine {
  constructor() {
    this.isSpeaking = false;
    this.lastSpokenTime = 0;
    this.debounceMs = 5000; // speak at most once every 5s
  }

  speak(type, lang = 'bn-BD') {
    const now = Date.now();
    if (this.isSpeaking || now - this.lastSpokenTime < this.debounceMs) {
      return;
    }
    if (!('speechSynthesis' in window)) return;

    let text = '';
    if (type === 'SLEEP') {
      text = lang === 'bn-BD'
        ? 'সতর্কতা! চোখ মেলুন! ড্রাইভার জেগে উঠুন!'
        : 'Emergency warning! Driver asleep! Wake up immediately!';
    } else if (type === 'DISTRACTION') {
      text = lang === 'bn-BD'
        ? 'সতর্কতা! মোবাইল দেখবেন না! রাস্তায় মনোযোগ দিন!'
        : 'Warning! Keep your eyes on the road! Distraction detected!';
    } else if (type === 'YAWN') {
      text = lang === 'bn-BD'
        ? 'আপনি ক্লান্ত হয়ে পড়েছেন, অনুগ্রহ করে একটু বিশ্রাম নিন।'
        : 'Fatigue warning. Please consider taking a break.';
    }

    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 1.05;
    utterance.pitch = 1.1;

    this.isSpeaking = true;
    this.lastSpokenTime = now;

    utterance.onend = () => {
      this.isSpeaking = false;
    };
    utterance.onerror = () => {
      this.isSpeaking = false;
    };

    window.speechSynthesis.speak(utterance);
  }

  stop() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
  }
}

export const voiceAlert = new VoiceAlertEngine();
