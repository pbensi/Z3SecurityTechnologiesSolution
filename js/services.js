function initServices() {
    const serviceDetails = {
        cctv: {
            title: "CCTV Surveillance System",
            icon: "fa-video",
            features: [
                "High-definition 4K cameras with night vision",
                "Remote monitoring via mobile app or web browser",
                "Motion detection and intelligent alerts",
                "Cloud and local storage options",
                "Weatherproof and vandal-resistant housing",
                "Pan-tilt-zoom (PTZ) capabilities",
                "License plate recognition",
                "People counting analytics"
            ],
            benefits: [
                "24/7 monitoring of your premises",
                "Deter criminal activity with visible security",
                "Remote access from anywhere in the world",
                "Evidence collection for incidents",
                "Reduced security personnel costs",
                "Peace of mind for business owners",
                "Improved employee safety",
                "Insurance premium discounts"
            ]
        },
        biometrics: {
            title: "Biometric Access Control",
            icon: "fa-fingerprint",
            features: [
                "Fingerprint, facial, and iris recognition",
                "Multi-factor authentication options",
                "Time and attendance tracking",
                "Integration with existing security systems",
                "Scalable for small to enterprise deployments",
                "Real-time monitoring and reporting",
                "Anti-passback technology",
                "Visitor management integration"
            ],
            benefits: [
                "Eliminate key and card sharing risks",
                "Accurate time and attendance records",
                "No lost or stolen access cards",
                "Enhanced security with unique biometric data",
                "Streamlined access management",
                "Reduced administrative overhead",
                "Compliance with security regulations",
                "Detailed audit trails"
            ]
        },
        electrical: {
            title: "Electrical Installation",
            icon: "fa-bolt",
            features: [
                "Certified electricians with security system expertise",
                "Compliance with all electrical codes and standards",
                "Power backup solutions (UPS and generators)",
                "Surge protection for sensitive equipment",
                "Emergency lighting installation",
                "Cable management and organization",
                "Energy-efficient solutions",
                "Regular maintenance and inspection"
            ],
            benefits: [
                "Reliable power for critical security systems",
                "Reduced risk of electrical failures",
                "Protection against power surges",
                "Extended equipment lifespan",
                "Compliance with safety regulations",
                "Professional installation and wiring",
                "24/7 emergency electrical services",
                "Customized solutions for your needs"
            ]
        },
        "fire-alarm": {
            title: "Fire Alarm System",
            icon: "fa-fire-extinguisher",
            features: [
                "Early smoke and heat detection",
                "Automatic alarm notification to authorities",
                "Voice evacuation systems",
                "Integration with sprinkler systems",
                "Manual pull stations and break glass units",
                "Strobe lights for hearing impaired",
                "Zone identification for quick response",
                "Regular testing and maintenance"
            ],
            benefits: [
                "Early warning of fire emergencies",
                "Automatic notification to fire department",
                "Clear evacuation instructions",
                "Reduced property damage",
                "Life safety compliance",
                "Lower insurance premiums",
                "24/7 monitoring services",
                "Peace of mind for occupants"
            ]
        },
        "burglar-alarm": {
            title: "Burglar Alarm System",
            icon: "fa-shield-alt",
            features: [
                "Door and window contact sensors",
                "Motion detectors with pet immunity",
                "Glass break detectors",
                "Siren and strobe alarm notification",
                "Remote arming and disarming",
                "24/7 professional monitoring",
                "Smart home integration",
                "Back-to-base monitoring"
            ],
            benefits: [
                "Immediate intrusion detection",
                "Deterrent to potential burglars",
                "Quick police response",
                "Remote monitoring capabilities",
                "Reduced false alarms",
                "Insurance premium discounts",
                "Peace of mind when away",
                "Integration with other security systems"
            ]
        },
        "structured-cabling": {
            title: "Structured Cabling",
            icon: "fa-network-wired",
            features: [
                "Cat6 and fiber optic cabling",
                "Network rack and cabinet installation",
                "Cable management and labeling",
                "Patch panel installation",
                "Wall outlets and data ports",
                "Testing and certification",
                "Future-proof infrastructure",
                "Compliance with TIA/EIA standards"
            ],
            benefits: [
                "Reliable network connectivity",
                "High-speed data transmission",
                "Scalable for future expansion",
                "Reduced network downtime",
                "Organized and maintainable infrastructure",
                "Support for multiple systems",
                "Improved network performance",
                "Professional installation and documentation"
            ]
        },
        wifi: {
            title: "Access Point / WiFi",
            icon: "fa-wifi",
            features: [
                "High-speed wireless connectivity",
                "Advanced encryption protocols (WPA3)",
                "Multiple SSID support",
                "Band steering for optimal performance",
                "Mesh networking capabilities",
                "Centralized management system",
                "Guest network isolation",
                "Quality of Service (QoS) settings"
            ],
            benefits: [
                "Seamless connectivity across your facility",
                "Enhanced security for wireless networks",
                "Support for multiple device types",
                "Easy scalability as your needs grow",
                "Reduced cabling requirements",
                "Improved productivity with reliable WiFi",
                "Secure guest access options",
                "Centralized network management"
            ]
        },
        telephone: {
            title: "Telephone System",
            icon: "fa-phone",
            features: [
                "VoIP and traditional PBX systems",
                "Auto-attendant and IVR capabilities",
                "Call recording and monitoring",
                "Conference calling features",
                "Mobile integration",
                "Emergency call routing",
                "Call analytics and reporting",
                "Unified communications platform"
            ],
            benefits: [
                "Improved internal and external communication",
                "Cost savings with VoIP technology",
                "Enhanced customer service capabilities",
                "Business continuity during emergencies",
                "Flexible remote work options",
                "Professional call handling",
                "Detailed call reporting for analysis",
                "Integration with other business systems"
            ]
        },
        "access-control": {
            title: "Access Control System",
            icon: "fa-lock",
            features: [
                "Card, fob, and mobile credential options",
                "Time-based access permissions",
                "Visitor management integration",
                "Turnstile and barrier gate control",
                "Anti-tailgating detection",
                "Integration with video surveillance",
                "Remote lock/unlock capabilities",
                "Detailed access logs and reports"
            ],
            benefits: [
                "Restricted access to sensitive areas",
                "Elimination of key management issues",
                "Enhanced security for employees and assets",
                "Customizable access levels by role",
                "Quick response to security incidents",
                "Integration with HR systems",
                "Reduced security administration time",
                "Comprehensive audit trails"
            ]
        },
        turnstile: {
            title: "Turnstile/Barrier Gate System",
            icon: "fa-desktop",
            features: [
                "Full-height and waist-high turnstile options",
                "Automatic barrier gates for vehicle access",
                "Integration with access control systems",
                "Anti-tailgating detection technology",
                "Emergency breakaway features",
                "Weather-resistant construction",
                "Traffic flow analytics",
                "Remote monitoring and control"
            ],
            benefits: [
                "Controlled pedestrian and vehicle access",
                "Enhanced security at entry points",
                "Reduced unauthorized access attempts",
                "Improved traffic flow management",
                "Integration with security systems",
                "Detailed access and traffic reporting",
                "Durable and reliable operation",
                "Customizable for various facility needs"
            ]
        },
        payroll: {
            title: "Payroll Management System",
            icon: "fa-file-invoice-dollar",
            features: [
                "Automated payroll processing",
                "Integration with time and attendance systems",
                "Tax calculation and filing",
                "Direct deposit and check printing",
                "Employee self-service portal",
                "Compliance with labor regulations",
                "Customizable pay structures",
                "Comprehensive reporting and analytics"
            ],
            benefits: [
                "Accurate and timely employee payments",
                "Reduced administrative workload",
                "Compliance with tax regulations",
                "Improved employee satisfaction",
                "Streamlined payroll processes",
                "Detailed payroll reporting",
                "Integration with HR systems",
                "Scalable for business growth"
            ]
        },
        pos: {
            title: "Point of Sale System",
            icon: "fa-cash-register",
            features: [
                "Secure payment processing",
                "Inventory management integration",
                "Sales reporting and analytics",
                "Customer relationship management",
                "Employee management and scheduling",
                "Multi-location support",
                "Integration with accounting software",
                "Customizable receipt printing"
            ],
            benefits: [
                "Secure transaction processing",
                "Reduced inventory shrinkage",
                "Improved customer service",
                "Streamlined business operations",
                "Enhanced sales tracking and reporting",
                "Better employee accountability",
                "Integration with security systems",
                "Scalable for business growth"
            ]
        }
    };

    // Service cards data
    const services = [
        { id: "cctv", icon: "fa-video", title: "CCTV Surveillance System", description: "High-definition monitoring systems with remote access and advanced analytics for comprehensive property monitoring." },
        { id: "biometrics", icon: "fa-fingerprint", title: "Biometrics", description: "Advanced biometric access control using fingerprint, facial, and iris recognition for secure identity verification." },
        { id: "electrical", icon: "fa-bolt", title: "Electrical Installation", description: "Professional electrical installations for security systems and infrastructure with certified electricians." },
        { id: "fire-alarm", icon: "fa-fire-extinguisher", title: "Fire Alarm System", description: "Early detection and alarm systems to protect against fire hazards with automatic emergency response integration." },
        { id: "burglar-alarm", icon: "fa-shield-alt", title: "Burglar Alarm System", description: "Intrusion detection systems with immediate alert notifications to authorities and property owners." },
        { id: "structured-cabling", icon: "fa-network-wired", title: "Structured Cabling", description: "Professional network infrastructure for reliable connectivity supporting all security systems." },
        { id: "wifi", icon: "fa-wifi", title: "Access Point / WiFi", description: "Secure wireless networking solutions for seamless connectivity with advanced encryption protocols." },
        { id: "telephone", icon: "fa-phone", title: "Telephone System", description: "Reliable communication systems for business operations with emergency calling capabilities." },
        { id: "access-control", icon: "fa-lock", title: "Access Control System", description: "Comprehensive access management with turnstile and barrier gate integration for restricted areas." },
        { id: "turnstile", icon: "fa-desktop", title: "Turnstile/Barrier Gate System", description: "Physical access control solutions for managing pedestrian and vehicle traffic in secured areas." },
        { id: "payroll", icon: "fa-file-invoice-dollar", title: "Payroll Management System", description: "Automated payroll processing integrated with time and attendance tracking for accurate employee compensation." },
        { id: "pos", icon: "fa-cash-register", title: "Point of Sale", description: "Secure transaction systems with integrated security features and inventory management." }
    ];

    // Features data
    const features = [
        { icon: "fa-certificate", title: "Certified Professionals", description: "Our team consists of certified security professionals with extensive training and experience." },
        { icon: "fa-headset", title: "24/7 Support", description: "Round-the-clock technical support to ensure your security systems are always operational." },
        { icon: "fa-tools", title: "Custom Solutions", description: "We design security systems tailored to your specific needs and operational requirements." },
        { icon: "fa-shield-alt", title: "Quality Assurance", description: "All our installations undergo rigorous quality checks to ensure optimal performance." },
        { icon: "fa-clock", title: "Timely Delivery", description: "We complete projects on schedule with minimal disruption to your operations." },
        { icon: "fa-handshake", title: "Long-term Partnership", description: "We build lasting relationships with our clients, providing ongoing maintenance and upgrades." }
    ];

    // Render services
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
        servicesGrid.innerHTML = services.map((service, index) => `
            <div class="service-card" data-service="${service.id}">
                <div class="service-icon">
                    <i class="fas ${service.icon}" aria-hidden="true"></i>
                </div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <button class="see-more-btn">See More <i class="fas fa-chevron-right" aria-hidden="true"></i></button>
            </div>
        `).join('');
    }

    // Render features
    const featuresGrid = document.querySelector('.features-grid');
    if (featuresGrid) {
        featuresGrid.innerHTML = features.map((feature, index) => `
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas ${feature.icon}" aria-hidden="true"></i>
                </div>
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
            </div>
        `).join('');
    }

    // Service Modal
    const serviceModal = document.querySelector('.service-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalTitle = document.querySelector('.modal-header h3');
    const modalIcon = document.querySelector('.modal-icon i');
    const modalFeatures = document.querySelector('.modal-features ul');
    const modalBenefits = document.querySelector('.modal-benefits ul');
    const seeMoreButtons = document.querySelectorAll('.see-more-btn');

    if (serviceModal && modalClose && modalTitle && modalIcon && modalFeatures && modalBenefits) {
        seeMoreButtons.forEach(button => {
            button.addEventListener('click', function () {
                const serviceCard = this.closest('.service-card');
                const serviceType = serviceCard.getAttribute('data-service');
                if (serviceDetails[serviceType]) {
                    const service = serviceDetails[serviceType];
                    modalTitle.textContent = service.title;
                    modalIcon.className = `fas ${service.icon}`;
                    modalFeatures.innerHTML = '';
                    service.features.forEach(feature => {
                        const li = document.createElement('li');
                        li.textContent = feature;
                        modalFeatures.appendChild(li);
                    });
                    modalBenefits.innerHTML = '';
                    service.benefits.forEach(benefit => {
                        const li = document.createElement('li');
                        li.textContent = benefit;
                        modalBenefits.appendChild(li);
                    });
                    serviceModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    serviceModal.setAttribute('aria-hidden', 'false');
                }
            });
        });

        modalClose.addEventListener('click', () => {
            serviceModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            serviceModal.setAttribute('aria-hidden', 'true');
        });

        serviceModal.addEventListener('click', (e) => {
            if (e.target === serviceModal) {
                serviceModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                serviceModal.setAttribute('aria-hidden', 'true');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && serviceModal.classList.contains('active')) {
                serviceModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                serviceModal.setAttribute('aria-hidden', 'true');
            }
        });
    }
}