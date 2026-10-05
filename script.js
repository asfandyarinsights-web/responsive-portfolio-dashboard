const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        projects.forEach(project => {
            const technologies = [...project.querySelectorAll(".tech-tags span")]
                .map(tag => tag.textContent);

            const showProject =
                filter === "all" || technologies.includes(filter);

            project.style.display = showProject ? "block" : "none";
        });

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    });
});