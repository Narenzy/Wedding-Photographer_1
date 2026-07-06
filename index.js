import{A as n,a as c,S as d,N as l,P as f,K as u,b as p}from"./assets/vendor-DJ1WHZIc.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();new n(".faq-list",{duration:400,showMultiple:!1});const b="https://wedding-photographer.b.goit.study/api";async function y(){return(await c.get(`${b}/feedbacks`)).data}async function m(){const s=document.querySelector(".feedbacks-list");if(s)try{const a=(await y()).feedbacks;s.innerHTML=a.map(({name:o,descr:e})=>`
        <li class="feedbacks-card swiper-slide">
          <blockquote class="feedbacks-quote">
            <p class="feedbacks-comment">"${e}"</p>
            <cite class="feedbacks-author">${o}</cite>
          </blockquote>
        </li>
      `).join(""),g()}catch(r){console.error("Failed to load feedbacks:",r)}}function g(){new d(".feedbacks-slider",{modules:[l,f,u,p],slidesPerView:"auto",spaceBetween:24,keyboard:{enabled:!0,onlyInViewport:!0},a11y:!0,navigation:{nextEl:".feedbacks-btn-next",prevEl:".feedbacks-btn-prev",disabledClass:"feedbacks-btn-disabled"},pagination:{el:".feedbacks-pagination",clickable:!0}})}m();
//# sourceMappingURL=index.js.map
