window.addEventListener('load', function() {
    setTimeout(function() {
        const skeleton = document.getElementById('skeletonScreen');
        const mainWrap = document.getElementById('mainWrapper');
        
        skeleton.classList.add('hide'); 
        mainWrap.classList.add('loaded'); 
        
        setTimeout(() => { 
            skeleton.style.display = 'none'; 
            setTimeout(() => {
                document.getElementById('announcementPopup').classList.add('show');
                triggerHaptic([40, 50, 40]);
            }, 500);
        }, 800);
    }, 1500); 
});

document.getElementById('closePopupBtn').addEventListener('click', function() {
    triggerHaptic(20);
    document.getElementById('announcementPopup').classList.remove('show');
});

const dustContainer = document.getElementById('dust-container');
for (let i = 0; i < 15; i++) {
    let p = document.createElement('div');
    p.className = 'dust-particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = (Math.random() * 10 + 10) + 's';
    p.style.animationDelay = (Math.random() * 5) + 's';
    dustContainer.appendChild(p);
}

function triggerHaptic(pattern = 30) {
    if ("vibrate" in navigator) { navigator.vibrate(pattern); }
}

let toastTimeout;
function triggerIsland(msg, iconClass = 'fa-solid fa-bell', iconColor = 'var(--accent-orange)') {
    const island = document.getElementById('dynamicIsland');
    const islandIcon = document.getElementById('islandIcon');
    const islandMsg = document.getElementById('islandMsg');
    
    triggerHaptic([30, 50, 30]);
    
    islandIcon.className = iconClass + ' island-icon';
    islandIcon.style.color = iconColor;
    islandMsg.innerText = msg;
    
    island.classList.remove('show'); 
    setTimeout(() => { island.classList.add('show'); }, 50);

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => { island.classList.remove('show'); }, 3500);
}

document.getElementById('nativeShareBtn').addEventListener('click', async function() {
    triggerHaptic([30, 40]);
    
    const shareData = {
        title: 'অনলাইন স্কাউট হ্যান্ডবুক কুইজ ২০২৬',
        text: 'স্কাউট হ্যান্ডবুক কুইজে অংশ নিতে এখনই রেজিস্ট্রেশন করুন!',
        url: window.location.href
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.log('User cancelled share event:', err);
        }
    } else {
        navigator.clipboard.writeText(window.location.href);
        triggerIsland('লিংক কপি করা হয়েছে!', 'fa-solid fa-link', 'var(--accent-green)');
    }
});

const REG_LIVE_TIME = new Date("June 3, 2026 00:01:00").getTime();
const QUIZ_LIVE_TIME = new Date("June 12, 2026 20:00:00").getTime(); 

document.getElementById('startBtn').addEventListener('click', function(e) {
    e.preventDefault();
    triggerHaptic([40, 30, 40]);
    document.getElementById('quizCategoryPopup').classList.add('show');
});

document.getElementById('scoutQuizBtn').addEventListener('click', function() {
    triggerHaptic(30);
    triggerIsland('স্কাউট কুইজ পোর্টালে নিয়ে যাওয়া হচ্ছে...', 'fa-solid fa-rocket', 'var(--accent-green)');
    document.getElementById('quizCategoryPopup').classList.remove('show');
    setTimeout(() => { window.open('https://ttasin2x.github.io/imageshowsimp/', '_blank'); }, 800);
});

document.getElementById('roverQuizBtn').addEventListener('click', function() {
    triggerHaptic(30);
    triggerIsland('রোভার/লিডার কুইজ পোর্টালে নিয়ে যাওয়া হচ্ছে...', 'fa-solid fa-rocket', 'var(--accent-orange)');
    document.getElementById('quizCategoryPopup').classList.remove('show');
    setTimeout(() => { window.open('https://ttasin2x.github.io/imageshowsimp/', '_blank'); }, 800);
});

document.getElementById('closeQuizPopupBtn').addEventListener('click', function() {
    triggerHaptic(20);
    document.getElementById('quizCategoryPopup').classList.remove('show');
});

const START_DATE = REG_LIVE_TIME; 
const REG_START = REG_LIVE_TIME;
const REG_END = new Date("June 10, 2026 23:59:59").getTime();
const QUIZ_LIVE = QUIZ_LIVE_TIME;
const RESULT_DATE = new Date("June 14, 2026 20:00:00").getTime(); 

let isLive = false;

function updateSystem() {
    const now = new Date().getTime();

    const distance = QUIZ_LIVE - now;
    const duration = QUIZ_LIVE - START_DATE;
    let percent = 0;
    
    if (now >= START_DATE) {
        percent = ((now - START_DATE) / duration) * 100;
    }
    percent = Math.max(0, Math.min(percent, 100));
    
    document.getElementById('liquidTrack').style.width = percent + '%';
    document.getElementById('progText').innerText = `(${percent.toFixed(1)}%)`;

    let timelinePct = 0;
    const steps = document.querySelectorAll('.timeline-step');
    steps.forEach(step => { step.classList.remove('active', 'completed'); });

    if (now < REG_START) {
        steps[0].classList.add('active');
        timelinePct = 0; 
    } 
    else if (now >= REG_START && now < REG_END) {
        let phaseProgress = (now - REG_START) / (REG_END - REG_START);
        timelinePct = 6 + (phaseProgress * (33.33 - 6));
        steps[0].classList.add('completed');
        steps[1].classList.add('active');
    } 
    else if (now >= REG_END && now < QUIZ_LIVE) {
        let phaseProgress = (now - REG_END) / (QUIZ_LIVE - REG_END);
        timelinePct = 39.33 + (phaseProgress * (66.66 - 39.33));
        steps[0].classList.add('completed');
        steps[1].classList.add('completed');
        steps[2].classList.add('active');
    } 
    else if (now >= QUIZ_LIVE && now < RESULT_DATE) {
        let phaseProgress = (now - QUIZ_LIVE) / (RESULT_DATE - QUIZ_LIVE);
        timelinePct = 72.66 + (phaseProgress * (100 - 72.66));
        steps[0].classList.add('completed');
        steps[1].classList.add('completed');
        steps[2].classList.add('completed');
        steps[3].classList.add('active');
    } 
    else {
        steps.forEach(step => step.classList.add('completed'));
        timelinePct = 100;
    }

    document.getElementById('timelineProgress').style.setProperty('--progress', `${timelinePct}%`);

    if (distance <= 0) {
        document.getElementById("d").innerText = "00";
        document.getElementById("h").innerText = "00";
        document.getElementById("m").innerText = "00";
        document.getElementById("s").innerText = "00";
        
        if (!isLive) {
            isLive = true;
            const liveTag = document.getElementById("liveTag");
            if(window.innerWidth > 480) { liveTag.style.display = "inline-flex"; }
            
            fireConfetti();
            triggerHaptic([50, 100, 50, 100, 100]); 
            triggerIsland('কুইজ এখন লাইভ হয়েছে!', 'fa-solid fa-party-horn', 'var(--primary)');
        }
        return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("d").innerText = String(d).padStart(2, '0');
    document.getElementById("h").innerText = String(h).padStart(2, '0');
    document.getElementById("m").innerText = String(m).padStart(2, '0');
    document.getElementById("s").innerText = String(s).padStart(2, '0');
}

setInterval(updateSystem, 1000);
updateSystem();

function fireConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const colors = ['#5856D6', '#FF9500', '#34C759', '#FF3B30', '#007AFF'];
    let particles = [];
    
    for(let i=0; i<100; i++) {
        particles.push({
            x: Math.random() * canvas.width, y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 8 + 4, h: Math.random() * 5 + 3,
            c: colors[Math.floor(Math.random() * colors.length)],
            dx: Math.random() * 4 - 2, dy: Math.random() * 4 + 2,
            rot: Math.random() * 360, rotSpeed: Math.random() * 10 - 5
        });
    }

    let animationId;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let moving = false;
        particles.forEach(p => {
            p.x += p.dx; p.y += p.dy; p.rot += p.rotSpeed;
            if(p.y < canvas.height) moving = true;
            
            ctx.save();
            ctx.translate(p.x, p.y); ctx.rotate(p.rot * Math.PI / 180);
            ctx.fillStyle = p.c; ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
            ctx.restore();
        });
        if(moving) animationId = requestAnimationFrame(animate);
    }
    animate();
    setTimeout(() => { cancelAnimationFrame(animationId); ctx.clearRect(0,0,canvas.width,canvas.height); }, 5000);
}

// ==========================================
// 8. RESULT BOARD SYSTEM
// ==========================================

const scoutResults = [
    { name: "Abdul Wahid Mahi", unit: "১ নং বিএন কলেজ কাপ্তাই নৌ স্কাউট দল", score: "112/141" },
    { name: "Rudra Shekhar Sarkar", unit: "Shakira police line secondary school scout group", score: "111/141" },
    { name: "Soumitra Chakraborty", unit: "Rani bilasmoni govt. Boys high school Scout Group", score: "111/141" },
    { name: "FARHAN Shahriar Himoy", unit: "Harimohan Government High School Scout Unit", score: "110/141" },
    { name: "Suraiya akter", unit: "আমার দেশ মুক্ত স্কাউট গ্রুপ", score: "109/141" },
    { name: "Addin islam anan", unit: "BAF Shaheen College Kurmitola Air Scout Unit", score: "109/141" },
    { name: "জোনায়েদ হোসেন রিফাত", unit: "অগ্নিবীণা রেলওয়ে মুক্ত স্কাউট গ্রুপ", score: "109/141" },
    { name: "MANSIF Zahin Sorker", unit: "saint Nicholas scout group", score: "109/141" },
    { name: "নিরব", unit: "সেন্ট নিকোলাস স্কাউট গ্রুপ", score: "107/141" },
    { name: "Kazi Md. Mostafizur Rahman Arnab", unit: "Rani Bilashmoni Govt Boys High School", score: "106/141" },
    { name: "Md. Seam Hossain", unit: "Ranı Bilashmoni Open Scout Group", score: "106/141" }
];

const roverResults = [
    { name: "Sifat Faysal Dipto", unit: "IT Open Rover Scout Group, Bogura", score: "125/141", isLeader: false },
    { name: "Sadia Sharmin Sameia", unit: "Adamjee Cantonment College Rover Scout Group", score: "124/141", isLeader: false },
    { name: "পারভেজ সরকার", unit: "সিআরসিডি মুক্ত স্কাউট গ্রুপ, চট্টগ্রাম", score: "123/141", isLeader: false },
    { name: "মোঃ সহিদুজ্জামাল সানি", unit: "সানরাইজ ওপেন স্কাউট গ্রুপ", score: "121/141", isLeader: true },
    { name: "Md Arafat Hossain", unit: "punorvoba mukto scout group", score: "119/141", isLeader: false },
    { name: "MD SHABBIR ALAM", unit: "SUNRISE OPEN SCOUT GROUP", score: "118/141", isLeader: false },
    { name: "Nur A Mobin Hasan", unit: "Govt. Saadat College Rover Scout Group", score: "116/141", isLeader: false },
    { name: "MST SUMAIYA AKTER", unit: "GOVERNMENT SAADAT COLLEGE ROVER SCOUT GROUP", score: "116/141", isLeader: false },
    { name: "Sabbir Reza", unit: "Rajshahi College Rover Scout Group", score: "114/141", isLeader: false },
    { name: "Forhad ahmed", unit: "Bpate school and college", score: "113/141", isLeader: false }
];

let currentTab = 'scout';

document.getElementById('resultBtn').addEventListener('click', function() {
    triggerHaptic(30);
    document.getElementById('resultPopupOverlay').classList.add('show');
    renderResults(); 
});

document.getElementById('closeResultPopupBtn').addEventListener('click', function() {
    triggerHaptic(20);
    document.getElementById('resultPopupOverlay').classList.remove('show');
});

const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        triggerHaptic(20);
        tabBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentTab = this.getAttribute('data-tab');
        document.getElementById('resultSearch').value = ''; 
        renderResults();
    });
});

document.getElementById('resultSearch').addEventListener('input', function() {
    renderResults(this.value.toLowerCase());
});

function renderResults(searchQuery = '') {
    const container = document.getElementById('resultContainer');
    container.innerHTML = ''; 
    
    let data = currentTab === 'scout' ? scoutResults : roverResults;

    if(searchQuery) {
        data = data.filter(item => 
            item.name.toLowerCase().includes(searchQuery) || 
            item.unit.toLowerCase().includes(searchQuery)
        );
    }

    if(data.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:#86868B; margin-top: 20px;">কোনো ফলাফল পাওয়া যায়নি!</p>`;
        return;
    }

    data.forEach((item, index) => {
        let rankClass = '';
        let positionTag = '';

        if (searchQuery === '') {
            if(index === 0) { rankClass = 'rank-1'; positionTag = '<span class="pos-tag gold"><i class="fa-solid fa-trophy"></i> ১ম স্থান</span>'; }
            else if(index === 1) { rankClass = 'rank-2'; positionTag = '<span class="pos-tag silver"><i class="fa-solid fa-medal"></i> ২য় স্থান</span>'; }
            else if(index === 2) { rankClass = 'rank-3'; positionTag = '<span class="pos-tag bronze"><i class="fa-solid fa-award"></i> ৩য় স্থান</span>'; }
        }
        
        let leaderBadge = item.isLeader ? `<div class="leader-badge"><i class="fa-solid fa-star"></i> লিডার</div>` : '';
        let leaderClass = item.isLeader ? 'is-leader' : '';

        const itemHTML = `
            <div class="result-item ${rankClass} ${leaderClass}">
                ${leaderBadge}
                <div class="rank-circle">${searchQuery ? '-' : index + 1}</div>
                <div class="result-info">
                    <h4>${item.name} ${positionTag}</h4>
                    <p><i class="fa-solid fa-tent"></i> ${item.unit}</p>
                </div>
                <div class="result-score-box">
                    <span>প্রাপ্ত নম্বর</span>
                    <strong>${item.score}</strong>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', itemHTML);
    });
}
