// export const pricingOptions = [
//     {
//         hours: '10',
//         price: '140',
//         days: '30',
//         currency: 'USD',
//         pricePlansList: [
//             {
//                 time: '1 Month',
//                 price: 'USD 140/MO'
//             },
//             {
//                 time: ' 3 Month',
//                 price: 'USD 399/3MO',
//                 cutPrice: 'USD420/ 3MO',
//                 sale: 'On Sale(Save 5 %)'
//             },

//             {
//                 time: '6 Month',
//                 price: 'USD 756/6MO',
//                 cutPrice: 'USD840/ 6MO',
//                 sale: 'On Sale(Save 10 %)'
//             },

//             {
//                 time: ' 12 Month',
//                 price: 'USD 1428 / 12MO',
//                 cutPrice: 'USD1680 / 12MO',
//                 sale: 'On Sale(Save 15 %)'
//             }
//         ]
//     },
//     {
//         hours: '20',
//         price: '250',
//         days: '30',
//         currency: 'USD',
//         pricePlansList: [
//             {
//                 time: '1 Month',
//                 price: 'USD 140/MO'
//             },
//             {
//                 time: ' 3 Month',
//                 price: 'USD 399/3MO',
//                 cutPrice: 'USD420/ 3MO',
//                 sale: 'On Sale(Save 5 %)'
//             },

//             {
//                 time: '6 Month',
//                 price: 'USD 756/6MO',
//                 cutPrice: 'USD840/ 6MO',
//                 sale: 'On Sale(Save 10 %)'
//             },

//             {
//                 time: ' 12 Month',
//                 price: 'USD 1428 / 12MO',
//                 cutPrice: 'USD1680 / 12MO',
//                 sale: 'On Sale(Save 15 %)'
//             }
//         ]
//     },
//     {
//         hours: '40',
//         price: '450',
//         days: '30',
//         currency: 'USD',
//         pricePlansList: [
//             {
//                 time: '1 Month',
//                 price: 'USD 140/MO'
//             },
//             {
//                 time: ' 3 Month',
//                 price: 'USD 399/3MO',
//                 cutPrice: 'USD420/ 3MO',
//                 sale: 'On Sale(Save 5 %)'
//             },

//             {
//                 time: '6 Month',
//                 price: 'USD 756/6MO',
//                 cutPrice: 'USD840/ 6MO',
//                 sale: 'On Sale(Save 10 %)'
//             },

//             {
//                 time: ' 12 Month',
//                 price: 'USD 1428 / 12MO',
//                 cutPrice: 'USD1680 / 12MO',
//                 sale: 'On Sale(Save 15 %)'
//             }
//         ]
//     },
//     {
//         hours: '60',
//         price: '600',
//         days: '30',
//         currency: 'USD',
//         pricePlansList: [
//             {
//                 time: '1 Month',
//                 price: 'USD 140/MO'
//             },
//             {
//                 time: ' 3 Month',
//                 price: 'USD 399/3MO',
//                 cutPrice: 'USD420/ 3MO',
//                 sale: 'On Sale(Save 5 %)'
//             },

//             {
//                 time: '6 Month',
//                 price: 'USD 756/6MO',
//                 cutPrice: 'USD840/ 6MO',
//                 sale: 'On Sale(Save 10 %)'
//             },

//             {
//                 time: ' 12 Month',
//                 price: 'USD 1428 / 12MO',
//                 cutPrice: 'USD1680 / 12MO',
//                 sale: 'On Sale(Save 15 %)'
//             }
//         ]
//     },
//     {
//         hours: '100',
//         price: '900',
//         days: '30',
//         currency: 'USD',
//         pricePlansList: [
//             {
//                 time: '1 Month',
//                 price: 'USD 140/MO'
//             },
//             {
//                 time: ' 3 Month',
//                 price: 'USD 399/3MO',
//                 cutPrice: 'USD420/ 3MO',
//                 sale: 'On Sale(Save 5 %)'
//             },

//             {
//                 time: '6 Month',
//                 price: 'USD 756/6MO',
//                 cutPrice: 'USD840/ 6MO',
//                 sale: 'On Sale(Save 10 %)'
//             },

//             {
//                 time: ' 12 Month',
//                 price: 'USD 1428 / 12MO',
//                 cutPrice: 'USD1680 / 12MO',
//                 sale: 'On Sale(Save 15 %)'
//             }
//         ]
//     },
//     {
//         hours: '100',
//         price: '900',
//         days: '30',
//         currency: 'USD',
//         pricePlansList: [
//             {
//                 time: '1 Month',
//                 price: 'USD 140/MO'
//             },
//             {
//                 time: ' 3 Month',
//                 price: 'USD 399/3MO',
//                 cutPrice: 'USD420/ 3MO',
//                 sale: 'On Sale(Save 5 %)'
//             },

//             {
//                 time: '6 Month',
//                 price: 'USD 756/6MO',
//                 cutPrice: 'USD840/ 6MO',
//                 sale: 'On Sale(Save 10 %)'
//             },

//             {
//                 time: ' 12 Month',
//                 price: 'USD 1428 / 12MO',
//                 cutPrice: 'USD1680 / 12MO',
//                 sale: 'On Sale(Save 15 %)'
//             }
//         ]
//     },
// ];

export const plans = [
    {
        name: "Basic Plan",
        price: "$99/month",
        description: "Ideal for small websites or blogs with minimal needs.",
        services_offered: [
            "Monthly Backup: Full website backup once a month.",
            "Security Monitoring: Monthly security scan to detect malware.",
            "Uptime Monitoring: 24/7 uptime monitoring.",
            "WordPress/Core Updates: Monthly updates of the core CMS (WordPress, Joomla, etc.).",
            "Basic Support: Up to 2 support hours per month for minor tweaks or updates."
        ]
    },
    {
        name: "Standard Plan",
        price: "$199/month",
        description: "Great for small businesses looking for a little more oversight and care.",
        services_offered: [
            "Weekly Backups: Full website backup every week.",
            "Security Monitoring: Weekly security scans and malware removal if necessary.",
            "Uptime Monitoring: 24/7 uptime monitoring with alerts.",
            "WordPress/Core Updates: Weekly updates for WordPress or other CMS platforms.",
            "Plugin/Theme Updates: Ensure plugins and themes are updated regularly.",
            "Content Updates: Up to 4 updates to website content per month.",
            "Basic Performance Optimization: Ensure website speed is optimized.",
            "Support Hours: 4 support hours per month."
        ]
    },
    {
        name: "Professional Plan",
        price: "$349/month",
        description: "Ideal for eCommerce sites or larger businesses requiring frequent updates.",
        services_offered: [
            "Daily Backups: Automatic daily backups of the entire website.",
            "Security Monitoring: Daily security scans and malware removal.",
            "Uptime Monitoring: 24/7 uptime monitoring with immediate alerts.",
            "WordPress/Core Updates: Daily updates for WordPress or other CMS platforms.",
            "Plugin/Theme Updates: Daily plugin and theme updates to avoid vulnerabilities.",
            "Content Updates: Up to 8 updates to website content per month.",
            "Performance Optimization: Advanced speed optimization for faster load times.",
            "SEO Monitoring: Basic monthly SEO monitoring and reporting.",
            "Support Hours: 6 support hours per month.",
            "Minor Design Changes: Up to 2 minor design adjustments."
        ]
    },
    {
        name: "Business Plan",
        price: "$499/month",
        description: "For growing businesses or busy eCommerce websites.",
        services_offered: [
            "Daily Backups: Full website backups daily.",
            "Advanced Security Monitoring: Real-time security scans with proactive malware removal.",
            "Uptime Monitoring: 24/7 uptime monitoring and immediate response to downtime.",
            "WordPress/Core Updates: Weekly or daily updates as needed.",
            "Plugin/Theme Updates: Proactive updates and compatibility checks.",
            "Content Updates: Up to 12 updates to website content per month.",
            "Performance Optimization: Regular speed tests and advanced optimization techniques.",
            "SEO Monitoring & Optimization: Basic monthly SEO monitoring, reports, and optimization.",
            "Support Hours: 8 support hours per month.",
            "Design Changes: Up to 4 design or layout changes per month."
        ]
    },
    {
        name: "Premium Plan",
        price: "$799/month",
        description: "Designed for larger enterprises or high-traffic sites with complex needs.",
        services_offered: [
            "Daily Backups: Full website backups daily with offsite storage.",
            "Comprehensive Security Monitoring: 24/7 security with real-time threat detection and immediate malware removal.",
            "Uptime Monitoring: 24/7 monitoring with priority alerts and rapid response.",
            "WordPress/Core Updates: Daily updates as needed.",
            "Plugin/Theme Updates: Proactive updates with full testing.",
            "Content Updates: Unlimited updates to website content per month.",
            "Performance Optimization: Advanced performance and database optimization.",
            "SEO Monitoring & Optimization: Monthly SEO audit, keyword tracking, and optimization.",
            "Support Hours: 12 support hours per month.",
            "Custom Design Changes: Up to 6 custom design or layout changes.",
            "Priority Support: Priority response to any issues."
        ]
    },
    {
        name: "Enterprise Plan",
        price: "$1,499/month",
        description: "For high-demand clients needing full website management.",
        services_offered: [
            "Real-Time Backups: Continuous backups with instant restoration capabilities.",
            "Enterprise-Level Security: 24/7 real-time threat detection, proactive malware removal, and security hardening.",
            "Uptime Monitoring: 24/7 uptime monitoring with guaranteed rapid response.",
            "Dedicated Account Manager: A dedicated manager to oversee your website’s health and growth.",
            "Plugin/Theme Updates: Full testing in staging environment before pushing updates live.",
            "Content Updates: Unlimited content updates with priority processing.",
            "Performance Optimization: Full-site performance audits and speed optimization.",
            "SEO Services: Full-service SEO, including keyword research, on-page optimization, and link-building.",
            "Support Hours: 20+ support hours per month.",
            "Custom Design and Development: Up to 10 custom development or design tasks per month.",
            "Priority Support: 24/7 priority support with immediate response."
        ]
    }
];
