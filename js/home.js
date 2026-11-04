document.addEventListener("DOMContentLoaded", async()=>{
  const host=document.getElementById("featuredWorks"); if(!host) return;
  async function render(){
    try{
      const data=await KJ.works(); const all=[...data.poems,...data.stories].filter(x=>x.featured);
      host.innerHTML=all.length?all.map(w=>`<a class="work-card" href="work.html?type=${encodeURIComponent(w.type)}&id=${encodeURIComponent(w.id)}"><div class="work-art ${w.theme||"default-art"}"><span>${w.type==="poem"?"✧":"❧"}</span></div><div class="work-card-copy"><span class="tag">${w.type==="poem"?KJ.t("navPoems"):KJ.t("navStories")}</span><h3>${KJ.text(w.title)}</h3><p>${KJ.text(w.description)}</p><span class="text-link">${KJ.t("openWork")}</span></div></a>`).join(""):`<p class="muted">এখনো কোনো নির্বাচিত রচনা নেই।</p>`;
    }catch(e){host.innerHTML='<p class="muted">কনটেন্ট লোড করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করুন।</p>';}
  }
  await render(); window.addEventListener("kj-language-change",render);
});