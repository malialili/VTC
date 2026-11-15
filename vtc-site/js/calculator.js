/**
 * VTC Bordeaux - Tarif Calculator
 * Calculates estimated prices for VTC rides based on various parameters
 */

// Tarif data - prices in euros
const tarifData = {
    // Base prices for different routes
    routes: {
        // Airport routes
        'Aéroport Bordeaux-Mérignac': {
            'Bordeaux Centre': { berline: 40, van: 65 },
            'Talence': { berline: 40, van: 65 },
            'Pessac': { berline: 35, van: 60 },
            'Mérignac': { berline: 25, van: 50 },
            'Bègles': { berline: 45, van: 70 },
            'Gradignan': { berline: 40, van: 65 },
            'Villenave-d\'Ornon': { berline: 40, van: 65 },
            'Cenon': { berline: 40, van: 65 },
            'Lormont': { berline: 40, van: 65 },
            'Floirac': { berline: 40, van: 65 },
            'Bouliac': { berline: 45, van: 70 },
        },
        'Bordeaux Centre': {
            'Aéroport Bordeaux-Mérignac': { berline: 40, van: 65 },
            'Gare Saint-Jean': { berline: 25, van: 45 },
            'Talence': { berline: 15, van: 30 },
            'Pessac': { berline: 20, van: 35 },
            'Mérignac': { berline: 25, van: 45 },
            'Bègles': { berline: 15, van: 30 },
            'Arcachon': { berline: 85, van: 120 },
            'Cap Ferret': { berline: 95, van: 130 },
            'Dune du Pilat': { berline: 75, van: 110 },
            'Lacanau': { berline: 70, van: 105 },
            'Biscarrosse': { berline: 80, van: 115 },
            'Saint-Émilion': { berline: 65, van: 95 },
            'La Teste-de-Buch': { berline: 85, van: 120 },
            'Pyla-sur-Mer': { berline: 85, van: 120 },
        },
        'Gare Saint-Jean': {
            'Aéroport Bordeaux-Mérignac': { berline: 35, van: 60 },
            'Bordeaux Centre': { berline: 15, van: 25 },
        },
        // Tourist destinations from Bordeaux Centre
        'Arcachon': {
            'Bordeaux Centre': { berline: 85, van: 120 },
            'Aéroport Bordeaux-Mérignac': { berline: 90, van: 125 },
        },
        'Cap Ferret': {
            'Bordeaux Centre': { berline: 95, van: 130 },
        },
        'Dune du Pilat': {
            'Bordeaux Centre': { berline: 75, van: 110 },
        },
        'Lacanau': {
            'Bordeaux Centre': { berline: 70, van: 105 },
        },
    },
    
    // Distance-based pricing (fallback)
    distances: {
        // Approximate distances in km
        'Bordeaux Centre': 0,
        'Aéroport Bordeaux-Mérignac': 12,
        'Gare Saint-Jean': 2,
        'Talence': 5,
        'Pessac': 7,
        'Mérignac': 10,
        'Bègles': 6,
        'Gradignan': 8,
        'Villenave-d\'Ornon': 8,
        'Cenon': 4,
        'Lormont': 6,
        'Floirac': 5,
        'Bouliac': 8,
        'Arcachon': 60,
        'Cap Ferret': 65,
        'Dune du Pilat': 60,
        'Lacanau': 50,
        'Biscarrosse': 70,
        'Saint-Émilion': 50,
        'La Teste-de-Buch': 60,
        'Pyla-sur-Mer': 65,
    },
    
    // Price per km
    pricePerKm: {
        berline: 1.5,
        van: 2.0,
    },
    
    // Fixed fees
    fixedFees: {
        berline: 10,
        van: 20,
    },
    
    // Time-based adjustments
    timeAdjustments: {
        jour: { berline: 1.0, van: 1.0 },
        nuit: { berline: 1.2, van: 1.2 },
        dimanche: { berline: 1.3, van: 1.3 },
    },
    
    // Minimum prices
    minimums: {
        berline: 25,
        van: 50,
    }
};

// DOM Elements
const calculatorForm = document.getElementById('tarif-calculator');
const calculatorResult = document.getElementById('calculator-result');
const resultPrice = document.getElementById('result-price');
const resultDetails = document.getElementById('result-details');

// Initialize calculator
function initCalculator() {
    if (!calculatorForm || !calculatorResult) return;
    
    calculatorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateTarif();
    });
    
    // Also calculate on change for better UX
    const inputs = calculatorForm.querySelectorAll('select');
    inputs.forEach(input => {
        input.addEventListener('change', calculateTarif);
    });
}

// Calculate tarif
function calculateTarif() {
    const formData = new FormData(calculatorForm);
    
    const depart = formData.get('depart');
    const arrivee = formData.get('arrivee');
    const passagers = parseInt(formData.get('passagers')) || 1;
    const vehicule = formData.get('vehicule');
    const horaire = formData.get('horaire');
    
    // Validate inputs
    if (!depart || !arrivee || !passagers || !vehicule) {
        hideResult();
        return;
    }
    
    // Check if vehicle is appropriate for passengers
    if (vehicule === 'berline' && passagers > 4) {
        showError('Pour plus de 4 passagers, veuillez sélectionner un Van.');
        return;
    }
    
    if (vehicule === 'van' && passagers <= 4) {
        showWarning('Un van est recommandé à partir de 5 passagers. Pour 4 passagers ou moins, une berline est plus économique.');
    }
    
    // Get price from route data
    let price = getRoutePrice(depart, arrivee, vehicule);
    
    if (price === null) {
        // Fallback to distance-based calculation
        price = calculateDistancePrice(depart, arrivee, vehicule);
    }
    
    // Apply time adjustment
    if (horaire && tarifData.timeAdjustments[horaire]) {
        const adjustment = tarifData.timeAdjustments[horaire][vehicule];
        price = Math.round(price * adjustment);
    }
    
    // Apply minimum price
    const minimum = tarifData.minimums[vehicule];
    price = Math.max(price, minimum);
    
    // Format result
    displayResult(price, depart, arrivee, passagers, vehicule, horaire);
}

// Get price from route data
function getRoutePrice(depart, arrivee, vehicule) {
    // Check direct route
    if (tarifData.routes[depart] && tarifData.routes[depart][arrivee]) {
        return tarifData.routes[depart][arrivee][vehicule];
    }
    
    // Check reverse route
    if (tarifData.routes[arrivee] && tarifData.routes[arrivee][depart]) {
        return tarifData.routes[arrivee][depart][vehicule];
    }
    
    return null;
}

// Calculate price based on distance
function calculateDistancePrice(depart, arrivee, vehicule) {
    const distance = Math.abs(
        (tarifData.distances[depart] || 0) - (tarifData.distances[arrivee] || 0)
    );
    
    if (distance === 0) return tarifData.minimums[vehicule];
    
    const price = Math.round(
        tarifData.fixedFees[vehicule] + (distance * tarifData.pricePerKm[vehicule])
    );
    
    return price;
}

// Display result
function displayResult(price, depart, arrivee, passagers, vehicule, horaire) {
    // Format price
    const formattedPrice = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
    
    // Build details
    const vehicleLabel = vehicule === 'berline' ? 'Berline' : 'Van';
    const timeLabel = horaire ? getHoraireLabel(horaire) : 'Jour';
    
    const details = `
        ${depart} → ${arrivee} | ${passagers} ${passagers > 1 ? 'passagers' : 'passager'} | ${vehicleLabel} | ${timeLabel}
    `;
    
    // Update DOM
    resultPrice.textContent = formattedPrice;
    resultDetails.textContent = details;
    
    // Show result
    calculatorResult.hidden = false;
    
    // Scroll to result
    calculatorResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Hide result
function hideResult() {
    if (calculatorResult) {
        calculatorResult.hidden = true;
    }
}

// Show error
function showError(message) {
    if (!calculatorResult) return;
    
    resultPrice.textContent = 'Error';
    resultDetails.textContent = message;
    calculatorResult.classList.add('error');
    calculatorResult.hidden = false;
}

// Show warning
function showWarning(message) {
    if (!calculatorResult) return;
    
    // Still calculate but show warning
    calculateTarif();
    
    const warningElement = document.createElement('div');
    warningElement.className = 'calculator-warning';
    warningElement.textContent = '⚠️ ' + message;
    
    // Insert warning before result
    calculatorResult.parentNode.insertBefore(warningElement, calculatorResult);
    
    // Remove after 5 seconds
    setTimeout(() => {
        warningElement.remove();
    }, 5000);
}

// Get horaire label
function getHoraireLabel(horaire) {
    switch (horaire) {
        case 'jour': return 'Jour (6h-22h)';
        case 'nuit': return 'Nuit (22h-6h)';
        case 'dimanche': return 'Dimanche & jours fériés';
        default: return horaire;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalculator);
} else {
    initCalculator();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateTarif, tarifData };
}
