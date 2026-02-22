import type { AboutSection } from "@/types/entities"

const sections: AboutSection = [
  {
    id: "approach",
    title: "What guides us",
    "text-1": "When we were creating the concept and main sections of the RealU app, we kept asking ourselves:",
    "cards-1": [
      {
        title:
          "Does our app truly help users \n reconnect with their real selves \n or is it just another tool chasing \n attention through quick “dopamine hits”?",
        icon: "/about/hands.svg",
      },
      {
        title: "Do the practices we offer hold the \n potential not just for temporary relief, \n but for gradual and lasting \n transformation?",
        icon: "/about/spiral.svg",
      },
      {
        title: "Are we giving people enough \n knowledge and guidance to build \na\u00a0sustainable personal practice?",
        icon: "/about/chat.svg",
      },
    ],
    "text-2": "Because when you deeply understand the process, you can confidently adapt techniques to suit your needs and inner states. ",
    "text-3":
      "To ensure these questions don’t remain rhetorical, we built a clear methodology into the app’s structure — a path from understanding to action, from experience to transformation. We believe that, step by step, you can become your own guide through three key elements:",
    "cards-2": [
      {
        title: "Knowledge",
        icon: "/about/knowledge.svg",
      },
      {
        title: "Tools",
        icon: "/about/star.svg",
      },
      {
        title: "Regular practice",
        icon: "/about/mini-yog.svg",
      },
    ],
    points: [
      "In our app, the first element is supported through educational courses that combine theory and practice, from foundational material to more advanced levels.",
      "The second element includes a variety of meditation and breathwork techniques, personalized tests to help you find what suits you best, and customizable playlists for breath sessions and yoga nidra. ",
      "The third element — consistency — runs through every part of the app. Courses are designed for gradual learning with doable practices woven throughout. We’ll also remind you to return to your chosen technique. A state tracker lets you observe changes before and after each session, and your personal journal helps you reflect on your progress over time.",
    ],
    "cards-3": [
      {
        title:
          "Our aim is to help you build a lasting practice — one that nurtures your ability to return to a state of clarity, equanimity, and inner fullness. To return to who you truly are.",
        icon: "/about/hands-focused.svg",
      },
    ],
  },
  {
    id: "experts",
    title: "Our experts",
    experts: [
      {
        name: "Tati Frost",
        cardHeight: 560,
        description:
          "Tati is the co-founder and lead teacher at Patanjali International Yoga Foundation in Rishikesh, India (an accredited school with Yoga Alliance USA). She has spent over 20 years studying yoga, meditation, Ayurveda, and Jyotish in India, gaining direct experience under the guidance of traditional Indian teachers. She lives and works primarily in India.",
        image: "/teachers/tati-frost.png",
        "text-1":
          "With 30 years of personal practice and more than 20 years of teaching experience, she has guided over 10,000 students worldwide. Her students call her “a teacher of teachers” for the clarity, depth, and structured approach she brings to her teachings.",
        "text-2":
          "Tati is the author of certified programs including Master of Meditation, Yoga\u00a0Therapy\u00a0&\u00a0Ayurveda, Basic and Advanced Yoga Teacher Training, and Applied Yoga Philosophy.",
        "text-3":
          "She is also a respected commentator on classical yogic scriptures such as the Sankhya Karika, Hatha Ratnavali, and Shiva Samhita, and has translated and adapted ancient Sanskrit texts to make them accessible to modern practitioners.",
      },
      {
        name: "Matthew Wright",
        cardHeight: 520,
        description:
          "Matthew leads workshops in yoga nidra, meditation, and Eastern philosophy for international audiences. He has over 20 years of personal meditation practice and is a certified 500-hour yoga teacher. He is also a long-time student of Madhyamaka, a central school of\u00a0Buddhist philosophy.",
        image: "/teachers/matthew-wright.png",
        "text-1":
          "Matthew worked for many years as a chef in the London restaurant scene before escaping the kitchen for a more simple life with his wife and young daughter in the countryside, where he continues to study, practice, and teach.",
      },
    ],
  },
]

export default sections
