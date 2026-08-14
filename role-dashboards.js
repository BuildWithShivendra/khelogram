
/* =========================================================
   KHELOGRAM - ROLE BASED DASHBOARDS
   Frontend-only prototype
   No backend required
   ========================================================= */

(function () {
    "use strict";

    const ROLE_DATA = {
        Athlete: {
            title: "Athlete Dashboard",
            subtitle: "Your sports journey and opportunities"
        },
        Coach: {
            title: "Coach Dashboard",
            subtitle: "Manage athletes, training and community"
        },
        Organizer: {
            title: "Organizer Dashboard",
            subtitle: "Create and manage rural tournaments"
        },
        "Gram Panchayat": {
            title: "Panchayat Dashboard",
            subtitle: "Manage village sports infrastructure"
        },
        Panchayat: {
            title: "Panchayat Dashboard",
            subtitle: "Manage village sports infrastructure"
        }
    };

    let customData = {
        grounds: JSON.parse(
            localStorage.getItem("khelogramPanchayatGrounds") || "[]"
        ),

        maintenance: JSON.parse(
            localStorage.getItem("khelogramMaintenanceReports") || "[]"
        ),

        tournaments: JSON.parse(
            localStorage.getItem("khelogramOrganizerTournaments") || "[]"
        )
    };

    /* =====================================================
       SAVE DATA
       ===================================================== */

    function saveData() {
        localStorage.setItem(
            "khelogramPanchayatGrounds",
            JSON.stringify(customData.grounds)
        );

        localStorage.setItem(
            "khelogramMaintenanceReports",
            JSON.stringify(customData.maintenance)
        );

        localStorage.setItem(
            "khelogramOrganizerTournaments",
            JSON.stringify(customData.tournaments)
        );
    }

    /* =====================================================
       GET CURRENT USER
       ===================================================== */

    function getCurrentUser() {
        try {
            return JSON.parse(
                localStorage.getItem("khelogramUser") || "null"
            );
        } catch (error) {
            return null;
        }
    }

    /* =====================================================
       GET ROLE
       ===================================================== */

    function getCurrentRole() {
        const user = getCurrentUser();

        if (!user) {
            return "Athlete";
        }

        return user.role || "Athlete";
    }

    /* =====================================================
       ESCAPE HTML
       ===================================================== */

    function safe(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    /* =====================================================
       SHOW DASHBOARD OVERRIDE
       ===================================================== */

    window.showRoleBasedDashboard = function () {

        const role = getCurrentRole();

        if (role === "Athlete") {

            showOriginalAthleteDashboard();

            return;
        }

        showCustomDashboard(role);
    };

    /* =====================================================
       ATHLETE
       Keep existing Stage 8 dashboard
       ===================================================== */

    function showOriginalAthleteDashboard() {

        document
            .getElementById("landingPage")
            ?.classList.add("hidden");

        document
            .getElementById("dashboardPage")
            ?.classList.remove("hidden");

        const custom =
            document.getElementById("roleSpecificDashboard");

        if (custom) {
            custom.remove();
        }

        const sidebar =
            document.getElementById("sidebar");

        if (sidebar) {
            sidebar.style.display = "";
        }

        const dashboardContent =
            document.querySelector(".dashboard-content");

        if (dashboardContent) {
            dashboardContent.style.display = "";
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        if (typeof updateDashboardData === "function") {
            updateDashboardData();
        }

        if (typeof updateInsights === "function") {
            updateInsights();
        }

        if (typeof renderCommunity === "function") {
            renderCommunity();
        }

        if (typeof renderAchievements === "function") {
            renderAchievements();
        }

        if (typeof renderTournaments === "function") {
            renderTournaments();
        }
    }

    /* =====================================================
       CUSTOM DASHBOARD
       ===================================================== */

    function showCustomDashboard(role) {

        document
            .getElementById("landingPage")
            ?.classList.add("hidden");

        document
            .getElementById("dashboardPage")
            ?.classList.remove("hidden");

        const sidebar =
            document.getElementById("sidebar");

        if (sidebar) {
            sidebar.style.display = "none";
        }

        const dashboardContent =
            document.querySelector(".dashboard-content");

        if (dashboardContent) {
            dashboardContent.style.display = "block";
            dashboardContent.style.marginLeft = "0";
        }

        document
            .querySelectorAll(".dashboard-section")
            .forEach(function (section) {
                section.classList.add("hidden");
            });

        let custom =
            document.getElementById("roleSpecificDashboard");

        if (!custom) {

            custom = document.createElement("div");

            custom.id =
                "roleSpecificDashboard";

            custom.className =
                "role-specific-dashboard";

            if (dashboardContent) {
                dashboardContent.prepend(custom);
            }
        }

        const data =
            ROLE_DATA[role] ||
            ROLE_DATA.Athlete;

        custom.innerHTML = `
            ${dashboardHeader(
                data.title,
                data.subtitle,
                role
            )}

            <div id="roleDashboardBody">
                ${getRoleDashboard(role)}
            </div>
        `;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    /* =====================================================
       DASHBOARD HEADER
       ===================================================== */

    function dashboardHeader(title, subtitle, role) {

        const user =
            getCurrentUser();

        const name =
            user?.name || role;

        return `
            <div class="rb-header">

                <div>

                    <div class="rb-eyebrow">
                        KHELOGRAM • ${safe(role).toUpperCase()}
                    </div>

                    <h1>
                        ${safe(title)}
                    </h1>

                    <p>
                        ${safe(subtitle)}
                    </p>

                </div>

                <div class="rb-user">

                    <div class="rb-avatar">
                        ${safe(
                            name
                                .substring(0, 2)
                                .toUpperCase()
                        )}
                    </div>

                    <div>
                        <strong>
                            ${safe(name)}
                        </strong>

                        <small>
                            ${safe(role)}
                        </small>
                    </div>

                </div>

            </div>

            <button
                class="rb-change-role"
                onclick="changeKheloGramRole()"
            >
                ← Change Role
            </button>
        `;
    }

    /* =====================================================
       ROLE ROUTER
       ===================================================== */

    function getRoleDashboard(role) {

        if (role === "Coach") {
            return coachDashboard();
        }

        if (
            role === "Organizer" ||
            role === "Tournament Organizer"
        ) {
            return organizerDashboard();
        }

        if (
            role === "Gram Panchayat" ||
            role === "Panchayat"
        ) {
            return panchayatDashboard();
        }

        return athleteFallback();
    }

    /* =====================================================
       ATHLETE FALLBACK
       ===================================================== */

    function athleteFallback() {

        return `
            <div class="rb-empty">
                <div class="rb-big-icon">🏃</div>

                <h2>
                    Athlete Dashboard
                </h2>

                <p>
                    Your existing Stage 8 athlete dashboard
                    remains available for athletes.
                </p>
            </div>
        `;
    }

    /* =====================================================
       COACH DASHBOARD
       ===================================================== */

    function coachDashboard() {

        const posts =
            getCommunityPosts();

        return `

            <div class="rb-hero coach-hero">

                <div>

                    <span>
                        COACH MODE
                    </span>

                    <h2>
                        Train. Connect. Develop.
                    </h2>

                    <p>
                        Manage your athletes, training ground
                        and sports community.
                    </p>

                </div>

                <div class="rb-hero-icon">
                    🧑‍🏫
                </div>

            </div>


            <div class="rb-stats">

                <div class="rb-stat">
                    <strong>24</strong>
                    <span>Athletes Training</span>
                </div>

                <div class="rb-stat">
                    <strong>2</strong>
                    <span>Training Grounds</span>
                </div>

                <div class="rb-stat">
                    <strong>8</strong>
                    <span>Community Posts</span>
                </div>

                <div class="rb-stat">
                    <strong>4</strong>
                    <span>Training Sessions</span>
                </div>

            </div>


            <div class="rb-grid-2">

                <section class="rb-card">

                    <div class="rb-card-title">
                        <div>
                            <small>YOUR TRAINING</small>
                            <h3>
                                Athletes You Train
                            </h3>
                        </div>

                        <span>🏃</span>
                    </div>

                    <div class="rb-athlete-list">

                        ${coachAthletes()}

                    </div>

                </section>


                <section class="rb-card">

                    <div class="rb-card-title">

                        <div>
                            <small>COACHING LOCATION</small>

                            <h3>
                                Your Training Ground
                            </h3>
                        </div>

                        <span>🏟️</span>

                    </div>

                    <div class="rb-location">

                        <strong>
                            Village Sports Ground
                        </strong>

                        <p>
                            📍 Mohanlalganj, Lucknow
                        </p>

                        <div class="rb-tags">

                            <span>
                                Cricket
                            </span>

                            <span>
                                Available
                            </span>

                            <span>
                                120 Athletes/month
                            </span>

                        </div>

                    </div>

                </section>

            </div>


            <section class="rb-card rb-community">

                <div class="rb-card-title">

                    <div>

                        <small>
                            COMMUNITY
                        </small>

                        <h3>
                            Community Feed
                        </h3>

                    </div>

                    <button
                        class="rb-primary"
                        onclick="coachCreatePost()"
                    >
                        + Create Post
                    </button>

                </div>


                <div class="rb-post-form">

                    <textarea
                        id="coachPostText"
                        placeholder="Share a training update with the community..."
                    ></textarea>

                    <button
                        class="rb-primary"
                        onclick="coachCreatePost()"
                    >
                        Publish Post
                    </button>

                </div>


                <div class="rb-feed">

                    ${
                        posts.length
                        ? posts.map(post => `
                            <article class="rb-post">

                                <div class="rb-post-avatar">
                                    ${safe(
                                        post.name
                                            ?.substring(0, 2)
                                            .toUpperCase() || "KG"
                                    )}
                                </div>

                                <div>

                                    <strong>
                                        ${safe(post.name)}
                                    </strong>

                                    <small>
                                        ${safe(post.role || "Community")}
                                    </small>

                                    <h4>
                                        ${safe(post.title)}
                                    </h4>

                                    <p>
                                        ${safe(post.content)}
                                    </p>

                                </div>

                            </article>
                        `).join("")
                        : `
                            <div class="rb-empty-small">
                                No community posts yet.
                            </div>
                        `
                    }

                </div>

            </section>
        `;
    }

    /* =====================================================
       COACH ATHLETES
       ===================================================== */

    function coachAthletes() {

        const athletes = [
            {
                name: "Rahul Verma",
                sport: "Cricket",
                progress: "84%"
            },
            {
                name: "Aman Yadav",
                sport: "Cricket",
                progress: "78%"
            },
            {
                name: "Sita Devi",
                sport: "Kabaddi",
                progress: "86%"
            },
            {
                name: "Priya Singh",
                sport: "Athletics",
                progress: "91%"
            }
        ];

        return athletes.map(function (athlete) {

            return `
                <div class="rb-athlete">

                    <div class="rb-athlete-avatar">
                        ${safe(
                            athlete.name
                                .substring(0, 2)
                                .toUpperCase()
                        )}
                    </div>

                    <div class="rb-athlete-info">

                        <strong>
                            ${safe(athlete.name)}
                        </strong>

                        <span>
                            ${safe(athlete.sport)}
                        </span>

                    </div>

                    <div class="rb-progress">

                        <span>
                            ${safe(athlete.progress)}
                        </span>

                        <i>
                            <b style="width:${safe(athlete.progress)}"></b>
                        </i>

                    </div>

                </div>
            `;

        }).join("");
    }

    /* =====================================================
       ORGANIZER DASHBOARD
       ===================================================== */

    function organizerDashboard() {

        return `

            <div class="rb-hero organizer-hero">

                <div>

                    <span>
                        ORGANIZER MODE
                    </span>

                    <h2>
                        Organize the next rural tournament.
                    </h2>

                    <p>
                        Create competitions, choose venues
                        and connect village athletes.
                    </p>

                </div>

                <div class="rb-hero-icon">
                    🏆
                </div>

            </div>


            <div class="rb-stats">

                <div class="rb-stat">
                    <strong>
                        ${customData.tournaments.length}
                    </strong>

                    <span>
                        My Tournaments
                    </span>
                </div>

                <div class="rb-stat">
                    <strong>6</strong>
                    <span>Available Venues</span>
                </div>

                <div class="rb-stat">
                    <strong>128</strong>
                    <span>Potential Athletes</span>
                </div>

                <div class="rb-stat">
                    <strong>8</strong>
                    <span>Sports</span>
                </div>

            </div>


            <section class="rb-card">

                <div class="rb-card-title">

                    <div>

                        <small>
                            TOURNAMENT MANAGEMENT
                        </small>

                        <h3>
                            Create Tournament
                        </h3>

                    </div>

                    <span>🏆</span>

                </div>


                <form
                    class="rb-form"
                    onsubmit="createOrganizerTournament(event)"
                >

                    <div class="rb-form-grid">

                        <label>
                            Tournament Name

                            <input
                                id="orgTournamentName"
                                required
                                placeholder="e.g. KheloGram Rural Cup"
                            >
                        </label>


                        <label>
                            Sport

                            <select
                                id="orgTournamentSport"
                                required
                            >
                                <option value="">
                                    Select sport
                                </option>

                                <option>Cricket</option>
                                <option>Football</option>
                                <option>Kabaddi</option>
                                <option>Athletics</option>
                                <option>Hockey</option>
                                <option>Volleyball</option>
                                <option>Badminton</option>
                                <option>Wrestling</option>
                            </select>
                        </label>


                        <label>
                            District

                            <input
                                id="orgDistrict"
                                required
                                placeholder="District"
                            >
                        </label>


                        <label>
                            Village

                            <input
                                id="orgVillage"
                                required
                                placeholder="Village"
                            >
                        </label>


                        <label>
                            Venue / Ground

                            <input
                                id="orgVenue"
                                required
                                placeholder="Ground or stadium"
                            >
                        </label>


                        <label>
                            Tournament Date

                            <input
                                id="orgDate"
                                type="date"
                                required
                            >
                        </label>

                    </div>


                    <label>
                        Tournament Description

                        <textarea
                            id="orgDescription"
                            placeholder="Tell athletes about the tournament..."
                        ></textarea>

                    </label>


                    <button
                        class="rb-primary"
                        type="submit"
                    >
                        Create Tournament
                    </button>

                </form>

            </section>


            <section class="rb-card">

                <div class="rb-card-title">

                    <div>

                        <small>
                            ORGANIZER
                        </small>

                        <h3>
                            My Tournaments
                        </h3>

                    </div>

                </div>


                <div id="organizerTournamentList">

                    ${renderOrganizerTournaments()}

                </div>

            </section>
        `;
    }

    /* =====================================================
       ORGANIZER TOURNAMENT CREATION
       ===================================================== */

    window.createOrganizerTournament =
        function (event) {

            event.preventDefault();

            const tournament = {

                id:
                    "ORG-" +
                    Date.now(),

                name:
                    document
                        .getElementById("orgTournamentName")
                        .value
                        .trim(),

                sport:
                    document
                        .getElementById("orgTournamentSport")
                        .value,

                district:
                    document
                        .getElementById("orgDistrict")
                        .value
                        .trim(),

                village:
                    document
                        .getElementById("orgVillage")
                        .value
                        .trim(),

                venue:
                    document
                        .getElementById("orgVenue")
                        .value
                        .trim(),

                date:
                    document
                        .getElementById("orgDate")
                        .value,

                description:
                    document
                        .getElementById("orgDescription")
                        .value
                        .trim()
            };

            customData.tournaments.unshift(
                tournament
            );

            saveData();

            showRoleBasedDashboard();

            showRoleToast(
                "Tournament created successfully!"
            );
        };

    function renderOrganizerTournaments() {

        if (!customData.tournaments.length) {

            return `
                <div class="rb-empty-small">
                    You have not created a tournament yet.
                </div>
            `;
        }

        return customData.tournaments
            .map(function (item) {

                return `
                    <div class="rb-tournament">

                        <div class="rb-trophy">
                            🏆
                        </div>

                        <div>

                            <strong>
                                ${safe(item.name)}
                            </strong>

                            <p>
                                ${safe(item.sport)}
                                •
                                ${safe(item.date)}
                            </p>

                            <span>
                                📍 ${safe(item.venue)},
                                ${safe(item.village)},
                                ${safe(item.district)}
                            </span>

                        </div>

                    </div>
                `;

            })
            .join("");
    }

    /* =====================================================
       PANCHAYAT DASHBOARD
       ===================================================== */

    function panchayatDashboard() {

        return `

            <div class="rb-hero panchayat-hero">

                <div>

                    <span>
                        PANCHAYAT MODE
                    </span>

                    <h2>
                        Village Sports Command Centre
                    </h2>

                    <p>
                        Manage your village grounds,
                        equipment, maintenance and sports activity.
                    </p>

                </div>

                <div class="rb-hero-icon">
                    🏛️
                </div>

            </div>


            <div class="rb-stats">

                <div class="rb-stat">
                    <strong>
                        ${customData.grounds.length}
                    </strong>

                    <span>
                        Grounds Managed
                    </span>
                </div>

                <div class="rb-stat">
                    <strong>
                        ${customData.maintenance.filter(
                            r => r.status === "Pending"
                        ).length}
                    </strong>

                    <span>
                        Pending Maintenance
                    </span>
                </div>

                <div class="rb-stat">
                    <strong>86%</strong>
                    <span>Equipment Availability</span>
                </div>

                <div class="rb-stat">
                    <strong>128</strong>
                    <span>Athletes Training</span>
                </div>

            </div>


            <section class="rb-card">

                <div class="rb-card-title">

                    <div>

                        <small>
                            SPORTS INFRASTRUCTURE
                        </small>

                        <h3>
                            Grounds You Maintain
                        </h3>

                    </div>

                    <button
                        class="rb-primary"
                        onclick="showPanchayatGroundForm()"
                    >
                        + Add Ground
                    </button>

                </div>


                <div id="panchayatGroundForm"></div>


                <div class="rb-ground-grid">

                    ${renderPanchayatGrounds()}

                </div>

            </section>


            <section class="rb-card">

                <div class="rb-card-title">

                    <div>

                        <small>
                            MAINTENANCE
                        </small>

                        <h3>
                            Maintenance Reports
                        </h3>

                    </div>

                    <span>🔧</span>

                </div>


                <div class="rb-maintenance-list">

                    ${renderMaintenanceReports()}

                </div>

            </section>


            <div class="rb-grid-2">

                <section class="rb-card">

                    <div class="rb-card-title">

                        <div>

                            <small>
                                EQUIPMENT
                            </small>

                            <h3>
                                Equipment Status
                            </h3>

                        </div>

                        <span>🏋️</span>

                    </div>

                    ${equipmentList()}

                </section>


                <section class="rb-card">

                    <div class="rb-card-title">

                        <div>

                            <small>
                                COACHING
                            </small>

                            <h3>
                                Coaches & Athletes
                            </h3>

                        </div>

                        <span>🧑‍🏫</span>

                    </div>

                    ${panchayatCoaches()}

                </section>

            </div>
        `;
    }

    /* =====================================================
       PANCHAYAT GROUNDS
       ===================================================== */

    function renderPanchayatGrounds() {

        if (!customData.grounds.length) {

            return `
                <div class="rb-empty-small">
                    No Panchayat grounds added yet.
                    Click "Add Ground" to create one.
                </div>
            `;
        }

        return customData.grounds
            .map(function (ground) {

                return `
                    <div class="rb-ground">

                        <div class="rb-ground-icon">
                            🏟️
                        </div>

                        <div>

                            <h4>
                                ${safe(ground.name)}
                            </h4>

                            <p>
                                📍 ${safe(ground.village)},
                                ${safe(ground.district)}
                            </p>

                            <div class="rb-tags">

                                <span>
                                    ${safe(ground.sport)}
                                </span>

                                <span>
                                    ${safe(ground.condition)}
                                </span>

                                <span>
                                    ${safe(ground.athletes)}
                                    athletes
                                </span>

                            </div>

                        </div>

                    </div>
                `;

            })
            .join("");
    }

    /* =====================================================
       ADD GROUND FORM
       ===================================================== */

    window.showPanchayatGroundForm =
        function () {

            const container =
                document.getElementById(
                    "panchayatGroundForm"
                );

            if (!container) {
                return;
            }

            container.innerHTML = `

                <form
                    class="rb-form rb-ground-form"
                    onsubmit="createPanchayatGround(event)"
                >

                    <div class="rb-form-grid">

                        <label>
                            Ground Name

                            <input
                                id="panGroundName"
                                required
                                placeholder="Village Sports Ground"
                            >
                        </label>


                        <label>
                            District

                            <input
                                id="panGroundDistrict"
                                required
                                placeholder="District"
                            >
                        </label>


                        <label>
                            Village

                            <input
                                id="panGroundVillage"
                                required
                                placeholder="Village"
                            >
                        </label>


                        <label>
                            Main Sport

                            <select
                                id="panGroundSport"
                                required
                            >

                                <option value="">
                                    Select sport
                                </option>

                                <option>Cricket</option>
                                <option>Football</option>
                                <option>Kabaddi</option>
                                <option>Athletics</option>
                                <option>Hockey</option>
                                <option>Volleyball</option>

                            </select>
                        </label>


                        <label>
                            Ground Condition

                            <select
                                id="panGroundCondition"
                            >

                                <option>Good</option>
                                <option>Fair</option>
                                <option>Needs Maintenance</option>

                            </select>
                        </label>


                        <label>
                            Athletes Training

                            <input
                                id="panGroundAthletes"
                                type="number"
                                min="0"
                                value="0"
                            >
                        </label>

                    </div>


                    <div class="rb-form-actions">

                        <button
                            type="button"
                            class="rb-secondary"
                            onclick="showRoleBasedDashboard()"
                        >
                            Cancel
                        </button>

                        <button
                            class="rb-primary"
                            type="submit"
                        >
                            Save Ground
                        </button>

                    </div>

                </form>
            `;
        };

    /* =====================================================
       CREATE GROUND
       ===================================================== */

    window.createPanchayatGround =
        function (event) {

            event.preventDefault();

            const ground = {

                id:
                    "G-" +
                    Date.now(),

                name:
                    document
                        .getElementById("panGroundName")
                        .value
                        .trim(),

                district:
                    document
                        .getElementById("panGroundDistrict")
                        .value
                        .trim(),

                village:
                    document
                        .getElementById("panGroundVillage")
                        .value
                        .trim(),

                sport:
                    document
                        .getElementById("panGroundSport")
                        .value,

                condition:
                    document
                        .getElementById("panGroundCondition")
                        .value,

                athletes:
                    Number(
                        document
                            .getElementById("panGroundAthletes")
                            .value || 0
                    )
            };

            customData.grounds.push(
                ground
            );

            saveData();

            showRoleBasedDashboard();

            showRoleToast(
                "Ground added successfully!"
            );
        };

    /* =====================================================
       MAINTENANCE
       ===================================================== */

    function renderMaintenanceReports() {

        if (!customData.maintenance.length) {

            customData.maintenance = [

                {
                    id: "M001",
                    ground: "Village Cricket Ground",
                    issue: "Floodlight repair",
                    priority: "High",
                    status: "Pending"
                },

                {
                    id: "M002",
                    ground: "Main Kabaddi Ground",
                    issue: "Boundary maintenance",
                    priority: "Medium",
                    status: "Pending"
                }

            ];

            saveData();
        }

        return customData.maintenance
            .map(function (report) {

                return `
                    <div class="rb-maintenance">

                        <div>

                            <strong>
                                ${safe(report.ground)}
                            </strong>

                            <p>
                                ${safe(report.issue)}
                            </p>

                            <span class="rb-priority">
                                ${safe(report.priority)}
                                Priority
                            </span>

                        </div>

                        <div class="rb-maintenance-actions">

                            <span
                                class="rb-status ${
                                    report.status === "Approved"
                                        ? "approved"
                                        : ""
                                }"
                            >
                                ${safe(report.status)}
                            </span>

                            ${
                                report.status === "Pending"
                                ? `
                                    <button
                                        class="rb-approve"
                                        onclick="approvePanchayatMaintenance('${safe(report.id)}')"
                                    >
                                        ✓ Approve
                                    </button>
                                `
                                : ""
                            }

                        </div>

                    </div>
                `;

            })
            .join("");
    }

    /* =====================================================
       APPROVE MAINTENANCE
       ===================================================== */

    window.approvePanchayatMaintenance =
        function (id) {

            customData.maintenance =
                customData.maintenance.map(
                    function (report) {

                        if (report.id === id) {

                            return {
                                ...report,
                                status: "Approved"
                            };
                        }

                        return report;
                    }
                );

            saveData();

            showRoleBasedDashboard();

            showRoleToast(
                "Maintenance report approved."
            );
        };

    /* =====================================================
       EQUIPMENT
       ===================================================== */

    function equipmentList() {

        const equipment = [
            ["Cricket Kits", "18 / 20", "90%"],
            ["Football Sets", "12 / 15", "80%"],
            ["Kabaddi Mats", "8 / 10", "80%"],
            ["Athletics Equipment", "22 / 25", "88%"],
            ["Volleyball Nets", "9 / 10", "90%"]
        ];

        return `
            <div class="rb-equipment-list">

                ${equipment.map(function (item) {

                    return `
                        <div class="rb-equipment">

                            <div>

                                <strong>
                                    ${item[0]}
                                </strong>

                                <span>
                                    ${item[1]}
                                </span>

                            </div>

                            <div class="rb-equipment-bar">

                                <i style="width:${item[2]}"></i>

                            </div>

                        </div>
                    `;

                }).join("")}

            </div>
        `;
    }

    /* =====================================================
       PANCHAYAT COACHES
       ===================================================== */

    function panchayatCoaches() {

        const coaches = [
            ["Ravi Kumar", "Cricket", "42 athletes"],
            ["Priya Sharma", "Athletics", "31 athletes"],
            ["Suresh Yadav", "Kabaddi", "28 athletes"],
            ["Amit Singh", "Football", "27 athletes"]
        ];

        return `
            <div class="rb-coach-list">

                ${coaches.map(function (coach) {

                    return `
                        <div class="rb-coach">

                            <div class="rb-coach-avatar">
                                ${safe(
                                    coach[0]
                                        .substring(0, 2)
                                        .toUpperCase()
                                )}
                            </div>

                            <div>

                                <strong>
                                    ${safe(coach[0])}
                                </strong>

                                <span>
                                    ${safe(coach[1])}
                                    •
                                    ${safe(coach[2])}
                                </span>

                            </div>

                        </div>
                    `;

                }).join("")}

            </div>
        `;
    }

    /* =====================================================
       COMMUNITY DATA
       ===================================================== */

    function getCommunityPosts() {

        try {

            const posts =
                JSON.parse(
                    localStorage.getItem(
                        "khelogramCommunityPosts"
                    ) || "[]"
                );

            return posts.length
                ? posts
                : [
                    {
                        name: "KheloGram Sports Desk",
                        role: "Community",
                        title: "Village sports update",
                        content:
                            "Local athletes are preparing for the upcoming tournaments."
                    },
                    {
                        name: "Priya Sharma",
                        role: "Athlete",
                        title: "Training update",
                        content:
                            "Great training session today at our village ground!"
                    }
                ];

        } catch (error) {

            return [];
        }
    }

    /* =====================================================
       COACH CREATE POST
       ===================================================== */

    window.coachCreatePost =
        function () {

            const input =
                document.getElementById(
                    "coachPostText"
                );

            if (!input) {
                return;
            }

            const text =
                input.value.trim();

            if (!text) {

                showRoleToast(
                    "Please write something first."
                );

                return;
            }

            let posts =
                getCommunityPosts();

            posts.unshift({

                id:
                    "COACH-" +
                    Date.now(),

                name:
                    getCurrentUser()?.name ||
                    "Coach",

                role:
                    "Coach",

                title:
                    "Coach Update",

                content:
                    text,

                createdAt:
                    new Date().toISOString(),

                likes:
                    0

            });

            localStorage.setItem(
                "khelogramCommunityPosts",
                JSON.stringify(posts)
            );

            showRoleBasedDashboard();

            showRoleToast(
                "Community post published!"
            );
        };

    /* =====================================================
       CHANGE ROLE
       ===================================================== */

    window.changeKheloGramRole =
        function () {

            const custom =
                document.getElementById(
                    "roleSpecificDashboard"
                );

            if (custom) {
                custom.remove();
            }

            document
                .getElementById("dashboardPage")
                ?.classList.add("hidden");

            document
                .getElementById("landingPage")
                ?.classList.remove("hidden");

            if (
                typeof openRoleSelector ===
                "function"
            ) {
                openRoleSelector();
            }
        };

    /* =====================================================
       TOAST
       ===================================================== */

    function showRoleToast(message) {

        if (
            typeof showToast ===
            "function"
        ) {

            showToast(message);

            return;
        }

        alert(message);
    }

    /* =====================================================
       CSS
       ===================================================== */

    function injectRoleStyles() {

        if (
            document.getElementById(
                "khelogramRoleStyles"
            )
        ) {
            return;
        }

        const style =
            document.createElement("style");

        style.id =
            "khelogramRoleStyles";

        style.textContent = `

            .role-specific-dashboard {
                max-width: 1200px;
                margin: 0 auto;
                padding: 30px;
            }

            .rb-header {
                display:flex;
                justify-content:space-between;
                align-items:center;
                gap:25px;
                margin-bottom:15px;
            }

            .rb-eyebrow {
                color:#176b43;
                font-size:12px;
                font-weight:800;
                letter-spacing:1.2px;
                margin-bottom:8px;
            }

            .rb-header h1 {
                margin:0;
                font-size:38px;
            }

            .rb-header p {
                color:#68786f;
                margin-top:8px;
            }

            .rb-user {
                display:flex;
                align-items:center;
                gap:12px;
                background:#fff;
                border:1px solid #e1e9e4;
                padding:10px 15px;
                border-radius:16px;
            }

            .rb-user small {
                display:block;
                color:#748178;
                margin-top:3px;
            }

            .rb-avatar,
            .rb-post-avatar,
            .rb-athlete-avatar,
            .rb-coach-avatar {
                width:45px;
                height:45px;
                border-radius:50%;
                display:grid;
                place-items:center;
                background:#e5f4eb;
                color:#176b43;
                font-weight:800;
            }

            .rb-change-role {
                border:0;
                background:transparent;
                color:#176b43;
                font-weight:700;
                margin-bottom:20px;
                cursor:pointer;
            }

            .rb-hero {
                border-radius:25px;
                padding:32px;
                color:white;
                display:flex;
                justify-content:space-between;
                align-items:center;
                margin-bottom:20px;
            }

            .coach-hero {
                background:linear-gradient(135deg,#285d9c,#4b86c9);
            }

            .organizer-hero {
                background:linear-gradient(135deg,#8d5a12,#d89a2c);
            }

            .panchayat-hero {
                background:linear-gradient(135deg,#65471f,#9b713c);
            }

            .rb-hero h2 {
                margin:10px 0;
                font-size:30px;
            }

            .rb-hero p {
                opacity:.9;
                max-width:650px;
            }

            .rb-hero-icon {
                font-size:65px;
            }

            .rb-stats {
                display:grid;
                grid-template-columns:repeat(4,1fr);
                gap:15px;
                margin-bottom:20px;
            }

            .rb-stat {
                background:#fff;
                border:1px solid #e1e9e4;
                border-radius:18px;
                padding:22px;
            }

            .rb-stat strong {
                display:block;
                color:#176b43;
                font-size:30px;
            }

            .rb-stat span {
                display:block;
                color:#6b786f;
                margin-top:5px;
                font-size:13px;
            }

            .rb-grid-2 {
                display:grid;
                grid-template-columns:1fr 1fr;
                gap:20px;
                margin-bottom:20px;
            }

            .rb-card {
                background:#fff;
                border:1px solid #e1e9e4;
                border-radius:20px;
                padding:24px;
                margin-bottom:20px;
            }

            .rb-card-title {
                display:flex;
                align-items:center;
                justify-content:space-between;
                gap:15px;
                margin-bottom:20px;
            }

            .rb-card-title small {
                color:#176b43;
                font-size:11px;
                font-weight:800;
                letter-spacing:1px;
            }

            .rb-card-title h3 {
                margin:6px 0 0;
                font-size:20px;
            }

            .rb-card-title > span {
                font-size:30px;
            }

            .rb-athlete,
            .rb-coach,
            .rb-tournament,
            .rb-maintenance {
                display:flex;
                align-items:center;
                gap:13px;
                padding:13px 0;
                border-bottom:1px solid #edf1ee;
            }

            .rb-athlete:last-child,
            .rb-coach:last-child,
            .rb-tournament:last-child,
            .rb-maintenance:last-child {
                border-bottom:0;
            }

            .rb-athlete-info,
            .rb-coach > div:last-child {
                flex:1;
            }

            .rb-athlete-info span,
            .rb-coach span {
                display:block;
                color:#758179;
                font-size:13px;
                margin-top:4px;
            }

            .rb-progress {
                width:130px;
            }

            .rb-progress > span {
                display:block;
                text-align:right;
                font-size:12px;
                color:#176b43;
                font-weight:700;
            }

            .rb-progress i,
            .rb-equipment-bar {
                display:block;
                height:7px;
                background:#e9efeb;
                border-radius:10px;
                overflow:hidden;
            }

            .rb-progress b,
            .rb-equipment-bar i {
                display:block;
                height:100%;
                background:#176b43;
                border-radius:10px;
            }

            .rb-location {
                padding:15px;
                background:#f5faf7;
                border-radius:15px;
            }

            .rb-location p {
                color:#69766e;
            }

            .rb-tags {
                display:flex;
                flex-wrap:wrap;
                gap:7px;
                margin-top:10px;
            }

            .rb-tags span {
                background:#edf5ef;
                color:#176b43;
                padding:5px 9px;
                border-radius:999px;
                font-size:11px;
                font-weight:700;
            }

            .rb-post-form {
                background:#f7faf8;
                border-radius:16px;
                padding:15px;
                margin-bottom:18px;
            }

            .rb-post-form textarea,
            .rb-form input,
            .rb-form select,
            .rb-form textarea {
                width:100%;
                border:1px solid #dce5df;
                border-radius:11px;
                padding:12px;
                margin-bottom:12px;
                font:inherit;
                background:white;
            }

            .rb-post-form textarea {
                width:100%;
                min-height:90px;
                resize:vertical;
                border:1px solid #dce5df;
                border-radius:11px;
                padding:12px;
                margin-bottom:10px;
                font:inherit;
            }

            .rb-post {
                display:flex;
                gap:12px;
                padding:15px 0;
                border-bottom:1px solid #edf1ee;
            }

            .rb-post small {
                display:block;
                color:#7b867f;
                margin:3px 0 8px;
            }

            .rb-post h4 {
                margin:0 0 5px;
            }

            .rb-post p {
                margin:0;
                color:#65736a;
                line-height:1.5;
            }

            .rb-primary,
            .rb-approve {
                border:0;
                background:#176b43;
                color:#fff;
                border-radius:10px;
                padding:11px 16px;
                font-weight:700;
                cursor:pointer;
            }

            .rb-secondary {
                border:1px solid #d5e0d8;
                background:white;
                color:#176b43;
                border-radius:10px;
                padding:10px 16px;
                cursor:pointer;
            }

            .rb-form-grid {
                display:grid;
                grid-template-columns:1fr 1fr;
                gap:14px;
            }

            .rb-form label {
                display:block;
                color:#45534a;
                font-size:13px;
                font-weight:700;
            }

            .rb-form label input,
            .rb-form label select {
                display:block;
                margin-top:7px;
            }

            .rb-form textarea {
                margin-top:7px;
                min-height:100px;
                resize:vertical;
            }

            .rb-form-actions {
                display:flex;
                gap:10px;
                justify-content:flex-end;
            }

            .rb-tournament {
                align-items:flex-start;
            }

            .rb-trophy {
                font-size:35px;
            }

            .rb-tournament p,
            .rb-tournament span {
                color:#6d796f;
                margin:5px 0;
                font-size:13px;
            }

            .rb-ground-grid {
                display:grid;
                grid-template-columns:1fr 1fr;
                gap:14px;
            }

            .rb-ground {
                display:flex;
                gap:15px;
                padding:18px;
                border:1px solid #e1e9e4;
                border-radius:16px;
            }

            .rb-ground-icon {
                font-size:38px;
            }

            .rb-ground h4 {
                margin:0 0 6px;
            }

            .rb-ground p {
                color:#6d796f;
                margin:0;
            }

            .rb-maintenance {
                justify-content:space-between;
                gap:20px;
            }

            .rb-maintenance p {
                color:#6d796f;
                margin:5px 0;
            }

            .rb-priority {
                display:inline-block;
                background:#fff0df;
                color:#a45b00;
                padding:5px 8px;
                border-radius:999px;
                font-size:11px;
                font-weight:700;
            }

            .rb-maintenance-actions {
                display:flex;
                align-items:center;
                gap:10px;
            }

            .rb-status {
                background:#fff1df;
                color:#a45b00;
                border-radius:999px;
                padding:6px 9px;
                font-size:11px;
                font-weight:700;
            }

            .rb-status.approved {
                background:#e6f6eb;
                color:#176b43;
            }

            .rb-equipment {
                padding:13px 0;
            }

            .rb-equipment > div:first-child {
                display:flex;
                justify-content:space-between;
                margin-bottom:7px;
            }

            .rb-equipment span {
                color:#176b43;
                font-weight:700;
            }

            .rb-empty,
            .rb-empty-small {
                text-align:center;
                padding:45px 20px;
                color:#718077;
            }

            .rb-big-icon {
                font-size:65px;
            }

            @media(max-width:900px) {

                .rb-stats {
                    grid-template-columns:1fr 1fr;
                }

                .rb-grid-2,
                .rb-ground-grid {
                    grid-template-columns:1fr;
                }

            }

            @media(max-width:650px) {

                .role-specific-dashboard {
                    padding:20px 15px;
                }

                .rb-header {
                    align-items:flex-start;
                    flex-direction:column;
                }

                .rb-header h1 {
                    font-size:30px;
                }

                .rb-user {
                    width:100%;
                }

                .rb-hero {
                    padding:23px;
                }

                .rb-hero h2 {
                    font-size:24px;
                }

                .rb-hero-icon {
                    display:none;
                }

                .rb-stats {
                    grid-template-columns:1fr;
                }

                .rb-form-grid {
                    grid-template-columns:1fr;
                }

                .rb-maintenance {
                    align-items:flex-start;
                    flex-direction:column;
                }

                .rb-maintenance-actions {
                    width:100%;
                    justify-content:space-between;
                }

                .rb-progress {
                    width:90px;
                }
            }
        `;

        document.head.appendChild(style);
    }

    /* =====================================================
       OVERRIDE EXISTING SHOW DASHBOARD
       ===================================================== */

    const originalShowDashboard =
        window.showDashboard;

    window.showDashboard = function () {

        const role =
            getCurrentRole();

        if (role === "Athlete") {

            if (
                typeof originalShowDashboard ===
                "function"
            ) {

                originalShowDashboard();

            } else {

                showOriginalAthleteDashboard();
            }

            return;
        }

        showRoleBasedDashboard();
    };

    /* =====================================================
       INITIALIZE
       ===================================================== */

    injectRoleStyles();

})();
