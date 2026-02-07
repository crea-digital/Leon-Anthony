"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const animatedSections = document.querySelectorAll(".fade-in-section");
    if (animatedSections.length === 0) {
        return;
    }
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedSections.forEach(section => {
        observer.observe(section);
    });
});
