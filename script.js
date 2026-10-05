const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project");

const projectCount = document.getElementById("projectCount");
const projectSearch = document.getElementById("projectSearch");

const projectLinks = document.querySelectorAll(".project-link");

const projectModal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");

const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTechnologies = document.getElementById("modalTechnologies");

function updateProjects() {
    const selectedFilter =
        document.querySelector(".filter-btn.active").dataset.filter;

    const searchTerm = projectSearch.value.toLowerCase().trim();

    let visibleCount = 0;

    projects.forEach(project => {
        const technologies = [...project.querySelectorAll(".tech-tags span")]
            .map(tag => tag.textContent);

        const projectText = project.textContent.toLowerCase();

        const matchesFilter =
            selectedFilter === "all" ||
            technologies.includes(selectedFilter);

        const matchesSearch =
            projectText.includes(searchTerm);

        const shouldShow =
            matchesFilter && matchesSearch;

        project.style.display = shouldShow ? "block" : "none";

        if (shouldShow) {
            visibleCount++;
        }
    });

    projectCount.textContent = visibleCount;
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        updateProjects();
    });
});

projectSearch.addEventListener("input", updateProjects);

updateProjects();

projectLinks.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        const project = link.closest(".project");

        const title = project.querySelector("h3").textContent;
        const description = project.querySelector("p").textContent;

        const technologies = project.querySelectorAll(".tech-tags span");

        modalTitle.textContent = title;
        modalDescription.textContent = description;

        modalTechnologies.innerHTML = "";

        technologies.forEach(technology => {
            const tag = document.createElement("span");

            tag.textContent = technology.textContent;

            modalTechnologies.appendChild(tag);
        });

        projectModal.style.display = "flex";
    });
});
modalClose.addEventListener("click", () => {
    projectModal.style.display = "none";
});
projectModal.addEventListener("click", event => {
    if (event.target === projectModal) {
        projectModal.style.display = "none";
    }
});