/* =========================================================
   KHELOGRAM - STAGE 7
   Stage 1-5 + Stage 6 + Stage 7
   Beginner-friendly localStorage prototype
   ========================================================= */

let selectedRole = "Athlete";
let authMode = "register";
let currentTournamentId = null;
let toastTimer = null;

const STORAGE_KEYS = {
    USER: "khelogramUser",
    PROFILE: "khelogramProfile",
    COACH: "khelogramCoach",
    TOURNAMENTS: "khelogramTournamentRegistrations",
    POSTS: "khelogramCommunityPosts",
    LIKES: "khelogramCommunityLikes",
    ACHIEVEMENTS: "khelogramAchievements"
};

/* =========================================================
   DEMO COACH DATA
   ========================================================= */

const coaches = [
    {
        id:1,
        name:"Ravi Kumar",
        sport:"Cricket",
        location:"Lucknow",
        experience:"8 years",
        initials:"RK"
    },
    {
        id:2,
        name:"Amit Singh",
        sport:"Football",
        location:"Barabanki",
        experience:"6 years",
        initials:"AS"
    },
    {
        id:3,
        name:"Priya Sharma",
        sport:"Athletics",
        location:"Kanpur",
        experience:"9 years",
        initials:"PS"
    },
    {
        id:4,
        name:"Suresh Yadav",
        sport:"Kabaddi",
        location:"Ayodhya",
        experience:"7 years",
        initials:"SY"
    },
    {
        id:5,
        name:"Neha Verma",
        sport:"Hockey",
        location:"Lucknow",
        experience:"5 years",
        initials:"NV"
    },
    {
        id:6,
        name:"Vikas Mishra",
        sport:"Volleyball",
        location:"Unnao",
        experience:"10 years",
        initials:"VM"
    }
];

/* =========================================================
   GROUND DATA
   ========================================================= */

const grounds = [
    {
        id:1,
        name:"Lucknow Rural Sports Ground",
        district:"Lucknow",
        village:"Mohanlalganj",
        sport:"Cricket",
        capacity:500,
        facility:"Changing Room",
        condition:"Good",
        status:"Available",
        icon:"🏟️"
    },
    {
        id:2,
        name:"Barabanki Community Ground",
        district:"Barabanki",
        village:"Nawabganj",
        sport:"Football",
        capacity:350,
        facility:"Flood Lights",
        condition:"Good",
        status:"Available",
        icon:"🏟️"
    },
    {
        id:3,
        name:"Ayodhya Rural Sports Field",
        district:"Ayodhya",
        village:"Sohawal",
        sport:"Kabaddi",
        capacity:250,
        facility:"Open Field",
        condition:"Fair",
        status:"Maintenance",
        icon:"🏟️"
    },
    {
        id:4,
        name:"Kanpur Village Athletics Ground",
        district:"Kanpur",
        village:"Bilhaur",
        sport:"Athletics",
        capacity:400,
        facility:"Running Track",
        condition:"Good",
        status:"Available",
        icon:"🏟️"
    },
    {
        id:5,
        name:"Unnao Community Sports Ground",
        district:"Unnao",
        village:"Safipur",
        sport:"Hockey",
        capacity:300,
        facility:"Flood Lights",
        condition:"Good",
        status:"Occupied",
        icon:"🏟️"
    },
    {
        id:6,
        name:"Barabanki Volleyball Arena",
        district:"Barabanki",
        village:"Fatehpur",
        sport:"Volleyball",
        capacity:180,
        facility:"Volleyball Court",
        condition:"Good",
        status:"Available",
        icon:"🏟️"
    }
];

/* =========================================================
   TOURNAMENT DATA
   ========================================================= */

const tournaments = [
    {
        id:"T001",
        name:"KheloGram Rural Cricket Cup",
        sport:"Cricket",
        district:"Lucknow",
        village:"Mohanlalganj",
        venue:"Lucknow Rural Sports Ground",
        startDate:"2026-09-05",
        endDate:"2026-09-07",
        registrationDeadline:"2026-08-30",
        participants:64,
        capacity:80,
        entryFee:"Free",
        organizer:"Mohanlalganj Sports Committee",
        category:"U-19",
        icon:"🏏",
        description:"A village-level cricket competition connecting young rural players with local sporting opportunities.",
        prize:"Trophy + Certificates",
        contact:"KheloGram Sports Desk"
    },
    {
        id:"T002",
        name:"Awadh Grassroots Football League",
        sport:"Football",
        district:"Barabanki",
        village:"Nawabganj",
        venue:"Barabanki Community Ground",
        startDate:"2026-09-12",
        endDate:"2026-09-14",
        registrationDeadline:"2026-09-05",
        participants:48,
        capacity:64,
        entryFee:"Free",
        organizer:"Barabanki District Sports Club",
        category:"Open",
        icon:"⚽",
        description:"A grassroots football tournament designed to give village teams structured competitive experience.",
        prize:"Trophy + Sports Kits",
        contact:"District Sports Coordinator"
    },
    {
        id:"T003",
        name:"Ayodhya Rural Kabaddi Championship",
        sport:"Kabaddi",
        district:"Ayodhya",
        village:"Sohawal",
        venue:"Ayodhya Rural Sports Field",
        startDate:"2026-09-20",
        endDate:"2026-09-21",
        registrationDeadline:"2026-09-14",
        participants:40,
        capacity:48,
        entryFee:"₹100",
        organizer:"Ayodhya Rural Kabaddi Association",
        category:"Open",
        icon:"🤼",
        description:"Competitive kabaddi for village athletes with an opportunity to be noticed by district-level coaches.",
        prize:"₹10,000 + Trophy",
        contact:"Kabaddi Association Desk"
    },
    {
        id:"T004",
        name:"KheloGram Athletics Talent Meet",
        sport:"Athletics",
        district:"Kanpur",
        village:"Bilhaur",
        venue:"Kanpur Village Athletics Ground",
        startDate:"2026-09-27",
        endDate:"2026-09-28",
        registrationDeadline:"2026-09-20",
        participants:55,
        capacity:100,
        entryFee:"Free",
        organizer:"Kanpur Rural Athletics Council",
        category:"U-17",
        icon:"🏃",
        description:"Track and field events designed to identify promising young athletes from rural communities.",
        prize:"Medals + Certificates",
        contact:"Athletics Event Coordinator"
    },
    {
        id:"T005",
        name:"Unnao Rural Hockey Challenge",
        sport:"Hockey",
        district:"Unnao",
        village:"Safipur",
        venue:"Unnao Community Sports Ground",
        startDate:"2026-10-03",
        endDate:"2026-10-05",
        registrationDeadline:"2026-09-25",
        participants:70,
        capacity:80,
        entryFee:"₹150",
        organizer:"Unnao Hockey Development Group",
        category:"Open",
        icon:"🏑",
        description:"A competitive rural hockey event focused on team development and district-level talent discovery.",
        prize:"₹15,000 + Trophy",
        contact:"Hockey Development Desk"
    },
    {
        id:"T006",
        name:"Barabanki Village Volleyball Open",
        sport:"Volleyball",
        district:"Barabanki",
        village:"Fatehpur",
        venue:"Barabanki Volleyball Arena",
        startDate:"2026-10-10",
        endDate:"2026-10-11",
        registrationDeadline:"2026-10-03",
        participants:30,
        capacity:48,
        entryFee:"Free",
        organizer:"Fatehpur Village Sports Committee",
        category:"Open",
        icon:"🏐",
        description:"An open volleyball competition bringing village teams together for organized competition.",
        prize:"Trophy + Certificates",
        contact:"Tournament Coordinator"
    },
    {
        id:"T007",
        name:"Lucknow Rural Badminton Open",
        sport:"Badminton",
        district:"Lucknow",
        village:"Malihabad",
        venue:"Malihabad Community Sports Hall",
        startDate:"2026-10-17",
        endDate:"2026-10-18",
        registrationDeadline:"2026-10-10",
        participants:22,
        capacity:40,
        entryFee:"₹100",
        organizer:"Malihabad Sports Collective",
        category:"Open",
        icon:"🏸",
        description:"A local badminton competition for emerging rural players.",
        prize:"Medals + Certificates",
        contact:"Badminton Event Desk"
    },
    {
        id:"T008",
        name:"Awadh Wrestling Talent Search",
        sport:"Wrestling",
        district:"Ayodhya",
        village:"Rudauli",
        venue:"Rudauli Rural Akhara",
        startDate:"2026-10-24",
        endDate:"2026-10-25",
        registrationDeadline:"2026-10-17",
        participants:36,
        capacity:50,
        entryFee:"Free",
        organizer:"Awadh Rural Wrestling Council",
        category:"U-19",
        icon:"🤼",
        description:"A grassroots wrestling meet focused on discovering promising rural athletes.",
        prize:"Trophy + Sports Scholarship Recommendation",
        contact:"Wrestling Council Desk"
    }
];

/* =========================================================
   COMMUNITY DEMO POSTS
   ========================================================= */

const defaultPosts = [
    {
        id:"P001",
        name:"KheloGram Sports Desk",
        role:"Community",
        sport:"Football",
        title:"Grassroots football season is starting!",
        content:"Village teams around Barabanki are preparing for structured competition. Share your training updates with the community.",
        createdAt:"2026-08-10T09:30:00",
        likes:18
    },
    {
        id:"P002",
        name:"Priya Sharma",
        role:"Athlete",
        sport:"Athletics",
        title:"First podium finish 🥉",
        content:"Completed my first village athletics meet and finished on the podium. Thank you to everyone who supported my training.",
        createdAt:"2026-08-09T15:00:00",
        likes:27
    },
    {
        id:"P003",
        name:"Mohanlalganj Sports Committee",
        role:"Organizer",
        sport:"Cricket",
        title:"Cricket Cup registrations open",
        content:"The KheloGram Rural Cricket Cup is accepting registrations. Check the Tournaments section for details.",
        createdAt:"2026-08-07T10:15:00",
        likes:12
    }
];

/* =========================================================
   STAGE 7 DEMO ATHLETE DATA
   ========================================================= */

const demoAthletes = [
    {
        name:"Rahul Verma",
        sport:"Cricket",
        district:"Lucknow",
        village:"Mohanlalganj",
        participation:8,
        achievements:3,
        score:84
    },
    {
        name:"Anjali Singh",
        sport:"Athletics",
        district:"Kanpur",
        village:"Bilhaur",
        participation:10,
        achievements:4,
        score:91
    },
    {
        name:"Aman Yadav",
        sport:"Football",
        district:"Barabanki",
        village:"Nawabganj",
        participation:7,
        achievements:2,
        score:78
    },
    {
        name:"Sita Devi",
        sport:"Kabaddi",
        district:"Ayodhya",
        village:"Sohawal",
        participation:9,
        achievements:3,
        score:86
    },
    {
        name:"Vivek Kumar",
        sport:"Hockey",
        district:"Unnao",
        village:"Safipur",
        participation:6,
        achievements:2,
        score:75
    },
    {
        name:"Neha Patel",
        sport:"Volleyball",
        district:"Barabanki",
        village:"Fatehpur",
        participation:8,
        achievements:3,
        score:82
    }
];

/* =========================================================
   START APPLICATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeApplication
);

function initializeApplication(){

    setupAuthForm();
    setupProfileForm();
    setupPostForm();
    setupAchievementForm();

    renderCoaches();
    renderGrounds();
    initializeTournamentSection();

    loadProfileIntoForm();
    loadStoredUser();

    updateDashboardData();
    updateInsights();

    renderCommunity();
    renderAchievements();
    renderSportsIntelligence();
}

/* =========================================================
   LANDING
   ========================================================= */

function scrollToSection(id){

    const element =
        document.getElementById(id);

    if(!element) return;

    element.scrollIntoView({
        behavior:"smooth"
    });
}

/* =========================================================
   ROLE SELECTOR
   ========================================================= */

function openRoleSelector(){

    document
        .getElementById("roleModal")
        ?.classList.remove("hidden");
}

function closeRoleSelector(){

    document
        .getElementById("roleModal")
        ?.classList.add("hidden");
}

function selectRole(role){

    selectedRole = role;

    closeRoleSelector();
    openAuthModal();
}

/* =========================================================
   AUTH MODAL
   ========================================================= */

function openAuthModal(){

    document
        .getElementById("authModal")
        ?.classList.remove("hidden");

    switchAuth("register");
}

function closeAuthModal(){

    document
        .getElementById("authModal")
        ?.classList.add("hidden");
}

function switchAuth(mode){

    authMode = mode;

    const registerTab =
        document.getElementById("registerTab");

    const loginTab =
        document.getElementById("loginTab");

    const nameField =
        document.getElementById("nameField");

    const title =
        document.getElementById("authTitle");

    const subtitle =
        document.getElementById("authSubtitle");

    const button =
        document.getElementById("authButtonText");

    const password =
        document.getElementById("authPassword");

    registerTab?.classList.toggle(
        "active",
        mode === "register"
    );

    loginTab?.classList.toggle(
        "active",
        mode === "login"
    );

    if(mode === "register"){

        if(nameField){
            nameField.style.display = "block";
        }

        if(title){
            title.textContent =
                "Create your account";
        }

        if(subtitle){
            subtitle.textContent =
                "Join the KheloGram ecosystem.";
        }

        if(button){
            button.textContent =
                "Create Account";
        }

        if(password){
            password.placeholder =
                "Create a password";
        }

    }else{

        if(nameField){
            nameField.style.display = "none";
        }

        if(title){
            title.textContent =
                "Welcome back";
        }

        if(subtitle){
            subtitle.textContent =
                "Login to your KheloGram dashboard.";
        }

        if(button){
            button.textContent =
                "Login";
        }

        if(password){
            password.placeholder =
                "Enter your password";
        }
    }
}

/* =========================================================
   AUTH FORM
   ========================================================= */

function setupAuthForm(){

    const form =
        document.getElementById("authForm");

    if(!form) return;

    form.addEventListener(
        "submit",
        function(event){

            event.preventDefault();

            const name =
                document
                    .getElementById("authName")
                    ?.value
                    .trim() || "";

            const email =
                document
                    .getElementById("authEmail")
                    ?.value
                    .trim() || "";

            const password =
                document
                    .getElementById("authPassword")
                    ?.value || "";

            if(!email || !password){

                showToast(
                    "Please enter your email and password."
                );

                return;
            }

            let user;

            if(authMode === "register"){

                user = {
                    name:
                        name ||
                        "KheloGram Athlete",

                    email:email,

                    role:selectedRole,

                    createdAt:
                        new Date().toISOString()
                };

            }else{

                user =
                    getStoredUser() ||
                    {
                        name:
                            name ||
                            "KheloGram User",

                        email:email,

                        role:selectedRole
                    };

                user.email = email;
            }

            setStorageItem(
                STORAGE_KEYS.USER,
                user
            );

            closeAuthModal();

            showDashboard();

            showToast(
                authMode === "register"
                    ? "Account created successfully."
                    : "Welcome back to KheloGram."
            );
        }
    );
}

/* =========================================================
   USER
   ========================================================= */

function getStoredUser(){

    return getStorageItem(
        STORAGE_KEYS.USER,
        null
    );
}

function loadStoredUser(){

    const user =
        getStoredUser();

    if(user){
        updateUserUI(user);
    }
}

function showDashboard(){

    document
        .getElementById("landingPage")
        ?.classList.add("hidden");

    document
        .getElementById("dashboardPage")
        ?.classList.remove("hidden");

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

    const user =
        getStoredUser();

    if(user){
        updateUserUI(user);
    }

    updateDashboardData();
    renderCommunity();
    renderAchievements();
    renderSportsIntelligence();
}

function updateUserUI(user){

    const name =
        user.name || "User";

    const initials =
        getInitials(name);

    setText(
        "dashboardName",
        name.split(/\s+/)[0]
    );

    setText(
        "userDisplayName",
        name
    );

    setText(
        "userRole",
        user.role || "Athlete"
    );

    setText(
        "userInitials",
        initials
    );

    setText(
        "passportInitials",
        initials
    );

    setText(
        "profileAvatar",
        initials
    );

    if(!getStoredProfile()?.name){

        setText(
            "profileCardName",
            name
        );
    }

    setText(
        "dashboardSubtitle",
        `${user.role || "Athlete"} sports ecosystem.`
    );
}

function logout(){

    localStorage.removeItem(
        STORAGE_KEYS.USER
    );

    document
        .getElementById("dashboardPage")
        ?.classList.add("hidden");

    document
        .getElementById("landingPage")
        ?.classList.remove("hidden");

    showToast(
        "You have been logged out."
    );

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}

/* =========================================================
   DASHBOARD NAVIGATION
   ========================================================= */

function showDashboardSection(
    sectionName,
    button
){

    document
        .querySelectorAll(".dashboard-section")
        .forEach(section => {
            section.classList.add("hidden");
        });

    document
        .getElementById(
            `section-${sectionName}`
        )
        ?.classList.remove("hidden");

    document
        .querySelectorAll(".menu-item")
        .forEach(item => {
            item.classList.remove("active");
        });

    if(button){
        button.classList.add("active");
    }

    if(sectionName === "coaches"){
        renderCoaches();
    }

    if(sectionName === "grounds"){
        renderGrounds();
    }

    if(sectionName === "tournaments"){
        initializeTournamentSection();
    }

    if(sectionName === "community"){
        renderCommunity();
    }

    if(sectionName === "achievements"){
        renderAchievements();
    }

    if(sectionName === "insights"){
        updateInsights();
    }

    if(sectionName === "intelligence"){
        renderSportsIntelligence();
    }

    if(sectionName === "overview"){
        updateDashboardData();
    }

    if(sectionName === "profile"){
        loadProfileIntoForm();
    }
}

/* =========================================================
   PROFILE
   ========================================================= */

function setupProfileForm(){

    const form =
        document.getElementById("profileForm");

    if(!form) return;

    form.addEventListener(
        "submit",
        function(event){

            event.preventDefault();

            const profile = {

                name:
                    document
                        .getElementById("profileName")
                        ?.value
                        .trim() || "",

                age:
                    document
                        .getElementById("profileAge")
                        ?.value || "",

                village:
                    document
                        .getElementById("profileVillage")
                        ?.value
                        .trim() || "",

                district:
                    document
                        .getElementById("profileDistrict")
                        ?.value
                        .trim() || "",

                sport:
                    document
                        .getElementById("profileSport")
                        ?.value || "",

                skill:
                    document
                        .getElementById("profileSkill")
                        ?.value || "",

                achievements:
                    document
                        .getElementById("profileAchievements")
                        ?.value
                        .trim() || ""
            };

            setStorageItem(
                STORAGE_KEYS.PROFILE,
                profile
            );

            const user =
                getStoredUser();

            if(user && profile.name){

                user.name =
                    profile.name;

                setStorageItem(
                    STORAGE_KEYS.USER,
                    user
                );

                updateUserUI(user);
            }

            updateDashboardData();
            updateInsights();
            renderAchievements();

            showToast(
                "Sports Passport saved successfully."
            );
        }
    );
}

function getStoredProfile(){

    return getStorageItem(
        STORAGE_KEYS.PROFILE,
        null
    );
}

function loadProfileIntoForm(){

    const profile =
        getStoredProfile();

    if(!profile) return;

    setValue(
        "profileName",
        profile.name
    );

    setValue(
        "profileAge",
        profile.age
    );

    setValue(
        "profileVillage",
        profile.village
    );

    setValue(
        "profileDistrict",
        profile.district
    );

    setValue(
        "profileSport",
        profile.sport
    );

    setValue(
        "profileSkill",
        profile.skill
    );

    setValue(
        "profileAchievements",
        profile.achievements
    );
}

function calculateProfileCompletion(profile){

    if(!profile){
        return 0;
    }

    const fields = [
        profile.name,
        profile.age,
        profile.village,
        profile.district,
        profile.sport,
        profile.skill,
        profile.achievements
    ];

    const completed =
        fields.filter(value =>
            value !== undefined &&
            value !== null &&
            String(value).trim() !== ""
        ).length;

    return Math.round(
        completed /
        fields.length *
        100
    );
}

function updateDashboardData(){

    const profile =
        getStoredProfile();

    const user =
        getStoredUser();

    const completion =
        calculateProfileCompletion(
            profile
        );

    const achievements =
        getAchievementsForCurrentUser();

    setText(
        "profileCompletion",
        `${completion}%`
    );

    setText(
        "primarySport",
        profile?.sport || "Not set"
    );

    setText(
        "passportName",
        profile?.name ||
        user?.name ||
        "Complete your profile"
    );

    setText(
        "passportLocation",
        profile?.village &&
        profile?.district
            ? `${profile.village}, ${profile.district}`
            : "Add your village and district"
    );

    setText(
        "passportSport",
        profile?.sport ||
        "Sport not selected"
    );

    setText(
        "coachStatus",
        localStorage.getItem(
            STORAGE_KEYS.COACH
        )
            ? "Connected"
            : "Not connected"
    );

    setText(
        "achievementCount",
        achievements.length
    );

    setText(
        "profileAchievementTotal",
        achievements.length
    );

    setText(
        "profilePostTotal",
        getUserPosts().length
    );

    setText(
        "profileCardName",
        profile?.name ||
        user?.name ||
        "Your Name"
    );

    setText(
        "profileCardSport",
        profile?.sport ||
        "Sport not selected"
    );

    const talent =
        completion >= 80
            ? "Ready"
            : completion >= 50
                ? "Developing"
                : "Building";

    setText(
        "talentStatus",
        talent
    );

    const talentScore =
        calculateTalentScore();

    setText(
        "aiSummary",
        profile?.sport
            ? `Your ${profile.sport} profile currently has a prototype talent signal of ${talentScore}/100 with ${achievements.length} achievement(s). Continue adding verified participation and results.`
            : "Complete your sports profile to generate a personalized talent profile."
    );
}

/* =========================================================
   COACHES
   ========================================================= */

function renderCoaches(
    list = coaches
){

    const grid =
        document.getElementById(
            "coachGrid"
        );

    if(!grid) return;

    if(!list.length){

        grid.innerHTML = `
            <div class="empty-panel">
                <div>🔎</div>
                <h3>No coaches found</h3>
                <p>Try another sport or location.</p>
            </div>
        `;

        return;
    }

    grid.innerHTML =
        list.map(coach => {

            const connected =
                localStorage.getItem(
                    STORAGE_KEYS.COACH
                ) === String(coach.id);

            return `
                <div class="coach-card">

                    <div class="coach-avatar">
                        ${escapeHTML(
                            coach.initials
                        )}
                    </div>

                    <h3>
                        ${escapeHTML(
                            coach.name
                        )}
                    </h3>

                    <p>
                        ${escapeHTML(
                            coach.sport
                        )}
                    </p>

                    <small>
                        📍 ${escapeHTML(
                            coach.location
                        )}
                    </small>

                    <small>
                        Experience:
                        ${escapeHTML(
                            coach.experience
                        )}
                    </small>

                    ${
                        connected
                            ? `
                                <div class="connection-status">
                                    ✓ Connected
                                </div>
                            `
                            : `
                                <button
                                    class="primary-btn"
                                    onclick="connectCoach(${coach.id})"
                                >
                                    Connect Coach →
                                </button>
                            `
                    }

                </div>
            `;
        }).join("");
}

function filterCoaches(){

    const search =
        document
            .getElementById("coachSearch")
            ?.value
            .toLowerCase()
            .trim() || "";

    const sport =
        document
            .getElementById(
                "coachSportFilter"
            )
            ?.value || "";

    renderCoaches(
        coaches.filter(coach => {

            const text =
                `${coach.name} ${coach.sport} ${coach.location}`
                    .toLowerCase();

            return (
                (!search ||
                    text.includes(search)) &&
                (!sport ||
                    coach.sport === sport)
            );
        })
    );
}

function connectCoach(id){

    const coach =
        coaches.find(
            item => item.id === id
        );

    if(!coach) return;

    localStorage.setItem(
        STORAGE_KEYS.COACH,
        String(id)
    );

    updateDashboardData();
    updateInsights();
    renderSportsIntelligence();
    renderCoaches();

    showToast(
        `Connected with ${coach.name}.`
    );
}

/* =========================================================
   GROUNDS
   ========================================================= */

function renderGrounds(
    list = grounds
){

    const grid =
        document.getElementById(
            "groundGrid"
        );

    if(!grid) return;

    setText(
        "groundCount",
        list.length
    );

    if(!list.length){

        grid.innerHTML = `
            <div class="empty-panel">
                🏟️
                <h3>No grounds found</h3>
                <p>Try another search or filter.</p>
            </div>
        `;

        return;
    }

    grid.innerHTML =
        list.map(ground => `

            <div class="ground-card">

                <div class="ground-card-top">

                    <div class="ground-icon">
                        ${ground.icon}
                    </div>

                    <span
                        class="ground-status ${ground.status
                            .toLowerCase()
                            .replace(/\s+/g,"-")}"
                    >
                        ${escapeHTML(
                            ground.status
                        )}
                    </span>

                </div>

                <h3>
                    ${escapeHTML(
                        ground.name
                    )}
                </h3>

                <div class="ground-location">
                    📍 ${escapeHTML(
                        ground.village
                    )},
                    ${escapeHTML(
                        ground.district
                    )}
                </div>

                <div class="ground-details">

                    <div class="ground-detail">
                        <small>SPORT</small>
                        <strong>
                            ${escapeHTML(
                                ground.sport
                            )}
                        </strong>
                    </div>

                    <div class="ground-detail">
                        <small>CAPACITY</small>
                        <strong>
                            ${ground.capacity}
                        </strong>
                    </div>

                    <div class="ground-detail">
                        <small>FACILITY</small>
                        <strong>
                            ${escapeHTML(
                                ground.facility
                            )}
                        </strong>
                    </div>

                    <div class="ground-detail">
                        <small>CONDITION</small>
                        <strong>
                            ${escapeHTML(
                                ground.condition
                            )}
                        </strong>
                    </div>

                </div>

                <div class="ground-card-actions">

                    <button
                        class="secondary-btn"
                        onclick="showGroundDetails(${ground.id})"
                    >
                        View Details
                    </button>

                </div>

            </div>

        `).join("");
}

function filterGrounds(){

    const search =
        document
            .getElementById(
                "groundSearch"
            )
            ?.value
            .toLowerCase()
            .trim() || "";

    const district =
        document
            .getElementById(
                "groundDistrictFilter"
            )
            ?.value || "";

    const sport =
        document
            .getElementById(
                "groundSportFilter"
            )
            ?.value || "";

    renderGrounds(
        grounds.filter(ground => {

            const text =
                `${ground.name} ${ground.village} ${ground.district} ${ground.sport}`
                    .toLowerCase();

            return (
                (!search ||
                    text.includes(search)) &&
                (!district ||
                    ground.district === district) &&
                (!sport ||
                    ground.sport === sport)
            );
        })
    );
}

function showGroundDetails(id){

    const ground =
        grounds.find(
            item => item.id === id
        );

    if(!ground) return;

    const modal =
        document.getElementById(
            "groundDetailsModal"
        );

    if(!modal) return;

    modal.innerHTML = `
        <div class="modal-card">

            <button
                class="close-btn"
                onclick="closeGroundDetails()"
            >
                ×
            </button>

            <div class="ground-detail-icon">
                🏟️
            </div>

            <small>
                ${escapeHTML(
                    ground.district.toUpperCase()
                )}
            </small>

            <h2>
                ${escapeHTML(
                    ground.name
                )}
            </h2>

            <p>
                📍 ${escapeHTML(
                    ground.village
                )},
                ${escapeHTML(
                    ground.district
                )}
            </p>

            <div class="ground-detail-grid">

                <div>
                    <small>SPORT</small>
                    <strong>
                        ${escapeHTML(
                            ground.sport
                        )}
                    </strong>
                </div>

                <div>
                    <small>CAPACITY</small>
                    <strong>
                        ${ground.capacity}
                    </strong>
                </div>

                <div>
                    <small>FACILITY</small>
                    <strong>
                        ${escapeHTML(
                            ground.facility
                        )}
                    </strong>
                </div>

                <div>
                    <small>CONDITION</small>
                    <strong>
                        ${escapeHTML(
                            ground.condition
                        )}
                    </strong>
                </div>

            </div>

            <p class="prototype-note">
                <strong>Status:</strong>
                ${escapeHTML(
                    ground.status
                )}.
                Ground access is a prototype action.
            </p>

            <button
                class="primary-btn full-btn"
                onclick="
                    showToast(
                        'Ground access request recorded for the prototype.'
                    );
                    closeGroundDetails();
                "
            >
                Request Ground Access →
            </button>

        </div>
    `;

    modal.classList.remove("hidden");
}

function closeGroundDetails(){

    document
        .getElementById(
            "groundDetailsModal"
        )
        ?.classList.add("hidden");
}

/* =========================================================
   TOURNAMENTS
   ========================================================= */

function initializeTournamentSection(){

    const section =
        document.getElementById(
            "section-tournaments"
        );

    if(!section) return;

    if(!section.dataset.ready){

        section.innerHTML =
            getTournamentSectionHTML();

        section.dataset.ready = "true";

        setupTournamentControls();
    }

    renderTournamentPage();
}

function getTournamentSectionHTML(){

    return `
        <div class="tournament-page">

            <div class="section-label">
                OPPORTUNITIES
            </div>

            <div class="tournament-hero">

                <div class="tournament-hero-top">

                    <div>

                        <small class="section-label">
                            KHELOGRAM COMPETITION NETWORK
                        </small>

                        <h2>
                            Discover your next
                            sporting opportunity.
                        </h2>

                        <p>
                            Find rural tournaments,
                            register for competitions
                            and build your sports journey
                            from village participation
                            to higher-level opportunities.
                        </p>

                    </div>

                    <div class="tournament-hero-icon">
                        🏆
                    </div>

                </div>

                <div
                    id="tournamentStats"
                    class="tournament-stat-strip"
                ></div>

            </div>

            <div class="tournament-controls">

                <div class="tournament-control">

                    <label>
                        SEARCH TOURNAMENTS
                    </label>

                    <input
                        id="tournamentSearch"
                        placeholder="Search tournament, sport or location..."
                    >

                </div>

                <div class="tournament-control">

                    <label>
                        SPORT
                    </label>

                    <select
                        id="tournamentSportFilter"
                    >
                        <option value="">
                            All sports
                        </option>
                        <option>Cricket</option>
                        <option>Football</option>
                        <option>Kabaddi</option>
                        <option>Athletics</option>
                        <option>Hockey</option>
                        <option>Volleyball</option>
                        <option>Badminton</option>
                        <option>Wrestling</option>
                    </select>

                </div>

                <div class="tournament-control">

                    <label>
                        DISTRICT
                    </label>

                    <select
                        id="tournamentDistrictFilter"
                    >
                        <option value="">
                            All districts
                        </option>
                        <option>Lucknow</option>
                        <option>Barabanki</option>
                        <option>Kanpur</option>
                        <option>Ayodhya</option>
                        <option>Unnao</option>
                    </select>

                </div>

            </div>

            <div class="tournament-results-bar">

                <strong id="tournamentResultCount">
                    0 tournaments
                </strong>

                <span>
                    Registration data is saved on this device.
                </span>

            </div>

            <div
                id="tournamentGrid"
                class="tournament-grid"
            ></div>

            <div
                id="myTournamentsPanel"
                class="panel my-tournaments-panel"
            ></div>

        </div>
    `;
}

function setupTournamentControls(){

    document
        .getElementById(
            "tournamentSearch"
        )
        ?.addEventListener(
            "input",
            renderTournamentPage
        );

    document
        .getElementById(
            "tournamentSportFilter"
        )
        ?.addEventListener(
            "change",
            renderTournamentPage
        );

    document
        .getElementById(
            "tournamentDistrictFilter"
        )
        ?.addEventListener(
            "change",
            renderTournamentPage
        );
}

function getTournamentRegistrations(){

    return getStorageItem(
        STORAGE_KEYS.TOURNAMENTS,
        []
    );
}

function isRegistered(id){

    return getTournamentRegistrations()
        .some(
            registration =>
                registration.tournamentId === id
        );
}

function getTournamentStatus(tournament){

    if(
        tournament.participants >=
        tournament.capacity
    ){

        return {
            key:"full",
            label:"FULL",
            className:"full"
        };
    }

    const today =
        new Date();

    const deadline =
        parseDate(
            tournament.registrationDeadline
        );

    const start =
        parseDate(
            tournament.startDate
        );

    if(
        deadline &&
        today > endOfDay(deadline)
    ){

        return {
            key:"closed",
            label:"REGISTRATION CLOSED",
            className:"soon"
        };
    }

    if(
        start &&
        today >=
            new Date(
                start.getTime() -
                7 * 24 * 60 * 60 * 1000
            )
    ){

        return {
            key:"soon",
            label:"STARTING SOON",
            className:"soon"
        };
    }

    return {
        key:"open",
        label:"REGISTRATION OPEN",
        className:"open"
    };
}

function renderTournamentPage(){

    const grid =
        document.getElementById(
            "tournamentGrid"
        );

    if(!grid) return;

    const search =
        document
            .getElementById(
                "tournamentSearch"
            )
            ?.value
            .toLowerCase()
            .trim() || "";

    const sport =
        document
            .getElementById(
                "tournamentSportFilter"
            )
            ?.value || "";

    const district =
        document
            .getElementById(
                "tournamentDistrictFilter"
            )
            ?.value || "";

    const filtered =
        tournaments.filter(tournament => {

            const text =
                `${tournament.name}
                 ${tournament.sport}
                 ${tournament.district}
                 ${tournament.village}
                 ${tournament.venue}
                 ${tournament.organizer}`
                    .toLowerCase();

            return (
                (!search ||
                    text.includes(search)) &&
                (!sport ||
                    tournament.sport === sport) &&
                (!district ||
                    tournament.district === district)
            );
        });

    renderTournamentStats();

    setText(
        "tournamentResultCount",
        `${filtered.length} ${
            filtered.length === 1
                ? "tournament"
                : "tournaments"
        }`
    );

    grid.innerHTML =
        filtered.length
            ? filtered
                .map(createTournamentCard)
                .join("")
            : `
                <div class="tournament-empty">
                    🔎
                    <h3>No tournaments found</h3>
                    <p>
                        Try changing your search or filters.
                    </p>
                </div>
            `;

    renderMyTournaments();
}

function renderTournamentStats(){

    const stats =
        document.getElementById(
            "tournamentStats"
        );

    if(!stats) return;

    const open =
        tournaments.filter(tournament => {

            const status =
                getTournamentStatus(
                    tournament
                );

            return (
                status.key === "open" ||
                status.key === "soon"
            );

        }).length;

    stats.innerHTML = `

        <div class="tournament-stat">
            <small>TOURNAMENTS</small>
            <strong>
                ${tournaments.length}
            </strong>
        </div>

        <div class="tournament-stat">
            <small>OPEN OPPORTUNITIES</small>
            <strong>
                ${open}
            </strong>
        </div>

        <div class="tournament-stat">
            <small>SPORTS</small>
            <strong>
                ${
                    new Set(
                        tournaments.map(
                            tournament =>
                                tournament.sport
                        )
                    ).size
                }
            </strong>
        </div>

        <div class="tournament-stat">
            <small>MY REGISTRATIONS</small>
            <strong>
                ${getTournamentRegistrations().length}
            </strong>
        </div>

    `;
}

function createTournamentCard(tournament){

    const status =
        getTournamentStatus(
            tournament
        );

    const registered =
        isRegistered(
            tournament.id
        );

    const percentage =
        Math.min(
            100,
            Math.round(
                tournament.participants /
                tournament.capacity *
                100
            )
        );

    return `

        <article class="tournament-card">

            <div class="tournament-card-top">

                <div class="tournament-sport-icon">
                    ${tournament.icon}
                </div>

                <span
                    class="tournament-status ${status.className}"
                >
                    ${status.label}
                </span>

            </div>

            <h3>
                ${escapeHTML(
                    tournament.name
                )}
            </h3>

            <div class="tournament-location">
                📍
                ${escapeHTML(
                    tournament.village
                )},
                ${escapeHTML(
                    tournament.district
                )}
            </div>

            <div class="tournament-info-grid">

                <div class="tournament-info">
                    <small>DATE</small>
                    <strong>
                        ${formatDate(
                            tournament.startDate
                        )}
                    </strong>
                </div>

                <div class="tournament-info">
                    <small>CATEGORY</small>
                    <strong>
                        ${escapeHTML(
                            tournament.category
                        )}
                    </strong>
                </div>

                <div class="tournament-info">
                    <small>DEADLINE</small>
                    <strong>
                        ${formatDate(
                            tournament.registrationDeadline
                        )}
                    </strong>
                </div>

                <div class="tournament-info">
                    <small>ENTRY</small>
                    <strong>
                        ${escapeHTML(
                            tournament.entryFee
                        )}
                    </strong>
                </div>

            </div>

            <p class="tournament-description">
                ${escapeHTML(
                    tournament.description
                )}
            </p>

            <div class="tournament-progress">

                <div class="tournament-progress-header">

                    <span>
                        Participants
                    </span>

                    <strong>
                        ${tournament.participants}
                        /
                        ${tournament.capacity}
                    </strong>

                </div>

                <div class="tournament-progress-track">

                    <div
                        class="tournament-progress-fill"
                        style="width:${percentage}%"
                    ></div>

                </div>

            </div>

            ${
                registered
                    ? `
                        <div class="tournament-registered">
                            ✓ You are registered
                        </div>
                    `
                    : ""
            }

            <div class="tournament-card-actions">

                <button
                    class="secondary-btn"
                    onclick="openTournamentDetails('${tournament.id}')"
                >
                    View Details
                </button>

                ${
                    registered
                        ? `
                            <button
                                class="secondary-btn"
                                onclick="cancelTournamentRegistration('${tournament.id}')"
                            >
                                Cancel
                            </button>
                        `
                        : `
                            <button
                                class="primary-btn"
                                ${
                                    status.key !== "open"
                                        ? "disabled"
                                        : ""
                                }
                                onclick="registerForTournament('${tournament.id}')"
                            >
                                ${
                                    status.key === "full"
                                        ? "Full"
                                        : status.key === "closed"
                                            ? "Closed"
                                            : "Register →"
                                }
                            </button>
                        `
                }

            </div>

        </article>
    `;
}

function openTournamentDetails(id){

    const tournament =
        tournaments.find(
            item => item.id === id
        );

    if(!tournament) return;

    currentTournamentId =
        id;

    const status =
        getTournamentStatus(
            tournament
        );

    const registered =
        isRegistered(id);

    const modal =
        document.getElementById(
            "tournamentDetailsModal"
        );

    if(!modal) return;

    modal.innerHTML = `

        <div class="modal-card">

            <button
                class="close-btn"
                onclick="closeTournamentDetails()"
            >
                ×
            </button>

            <div class="tournament-detail-header">

                <div class="tournament-detail-icon">
                    ${tournament.icon}
                </div>

                <div>

                    <small>
                        ${escapeHTML(
                            tournament.sport.toUpperCase()
                        )}
                    </small>

                    <h2>
                        ${escapeHTML(
                            tournament.name
                        )}
                    </h2>

                    <p>
                        📍
                        ${escapeHTML(
                            tournament.village
                        )},
                        ${escapeHTML(
                            tournament.district
                        )}
                        ·
                        ${escapeHTML(
                            tournament.venue
                        )}
                    </p>

                </div>

            </div>

            <div class="tournament-status-row">

                <span
                    class="tournament-status ${status.className}"
                >
                    ${status.label}
                </span>

                <span class="badge">
                    ${escapeHTML(
                        tournament.category
                    )}
                </span>

            </div>

            <div class="ground-detail-grid">

                <div>
                    <small>START</small>
                    <strong>
                        ${formatDate(
                            tournament.startDate
                        )}
                    </strong>
                </div>

                <div>
                    <small>END</small>
                    <strong>
                        ${formatDate(
                            tournament.endDate
                        )}
                    </strong>
                </div>

                <div>
                    <small>DEADLINE</small>
                    <strong>
                        ${formatDate(
                            tournament.registrationDeadline
                        )}
                    </strong>
                </div>

                <div>
                    <small>PARTICIPANTS</small>
                    <strong>
                        ${tournament.participants}
                        /
                        ${tournament.capacity}
                    </strong>
                </div>

                <div>
                    <small>ENTRY</small>
                    <strong>
                        ${escapeHTML(
                            tournament.entryFee
                        )}
                    </strong>
                </div>

                <div>
                    <small>PRIZE</small>
                    <strong>
                        ${escapeHTML(
                            tournament.prize
                        )}
                    </strong>
                </div>

                <div>
                    <small>ORGANIZER</small>
                    <strong>
                        ${escapeHTML(
                            tournament.organizer
                        )}
                    </strong>
                </div>

                <div>
                    <small>CONTACT</small>
                    <strong>
                        ${escapeHTML(
                            tournament.contact
                        )}
                    </strong>
                </div>

            </div>

            <p class="section-description">
                ${escapeHTML(
                    tournament.description
                )}
            </p>

            <div class="prototype-note">

                ${
                    registered
                        ? "✓ You are registered for this tournament."
                        : "Registration closes on " +
                          formatDate(
                              tournament.registrationDeadline
                          ) +
                          "."
                }

            </div>

            <div class="ground-card-actions">

                <button
                    class="secondary-btn"
                    onclick="closeTournamentDetails()"
                >
                    Close
                </button>

                ${
                    registered
                        ? `
                            <button
                                class="secondary-btn"
                                onclick="cancelTournamentRegistration('${id}')"
                            >
                                Cancel Registration
                            </button>
                        `
                        : `
                            <button
                                class="primary-btn"
                                ${
                                    status.key !== "open"
                                        ? "disabled"
                                        : ""
                                }
                                onclick="registerForTournament('${id}')"
                            >
                                Register →
                            </button>
                        `
                }

            </div>

        </div>
    `;

    modal.classList.remove(
        "hidden"
    );
}

function closeTournamentDetails(){

    document
        .getElementById(
            "tournamentDetailsModal"
        )
        ?.classList.add("hidden");

    currentTournamentId =
        null;
}

function registerForTournament(id){

    const tournament =
        tournaments.find(
            item => item.id === id
        );

    if(!tournament) return;

    const user =
        getStoredUser();

    if(!user){

        showToast(
            "Please create an account before registering."
        );

        openRoleSelector();

        return;
    }

    const status =
        getTournamentStatus(
            tournament
        );

    if(status.key === "full"){

        showToast(
            "This tournament is already full."
        );

        return;
    }

    if(status.key === "closed"){

        showToast(
            "Registration for this tournament is closed."
        );

        return;
    }

    if(isRegistered(id)){

        showToast(
            "You are already registered."
        );

        return;
    }

    const profile =
        getStoredProfile();

    const registrations =
        getTournamentRegistrations();

    registrations.push({

        tournamentId:id,

        registeredAt:
            new Date().toISOString(),

        name:
            profile?.name ||
            user.name,

        sport:
            profile?.sport ||
            tournament.sport,

        district:
            profile?.district ||
            tournament.district
    });

    setStorageItem(
        STORAGE_KEYS.TOURNAMENTS,
        registrations
    );

    showToast(
        `Registered for ${tournament.name}.`
    );

    renderTournamentPage();
    updateInsights();
    renderSportsIntelligence();

    if(currentTournamentId === id){

        openTournamentDetails(
            id
        );
    }
}

function cancelTournamentRegistration(id){

    const tournament =
        tournaments.find(
            item => item.id === id
        );

    if(!tournament) return;

    const confirmed =
        window.confirm(
            `Cancel your registration for "${tournament.name}"?`
        );

    if(!confirmed) return;

    const registrations =
        getTournamentRegistrations()
            .filter(
                registration =>
                    registration.tournamentId !== id
            );

    setStorageItem(
        STORAGE_KEYS.TOURNAMENTS,
        registrations
    );

    showToast(
        "Tournament registration cancelled."
    );

    renderTournamentPage();
    updateInsights();
    renderSportsIntelligence();

    closeTournamentDetails();
}

function renderMyTournaments(){

    const panel =
        document.getElementById(
            "myTournamentsPanel"
        );

    if(!panel) return;

    const list =
        getTournamentRegistrations()
            .map(registration =>
                tournaments.find(
                    tournament =>
                        tournament.id ===
                        registration.tournamentId
                )
            )
            .filter(Boolean);

    if(!list.length){

        panel.innerHTML = `

            <small>
                MY COMPETITIONS
            </small>

            <h3>
                Your tournament registrations
            </h3>

            <p class="section-description">
                You have not registered for a tournament yet.
            </p>
        `;

        return;
    }

    panel.innerHTML = `

        <small>
            MY COMPETITIONS
        </small>

        <h3>
            Your tournament registrations
        </h3>

        <div class="my-tournament-list">

            ${
                list.map(tournament => `

                    <div class="my-tournament-item">

                        <div class="my-tournament-item-left">

                            <div class="my-tournament-mini-icon">
                                ${tournament.icon}
                            </div>

                            <div>

                                <strong>
                                    ${escapeHTML(
                                        tournament.name
                                    )}
                                </strong>

                                <small>
                                    ${formatDate(
                                        tournament.startDate
                                    )}
                                    ·
                                    ${escapeHTML(
                                        tournament.district
                                    )}
                                </small>

                            </div>

                        </div>

                        <button
                            class="secondary-btn"
                            onclick="openTournamentDetails('${tournament.id}')"
                        >
                            View
                        </button>

                    </div>

                `).join("")
            }

        </div>
    `;
}

/* =========================================================
   STAGE 6 - COMMUNITY
   ========================================================= */

function getPosts(){

    const stored =
        getStorageItem(
            STORAGE_KEYS.POSTS,
            null
        );

    if(stored === null){

        setStorageItem(
            STORAGE_KEYS.POSTS,
            defaultPosts
        );

        return defaultPosts;
    }

    return stored;
}

function getUserPosts(){

    const user =
        getStoredUser();

    if(!user) return [];

    return getPosts()
        .filter(
            post =>
                post.ownerEmail ===
                user.email
        );
}

function getLikedPosts(){

    return getStorageItem(
        STORAGE_KEYS.LIKES,
        []
    );
}

function renderCommunity(){

    const feed =
        document.getElementById(
            "communityFeed"
        );

    if(!feed) return;

    const search =
        document
            .getElementById(
                "communitySearch"
            )
            ?.value
            .toLowerCase()
            .trim() || "";

    const sport =
        document
            .getElementById(
                "communitySportFilter"
            )
            ?.value || "";

    const posts =
        getPosts()
            .filter(post => {

                const text =
                    `${post.title}
                     ${post.content}
                     ${post.name}
                     ${post.sport}`
                        .toLowerCase();

                return (
                    (!search ||
                        text.includes(search)) &&
                    (!sport ||
                        post.sport === sport)
                );
            })
            .sort(
                (a,b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            );

    const liked =
        getLikedPosts();

    feed.innerHTML =
        posts.length
            ? posts.map(post => {

                const mine =
                    getStoredUser()?.email ===
                    post.ownerEmail;

                const likeCount =
                    post.likes || 0;

                return `

                    <article class="post-card">

                        <div class="post-head">

                            <div class="post-avatar">
                                ${escapeHTML(
                                    getInitials(
                                        post.name
                                    )
                                )}
                            </div>

                            <div class="post-meta">

                                <strong>
                                    ${escapeHTML(
                                        post.name
                                    )}
                                </strong>

                                <small>
                                    ${escapeHTML(
                                        post.role ||
                                        "Community"
                                    )}
                                    ·
                                    ${formatRelativeDate(
                                        post.createdAt
                                    )}
                                </small>

                            </div>

                            <span class="badge post-sport">
                                ${escapeHTML(
                                    post.sport
                                )}
                            </span>

                        </div>

                        <h3>
                            ${escapeHTML(
                                post.title
                            )}
                        </h3>

                        <p>
                            ${escapeHTML(
                                post.content
                            )}
                        </p>

                        <div class="post-actions">

                            <button
                                class="post-action ${
                                    liked.includes(
                                        post.id
                                    )
                                        ? "liked"
                                        : ""
                                }"
                                onclick="togglePostLike('${post.id}')"
                            >
                                ♥ ${likeCount}
                            </button>

                            <button
                                class="post-action"
                                onclick="
                                    showToast(
                                        'Comments will be connected in a later backend stage.'
                                    )
                                "
                            >
                                💬 Comment
                            </button>

                            ${
                                mine
                                    ? `
                                        <button
                                            class="post-action"
                                            onclick="deletePost('${post.id}')"
                                        >
                                            🗑 Delete
                                        </button>
                                    `
                                    : ""
                            }

                        </div>

                    </article>
                `;

            }).join("")
            : `

                <div class="empty-panel">

                    📰

                    <h3>
                        No posts found
                    </h3>

                    <p>
                        Be the first to share a sports story.
                    </p>

                </div>
            `;

    updateCommunityStats();
}

function updateCommunityStats(){

    const posts =
        getPosts();

    setText(
        "communityPostCount",
        posts.length
    );

    setText(
        "communityLikeCount",
        posts.reduce(
            (sum,post) =>
                sum +
                (post.likes || 0),
            0
        )
    );

    setText(
        "communitySportCount",
        new Set(
            posts.map(
                post => post.sport
            )
        ).size
    );

    setText(
        "profilePostTotal",
        getUserPosts().length
    );
}

function openPostModal(){

    document
        .getElementById(
            "postModal"
        )
        ?.classList.remove("hidden");
}

function closePostModal(){

    document
        .getElementById(
            "postModal"
        )
        ?.classList.add("hidden");
}

function setupPostForm(){

    const form =
        document.getElementById(
            "postForm"
        );

    if(!form) return;

    form.addEventListener(
        "submit",
        function(event){

            event.preventDefault();

            const user =
                getStoredUser();

            if(!user){

                showToast(
                    "Please login before creating a post."
                );

                closePostModal();
                openRoleSelector();

                return;
            }

            const posts =
                getPosts();

            posts.push({

                id:
                    "P" +
                    Date.now(),

                name:
                    user.name ||
                    "KheloGram User",

                role:
                    user.role ||
                    "Athlete",

                sport:
                    document
                        .getElementById(
                            "postSport"
                        )
                        .value,

                title:
                    document
                        .getElementById(
                            "postTitle"
                        )
                        .value
                        .trim(),

                content:
                    document
                        .getElementById(
                            "postContent"
                        )
                        .value
                        .trim(),

                createdAt:
                    new Date().toISOString(),

                likes:0,

                ownerEmail:
                    user.email
            });

            setStorageItem(
                STORAGE_KEYS.POSTS,
                posts
            );

            event.target.reset();

            closePostModal();

            renderCommunity();
            updateDashboardData();

            showToast(
                "Your community post was published."
            );
        }
    );
}

function togglePostLike(id){

    const posts =
        getPosts();

    const liked =
        getLikedPosts();

    const post =
        posts.find(
            item => item.id === id
        );

    if(!post) return;

    const index =
        liked.indexOf(id);

    if(index >= 0){

        liked.splice(
            index,
            1
        );

        post.likes =
            Math.max(
                0,
                (post.likes || 0) - 1
            );

    }else{

        liked.push(id);

        post.likes =
            (post.likes || 0) + 1;
    }

    setStorageItem(
        STORAGE_KEYS.LIKES,
        liked
    );

    setStorageItem(
        STORAGE_KEYS.POSTS,
        posts
    );

    renderCommunity();
}

function deletePost(id){

    if(
        !window.confirm(
            "Delete this post?"
        )
    ){
        return;
    }

    const user =
        getStoredUser();

    const posts =
        getPosts()
            .filter(
                post =>
                    !(
                        post.id === id &&
                        post.ownerEmail ===
                        user?.email
                    )
            );

    setStorageItem(
        STORAGE_KEYS.POSTS,
        posts
    );

    renderCommunity();
    updateDashboardData();

    showToast(
        "Post deleted."
    );
}

/* =========================================================
   STAGE 6 - ACHIEVEMENTS
   ========================================================= */

function getAchievements(){

    return getStorageItem(
        STORAGE_KEYS.ACHIEVEMENTS,
        []
    );
}

function getAchievementsForCurrentUser(){

    const user =
        getStoredUser();

    if(!user) return [];

    return getAchievements()
        .filter(
            achievement =>
                achievement.ownerEmail ===
                user.email
        );
}

function renderAchievements(){

    const grid =
        document.getElementById(
            "achievementGrid"
        );

    if(!grid) return;

    const list =
        getAchievementsForCurrentUser()
            .sort(
                (a,b) =>
                    Number(b.year) -
                    Number(a.year)
            );

    setText(
        "achievementPageCount",
        list.length
    );

    setText(
        "achievementCount",
        list.length
    );

    setText(
        "profileAchievementTotal",
        list.length
    );

    setText(
        "achievementSportSummary",
        getStoredProfile()?.sport ||
        "Not set"
    );

    const completion =
        calculateProfileCompletion(
            getStoredProfile()
        );

    setText(
        "achievementMilestone",
        completion >= 80
            ? "Ready"
            : completion >= 50
                ? "Developing"
                : "Building"
    );

    if(!list.length){

        grid.innerHTML = `

            <div class="empty-panel">

                🏆

                <h3>
                    No achievements yet
                </h3>

                <p>
                    Add your first achievement
                    to strengthen your Sports Passport.
                </p>

                <button
                    class="primary-btn"
                    onclick="openAchievementModal()"
                >
                    Add Achievement →
                </button>

            </div>
        `;

        return;
    }

    grid.innerHTML =
        list.map(achievement => `

            <article class="achievement-card">

                <div class="achievement-icon">
                    ${
                        achievement.icon ||
                        "🏆"
                    }
                </div>

                <h3>
                    ${escapeHTML(
                        achievement.title
                    )}
                </h3>

                <span class="badge">
                    ${escapeHTML(
                        achievement.sport
                    )}
                </span>

                <span class="achievement-level">
                    ${escapeHTML(
                        achievement.level
                    )}
                </span>

                <p>
                    ${escapeHTML(
                        achievement.description ||
                        "Achievement recorded in your Sports Passport."
                    )}
                </p>

                <div class="achievement-card-footer">

                    <small>
                        ${escapeHTML(
                            String(
                                achievement.year
                            )
                        )}
                    </small>

                    <button
                        class="delete-btn"
                        onclick="deleteAchievement('${achievement.id}')"
                    >
                        Delete
                    </button>

                </div>

            </article>

        `).join("");
}

function openAchievementModal(){

    const profile =
        getStoredProfile();

    if(profile?.sport){

        setValue(
            "achievementSport",
            profile.sport
        );
    }

    document
        .getElementById(
            "achievementModal"
        )
        ?.classList.remove("hidden");
}

function closeAchievementModal(){

    document
        .getElementById(
            "achievementModal"
        )
        ?.classList.add("hidden");
}

function setupAchievementForm(){

    const form =
        document.getElementById(
            "achievementForm"
        );

    if(!form) return;

    form.addEventListener(
        "submit",
        function(event){

            event.preventDefault();

            const user =
                getStoredUser();

            if(!user){

                showToast(
                    "Please login before adding an achievement."
                );

                closeAchievementModal();
                openRoleSelector();

                return;
            }

            const achievements =
                getAchievements();

            const sport =
                document
                    .getElementById(
                        "achievementSport"
                    )
                    .value;

            const title =
                document
                    .getElementById(
                        "achievementTitle"
                    )
                    .value
                    .trim();

            achievements.push({

                id:
                    "A" +
                    Date.now(),

                ownerEmail:
                    user.email,

                name:
                    user.name,

                sport:sport,

                title:title,

                level:
                    document
                        .getElementById(
                            "achievementLevel"
                        )
                        .value,

                year:
                    document
                        .getElementById(
                            "achievementYear"
                        )
                        .value,

                description:
                    document
                        .getElementById(
                            "achievementDescription"
                        )
                        .value
                        .trim(),

                icon:
                    getAchievementIcon(
                        title
                    )
            });

            setStorageItem(
                STORAGE_KEYS.ACHIEVEMENTS,
                achievements
            );

            event.target.reset();

            document
                .getElementById(
                    "achievementYear"
                ).value =
                new Date().getFullYear();

            closeAchievementModal();

            renderAchievements();
            updateDashboardData();
            updateInsights();

            showToast(
                "Achievement added to your Sports Passport."
            );
        }
    );
}

function deleteAchievement(id){

    if(
        !window.confirm(
            "Delete this achievement?"
        )
    ){
        return;
    }

    setStorageItem(
        STORAGE_KEYS.ACHIEVEMENTS,
        getAchievements()
            .filter(
                achievement =>
                    achievement.id !== id
            )
    );

    renderAchievements();
    updateDashboardData();
    updateInsights();

    showToast(
        "Achievement deleted."
    );
}

function getAchievementIcon(title){

    const text =
        title.toLowerCase();

    if(
        text.includes("winner") ||
        text.includes("champion")
    ){
        return "🏆";
    }

    if(
        text.includes("runner") ||
        text.includes("second")
    ){
        return "🥈";
    }

    if(
        text.includes("third") ||
        text.includes("bronze")
    ){
        return "🥉";
    }

    if(
        text.includes("best")
    ){
        return "⭐";
    }

    return "🏅";
}

/* =========================================================
   STAGE 7 - AI TALENT INSIGHTS
   ========================================================= */

function getCurrentUserTournamentCount(){

    return getTournamentRegistrations()
        .length;
}

function calculateTalentScore(){

    const profile =
        getStoredProfile();

    const achievements =
        getAchievementsForCurrentUser();

    const tournamentsCount =
        getCurrentUserTournamentCount();

    const coachConnected =
        Boolean(
            localStorage.getItem(
                STORAGE_KEYS.COACH
            )
        );

    if(!profile){
        return 0;
    }

    let score = 0;

    if(profile.name){
        score += 10;
    }

    if(profile.age){
        score += 5;
    }

    if(profile.village){
        score += 5;
    }

    if(profile.district){
        score += 5;
    }

    if(profile.sport){
        score += 15;
    }

    if(profile.skill === "Beginner"){
        score += 8;
    }

    if(profile.skill === "Developing"){
        score += 12;
    }

    if(profile.skill === "Competitive"){
        score += 18;
    }

    if(profile.achievements){
        score += 8;
    }

    score += Math.min(
        15,
        achievements.length * 5
    );

    score += Math.min(
        10,
        tournamentsCount * 5
    );

    if(coachConnected){
        score += 7;
    }

    return Math.min(
        100,
        score
    );
}

function getTalentScoreLabel(score){

    if(score >= 85){
        return "Strong emerging signal";
    }

    if(score >= 70){
        return "Promising signal";
    }

    if(score >= 50){
        return "Developing signal";
    }

    if(score >= 25){
        return "Early profile signal";
    }

    return "Build your profile";
}

function getTalentScoreDescription(score){

    if(score >= 85){

        return "Your demo profile shows strong activity signals. In a real deployment, verified performance data would be reviewed before any selection decision.";
    }

    if(score >= 70){

        return "Your profile shows promising participation and development signals. Continue competing and recording results.";
    }

    if(score >= 50){

        return "You have started building a useful sports profile. Add achievements, tournaments and coaching activity to strengthen the signal.";
    }

    if(score >= 25){

        return "Your profile has some useful information. More verified sporting activity will make the talent signal stronger.";
    }

    return "Complete your Sports Passport and record real sporting activity to generate a more useful prototype signal.";
}

function updateInsights(){

    const profile =
        getStoredProfile();

    const achievements =
        getAchievementsForCurrentUser();

    const tournamentsCount =
        getCurrentUserTournamentCount();

    const sport =
        profile?.sport ||
        "Not provided";

    const skill =
        profile?.skill ||
        "Not provided";

    const location =
        profile?.village &&
        profile?.district
            ? `${profile.village}, ${profile.district}`
            : "Not provided";

    const experience =
        profile?.achievements ||
        "Not provided";

    const score =
        calculateTalentScore();

    setText(
        "signalSport",
        sport
    );

    setText(
        "signalSkill",
        skill
    );

    setText(
        "signalLocation",
        location
    );

    setText(
        "signalExperience",
        experience
    );

    setText(
        "signalAchievements",
        achievements.length
    );

    setText(
        "signalTournaments",
        tournamentsCount
    );

    setText(
        "talentScore",
        score
    );

    setText(
        "talentScoreLabel",
        getTalentScoreLabel(score)
    );

    setText(
        "talentScoreDescription",
        getTalentScoreDescription(score)
    );

    if(!profile?.sport){

        setText(
            "insightTitle",
            "Build your sports passport"
        );

        setText(
            "insightDescription",
            "Add your sport, skill level and experience to create your initial talent profile."
        );

        setText(
            "aiOpportunityTitle",
            "Complete your Sports Passport"
        );

        setText(
            "aiOpportunityText",
            "Add your sport, location and achievements so KheloGram can generate better opportunity suggestions."
        );

        setText(
            "aiTrainingTitle",
            "Start recording activity"
        );

        setText(
            "aiTrainingText",
            "Tournament participation, achievements and coach connections give the prototype more useful signals."
        );

        setText(
            "aiPathwayTitle",
            "Village → Block → District → State"
        );

        setText(
            "aiPathwayText",
            "Your profile can become a continuous record as you train, compete and progress."
        );

        return;
    }

    setText(
        "insightTitle",
        `${profile.sport} Talent Profile`
    );

    setText(
        "insightDescription",
        `Prototype insight: your profile lists ${profile.sport} at ${profile.skill || "developing"} level with ${achievements.length} achievement(s) and ${tournamentsCount} tournament registration(s).`
    );

    if(tournamentsCount > 0){

        setText(
            "aiOpportunityTitle",
            "Stay active in competition"
        );

        setText(
            "aiOpportunityText",
            `You have ${tournamentsCount} tournament registration(s). Keep recording results so future eligibility recommendations can be based on actual competition history.`
        );

    }else{

        setText(
            "aiOpportunityTitle",
            `Explore ${profile.sport} tournaments`
        );

        setText(
            "aiOpportunityText",
            "Your next useful action is to find a relevant tournament and build a verified participation record."
        );
    }

    if(achievements.length >= 2){

        setText(
            "aiTrainingTitle",
            "Build consistency"
        );

        setText(
            "aiTrainingText",
            "You have several recorded achievements. Keep adding recent results so the system can identify progression over time."
        );

    }else{

        setText(
            "aiTrainingTitle",
            "Record your milestones"
        );

        setText(
            "aiTrainingText",
            "Add achievements, tournament results and training milestones as your sports journey grows."
        );
    }

    if(score >= 70){

        setText(
            "aiPathwayTitle",
            "Ready for stronger opportunities"
        );

        setText(
            "aiPathwayText",
            "Your current prototype signal is promising. In a real system, verified district-level results could trigger higher-level eligibility checks."
        );

    }else{

        setText(
            "aiPathwayTitle",
            "Keep building the pathway"
        );

        setText(
            "aiPathwayText",
            "Continue from village participation toward block and district competitions while keeping your Sports Passport updated."
        );
    }
}

/* =========================================================
   STAGE 7 - SPORTS INTELLIGENCE
   ========================================================= */

function getSportActivityData(){

    const activity = {};

    tournaments.forEach(
        tournament => {

            activity[tournament.sport] =
                (
                    activity[tournament.sport] ||
                    0
                ) +
                tournament.participants;
        }
    );

    demoAthletes.forEach(
        athlete => {

            activity[athlete.sport] =
                (
                    activity[athlete.sport] ||
                    0
                ) +
                athlete.participation *
                3;
        }
    );

    return Object.entries(
        activity
    ).sort(
        (a,b) => b[1] - a[1]
    );
}

function calculateGroundUtilization(
    ground
){

    const tournamentCount =
        tournaments.filter(
            tournament =>
                tournament.venue ===
                ground.name
        ).length;

    const matchingAthletes =
        demoAthletes.filter(
            athlete =>
                athlete.sport ===
                ground.sport
        ).length;

    let utilization =
        35 +
        matchingAthletes * 8 +
        tournamentCount * 12;

    if(
        ground.status === "Available"
    ){
        utilization += 8;
    }

    if(
        ground.status === "Occupied"
    ){
        utilization += 12;
    }

    if(
        ground.status === "Maintenance"
    ){
        utilization -= 15;
    }

    return Math.max(
        10,
        Math.min(
            96,
            utilization
        )
    );
}

function getTalentHotspots(){

    const groups = {};

    demoAthletes.forEach(
        athlete => {

            const key =
                `${athlete.village}, ${athlete.district}`;

            if(!groups[key]){

                groups[key] = {

                    location:key,

                    athletes:0,

                    scoreTotal:0,

                    sport:athlete.sport
                };
            }

            groups[key].athletes += 1;

            groups[key].scoreTotal +=
                athlete.score;
        }
    );

    return Object.values(
        groups
    )
    .map(group => ({
        ...group,

        averageScore:
            Math.round(
                group.scoreTotal /
                group.athletes
            )
    }))
    .sort(
        (a,b) =>
            b.averageScore -
            a.averageScore
    );
}

function renderSportsIntelligence(){

    const athleteCountElement =
        document.getElementById(
            "intelAthletes"
        );

    if(!athleteCountElement){
        return;
    }

    const activityData =
        getSportActivityData();

    const groundUtilization =
        grounds.map(
            ground => ({

                ground,

                utilization:
                    calculateGroundUtilization(
                        ground
                    )
            })
        );

    const averageUtilization =
        groundUtilization.length
            ? Math.round(
                groundUtilization.reduce(
                    (sum,item) =>
                        sum +
                        item.utilization,
                    0
                ) /
                groundUtilization.length
            )
            : 0;

    const talentHotspots =
        getTalentHotspots();

    const talentSignals =
        demoAthletes.filter(
            athlete =>
                athlete.score >= 80
        ).length;

    setText(
        "intelAthletes",
        demoAthletes.length
    );

    setText(
        "intelUtilization",
        `${averageUtilization}%`
    );

    setText(
        "intelTournaments",
        tournaments.length
    );

    setText(
        "intelTalentSignals",
        talentSignals
    );

    const chart =
        document.getElementById(
            "sportActivityChart"
        );

    if(chart){

        const max =
            activityData.length
                ? activityData[0][1]
                : 1;

        chart.innerHTML =
            activityData.map(
                ([sport,value]) => {

                    const width =
                        Math.max(
                            8,
                            Math.round(
                                value /
                                max *
                                100
                            )
                        );

                    return `

                        <div class="bar-row">

                            <label>
                                ${escapeHTML(
                                    sport
                                )}
                            </label>

                            <div class="bar-track">

                                <div
                                    class="bar-fill"
                                    style="width:${width}%"
                                ></div>

                            </div>

                            <strong>
                                ${value}
                            </strong>

                        </div>

                    `;
                }
            ).join("");
    }

    const utilizationList =
        document.getElementById(
            "groundUtilizationList"
        );

    if(utilizationList){

        utilizationList.innerHTML =
            groundUtilization.map(
                item => `

                    <div class="utilization-item">

                        <div class="utilization-head">

                            <strong>
                                ${escapeHTML(
                                    item.ground.name
                                )}
                            </strong>

                            <span>
                                ${item.utilization}%
                            </span>

                        </div>

                        <div class="utilization-track">

                            <div
                                class="utilization-fill"
                                style="width:${item.utilization}%"
                            ></div>

                        </div>

                    </div>

                `
            ).join("");
    }

    const hotspotList =
        document.getElementById(
            "talentHotspotList"
        );

    if(hotspotList){

        hotspotList.innerHTML =
            talentHotspots
                .slice(0,4)
                .map(
                    hotspot => `

                        <div class="hotspot-item">

                            <div class="hotspot-icon">
                                🌟
                            </div>

                            <div>

                                <strong>
                                    ${escapeHTML(
                                        hotspot.location
                                    )}
                                </strong>

                                <p>
                                    ${hotspot.athletes}
                                    demo athlete(s)
                                    · average talent
                                    signal
                                    ${hotspot.averageScore}/100
                                </p>

                            </div>

                        </div>

                    `
                )
                .join("");
    }

    const recommendationList =
        document.getElementById(
            "planningRecommendationList"
        );

    if(recommendationList){

        const maintenanceGrounds =
            grounds.filter(
                ground =>
                    ground.status ===
                    "Maintenance"
            );

        const highestDemandSport =
            activityData[0]?.[0] ||
            "sports";

        const highestUtilization =
            [...groundUtilization]
                .sort(
                    (a,b) =>
                        b.utilization -
                        a.utilization
                )[0];

        const recommendations = [

            {
                icon:"🔧",

                title:
                    maintenanceGrounds.length
                        ? `Review ${maintenanceGrounds.length} maintenance ground(s)`
                        : "Maintain existing grounds",

                text:
                    maintenanceGrounds.length
                        ? maintenanceGrounds
                            .map(
                                ground =>
                                    ground.name
                            )
                            .join(", ")
                        : "No maintenance ground is currently flagged in the demo data."
            },

            {
                icon:"🏆",

                title:
                    `Support ${highestDemandSport} activity`,

                text:
                    `${highestDemandSport} currently has the strongest combined demo activity signal.`
            },

            {
                icon:"📍",

                title:
                    "Prioritize underserved locations",

                text:
                    "High participation combined with poor venue accessibility should trigger infrastructure review."
            },

            {
                icon:"📈",

                title:
                    "Track utilization over time",

                text:
                    `The highest estimated ground utilization in this demo is ${
                        highestUtilization
                            ? highestUtilization.ground.name
                            : "not available"
                    }.`
            }

        ];

        recommendationList.innerHTML =
            recommendations.map(
                item => `

                    <div class="recommendation-item">

                        <div class="recommendation-icon">
                            ${item.icon}
                        </div>

                        <div>

                            <strong>
                                ${escapeHTML(
                                    item.title
                                )}
                            </strong>

                            <p>
                                ${escapeHTML(
                                    item.text
                                )}
                            </p>

                        </div>

                    </div>

                `
            ).join("");
    }
}

/* =========================================================
   STORAGE HELPERS
   ========================================================= */

function getStorageItem(
    key,
    fallback = null
){

    try{

        const value =
            localStorage.getItem(
                key
            );

        if(value === null){
            return fallback;
        }

        return JSON.parse(value);

    }catch(error){

        console.warn(
            "KheloGram storage read error",
            key,
            error
        );

        return fallback;
    }
}

function setStorageItem(
    key,
    value
){

    try{

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

        return true;

    }catch(error){

        console.warn(
            "KheloGram storage write error",
            key,
            error
        );

        showToast(
            "Unable to save data on this device."
        );

        return false;
    }
}

/* =========================================================
   UTILITY FUNCTIONS
   ========================================================= */

function getInitials(name){

    if(!name){
        return "KG";
    }

    const parts =
        name
            .trim()
            .split(/\s+/)
            .filter(Boolean);

    if(parts.length === 1){

        return parts[0]
            .substring(0,2)
            .toUpperCase();
    }

    return (
        parts[0][0] +
        parts[parts.length - 1][0]
    ).toUpperCase();
}

function setText(
    id,
    value
){

    const element =
        document.getElementById(id);

    if(element){

        element.textContent =
            value ?? "";
    }
}

function setValue(
    id,
    value
){

    const element =
        document.getElementById(id);

    if(element){

        element.value =
            value ?? "";
    }
}

function parseDate(value){

    if(!value){
        return null;
    }

    const parts =
        String(value).split("-");

    if(parts.length === 3){

        return new Date(
            Number(parts[0]),
            Number(parts[1]) - 1,
            Number(parts[2])
        );
    }

    const date =
        new Date(value);

    return isNaN(
        date.getTime()
    )
        ? null
        : date;
}

function endOfDay(date){

    const result =
        new Date(date);

    result.setHours(
        23,
        59,
        59,
        999
    );

    return result;
}

function formatDate(value){

    const date =
        parseDate(value);

    if(!date){

        return value ||
            "Not available";
    }

    return date.toLocaleDateString(
        "en-IN",
        {
            day:"numeric",
            month:"short",
            year:"numeric"
        }
    );
}

function formatRelativeDate(value){

    const date =
        new Date(value);

    const difference =
        Math.max(
            0,
            Date.now() -
            date.getTime()
        );

    const days =
        Math.floor(
            difference /
            86400000
        );

    if(days === 0){
        return "Today";
    }

    if(days === 1){
        return "Yesterday";
    }

    if(days < 7){
        return `${days} days ago`;
    }

    return formatDate(value);
}

function escapeHTML(value){

    if(
        value === null ||
        value === undefined
    ){

        return "";
    }

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}

/* =========================================================
   TOAST
   ========================================================= */

function showToast(message){

    const toast =
        document.getElementById(
            "toast"
        );

    if(!toast) return;

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    clearTimeout(
        toastTimer
    );

    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );
}

/* =========================================================
   MODAL BEHAVIOUR
   ========================================================= */

document.addEventListener(
    "keydown",
    function(event){

        if(
            event.key !==
            "Escape"
        ){
            return;
        }

        closeRoleSelector();
        closeAuthModal();
        closePostModal();
        closeAchievementModal();
        closeGroundDetails();
        closeTournamentDetails();
    }
);

document.addEventListener(
    "click",
    function(event){

        const modals = [

            [
                "roleModal",
                closeRoleSelector
            ],

            [
                "authModal",
                closeAuthModal
            ],

            [
                "postModal",
                closePostModal
            ],

            [
                "achievementModal",
                closeAchievementModal
            ],

            [
                "groundDetailsModal",
                closeGroundDetails
            ],

            [
                "tournamentDetailsModal",
                closeTournamentDetails
            ]

        ];

        modals.forEach(
            ([id,close]) => {

                const modal =
                    document.getElementById(
                        id
                    );

                if(
                    modal &&
                    event.target === modal
                ){

                    close();
                }
            }
        );
    }
);
