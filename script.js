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
