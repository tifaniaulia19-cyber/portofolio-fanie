// Ganti data ini dengan proyek Anda sendiri
const projects = [
    {
        tag: "Project 01",
        title: "Akhwat Creative Project",
        desc: "Deskripsi singkat tentang proyek ini: masalah yang diselesaikan dan alat yang digunakan."
    },
    
       {
        tag: "Project 03",
        title: "By Little Design",
        desc: "Deskripsi singkat tentang proyek ini: masalah yang diselesaikan dan alat yang digunakan."
    },

    {
        tag: "Project 04",
        title: "Sakinah Jambi",
        desc: "Deskripsi singkat tentang proyek ini: masalah yang diselesaikan dan alat yang digunakan."
    },

      {
        tag: "Project 05",
        title: "UI/UX Design",
        desc: "Deskripsi singkat tentang proyek ini: masalah yang diselesaikan dan alat yang digunakan."
    },
    
    
    {
        tag: "Project 06",
        title: "Smart Service Haramain",
        desc: "Deskripsi singkat tentang proyek ini: masalah yang diselesaikan dan alat yang digunakan."

        
    }
];

function renderProjects() {
    const grid = document.getElementById("project-grid");
    if (!grid) return;

    grid.innerHTML = projects.map(p => `
        <article class="project-card">
            <span class="tag">${p.tag}</span>
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
        </article>
    `).join("");
}

function setupBackToTop() {
    const btn = document.getElementById("to-top");
    if (!btn) return;
    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderProjects();
    setupBackToTop();
});
