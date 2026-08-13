/* =========================================================
   KHELOGRAM - MAIN JAVASCRIPT
   Stage 3.2 - Clean Version
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       BASIC HELPERS
       ===================================================== */

    function getElement(id) {
        return document.getElementById(id);
    }

    function showElement(element) {
        if (element) {
            element.classList.add("active");
        }
    }

    function hideElement(element) {
        if (element) {
            element.classList.remove("active");
        }
    }

    function lockBody() {
        document.body.style.overflow = "hidden";
    }

    function unlockBody() {
        document.body.style.overflow = "";
    }


    /* =====================================================
       ROLE SELECTION
       ===================================================== */

    let selectedRole = null;

    const roleModal =
        getElement("roleModal") ||
        getElement("roleSelector") ||
        getElement("role-modal");

    const authModal =
        getElement("authModal") ||
        getElement("auth-modal");

    /*
       Opens the role selection popup.
       This function is also available globally because
       some buttons in index.html may use onclick.
    */
    window.openRoleSelector = function () {

        const modal =
            getElement("roleModal") ||
            getElement("roleSelector") ||
            getElement("role-modal");

        if (!modal) {
            console.warn("Role selection modal was not found.");
            return;
        }

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    };


    /*
       Older HTML may call openRoleModal().
       Keep it working.
    */
    window.openRoleModal = function () {
        window.openRoleSelector();
    };


    /*
       Close role selection.
    */
    window.closeRoleSelector = function () {

        const modal =
            getElement("roleModal") ||
            getElement("roleSelector") ||
            getElement("role-modal");

        if (modal) {
            modal.classList.remove("active");
        }

        unlockBody();
    };


    window.closeRoleModal = function () {
        window.closeRoleSelector();
    };


    /*
       Close modal when clicking outside it.
    */
    window.closeModalOutside = function (event) {

        const modal =
            getElement("roleModal") ||
            getElement("roleSelector") ||
            getElement("role-modal");

        if (modal && event.target === modal) {
            window.closeRoleSelector();
        }
    };


    /* =====================================================
       ROLE SELECTION
       ===================================================== */

    window.selectRole = function (role) {

        selectedRole = role;

        console.log("Selected role:", role);

        window.closeRoleSelector();

        /*
           Open authentication screen after selecting role.
        */
        if (typeof window.openAuthModal === "function") {
            window.openAuthModal(role);
        } else if (authModal) {
            authModal.classList.add("active");
            document.body.style.overflow = "hidden";
        }

        /*
           Update role text if the HTML contains it.
        */
        const roleTextElements =
            document.querySelectorAll("[data-selected-role]");

        roleTextElements.forEach(function (element) {
            element.textContent = formatRoleName(role);
        });
    };


    function formatRoleName(role) {

        if (!role) {
            return "";
        }

        const roleMap = {
            athlete: "Athlete",
            coach: "Coach",
            panchayat: "Gram Panchayat",
            "gram-panchayat": "Gram Panchayat",
            organizer: "Organizer",
            authority: "Authority"
        };

        return roleMap[role] || role;
    }


    /* =====================================================
       AUTHENTICATION MODAL
       ===================================================== */

    window.openAuthModal = function (role) {

        const modal =
            getElement("authModal") ||
            getElement("auth-modal");

        if (!modal) {
            console.warn("Authentication modal was not found.");
            return;
        }

        if (role) {
            selectedRole = role;
        }

        /*
           Put selected role into any matching elements.
        */
        const roleLabels =
            modal.querySelectorAll("[data-auth-role]");

        roleLabels.forEach(function (element) {
            element.textContent = formatRoleName(selectedRole);
        });

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    };


    window.closeAuthModal = function () {

        const modal =
            getElement("authModal") ||
            getElement("auth-modal");

        if (modal) {
            modal.classList.remove("active");
        }

        unlockBody();
    };


    window.closeAuthOutside = function (event) {

        const modal =
            getElement("authModal") ||
            getElement("auth-modal");

        if (modal && event.target === modal) {
            window.closeAuthModal();
        }
    };


    /* =====================================================
       REGISTER / LOGIN TABS
       ===================================================== */

    window.showRegister = function () {

        const registerForm =
            getElement("registerForm") ||
            document.querySelector(".register-form");

        const loginForm =
            getElement("loginForm") ||
            document.querySelector(".login-form");

        const registerTab =
            getElement("registerTab");

        const loginTab =
            getElement("loginTab");

        if (registerForm) {
            registerForm.style.display = "block";
        }

        if (loginForm) {
            loginForm.style.display = "none";
        }

        if (registerTab) {
            registerTab.classList.add("active");
        }

        if (loginTab) {
            loginTab.classList.remove("active");
        }
    };


    window.showLogin = function () {

        const registerForm =
            getElement("registerForm") ||
            document.querySelector(".register-form");

        const loginForm =
            getElement("loginForm") ||
            document.querySelector(".login-form");

        const registerTab =
            getElement("registerTab");

        const loginTab =
            getElement("loginTab");

        if (registerForm) {
            registerForm.style.display = "none";
        }

        if (loginForm) {
            loginForm.style.display = "block";
        }

        if (registerTab) {
            registerTab.classList.remove("active");
        }

        if (loginTab) {
            loginTab.classList.add("active");
        }
    };


    /* =====================================================
       REGISTRATION
       ===================================================== */

    window.handleRegister = function (event) {

        if (event) {
            event.preventDefault();
        }

        const nameInput =
            getElement("registerName") ||
            document.querySelector(
                'input[name="name"]'
            );

        const emailInput =
            getElement("registerEmail") ||
            document.querySelector(
                'input[name="email"]'
            );

        const passwordInput =
            getElement("registerPassword") ||
            document.querySelector(
                'input[name="password"]'
            );

        const name =
            nameInput ? nameInput.value.trim() : "";

        const email =
            emailInput ? emailInput.value.trim() : "";

        const password =
            passwordInput ? passwordInput.value : "";

        if (!name || !email || !password) {
            alert("Please fill all the required fields.");
            return false;
        }

        if (password.length < 6) {
            alert("Password should contain at least 6 characters.");
            return false;
        }

        /*
           Store demo user locally.
           This is frontend-only for now.
        */
        const userData = {
            name: name,
            email: email,
            role: selectedRole || "athlete"
        };

        localStorage.setItem(
            "khelogramUser",
            JSON.stringify(userData)
        );

        alert(
            "Account created successfully!\n\n" +
            "Welcome to KheloGram, " + name + "!"
        );

        window.closeAuthModal();

        return false;
    };


    /* =====================================================
       LOGIN
       ===================================================== */

    window.handleLogin = function (event) {

        if (event) {
            event.preventDefault();
        }

        const emailInput =
            getElement("loginEmail") ||
            document.querySelector(
                '.login-form input[type="email"]'
            );

        const passwordInput =
            getElement("loginPassword") ||
            document.querySelector(
                '.login-form input[type="password"]'
            );

        const email =
            emailInput ? emailInput.value.trim() : "";

        const password =
            passwordInput ? passwordInput.value : "";

        if (!email || !password) {
            alert("Please enter your email and password.");
            return false;
        }

        const savedUser =
            localStorage.getItem("khelogramUser");

        if (savedUser) {

            const user = JSON.parse(savedUser);

            if (user.email === email) {

                alert(
                    "Login successful!\n\n" +
                    "Welcome back, " + user.name + "!"
                );

                window.closeAuthModal();

                return false;
            }
        }

        /*
           Demo login if no registered account exists.
        */
        alert("Login successful!");

        window.closeAuthModal();

        return false;
    };


    /* =====================================================
       GET STARTED BUTTONS
       ===================================================== */

    const getStartedButtons =
        document.querySelectorAll(
            '[data-action="get-started"], .get-started-btn'
        );

    getStartedButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            window.openRoleSelector();

        });

    });


    /* =====================================================
       EXPLORE PLATFORM
       ===================================================== */

    const exploreButtons =
        document.querySelectorAll(
            '[data-action="explore"], .explore-platform'
        );

    exploreButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const platformSection =
                getElement("platform");

            if (platformSection) {

                platformSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


    /* =====================================================
       NAVIGATION
       ===================================================== */

    const navigationLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       ESC KEY - CLOSE MODALS
       ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            window.closeRoleSelector();
            window.closeAuthModal();

        }

    });


    /* =====================================================
       CLOSE BUTTONS
       ===================================================== */

    const closeButtons =
        document.querySelectorAll(
            '[data-close-modal], .modal-close, .close-modal'
        );

    closeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            window.closeRoleSelector();
            window.closeAuthModal();

        });

    });


    /* =====================================================
       ROLE CARDS
       ===================================================== */

    const roleCards =
        document.querySelectorAll(
            "[data-role], .role-card"
        );

    roleCards.forEach(function (card) {

        card.addEventListener("click", function () {

            let role =
                card.getAttribute("data-role");

            if (!role) {

                const title =
                    card.querySelector("h3, h4, strong");

                if (title) {
                    role =
                        title.textContent
                            .toLowerCase()
                            .replace(/\s+/g, "-");
                }

            }

            if (role) {
                window.selectRole(role);
            }

        });

    });


    /* =====================================================
       MODAL BACKGROUND CLICK
       ===================================================== */

    document.addEventListener("click", function (event) {

        const roleModalElement =
            getElement("roleModal") ||
            getElement("roleSelector") ||
            getElement("role-modal");

        const authModalElement =
            getElement("authModal") ||
            getElement("auth-modal");

        if (
            roleModalElement &&
            event.target === roleModalElement
        ) {
            window.closeRoleSelector();
        }

        if (
            authModalElement &&
            event.target === authModalElement
        ) {
            window.closeAuthModal();
        }

    });


    /* =====================================================
       DASHBOARD DEMO DATA
       ===================================================== */

    const dashboardData = {

        athlete: {
            title: "Athlete dashboard",
            stats: [
                {
                    label: "Training Sessions",
                    value: "24"
                },
                {
                    label: "Tournaments",
                    value: "7"
                },
                {
                    label: "Talent Signals",
                    value: "12"
                }
            ]
        },

        coach: {
            title: "Coach dashboard",
            stats: [
                {
                    label: "Athletes",
                    value: "48"
                },
                {
                    label: "Training Sessions",
                    value: "24"
                },
                {
                    label: "Tournaments",
                    value: "7"
                },
                {
                    label: "Talent Signals",
                    value: "12"
                }
            ]
        },

        "gram-panchayat": {
            title: "Gram Panchayat dashboard",
            stats: [
                {
                    label: "Sports Grounds",
                    value: "12"
                },
                {
                    label: "Registered Athletes",
                    value: "245"
                },
                {
                    label: "Maintenance",
                    value: "3"
                },
                {
                    label: "Utilization",
                    value: "78%"
                }
            ]
        },

        organizer: {
            title: "Organizer dashboard",
            stats: [
                {
                    label: "Tournaments",
                    value: "18"
                },
                {
                    label: "Athletes",
                    value: "320"
                },
                {
                    label: "Upcoming Events",
                    value: "6"
                }
            ]
        },

        authority: {
            title: "Authority dashboard",
            stats: [
                {
                    label: "Villages",
                    value: "128"
                },
                {
                    label: "Grounds",
                    value: "245"
                },
                {
                    label: "Talent Signals",
                    value: "74"
                },
                {
                    label: "Participation Growth",
                    value: "28.4%"
                }
            ]
        }

    };


    /* =====================================================
       LOCAL STORAGE - USER
       ===================================================== */

    function loadSavedUser() {

        const savedUser =
            localStorage.getItem("khelogramUser");

        if (!savedUser) {
            return null;
        }

        try {
            return JSON.parse(savedUser);
        } catch (error) {

            console.warn(
                "Could not read saved user data."
            );

            return null;
        }

    }


    /* =====================================================
       UPDATE USER DISPLAY
       ===================================================== */

    function updateUserDisplay() {

        const user =
            loadSavedUser();

        if (!user) {
            return;
        }

        const nameElements =
            document.querySelectorAll(
                "[data-user-name]"
            );

        nameElements.forEach(function (element) {
            element.textContent = user.name;
        });

        const roleElements =
            document.querySelectorAll(
                "[data-user-role]"
            );

        roleElements.forEach(function (element) {
            element.textContent =
                formatRoleName(user.role);
        });

    }


    updateUserDisplay();


    /* =====================================================
       LOGOUT
       ===================================================== */

    window.logoutKheloGram = function () {

        localStorage.removeItem(
            "khelogramUser"
        );

        alert("You have been logged out.");

        window.location.reload();
    };


    const logoutButtons =
        document.querySelectorAll(
            '[data-action="logout"], .logout-btn'
        );

    logoutButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            window.logoutKheloGram();

        });

    });


    /* =====================================================
       SIMPLE SCROLL ANIMATION
       ===================================================== */

    const animatedElements =
        document.querySelectorAll(
            ".feature-card, .stat-card, .impact-card, .ecosystem-card"
        );

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );

        animatedElements.forEach(function (element) {
            observer.observe(element);
        });

    }


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );

    yearElements.forEach(function (element) {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       CONSOLE MESSAGE
       ===================================================== */

    console.log(
        "%cKheloGram loaded successfully.",
        "color:#078a52;font-size:16px;font-weight:bold;"
    );

    console.log(
        "Stage 3.2 JavaScript is running."
    );

});
