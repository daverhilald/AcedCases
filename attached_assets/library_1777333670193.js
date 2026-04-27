// Library Page JavaScript - Deck Data and Filtering

// Sample deck data - Replace this with your real deck data
const decksData = [
    {
        id: 'deck1',
        title: 'Market Entry Strategy - RetailTech Case',
        team: 'Team Alpha',
        college: 'IIM Ahmedabad',
        competition: 'McKinsey Case Competition 2024',
        year: '2024',
        category: 'college',
        topics: ['marketing', 'strategy'],
        tags: ['Marketing', 'Retail', 'College'],
        thumbnail: 'Strategy',
        pdfUrl: 'pdfs/sample1.pdf' // Add your actual PDF path
    },
    {
        id: 'deck2',
        title: 'Investment Portfolio Optimization',
        team: 'Team Quantum',
        college: 'ISB',
        competition: 'Goldman Sachs Challenge 2024',
        year: '2024',
        category: 'corporate',
        topics: ['finance', 'analytics'],
        tags: ['Finance', 'Analytics', 'Corporate'],
        thumbnail: 'Finance',
        pdfUrl: 'pdfs/sample2.pdf'
    },
    {
        id: 'deck3',
        title: 'Supply Chain Digital Transformation',
        team: 'Team Phoenix',
        college: 'XLRI',
        competition: 'BCG Operations Excellence 2023',
        year: '2023',
        category: 'college',
        topics: ['operations', 'analytics'],
        tags: ['Operations', 'Digital', 'College'],
        thumbnail: 'Operations',
        pdfUrl: 'pdfs/sample3.pdf'
    },
    {
        id: 'deck4',
        title: 'Customer Retention Analytics Framework',
        team: 'Team Velocity',
        college: 'IIM Bangalore',
        competition: 'Bain Capability Challenge 2024',
        year: '2024',
        category: 'corporate',
        topics: ['marketing', 'analytics'],
        tags: ['Marketing', 'Analytics', 'Corporate'],
        thumbnail: 'Marketing',
        pdfUrl: 'pdfs/sample4.pdf'
    },
    {
        id: 'deck5',
        title: 'Sustainable Energy Transition Strategy',
        team: 'Team Horizon',
        college: 'SPJIMR',
        competition: 'Shell Business Case Competition 2023',
        year: '2023',
        category: 'corporate',
        topics: ['strategy', 'operations'],
        tags: ['Strategy', 'Sustainability', 'Corporate'],
        thumbnail: 'Strategy',
        pdfUrl: 'pdfs/sample5.pdf'
    },
    {
        id: 'deck6',
        title: 'FinTech Growth Strategy for Emerging Markets',
        team: 'Team Nexus',
        college: 'FMS Delhi',
        competition: 'HSBC International Case Competition 2024',
        year: '2024',
        category: 'college',
        topics: ['finance', 'strategy'],
        tags: ['Finance', 'Strategy', 'College'],
        thumbnail: 'Finance',
        pdfUrl: 'pdfs/sample6.pdf'
    },
    {
        id: 'deck7',
        title: 'Omnichannel Retail Transformation',
        team: 'Team Catalyst',
        college: 'MDI Gurgaon',
        competition: 'Deloitte TechnoUtsav 2023',
        year: '2023',
        category: 'college',
        topics: ['marketing', 'operations'],
        tags: ['Marketing', 'Retail', 'College'],
        thumbnail: 'Marketing',
        pdfUrl: 'pdfs/sample7.pdf'
    },
    {
        id: 'deck8',
        title: 'AI-Driven Risk Management Model',
        team: 'Team Apex',
        college: 'IIM Calcutta',
        competition: 'JPMorgan Chase Innovation Challenge 2024',
        year: '2024',
        category: 'corporate',
        topics: ['finance', 'analytics'],
        tags: ['Finance', 'Analytics', 'Corporate'],
        thumbnail: 'Analytics',
        pdfUrl: 'pdfs/sample8.pdf'
    },
    {
        id: 'deck9',
        title: 'Manufacturing Process Optimization',
        team: 'Team Prime',
        college: 'NITIE Mumbai',
        competition: 'Mahindra War Room 2022',
        year: '2022',
        category: 'college',
        topics: ['operations', 'analytics'],
        tags: ['Operations', 'Manufacturing', 'College'],
        thumbnail: 'Operations',
        pdfUrl: 'pdfs/sample9.pdf'
    },
    {
        id: 'deck10',
        title: 'Brand Revitalization Strategy',
        team: 'Team Innovate',
        college: 'IIFT Delhi',
        competition: 'Unilever Future Leaders League 2023',
        year: '2023',
        category: 'corporate',
        topics: ['marketing', 'strategy'],
        tags: ['Marketing', 'Strategy', 'Corporate'],
        thumbnail: 'Marketing',
        pdfUrl: 'pdfs/sample10.pdf'
    }
];

// State management
let filteredDecks = [...decksData];
let activeFilters = {
    category: new Set(['all']),
    topic: new Set(),
    year: new Set(),
    search: ''
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    renderDecks(decksData);
    setupEventListeners();
    updateDeckCount(decksData.length);
});

// Render deck cards
function renderDecks(decks) {
    const deckGrid = document.getElementById('deckGrid');
    
    if (decks.length === 0) {
        deckGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <h3 style="color: var(--text-secondary); font-size: 20px; margin-bottom: 12px;">No decks found</h3>
                <p style="color: var(--text-secondary); font-size: 14px;">Try adjusting your filters or search query</p>
            </div>
        `;
        return;
    }
    
    deckGrid.innerHTML = decks.map(deck => `
        <div class="deck-card" data-deck-id="${deck.id}">
            <div class="deck-thumbnail">
                <div class="deck-tag">${deck.thumbnail}</div>
            </div>
            <div class="deck-content">
                <h3 class="deck-title">${deck.title}</h3>
                <p class="deck-team">${deck.team} • ${deck.college}</p>
                <p class="deck-competition">${deck.competition}</p>
                <div class="deck-tags">
                    ${deck.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="viewer.html?deck=${deck.id}" class="deck-link">View Deck →</a>
            </div>
        </div>
    `).join('');

    // Add animation
    animateDeckCards();
}

// Animate deck cards on render
function animateDeckCards() {
    const cards = document.querySelectorAll('.deck-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.querySelector('.search-button');
    
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    // Filter checkboxes
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    const topicCheckboxes = document.querySelectorAll('input[name="topic"]');
    const yearCheckboxes = document.querySelectorAll('input[name="year"]');

    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => handleCategoryFilter(checkbox));
    });

    topicCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => handleFilter('topic', checkbox));
    });

    yearCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => handleFilter('year', checkbox));
    });

    // Sort select
    const sortSelect = document.querySelector('.sort-select');
    sortSelect.addEventListener('change', handleSort);

    // Clear filters button
    const clearButton = document.querySelector('.clear-filters');
    clearButton.addEventListener('click', clearAllFilters);
}

// Handle search
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    activeFilters.search = searchInput.value.toLowerCase().trim();
    applyFilters();
}

// Handle category filter (special case - "All" checkbox)
function handleCategoryFilter(checkbox) {
    const allCheckbox = document.querySelector('input[name="category"][value="all"]');
    
    if (checkbox.value === 'all') {
        if (checkbox.checked) {
            // If "All" is checked, uncheck other category filters
            document.querySelectorAll('input[name="category"]:not([value="all"])').forEach(cb => {
                cb.checked = false;
            });
            activeFilters.category.clear();
            activeFilters.category.add('all');
        }
    } else {
        // If specific category is checked, uncheck "All"
        if (checkbox.checked) {
            allCheckbox.checked = false;
            activeFilters.category.delete('all');
            activeFilters.category.add(checkbox.value);
        } else {
            activeFilters.category.delete(checkbox.value);
            // If no categories selected, check "All"
            if (activeFilters.category.size === 0) {
                allCheckbox.checked = true;
                activeFilters.category.add('all');
            }
        }
    }
    
    applyFilters();
}

// Handle topic and year filters
function handleFilter(filterType, checkbox) {
    if (checkbox.checked) {
        activeFilters[filterType].add(checkbox.value);
    } else {
        activeFilters[filterType].delete(checkbox.value);
    }
    applyFilters();
}

// Apply all filters
function applyFilters() {
    filteredDecks = decksData.filter(deck => {
        // Category filter
        const categoryMatch = activeFilters.category.has('all') || 
                             activeFilters.category.has(deck.category);
        
        // Topic filter
        const topicMatch = activeFilters.topic.size === 0 || 
                          deck.topics.some(topic => activeFilters.topic.has(topic));
        
        // Year filter
        const yearMatch = activeFilters.year.size === 0 || 
                         activeFilters.year.has(deck.year);
        
        // Search filter
        const searchMatch = !activeFilters.search || 
                           deck.title.toLowerCase().includes(activeFilters.search) ||
                           deck.team.toLowerCase().includes(activeFilters.search) ||
                           deck.college.toLowerCase().includes(activeFilters.search) ||
                           deck.competition.toLowerCase().includes(activeFilters.search) ||
                           deck.tags.some(tag => tag.toLowerCase().includes(activeFilters.search));
        
        return categoryMatch && topicMatch && yearMatch && searchMatch;
    });
    
    renderDecks(filteredDecks);
    updateDeckCount(filteredDecks.length);
}

// Handle sorting
function handleSort(e) {
    const sortValue = e.target.value;
    
    switch(sortValue) {
        case 'recent':
            filteredDecks.sort((a, b) => b.year.localeCompare(a.year));
            break;
        case 'name':
            filteredDecks.sort((a, b) => a.competition.localeCompare(b.competition));
            break;
        case 'team':
            filteredDecks.sort((a, b) => a.team.localeCompare(b.team));
            break;
    }
    
    renderDecks(filteredDecks);
}

// Clear all filters
function clearAllFilters() {
    // Reset checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = checkbox.value === 'all';
    });
    
    // Reset search
    document.getElementById('searchInput').value = '';
    
    // Reset active filters
    activeFilters = {
        category: new Set(['all']),
        topic: new Set(),
        year: new Set(),
        search: ''
    };
    
    // Reset and render
    filteredDecks = [...decksData];
    renderDecks(filteredDecks);
    updateDeckCount(filteredDecks.length);
}

// Update deck count
function updateDeckCount(count) {
    const deckCountElement = document.getElementById('deckCount');
    if (deckCountElement) {
        deckCountElement.textContent = count;
    }
}

// Export deck data for viewer page
window.getDecks = function() {
    return decksData;
};

window.getDeckById = function(id) {
    return decksData.find(deck => deck.id === id);
};
