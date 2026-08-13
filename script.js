/* =========================================================
   KHELOGRAM - STAGE 3.3
   User Session + Role + Dashboard Logic
   ========================================================= */

console.log("KheloGram loaded successfully.");
console.log("Stage 3.3 JavaScript is running.");


/* =========================================================
   1. ROLE INFORMATION
   ========================================================= */

const roleMap = {
    athlete: "Athlete",
    coach: "Coach",
    "gram-panchayat": "Gram Panchayat",
    organizer: "Organizer",
    authority: "Authority"
};

const roleDescriptions = {
    athlete: "Track your sports journey",
    coach: "Develop sporting talent",
    "gram-panchayat": "Manage sports infrastructure",
    organizer: "Manage tournaments",
    authority: "Monitor sports ecosystem"
};

let selectedRole = null;


/* =========================================================
   2. GET USER FROM LOCAL STORAGE
   ========================================================= */

function getUser() {
    const savedUser = localStorage.getItem("khelogramUser");

    if (!savedUser) {
        return null;
    }

    try {
        return JSON.parse(savedUser);
    } catch (error) {
        console.error("Could not read saved user.");
        return null;
    }
}


/* =========================================================
   3. SAVE USER
   ========================================================= */

function saveUser(name, email, password, role) {

    const user = {
        name: name,
        email: email,
        password: password,
        role: role,
        createdAt: new Date().toISOString()
    };

    localStorage.setItem(
        "khelogramUser",
        JSON.stringify(user)
    );

    console.log("User saved successfully.");
}


/* =========================================================
   4. LOGOUT
   ========================================================= */

function logout() {

    localStorage.removeItem("khelogramUser");

    selectedRole = null;

    closeAllModals();

    alert("You have been logged out.");

    window.location.reload();
}


/* =========================================================
   5. CLOSE ALL MODALS
   ========================================================= */

function closeAllModals() {

    const modals = document.querySelectorAll(
        ".modal, .overlay, [class*='modal']"
    );

    modals.forEach(function(modal) {
        if (modal.style) {
            modal.style.display = "none";
        }
    });

    document.body.classList.remove("modal-open");
}


/* =========================================================
   6. ROLE SELECTOR
   ========================================================= */

function openRoleSelector() {

    const roleModal = document.getElementById("roleModal");

    if (roleModal) {
        roleModal.style.display = "flex";
    }

    document.body.classList.add("modal-open");

    console.log("Role selector opened.");
}


function closeRoleSelector() {

    const roleModal = document.getElementById("roleModal");

    if (roleModal) {
        roleModal.style.display = "none";
    }

    document.body.classList.remove("modal-open");
}


function selectRole(role) {

    selectedRole = role;

    console.log("Selected role:", roleMap[role] || role);

    closeRoleSelector();

    openAuthModal();
}


/* =========================================================
   7. AUTH MODAL
   ========================================================= */

function openAuthModal() {

    const authModal = document.getElementById("authModal");

    if (authModal) {
        authModal.style.display = "flex";
    }

    document.body.classList.add("modal-open");

    updateAuthRoleText();
}


function closeAuthModal() {

    const authModal = document.getElementById("authModal");

    if (authModal) {
        authModal.style.display = "none";
    }

    document.body.classList.remove("modal-open");
}


function updateAuthRoleText() {

    const roleText = document.querySelector(
        "[data-selected-role]"
    );

    if (roleText && selectedRole) {
        roleText.textContent =
            roleMap[selectedRole] || selectedRole;
    }
}


/* =========================================================
   8. REGISTRATION
   ========================================================= */

function registerUser() {

    const nameInput =
        document.getElementById("registerName");

    const emailInput =
        document.getElementById("registerEmail");

    const passwordInput =
        document.getElementById("registerPassword");

    if (!nameInput || !emailInput || !passwordInput) {

        console.warn(
            "Registration input IDs were not found."
        );

        return false;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return false;
    }

    if (email === "") {
        alert("Please enter your email.");
        return false;
    }

    if (password === "") {
        alert("Please create a password.");
        return false;
    }

    if (!selectedRole) {
        alert("Please select your role first.");
        return false;
    }

    saveUser(
        name,
        email,
        password,
        selectedRole
    );

    alert(
        "Account created successfully!\n\n" +
        "Welcome to KheloGram, " + name + "!"
    );

    closeAuthModal();

    showDashboard();

    return false;
}


/* =========================================================
   9. LOGIN
   ========================================================= */

function loginUser() {

    const emailInput =
        document.getElementById("loginEmail");

    const passwordInput =
        document.getElementById("loginPassword");

    if (!emailInput || !passwordInput) {

        console.warn(
            "Login input IDs were not found."
        );

        return false;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const user = getUser();

    if (!user) {

        alert(
            "No KheloGram account found.\n\n" +
            "Please register first."
        );

        return false;
    }

    if (
        email === user.email &&
        password === user.password
    ) {

        selectedRole = user.role;

        alert(
            "Login successful!\n\n" +
            "Welcome back, " + user.name + "!"
        );

        closeAuthModal();

        showDashboard();

    } else {

        alert(
            "Incorrect email or password."
        );
    }

    return false;
}


/* =========================================================
   10. SHOW DASHBOARD
   ========================================================= */

function showDashboard() {

    const user = getUser();

    if (!user) {
        console.log("No logged-in user.");
        return;
    }

    console.log(
        "Opening dashboard for:",
        user.name,
        user.role
    );

    /*
       If your HTML already contains a dashboard,
       these elements will be updated.
    */

    const nameElements =
        document.querySelectorAll(
            "[data-user-name]"
        );

    nameElements.forEach(function(element) {
        element.textContent = user.name;
    });


    const roleElements =
        document.querySelectorAll(
            "[data-user-role]"
        );

    roleElements.forEach(function(element) {

        element.textContent =
            roleMap[user.role] || user.role;
    });


    /*
       Update normal text containing
       "Welcome back"
    */

    const allElements =
        document.querySelectorAll("h1, h2, h3, p");

    allElements.forEach(function(element) {

        if (
            element.textContent.includes(
                "Welcome back"
            )
        ) {

            element.textContent =
                "Welcome back, " +
                user.name +
                " 👋";
        }
    });
}


/* =========================================================
   11. UPDATE USER INFORMATION
   ========================================================= */

function updateUserName(newName) {

    const user = getUser();

    if (!user) {
        return;
    }

    user.name = newName;

    localStorage.setItem(
        "khelogramUser",
        JSON.stringify(user)
    );

    showDashboard();
}


/* =========================================================
   12. NAVIGATION
   ========================================================= */

function scrollToSection(sectionId) {

    const section =
        document.getElementById(sectionId);

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
   13. GET STARTED BUTTONS
   ========================================================= */

function setupGetStartedButtons() {

    const buttons =
        document.querySelectorAll(
            ".get-started, [data-get-started]"
        );

    buttons.forEach(function(button) {

        button.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                const user = getUser();

                if (user) {

                    showDashboard();

                } else {

                    openRoleSelector();
                }
            }
        );
    });
}


/* =========================================================
   14. LOGOUT BUTTONS
   ========================================================= */

function setupLogoutButtons() {

    const buttons =
        document.querySelectorAll(
            ".logout, [data-logout]"
        );

    buttons.forEach(function(button) {

        button.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                logout();
            }
        );
    });
}


/* =========================================================
   15. ROLE CARDS
   ========================================================= */

function setupRoleCards() {

    const roleCards =
        document.querySelectorAll(
            "[data-role]"
        );

    roleCards.forEach(function(card) {

        card.addEventListener(
            "click",
            function() {

                const role =
                    card.getAttribute(
                        "data-role"
                    );

                if (role) {
                    selectRole(role);
                }
            }
        );
    });
}


/* =========================================================
   16. CLOSE MODAL WHEN CLICKING OUTSIDE
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
   17. ESCAPE KEY
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
   18. INITIALIZE WEBSITE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "KheloGram Stage 3.3 initialized."
        );

        setupGetStartedButtons();

        setupLogoutButtons();

        setupRoleCards();

        const user = getUser();

        if (user) {

            selectedRole = user.role;

            console.log(
                "Saved user found:",
                user.name
            );

            showDashboard();
        }

    }
);


/* =========================================================
   19. MAKE FUNCTIONS AVAILABLE TO HTML
   ========================================================= */

window.openRoleSelector = openRoleSelector;
window.closeRoleSelector = closeRoleSelector;

window.selectRole = selectRole;

window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;

window.registerUser = registerUser;
window.loginUser = loginUser;

window.logout = logout;

window.showDashboard = showDashboard;

window.scrollToSection = scrollToSection;

console.log(
    "Stage 3.3 JavaScript ready."
);
