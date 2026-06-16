window.addEventListener('load', function() {
    setTimeout(function() {
        const mainWrap = document.getElementById('mainWrapper');
        mainWrap.classList.add('loaded'); 
        fireConfetti();
    }, 500); 
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

function fireConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const colors = ['#5856D6', '#FF9500', '#34C759', '#FF3B30', '#007AFF'];
    let particles = [];
    
    for(let i=0; i<150; i++) {
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
    setTimeout(() => { cancelAnimationFrame(animationId); ctx.clearRect(0,0,canvas.width,canvas.height); }, 6000);
}

// ==========================================
// FULL RESULT DATABASE (From Provided PDFs)
// ==========================================

const scoutResults = [
    { name: "Abdul Wahid Mahi", unit: "১ নং বিএন কলেজ কান্নাই নৌ স্কাউট দল", score: "112/141" },
    { name: "Rudra Shekhar Sarkar", unit: "Shakira police line secondary school scout group", score: "111/141" },
    { name: "Soumitra Chakraborty", unit: "Rani bilasmoni govt. Boys high school Scout Group", score: "111/141" },
    { name: "FARHAN Shahriar Himoy", unit: "Harimohan Government High School Scout Unit", score: "110/141" },
    { name: "Suraiya akter", unit: "আমার দেশ যুক্ত স্কাউট গ্রুপ", score: "109/141" },
    { name: "Addin islam anan", unit: "BAF Shaheen College Kurmitola Air Scout Unit", score: "109/141" },
    { name: "জোনায়েদ হোসেন রিফাত", unit: "অগ্নিবীণা রেলওয়ে মুক্ত স্কাউট ক্রুশ", score: "109/141" },
    { name: "MANSIF Zahin Sorker", unit: "saint Nicholas scout group", score: "109/141" },
    { name: "নিরব", unit: "মেন্ট নিকোলাস স্কাউট গ্রুপ", score: "107/141" },
    { name: "Kazi Md. Mostafizur Rahman Arnab", unit: "Rani Bilashmoni Govt Boys High School", score: "106/141" },
    { name: "Md. Seam Hossain", unit: "Ranı Bilashmoni Open Scout Group", score: "106/141" },
    { name: "ডাইয়াজ আলম আরিয়ান", unit: "১ নং বিএন কলেজ, কান্তাই নৌ স্কাউট দল", score: "105/141" },
    { name: "Sadiq", unit: "১নং বিএন কলেজ কান্তাই নৌ স্কাউট দল", score: "103/141" },
    { name: "Abu Bakkor Anik Talukder", unit: "Ali Ahmed School And College Scout Group", score: "103/141" },
    { name: "Aritro Sutradhar", unit: "Tushar Open Scout Group", score: "103/141" },
    { name: "Jul", unit: "Hazi chota kalim school and college", score: "102/141" },
    { name: "Kazi Saif Basar", unit: "Singra Damdama Pilot School And College", score: "102/141" },
    { name: "Rohan Al melad", unit: "১ নং বিএন কলেজ কান্তাই নৌ স্কাউট দল", score: "101/141" },
    { name: "Abdullah Al Rihan", unit: "১ নং বিএন কলেজ নৌ স্কাউট দল", score: "100/141" },
    { name: "Mehedi Islam", unit: "4 No BNS TituMir Sea Scout Unit", score: "99/141" },
    { name: "Naima Jahan Afrida", unit: "Abani Open Girl's In Air Scout Group", score: "99/141" },
    { name: "Sujana Akter simran", unit: "girls guide", score: "99/141" },
    { name: "ঐন্দ্রিলা আহমেদ ভামৈ", unit: "আদর্শ মুক্ত স্কাউট গ্রুপ", score: "97/141" },
    { name: "Abida Sikder", unit: "sharafbhata Union high school scout group", score: "96/141" },
    { name: "Ragib Mahtab", unit: "Baitush sharaf jabbaria academy school and college scout group", score: "96/141" },
    { name: "Yusuf Chowdhury Saif", unit: "Al-Amin Jamea Islamia School and College Scout Group", score: "96/141" },
    { name: "Tausif Tamim", unit: "Kotchandpur Govt Model pailot secondary school scout group", score: "96/141" },
    { name: "মো সিদ্দিকুল ইসলাম", unit: "পুলিশ লাইন্স স্কুল অ্যান্ড কলেজ স্কাউট দল বগুড়া", score: "95/141" },
    { name: "Sandip Mohanto Dip", unit: "Cantonment Public School and College Scout Group, Saidpur", score: "94/141" },
    { name: "Amit Raihan Bhuiyan", unit: "Rani bilashmoni govt bays high school scout group", score: "94/141" },
    { name: "জোনায়েদ হোসেন রিফাত", unit: "অগ্নিবীণা রেলওয়ে মুক্ত স্কাউট গ্রুপ", score: "94/141" },
    { name: "shakur", unit: "arunoday open scout group", score: "94/141" },
    { name: "Sadika Amatullah Adrita", unit: "1no. BN College Kaptai Girls-In-Sea Scout Team", score: "93/141" },
    { name: "Gazi Al Mahi", unit: "Swarnakali High School scout Group unit-1", score: "93/141" },
    { name: "MD Shekh Yasin Ali", unit: "740No Lalbagh Govt Model School And College Scout Group", score: "93/141" },
    { name: "মোঃ আবদুল্লাহ ফাহাদ", unit: "বুড়িচং আনন্দ পাইলট সরকারি উচ্চ বিদ্যালয় স্কাউট গ্রুপ", score: "93/141" },
    { name: "Md. Shaharear Shad", unit: "Brotherhood Open Scout Group", score: "92/141" },
    { name: "tahmid kibria", unit: "Rbm scout", score: "92/141" },
    { name: "এহতেশাম বিল্লাহ তামিম", unit: "গভ. মুসলিম হাই স্কুল স্কাউট ইউনিট", score: "92/141" },
    { name: "ইনতিমা জাবেদ", unit: "প্রবর্তক স্কুল এন্ড কলেজ স্কাউটস", score: "92/141" },
    { name: "MD.MOMTASIN MEZBAH MIHIR", unit: "CUMILLA SHIKKHA BOARD GOVT MODEL COLLEGE SCOUT GROUP", score: "91/141" },
    { name: "Nur Rahman Noyan", unit: "Rani Bilashmoni Govt. Boys High School Scout Group", score: "91/141" },
    { name: "Mehernaj Chowdhury Minha", unit: "Don't have", score: "90/141" },
    { name: "MD Hamim Islam", unit: "Seroil Railway Colony Open Scout Group", score: "90/141" },
    { name: "Shaikh Moin", unit: "Khulna railway Mukteshwar scout group", score: "89/141" },
    { name: "Sujana Akter Simran", unit: "scout", score: "88/141" },
    { name: "Shohana Nusrat", unit: "BIAM Model School and College Scout Group", score: "88/141" },
    { name: "Nahid", unit: "Barguna Zilla school scout group", score: "87/141" },
    { name: "মোহাদ্দিসা মুক্তি", unit: "আর এফ মুক্ত স্কাউট গ্রুণ", score: "87/141" },
    { name: "Md Ariful Islam", unit: "KARNAPHULI OPEN SCOUT GROUP", score: "87/141" },
    { name: "Alif", unit: "Amar Desh Open Scout Group", score: "87/141" },
    { name: "অহিন আকন্দ", unit: "Rani bilasmoni Govt. Boys' High School", score: "87/141" },
    { name: "Arafat Rahman", unit: "Rani bilasmoni government boys high school scout group", score: "86/141" },
    { name: "MD.Fahat Khan", unit: "Bhasantek school and college scout group", score: "85/141" },
    { name: "Tomal Chakraborty", unit: "Rani Dayamoyee High School Scout Group", score: "85/141" },
    { name: "Mushfiqur Rahaman Safril", unit: "রানী বিলাসমনি সরকারি বালক উচ্চ বিদ্যালয় স্কাউট দল।", score: "84/141" },
    { name: "Ibrahim imam arafat", unit: "Border Guard High School Scout Group", score: "84/141" },
    { name: "মোঃ তাহসিনুল ইসলাম", unit: "আশাশুনি সরকারি মাধ্যমিক বিদ্যালয় স্কাউট গ্রুপ", score: "84/141" },
    { name: "Naimur Rahman", unit: "Abalokon mukto scout group.", score: "83/141" },
    { name: "Quraish Al Azad", unit: "Barguna Zilla School Scout Group", score: "82/141" },
    { name: "Mahabube Rabbani Likhon", unit: "Lion Open scouts Group", score: "82/141" },
    { name: "Jahidul Islam", unit: "Tangail Polytechnic institute Scout Group", score: "82/141" },
    { name: "Sams Bin Hoque Nihal", unit: "Rani Bilash moni govt boys high sc", score: "81/141" },
    { name: "Mim akter", unit: "Mouchak scout school and college girl in scout group", score: "80/141" },
    { name: "Jannatul ferdus Dina", unit: "Bhasantak school and college scout group", score: "80/141" },
    { name: "Md Sujon Miah", unit: "Mouchak scout school and college scout group", score: "80/141" },
    { name: "Anika Tahsin", unit: "Bengal tiger open scout group", score: "80/141" },
    { name: "Pobitro Chandro", unit: "Success Residential School Scout Group", score: "80/141" },
    { name: "Sanjid Niloy", unit: "আর্মড পুলিশ ব্যাটেলিয়ন পাবলিক স্কুল ও কলেজ স্কাউট দল", score: "79/141" },
    { name: "সুব্রত বড়ুয়া সানি", unit: "রাণী বিলাশমণি সরকারী বালক উচ্চ বিদ্যালয়", score: "78/141" },
    { name: "Md Tasnim Rayhan", unit: "Orchid Open Scout Group", score: "78/141" },
    { name: "মোঃ ইকবাল", unit: "রাণী বিলাসমণি সরকারি বালক উচ্চ বিদ্যালয় স্কাউট দল।", score: "78/141" },
    { name: "Adib Iftikhar Zeeshan", unit: "Annada Govt. High School Scout Group", score: "78/141" },
    { name: "ফাইয়াজুর রহমান গালিব", unit: "Scout Group", score: "78/141" },
    { name: "Jakiya Sultana", unit: "Hazi chota kalim school and college", score: "77/141" },
    { name: "Prapti Paul Puja", unit: "18th No Ishan Institution Scout Group", score: "77/141" },
    { name: "Kazi Soyaib Basar", unit: "Singra Damdama Pilot School And College Scout Group", score: "76/141" },
    { name: "সিয়ামুন", unit: "রাণী বিলাসমণি সরকারি বালক উচ্চ বিদ্যালয় স্কাউট দল", score: "75/141" },
    { name: "Jawad ibtisham zahin", unit: "Ramyo open scout group", score: "74/141" },
    { name: "সান্দারেত ইসলাম", unit: "বাঁশবাড়ীয়া উচ্চ বিদ্যালয় স্কাউটস ইউনিট", score: "74/141" },
    { name: "আফিয়াহ শাহানা ইফতি", unit: "এন এস আমিন রেসিডেন্সিয়াল স্কুল স্কাউট দল", score: "74/141" },
    { name: "Safwan Ahmed", unit: "bns hazi mohsin open sea", score: "73/141" },
    { name: "Md Mahmudul Hosen Rafi", unit: "Anirban open scout group", score: "73/141" },
    { name: "Zayed Bin Rahat", unit: "Rani Bilashmoni Government Boys School Scout Unit", score: "72/141" },
    { name: "Sabia Akter", unit: "Haji shariatula mukto scout group", score: "71/141" },
    { name: "Tonoy Dutta", unit: "Koinpura high school scout group", score: "70/141" },
    { name: "Farhan Absar", unit: "Al Amin Academy Scout Group", score: "70/141" },
    { name: "Emon", unit: "Kushtia open scout", score: "69/141" },
    { name: "fawziya hossain", unit: "Noakhali mukto girls in scout", score: "67/141" },
    { name: "Ehsaas Rahman leshan", unit: "BNS Haji mohsin open sea scout unit", score: "66/141" },
    { name: "Saiful Islam Salman", unit: "রাণী বিলাদ মনি সরকারি উচ্চ বিদ্যালয় স্কাউট দল", score: "65/141" },
    { name: "Kul Ratul Ayan", unit: "Rajbari Govt High School Scout Group", score: "64/141" },
    { name: "MD AWLAD AL AHAHADI", unit: "Rani Vilasmani Government Boys High School Scout Team", score: "64/141" },
    { name: "MD. Sahel Ahmed", unit: "Putijuris c high school scout group", score: "63/141" },
    { name: "মুহাঃ জুলকার নাঈন জিসান", unit: "সোনাইমুড়ি সরকারি মডেল উচ্চ বিদ্যালয় স্কাউট ইউনিট", score: "62/141" },
    { name: "Ratul Hasan", unit: "সেন্ট নিকলায় স্কাউট গ্রুপ", score: "61/141" },
    { name: "Ishtihad Siddiquee", unit: "Cox's Bazar government high school scout group", score: "60/141" },
    { name: "Bayezid", unit: "RBM Scout", score: "60/141" },
    { name: "Utsa Sarker", unit: "চন্দপাড়া মুক্ত গার্স-ইন স্কাউট গ্রুপ", score: "59/141" },
    { name: "MD Mir Ashraful Islam", unit: "BIAM Model School & College Scout Group", score: "57/141" },
    { name: "শুভ আহমেদ স্বাধীন", unit: "সাভার অধর চন্দ্র সরকারি উচ্চ বিদ্যালয়", score: "55/141" },
    { name: "মো মিরাজ হোসেন", unit: "কচুয়া আর্দশ ওপেন স্কাউট গ্রুপ", score: "55/141" },
    { name: "Arafat Hossain", unit: "BIAM Model School and College Scout group", score: "54/141" },
    { name: "Tasfia badhon", unit: "597th national ideal school scout group", score: "54/141" },
    { name: "মোঃ আসিফুর রহমান", unit: "স্বশিল্পী সেন্টার স্কুল স্কাউট দল", score: "53/141" },
    { name: "Md.Ashfaq Ahammed Sami", unit: "Bangladesh Instritued Of Glass And Ceramics Rover Scout", score: "53/141" },
    { name: "Kazi Muntasir Abdullah", unit: "BIAM Model School And College Scout Group", score: "53/141" },
    { name: "Farhan Rahman", unit: "Lal Sabuj Mukti Scout Group", score: "52/141" },
    { name: "Krittika Basu", unit: "Mohammad Ali High School Girl in Scout Unit", score: "52/141" },
    { name: "Tanvir Tasin", unit: "Rani BilashMoni Open Scout Group", score: "51/141" },
    { name: "Md Hasnat Islarn Musa", unit: "Bhasantek school and college", score: "51/141" },
    { name: "Md Rahat Hossain", unit: "APBN scout group unit 2", score: "51/141" },
    { name: "Abdullah Ar Rafi", unit: "Rani bilasmoni Government Boys High school Scout Group", score: "50/141" },
    { name: "Mdratul islam", unit: "savar adhar chandra govment high school scout group", score: "49/141" },
    { name: "Md Mushfiqur Rahman Amin Murad", unit: "N.S Amin Residential School scout group", score: "48/141" },
    { name: "Sabbir", unit: "Barguna Zilla School scout group", score: "47/141" },
    { name: "মোঃ মিনহাজ সরকার", unit: "Alhaz Noyab All Adarsha high school Scout group", score: "47/141" },
    { name: "TEERTHANKAR BARMAN", unit: "Ns amin residential school scout group", score: "46/141" },
    { name: "Rafat Hossen", unit: "rani Bilashmoni government Boys High School", score: "44/141" },
    { name: "আল ফিসান ইস্মিত", unit: "সেক্রেড হাট মাধ্যমিক বিদ্যালয় যশোর।", score: "42/141" },
    { name: "MD AL MAHI LIHAN", unit: "Shatokoli Railway Open Scout Group", score: "42/141" },
    { name: "Najia jahan", unit: "Merit model school", score: "42/141" },
    { name: "Dibbo Raj", unit: "Dhanikhola High School Scout Group", score: "41/141" },
    { name: "Salman", unit: "3no hajimosin", score: "41/141" },
    { name: "Arafat Hossain Rasel", unit: "Anirban open scout group.", score: "41/141" },
    { name: "Shahriar Nafiz", unit: "B.C.S.IR School & College Scout Group", score: "41/141" },
    { name: "Nafisa Nawshin", unit: "Dhaka", score: "40/141" },
    { name: "Tasnim Tabassum", unit: "Boroigaon Girls' high school scout team", score: "38/141" },
    { name: "Jobayer", unit: "Rhmscout", score: "37/141" },
    { name: "Shudipto", unit: "বিএন স্কুল স্কাউট গ্রুপ", score: "36/141" },
    { name: "Rudro Bosak", unit: "Talora Altaf All High School Scout Group", score: "35/141" },
    { name: "Tawhidul Islam Saimon", unit: "1non BN kaptal", score: "35/141" },
    { name: "Md Kawsar islam kiron", unit: "NS Amin Residential School Scout Group", score: "34/141" },
    { name: "Maruful Hasan", unit: "Scout", score: "31/141" },
    { name: "md shahad", unit: "আব্দুলপুর মোশাররফ হোসেন উচ্চ বিদ্যালয়।", score: "26/141" },
    { name: "Israt Tabassum Haider Isfa", unit: "1no girls in sea scout", score: "24/141" },
    { name: "Md Rafat Rafin", unit: "Adhar Chandra", score: "19/141" },
    { name: "Rehat", unit: "Rani bilashmoni govt high school", score: "19/141" },
    { name: "মো: আব্দুল্লাহ", unit: "১নং বিএল কলেজ কান্তাই জেলা নৌ স্কাউট দল", score: "0/141" },
    { name: "Alvi Molla", unit: "Scout", score: "0/141" }
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
    { name: "Forhad ahmed", unit: "Bpate school and college", score: "113/141", isLeader: false },
    { name: "Sajid", unit: "Major General Mahmudul Hasan Adarsha College Rover Scout Group", score: "113/141", isLeader: false },
    { name: "সৈয়দ আবদুল্লাহ আল মাহমুদ", unit: "বাংলাদেশ সুইডেন পলিটেকনিক ইনস্টিটিউট রোভার স্কাউট গ্রুপ", score: "112/141", isLeader: false },
    { name: "জারিন তাসনীম", unit: "গোল্ডেন ঈগল ওদেন এয়ার স্কাউট গ্রুপ", score: "111/141", isLeader: false },
    { name: "মো: আফিফ মল্লিক", unit: "সন্তনীল মুক্ত মহাদল", score: "111/141", isLeader: false },
    { name: "Shamim Al Hasan", unit: "Govt Saadat College Rover Scout Group", score: "111/141", isLeader: false },
    { name: "Nilufa Yesmin", unit: "Tangail Govt Mohila College Rover Scout Group", score: "111/141", isLeader: false },
    { name: "Zebon Najar", unit: "IT open rover scout group Group", score: "110/141", isLeader: false },
    { name: "আলিফ হাসান পিয়াল", unit: "36 রেসকিউ ওপেন স্কাউট ইউনিট", score: "110/141", isLeader: false },
    { name: "SHAHRIER MAHTAB LABIB", unit: "Govt. Tolaram College rover scout group", score: "107/141", isLeader: false },
    { name: "MD Siam", unit: "Amar Desh Open Rover Scout Group", score: "103/141", isLeader: false },
    { name: "Mobasshir Rahman", unit: "Tangail Polytechnic Institute Rover Scout Group", score: "103/141", isLeader: false },
    { name: "বায়েজিদ বোস্তামি সিয়াম", unit: "সেন্ট যোসেফস স্কুল এন্ড কলেজ রোভার স্কাউট গ্রুপ", score: "103/141", isLeader: false },
    { name: "মো জয়নাল আবেদীন", unit: "Troop Mafeking Open Scout Group, Dhaka", score: "102/141", isLeader: false },
    { name: "MD AI Aksha Alif", unit: "Govt. Tolaram Collage Rover scout group", score: "101/141", isLeader: false },
    { name: "TONMOY DAS", unit: "Rani Bilash Moni Open Rover Scout Group", score: "100/141", isLeader: false },
    { name: "Ariyan Junayed", unit: "Sonargaon government college", score: "100/141", isLeader: false },
    { name: "Saikat Babu", unit: "Bogura Polytechnic Institute rover scout group", score: "99/141", isLeader: false },
    { name: "Shailpik Das Kabya", unit: "Govt City College Rover Scout Group, Chattogram", score: "99/141", isLeader: false },
    { name: "মোঃ সাকিব-উল ইসলাম", unit: "আই টি মুক্ত রোভার স্কাউট গ্রুপ, বগুড়া", score: "98/141", isLeader: false },
    { name: "Abdullah Tazdid", unit: "Cox's Bazar City College Rover Scout", score: "98/141", isLeader: false },
    { name: "Md Ashraful Hauge", unit: "213.No Adamjee Cantonment College Rover Scout", score: "95/141", isLeader: false },
    { name: "Md Siam Mahmud", unit: "Rani bilash moni open rover scout group", score: "94/141", isLeader: false },
    { name: "Tafhim Rob Chowdhury", unit: "Metropolitan University Rover Scout Group", score: "94/141", isLeader: false },
    { name: "Mst Ummea Habiba Dristy", unit: "Scout Group", score: "94/141", isLeader: false },
    { name: "মোঃ আসাদুল্লাহ রিপন", unit: "দিনাজপুর পলিটেকনিক ইনস্টিটিউট রোভার স্কাউট গ্রুপ", score: "94/141", isLeader: false },
    { name: "Md Abdullah Al Hady", unit: "Bogura Polytechnic Institute rover scuts group", score: "93/141", isLeader: false },
    { name: "মিনহাজ আবেদীন জিদান", unit: "সরকারি শহীদ সোহরাওয়ার্দী কলেজ রোভার স্কাউট গ্রুপ", score: "93/141", isLeader: false },
    { name: "Sifatunnesa", unit: "রম্য মুক্ত গার্ল-ইন রোভার স্কাউট গ্রুপ", score: "93/141", isLeader: false },
    { name: "Md. Tohin", unit: "Golden Eagle Open Air Scout Group", score: "93/141", isLeader: false },
    { name: "তামান্না খাতুন", unit: "শহিদ স্মৃতি সরকারি কলেজ রোভার স্কাউট গ্রুপ", score: "92/141", isLeader: false },
    { name: "Mohammad Rafiqul Islam", unit: "Khilgaon Govt. High School Scout Group", score: "91/141", isLeader: false },
    { name: "মোঃ মারুফ মৃধা", unit: "০৪ নং বানৌজা তিতুমীর নৌ স্কাউট দল", score: "90/141", isLeader: false },
    { name: "দোয়াদ রহমান সংলাস", unit: "সিভিল এভিয়েশন স্কুল এন্ড কলেজের এয়ার রোভার স্কাউট গ্রুপ", score: "89/141", isLeader: false },
    { name: "MD Palash Ali", unit: "Bangladesh Survey Institute Rover Scout Group", score: "88/141", isLeader: false },
    { name: "Md. Sadif Hasan", unit: "Rangpur Metro Open Scout Group", score: "87/141", isLeader: false },
    { name: "DIGONTO CHANDRA DAS", unit: "Govt. Kaligonj sramik college", score: "84/141", isLeader: false },
    { name: "Priya Akther", unit: "বিশ্বাসী", score: "84/141", isLeader: false },
    { name: "Mou islam", unit: "Bondhu", score: "84/141", isLeader: false },
    { name: "মোঃ ইমন", unit: "Kushtia open Rover scout group", score: "82/141", isLeader: false },
    { name: "Tusher Ahmed", unit: "Dhaka College Rover Scout Group", score: "82/141", isLeader: false },
    { name: "লله", unit: "Golden Eagle Open Air Scout Group", score: "81/141", isLeader: false },
    { name: "Hasan Mahmud Sohan", unit: "Government Debendra College Rover Scout Group", score: "81/141", isLeader: false },
    { name: "Abdullah Al Fahim", unit: "Bandarban Government College Rover Scout Group", score: "80/141", isLeader: false },
    { name: "মোঃ জসিম উদ্দিন", unit: "Govt Tolaram College Rover Scout Group", score: "80/141", isLeader: false },
    { name: "Fahad Ahmed", unit: "Agrapathik Open Scout Group", score: "79/141", isLeader: false },
    { name: "মোঃ হামিদুর রহমান", unit: "মুন্সিগঞ্জ পলিটেকনিক ইন্সিটিউট রোভার স্কাউট গ্রুপ", score: "78/141", isLeader: false },
    { name: "মোঃ অমিত হাসান আদর", unit: "পটুয়াখালী বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় রোভার স্কাউট গ্রুপ", score: "76/141", isLeader: false },
    { name: "Md Fahim mia", unit: "Bogura Polytechnic Institute Rover scout group.", score: "73/141", isLeader: false },
    { name: "MD rezowan kabir", unit: "Faridpur polytechnic institute Rover scout group", score: "73/141", isLeader: false },
    { name: "Hafizul Hoque", unit: "মতিঝিল মডেল", score: "73/141", isLeader: false },
    { name: "Nahin Foysal", unit: "Govt. Azizul Haque College Rover Scout Group", score: "70/141", isLeader: false },
    { name: "Shanjida Akhand", unit: "Cumilla Polytechnic Institute rover scout group", score: "70/141", isLeader: false },
    { name: "Mansura mahnur nuri", unit: "Bogura polytechnic institute rover scout group", score: "69/141", isLeader: false },
    { name: "Kabbotirtho Ray", unit: "Bogura Polytechnic Institute Rover Scout Group", score: "68/141", isLeader: false },
    { name: "মোঃ রাইসাতুল ইসলাম রিয়ন", unit: "লোহালিয়া মুক্ত রোভার স্কাউট গ্রুপ, পটুয়াখালী", score: "68/141", isLeader: false },
    { name: "Rakibul Hasan", unit: "Ranı Bilashmoni Open Scout Group, Gazipur", score: "67/141", isLeader: false },
    { name: "Abdul Newaz Shahed", unit: "চট্টগ্রাম কলেজ রোভার স্কাউট গ্রুপ", score: "67/141", isLeader: false },
    { name: "Ayshwarja Prion Dhali Jeet", unit: "Adamjee Cantonment College Rover Scout Group", score: "66/141", isLeader: false },
    { name: "Shoriful Islam", unit: "Anirban Open Scout Group", score: "66/141", isLeader: false },
    { name: "মোঃ আলী মুন", unit: "ব্রাদারহুড ওপেন স্কাউট গ্রুপ, রংপুর", score: "65/141", isLeader: false },
    { name: "রিফাত মোল্লা", unit: "আইডিয়াল ওশেন রোভার স্কাউট গ্রুপ", score: "65/141", isLeader: false },
    { name: "HAMIM REZA BAPPY", unit: "Kushtia govt polytechnic institute Rover Scout Group", score: "62/141", isLeader: false },
    { name: "Md Tahosin Islam Reshad", unit: "213No. Adamjee Canttonment College Rover Scout Group", score: "62/141", isLeader: false },
    { name: "Biplab Kumar Das", unit: "Lutia Gps cub Group", score: "62/141", isLeader: false },
    { name: "দ্বীপান্বিত্য রায়", unit: "চট্টগ্রাম পলিটেকনিক ইনস্টিটিউট গার্ল ইন রোভার", score: "61/141", isLeader: false },
    { name: "মেহেদি হাসান", unit: "সিভিল এভিয়েশন স্কুল এন্ড কলেজ এয়ার স্কাউট গ্রুপ", score: "61/141", isLeader: false },
    { name: "তহিদুল ইসলাম সাগর", unit: "সীতাকুণ্ড ডিগ্রি কলেজ রোভার স্কাউট গ্রুপ", score: "60/141", isLeader: false },
    { name: "কাজী শাহরিয়া আহম্মেদ", unit: "নরসিংদী পলিটেকনিক ইন্সটিটিউট রোভার স্কাউট গ্রুপ", score: "60/141", isLeader: false },
    { name: "Mohammad Habibul Islam Habib", unit: "Rangunia Government College Rover Scout Group", score: "60/141", isLeader: false },
    { name: "Md Zahid Hassan", unit: "Rover lider", score: "59/141", isLeader: false },
    { name: "Samiur Rahman Khan", unit: "BIAM Model School & College Scout Group", score: "58/141", isLeader: false },
    { name: "Shahriyar Islam Alok", unit: "Golden Eagle Open Air Scout Group", score: "58/141", isLeader: false },
    { name: "Faysal Ahmmed Fuad", unit: "Dinajpur Polytechnic Institute Rover Scout Group", score: "57/141", isLeader: false },
    { name: "Washim akram", unit: "Angeles open scout group", score: "57/141", isLeader: false },
    { name: "Shanta Moni", unit: "গুরুদয়াল সরকারি কলেজ গার্ল-ইন রোজার ইউনিট", score: "57/141", isLeader: false },
    { name: "সৌরভ ঘোষ জয়", unit: "ইউনাইটেড ওপেন স্কাউট গ্রুপ", score: "56/141", isLeader: false },
    { name: "Naimur Hossain", unit: "Golden Eagle open air scout group", score: "56/141", isLeader: false },
    { name: "Md Rakib", unit: "Dhaka Polytechnic Institute Rover Scout Group", score: "56/141", isLeader: false },
    { name: "Afrajul Amman", unit: "Karnaphuli Open Rover Scout Group", score: "55/141", isLeader: false },
    { name: "মোঃ নাজমুস সাকিব", unit: "বগুড়া পলিটেকনিক ইনস্টিটিউট রোভার স্কাউট গ্রুপ", score: "55/141", isLeader: false },
    { name: "Md Samiul Islam", unit: "Kahaloo Government College Rover Scout Group", score: "53/141", isLeader: false },
    { name: "Muhammad Hossain", unit: "Government Tolararn College Rover Scout Group", score: "53/141", isLeader: false },
    { name: "Md Asaduzzaman Nishat", unit: "Dhaka polytechnic institute Rover scout group", score: "52/141", isLeader: false },
    { name: "Md. Siam", unit: "Shahid M. Monsur Ali College Rover Scout Group", score: "51/141", isLeader: false },
    { name: "Imam Mahdi", unit: "Bangladesh Institute of Glass and Ceramic Rover Scout Group", score: "51/141", isLeader: false },
    { name: "Md Jiyon Ahmed", unit: "Arunima Mukto Rover Group", score: "49/141", isLeader: false },
    { name: "Riyad hossain", unit: "Cosmos Open scout group", score: "48/141", isLeader: false },
    { name: "ভাবাসসুম তানাস", unit: "কিশোরগঞ্জ সরকারি মহিলা কলেজ গার্ল ইন রোভার", score: "46/141", isLeader: false },
    { name: "Rannu", unit: "গোপালগঞ্জ বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় রোভার", score: "46/141", isLeader: false },
    { name: "Sonjay", unit: "Naogaon asten molla College rover scout group", score: "45/141", isLeader: false },
    { name: "Md Rabbi Hasan Ayat", unit: "Shahid Jabed Open Scout group", score: "44/141", isLeader: false },
    { name: "Tarek Hossen Nafiz", unit: "bauphal govt college rover scout group", score: "43/141", isLeader: false },
    { name: "মোঃ রবিউল ইসলাম রিফাত", unit: "রাণী বিলাসমণি ওপেন স্কাউট গ্রুপ", score: "43/141", isLeader: false },
    { name: "মোঃ আহসানুল হক", unit: "শহীদ বুদ্ধিজীবী সরকারি কলেজ রোভার স্কাউট গ্রুপ", score: "43/141", isLeader: false },
    { name: "Imran Hossain", unit: "Chattogram Cantonment public College", score: "39/141", isLeader: false },
    { name: "Mariya Akter", unit: "Y", score: "38/141", isLeader: false },
    { name: "Maisha Afrin", unit: "Armed Police Battalion Public School and College", score: "38/141", isLeader: false },
    { name: "Uggya Marma", unit: "Cox's Bazar City College Rover Scout Group", score: "38/141", isLeader: false },
    { name: "Manjum Soyad", unit: "Amer Desh open scout group", score: "38/141", isLeader: false },
    { name: "Arafat Hossen Labib", unit: "Rani Bilasmoni Open Rover Scout group", score: "36/141", isLeader: false },
    { name: "মোঃহাসান", unit: "সূর্য দৈনিক রেলওয়ে মুক্ত স্কাউট গ্রুপ", score: "34/141", isLeader: false },
    { name: "Zisan Mia", unit: "Katiadi government College rover unit", score: "34/141", isLeader: false },
    { name: "Md.Lowha Mahfuj", unit: "Youth star Mukto Rover Group", score: "28/141", isLeader: false },
    { name: "মোআশ্রাফুল আলম", unit: "মাদারীপুর সরকারি কলেজ, রোভার স্কাউট", score: "26/141", isLeader: false },
    { name: "মোঃ আব্দুল আওয়াল", unit: "যৌবন সরকারি প্রাথমিক বিদ্যালয় কাবদল", score: "26/141", isLeader: false },
    { name: "Abdullah All Noman Nehan", unit: "Choddogram government College Rover Group", score: "26/141", isLeader: false },
    { name: "মোসা: আইনুন নাহার", unit: "চাঁপাইনবাবগঞ্জ মুক্তমহাদল গার্ল-ইন-রোভার", score: "23/141", isLeader: false },
    { name: "Md. Rahamat Ullah", unit: "Uttor Madarsha high school scout group", score: "21/141", isLeader: false },
    { name: "Noirit Roy", unit: "Rangpur Ideal Institute of Technology Rover Scout Group", score: "2/141", isLeader: false },
    { name: "Md Sajal Howladar", unit: "Kotalipara Govt Adarsha College Rover Scout group", score: "0/141", isLeader: false }
];

let currentTab = 'scout';

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
        container.innerHTML = `<div style="text-align:center; color:#86868B; padding: 40px 0;"><i class="fa-solid fa-face-frown" style="font-size:40px; color:#C7C7CC; margin-bottom:10px;"></i><p>দুঃখিত, কোনো ফলাফল পাওয়া যায়নি!</p></div>`;
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

// Initial render
window.onload = function() {
    renderResults();
};
