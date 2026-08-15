/* =========================================================
   KHELOGRAM - STAGE 8

   Stage 1 + Stage 2 + Stage 3 + Stage 4
   + Stage 5 + Stage 6 + Stage 7 + Stage 8

   Beginner-friendly localStorage prototype.

   Stage 8 improvements:
   - Responsive navigation
   - Mobile sidebar
   - Better animations
   - Toast messages
   - Loading screen
   - Community
   - Achievements
   - AI Talent Insights
   - Sports Intelligence
   - Improved tournament interaction
   ========================================================= */


/* =========================================================
   GLOBAL VARIABLES
   ========================================================= */

let selectedRole =
    localStorage.getItem(
        "khelogramSelectedRole"
    ) || "Athlete";
let authMode = "register";
let currentTournamentId = null;
let toastTimer = null;


/* =========================================================
   LOCAL STORAGE KEYS
   ========================================================= */

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
   TOURNAMENT DATA
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
   COMMUNITY DEFAULT POSTS
   ========================================================= */

const defaultPosts = [

    {
        id: "P001",
        name: "KheloGram Sports Desk",
        role: "Community",
        sport: "Football",
        title: "Grassroots football season is starting!",
        content:
            "Village teams around Barabanki are preparing for structured competition. Share your training updates with the community.",
        createdAt: "2026-08-10T09:30:00",
        likes: 18
    },

    {
        id: "P002",
        name: "Priya Sharma",
        role: "Athlete",
        sport: "Athletics",
        title: "First podium finish 🥉",
        content:
            "Completed my first village athletics meet and finished on the podium. Thank you to everyone who supported my training.",
        createdAt: "2026-08-09T15:00:00",
        likes: 27
    },

    {
        id: "P003",
        name: "Mohanlalganj Sports Committee",
        role: "Organizer",
        sport: "Cricket",
        title: "Cricket Cup registrations open",
        content:
            "The KheloGram Rural Cricket Cup is accepting registrations. Check the Tournaments section for details.",
        createdAt: "2026-08-07T10:15:00",
        likes: 12
    }

];


/* =========================================================
   DEMO ATHLETE DATA FOR AI
   ========================================================= */

const demoAthletes = [

    {
        name: "Rahul Verma",
        sport: "Cricket",
        district: "Lucknow",
        village: "Mohanlalganj",
        participation: 8,
        achievements: 3,
        score: 84
    },

    {
        name: "Anjali Singh",
        sport: "Athletics",
        district: "Kanpur",
        village: "Bilhaur",
        participation: 10,
        achievements: 4,
        score: 91
    },

    {
        name: "Aman Yadav",
        sport: "Football",
        district: "Barabanki",
        village: "Nawabganj",
        participation: 7,
        achievements: 2,
        score: 78
    },

    {
        name: "Sita Devi",
        sport: "Kabaddi",
        district: "Ayodhya",
        village: "Sohawal",
        participation: 9,
        achievements: 3,
        score: 86
    }

];


/* =========================================================
   APPLICATION START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeApplication
);


function initializeApplication() {

    setupAuthForm();

    setupProfileForm();

    setupPostForm();

    setupAchievementForm();

    renderCoaches();

    renderGrounds();

    renderTournaments();

    renderCommunity();

    renderAchievements();

    loadProfileIntoForm();

    loadStoredUser();

    updateDashboardData();

    updateInsights();

    renderSportsIntelligence();

    setupScrollReveal();

    setTimeout(function () {

        document
            .getElementById("pageLoader")
            ?.classList.add("loaded");

    }, 500);

}


/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */

function getStorage(key, fallback) {

    try {

        const value = localStorage.getItem(key);

        if (!value) {
            return fallback;
        }

        return JSON.parse(value);

    } catch (error) {

        console.error("Storage error:", error);

        return fallback;

    }

}


function setStorage(key, value) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    } catch (error) {

        console.error("Could not save data:", error);

    }

}


function getInitials(name) {

    if (!name) {
        return "KG";
    }

    const words = name
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


function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(
    message,
    type = "success"
) {

    const toast =
        document.getElementById("toast");

    const messageElement =
        document.getElementById("toastMessage");

    const icon =
        document.getElementById("toastIcon");

    if (!toast || !messageElement) {
        return;
    }

    clearTimeout(toastTimer);

    messageElement.textContent =
        message;

    toast.classList.remove(
        "success",
        "error",
        "show"
    );

    toast.classList.add(type);

    icon.textContent =
        type === "success" ? "✓" : "!";

    requestAnimationFrame(function () {

        toast.classList.add("show");

    });

    toastTimer = setTimeout(function () {

        toast.classList.remove("show");

    }, 3200);

}


/* =========================================================
   LANDING PAGE
   ========================================================= */

function goHome() {

    document
        .getElementById("dashboardPage")
        ?.classList.add("hidden");

    document
        .getElementById("landingPage")
        ?.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


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


function toggleMobileNav() {

    const nav =
        document.getElementById("mobileNav");

    nav?.classList.toggle("open");

}


function closeMobileNav() {

    document
        .getElementById("mobileNav")
        ?.classList.remove("open");

}


/* =========================================================
   ROLE SELECTOR
   ========================================================= */

function openRoleSelector() {

    document
        .getElementById("roleModal")
        ?.classList.remove("hidden");

    document.body.classList.add(
        "modal-open"
    );

}


function closeRoleSelector() {

    document
        .getElementById("roleModal")
        ?.classList.add("hidden");

    document.body.classList.remove(
        "modal-open"
    );

}


function selectRole(role) {

    selectedRole = role;


    const roleText =
        document.getElementById(
            "selectedRoleText"
        );

    if (roleText) {

        roleText.textContent =
            role;

    }


    /*
     * Store the role selection temporarily.
     * This helps preserve the selection even if
     * the auth modal is reopened.
     */

    localStorage.setItem(
        "khelogramSelectedRole",
        role
    );


    closeRoleSelector();

    openAuthModal();

}


/* =========================================================
   AUTH MODAL
   ========================================================= */

function openAuthModal() {

    document
        .getElementById("authModal")
        ?.classList.remove("hidden");

    document.body.classList.add(
        "modal-open"
    );

    switchAuth("register");

}


function closeAuthModal() {

    document
        .getElementById("authModal")
        ?.classList.add("hidden");

    document.body.classList.remove(
        "modal-open"
    );

}


function switchAuth(mode) {

    authMode = mode;

    const registerTab =
        document.getElementById(
            "registerTab"
        );

    const loginTab =
        document.getElementById(
            "loginTab"
        );

    const nameField =
        document.getElementById(
            "nameField"
        );

    const title =
        document.getElementById(
            "authTitle"
        );

    const subtitle =
        document.getElementById(
            "authSubtitle"
        );

    const button =
        document.getElementById(
            "authButtonText"
        );

    const password =
        document.getElementById(
            "authPassword"
        );

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
            nameField.style.display =
                "block";
        }

        if (title) {
            title.textContent =
                "Create your account";
        }

        if (subtitle) {
            subtitle.textContent =
                "Join the KheloGram ecosystem.";
        }

        if (button) {
            button.textContent =
                "Create Account";
        }

        if (password) {
            password.placeholder =
                "Create a password";
        }

    } else {

        if (nameField) {
            nameField.style.display =
                "none";
        }

        if (title) {
            title.textContent =
                "Welcome back";
        }

        if (subtitle) {
            subtitle.textContent =
                "Login to your KheloGram dashboard.";
        }

        if (button) {
            button.textContent =
                "Login";
        }

        if (password) {
            password.placeholder =
                "Enter your password";
        }

    }

}


/* =========================================================
   AUTH FORM
   ========================================================= */
function setupAuthForm() {

    const form =
        document.getElementById("authForm");

    if (!form) {
        return;
    }

    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const name =
                document
                    .getElementById("authName")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("authEmail")
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document
                    .getElementById("authPassword")
                    .value
                    .trim();

            if (!email || !password) {

                showToast(
                    "Please enter email and password.",
                    "error"
                );

                return;
            }

            if (
                authMode === "register" &&
                !name
            ) {

                showToast(
                    "Please enter your name.",
                    "error"
                );

                return;
            }


            /* =================================================
               REGISTER
               ================================================= */

            if (authMode === "register") {

                const user = {

                    name:
                        name ||
                        "KheloGram User",

                    email: email,

                    role:
                        selectedRole,

                    createdAt:
                        new Date().toISOString()

                };


                /*
                 * Store the account separately.
                 * USER = currently logged-in session.
                 * ACCOUNT = saved account for future login.
                 */

                setStorage(
                    "khelogramAccount",
                    {
                        name: user.name,
                        email: user.email,
                        password: password,
                        role: selectedRole,
                        createdAt: user.createdAt
                    }
                );


                setStorage(
                    STORAGE_KEYS.USER,
                    user
                );


                /*
                 * Create profile only once.
                 * This means profile information survives logout.
                 */

                if (
                    !getStorage(
                        STORAGE_KEYS.PROFILE,
                        null
                    )
                ) {

                    setStorage(
                        STORAGE_KEYS.PROFILE,
                        {

                            name: name,

                            age: "",

                            village: "",

                            district: "",

                            sport: "",

                            skill: "",

                            achievements: "",

                            role: selectedRole

                        }
                    );

                } else {

                    const profile =
                        getStorage(
                            STORAGE_KEYS.PROFILE,
                            {}
                        );

                    profile.role =
                        selectedRole;

                    setStorage(
                        STORAGE_KEYS.PROFILE,
                        profile
                    );

                }


                showToast(
                    "Account created successfully!"
                );

            }


            /* =================================================
               LOGIN
               ================================================= */

            else {

                let account =
                    getStorage(
                        "khelogramAccount",
                        null
                    );

                const oldUser =
                    getStorage(
                        STORAGE_KEYS.USER,
                        null
                    );


                /*
                 * Backward compatibility:
                 *
                 * If an account was created before this
                 * new system, create an account record from
                 * the old stored user.
                 */

                if (!account && oldUser) {

                    account = {

                        name:
                            oldUser.name ||
                            "KheloGram User",

                        email:
                            oldUser.email ||
                            email,

                        password:
                            password,

                        role:
                            oldUser.role ||
                            "Athlete",

                        createdAt:
                            oldUser.createdAt ||
                            new Date().toISOString()

                    };

                    setStorage(
                        "khelogramAccount",
                        account
                    );

                }


                if (!account) {

                    showToast(
                        "No account found. Please register first.",
                        "error"
                    );

                    return;
                }


                if (
                    account.email !== email
                ) {

                    showToast(
                        "Email does not match the registered account.",
                        "error"
                    );

                    return;
                }


                /*
                 * For old prototype accounts where password
                 * did not exist, accept the first login and
                 * save the entered password.
                 */

                if (
                    account.password &&
                    account.password !== password
                ) {

                    showToast(
                        "Incorrect password.",
                        "error"
                    );

                    return;
                }


                if (!account.password) {

                    account.password =
                        password;

                }


                /*
                 * IMPORTANT FIX:
                 *
                 * The role selected immediately before login
                 * becomes the active role.
                 *
                 * Athlete -> Athlete dashboard
                 * Coach -> Coach dashboard
                 * Organizer -> Organizer dashboard
                 * Panchayat -> Panchayat dashboard
                 */

                account.role =
                    selectedRole;


                setStorage(
                    "khelogramAccount",
                    account
                );


                const user = {

                    name:
                        account.name,

                    email:
                        account.email,

                    role:
                        selectedRole,

                    createdAt:
                        account.createdAt

                };


                setStorage(
                    STORAGE_KEYS.USER,
                    user
                );


                /*
                 * Keep profile role synchronized.
                 */

                const profile =
                    getStorage(
                        STORAGE_KEYS.PROFILE,
                        {}
                    );

                profile.name =
                    profile.name ||
                    account.name;

                profile.role =
                    selectedRole;

                setStorage(
                    STORAGE_KEYS.PROFILE,
                    profile
                );


                showToast(
                    "Login successful!"
                );

            }


            /*
             * Update the header immediately before
             * opening the dashboard.
             */

            const currentUser =
                getStorage(
                    STORAGE_KEYS.USER,
                    null
                );

            if (currentUser) {

                updateUserInterface(
                    currentUser
                );

            }


            closeAuthModal();

            showDashboard();

        }
    );

}

/* =========================================================
   LOAD STORED USER
   ========================================================= */

function loadStoredUser() {

    const user =
        getStorage(
            STORAGE_KEYS.USER,
            null
        );

    if (!user) {
        return;
    }

    updateUserInterface(user);

}


function updateUserInterface(user) {

    if (!user) {
        return;
    }


    const name =
        user.name ||
        "KheloGram User";


    const role =
        user.role ||
        "Athlete";


    const initials =
        getInitials(name);


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


    const userInitials =
        document.getElementById(
            "userInitials"
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


    if (userInitials) {

        userInitials.textContent =
            initials;

    }


    /*
     * Also update the stored profile role.
     */

    const profile =
        getStorage(
            STORAGE_KEYS.PROFILE,
            null
        );

    if (profile) {

        profile.name =
            profile.name ||
            name;

        profile.role =
            role;

        setStorage(
            STORAGE_KEYS.PROFILE,
            profile
        );

    }

}

/* =========================================================
   SHOW DASHBOARD
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

    updateDashboardData();

    updateInsights();

    renderCommunity();

    renderAchievements();

    renderTournaments();

    closeMobileNav();

}


/* =========================================================
   DASHBOARD NAVIGATION
   ========================================================= */

function showDashboardSection(
    sectionName,
    clickedButton = null
) {

    const sections =
        document.querySelectorAll(
            ".dashboard-section"
        );

    sections.forEach(function(section) {

        section.classList.add(
            "hidden"
        );

    });


    const selectedSection =
        document.getElementById(
            "section-" + sectionName
        );

    if (selectedSection) {

        selectedSection.classList.remove(
            "hidden"
        );

        selectedSection.animate(
            [
                {
                    opacity: 0,
                    transform: "translateY(8px)"
                },
                {
                    opacity: 1,
                    transform: "translateY(0)"
                }
            ],
            {
                duration: 250,
                easing: "ease-out"
            }
        );

    }


    const menuItems =
        document.querySelectorAll(
            ".menu-item"
        );

    menuItems.forEach(function(item) {

        item.classList.remove(
            "active"
        );

    });


    if (clickedButton) {

        clickedButton.classList.add(
            "active"
        );

    } else {

        menuItems.forEach(function(item) {

            if (
                item
                    .getAttribute("onclick")
                    ?.includes(
                        "'" +
                        sectionName +
                        "'"
                    )
            ) {

                item.classList.add(
                    "active"
                );

            }

        });

    }


    closeSidebar();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   MOBILE SIDEBAR
   ========================================================= */

function openSidebar() {

    document
        .getElementById("sidebar")
        ?.classList.add("open");

    document
        .getElementById("sidebarOverlay")
        ?.classList.add("open");

}


function closeSidebar() {

    document
        .getElementById("sidebar")
        ?.classList.remove("open");

    document
        .getElementById("sidebarOverlay")
        ?.classList.remove("open");

}


/* =========================================================
   LOGOUT
   ========================================================= */

function logout() {

    const confirmed =
        confirm(
            "Are you sure you want to logout?"
        );

    if (!confirmed) {
        return;
    }


    /*
     * Remove ONLY the active session.
     *
     * We intentionally keep:
     * - khelogramAccount
     * - khelogramProfile
     *
     * so the user's information is available
     * when they login again.
     */

    localStorage.removeItem(
        STORAGE_KEYS.USER
    );


    /*
     * Close dashboard.
     */

    document
        .getElementById("dashboardPage")
        ?.classList.add("hidden");


    /*
     * Return to landing page.
     */

    document
        .getElementById("landingPage")
        ?.classList.remove("hidden");


    /*
     * Reset role selector to Athlete as the
     * default choice for a completely fresh
     * login selection.
     */

    selectedRole = "Athlete";


    const roleText =
        document.getElementById(
            "selectedRoleText"
        );

    if (roleText) {

        roleText.textContent =
            "Athlete";

    }


    closeSidebar();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    showToast(
        "You have been logged out."
    );

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
        function(event) {

            event.preventDefault();


            const profile = {

                name:
                    document
                        .getElementById("profileName")
                        .value
                        .trim(),

                age:
                    document
                        .getElementById("profileAge")
                        .value
                        .trim(),

                village:
                    document
                        .getElementById("profileVillage")
                        .value
                        .trim(),

                district:
                    document
                        .getElementById("profileDistrict")
                        .value
                        .trim(),

                sport:
                    document
                        .getElementById("profileSport")
                        .value,

                skill:
                    document
                        .getElementById("profileSkill")
                        .value,

                achievements:
                    document
                        .getElementById("profileAchievements")
                        .value
                        .trim()

            };


            setStorage(
                STORAGE_KEYS.PROFILE,
                profile
            );


            const user =
                getStorage(
                    STORAGE_KEYS.USER,
                    null
                );


            if (user) {

                user.name =
                    profile.name ||
                    user.name;

                setStorage(
                    STORAGE_KEYS.USER,
                    user
                );

                updateUserInterface(user);

            }


            updateDashboardData();

            updateInsights();


            showToast(
                "Sports Passport saved successfully!"
            );

        });

}


/* =========================================================
   LOAD PROFILE
   ========================================================= */

function loadProfileIntoForm() {

    const profile =
        getStorage(
            STORAGE_KEYS.PROFILE,
            null
        );

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


function setValue(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.value =
            value || "";
    }

}


/* =========================================================
   DASHBOARD DATA
   ========================================================= */

function updateDashboardData() {

    const profile =
        getStorage(
            STORAGE_KEYS.PROFILE,
            {}
        );


    const achievements =
        getStorage(
            STORAGE_KEYS.ACHIEVEMENTS,
            []
        );


    const posts =
        getStorage(
            STORAGE_KEYS.POSTS,
            defaultPosts
        );


    const user =
        getStorage(
            STORAGE_KEYS.USER,
            {}
        );


    const name =
        profile.name ||
        user.name ||
        "Athlete";


    const initials =
        getInitials(name);


    const completionFields = [

        profile.name,

        profile.age,

        profile.village,

        profile.district,

        profile.sport,

        profile.skill,

        profile.achievements

    ];


    const completed =
        completionFields.filter(
            function(value) {
                return (
                    value !== null &&
                    value !== undefined &&
                    String(value).trim() !== ""
                );
            }
        ).length;


    const completion =
        Math.round(
            completed /
            completionFields.length *
            100
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
        "coachStatus",
        getStorage(
            STORAGE_KEYS.COACH,
            null
        )
            ? "Connected"
            : "Not connected"
    );

    setText(
        "achievementCount",
        achievements.length
    );


    const progress =
        document.getElementById(
            "profileProgressBar"
        );

    if (progress) {
        progress.style.width =
            completion + "%";
    }


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


    setText(
        "profileCardSport",
        profile.sport ||
        "Sport not selected"
    );


    const location =
        [
            profile.village,
            profile.district
        ]
            .filter(Boolean)
            .join(", ");


    setText(
        "passportLocation",
        location ||
        "Add your village and district"
    );


    setText(
        "passportSport",
        profile.sport ||
        "Sport not selected"
    );


    setText(
        "profileAchievementTotal",
        achievements.length
    );


    setText(
        "profilePostTotal",
        posts.filter(function(post) {

            return (
                post.name === name
            );

        }).length
    );


    setText(
        "profileCardName",
        name
    );

}


function setText(id, text) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent =
            text;
    }

}


/* =========================================================
   COACHES
   ========================================================= */

function renderCoaches(
    data = coaches
) {

    const grid =
        document.getElementById(
            "coachGrid"
        );

    if (!grid) {
        return;
    }


    if (!data.length) {

        grid.innerHTML =
            createEmptyState(
                "🧑‍🏫",
                "No coaches found",
                "Try another search or sport."
            );

        return;

    }


    grid.innerHTML =
        data.map(function(coach) {

            return `

                <div class="coach-card">

                    <div class="coach-top">

                        <div class="coach-avatar">
                            ${escapeHTML(coach.initials)}
                        </div>

                        <div>

                            <h3>
                                ${escapeHTML(coach.name)}
                            </h3>

                            <p>
                                ${escapeHTML(coach.sport)}
                            </p>

                        </div>

                    </div>


                    <div class="coach-info">

                        <div>
                            <span>Location</span>
                            <strong>
                                ${escapeHTML(coach.location)}
                            </strong>
                        </div>

                        <div>
                            <span>Experience</span>
                            <strong>
                                ${escapeHTML(coach.experience)}
                            </strong>
                        </div>

                    </div>


                    <button
                        class="primary-btn connect-btn"
                        onclick="connectCoach(${coach.id})"
                    >
                        Connect
                    </button>

                </div>

            `;

        }).join("");

}


function filterCoaches() {

    const search =
        (
            document
                .getElementById("coachSearch")
                ?.value ||
            ""
        )
            .toLowerCase()
            .trim();


    const sport =
        document
            .getElementById("coachSportFilter")
            ?.value ||
        "";


    const filtered =
        coaches.filter(function(coach) {

            const matchesSearch =
                !search ||
                coach.name
                    .toLowerCase()
                    .includes(search) ||
                coach.sport
                    .toLowerCase()
                    .includes(search) ||
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

        });


    renderCoaches(filtered);

}


function connectCoach(id) {

    const coach =
        coaches.find(function(item) {

            return item.id === id;

        });


    if (!coach) {
        return;
    }


    setStorage(
        STORAGE_KEYS.COACH,
        coach
    );


    updateDashboardData();


    showToast(
        "Connected with " +
        coach.name +
        "!"
    );

}


/* =========================================================
   GROUNDS
   ========================================================= */

function renderGrounds(
    data = grounds
) {

    const grid =
        document.getElementById(
            "groundGrid"
        );

    if (!grid) {
        return;
    }


    setText(
        "groundCount",
        data.length
    );


    if (!data.length) {

        grid.innerHTML =
            createEmptyState(
                "🏟️",
                "No grounds found",
                "Try changing the filters."
            );

        return;

    }


    grid.innerHTML =
        data.map(function(ground) {

            const statusClass =
                ground.status
                    .toLowerCase()
                    .replace(
                        " ",
                        "-"
                    );


            return `

                <div class="ground-card">

                    <div class="ground-card-top">

                        <div class="ground-icon">
                            ${ground.icon}
                        </div>

                        <span
                            class="
                                status-badge
                                status-${statusClass}
                            "
                        >
                            ${escapeHTML(ground.status)}
                        </span>

                    </div>


                    <h3>
                        ${escapeHTML(ground.name)}
                    </h3>

                    <p>
                        ${escapeHTML(ground.village)},
                        ${escapeHTML(ground.district)}
                    </p>


                    <div class="ground-details">

                        <div>
                            <span>Sport</span>
                            <strong>
                                ${escapeHTML(ground.sport)}
                            </strong>
                        </div>

                        <div>
                            <span>Capacity</span>
                            <strong>
                                ${ground.capacity}
                            </strong>
                        </div>

                        <div>
                            <span>Facility</span>
                            <strong>
                                ${escapeHTML(ground.facility)}
                            </strong>
                        </div>

                        <div>
                            <span>Condition</span>
                            <strong>
                                ${escapeHTML(ground.condition)}
                            </strong>
                        </div>

                    </div>

                </div>

            `;

        }).join("");

}


function filterGrounds() {

    const search =
        (
            document
                .getElementById("groundSearch")
                ?.value ||
            ""
        )
            .toLowerCase()
            .trim();


    const district =
        document
            .getElementById(
                "groundDistrictFilter"
            )
            ?.value ||
        "";


    const sport =
        document
            .getElementById(
                "groundSportFilter"
            )
            ?.value ||
        "";


    const filtered =
        grounds.filter(function(ground) {

            const text =
                (
                    ground.name +
                    " " +
                    ground.village +
                    " " +
                    ground.district
                )
                    .toLowerCase();


            return (

                (!search ||
                    text.includes(search)) &&

                (!district ||
                    ground.district === district) &&

                (!sport ||
                    ground.sport === sport)

            );

        });


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
        (
            document
                .getElementById(
                    "tournamentSearch"
                )
                ?.value ||
            ""
        )
            .toLowerCase()
            .trim();


    const sport =
        document
            .getElementById(
                "tournamentSportFilter"
            )
            ?.value ||
        "";


    const filtered =
        tournaments.filter(
            function(tournament) {

                const text =
                    (
                        tournament.name +
                        " " +
                        tournament.sport +
                        " " +
                        tournament.district
                    )
                        .toLowerCase();


                return (

                    (!search ||
                        text.includes(search)) &&

                    (!sport ||
                        tournament.sport === sport)

                );

            }
        );


    const registrations =
        getStorage(
            STORAGE_KEYS.TOURNAMENTS,
            []
        );


    setText(
        "registeredTournamentCount",
        registrations.length
    );


    if (!filtered.length) {

        grid.innerHTML =
            createEmptyState(
                "🏆",
                "No tournaments found",
                "Try another search."
            );

        return;

    }


    grid.innerHTML =
        filtered.map(
            function(tournament) {

                const registered =
                    registrations.includes(
                        tournament.id
                    );


                const spots =
                    tournament.capacity -
                    tournament.participants;


                return `

                    <div class="tournament-card">

                        <div class="tournament-card-top">

                            <div class="tournament-icon">
                                ${tournament.icon}
                            </div>

                            <span class="tournament-category">
                                ${escapeHTML(tournament.category)}
                            </span>

                        </div>


                        ${
                            registered
                                ? `
                                    <span class="registered-label">
                                        ✓ Registered
                                    </span>
                                  `
                                : ""
                        }


                        <h3>
                            ${escapeHTML(tournament.name)}
                        </h3>

                        <p>
                            ${escapeHTML(tournament.description)}
                        </p>


                        <div class="tournament-meta">

                            <div>
                                <span>Sport</span>
                                <strong>
                                    ${escapeHTML(tournament.sport)}
                                </strong>
                            </div>

                            <div>
                                <span>Venue</span>
                                <strong>
                                    ${escapeHTML(tournament.venue)}
                                </strong>
                            </div>

                            <div>
                                <span>Date</span>
                                <strong>
                                    ${formatDate(tournament.startDate)}
                                </strong>
                            </div>

                            <div>
                                <span>Available spots</span>
                                <strong>
                                    ${spots}
                                </strong>
                            </div>

                        </div>


                        <div class="tournament-actions">

                            <button
                                class="secondary-btn"
                                onclick="
                                    openTournamentModal(
                                        '${tournament.id}'
                                    )
                                "
                            >
                                Details
                            </button>


                            <button
                                class="primary-btn"
                                ${
                                    registered
                                        ? "disabled"
                                        : ""
                                }
                                onclick="
                                    registerTournament(
                                        '${tournament.id}'
                                    )
                                "
                            >
                                ${
                                    registered
                                        ? "Registered"
                                        : "Register"
                                }
                            </button>

                        </div>

                    </div>

                `;

            }
        ).join("");

}


function initializeTournamentSection() {

    renderTournaments();

}


function registerTournament(id) {

    const tournament =
        tournaments.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!tournament) {
        return;
    }


    let registrations =
        getStorage(
            STORAGE_KEYS.TOURNAMENTS,
            []
        );


    if (
        registrations.includes(id)
    ) {

        showToast(
            "You are already registered.",
            "error"
        );

        return;

    }


    if (
        tournament.participants >=
        tournament.capacity
    ) {

        showToast(
            "This tournament is full.",
            "error"
        );

        return;

    }


    registrations.push(id);


    setStorage(
        STORAGE_KEYS.TOURNAMENTS,
        registrations
    );


    renderTournaments();


    showToast(
        "Tournament registration successful!"
    );

}


function openTournamentModal(id) {

    const tournament =
        tournaments.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!tournament) {
        return;
    }


    currentTournamentId =
        id;


    const registrations =
        getStorage(
            STORAGE_KEYS.TOURNAMENTS,
            []
        );


    const registered =
        registrations.includes(id);


    const details =
        document.getElementById(
            "tournamentDetails"
        );


    if (!details) {
        return;
    }


    details.innerHTML = `

        <div class="detail-hero">

            <div class="detail-hero-icon">
                ${tournament.icon}
            </div>

            <h2>
                ${escapeHTML(tournament.name)}
            </h2>

            <p>
                ${escapeHTML(tournament.description)}
            </p>

        </div>


        <div class="detail-info-grid">

            <div class="detail-info">
                <small>SPORT</small>
                <strong>
                    ${escapeHTML(tournament.sport)}
                </strong>
            </div>

            <div class="detail-info">
                <small>CATEGORY</small>
                <strong>
                    ${escapeHTML(tournament.category)}
                </strong>
            </div>

            <div class="detail-info">
                <small>DATE</small>
                <strong>
                    ${formatDate(tournament.startDate)}
                    -
                    ${formatDate(tournament.endDate)}
                </strong>
            </div>

            <div class="detail-info">
                <small>REGISTRATION DEADLINE</small>
                <strong>
                    ${formatDate(tournament.registrationDeadline)}
                </strong>
            </div>

            <div class="detail-info">
                <small>VENUE</small>
                <strong>
                    ${escapeHTML(tournament.venue)}
                </strong>
            </div>

            <div class="detail-info">
                <small>ENTRY FEE</small>
                <strong>
                    ${escapeHTML(tournament.entryFee)}
                </strong>
            </div>

            <div class="detail-info">
                <small>ORGANIZER</small>
                <strong>
                    ${escapeHTML(tournament.organizer)}
                </strong>
            </div>

            <div class="detail-info">
                <small>PRIZE</small>
                <strong>
                    ${escapeHTML(tournament.prize)}
                </strong>
            </div>

        </div>


        <button
            class="primary-btn"
            style="width:100%;"
            ${
                registered
                    ? "disabled"
                    : ""
            }
            onclick="
                registerTournament('${tournament.id}');
                closeTournamentModal();
            "
        >
            ${
                registered
                    ? "Already Registered"
                    : "Register for Tournament"
            }
        </button>

    `;


    document
        .getElementById(
            "tournamentModal"
        )
        ?.classList.remove("hidden");

    document.body.classList.add(
        "modal-open"
    );

}


function closeTournamentModal() {

    document
        .getElementById(
            "tournamentModal"
        )
        ?.classList.add("hidden");

    document.body.classList.remove(
        "modal-open"
    );

}


function formatDate(dateString) {

    if (!dateString) {
        return "-";
    }

    const date =
        new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return dateString;
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


/* =========================================================
   COMMUNITY
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
        function(event) {

            event.preventDefault();


            const title =
                document
                    .getElementById(
                        "postTitle"
                    )
                    .value
                    .trim();


            const sport =
                document
                    .getElementById(
                        "postSport"
                    )
                    .value;


            const content =
                document
                    .getElementById(
                        "postContent"
                    )
                    .value
                    .trim();


            if (!title || !content) {

                showToast(
                    "Please enter a title and story.",
                    "error"
                );

                return;

            }


            const user =
                getStorage(
                    STORAGE_KEYS.USER,
                    {}
                );


            const profile =
                getStorage(
                    STORAGE_KEYS.PROFILE,
                    {}
                );


            const posts =
                getStorage(
                    STORAGE_KEYS.POSTS,
                    defaultPosts
                );


            const post = {

                id:
                    "P" +
                    Date.now(),

                name:
                    profile.name ||
                    user.name ||
                    "KheloGram User",

                role:
                    user.role ||
                    "Athlete",

                sport:
                    sport ||
                    profile.sport ||
                    "Sports",

                title:
                    title,

                content:
                    content,

                createdAt:
                    new Date().toISOString(),

                likes:
                    0

            };


            posts.unshift(post);


            setStorage(
                STORAGE_KEYS.POSTS,
                posts
            );


            form.reset();

            closePostModal();

            renderCommunity();

            updateDashboardData();


            showToast(
                "Your post was published successfully!"
            );

        });

}


function getPosts() {

    const stored =
        localStorage.getItem(
            STORAGE_KEYS.POSTS
        );


    if (!stored) {

        setStorage(
            STORAGE_KEYS.POSTS,
            defaultPosts
        );

        return defaultPosts;

    }


    return getStorage(
        STORAGE_KEYS.POSTS,
        defaultPosts
    );

}


function renderCommunity() {

    const feed =
        document.getElementById(
            "communityFeed"
        );

    if (!feed) {
        return;
    }


    const posts =
        getPosts();


    const search =
        (
            document
                .getElementById(
                    "communitySearch"
                )
                ?.value ||
            ""
        )
            .toLowerCase()
            .trim();


    const sport =
        document
            .getElementById(
                "communitySportFilter"
            )
            ?.value ||
        "";


    const filtered =
        posts.filter(
            function(post) {

                const text =
                    (
                        post.title +
                        " " +
                        post.content +
                        " " +
                        post.name
                    )
                        .toLowerCase();


                return (

                    (!search ||
                        text.includes(search)) &&

                    (!sport ||
                        post.sport === sport)

                );

            }
        );


    const likes =
        filtered.reduce(
            function(total, post) {

                return total +
                    Number(post.likes || 0);

            },
            0
        );


    setText(
        "communityPostCount",
        posts.length
    );

    setText(
        "communityLikeCount",
        likes
    );


    if (!filtered.length) {

        feed.innerHTML =
            createEmptyState(
                "📰",
                "No posts found",
                "Be the first person to share a sports story."
            );

        return;

    }


    feed.innerHTML =
        filtered.map(
            function(post) {

                const initials =
                    getInitials(
                        post.name
                    );


                return `

                    <article
                        class="post-card"
                    >

                        <div
                            class="post-header"
                        >

                            <div
                                class="post-avatar"
                            >
                                ${escapeHTML(initials)}
                            </div>


                            <div
                                class="post-author"
                            >

                                <strong>
                                    ${escapeHTML(post.name)}
                                </strong>

                                <small>
                                    ${escapeHTML(post.role)}
                                    •
                                    ${formatRelativeTime(
                                        post.createdAt
                                    )}
                                </small>

                            </div>


                            <span
                                class="post-sport"
                            >
                                ${escapeHTML(
                                    post.sport ||
                                    "Sports"
                                )}
                            </span>

                        </div>


                        <h3>
                            ${escapeHTML(post.title)}
                        </h3>


                        <p>
                            ${escapeHTML(post.content)}
                        </p>


                        <div
                            class="post-footer"
                        >

                            <button
                                class="post-action"
                                onclick="
                                    likePost(
                                        '${post.id}'
                                    )
                                "
                            >
                                <i class="fa-regular fa-heart"></i>
                                ${post.likes || 0}
                            </button>


                            <button
                                class="post-action"
                                onclick="
                                    sharePost(
                                        '${post.id}'
                                    )
                                "
                            >
                                <i class="fa-solid fa-share"></i>
                                Share
                            </button>

                        </div>

                    </article>

                `;

            }
        ).join("");

}


function likePost(id) {

    const posts =
        getPosts();


    const post =
        posts.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!post) {
        return;
    }


    post.likes =
        Number(post.likes || 0) +
        1;


    setStorage(
        STORAGE_KEYS.POSTS,
        posts
    );


    renderCommunity();


    showToast(
        "Post liked!"
    );

}


function sharePost(id) {

    const posts =
        getPosts();


    const post =
        posts.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!post) {
        return;
    }


    const text =
        post.title +
        " - " +
        post.content;


    if (
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {

        navigator.clipboard
            .writeText(text)
            .then(function() {

                showToast(
                    "Post copied to clipboard!"
                );

            })
            .catch(function() {

                showToast(
                    "Unable to copy post.",
                    "error"
                );

            });

    } else {

        showToast(
            "Sharing is not available in this browser.",
            "error"
        );

    }

}


function formatRelativeTime(dateString) {

    const date =
        new Date(dateString);

    const now =
        new Date();


    const seconds =
        Math.floor(
            (now - date) / 1000
        );


    if (seconds < 60) {
        return "just now";
    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    if (minutes < 60) {
        return minutes + "m ago";
    }


    const hours =
        Math.floor(
            minutes / 60
        );


    if (hours < 24) {
        return hours + "h ago";
    }


    const days =
        Math.floor(
            hours / 24
        );


    return days + "d ago";

}


/* =========================================================
   COMMUNITY MODAL
   ========================================================= */

function openPostModal() {

    document
        .getElementById(
            "postModal"
        )
        ?.classList.remove("hidden");

    document.body.classList.add(
        "modal-open"
    );

}


function closePostModal() {

    document
        .getElementById(
            "postModal"
        )
        ?.classList.add("hidden");

    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   ACHIEVEMENTS
   ========================================================= */

function setupAchievementForm() {

    const form =
        document.getElementById(
            "achievementForm"
        );

    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const title =
                document
                    .getElementById(
                        "achievementTitle"
                    )
                    .value
                    .trim();


            const sport =
                document
                    .getElementById(
                        "achievementSport"
                    )
                    .value;


            const date =
                document
                    .getElementById(
                        "achievementDate"
                    )
                    .value;


            const description =
                document
                    .getElementById(
                        "achievementDescription"
                    )
                    .value
                    .trim();


            if (!title || !date) {

                showToast(
                    "Please enter title and date.",
                    "error"
                );

                return;

            }


            const achievements =
                getStorage(
                    STORAGE_KEYS.ACHIEVEMENTS,
                    []
                );


            achievements.unshift({

                id:
                    "A" +
                    Date.now(),

                title:
                    title,

                sport:
                    sport ||
                    "Sports",

                date:
                    date,

                description:
                    description

            });


            setStorage(
                STORAGE_KEYS.ACHIEVEMENTS,
                achievements
            );


            form.reset();

            closeAchievementModal();

            renderAchievements();

            updateDashboardData();

            updateInsights();


            showToast(
                "Achievement added successfully!"
            );

        });

}


function renderAchievements() {

    const grid =
        document.getElementById(
            "achievementGrid"
        );

    if (!grid) {
        return;
    }


    const achievements =
        getStorage(
            STORAGE_KEYS.ACHIEVEMENTS,
            []
        );


    setText(
        "achievementHeroCount",
        achievements.length
    );


    if (!achievements.length) {

        grid.innerHTML =
            createEmptyState(
                "🏆",
                "No achievements yet",
                "Add your first sports achievement."
            );

        return;

    }


    grid.innerHTML =
        achievements.map(
            function(item) {

                return `

                    <div class="achievement-card">

                        <div class="achievement-card-icon">
                            🏆
                        </div>

                        <h3>
                            ${escapeHTML(item.title)}
                        </h3>

                        <p>
                            ${escapeHTML(
                                item.description ||
                                "Sports achievement"
                            )}
                        </p>

                        <div
                            class="achievement-date"
                        >
                            ${escapeHTML(
                                item.sport ||
                                "Sports"
                            )}
                            •
                            ${formatDate(
                                item.date
                            )}
                        </div>

                    </div>

                `;

            }
        ).join("");

}


function openAchievementModal() {

    document
        .getElementById(
            "achievementModal"
        )
        ?.classList.remove("hidden");

    document.body.classList.add(
        "modal-open"
    );


    const dateInput =
        document.getElementById(
            "achievementDate"
        );


    if (
        dateInput &&
        !dateInput.value
    ) {

        dateInput.value =
            new Date()
                .toISOString()
                .split("T")[0];

    }

}


function closeAchievementModal() {

    document
        .getElementById(
            "achievementModal"
        )
        ?.classList.add("hidden");

    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   AI TALENT INSIGHTS
   ========================================================= */

function calculateTalentScore() {

    const profile =
        getStorage(
            STORAGE_KEYS.PROFILE,
            {}
        );


    const achievements =
        getStorage(
            STORAGE_KEYS.ACHIEVEMENTS,
            []
        );


    let profileScore = 0;


    if (profile.name) {
        profileScore += 10;
    }

    if (profile.age) {
        profileScore += 5;
    }

    if (profile.village) {
        profileScore += 5;
    }

    if (profile.district) {
        profileScore += 5;
    }

    if (profile.sport) {
        profileScore += 10;
    }

    if (profile.skill) {
        profileScore += 5;
    }


    const participationScore =
        Math.min(
            achievements.length * 5,
            25
        );


    const achievementScore =
        Math.min(
            achievements.length * 8,
            35
        );


    return Math.min(
        100,
        profileScore +
        participationScore +
        achievementScore
    );

}


function updateInsights() {

    const score =
        calculateTalentScore();


    const profile =
        getStorage(
            STORAGE_KEYS.PROFILE,
            {}
        );


    const achievements =
        getStorage(
            STORAGE_KEYS.ACHIEVEMENTS,
            []
        );


    let level =
        "Profile Incomplete";


    let description =
        "Add more information to generate a stronger prototype signal.";


    let performance =
        "Developing";


    let performanceText =
        "Complete your sports profile to improve this demo signal.";


    let potential =
        "Emerging";


    let potentialText =
        "Consistent participation can strengthen your talent signal.";


    let action =
        "Build your profile";


    let actionText =
        "Add sport, skill level and achievements.";


    if (score >= 80) {

        level =
            "High Potential Signal";

        description =
            "Your available profile and achievement data show a strong prototype signal.";

        performance =
            "Strong";

        performanceText =
            "Your available data shows good sports engagement.";

        potential =
            "High";

        potentialText =
            "Your current data suggests a promising grassroots signal.";

        action =
            "Connect with a coach";

        actionText =
            "Use your profile to connect with sport-specific coaching.";

    } else if (score >= 50) {

        level =
            "Developing Potential";

        description =
            "Your profile contains useful signals, but more participation data can improve confidence.";

        performance =
            "Growing";

        performanceText =
            "Your sports journey is showing positive development.";

        potential =
            "Promising";

        potentialText =
            "More competitions and achievements can strengthen your signal.";

        action =
            "Compete more";

        actionText =
            "Register for tournaments and record your results.";

    }


    if (!profile.sport) {

        level =
            "Profile Incomplete";

        action =
            "Select a sport";

        actionText =
            "Choose your primary sport in Sports Passport.";

    }


    setText(
        "aiSummary",
        profile.sport
            ? "AI prototype analysis for " +
              profile.sport +
              " based on your current KheloGram data."
            : "Complete your sports profile to generate a personalized talent profile."
    );


    setText(
        "aiInsightDescription",
        description
    );


    setText(
        "performanceSignal",
        performance
    );

    setText(
        "performanceText",
        performanceText
    );


    setText(
        "talentPotential",
        potential
    );

    setText(
        "talentPotentialText",
        potentialText
    );


    setText(
        "recommendedAction",
        action
    );

    setText(
        "recommendedActionText",
        actionText
    );


    setText(
        "talentScore",
        score
    );


    setText(
        "talentScoreBadge",
        "Score: " +
        score
    );


    setText(
        "talentLevel",
        level
    );


    setText(
        "talentLevelText",
        description
    );


    const circle =
        document.querySelector(
            ".talent-score-circle"
        );


    if (circle) {

        circle.style.background =
            `
            conic-gradient(
                var(--blue)
                0deg
                ${score * 3.6}deg,
                #e8edf5
                ${score * 3.6}deg
                360deg
            )
            `;

    }


    const profileSignal =
        document.getElementById(
            "signalProfile"
        );


    const participationSignal =
        document.getElementById(
            "signalParticipation"
        );


    const achievementSignal =
        document.getElementById(
            "signalAchievements"
        );


    if (profileSignal) {

        const profileFields = [

            profile.name,
            profile.age,
            profile.village,
            profile.district,
            profile.sport,
            profile.skill

        ];


        const completed =
            profileFields.filter(
                Boolean
            ).length;


        profileSignal.style.width =
            (
                completed /
                profileFields.length *
                100
            ) + "%";

    }


    if (participationSignal) {

        const value =
            Math.min(
                achievements.length * 12,
                100
            );

        participationSignal.style.width =
            value + "%";

    }


    if (achievementSignal) {

        const value =
            Math.min(
                achievements.length * 15,
                100
            );

        achievementSignal.style.width =
            value + "%";

    }

}


/* =========================================================
   SPORTS INTELLIGENCE
   ========================================================= */

function renderSportsIntelligence() {

    /*
        This section intentionally uses demo data.

        In a future backend version,
        these numbers will come from:
        athletes
        grounds
        tournaments
        participation
        results
    */

    console.log(
        "KheloGram Sports Intelligence loaded."
    );

}


/* =========================================================
   EMPTY STATE
   ========================================================= */

function createEmptyState(
    icon,
    title,
    message
) {

    return `

        <div class="empty-state">

            <div class="empty-state-icon">
                ${icon}
            </div>

            <h3>
                ${escapeHTML(title)}
            </h3>

            <p>
                ${escapeHTML(message)}
            </p>

        </div>

    `;

}


/* =========================================================
   MODAL KEYBOARD SUPPORT
   ========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        closeRoleSelector();

        closeAuthModal();

        closePostModal();

        closeAchievementModal();

        closeTournamentModal();

        closeSidebar();

    }
);


/* =========================================================
   CLICK OUTSIDE SUPPORT
   ========================================================= */

document.addEventListener(
    "click",
    function(event) {

        const mobileNav =
            document.getElementById(
                "mobileNav"
            );


        const menuButton =
            document.querySelector(
                ".mobile-menu-btn"
            );


        if (
            mobileNav &&
            mobileNav.classList.contains(
                "open"
            ) &&
            !mobileNav.contains(event.target) &&
            !menuButton?.contains(event.target)
        ) {

            closeMobileNav();

        }

    }
);


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function setupScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            function(element) {

                element.style.opacity =
                    "1";

                element.style.transform =
                    "translateY(0)";

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            function(entries) {

                entries.forEach(
                    function(entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0)";

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(
        function(element) {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   FAVICON FALLBACK
   =========================================================

   This creates a small SVG favicon dynamically.

   This fixes the previous:
   /favicon.ico 404

   without requiring another file.
   ========================================================= */

function createFavicon() {

    const existing =
        document.querySelector(
            'link[rel="icon"]'
        );


    if (existing) {
        return;
    }


    const svg =
        `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
        >
            <rect
                width="64"
                height="64"
                rx="16"
                fill="#0b1f3a"
            />

            <text
                x="32"
                y="40"
                text-anchor="middle"
                font-family="Arial"
                font-size="23"
                font-weight="800"
                fill="white"
            >
                KG
            </text>
        </svg>
        `;


    const link =
        document.createElement(
            "link"
        );


    link.rel =
        "icon";

    link.href =
        "data:image/svg+xml," +
        encodeURIComponent(svg);


    document.head.appendChild(
        link
    );

}


createFavicon();


/* =========================================================
   FINAL CONSOLE MESSAGE
   ========================================================= */

console.log(
    "%cKheloGram Stage 8 loaded successfully.",
    "font-size:16px;font-weight:bold;color:#1457d9;"
);

console.log(
    "Responsive UI + Community + Achievements + AI Talent + Sports Intelligence are active."
);
