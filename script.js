
/* =========================================================
   KHELOGRAM — STAGE 1
   Interaction & UI Logic
   ========================================================= */


/* ================= DOM ================= */

const roleModal =
    document.getElementById("roleModal");

const toast =
    document.getElementById("toast");

const toastTitle =
    document.getElementById("toastTitle");

const toastMessage =
    document.getElementById("toastMessage");


/* ================= ROLE MODAL ================= */

function openRoleModal() {

    roleModal.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeRoleModal() {

    roleModal.classList.remove("active");

    document.body.style.overflow = "";
}


function closeModalOutside(event) {

    if (event.target === roleModal) {
        closeRoleModal();
    }
}


/* ================= ROLE SELECTION ================= */

function selectRole(role) {

    closeRoleModal();

    showToast(
        `${role} selected`,
        "KheloGram is preparing your workspace..."
    );

    /*
        Stage 1:
        We only demonstrate the role-selection flow.

        In Stage 2, this will route to the
        actual role-based dashboard.
    */

    console.log(
        `KheloGram role selected: ${role}`
    );
}


/* ================= TOAST ================= */

function showToast(title, message) {

    toastTitle.textContent = title;

    toastMessage.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3500);
}


/* ================= MOBILE MENU ================= */

function toggleMobileMenu() {

    const nav =
        document.querySelector(".nav-links");

    if (!nav) {
        return;
    }

    const isOpen =
        nav.classList.contains("mobile-open");

    if (isOpen) {

        nav.classList.remove("mobile-open");

    } else {

        nav.classList.add("mobile-open");

        nav.style.display = "flex";

        nav.style.position = "absolute";

        nav.style.top = "68px";

        nav.style.left = "0";

        nav.style.right = "0";

        nav.style.padding = "18px";

        nav.style.flexDirection = "column";

        nav.style.alignItems = "stretch";

        nav.style.background = "white";

        nav.style.borderBottom =
            "1px solid #e5eaf1";

        nav.style.boxShadow =
            "0 15px 30px rgba(0,0,0,0.08)";
    }
}


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(
        ".role-card, .module-card, .flow-item, .impact-box"
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "revealed"
                    );

                    observer.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(20px)";

    element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(element);

});


/* ================= REVEAL CLASS ================= */

const revealStyle =
    document.createElement("style");

revealStyle.textContent = `

    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    @media (max-width: 760px) {

        .nav-links.mobile-open a,
        .nav-links.mobile-open button {
            display: block;
        }

    }

`;

document.head.appendChild(revealStyle);


/* ================= NAVBAR SCROLL ================= */

const navbar =
    document.querySelector(".navbar");


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 20) {

            navbar.style.boxShadow =
                "0 8px 30px rgba(15,35,60,0.06)";

        } else {

            navbar.style.boxShadow = "none";

        }

    }
);


/* ================= SMOOTH NAVIGATION ================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(
                    targetId
                );

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            const nav =
                document.querySelector(
                    ".nav-links"
                );

            if (
                nav &&
                nav.classList.contains(
                    "mobile-open"
                )
            ) {

                nav.classList.remove(
                    "mobile-open"
                );

                nav.removeAttribute("style");

            }

        }
    );

});


/* ================= KEYBOARD SUPPORT ================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            closeRoleModal();

        }

    }
);


/* ================= INITIALIZATION ================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "KheloGram Stage 1 initialized."
        );

    }
);
