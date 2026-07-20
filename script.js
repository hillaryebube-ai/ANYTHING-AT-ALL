let allCars = [];
let currentFilter = 'all';

// Load cars data and initialize
document.addEventListener('DOMContentLoaded', async () => {
    await loadCars();
    displayCars('all');
    setupContactForm();
});

// Load cars from data.json
async function loadCars() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        allCars = data.cars;
    } catch (error) {
        console.error('Error loading cars:', error);
    }
}

// Display cars with animation
function displayCars(filter = 'all') {
    currentFilter = filter;
    const container = document.getElementById('cars-container');
    container.innerHTML = '';

    let filteredCars = allCars;

    if (filter !== 'all') {
        filteredCars = allCars.filter(car => car.category.includes(filter));
    }

    if (filteredCars.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">No cars found in this category.</p>';
        return;
    }

    filteredCars.forEach((car, index) => {
        setTimeout(() => {
            const carCard = createCarCard(car);
            container.appendChild(carCard);
        }, index * 100);
    });
}

// Create a car card element
function createCarCard(car) {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.innerHTML = `
        <img src="${car.image}" alt="${car.name}" class="car-image">
        <div class="car-info">
            <div class="car-header">
                <div>
                    <div class="car-name">${car.name}</div>
                    <div class="car-category">${car.category}</div>
                </div>
                <div class="car-year">${car.year}</div>
            </div>
            <p class="car-description">${car.description}</p>
            <div class="car-specs">
                ${Object.values(car.specs).map(spec => `<div class="spec-item">✓ ${spec}</div>`).join('')}
            </div>
            <div class="car-footer">
                <div class="car-price">${car.price}</div>
                <button class="car-btn" onclick="viewDetails(${car.id})">Learn More</button>
            </div>
        </div>
    `;
    return card;
}

// Filter cars
function filterCars(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    displayCars(category);
}

// View car details
function viewDetails(carId) {
    const car = allCars.find(c => c.id === carId);
    if (car) {
        const message = `
${car.name}
Category: ${car.category}
Year: ${car.year}
Price: ${car.price}

Specifications:
${Object.entries(car.specs).map(([key, value]) => `• ${key}: ${value}`).join('\n')}

${car.description}
        `;
        alert(message);
    }
}

// Setup contact form
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = form.querySelectorAll('input, textarea');
            alert('Thank you for your message! We will get back to you soon.');
            inputs.forEach(input => input.value = '');
        });
    }
}

// Smooth scroll for navigation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
