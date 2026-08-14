/* =========================================================
   KHELOGRAM
   STAGE 4.1 - CORRECTED COMPLETE JAVASCRIPT
   Rural Sports Ground Discovery
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
   STAGE 4.1
   DEMO SPORTS GROUND DATA
   ========================================================= */

const groundData = [
    {
        name: "KheloGram Community Ground",
        village: "Chinhat",
        district: "Lucknow",
        sport: "Multi-Sport",
        status: "Available",
        facilities: "Football, Cricket, Athletics",
        capacity: "250",
        facility: "Multi-Sport",
        condition: "Good"
    },
    {
        name: "Gram Sports Ground",
        village: "Malihabad",
        district: "Lucknow",
        sport: "Cricket",
        status: "Available",
        facilities: "Cricket, Volleyball",
        capacity: "180",
        facility: "Cricket Pitch",
        condition: "Good"
    },
    {
        name: "Rural Football Ground",
        village: "Bakshi Ka Talab",
        district: "Lucknow",
        sport: "Football",
        status: "Available",
        facilities: "Football, Athletics",
        capacity: "220",
        facility: "Football Field",
        condition: "Good"
    },
    {
        name: "Yuva Khel Maidan",
        village: "Nawabganj",
        district: "Barabanki",
        sport: "Multi-Sport",
        status: "Available",
        facilities: "Cricket, Football, Kabaddi",
        capacity: "300",
        facility: "Multi-Sport Field",
        condition: "Excellent"
    },
    {
        name: "Gram Panchayat Sports Field",
        village: "Haidergarh",
        district: "Barabanki",
        sport: "Kabaddi",
        status: "Maintenance",
        facilities: "Kabaddi, Volleyball",
        capacity: "120",
        facility: "Kabaddi Court",
        condition: "Maintenance"
    },
    {
        name: "Rural Athletics Ground",
        village: "Akbarpur",
        district: "Kanpur Dehat",
        sport: "Athletics",
        status: "Available",
        facilities: "Athletics, Running Track",
        capacity: "200",
        facility: "Running Track",
        condition: "Good"
    },
    {
        name: "Village Cricket Ground",
        village: "Soraon",
        district: "Prayagraj",
        sport: "Cricket",
        status: "Available",
        facilities: "Cricket",
        capacity: "150",
        facility: "Cricket Pitch",
        condition: "Fair"
    },
    {
        name: "Community Sports Field",
        village: "Milkipur",
        district: "Ayodhya",
        sport: "Multi-Sport",
        status: "Available",
        facilities: "Football, Cricket, Volleyball",
        capacity: "250",
        facility: "Multi-Sport Field",
        condition: "Good"
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

    roleModal.classList.remove("hidden");

    roleModal.style.display = "flex";
    roleModal.style.visibility = "visible";
    roleModal.style.opacity = "1";
    roleModal.style.zIndex = "9999";

    document.body.classList.add("modal-open");

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

}


/* =========================================================
   SELECT ROLE
   ========================================================= */

function selectRole(role) {

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

    const nameElement =
        document.getElementById("authName");

    const emailElement =
        document.getElementById("authEmail");

    const passwordElement =
        document.getElementById("authPassword");


    const name =
        nameElement
            ? nameElement.value.trim()
            : "";

    const email =
        emailElement
            ? emailElement.value.trim()
            : "";

    const password =
        passwordElement
            ? passwordElement.value.trim()
            : "";


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

            achievements: "",

            coach: ""

        }

    };


    saveUser(user);

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

    const emailElement =
        document.getElementById("authEmail");

    const passwordElement =
        document.getElementById("authPassword");


    const email =
        emailElement
            ? emailElement.value.trim()
            : "";

    const password =
        passwordElement
            ? passwordElement.value.trim()
            : "";


    const user =
        getUser();


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

    const user =
        getUser();

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


    setText(
        "dashboardName",
        name
    );

    setText(
        "userDisplayName",
        name
    );

    setText(
        "userRole",
        role
    );


    const initials =
        getInitials(name);


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

    setText(
        "passportName",
        name
    );

    setText(
        "profileCardName",
        name
    );

}


/* =========================================================
   INITIALS
   ========================================================= */

function getInitials(name) {

    if (!name) {
        return "KG";
    }

    const words =
        name
            .trim()
            .split(/\s+/);


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
        sectionName === "coaches"
    ) {

        filterCoaches();

    }


    if (
        sectionName === "grounds"
    ) {

        filterGrounds();

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


    updateProfileDisplay(user);

}


/* =========================================================
   SET INPUT VALUE
   ========================================================= */

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


    const user =
        getUser();


    if (!user) {
        return;
    }


    const nameElement =
        document.getElementById(
            "profileName"
        );

    const ageElement =
        document.getElementById(
            "profileAge"
        );

    const villageElement =
        document.getElementById(
            "profileVillage"
        );

    const districtElement =
        document.getElementById(
            "profileDistrict"
        );

    const sportElement =
        document.getElementById(
            "profileSport"
        );

    const skillElement =
        document.getElementById(
            "profileSkill"
        );

    const achievementsElement =
        document.getElementById(
            "profileAchievements"
        );


    user.name =
        nameElement
            ? nameElement.value.trim()
            : user.name;


    user.profile = {

        age:
            ageElement
                ? ageElement.value
                : "",

        village:
            villageElement
                ? villageElement.value.trim()
                : "",

        district:
            districtElement
                ? districtElement.value.trim()
                : "",

        sport:
            sportElement
                ? sportElement.value
                : "",

        skill:
            skillElement
                ? skillElement.value
                : "",

        achievements:
            achievementsElement
                ? achievementsElement.value.trim()
                : "",

        coach:
            user.profile
                ? user.profile.coach || ""
                : ""

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


    setText(
        "passportSport",
        profile.sport ||
        "Sport not selected"
    );


    setText(
        "profileCardSport",
        profile.sport ||
        "Sport not selected"
    );


    const location =
        buildLocation(
            profile.village,
            profile.district
        );


    setText(
        "passportLocation",
        location ||
        "Add your village and district"
    );


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
            (
                completed /
                fields.length
            ) * 100
        );


    setText(
        "profileCompletion",
        completion + "%"
    );


    setText(
        "primarySport",
        profile.sport ||
        "Not set"
    );


    setText(
        "talentStatus",
        completion >= 70
            ? "Ready"
            : "Building"
    );


    setText(
        "coachStatus",
        profile.coach ||
        "Not connected"
    );


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
   AI INSIGHTS
   ========================================================= */

function updateInsights(user) {

    if (!user) {
        return;
    }


    const profile =
        user.profile || {};


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


        setText(
            "aiSummary",
            message
        );


        setText(
            "insightTitle",
            profile.sport +
            " Talent Profile"
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


/* =========================================================
   RENDER COACHES
   ========================================================= */

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

                const connectedUser =
                    getUser();

                const isConnected =
                    connectedUser &&
                    connectedUser.profile &&
                    connectedUser.profile.coach === coach.name;


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

                        ${
                            isConnected

                            ? `
                                <div class="connection-status">
                                    ✓ Connection Requested
                                </div>
                              `

                            : `
                                <button
                                    class="secondary-btn"
                                    type="button"
                                    onclick="connectCoach('${coach.name}')"
                                >
                                    Connect
                                </button>
                              `
                        }

                    </div>
                `;

            }
        ).join("");

}


/* =========================================================
   CONNECT COACH
   ========================================================= */

function connectCoach(name) {

    const user =
        getUser();


    if (!user) {

        showToast(
            "Please login first."
        );

        return;
    }


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

    }


    user.profile.coach =
        name;


    saveUser(user);


    setText(
        "coachStatus",
        name
    );


    renderCoaches(
        getFilteredCoaches()
    );


    showToast(
        "Coach connection request sent to " +
        name
    );

}


/* =========================================================
   GET FILTERED COACHES
   ========================================================= */

function getFilteredCoaches() {

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


    return coachData.filter(
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

}


/* =========================================================
   STAGE 4.1
   GROUND SEARCH
   ========================================================= */

function filterGrounds() {

    const searchInput =
        document.getElementById(
            "groundSearch"
        );

    const districtFilter =
        document.getElementById(
            "groundDistrictFilter"
        );

    const sportFilter =
        document.getElementById(
            "groundSportFilter"
        );


    const search =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const district =
        districtFilter
            ? districtFilter.value
            : "";


    const sport =
        sportFilter
            ? sportFilter.value
            : "";


    const filtered =
        groundData.filter(
            function(ground) {

                const searchableText =

                    (
                        ground.name +
                        " " +
                        ground.village +
                        " " +
                        ground.district +
                        " " +
                        ground.sport +
                        " " +
                        ground.facilities
                    ).toLowerCase();


                const matchesSearch =
                    searchableText.includes(
                        search
                    );


                const matchesDistrict =

                    !district ||
                    ground.district === district;


                const matchesSport =

                    !sport ||
                    ground.sport === sport ||
                    ground.facilities
                        .toLowerCase()
                        .includes(
                            sport.toLowerCase()
                        );


                return (
                    matchesSearch &&
                    matchesDistrict &&
                    matchesSport
                );

            }
        );


    renderGrounds(filtered);

}


/* =========================================================
   RENDER GROUNDS
   ========================================================= */

function renderGrounds(grounds) {

    const grid =
        document.getElementById(
            "groundGrid"
        );


    if (!grid) {
        return;
    }


    updateGroundCount(
        grounds.length
    );


    if (grounds.length === 0) {

        grid.innerHTML = `
            <div class="empty-panel">
                <div>🔎</div>
                <h3>No sports grounds found</h3>
                <p>
                    Try another village, district or sport.
                </p>
            </div>
        `;

        return;
    }


    grid.innerHTML =
        grounds.map(
            function(ground) {

                const statusClass =
                    ground.status
                        .toLowerCase()
                        .replace(/\s+/g, "-");


                return `
                    <div class="ground-card">

                        <div class="ground-card-top">

                            <div class="ground-icon">
                                🏟️
                            </div>

                            <span
                                class="ground-status ${statusClass}"
                            >
                                ${ground.status}
                            </span>

                        </div>

                        <h3>
                            ${ground.name}
                        </h3>

                        <p class="ground-location">
                            📍 ${ground.village},
                            ${ground.district}
                        </p>

                        <div class="ground-details">

                            <div class="ground-detail">

                                <small>
                                    SPORT
                                </small>

                                <strong>
                                    ${ground.sport}
                                </strong>

                            </div>

                            <div class="ground-detail">

                                <small>
                                    FACILITIES
                                </small>

                                <strong>
                                    ${ground.facilities}
                                </strong>

                            </div>

                        </div>

                        <div class="ground-card-actions">

                            <button
                                class="secondary-btn"
                                type="button"
                                onclick="viewGround('${escapeAttribute(ground.name)}')"
                            >
                                View Ground →
                            </button>

                        </div>

                    </div>
                `;

            }
        ).join("");

}


/* =========================================================
   UPDATE GROUND COUNT
   ========================================================= */

function updateGroundCount(count) {

    setText(
        "groundCount",
        count
    );

}


/* =========================================================
   VIEW GROUND
   ========================================================= */

function viewGround(name) {

    const ground =
        groundData.find(
            function(item) {

                return (
                    item.name === name
                );

            }
        );


    if (!ground) {

        console.error(
            "Ground not found:",
            name
        );

        return;
    }


    setText(
        "groundDetailDistrict",
        ground.district
            ? ground.district.toUpperCase()
            : "DISTRICT"
    );


    setText(
        "groundDetailName",
        ground.name
    );


    setText(
        "groundDetailLocation",
        "📍 " +
        ground.village +
        ", " +
        ground.district
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
        ground.capacity || "Not available"
    );


    setText(
        "groundDetailFacility",
        ground.facility ||
        ground.facilities ||
        "Basic"
    );


    setText(
        "groundDetailCondition",
        ground.condition ||
        "Good"
    );


    const modal =
        document.getElementById(
            "groundDetailsModal"
        );


    if (!modal) {

        alert(
            "GROUND DETAILS\n\n" +

            "Name: " +
            ground.name +

            "\nVillage: " +
            ground.village +

            "\nDistrict: " +
            ground.district +

            "\nSport: " +
            ground.sport +

            "\nStatus: " +
            ground.status +

            "\nFacilities: " +
            ground.facilities
        );

        return;
    }


    modal.classList.remove(
        "hidden"
    );


    modal.style.display =
        "flex";


    modal.style.visibility =
        "visible";


    modal.style.opacity =
        "1";


    modal.style.zIndex =
        "9999";


    document.body.classList.add(
        "modal-open"
    );

}


/* =========================================================
   CLOSE GROUND DETAILS
   ========================================================= */

function closeGroundDetails() {

    const modal =
        document.getElementById(
            "groundDetailsModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.add(
        "hidden"
    );


    modal.style.display =
        "none";


    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   ESCAPE HTML ATTRIBUTE
   ========================================================= */

function escapeAttribute(value) {

    return String(value)
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'");

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


    closeGroundDetails();

    closeAuthModal();

    closeRoleSelector();


    showToast(
        "You have been logged out."
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

let toastTimer = null;


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


    if (toastTimer) {

        clearTimeout(
            toastTimer
        );

    }


    toastTimer =
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
   CLOSE MODALS BY BACKDROP
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

        const groundDetailsModal =
            document.getElementById(
                "groundDetailsModal"
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


        if (
            groundDetailsModal &&
            event.target === groundDetailsModal
        ) {

            closeGroundDetails();

        }

    }
);


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeRoleSelector();

            closeAuthModal();

            closeGroundDetails();

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
            "KheloGram Stage 4.1 initialized."
        );


        /* =================================================
           AUTH FORM
           ================================================= */

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


        /* =================================================
           PROFILE FORM
           ================================================= */

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


        /* =================================================
           RESTORE USER
           ================================================= */

        const user =
            getUser();


        if (user) {

            selectedRole =
                user.role;

            showDashboard();

        }


        /* =================================================
           INITIAL COACH RENDER
           ================================================= */

        renderCoaches(
            coachData
        );


        /* =================================================
           INITIAL GROUND RENDER
           ================================================= */

        renderGrounds(
            groundData
        );


        console.log(
            "KheloGram Stage 4.1 ready."
        );

    }
);


/* =========================================================
   MAKE FUNCTIONS AVAILABLE TO HTML
   ================================================= */

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

window.filterGrounds =
    filterGrounds;

window.viewGround =
    viewGround;

window.closeGroundDetails =
    closeGroundDetails;


/* =========================================================
   FINAL MESSAGE
   ========================================================= */

console.log(
    "KheloGram loaded successfully."
);

console.log(
    "Stage 4.1 JavaScript ready."
);
