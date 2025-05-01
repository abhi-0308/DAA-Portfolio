// Enhanced Smooth scrolling function with offset adjustment
function scrollToIntro() {
    const introSection = document.getElementById("introduction");
    const headerHeight = document.querySelector("header").offsetHeight;
    const topOffset = introSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
    
    window.scrollTo({
        top: topOffset,
        behavior: "smooth"
    });
}

function goToConcepts() {
    window.location.href = "concepts.html";
}

function scrollToAchievements() {
    const achievementsSection = document.getElementById("achievements");
    const headerHeight = document.querySelector("header").offsetHeight;
    const topOffset = achievementsSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
    
    window.scrollTo({
        top: topOffset,
        behavior: "smooth"
    });
}

function goToLab() {
    window.location.href = "lab.html";
}

// Animation tracking for sections
let animatedSections = new Set();

// Accordion functionality
document.addEventListener("DOMContentLoaded", () => {
    // Handle accordion toggle
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    
    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const parentItem = header.parentElement;
            
            // Close all other accordion items
            const allItems = document.querySelectorAll(".accordion-item");
            allItems.forEach(item => {
                if (item !== parentItem && item.classList.contains("active")) {
                    item.classList.remove("active");
                    item.querySelector(".accordion-content").style.maxHeight = null;
                    item.querySelector(".accordion-content").style.display = "none";
                }
            });
            
            // Toggle current item
            parentItem.classList.toggle("active");
            const content = header.nextElementSibling;
            
            if (parentItem.classList.contains("active")) {
                content.style.display = "block";
                // Allow the browser to calculate the height before setting maxHeight
                setTimeout(() => {
                    content.style.maxHeight = content.scrollHeight + "px";
                }, 10);
            } else {
                content.style.maxHeight = null;
                // Wait for transition to finish before hiding
                setTimeout(() => {
                    content.style.display = "none";
                }, 300);
            }
        });
    });
    
    // Add active class to current navigation item
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll("header nav a");
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute("href");
        if (linkHref === currentPage) {
            link.classList.add("active-nav");
        }
    });
    
    // Auto-open first accordion item if on lab page
    if ((currentPage === "lab.html" || window.location.pathname.includes("lab")) && accordionHeaders.length > 0) {
        const firstItem = accordionHeaders[0].parentElement;
        firstItem.classList.add("active");
        const content = firstItem.querySelector(".accordion-content");
        content.style.display = "block";
        setTimeout(() => {
            content.style.maxHeight = content.scrollHeight + "px";
        }, 10);
    }
    
    // Enhanced scroll animation for sections
    const sections = document.querySelectorAll(".section, .concept, .timeline-item, .objective-card, .benefit-card");
    
    function checkScroll() {
        sections.forEach(section => {
            if (animatedSections.has(section)) return;
            
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.85) {
                section.classList.add("animated");
                animatedSections.add(section);
            }
        });
    }
    
    // Check scroll position on load and scroll
    checkScroll();
    window.addEventListener("scroll", checkScroll);
    
    // Filter functionality for lab experiments
    const filterButtons = document.querySelectorAll(".filter-btn");
    const accordionItems = document.querySelectorAll(".accordion-item");
    
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            
            // Add active class to clicked button
            button.classList.add("active");
            
            // Get filter value
            const filter = button.getAttribute("data-filter");
            
            // Filter accordion items with animation
            accordionItems.forEach(item => {
                item.style.transition = "opacity 0.3s ease, transform 0.3s ease";
                
                if (filter === "all") {
                    item.style.opacity = "0";
                    item.style.transform = "translateY(10px)";
                    setTimeout(() => {
                        item.style.display = "block";
                        setTimeout(() => {
                            item.style.opacity = "1";
                            item.style.transform = "translateY(0)";
                        }, 50);
                    }, 300);
                } else {
                    const itemType = item.getAttribute("data-type");
                    if (itemType === filter) {
                        item.style.opacity = "0";
                        item.style.transform = "translateY(10px)";
                        setTimeout(() => {
                            item.style.display = "block";
                            setTimeout(() => {
                                item.style.opacity = "1";
                                item.style.transform = "translateY(0)";
                            }, 50);
                        }, 300);
                    } else {
                        item.style.opacity = "0";
                        item.style.transform = "translateY(10px)";
                        setTimeout(() => {
                            item.style.display = "none";
                        }, 300);
                    }
                }
            });
            
            // Close all accordion contents
            accordionItems.forEach(item => {
                item.classList.remove("active");
                const content = item.querySelector(".accordion-content");
                if (content) {
                    content.style.maxHeight = null;
                    setTimeout(() => {
                        content.style.display = "none";
                    }, 300);
                }
            });
            
            // Open the first visible item after filtering
            setTimeout(() => {
                const visibleItems = Array.from(accordionItems).filter(
                    item => item.style.display !== "none"
                );
                
                if (visibleItems.length > 0) {
                    visibleItems[0].classList.add("active");
                    const content = visibleItems[0].querySelector(".accordion-content");
                    if (content) {
                        content.style.display = "block";
                        setTimeout(() => {
                            content.style.maxHeight = content.scrollHeight + "px";
                        }, 10);
                    }
                }
            }, 600);
        });
    });
    
    // Initialize dark/light mode toggle
    initThemeToggle();
    
    // Initialize search functionality if search elements exist
    if (document.querySelector('.search-input') && document.querySelector('.search-btn')) {
        initSearch();
    }
});

// Back to top button with smooth animation
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    const backToTopBtn = document.getElementById("backToTopBtn");
    
    if (backToTopBtn) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.style.opacity = "1";
            backToTopBtn.style.transform = "scale(1)";
            backToTopBtn.style.pointerEvents = "auto";
        } else {
            backToTopBtn.style.opacity = "0";
            backToTopBtn.style.transform = "scale(0.8)";
            backToTopBtn.style.pointerEvents = "none";
        }
    }
}

function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Theme toggle functionality (dark/light mode)
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.id = 'themeToggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.title = 'Toggle Dark/Light Mode';
    document.body.appendChild(themeToggle);
    
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (!searchInput || !searchBtn) return;
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm.length < 2) return;
        
        // Clear previous results
        const prevResults = document.querySelector('.search-results');
        if (prevResults) prevResults.remove();
        
        const sections = document.querySelectorAll('.section, .concept, .accordion-item');
        const results = [];
        
        sections.forEach(section => {
            const sectionContent = section.textContent.toLowerCase();
            if (sectionContent.includes(searchTerm)) {
                let title = '';
                
                // Try to find a heading within the section
                const heading = section.querySelector('h1, h2, h3, h4');
                if (heading) {
                    title = heading.textContent;
                } else {
                    // For accordion items
                    const accordionHeader = section.querySelector('.accordion-header');
                    if (accordionHeader) {
                        title = accordionHeader.textContent;
                    } else {
                        title = 'Section Content';
                    }
                }
                
                results.push({
                    title: title,
                    element: section
                });
            }
        });
        
        // Display results
        if (results.length > 0) {
            displaySearchResults(results, searchTerm);
        } else {
            showNoResultsMessage(searchTerm);
        }
    }
    
    function displaySearchResults(results, searchTerm) {
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';
        
        const resultsHeader = document.createElement('div');
        resultsHeader.className = 'results-header';
        resultsHeader.innerHTML = `<h3>Found ${results.length} results for "${searchTerm}"</h3><button class="close-results"><i class="fas fa-times"></i></button>`;
        resultsContainer.appendChild(resultsHeader);
        
        const resultsList = document.createElement('div');
        resultsList.className = 'results-list';
        
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.textContent = result.title;
            resultItem.addEventListener('click', () => {
                // Scroll to the element
                const headerHeight = document.querySelector("header").offsetHeight;
                const topOffset = result.element.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: topOffset,
                    behavior: "smooth"
                });
                
                // Highlight the element temporarily
                result.element.classList.add('search-highlight');
                setTimeout(() => {
                    result.element.classList.remove('search-highlight');
                }, 2000);
                
                // Close results
                resultsContainer.remove();
            });
            
            resultsList.appendChild(resultItem);
        });
        
        resultsContainer.appendChild(resultsList);
        document.body.appendChild(resultsContainer);
        
        // Add close button functionality
        const closeBtn = resultsContainer.querySelector('.close-results');
        closeBtn.addEventListener('click', () => {
            resultsContainer.remove();
        });
    }
    
    function showNoResultsMessage(searchTerm) {
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';
        
        const resultsHeader = document.createElement('div');
        resultsHeader.className = 'results-header';
        resultsHeader.innerHTML = `<h3>No results found for "${searchTerm}"</h3><button class="close-results"><i class="fas fa-times"></i></button>`;
        resultsContainer.appendChild(resultsHeader);
        
        document.body.appendChild(resultsContainer);
        
        // Add close button functionality
        const closeBtn = resultsContainer.querySelector('.close-results');
        closeBtn.addEventListener('click', () => {
            resultsContainer.remove();
        });
    }
}

// Add progress tracking for timeline
function initProgressTracking() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length === 0) return;
    
    const progressBar = document.createElement('div');
    progressBar.className = 'timeline-progress';
    document.querySelector('.timeline').prepend(progressBar);
    
    window.addEventListener('scroll', () => {
        let progress = 0;
        let itemsInView = 0;
        
        timelineItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const isVisible = 
                rect.top < window.innerHeight * 0.75 &&
                rect.bottom > 0;
            
            if (isVisible) {
                itemsInView++;
            }
        });
        
        progress = (itemsInView / timelineItems.length) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

// Initialize timeline progress if timeline exists
if (document.querySelector('.timeline')) {
    window.addEventListener('load', initProgressTracking);
}