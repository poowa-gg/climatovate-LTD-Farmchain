/* =========================================
   VOICE TO VALUE — USSD SIMULATOR ENGINE
   ========================================= */

// ---- Language Strings ----
const LANG = {
    en: {
        name: 'English',
        welcome: 'Welcome to Voice to Value — your voice is your financial identity.',
        welcomeStart: 'Dial *347*88# or press 1 to begin.',
        chooseLang: 'Choose your language:',
        registerPrompt: 'Register with your voice. Press the microphone button and say your name.',
        registerConfirm: 'Confirm registration',
        mainGreeting: (name) => `Welcome, ${name}! What would you like to do?`,
        creditTitle: '📊 Your Credit Score',
        creditGood: 'Good Standing',
        creditExcellent: 'Excellent',
        creditFair: 'Fair — Keep improving!',
        loanTitle: '💰 Loan Application',
        loanQualify: 'Based on your credit score, you qualify for:',
        loanAccept: '✅ Accept loan',
        loanDiff: '🔄 Different amount',
        loanApproved: '✅ Loan Approved!',
        loanSent: (amt) => `${amt} sent to your OPay wallet`,
        advisoryTitle: '🌱 Farm Advisory',
        plantMillet: 'Plant Millet',
        plantWindow: 'Best window: 3 days from now',
        rainChance: 'Rain expected: 85% chance',
        irrigate: 'Irrigate Cowpea',
        soilMoisture: 'Soil moisture: Low (23%)',
        irrigateRec: 'Recommended: 15L per row',
        weatherAlert: 'Weather Alert',
        drySpell: 'Dry spell in 10 days',
        planHarvest: 'Plan harvest accordingly',
        blockchainTitle: '🔗 Your Immutable Credit Passport',
        blockchainNote: 'Your credit history is immutable, portable, and owned by you.',
        back: 'Back to menu',
        exit: 'Exit',
        checkScore: '📊 Check Credit Score',
        applyLoan: '💰 Apply for Loan',
        farmAdvisory: '🌱 Farm Advisory',
        viewBlockchain: '🔗 View Credit Passport',
        settings: '⚙️ Settings',
        tapMic: 'Tap microphone to speak',
        listening: '🔴 Listening...',
        heard: (text) => `Heard: "${text}"`,
        voiceAdvice: 'You should plant millet in 3 days. Rain is expected with 85 percent chance. Your cowpea field needs irrigation. Apply 15 litres per row. A dry spell is expected in 10 days, plan your harvest accordingly.',
        cropDoctor: '🩺 Voice Crop Doctor',
        cropDoctorSub: 'Describe your crop symptoms by voice or choose below:',
        cropDoctorTap: 'Tap to describe symptoms',
        trustNet: '🌐 Community Trust Network',
        trustNetSub: 'Your social collateral — who vouches for you',
        cropDoctorMenu: '🩺 Crop Doctor (AI)',
        trustNetMenu: '🌐 Trust Network',
        rescueMenu: '🚨 Harvest Rescue',
        rescueTitle: '🚨 Harvest Rescue',
        rescueSub: 'Sauke — Stop Harvest Loss',
        rescueTap: 'Tap & say: "My tomatoes are rotting"',
    },
    ha: {
        name: 'Hausa',
        welcome: 'Barka da zuwa Voice to Value — muryarku ita ce asalin kuɗin ku.',
        welcomeStart: 'Buga *347*88# ko danna 1 don fara.',
        chooseLang: 'Zaɓi harshenka:',
        registerPrompt: 'Yi rajista da muryarka. Danna makirufo ka faɗi sunanka.',
        registerConfirm: 'Tabbatar da rajista',
        mainGreeting: (name) => `Barka da zuwa, ${name}! Me kuke so ku yi?`,
        creditTitle: '📊 Makin Bashin Ku',
        creditGood: 'Matsayi Mai Kyau',
        creditExcellent: 'Nagartacce',
        creditFair: 'Matsakaici — Ci gaba da ingantawa!',
        loanTitle: '💰 Neman Bashi',
        loanQualify: 'Dangane da makin bashinku, kun cancanci:',
        loanAccept: '✅ Karɓi bashi',
        loanDiff: '🔄 Wani adadi',
        loanApproved: '✅ An Amince da Bashi!',
        loanSent: (amt) => `An aika ${amt} zuwa walat ɗin OPay`,
        advisoryTitle: '🌱 Shawarar Noma',
        plantMillet: 'Shuka Gero',
        plantWindow: 'Lokaci mafi kyau: kwanaki 3',
        rainChance: 'Ana sa ran ruwan sama: 85%',
        irrigate: 'Ban Ruwa Wake',
        soilMoisture: 'Danshi ƙasa: Ƙasa (23%)',
        irrigateRec: 'Shawarar: Lita 15 a kowane layi',
        weatherAlert: 'Gargaɗin Yanayi',
        drySpell: 'Rani a cikin kwanaki 10',
        planHarvest: 'Shirya girbi daidai',
        blockchainTitle: '🔗 Pasfọt Bashin Ku',
        blockchainNote: 'Tarihin bashinku ba za a iya canza shi ba, kuma na ku ne.',
        back: 'Komawa menu',
        exit: 'Fita',
        checkScore: '📊 Duba Makin Bashi',
        applyLoan: '💰 Nemi Bashi',
        farmAdvisory: '🌱 Shawarar Noma',
        viewBlockchain: '🔗 Duba Pasfọt Bashi',
        settings: '⚙️ Saituna',
        tapMic: 'Danna makirufo don magana',
        listening: '🔴 Ana saurara...',
        heard: (text) => `An ji: "${text}"`,
        voiceAdvice: 'Ya kamata ku shuka gero cikin kwanaki 3. Ana sa ran ruwan sama da yiwuwar kashi 85. Gonar wake naku tana buƙatar ban ruwa. Zuba lita 15 a kowane layi. Ana sa ran rani cikin kwanaki 10, ku shirya girbi daidai.',
        cropDoctor: '🩺 Likitan Amfanin Gona',
        cropDoctorSub: 'Bayyana alamomin cuta ta murya ko zaɓi əaya daga ƙasa:',
        cropDoctorTap: 'Danna don kwatanta alamomi',
        trustNet: '🌐 Cibiyar Amana',
        trustNetSub: 'Amintattun ku — wa suka tabbatar da ku',
        cropDoctorMenu: '🩺 Likitan Amfanin Gona',
        trustNetMenu: '🌐 Cibiyar Amana',
        rescueMenu: '🚨 Sauke (Harvest Rescue)',
        rescueTitle: '🚨 Sauke - Harvest Rescue',
        rescueSub: 'Tsaya asarar girbi',
        rescueTap: 'Danna & ce: "Tumatir na yana lalacewa"',
    },
    yo: {
        name: 'Yoruba',
        welcome: 'Ẹ kú àbọ̀ sí Voice to Value — ohùn yín ni ìdánimọ̀ owó yín.',
        welcomeStart: 'Tẹ *347*88# tàbí tẹ 1 láti bẹ̀rẹ̀.',
        chooseLang: 'Yan èdè rẹ:',
        registerPrompt: 'Forúkọsílẹ̀ pẹ̀lú ohùn rẹ. Tẹ makirofóònù kí o sọ orúkọ rẹ.',
        registerConfirm: 'Jẹ́rìísí ìforúkọsílẹ̀',
        mainGreeting: (name) => `Ẹ kú àbọ̀, ${name}! Kí ni ẹ fẹ́ ṣe?`,
        creditTitle: '📊 Oṣùwọ̀n Kírẹ́dítì Rẹ',
        creditGood: 'Ipò Tó Dára',
        creditExcellent: 'Ó Dáa Púpọ̀',
        creditFair: 'Àárín — Máa tẹ̀síwájú!',
        loanTitle: '💰 Ìbéèrè Awin',
        loanQualify: 'Ní ìbámu pẹ̀lú oṣùwọ̀n kírẹ́dítì rẹ, o tó fún:',
        loanAccept: '✅ Gba awin',
        loanDiff: '🔄 Iye mìíràn',
        loanApproved: '✅ A Ti Fọwọ́sí Awin!',
        loanSent: (amt) => `A ti fi ${amt} ránṣẹ́ sí wallet OPay rẹ`,
        advisoryTitle: '🌱 Ìmọ̀ràn Oko',
        plantMillet: 'Gbin Ọkà',
        plantWindow: 'Àkókò tó dára jùlọ: ọjọ́ 3',
        rainChance: 'Òjò ń bọ̀: 85%',
        irrigate: 'Bu Omi Ẹ̀wà',
        soilMoisture: 'Ọ̀rinrin ilẹ̀: Kékeré (23%)',
        irrigateRec: 'A ṣe ìmọ̀ràn: Lítà 15 fún ọ̀kọ̀ọ̀kan',
        weatherAlert: 'Ìkìlọ̀ Ojú Ọjọ́',
        drySpell: 'Ọ̀gbẹlẹ̀ ní ọjọ́ 10',
        planHarvest: 'Gbèrò ìkórè rẹ',
        blockchainTitle: '🔗 Ìdánimọ̀ Credit Passport Rẹ',
        blockchainNote: 'Ìtàn kírẹ́dítì rẹ kò lè yí padà, tìrẹ ni.',
        back: 'Padà sí àkójọ',
        exit: 'Jáde',
        checkScore: '📊 Wo Oṣùwọ̀n Kírẹ́dítì',
        applyLoan: '💰 Béèrè Awin',
        farmAdvisory: '🌱 Ìmọ̀ràn Oko',
        viewBlockchain: '🔗 Wo Credit Passport',
        settings: '⚙️ Ètò',
        tapMic: 'Tẹ makirofóònù láti sọ̀rọ̀',
        listening: '🔴 A ń gbọ́...',
        heard: (text) => `A gbọ́: "${text}"`,
        voiceAdvice: 'O yẹ kí o gbin ọkà ní ọjọ́ mẹ́ta. Òjò ń bọ̀ pẹ̀lú àǹfààní ìdá ọgọ́rùn-ún márùn-dín-lógójì. Oko ẹ̀wà rẹ nílò omi. Fi lítà mẹ́ẹ̀ẹ́dógún fún ọ̀kọ̀ọ̀kan. Ọ̀gbẹlẹ̀ ń bọ̀ ní ọjọ́ mẹ́wàá, gbèrò ìkórè rẹ.',
        cropDoctor: '🩺 Dọ́kítà Àmùgbà',
        cropDoctorSub: 'Ṣàpèjúwé àwọn àmì àrùn pẹ̀lú ohùn tàbí yan láti isàlẹ̀:',
        cropDoctorTap: 'Tẹ láti ṣàpèjúwé àmì',
        trustNet: '🌐 Nẹ́tíìdà Ìgbẹ́kẹ̀lé',
        trustNetSub: 'Àwọn tó ń jẹ́rìísí fún ọ',
        cropDoctorMenu: '🩺 Dọ́kítà Àmùgbà',
        trustNetMenu: '🌐 Nẹ́tíìdà Ìgbẹ́kẹ̀lé',
        rescueMenu: '🚨 Harvest Rescue',
        rescueTitle: '🚨 Harvest Rescue',
        rescueSub: 'Stop Harvest Loss',
        rescueTap: 'Tẹ & sọ: "Tòmátì mi ń bàjẹ́"',
    }
};

// ---- App State ----
const state = {
    currentScreen: 'welcome',
    language: 'en',
    farmerName: 'Farmer',
    creditScore: 0,
    loanAmount: '₦ 75,000',
    txHash: '0x7a3f8b2c...e91b4d',
    isListening: false,
    demoMode: false,
    ttsEnabled: true,
    hapticEnabled: true,
    visitedScreens: ['welcome'],
};

// ---- DOM References ----
const phoneScreen = document.getElementById('phoneScreen');
const journeySteps = document.getElementById('journeySteps');
const eventLog = document.getElementById('eventLog');
const voiceFab = document.getElementById('voiceFab');
const btnDemo = document.getElementById('btnDemo');
const btnReset = document.getElementById('btnReset');
const ttsToggle = document.getElementById('ttsToggle');
const hapticToggle = document.getElementById('hapticToggle');
const contrastToggle = document.getElementById('contrastToggle');

// ---- Initialize ----
function init() {
    createParticles();
    bindInputs();
    bindVoice();
    bindControls();
    bindToggles();
    log('system', 'Voice to Value USSD simulator ready.');
    log('system', 'Enter "1" or tap 🎙️ to begin.');
}

// ---- Background Particles ----
function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (8 + Math.random() * 15) + 's';
        p.style.animationDelay = (Math.random() * 10) + 's';
        p.style.width = (2 + Math.random() * 3) + 'px';
        p.style.height = p.style.width;
        container.appendChild(p);
    }
}

// ---- Logging ----
function log(type, message) {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    entry.textContent = `[${time}] ${message}`;
    eventLog.appendChild(entry);
    eventLog.scrollTop = eventLog.scrollHeight;
}

// ---- Screen Navigation ----
function navigateTo(screenId) {
    const screens = phoneScreen.querySelectorAll('.ussd-screen');
    screens.forEach(s => s.classList.remove('active'));

    const target = document.getElementById(`screen-${screenId}`);
    if (target) {
        target.classList.add('active');
        state.currentScreen = screenId;

        // Update journey
        if (!state.visitedScreens.includes(screenId)) {
            state.visitedScreens.push(screenId);
        }
        updateJourney(screenId);

        // Focus the input
        const input = target.querySelector('.ussd-input');
        if (input) setTimeout(() => input.focus(), 100);

        // Animations on specific screens
        if (screenId === 'credit') animateCreditScore();
        if (screenId === 'blockchain') animateBlockchain();

        // Haptic
        if (state.hapticEnabled && navigator.vibrate) {
            navigator.vibrate(50);
        }

        log('action', `Navigated to: ${screenId}`);
    }
}

function updateJourney(active) {
    const steps = journeySteps.querySelectorAll('.step');
    steps.forEach(step => {
        const sid = step.dataset.step;
        step.classList.remove('active', 'completed');
        if (sid === active) {
            step.classList.add('active');
        } else if (state.visitedScreens.includes(sid)) {
            step.classList.add('completed');
        }
    });
}

// ---- Input Handling ----
function bindInputs() {
    document.querySelectorAll('.ussd-send').forEach(btn => {
        btn.addEventListener('click', () => {
            const screen = btn.dataset.screen;
            const input = btn.previousElementSibling;
            handleInput(screen, input.value.trim());
            input.value = '';
        });
    });

    document.querySelectorAll('.ussd-input').forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const screen = input.dataset.screen;
                handleInput(screen, input.value.trim());
                // Don't clear immediately if we want to show it was sent, but standard USSD clears
                input.value = '';
            }
        });
    });

    // Voice indicator click
    const voiceReg = document.getElementById('voiceRegister');
    if (voiceReg) {
        voiceReg.addEventListener('click', () => startVoiceInput('register'));
    }
}

function handleInput(screen, value) {
    if (!value) return;
    const L = LANG[state.language];
    log('input', `[${screen}] User entered: ${value}`);

    switch (screen) {
        case 'welcome':
            if (value === '1') {
                speak(L.chooseLang);
                navigateTo('language');
            }
            break;

        case 'language':
            handleLanguageSelect(value);
            break;

        case 'register':
            if (value === '1') {
                speak(L.mainGreeting(state.farmerName));
                updateMainMenu();
                navigateTo('main');
                updateStats();
            } else if (value === '0') {
                navigateTo('language');
            } else {
                // Treat as Name Input (Text)
                state.farmerName = capitalizeFirst(value);
                log('input', `Name manually entered: ${state.farmerName}`);
                document.getElementById('registerText').textContent = `Name set: ${state.farmerName}`;

                // Visual feedback
                const voiceStatus = document.getElementById('voiceStatus');
                if (voiceStatus) {
                    voiceStatus.textContent = `Hello, ${state.farmerName}`;
                    voiceStatus.style.color = 'var(--green-primary)';
                }
                speak(`Hello, ${state.farmerName}. Press 1 to confirm.`);
            }
            break;

        case 'main':
            if (['1', '2', '3', '4', '5', '6', '7', '0'].includes(value)) {
                handleMainMenu(value);
            } else {
                processNaturalLanguageCommand(value);
            }
            break;

        case 'credit':
            if (value === '1') {
                updateLoanScreen();
                navigateTo('loan');
            } else if (value === '0') {
                navigateTo('main');
            }
            break;

        case 'loan':
            if (value === '1') {
                processLoan();
            } else if (value === '0') {
                navigateTo('main');
            }
            break;

        case 'loan-confirm':
            if (value === '1') {
                navigateTo('blockchain');
            } else if (value === '0') {
                navigateTo('main');
            }
            break;

        case 'advisory':
            if (value === '1') {
                speakAdvisory();
            } else if (value === '0') {
                navigateTo('main');
            }
            break;

        case 'blockchain':
            if (value === '0') navigateTo('main');
            break;

        case 'cropdoctor':
            if (value === '0') {
                navigateTo('main');
            } else if (value >= '1' && value <= '4') {
                runCropDiagnosis(value);
            } else {
                processNaturalLanguageCommand(value);
            }
            break;

        case 'trustnet':
            if (value === '0') {
                navigateTo('main');
            } else if (value === '1') {
                requestNewVoucher();
            } else if (value === '2') {
                vouchForSomeone();
            }
            break;

        case 'rescue':
            if (value === '0') {
                navigateTo('main');
            } else if (value === '1') {
                log('action', '🚨 Rescue Deal Accepted!');
                speak('Deal accepted. Mama Nkechi is on her way to pickup.');
                document.getElementById('rescueDeal').innerHTML = `
                    <div style="text-align:center; color:#00ff88;">
                        <span style="font-size:32px;">✅</span><br>
                        <strong>SOLD!</strong><br>
                        Driver inbound (8 mins)
                    </div>
                `;
            } else if (value.length > 2) {
                // Text description
                runRescueMatch(value);
            }
            break;
    }
}

function handleLanguageSelect(value) {
    const langMap = { '1': 'en', '2': 'ha', '3': 'yo', '4': 'en', '5': 'en' };
    const lang = langMap[value];
    if (lang) {
        state.language = lang;
        const L = LANG[lang];
        document.getElementById('statLang').textContent = L.name;
        log('action', `Language set to: ${L.name}`);
        speak(L.registerPrompt);
        updateRegisterScreen();
        navigateTo('register');
    }
}

function handleMainMenu(value) {
    const L = LANG[state.language];
    switch (value) {
        case '1':
            speak(L.creditTitle);
            navigateTo('credit');
            break;
        case '2':
            updateLoanScreen();
            speak(L.loanTitle);
            navigateTo('loan');
            break;
        case '3':
            speak(L.advisoryTitle);
            updateAdvisoryScreen();
            navigateTo('advisory');
            break;
        case '4':
            speak(L.blockchainTitle);
            navigateTo('blockchain');
            break;
        case '5':
            speak(L.cropDoctor);
            navigateTo('cropdoctor');
            break;
        case '6':
            speak(L.trustNet);
            initTrustNetwork();
            navigateTo('trustnet');
            break;
        case '7':
            speak(L.rescueMenu);
            navigateTo('rescue');
            break;
        case '0':
            navigateTo('welcome');
            break;
    }
}

// ---- Screen Updaters (Multilingual) ----
function updateRegisterScreen() {
    const L = LANG[state.language];
    document.getElementById('registerText').textContent = L.registerPrompt;
    document.getElementById('voiceStatus').textContent = L.tapMic;

    const opts = document.querySelector('#screen-register .ussd-options');
    opts.innerHTML = `
        <div class="ussd-option">1. ${L.registerConfirm}</div>
        <div class="ussd-option">0. ${L.back}</div>
    `;
}

function updateMainMenu() {
    const L = LANG[state.language];
    document.getElementById('mainGreeting').textContent = L.mainGreeting(state.farmerName);

    const opts = document.querySelector('#screen-main .ussd-options');
    opts.innerHTML = `
        <div class="ussd-option">1. ${L.checkScore}</div>
        <div class="ussd-option">2. ${L.applyLoan}</div>
        <div class="ussd-option">3. ${L.farmAdvisory}</div>
        <div class="ussd-option">4. ${L.viewBlockchain}</div>
        <div class="ussd-option">5. ${L.cropDoctorMenu}</div>
        <div class="ussd-option">6. ${L.trustNetMenu}</div>
        <div class="ussd-option">7. ${L.rescueMenu}</div>
        <div class="ussd-option">0. ${L.exit}</div>
    `;
}

function updateLoanScreen() {
    const L = LANG[state.language];
    document.getElementById('loanTitle').textContent = L.loanTitle;

    const info = document.getElementById('loanInfo');
    info.querySelector('p:first-child').textContent = L.loanQualify;

    const opts = document.querySelector('#screen-loan .ussd-options');
    opts.innerHTML = `
        <div class="ussd-option">1. ${L.loanAccept}</div>
        <div class="ussd-option">2. ${L.loanDiff}</div>
        <div class="ussd-option">0. ${L.back}</div>
    `;
}

function updateAdvisoryScreen() {
    const L = LANG[state.language];
    document.getElementById('advisoryTitle').textContent = L.advisoryTitle;

    const cards = document.getElementById('advisoryCards');
    cards.innerHTML = `
        <div class="advisory-card plant">
            <div class="advisory-icon">🌾</div>
            <div class="advisory-info">
                <strong>${L.plantMillet}</strong>
                <p>${L.plantWindow}</p>
                <p>${L.rainChance}</p>
            </div>
        </div>
        <div class="advisory-card water">
            <div class="advisory-icon">💧</div>
            <div class="advisory-info">
                <strong>${L.irrigate}</strong>
                <p>${L.soilMoisture}</p>
                <p>${L.irrigateRec}</p>
            </div>
        </div>
        <div class="advisory-card harvest">
            <div class="advisory-icon">🌤️</div>
            <div class="advisory-info">
                <strong>${L.weatherAlert}</strong>
                <p>${L.drySpell}</p>
                <p>${L.planHarvest}</p>
            </div>
        </div>
    `;
}

// ---- Credit Score Animation ----
function animateCreditScore() {
    state.creditScore = 680 + Math.floor(Math.random() * 120); // 680-800
    const score = state.creditScore;
    const arc = document.getElementById('creditArc');
    const numEl = document.getElementById('creditNumber');
    const labelEl = document.getElementById('creditLabel');
    const L = LANG[state.language];

    // Animate arc (0 to score/850 of full circle)
    const pct = score / 850;
    const circumference = 2 * Math.PI * 50;
    const offset = circumference * (1 - pct);
    setTimeout(() => {
        arc.style.strokeDashoffset = offset;
    }, 100);

    // Animate number
    let current = 0;
    const step = Math.ceil(score / 40);
    const interval = setInterval(() => {
        current += step;
        if (current >= score) {
            current = score;
            clearInterval(interval);
        }
        numEl.textContent = current;
    }, 50);

    // Label
    setTimeout(() => {
        if (score >= 750) labelEl.textContent = L.creditExcellent;
        else if (score >= 650) labelEl.textContent = L.creditGood;
        else labelEl.textContent = L.creditFair;
    }, 2000);

    // Update stat
    document.getElementById('statCredit').textContent = score;
    log('action', `Credit score calculated: ${score}`);
}

// ---- Blockchain Animation ----
function animateBlockchain() {
    const blocks = document.querySelectorAll('.chain-block');
    blocks.forEach((block, i) => {
        block.style.animation = 'none';
        block.offsetHeight; // reflow
        block.style.animation = `blockAppear 0.6s ease ${i * 0.25}s backwards`;
    });
}

// ---- Loan Processing ----
function processLoan() {
    const L = LANG[state.language];
    log('action', 'Processing loan application...');
    speak(L.loanApproved);

    // Generate fake TX hash
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 8; i++) hash += chars[Math.floor(Math.random() * 16)];
    hash += '...';
    for (let i = 0; i < 4; i++) hash += chars[Math.floor(Math.random() * 16)];
    state.txHash = hash;

    document.getElementById('loanTxHash').textContent = hash;
    document.getElementById('statLoan').textContent = 'Approved ✅';
    document.getElementById('statTx').textContent = hash;

    navigateTo('loan-confirm');
    log('action', `Loan approved. TX: ${hash}`);

    if (state.hapticEnabled && navigator.vibrate) {
        navigator.vibrate([100, 50, 100]); // success pattern
    }
}

// ---- Voice (Web Speech API) ----
let recognition = null;
let voiceErrorCount = 0;

function bindVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true; // Enable partial results for speed
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            log('voice', 'Microphone activated. Listening...');
            state.isListening = true;
            voiceFab.classList.add('listening');
            const voiceReg = document.getElementById('voiceRegister');
            const voiceCd = document.getElementById('voiceCropDoctor');

            if (state.voiceContext === 'register' && voiceReg) {
                voiceReg.classList.add('listening');
                document.getElementById('voiceStatus').textContent = LANG[state.language].listening;
            } else if (state.voiceContext === 'cropdoctor' && voiceCd) {
                voiceCd.classList.add('listening');
            } else if (state.voiceContext === 'rescue') {
                const voiceRes = document.getElementById('voiceRescue');
                if (voiceRes) voiceRes.classList.add('listening');
            }
        };

        recognition.onresult = (event) => {
            let finalTranscript = '';
            let interimTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }

            // Show interim results live
            if (interimTranscript && state.currentScreen === 'register') {
                const voiceStatus = document.getElementById('voiceStatus');
                if (voiceStatus) voiceStatus.textContent = `Hearing: "${interimTranscript}..."`;
            }

            if (finalTranscript) {
                handleVoiceCommand(finalTranscript.toLowerCase().trim());
            }
        };

        recognition.onend = () => {
            state.isListening = false;
            voiceFab.classList.remove('listening');
            const voiceReg = document.getElementById('voiceRegister');
            if (voiceReg) {
                voiceReg.classList.remove('listening');
                if (state.currentScreen === 'register') {
                    document.getElementById('voiceStatus').textContent = LANG[state.language].tapMic;
                }
            }
            const voiceCd = document.getElementById('voiceCropDoctor');
            if (voiceCd) voiceCd.classList.remove('listening');
            const voiceRes = document.getElementById('voiceRescue');
            if (voiceRes) voiceRes.classList.remove('listening');
        };

        recognition.onerror = (event) => {
            log('error', `Voice error: ${event.error}`);
            state.isListening = false;
            voiceFab.classList.remove('listening');

            if (event.error === 'not-allowed') {
                alert('Microphone access denied. Please allow microphone permissions.');
            } else if (event.error === 'no-speech') {
                const voiceStatus = document.getElementById('voiceStatus');
                if (voiceStatus) voiceStatus.textContent = 'No speech detected. Try again.';
            }
        };
    } else {
        log('error', 'Web Speech API not supported in this browser.');
    }

    voiceFab.addEventListener('click', () => {
        if (state.isListening && recognition) {
            recognition.stop();
        } else {
            startVoiceInput();
        }
    });

    // Fallback click listener for register mic (if API fails or for easy testing)
    const voiceReg = document.getElementById('voiceRegister');
    if (voiceReg) {
        voiceReg.addEventListener('click', () => {
            // If API is not supported or previously errored, simulate input
            if (!recognition || voiceErrorCount > 2) {
                simulateVoiceInput('Simulated Name');
            } else {
                startVoiceInput('register');
            }
        });
    }
}

function startVoiceInput(context) {
    if (!recognition) {
        alert('Voice control not supported in this browser. Try Chrome or Edge.');
        // Fallback for demo if no API
        if (context === 'register') simulateVoiceInput('Demo Farmer');
        return;
    }

    if (state.isListening) {
        log('voice', 'Already listening...');
        return;
    }

    // Set language for recognition
    const langCodes = { en: 'en-US', ha: 'ha-NG', yo: 'yo-NG' };
    recognition.lang = langCodes[state.language] || 'en-US';
    state.voiceContext = context || state.currentScreen;

    try {
        state.isListening = true; // Set flag immediately to prevent double-start
        recognition.start();
    } catch (e) {
        state.isListening = false;
        log('error', 'Voice start error: ' + e.message);
        if (e.message.includes('already started')) {
            // It's actually fine, we are listening
            state.isListening = true;
        }
    }
}

function simulateVoiceInput(text) {
    log('voice', `[Simulated] Heard: "${text}"`);
    handleVoiceCommand(text.toLowerCase());
}

function handleVoiceCommand(transcript) {
    const L = LANG[state.language];
    log('voice', L.heard(transcript));

    // Update the voice status on register screen
    const voiceStatus = document.getElementById('voiceStatus');
    if (voiceStatus) voiceStatus.textContent = L.heard(transcript);

    // If on register screen, treat as name
    if (state.voiceContext === 'register' || state.currentScreen === 'register') {
        state.farmerName = capitalizeFirst(transcript);
        log('action', `Farmer name set: ${state.farmerName}`);
        speak(`Welcome, ${state.farmerName}`);

        // Auto forward after a brief pause
        setTimeout(() => {
            document.getElementById('registerText').textContent = `Name captured: ${state.farmerName}`;
            // Flash success
            if (voiceStatus) voiceStatus.style.color = 'var(--green-primary)';
        }, 500);
        return;
    }

    // Delegate to shared NLP function
    // If we just captured a name, don't try to process it as a command
    if (state.voiceContext !== 'register' && state.currentScreen !== 'register') {
        processNaturalLanguageCommand(transcript);
    }
}

function processNaturalLanguageCommand(text) {
    const lower = text.toLowerCase();
    const L = LANG[state.language];

    // Common navigation logic
    if (lower.includes('score') || lower.includes('credit') || lower.includes('makin') || lower.includes('bashi')) {
        navigateTo('credit');
        speak(L.creditTitle);
    } else if (lower.includes('loan') || lower.includes('borrow') || lower.includes('nemi') || lower.includes('awin')) {
        updateLoanScreen();
        navigateTo('loan');
        speak(L.loanTitle);
    } else if (lower.includes('farm') || lower.includes('advice') || lower.includes('advisory') || lower.includes('noma') || lower.includes('oko')) {
        updateAdvisoryScreen();
        navigateTo('advisory');
        speak(L.advisoryTitle);
    } else if (lower.includes('blockchain') || lower.includes('chain') || lower.includes('block')) {
        navigateTo('blockchain');
        speak(L.blockchainTitle);
    } else if (lower.includes('back') || lower.includes('menu') || lower.includes('komawa') || lower.includes('padà')) {
        navigateTo('main');
    } else if (lower.includes('hausa')) {
        state.language = 'ha';
        document.getElementById('statLang').textContent = 'Hausa';
        updateMainMenu();
        log('action', 'Language switched to Hausa');
    } else if (lower.includes('yoruba')) {
        state.language = 'yo';
        document.getElementById('statLang').textContent = 'Yoruba';
        updateMainMenu();
        log('action', 'Language switched to Yoruba');
    } else if (lower.includes('english')) {
        state.language = 'en';
        document.getElementById('statLang').textContent = 'English';
        updateMainMenu();
        log('action', 'Language switched to English');
    } else if (lower.includes('crop') || lower.includes('sick') || lower.includes('disease') || lower.includes('doctor') || lower.includes('cuta') || lower.includes('likita')) {
        navigateTo('cropdoctor');
        speak(LANG[state.language].cropDoctor);
    } else if (lower.includes('trust') || lower.includes('network') || lower.includes('vouch') || lower.includes('amana') || lower.includes('igbekele')) {
        initTrustNetwork();
        navigateTo('trustnet');
        speak(LANG[state.language].trustNet);
    } else if (lower.includes('rescue') || lower.includes('harvest') || lower.includes('sell') || lower.includes('rot') || lower.includes('spoil') || lower.includes('help') || lower.includes('sauke')) {
        navigateTo('rescue');
        speak(LANG[state.language].rescueTitle);
    }
    // Crop Doctor Specific Symptoms (Text or Voice)
    else if (state.currentScreen === 'cropdoctor' || lower.includes('yellow') || lower.includes('spot') || lower.includes('pest') || lower.includes('wilt')) {
        if (state.currentScreen !== 'cropdoctor') {
            speak(LANG[state.language].cropDoctor);
            navigateTo('cropdoctor');
        }

        if (lower.includes('yellow') || lower.includes('leaf') || lower.includes('blight')) runCropDiagnosis('1');
        else if (lower.includes('brown') || lower.includes('spot') || lower.includes('circle')) runCropDiagnosis('2');
        else if (lower.includes('pest') || lower.includes('hole') || lower.includes('eat') || lower.includes('worm')) runCropDiagnosis('3');
        else if (lower.includes('wilt') || lower.includes('die') || lower.includes('dry')) runCropDiagnosis('4');
        else if (state.currentScreen === 'rescue') {
            runRescueMatch(lower);
        } else log('system', `Symptom not recognized: "${text}"`);
    } else {
        log('system', `Command not recognized: "${text}"`);
    }
}

// ---- Text to Speech ----
function speak(text) {
    if (!state.ttsEnabled) return;
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const langCodes = { en: 'en-US', ha: 'en-US', yo: 'en-US' }; // Fallback to en for unsupported
    utterance.lang = langCodes[state.language] || 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
    log('voice', `TTS: "${text.substring(0, 60)}..."`);
}

function speakAdvisory() {
    const L = LANG[state.language];
    speak(L.voiceAdvice);
    log('voice', 'Speaking farm advisory to farmer...');
}

// ---- Demo Mode ----
function bindControls() {
    btnDemo.addEventListener('click', runDemo);
    btnReset.addEventListener('click', resetSimulator);
}

async function runDemo() {
    if (state.demoMode) return;
    state.demoMode = true;
    btnDemo.textContent = '⏸️ Running...';
    btnDemo.style.pointerEvents = 'none';
    log('system', '▶️ Demo mode started — auto-playing full journey...');

    await wait(800);

    // Step 1: Welcome → Start
    log('input', '[demo] Entering 1 on welcome screen');
    handleInput('welcome', '1');
    await wait(1500);

    // Step 2: Select Hausa
    log('input', '[demo] Selecting Hausa language');
    handleInput('language', '2');
    await wait(2000);

    // Step 3: Register (simulate voice)
    log('voice', '[demo] Simulating voice: "Amina Ibrahim"');
    state.farmerName = 'Amina Ibrahim';
    document.getElementById('voiceStatus').textContent = LANG[state.language].heard('Amina Ibrahim');
    const voiceReg = document.getElementById('voiceRegister');
    if (voiceReg) {
        voiceReg.classList.add('listening');
        await wait(1500);
        voiceReg.classList.remove('listening');
    }
    await wait(1000);

    // Step 4: Confirm registration
    log('input', '[demo] Confirming registration');
    handleInput('register', '1');
    await wait(2000);

    // Step 5: Check credit score
    log('input', '[demo] Checking credit score');
    handleInput('main', '1');
    await wait(3000);

    // Step 6: Apply for loan from credit screen
    log('input', '[demo] Applying for loan');
    handleInput('credit', '1');
    await wait(2000);

    // Step 7: Accept loan
    log('input', '[demo] Accepting loan');
    handleInput('loan', '1');
    await wait(3000);

    // Step 8: View blockchain
    log('input', '[demo] Viewing blockchain receipt');
    handleInput('loan-confirm', '1');
    await wait(3000);

    // Step 9: Back to menu, then advisory
    log('input', '[demo] Going back to menu');
    handleInput('blockchain', '0');
    await wait(1500);

    log('input', '[demo] Checking farm advisory');
    handleInput('main', '3');
    await wait(2000);

    // Step 10: Hear advice
    log('input', '[demo] Listening to farm advice');
    handleInput('advisory', '1');
    await wait(4000);

    log('system', '✅ Demo complete! Full farmer journey demonstrated.');
    state.demoMode = false;
    btnDemo.textContent = '▶️ Demo Mode';
    btnDemo.style.pointerEvents = 'auto';
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ---- Reset ----
function resetSimulator() {
    state.currentScreen = 'welcome';
    state.language = 'en';
    state.farmerName = 'Farmer';
    state.creditScore = 0;
    state.visitedScreens = ['welcome'];
    state.demoMode = false;

    document.getElementById('statLang').textContent = 'English';
    document.getElementById('statCredit').textContent = '—';
    document.getElementById('statLoan').textContent = '—';
    document.getElementById('statTx').textContent = '—';

    // Reset credit arc
    const arc = document.getElementById('creditArc');
    if (arc) arc.style.strokeDashoffset = 314;
    const numEl = document.getElementById('creditNumber');
    if (numEl) numEl.textContent = '0';

    navigateTo('welcome');
    eventLog.innerHTML = '<div class="log-entry system">Simulator reset. Ready.</div>';

    btnDemo.textContent = '▶️ Demo Mode';
    btnDemo.style.pointerEvents = 'auto';

    log('system', '🔄 Simulator reset to initial state.');
}

// ---- Toggles ----
function bindToggles() {
    ttsToggle.addEventListener('change', (e) => {
        state.ttsEnabled = e.target.checked;
        log('system', `TTS ${state.ttsEnabled ? 'enabled' : 'disabled'}`);
    });

    hapticToggle.addEventListener('change', (e) => {
        state.hapticEnabled = e.target.checked;
        log('system', `Haptic feedback ${state.hapticEnabled ? 'enabled' : 'disabled'}`);
    });

    contrastToggle.addEventListener('change', (e) => {
        document.body.classList.toggle('high-contrast', e.target.checked);
        log('system', `High contrast mode ${e.target.checked ? 'enabled' : 'disabled'}`);
    });
}

// ---- Stats Update ----
function updateStats() {
    document.getElementById('statLang').textContent = LANG[state.language].name;
}

// ---- Utility ----
function capitalizeFirst(str) {
    return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// ======================================================
//  FEATURE 1: VOICE CROP DOCTOR (AI Symptom Diagnosis)
// ======================================================

const CROP_DISEASES = {
    '1': {
        symptom: 'Yellow leaves',
        disease: 'Nitrogen Deficiency / Early Blight',
        confidence: 87,
        urgency: 'medium',
        icon: '🟡',
        details: 'Yellowing of lower leaves spreading upward indicates nitrogen deficiency. If accompanied by concentric rings, suspect Early Blight (Alternaria solani).',
        treatment: [
            '💧 Apply urea fertilizer: 50kg/hectare',
            '🌿 Foliar spray: NPK 20-20-20 solution',
            '⏰ Treat within 5 days for best results',
            '🛡️ Preventive: crop rotation next season'
        ],
        spokenDiag: 'Your crops show signs of nitrogen deficiency or early blight. Apply urea fertilizer at 50 kilograms per hectare. Use a foliar spray of NPK 20-20-20. Treat within 5 days.'
    },
    '2': {
        symptom: 'Brown spots',
        disease: 'Leaf Spot Disease (Cercospora)',
        confidence: 92,
        urgency: 'high',
        icon: '🟤',
        details: 'Circular brown spots with yellow halos are characteristic of Cercospora leaf spot. Common in millet and cowpea during humid conditions.',
        treatment: [
            '⚠️ URGENT: Apply Mancozeb fungicide immediately',
            '💦 Spray rate: 2.5g per litre of water',
            '🔁 Repeat every 7-10 days for 3 cycles',
            '✂️ Remove and burn affected leaves',
            '🛡️ Plant resistant varieties next season'
        ],
        spokenDiag: 'This is likely Cercospora leaf spot disease, which is URGENT. Apply Mancozeb fungicide immediately at 2.5 grams per litre. Repeat every 7 to 10 days. Remove and burn affected leaves.'
    },
    '3': {
        symptom: 'Pest damage',
        disease: 'Stem Borer / Armyworm Infestation',
        confidence: 79,
        urgency: 'high',
        icon: '🐛',
        details: 'Holes in stems and leaves with frass (excrement) suggest stem borer. Ragged leaf edges indicate armyworm feeding. Both spread rapidly.',
        treatment: [
            '⚠️ URGENT: Apply biological control (Bt spray)',
            '🐜 Release Trichogramma parasitoid wasps',
            '🌾 Push-pull method: plant Napier grass border',
            '💡 Pheromone traps within 48 hours',
            '🔥 Destroy crop residues after harvest'
        ],
        spokenDiag: 'You likely have stem borer or armyworm infestation. This is urgent. Apply biological control spray immediately. Set up pheromone traps within 48 hours. Consider the push-pull method with Napier grass.'
    },
    '4': {
        symptom: 'Wilting plants',
        disease: 'Fusarium Wilt / Drought Stress',
        confidence: 84,
        urgency: 'medium',
        icon: '🥀',
        details: 'Wilting despite adequate water suggests Fusarium wilt (fungal). If soil is dry, immediate irrigation is needed. Check stem cross-section for brown discoloration.',
        treatment: [
            '💧 Irrigate immediately if soil is dry',
            '🧪 Check stem: cut cross-section for brown ring',
            '🌿 If fungal: apply Trichoderma bio-fungicide',
            '🔄 Rotate to non-host crop for 2 seasons',
            '🛡️ Solarize soil before next planting'
        ],
        spokenDiag: 'Your plants may have Fusarium wilt or drought stress. Irrigate immediately. Cut a stem to check for brown discoloration. If it\'s fungal, apply Trichoderma bio-fungicide and rotate crops.'
    }
};

function runCropDiagnosis(symptomId) {
    const disease = CROP_DISEASES[symptomId];
    if (!disease) return;

    const diagBox = document.getElementById('cropDiagnosis');
    const diagIcon = document.getElementById('diagIcon');
    const diagTitle = document.getElementById('diagTitle');
    const confBar = document.getElementById('confBar');
    const confPct = document.getElementById('confPct');
    const diagDetails = document.getElementById('diagDetails');
    const diagTreatment = document.getElementById('diagTreatment');

    // Reset & show
    diagBox.style.display = 'block';
    diagIcon.textContent = '⚙️';
    diagTitle.textContent = 'Analyzing symptoms...';
    confBar.style.width = '0%';
    confPct.textContent = '0%';
    diagDetails.textContent = '';
    diagTreatment.innerHTML = '';

    log('action', `🩺 Crop Doctor: Analyzing symptom "${disease.symptom}"...`);
    speak(`Analyzing ${disease.symptom}. Please wait.`);

    // Simulate AI scanning animation
    const voiceCd = document.getElementById('voiceCropDoctor');
    if (voiceCd) voiceCd.classList.add('listening');

    // Phase 1: scanning (1s)
    setTimeout(() => {
        if (voiceCd) voiceCd.classList.remove('listening');

        // Phase 2: reveal diagnosis
        diagIcon.textContent = disease.icon;
        const urgencyHtml = `<span class="urgency-badge urgency-${disease.urgency}">${disease.urgency}</span>`;
        diagTitle.innerHTML = `${disease.disease} ${urgencyHtml}`;

        // Animate confidence
        setTimeout(() => {
            confBar.style.width = disease.confidence + '%';
        }, 100);
        let confCount = 0;
        const confInterval = setInterval(() => {
            confCount += 2;
            if (confCount >= disease.confidence) {
                confCount = disease.confidence;
                clearInterval(confInterval);
            }
            confPct.textContent = confCount + '%';
        }, 30);

        // Details
        diagDetails.textContent = disease.details;

        // Treatment card
        const treatmentHtml = `
            <p class="treatment-title">💊 Recommended Treatment:</p>
            ${disease.treatment.map(t => `<p>${t}</p>`).join('')}
        `;
        diagTreatment.innerHTML = treatmentHtml;

        log('action', `🩺 Diagnosis: ${disease.disease} (${disease.confidence}% confidence, ${disease.urgency} urgency)`);
        speak(disease.spokenDiag);

        if (state.hapticEnabled && navigator.vibrate) {
            if (disease.urgency === 'high') {
                navigator.vibrate([200, 100, 200, 100, 200]); // urgent pattern
            } else {
                navigator.vibrate([100, 50, 100]);
            }
        }
    }, 1200);
}

// Bind crop doctor voice indicator click
document.addEventListener('DOMContentLoaded', () => {
    const voiceCd = document.getElementById('voiceCropDoctor');
    if (voiceCd) {
        voiceCd.addEventListener('click', () => startVoiceInput('cropdoctor'));
    }
});


// ======================================================
//  FEATURE 2: COMMUNITY TRUST NETWORK (Social Graph)
// ======================================================

const TRUST_MEMBERS = [
    { name: 'Fatima Yusuf', role: 'Cooperative Leader', type: 'voucher', score: 820, color: '#00b4ff' },
    { name: 'Ibrahim Musa', role: 'Neighboring Farmer', type: 'voucher', score: 710, color: '#00ff88' },
    { name: 'Hadiza Abdullahi', role: 'Market Trader', type: 'voucher', score: 690, color: '#a855f7' },
    { name: 'Aisha Bello', role: 'New Farmer', type: 'vouched', score: 580, color: '#ff8c00' },
    { name: 'Musa Danladi', role: 'Input Supplier', type: 'vouched', score: 640, color: '#ff4757' },
];

let trustAnimFrame = null;

function initTrustNetwork() {
    // Populate member list
    const membersDiv = document.getElementById('trustMembers');
    membersDiv.innerHTML = '';
    TRUST_MEMBERS.forEach(m => {
        const el = document.createElement('div');
        el.className = 'trust-member';
        el.innerHTML = `
            <span>
                <span class="trust-member-name">${m.name}</span>
                <span class="trust-member-role"> • ${m.role}</span>
            </span>
            <span class="trust-badge ${m.type}">${m.type === 'voucher' ? 'Vouches for you' : 'You vouch'}</span>
        `;
        membersDiv.appendChild(el);
    });

    // Animate stats counters
    const vouchersEl = document.getElementById('trustVouchers');
    const vouchedEl = document.getElementById('trustVouched');
    const trustScoreEl = document.getElementById('trustScore');

    const vouchers = TRUST_MEMBERS.filter(m => m.type === 'voucher').length;
    const vouched = TRUST_MEMBERS.filter(m => m.type === 'vouched').length;
    const trustScore = Math.min(100, Math.round((vouchers * 20 + vouched * 10 + 30)));

    animateCounter(vouchersEl, 0, vouchers, 800);
    animateCounter(vouchedEl, 0, vouched, 800);
    animateCounter(trustScoreEl, 0, trustScore, 1200);

    log('action', `🌐 Trust Network: ${vouchers} vouchers, ${vouched} vouched, score ${trustScore}`);

    // Start animated canvas graph
    drawTrustGraph();
}

function animateCounter(el, from, to, duration) {
    const start = performance.now();
    function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        el.textContent = Math.round(from + (to - from) * eased);
        if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

function drawTrustGraph() {
    const canvas = document.getElementById('trustCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;

    // Center node (the farmer)
    const centerNode = {
        x: cx, y: cy, r: 18,
        label: state.farmerName.split(' ')[0] || 'You',
        color: '#00ff88'
    };

    // Orbiting nodes
    const orbitR = 80;
    const nodes = TRUST_MEMBERS.map((m, i) => {
        const angle = (i / TRUST_MEMBERS.length) * Math.PI * 2 - Math.PI / 2;
        return {
            baseAngle: angle,
            orbitSpeed: 0.0003 + Math.random() * 0.0003,
            r: 12,
            label: m.name.split(' ')[0],
            color: m.color,
            type: m.type,
            x: 0, y: 0
        };
    });

    let startTime = performance.now();

    function frame(now) {
        const elapsed = now - startTime;
        ctx.clearRect(0, 0, W, H);

        // Draw orbit ring
        ctx.beginPath();
        ctx.arc(cx, cy, orbitR, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.07)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Update positions & draw connections
        nodes.forEach((node, i) => {
            const angle = node.baseAngle + elapsed * node.orbitSpeed;
            node.x = cx + Math.cos(angle) * orbitR;
            node.y = cy + Math.sin(angle) * orbitR;

            // Connection line
            const pulse = 0.3 + 0.2 * Math.sin(elapsed * 0.002 + i);
            ctx.beginPath();
            ctx.moveTo(centerNode.x, centerNode.y);
            ctx.lineTo(node.x, node.y);
            ctx.strokeStyle = node.type === 'voucher'
                ? `rgba(0, 180, 255, ${pulse})`
                : `rgba(168, 85, 247, ${pulse})`;
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Data flow particles
            const t = (elapsed * 0.001 + i * 0.5) % 1;
            const px = centerNode.x + (node.x - centerNode.x) * t;
            const py = centerNode.y + (node.y - centerNode.y) * t;
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fillStyle = node.color;
            ctx.globalAlpha = 1 - t;
            ctx.fill();
            ctx.globalAlpha = 1;
        });

        // Draw outer nodes
        nodes.forEach(node => {
            // Glow
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.r + 4, 0, Math.PI * 2);
            ctx.fillStyle = node.color.replace(')', ', 0.15)').replace('rgb', 'rgba');
            ctx.fill();

            // Circle
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
            ctx.fillStyle = '#0a1628';
            ctx.fill();
            ctx.strokeStyle = node.color;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Label
            ctx.fillStyle = node.color;
            ctx.font = '8px JetBrains Mono, monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(node.label, node.x, node.y);
        });

        // Draw center node
        // Outer glow
        const glowPulse = 18 + 4 * Math.sin(elapsed * 0.003);
        ctx.beginPath();
        ctx.arc(cx, cy, glowPulse + 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 136, 0.06)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(cx, cy, centerNode.r, 0, Math.PI * 2);
        ctx.fillStyle = '#001a0e';
        ctx.fill();
        ctx.strokeStyle = centerNode.color;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.fillStyle = centerNode.color;
        ctx.font = 'bold 9px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(centerNode.label, cx, cy);

        trustAnimFrame = requestAnimationFrame(frame);
    }

    // Stop previous animation if any
    if (trustAnimFrame) cancelAnimationFrame(trustAnimFrame);
    trustAnimFrame = requestAnimationFrame(frame);
}

function requestNewVoucher() {
    log('action', '🌐 Requesting new voucher via voice call...');
    speak('Sending voucher request to your cooperative leader. They will receive a voice call to confirm.');

    if (state.hapticEnabled && navigator.vibrate) {
        navigator.vibrate([50, 30, 50]);
    }
}

function vouchForSomeone() {
    log('action', '🌐 Starting vouch-for flow...');
    speak('To vouch for a farmer, say their name after the beep.');

    if (state.hapticEnabled && navigator.vibrate) {
        navigator.vibrate([50, 30, 50]);
    }
}

// ---- Boot ----
document.addEventListener('DOMContentLoaded', init);

// Bind Rescue Voice
document.addEventListener('DOMContentLoaded', () => {
    const voiceRes = document.getElementById('voiceRescue');
    if (voiceRes) {
        voiceRes.addEventListener('click', () => startVoiceInput('rescue'));
    }
});

// Rescue Matching Simulation
function runRescueMatch(query) {
    log('action', `🚨 Rescue: Analyzing surplus "${query}"...`);
    speak('Searching for buyers nearby... Found a match.');

    const deal = document.getElementById('rescueDeal');
    deal.style.display = 'block';
    deal.classList.add('pop-in');

    // Add option to Accept
    const opts = document.querySelector('#screen-rescue .ussd-options');
    opts.innerHTML = `
        <div class="ussd-option">1. ✅ ACCEPT ₦5,000</div>
        <div class="ussd-option">0. Cancel</div>
    `;

    if (state.hapticEnabled && navigator.vibrate) {
        navigator.vibrate([200, 50, 200]);
    }
}
