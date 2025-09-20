/**
 * FRA Atlas & WebGIS Decision Support System
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initializeNavigation();
    initializeModals();
    initializeStateCards();
    initializeContactForm();
    
    // Check if we need to show a specific section based on URL hash
    handleUrlHash();
    
    // Update active navigation based on scroll position
    window.addEventListener('scroll', updateActiveNavigation);
});

/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Add click event to each navigation link
    navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the target section
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Scroll to the section with smooth behavior
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash without scrolling
                    history.pushState(null, null, targetId);
                    
                    // Update active navigation
                    updateActiveNavLink(targetId);
                }
            });
        }
    });
    
    // Handle login button click
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show login modal
            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            loginModal.show();
        });
    }
}

/**
 * Initialize modal functionality
 */
function initializeModals() {
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            // Here you would typically send the login data to a server
            console.log('Login attempt:', { email, password, rememberMe });
            
            // For demo purposes, show success message
            alert('Login functionality would be implemented in a production environment.');
            
            // Hide modal
            const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            loginModal.hide();
        });
    }
}

/**
 * Initialize state cards functionality
 */
function initializeStateCards() {
    const stateCards = document.querySelectorAll('.state-card');
    
    stateCards.forEach(card => {
        card.addEventListener('click', function() {
            const state = this.getAttribute('data-state');
            
            // Scroll to atlas section
            const atlasSection = document.getElementById('atlas');
            const headerHeight = document.querySelector('.header').offsetHeight;
            
            window.scrollTo({
                top: atlasSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
            
            // Set the state in the dropdown
            const stateSelect = document.getElementById('state-select');
            if (stateSelect) {
                stateSelect.value = state;
                
                // Trigger change event to update the map
                const event = new Event('change');
                stateSelect.dispatchEvent(event);
            }
        });
    });
}

/**
 * Initialize contact form functionality
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            console.log('Contact form submission:', { name, email, subject, message });
            
            // For demo purposes, show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
}

/**
 * Handle URL hash to scroll to specific section on page load
 */
function handleUrlHash() {
    const hash = window.location.hash;
    
    if (hash) {
        const targetSection = document.querySelector(hash);
        
        if (targetSection) {
            // Wait a bit for page to fully load
            setTimeout(() => {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active navigation
                updateActiveNavLink(hash);
            }, 100);
        }
    }
}

/**
 * Update active navigation link based on URL hash
 */
function updateActiveNavLink(hash) {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Update active navigation based on scroll position
 */
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + document.querySelector('.header').offsetHeight + 10;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = '#' + section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            updateActiveNavLink(sectionId);
        }
    });
}

/**
 * Generate recommendations based on selected location
 */
document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-recommendations');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            const state = document.getElementById('dss-state').value;
            const district = document.getElementById('dss-district').value;
            const village = document.getElementById('dss-village').value;
            
            // Show loading state
            generateBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Generating...';
            generateBtn.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                // Generate recommendations based on selected location
                generateRecommendations(state, district, village);
                
                // Reset button
                generateBtn.innerHTML = 'Generate Recommendations';
                generateBtn.disabled = false;
                
                // Show recommendations container
                document.querySelector('.recommendations-container').style.display = 'block';
                
                // Scroll to recommendations
                document.querySelector('.recommendations-container').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 1500);
        });
    }
});

/**
 * Generate recommendations based on location
 */
function generateRecommendations(state, district, village) {
    const recommendationsContent = document.querySelector('.recommendations-content');
    
    // Sample recommendations based on state
    let recommendations = '';
    
    switch(state) {
        case 'madhya-pradesh':
            recommendations = `
                <div class="recommendation-item">
                    <h5><i class="fas fa-check-circle text-success"></i> PM-KISAN</h5>
                    <p>Based on agricultural land ownership patterns in this region, approximately 78% of FRA title holders are eligible for PM-KISAN benefits. Recommended action: Conduct special enrollment camps in coordination with Agriculture Department.</p>
                    <div class="progress mb-2">
                        <div class="progress-bar bg-success" role="progressbar" style="width: 78%" aria-valuenow="78" aria-valuemin="0" aria-valuemax="100">78%</div>
                    </div>
                </div>
                
                <div class="recommendation-item mt-4">
                    <h5><i class="fas fa-check-circle text-success"></i> Jal Jeevan Mission</h5>
                    <p>Satellite data indicates low water availability in this region. Recommended action: Prioritize this village for borewell installation and rainwater harvesting structures under Jal Jeevan Mission.</p>
                    <div class="progress mb-2">
                        <div class="progress-bar bg-warning" role="progressbar" style="width: 45%" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">45%</div>
                    </div>
                </div>
                
                <div class="recommendation-item mt-4">
                    <h5><i class="fas fa-check-circle text-success"></i> MGNREGA</h5>
                    <p>Seasonal employment patterns suggest high migration during non-agricultural seasons. Recommended action: Create MGNREGA work plans focused on water conservation and forest restoration to provide local employment.</p>
                    <div class="progress mb-2">
                        <div class="progress-bar bg-info" role="progressbar" style="width: 92%" aria-valuenow="92" aria-valuemin="0" aria-valuemax="100">92%</div>
                    </div>
                </div>
            `;
            break;
            
        case 'tripura':
            recommendations = `
                <div class="recommendation-item">
                    <h5><i class="fas fa-check-circle text-success"></i> DAJGUA</h5>
                    <p>Analysis of forest cover and community resources indicates high potential for bamboo-based livelihood activities. Recommended action: Implement bamboo cultivation and craft training under DAJGUA scheme.</p>
                    <div class="progress mb-2">
                        <div class="progress-bar bg-success" role="progressbar" style="width: 85%" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">85%</div>
                    </div>
                </div>
                
                <div class="recommendation-item mt-4">
                    <h5><i class="fas fa-check-circle text-success"></i> PM-KISAN</h5>
                    <p>Satellite imagery shows terraced cultivation patterns suitable for horticulture. Recommended action: Promote horticulture crops with PM-KISAN support and link to market access initiatives.</p>
                    <div class="progress mb-2">
                        <div class="progress-bar bg-info" role="progressbar" style="width: 67%" aria-valuenow="67" aria-valuemin="0" aria-valuemax="100">67%</div>
                    </div>
                </div>
                
                <div class="recommendation-item mt-4">
                    <h5><i class="fas fa-check-circle text-success"></i> MGNREGA</h5>
                    <p>Terrain analysis indicates erosion risk in agricultural areas. Recommended action: Implement soil conservation works through MGNREGA to protect FRA land and enhance productivity.</p>
                    <div class="progress mb-2">
                        <div class="progress-bar bg-warning" role="progressbar" style="width: 73%" aria-valuenow="73" aria-valuemin="0" aria-valuemax="100">73%</div>
                    </div>
                </div>
            `;
            break;
            
        case 'odisha':
            recommendations = `
                <div class="recommendation-item">
                    <h5><i class="fas fa-check-circle text-success"></i> MGNREGA</h5>
                    <p>Watershed analysis shows potential for small water harvesting structures. Recommended action: Create a series of check dams and ponds through MGNREGA to support irrigation for FRA land.</p>
                    <div class="progress mb-2">
                        <div class="progress-bar bg-success" role="progressbar" style="width: 89%" aria-valuenow="89" aria-valuemin="0" aria-valuemax="100">89%</div>
                    </div>
                </div>
                
                <div class="recommendation-item mt-4">
                    <h5><i class="fas fa-check-circle text-success"></i> Jal Jeevan Mission</h5>
                    <p>Groundwater data indicates good potential but lack of extraction infrastructure. Recommended action: Install solar-powered community borewells under Jal Jeevan Mission.</p>
                    <div class="progress mb-2">
                        <div class="progress-bar bg-info" role="progressbar" style="width: 76%" aria-valuenow="76" aria-valuemin="0" aria-valuemax="100">76%</div>
                    </div>
                </div>
                
                <div class="recommendation-item mt-4">
                    <h5><i class="fas fa-check-circle text-success"></i> DAJGUA</h5>
                    <p>Forest resource assessment shows abundant minor forest produce (MFP) availability. Recommended action: Establish MFP processing unit under DAJGUA to enhance value addition and income.</p>
                    <div class="progress mb-2">
                        <div class="progress-bar bg-success" role="progressbar" style="width: 82%" aria-valuenow="82" aria-valuemin="0" aria-valuemax="100">82%</div>
                    </div>
                </div>
            `;
            break;
            
        case 'telangana':
            recommendations = `
                <div class="recommendation-item">
                    <h5><i class="fas fa-check-circle text-success"></i> PM-KISAN</h5>
                    <p>Land use analysis shows potential for commercial crop cultivation. Recommended action: Promote high-value crops with PM-KISAN support and provide market linkages.</p>
                    <div class="progress mb-2">
                        <div class="progress-bar bg-success" role="progressbar" style="width: 81%" aria-valuenow="81" aria-valuemin="0" aria-valuemax="100">81%</div>
                    </div>
                </div>
                
                <div class="recommendation-item mt-4">
                    <h5><i class="fas fa-check-circle text-success"></i> DAJGUA</h5>
                    <p>Community asset mapping shows potential for eco-tourism development. Recommended action: Develop community-managed eco-tourism facilities under DAJGUA to generate sustainable income.</p>
                    <div class="progress mb-2">
                        <div class="progress-bar bg-info" role="progressbar" style="width: 65%" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">65%</div>
                    </div>
                </div>
                
                <div class="recommendation-item mt-4">
                    <h5><i class="fas fa-check-circle text-success"></i> Jal Jeevan Mission</h5>
                    <p>Water quality analysis indicates fluoride contamination in groundwater. Recommended action: Install community water purification systems under Jal Jeevan Mission.</p>
                    <div class="progress mb-2">
                        <div class="progress-bar bg-danger" role="progressbar" style="width: 95%" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100">95% (High Priority)</div>
                    </div>
                </div>
            `;
            break;
            
        default:
            recommendations = `
                <div class="alert alert-info">
                    <p>Please select a state, district, and village to generate recommendations.</p>
                </div>
            `;
    }
    
    // Update recommendations content
    recommendationsContent.innerHTML = recommendations;
}

/**
 * Populate district dropdown based on selected state
 */
document.addEventListener('DOMContentLoaded', function() {
    const stateSelect = document.getElementById('dss-state');
    const districtSelect = document.getElementById('dss-district');
    
    if (stateSelect && districtSelect) {
        stateSelect.addEventListener('change', function() {
            const state = this.value;
            
            // Clear current options
            districtSelect.innerHTML = '<option value="">Select District</option>';
            
            // Add districts based on selected state
            let districts = [];
            
            switch(state) {
                case 'madhya-pradesh':
                    districts = ['Balaghat', 'Betul', 'Chhindwara', 'Dindori', 'Mandla', 'Seoni', 'Shahdol', 'Umaria'];
                    break;
                case 'tripura':
                    districts = ['Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'South Tripura', 'West Tripura'];
                    break;
                case 'odisha':
                    districts = ['Kandhamal', 'Koraput', 'Mayurbhanj', 'Nabarangpur', 'Rayagada', 'Sundargarh'];
                    break;
                case 'telangana':
                    districts = ['Adilabad', 'Bhadradri Kothagudem', 'Komaram Bheem', 'Mahabubabad', 'Mulugu', 'Warangal'];
                    break;
            }
            
            // Add options to select
            districts.forEach(district => {
                const option = document.createElement('option');
                option.value = district.toLowerCase().replace(/\s+/g, '-');
                option.textContent = district;
                districtSelect.appendChild(option);
            });
            
            // Trigger change event to update villages
            const event = new Event('change');
            districtSelect.dispatchEvent(event);
        });
    }
    
    // Initialize districts for default state
    if (stateSelect && districtSelect) {
        const event = new Event('change');
        stateSelect.dispatchEvent(event);
    }
});

/**
 * Populate village dropdown based on selected district
 */
document.addEventListener('DOMContentLoaded', function() {
    const districtSelect = document.getElementById('dss-district');
    const villageSelect = document.getElementById('dss-village');
    
    if (districtSelect && villageSelect) {
        districtSelect.addEventListener('change', function() {
            const district = this.value;
            
            // Clear current options
            villageSelect.innerHTML = '<option value="">Select Village</option>';
            
            // Add sample villages (in a real application, these would be fetched from a database)
            const villages = [
                'Amgaon', 'Bahmani', 'Chichgaon', 'Dhanora', 
                'Etapalli', 'Futana', 'Ghoti', 'Hirapur', 
                'Jamni', 'Kanhargaon', 'Lohara', 'Mohgaon'
            ];
            
            // Add options to select
            villages.forEach(village => {
                const option = document.createElement('option');
                option.value = village.toLowerCase().replace(/\s+/g, '-');
                option.textContent = village;
                villageSelect.appendChild(option);
            });
        });
    }
    
    // Initialize villages for default district
    if (districtSelect && villageSelect && districtSelect.value) {
        const event = new Event('change');
        districtSelect.dispatchEvent(event);
    }
});

// Similar functionality for the atlas section filters
document.addEventListener('DOMContentLoaded', function() {
    const stateSelect = document.getElementById('state-select');
    const districtSelect = document.getElementById('district-select');
    
    if (stateSelect && districtSelect) {
        stateSelect.addEventListener('change', function() {
            const state = this.value;
            
            // Clear current options
            districtSelect.innerHTML = '<option value="all">All Districts</option>';
            
            // Skip if "all" is selected
            if (state === 'all') return;
            
            // Add districts based on selected state
            let districts = [];
            
            switch(state) {
                case 'madhya-pradesh':
                    districts = ['Balaghat', 'Betul', 'Chhindwara', 'Dindori', 'Mandla', 'Seoni', 'Shahdol', 'Umaria'];
                    break;
                case 'tripura':
                    districts = ['Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'South Tripura', 'West Tripura'];
                    break;
                case 'odisha':
                    districts = ['Kandhamal', 'Koraput', 'Mayurbhanj', 'Nabarangpur', 'Rayagada', 'Sundargarh'];
                    break;
                case 'telangana':
                    districts = ['Adilabad', 'Bhadradri Kothagudem', 'Komaram Bheem', 'Mahabubabad', 'Mulugu', 'Warangal'];
                    break;
            }
            
            // Add options to select
            districts.forEach(district => {
                const option = document.createElement('option');
                option.value = district.toLowerCase().replace(/\s+/g, '-');
                option.textContent = district;
                districtSelect.appendChild(option);
            });
        });
    }
});