/**
 * FRA Atlas & WebGIS Decision Support System
 * DSS JavaScript File - Handles Decision Support System functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeDSS();
});

/**
 * Initialize Decision Support System
 */
function initializeDSS() {
    // Set up district dropdown population
    setupDistrictDropdown();
    
    // Set up village dropdown population
    setupVillageDropdown();
    
    // Set up recommendation generation
    setupRecommendationGeneration();
}

/**
 * Set up district dropdown population based on state selection
 */
function setupDistrictDropdown() {
    const stateSelect = document.getElementById('dss-state');
    const districtSelect = document.getElementById('dss-district');
    
    if (!stateSelect || !districtSelect) return;
    
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
    
    // Initialize districts for default state
    if (stateSelect.value) {
        const event = new Event('change');
        stateSelect.dispatchEvent(event);
    }
}

/**
 * Set up village dropdown population based on district selection
 */
function setupVillageDropdown() {
    const districtSelect = document.getElementById('dss-district');
    const villageSelect = document.getElementById('dss-village');
    
    if (!districtSelect || !villageSelect) return;
    
    districtSelect.addEventListener('change', function() {
        const district = this.value;
        
        // Clear current options
        villageSelect.innerHTML = '<option value="">Select Village</option>';
        
        if (!district) return;
        
        // Get villages based on district and state
        const state = document.getElementById('dss-state').value;
        const villages = getVillagesForDistrict(state, district);
        
        // Add options to select
        villages.forEach(village => {
            const option = document.createElement('option');
            option.value = village.id;
            option.textContent = village.name;
            villageSelect.appendChild(option);
        });
    });
}

/**
 * Set up recommendation generation
 */
function setupRecommendationGeneration() {
    const generateBtn = document.getElementById('generate-recommendations');
    const recommendationsContainer = document.querySelector('.recommendations-container');
    
    if (!generateBtn || !recommendationsContainer) return;
    
    generateBtn.addEventListener('click', function() {
        const state = document.getElementById('dss-state').value;
        const district = document.getElementById('dss-district').value;
        const village = document.getElementById('dss-village').value;
        
        if (!state || !district || !village) {
            alert('Please select state, district, and village');
            return;
        }
        
        // Show loading state
        generateBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Generating...';
        generateBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Generate recommendations
            const recommendations = generateRecommendations(state, district, village);
            
            // Update recommendations content
            const recommendationsContent = document.querySelector('.recommendations-content');
            recommendationsContent.innerHTML = recommendations;
            
            // Show recommendations container
            recommendationsContainer.style.display = 'block';
            
            // Reset button
            generateBtn.innerHTML = 'Generate Recommendations';
            generateBtn.disabled = false;
            
            // Scroll to recommendations
            recommendationsContainer.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 1500);
    });
}

/**
 * Get villages for a district
 */
function getVillagesForDistrict(state, district) {
    // This would typically be fetched from an API
    // For demo purposes, we'll return sample data
    
    const villagesByDistrict = {
        'madhya-pradesh': {
            'balaghat': [
                { id: 'lalbarra', name: 'Lalbarra' },
                { id: 'kirnapur', name: 'Kirnapur' },
                { id: 'waraseoni', name: 'Waraseoni' },
                { id: 'katangi', name: 'Katangi' }
            ],
            'betul': [
                { id: 'bhimpur', name: 'Bhimpur' },
                { id: 'chicholi', name: 'Chicholi' },
                { id: 'ghodadongri', name: 'Ghodadongri' },
                { id: 'bhainsdehi', name: 'Bhainsdehi' }
            ],
            'chhindwara': [
                { id: 'amarwara', name: 'Amarwara' },
                { id: 'tamia', name: 'Tamia' },
                { id: 'harrai', name: 'Harrai' },
                { id: 'mohkhed', name: 'Mohkhed' }
            ],
            'dindori': [
                { id: 'samnapur', name: 'Samnapur' },
                { id: 'bajag', name: 'Bajag' },
                { id: 'karanjia', name: 'Karanjia' },
                { id: 'mehandwani', name: 'Mehandwani' }
            ],
            'mandla': [
                { id: 'bichhiya', name: 'Bichhiya' },
                { id: 'nainpur', name: 'Nainpur' },
                { id: 'ghughari', name: 'Ghughari' },
                { id: 'mawai', name: 'Mawai' }
            ],
            'seoni': [
                { id: 'keolari', name: 'Keolari' },
                { id: 'kurai', name: 'Kurai' },
                { id: 'barghat', name: 'Barghat' },
                { id: 'lakhnadon', name: 'Lakhnadon' }
            ],
            'shahdol': [
                { id: 'beohari', name: 'Beohari' },
                { id: 'jaisinghnagar', name: 'Jaisinghnagar' },
                { id: 'gohparu', name: 'Gohparu' },
                { id: 'sohagpur', name: 'Sohagpur' }
            ],
            'umaria': [
                { id: 'manpur', name: 'Manpur' },
                { id: 'pali', name: 'Pali' },
                { id: 'nowrozabad', name: 'Nowrozabad' },
                { id: 'chandia', name: 'Chandia' }
            ]
        },
        'tripura': {
            'dhalai': [
                { id: 'ambassa', name: 'Ambassa' },
                { id: 'gandacherra', name: 'Gandacherra' },
                { id: 'kamalpur', name: 'Kamalpur' },
                { id: 'salema', name: 'Salema' }
            ],
            'gomati': [
                { id: 'udaipur', name: 'Udaipur' },
                { id: 'amarpur', name: 'Amarpur' },
                { id: 'karbook', name: 'Karbook' },
                { id: 'ompi', name: 'Ompi' }
            ],
            'khowai': [
                { id: 'khowai', name: 'Khowai' },
                { id: 'teliamura', name: 'Teliamura' },
                { id: 'padmabil', name: 'Padmabil' },
                { id: 'tulashikhar', name: 'Tulashikhar' }
            ],
            'north-tripura': [
                { id: 'dasda', name: 'Dasda' },
                { id: 'damcherra', name: 'Damcherra' },
                { id: 'jampui', name: 'Jampui' },
                { id: 'panisagar', name: 'Panisagar' }
            ],
            'south-tripura': [
                { id: 'belonia', name: 'Belonia' },
                { id: 'satchand', name: 'Satchand' },
                { id: 'rajnagar', name: 'Rajnagar' },
                { id: 'hrishyamukh', name: 'Hrishyamukh' }
            ],
            'west-tripura': [
                { id: 'mohanpur', name: 'Mohanpur' },
                { id: 'bamutia', name: 'Bamutia' },
                { id: 'lefunga', name: 'Lefunga' },
                { id: 'hezamara', name: 'Hezamara' }
            ]
        },
        'odisha': {
            'kandhamal': [
                { id: 'phulbani', name: 'Phulbani' },
                { id: 'baliguda', name: 'Baliguda' },
                { id: 'daringbadi', name: 'Daringbadi' },
                { id: 'kotagarh', name: 'Kotagarh' }
            ],
            'koraput': [
                { id: 'jeypore', name: 'Jeypore' },
                { id: 'kotpad', name: 'Kotpad' },
                { id: 'boipariguda', name: 'Boipariguda' },
                { id: 'kundra', name: 'Kundra' }
            ],
            'mayurbhanj': [
                { id: 'jamda', name: 'Jamda' },
                { id: 'karanjia', name: 'Karanjia' },
                { id: 'thakurmunda', name: 'Thakurmunda' },
                { id: 'sukruli', name: 'Sukruli' }
            ],
            'nabarangpur': [
                { id: 'papadahandi', name: 'Papadahandi' },
                { id: 'kosagumuda', name: 'Kosagumuda' },
                { id: 'dabugam', name: 'Dabugam' },
                { id: 'nandahandi', name: 'Nandahandi' }
            ],
            'rayagada': [
                { id: 'muniguda', name: 'Muniguda' },
                { id: 'bissamcuttack', name: 'Bissamcuttack' },
                { id: 'kashipur', name: 'Kashipur' },
                { id: 'kalyansinghpur', name: 'Kalyansinghpur' }
            ],
            'sundargarh': [
                { id: 'bonai', name: 'Bonai' },
                { id: 'lahunipara', name: 'Lahunipara' },
                { id: 'koida', name: 'Koida' },
                { id: 'gurundia', name: 'Gurundia' }
            ]
        },
        'telangana': {
            'adilabad': [
                { id: 'jainoor', name: 'Jainoor' },
                { id: 'utnoor', name: 'Utnoor' },
                { id: 'indervelli', name: 'Indervelli' },
                { id: 'narnoor', name: 'Narnoor' }
            ],
            'bhadradri-kothagudem': [
                { id: 'bhadrachalam', name: 'Bhadrachalam' },
                { id: 'dummugudem', name: 'Dummugudem' },
                { id: 'cherla', name: 'Cherla' },
                { id: 'gundala', name: 'Gundala' }
            ],
            'komaram-bheem': [
                { id: 'asifabad', name: 'Asifabad' },
                { id: 'jainoor', name: 'Jainoor' },
                { id: 'sirpur', name: 'Sirpur' },
                { id: 'kerameri', name: 'Kerameri' }
            ],
            'mahabubabad': [
                { id: 'dornakal', name: 'Dornakal' },
                { id: 'gudur', name: 'Gudur' },
                { id: 'kuravi', name: 'Kuravi' },
                { id: 'thorrur', name: 'Thorrur' }
            ],
            'mulugu': [
                { id: 'mulugu', name: 'Mulugu' },
                { id: 'venkatapur', name: 'Venkatapur' },
                { id: 'govindaraopet', name: 'Govindaraopet' },
                { id: 'tadvai', name: 'Tadvai' }
            ],
            'warangal': [
                { id: 'parkal', name: 'Parkal' },
                { id: 'shayampet', name: 'Shayampet' },
                { id: 'atmakur', name: 'Atmakur' },
                { id: 'geesugonda', name: 'Geesugonda' }
            ]
        }
    };
    
    return villagesByDistrict[state]?.[district] || [];
}

/**
 * Generate recommendations based on location
 */
function generateRecommendations(state, district, village) {
    // This would typically be generated by an AI model based on real data
    // For demo purposes, we'll return sample recommendations
    
    // Get village data
    const villageData = getVillageData(state, district, village);
    
    if (!villageData) {
        return `
            <div class="alert alert-warning">
                <p>No data available for the selected location.</p>
            </div>
        `;
    }
    
    // Generate recommendations based on village data
    let recommendations = '';
    
    // PM-KISAN recommendation
    if (villageData.agriculture_potential > 60) {
        recommendations += generateRecommendationItem({
            scheme: 'PM-KISAN',
            description: `Based on agricultural land ownership patterns in ${villageData.name}, approximately ${villageData.agriculture_potential}% of FRA title holders are eligible for PM-KISAN benefits. Recommended action: Conduct special enrollment camps in coordination with Agriculture Department.`,
            progress: villageData.agriculture_potential,
            progressClass: villageData.agriculture_potential > 75 ? 'bg-success' : 'bg-info'
        });
    }
    
    // Jal Jeevan Mission recommendation
    if (villageData.water_scarcity > 50) {
        recommendations += generateRecommendationItem({
            scheme: 'Jal Jeevan Mission',
            description: `Satellite data indicates ${villageData.water_scarcity > 75 ? 'severe' : 'moderate'} water scarcity in ${villageData.name}. Recommended action: ${villageData.water_scarcity > 75 ? 'Prioritize this village for borewell installation and rainwater harvesting structures' : 'Implement community water conservation measures'} under Jal Jeevan Mission.`,
            progress: villageData.water_scarcity,
            progressClass: villageData.water_scarcity > 75 ? 'bg-danger' : 'bg-warning'
        });
    }
    
    // MGNREGA recommendation
    if (villageData.employment_need > 40) {
        recommendations += generateRecommendationItem({
            scheme: 'MGNREGA',
            description: `Seasonal employment patterns suggest ${villageData.employment_need > 70 ? 'high' : 'moderate'} migration during non-agricultural seasons in ${villageData.name}. Recommended action: Create MGNREGA work plans focused on ${villageData.forest_cover > 60 ? 'forest restoration' : 'water conservation'} to provide local employment.`,
            progress: villageData.employment_need,
            progressClass: villageData.employment_need > 70 ? 'bg-success' : 'bg-info'
        });
    }
    
    // DAJGUA recommendation
    if (villageData.forest_cover > 50) {
        recommendations += generateRecommendationItem({
            scheme: 'DAJGUA',
            description: `Analysis of forest cover (${villageData.forest_cover}%) and community resources indicates high potential for ${villageData.forest_cover > 70 ? 'minor forest produce collection and processing' : 'bamboo-based livelihood activities'} in ${villageData.name}. Recommended action: Implement ${villageData.forest_cover > 70 ? 'MFP processing unit' : 'bamboo cultivation and craft training'} under DAJGUA scheme.`,
            progress: villageData.forest_cover,
            progressClass: villageData.forest_cover > 70 ? 'bg-success' : 'bg-info'
        });
    }
    
    return recommendations || `
        <div class="alert alert-info">
            <p>No specific recommendations available for this location. Please contact the district office for more information.</p>
        </div>
    `;
}

/**
 * Generate recommendation item HTML
 */
function generateRecommendationItem(data) {
    return `
        <div class="recommendation-item mt-4">
            <h5><i class="fas fa-check-circle text-success"></i> ${data.scheme}</h5>
            <p>${data.description}</p>
            <div class="progress mb-2">
                <div class="progress-bar ${data.progressClass}" role="progressbar" style="width: ${data.progress}%" aria-valuenow="${data.progress}" aria-valuemin="0" aria-valuemax="100">${data.progress}%${data.progress > 90 ? ' (High Priority)' : ''}</div>
            </div>
        </div>
    `;
}

/**
 * Get village data
 */
function getVillageData(state, district, village) {
    // This would typically be fetched from an API
    // For demo purposes, we'll return sample data
    
    // Sample village data
    const villageData = {
        'madhya-pradesh': {
            'balaghat': {
                'lalbarra': {
                    name: 'Lalbarra',
                    agriculture_potential: 78,
                    water_scarcity: 45,
                    employment_need: 92,
                    forest_cover: 65
                },
                'kirnapur': {
                    name: 'Kirnapur',
                    agriculture_potential: 65,
                    water_scarcity: 60,
                    employment_need: 85,
                    forest_cover: 70
                }
            },
            'dindori': {
                'samnapur': {
                    name: 'Samnapur',
                    agriculture_potential: 55,
                    water_scarcity: 70,
                    employment_need: 80,
                    forest_cover: 85
                }
            },
            'mandla': {
                'bichhiya': {
                    name: 'Bichhiya',
                    agriculture_potential: 60,
                    water_scarcity: 65,
                    employment_need: 75,
                    forest_cover: 80
                }
            }
        },
        'tripura': {
            'dhalai': {
                'ambassa': {
                    name: 'Ambassa',
                    agriculture_potential: 70,
                    water_scarcity: 40,
                    employment_need: 65,
                    forest_cover: 75
                },
                'gandacherra': {
                    name: 'Gandacherra',
                    agriculture_potential: 55,
                    water_scarcity: 35,
                    employment_need: 70,
                    forest_cover: 85
                }
            },
            'north-tripura': {
                'dasda': {
                    name: 'Dasda',
                    agriculture_potential: 65,
                    water_scarcity: 30,
                    employment_need: 75,
                    forest_cover: 80
                }
            }
        },
        'odisha': {
            'kandhamal': {
                'phulbani': {
                    name: 'Phulbani',
                    agriculture_potential: 50,
                    water_scarcity: 55,
                    employment_need: 85,
                    forest_cover: 90
                }
            },
            'koraput': {
                'jeypore': {
                    name: 'Jeypore',
                    agriculture_potential: 75,
                    water_scarcity: 60,
                    employment_need: 70,
                    forest_cover: 65
                }
            },
            'rayagada': {
                'muniguda': {
                    name: 'Muniguda',
                    agriculture_potential: 60,
                    water_scarcity: 65,
                    employment_need: 80,
                    forest_cover: 75
                }
            }
        },
        'telangana': {
            'adilabad': {
                'jainoor': {
                    name: 'Jainoor',
                    agriculture_potential: 80,
                    water_scarcity: 70,
                    employment_need: 65,
                    forest_cover: 60
                }
            },
            'bhadradri-kothagudem': {
                'bhadrachalam': {
                    name: 'Bhadrachalam',
                    agriculture_potential: 70,
                    water_scarcity: 45,
                    employment_need: 60,
                    forest_cover: 85
                }
            },
            'komaram-bheem': {
                'asifabad': {
                    name: 'Asifabad',
                    agriculture_potential: 65,
                    water_scarcity: 55,
                    employment_need: 75,
                    forest_cover: 80
                }
            }
        }
    };
    
    // Return village data if available
    return villageData[state]?.[district]?.[village] || {
        name: village.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        agriculture_potential: Math.floor(Math.random() * 30) + 50, // 50-80
        water_scarcity: Math.floor(Math.random() * 40) + 40, // 40-80
        employment_need: Math.floor(Math.random() * 30) + 60, // 60-90
        forest_cover: Math.floor(Math.random() * 40) + 50 // 50-90
    };
}

/**
 * Add custom CSS for DSS
 */
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .recommendation-item {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 1.5rem;
            border-left: 4px solid #2e7d32;
        }
        
        .recommendation-item h5 {
            color: #2e7d32;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }
        
        .recommendation-item p {
            margin-bottom: 1rem;
            color: #333;
        }
        
        .progress {
            height: 10px;
            border-radius: 5px;
        }
    `;
    document.head.appendChild(style);
});