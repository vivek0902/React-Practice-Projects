import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    returnObjects: true,
    resources: {
      en: {
        translation: {
          greeting: "Hello, welcome!",
          greetingName: "Hello, welcome! {{name}}",
          greetingNameForBold: "Hello, welcome! <1>{{name}}</1>",
          description: {
            line1: "Hard work always leads to success.",
            line2: "Never stop learning, because life never stops teaching.",
          },
          name: "Vivek",
        },
      },
      fr: {
        translation: {
          greeting: "Bonjour, bienvenue!",
          greetingName: "Bonjour, bienvenue! {{name}}",
          greetingNameForBold: "Bonjour, bienvenue! <1>{{name}}</1>",
          description: {
            line1: "Le travail acharné mène toujours au succès.",
            line2:
              "N'arrête jamais d'apprendre, car la vie n'arrête jamais d'enseigner.",
          },
          name: "Vivek",
        },
      },
      hi: {
        translation: {
          greeting: "नमस्ते, स्वागत है!",
          greetingName: "नमस्ते, स्वागत है! {{name}}",
          greetingNameForBold: "नमस्ते, स्वागत है! <1>{{name}}</1>",
          description: {
            line1: "कठिन परिश्रम हमेशा सफलता की ओर ले जाता है।",
            line2: "सीखना कभी मत छोड़ो, क्योंकि जीवन सिखाना कभी नहीं छोड़ता।",
          },
          name: "विवेक",
        },
      },
      ar: {
        translation: {
          greeting: "مرحبًا، أهلاً وسهلاً!",
          greetingName: "مرحبًا، أهلاً وسهلاً! {{name}}",
          greetingNameForBold: "مرحبًا، أهلاً وسهلاً!<1>{{name}}<1>",
          description: {
            line1: "العمل الجاد يؤدي دائمًا إلى النجاح.",
            line2: "لا تتوقف عن التعلم، لأن الحياة لا تتوقف عن التعليم.",
          },
          name: "فيفيك",
        },
      },
      ur: {
        translation: {
          greeting: "سلام، خوش آمدید!",
          greetingName: "سلام، خوش آمدید! {{name}}",
          greetingNameForBold: "سلام، خوش آمدید! <1>{{name}}<1>",
          description: {
            line1: "محنت ہمیشہ کامیابی کی طرف لے جاتی ہے۔",
            line2: "کبھی سیکھنا مت چھوڑو، کیونکہ زندگی سکھانا نہیں چھوڑتی۔",
          },
          name: "وِویک",
        },
      },
    },
  });
