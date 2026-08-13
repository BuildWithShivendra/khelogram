/* =========================================
   KHELOGRAM STAGE 2
   AUTH + ROLE DASHBOARDS
========================================= */


/* =========================================
   GLOBAL STATE
========================================= */

let selectedRole = "athlete";


const roleNames = {

    athlete: "Athlete",

    coach: "Coach",

    panchayat: "Gram Panchayat",

    organizer: "Organizer",

    authority: "Authority"

};


const roleData = {

    athlete: {

        stats: [
            ["🏟️", "NEARBY GROUNDS", "12", "+3 available"],
            ["🏆", "TOURNAMENTS", "8", "Registration open"],
            ["📈", "PERFORMANCE", "92%", "+8% this month"],
            ["✦", "AI TALENT SCORE", "86", "Promising"]
        ],

        insightTitle:
            "Performance Signal",

        insightText:
            "Your recent performance indicates strong potential for upcoming block-level competitions."

    },


    coach: {

        stats: [
            ["🏃", "ATHLETES", "48", "+6 this month"],
            ["📅", "TRAINING SESSIONS", "24", "This month"],
            ["🏆", "TOURNAMENTS", "7", "Upcoming"],
            ["✦", "TALENT SIGNALS", "12", "AI detected"]
        ],

        insightTitle:
            "Talent Insight",

        insightText:
            "12 athletes in your network show improving performance patterns and may benefit from advanced training."

    },


    panchayat: {

        stats: [
            ["🏟️", "SPORTS GROUNDS", "12", "8 active"],
            ["🏃", "REGISTERED ATHLETES", "245", "+18 this month"],
            ["🔧", "MAINTENANCE", "3", "Requests pending"],
            ["📈", "UTILIZATION", "78%", "+12% this month"]
        ],

        insightTitle:
            "Ground Utilization",

        insightText:
            "Three grounds have low utilization. Better visibility and scheduling could increase community usage."

    },


    organizer: {

        stats: [
            ["🏆", "ACTIVE EVENTS", "8", "Currently running"],
            ["🏃", "PARTICIPANTS", "386", "+42 this month"],
            ["📋", "REGISTRATIONS", "124", "Pending review"],
            ["📈", "EVENT REACH", "72%", "+14%"]
        ],

        insightTitle:
            "Tournament Insight",

        insightText:
            "Athlete registrations are increasing. Consider adding another qualifying event at block level."

    },


    authority: {

        stats: [
            ["🏟️", "GROUNDS MAPPED", "128", "+12 this month"],
            ["🏃", "ATHLETES", "2,480", "+18.4%"],
            ["🏆", "TOURNAMENTS", "36", "Across districts"],
            ["✦", "TALENT SIGNALS", "74", "AI detected"]
        ],

        insightTitle:
            "Regional Intelligence",

        insightText:
            "Participation is rising across mapped villages. Several emerging talent clusters require further attention."

    }

};


/* =========================================
   DOM ELEMENTS
========================================= */

const roleModal =
    document.getElementById("roleModal");

const authModal =
    document.getElementById("authModal");

const landingPage =
    document.getElementById("landingPage");

const dashboardPage =
    document.getElementById("dashboardPage");


/* =========================================
   ROLE SELECTOR
========================================= */

function openRoleSelector() {

    roleModal.classList.remove("hidden");

    document.body.style.overflow = "hidden";

}


function closeRoleSelector() {

    roleModal.classList.add("hidden");

    document.body.style.overflow = "";

}


function closeRoleModalOutside(event) {

    if (event.target === roleModal) {

        closeRoleSelector();

    }

}


function selectRole(role) {

    selectedRole = role;

    closeRoleSelector();

    openAuthModal();

}


/* =========================================
   AUTH MODAL
========================================= */

function openAuthModal() {

    authModal.classList.remove("hidden");

    document.body.style.overflow = "hidden";

    updateAuthRole();

    showRegister();

}


function closeAuthModal() {

    authModal.classList.add("hidden");

    document.body.style.overflow = "";

    clearAuthMessage();

}


function updateAuthRole() {

    const roleText =
        document.getElementById("authRoleText");

    roleText.textContent =
        roleNames[selectedRole].toUpperCase();

}


/* =========================================
   REGISTER / LOGIN TABS
========================================= */

function showRegister() {

    document
        .getElementById("registerForm")
        .classList.remove("hidden");

    document
        .getElementById("loginForm")
        .classList.add("hidden");


    document
        .getElementById("registerTab")
        .classList.add("active");

    document
        .getElementById("loginTab")
        .classList.remove("active");


    document.getElementById("authTitle").textContent =
        "Create your account";

    document.getElementById("authSubtitle").textContent =
        `Join KheloGram as a ${roleNames[selectedRole]}.`;

    clearAuthMessage();

}


function showLogin() {

    document
        .getElementById("registerForm")
        .classList.add("hidden");

    document
        .getElementById("loginForm")
        .classList.remove("hidden");


    document
        .getElementById("registerTab")
        .classList.remove("active");

    document
        .getElementById("loginTab")
        .classList.add("active");


    document.getElementById("authTitle").textContent =
        "Welcome back";

    document.getElementById("authSubtitle").textContent =
        `Login to your ${roleNames[selectedRole]} dashboard.`;

    clearAuthMessage();

}


/* =========================================
   REGISTER USER
========================================= */

function registerUser(event) {

    event.preventDefault();


    const name =
        document
            .getElementById("registerName")
            .value
            .trim();


    const email =
        document
            .getElementById("registerEmail")
            .value
            .trim()
            .toLowerCase();


    const password =
        document
            .getElementById("registerPassword")
            .value;


    if (!name || !email || !password) {

        showAuthMessage(
            "Please complete all fields."
        );

        return;

    }


    const users =
        JSON.parse(
            localStorage.getItem("khelogramUsers") || "[]"
        );


    const existingUser =
        users.find(
            user =>
                user.email === email
        );


    if (existingUser) {

        showAuthMessage(
            "An account with this email already exists. Please login."
        );

        return;

    }


    const user = {

        id: Date.now(),

        name,

        email,

        password,

        role: selectedRole,

        createdAt:
            new Date().toISOString()

    };


    users.push(user);


    localStorage.setItem(
        "khelogramUsers",
        JSON.stringify(users)
    );


    localStorage.setItem(
        "khelogramCurrentUser",
        JSON.stringify(user)
    );


    closeAuthModal();

    openDashboard(user);

}


/* =========================================
   LOGIN USER
========================================= */

function loginUser(event) {

    event.preventDefault();


    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim()
            .toLowerCase();


    const password =
        document
            .getElementById("loginPassword")
            .value;


    const users =
        JSON.parse(
            localStorage.getItem("khelogramUsers") || "[]"
        );


    const user =
        users.find(
            item =>
                item.email === email &&
                item.password === password &&
                item.role === selectedRole
        );


    if (!user) {

        showAuthMessage(
            "Invalid email, password or selected role."
        );

        return;

    }


    localStorage.setItem(
        "khelogramCurrentUser",
        JSON.stringify(user)
    );


    closeAuthModal();

    openDashboard(user);

}


/* =========================================
   AUTH MESSAGE
========================================= */

function showAuthMessage(message) {

    document.getElementById(
        "authMessage"
    ).textContent = message;

}


function clearAuthMessage() {

    const message =
        document.getElementById("authMessage");

    if (message) {

        message.textContent = "";

    }

}


/* =========================================
   OPEN DASHBOARD
========================================= */

function openDashboard(user) {

    landingPage.classList.add("hidden");

    dashboardPage.classList.remove("hidden");


    document.body.style.overflow = "";


    populateDashboard(user);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   POPULATE DASHBOARD
========================================= */

function populateDashboard(user) {

    const role =
        roleNames[user.role];


    document.getElementById(
        "dashboardWelcome"
    ).textContent =
        `Welcome back, ${user.name.split(" ")[0]} 👋`;


    document.getElementById(
        "dashboardRole"
    ).textContent =
        `${role} dashboard — manage your KheloGram ecosystem.`;


    document.getElementById(
        "userNameDisplay"
    ).textContent =
        user.name;


    document.getElementById(
        "userRoleDisplay"
    ).textContent =
        role;


    const initials =
        getInitials(user.name);


    document.getElementById(
        "userAvatar"
    ).textContent =
        initials;


    document.getElementById(
        "profileAvatar"
    ).textContent =
        initials;


    document.getElementById(
        "profileName"
    ).textContent =
        user.name;


    document.getElementById(
        "profileEmail"
    ).textContent =
        user.email;


    document.getElementById(
        "profileRole"
    ).textContent =
        role;


    renderStats(user.role);

    renderActivities(user.role);

    renderInsight(user.role);

    showDashboardSection(
        "overview",
        document.querySelector(
            ".dashboard-nav-item"
        )
    );

}


/* =========================================
   STATS
========================================= */

function renderStats(role) {

    const stats =
        roleData[role].stats;


    const container =
        document.getElementById(
            "dashboardStats"
        );


    container.innerHTML = "";


    stats.forEach(stat => {

        const card =
            document.createElement("div");


        card.className =
            "dashboard-stat";


        card.innerHTML = `

            <div class="dashboard-stat-icon">
                ${stat[0]}
            </div>

            <small>
                ${stat[1]}
            </small>

            <strong>
                ${stat[2]}
            </strong>

            <em>
                ${stat[3]}
            </em>

        `;


        container.appendChild(card);

    });

}


/* =========================================
   ACTIVITIES
========================================= */

function renderActivities(role) {

    const container =
        document.getElementById(
            "activityList"
        );


    const activities = {

        athlete: [
            ["🏆", "Tournament registration opened", "2 hours ago"],
            ["📈", "Performance profile updated", "Yesterday"],
            ["🏟️", "New ground mapped nearby", "2 days ago"]
        ],

        coach: [
            ["🏃", "New athlete joined your network", "1 hour ago"],
            ["📈", "Performance update received", "Yesterday"],
            ["🏆", "Tournament opportunity available", "2 days ago"]
        ],

        panchayat: [
            ["🏟️", "Ground utilization updated", "1 hour ago"],
            ["🔧", "Maintenance request received", "Yesterday"],
            ["🏆", "New tournament scheduled", "2 days ago"]
        ],

        organizer: [
            ["🏆", "New tournament registration", "1 hour ago"],
            ["🏃", "Participant list updated", "Yesterday"],
            ["📊", "Event report generated", "2 days ago"]
        ],

        authority: [
            ["✦", "New talent cluster detected", "1 hour ago"],
            ["🏟️", "Ground mapping expanded", "Yesterday"],
            ["📈", "Participation trend updated", "2 days ago"]
        ]

    };


    container.innerHTML = "";


    activities[role].forEach(item => {

        const activity =
            document.createElement("div");


        activity.className =
            "activity-item";


        activity.innerHTML = `

            <div class="activity-icon">
                ${item[0]}
            </div>

            <div>
                <strong>${item[1]}</strong>
                <small>${item[2]}</small>
            </div>

        `;


        container.appendChild(activity);

    });

}


/* =========================================
   AI INSIGHT
========================================= */

function renderInsight(role) {

    const data =
        roleData[role];


    document.getElementById(
        "insightTitle"
    ).textContent =
        data.insightTitle;


    document.getElementById(
        "insightText"
    ).textContent =
        data.insightText;

}


/* =========================================
   DASHBOARD NAVIGATION
========================================= */

function showDashboardSection(
    section,
    clickedButton
) {

    const sections = {

        overview:
            "dashboardOverview",

        profile:
            "dashboardProfile",

        grounds:
            "dashboardGrounds",

        events:
            "dashboardEvents",

        insights:
            "dashboardInsights"

    };


    Object.values(sections).forEach(id => {

        document
            .getElementById(id)
            .classList.add("hidden");

    });


    document
        .getElementById(
            sections[section]
        )
        .classList.remove("hidden");


    document
        .querySelectorAll(
            ".dashboard-nav-item"
        )
        .forEach(button => {

            button.classList.remove("active");

        });


    if (clickedButton) {

        clickedButton.classList.add("active");

    }

}


/* =========================================
   LOGOUT
========================================= */

function logoutUser() {

    localStorage.removeItem(
        "khelogramCurrentUser"
    );


    dashboardPage.classList.add("hidden");

    landingPage.classList.remove("hidden");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   LANDING
========================================= */

function showLanding() {

    dashboardPage.classList.add("hidden");

    landingPage.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function scrollToSection(id) {

    document
        .getElementById(id)
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================
   UTILITIES
========================================= */

function getInitials(name) {

    const parts =
        name
            .trim()
            .split(" ")
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


/* =========================================
   CHECK EXISTING SESSION
========================================= */

function checkExistingSession() {

    const savedUser =
        localStorage.getItem(
            "khelogramCurrentUser"
        );


    if (!savedUser) {

        return;

    }


    try {

        const user =
            JSON.parse(savedUser);


        if (user && user.role) {

            openDashboard(user);

        }

    } catch (error) {

        localStorage.removeItem(
            "khelogramCurrentUser"
        );

    }

}


/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key !== "Escape") {

            return;

        }


        closeRoleSelector();

        closeAuthModal();

    }
);


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        checkExistingSession();

    }
);
