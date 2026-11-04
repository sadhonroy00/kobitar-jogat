(() => {
  const translations = {
    bn: {brand:"কবিতার জগৎ",navHome:"হোম",navPoems:"কবিতা",navStories:"গল্প",eyebrow:"শব্দ • অনুভূতি • কল্পনা",heroTitle:"প্রতিটি শব্দের আছে<br><em>একটি পৃথিবী।</em>",heroText:"কবিতা ও গল্পকে শুধু পড়া নয়—তাদের অনুভব করুন জীবন্ত দৃশ্যের ভেতর দিয়ে।",explorePoems:"কবিতা আবিষ্কার করুন",exploreStories:"গল্প পড়ুন →",heroCaption:"একটি কবিতা। অসংখ্য অনুভূতি।",startJourney:"আপনার যাত্রা শুরু হোক",browseTitle:"কী পড়তে চান আজ?",poemsTitle:"কবিতার জগৎ",poemsDesc:"ছন্দ, স্মৃতি আর অনুভূতির সংগ্রহ।",storiesTitle:"গল্পের জগৎ",storiesDesc:"চরিত্র, কল্পনা আর অজানা পথের গল্প।",featured:"নির্বাচিত রচনা",featuredTitle:"প্রথম যাত্রা",seeAll:"সব দেখুন →",footer:"শব্দের আড়ালে লুকিয়ে থাকা পৃথিবী।",poemLibrary:"সাহিত্য লাইব্রেরি",poemHeading:"কবিতার সংগ্রহ",poemIntro:"প্রতিটি কবিতা খুলে দেবে এক একটি অনুভূতির দরজা।",storyLibrary:"সাহিত্য লাইব্রেরি",storyHeading:"গল্পের সংগ্রহ",storyIntro:"প্রতিটি গল্পে অপেক্ষা করছে নতুন এক পৃথিবী।",searchPoem:"কবিতা খুঁজুন…",searchStory:"গল্প খুঁজুন…",openWork:"রচনাটি দেখুন →",author:"লেখক",back:"← ফিরে যান",experience:"অ্যানিমেটেড অভিজ্ঞতা",prototype:"প্রাথমিক সংস্করণ",comingSoon:"অ্যানিমেশন নির্মাণাধীন",notFound:"রচনাটি পাওয়া যায়নি।",readText:"মূল লেখা",scenePlan:"দৃশ্য পরিকল্পনা"},
    en: {brand:"Kobitar Jogot",navHome:"Home",navPoems:"Poems",navStories:"Stories",eyebrow:"WORDS • FEELINGS • IMAGINATION",heroTitle:"Every word holds<br><em>a world.</em>",heroText:"Don't just read poems and stories—experience them through living scenes.",explorePoems:"Explore poems",exploreStories:"Read stories →",heroCaption:"One poem. Endless feelings.",startJourney:"Begin your journey",browseTitle:"What would you like to explore?",poemsTitle:"World of Poems",poemsDesc:"A collection of rhythm, memories and feelings.",storiesTitle:"World of Stories",storiesDesc:"Tales of characters, imagination and discovery.",featured:"FEATURED WORK",featuredTitle:"The first journey",seeAll:"View all →",footer:"A world hidden behind words.",poemLibrary:"LITERARY LIBRARY",poemHeading:"Poem Collection",poemIntro:"Every poem opens a door to a different feeling.",storyLibrary:"LITERARY LIBRARY",storyHeading:"Story Collection",storyIntro:"A new world is waiting inside every story.",searchPoem:"Search poems…",searchStory:"Search stories…",openWork:"Explore this work →",author:"Author",back:"← Go back",experience:"Animated experience",prototype:"Early prototype",comingSoon:"Animation in development",notFound:"This work could not be found.",readText:"Original text",scenePlan:"Scene plan"}
  };
  const saved = localStorage.getItem("kj-language");
  window.KJ = {
    lang: saved || "bn",
    t(key){ return (translations[this.lang] && translations[this.lang][key]) || translations.bn[key] || key; },
    text(value){ if (value && typeof value === "object") return value[this.lang] || value.bn || value.en || ""; return value || ""; },
    async works(){ const r=await fetch((document.body.dataset.section ? "../" : "")+"data/works.json"); if(!r.ok) throw new Error("Content could not load"); return r.json(); },
    setLang(lang){ this.lang=lang; localStorage.setItem("kj-language",lang); this.applyLanguage(); window.dispatchEvent(new Event("kj-language-change")); },
    applyLanguage(){
      document.documentElement.lang=this.lang;
      document.querySelectorAll("[data-i18n]").forEach(el=>{ const v=this.t(el.dataset.i18n); el.innerHTML=v; });
      const btn=document.getElementById("languageToggle"); if(btn) btn.textContent=this.lang==="bn"?"EN":"বাংলা";
      const search=document.getElementById("searchInput"); if(search) search.placeholder=this.t(document.body.dataset.section==="stories"?"searchStory":"searchPoem");
    }
  };
  document.addEventListener("DOMContentLoaded",()=>{
    KJ.applyLanguage();
    const btn=document.getElementById("languageToggle");
    if(btn) btn.addEventListener("click",()=>KJ.setLang(KJ.lang==="bn"?"en":"bn"));
    const year=document.getElementById("year"); if(year) year.textContent=new Date().getFullYear();
  });
})();
