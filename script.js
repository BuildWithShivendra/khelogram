/* =========================================================
   KHELOGRAM
   STAGE 3.3 - COMPLETE JAVASCRIPT
   Matched with current index.html
   ========================================================= */


/* =========================================================
   GLOBAL DATA
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

    const savedUser =
        localStorage.getItem("khelogramUser");

    if (!savedUser) {
        return null;
    }

    try {
        return JSON.parse(savedUser);
    } catch (error) {

        console.error(
            "Error reading KheloGram user:",
            error
        );

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

    const roleModal =
        document.getElementById("roleModal");

    if (!roleModal) {

        console.error(
            "roleModal not found in index.html"
        );

        return;
    }

    /*
       Remove the hidden class.
       This is important because the HTML starts with:
       class="modal hidden"
    */
    roleModal.classList.remove("hidden");

    roleModal.style.display = "flex";
    roleModal.style.visibility = "visible";
    roleModal.style.opacity = "1";
    roleModal.style.zIndex = "9999";

    document.body.classList.add("modal-open");

    console.log("Role selector opened.");
}


function closeRoleSelector() {

    const roleModal =
        document.getElementById("roleModal");

    if (!roleModal) {
        return;
    }

    roleModal.classList.add("hidden");

    roleModal.style.display = "none";

    document.body.classList.remove("modal-open");

    console.log("Role selector closed.");
}


/* =========================================================
   SELECT ROLE
   ========================================================= */

function selectRole(role) {

    /*
       HTML sends values such as:
       "Athlete"
       "Coach"
       "Gram Panchayat"

       Convert them into our internal format.
    */

    selectedRole =
        role
            .toLowerCase()
            .replace(/\s+/g, "-");

    console.log(
        "Selected role:",
        roleNames[selectedRole] || role
    );

    closeRoleSelector();

    openAuthModal();

}


/* =========================================================
   AUTH MODAL
   ========================================================= */

function openAuthModal() {

    const authModal =
        document.getElementById("authModal");

    if (!authModal) {

        console.error(
            "authModal not found in index.html"
        );

        return;
    }

    authModal.classList.remove("hidden");

    authModal.style.display = "flex";
    authModal.style.visibility = "visible";
    authModal.style.opacity = "1";
    authModal.style.zIndex = "9999";

    document.body.classList.add("modal-open");

    switchAuth("register");

    console.log(
        "Authentication modal opened."
    );
}


function closeAuthModal() {

    const authModal =
        document.getElementById("authModal");

    if (!authModal) {
        return;
    }

    authModal.classList.add("hidden");

    authModal.style.display = "none";

    document.body.classList.remove("modal-open");

    console.log(
        "Authentication modal closed."
    );
}


/* =========================================================
   AUTH TABS
   ========================================================= */

function switchAuth(type) {

    const nameField =
        document.getElementById("nameField");

    const authTitle =
        document.getElementById("authTitle");

    const authSubtitle =
        document.getElementById("authSubtitle");

    const authButtonText =
        document.getElementById("authButtonText");

    const registerTab =
        document.getElementById("registerTab");

    const loginTab =
        document.getElementById("loginTab");

    const authName =
        document.getElementById("authName");


    if (type === "login") {

        if (nameField) {
            nameField.style.display = "none";
        }

        if (authTitle) {
            authTitle.textContent =
                "Welcome back";
        }

        if (authSubtitle) {
            authSubtitle.textContent =
                "Login to your KheloGram account.";
        }

        if (authButtonText) {
            authButtonText.textContent =
                "Login";
        }

        if (registerTab) {
            registerTab.classList.remove("active");
        }

        if (loginTab) {
            loginTab.classList.add("active");
        }

        if (authName) {
            authName.required = false;
        }

    } else {

        if (nameField) {
            nameField.style.display = "block";
        }

        if (authTitle) {
            authTitle.textContent =
                "Create your account";
        }

        if (authSubtitle) {
            authSubtitle.textContent =
                "Join the KheloGram ecosystem.";
        }

        if (authButtonText) {
            authButtonText.textContent =
                "Create Account";
        }

        if (registerTab) {
            registerTab.classList.add("active");
        }

        if (loginTab) {
            loginTab.classList.remove("active");
        }

        if (authName) {
            authName.required = true;
        }
    }
}


/* =========================================================
   AUTH FORM
   ========================================================= */

function handleAuthSubmit(event) {

    event.preventDefault();

    const authTitle =
        document.getElementById("authTitle");

    const isLogin =
        authTitle &&
        authTitle.textContent
            .toLowerCase()
            .includes("welcome back");


    if (isLogin) {

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
        document.getElementById("authName")
            .value
            .trim();

    const email =
        document.getElementById("authEmail")
            .value
            .trim();

    const password =
        document.getElementById("authPassword")
            .value
            .trim();


    if (!name) {

        alert(
            "Please enter your full name."
        );

        return;
    }


    if (!email) {

        alert(
            "Please enter your email."
        );

        return;
    }


    if (password.length < 6) {

        alert(
            "Password must contain at least 6 characters."
        );

        return;
    }


    if (!selectedRole) {

        alert(
            "Please select your role first."
        );

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

            achievements: ""

        }

    };


    saveUser(user);

    console.log(
        "User registered:",
        user
    );


    closeAuthModal();

    showDashboard();


    showToast(
        "Welcome to KheloGram, " +
        name +
        "!"
    );

}


/* =========================================================
   LOGIN
   ========================================================= */

function loginUser() {

    const email =
        document.getElementById("authEmail")
            .value
            .trim();

    const password =
        document.getElementById("authPassword")
            .value
            .trim();


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

        selectedRole =
            user.role;

        closeAuthModal();

        showDashboard();

        showToast(
            "Welcome back, " +
            user.name +
            "!"
        );

    } else {

        alert(
            "Incorrect email or password."
        );

    }

}


/* =========================================================
   DASHBOARD
   ========================================================= */

function showDashboard() {

    const user = getUser();

    if (!user) {

        console.log(
            "No saved user."
        );

        return;
    }


    const landingPage =
        document.getElementById(
            "landingPage"
        );

    const dashboardPage =
        document.getElementById(
            "dashboardPage"
        );


    if (landingPage) {

        landingPage.classList.add(
            "hidden"
        );

    }


    if (dashboardPage) {

        dashboardPage.classList.remove(
            "hidden"
        );

    }


    updateDashboardUser(user);

    loadProfile(user);

    showDashboardSection(
        "overview"
    );


    console.log(
        "Dashboard opened for:",
        user.name,
        roleNames[user.role] || user.role
    );

}


/* =========================================================
   DASHBOARD USER INFORMATION
   ========================================================= */

function updateDashboardUser(user) {

    const name =
        user.name || "User";

    const role =
        roleNames[user.role] ||
        user.role ||
        "Athlete";


    const dashboardName =
        document.getElementById(
            "dashboardName"
        );

    const userDisplayName =
        document.getElementById(
            "userDisplayName"
        );

    const userRole =
        document.getElementById(
            "userRole"
        );


    if (dashboardName) {
        dashboardName.textContent =
            name;
    }

    if (userDisplayName) {
        userDisplayName.textContent =
            name;
    }

    if (userRole) {
        userRole.textContent =
            role;
    }


    const initials =
        getInitials(name);


    const userInitials =
        document.getElementById(
            "userInitials"
        );

    const passportInitials =
        document.getElementById(
            "passportInitials"
        );

    const profileAvatar =
        document.getElementById(
            "profileAvatar"
        );


    if (userInitials) {
        userInitials.textContent =
            initials;
    }

    if (passportInitials) {
        passportInitials.textContent =
            initials;
    }

    if (profileAvatar) {
        profileAvatar.textContent =
            initials;
    }


    const passportName =
        document.getElementById(
            "passportName"
        );

    const profileCardName =
        document.getElementById(
            "profileCardName"
        );


    if (passportName) {
        passportName.textContent =
            name;
    }

    if (profileCardName) {
        profileCardName.textContent =
            name;
    }


    /*
       Coach menu is mainly relevant
       to athletes in this prototype.
    */

    const coachMenu =
        document.getElementById(
            "coachMenu"
        );

    if (coachMenu) {

        if (user.role === "athlete") {

            coachMenu.style.display =
                "flex";

        } else {

            coachMenu.style.display =
                "flex";

        }

    }

}


/* =========================================================
   INITIALS
   ========================================================= */

function getInitials(name) {

    if (!name) {
        return "KG";
    }

    const words =
        name.trim().split(/\s+/);

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

function showDashboardSection(
    sectionName,
    clickedButton
) {

    const sections =
        document.querySelectorAll(
            ".dashboard-section"
        );


    sections.forEach(
        function(section) {

            section.classList.add(
                "hidden"
            );

        }
    );


    const targetSection =
        document.getElementById(
            "section-" + sectionName
        );


    if (targetSection) {

        targetSection.classList.remove(
            "hidden"
        );

    }


    const menuItems =
        document.querySelectorAll(
            ".menu-item"
        );


    menuItems.forEach(
        function(item) {

            item.classList.remove(
                "active"
            );

        }
    );


    if (clickedButton) {

        clickedButton.classList.add(
            "active"
        );

    }


    /*
       If called from another button,
       automatically activate matching menu item.
    */

    if (!clickedButton) {

        menuItems.forEach(
            function(item) {

                const text =
                    item.textContent
                        .trim()
                        .toLowerCase();

                if (
                    text.includes(
                        sectionName
                    )
                ) {

                    item.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    if (
        sectionName ===
        "coaches"
    ) {

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
            achievements: ""

        };

        saveUser(user);

    }


    const profile =
        user.profile;


    setInputValue(
        "profileName",
        user.name
    );

    setInputValue(
        "profileAge",
        profile.age
    );

    setInputValue(
        "profileVillage",
        profile.village
    );

    setInputValue(
        "profileDistrict",
        profile.district
    );

    setInputValue(
        "profileSport",
        profile.sport
    );

    setInputValue(
        "profileSkill",
        profile.skill
    );

    setInputValue(
        "profileAchievements",
        profile.achievements
    );


    updateProfileDisplay(
        user
    );

}


function setInputValue(
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
        document.getElementById(
            "profileName"
        ).value.trim();


    user.profile = {

        age:
            document.getElementById(
                "profileAge"
            ).value,

        village:
            document.getElementById(
                "profileVillage"
            ).value.trim(),

        district:
            document.getElementById(
                "profileDistrict"
            ).value.trim(),

        sport:
            document.getElementById(
                "profileSport"
            ).value,

        skill:
            document.getElementById(
                "profileSkill"
            ).value,

        achievements:
            document.getElementById(
                "profileAchievements"
            ).value.trim()

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
   UPDATE PROFILE DISPLAY
   ========================================================= */

function updateProfileDisplay(user) {

    const profile =
        user.profile || {};


    const sport =
        profile.sport || "Not set";


    const skill =
        profile.skill || "Not set";


    const location =
        buildLocation(
            profile.village,
            profile.district
        );


    const passportSport =
        document.getElementById(
            "passportSport"
        );

    const profileCardSport =
        document.getElementById(
            "profileCardSport"
        );

    const passportLocation =
        document.getElementById(
            "passportLocation"
        );


    if (passportSport) {

        passportSport.textContent =
            profile.sport ||
            "Sport not selected";

    }


    if (profileCardSport) {

        profileCardSport.textContent =
            profile.sport ||
            "Sport not selected";

    }


    if (passportLocation) {

        passportLocation.textContent =
            location ||
            "Add your village and district";

    }


    /*
       Profile completion
    */

    let completed = 0;

    const fields = [

        user.name,

        profile.age,

        profile.village,

        profile.district,

        profile.sport,

        profile.skill,

        profile.achievements

    ];


    fields.forEach(
        function(value) {

            if (
                value &&
                String(value).trim() !== ""
            ) {

                completed++;

            }

        }
    );


    const completion =
        Math.round(
            (completed /
                fields.length) *
            100
        );


    const profileCompletion =
        document.getElementById(
            "profileCompletion"
        );


    if (profileCompletion) {

        profileCompletion.textContent =
            completion + "%";

    }


    const primarySport =
        document.getElementById(
            "primarySport"
        );

    if (primarySport) {

        primarySport.textContent =
            profile.sport ||
            "Not set";

    }


    const talentStatus =
        document.getElementById(
            "talentStatus"
        );

    if (talentStatus) {

        if (completion >= 70) {

            talentStatus.textContent =
                "Ready";

        } else {

            talentStatus.textContent =
                "Building";

        }

    }


    const coachStatus =
        document.getElementById(
            "coachStatus"
        );

    if (coachStatus) {

        coachStatus.textContent =
            "Not connected";

    }


    updateInsights(user);

}


/* =========================================================
   LOCATION
   ========================================================= */

function buildLocation(
    village,
    district
) {

    if (
        village &&
        district
    ) {

        return (
            village +
            ", " +
            district
        );

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
   AI INSIGHTS - PROTOTYPE
   ========================================================= */

function updateInsights(user) {

    if (!user) {
        return;
    }


    const profile =
        user.profile || {};


    const sport =
        profile.sport ||
        "your sport";


    const skill =
        profile.skill ||
        "your current level";


    const aiSummary =
        document.getElementById(
            "aiSummary"
        );


    const insightTitle =
        document.getElementById(
            "insightTitle"
        );


    const insightDescription =
        document.getElementById(
            "insightDescription"
        );


    if (
        profile.sport &&
        profile.skill
    ) {

        const message =
            "Your profile shows " +
            profile.skill.toLowerCase() +
            " level experience in " +
            profile.sport +
            ". Keep building your performance record to strengthen your KheloGram talent profile.";

        if (aiSummary) {
            aiSummary.textContent =
                message;
        }

        if (insightTitle) {

            insightTitle.textContent =
                profile.sport +
                " Talent Profile";

        }

        if (insightDescription) {

            insightDescription.textContent =
                message;

        }

    } else {

        if (aiSummary) {

            aiSummary.textContent =
                "Complete your sports profile to generate a personalized talent profile.";

        }

        if (insightTitle) {

            insightTitle.textContent =
                "Build your sports passport";

        }

        if (insightDescription) {

            insightDescription.textContent =
                "Add your sport, skill level and experience to create your initial talent profile.";

        }

    }


    setText(
        "signalSport",
        profile.sport ||
        "Not provided"
    );

    setText(
        "signalSkill",
        profile.skill ||
        "Not provided"
    );

    setText(
        "signalLocation",
        buildLocation(
            profile.village,
            profile.district
        ) ||
        "Not provided"
    );

    setText(
        "signalExperience",
        profile.achievements ||
        "Not provided"
    );

}


/* =========================================================
   COACHES
   ========================================================= */

function filterCoaches() {

    const searchInput =
        document.getElementById(
            "coachSearch"
        );

    const sportFilter =
        document.getElementById(
            "coachSportFilter"
        );


    const search =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const sport =
        sportFilter
            ? sportFilter.value
            : "";


    const filtered =
        coachData.filter(
            function(coach) {

                const matchesSearch =

                    coach.name
                        .toLowerCase()
                        .includes(search)

                    ||

                    coach.sport
                        .toLowerCase()
                        .includes(search)

                    ||

                    coach.location
                        .toLowerCase()
                        .includes(search);


                const matchesSport =

                    !sport ||
                    coach.sport === sport;


                return (
                    matchesSearch &&
                    matchesSport
                );

            }
        );


    renderCoaches(filtered);

}


function renderCoaches(coaches) {

    const grid =
        document.getElementById(
            "coachGrid"
        );


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
        coaches.map(
            function(coach) {

                return `
                    <div class="coach-card">

                        <div class="coach-avatar">
                            ${getInitials(coach.name)}
                        </div>

                        <h3>${coach.name}</h3>

                        <p>
                            ${coach.sport}
                        </p>

                        <small>
                            📍 ${coach.location}
                        </small>

                        <small>
                            ⭐ ${coach.experience}
                        </small>

                        <button
                            class="secondary-btn"
                            onclick="connectCoach('${coach.name}')"
                        >
                            Connect
                        </button>

                    </div>
                `;

            }
        ).join("");

}


function connectCoach(name) {

    const user = getUser();

    if (!user) {
        return;
    }


    if (!user.profile) {
        user.profile = {};
    }


    user.profile.coach =
        name;


    saveUser(user);


    const coachStatus =
        document.getElementById(
            "coachStatus"
        );


    if (coachStatus) {

        coachStatus.textContent =
            name;

    }


    showToast(
        "Coach connection request sent to " +
        name
    );

}


/* =========================================================
   LOGOUT
   ========================================================= */

function logout() {

    localStorage.removeItem(
        "khelogramUser"
    );

    selectedRole = "";

    const dashboardPage =
        document.getElementById(
            "dashboardPage"
        );

    const landingPage =
        document.getElementById(
            "landingPage"
        );


    if (dashboardPage) {

        dashboardPage.classList.add(
            "hidden"
        );

    }


    if (landingPage) {

        landingPage.classList.remove(
            "hidden"
        );

    }


    showToast(
        "You have been logged out."
    );


    console.log(
        "KheloGram user logged out."
    );

}


/* =========================================================
   SCROLL
   ========================================================= */

function scrollToSection(
    sectionId
) {

    const section =
        document.getElementById(
            sectionId
        );


    if (!section) {

        console.warn(
            "Section not found:",
            sectionId
        );

        return;
    }


    section.scrollIntoView({
        behavior: "smooth"
    });

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

        console.log(
            "Toast:",
            message
        );

        return;
    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        function() {

            toast.classList.remove(
                "show"
            );

        },
        3000
    );

}


/* =========================================================
   HELPER
   ========================================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent =
            value;

    }

}


/* =========================================================
   CLOSE MODALS BY CLICKING OUTSIDE
   ========================================================= */

document.addEventListener(
    "click",
    function(event) {

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
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeRoleSelector();

            closeAuthModal();

        }

    }
);


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "KheloGram Stage 3.3 initialized."
        );


        /*
           Connect authentication form
        */

        const authForm =
            document.getElementById(
                "authForm"
            );


        if (authForm) {

            authForm.addEventListener(
                "submit",
                handleAuthSubmit
            );

        }


        /*
           Connect profile form
        */

        const profileForm =
            document.getElementById(
                "profileForm"
            );


        if (profileForm) {

            profileForm.addEventListener(
                "submit",
                saveProfile
            );

        }


        /*
           If a user already exists,
           restore dashboard.
        */

        const user =
            getUser();


        if (user) {

            selectedRole =
                user.role;

            console.log(
                "Saved KheloGram user found:",
                user.name
            );

            showDashboard();

        }


        console.log(
            "KheloGram Stage 3.3 ready."
        );

    }
);


/* =========================================================
   MAKE FUNCTIONS AVAILABLE TO HTML
   ========================================================= */

window.openRoleSelector =
    openRoleSelector;

window.closeRoleSelector =
    closeRoleSelector;

window.selectRole =
    selectRole;

window.openAuthModal =
    openAuthModal;

window.closeAuthModal =
    closeAuthModal;

window.switchAuth =
    switchAuth;

window.registerUser =
    registerUser;

window.loginUser =
    loginUser;

window.logout =
    logout;

window.showDashboard =
    showDashboard;

window.showDashboardSection =
    showDashboardSection;

window.scrollToSection =
    scrollToSection;

window.filterCoaches =
    filterCoaches;

window.connectCoach =
    connectCoach;


/* =========================================================
   FINAL MESSAGE
   ========================================================= */

console.log(
    "KheloGram loaded successfully."
);

console.log(
    "Stage 3.3 JavaScript ready."
);
