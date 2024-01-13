import{S as m,i as c}from"./assets/vendor-46aac873.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const u=document.querySelector(".form"),i=document.querySelector(".gallery"),l=document.querySelector(".loader");l.style.display="none";const f=new m(".gallery a",{captionDelay:250,captionsData:"alt"});u.addEventListener("submit",s=>{s.preventDefault();const r=s.currentTarget.elements.query.value.trim();y(r).then(o=>{if(o.hits.length===0){i.innerHTML="",c.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});return}i.innerHTML="";const n=o.hits.map(e=>`<li class="gallery-item">
                <a class="gallery-link" href="${e.largeImageURL}">
                    <img
                        class="gallery-image"
                        src="${e.webformatURL}"
                        alt="${e.tags}"
                    />
                    <ul class="list">
                        <li class="list-item"><h3>likes</h3><span>${e.likes}</span></li>
                        <li class="list-item"><h3>views</h3><span>${e.views}</span></li>
                        <li class="list-item"><h3>comments</h3><span>${e.comments}</span></li>
                        <li class="list-item"><h3>downloads</h3><span>${e.downloads}</span></li>
                    </ul>
                </a>
            </li>`).join("");i.insertAdjacentHTML("beforeend",n),f.refresh()}).catch(o=>{c.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"})})});const y=s=>(l.style.display="block",fetch(`https://pixabay.com/api/?key=41717891-03a798ff6847d2641a93432cc&q=${encodeURIComponent(s)}&image_type=photo&orientation=horizontal&safesearch=true`).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()}).finally(()=>{l.style.display="none"}));
//# sourceMappingURL=commonHelpers.js.map
