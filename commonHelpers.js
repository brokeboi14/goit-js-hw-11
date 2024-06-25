import{i as c,S as d}from"./assets/vendor-8c59ed88.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function e(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=e(t);fetch(t.href,o)}})();const f="44599145-181f37b758d0f90a33e2c7ba6",u="https://pixabay.com/api/";async function m(i){const r=`${u}?key=${f}&q=${encodeURIComponent(i)}&image_type=photo&orientation=horizontal&safesearch=true`,e=await fetch(r);if(!e.ok)throw new Error("Failed to fetch images");return(await e.json()).hits}function y(i){const r=document.getElementById("gallery");r.innerHTML=i.map(e=>`
        <li class="gallery-item">
        <a href="${e.largeImageURL}" class="gallery-link">
            <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}" />
            </a>
            <div class="info">
                <div class="image-info">
                <b>Likes</b>
                <p>${e.likes}</p>
                </div>
                <div class="image-info">
                <b>Views</b>
                <p>${e.views}</p>
                </div>
                <div class="image-info">
                <b>Comments</b>
                <p>${e.comments}</p>
                </div>
                <div class="image-info">
                <b>Downloads</b>
                <p>${e.downloads}</p>
                </div>
            </div>
        </a>
        </li>
    `).join("")}function l(i,r="info"){c[r]({message:i,position:"topRight"})}function p(){document.getElementById("loader").style.display="block"}function g(){document.getElementById("loader").style.display="none"}let n;document.getElementById("search-form").addEventListener("submit",async i=>{i.preventDefault();const r=document.getElementById("query").value.trim();if(r===""){l("Please enter a search term","warning");return}p();try{const e=await m(r);e.length===0?l("Sorry, there are no images matching your search query. Please try again!","error"):(y(e),n&&n.destroy(),n=new d(".gallery a"),n.refresh())}catch{l("An error occurred while fetching images","error")}finally{g()}});
//# sourceMappingURL=commonHelpers.js.map
