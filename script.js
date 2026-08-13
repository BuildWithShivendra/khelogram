/* =========================================================
   KHELOGRAM - STAGE 3.3
   Clean JavaScript
   ========================================================= */


/* =========================================================
   GLOBAL
   ========================================================= */

let selectedRole = "";

const roleNames = {
    athlete: "Athlete",
    coach: "Coach",
    "gram-panchayat": "Gram Panchayat",
    organizer: "Organizer",
    authority: "Authority"
};


/* =========================================================
   DEMO COACH DATA
   ========================================================= */

const coachData = [
    {
        name: "Amit Kumar",
        sport: "Cricket",
        location: "Lucknow",
        experience: "8 years"
    },
    {
        name: "Rahul Singh",
        sport: "Football",
        location: "Lucknow",
        experience: "6 years"
    },
    {
        name: "Vivek Yadav",
        sport: "Kabaddi",
        location: "Barabanki",
        experience: "7 years"
    },
    {
        name: "Priya Sharma",
        sport: "Athletics",
        location: "Lucknow",
        experience: "5 years"
    },
    {
        name: "Arjun Verma",
        sport: "Hockey",
        location: "Kanpur",
        experience: "9 years"
    },
    {
        name: "Neha Singh",
        sport: "Volleyball",
        location: "Ayodhya",
        experience: "6 years"
    }
];


/* =========================================================
   LOCAL STORAGE
   ========================================================= */

function getUser() {

    const savedUser = localStorage.getItem("khelogramUser");

    if (!savedUser) {
        return null;
    }

    try {
        return JSON.parse(savedUser);
    } catch (error) {
        console.error("Could not read saved user.", error);
        return null;
    }
}


function saveUser(user) {
    localStorage.setItem(
        "khelogramUser",
        JSON.stringify(user)
    );
}


/* =========================================================
   ROLE SELECTOR
   ========================================================= */

function openRoleSelector() {

    const modal = document.getElementById("roleModal");

    if (!modal) {
        console.error("roleModal was not found.");
        return;
    }

    modal.classList.remove("hidden");
}


function closeRoleSelector() {

    const modal = document.getElementById("roleModal");

    if (!modal) {
        return;
    }

    modal.classList.add("hidden");
}


/* =========================================================
   ROLE SELECTION
   ========================================================= */

function selectRole(role) {

    selectedRole = role
        .toLowerCase()
        .replace(/\s+/g, "-");

    closeRoleSelector();

    openAuthModal();
}


/* =========================================================
   AUTH MODAL
   ========================================================= */

function openAuthModal() {

    const modal = document.getElementById("authModal");

    if (!modal) {
        console.error("authModal was not found.");
        return;
    }

    modal.classList.remove("hidden");

    switchAuth("register");
}


function closeAuthModal() {

    const modal = document.getElementById("authModal");

    if (!modal) {
        return;
    }

    modal.classList.add("hidden");
}


/* =========================================================
   AUTH TABS
   ========================================================= */

function switchAuth(type) {

    const nameField = document.getElementById("nameField");
    const authTitle = document.getElementById("authTitle");
    const authSubtitle = document.getElementById("authSubtitle");
    const authButtonText = document.getElementById("authButtonText");
    const registerTab = document.getElementById("registerTab");
    const loginTab = document.getElementById("loginTab");
    const authName = document.getElementById("authName");

    if (type === "login") {

        nameField.style.display = "none";

        authTitle.textContent = "Welcome back";

        authSubtitle.textContent =
            "Login to your KheloGram account.";

        authButtonText.textContent = "Login";

        registerTab.classList.remove("active");
        loginTab.classList.add("active");

        authName.required = false;

    } else {

        nameField.style.display = "block";

        authTitle.textContent = "Create your account";

        authSubtitle.textContent =
            "Join the KheloGram ecosystem.";

        authButtonText.textContent = "Create Account";

        registerTab.classList.add("active");
        loginTab.classList.remove("active");

        authName.required = true;
    }
}


/* =========================================================
   AUTH FORM
   ========================================================= */

function handleAuthSubmit(event) {

    event.preventDefault();

    const title =
        document.getElementById("authTitle").textContent;

    if (title === "Welcome back") {
        loginUser();
    } else {
        registerUser();
    }
}


/* =========================================================
   REGISTER
   ========================================================= */

function registerUser() {

    const name =
        document.getElementById("authName").value.trim();

    const email =
        document.getElementById("authEmail").value.trim();

    const password =
        document.getElementById("authPassword").value;

    if (!name) {
        alert("Please enter your full name.");
        return;
    }

    if (!email) {
        alert("Please enter your email.");
        return;
    }

    if (password.length < 6) {
        alert("Password must contain at least 6 characters.");
        return;
    }

    if (!selectedRole) {
        alert("Please select your role first.");
        return;
    }

    const user = {
        name: name,
        email: email,
        password: password,
        role: selectedRole,
        profile: {
            age: "",
            village: "",
            district: "",
            sport: "",
            skill: "",
            achievements: "",
            coach: ""
        }
    };

    saveUser(user);

    closeAuthModal();

    showDashboard();

    showToast(
        "Welcome to KheloGram, " + name + "!"
    );
}


/* =========================================================
   LOGIN
   ========================================================= */

function loginUser() {

    const email =
        document.getElementById("authEmail").value.trim();

    const password =
        document.getElementById("authPassword").value;

    const user = getUser();

    if (!user) {

        alert(
            "No KheloGram account found.\n\nPlease register first."
        );

        return;
    }

    if (
        email === user.email &&
        password === user.password
    ) {

        selectedRole = user.role;

        closeAuthModal();

        showDashboard();

        showToast(
            "Welcome back, " + user.name + "!"
        );

    } else {

        alert("Incorrect email or password.");

    }
}


/* =========================================================
   DASHBOARD
   ========================================================= */

function showDashboard() {

    const user = getUser();

    if (!user) {
        return;
    }

    const landingPage =
        document.getElementById("landingPage");

    const dashboardPage =
        document.getElementById("dashboardPage");

    landingPage.classList.add("hidden");

    dashboardPage.classList.remove("hidden");

    updateDashboardUser(user);

    loadProfile(user);

    showDashboardSection("overview");
}


/* =========================================================
   DASHBOARD USER
   ========================================================= */

function updateDashboardUser(user) {

    const name = user.name || "User";

    const role =
        roleNames[user.role] ||
        user.role ||
        "Athlete";

    setText("dashboardName", name);
    setText("userDisplayName", name);
    setText("userRole", role);

    const initials = getInitials(name);

    setText("userInitials", initials);
    setText("passportInitials", initials);
    setText("profileAvatar", initials);

    setText("passportName", name);
    setText("profileCardName", name);
}


/* =========================================================
   INITIALS
   ========================================================= */

function getInitials(name) {

    if (!name) {
        return "KG";
    }

    const words = name.trim().split(/\s+/);

    if (words.length === 1) {

        return words[0]
            .substring(0, 2)
            .toUpperCase();

    }

    return (
        words[0][0] +
        words[words.length - 1][0]
    ).toUpperCase();
}


/* =========================================================
   DASHBOARD SECTIONS
   ========================================================= */

function showDashboardSection(sectionName, clickedButton) {

    const sections =
        document.querySelectorAll(".dashboard-section");

    sections.forEach(function(section) {
        section.classList.add("hidden");
    });

    const target =
        document.getElementById(
            "section-" + sectionName
        );

    if (target) {
        target.classList.remove("hidden");
    }

    const menuItems =
        document.querySelectorAll(".menu-item");

    menuItems.forEach(function(item) {
        item.classList.remove("active");
    });

    if (clickedButton) {

        clickedButton.classList.add("active");

    } else {

        menuItems.forEach(function(item) {

            const text =
                item.textContent
                    .trim()
                    .toLowerCase();

            if (text.includes(sectionName)) {
                item.classList.add("active");
            }

        });
    }

    if (sectionName === "coaches") {
        filterCoaches();
    }
}


/* =========================================================
   PROFILE
   ========================================================= */

function loadProfile(user) {

    if (!user.profile) {

        user.profile = {
            age: "",
            village: "",
            district: "",
            sport: "",
            skill: "",
            achievements: "",
            coach: ""
        };

        saveUser(user);
    }

    const profile = user.profile;

    setInputValue("profileName", user.name);
    setInputValue("profileAge", profile.age);
    setInputValue("profileVillage", profile.village);
    setInputValue("profileDistrict", profile.district);
    setInputValue("profileSport", profile.sport);
    setInputValue("profileSkill", profile.skill);
    setInputValue(
        "profileAchievements",
        profile.achievements
    );

    updateProfileDisplay(user);
}


function setInputValue(id, value) {

    const element = document.getElementById(id);

    if (element) {
        element.value = value || "";
    }
}


/* =========================================================
   SAVE PROFILE
   ========================================================= */

function saveProfile(event) {

    event.preventDefault();

    const user = getUser();

    if (!user) {
        return;
    }

    user.name =
        document.getElementById("profileName")
            .value
            .trim();

    user.profile = {

        age:
            document.getElementById("profileAge").value,

        village:
            document.getElementById("profileVillage")
                .value
                .trim(),

        district:
            document.getElementById("profileDistrict")
                .value
                .trim(),

        sport:
            document.getElementById("profileSport").value,

        skill:
            document.getElementById("profileSkill").value,

        achievements:
            document.getElementById("profileAchievements")
                .value
                .trim(),

        coach:
            user.profile.coach || ""
    };

    saveUser(user);

    updateDashboardUser(user);

    updateProfileDisplay(user);

    updateInsights(user);

    showToast(
        "Sports Passport saved successfully!"
    );
}


/* =========================================================
   PROFILE DISPLAY
   ========================================================= */

function updateProfileDisplay(user) {

    const profile = user.profile || {};

    const location =
        buildLocation(
            profile.village,
            profile.district
        );

    setText(
        "passportSport",
        profile.sport || "Sport not selected"
    );

    setText(
        "profileCardSport",
        profile.sport || "Sport not selected"
    );

    setText(
        "passportLocation",
        location || "Add your village and district"
    );

    const fields = [
        user.name,
        profile.age,
        profile.village,
        profile.district,
        profile.sport,
        profile.skill,
        profile.achievements
    ];

    let completed = 0;

    fields.forEach(function(value) {

        if (
            value &&
            String(value).trim() !== ""
        ) {
            completed++;
        }

    });

    const completion =
        Math.round(
            completed / fields.length * 100
        );

    setText(
        "profileCompletion",
        completion + "%"
    );

    setText(
        "primarySport",
        profile.sport || "Not set"
    );

    setText(
        "talentStatus",
        completion >= 70 ? "Ready" : "Building"
    );

    setText(
        "coachStatus",
        profile.coach || "Not connected"
    );

    updateInsights(user);
}


/* =========================================================
   LOCATION
   ========================================================= */

function buildLocation(village, district) {

    if (village && district) {
        return village + ", " + district;
    }

    if (village) {
        return village;
    }

    if (district) {
        return district;
    }

    return "";
}


/* =========================================================
   AI INSIGHTS
   ========================================================= */

function updateInsights(user) {

    if (!user) {
        return;
    }

    const profile = user.profile || {};

    if (profile.sport && profile.skill) {

        const message =
            "Your profile shows " +
            profile.skill.toLowerCase() +
            " level experience in " +
            profile.sport +
            ". Keep building your performance record to strengthen your KheloGram talent profile.";

        setText("aiSummary", message);

        setText(
            "insightTitle",
            profile.sport + " Talent Profile"
        );

        setText(
            "insightDescription",
            message
        );

    } else {

        setText(
            "aiSummary",
            "Complete your sports profile to generate a personalized talent profile."
        );

        setText(
            "insightTitle",
            "Build your sports passport"
        );

        setText(
            "insightDescription",
            "Add your sport, skill level and experience to create your initial talent profile."
        );
    }

    setText(
        "signalSport",
        profile.sport || "Not provided"
    );

    setText(
        "signalSkill",
        profile.skill || "Not provided"
    );

    setText(
        "signalLocation",
        buildLocation(
            profile.village,
            profile.district
        ) || "Not provided"
    );

    setText(
        "signalExperience",
        profile.achievements || "Not provided"
    );
}


/* =========================================================
   COACHES
   ========================================================= */

function filterCoaches() {

    const searchInput =
        document.getElementById("coachSearch");

    const sportFilter =
        document.getElementById("coachSportFilter");

    const search =
        searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

    const sport =
        sportFilter
            ? sportFilter.value
            : "";

    const filtered =
        coachData.filter(function(coach) {

            const matchesSearch =
                coach.name.toLowerCase().includes(search) ||
                coach.sport.toLowerCase().includes(search) ||
                coach.location.toLowerCase().includes(search);

            const matchesSport =
                !sport ||
                coach.sport === sport;

            return matchesSearch && matchesSport;
        });

    renderCoaches(filtered);
}


function renderCoaches(coaches) {

    const grid =
        document.getElementById("coachGrid");

    if (!grid) {
        return;
    }

    if (coaches.length === 0) {

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
        coaches.map(function(coach) {

            const initials =
                getInitials(coach.name);

            return `
                <div class="coach-card">

                    <div class="coach-avatar">
                        ${initials}
                    </div>

                    <h3>${coach.name}</h3>

                    <p>${coach.sport}</p>

                    <small>
                        📍 ${coach.location}
                    </small>

                    <small>
                        ⭐ ${coach.experience}
                    </small>

                    <button
                        class="secondary-btn"
                        type="button"
                        onclick="connectCoach('${coach.name}')">
                        Connect
                    </button>

                </div>
            `;

        }).join("");
}


function connectCoach(name) {

    const user = getUser();

    if (!user) {
        return;
    }

    if (!user.profile) {
        user.profile = {};
    }

    user.profile.coach = name;

    saveUser(user);

    setText("coachStatus", name);

    showToast(
        "Coach connection request sent to " + name
    );
}


/* =========================================================
   LOGOUT
   ========================================================= */

function logout() {

    localStorage.removeItem("khelogramUser");

    selectedRole = "";

    const dashboard =
        document.getElementById("dashboardPage");

    const landing =
        document.getElementById("landingPage");

    dashboard.classList.add("hidden");

    landing.classList.remove("hidden");

    showToast("You have been logged out.");
}


/* =========================================================
   SCROLL
   ========================================================= */

function scrollToSection(sectionId) {

    const section =
        document.getElementById(sectionId);

    if (!section) {
        return;
    }

    section.scrollIntoView({
        behavior: "smooth"
    });
}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimer = null;

function showToast(message) {

    const toast =
        document.getElementById("toast");

    if (!toast) {
        return;
    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function() {

        toast.classList.remove("show");

    }, 3000);
}


/* =========================================================
   HELPER
   ========================================================= */

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}


/* =========================================================
   MODAL OUTSIDE CLICK
   ========================================================= */

document.addEventListener("click", function(event) {

    const roleModal =
        document.getElementById("roleModal");

    const authModal =
        document.getElementById("authModal");

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
});


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeRoleSelector();

        closeAuthModal();
    }
});


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener("DOMContentLoaded", function() {

    console.log("KheloGram Stage 3.3 initialized.");

    const authForm =
        document.getElementById("authForm");

    if (authForm) {

        authForm.addEventListener(
            "submit",
            handleAuthSubmit
        );
    }


    const profileForm =
        document.getElementById("profileForm");

    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            saveProfile
        );
    }


    const user = getUser();

    if (user) {

        selectedRole = user.role;

        showDashboard();
    }

    console.log("KheloGram ready.");
});


/* =========================================================
   GLOBAL FUNCTIONS FOR HTML
   ========================================================= */

window.openRoleSelector = openRoleSelector;
window.closeRoleSelector = closeRoleSelector;
window.selectRole = selectRole;

window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.switchAuth = switchAuth;

window.registerUser = registerUser;
window.loginUser = loginUser;

window.logout = logout;
window.showDashboard = showDashboard;
window.showDashboardSection = showDashboardSection;

window.scrollToSection = scrollToSection;

window.filterCoaches = filterCoaches;
window.connectCoach = connectCoach;

console.log("KheloGram JavaScript loaded successfully.");
