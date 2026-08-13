/* =========================================================
   KHELOGRAM - COMPLETE JAVASCRIPT
   Stage 1 + Stage 2 + Stage 3 + Stage 3.2

   IMPORTANT:
   This file is designed to be the ONLY JavaScript file
   used by the current KheloGram website.
========================================================= */

(function () {
    "use strict";

    /* =====================================================
       1. KHELOGRAM DATA
    ===================================================== */

    var KHELOGRAM_DATA = {

        athletes: [
            {
                name: "Rahul Kumar",
                sport: "Football",
                village: "Lucknow",
                status: "Active"
            },
            {
                name: "Aman Singh",
                sport: "Cricket",
                village: "Barabanki",
                status: "Active"
            },
            {
                name: "Priya Verma",
                sport: "Athletics",
                village: "Unnao",
                status: "Training"
            },
            {
                name: "Arjun Yadav",
                sport: "Kabaddi",
                village: "Sitapur",
                status: "Active"
            }
        ],

        coaches: [
            {
                name: "Rahul Coach",
                sport: "Football",
                athletes: 48,
                sessions: 24
            },
            {
                name: "Amit Sharma",
                sport: "Cricket",
                athletes: 36,
                sessions: 18
            }
        ],

        grounds: [
            {
                name: "Gram Sports Ground",
                location: "Lucknow",
                status: "Active",
                utilization: "82%"
            },
            {
                name: "Village Stadium",
                location: "Barabanki",
                status: "Active",
                utilization: "74%"
            },
            {
                name: "Community Playground",
                location: "Unnao",
                status: "Maintenance",
                utilization: "41%"
            }
        ],

        tournaments: [
            {
                name: "KheloGram Football Cup",
                sport: "Football",
                date: "25 August 2026",
                participants: 120
            },
            {
                name: "Rural Cricket Championship",
                sport: "Cricket",
                date: "2 September 2026",
                participants: 180
            },
            {
                name: "Village Athletics Meet",
                sport: "Athletics",
                date: "10 September 2026",
                participants: 95
            }
        ],

        insights: [
            {
                title: "Promising Athlete Detected",
                description: "AI identified a rising rural sports talent.",
                score: "92%"
            },
            {
                title: "Ground Utilization",
                description: "Sports ground usage is increasing.",
                score: "82%"
            },
            {
                title: "Participation Growth",
                description: "Village sports participation is growing.",
                score: "+28.4%"
            }
        ]
    };


    /* =====================================================
       2. CURRENT USER
    ===================================================== */

    var currentUser = {
        name: "",
        email: "",
        role: "",
        loggedIn: false
    };


    /* =====================================================
       3. ROLE INFORMATION
    ===================================================== */

    var ROLE_INFO = {

        athlete: {
            title: "Athlete",
            description: "Track your sports journey",
            icon: "🏃",
            dashboardTitle: "Athlete dashboard"
        },

        coach: {
            title: "Coach",
            description: "Develop sporting talent",
            icon: "🧑‍🏫",
            dashboardTitle: "Coach dashboard"
        },

        panchayat: {
            title: "Gram Panchayat",
            description: "Manage sports infrastructure",
            icon: "🏛️",
            dashboardTitle: "Gram Panchayat dashboard"
        },

        organizer: {
            title: "Organizer",
            description: "Manage tournaments",
            icon: "🏆",
            dashboardTitle: "Organizer dashboard"
        },

        authority: {
            title: "Authority",
            description: "Monitor sports ecosystem",
            icon: "📊",
            dashboardTitle: "Authority dashboard"
        }
    };


    /* =====================================================
       4. HELPER FUNCTIONS
    ===================================================== */

    function getElement(id) {
        return document.getElementById(id);
    }


    function firstExistingElement(ids) {

        for (var i = 0; i < ids.length; i++) {

            var element = getElement(ids[i]);

            if (element) {
                return element;
            }
        }

        return null;
    }


    function showElement(element) {

        if (!element) {
            return;
        }

        element.style.display = "";
        element.classList.add("active");
        element.classList.remove("hidden");
    }


    function hideElement(element) {

        if (!element) {
            return;
        }

        element.classList.remove("active");
        element.classList.add("hidden");
        element.style.display = "none";
    }


    function lockBody() {
        document.body.style.overflow = "hidden";
    }


    function unlockBody() {
        document.body.style.overflow = "";
    }


    function capitalizeFirstLetter(text) {

        if (!text) {
            return "";
        }

        return text.charAt(0).toUpperCase() + text.slice(1);
    }


    /* =====================================================
       5. ROLE SELECTOR
    ===================================================== */

    window.openRoleSelector = function () {

        var modal = firstExistingElement([
            "roleModal",
            "roleSelectorModal",
            "roleSelector"
        ]);

        if (!modal) {
            console.warn("Role selector modal not found.");
            return;
        }

        showElement(modal);
        lockBody();
    };


    window.openRoleModal = function () {

        window.openRoleSelector();
    };


    window.closeRoleSelector = function () {

        var modal = firstExistingElement([
            "roleModal",
            "roleSelectorModal",
            "roleSelector"
        ]);

        if (!modal) {
            return;
        }

        hideElement(modal);
        unlockBody();
    };


    window.closeRoleModal = function () {

        window.closeRoleSelector();
    };


    window.closeRoleModalOutside = function (event) {

        var modal = firstExistingElement([
            "roleModal",
            "roleSelectorModal",
            "roleSelector"
        ]);

        if (modal && event.target === modal) {
            window.closeRoleSelector();
        }
    };


    /* =====================================================
       6. SELECT ROLE
    ===================================================== */

    window.selectRole = function (role) {

        if (!role) {
            return;
        }

        role = role.toLowerCase();

        if (!ROLE_INFO[role]) {
            console.warn("Unknown role:", role);
            return;
        }

        currentUser.role = role;

        try {
            localStorage.setItem("khelogram_role", role);
        } catch (error) {
            console.warn("Local storage unavailable.");
        }

        window.closeRoleSelector();

        window.openAuthModal();
    };


    /* =====================================================
       7. AUTHENTICATION MODAL
    ===================================================== */

    window.openAuthModal = function () {

        var modal = firstExistingElement([
            "authModal",
            "authenticationModal",
            "auth-modal"
        ]);

        if (!modal) {
            console.warn("Authentication modal not found.");
            return;
        }

        showElement(modal);
        lockBody();

        window.showRegister();
    };


    window.closeAuthModal = function () {

        var modal = firstExistingElement([
            "authModal",
            "authenticationModal",
            "auth-modal"
        ]);

        if (!modal) {
            return;
        }

        hideElement(modal);
        unlockBody();
    };


    window.closeAuthModalOutside = function (event) {

        var modal = firstExistingElement([
            "authModal",
            "authenticationModal",
            "auth-modal"
        ]);

        if (modal && event.target === modal) {
            window.closeAuthModal();
        }
    };


    /* =====================================================
       8. REGISTER / LOGIN TABS
    ===================================================== */

    window.showRegister = function () {

        var registerForm = firstExistingElement([
            "registerForm",
            "registrationForm"
        ]);

        var loginForm = firstExistingElement([
            "loginForm",
            "authenticationForm"
        ]);

        var registerTab = firstExistingElement([
            "registerTab",
            "registerButton"
        ]);

        var loginTab = firstExistingElement([
            "loginTab",
            "loginButton"
        ]);

        if (registerForm) {
            registerForm.style.display = "";
            registerForm.classList.add("active");
        }

        if (loginForm) {
            loginForm.style.display = "none";
            loginForm.classList.remove("active");
        }

        if (registerTab) {
            registerTab.classList.add("active");
        }

        if (loginTab) {
            loginTab.classList.remove("active");
        }
    };


    window.showLogin = function () {

        var registerForm = firstExistingElement([
            "registerForm",
            "registrationForm"
        ]);

        var loginForm = firstExistingElement([
            "loginForm",
            "authenticationForm"
        ]);

        var registerTab = firstExistingElement([
            "registerTab",
            "registerButton"
        ]);

        var loginTab = firstExistingElement([
            "loginTab",
            "loginButton"
        ]);

        if (registerForm) {
            registerForm.style.display = "none";
            registerForm.classList.remove("active");
        }

        if (loginForm) {
            loginForm.style.display = "";
            loginForm.classList.add("active");
        }

        if (registerTab) {
            registerTab.classList.remove("active");
        }

        if (loginTab) {
            loginTab.classList.add("active");
        }
    };


    window.switchAuthTab = function (tab) {

        if (tab === "register") {
            window.showRegister();
        }

        if (tab === "login") {
            window.showLogin();
        }
    };


    /* =====================================================
       9. FORM SUBMISSION
    ===================================================== */

    window.handleRegister = function (event) {

        if (event) {
            event.preventDefault();
        }

        var nameInput = firstExistingElement([
            "registerName",
            "fullName",
            "name"
        ]);

        var emailInput = firstExistingElement([
            "registerEmail",
            "email"
        ]);

        var passwordInput = firstExistingElement([
            "registerPassword",
            "password"
        ]);

        var name = nameInput ? nameInput.value.trim() : "";
        var email = emailInput ? emailInput.value.trim() : "";
        var password = passwordInput ? passwordInput.value.trim() : "";

        if (!name) {
            alert("Please enter your full name.");
            return false;
        }

        if (!email) {
            alert("Please enter your email.");
            return false;
        }

        if (!password) {
            alert("Please create a password.");
            return false;
        }

        if (password.length < 4) {
            alert("Password should contain at least 4 characters.");
            return false;
        }

        currentUser.name = name;
        currentUser.email = email;
        currentUser.loggedIn = true;

        saveUser();

        window.closeAuthModal();

        showDashboard();

        return false;
    };


    window.handleLogin = function (event) {

        if (event) {
            event.preventDefault();
        }

        var emailInput = firstExistingElement([
            "loginEmail",
            "email"
        ]);

        var passwordInput = firstExistingElement([
            "loginPassword",
            "password"
        ]);

        var email = emailInput ? emailInput.value.trim() : "";
        var password = passwordInput ? passwordInput.value.trim() : "";

        if (!email) {
            alert("Please enter your email.");
            return false;
        }

        if (!password) {
            alert("Please enter your password.");
            return false;
        }

        currentUser.email = email;
        currentUser.name = email.split("@")[0];
        currentUser.loggedIn = true;

        saveUser();

        window.closeAuthModal();

        showDashboard();

        return false;
    };


    window.handleAuthSubmit = function (event) {

        var registerForm = firstExistingElement([
            "registerForm",
            "registrationForm"
        ]);

        if (
            registerForm &&
            registerForm.style.display !== "none"
        ) {
            return window.handleRegister(event);
        }

        return window.handleLogin(event);
    };


    /* =====================================================
       10. LOCAL STORAGE
    ===================================================== */

    function saveUser() {

        try {

            localStorage.setItem(
                "khelogram_user",
                JSON.stringify(currentUser)
            );

        } catch (error) {

            console.warn("Could not save user.");
        }
    }


    function loadUser() {

        try {

            var savedUser =
                localStorage.getItem("khelogram_user");

            if (savedUser) {

                var parsedUser = JSON.parse(savedUser);

                if (parsedUser) {

                    currentUser.name =
                        parsedUser.name || "";

                    currentUser.email =
                        parsedUser.email || "";

                    currentUser.role =
                        parsedUser.role || "";

                    currentUser.loggedIn =
                        parsedUser.loggedIn || false;
                }
            }

        } catch (error) {

            console.warn("Could not load saved user.");
        }
    }


    /* =====================================================
       11. DASHBOARD
    ===================================================== */

    function showDashboard() {

        var landing = firstExistingElement([
            "landingPage",
            "homePage",
            "mainLanding"
        ]);

        var dashboard = firstExistingElement([
            "dashboard",
            "dashboardPage",
            "appDashboard"
        ]);

        if (landing) {
            hideElement(landing);
        }

        if (dashboard) {
            showElement(dashboard);
        }

        renderDashboard();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    function showLandingPage() {

        var landing = firstExistingElement([
            "landingPage",
            "homePage",
            "mainLanding"
        ]);

        var dashboard = firstExistingElement([
            "dashboard",
            "dashboardPage",
            "appDashboard"
        ]);

        if (dashboard) {
            hideElement(dashboard);
        }

        if (landing) {
            showElement(landing);
        }
    }


    /* =====================================================
       12. DASHBOARD CONTENT
    ===================================================== */

    function renderDashboard() {

        var dashboard = firstExistingElement([
            "dashboard",
            "dashboardPage",
            "appDashboard"
        ]);

        if (!dashboard) {
            createDashboard();
            return;
        }

        updateDashboardText(dashboard);
    }


    function updateDashboardText(dashboard) {

        var roleInfo =
            ROLE_INFO[currentUser.role] ||
            ROLE_INFO.athlete;

        var name =
            currentUser.name ||
            "User";

        var welcomeElements =
            dashboard.querySelectorAll(
                "[data-user-name], .user-name, .welcome-name"
            );

        for (var i = 0; i < welcomeElements.length; i++) {
            welcomeElements[i].textContent = name;
        }

        var roleElements =
            dashboard.querySelectorAll(
                "[data-user-role], .user-role"
            );

        for (var j = 0; j < roleElements.length; j++) {
            roleElements[j].textContent =
                roleInfo.title;
        }
    }


    /* =====================================================
       13. CREATE DASHBOARD IF HTML DOES NOT HAVE ONE
    ===================================================== */

    function createDashboard() {

        var existing =
            document.getElementById("khelogramGeneratedDashboard");

        if (existing) {

            existing.style.display = "";

            updateGeneratedDashboard();

            return;
        }

        var dashboard =
            document.createElement("section");

        dashboard.id =
            "khelogramGeneratedDashboard";

        dashboard.className =
            "khelogram-generated-dashboard";

        dashboard.innerHTML = buildDashboardHTML();

        document.body.appendChild(dashboard);

        updateGeneratedDashboard();

        setTimeout(function () {

            dashboard.scrollIntoView({
                behavior: "smooth"
            });

        }, 100);
    }


    function buildDashboardHTML() {

        var role =
            ROLE_INFO[currentUser.role] ||
            ROLE_INFO.athlete;

        var dashboardHTML = "";

        dashboardHTML +=
            '<div style="' +
            'min-height:100vh;' +
            'background:#f5f8fa;' +
            'padding:40px 5%;' +
            'font-family:Arial,sans-serif;' +
            '">';

        dashboardHTML +=
            '<div style="' +
            'max-width:1200px;' +
            'margin:auto;' +
            '">';

        dashboardHTML +=
            '<div style="' +
            'display:flex;' +
            'justify-content:space-between;' +
            'align-items:center;' +
            'margin-bottom:40px;' +
            '">';

        dashboardHTML +=
            '<div>';

        dashboardHTML +=
            '<div style="' +
            'color:#078b4f;' +
            'font-weight:700;' +
            'letter-spacing:2px;' +
            'font-size:13px;' +
            'margin-bottom:10px;' +
            '">KHELOGRAM DASHBOARD</div>';

        dashboardHTML +=
            '<h1 style="' +
            'font-size:42px;' +
            'margin:0;' +
            'color:#0b1628;' +
            '">Welcome back, <span id="generatedUserName"></span> 👋</h1>';

        dashboardHTML +=
            '<p style="' +
            'font-size:18px;' +
            'color:#64748b;' +
            'margin-top:12px;' +
            '">';

        dashboardHTML +=
            role.title +
            ' dashboard — manage your KheloGram ecosystem.';

        dashboardHTML +=
            '</p>';

        dashboardHTML +=
            '</div>';

        dashboardHTML +=
            '<button onclick="logoutKheloGram()" ' +
            'style="' +
            'padding:14px 22px;' +
            'border:1px solid #d9e1e7;' +
            'background:white;' +
            'border-radius:12px;' +
            'font-weight:700;' +
            'cursor:pointer;' +
            '">Logout</button>';

        dashboardHTML +=
            '</div>';

        dashboardHTML +=
            '<div id="generatedDashboardContent"></div>';

        dashboardHTML +=
            '</div>';

        dashboardHTML +=
            '</div>';

        return dashboardHTML;
    }


    function updateGeneratedDashboard() {

        var nameElement =
            document.getElementById(
                "generatedUserName"
            );

        if (nameElement) {

            nameElement.textContent =
                currentUser.name || "User";
        }

        var content =
            document.getElementById(
                "generatedDashboardContent"
            );

        if (!content) {
            return;
        }

        content.innerHTML =
            buildRoleDashboard(currentUser.role);
    }


    function buildRoleDashboard(role) {

        if (role === "coach") {
            return buildCoachDashboard();
        }

        if (role === "panchayat") {
            return buildPanchayatDashboard();
        }

        if (role === "organizer") {
            return buildOrganizerDashboard();
        }

        if (role === "authority") {
            return buildAuthorityDashboard();
        }

        return buildAthleteDashboard();
    }


    /* =====================================================
       14. ATHLETE DASHBOARD
    ===================================================== */

    function buildAthleteDashboard() {

        return dashboardCards([
            {
                icon: "🏃",
                number: "1",
                label: "Sports Profile",
                note: "Active"
            },
            {
                icon: "🏆",
                number: "6",
                label: "Tournaments",
                note: "Available"
            },
            {
                icon: "📈",
                number: "92%",
                label: "AI Talent Score",
                note: "Promising"
            },
            {
                icon: "⚽",
                number: "12",
                label: "Matches",
                note: "This season"
            }
        ]) +

        informationPanel(
            "AI Sports Intelligence",
            "KheloGram AI has identified strong athletic potential. Keep participating in village-level tournaments and training sessions."
        );
    }


    /* =====================================================
       15. COACH DASHBOARD
    ===================================================== */

    function buildCoachDashboard() {

        return dashboardCards([
            {
                icon: "🏃",
                number: "48",
                label: "Athletes",
                note: "+6 this month"
            },
            {
                icon: "📅",
                number: "24",
                label: "Training Sessions",
                note: "This month"
            },
            {
                icon: "🏆",
                number: "7",
                label: "Tournaments",
                note: "Upcoming"
            },
            {
                icon: "✦",
                number: "12",
                label: "Talent Signals",
                note: "AI detected"
            }
        ]) +

        informationPanel(
            "Smart Insights",
            "AI has identified 12 athletes showing promising performance trends. Consider giving them additional training opportunities."
        );
    }


    /* =====================================================
       16. PANCHAYAT DASHBOARD
    ===================================================== */

    function buildPanchayatDashboard() {

        return dashboardCards([
            {
                icon: "🏟️",
                number: "12",
                label: "Sports Grounds",
                note: "8 active"
            },
            {
                icon: "🏃",
                number: "245",
                label: "Registered Athletes",
                note: "+18 this month"
            },
            {
                icon: "🔧",
                number: "3",
                label: "Maintenance",
                note: "Requests pending"
            },
            {
                icon: "📈",
                number: "78%",
                label: "Utilization",
                note: "+12% this month"
            }
        ]) +

        informationPanel(
            "Ground Intelligence",
            "KheloGram AI shows that sports-ground utilization is improving. Maintenance requests should be reviewed for inactive grounds."
        );
    }


    /* =====================================================
       17. ORGANIZER DASHBOARD
    ===================================================== */

    function buildOrganizerDashboard() {

        return dashboardCards([
            {
                icon: "🏆",
                number: "36",
                label: "Tournaments",
                note: "Active"
            },
            {
                icon: "🏃",
                number: "1,240",
                label: "Participants",
                note: "Registered"
            },
            {
                icon: "📅",
                number: "8",
                label: "Upcoming",
                note: "This month"
            },
            {
                icon: "📊",
                number: "94%",
                label: "Completion",
                note: "Successful"
            }
        ]) +

        informationPanel(
            "Tournament Intelligence",
            "AI recommends focusing upcoming tournaments on football, cricket and athletics based on rural participation trends."
        );
    }


    /* =====================================================
       18. AUTHORITY DASHBOARD
    ===================================================== */

    function buildAuthorityDashboard() {

        return dashboardCards([
            {
                icon: "🏟️",
                number: "128",
                label: "Sports Grounds",
                note: "Mapped"
            },
            {
                icon: "🏃",
                number: "2,480",
                label: "Athletes",
                note: "Registered"
            },
            {
                icon: "🏆",
                number: "36",
                label: "Tournaments",
                note: "Active"
            },
            {
                icon: "✦",
                number: "74",
                label: "AI Insights",
                note: "Talent signals"
            }
        ]) +

        informationPanel(
            "Government Sports Intelligence",
            "KheloGram provides a consolidated view of rural sports participation, infrastructure utilization and emerging talent."
        );
    }


    /* =====================================================
       19. DASHBOARD CARD GENERATOR
    ===================================================== */

    function dashboardCards(cards) {

        var html =
            '<div style="' +
            'display:grid;' +
            'grid-template-columns:repeat(auto-fit,minmax(220px,1fr));' +
            'gap:20px;' +
            'margin-bottom:30px;' +
            '">';

        for (var i = 0; i < cards.length; i++) {

            html +=
                '<div style="' +
                'background:white;' +
                'border:1px solid #e2e8f0;' +
                'border-radius:18px;' +
                'padding:28px;' +
                '">';

            html +=
                '<div style="' +
                'font-size:28px;' +
                'margin-bottom:20px;' +
                '">' +
                cards[i].icon +
                '</div>';

            html +=
                '<div style="' +
                'font-size:40px;' +
                'font-weight:800;' +
                'color:#0b1628;' +
                '">' +
                cards[i].number +
                '</div>';

            html +=
                '<div style="' +
                'font-size:14px;' +
                'font-weight:700;' +
                'color:#64748b;' +
                'margin-top:8px;' +
                '">' +
                cards[i].label +
                '</div>';

            html +=
                '<div style="' +
                'color:#078b4f;' +
                'font-size:13px;' +
                'font-weight:700;' +
                'margin-top:12px;' +
                '">' +
                cards[i].note +
                '</div>';

            html +=
                '</div>';
        }

        html +=
            '</div>';

        return html;
    }


    /* =====================================================
       20. INFORMATION PANEL
    ===================================================== */

    function informationPanel(title, text) {

        var html = "";

        html +=
            '<div style="' +
            'background:white;' +
            'border:1px solid #e2e8f0;' +
            'border-radius:20px;' +
            'padding:30px;' +
            '">';

        html +=
            '<div style="' +
            'color:#078b4f;' +
            'font-size:13px;' +
            'font-weight:700;' +
            'letter-spacing:1.5px;' +
            'margin-bottom:10px;' +
            '">KHELOGRAM AI</div>';

        html +=
            '<h2 style="' +
            'margin:0 0 12px;' +
            'color:#0b1628;' +
            '">' +
            title +
            '</h2>';

        html +=
            '<p style="' +
            'color:#64748b;' +
            'font-size:16px;' +
            'line-height:1.7;' +
            'margin:0;' +
            '">' +
            text +
            '</p>';

        html +=
            '</div>';

        return html;
    }


    /* =====================================================
       21. LOGOUT
    ===================================================== */

    window.logoutKheloGram = function () {

        currentUser = {
            name: "",
            email: "",
            role: "",
            loggedIn: false
        };

        try {

            localStorage.removeItem(
                "khelogram_user"
            );

            localStorage.removeItem(
                "khelogram_role"
            );

        } catch (error) {

            console.warn("Could not clear local storage.");
        }

        var generatedDashboard =
            document.getElementById(
                "khelogramGeneratedDashboard"
            );

        if (generatedDashboard) {

            generatedDashboard.remove();
        }

        showLandingPage();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    /* =====================================================
       22. NAVIGATION
    ===================================================== */

    function setupNavigation() {

        var links =
            document.querySelectorAll(
                'a[href^="#"]'
            );

        for (var i = 0; i < links.length; i++) {

            links[i].addEventListener(
                "click",
                function (event) {

                    var href =
                        this.getAttribute("href");

                    if (
                        !href ||
                        href === "#" ||
                        href.length < 2
                    ) {
                        return;
                    }

                    var target =
                        document.querySelector(href);

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth"
                        });
                    }
                }
            );
        }
    }


    /* =====================================================
       23. GET STARTED BUTTONS
    ===================================================== */

    function setupGetStartedButtons() {

        var buttons =
            document.querySelectorAll(
                ".get-started, .getStarted, [data-get-started]"
            );

        for (var i = 0; i < buttons.length; i++) {

            buttons[i].addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    window.openRoleSelector();
                }
            );
        }
    }


    /* =====================================================
       24. MODAL CLOSE BUTTONS
    ===================================================== */

    function setupModalButtons() {

        var closeButtons =
            document.querySelectorAll(
                "[data-close-modal]"
            );

        for (var i = 0; i < closeButtons.length; i++) {

            closeButtons[i].addEventListener(
                "click",
                function () {

                    window.closeRoleSelector();
                    window.closeAuthModal();
                }
            );
        }
    }


    /* =====================================================
       25. ESCAPE KEY
    ===================================================== */

    function setupEscapeKey() {

        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {

                    window.closeRoleSelector();
                    window.closeAuthModal();
                }
            }
        );
    }


    /* =====================================================
       26. ROLE CARDS
    ===================================================== */

    function setupRoleCards() {

        var roleCards =
            document.querySelectorAll(
                "[data-role]"
            );

        for (var i = 0; i < roleCards.length; i++) {

            roleCards[i].addEventListener(
                "click",
                function () {

                    var role =
                        this.getAttribute("data-role");

                    if (role) {
                        window.selectRole(role);
                    }
                }
            );
        }
    }


    /* =====================================================
       27. AUTH FORMS
    ===================================================== */

    function setupForms() {

        var registerForm =
            firstExistingElement([
                "registerForm",
                "registrationForm"
            ]);

        var loginForm =
            firstExistingElement([
                "loginForm",
                "authenticationForm"
            ]);

        if (registerForm) {

            registerForm.addEventListener(
                "submit",
                window.handleRegister
            );
        }

        if (
            loginForm &&
            loginForm !== registerForm
        ) {

            loginForm.addEventListener(
                "submit",
                window.handleLogin
            );
        }
    }


    /* =====================================================
       28. MODAL CLICK HANDLERS
    ===================================================== */

    function setupModalClickHandlers() {

        var roleModal =
            firstExistingElement([
                "roleModal",
                "roleSelectorModal",
                "roleSelector"
            ]);

        if (roleModal) {

            roleModal.addEventListener(
                "click",
                function (event) {

                    if (event.target === roleModal) {
                        window.closeRoleSelector();
                    }
                }
            );
        }

        var authModal =
            firstExistingElement([
                "authModal",
                "authenticationModal",
                "auth-modal"
            ]);

        if (authModal) {

            authModal.addEventListener(
                "click",
                function (event) {

                    if (event.target === authModal) {
                        window.closeAuthModal();
                    }
                }
            );
        }
    }


    /* =====================================================
       29. PAGE INITIALIZATION
    ===================================================== */

    function initializeKheloGram() {

        loadUser();

        setupNavigation();
        setupGetStartedButtons();
        setupModalButtons();
        setupEscapeKey();
        setupRoleCards();
        setupForms();
        setupModalClickHandlers();

        /*
         * If a user was already logged in,
         * restore their dashboard.
         */

        if (
            currentUser.loggedIn &&
            currentUser.role
        ) {

            showDashboard();
        }
    }


    /* =====================================================
       30. DOM READY
    ===================================================== */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeKheloGram
        );

    } else {

        initializeKheloGram();
    }


    /* =====================================================
       31. PUBLIC DATA
       Useful later for Stage 4 / AI / database work.
    ===================================================== */

    window.KHELOGRAM_DATA =
        KHELOGRAM_DATA;

    window.KHELOGRAM_CURRENT_USER =
        currentUser;


    /* =====================================================
       32. EXTRA COMPATIBILITY FUNCTIONS
       These prevent "function not defined" errors
       from older HTML onclick attributes.
    ===================================================== */

    window.openRole = function () {
        window.openRoleSelector();
    };

    window.closeRole = function () {
        window.closeRoleSelector();
    };

    window.openAuth = function () {
        window.openAuthModal();
    };

    window.closeAuth = function () {
        window.closeAuthModal();
    };

    window.registerUser = function (event) {
        return window.handleRegister(event);
    };

    window.loginUser = function (event) {
        return window.handleLogin(event);
    };

    window.logout = function () {
        window.logoutKheloGram();
    };


    /* =====================================================
       END OF KHELOGRAM JAVASCRIPT
    ===================================================== */

})();
