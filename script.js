// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    const yearTabs = document.querySelectorAll('.year');
    const yearContents = document.querySelectorAll('.year-content');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const categoryItems = document.querySelectorAll('.category-list li');
    
    // Fix for cards in year 2027 and 2028
    fixCardLayouts();
    
    // Set default active year to 2025
    document.querySelector('[data-year="2025"]').classList.add('active');
    document.getElementById('year-2025').classList.add('active');
    
    // Year tab click event
    yearTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            yearTabs.forEach(t => t.classList.remove('active'));
            yearContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const yearId = this.getAttribute('data-year');
            document.getElementById(`year-${yearId}`).classList.add('active');
        });
    });
    
    // Save checkbox state to localStorage
    checkboxes.forEach(checkbox => {
        // Load saved state from localStorage
        const savedState = localStorage.getItem(checkbox.id);
        if (savedState === 'true') {
            checkbox.checked = true;
        }
        
        // Save state when changed
        checkbox.addEventListener('change', function() {
            localStorage.setItem(this.id, this.checked);
            updateCardStyle(this);
        });
        
        // Apply initial styles
        updateCardStyle(checkbox);
    });
    
    // Update card style based on checkbox state
    function updateCardStyle(checkbox) {
        const card = checkbox.closest('.card');
        if (checkbox.checked) {
            card.style.opacity = '0.7';
            card.style.border = '2px solid #4caf50';
        } else {
            card.style.opacity = '1';
            card.style.border = 'none';
        }
    }
    
    // Fix card layouts for years 2027 and 2028
    function fixCardLayouts() {
        // Fix for year 2027
        const year2027 = document.getElementById('year-2027');
        if (year2027) {
            // Get all cards that are direct children of year-2027 (not in cards-container)
            const looseCards = Array.from(year2027.children).filter(child => 
                child.classList.contains('card') && child.parentNode.id === 'year-2027'
            );
            
            // If there are loose cards, add them to the cards-container
            if (looseCards.length > 0) {
                const cardsContainer = year2027.querySelector('.cards-container');
                looseCards.forEach(card => {
                    cardsContainer.appendChild(card.cloneNode(true));
                    year2027.removeChild(card);
                });
            }
        }
        
        // Fix for year 2028
        const year2028 = document.getElementById('year-2028');
        if (year2028) {
            // Make sure all cards are in a cards-container
            const cards = year2028.querySelectorAll('.card');
            const cardsContainer = year2028.querySelector('.cards-container');
            
            if (cards.length > 0 && cardsContainer) {
                // Ensure all cards are properly contained
                cards.forEach(card => {
                    if (card.parentNode.id === 'year-2028') {
                        cardsContainer.appendChild(card.cloneNode(true));
                        year2028.removeChild(card);
                    }
                });
            }
        }
    }
    
    // Category item click event for filtering
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.textContent.trim().toLowerCase();
            filterCards(category);
        });
    });
       
    // Filter cards based on category
    function filterCards(category) {
        const cards = document.querySelectorAll('.card');
        
        if (category === 'buckets') {
            // Show all cards if "Buckets" is selected
            cards.forEach(card => card.style.display = 'block');
            return;
        }
        
        cards.forEach(card => {
            const cardTitle = card.querySelector('h4').textContent.toLowerCase();
            
            // Simple matching logic - improve this for real implementation
            if (category.includes('travel') && (cardTitle.includes('travel') || cardTitle.includes('country') || cardTitle.includes('safari') || cardTitle.includes('backpack'))) {
                card.style.display = 'block';
            } else if (category.includes('financial') && (cardTitle.includes('financial') || cardTitle.includes('income') || cardTitle.includes('investment'))) {
                card.style.display = 'block';
            } else if (category.includes('health') && (cardTitle.includes('marathon') || cardTitle.includes('fitness') || cardTitle.includes('triathlon'))) {
                card.style.display = 'block';
            } else if (category.includes('creative') && (cardTitle.includes('write') || cardTitle.includes('book') || cardTitle.includes('photography') || cardTitle.includes('art'))) {
                card.style.display = 'block';
            } else if (category.includes('relationships') && (cardTitle.includes('family') || cardTitle.includes('tradition') || cardTitle.includes('reunion'))) {
                card.style.display = 'block';
            } else if (category.includes('career') && (cardTitle.includes('business') || cardTitle.includes('startup') || cardTitle.includes('career'))) {
                card.style.display = 'block';
            } else if (category.includes('personal') && (cardTitle.includes('learn') || cardTitle.includes('master') || cardTitle.includes('language'))) {
                card.style.display = 'block';
            } else if (category.includes('lifestyle') && (cardTitle.includes('live') || cardTitle.includes('experience') || cardTitle.includes('adventure'))) {
                card.style.display = 'block';
            } else if (category.includes('legacy') && (cardTitle.includes('legacy') || cardTitle.includes('foundation') || cardTitle.includes('mentor'))) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Add hover effect to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        });
    });
});