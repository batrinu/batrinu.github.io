(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();const m="Au9LWOJrwCz6m3MZdlLxwGr1PRXpM7XGPXWWMrbYSZ3LjiPKDej28s3zp6QmmMiC",g={version:"1.0",elements:{mapElement:{labelVisible:!0},areaPolygon:{fillColor:"#FAEDCD"},waterPolygon:{fillColor:"#00B4D8"},tollRoad:{strokeColor:"#F77F00"},arterialRoad:{strokeColor:"#D62828"},road:{fillColor:"#FFE5D9",strokeColor:"#6D6875"},street:{fillColor:"#FFB4A2",strokeColor:"#E5989B"},structure:{fillColor:"#B5838D",strokeColor:"#6D6875"},vegetation:{fillColor:"#A7C957"}},settings:{landColor:"#D4A373"}};function y(){return new Promise((e,a)=>{const t=document.createElement("script");t.src=`https://www.bing.com/api/maps/mapcontrol?callback=bingMapsLoaded&key=${m}`,t.async=!0,t.defer=!0,t.onerror=()=>a(new Error("Bing Maps script failed to load.")),document.body.appendChild(t),window.bingMapsLoaded=e})}function h(e,a,t){return new Microsoft.Maps.Map(e,{center:new Microsoft.Maps.Location(a,t),zoom:10,credentials:"Au9LWOJrwCz6m3MZdlLxwGr1PRXpM7XGPXWWMrbYSZ3LjiPKDej28s3zp6QmmMiC",customMapStyle:g})}function w(){return new Promise((e,a)=>{navigator.geolocation.getCurrentPosition(e,a)})}function u(e,a,t){const o=new Microsoft.Maps.Location(a,t),s=new Microsoft.Maps.Pushpin(o,{color:"blue"});e.entities.push(s)}async function M(){return(await(await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(`
      [out:json][timeout:25];
      area["ISO3166-1"="RO"]->.searchArea;
      (
        node["amenity"="toilets"](area.searchArea);
        node["amenity"="fuel"](area.searchArea);
      );
      out body;
    `)}`)).json()).elements.map(o=>({lat:o.lat,lon:o.lon,amenity:o.tags.amenity,tags:{opening_hours:o.tags.opening_hours,wheelchair:o.tags.wheelchair,baby_change:o.tags.baby_change,"toilets:disposal":o.tags["toilets:disposal"],access:o.tags.access,fee:o.tags.fee,brand:o.tags.brand||o.tags.operator}}))}function b(e){let a="";const t={wheelchair:'<i class="fas fa-wheelchair"></i>',fee:'<i class="fas fa-dollar-sign"></i>',access:'<i class="fas fa-universal-access"></i>',"toilets:disposal":'<i class="fas fa-water"></i>',"toilets:position":'<i class="fas fa-map-marker-alt"></i>',opening_hours:'<i class="fas fa-clock"></i>',baby_change:'<i class="fas fa-baby"></i>',brand:'<i class="fas fa-gas-pump"></i>'};for(const[o,s]of Object.entries(e))if(s){const n=t[o]||'<i class="fas fa-tag"></i>',i=o.replace(/_/g," ");a+=`
          <div class="tag">
            ${n} <strong>${i}:</strong> ${s}
          </div>`}return`<div class="dialog-footer">${a}</div>`}async function L(e,a,t){const o=document.getElementById("modal-dialog"),s=o.querySelector(".modal-body"),n=`
      <a 
        href="https://www.google.com/maps/dir/?api=1&destination=${a},${t}" 
        target="_blank" 
        class="directions-button">
        Get Directions
      </a>
    `;s.innerHTML=e+n,o.style.display="block"}function p(){const e=document.getElementById("modal-dialog");e.style.display="none"}function C(){document.querySelector(".close-button").addEventListener("click",p),window.addEventListener("click",a=>{const t=document.getElementById("modal-dialog");a.target===t&&p()})}function v(){const e=document.getElementById("loading-overlay");e.style.display="flex"}function P(){const e=document.getElementById("loading-overlay");e.style.display="none"}function r(e,a){const t=document.querySelector(".progress-fill"),o=document.getElementById("loading-status");t.style.width=`${e}%`,o.textContent=a}async function E(e){v(),r(30,"Loading map..."),await new Promise(t=>setTimeout(t,1e3)),r(60,"Loading public restrooms and gas stations...");const a=await M();r(90,"Placing markers..."),C(),a.forEach(({lat:t,lon:o,amenity:s,tags:n})=>{const i=new Microsoft.Maps.Location(t,o);let l="blue";s==="fuel"&&(l="green");const d=new Microsoft.Maps.Pushpin(i,{color:l});Microsoft.Maps.Events.addHandler(d,"click",()=>{const f=`
          <h3>${s==="fuel"?"LuluPeco":"LuluPipi"}</h3>
          ${n?b(n):"<p>No additional information available</p>"}
        `;L(f,t,o)}),e.entities.push(d)}),r(100,"Complete!"),setTimeout(P,500)}async function B(e){await E(e)}const c={latitude:44.4268,longitude:26.1025},D=document.getElementById("map");async function A(){try{await y();const e=h(D,c.latitude,c.longitude);try{const a=await w(),{latitude:t,longitude:o}=a.coords;e.setView({center:new Microsoft.Maps.Location(t,o),zoom:12}),u(e,t,o)}catch{console.log("Geolocation not available. Using default location."),u(e,c.latitude,c.longitude)}await B(e)}catch(e){console.error("Error loading map:",e)}}A();
