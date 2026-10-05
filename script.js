const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project");

const projectCount = document.getElementById("projectCount");
const projectSearch = document.getElementById("projectSearch");

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