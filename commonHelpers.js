import{S as f,i as m,a as h}from"./assets/vendor-89feecc5.js";(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const y=document.querySelector(".form"),c=document.querySelector(".gallery"),u=document.querySelector(".loader"),n=document.querySelector(".btn-load-more");document.querySelector(".gallery img");n.style.display="none";u.style.display="none";let i=1,d=0;const g=new f(".gallery a",{captionDelay:250,captionsData:"alt"});y.addEventListener("submit",async o=>{o.preventDefault();const l=o.currentTarget.elements.query.value.trim();i=1;try{const{hits:s,totalHits:r}=await p(l,i);if(s.length===0){c.innerHTML="",m.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});return}c.innerHTML="";const e=s.map(a=>`<li class="gallery-item">
                <a class="gallery-link" href="${a.largeImageURL}">
                    <img
                        class="gallery-image"
                        src="${a.webformatURL}"
                        alt="${a.tags}"
                    />
                    <ul class="list">
                        <li class="list-item"><h3>likes</h3><span>${a.likes}</span></li>
                        <li class="list-item"><h3>views</h3><span>${a.views}</span></li>
                        <li class="list-item"><h3>comments</h3><span>${a.comments}</span></li>
                        <li class="list-item"><h3>downloads</h3><span>${a.downloads}</span></li>
                    </ul>
                </a>
            </li>`).join("");c.insertAdjacentHTML("beforeend",e);const t=document.querySelector(".gallery-item");t&&(d=t.getBoundingClientRect().height),g.refresh(),r<=40?n.style.display="none":n.style.display="block"}catch{m.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"})}});n.addEventListener("click",async()=>{i++;try{const o=y.elements.query.value.trim(),l=await p(o,i),s=l.hits.map(r=>`<li class="gallery-item">
                <a class="gallery-link" href="${r.largeImageURL}">
                    <img
                        class="gallery-image"
                        src="${r.webformatURL}"
                        alt="${r.tags}"
                    />
                    <ul class="list">
                        <li class="list-item"><h3>likes</h3><span>${r.likes}</span></li>
                        <li class="list-item"><h3>views</h3><span>${r.views}</span></li>
                        <li class="list-item"><h3>comments</h3><span>${r.comments}</span></li>
                        <li class="list-item"><h3>downloads</h3><span>${r.downloads}</span></li>
                    </ul>
                </a>
            </li>`).join("");c.insertAdjacentHTML("beforeend",s),g.refresh(),l.totalHits<=i*40&&(m.info({title:"",message:"We are sorry, but you have reached the end of search results."}),n.style.display="none"),page!==1&&scrollGallery(),window.scrollBy({top:d*2,behavior:"smooth"})}catch{m.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"})}});async function p(o,l){u.style.display="block";try{const s=await h.get(`https://pixabay.com/api/?key=41717891-03a798ff6847d2641a93432cc&q=${encodeURIComponent(o)}&image_type=photo&orientation=horizontal&safesearch=true&page=${l}&per_page=40`);return{hits:s.data.hits,totalHits:s.data.totalHits}}catch(s){throw new Error(s.response.status)}finally{u.style.display="none"}}
//# sourceMappingURL=commonHelpers.js.map
