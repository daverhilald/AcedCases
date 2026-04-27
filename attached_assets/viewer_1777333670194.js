// PDF Viewer JavaScript with PDF.js

// Deck metadata (in real implementation, this would come from a database or API)
const deckMetadata = {
    'deck1': {
        title: 'Market Entry Strategy - RetailTech Case',
        competition: 'McKinsey Case Competition 2024',
        team: 'Team Alpha',
        college: 'IIM Ahmedabad',
        year: '2024',
        category: 'Strategy',
        description: 'A comprehensive market entry strategy for a RetailTech startup looking to disrupt the traditional retail space. The deck showcases thorough market analysis, competitive positioning, and a phased go-to-market approach that impressed the judges.',
        members: [
            { name: 'Rahul Sharma', linkedin: 'https://linkedin.com/in/rahulsharma' },
            { name: 'Priya Patel', linkedin: 'https://linkedin.com/in/priyapatel' },
            { name: 'Amit Kumar', linkedin: 'https://linkedin.com/in/amitkumar' }
        ],
        pdfUrl: 'pdfs/sample1.pdf'
    },
    'deck2': {
        title: 'Investment Portfolio Optimization',
        competition: 'Goldman Sachs Challenge 2024',
        team: 'Team Quantum',
        college: 'ISB',
        year: '2024',
        category: 'Finance',
        description: 'An innovative approach to portfolio optimization using modern risk management techniques and quantitative analysis. The team demonstrated exceptional financial modeling skills and strategic thinking.',
        members: [
            { name: 'Sneha Reddy', linkedin: 'https://linkedin.com/in/snehareddy' },
            { name: 'Karthik Menon', linkedin: 'https://linkedin.com/in/karthikmenon' }
        ],
        pdfUrl: 'pdfs/sample2.pdf'
    },
    'deck3': {
        title: 'Supply Chain Digital Transformation',
        competition: 'BCG Operations Excellence 2023',
        team: 'Team Phoenix',
        college: 'XLRI',
        year: '2023',
        category: 'Operations',
        description: 'A blueprint for digital transformation in supply chain management, featuring cutting-edge technology integration and process optimization strategies that delivered measurable ROI.',
        members: [
            { name: 'Anjali Singh', linkedin: 'https://linkedin.com/in/anjalisingh' },
            { name: 'Rohan Desai', linkedin: 'https://linkedin.com/in/rohandesai' },
            { name: 'Meera Kapoor', linkedin: 'https://linkedin.com/in/meerakapoor' }
        ],
        pdfUrl: 'pdfs/sample3.pdf'
    }
    // Add more deck metadata as needed
};

// PDF.js Configuration
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// Viewer state
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 1.0;
const maxScale = 3.0;
const minScale = 0.5;
const scaleStep = 0.25;

// Get deck ID from URL
function getDeckIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('deck') || 'deck1';
}

// Initialize viewer
document.addEventListener('DOMContentLoaded', function() {
    const deckId = getDeckIdFromUrl();
    const metadata = deckMetadata[deckId];
    
    if (!metadata) {
        showError('Deck not found');
        return;
    }
    
    // Load deck metadata
    loadDeckMetadata(metadata);
    
    // Load PDF - For demo purposes, we'll show a message since we don't have actual PDFs
    // In production, you would load the actual PDF file
    loadPDF(metadata.pdfUrl);
    
    // Setup controls
    setupControls();
});

// Load deck metadata into the info section
function loadDeckMetadata(metadata) {
    document.getElementById('deckTitle').textContent = metadata.title;
    document.getElementById('categoryBadge').textContent = metadata.category;
    document.getElementById('yearBadge').textContent = metadata.year;
    document.getElementById('competitionName').textContent = metadata.competition;
    document.getElementById('teamName').textContent = metadata.team;
    document.getElementById('teamCollege').textContent = metadata.college;
    document.getElementById('deckDescription').textContent = metadata.description;
    
    // Render team members
    const teamMembersContainer = document.getElementById('teamMembers');
    teamMembersContainer.innerHTML = metadata.members.map(member => `
        <a href="${member.linkedin}" target="_blank" rel="noopener noreferrer" class="member-link">
            <div class="member-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="7" fill="white"/>
                </svg>
            </div>
            <span class="member-name">${member.name}</span>
            <svg class="linkedin-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V2C16 0.9 15.1 0 14 0ZM5 13H3V6H5V13ZM4 5C3.4 5 3 4.6 3 4C3 3.4 3.4 3 4 3C4.6 3 5 3.4 5 4C5 4.6 4.6 5 4 5ZM13 13H11V9.5C11 8.7 10.3 8 9.5 8C8.7 8 8 8.7 8 9.5V13H6V6H8V7C8.5 6.4 9.2 6 10 6C11.7 6 13 7.3 13 9V13Z"/>
            </svg>
        </a>
    `).join('');
}

// Load PDF
function loadPDF(url) {
    const loadingMessage = document.getElementById('loadingMessage');
    
    // For demo purposes - show a placeholder message
    // In production, replace this with actual PDF loading
    loadingMessage.textContent = 'PDF viewer demo - In production, the actual PDF would load here';
    
    // Uncomment and use this in production with actual PDF files:
    /*
    pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
        pdfDoc = pdfDoc_;
        document.getElementById('totalPages').textContent = pdfDoc.numPages;
        loadingMessage.style.display = 'none';
        
        // Initial render
        renderPage(pageNum);
    }).catch(function(error) {
        showError('Error loading PDF: ' + error.message);
    });
    */
    
    // Demo fallback: Create a sample canvas display
    createDemoCanvas();
}

// Create demo canvas (placeholder for actual PDF)
function createDemoCanvas() {
    const canvas = document.getElementById('pdfCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 800;
    canvas.height = 1000;
    
    // Draw a sample "PDF page" look
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some demo content
    ctx.fillStyle = '#0A1128';
    ctx.font = 'bold 48px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('PDF Viewer Demo', canvas.width / 2, 100);
    
    ctx.font = '24px Inter, sans-serif';
    ctx.fillStyle = '#6B7280';
    ctx.fillText('In production, your actual PDF', canvas.width / 2, 200);
    ctx.fillText('would be displayed here using PDF.js', canvas.width / 2, 240);
    
    ctx.font = '18px Inter, sans-serif';
    ctx.fillText('The viewer prevents downloading while', canvas.width / 2, 320);
    ctx.fillText('allowing full page navigation and zoom', canvas.width / 2, 350);
    
    // Draw a sample "slide" layout
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 3;
    ctx.strokeRect(100, 450, 600, 400);
    
    ctx.fillStyle = '#3B82F6';
    ctx.font = 'bold 32px Poppins, sans-serif';
    ctx.fillText('Sample Deck Content', canvas.width / 2, 550);
    
    ctx.fillStyle = '#374151';
    ctx.font = '20px Inter, sans-serif';
    ctx.fillText('• Key insight 1', 200, 620);
    ctx.fillText('• Key insight 2', 200, 660);
    ctx.fillText('• Key insight 3', 200, 700);
    
    document.getElementById('loadingMessage').style.display = 'none';
    document.getElementById('totalPages').textContent = '15'; // Demo page count
    document.getElementById('currentPage').textContent = '1';
}

// Render page (for actual PDF loading)
function renderPage(num) {
    pageRendering = true;
    
    pdfDoc.getPage(num).then(function(page) {
        const canvas = document.getElementById('pdfCanvas');
        const ctx = canvas.getContext('2d');
        const viewport = page.getViewport({ scale: scale });
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        
        const renderTask = page.render(renderContext);
        
        renderTask.promise.then(function() {
            pageRendering = false;
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });
    
    document.getElementById('currentPage').textContent = num;
}

// Queue render page
function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

// Setup viewer controls
function setupControls() {
    // Previous page
    document.getElementById('prevPage').addEventListener('click', function() {
        if (pageNum <= 1) return;
        pageNum--;
        document.getElementById('currentPage').textContent = pageNum;
        // In production: queueRenderPage(pageNum);
    });
    
    // Next page
    document.getElementById('nextPage').addEventListener('click', function() {
        const totalPages = parseInt(document.getElementById('totalPages').textContent);
        if (pageNum >= totalPages) return;
        pageNum++;
        document.getElementById('currentPage').textContent = pageNum;
        // In production: queueRenderPage(pageNum);
    });
    
    // Zoom in
    document.getElementById('zoomIn').addEventListener('click', function() {
        if (scale >= maxScale) return;
        scale += scaleStep;
        updateZoomLevel();
        // In production: queueRenderPage(pageNum);
    });
    
    // Zoom out
    document.getElementById('zoomOut').addEventListener('click', function() {
        if (scale <= minScale) return;
        scale -= scaleStep;
        updateZoomLevel();
        // In production: queueRenderPage(pageNum);
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowLeft':
                document.getElementById('prevPage').click();
                break;
            case 'ArrowRight':
                document.getElementById('nextPage').click();
                break;
            case '+':
            case '=':
                document.getElementById('zoomIn').click();
                break;
            case '-':
                document.getElementById('zoomOut').click();
                break;
        }
    });
    
    // Disable right-click on canvas to prevent easy saving
    const canvas = document.getElementById('pdfCanvas');
    canvas.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
}

// Update zoom level display
function updateZoomLevel() {
    const zoomPercent = Math.round(scale * 100);
    document.getElementById('zoomLevel').textContent = zoomPercent + '%';
}

// Show error message
function showError(message) {
    const loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.textContent = message;
    loadingMessage.style.color = '#EF4444';
}

// Prevent PDF download attempts
window.addEventListener('keydown', function(e) {
    // Prevent Ctrl+S / Cmd+S
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        return false;
    }
    
    // Prevent Ctrl+P / Cmd+P (print)
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        alert('Printing is disabled for copyright protection');
        return false;
    }
});

// Disable drag and drop on canvas
const canvas = document.getElementById('pdfCanvas');
if (canvas) {
    canvas.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
}
