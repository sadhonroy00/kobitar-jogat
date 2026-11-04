document.addEventListener("DOMContentLoaded", async()=>{
 const host=document.getElementById("workDetail"), params=new URLSearchParams(location.search), type=params.get("type"), id=params.get("id");
 async function render(){
  try{
   const data=await KJ.works(); const item=(data[type]||[]).find(w=>w.id===id);
   if(!item){host.innerHTML=`<section class="page-intro"><h1>${KJ.t("notFound")}</h1><a class="text-link" href="./">${KJ.t("back")}</a></section>`;return;}
   document.title=KJ.text(item.title)+" | কবিতার জগৎ";
   const text=KJ.text(item.content).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
   host.innerHTML=`<a class="back-link" href="${type==="poem"?"poems/":"stories/"}">${KJ.t("back")}</a><section class="detail-hero ${item.theme||""}"><span class="tag">${KJ.t(type==="poem"?"navPoems":"navStories")}</span><h1>${KJ.text(item.title)}</h1><p>${KJ.text(item.description)}</p><small>${KJ.t("author")}: ${KJ.text(item.author)}</small></section><section class="detail-layout"><article class="original-text"><p class="eyebrow">${KJ.t("readText")}</p><h2>${KJ.text(item.title)}</h2><pre>${text}</pre></article><aside class="experience-panel"><div class="experience-art"><div class="moon"></div><div class="firefly f1"></div><div class="firefly f2"></div></div><h2>${KJ.t("experience")}</h2><p>${KJ.t("comingSoon")}</p><span class="tag">${KJ.t("prototype")}</span></aside></section>${item.scenes?.length?`<section class="scene-section"><p class="eyebrow">${KJ.t("scenePlan")}</p><div class="scene-list">${item.scenes.map((s,i)=>`<div class="scene-item"><span>${String(i+1).padStart(2,"0")}</span><b>${KJ.lang==="bn"?s:(["Moon above the bamboo grove","The silent room","The doll's wedding","Shiuli flowers and the bulbul","The night returns"][i]||s)}</b></div>`).join("")}</div></section>`:""}`;
  }catch(e){host.innerHTML='<p class="muted">কনটেন্ট লোড করা যায়নি।</p>';}
 }
 await render(); window.addEventListener("kj-language-change",render);
});