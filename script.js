if ("scrollRestoration" in history) {
 history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);
const RSVP_API_URL =
"https://script.google.com/macros/s/AKfycbxhHiaBSEXTNcD7l4WsXxokDIPDNjEFrQ9mtpi3B7zyIZnEBB4Xq4HkpRAkRvhYUxdWbw/exec";
const opening = document.getElementById("opening");
const openingHint = document.querySelector(".opening-hint");
const hero = document.getElementById("hero");
window.addEventListener("pageshow", () => {
 window.scrollTo(0, 0);
 document.documentElement.scrollTop = 0;
 document.body.scrollTop = 0;
 document.querySelectorAll(".section-inner.is-visible")
   .forEach(element => {
     element.classList.remove("is-visible");
   });
 document.querySelectorAll(".fate-section.is-visible")
   .forEach(element => {
     element.classList.remove("is-visible");
   });
 opening.classList.remove("is-open");
 opening.style.display = "";
 hero.classList.remove("hero-visible");
 document.body.classList.add("no-scroll");
});
function openDoors() {
    // 一定先回到最上面
   window.scrollTo({
       top: 0,
       behavior: "auto"
   });
   openingHint.style.display = "none";
   opening.classList.add("is-open");
   hero.classList.add("hero-visible");
   setTimeout(() => {
       opening.style.display = "none";
       // 門打開後才允許滑動
       document.body.classList.remove("no-scroll");
   }, 1450);
}
opening.addEventListener("click", openDoors);
const weddingDate = new Date("2027-03-06T10:00:00+08:00");
const daysElement = document.getElementById("countdown-days");
const hoursElement = document.getElementById("countdown-hours");
const minutesElement = document.getElementById("countdown-minutes");
const secondsElement = document.getElementById("countdown-seconds");
function updateCountdown() {
   if (
       !daysElement ||
       !hoursElement ||
       !minutesElement ||
       !secondsElement
   ) {
       console.error("Countdown elements were not found.");
       return;
   }
   const difference = weddingDate.getTime() - Date.now();
   if (difference <= 0) {
       daysElement.textContent = "000";
       hoursElement.textContent = "00";
       minutesElement.textContent = "00";
       secondsElement.textContent = "00";
       return;
   }
   const days = Math.floor(difference / (1000 * 60 * 60 * 24));
   const hours = Math.floor(
       (difference / (1000 * 60 * 60)) % 24
   );
   const minutes = Math.floor(
       (difference / (1000 * 60)) % 60
   );
   const seconds = Math.floor(
       (difference / 1000) % 60
   );
   daysElement.textContent = String(days).padStart(3, "0");
   hoursElement.textContent = String(hours).padStart(2, "0");
   minutesElement.textContent = String(minutes).padStart(2, "0");
   secondsElement.textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);
/* =========================
  背景隨機小光點
========================= */
function createBackgroundSparkle() {
    // 開門前不產生光點
   if (!hero.classList.contains("hero-visible")) {
       return;
   }
   const sparkle = document.createElement("span");
   sparkle.classList.add("sparkle");
   // 隨機出現在畫面中
   let x, y;
do {
   x = Math.random() * 100;
   y = Math.random() * 100;
} while (
   x > 35 && x < 65 &&
   y > 25 && y < 70
);
sparkle.style.left = `${x}vw`;
sparkle.style.top  = `${y}vh`;
   // 每顆大小稍微不同
   const r = Math.random();
   let size;
   if (r < 0.75) {
   size = Math.random() * 2 + 1.5;      // 小光點
} else if (r < 0.97) {
   size = Math.random() * 2 + 3.5;        // 中光點
} else {
   size = Math.random() * 2 + 5.5;        // 少數大光球
}
   sparkle.style.width = `${size}px`;
   sparkle.style.height = `${size}px`;
   // 每顆動畫速度稍微不同
   sparkle.style.animationDuration =
       `${Math.random() * 2 + 2.5}s`;
   document.querySelector("#hero").appendChild(sparkle);
   setTimeout(() => {
       sparkle.remove();
   }, 5000);
}
// 每 280 毫秒產生一顆
setInterval(createBackgroundSparkle, 280);

/* =========================
  點擊出現囍和小光點
========================= */
function createClickEffect(event) {
   // 開門前不觸發
   if (!hero.classList.contains("hero-visible")) {
       return;
   }
   const x = event.clientX;
   const y = event.clientY;
   // 每次隨機出現 2 或 3 個囍
   const xiCount = Math.floor(Math.random() * 2) + 2;
   for (let i = 0; i < xiCount; i++) {
       const xi = document.createElement("span");
       xi.classList.add("click-xi");
       xi.textContent = "囍";
       // 每個囍不要完全重疊
       const offsetX = Math.random() * 50 - 25;
       const offsetY = Math.random() * 40 - 20;
       xi.style.left = `${x + offsetX}px`;
       xi.style.top = `${y + offsetY}px`;
       // 每個囍大小不同
       const size = Math.random() * 6 + 14;
       xi.style.fontSize = `${size}px`;
       // 每個囍稍微錯開出現
       xi.style.animationDelay = `${i * 0.08}s`;
       const xiMoveX = Math.random() * 50 - 25;
       const xiMoveY = -(Math.random() * 35 + 20);
       const xiRotate = Math.random() * 20 - 10;
       xi.style.setProperty("--xi-x", `${xiMoveX}px`);
       xi.style.setProperty("--xi-y", `${xiMoveY}px`);
       xi.style.setProperty("--xi-rotate", `${xiRotate}deg`);
       document.body.appendChild(xi);
       setTimeout(() => {
           xi.remove();
       }, 1400);
   }
   // 點擊周圍的大光點
   for (let i = 0; i < 14; i++) {
       const dot = document.createElement("span");
       dot.classList.add("click-sparkle");
       dot.style.left = `${x}px`;
       dot.style.top = `${y}px`;
       const angle = Math.random() * Math.PI * 2;
       const distance = Math.random() * 55 + 25;
       const moveX = Math.cos(angle) * distance;
       const moveY = Math.sin(angle) * distance;
       dot.style.setProperty("--move-x", `${moveX}px`);
       dot.style.setProperty("--move-y", `${moveY}px`);
       // 4–8px
       const size = Math.random() * 4 + 4;
       dot.style.width = `${size}px`;
       dot.style.height = `${size}px`;
       // 不要所有光點同時消失
       dot.style.animationDuration =
           `${Math.random() * 0.4 + 0.8}s`;
       document.body.appendChild(dot);
       setTimeout(() => {
           dot.remove();
       }, 1400);
   }
}
document.addEventListener("click", createClickEffect);
const scrollHint = document.getElementById("scrollHint");
scrollHint?.addEventListener("click", () => {
   document.getElementById("invitation")
       ?.scrollIntoView({
           behavior: "smooth"
       });
});
const observer = new IntersectionObserver(
 (entries, observer) => {
   entries.forEach(entry => {
     if (entry.isIntersecting) {
       entry.target.classList.add("is-visible");
       // 動畫只播放一次
       observer.unobserve(entry.target);
     }
   });
 },
 {
   threshold: 0.55,
   rootMargin: "0px 0px -8% 0px"
 }
);
document.querySelectorAll(".section-inner").forEach(section => {
 observer.observe(section);
});
/* =========================
  Hero Parallax
========================= */
let parallaxTicking = false;
function updateHeroParallax() {
   const heroHeight = hero.offsetHeight;
   const scrollY = window.scrollY;
   // 只在 Hero 附近計算
   if (scrollY <= heroHeight) {
       const moveY = Math.min(scrollY * 0.07, 45);
       const heroPhoto = document.querySelector(".hero-photo");
       heroPhoto?.style.setProperty(
           "--parallax-y",
           `${moveY}px`
       );
   }
   parallaxTicking = false;
}
window.addEventListener(
   "scroll",
   () => {
       if (!parallaxTicking) {
           requestAnimationFrame(updateHeroParallax);
           parallaxTicking = true;
       }
   },
   { passive: true }
);
/* =========================
  Fate Section + Chapter Animation
========================= */
const fateSection = document.querySelector(".fate-section");
const fateDates = [...document.querySelectorAll(".fate-date")];
let fateCycleActive = false;
let introFinished = false;
let currentChapter = 0;
let chapterPlaying = false;
let introTimer = null;
let chapterTimer = null;
let lastScrollY = window.scrollY;
let fateScrollTicking = false;
function resetFateAnimation() {
    clearTimeout(introTimer);
    clearTimeout(chapterTimer);
    introTimer = null;
    chapterTimer = null;
    fateCycleActive = false;
    introFinished = false;
    currentChapter = 0;
    chapterPlaying = false;
    fateSection?.classList.remove("is-visible");
    fateDates.forEach(date => {
        const textGroup = date.nextElementSibling;
        date.classList.remove("chapter-visible");
        textGroup?.classList.remove("chapter-visible");
    });
}
function startFateAnimation() {
    if (!fateSection || fateCycleActive) return;
    fateCycleActive = true;
    introFinished = false;
    currentChapter = 0;
    chapterPlaying = false;
    /*
    先確保 class 已移除，再重新加入，
    讓「緣」和種子的 CSS 動畫能夠重播。
    */
    fateSection.classList.remove("is-visible");
    void fateSection.offsetWidth;
    fateSection.classList.add("is-visible");
    introTimer = setTimeout(() => {
        introFinished = true;
        introTimer = null;
        revealNextChapter();
    }, 2300);
}
function revealNextChapter() {
    if (!fateCycleActive) return;
    if (!introFinished) return;
    if (chapterPlaying) return;
    if (currentChapter >= fateDates.length) return;
    const date = fateDates[currentChapter];
    const triggerPosition = window.innerHeight * 0.82;
    /*
    還沒滑到目前這一章，就先不顯示。
    */
    if (date.getBoundingClientRect().top > triggerPosition) {
        return;
    }
    const textGroup = date.nextElementSibling;
    chapterPlaying = true;
    date.classList.add("chapter-visible");
    textGroup?.classList.add("chapter-visible");
    currentChapter++;
    chapterTimer = setTimeout(() => {
        chapterPlaying = false;
        chapterTimer = null;
        revealNextChapter();
    }, 1800);
}
function updateFateAnimation() {
    if (!fateSection) return;
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY >= lastScrollY;
    const fateRect = fateSection.getBoundingClientRect();
    /*
    往上滑時，只要 Fate 頂端回到畫面約 30% 以下，
    就完整重設，不需要等整個 Fate section 離開畫面。
    */
    if (
        fateCycleActive &&
        !scrollingDown &&
        fateRect.top > window.innerHeight * 0.30
    ) {
        resetFateAnimation();
        lastScrollY = currentScrollY;
        return;
    }
    /*
    往下滑，Fate 頂端進入畫面約 72% 的位置時開始。
    */
    if (
        !fateCycleActive &&
        scrollingDown &&
        fateRect.top <= window.innerHeight * 0.72 &&
        fateRect.bottom > 0
    ) {
        startFateAnimation();
    }
    revealNextChapter();
    lastScrollY = currentScrollY;
}
window.addEventListener(
    "scroll",
    () => {
        if (!fateScrollTicking) {
            requestAnimationFrame(() => {
                updateFateAnimation();
                fateScrollTicking = false;
            });
            fateScrollTicking = true;
        }
    },
    { passive: true }
);
window.addEventListener("resize", updateFateAnimation);
window.addEventListener("pageshow", () => {
    resetFateAnimation();
    lastScrollY = window.scrollY;
});
const gallerySlider = document.getElementById("gallerySlider");
const galleryDots = [...document.querySelectorAll(".gallery-dot")];
const gallerySlides = [...document.querySelectorAll(".gallery-slide")];
function updateGalleryDots(){
    const sliderCenter = gallerySlider.scrollLeft + gallerySlider.clientWidth / 2;
    let activeIndex = 0;
    let closestDistance = Infinity;
    gallerySlides.forEach((slide,index) => {
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const distance = Math.abs(sliderCenter - slideCenter);
        if(distance < closestDistance){
            closestDistance = distance;
            activeIndex = index;
        }
    });
    galleryDots.forEach((dot,index) => {
        dot.classList.toggle("is-active",index === activeIndex);
    });
    galleryDots.forEach((dot,index) => {
    dot.classList.toggle("is-active",index === activeIndex);
});
}
gallerySlider.addEventListener("scroll",updateGalleryDots,{passive:true});
galleryDots.forEach((dot,index) => {
    dot.addEventListener("click",() => {
        gallerySlides[index].scrollIntoView({
            behavior:"smooth",
            block:"nearest",
            inline:"center"
        });
    });
});
updateGalleryDots();
const gallerySectionForAnimation = document.querySelector(".gallery-section");
if(gallerySectionForAnimation){
    const galleryAnimationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting){
                entry.target.classList.add("is-visible");
            }else{
                entry.target.classList.remove("is-visible");
            }
        });
    },{
        threshold:0.12
    });
    galleryAnimationObserver.observe(gallerySectionForAnimation);    
}
const informationSection = document.querySelector(".information-section");
const transportationSection = document.querySelector(".transportation-section");

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
        } else {
            entry.target.classList.remove("is-visible");
        }
    });
}, {
    threshold: 0.12
});
if (informationSection) {
    sectionObserver.observe(informationSection);
}
if (transportationSection) {
    sectionObserver.observe(transportationSection);
}
let isDragging=false;
let startX=0;
let startScrollLeft=0;
gallerySlider.addEventListener("mousedown",(e)=>{
    isDragging=true;
    startX=e.clientX;
    startScrollLeft=gallerySlider.scrollLeft;
    gallerySlider.classList.add("dragging");
});
window.addEventListener("mousemove",(e)=>{
    if(!isDragging)return;
    e.preventDefault();
    gallerySlider.scrollLeft=startScrollLeft-(e.clientX-startX);
});
window.addEventListener("mouseup",()=>{
    if(!isDragging)return;
    isDragging=false;
    gallerySlider.classList.remove("dragging");
    updateGalleryDots();
});
gallerySlider.addEventListener("dragstart",(e)=>{
    e.preventDefault();
});
const googleCalendarBtn = document.getElementById("googleCalendarBtn");
if (googleCalendarBtn) {
    const start = "20270306T100000";
    const end = "20270306T140000";
    const title = encodeURIComponent("周思妤 & 林晉億 Wedding");
    const location = encodeURIComponent(
        "日月潭涵碧樓 The Lalu, Sun Moon Lake"
    );
    const details = encodeURIComponent(
        "Wedding Ceremony & Reception\n\n期待與您共度這美好的一天。"
    );
    googleCalendarBtn.href =
        `https://calendar.google.com/calendar/render?action=TEMPLATE` +
        `&text=${title}` +
        `&dates=${start}/${end}` +
        `&ctz=Asia/Taipei` +
        `&location=${location}` +
        `&details=${details}`;
}
const rsvpForm=document.getElementById("rsvpForm");
const attendanceFields=document.getElementById("attendanceFields");
const shuttleFields=document.getElementById("shuttleFields");
const addressFields=document.getElementById("addressFields");
const rsvpStatus=document.getElementById("rsvpStatus");
const receiver=document.getElementById("receiver");
const phone=document.getElementById("phone");
const address=document.getElementById("address");
const shuttleInputs=document.querySelectorAll('input[name="shuttle"]');
const counters={};
document.querySelectorAll("[data-counter]").forEach(counter=>{
const name=counter.dataset.counter;
const valueElement=counter.querySelector(".counter-value");
const hiddenInput=counter.querySelector('input[type="hidden"]');
const minusButton=counter.querySelector(".minus");
const plusButton=counter.querySelector(".plus");
const min=Number(counter.dataset.min);
let max=Number(counter.dataset.max);
let value=Number(hiddenInput.value);
const update=()=>{
value=Math.max(min,Math.min(value,max));
valueElement.textContent=value;
hiddenInput.value=value;
minusButton.disabled=value<=min;
plusButton.disabled=value>=max;
};
counters[name]={get value(){return value},setValue(newValue){value=newValue;update()},setMax(newMax){max=Math.max(min,newMax);update()}};
minusButton.addEventListener("click",()=>{if(value>min){value--;update();updateAttendanceLimits();}});
plusButton.addEventListener("click",()=>{if(value<max){value++;update();updateAttendanceLimits();}});
update();
});
function updateAttendanceLimits(){
const totalGuests=counters.adults.value+counters.children.value;
counters.vegetarian.setMax(totalGuests);
counters.childSeats.setMax(counters.children.value);
counters.shuttleGuests.setMax(totalGuests);
}
document.querySelectorAll('input[name="attendance"]').forEach(input=>{
input.addEventListener("change",()=>{
const attending=document.querySelector('input[name="attendance"]:checked')?.value==="yes";
attendanceFields.classList.toggle("is-visible",attending);
shuttleInputs.forEach(item=>item.required=attending);
if(!attending){
shuttleFields.classList.remove("is-visible");
shuttleInputs.forEach(item=>item.checked=false);
}
});
});
shuttleInputs.forEach(input=>{
input.addEventListener("change",()=>{
const needsShuttle=document.querySelector('input[name="shuttle"]:checked')?.value==="yes";
shuttleFields.classList.toggle("is-visible",needsShuttle);
if(needsShuttle&&counters.shuttleGuests.value<1)counters.shuttleGuests.setValue(1);
});
});
document.querySelectorAll('input[name="paperInvitation"]').forEach(input=>{
input.addEventListener("change",()=>{
const needsPaper=document.querySelector('input[name="paperInvitation"]:checked')?.value==="yes";
addressFields.classList.toggle("is-visible",needsPaper);
receiver.required=needsPaper;
phone.required=needsPaper;
address.required=needsPaper;
});
});
rsvpForm.addEventListener("submit",async event=>{
    event.preventDefault();
    const attendance=document.querySelector(
        'input[name="attendance"]:checked'
    )?.value;
    if(
        attendance==="yes" &&
        !document.querySelector('input[name="shuttle"]:checked')
    ){
        rsvpStatus.textContent="請選擇是否需要接駁。";
        return;
    }
    if(!rsvpForm.checkValidity()){
        rsvpForm.reportValidity();
        return;
    }
    const submitButton=rsvpForm.querySelector(".rsvp-submit");
    const rsvpContainer=document.querySelector(".rsvp-container");
    const rsvpFinish=document.getElementById("rsvpFinish");
    const finishText=document.getElementById("finishText");
    const finishSeed=document.querySelector(".finish-seed");
    const finishFooter=document.querySelector(".finish-footer");
    submitButton.disabled=true;
    submitButton.textContent="送出中…";
    rsvpStatus.textContent="";
    const formData=new FormData(rsvpForm);
        const payload={
        name:formData.get("name") || "",
        attendance:formData.get("attendance") || "",
        adults:formData.get("adults") || "0",
        children:formData.get("children") || "0",
        companions:formData.get("companions") || "",
        vegetarian:formData.get("vegetarian") || "0",
        childSeats:formData.get("childSeats") || "0",
        shuttle:formData.get("shuttle") || "",
        shuttleGuests:formData.get("shuttleGuests") || "0",
        paperInvitation:formData.get("paperInvitation") || "",
        receiver:formData.get("receiver") || "",
        phone:formData.get("phone") || "",
        address:formData.get("address") || "",
        requests:formData.get("requests") || ""
    };
    try{
        const response=await fetch(RSVP_API_URL,{
            method:"POST",
            headers:{
                "Content-Type":"text/plain;charset=utf-8"
            },
            body:JSON.stringify(payload),
            redirect:"follow"
        });
                if(!response.ok){
            throw new Error(`HTTP error: ${response.status}`);
        }
        const result=await response.json();
        if(!result.success){
            throw new Error(result.message || "RSVP submission failed.");
        }
        if(attendance==="yes"){
            finishText.innerHTML=`
                期待在那一天，<br>
                與您相見。
            `;
        }else{
            finishText.innerHTML=`
                感謝您的祝福，<br>
                期待未來與您相聚。
            `;
        }
        rsvpStatus.textContent="回覆已成功送出。";
        setTimeout(()=>{
            rsvpContainer.classList.add("is-leaving");
                    setTimeout(()=>{
                rsvpContainer.style.display="none";
                rsvpFinish.classList.remove("hidden");

                requestAnimationFrame(()=>{
                    rsvpFinish.classList.add("show");
                });

                setTimeout(()=>{
                    finishSeed.classList.add("drop");
                },700);

                setTimeout(()=>{
                    finishFooter.classList.add("show");
                },7000);
            },750);
        },700);
    }catch(error){
        console.error("RSVP submission error:",error);
        rsvpStatus.textContent=
            "送出失敗，請確認網路連線後再試一次。";

        submitButton.disabled=false;
        submitButton.textContent="回覆邀請";
    }
});
updateAttendanceLimits();