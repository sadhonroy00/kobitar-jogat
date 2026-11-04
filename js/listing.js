document.addEventListener("DOMContentLoaded", async()=>{
 const host=document.getElementById("workList"), input=document.getElementById("searchInput"), count=document.getElementById("resultCount");
 if(!host) return;
 let works=[];
 try{const data=await KJ.works(); works=data[document.body.dataset.section]||[];}catch(e){host.innerHTML='<p class="muted">কনটেন্ট লোড করা যায়নি।</p>';return;}
 function render(){
  const q=(input.value||"").trim().toLowerCase();
  const filtered=works.filter(w=>[KJ.text(w.title),KJ.text(w.author),KJ.text(w.description),w.id].join(" ").toLowerCase().includes(q));
  count.textContent=filtered.length+"";
  host.innerHTML=filtered.length?filtered.map(w=>`<a class="work-card" href="../work.html?type=${encodeURIComponent(w.type)}&id=${encodeURIComponent(w.id)}"><div class="work-art ${w.theme||"default-art"}"><span>${w.type==="poem"?"✧":"❧"}</span></div><div class="work-card-copy"><span class="tag">${KJ.t(w.type==="poem"?"navPoems":"navStories")}</span><h3>${KJ.text(w.title)}</h3><p>${KJ.text(w.description)}</p><span class="text-link">${KJ.t("openWork")}</span></div></a>`).join(""):`<p class="muted">কোনো রচনা পাওয়া যায়নি।</p>`;
 }
 input.addEventListener("input",render); await render(); window.addEventListener("kj-language-change",render);
});