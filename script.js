/* =========================================================
   KHELOGRAM — STAGE 3.2
   DEMO DATA
   ========================================================= */

/* =========================
   ATHLETES
   ========================= */

const athletes = [
    {
        id: 1,
        name: "Rahul Kumar",
        sport: "Cricket",
        village: "Keshavpur",
        district: "Lucknow",
        age: 19,
        performance: 92,
        status: "Promising",
        improvement: "+18%"
    },
    {
        id: 2,
        name: "Amit Singh",
        sport: "Football",
        village: "Rampur",
        district: "Lucknow",
        age: 18,
        performance: 87,
        status: "Rising",
        improvement: "+14%"
    },
    {
        id: 3,
        name: "Priya Verma",
        sport: "Athletics",
        village: "Lakhanpur",
        district: "Barabanki",
        age: 17,
        performance: 90,
        status: "Promising",
        improvement: "+21%"
    },
    {
        id: 4,
        name: "Vikas Yadav",
        sport: "Kabaddi",
        village: "Kamalpur",
        district: "Unnao",
        age: 20,
        performance: 84,
        status: "Rising",
        improvement: "+11%"
    },
    {
        id: 5,
        name: "Neha Singh",
        sport: "Volleyball",
        village: "Sultanpur",
        district: "Sultanpur",
        age: 18,
        performance: 88,
        status: "Promising",
        improvement: "+16%"
    }
];


/* =========================
   SPORTS GROUNDS
   ========================= */

const grounds = [
    {
        id: 1,
        name: "Keshavpur Sports Ground",
        village: "Keshavpur",
        district: "Lucknow",
        sports: ["Cricket", "Football", "Volleyball"],
        status: "Active",
        utilization: 82,
        condition: "Good",
        maintenance: false
    },
    {
        id: 2,
        name: "Rampur Community Ground",
        village: "Rampur",
        district: "Lucknow",
        sports: ["Football", "Kabaddi"],
        status: "Active",
        utilization: 74,
        condition: "Good",
        maintenance: false
    },
    {
        id: 3,
        name: "Lakhanpur Rural Stadium",
        village: "Lakhanpur",
        district: "Barabanki",
        sports: ["Athletics", "Cricket"],
        status: "Maintenance",
        utilization: 41,
        condition: "Needs Repair",
        maintenance: true
    },
    {
        id: 4,
        name: "Kamalpur Sports Field",
        village: "Kamalpur",
        district: "Unnao",
        sports: ["Kabaddi", "Football"],
        status: "Active",
        utilization: 69,
        condition: "Fair",
        maintenance: false
    },
    {
        id: 5,
        name: "Sultanpur Village Ground",
        village: "Sultanpur",
        district: "Sultanpur",
        sports: ["Volleyball", "Cricket"],
        status: "Active",
        utilization: 88,
        condition: "Good",
        maintenance: false
    }
];


/* =========================
   TOURNAMENTS
   ========================= */

const tournaments = [
    {
        id: 1,
        name: "Rural Cricket Championship",
        sport: "Cricket",
        location: "Lucknow",
        date: "12 September 2026",
        registrations: 48,
        capacity: 64,
        status: "Open"
    },
    {
        id: 2,
        name: "Village Football Cup",
        sport: "Football",
        location: "Rampur",
        date: "20 September 2026",
        registrations: 36,
        capacity: 48,
        status: "Open"
    },
    {
        id: 3,
        name: "District Athletics Meet",
        sport: "Athletics",
        location: "Barabanki",
        date: "28 September 2026",
        registrations: 72,
        capacity: 100,
        status: "Open"
    },
    {
        id: 4,
        name: "Rural Kabaddi League",
        sport: "Kabaddi",
        location: "Unnao",
        date: "5 October 2026",
        registrations: 28,
        capacity: 32,
        status: "Almost Full"
    }
];


/* =========================
   COACHES
   ========================= */

const coaches = [
    {
        id: 1,
        name: "Rajesh Kumar",
        sport: "Cricket",
        village: "Keshavpur",
        athletes: 18,
        experience: "8 years"
    },
    {
        id: 2,
        name: "Sanjay Verma",
        sport: "Football",
        village: "Rampur",
        athletes: 14,
        experience: "6 years"
    },
    {
        id: 3,
        name: "Anita Sharma",
        sport: "Athletics",
        village: "Lakhanpur",
        athletes: 21,
        experience: "10 years"
    }
];


/* =========================
   TRAINING SESSIONS
   ========================= */

const trainingSessions = [
    {
        id: 1,
        sport: "Cricket",
        coach: "Rajesh Kumar",
        location: "Keshavpur Sports Ground",
        date: "14 August 2026",
        time: "5:00 PM",
        athletes: 18
    },
    {
        id: 2,
        sport: "Football",
        coach: "Sanjay Verma",
        location: "Rampur Community Ground",
        date: "15 August 2026",
        time: "6:00 PM",
        athletes: 14
    },
    {
        id: 3,
        sport: "Athletics",
        coach: "Anita Sharma",
        location: "Lakhanpur Rural Stadium",
        date: "16 August 2026",
        time: "6:30 AM",
        athletes: 21
    }
];


/* =========================
   AI TALENT SIGNALS
   ========================= */

const talentSignals = [
    {
        id: 1,
        athlete: "Rahul Kumar",
        sport: "Cricket",
        village: "Keshavpur",
        score: 92,
        signal: "Performance rising",
        recommendation: "District-level trial recommended"
    },
    {
        id: 2,
        athlete: "Priya Verma",
        sport: "Athletics",
        village: "Lakhanpur",
        score: 90,
        signal: "Consistent improvement",
        recommendation: "State talent camp recommended"
    },
    {
        id: 3,
        athlete: "Amit Singh",
        sport: "Football",
        village: "Rampur",
        score: 87,
        signal: "Strong recent form",
        recommendation: "Block-level tournament recommended"
    }
];


/* =========================
   MAINTENANCE REQUESTS
   ========================= */

const maintenanceRequests = [
    {
        id: 1,
        ground: "Lakhanpur Rural Stadium",
        village: "Lakhanpur",
        issue: "Ground surface repair",
        priority: "High",
        status: "Pending"
    },
    {
        id: 2,
        ground: "Kamalpur Sports Field",
        village: "Kamalpur",
        issue: "Floodlight replacement",
        priority: "Medium",
        status: "Pending"
    },
    {
        id: 3,
        ground: "Sultanpur Village Ground",
        village: "Sultanpur",
        issue: "Boundary repair",
        priority: "Low",
        status: "In Progress"
    }
];


/* =========================
   PLATFORM STATISTICS
   ========================= */

const platformStats = {
    sportsGrounds: grounds.length,
    athletes: athletes.length,
    tournaments: tournaments.length,
    talentSignals: talentSignals.length,

    groundUtilization: 78,
    participationGrowth: 28.4,

    activeGrounds: grounds.filter(
        ground => ground.status === "Active"
    ).length,

    maintenanceRequests: maintenanceRequests.filter(
        request => request.status === "Pending"
    ).length
};


/* =========================
   HELPER FUNCTIONS
   ========================= */

/*
   Get athlete by ID
*/
function getAthleteById(id) {
    return athletes.find(athlete => athlete.id === id);
}


/*
   Get ground by ID
*/
function getGroundById(id) {
    return grounds.find(ground => ground.id === id);
}


/*
   Get tournament by ID
*/
function getTournamentById(id) {
    return tournaments.find(
        tournament => tournament.id === id
    );
}


/*
   Get talent signal by athlete name
*/
function getTalentSignal(athleteName) {
    return talentSignals.find(
        signal => signal.athlete === athleteName
    );
}


/*
   Calculate average athlete performance
*/
function getAveragePerformance() {
    if (athletes.length === 0) {
        return 0;
    }

    const total = athletes.reduce(
        (sum, athlete) => sum + athlete.performance,
        0
    );

    return Math.round(total / athletes.length);
}


/*
   Calculate average ground utilization
*/
function getAverageGroundUtilization() {
    if (grounds.length === 0) {
        return 0;
    }

    const total = grounds.reduce(
        (sum, ground) => sum + ground.utilization,
        0
    );

    return Math.round(total / grounds.length);
}


/*
   Get active grounds
*/
function getActiveGrounds() {
    return grounds.filter(
        ground => ground.status === "Active"
    );
}


/*
   Get upcoming tournaments
*/
function getOpenTournaments() {
    return tournaments.filter(
        tournament =>
            tournament.status === "Open" ||
            tournament.status === "Almost Full"
    );
}


/* =========================================================
   END OF STAGE 3.2 DEMO DATA
   ========================================================= */


/* =====================================================
   KHELOGRAM STAGE 3
   Athlete Profile + Coach Discovery
===================================================== */


/* ================= STATE ================= */

let selectedRole = "Athlete";
let authMode = "register";

let currentUser = JSON.parse(
    localStorage.getItem("khelogramUser") || "null"
);

let connectedCoach = localStorage.getItem(
    "khelogramConnectedCoach"
);


/* ================= SAMPLE COACH DIRECTORY ================= */
/*
   These are prototype directory entries, not real statistics.
   Real coaches will come from the database in a later stage.
*/

const coaches = [
    {
        id: 1,
        name: "Coach Network",
        sport: "Cricket",
        location: "Your district",
        initials: "CN"
    },
    {
        id: 2,
        name: "Sports Coach",
        sport: "Football",
        location: "Your district",
        initials: "SC"
    },
    {
        id: 3,
        name: "Athletics Coach",
        sport: "Athletics",
        location: "Your district",
        initials: "AC"
    },
    {
        id: 4,
        name: "Kabaddi Coach",
        sport: "Kabaddi",
        location: "Your district",
        initials: "KC"
    },
    {
        id: 5,
        name: "Volleyball Coach",
        sport: "Volleyball",
        location: "Your district",
        initials: "VC"
    },
    {
        id: 6,
        name: "Hockey Coach",
        sport: "Hockey",
        location: "Your district",
        initials: "HC"
    }
];


/* ================= LANDING ================= */

function scrollToSection(id) {

    const element = document.getElementById(id);

    if (element) {
        element.scrollIntoView({
            behavior: "smooth"
        });
    }
}


/* ================= ROLE SELECTOR ================= */

function openRoleSelector() {

    document.getElementById("roleModal")
        .classList.remove("hidden");

    document.body.style.overflow = "hidden";
}


function closeRoleSelector() {

    document.getElementById("roleModal")
        .classList.add("hidden");

    document.body.style.overflow = "";
}


function selectRole(role) {

    selectedRole = role;

    closeRoleSelector();

    openAuthModal();
}


/* ================= AUTH ================= */

function openAuthModal() {

    document.getElementById("authModal")
        .classList.remove("hidden");

    document.body.style.overflow = "hidden";

    switchAuth("register");
}


function closeAuthModal() {

    document.getElementById("authModal")
        .classList.add("hidden");

    document.body.style.overflow = "";
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

    const button =
        document.getElementById("authButtonText");


    if (mode === "register") {

        registerTab.classList.add("active");
        loginTab.classList.remove("active");

        nameField.classList.remove("hidden");

        title.textContent = "Create your account";

        subtitle.textContent =
            `Join KheloGram as a ${selectedRole}.`;

        button.textContent = "Create Account";

    } else {

        registerTab.classList.remove("active");
        loginTab.classList.add("active");

        nameField.classList.add("hidden");

        title.textContent = "Welcome back";

        subtitle.textContent =
            `Login to your ${selectedRole} account.`;

        button.textContent = "Login";
    }
}


/* ================= AUTH SUBMIT ================= */

document.getElementById("authForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("authEmail")
                .value.trim();

        const password =
            document.getElementById("authPassword")
                .value.trim();

        const name =
            document.getElementById("authName")
                .value.trim();


        if (!email || !password) {

            showToast("Please complete the required fields.");

            return;
        }


        if (authMode === "register" && !name) {

            showToast("Please enter your name.");

            return;
        }


        if (authMode === "register") {

            currentUser = {
                name: name,
                email: email,
                role: selectedRole,
                profile: {}
            };

            localStorage.setItem(
                "khelogramUser",
                JSON.stringify(currentUser)
            );

        } else {

            if (!currentUser) {

                currentUser = {
                    name: email.split("@")[0],
                    email: email,
                    role: selectedRole,
                    profile: {}
                };

                localStorage.setItem(
                    "khelogramUser",
                    JSON.stringify(currentUser)
                );
            }

            currentUser.role = selectedRole;

            localStorage.setItem(
                "khelogramUser",
                JSON.stringify(currentUser)
            );
        }


        closeAuthModal();

        showDashboard();

        showToast(
            authMode === "register"
                ? "Welcome to KheloGram!"
                : "Login successful!"
        );

    });


/* ================= DASHBOARD ================= */

function showDashboard() {

    document.getElementById("landingPage")
        .classList.add("hidden");

    document.querySelector(".topbar")
        .classList.add("hidden");

    document.getElementById("dashboardPage")
        .classList.remove("hidden");

    updateDashboard();

    renderCoaches();
}


function updateDashboard() {

    if (!currentUser) return;


    const name =
        currentUser.name || "Athlete";

    const role =
        currentUser.role || "Athlete";

    const profile =
        currentUser.profile || {};


    document.getElementById("dashboardName")
        .textContent = name;

    document.getElementById("userDisplayName")
        .textContent = name;

    document.getElementById("userRole")
        .textContent = role;

    document.getElementById("userInitials")
        .textContent = getInitials(name);

    document.getElementById("dashboardSubtitle")
        .textContent =
        `${role} dashboard — manage your KheloGram ecosystem.`;


    /* Profile */

    document.getElementById("profileName")
        .value = profile.name || name;

    document.getElementById("profileAge")
        .value = profile.age || "";

    document.getElementById("profileVillage")
        .value = profile.village || "";

    document.getElementById("profileDistrict")
        .value = profile.district || "";

    document.getElementById("profileSport")
        .value = profile.sport || "";

    document.getElementById("profileSkill")
        .value = profile.skill || "";

    document.getElementById("profileAchievements")
        .value = profile.achievements || "";


    updateProfileUI();

    updateInsights();
}


/* ================= DASHBOARD SECTIONS ================= */

function showDashboardSection(section, clickedButton) {

    document.querySelectorAll(".dashboard-section")
        .forEach(element => {
            element.classList.add("hidden");
        });


    const target =
        document.getElementById(
            `section-${section}`
        );

    if (target) {
        target.classList.remove("hidden");
    }


    document.querySelectorAll(".menu-item")
        .forEach(button => {
            button.classList.remove("active");
        });


    if (clickedButton) {
        clickedButton.classList.add("active");
    }


    if (section === "coaches") {
        renderCoaches();
    }
}


/* ================= PROFILE ================= */

document.getElementById("profileForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        if (!currentUser) return;


        currentUser.profile = {

            name:
                document.getElementById("profileName")
                    .value.trim(),

            age:
                document.getElementById("profileAge")
                    .value.trim(),

            village:
                document.getElementById("profileVillage")
                    .value.trim(),

            district:
                document.getElementById("profileDistrict")
                    .value.trim(),

            sport:
                document.getElementById("profileSport")
                    .value,

            skill:
                document.getElementById("profileSkill")
                    .value,

            achievements:
                document.getElementById("profileAchievements")
                    .value.trim()
        };


        currentUser.name =
            currentUser.profile.name ||
            currentUser.name;


        localStorage.setItem(
            "khelogramUser",
            JSON.stringify(currentUser)
        );


        updateDashboard();

        showToast(
            "Sports Passport saved successfully."
        );
    });


function calculateProfileCompletion() {

    if (!currentUser) return 0;


    const profile =
        currentUser.profile || {};


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
        fields.filter(Boolean).length;


    return Math.round(
        (completed / fields.length) * 100
    );
}


function updateProfileUI() {

    const profile =
        currentUser.profile || {};


    const name =
        profile.name ||
        currentUser.name ||
        "Your Name";


    const initials =
        getInitials(name);


    document.getElementById("profileAvatar")
        .textContent = initials;

    document.getElementById("profileCardName")
        .textContent = name;

    document.getElementById("profileCardSport")
        .textContent =
        profile.sport || "Sport not selected";


    document.getElementById("passportInitials")
        .textContent = initials;

    document.getElementById("passportName")
        .textContent =
        profile.name ||
        "Complete your profile";


    const location =
        [profile.village, profile.district]
            .filter(Boolean)
            .join(", ");


    document.getElementById("passportLocation")
        .textContent =
        location ||
        "Add your village and district";


    document.getElementById("passportSport")
        .textContent =
        profile.sport ||
        "Sport not selected";


    const completion =
        calculateProfileCompletion();


    document.getElementById("profileCompletion")
        .textContent =
        `${completion}%`;


    document.getElementById("primarySport")
        .textContent =
        profile.sport || "Not set";


    document.getElementById("coachStatus")
        .textContent =
        connectedCoach
            ? "Connected"
            : "Not connected";


    document.getElementById("talentStatus")
        .textContent =
        completion >= 70
            ? "Ready"
            : "Building";
}


/* ================= COACH DIRECTORY ================= */

function renderCoaches(list = coaches) {

    const grid =
        document.getElementById("coachGrid");


    if (!grid) return;


    if (list.length === 0) {

        grid.innerHTML = `
            <div class="empty-panel">
                <div>🔎</div>
                <h3>No matching coaches</h3>
                <p>
                    Try another sport or search term.
                </p>
            </div>
        `;

        return;
    }


    grid.innerHTML =
        list.map(coach => {

            const connected =
                String(connectedCoach) ===
                String(coach.id);


            return `

                <div class="coach-card">

                    <div class="coach-avatar">
                        ${coach.initials}
                    </div>

                    <h3>${coach.name}</h3>

                    <div class="coach-sport">
                        ${coach.sport}
                    </div>

                    <div class="coach-location">
                        📍 ${coach.location}
                    </div>

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
                                onclick="connectCoach(${coach.id})">
                                Connect with Coach
                            </button>
                          `
                    }

                </div>

            `;

        }).join("");
}


function filterCoaches() {

    const search =
        document.getElementById("coachSearch")
            .value
            .toLowerCase()
            .trim();


    const sport =
        document.getElementById("coachSportFilter")
            .value;


    const filtered =
        coaches.filter(coach => {

            const matchesSearch =
                !search ||
                coach.name.toLowerCase()
                    .includes(search) ||
                coach.sport.toLowerCase()
                    .includes(search) ||
                coach.location.toLowerCase()
                    .includes(search);


            const matchesSport =
                !sport ||
                coach.sport === sport;


            return matchesSearch && matchesSport;
        });


    renderCoaches(filtered);
}


function connectCoach(id) {

    connectedCoach = String(id);


    localStorage.setItem(
        "khelogramConnectedCoach",
        connectedCoach
    );


    updateProfileUI();

    renderCoaches();

    showToast(
        "Coach connection request sent."
    );
}


/* ================= AI INSIGHTS ================= */

function updateInsights() {

    if (!currentUser) return;


    const profile =
        currentUser.profile || {};


    const sport =
        profile.sport;


    const skill =
        profile.skill;


    const location =
        [profile.village, profile.district]
            .filter(Boolean)
            .join(", ");


    document.getElementById("signalSport")
        .textContent =
        sport || "Not provided";


    document.getElementById("signalSkill")
        .textContent =
        skill || "Not provided";


    document.getElementById("signalLocation")
        .textContent =
        location || "Not provided";


    document.getElementById("signalExperience")
        .textContent =
        profile.achievements
            ? "Provided"
            : "Not provided";


    const completion =
        calculateProfileCompletion();


    const title =
        document.getElementById("insightTitle");

    const description =
        document.getElementById(
            "insightDescription"
        );

    const summary =
        document.getElementById(
            "aiSummary"
        );


    if (!sport) {

        title.textContent =
            "Build your sports passport";

        description.textContent =
            "Add your primary sport and skill level to begin your KheloGram talent profile.";

        summary.textContent =
            "Complete your sports profile to generate a personalized talent profile.";

        return;
    }


    if (completion < 70) {

        title.textContent =
            `${sport} profile in progress`;

        description.textContent =
            `Your ${sport} profile is ${completion}% complete. Add more information to improve your sports identity.`;

        summary.textContent =
            `Your ${sport} sports passport is being built.`;

        return;
    }


    title.textContent =
        `${sport} talent profile ready`;

    description.textContent =
        `Your profile contains enough information for the next stage of KheloGram's athlete intelligence system.`;

    summary.textContent =
        `Your ${sport} profile is ready for deeper performance and opportunity analysis.`;
}


/* ================= UTILITIES ================= */

function getInitials(name) {

    if (!name) return "KG";


    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map(word => word[0].toUpperCase())
        .join("");
}


function showToast(message) {

    const toast =
        document.getElementById("toast");


    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2800);
}


/* ================= LOGOUT ================= */

function logout() {

    document.getElementById("dashboardPage")
        .classList.add("hidden");

    document.getElementById("landingPage")
        .classList.remove("hidden");

    document.querySelector(".topbar")
        .classList.remove("hidden");

    showToast("Logged out of KheloGram.");
}


/* ================= EXISTING USER ================= */

if (currentUser) {

    /*
       We intentionally don't automatically open the dashboard.
       The landing page remains the public entry point.
    */

    updateDashboard();
}
