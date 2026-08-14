/* =========================================================
   KHELOGRAM
   STAGE 5 - TOURNAMENT MANAGEMENT
   Cleaned & Complete JavaScript
   Compatible with existing index.html
   ========================================================= */


/* =========================================================
   GLOBAL STATE
   ========================================================= */

let selectedRole = "Athlete";
let authMode = "register";
let currentTournamentId = null;
let toastTimer = null;

const STORAGE_KEYS = {
    USER: "khelogramUser",
    PROFILE: "khelogramProfile",
    COACH: "khelogramCoach",
    TOURNAMENTS: "khelogramTournamentRegistrations"
};


/* =========================================================
   DEMO COACH DATA
   ========================================================= */

const coaches = [
    {
        id: 1,
        name: "Ravi Kumar",
        sport: "Cricket",
        location: "Lucknow",
        experience: "8 years",
        initials: "RK"
    },
    {
        id: 2,
        name: "Amit Singh",
        sport: "Football",
        location: "Barabanki",
        experience: "6 years",
        initials: "AS"
    },
    {
        id: 3,
        name: "Priya Sharma",
        sport: "Athletics",
        location: "Kanpur",
        experience: "9 years",
        initials: "PS"
    },
    {
        id: 4,
        name: "Suresh Yadav",
        sport: "Kabaddi",
        location: "Ayodhya",
        experience: "7 years",
        initials: "SY"
    },
    {
        id: 5,
        name: "Neha Verma",
        sport: "Hockey",
        location: "Lucknow",
        experience: "5 years",
        initials: "NV"
    },
    {
        id: 6,
        name: "Vikas Mishra",
        sport: "Volleyball",
        location: "Unnao",
        experience: "10 years",
        initials: "VM"
    }
];


/* =========================================================
   STAGE 4 - DEMO GROUND DATA
   ========================================================= */

const grounds = [
    {
        id: 1,
        name: "Lucknow Rural Sports Ground",
        district: "Lucknow",
        village: "Mohanlalganj",
        sport: "Cricket",
        capacity: 500,
        facility: "Changing Room",
        condition: "Good",
        status: "Available",
        icon: "🏟️"
    },
    {
        id: 2,
        name: "Barabanki Community Ground",
        district: "Barabanki",
        village: "Nawabganj",
        sport: "Football",
        capacity: 350,
        facility: "Flood Lights",
        condition: "Good",
        status: "Available",
        icon: "🏟️"
    },
    {
        id: 3,
        name: "Ayodhya Rural Sports Field",
        district: "Ayodhya",
        village: "Sohawal",
        sport: "Kabaddi",
        capacity: 250,
        facility: "Open Field",
        condition: "Fair",
        status: "Maintenance",
        icon: "🏟️"
    },
    {
        id: 4,
        name: "Kanpur Village Athletics Ground",
        district: "Kanpur",
        village: "Bilhaur",
        sport: "Athletics",
        capacity: 400,
        facility: "Running Track",
        condition: "Good",
        status: "Available",
        icon: "🏟️"
    },
    {
        id: 5,
        name: "Unnao Community Sports Ground",
        district: "Unnao",
        village: "Safipur",
        sport: "Hockey",
        capacity: 300,
        facility: "Flood Lights",
        condition: "Good",
        status: "Occupied",
        icon: "🏟️"
    },
    {
        id: 6,
        name: "Barabanki Volleyball Arena",
        district: "Barabanki",
        village: "Fatehpur",
        sport: "Volleyball",
        capacity: 180,
        facility: "Volleyball Court",
        condition: "Good",
        status: "Available",
        icon: "🏟️"
    }
];


/* =========================================================
   STAGE 5 - TOURNAMENT DATA
   ========================================================= */

const tournaments = [
    {
        id: "T001",
        name: "KheloGram Rural Cricket Cup",
        sport: "Cricket",
        district: "Lucknow",
        village: "Mohanlalganj",
        venue: "Lucknow Rural Sports Ground",
        startDate: "2026-09-05",
        endDate: "2026-09-07",
        registrationDeadline: "2026-08-30",
        participants: 64,
        capacity: 80,
        entryFee: "Free",
        organizer: "Mohanlalganj Sports Committee",
        category: "U-19",
        icon: "🏏",
        description:
            "A village-level cricket competition connecting young rural players with local sporting opportunities.",
        prize: "Trophy + Certificates",
        contact: "KheloGram Sports Desk"
    },

    {
        id: "T002",
        name: "Awadh Grassroots Football League",
        sport: "Football",
        district: "Barabanki",
        village: "Nawabganj",
        venue: "Barabanki Community Ground",
        startDate: "2026-09-12",
        endDate: "2026-09-14",
        registrationDeadline: "2026-09-05",
        participants: 48,
        capacity: 64,
        entryFee: "Free",
        organizer: "Barabanki District Sports Club",
        category: "Open",
        icon: "⚽",
        description:
            "A grassroots football tournament designed to give village teams structured competitive experience.",
        prize: "Trophy + Sports Kits",
        contact: "District Sports Coordinator"
    },

    {
        id: "T003",
        name: "Ayodhya Rural Kabaddi Championship",
        sport: "Kabaddi",
        district: "Ayodhya",
        village: "Sohawal",
        venue: "Ayodhya Rural Sports Field",
        startDate: "2026-09-20",
        endDate: "2026-09-21",
        registrationDeadline: "2026-09-14",
        participants: 40,
        capacity: 48,
        entryFee: "₹100",
        organizer: "Ayodhya Rural Kabaddi Association",
        category: "Open",
        icon: "🤼",
        description:
            "Competitive kabaddi for village athletes with an opportunity to be noticed by district-level coaches.",
        prize: "₹10,000 + Trophy",
        contact: "Kabaddi Association Desk"
    },

    {
        id: "T004",
        name: "KheloGram Athletics Talent Meet",
        sport: "Athletics",
        district: "Kanpur",
        village: "Bilhaur",
        venue: "Kanpur Village Athletics Ground",
        startDate: "2026-09-27",
        endDate: "2026-09-28",
        registrationDeadline: "2026-09-20",
        participants: 55,
        capacity: 100,
        entryFee: "Free",
        organizer: "Kanpur Rural Athletics Council",
        category: "U-17",
        icon: "🏃",
        description:
            "Track and field events designed to identify promising young athletes from rural communities.",
        prize: "Medals + Certificates",
        contact: "Athletics Event Coordinator"
    },

    {
        id: "T005",
        name: "Unnao Rural Hockey Challenge",
        sport: "Hockey",
        district: "Unnao",
        village: "Safipur",
        venue: "Unnao Community Sports Ground",
        startDate: "2026-10-03",
        endDate: "2026-10-05",
        registrationDeadline: "2026-09-25",
        participants: 70,
        capacity: 80,
        entryFee: "₹150",
        organizer: "Unnao Hockey Development Group",
        category: "Open",
        icon: "🏑",
        description:
            "A competitive rural hockey event focused on team development and district-level talent discovery.",
        prize: "₹15,000 + Trophy",
        contact: "Hockey Development Desk"
    },

    {
        id: "T006",
        name: "Barabanki Village Volleyball Open",
        sport: "Volleyball",
        district: "Barabanki",
        village: "Fatehpur",
        venue: "Barabanki Volleyball Arena",
        startDate: "2026-10-10",
        endDate: "2026-10-11",
        registrationDeadline: "2026-10-03",
        participants: 30,
        capacity: 48,
        entryFee: "Free",
        organizer: "Fatehpur Village Sports Committee",
        category: "Open",
        icon: "🏐",
        description:
            "An open volleyball competition bringing village teams together for organized competition.",
        prize: "Trophy + Certificates",
        contact: "Tournament Coordinator"
    },

    {
        id: "T007",
        name: "Lucknow Rural Badminton Open",
        sport: "Badminton",
        district: "Lucknow",
        village: "Malihabad",
        venue: "Malihabad Community Sports Hall",
        startDate: "2026-10-17",
        endDate: "2026-10-18",
        registrationDeadline: "2026-10-10",
        participants: 22,
        capacity: 40,
        entryFee: "₹100",
        organizer: "Malihabad Sports Collective",
        category: "Open",
        icon: "🏸",
        description:
            "A local badminton competition for emerging rural players.",
        prize: "Medals + Certificates",
        contact: "Badminton Event Desk"
    },

    {
        id: "T008",
        name: "Awadh Wrestling Talent Search",
        sport: "Wrestling",
        district: "Ayodhya",
        village: "Rudauli",
        venue: "Rudauli Rural Akhara",
        startDate: "2026-10-24",
        endDate: "2026-10-25",
        registrationDeadline: "2026-10-17",
        participants: 36,
        capacity: 50,
        entryFee: "Free",
        organizer: "Awadh Rural Wrestling Council",
        category: "U-19",
        icon: "🤼",
        description:
            "A grassroots wrestling meet focused on discovering promising rural athletes.",
        prize: "Trophy + Sports Scholarship Recommendation",
        contact: "Wrestling Council Desk"
    }
];


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", initializeApplication);


/* =========================================================
   APPLICATION INITIALIZATION
   ========================================================= */

function initializeApplication() {
    setupAuthForm();
    setupProfileForm();

    renderCoaches();
    renderGrounds();
    initializeTournamentSection();

    loadStoredUser();
    loadProfileIntoForm();
    updateDashboardData();
    updateInsights();
}


/* =========================================================
   LANDING PAGE
   ========================================================= */

function scrollToSection(id) {
    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
        behavior: "smooth"
    });
}


/* =========================================================
   ROLE SELECTOR
   ========================================================= */

function openRoleSelector() {
    const modal = document.getElementById("roleModal");

    if (modal) {
        modal.classList.remove("hidden");
    }
}


function closeRoleSelector() {
    const modal = document.getElementById("roleModal");

    if (modal) {
        modal.classList.add("hidden");
    }
}


function selectRole(role) {
    selectedRole = role;
    closeRoleSelector();
    openAuthModal();
}


/* =========================================================
   AUTH MODAL
   ========================================================= */

function openAuthModal() {
    const modal = document.getElementById("authModal");

    if (!modal) return;

    modal.classList.remove("hidden");
    switchAuth("register");
}


function closeAuthModal() {
    const modal = document.getElementById("authModal");

    if (modal) {
        modal.classList.add("hidden");
    }
}


function switchAuth(mode) {
    authMode = mode;

    const registerTab = document.getElementById("registerTab");
    const loginTab = document.getElementById("loginTab");
    const nameField = document.getElementById("nameField");
    const authTitle = document.getElementById("authTitle");
    const authSubtitle = document.getElementById("authSubtitle");
    const authButtonText = document.getElementById("authButtonText");
    const authPassword = document.getElementById("authPassword");

    if (!registerTab || !loginTab) return;

    registerTab.classList.toggle("active", mode === "register");
    loginTab.classList.toggle("active", mode === "login");

    if (mode === "register") {
        if (nameField) {
            nameField.style.display = "block";
        }

        if (authTitle) {
            authTitle.textContent = "Create your account";
        }

        if (authSubtitle) {
            authSubtitle.textContent =
                "Join the KheloGram ecosystem.";
        }

        if (authButtonText) {
            authButtonText.textContent = "Create Account";
        }

        if (authPassword) {
            authPassword.placeholder = "Create a password";
        }

        return;
    }

    if (nameField) {
        nameField.style.display = "none";
    }

    if (authTitle) {
        authTitle.textContent = "Welcome back";
    }

    if (authSubtitle) {
        authSubtitle.textContent =
            "Login to your KheloGram dashboard.";
    }

    if (authButtonText) {
        authButtonText.textContent = "Login";
    }

    if (authPassword) {
        authPassword.placeholder = "Enter your password";
    }
}


/* =========================================================
   AUTH FORM
   ========================================================= */

function setupAuthForm() {
    const form = document.getElementById("authForm");

    if (!form) return;

    form.addEventListener("submit", handleAuthSubmit);
}


function handleAuthSubmit(event) {
    event.preventDefault();

    const name =
        document.getElementById("authName")?.value.trim() || "";

    const email =
        document.getElementById("authEmail")?.value.trim() || "";

    const password =
        document.getElementById("authPassword")?.value || "";

    if (!email || !password) {
        showToast("Please enter your email and password.");
        return;
    }

    let user;

    if (authMode === "register") {
        user = {
            name: name || "KheloGram Athlete",
            email,
            role: selectedRole,
            createdAt: new Date().toISOString()
        };
    } else {
        const existingUser = getStoredUser();

        user = existingUser || {
            name: name || "KheloGram User",
            email,
            role: selectedRole
        };

        user.email = email;
    }

    saveUser(user);

    closeAuthModal();
    showDashboard();

    showToast(
        authMode === "register"
            ? "Account created successfully."
            : "Welcome back to KheloGram."
    );
}


/* =========================================================
   USER STORAGE
   ========================================================= */

function getStoredUser() {
    return getStorageItem(STORAGE_KEYS.USER, null);
}


function saveUser(user) {
    setStorageItem(STORAGE_KEYS.USER, user);
}


function loadStoredUser() {
    const user = getStoredUser();

    if (user) {
        updateUserUI(user);
    }
}


/* =========================================================
   DASHBOARD
   ========================================================= */

function showDashboard() {
    const landingPage =
        document.getElementById("landingPage");

    const dashboardPage =
        document.getElementById("dashboardPage");

    if (landingPage) {
        landingPage.classList.add("hidden");
    }

    if (dashboardPage) {
        dashboardPage.classList.remove("hidden");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    const user = getStoredUser();

    if (user) {
        updateUserUI(user);
    }

    updateDashboardData();
    updateInsights();
}


function updateUserUI(user) {
    const displayName = user.name || "User";
    const firstName = displayName.split(/\s+/)[0];
    const initials = getInitials(displayName);

    setText("dashboardName", firstName);
    setText("userDisplayName", displayName);
    setText("userRole", user.role || "Athlete");
    setText("userInitials", initials);
    setText("passportInitials", initials);
    setText("profileAvatar", initials);

    const profileCardName =
        document.getElementById("profileCardName");

    if (
        profileCardName &&
        !getStoredProfile()?.name
    ) {
        profileCardName.textContent = displayName;
    }

    setText(
        "dashboardSubtitle",
        `${user.role || "Athlete"} sports ecosystem.`
    );
}


function logout() {
    localStorage.removeItem(STORAGE_KEYS.USER);

    const dashboardPage =
        document.getElementById("dashboardPage");

    const landingPage =
        document.getElementById("landingPage");

    if (dashboardPage) {
        dashboardPage.classList.add("hidden");
    }

    if (landingPage) {
        landingPage.classList.remove("hidden");
    }

    showToast("You have been logged out.");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   DASHBOARD NAVIGATION
   ========================================================= */

function showDashboardSection(sectionName, button) {
    document
        .querySelectorAll(".dashboard-section")
        .forEach(section => {
            section.classList.add("hidden");
        });

    const target =
        document.getElementById(`section-${sectionName}`);

    if (target) {
        target.classList.remove("hidden");
    }

    document
        .querySelectorAll(".menu-item")
        .forEach(item => {
            item.classList.remove("active");
        });

    if (button) {
        button.classList.add("active");
    }

    switch (sectionName) {
        case "coaches":
            renderCoaches();
            break;

        case "grounds":
            renderGrounds();
            break;

        case "tournaments":
            initializeTournamentSection();
            break;

        case "insights":
            updateInsights();
            break;

        case "overview":
            updateDashboardData();
            break;

        case "profile":
            loadProfileIntoForm();
            break;
    }
}


/* =========================================================
   PROFILE
   ========================================================= */

function setupProfileForm() {
    const form = document.getElementById("profileForm");

    if (!form) return;

    form.addEventListener("submit", handleProfileSubmit);
}


function handleProfileSubmit(event) {
    event.preventDefault();

    const profile = {
        name:
            document.getElementById("profileName")?.value.trim() || "",

        age:
            document.getElementById("profileAge")?.value || "",

        village:
            document.getElementById("profileVillage")?.value.trim() || "",

        district:
            document.getElementById("profileDistrict")?.value.trim() || "",

        sport:
            document.getElementById("profileSport")?.value || "",

        skill:
            document.getElementById("profileSkill")?.value || "",

        achievements:
            document
                .getElementById("profileAchievements")
                ?.value.trim() || ""
    };

    setStorageItem(STORAGE_KEYS.PROFILE, profile);

    const user = getStoredUser();

    if (user && profile.name) {
        user.name = profile.name;
        saveUser(user);
        updateUserUI(user);
    }

    updateDashboardData();
    updateInsights();

    showToast("Sports Passport saved successfully.");
}


function getStoredProfile() {
    return getStorageItem(STORAGE_KEYS.PROFILE, null);
}


function loadProfileIntoForm() {
    const profile = getStoredProfile();

    if (!profile) return;

    setValue("profileName", profile.name);
    setValue("profileAge", profile.age);
    setValue("profileVillage", profile.village);
    setValue("profileDistrict", profile.district);
    setValue("profileSport", profile.sport);
    setValue("profileSkill", profile.skill);
    setValue("profileAchievements", profile.achievements);
}


function updateDashboardData() {
    const profile = getStoredProfile();
    const user = getStoredUser();

    const completion =
        calculateProfileCompletion(profile);

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
        profile?.village && profile?.district
            ? `${profile.village}, ${profile.district}`
            : "Add your village and district"
    );

    setText(
        "passportSport",
        profile?.sport || "Sport not selected"
    );

    const connectedCoach =
        localStorage.getItem(STORAGE_KEYS.COACH);

    setText(
        "coachStatus",
        connectedCoach
            ? "Connected"
            : "Not connected"
    );

    setText(
        "talentStatus",
        completion >= 80
            ? "Ready"
            : completion >= 50
                ? "Developing"
                : "Building"
    );

    const aiSummary =
        document.getElementById("aiSummary");

    if (aiSummary) {
        aiSummary.textContent = profile?.sport
            ? `Your profile currently shows ${profile.sport} as your primary sport at ${profile.skill || "developing"} level. Continue adding experience and achievements to strengthen your talent profile.`
            : "Complete your sports profile to generate a personalized talent profile.";
    }
}


function calculateProfileCompletion(profile) {
    if (!profile) return 0;

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
        (completed / fields.length) * 100
    );
}


/* =========================================================
   COACHES
   ========================================================= */

function renderCoaches(list = coaches) {
    const grid = document.getElementById("coachGrid");

    if (!grid) return;

    if (!list.length) {
        grid.innerHTML = `
            <div class="empty-panel">
                <div>🔎</div>
                <h3>No coaches found</h3>
                <p>Try another sport or location.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = list
        .map(createCoachCard)
        .join("");
}


function createCoachCard(coach) {
    const connected =
        localStorage.getItem(STORAGE_KEYS.COACH) ===
        String(coach.id);

    return `
        <div class="coach-card">

            <div class="coach-avatar">
                ${escapeHTML(coach.initials)}
            </div>

            <h3>
                ${escapeHTML(coach.name)}
            </h3>

            <p>
                ${escapeHTML(coach.sport)}
            </p>

            <small>
                📍 ${escapeHTML(coach.location)}
            </small>

            <small>
                Experience: ${escapeHTML(coach.experience)}
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
                            type="button"
                            onclick="connectCoach(${coach.id})"
                        >
                            Connect Coach →
                        </button>
                    `
            }

        </div>
    `;
}


function filterCoaches() {
    const search =
        document
            .getElementById("coachSearch")
            ?.value
            .toLowerCase()
            .trim() || "";

    const sport =
        document.getElementById("coachSportFilter")?.value || "";

    const filtered =
        coaches.filter(coach => {
            const searchable =
                `${coach.name} ${coach.sport} ${coach.location}`
                    .toLowerCase();

            return (
                (!search || searchable.includes(search)) &&
                (!sport || coach.sport === sport)
            );
        });

    renderCoaches(filtered);
}


function connectCoach(id) {
    const coach =
        coaches.find(item => item.id === id);

    if (!coach) return;

    localStorage.setItem(
        STORAGE_KEYS.COACH,
        String(id)
    );

    updateDashboardData();
    renderCoaches();

    showToast(`Connected with ${coach.name}.`);
}


/* =========================================================
   GROUNDS
   ========================================================= */

function renderGrounds(list = grounds) {
    const grid = document.getElementById("groundGrid");
    const count = document.getElementById("groundCount");

    if (!grid) return;

    setText("groundCount", list.length);

    if (!list.length) {
        grid.innerHTML = `
            <div class="tournament-empty">
                <div class="tournament-empty-icon">
                    🏟️
                </div>

                <h3>No grounds found</h3>

                <p>
                    Try another search or filter.
                </p>
            </div>
        `;
        return;
    }

    grid.innerHTML = list
        .map(createGroundCard)
        .join("");
}


function createGroundCard(ground) {
    const statusClass =
        ground.status
            .toLowerCase()
            .replace(/\s+/g, "-");

    return `
        <div class="ground-card">

            <div class="ground-card-top">

                <div class="ground-icon">
                    ${ground.icon}
                </div>

                <span
                    class="ground-status ${statusClass}"
                >
                    ${escapeHTML(ground.status)}
                </span>

            </div>

            <h3>
                ${escapeHTML(ground.name)}
            </h3>

            <div class="ground-location">
                📍 ${escapeHTML(ground.village)},
                ${escapeHTML(ground.district)}
            </div>

            <div class="ground-details">

                <div class="ground-detail">
                    <small>SPORT</small>
                    <strong>
                        ${escapeHTML(ground.sport)}
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
                        ${escapeHTML(ground.facility)}
                    </strong>
                </div>

                <div class="ground-detail">
                    <small>CONDITION</small>
                    <strong>
                        ${escapeHTML(ground.condition)}
                    </strong>
                </div>

            </div>

            <div class="ground-card-actions">

                <button
                    class="secondary-btn"
                    type="button"
                    onclick="showGroundDetails(${ground.id})"
                >
                    View Details
                </button>

            </div>

        </div>
    `;
}


function filterGrounds() {
    const search =
        document
            .getElementById("groundSearch")
            ?.value
            .toLowerCase()
            .trim() || "";

    const district =
        document.getElementById("groundDistrictFilter")?.value || "";

    const sport =
        document.getElementById("groundSportFilter")?.value || "";

    const filtered =
        grounds.filter(ground => {
            const searchable =
                `${ground.name} ${ground.village} ${ground.district} ${ground.sport}`
                    .toLowerCase();

            return (
                (!search || searchable.includes(search)) &&
                (!district || ground.district === district) &&
                (!sport || ground.sport === sport)
            );
        });

    renderGrounds(filtered);
}


function showGroundDetails(id) {
    const ground =
        grounds.find(item => item.id === id);

    if (!ground) return;

    setText(
        "groundDetailDistrict",
        ground.district.toUpperCase()
    );

    setText(
        "groundDetailName",
        ground.name
    );

    setText(
        "groundDetailLocation",
        `${ground.village}, ${ground.district}`
    );

    setText(
        "groundDetailStatus",
        ground.status
    );

    setText(
        "groundDetailSport",
        ground.sport
    );

    setText(
        "groundDetailCapacity",
        ground.capacity
    );

    setText(
        "groundDetailFacility",
        ground.facility
    );

    setText(
        "groundDetailCondition",
        ground.condition
    );

    document
        .getElementById("groundDetailsModal")
        ?.classList.remove("hidden");
}


function closeGroundDetails() {
    document
        .getElementById("groundDetailsModal")
        ?.classList.add("hidden");
}


/* =========================================================
   STAGE 5 - TOURNAMENT INITIALIZATION
   ========================================================= */

function initializeTournamentSection() {
    const section =
        document.getElementById("section-tournaments");

    if (!section) return;

    if (!section.dataset.stage5Ready) {
        section.innerHTML =
            getTournamentSectionHTML();

        section.dataset.stage5Ready = "true";

        setupTournamentControls();
    }

    renderTournamentPage();
}


/* =========================================================
   TOURNAMENT SECTION HTML
   ========================================================= */

function getTournamentSectionHTML() {
    return `
        <div class="tournament-page">

            <div class="section-label">
                OPPORTUNITIES
            </div>

            <div class="tournament-hero">

                <div class="tournament-hero-top">

                    <div class="tournament-hero-copy">

                        <small class="section-label">
                            KHELOGRAM COMPETITION NETWORK
                        </small>

                        <h2>
                            Discover your next
                            sporting opportunity.
                        </h2>

                        <p>
                            Find rural tournaments, register
                            for competitions and take your
                            sports journey from village
                            participation to higher-level
                            opportunities.
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
                        type="text"
                        placeholder="Search by tournament, sport or location..."
                    >
                </div>

                <div class="tournament-control">
                    <label>
                        SPORT
                    </label>

                    <select id="tournamentSportFilter">
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

                    <select id="tournamentDistrictFilter">
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


        <div
            id="tournamentDetailsModal"
            class="modal hidden"
        >

            <div class="modal-card tournament-details-modal">

                <button
                    class="close-btn"
                    type="button"
                    onclick="closeTournamentDetails()"
                >
                    ×
                </button>

                <div class="tournament-detail-header">

                    <div
                        id="detailTournamentIcon"
                        class="tournament-detail-icon"
                    >
                        🏆
                    </div>

                    <div>

                        <small id="detailTournamentSport">
                            SPORT
                        </small>

                        <h2 id="detailTournamentName">
                            Tournament
                        </h2>

                        <p
                            id="detailTournamentLocation"
                            class="tournament-detail-location"
                        >
                            Location
                        </p>

                    </div>

                </div>

                <div
                    id="detailTournamentStatus"
                    class="tournament-detail-status-row"
                ></div>

                <div
                    id="detailTournamentGrid"
                    class="tournament-detail-grid"
                ></div>

                <p
                    id="detailTournamentDescription"
                    class="tournament-detail-description"
                ></p>

                <div
                    id="tournamentRegistrationBox"
                    class="tournament-registration-box"
                ></div>

                <div class="tournament-modal-actions">

                    <button
                        class="secondary-btn"
                        type="button"
                        onclick="closeTournamentDetails()"
                    >
                        Close
                    </button>

                    <button
                        id="tournamentRegisterButton"
                        class="primary-btn"
                        type="button"
                        onclick="registerForCurrentTournament()"
                    >
                        Register →
                    </button>

                </div>

            </div>

        </div>
    `;
}


/* =========================================================
   TOURNAMENT CONTROLS
   ========================================================= */

function setupTournamentControls() {
    const search =
        document.getElementById("tournamentSearch");

    const sport =
        document.getElementById("tournamentSportFilter");

    const district =
        document.getElementById("tournamentDistrictFilter");

    search?.addEventListener("input", renderTournamentPage);
    sport?.addEventListener("change", renderTournamentPage);
    district?.addEventListener("change", renderTournamentPage);
}


/* =========================================================
   TOURNAMENT RENDERING
   ========================================================= */

function renderTournamentPage() {
    const grid =
        document.getElementById("tournamentGrid");

    if (!grid) return;

    const search =
        document
            .getElementById("tournamentSearch")
            ?.value
            .toLowerCase()
            .trim() || "";

    const sport =
        document.getElementById("tournamentSportFilter")?.value || "";

    const district =
        document.getElementById("tournamentDistrictFilter")?.value || "";

    const filtered =
        tournaments.filter(tournament => {
            const searchable =
                [
                    tournament.name,
                    tournament.sport,
                    tournament.district,
                    tournament.village,
                    tournament.venue,
                    tournament.organizer
                ]
                    .join(" ")
                    .toLowerCase();

            return (
                (!search || searchable.includes(search)) &&
                (!sport || tournament.sport === sport) &&
                (!district || tournament.district === district)
            );
        });

    renderTournamentStats();
    renderTournamentCards(filtered);
    renderMyTournaments();
}


/* =========================================================
   TOURNAMENT STATISTICS
   ========================================================= */

function renderTournamentStats() {
    const stats =
        document.getElementById("tournamentStats");

    if (!stats) return;

    const registrations =
        getTournamentRegistrations();

    const openCount =
        tournaments.filter(tournament =>
            getTournamentStatus(tournament).key === "open"
        ).length;

    const sports =
        new Set(
            tournaments.map(tournament => tournament.sport)
        ).size;

    stats.innerHTML = `
        <div class="tournament-stat">
            <small>TOURNAMENTS</small>
            <strong>${tournaments.length}</strong>
        </div>

        <div class="tournament-stat">
            <small>OPEN OPPORTUNITIES</small>
            <strong>${openCount}</strong>
        </div>

        <div class="tournament-stat">
            <small>SPORTS</small>
            <strong>${sports}</strong>
        </div>

        <div class="tournament-stat">
            <small>MY REGISTRATIONS</small>
            <strong>${registrations.length}</strong>
        </div>
    `;
}


/* =========================================================
   TOURNAMENT CARDS
   ========================================================= */

function renderTournamentCards(list) {
    const grid =
        document.getElementById("tournamentGrid");

    if (!grid) return;

    setText(
        "tournamentResultCount",
        `${list.length} ${
            list.length === 1
                ? "tournament"
                : "tournaments"
        }`
    );

    if (!list.length) {
        grid.innerHTML = `
            <div class="tournament-empty">

                <div class="tournament-empty-icon">
                    🔎
                </div>

                <h3>
                    No tournaments found
                </h3>

                <p>
                    Try changing your search,
                    sport or district filter.
                </p>

            </div>
        `;

        return;
    }

    grid.innerHTML =
        list
            .map(createTournamentCard)
            .join("");
}


function createTournamentCard(tournament) {
    const status =
        getTournamentStatus(tournament);

    const registered =
        isRegistered(tournament.id);

    const percentage =
        tournament.capacity > 0
            ? Math.min(
                100,
                Math.round(
                    (
                        tournament.participants /
                        tournament.capacity
                    ) * 100
                )
            )
            : 0;

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
                ${escapeHTML(tournament.name)}
            </h3>

            <div class="tournament-location">
                📍 ${escapeHTML(tournament.village)},
                ${escapeHTML(tournament.district)}
            </div>

            <div class="tournament-info-grid">

                <div class="tournament-info">
                    <small>DATE</small>
                    <strong>
                        ${formatDate(tournament.startDate)}
                    </strong>
                </div>

                <div class="tournament-info">
                    <small>CATEGORY</small>
                    <strong>
                        ${escapeHTML(tournament.category)}
                    </strong>
                </div>

                <div class="tournament-info">
                    <small>REGISTRATION</small>
                    <strong>
                        ${formatDate(
                            tournament.registrationDeadline
                        )}
                    </strong>
                </div>

                <div class="tournament-info">
                    <small>ENTRY</small>
                    <strong>
                        ${escapeHTML(tournament.entryFee)}
                    </strong>
                </div>

            </div>

            <p class="tournament-description">
                ${escapeHTML(tournament.description)}
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
                    type="button"
                    onclick="openTournamentDetails('${tournament.id}')"
                >
                    View Details
                </button>

                ${
                    registered
                        ? `
                            <button
                                class="secondary-btn"
                                type="button"
                                onclick="cancelTournamentRegistration('${tournament.id}')"
                            >
                                Cancel Registration
                            </button>
                        `
                        : `
                            <button
                                class="primary-btn"
                                type="button"
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


/* =========================================================
   TOURNAMENT DETAILS
   ========================================================= */

function openTournamentDetails(id) {
    const tournament =
        tournaments.find(item => item.id === id);

    if (!tournament) return;

    currentTournamentId = tournament.id;

    setText(
        "detailTournamentIcon",
        tournament.icon
    );

    setText(
        "detailTournamentSport",
        tournament.sport.toUpperCase()
    );

    setText(
        "detailTournamentName",
        tournament.name
    );

    setText(
        "detailTournamentLocation",
        `📍 ${tournament.village}, ${tournament.district} · ${tournament.venue}`
    );

    const status =
        getTournamentStatus(tournament);

    const statusContainer =
        document.getElementById(
            "detailTournamentStatus"
        );

    if (statusContainer) {
        statusContainer.innerHTML = `
            <span
                class="tournament-status ${status.className}"
            >
                ${status.label}
            </span>

            <span class="badge">
                ${escapeHTML(tournament.category)}
            </span>
        `;
    }

    const detailsGrid =
        document.getElementById(
            "detailTournamentGrid"
        );

    if (detailsGrid) {
        detailsGrid.innerHTML = `
            <div class="tournament-detail-item">
                <small>START DATE</small>
                <strong>
                    ${formatDate(tournament.startDate)}
                </strong>
            </div>

            <div class="tournament-detail-item">
                <small>END DATE</small>
                <strong>
                    ${formatDate(tournament.endDate)}
                </strong>
            </div>

            <div class="tournament-detail-item">
                <small>REGISTRATION DEADLINE</small>
                <strong>
                    ${formatDate(
                        tournament.registrationDeadline
                    )}
                </strong>
            </div>

            <div class="tournament-detail-item">
                <small>PARTICIPANTS</small>
                <strong>
                    ${tournament.participants}
                    / ${tournament.capacity}
                </strong>
            </div>

            <div class="tournament-detail-item">
                <small>ENTRY FEE</small>
                <strong>
                    ${escapeHTML(tournament.entryFee)}
                </strong>
            </div>

            <div class="tournament-detail-item">
                <small>PRIZE / RECOGNITION</small>
                <strong>
                    ${escapeHTML(tournament.prize)}
                </strong>
            </div>

            <div class="tournament-detail-item">
                <small>ORGANIZER</small>
                <strong>
                    ${escapeHTML(tournament.organizer)}
                </strong>
            </div>

            <div class="tournament-detail-item">
                <small>CONTACT</small>
                <strong>
                    ${escapeHTML(tournament.contact)}
                </strong>
            </div>
        `;
    }

    setText(
        "detailTournamentDescription",
        tournament.description
    );

    updateTournamentRegistrationBox(tournament);

    document
        .getElementById("tournamentDetailsModal")
        ?.classList.remove("hidden");
}


function closeTournamentDetails() {
    document
        .getElementById("tournamentDetailsModal")
        ?.classList.add("hidden");

    currentTournamentId = null;
}


/* =========================================================
   TOURNAMENT REGISTRATION BOX
   ========================================================= */

function updateTournamentRegistrationBox(tournament) {
    const box =
        document.getElementById(
            "tournamentRegistrationBox"
        );

    const button =
        document.getElementById(
            "tournamentRegisterButton"
        );

    if (!box || !button) return;

    const registered =
        isRegistered(tournament.id);

    const status =
        getTournamentStatus(tournament);

    button.disabled = false;
    button.classList.remove(
        "primary-btn",
        "secondary-btn"
    );

    if (registered) {
        box.innerHTML = `
            <strong>
                ✓ You are registered
            </strong>

            <p>
                Your registration is saved on this device.
                You can cancel it from the tournament card
                or this window.
            </p>
        `;

        button.textContent =
            "Cancel Registration";

        button.classList.add("secondary-btn");

        button.onclick = () =>
            cancelTournamentRegistration(
                tournament.id
            );

        return;
    }

    if (status.key === "full") {
        box.innerHTML = `
            <strong>
                Registration is currently full
            </strong>

            <p>
                This tournament has reached its participant
                capacity.
            </p>
        `;

        button.textContent =
            "Registration Full";

        button.disabled = true;
        button.classList.add("primary-btn");

        return;
    }

    if (status.key === "closed") {
        box.innerHTML = `
            <strong>
                Registration is closed
            </strong>

            <p>
                The registration deadline for this tournament
                has passed.
            </p>
        `;

        button.textContent = "Registration Closed";
        button.disabled = true;
        button.classList.add("secondary-btn");

        return;
    }

    box.innerHTML = `
        <strong>
            Registration available
        </strong>

        <p>
            Registration closes on
            ${formatDate(
                tournament.registrationDeadline
            )}.
        </p>
    `;

    button.textContent = "Register →";
    button.classList.add("primary-btn");

    button.onclick = () =>
        registerForTournament(
            tournament.id
        );
}


/* =========================================================
   TOURNAMENT REGISTRATION
   ========================================================= */

function registerForCurrentTournament() {
    if (!currentTournamentId) return;

    registerForTournament(
        currentTournamentId
    );
}


function registerForTournament(id) {
    const tournament =
        tournaments.find(item => item.id === id);

    if (!tournament) return;

    const user = getStoredUser();

    if (!user) {
        showToast(
            "Please create an account before registering."
        );

        openRoleSelector();
        return;
    }

    const profile = getStoredProfile();

    if (!profile?.name && !user.name) {
        showToast(
            "Please complete your Sports Passport first."
        );

        showDashboard();

        const profileButton =
            document.querySelector(
                '.menu-item[onclick*="profile"]'
            );

        showDashboardSection(
            "profile",
            profileButton
        );

        return;
    }

    const status =
        getTournamentStatus(tournament);

    if (status.key === "full") {
        showToast(
            "This tournament is already full."
        );
        return;
    }

    if (status.key === "closed") {
        showToast(
            "Registration for this tournament is closed."
        );
        return;
    }

    if (isRegistered(id)) {
        showToast(
            "You are already registered for this tournament."
        );
        return;
    }

    const registrations =
        getTournamentRegistrations();

    registrations.push({
        tournamentId: id,
        registeredAt: new Date().toISOString(),
        name:
            profile?.name ||
            user.name ||
            "KheloGram Athlete",
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

    if (currentTournamentId === id) {
        updateTournamentRegistrationBox(
            tournament
        );
    }
}


/* =========================================================
   CANCEL TOURNAMENT REGISTRATION
   ========================================================= */

function cancelTournamentRegistration(id) {
    const tournament =
        tournaments.find(item => item.id === id);

    if (!tournament) return;

    const confirmed =
        window.confirm(
            `Cancel your registration for "${tournament.name}"?`
        );

    if (!confirmed) return;

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

    if (currentTournamentId === id) {
        updateTournamentRegistrationBox(
            tournament
        );
    }
}


/* =========================================================
   TOURNAMENT STORAGE
   ========================================================= */

function getTournamentRegistrations() {
    return getStorageItem(
        STORAGE_KEYS.TOURNAMENTS,
        []
    );
}


function isRegistered(id) {
    return getTournamentRegistrations()
        .some(
            registration =>
                registration.tournamentId === id
        );
}


/* =========================================================
   MY TOURNAMENTS
   ========================================================= */

function renderMyTournaments() {
    const panel =
        document.getElementById(
            "myTournamentsPanel"
        );

    if (!panel) return;

    const registrations =
        getTournamentRegistrations();

    if (!registrations.length) {
        panel.innerHTML = `
            <small class="section-label">
                MY COMPETITIONS
            </small>

            <h3>
                Your tournament registrations
            </h3>

            <p class="section-description">
                You have not registered for a tournament yet.
                Browse the opportunities above to get started.
            </p>
        `;

        return;
    }

    const registeredTournaments =
        registrations
            .map(registration =>
                tournaments.find(
                    tournament =>
                        tournament.id ===
                        registration.tournamentId
                )
            )
            .filter(Boolean);

    panel.innerHTML = `
        <small class="section-label">
            MY COMPETITIONS
        </small>

        <h3>
            Your tournament registrations
        </h3>

        <div class="my-tournament-list">

            ${registeredTournaments
                .map(tournament => `
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
                            type="button"
                            onclick="openTournamentDetails('${tournament.id}')"
                        >
                            View
                        </button>

                    </div>
                `)
                .join("")}

        </div>
    `;
}


/* =========================================================
   TOURNAMENT STATUS
   ========================================================= */

function getTournamentStatus(tournament) {
    if (
        tournament.participants >=
        tournament.capacity
    ) {
        return {
            key: "full",
            label: "FULL",
            className: "full"
        };
    }

    const today = new Date();

    const deadline =
        parseDate(
            tournament.registrationDeadline
        );

    const start =
        parseDate(
            tournament.startDate
        );

    if (
        deadline &&
        today > endOfDay(deadline)
    ) {
        return {
            key: "closed",
            label: "REGISTRATION CLOSED",
            className: "soon"
        };
    }

    if (
        start &&
        today >=
            new Date(
                start.getTime() -
                7 * 24 * 60 * 60 * 1000
            )
    ) {
        return {
            key: "soon",
            label: "STARTING SOON",
            className: "soon"
        };
    }

    return {
        key: "open",
        label: "REGISTRATION OPEN",
        className: "open"
    };
}


/* =========================================================
   INSIGHTS
   ========================================================= */

function updateInsights() {
    const profile = getStoredProfile();

    const sport =
        profile?.sport || "Not provided";

    const skill =
        profile?.skill || "Not provided";

    const location =
        profile?.village &&
        profile?.district
            ? `${profile.village}, ${profile.district}`
            : "Not provided";

    const experience =
        profile?.achievements ||
        "Not provided";

    setText("signalSport", sport);
    setText("signalSkill", skill);
    setText("signalLocation", location);
    setText("signalExperience", experience);

    const title =
        document.getElementById("insightTitle");

    const description =
        document.getElementById("insightDescription");

    if (!profile?.sport) {
        if (title) {
            title.textContent =
                "Build your sports passport";
        }

        if (description) {
            description.textContent =
                "Add your sport, skill level and experience to create your initial talent profile.";
        }

        return;
    }

    if (title) {
        title.textContent =
            `${profile.sport} Talent Profile`;
    }

    if (description) {
        description.textContent =
            `Your KheloGram profile identifies ${profile.sport} as your primary sport with a ${profile.skill || "developing"} skill level. Add more competition history and achievements as your sports journey grows.`;
    }
}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {
    const toast =
        document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
}


/* =========================================================
   STORAGE HELPERS
   ========================================================= */

function getStorageItem(key, fallback = null) {
    try {
        const value =
            localStorage.getItem(key);

        if (value === null) {
            return fallback;
        }

        return JSON.parse(value);

    } catch (error) {
        console.warn(
            `KheloGram: unable to read ${key}`,
            error
        );

        return fallback;
    }
}


function setStorageItem(key, value) {
    try {
        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

        return true;

    } catch (error) {
        console.warn(
            `KheloGram: unable to save ${key}`,
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

function getInitials(name) {
    if (!name) return "KG";

    const parts =
        name
            .trim()
            .split(/\s+/)
            .filter(Boolean);

    if (parts.length === 1) {
        return parts[0]
            .substring(0, 2)
            .toUpperCase();
    }

    return (
        parts[0][0] +
        parts[parts.length - 1][0]
    ).toUpperCase();
}


function setText(id, value) {
    const element =
        document.getElementById(id);

    if (element) {
        element.textContent =
            value ?? "";
    }
}


function setValue(id, value) {
    const element =
        document.getElementById(id);

    if (element) {
        element.value =
            value ?? "";
    }
}


function parseDate(value) {
    if (!value) return null;

    if (value instanceof Date) {
        return new Date(value.getTime());
    }

    const parts =
        String(value).split("-");

    if (parts.length !== 3) {
        const date = new Date(value);

        return isNaN(date.getTime())
            ? null
            : date;
    }

    const date =
        new Date(
            Number(parts[0]),
            Number(parts[1]) - 1,
            Number(parts[2])
        );

    return isNaN(date.getTime())
        ? null
        : date;
}


function endOfDay(date) {
    const result =
        new Date(date.getTime());

    result.setHours(
        23,
        59,
        59,
        999
    );

    return result;
}


function formatDate(value) {
    const date =
        parseDate(value);

    if (!date) {
        return value || "Not available";
    }

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}


function escapeHTML(value) {
    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   ESC KEY - CLOSE MODALS
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {
        if (event.key !== "Escape") return;

        closeRoleSelector();
        closeAuthModal();
        closeGroundDetails();
        closeTournamentDetails();
    }
);


/* =========================================================
   CLICK OUTSIDE MODALS
   ========================================================= */

document.addEventListener(
    "click",
    event => {
        const modals = [
            {
                id: "roleModal",
                close: closeRoleSelector
            },
            {
                id: "authModal",
                close: closeAuthModal
            },
            {
                id: "groundDetailsModal",
                close: closeGroundDetails
            },
            {
                id: "tournamentDetailsModal",
                close: closeTournamentDetails
            }
        ];

        modals.forEach(modalData => {
            const modal =
                document.getElementById(
                    modalData.id
                );

            if (
                modal &&
                event.target === modal
            ) {
                modalData.close();
            }
        });
    }
);


/* =========================================================
   END OF KHELOGRAM STAGE 5
   ========================================================= */
