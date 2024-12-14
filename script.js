document.getElementById('start-button').addEventListener('click', function() {
  alert("Your journey is about to begin! Choose your mood weather and explore the islands.");
});

// Language selection logic
function changeLanguage() {
  const lang = document.getElementById('language-selector').value;

  const translations = {
    en: {
      title: "Emotional Adventure",
      subtitle: "Mood Weather Journey",
      description: "Embark on a mystical journey through five emotional islands. Choose your mood, complete challenges, and discover emotional balance.",
      startButton: "Start Your Journey",
      featuresTitle: "Features",
      feature1Title: "Explore Emotional Islands",
      feature1Description: "Experience five unique islands representing different emotions. From relaxation to overcoming anxiety, each island offers a transformative experience.",
      feature2Title: "Golden Egg Challenges",
      feature2Description: "Unlock Golden Eggs and answer thought-provoking questions to earn Emotional Gems and unlock rewards that help you regain balance.",
      feature3Title: "Track Your Emotional Growth",
      feature3Description: "Collect Emotional Gems and achieve your personal emotional goals. Track your journey and reflect on how far you've come.",
      howItWorksTitle: "How It Works",
      howItWorksDescription: "Choose your mood, explore the islands, and take part in daily emotional challenges. Each island is a new step on your emotional adventure.",
      footerText: "&copy; 2024 Emotional Adventure. All rights reserved."
    },
    zh: {
      title: "情绪探险",
      subtitle: "心情天气冒险",
      description: "踏上一段神秘的情绪岛屿之旅。选择你的心情，完成挑战，探索情绪平衡。",
      startButton: "开始你的冒险",
      featuresTitle: "游戏特色",
      feature1Title: "探索情绪岛屿",
      feature1Description: "体验五个独特的情绪岛屿。每个岛屿代表一种情绪，从放松到战胜焦虑，每个岛屿都能带来深刻的体验。",
      feature2Title: "金蛋挑战",
      feature2Description: "解锁金蛋，回答启发性问题，获得情绪宝石和奖励，帮助你恢复平衡。",
      feature3Title: "追踪情绪成长",
      feature3Description: "收集情绪宝石，达成个人情绪目标。追踪你的进展，反思自己的成长。",
      howItWorksTitle: "如何游戏",
      howItWorksDescription: "选择你的心情，探索岛屿，参与每日情绪挑战。每个岛屿都是情绪冒险的新步骤。",
      footerText: "© 2024 情绪探险。版权所有。"
    }
  };

  // Apply translations based on selected language
  const currentLang = translations[lang];
  
  document.getElementById('hero-title').textContent = currentLang.title;
  document.getElementById('hero-subtitle').textContent = currentLang.subtitle;
  document.getElementById('hero-description').textContent = currentLang.description;
  document.getElementById('start-button').textContent = currentLang.startButton;
  
  document.getElementById('features-title').textContent = currentLang.featuresTitle;
  document.getElementById('feature-1-title').textContent = currentLang.feature1Title;
  document.getElementById('feature-1-description').textContent = currentLang.feature1Description;
  document.getElementById('feature-2-title').textContent = currentLang.feature2Title;
  document.getElementById('feature-2-description').textContent = currentLang.feature2Description;
  document.getElementById('feature-3-title').textContent = currentLang.feature3Title;
  document.getElementById('feature-3-description').textContent = currentLang.feature3Description;
  
  document.getElementById('how-it-works-title').textContent = currentLang.howItWorksTitle;
  document.getElementById('how-it-works-description').textContent = currentLang.howItWorksDescription;
  
  document.getElementById('footer-text').innerHTML = currentLang.footerText;
}


// Redirect user to language-specific game page
function redirectToLanguagePage() {
  const lang = document.getElementById('language-selector').value;

  // Define language-specific URLs
  const languageUrls = {
    en: "/en/game",
    zh: "/zh/game",
    fr: "/fr/game",
    // Add more languages as needed
  };

  // Redirect to the corresponding page
  if (languageUrls[lang]) {
    window.location.href = languageUrls[lang];
  } else {
    console.error("Language URL not defined for selected language.");
  }
}

