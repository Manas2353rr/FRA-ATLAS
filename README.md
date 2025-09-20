# FRA Atlas & WebGIS Decision Support System

## Overview

The FRA Atlas & WebGIS Decision Support System is an AI-powered platform for integrated monitoring of Forest Rights Act (FRA) implementation. This system provides a comprehensive solution for digitizing, visualizing, and analyzing FRA data, with a focus on the states of Madhya Pradesh, Tripura, Odisha, and Telangana.

## Features

- **FRA Atlas**: Interactive WebGIS platform visualizing Forest Rights Act implementation across India
- **Decision Support System**: AI-enhanced tools for policy formulation and scheme implementation
- **Data Digitization**: AI-powered extraction and standardization of text from scanned FRA documents
- **Asset Mapping**: Computer Vision on satellite imagery to detect agricultural land, forest cover, water bodies, and homesteads
- **Scheme Layering**: Cross-linking FRA holders with eligibility for CSS schemes

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **Maps**: Leaflet.js for WebGIS functionality
- **Backend**: Node.js with Express
- **Data Processing**: GeoJSON for spatial data


## Project Structure

```
fra-atlas/
├── src/                  # Source files
│   ├── css/              # CSS stylesheets
│   ├── js/               # JavaScript files
│   ├── images/           # Images and icons
│   ├── data/             # GeoJSON and other data files
│   └── index.html        # Main HTML file
├── server.js             # Express server
├── package.json          # Project dependencies
└── README.md             # Project documentation
```

## Key Components

### FRA Atlas

The FRA Atlas provides a visual representation of FRA implementation across the target states. It includes:

- Interactive map with multiple layers (IFR, CR, CFR, water bodies, agricultural land)
- Filtering capabilities by state, district, and tribal group
- Detailed information on FRA claims and titles

### Decision Support System (DSS)

The DSS component helps decision-makers in:

- Identifying optimal combinations of Central Sector Schemes for FRA patta holders
- Monitoring FRA implementation progress at village, block, district, and state levels
- Prioritizing interventions based on geographical and socio-economic factors

### AI Features

The system incorporates several AI-powered features:

- Document digitization with Named Entity Recognition
- Satellite imagery analysis using Computer Vision
- Rule-based + AI-enhanced DSS engine for scheme recommendations

## Target Users

- Ministry of Tribal Affairs
- District-level Tribal Welfare Departments & Line Departments of DAJGUA
- Forest and Revenue Departments
- Planning & Development Authorities
- NGOs working with tribal communities

## Future Scope

- Incorporate real-time satellite feeds for monitoring CFR forests
- Integrate IoT sensors for soil health, water quality, etc., in FRA lands
- Enable mobile-based feedback and updates from patta holders themselves

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For more information, please contact:
- Email: kavyakurkar1@gmail.com
- Phone: +91 9977220060
