// Emergency Hotline Data
const hotlineData = [
    {
        id: 1,
        nameBn: "জরুরি সেবা ৯৯৯",
        nameEn: "Emergency Service 999",
        number: "999",
        category: "Emergency",
        iconColor: "#ef4444",
        iconClass: "fas fa-ambulance"
    },
    {
        id: 2,
        nameBn: "ফায়ার সার্ভিস",
        nameEn: "Fire Service",
        number: "16163",
        category: "Fire",
        iconColor: "#f97316",
        iconClass: "fas fa-fire"
    },
    {
        id: 3,
        nameBn: "পুলিশ হেল্পলাইন",
        nameEn: "Police Helpline",
        number: "100",
        category: "Police",
        iconColor: "#3b82f6",
        iconClass: "fas fa-shield-alt"
    },
    {
        id: 4,
        nameBn: "নারীর সহায়তা",
        nameEn: "Women Support",
        number: "109",
        category: "Support",
        iconColor: "#ec4899",
        iconClass: "fas fa-female"
    },
    {
        id: 5,
        nameBn: "স্বাস্থ্য বাতায়ন",
        nameEn: "Health Portal",
        number: "16263",
        category: "Health",
        iconColor: "#10b981",
        iconClass: "fas fa-heartbeat"
    },
    {
        id: 6,
        nameBn: "বাংলাদেশ রেড ক্রিসেন্ট",
        nameEn: "Bangladesh Red Crescent",
        number: "01730303030",
        category: "Volunteer",
        iconColor: "#ef4444",
        iconClass: "fas fa-plus-square"
    },
    {
        id: 7,
        nameBn: "বিদ্যুৎ জরুরি সেবা",
        nameEn: "Electricity Emergency",
        number: "01700119999",
        category: "Utility",
        iconColor: "#f59e0b",
        iconClass: "fas fa-bolt"
    },
    {
        id: 8,
        nameBn: "জাতীয় হেল্পলাইন",
        nameEn: "National Helpline",
        number: "333",
        category: "Government",
        iconColor: "#8b5cf6",
        iconClass: "fas fa-phone-alt"
    }
];

// App State
let state = {
    heartCount: 0,
    coinCount: 100,
    copyCount: 0,
    callHistory: [],
    likedCards: new Set()
};

// DOM Elements
const heartCountEl = document.getElementById('heart-count');
const coinCountEl = document.getElementById('coin-count');
const copyCountEl = document.getElementById('copy-count');
const cardsContainer = document.getElementById('cards-container');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history');
const alertModal = document.getElementById('alert-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalCloseBtn = document.getElementById('modal-close');

// Initialize the app
function initApp() {
    renderCards();
    updateStats();
    loadFromLocalStorage();
    
    // Event Listeners
    clearHistoryBtn.addEventListener('click', clearHistory);
    modalCloseBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    alertModal.addEventListener('click', (e) => {
        if (e.target === alertModal) {
            closeModal();
        }
    });
}

// Render all hotline cards
function renderCards() {
    cardsContainer.innerHTML = '';
    
    hotlineData.forEach(service => {
        const card = createCard(service);
        cardsContainer.appendChild(card);
    });
}

// Create a single card element
function createCard(service) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = service.id;
    
    // Check if card is liked
    const isLiked = state.likedCards.has(service.id);
    
    // Category color mapping
    const categoryColors = {
        'Emergency': '#ef4444',
        'Fire': '#f97316',
        'Police': '#3b82f6',
        'Support': '#ec4899',
        'Health': '#10b981',
        'Volunteer': '#ef4444',
        'Utility': '#f59e0b',
        'Government': '#8b5cf6'
    };
    
    card.innerHTML = `
        <div class="card-header">
            <div class="card-icon" style="background-color: ${service.iconColor}">
                <i class="${service.iconClass}"></i>
            </div>
            <div class="card-title">
                <h3 class="card-name-bn">${service.nameBn}</h3>
                <p class="card-name-en">${service.nameEn}</p>
            </div>
            <button class="card-heart ${isLiked ? 'active' : ''}" data-id="${service.id}">
                <i class="fas fa-heart"></i>
            </button>
        </div>
        <div class="card-number">
            <i class="fas fa-phone"></i>
            <span>${formatPhoneNumber(service.number)}</span>
        </div>
        <div class="card-category">
            <span class="category-badge" style="background-color: ${categoryColors[service.category]}20; color: ${categoryColors[service.category]}">
                ${service.category}
            </span>
        </div>
        <div class="card-actions">
            <button class="action-btn copy-btn" data-number="${service.number}" data-name="${service.nameBn}">
                <i class="far fa-copy"></i> কপি করুন
            </button>
            <button class="action-btn call-btn" data-number="${service.number}" data-name="${service.nameBn}" data-id="${service.id}">
                <i class="fas fa-phone"></i> কল করুন
            </button>
        </div>
    `;
    
    // Add event listeners to card buttons
    const heartBtn = card.querySelector('.card-heart');
    const copyBtn = card.querySelector('.copy-btn');
    const callBtn = card.querySelector('.call-btn');
    
    heartBtn.addEventListener('click', () => handleHeartClick(service.id));
    copyBtn.addEventListener('click', () => handleCopyClick(service.number, service.nameBn));
    callBtn.addEventListener('click', () => handleCallClick(service.number, service.nameBn, service.id));
    
    return card;
}

// Format phone number for display
function formatPhoneNumber(number) {
    if (number.length <= 5) {
        return number;
    }
    return number.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

// Handle heart button click
function handleHeartClick(cardId) {
    const heartBtn = document.querySelector(`.card-heart[data-id="${cardId}"]`);
    
    if (state.likedCards.has(cardId)) {
        // Unlike
        state.likedCards.delete(cardId);
        heartBtn.classList.remove('active');
        state.heartCount = Math.max(0, state.heartCount - 1);
    } else {
        // Like
        state.likedCards.add(cardId);
        heartBtn.classList.add('active');
        state.heartCount++;
    }
    
    updateStats();
    saveToLocalStorage();
}

// Handle copy button click
function handleCopyClick(number, name) {
    // Copy to clipboard
    navigator.clipboard.writeText(number)
        .then(() => {
            state.copyCount++;
            updateStats();
            saveToLocalStorage();
            
            // Show success message
            showAlert('কপি সম্পন্ন!', `"${name}" এর নম্বর কপি করা হয়েছে: ${number}`);
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
            showAlert('ত্রুটি!', 'নম্বর কপি করতে সমস্যা হয়েছে।');
        });
}

// Handle call button click
function handleCallClick(number, name, cardId) {
    // Check if user has enough coins
    if (state.coinCount < 20) {
        showAlert('অপারগতা!', 'আপনার কাছে পর্যাপ্ত কয়েন নেই। কল করতে কমপক্ষে ২০ কয়েন প্রয়োজন।');
        return;
    }
    
    // Deduct coins
    state.coinCount -= 20;
    
    // Add to call history with current time
    const now = new Date();
    const timeString = now.toLocaleTimeString('bn-BD', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });
    
    const callRecord = {
        number,
        name,
        time: timeString,
        timestamp: now.toISOString()
    };
    
    state.callHistory.unshift(callRecord); // Add to beginning
    updateStats();
    updateHistoryDisplay();
    saveToLocalStorage();
    
    // Show alert
    showAlert('কল করা হচ্ছে!', `"${name}" কে কল করা হচ্ছে: ${number}\n২০ কয়েন খরচ হয়েছে।`);
    
    // Add liked heart automatically
    if (!state.likedCards.has(cardId)) {
        state.likedCards.add(cardId);
        state.heartCount++;
        updateStats();
        
        // Update heart button visually
        const heartBtn = document.querySelector(`.card-heart[data-id="${cardId}"]`);
        if (heartBtn) {
            heartBtn.classList.add('active');
        }
    }
}

// Update all statistics display
function updateStats() {
    heartCountEl.textContent = state.heartCount;
    coinCountEl.textContent = state.coinCount;
    copyCountEl.textContent = state.copyCount;
}

// Update call history display
function updateHistoryDisplay() {
    if (state.callHistory.length === 0) {
        historyList.innerHTML = `
            <div class="empty-history">
                <i class="fas fa-phone-slash"></i>
                <p>কোন কলের ইতিহাস নেই</p>
            </div>
        `;
        return;
    }
    
    historyList.innerHTML = state.callHistory.map(record => `
        <div class="history-item">
            <div class="history-info">
                <div class="history-name">${record.name}</div>
                <div class="history-number">${record.number}</div>
            </div>
            <div class="history-time">${record.time}</div>
        </div>
    `).join('');
}

// Clear call history
function clearHistory() {
    if (state.callHistory.length === 0) {
        showAlert('ইতিহাস খালি', 'কলের ইতিহাস ইতিমধ্যে খালি আছে।');
        return;
    }
    
    if (confirm('আপনি কি নিশ্চিত যে আপনি সকল কলের ইতিহাস মুছতে চান?')) {
        state.callHistory = [];
        updateHistoryDisplay();
        saveToLocalStorage();
        showAlert('ইতিহাস মুছে ফেলা হয়েছে', 'সকল কলের ইতিহাস মুছে ফেলা হয়েছে।');
    }
}

// Show alert modal
function showAlert(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    alertModal.classList.add('active');
}

// Close alert modal
function closeModal() {
    alertModal.classList.remove('active');
}

// Save state to localStorage
function saveToLocalStorage() {
    const saveData = {
        ...state,
        likedCards: Array.from(state.likedCards),
        callHistory: state.callHistory
    };
    localStorage.setItem('emergencyHotlineState', JSON.stringify(saveData));
}

// Load state from localStorage
function loadFromLocalStorage() {
    const saved = localStorage.getItem('emergencyHotlineState');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            state.heartCount = parsed.heartCount || 0;
            state.coinCount = parsed.coinCount || 100;
            state.copyCount = parsed.copyCount || 0;
            state.callHistory = parsed.callHistory || [];
            state.likedCards = new Set(parsed.likedCards || []);
            
            updateStats();
            updateHistoryDisplay();
            
            // Update heart buttons visually
            state.likedCards.forEach(cardId => {
                const heartBtn = document.querySelector(`.card-heart[data-id="${cardId}"]`);
                if (heartBtn) {
                    heartBtn.classList.add('active');
                }
            });
        } catch (error) {
            console.error('Error loading saved state:', error);
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);