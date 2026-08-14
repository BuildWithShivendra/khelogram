/* =========================================================
   KHELOGRAM
   STAGE 6
   COMMUNITY + ACHIEVEMENTS

   Beginner-friendly JavaScript

   Features:
   - Authentication
   - Profile
   - Coaches
   - Grounds
   - Tournaments
   - Community
   - Achievements
   - AI prototype insights
   - LocalStorage
   ========================================================= */


/* =========================================================
   GLOBAL VARIABLES
   ========================================================= */

let selectedRole = "Athlete";

let authMode = "register";

let toastTimer = null;


/* =========================================================
   STORAGE KEYS
   ========================================================= */

const STORAGE_KEYS = {

    USER:
        "khelogramUser",

    PROFILE:
        "khelogramProfile",

    COACH:
        "khelogramCoach",

    TOURNAMENTS:
        "khelogramTournamentRegistrations",

    POSTS:
        "khelogramCommunityPosts",

    LIKES:
        "khelogramCommunityLikes",

    ACHIEVEMENTS:
        "khelogramAchievements"

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
   DEMO GROUND DATA
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
   DEMO TOURNAMENT DATA
   ========================================================= */

const tournaments = [

    {
        id: "T001",
        name: "KheloGram Rural Cricket Cup",
        sport: "Cricket",
        district: "Lucknow",
        village: "Mohanlalganj",
        startDate: "2026-09-05",
        registrationDeadline: "2026-08-30",
        participants: 64,
        capacity: 80,
        category: "U-19",
        entryFee: "Free",
        icon: "🏏",
        description:
            "A village-level cricket competition connecting young rural players with local sporting opportunities."
    },

    {
        id: "T002",
        name: "Awadh Grassroots Football League",
        sport: "Football",
        district: "Barabanki",
        village: "Nawabganj",
        startDate: "2026-09-12",
        registrationDeadline: "2026-09-05",
        participants: 48,
        capacity: 64,
        category: "Open",
        entryFee: "Free",
        icon: "⚽",
        description:
            "A grassroots football tournament designed to give village teams structured competitive experience."
    },

    {
        id: "T003",
        name: "Ayodhya Rural Kabaddi Championship",
        sport: "Kabaddi",
        district: "Ayodhya",
        village: "Sohawal",
        startDate: "2026-09-20",
        registrationDeadline: "2026-09-14",
        participants: 40,
        capacity: 48,
        category: "Open",
        entryFee: "₹100",
        icon: "🤼",
        description:
            "Competitive kabaddi for village athletes with an opportunity to be noticed by district-level coaches."
    },

    {
        id: "T004",
        name: "KheloGram Athletics Talent Meet",
        sport: "Athletics",
        district: "Kanpur",
        village: "Bilhaur",
        startDate: "2026-09-27",
        registrationDeadline: "2026-09-20",
        participants: 55,
        capacity: 100,
        category: "U-17",
        entryFee: "Free",
        icon: "🏃",
        description:
            "Track and field events designed to identify promising young athletes from rural communities."
    },

    {
        id: "T005",
        name: "Unnao Rural Hockey Challenge",
        sport: "Hockey",
        district: "Unnao",
        village: "Safipur",
        startDate: "2026-10-03",
        registrationDeadline: "2026-09-25",
        participants: 70,
        capacity: 80,
        category: "Open",
        entryFee: "₹150",
        icon: "🏑",
        description:
            "A competitive rural hockey event focused on team development and district-level talent discovery."
    },

    {
        id: "T006",
        name: "Barabanki Village Volleyball Open",
        sport: "Volleyball",
        district: "Barabanki",
        village: "Fatehpur",
        startDate: "2026-10-10",
        registrationDeadline: "2026-10-03",
        participants: 30,
        capacity: 48,
        category: "Open",
        entryFee: "Free",
        icon: "🏐",
        description:
            "An open volleyball competition bringing village teams together for organized competition."
    }

];



/* =========================================================
   STAGE 6 — ACHIEVEMENTS
   ========================================================= */

const achievementDefinitions = [

    {
        id: "profile",
        title: "Sports Identity",
        description:
            "Complete your Sports Passport.",
        icon: "🪪",
        target: 100
    },

    {
        id: "post",
        title: "Community Voice",
        description:
            "Publish your first community post.",
        icon: "💬",
        target: 1
    },

    {
        id: "like",
        title: "Community Supporter",
        description:
            "Like 5 community posts.",
        icon: "❤️",
        target: 5
    },

    {
        id: "coach",
        title: "Coach Connection",
        description:
            "Connect with a coach.",
        icon: "🧑‍🏫",
        target: 1
    },

    {
        id: "tournament",
        title: "First Competition",
        description:
            "Register for your first tournament.",
        icon: "🏆",
        target: 1
    },

    {
        id: "posts5",
        title: "Sports Storyteller",
        description:
            "Publish 5 community posts.",
        icon: "📣",
        target: 5
    }

];



/* =========================================================
   START APPLICATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeApplication
);


function initializeApplication() {

    setupAuthForm();

    setupProfileForm();

    setupPostForm();

    renderCoaches();

    renderGrounds();

    renderTournaments();

    renderCommunityFeed();

    updateDashboardData();

    updateInsights();

    renderAchievements();

    loadStoredUser();

}



/* =========================================================
   LANDING PAGE
   ========================================================= */

function scrollToSection(id) {

    const element =
        document.getElementById(id);

    if (!element) {
        return;
    }

    element.scrollIntoView({
        behavior: "smooth"
    });

}



/* =========================================================
   ROLE SELECTOR
   ========================================================= */

function openRoleSelector() {

    const modal =
        document.getElementById("roleModal");

    if (modal) {
        modal.classList.remove("hidden");
    }

}


function closeRoleSelector() {

    const modal =
        document.getElementById("roleModal");

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
   AUTH
   ========================================================= */

function openAuthModal() {

    const modal =
        document.getElementById("authModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("hidden");

    switchAuth("register");

}


function closeAuthModal() {

    document
        .getElementById("authModal")
        ?.classList.add("hidden");

}


function switchAuth(mode) {

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

    const buttonText =
        document.getElementById("authButtonText");


    registerTab?.classList.toggle(
        "active",
        mode === "register"
    );


    loginTab?.classList.toggle(
        "active",
        mode === "login"
    );


    if (mode === "register") {

        if (nameField) {
            nameField.style.display = "block";
        }

        if (title) {
            title.textContent =
                "Create your account";
        }

        if (subtitle) {
            subtitle.textContent =
                "Join the KheloGram ecosystem.";
        }

        if (buttonText) {
            buttonText.textContent =
                "Create Account";
        }

        return;
    }


    if (nameField) {
        nameField.style.display = "none";
    }

    if (title) {
        title.textContent =
            "Welcome back";
    }

    if (subtitle) {
        subtitle.textContent =
            "Login to your KheloGram dashboard.";
    }

    if (buttonText) {
        buttonText.textContent =
            "Login";
    }

}


function setupAuthForm() {

    const form =
        document.getElementById("authForm");

    if (!form) {
        return;
    }

    form.addEventListener(
        "submit",
        handleAuthSubmit
    );

}


function handleAuthSubmit(event) {

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


    if (!email || !password) {

        showToast(
            "Please enter email and password."
        );

        return;
    }


    const user = {

        name:
            name ||
            "KheloGram Athlete",

        email,

        role:
            selectedRole,

        createdAt:
            new Date().toISOString()

    };


    saveUser(user);

    closeAuthModal();

    showDashboard();

    showToast(
        authMode === "register"
            ? "Account created successfully!"
            : "Welcome back!"
    );

}



/* =========================================================
   USER
   ========================================================= */

function saveUser(user) {

    setStorageItem(
        STORAGE_KEYS.USER,
        user
    );

}


function getStoredUser() {

    return getStorageItem(
        STORAGE_KEYS.USER,
        null
    );

}


function loadStoredUser() {

    const user =
        getStoredUser();

    if (!user) {
        return;
    }

    updateUserUI(user);

}


function updateUserUI(user) {

    const name =
        user.name ||
        "User";

    const firstName =
        name
            .split(/\s+/)[0];


    const initials =
        getInitials(name);


    setText(
        "dashboardName",
        firstName
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

}



/* =========================================================
   DASHBOARD
   ========================================================= */

function showDashboard() {

    document
        .getElementById("landingPage")
        ?.classList.add("hidden");


    document
        .getElementById("dashboardPage")
        ?.classList.remove("hidden");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    const user =
        getStoredUser();


    if (user) {
        updateUserUI(user);
    }


    updateDashboardData();

    updateInsights();

    renderAchievements();

    renderCommunityFeed();

}


function logout() {

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

}


function showDashboardSection(
    sectionName,
    button = null
) {

    document
        .querySelectorAll(".dashboard-section")
        .forEach(section => {

            section.classList.add(
                "hidden"
            );

        });


    const target =
        document.getElementById(
            `section-${sectionName}`
        );


    if (target) {

        target.classList.remove(
            "hidden"
        );

    }


    document
        .querySelectorAll(".menu-item")
        .forEach(item => {

            item.classList.remove(
                "active"
            );

        });


    if (button) {

        button.classList.add(
            "active"
        );

    } else {

        const matchingButton =
            document.querySelector(
                `.menu-item[onclick*="'${sectionName}'"]`
            );

        matchingButton?.classList.add(
            "active"
        );

    }


    if (sectionName === "community") {
        renderCommunityFeed();
    }


    if (sectionName === "achievements") {
        renderAchievements();
    }


    if (sectionName === "insights") {
        updateInsights();
    }


    if (sectionName === "overview") {
        updateDashboardData();
    }

}



/* =========================================================
   PROFILE
   ========================================================= */

function setupProfileForm() {

    const form =
        document.getElementById(
            "profileForm"
        );

    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        handleProfileSubmit
    );

}


function handleProfileSubmit(event) {

    event.preventDefault();


    const profile = {

        name:
            getValue("profileName"),

        age:
            getValue("profileAge"),

        village:
            getValue("profileVillage"),

        district:
            getValue("profileDistrict"),

        sport:
            getValue("profileSport"),

        skill:
            getValue("profileSkill"),

        achievements:
            getValue("profileAchievements")

    };


    setStorageItem(
        STORAGE_KEYS.PROFILE,
        profile
    );


    const user =
        getStoredUser();


    if (user && profile.name) {

        user.name =
            profile.name;

        saveUser(user);

        updateUserUI(user);

    }


    checkAchievements();

    updateDashboardData();

    updateInsights();

    showToast(
        "Sports Passport saved successfully!"
    );

}


function getStoredProfile() {

    return getStorageItem(
        STORAGE_KEYS.PROFILE,
        null
    );

}


function loadProfileIntoForm() {

    const profile =
        getStoredProfile();

    if (!profile) {
        return;
    }


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


function updateDashboardData() {

    const profile =
        getStoredProfile();

    const user =
        getStoredUser();


    const completion =
        calculateProfileCompletion(
            profile
        );


    setText(
        "profileCompletion",
        `${completion}%`
    );


    setText(
        "primarySport",
        profile?.sport ||
        "Not set"
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


    const coach =
        localStorage.getItem(
            STORAGE_KEYS.COACH
        );


    setText(
        "coachStatus",
        coach
            ? "Connected"
            : "Not connected"
    );


    const achievements =
        getUnlockedAchievements();


    setText(
        "achievementCount",
        achievements.length
    );


    const aiSummary =
        document.getElementById(
            "aiSummary"
        );


    if (aiSummary) {

        if (profile?.sport) {

            aiSummary.textContent =
                `Your profile currently shows ${profile.sport} as your primary sport at ${profile.skill || "developing"} level. Continue adding achievements, tournament participation and community activity to build your sports profile.`;

        } else {

            aiSummary.textContent =
                "Complete your sports profile to generate a personalized talent profile.";

        }

    }


    loadProfileIntoForm();

}


function calculateProfileCompletion(
    profile
) {

    if (!profile) {
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
        fields.filter(
            value =>
                value !== undefined &&
                value !== null &&
                String(value).trim() !== ""
        ).length;


    return Math.round(
        (
            completed /
            fields.length
        ) * 100
    );

}



/* =========================================================
   COACHES
   ========================================================= */

function renderCoaches(
    list = coaches
) {

    const grid =
        document.getElementById(
            "coachGrid"
        );

    if (!grid) {
        return;
    }


    if (!list.length) {

        grid.innerHTML = `
            <div class="panel">
                <h3>No coaches found</h3>
                <p>
                    Try another search.
                </p>
            </div>
        `;

        return;
    }


    grid.innerHTML =
        list
            .map(createCoachCard)
            .join("");

}


function createCoachCard(
    coach
) {

    const connected =
        localStorage.getItem(
            STORAGE_KEYS.COACH
        ) === String(coach.id);


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
                Experience:
                ${escapeHTML(coach.experience)}
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

}


function filterCoaches() {

    const search =
        getValue("coachSearch")
            .toLowerCase();


    const sport =
        getValue(
            "coachSportFilter"
        );


    const filtered =
        coaches.filter(
            coach => {

                const text =
                    `${coach.name} ${coach.sport} ${coach.location}`
                        .toLowerCase();


                return (

                    (!search ||
                        text.includes(search))

                    &&

                    (!sport ||
                        coach.sport === sport)

                );

            }
        );


    renderCoaches(filtered);

}


function connectCoach(id) {

    const coach =
        coaches.find(
            item => item.id === id
        );


    if (!coach) {
        return;
    }


    localStorage.setItem(
        STORAGE_KEYS.COACH,
        String(id)
    );


    checkAchievements();

    updateDashboardData();

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
) {

    const grid =
        document.getElementById(
            "groundGrid"
        );


    if (!grid) {
        return;
    }


    grid.innerHTML =
        list
            .map(createGroundCard)
            .join("");


}


function createGroundCard(
    ground
) {

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
                📍
                ${escapeHTML(ground.village)},
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

        </div>

    `;

}


function filterGrounds() {

    const search =
        getValue("groundSearch")
            .toLowerCase();


    const district =
        getValue(
            "groundDistrictFilter"
        );


    const sport =
        getValue(
            "groundSportFilter"
        );


    const filtered =
        grounds.filter(
            ground => {

                const text =
                    `${ground.name} ${ground.village} ${ground.district} ${ground.sport}`
                        .toLowerCase();


                return (

                    (!search ||
                        text.includes(search))

                    &&

                    (!district ||
                        ground.district === district)

                    &&

                    (!sport ||
                        ground.sport === sport)

                );

            }
        );


    renderGrounds(filtered);

}



/* =========================================================
   TOURNAMENTS
   ========================================================= */

function renderTournaments() {

    const grid =
        document.getElementById(
            "tournamentGrid"
        );


    if (!grid) {
        return;
    }


    const search =
        getValue(
            "tournamentSearch"
        ).toLowerCase();


    const sport =
        getValue(
            "tournamentSportFilter"
        );


    const district =
        getValue(
            "tournamentDistrictFilter"
        );


    const filtered =
        tournaments.filter(
            tournament => {

                const text =
                    `${tournament.name} ${tournament.sport} ${tournament.district} ${tournament.village}`
                        .toLowerCase();


                return (

                    (!search ||
                        text.includes(search))

                    &&

                    (!sport ||
                        tournament.sport === sport)

                    &&

                    (!district ||
                        tournament.district === district)

                );

            }
        );


    if (!filtered.length) {

        grid.innerHTML = `

            <div class="panel">

                <h3>
                    No tournaments found
                </h3>

                <p>
                    Try another search or filter.
                </p>

            </div>

        `;

        return;
    }


    grid.innerHTML =
        filtered
            .map(
                createTournamentCard
            )
            .join("");

}


function createTournamentCard(
    tournament
) {

    const registered =
        isTournamentRegistered(
            tournament.id
        );


    const full =
        tournament.participants >=
        tournament.capacity;


    return `

        <article class="tournament-card">

            <div class="tournament-card-top">

                <div class="tournament-icon">
                    ${tournament.icon}
                </div>

                <span
                    class="tournament-status ${
                        full
                            ? "full"
                            : "open"
                    }"
                >
                    ${
                        full
                            ? "FULL"
                            : "OPEN"
                    }
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


            <div class="tournament-meta">

                <div>
                    <small>DATE</small>
                    <strong>
                        ${formatDate(
                            tournament.startDate
                        )}
                    </strong>
                </div>

                <div>
                    <small>CATEGORY</small>
                    <strong>
                        ${escapeHTML(
                            tournament.category
                        )}
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
                    <small>PARTICIPANTS</small>
                    <strong>
                        ${tournament.participants}
                        /
                        ${tournament.capacity}
                    </strong>
                </div>

            </div>


            <p class="tournament-description">
                ${escapeHTML(
                    tournament.description
                )}
            </p>


            <div class="tournament-actions">

                ${
                    registered

                    ? `
                        <button
                            class="secondary-btn"
                            onclick="cancelTournament('${tournament.id}')"
                        >
                            ✓ Registered
                        </button>
                    `

                    : `
                        <button
                            class="primary-btn"
                            ${
                                full
                                    ? "disabled"
                                    : ""
                            }
                            onclick="registerTournament('${tournament.id}')"
                        >
                            ${
                                full
                                    ? "Full"
                                    : "Register →"
                            }
                        </button>
                    `
                }

            </div>

        </article>

    `;

}


function registerTournament(id) {

    const tournament =
        tournaments.find(
            item => item.id === id
        );


    if (!tournament) {
        return;
    }


    if (!getStoredUser()) {

        showToast(
            "Please create an account first."
        );

        openRoleSelector();

        return;
    }


    if (isTournamentRegistered(id)) {

        showToast(
            "You are already registered."
        );

        return;
    }


    const registrations =
        getStorageItem(
            STORAGE_KEYS.TOURNAMENTS,
            []
        );


    registrations.push({
        tournamentId: id,
        registeredAt:
            new Date().toISOString()
    });


    setStorageItem(
        STORAGE_KEYS.TOURNAMENTS,
        registrations
    );


    checkAchievements();

    renderTournaments();


    showToast(
        `Registered for ${tournament.name}!`
    );

}


function cancelTournament(id) {

    const registrations =
        getStorageItem(
            STORAGE_KEYS.TOURNAMENTS,
            []
        );


    const updated =
        registrations.filter(
            item =>
                item.tournamentId !== id
        );


    setStorageItem(
        STORAGE_KEYS.TOURNAMENTS,
        updated
    );


    renderTournaments();


    showToast(
        "Tournament registration cancelled."
    );

}


function isTournamentRegistered(id) {

    const registrations =
        getStorageItem(
            STORAGE_KEYS.TOURNAMENTS,
            []
        );


    return registrations.some(
        item =>
            item.tournamentId === id
    );

}



/* =========================================================
   STAGE 6 — COMMUNITY POSTS
   ========================================================= */

function setupPostForm() {

    const form =
        document.getElementById(
            "postForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        createCommunityPost
    );

}


function createCommunityPost(event) {

    event.preventDefault();


    const user =
        getStoredUser();


    if (!user) {

        showToast(
            "Please create an account first."
        );

        openRoleSelector();

        return;
    }


    const title =
        getValue("postTitle");


    const content =
        getValue("postContent");


    const sport =
        getValue("postSport");


    const type =
        getValue("postType");


    if (!title || !content) {

        showToast(
            "Please fill in the post title and content."
        );

        return;
    }


    const posts =
        getStorageItem(
            STORAGE_KEYS.POSTS,
            []
        );


    const profile =
        getStoredProfile();


    const post = {

        id:
            Date.now(),

        user:
            user.name ||
            "KheloGram Athlete",

        role:
            user.role ||
            "Athlete",

        village:
            profile?.village ||
            "Rural India",

        title,

        content,

        sport,

        type,

        likes: 0,

        createdAt:
            new Date().toISOString()

    };


    posts.unshift(post);


    setStorageItem(
        STORAGE_KEYS.POSTS,
        posts
    );


    event.target.reset();


    renderCommunityFeed();

    checkAchievements();


    showToast(
        "Your community post was published!"
    );

}


function getDefaultCommunityPosts() {

    return [

        {

            id: "demo1",

            user: "Rahul Verma",

            role: "Athlete",

            village: "Mohanlalganj",

            title:
                "Won my first village cricket final!",

            content:
                "Our team worked hard for three months and finally won the local cricket final. The KheloGram community kept us motivated.",

            sport:
                "Cricket",

            type:
                "achievement",

            likes:
                14,

            createdAt:
                new Date(
                    Date.now() -
                    86400000
                ).toISOString()

        },


        {

            id: "demo2",

            user: "Priya Sharma",

            role: "Coach",

            village: "Kanpur",

            title:
                "New athletics training group",

            content:
                "We started a new training group for young athletes from nearby villages. Consistency is the first step toward improvement.",

            sport:
                "Athletics",

            type:
                "training",

            likes:
                9,

            createdAt:
                new Date(
                    Date.now() -
                    172800000
                ).toISOString()

        },


        {

            id: "demo3",

            user: "Amit Singh",

            role: "Organizer",

            village: "Barabanki",

            title:
                "Football tournament registration is open",

            content:
                "Village teams can now register for the upcoming Awadh Grassroots Football League.",

            sport:
                "Football",

            type:
                "tournament",

            likes:
                7,

            createdAt:
                new Date(
                    Date.now() -
                    259200000
                ).toISOString()

        }

    ];

}


function renderCommunityFeed() {

    const feed =
        document.getElementById(
            "communityFeed"
        );


    if (!feed) {
        return;
    }


    let posts =
        getStorageItem(
            STORAGE_KEYS.POSTS,
            null
        );


    if (!posts) {

        posts =
            getDefaultCommunityPosts();


        setStorageItem(
            STORAGE_KEYS.POSTS,
            posts
        );

    }


    const likes =
        getStorageItem(
            STORAGE_KEYS.LIKES,
            []
        );


    const totalLikes =
        posts.reduce(
            (total, post) =>
                total +
                Number(post.likes || 0),
            0
        );


    setText(
        "communityPostCount",
        posts.length
    );


    setText(
        "communityLikeCount",
        totalLikes
    );


    if (!posts.length) {

        feed.innerHTML = `

            <div class="panel">

                <h3>
                    No community posts yet
                </h3>

                <p>
                    Be the first person to share
                    a sports story.
                </p>

            </div>

        `;

        return;
    }


    feed.innerHTML =
        posts
            .map(
                post =>
                    createCommunityPostCard(
                        post,
                        likes
                    )
            )
            .join("");

}


function createCommunityPostCard(
    post,
    likes
) {

    const liked =
        likes.includes(
            String(post.id)
        );


    const typeLabel =
        getPostTypeLabel(
            post.type
        );


    return `

        <article class="community-post">

            <div class="post-header">

                <div class="post-user">

                    <div class="post-avatar">
                        ${getInitials(
                            post.user
                        )}
                    </div>

                    <div>

                        <strong>
                            ${escapeHTML(
                                post.user
                            )}
                        </strong>

                        <small>
                            ${escapeHTML(
                                post.role
                            )}
                            ·
                            ${escapeHTML(
                                post.village
                            )}
                        </small>

                    </div>

                </div>


                <span class="post-type">
                    ${typeLabel}
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


            <span class="post-sport">
                🏅
                ${escapeHTML(
                    post.sport
                )}
            </span>


            <div class="post-actions">

                <button
                    class="like-btn ${
                        liked
                            ? "liked"
                            : ""
                    }"
                    onclick="togglePostLike('${post.id}')"
                >
                    ${
                        liked
                            ? "❤️"
                            : "♡"
                    }
                    ${post.likes || 0}
                    Likes
                </button>

                <small>
                    ${formatTimeAgo(
                        post.createdAt
                    )}
                </small>

            </div>

        </article>

    `;

}


function togglePostLike(id) {

    const posts =
        getStorageItem(
            STORAGE_KEYS.POSTS,
            []
        );


    const post =
        posts.find(
            item =>
                String(item.id) ===
                String(id)
        );


    if (!post) {
        return;
    }


    const likes =
        getStorageItem(
            STORAGE_KEYS.LIKES,
            []
        );


    const idString =
        String(id);


    const alreadyLiked =
        likes.includes(
            idString
        );


    if (alreadyLiked) {

        post.likes =
            Math.max(
                0,
                Number(post.likes || 0) - 1
            );


        const index =
            likes.indexOf(
                idString
            );


        likes.splice(
            index,
            1
        );

    } else {

        post.likes =
            Number(post.likes || 0) + 1;


        likes.push(
            idString
        );

    }


    setStorageItem(
        STORAGE_KEYS.POSTS,
        posts
    );


    setStorageItem(
        STORAGE_KEYS.LIKES,
        likes
    );


    checkAchievements();

    renderCommunityFeed();

}


function getPostTypeLabel(type) {

    const labels = {

        achievement:
            "🏆 Achievement",

        tournament:
            "🏆 Tournament",

        training:
            "💪 Training",

        community:
            "🤝 Community"

    };


    return (
        labels[type] ||
        "Community"
    );

}



/* =========================================================
   STAGE 6 — ACHIEVEMENTS
   ========================================================= */

function renderAchievements() {

    const grid =
        document.getElementById(
            "achievementGrid"
        );


    if (!grid) {
        return;
    }


    const progressData =
        getAchievementProgress();


    const unlocked =
        progressData.filter(
            item =>
                item.current >=
                item.target
        );


    setText(
        "unlockedAchievementCount",
        unlocked.length
    );


    setText(
        "achievementScore",
        unlocked.length * 100
    );


    const next =
        progressData.find(
            item =>
                item.current <
                item.target
        );


    setText(
        "nextAchievement",
        next
            ? next.title
            : "All Unlocked!"
    );


    grid.innerHTML =
        progressData
            .map(
                createAchievementCard
            )
            .join("");


    renderEarnedAchievements();

}


function getAchievementProgress() {

    const profile =
        getStoredProfile();


    const posts =
        getStorageItem(
            STORAGE_KEYS.POSTS,
            []
        );


    const userPosts =
        getUserPosts(
            posts
        );


    const likes =
        getStorageItem(
            STORAGE_KEYS.LIKES,
            []
        );


    const tournamentRegistrations =
        getStorageItem(
            STORAGE_KEYS.TOURNAMENTS,
            []
        );


    const coachConnected =
        localStorage.getItem(
            STORAGE_KEYS.COACH
        );


    const profileCompletion =
        calculateProfileCompletion(
            profile
        );


    return achievementDefinitions.map(
        achievement => {

            let current = 0;


            if (
                achievement.id ===
                "profile"
            ) {

                current =
                    profileCompletion;

            }


            if (
                achievement.id ===
                "post"
            ) {

                current =
                    userPosts.length;

            }


            if (
                achievement.id ===
                "like"
            ) {

                current =
                    likes.length;

            }


            if (
                achievement.id ===
                "coach"
            ) {

                current =
                    coachConnected
                        ? 1
                        : 0;

            }


            if (
                achievement.id ===
                "tournament"
            ) {

                current =
                    tournamentRegistrations.length;

            }


            if (
                achievement.id ===
                "posts5"
            ) {

                current =
                    userPosts.length;

            }


            return {

                ...achievement,

                current

            };

        }
    );

}


function createAchievementCard(
    achievement
) {

    const unlocked =
        achievement.current >=
        achievement.target;


    const percentage =
        Math.min(
            100,
            Math.round(
                (
                    achievement.current /
                    achievement.target
                ) * 100
            )
        );


    return `

        <div
            class="achievement-card ${
                unlocked
                    ? "unlocked"
                    : ""
            }"
        >

            <div class="achievement-card-header">

                <div class="achievement-icon">

                    ${
                        unlocked
                            ? "🏆"
                            : achievement.icon
                    }

                </div>


                <div>

                    <h4>
                        ${escapeHTML(
                            achievement.title
                        )}
                    </h4>

                    ${
                        unlocked
                            ? `
                                <span class="badge">
                                    Unlocked
                                </span>
                            `
                            : ""
                    }

                </div>

            </div>


            <p>
                ${escapeHTML(
                    achievement.description
                )}
            </p>


            <div class="progress-label">

                <span>
                    Progress
                </span>

                <strong>
                    ${
                        Math.min(
                            achievement.current,
                            achievement.target
                        )
                    }
                    /
                    ${achievement.target}
                </strong>

            </div>


            <div class="progress-track">

                <div
                    class="progress-fill"
                    style="width:${percentage}%"
                ></div>

            </div>

        </div>

    `;

}


function renderEarnedAchievements() {

    const container =
        document.getElementById(
            "earnedAchievements"
        );


    if (!container) {
        return;
    }


    const unlocked =
        getAchievementProgress()
            .filter(
                item =>
                    item.current >=
                    item.target
            );


    if (!unlocked.length) {

        container.innerHTML = `

            <p class="section-description">
                No achievements unlocked yet.
                Start participating!
            </p>

        `;

        return;
    }


    container.innerHTML =
        unlocked
            .map(
                achievement => `

                    <div class="earned-badge">

                        ${achievement.icon}

                        ${escapeHTML(
                            achievement.title
                        )}

                    </div>

                `
            )
            .join("");

}


function getUnlockedAchievements() {

    return getAchievementProgress()
        .filter(
            achievement =>
                achievement.current >=
                achievement.target
        );

}


function checkAchievements() {

    renderAchievements();

    updateDashboardData();

}



/* =========================================================
   USER POSTS
   ========================================================= */

function getUserPosts(posts) {

    const user =
        getStoredUser();


    if (!user) {
        return [];
    }


    return posts.filter(
        post =>
            post.user ===
            user.name
    );

}



/* =========================================================
   AI INSIGHTS
   ========================================================= */

function updateInsights() {

    const profile =
        getStoredProfile();


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


    if (!profile?.sport) {

        setText(
            "insightTitle",
            "Build your sports passport"
        );


        setText(
            "insightDescription",
            "Add your sport, skill level and experience to create your initial talent profile."
        );


        return;
    }


    setText(
        "insightTitle",
        `${profile.sport} Talent Profile`
    );


    setText(
        "insightDescription",

        `Your KheloGram profile identifies ${profile.sport} as your primary sport with a ${profile.skill || "developing"} skill level. Add more competition history and achievements as your sports journey grows.`
    );

}



/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) {
        return;
    }


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
   STORAGE HELPERS
   ========================================================= */

function getStorageItem(
    key,
    fallback
) {

    try {

        const value =
            localStorage.getItem(
                key
            );


        if (value === null) {
            return fallback;
        }


        return JSON.parse(
            value
        );

    }

    catch (error) {

        console.warn(
            "KheloGram storage error:",
            error
        );


        return fallback;

    }

}


function setStorageItem(
    key,
    value
) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );


        return true;

    }

    catch (error) {

        console.warn(
            "KheloGram save error:",
            error
        );


        showToast(
            "Unable to save data on this device."
        );


        return false;

    }

}



/* =========================================================
   SMALL HELPERS
   ========================================================= */

function getValue(id) {

    return (
        document
            .getElementById(id)
            ?.value
            .trim() || ""
    );

}


function setValue(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.value =
            value || "";

    }

}


function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value ?? "";

    }

}


function getInitials(name) {

    if (!name) {
        return "KG";
    }


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

        parts[
            parts.length - 1
        ][0]

    ).toUpperCase();

}


function formatDate(value) {

    if (!value) {
        return "Not available";
    }


    const date =
        new Date(
            `${value}T00:00:00`
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return value;

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


function formatTimeAgo(
    value
) {

    const date =
        new Date(value);


    const now =
        new Date();


    const difference =
        now - date;


    const minutes =
        Math.floor(
            difference /
            60000
        );


    if (minutes < 1) {
        return "Just now";
    }


    if (minutes < 60) {

        return `${minutes} min ago`;

    }


    const hours =
        Math.floor(
            minutes / 60
        );


    if (hours < 24) {

        return `${hours} hr ago`;

    }


    const days =
        Math.floor(
            hours / 24
        );


    return `${days} day${
        days === 1
            ? ""
            : "s"
    } ago`;

}


function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

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
   ESC KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !==
            "Escape"
        ) {

            return;

        }


        closeRoleSelector();

        closeAuthModal();

    }
);



/* =========================================================
   CLICK OUTSIDE MODALS
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        const roleModal =
            document.getElementById(
                "roleModal"
            );


        const authModal =
            document.getElementById(
                "authModal"
            );


        if (
            roleModal &&
            event.target === roleModal
        ) {

            closeRoleSelector();

        }


        if (
            authModal &&
            event.target === authModal
        ) {

            closeAuthModal();

        }

    }
);


/* =========================================================
   END OF STAGE 6
   ========================================================= */
