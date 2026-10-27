import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  FileSpreadsheet, 
  Sparkles, 
  Plus, 
  Trash2, 
  Download, 
  SlidersHorizontal, 
  CheckCircle2, 
  X,
  Calculator,
  Search,
  Filter,
  Layers,
  ArrowUpDown,
  Building2,
  Upload,
  RefreshCw,
  FileUp,
  AlertCircle,
  Archive,
  FolderOpen,
  DollarSign,
  TrendingUp,
  Clock,
  ArrowLeft,
  Calendar,
  Eye,
  Check,
  Save,
  BarChart3
} from 'lucide-react';

// --- EXACT AGENCY RATE CARD MASTER DATA (TRANSCRIPTION FROM IMAGE) ---
// Structure: Section / Item, Description, Hours per Item, Hourly Rate (AED), Subtotal, 10% PM fee, Price in AED
const AGENCY_RATE_CARD = [
  // --- STRATEGY, PR & EDITORIAL COMMUNICATIONS ---
  {
    id: 'strat-1',
    category: 'Strategy & Communications',
    item: 'Integrated Comms Strategy - 4 pillars (Internal/External)',
    description: 'Develop overall integrated communications strategy, 4 pillars (Internal and External) including:\n• Development of up to 4 communications campaigns\n• Developing preliminary communications plan\n• Development of communications calendar\n• Metrics and performance measurement',
    hours: 144,
    hourlyRate: 750,
    seniority: 'Senior',
    fixedDeliverablePrice: 118800
  },
  {
    id: 'strat-2',
    category: 'Strategy & Communications',
    item: 'Integrated Comms Strategy - Internal/External',
    description: 'Develop overall integrated communications strategy, Internal/External including:\n• Development of up to 2 communications campaigns\n• Developing preliminary communications plan\n• Development of communications calendar\n• Metrics and performance measurement',
    hours: 120,
    hourlyRate: 750,
    seniority: 'Senior',
    fixedDeliverablePrice: 99000
  },
  {
    id: 'strat-3',
    category: 'Strategy & Communications',
    item: 'External Strategy',
    description: 'Develop communications strategy (External) including:\n• Development of up to 2 communications campaigns\n• Development of communications plan\n• Development of communications calendar\n• Metrics and performance measurement',
    hours: 96,
    hourlyRate: 750,
    seniority: 'Senior',
    fixedDeliverablePrice: 79200
  },
  {
    id: 'strat-4',
    category: 'Strategy & Communications',
    item: 'Internal Comms Strategy',
    description: 'Develop communications strategy (Internal) including:\n• Development of up to 2 communications campaigns\n• Developing preliminary communications plan\n• Development of communications calendar\n• Metrics and performance measurement',
    hours: 72,
    hourlyRate: 750,
    seniority: 'Senior',
    fixedDeliverablePrice: 59400
  },
  {
    id: 'strat-5',
    category: 'Strategy & Communications',
    item: 'Stakeholder Mapping',
    description: '• Mapping and identification of internal and external key stakeholders/influencers/accounts\n• Development of stakeholder engagement plan',
    hours: 36,
    hourlyRate: 750,
    seniority: 'Senior',
    fixedDeliverablePrice: 29700
  },
  {
    id: 'strat-6',
    category: 'Strategy & Communications',
    item: 'Key Message Development',
    description: 'Development of high-level messaging framework for the leadership, including 2-3 sets of messaging',
    hours: 24,
    hourlyRate: 900,
    seniority: 'Senior',
    fixedDeliverablePrice: 23760
  },
  {
    id: 'strat-7',
    category: 'Strategy & Communications',
    item: 'Narrative and Key Message Development',
    description: 'Development of overall storyline and narrative mapping framework (themes, sub-themes, audience segmentation, narratives)',
    hours: 48,
    hourlyRate: 900,
    seniority: 'Senior',
    fixedDeliverablePrice: 47520
  },
  {
    id: 'strat-8',
    category: 'Strategy & Communications',
    item: 'Internal Communication Content Development',
    description: 'Drafting of 1 internal campaign narrative/comms',
    hours: 8,
    hourlyRate: 300,
    seniority: 'Mid',
    fixedDeliverablePrice: 2640
  },
  {
    id: 'pr-1',
    category: 'PR & Media Relations',
    item: 'Press Release & Distribution (UAE)',
    description: 'Drafting of 1 PR/op-ed (500-600 words) per press release in one world-wide language. Arabic translation, local media distribution (PR Newswire standard newsfeed for United Arab Emirates) and development of one media coverage report.\n*Distribution costs in markets outside the UAE and Arabic translation to be dependent on length, number of markets etc.',
    hours: 25,
    hourlyRate: 300,
    seniority: 'Mid',
    fixedDeliverablePrice: 8250
  },
  {
    id: 'pr-2',
    category: 'PR & Media Relations',
    item: 'Press Release & Distribution (GCC)',
    description: 'Drafting of 1 PR/op-ed (500-600 words) per press release in one world-wide language. Arabic translation, local media distribution (PR Newswire standard newsfeed for GCC countries) and development of one media coverage report.\n*Distribution costs in markets outside the GCC and Arabic translation to be dependent on length, number of markets etc.',
    hours: 35,
    hourlyRate: 300,
    seniority: 'Mid',
    fixedDeliverablePrice: 11550
  },
  {
    id: 'pr-3',
    category: 'PR & Media Relations',
    item: 'Op-ed Development and Distribution',
    description: 'Drafting of 1 opinion piece (600 words in one language). Pitch to media for distribution and media monitor current to the issue on the subject in real time and development of 1 coverage report',
    hours: 37,
    hourlyRate: 300,
    seniority: 'Mid',
    fixedDeliverablePrice: 12210
  },
  {
    id: 'pr-4',
    category: 'PR & Media Relations',
    item: 'Reactive/Crisis Communication',
    description: 'Drafting of position paper/reactive holding response for speech topic',
    hours: 8,
    hourlyRate: 300,
    seniority: 'Mid',
    fixedDeliverablePrice: 2640
  },
  {
    id: 'pr-5',
    category: 'PR & Media Relations',
    item: 'Speech Development',
    description: 'Drafting of 1 keynote speech (up to 1,500 words in one language)',
    hours: 20,
    hourlyRate: 450,
    seniority: 'Senior',
    fixedDeliverablePrice: 9900
  },
  {
    id: 'pr-6',
    category: 'PR & Media Relations',
    item: 'Media Interview (Tier 1)',
    description: 'Management of 1 interview (face to face/broadcast) with a Tier 1 news outlet, including media briefing notes, on-site assistance and summary of the interview',
    hours: 12,
    hourlyRate: 500,
    seniority: 'Senior',
    fixedDeliverablePrice: 6600
  },
  {
    id: 'pr-7',
    category: 'PR & Media Relations',
    item: 'Media Interview (Tier 2)',
    description: 'Management of 1 interview (face to face/broadcast) with a Tier 2 news outlet, including media briefing notes, on-site assistance and summary of the interview',
    hours: 10,
    hourlyRate: 500,
    seniority: 'Mid',
    fixedDeliverablePrice: 5500
  },
  {
    id: 'event-1',
    category: 'Event Support',
    item: 'Event Support (Small)',
    description: 'Pre-inclusion in media invitation list and media pitching, Q&A, media alert.\nOn-site support for media registration and media facilitation, and on-ground support of 2 PR staff members for event/press support/award submission/liaison; post-event media management support.',
    hours: 36,
    hourlyRate: 500,
    seniority: 'Senior',
    fixedDeliverablePrice: 19800
  },
  {
    id: 'event-2',
    category: 'Event Support',
    item: 'Event Support (Medium)',
    description: 'Pre-inclusion in media invitation list and media pitching, Q&A, media alert.\nOn-site support for media registration and media facilitation, and on-ground support of 2 PR staff members for event/press support/award submission/liaison; post-event media management support.',
    hours: 48,
    hourlyRate: 500,
    seniority: 'Senior',
    fixedDeliverablePrice: 26400
  },
  {
    id: 'event-3',
    category: 'Event Support',
    item: 'Event Support (Large)',
    description: 'Pre-inclusion in media invitation list and media pitching, Q&A, media alert.\nOn-site support for media registration and media facilitation, and on-ground support of 2 PR staff members for event/press support/award submission/liaison; post-event media management support.',
    hours: 73,
    hourlyRate: 500,
    seniority: 'Senior',
    fixedDeliverablePrice: 40150
  },
  {
    id: 'content-1',
    category: 'Content & Editorial',
    item: 'Website Content Development',
    description: 'Development of up to 6,000 words in one language (English or Arabic); copy editing and final proofread.\nNote: This fee does not include design or build.',
    hours: 120,
    hourlyRate: 350,
    seniority: 'Senior',
    fixedDeliverablePrice: 46200
  },
  {
    id: 'content-2',
    category: 'Content & Editorial',
    item: 'Annual Report Content Development',
    description: 'Drafting master copy (double-sided layout) up to 10,000 words in one language.\nNote: This fee does not include design or build.',
    hours: 180,
    hourlyRate: 350,
    seniority: 'Senior',
    fixedDeliverablePrice: 69300
  },
  {
    id: 'content-3',
    category: 'Content & Editorial',
    item: 'Newsletter Content Development',
    description: 'Drafting content (3 articles/templates up to 1,000 words for each language).\nNote: This fee does not include design or layout.',
    hours: 24,
    hourlyRate: 350,
    seniority: 'Mid',
    fixedDeliverablePrice: 9240
  },
  {
    id: 'train-1',
    category: 'Crisis & Training',
    item: 'Media Training',
    description: '• Training session for 2-4 spokespersons in one medium (Arabic or English).\n• 4 hours face-to-face workshop (recorded for review), feedback report and key action plan.',
    hours: 24,
    hourlyRate: 950,
    seniority: 'Senior',
    fixedDeliverablePrice: 25080
  },
  {
    id: 'crisis-1',
    category: 'Crisis & Training',
    item: 'Crisis Comms Manual',
    description: 'Detailed manual/guide tailored for up to 5 critical scenarios, PR activations, escalation protocols, spokesperson allocation matrix; ready-to-deploy scenario collateral: initial holding statements, pre-drafted Q&A, escalation flowcharts, messaging templates (internal, leadership, investors, public, media, emergency services, government bodies/regulators) and staff training.\n• Final master document signed and ratified into company crisis management systems.',
    hours: 144,
    hourlyRate: 850,
    seniority: 'Senior',
    fixedDeliverablePrice: 134640
  },
  {
    id: 'crisis-2',
    category: 'Crisis & Training',
    item: 'Crisis Communication Drill (Desktop)',
    description: 'Desktop simulation exercise: real-time crisis escalation scenario simulation (2-4 hours) tested with executive crisis committee; assessment report on company capabilities, operational gaps, and training improvements.',
    hours: 0,
    hourlyRate: 0,
    seniority: 'Junior',
    fixedDeliverablePrice: 0
  },
  {
    id: 'crisis-3',
    category: 'Crisis & Training',
    item: 'Crisis Communication',
    description: 'Integrated crisis response team deployment, dedicated communications counsel, press monitoring, stakeholder briefings, and active management to de-escalate narrative impact.',
    hours: 18,
    hourlyRate: 900,
    seniority: 'Senior',
    fixedDeliverablePrice: 17820
  },
  {
    id: 'res-1',
    category: 'Strategy & Communications',
    item: 'Research, Analysis and Benchmarking',
    description: 'Research analysis/comprehensive audit report on topic/industry in light of strategic comms.',
    hours: 32,
    hourlyRate: 750,
    seniority: 'Senior',
    fixedDeliverablePrice: 26400
  },
  {
    id: 'mkt-1',
    category: 'Content & Editorial',
    item: 'Marketing Collateral Content',
    description: 'Drafting copywriting/content for marketing collateral, brochures, presentations, web copy (up to 2,000 words in English/Arabic).\n• Does not include layout or printing costs.',
    hours: 14,
    hourlyRate: 300,
    seniority: 'Mid',
    fixedDeliverablePrice: 4620
  },
  {
    id: 'int-1',
    category: 'Strategy & Communications',
    item: 'Internal Campaign',
    description: 'Development of internal communication content for all staff (videos, articles, visual assets/internal campaigns) including:\n• Creation of up to 4 internal newsletters (up to 300 words)\n• Development of communication plan for internal activities',
    hours: 36,
    hourlyRate: 350,
    seniority: 'Mid',
    fixedDeliverablePrice: 13860
  },
  {
    id: 'wp-1',
    category: 'Content & Editorial',
    item: 'White Paper Development',
    description: 'Managing creation of white papers: comprehensive research, writing and editorial review (up to 3,500 words - English).',
    hours: 35,
    hourlyRate: 450,
    seniority: 'Senior',
    fixedDeliverablePrice: 17325
  },
  {
    id: 'plan-1',
    category: 'Strategy & Communications',
    item: 'Communication Plan for New Building/Campus Launch',
    description: 'Developing communication narrative for new campaign/campus launch including PR executions.',
    hours: 35,
    hourlyRate: 450,
    seniority: 'Senior',
    fixedDeliverablePrice: 17325
  },
  {
    id: 'award-1',
    category: 'PR & Media Relations',
    item: 'Award Submission',
    description: 'Developing content for 1 award submission of up to 2,000 words in one language.',
    hours: 12,
    hourlyRate: 500,
    seniority: 'Senior',
    fixedDeliverablePrice: 6600
  },

  // --- SOCIAL MEDIA ---
  {
    id: 'soc-1',
    category: 'Social Media',
    item: 'Digital Site Audit',
    description: 'Development of overall social audit and social media plan per account community.',
    hours: 36,
    hourlyRate: 750,
    seniority: 'Senior',
    fixedDeliverablePrice: 29700
  },
  {
    id: 'soc-2',
    category: 'Social Media',
    item: 'Digital Playbook Construction',
    description: 'Social media playbook development: content pillars, tonality, look and feel, response matrix.',
    hours: 48,
    hourlyRate: 750,
    seniority: 'Senior',
    fixedDeliverablePrice: 39600
  },
  {
    id: 'soc-3',
    category: 'Social Media',
    item: 'Content Page',
    description: 'Social content creation: up to 10 visual assets/captions.',
    hours: 1,
    hourlyRate: 300,
    seniority: 'Junior',
    fixedDeliverablePrice: 330
  },
  {
    id: 'soc-4',
    category: 'Social Media',
    item: 'Performance Report',
    description: 'Performance/social listening report: monthly tracking, sentiment, engagement analysis.',
    hours: 4,
    hourlyRate: 300,
    seniority: 'Junior',
    fixedDeliverablePrice: 1320
  },
  {
    id: 'soc-5',
    category: 'Social Media',
    item: 'Influencer Management',
    description: 'Social influencer management & negotiation fee.',
    hours: 18,
    hourlyRate: 500,
    seniority: 'Senior',
    fixedDeliverablePrice: 9900
  },
  {
    id: 'soc-6',
    category: 'Social Media',
    item: 'Listening Report',
    description: 'Social media listening report and competitor analysis (up to 20 keywords/handles monitored).',
    hours: 16,
    hourlyRate: 300,
    seniority: 'Junior',
    fixedDeliverablePrice: 5280
  },

  // --- DESIGN & PRODUCTION ---
  {
    id: 'des-1',
    category: 'Design & Production',
    item: 'Digital Screen Content',
    description: 'Design content for digital screens (static/motion) in one language (English or Arabic) up to 5 screens.',
    hours: 8,
    hourlyRate: 300,
    seniority: 'Junior',
    fixedDeliverablePrice: 2640
  },
  {
    id: 'des-2',
    category: 'Design & Production',
    item: 'Campaign Creation',
    description: 'Creative concept for brand/campaign: creative consideration, copy/visual direction for key brand activation.',
    hours: 54,
    hourlyRate: 300,
    seniority: 'Mid',
    fixedDeliverablePrice: 17820
  },
  {
    id: 'des-3',
    category: 'Design & Production',
    item: 'Creative Adaptation - Ad',
    description: 'Adaptation of creative concept to master ad formats (for 1 master ad format size).',
    hours: 5,
    hourlyRate: 300,
    seniority: 'Junior',
    fixedDeliverablePrice: 1650
  },
  {
    id: 'des-4',
    category: 'Design & Production',
    item: 'BTL Concepts - Campaign',
    description: 'Creation of BTL concept; activation idea with visuals (mockups/storyboards).',
    hours: 10,
    hourlyRate: 300,
    seniority: 'Junior',
    fixedDeliverablePrice: 3300
  },
  {
    id: 'des-5',
    category: 'Design & Production',
    item: 'BTL Concepts - One-off',
    description: 'Creation of one-off BTL concept; activation idea with visuals (mockups/storyboards).',
    hours: 13,
    hourlyRate: 300,
    seniority: 'Junior',
    fixedDeliverablePrice: 4290
  },
  {
    id: 'des-6',
    category: 'Design & Production',
    item: 'Corporate Logo',
    description: 'Corporate logo with brand identity guidelines & style asset kit.',
    hours: 36,
    hourlyRate: 350,
    seniority: 'Senior',
    fixedDeliverablePrice: 13860
  },
  {
    id: 'des-7',
    category: 'Design & Production',
    item: 'Stationery Application',
    description: 'Stationery application (folder, letterhead, business card).',
    hours: 15,
    hourlyRate: 300,
    seniority: 'Junior',
    fixedDeliverablePrice: 4950
  },
  {
    id: 'des-8',
    category: 'Design & Production',
    item: 'Additional Application',
    description: 'Additional brand collateral applications.',
    hours: 3,
    hourlyRate: 300,
    seniority: 'Junior',
    fixedDeliverablePrice: 990
  },
  {
    id: 'des-9',
    category: 'Design & Production',
    item: 'Flyer/Leaflet',
    description: 'Flyer/leaflet design: 1-2 pages in 1 language.',
    hours: 7,
    hourlyRate: 300,
    seniority: 'Junior',
    fixedDeliverablePrice: 2310
  },
  {
    id: 'des-10',
    category: 'Design & Production',
    item: 'Postcard',
    description: 'Double-sided postcard in one language.',
    hours: 3,
    hourlyRate: 300,
    seniority: 'Junior',
    fixedDeliverablePrice: 990
  },
  {
    id: 'des-11',
    category: 'Design & Production',
    item: 'Brochure/Newsletter Design - Small',
    description: 'Design of 4-page layout (A4/letter) including layout/design.',
    hours: 14,
    hourlyRate: 300,
    seniority: 'Junior',
    fixedDeliverablePrice: 4620
  },
  {
    id: 'des-12',
    category: 'Design & Production',
    item: 'Brochure Design - Big',
    description: 'Design of brochure content (12-16 pages, 1 language, A4/letter format) with image sourcing.',
    hours: 37,
    hourlyRate: 300,
    seniority: 'Mid',
    fixedDeliverablePrice: 12210
  },
  {
    id: 'des-13',
    category: 'Design & Production',
    item: 'Flyer Design',
    description: 'Design of flyer (single sided, size: 210 x 297mm/DL) in one language with moodboard.',
    hours: 5,
    hourlyRate: 300,
    seniority: 'Junior',
    fixedDeliverablePrice: 1650
  },
  {
    id: 'des-14',
    category: 'Design & Production',
    item: 'Packaging Design',
    description: 'Packaging design of pack for 2 variants of products.',
    hours: 24,
    hourlyRate: 300,
    seniority: 'Mid',
    fixedDeliverablePrice: 7920
  },
  {
    id: 'des-15',
    category: 'Design & Production',
    item: 'Badge Design',
    description: 'Design of 2 badges.',
    hours: 4,
    hourlyRate: 300,
    seniority: 'Junior',
    fixedDeliverablePrice: 1320
  },
  {
    id: 'des-16',
    category: 'Design & Production',
    item: 'Poster Design',
    description: 'Design of poster.',
    hours: 8,
    hourlyRate: 300,
    seniority: 'Junior',
    fixedDeliverablePrice: 2640
  },
  {
    id: 'des-17',
    category: 'Design & Production',
    item: 'Brochure Design',
    description: 'Brochure of 4-8 pages.',
    hours: 23,
    hourlyRate: 300,
    seniority: 'Mid',
    fixedDeliverablePrice: 7590
  },
  {
    id: 'des-18',
    category: 'Design & Production',
    item: 'Design of Stickers',
    description: 'Design of stickers, badges, banners pack.',
    hours: 2,
    hourlyRate: 300,
    seniority: 'Junior',
    fixedDeliverablePrice: 660
  },
  {
    id: 'des-19',
    category: 'Design & Production',
    item: 'Design of Window Display',
    description: 'Design of 2x the window display.',
    hours: 7,
    hourlyRate: 300,
    seniority: 'Junior',
    fixedDeliverablePrice: 2310
  },
  {
    id: 'des-20',
    category: 'Design & Production',
    item: 'Site Additional',
    description: 'Additional web screen design.',
    hours: 3,
    hourlyRate: 300,
    seniority: 'Junior',
    fixedDeliverablePrice: 990
  },
  {
    id: 'des-21',
    category: 'Design & Production',
    item: 'Design of Billboard',
    description: 'Design of large-format outdoor billboard (mockup/artwork).',
    hours: 12,
    hourlyRate: 300,
    seniority: 'Junior',
    fixedDeliverablePrice: 3960
  },
  {
    id: 'des-22',
    category: 'Design & Production',
    item: 'Design of Event',
    description: 'Design of stage backdrop, roll-up banner pack, totem unit.',
    hours: 8,
    hourlyRate: 300,
    seniority: 'Junior',
    fixedDeliverablePrice: 2640
  },
  {
    id: 'des-23',
    category: 'Design & Production',
    item: 'Design of Screen',
    description: 'Design of screen, backdrop, roll-up, lamp-post banner (promotional kit).',
    hours: 6,
    hourlyRate: 300,
    seniority: 'Junior',
    fixedDeliverablePrice: 1980
  },
  {
    id: 'des-24',
    category: 'Design & Production',
    item: 'Brand Architecture Concept',
    description: 'Full brand architecture framework and layout guide for master/sub-brands.',
    hours: 66,
    hourlyRate: 300,
    seniority: 'Senior',
    fixedDeliverablePrice: 21780
  },
  {
    id: 'des-25',
    category: 'Design & Production',
    item: 'PPT Design',
    description: 'Design of master PowerPoint presentation master template (up to 12 slides).',
    hours: 18,
    hourlyRate: 300,
    seniority: 'Junior',
    fixedDeliverablePrice: 5940
  },
  {
    id: 'des-26',
    category: 'Design & Production',
    item: 'PPT Design - Images/VO',
    description: 'Multi-screen presentation balancing 3D images + PPT up to 20 slides.',
    hours: 16,
    hourlyRate: 300,
    seniority: 'Junior',
    fixedDeliverablePrice: 5280
  },
  {
    id: 'photo-1',
    category: 'Photography & Video',
    item: 'Event Coverage - Full Day',
    description: 'Full-day event coverage (up to 8 hours). 2x photographers, standard event workflow.',
    hours: 18,
    hourlyRate: 350,
    seniority: 'Mid',
    fixedDeliverablePrice: 6930
  },
  {
    id: 'photo-2',
    category: 'Photography & Video',
    item: 'Half Day Studio Photography',
    description: 'Half-day studio photoshoot (up to 4 hours). 1x cameraman, one camera/operator and basic light pack.',
    hours: 12,
    hourlyRate: 350,
    seniority: 'Mid',
    fixedDeliverablePrice: 4620
  },
  {
    id: 'photo-3',
    category: 'Photography & Video',
    item: 'Half Day Outdoor Photography',
    description: 'Half-day outdoor photoshoot (up to 4 hours). 1x cameraman, one camera/operator and basic light pack.',
    hours: 12,
    hourlyRate: 350,
    seniority: 'Mid',
    fixedDeliverablePrice: 4620
  },
  {
    id: 'photo-4',
    category: 'Photography & Video',
    item: 'Corporate Photo Retouching',
    description: 'Corporate photo retouching, color grading and crop.',
    hours: 2,
    hourlyRate: 300,
    seniority: 'Junior',
    fixedDeliverablePrice: 660
  },
  {
    id: 'photo-5',
    category: 'Photography & Video',
    item: 'Photography - Full Day',
    description: 'Full-day photography shoot and retouching up to 25 images; one camera/operator and equipment.',
    hours: 26,
    hourlyRate: 350,
    seniority: 'Mid',
    fixedDeliverablePrice: 10010
  },
  {
    id: 'video-1',
    category: 'Photography & Video',
    item: 'Full Day Shoot',
    description: 'Full-day corporate videography and audio capture (up to 8 hours); sound/lighting gear and cameraman.',
    hours: 36,
    hourlyRate: 350,
    seniority: 'Senior',
    fixedDeliverablePrice: 13860
  },
  {
    id: 'video-2',
    category: 'Photography & Video',
    item: 'Half Day Shoot',
    description: 'Half-day corporate videography and audio capture (up to 4 hours); sound/lighting gear and cameraman.',
    hours: 18,
    hourlyRate: 350,
    seniority: 'Mid',
    fixedDeliverablePrice: 6930
  },
  {
    id: 'video-3',
    category: 'Photography & Video',
    item: 'Editing and Cut Footage',
    description: 'Video edit and cut footage (up to 2 minutes in duration).',
    hours: 14,
    hourlyRate: 350,
    seniority: 'Mid',
    fixedDeliverablePrice: 5390
  },
  {
    id: 'des-27',
    category: 'Design & Production',
    item: 'Infographic Animation',
    description: 'Delivery of 1 infographic animation (1 to 2 mins) in one language.',
    hours: 14,
    hourlyRate: 350,
    seniority: 'Mid',
    fixedDeliverablePrice: 5390
  },
  {
    id: 'des-28',
    category: 'Design & Production',
    item: 'Infographics - Medium',
    description: 'Built-in infographic layout/illustration in 1 language.',
    hours: 5,
    hourlyRate: 300,
    seniority: 'Junior',
    fixedDeliverablePrice: 1650
  }
];

const CURRENCY = { symbol: 'AED ', code: 'AED' };

const SAMPLE_BRIEFS = [
  {
    label: "Integrated Comms & Launch",
    client: "Abu Dhabi Investment Council",
    timeline: "8 Weeks",
    text: "Deliver an integrated communications strategy across 4 pillars (Internal and External), full stakeholder mapping, bilingual Arabic/English press release distribution across the UAE, executive speech development for the keynote launch, and high-impact event PR support."
  },
  {
    label: "Crisis Preparedness & Training",
    client: "Emirates Logistics Group",
    timeline: "4 Weeks",
    text: "Develop a bespoke corporate crisis communications manual with escalation protocols across 5 critical scenarios, create executive holding statements and spokesperson allocation matrix, followed by intensive media training for 4 designated spokespersons."
  },
  {
    label: "Brand Identity & Content Hub",
    client: "Alpha Energy Solutions",
    timeline: "6 Weeks",
    text: "Design corporate logo with brand architecture guidelines, stationery suite, master 12-slide PowerPoint presentation template, digital website copywriting (up to 6,000 words), and corporate video editing for digital screens."
  }
];

// Initial sample commercial records for historical demonstration
const INITIAL_SAVED_COMMERCIALS = [
  {
    id: 'comm-rec-1',
    clientName: 'Abu Dhabi Investment Council',
    timeline: '8 Weeks',
    createdAt: '2026-10-18T09:30:00.000Z',
    status: 'Approved',
    itemsCount: 8,
    totalHours: 326,
    baseSubtotal: 172900,
    totalPmFee: 17290,
    grandTotal: 190190,
    blendedRate: 530.37,
    briefSummary: 'Deliver an integrated communications strategy across 4 pillars, stakeholder mapping, bilingual Arabic/English press release distribution, and keynote launch PR support.',
    seniorRoleName: 'Integrated Comms Strategy - 4 pillars',
    seniorRate: 750,
    midRate: 350,
    juniorRate: 300,
    itemsSnapshot: []
  },
  {
    id: 'comm-rec-2',
    clientName: 'Emirates Logistics Group',
    timeline: '4 Weeks',
    createdAt: '2026-10-22T14:15:00.000Z',
    status: 'Presented',
    itemsCount: 5,
    totalHours: 186,
    baseSubtotal: 139500,
    totalPmFee: 13950,
    grandTotal: 153450,
    blendedRate: 750.00,
    briefSummary: 'Develop a bespoke corporate crisis communications manual with escalation protocols across 5 critical scenarios, executive holding statements, and media training for 4 spokespersons.',
    seniorRoleName: 'Crisis Comms Manual',
    seniorRate: 850,
    midRate: 350,
    juniorRate: 300,
    itemsSnapshot: []
  },
  {
    id: 'comm-rec-3',
    clientName: 'Alpha Energy Solutions',
    timeline: '6 Weeks',
    createdAt: '2026-10-25T11:00:00.000Z',
    status: 'Under Review',
    itemsCount: 6,
    totalHours: 195,
    baseSubtotal: 68700,
    totalPmFee: 6870,
    grandTotal: 75570,
    blendedRate: 352.31,
    briefSummary: 'Design corporate logo with brand architecture guidelines, stationery suite, master 12-slide PowerPoint presentation template, and digital website copywriting.',
    seniorRoleName: 'Corporate Logo',
    seniorRate: 750,
    midRate: 350,
    juniorRate: 300,
    itemsSnapshot: []
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('studio'); // 'studio' | 'records'
  const [timeline, setTimeline] = useState('8 Weeks');
  const [clientName, setClientName] = useState('Abu Dhabi Investment Council');
  const [briefText, setBriefText] = useState(SAMPLE_BRIEFS[0].text);
  
  // Rate Card State
  const [rateCard, setRateCard] = useState(AGENCY_RATE_CARD);
  const [isRateDrawerOpen, setIsRateDrawerOpen] = useState(false);
  const [drawerSearch, setDrawerSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef(null);

  // Selected Benchmarks: Senior, Mid/Median, Junior
  const [seniorRoleId, setSeniorRoleId] = useState('strat-1');
  const [midRoleId, setMidRoleId] = useState('AUTO_MEDIAN');
  const [juniorRoleId, setJuniorRoleId] = useState('des-1');

  // Generator State
  const [scopeItems, setScopeItems] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [exportNotice, setExportNotice] = useState(null);
  const [recentlyUpdatedId, setRecentlyUpdatedId] = useState(null);

  // Saved Commercials Portfolio History
  const [commercialRecords, setCommercialRecords] = useState(() => {
    try {
      const cached = localStorage.getItem('scopecraft_commercial_records');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not read cached records', e);
    }
    return INITIAL_SAVED_COMMERCIALS;
  });

  // Records Screen Filters
  const [recordsSearch, setRecordsSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Persist records to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('scopecraft_commercial_records', JSON.stringify(commercialRecords));
    } catch (e) {
      console.warn('Could not cache commercial records', e);
    }
  }, [commercialRecords]);

  // Load Styled SheetJS (xlsx-js-style) dynamically to support true Excel colors, fonts and borders
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/xlsx-js-style@1.2.0/dist/xlsx.bundle.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Compute Rate Card Median from the exact rate card items
  const rateCardMedian = useMemo(() => {
    const validRates = rateCard
      .map(r => Number(r.hourlyRate))
      .filter(r => !isNaN(r) && r > 0)
      .sort((a, b) => a - b);

    if (validRates.length === 0) return 350;
    const midIndex = Math.floor(validRates.length / 2);
    return validRates.length % 2 !== 0
      ? validRates[midIndex]
      : Math.round((validRates[midIndex - 1] + validRates[midIndex]) / 2);
  }, [rateCard]);

  // Selected Role Objects based on IDs
  const seniorRole = useMemo(() => {
    return rateCard.find(r => r.id === seniorRoleId) || rateCard.find(r => r.seniority === 'Senior') || rateCard[0];
  }, [rateCard, seniorRoleId]);

  const midRole = useMemo(() => {
    if (midRoleId === 'AUTO_MEDIAN') {
      return {
        id: 'AUTO_MEDIAN',
        item: 'Calculated Rate Card Median',
        seniority: 'Mid',
        hourlyRate: rateCardMedian
      };
    }
    return rateCard.find(r => r.id === midRoleId) || rateCard.find(r => r.seniority === 'Mid') || {
      id: 'default-mid',
      item: 'Mid-Tier Practitioner',
      seniority: 'Mid',
      hourlyRate: rateCardMedian
    };
  }, [rateCard, midRoleId, rateCardMedian]);

  const juniorRole = useMemo(() => {
    return rateCard.find(r => r.id === juniorRoleId) || rateCard.find(r => r.seniority === 'Junior') || rateCard[rateCard.length - 1];
  }, [rateCard, juniorRoleId]);

  const symbol = CURRENCY.symbol;

  // Commercial Metrics Calculation
  const metrics = useMemo(() => {
    let totalHours = 0;
    let baseSubtotal = 0;
    let totalPmFee = 0;
    let seniorHours = 0;
    let midHours = 0;
    let juniorHours = 0;

    scopeItems.forEach(item => {
      const h = Number(item.hours) || 0;
      const r = Number(item.hourlyRate) || 0;
      const base = h * r;
      const pm = Math.round(base * ((Number(item.pmFeePercentage) || 10) / 100));

      totalHours += h;
      baseSubtotal += base;
      totalPmFee += pm;

      if (item.seniority === 'Senior') seniorHours += h;
      else if (item.seniority === 'Mid') midHours += h;
      else juniorHours += h;
    });

    const grandTotal = baseSubtotal + totalPmFee;
    const blendedRate = totalHours > 0 ? baseSubtotal / totalHours : 0;
    const seniorRatio = totalHours > 0 ? (seniorHours / totalHours) * 100 : 0;
    const midRatio = totalHours > 0 ? (midHours / totalHours) * 100 : 0;
    const juniorRatio = totalHours > 0 ? (juniorHours / totalHours) * 100 : 0;

    return {
      totalHours,
      baseSubtotal,
      totalPmFee,
      grandTotal,
      blendedRate,
      seniorHours,
      midHours,
      juniorHours,
      seniorRatio,
      midRatio,
      juniorRatio
    };
  }, [scopeItems]);

  // Aggregate Portfolio Financial Metrics for the Records screen
  const portfolioStats = useMemo(() => {
    const totalCommercialDollarValue = commercialRecords.reduce((acc, curr) => acc + (Number(curr.grandTotal) || 0), 0);
    const totalBaseValue = commercialRecords.reduce((acc, curr) => acc + (Number(curr.baseSubtotal) || 0), 0);
    const totalPmValue = commercialRecords.reduce((acc, curr) => acc + (Number(curr.totalPmFee) || 0), 0);
    const totalBillableHours = commercialRecords.reduce((acc, curr) => acc + (Number(curr.totalHours) || 0), 0);
    const overallBlendedRate = totalBillableHours > 0 ? totalBaseValue / totalBillableHours : 0;

    const countApproved = commercialRecords.filter(r => r.status === 'Approved').length;
    const countPresented = commercialRecords.filter(r => r.status === 'Presented').length;
    const countReview = commercialRecords.filter(r => r.status === 'Under Review').length;
    const countDraft = commercialRecords.filter(r => r.status === 'Draft').length;

    return {
      totalCommercialDollarValue,
      totalBaseValue,
      totalPmValue,
      totalBillableHours,
      overallBlendedRate,
      countApproved,
      countPresented,
      countReview,
      countDraft,
      totalCount: commercialRecords.length
    };
  }, [commercialRecords]);

  // Helper to get benchmark rate by seniority tier
  const getBenchmarkRateForTier = (tier) => {
    if (tier === 'Senior') return Number(seniorRole.hourlyRate) || 750;
    if (tier === 'Mid') return Number(midRole.hourlyRate) || rateCardMedian;
    return Number(juniorRole.hourlyRate) || 300;
  };

  // Helper to save current commercial into historical records
  const saveCurrentCommercialRecord = (statusOverride = 'Presented') => {
    if (scopeItems.length === 0) return null;

    const newRecord = {
      id: `comm-rec-${Date.now()}`,
      clientName: clientName || 'Untitled Client',
      timeline: timeline || 'Not Specified',
      createdAt: new Date().toISOString(),
      status: statusOverride,
      itemsCount: scopeItems.length,
      totalHours: metrics.totalHours,
      baseSubtotal: metrics.baseSubtotal,
      totalPmFee: metrics.totalPmFee,
      grandTotal: metrics.grandTotal,
      blendedRate: metrics.blendedRate,
      briefSummary: briefText.slice(0, 160) + (briefText.length > 160 ? '...' : ''),
      seniorRoleName: seniorRole.item,
      seniorRate: seniorRole.hourlyRate,
      midRate: midRole.hourlyRate,
      juniorRate: juniorRole.hourlyRate,
      itemsSnapshot: JSON.parse(JSON.stringify(scopeItems))
    };

    setCommercialRecords(prev => [newRecord, ...prev]);
    return newRecord;
  };

  // Load a historical commercial back into the active editor
  const loadCommercialRecord = (record) => {
    setClientName(record.clientName);
    setTimeline(record.timeline || '8 Weeks');
    if (record.briefSummary) {
      setBriefText(record.briefSummary);
    }
    if (Array.isArray(record.itemsSnapshot) && record.itemsSnapshot.length > 0) {
      setScopeItems(record.itemsSnapshot);
    }
    setActiveTab('studio');
    setExportNotice(`Loaded commercial submission for "${record.clientName}" into Studio`);
    setTimeout(() => setExportNotice(null), 3500);
  };

  // Update status of a historical record
  const updateRecordStatus = (id, newStatus) => {
    setCommercialRecords(prev => prev.map(rec => {
      if (rec.id === id) {
        return { ...rec, status: newStatus };
      }
      return rec;
    }));
  };

  // Delete a historical record
  const deleteRecord = (id) => {
    setCommercialRecords(prev => prev.filter(rec => rec.id !== id));
  };

  // Handle Rate Card File Upload (XLSX, XLS, CSV)
  const handleRateCardUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!window.XLSX) {
      setUploadStatus({ type: 'error', message: 'Spreadsheet engine is loading. Please try again in a few seconds.' });
      setTimeout(() => setUploadStatus(null), 4000);
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = window.XLSX.read(data, { type: 'array' });
        
        // Find best target sheet (prefer "Rate Card" or first sheet)
        const sheetName = workbook.SheetNames.find(name => 
          name.toLowerCase().includes('rate') || name.toLowerCase().includes('card')
        ) || workbook.SheetNames[0];

        const worksheet = workbook.Sheets[sheetName];
        const rawJson = window.XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        if (!rawJson || rawJson.length === 0) {
          throw new Error('The uploaded sheet is empty or contains no readable rows.');
        }

        // Normalize and detect headers
        const parsedItems = rawJson.map((row, idx) => {
          const keys = Object.keys(row);
          const findVal = (keywords) => {
            const key = keys.find(k => keywords.some(kw => k.toLowerCase().trim().includes(kw)));
            return key ? row[key] : null;
          };

          const itemTitle = findVal(['item', 'service', 'deliverable', 'title', 'task', 'name']) || `Service #${idx + 1}`;
          const category = findVal(['category', 'discipline', 'department', 'section', 'pillar']) || 'General Services';
          const description = findVal(['desc', 'scope', 'details', 'notes']) || '';
          const hours = Number(findVal(['hour', 'hrs', 'duration', 'time'])) || 8;
          const rawRate = Number(findVal(['rate', 'hourly', 'aed', 'fee', 'cost'])) || 350;
          
          let seniority = findVal(['seniority', 'level', 'tier', 'grade']);
          if (!seniority) {
            // Infer seniority based on rate or keywords
            if (rawRate >= 650 || /director|lead|senior|strategy|strategist/i.test(itemTitle)) {
              seniority = 'Senior';
            } else if (rawRate <= 300 || /junior|assistant|production|intern/i.test(itemTitle)) {
              seniority = 'Junior';
            } else {
              seniority = 'Mid';
            }
          } else {
            const sLower = String(seniority).toLowerCase();
            if (sLower.includes('sen') || sLower.includes('lead') || sLower.includes('dir')) seniority = 'Senior';
            else if (sLower.includes('jun') || sLower.includes('coord') || sLower.includes('entry')) seniority = 'Junior';
            else seniority = 'Mid';
          }

          const base = hours * rawRate;
          const pm = Math.round(base * 0.10);

          return {
            id: `custom-rc-${Date.now()}-${idx}`,
            category: String(category).trim(),
            item: String(itemTitle).trim(),
            description: String(description).trim(),
            hours: hours,
            hourlyRate: rawRate,
            seniority: seniority,
            fixedDeliverablePrice: base + pm
          };
        });

        if (parsedItems.length === 0) {
          throw new Error('No valid rate card rows could be extracted.');
        }

        setRateCard(parsedItems);

        // Auto-reanchor benchmarks if existing IDs no longer exist
        const firstSenior = parsedItems.find(r => r.seniority === 'Senior') || parsedItems[0];
        const firstJunior = parsedItems.find(r => r.seniority === 'Junior') || parsedItems[parsedItems.length - 1];
        setSeniorRoleId(firstSenior.id);
        setJuniorRoleId(firstJunior.id);
        setMidRoleId('AUTO_MEDIAN');

        setUploadStatus({
          type: 'success',
          message: `Successfully loaded ${parsedItems.length} services from "${file.name}"!`
        });
        setTimeout(() => setUploadStatus(null), 4500);

      } catch (err) {
        console.error('Rate card parse error:', err);
        setUploadStatus({
          type: 'error',
          message: err.message || 'Failed to parse rate card. Please check column format.'
        });
        setTimeout(() => setUploadStatus(null), 5000);
      } finally {
        if (e.target) e.target.value = '';
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // Download Sample Rate Card Template for user reference
  const downloadRateCardTemplate = () => {
    if (!window.XLSX) return;
    const templateData = [
      ["Item / Service", "Category", "Description", "Seniority", "Hours per Item", "Hourly Rate (AED)"],
      ["Brand Strategy Framework", "Strategy & Communications", "Comprehensive brand identity guidelines & positioning.", "Senior", 48, 750],
      ["Media Outreach & Tier-1 Pitching", "PR & Media Relations", "Drafting media alert, pitching Tier-1 national press and follow-ups.", "Mid", 20, 450],
      ["Social Media Video Animation", "Design & Production", "Creation of 3 motion-graphic cutdowns (9:16) for campaign rollout.", "Junior", 12, 300],
      ["Executive Crisis Holding Statement", "Crisis & Training", "Rapid deployment scenario statements signed for legal compliance.", "Senior", 16, 900],
      ["Editorial Copywriting", "Content & Editorial", "Drafting bilingual editorial feature (up to 1,200 words).", "Mid", 14, 350]
    ];
    const ws = window.XLSX.utils.aoa_to_sheet(templateData);
    ws['!cols'] = [{ wch: 32 }, { wch: 26 }, { wch: 45 }, { wch: 14 }, { wch: 16 }, { wch: 18 }];
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, "Rate Card Template");
    window.XLSX.writeFile(wb, "Agency_Rate_Card_Template.xlsx");
  };

  // Reset to original preset agency card
  const resetToOfficialRateCard = () => {
    setRateCard(AGENCY_RATE_CARD);
    setSeniorRoleId('strat-1');
    setJuniorRoleId('des-1');
    setMidRoleId('AUTO_MEDIAN');
    setUploadStatus({
      type: 'success',
      message: 'Restored original official agency rate card.'
    });
    setTimeout(() => setUploadStatus(null), 3500);
  };

  // Cascade benchmark changes to all non-overridden scope items
  useEffect(() => {
    setScopeItems(prevItems => {
      let changed = false;
      const updated = prevItems.map(item => {
        if (item.isCustomRate) return item; // User manually locked a custom rate
        const expectedRate = getBenchmarkRateForTier(item.seniority);
        if (item.hourlyRate !== expectedRate) {
          changed = true;
          const base = item.hours * expectedRate;
          const pm = Math.round(base * 0.10);
          return {
            ...item,
            hourlyRate: expectedRate,
            baseCost: base,
            pmFee: pm,
            totalPrice: base + pm
          };
        }
        return item;
      });
      return changed ? updated : prevItems;
    });
  }, [seniorRole.hourlyRate, midRole.hourlyRate, juniorRole.hourlyRate]);

  // Initial Scope Population
  useEffect(() => {
    generateDeterministicScope(false);
  }, []);

  // Deterministic scope generation using exact items from the rate card
  const generateDeterministicScope = (animate = true) => {
    if (animate) setIsGenerating(true);

    setTimeout(() => {
      // Pick matching rate card items based on brief keywords
      const selected = [
        rateCard.find(r => r.id === 'strat-1') || rateCard[0],
        rateCard.find(r => r.id === 'strat-5') || rateCard[4],
        rateCard.find(r => r.id === 'pr-1') || rateCard[8],
        rateCard.find(r => r.id === 'pr-5') || rateCard[12],
        rateCard.find(r => r.id === 'event-1') || rateCard[15],
        rateCard.find(r => r.id === 'content-1') || rateCard[18],
        rateCard.find(r => r.id === 'des-6') || rateCard[27],
        rateCard.find(r => r.id === 'des-25') || rateCard[46]
      ];

      const initialScope = selected.map((item, idx) => {
        const tierRate = getBenchmarkRateForTier(item.seniority);
        const baseCost = item.hours * tierRate;
        const pmFee = Math.round(baseCost * 0.10);
        const totalPrice = baseCost + pmFee;

        return {
          id: `line-${Date.now()}-${idx}`,
          rateCardId: item.id,
          deliverable: item.item,
          category: item.category,
          seniority: item.seniority,
          hourlyRate: tierRate,
          isCustomRate: false,
          hours: item.hours,
          pmFeePercentage: 10,
          baseCost: baseCost,
          pmFee: pmFee,
          totalPrice: totalPrice,
          description: item.description
        };
      });

      setScopeItems(initialScope);
      setIsGenerating(false);
    }, animate ? 350 : 0);
  };

  // AI-assisted scope selector & estimator using Gemini
  const generateScopeWithAI = async () => {
    setIsGenerating(true);

    const availableCatalogue = rateCard.map(r => ({
      id: r.id,
      item: r.item,
      category: r.category,
      seniority: r.seniority,
      defaultHours: r.hours,
      rate: r.hourlyRate
    }));

    const systemPrompt = `You are a high-level Commercial Director at an elite communications agency in the UAE. 
Analyze the client brief and pick the 6 to 10 most relevant deliverables strictly from the official rate card catalogue.
You must return a JSON array containing matching objects from the catalogue. For each item, provide the matching rateCardId, custom adjusted hours (or defaultHours if suitable), and seniority.
Return strictly valid JSON.`;

    const userPrompt = `Client: ${clientName}
Timeline: ${timeline}
Brief: "${briefText}"

Senior Benchmark Role: ${seniorRole.item} (${symbol}${seniorRole.hourlyRate}/hr)
Mid/Median Benchmark: ${midRole.item} (${symbol}${midRole.hourlyRate}/hr)
Junior Benchmark Role: ${juniorRole.item} (${symbol}${juniorRole.hourlyRate}/hr)

Rate Card Catalogue:
${JSON.stringify(availableCatalogue.slice(0, 45))}

Return JSON array formatted as:
[
  {
    "rateCardId": "string (from catalogue)",
    "deliverable": "string",
    "seniority": "Senior" | "Mid" | "Junior",
    "hours": number
  }
]`;

    try {
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userPrompt }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  rateCardId: { type: "STRING" },
                  deliverable: { type: "STRING" },
                  seniority: { type: "STRING", enum: ["Senior", "Mid", "Junior"] },
                  hours: { type: "NUMBER" }
                },
                required: ["rateCardId", "deliverable", "seniority", "hours"]
              }
            }
          }
        })
      });

      if (!response.ok) throw new Error("API call failed");

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (rawText) {
        const parsed = JSON.parse(rawText);
        const validated = parsed.map((item, idx) => {
          const matchedRC = rateCard.find(r => r.id === item.rateCardId) || rateCard[idx % rateCard.length];
          const assignedHours = Number(item.hours) || matchedRC.hours;
          const assignedTier = item.seniority || matchedRC.seniority;
          const tierRate = getBenchmarkRateForTier(assignedTier);
          const base = assignedHours * tierRate;
          const pm = Math.round(base * 0.10);

          return {
            id: `line-ai-${Date.now()}-${idx}`,
            rateCardId: matchedRC.id,
            deliverable: matchedRC.item,
            category: matchedRC.category,
            seniority: assignedTier,
            hourlyRate: tierRate,
            isCustomRate: false,
            hours: assignedHours,
            pmFeePercentage: 10,
            baseCost: base,
            pmFee: pm,
            totalPrice: base + pm,
            description: matchedRC.description
          };
        });
        setScopeItems(validated);
      } else {
        generateDeterministicScope(false);
      }
    } catch (e) {
      generateDeterministicScope(false);
    } finally {
      setIsGenerating(false);
    }
  };

  // Scope editing helpers
  const updateHours = (id, delta) => {
    setScopeItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextH = Math.max(0, (Number(item.hours) || 0) + delta);
        const base = nextH * (Number(item.hourlyRate) || 0);
        const pm = Math.round(base * ((Number(item.pmFeePercentage) || 10) / 100));
        return { 
          ...item, 
          hours: nextH,
          baseCost: base,
          pmFee: pm,
          totalPrice: base + pm
        };
      }
      return item;
    }));
  };

  const updateItemDeliverable = (id, newRateCardId) => {
    const rc = rateCard.find(r => r.id === newRateCardId);
    if (!rc) return;
    setScopeItems(prev => prev.map(item => {
      if (item.id === id) {
        // Keep active seniority or inherit from catalog, then apply benchmark rate
        const targetTier = item.seniority || rc.seniority;
        const targetRate = getBenchmarkRateForTier(targetTier);
        const base = rc.hours * targetRate;
        const pm = Math.round(base * 0.10);
        return {
          ...item,
          rateCardId: rc.id,
          deliverable: rc.item,
          category: rc.category,
          seniority: targetTier,
          hourlyRate: targetRate,
          isCustomRate: false,
          hours: rc.hours,
          baseCost: base,
          pmFee: pm,
          totalPrice: base + pm,
          description: rc.description
        };
      }
      return item;
    }));
  };

  // DYNAMIC TIER-TO-RATE BINDING:
  // When tier changes, hourlyRate immediately sets to benchmark rate for that tier!
  const updateSeniority = (id, newSeniority) => {
    const targetRate = getBenchmarkRateForTier(newSeniority);

    setScopeItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const base = item.hours * targetRate;
      const pm = Math.round(base * 0.10);
      return { 
        ...item, 
        seniority: newSeniority,
        hourlyRate: targetRate,
        isCustomRate: false,
        baseCost: base,
        pmFee: pm,
        totalPrice: base + pm
      };
    }));

    // Trigger visual pulse feedback
    setRecentlyUpdatedId(id);
    setTimeout(() => setRecentlyUpdatedId(null), 1200);
  };

  // Manual rate override handler
  const updateCustomRate = (id, newRate) => {
    const parsedRate = Math.max(0, Number(newRate) || 0);
    setScopeItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const base = item.hours * parsedRate;
      const pm = Math.round(base * 0.10);
      return {
        ...item,
        hourlyRate: parsedRate,
        isCustomRate: true,
        baseCost: base,
        pmFee: pm,
        totalPrice: base + pm
      };
    }));
  };

  // Re-sync rate back to active benchmark
  const syncToTierBenchmark = (id) => {
    setScopeItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const benchmarkRate = getBenchmarkRateForTier(item.seniority);
      const base = item.hours * benchmarkRate;
      const pm = Math.round(base * 0.10);
      return {
        ...item,
        hourlyRate: benchmarkRate,
        isCustomRate: false,
        baseCost: base,
        pmFee: pm,
        totalPrice: base + pm
      };
    }));
    setRecentlyUpdatedId(id);
    setTimeout(() => setRecentlyUpdatedId(null), 1200);
  };

  const removeLineItem = (id) => {
    setScopeItems(prev => prev.filter(item => item.id !== id));
  };

  const addLineItemFromRateCard = (rcItem) => {
    const tierRate = getBenchmarkRateForTier(rcItem.seniority);
    const base = rcItem.hours * tierRate;
    const pm = Math.round(base * 0.10);
    setScopeItems(prev => [
      ...prev,
      {
        id: `line-added-${Date.now()}`,
        rateCardId: rcItem.id,
        deliverable: rcItem.item,
        category: rcItem.category,
        seniority: rcItem.seniority,
        hourlyRate: tierRate,
        isCustomRate: false,
        hours: rcItem.hours,
        pmFeePercentage: 10,
        baseCost: base,
        pmFee: pm,
        totalPrice: base + pm,
        description: rcItem.description
      }
    ]);
  };

  // Professional Commercial Spreadsheet Generator matching the attached template
  const exportToExcel = (overrideItems = null, overrideClient = null, overrideTimeline = null) => {
    const xlsxLib = window.XLSX;
    if (!xlsxLib) return;

    const itemsToExport = overrideItems || scopeItems;
    const clientToExport = overrideClient || clientName;
    const timelineToExport = overrideTimeline || timeline;

    // Auto-log to history if called from live studio
    if (!overrideItems) {
      saveCurrentCommercialRecord('Presented');
    }

    // Helper: Style tokens matching the attached commercial template
    const borderThin = { style: 'thin', color: { rgb: 'D9D9D9' } };
    const borderDark = { style: 'thin', color: { rgb: '1F3864' } };
    const borderDoubleBottom = { style: 'double', color: { rgb: '1F3864' } };

    const styles = {
      agencyHeader: {
        font: { name: 'Calibri', sz: 14, bold: true, color: { rgb: '1F3864' } },
        alignment: { vertical: 'center', horizontal: 'left' }
      },
      metaLabel: {
        font: { name: 'Calibri', sz: 10, bold: true, color: { rgb: '595959' } },
        alignment: { vertical: 'center', horizontal: 'left' }
      },
      metaValue: {
        font: { name: 'Calibri', sz: 10, color: { rgb: '000000' } },
        alignment: { vertical: 'center', horizontal: 'left' }
      },
      tableHeaderStandard: {
        font: { name: 'Calibri', sz: 10, bold: true, color: { rgb: 'FFFFFF' } },
        fill: { fgColor: { rgb: '2F5597' } },
        alignment: { vertical: 'center', horizontal: 'center', wrapText: true },
        border: { top: borderDark, bottom: borderDark, left: borderDark, right: borderDark }
      },
      tableHeaderGold: {
        font: { name: 'Calibri', sz: 10, bold: true, color: { rgb: '4D2600' } },
        fill: { fgColor: { rgb: 'FFE699' } },
        alignment: { vertical: 'center', horizontal: 'center', wrapText: true },
        border: { top: borderDark, bottom: borderDark, left: borderDark, right: borderDark }
      },
      tableHeaderBlue: {
        font: { name: 'Calibri', sz: 10, bold: true, color: { rgb: 'FFFFFF' } },
        fill: { fgColor: { rgb: '1F4E79' } },
        alignment: { vertical: 'center', horizontal: 'center', wrapText: true },
        border: { top: borderDark, bottom: borderDark, left: borderDark, right: borderDark }
      },
      categoryDivider: {
        font: { name: 'Calibri', sz: 10, bold: true, color: { rgb: '1F3864' } },
        fill: { fgColor: { rgb: 'D9E1F2' } },
        alignment: { vertical: 'center', horizontal: 'left' },
        border: { top: borderThin, bottom: borderThin, left: borderThin, right: borderThin }
      },
      itemCell: {
        font: { name: 'Calibri', sz: 10, bold: true, color: { rgb: '000000' } },
        alignment: { vertical: 'top', horizontal: 'left', wrapText: true },
        border: { top: borderThin, bottom: borderThin, left: borderThin, right: borderThin }
      },
      descCell: {
        font: { name: 'Calibri', sz: 9, color: { rgb: '333333' } },
        alignment: { vertical: 'top', horizontal: 'left', wrapText: true },
        border: { top: borderThin, bottom: borderThin, left: borderThin, right: borderThin }
      },
      numberCell: {
        font: { name: 'Calibri', sz: 10, color: { rgb: '000000' } },
        alignment: { vertical: 'top', horizontal: 'right' },
        numFmt: '#,##0',
        border: { top: borderThin, bottom: borderThin, left: borderThin, right: borderThin }
      },
      currencyCell: {
        font: { name: 'Calibri', sz: 10, color: { rgb: '000000' } },
        alignment: { vertical: 'top', horizontal: 'right' },
        numFmt: '#,##0',
        border: { top: borderThin, bottom: borderThin, left: borderThin, right: borderThin }
      },
      pmCell: {
        font: { name: 'Calibri', sz: 10, color: { rgb: '7F6000' } },
        fill: { fgColor: { rgb: 'FFFBE6' } },
        alignment: { vertical: 'top', horizontal: 'right' },
        numFmt: '#,##0',
        border: { top: borderThin, bottom: borderThin, left: borderThin, right: borderThin }
      },
      totalCell: {
        font: { name: 'Calibri', sz: 10, bold: true, color: { rgb: '1F3864' } },
        fill: { fgColor: { rgb: 'EDF2F8' } },
        alignment: { vertical: 'top', horizontal: 'right' },
        numFmt: '#,##0',
        border: { top: borderThin, bottom: borderThin, left: borderThin, right: borderThin }
      },
      summaryTotalLabel: {
        font: { name: 'Calibri', sz: 11, bold: true, color: { rgb: '1F3864' } },
        alignment: { vertical: 'center', horizontal: 'left' },
        border: { top: borderDark, bottom: borderDoubleBottom }
      },
      summaryTotalNumber: {
        font: { name: 'Calibri', sz: 11, bold: true, color: { rgb: '1F3864' } },
        alignment: { vertical: 'center', horizontal: 'right' },
        numFmt: '#,##0',
        border: { top: borderDark, bottom: borderDoubleBottom }
      },
      summaryTotalFinal: {
        font: { name: 'Calibri', sz: 11, bold: true, color: { rgb: 'FFFFFF' } },
        fill: { fgColor: { rgb: '1F4E79' } },
        alignment: { vertical: 'center', horizontal: 'right' },
        numFmt: '#,##0',
        border: { top: borderDark, bottom: borderDoubleBottom, left: borderDark, right: borderDark }
      }
    };

    // --- BUILD WORKSHEET 1: EXACT COMMERCIAL SUBMISSION TEMPLATE ---
    const ws = {};
    const merges = [];
    let r = 0;

    const setCell = (row, col, value, type, style, formula = null) => {
      const cellRef = xlsxLib.utils.encode_cell({ r: row, c: col });
      const cellObj = { v: value, t: type };
      if (style) cellObj.s = style;
      if (formula) cellObj.f = formula;
      ws[cellRef] = cellObj;
      return cellObj;
    };

    // 1. Executive Proposal Header
    setCell(r, 0, 'COMMERCIAL PROPOSAL & SCOPE OF WORK', 's', styles.agencyHeader);
    merges.push({ s: { r, c: 0 }, e: { r, c: 6 } });
    r++;

    setCell(r, 0, 'Confidential submission based on approved Agency Commercial Rate Card', 's', styles.metaLabel);
    merges.push({ s: { r, c: 0 }, e: { r, c: 6 } });
    r += 2;

    // Metadata block
    setCell(r, 0, 'Client Organization:', 's', styles.metaLabel);
    setCell(r, 1, clientToExport, 's', styles.metaValue);
    setCell(r, 4, 'Submission Date:', 's', styles.metaLabel);
    setCell(r, 5, new Date().toLocaleDateString('en-GB'), 's', styles.metaValue);
    r++;

    setCell(r, 0, 'Scope Duration:', 's', styles.metaLabel);
    setCell(r, 1, timelineToExport, 's', styles.metaValue);
    setCell(r, 4, 'Currency:', 's', styles.metaLabel);
    setCell(r, 5, 'AED (United Arab Emirates Dirham)', 's', styles.metaValue);
    r += 2;

    // 2. Table Header Row
    const headerRow = r;
    const headers = [
      { text: 'Item', style: styles.tableHeaderStandard },
      { text: 'Description', style: styles.tableHeaderStandard },
      { text: 'Hours per\nitem', style: styles.tableHeaderStandard },
      { text: 'Rate\n(AED)', style: styles.tableHeaderStandard },
      { text: 'Subtotal\n(AED)', style: styles.tableHeaderStandard },
      { text: '10% project\nmanagement', style: styles.tableHeaderGold },
      { text: 'Price in AED', style: styles.tableHeaderBlue }
    ];

    headers.forEach((h, colIdx) => {
      setCell(headerRow, colIdx, h.text, 's', h.style);
    });
    r++;

    // 3. Populate Rows Grouped by Category/Discipline
    const grouped = {};
    itemsToExport.forEach(item => {
      const cat = item.category || 'General Deliverables';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(item);
    });

    const dataRowIndices = [];

    Object.keys(grouped).forEach(category => {
      // Category Section Banner
      setCell(r, 0, category.toUpperCase(), 's', styles.categoryDivider);
      for (let c = 1; c <= 6; c++) {
        setCell(r, c, '', 's', styles.categoryDivider);
      }
      merges.push({ s: { r, c: 0 }, e: { r, c: 6 } });
      r++;

      // Line items under this category
      grouped[category].forEach(item => {
        const itemRow = r;
        dataRowIndices.push(itemRow + 1); // 1-based index for formulas

        const hours = Number(item.hours) || 0;
        const rate = Number(item.hourlyRate) || 0;
        const base = hours * rate;
        const pm = Math.round(base * ((Number(item.pmFeePercentage) || 10) / 100));
        const total = base + pm;

        const rowIdx = itemRow + 1;
        const formulaSubtotal = `C${rowIdx}*D${rowIdx}`;
        const formulaPM = `E${rowIdx}*0.1`;
        const formulaTotal = `E${rowIdx}+F${rowIdx}`;

        setCell(itemRow, 0, item.deliverable, 's', styles.itemCell);
        setCell(itemRow, 1, item.description || '', 's', styles.descCell);
        setCell(itemRow, 2, hours, 'n', styles.numberCell);
        setCell(itemRow, 3, rate, 'n', styles.currencyCell);
        setCell(itemRow, 4, base, 'n', styles.currencyCell, formulaSubtotal);
        setCell(itemRow, 5, pm, 'n', styles.pmCell, formulaPM);
        setCell(itemRow, 6, total, 'n', styles.totalCell, formulaTotal);

        r++;
      });
    });

    // 4. Commercial Summary & Grand Totals Row
    r++; // spacer
    const totalRow = r;
    setCell(totalRow, 0, 'TOTAL COMMERCIAL INVESTMENT', 's', styles.summaryTotalLabel);
    setCell(totalRow, 1, '', 's', styles.summaryTotalLabel);
    merges.push({ s: { r: totalRow, c: 0 }, e: { r: totalRow, c: 1 } });

    // Compute exported dataset metrics
    let expHours = 0;
    let expBase = 0;
    let expPm = 0;
    itemsToExport.forEach(it => {
      const h = Number(it.hours) || 0;
      const rate = Number(it.hourlyRate) || 0;
      const b = h * rate;
      expHours += h;
      expBase += b;
      expPm += Math.round(b * 0.10);
    });
    const expGrand = expBase + expPm;
    const expBlended = expHours > 0 ? expBase / expHours : 0;

    if (dataRowIndices.length > 0) {
      const firstRow = dataRowIndices[0];
      const lastRow = dataRowIndices[dataRowIndices.length - 1];
      setCell(totalRow, 2, expHours, 'n', styles.summaryTotalNumber, `SUM(C${firstRow}:C${lastRow})`);
      setCell(totalRow, 3, Math.round(expBlended), 'n', styles.summaryTotalNumber);
      setCell(totalRow, 4, expBase, 'n', styles.summaryTotalNumber, `SUM(E${firstRow}:E${lastRow})`);
      setCell(totalRow, 5, expPm, 'n', styles.summaryTotalNumber, `SUM(F${firstRow}:F${lastRow})`);
      setCell(totalRow, 6, expGrand, 'n', styles.summaryTotalFinal, `SUM(G${firstRow}:G${lastRow})`);
    } else {
      setCell(totalRow, 2, 0, 'n', styles.summaryTotalNumber);
      setCell(totalRow, 3, 0, 'n', styles.summaryTotalNumber);
      setCell(totalRow, 4, 0, 'n', styles.summaryTotalNumber);
      setCell(totalRow, 5, 0, 'n', styles.summaryTotalNumber);
      setCell(totalRow, 6, 0, 'n', styles.summaryTotalFinal);
    }
    r += 2;

    // 5. Seniority Mix & Benchmark Reference Footer Block
    setCell(r, 0, 'COMMERCIAL BENCHMARKS & RESOURCE ALLOCATION', 's', styles.agencyHeader);
    merges.push({ s: { r, c: 0 }, e: { r, c: 6 } });
    r++;

    const summaryMeta = [
      ['Senior Role Benchmark:', `${seniorRole.item} @ AED ${seniorRole.hourlyRate}/hr`],
      ['Mid/Median Benchmark:', `${midRole.item} @ AED ${midRole.hourlyRate}/hr`],
      ['Junior Role Benchmark:', `${juniorRole.item} @ AED ${juniorRole.hourlyRate}/hr`],
      ['Total Billable Scope:', `${expHours} billable hours`],
      ['Base Agency Subtotal:', `AED ${expBase.toLocaleString()}`],
      ['Standard 10% PM Fee:', `AED ${expPm.toLocaleString()}`],
      ['Blended Rate Achieved:', `AED ${expBlended.toFixed(2)}/hr`]
    ];

    summaryMeta.forEach(([lbl, val]) => {
      setCell(r, 0, lbl, 's', styles.metaLabel);
      setCell(r, 1, val, 's', styles.metaValue);
      merges.push({ s: { r, c: 1 }, e: { r, c: 4 } });
      r++;
    });

    // Finalize Worksheet 1 metadata
    ws['!ref'] = xlsxLib.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: r + 1, c: 6 } });
    ws['!merges'] = merges;
    ws['!cols'] = [
      { wch: 34 },
      { wch: 54 },
      { wch: 14 },
      { wch: 12 },
      { wch: 16 },
      { wch: 18 },
      { wch: 18 }
    ];

    // --- BUILD WORKSHEET 2: MASTER AGENCY RATE CARD BACKSTAGE ---
    const wsRateCard = {};
    const rcMerges = [];
    let r2 = 0;

    setCell(r2, 0, 'MASTER AGENCY RATE CARD CATALOGUE', 's', styles.agencyHeader);
    rcMerges.push({ s: { r: r2, c: 0 }, e: { r: r2, c: 6 } });
    r2 += 2;

    headers.forEach((h, colIdx) => {
      const headerCell = { ...h };
      const cRef = xlsxLib.utils.encode_cell({ r: r2, c: colIdx });
      wsRateCard[cRef] = { v: headerCell.text, t: 's', s: headerCell.style };
    });
    r2++;

    rateCard.forEach(rc => {
      const base = rc.hours * rc.hourlyRate;
      const pm = Math.round(base * 0.10);
      const total = rc.fixedDeliverablePrice || (base + pm);

      const rowIdx = r2 + 1;
      const c0 = xlsxLib.utils.encode_cell({ r: r2, c: 0 });
      const c1 = xlsxLib.utils.encode_cell({ r: r2, c: 1 });
      const c2 = xlsxLib.utils.encode_cell({ r: r2, c: 2 });
      const c3 = xlsxLib.utils.encode_cell({ r: r2, c: 3 });
      const c4 = xlsxLib.utils.encode_cell({ r: r2, c: 4 });
      const c5 = xlsxLib.utils.encode_cell({ r: r2, c: 5 });
      const c6 = xlsxLib.utils.encode_cell({ r: r2, c: 6 });

      wsRateCard[c0] = { v: rc.item, t: 's', s: styles.itemCell };
      wsRateCard[c1] = { v: rc.description || '', t: 's', s: styles.descCell };
      wsRateCard[c2] = { v: rc.hours, t: 'n', s: styles.numberCell };
      wsRateCard[c3] = { v: rc.hourlyRate, t: 'n', s: styles.currencyCell };
      wsRateCard[c4] = { v: base, t: 'n', s: styles.currencyCell, f: `C${rowIdx}*D${rowIdx}` };
      wsRateCard[c5] = { v: pm, t: 'n', s: styles.pmCell, f: `E${rowIdx}*0.1` };
      wsRateCard[c6] = { v: total, t: 'n', s: styles.totalCell, f: `E${rowIdx}+F${rowIdx}` };

      r2++;
    });

    wsRateCard['!ref'] = xlsxLib.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: r2, c: 6 } });
    wsRateCard['!merges'] = rcMerges;
    wsRateCard['!cols'] = [
      { wch: 34 },
      { wch: 54 },
      { wch: 14 },
      { wch: 12 },
      { wch: 16 },
      { wch: 18 },
      { wch: 18 }
    ];

    // Combine into Workbook and trigger download
    const wb = xlsxLib.utils.book_new();
    xlsxLib.utils.book_append_sheet(wb, ws, "Commercial Proposal");
    xlsxLib.utils.book_append_sheet(wb, wsRateCard, "Agency Rate Card");

    const sanitizedName = clientToExport ? clientToExport.replace(/[^\w\s-]/gi, '').replace(/\s+/g, '_') : 'Client';
    const filename = `Commercial_Proposal_${sanitizedName}.xlsx`;
    xlsxLib.writeFile(wb, filename);

    setExportNotice(`Generated formatted submission: ${filename}`);
    setTimeout(() => setExportNotice(null), 3500);
  };

  // Export summary of all commercials to a consolidated CSV/Excel rollup
  const exportPortfolioRollup = () => {
    const xlsxLib = window.XLSX;
    if (!xlsxLib) return;

    const summaryRows = [
      ["COMMERCIAL SUBMISSIONS & PIPELINE SUMMARY"],
      [`Generated on: ${new Date().toLocaleDateString('en-GB')}`],
      [`Total Pipeline Value: AED ${portfolioStats.totalCommercialDollarValue.toLocaleString()}`],
      [`Total Scope Hours: ${portfolioStats.totalBillableHours} hrs`],
      [],
      ["Client Organization", "Timeline", "Status", "Total Hours", "Base Subtotal (AED)", "10% PM Fee (AED)", "Total Price (AED)", "Blended Rate", "Date Created"]
    ];

    commercialRecords.forEach(rec => {
      summaryRows.push([
        rec.clientName,
        rec.timeline,
        rec.status,
        rec.totalHours,
        rec.baseSubtotal,
        rec.totalPmFee,
        rec.grandTotal,
        Math.round(rec.blendedRate),
        new Date(rec.createdAt).toLocaleDateString('en-GB')
      ]);
    });

    const ws = xlsxLib.utils.aoa_to_sheet(summaryRows);
    ws['!cols'] = [
      { wch: 30 },
      { wch: 14 },
      { wch: 16 },
      { wch: 14 },
      { wch: 20 },
      { wch: 18 },
      { wch: 20 },
      { wch: 16 },
      { wch: 14 }
    ];
    const wb = xlsxLib.utils.book_new();
    xlsxLib.utils.book_append_sheet(wb, ws, "Commercial Pipeline");
    xlsxLib.writeFile(wb, "Agency_Commercial_Pipeline_Rollup.xlsx");
    
    setExportNotice("Exported pipeline summary sheet.");
    setTimeout(() => setExportNotice(null), 3000);
  };

  // Filtered records for the records dashboard
  const filteredRecords = useMemo(() => {
    return commercialRecords.filter(rec => {
      const matchSearch = rec.clientName.toLowerCase().includes(recordsSearch.toLowerCase()) ||
                          (rec.briefSummary && rec.briefSummary.toLowerCase().includes(recordsSearch.toLowerCase()));
      const matchStatus = statusFilter === 'ALL' || rec.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [commercialRecords, recordsSearch, statusFilter]);

  // Filtered Rate Card for drawer search
  const filteredRateCard = useMemo(() => {
    return rateCard.filter(rc => {
      const matchesSearch = rc.item.toLowerCase().includes(drawerSearch.toLowerCase()) ||
                            rc.category.toLowerCase().includes(drawerSearch.toLowerCase()) ||
                            rc.description.toLowerCase().includes(drawerSearch.toLowerCase());
      const matchesCat = selectedCategory === 'ALL' || rc.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [rateCard, drawerSearch, selectedCategory]);

  const categories = useMemo(() => {
    return ['ALL', ...Array.from(new Set(rateCard.map(r => r.category)))];
  }, [rateCard]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white flex flex-col antialiased">
      {/* Top Navigation Bar */}
      <header className="border-b border-zinc-900 bg-zinc-950/85 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-md bg-gradient-to-tr from-amber-500 to-amber-300 text-zinc-950 flex items-center justify-center font-black text-sm tracking-tight shadow">
              S
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm tracking-tight text-white">ScopeCraft</span>
              <span className="hidden sm:inline-block text-[11px] text-amber-400/90 font-mono bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/40">
                Official Agency Rate Card (AED)
              </span>
            </div>

            {/* Screen View Toggle Switch */}
            <div className="ml-4 flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setActiveTab('studio')}
                className={`px-3 py-1 rounded-md transition font-medium flex items-center gap-1.5 ${
                  activeTab === 'studio'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Layers className="h-3.5 w-3.5 text-amber-400" />
                <span>Proposal Studio</span>
              </button>

              <button
                onClick={() => setActiveTab('records')}
                className={`px-3 py-1 rounded-md transition font-medium flex items-center gap-1.5 ${
                  activeTab === 'records'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Archive className="h-3.5 w-3.5 text-blue-400" />
                <span>Commercial Records</span>
                <span className="bg-zinc-700/80 text-zinc-200 text-[10px] font-mono px-1.5 py-0.2 rounded-full">
                  {commercialRecords.length}
                </span>
              </button>
            </div>
          </div>

          {/* Hidden File Input for Excel/CSV */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleRateCardUpload}
            accept=".xlsx,.xls,.csv"
            className="hidden"
          />

          <div className="flex items-center gap-2">
            {activeTab === 'studio' ? (
              <>
                <button
                  onClick={() => {
                    const saved = saveCurrentCommercialRecord('Draft');
                    if (saved) {
                      setExportNotice(`Saved proposal for "${clientName}" into records.`);
                      setTimeout(() => setExportNotice(null), 3000);
                    }
                  }}
                  className="hidden sm:flex text-xs text-zinc-300 hover:text-white px-2.5 py-1.5 rounded-md hover:bg-zinc-900 transition items-center gap-1.5 border border-zinc-800"
                  title="Bookmark and log this proposal without exporting"
                >
                  <Save className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Save Record</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-zinc-300 hover:text-white px-3 py-1.5 rounded-md hover:bg-zinc-900 transition flex items-center gap-1.5 border border-zinc-800 bg-zinc-950 shadow-sm"
                  title="Upload an .xlsx, .xls or .csv rate card"
                >
                  <Upload className="h-3.5 w-3.5 text-amber-400" />
                  <span className="hidden md:inline">Upload Rate Card</span>
                </button>

                <button
                  onClick={() => setIsRateDrawerOpen(true)}
                  className="text-xs text-zinc-300 hover:text-white px-3 py-1.5 rounded-md hover:bg-zinc-900 transition flex items-center gap-1.5 border border-zinc-800"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-400" />
                  <span className="hidden md:inline">Database</span>
                  <span className="text-[10px] text-zinc-500 font-mono">({rateCard.length})</span>
                </button>

                <button
                  onClick={() => exportToExcel()}
                  className="text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-3.5 py-1.5 rounded-md transition flex items-center gap-1.5 shadow active:scale-95"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5 text-zinc-950" />
                  <span>Export Excel</span>
                </button>
              </>
            ) : (
              <button
                onClick={exportPortfolioRollup}
                className="text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-3.5 py-1.5 rounded-md transition flex items-center gap-1.5 shadow active:scale-95"
              >
                <FileSpreadsheet className="h-3.5 w-3.5 text-zinc-950" />
                <span>Export Pipeline (.XLSX)</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Floating Status & Upload Toast */}
      {uploadStatus && (
        <div className={`fixed top-16 left-1/2 -translate-x-1/2 z-50 text-xs px-4 py-2.5 rounded-lg shadow-2xl flex items-center gap-2 border animate-in fade-in slide-in-from-top-2 ${
          uploadStatus.type === 'error'
            ? 'bg-rose-950 border-rose-700 text-rose-200'
            : 'bg-emerald-950 border-emerald-700 text-emerald-200'
        }`}>
          {uploadStatus.type === 'error' ? (
            <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          )}
          <span>{uploadStatus.message}</span>
        </div>
      )}

      {/* Floating Export Toast */}
      {exportNotice && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-emerald-950 border border-emerald-700 text-emerald-200 text-xs px-4 py-2 rounded-lg shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* VIEWPORT CONDITIONAL: STUDIO OR RECORDS SCREEN */}
      {activeTab === 'studio' ? (
        /* ================= SCREEN 1: COMMERCIAL PROPOSAL STUDIO ================= */
        <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* PANEL 1: CLIENT BRIEF & BENCHMARKS (5 COLS) */}
          <section className="lg:col-span-5 bg-zinc-900/60 border border-zinc-850 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-850">
              <div>
                <h2 className="text-sm font-semibold text-white">Commercial Brief & Benchmarks</h2>
                <p className="text-xs text-zinc-400 mt-0.5">Input the brief and anchor your Senior, Mid/Median, and Junior rates</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-semibold">Standard PM Fee</span>
                <span className="text-xs font-mono font-bold text-amber-400">+10% Added</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Agency Brief Presets</span>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {SAMPLE_BRIEFS.map((sb, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setBriefText(sb.text);
                      setClientName(sb.client);
                      setTimeline(sb.timeline);
                    }}
                    className="text-xs bg-zinc-950 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 px-2.5 py-1 rounded transition"
                  >
                    {sb.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Client & Timeline */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-zinc-400 block mb-1">Client Entity</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-zinc-700"
                  placeholder="Client Name"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-zinc-400 block mb-1">Scope Duration</label>
                <input
                  type="text"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-zinc-700"
                  placeholder="e.g. 8 Weeks"
                />
              </div>
            </div>

            {/* Scope Brief Narrative */}
            <div>
              <label className="text-[11px] font-medium text-zinc-400 block mb-1">Client Brief / RFP Requirements</label>
              <textarea
                rows={4}
                value={briefText}
                onChange={(e) => setBriefText(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-200 focus:outline-none focus:border-zinc-700 leading-relaxed resize-none"
                placeholder="Paste campaign or proposal requirements..."
              />
            </div>

            {/* 3 Benchmark Rate Selectors */}
            <div className="space-y-3 pt-1">
              <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block">
                Benchmark Rate Anchors
              </span>

              {/* Senior Rate Anchor */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-zinc-300 flex items-center gap-1.5 font-medium">
                    <span className="h-2 w-2 rounded-full bg-purple-400"></span>
                    Senior Benchmark Anchor
                  </span>
                  <span className="text-xs font-mono text-purple-300 font-bold">{symbol}{seniorRole.hourlyRate}/hr</span>
                </div>
                <select
                  value={seniorRoleId}
                  onChange={(e) => setSeniorRoleId(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-zinc-700 cursor-pointer"
                >
                  {rateCard.filter(r => r.seniority === 'Senior').map(item => (
                    <option key={item.id} value={item.id}>
                      {item.item} — {symbol}{item.hourlyRate}/hr ({item.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Mid / Median Rate Anchor */}
              <div className="bg-zinc-950/80 p-3 rounded-lg border border-zinc-850">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-zinc-200 flex items-center gap-1.5 font-medium">
                    <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                    Mid / Median Anchor
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setMidRoleId('AUTO_MEDIAN')}
                      className={`text-[10px] px-2 py-0.5 rounded border transition flex items-center gap-1 ${
                        midRoleId === 'AUTO_MEDIAN' 
                          ? 'bg-blue-950 text-blue-300 border-blue-700' 
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                      }`}
                    >
                      <Calculator className="h-2.5 w-2.5" />
                      Rate Card Median
                    </button>
                    <span className="text-xs font-mono text-blue-300 font-bold">{symbol}{midRole.hourlyRate}/hr</span>
                  </div>
                </div>
                <select
                  value={midRoleId}
                  onChange={(e) => setMidRoleId(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-zinc-700 cursor-pointer"
                >
                  <option value="AUTO_MEDIAN">
                    ★ Calculated Rate Card Median ({symbol}{rateCardMedian}/hr)
                  </option>
                  <optgroup label="Mid-Tier Services from Rate Card">
                    {rateCard.filter(r => r.seniority === 'Mid').map(item => (
                      <option key={item.id} value={item.id}>
                        {item.item} — {symbol}{item.hourlyRate}/hr
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Junior Rate Anchor */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-zinc-300 flex items-center gap-1.5 font-medium">
                    <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                    Junior Benchmark Anchor
                  </span>
                  <span className="text-xs font-mono text-emerald-300 font-bold">{symbol}{juniorRole.hourlyRate}/hr</span>
                </div>
                <select
                  value={juniorRoleId}
                  onChange={(e) => setJuniorRoleId(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-zinc-700 cursor-pointer"
                >
                  {rateCard.filter(r => r.seniority === 'Junior').map(item => (
                    <option key={item.id} value={item.id}>
                      {item.item} — {symbol}{item.hourlyRate}/hr ({item.category})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Trigger */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={generateScopeWithAI}
                disabled={isGenerating}
                className="w-full py-2.5 bg-gradient-to-r from-zinc-100 to-zinc-200 hover:from-white hover:to-zinc-100 text-zinc-950 rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-md transition active:scale-[0.99] disabled:opacity-50"
              >
                <Sparkles className={`h-4 w-4 ${isGenerating ? 'animate-spin text-amber-600' : 'text-zinc-950'}`} />
                <span>{isGenerating ? "Synthesizing Scope from Rate Card..." : "Run Off Scope into Commercial Submission"}</span>
              </button>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => {
                    const saved = saveCurrentCommercialRecord('Draft');
                    if (saved) {
                      setExportNotice(`Saved proposal for "${clientName}" into Commercial Records.`);
                      setTimeout(() => setExportNotice(null), 3000);
                    }
                  }}
                  className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 py-1"
                >
                  <Save className="h-3 w-3 text-zinc-400" />
                  <span>Save to Portfolio Records</span>
                </button>

                <button
                  onClick={() => setActiveTab('records')}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 py-1"
                >
                  <span>View All Submissions ({commercialRecords.length}) &rarr;</span>
                </button>
              </div>
            </div>
          </section>

          {/* PANEL 2: FINANCIAL METRICS & SCOPE BREAKDOWN (7 COLS) */}
          <section className="lg:col-span-7 space-y-4">
            
            {/* Executive Metrics Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-zinc-900/40 border border-zinc-850 p-3 rounded-xl">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold block">Total Price (Inc. 10% PM)</span>
                <span className="text-lg font-bold text-amber-400 tracking-tight mt-0.5 block font-mono">
                  {symbol}{Math.round(metrics.grandTotal).toLocaleString()}
                </span>
                <span className="text-[10px] text-zinc-500 block">Base: {symbol}{Math.round(metrics.baseSubtotal).toLocaleString()}</span>
              </div>

              <div className="bg-zinc-900/40 border border-zinc-850 p-3 rounded-xl">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold block">Total Billable Hours</span>
                <span className="text-lg font-bold text-white tracking-tight mt-0.5 block">
                  {metrics.totalHours} <span className="text-xs font-normal text-zinc-400">hrs</span>
                </span>
                <span className="text-[10px] text-zinc-500 block">10% PM: +{symbol}{Math.round(metrics.totalPmFee).toLocaleString()}</span>
              </div>

              <div className="bg-zinc-900/40 border border-zinc-850 p-3 rounded-xl">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold block">Blended Hourly Rate</span>
                <span className="text-lg font-bold text-zinc-200 tracking-tight mt-0.5 block font-mono">
                  {symbol}{metrics.blendedRate.toFixed(0)} <span className="text-xs font-normal text-zinc-500">/hr</span>
                </span>
                <span className="text-[10px] text-zinc-500 block">Median: {symbol}{rateCardMedian}/hr</span>
              </div>

              <div className="bg-zinc-900/40 border border-zinc-850 p-3 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold block">Resource Mix</span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold mt-0.5 font-mono">
                    <span className="text-purple-300">{metrics.seniorRatio.toFixed(0)}%</span>
                    <span className="text-zinc-600">/</span>
                    <span className="text-blue-300">{metrics.midRatio.toFixed(0)}%</span>
                    <span className="text-zinc-600">/</span>
                    <span className="text-emerald-300">{metrics.juniorRatio.toFixed(0)}%</span>
                  </div>
                </div>

                {/* Resource Ratio Bar */}
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-2 flex">
                  <div 
                    style={{ width: `${metrics.seniorRatio}%` }} 
                    className="bg-purple-400" 
                    title={`Senior: ${metrics.seniorHours} hrs (${metrics.seniorRatio.toFixed(0)}%)`}
                  />
                  <div 
                    style={{ width: `${metrics.midRatio}%` }} 
                    className="bg-blue-400" 
                    title={`Mid: ${metrics.midHours} hrs (${metrics.midRatio.toFixed(0)}%)`}
                  />
                  <div 
                    style={{ width: `${metrics.juniorRatio}%` }} 
                    className="bg-emerald-400" 
                    title={`Junior: ${metrics.juniorHours} hrs (${metrics.juniorRatio.toFixed(0)}%)`}
                  />
                </div>
              </div>
            </div>

            {/* Scope Table Card */}
            <div className="bg-zinc-900/60 border border-zinc-850 rounded-xl overflow-hidden shadow-sm">
              <div className="p-3 border-b border-zinc-850 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white">Commercial Scope of Work</span>
                  <span className="text-[11px] text-zinc-500">({scopeItems.length} Rate Card Services)</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsRateDrawerOpen(true)}
                    className="text-xs text-amber-300 hover:text-amber-200 px-2.5 py-1 rounded bg-amber-950/40 hover:bg-amber-900/40 border border-amber-800/50 transition flex items-center gap-1 font-medium"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add from Rate Card</span>
                  </button>
                </div>
              </div>

              {/* Scope Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-300">
                  <thead className="bg-zinc-950/60 text-zinc-500 text-[10px] uppercase tracking-wider border-b border-zinc-850">
                    <tr>
                      <th className="py-2.5 px-3">Item & Category</th>
                      <th className="py-2.5 px-2">Tier (Dynamic)</th>
                      <th className="py-2.5 px-2 text-right">Bound Rate</th>
                      <th className="py-2.5 px-3 text-center">Hours</th>
                      <th className="py-2.5 px-2 text-right">Base</th>
                      <th className="py-2.5 px-2 text-right">+10% PM</th>
                      <th className="py-2.5 px-3 text-right">Price (AED)</th>
                      <th className="py-2.5 px-2 text-center w-7"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-850/60">
                    {scopeItems.map((item) => {
                      const baseCost = (Number(item.hours) || 0) * (Number(item.hourlyRate) || 0);
                      const pmFee = Math.round(baseCost * 0.10);
                      const lineTotal = baseCost + pmFee;
                      const isUpdated = recentlyUpdatedId === item.id;
                      const tierBenchmark = getBenchmarkRateForTier(item.seniority);
                      const isOverridden = item.hourlyRate !== tierBenchmark;

                      return (
                        <tr 
                          key={item.id} 
                          className={`transition-colors duration-500 group ${
                            isUpdated 
                              ? 'bg-amber-950/40 ring-1 ring-amber-500/50' 
                              : 'hover:bg-zinc-850/30'
                          }`}
                        >
                          {/* Deliverable dropdown */}
                          <td className="py-2.5 px-3 max-w-[220px]">
                            <select
                              value={item.rateCardId}
                              onChange={(e) => updateItemDeliverable(item.id, e.target.value)}
                              className="w-full bg-zinc-950/90 border border-zinc-800/80 rounded px-1.5 py-1 text-xs text-white font-medium focus:outline-none focus:border-zinc-700 cursor-pointer truncate"
                            >
                              {rateCard.map(rc => (
                                <option key={rc.id} value={rc.id}>{rc.item}</option>
                              ))}
                            </select>
                            <span className="text-[10px] text-zinc-500 block mt-0.5 truncate">{item.category}</span>
                          </td>

                          {/* Seniority badge (auto-updates hourlyRate on change) */}
                          <td className="py-2.5 px-2">
                            <div className="flex items-center gap-1">
                              <select
                                value={item.seniority}
                                onChange={(e) => updateSeniority(item.id, e.target.value)}
                                title="Changing tier immediately switches hourly rate to that tier's benchmark rate"
                                className={`rounded px-2 py-1 text-[10px] font-semibold border focus:outline-none cursor-pointer transition shadow-sm ${
                                  item.seniority === 'Senior'
                                    ? 'bg-purple-950/80 text-purple-300 border-purple-800/80 hover:border-purple-600'
                                    : item.seniority === 'Mid'
                                    ? 'bg-blue-950/80 text-blue-300 border-blue-800/80 hover:border-blue-600'
                                    : 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80 hover:border-emerald-600'
                                }`}
                              >
                                <option value="Senior">Senior ({symbol}{seniorRole.hourlyRate})</option>
                                <option value="Mid">Mid ({symbol}{midRole.hourlyRate})</option>
                                <option value="Junior">Junior ({symbol}{juniorRole.hourlyRate})</option>
                              </select>
                            </div>
                          </td>

                          {/* Hourly Rate with Override/Sync option */}
                          <td className="py-2.5 px-2 text-right">
                            <div className="flex items-center justify-end gap-1">
                              {isOverridden && (
                                <button
                                  onClick={() => syncToTierBenchmark(item.id)}
                                  title={`Rate is manually set (${symbol}${item.hourlyRate}). Click to sync with ${item.seniority} benchmark (${symbol}${tierBenchmark})`}
                                  className="text-[9px] px-1 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-amber-300 font-mono"
                                >
                                  Sync
                                </button>
                              )}
                              <input
                                type="number"
                                value={item.hourlyRate}
                                onChange={(e) => updateCustomRate(item.id, e.target.value)}
                                title="Click to override rate manually, or change the Tier pill to snap to benchmark"
                                className={`w-14 text-right bg-transparent border-b border-dashed text-xs font-mono font-bold focus:outline-none focus:border-white ${
                                  isOverridden 
                                    ? 'text-amber-400 border-amber-600/70' 
                                    : item.seniority === 'Senior'
                                    ? 'text-purple-300 border-purple-800/60'
                                    : item.seniority === 'Mid'
                                    ? 'text-blue-300 border-blue-800/60'
                                    : 'text-emerald-300 border-emerald-800/60'
                                }`}
                              />
                            </div>
                          </td>

                          {/* Hours with controls */}
                          <td className="py-2.5 px-3 text-center">
                            <div className="inline-flex items-center gap-1 bg-zinc-950 border border-zinc-800 rounded px-1.5 py-0.5">
                              <button
                                onClick={() => updateHours(item.id, -2)}
                                className="text-zinc-500 hover:text-white px-1 text-xs"
                              >
                                -
                              </button>
                              <span className="w-8 text-center text-xs font-mono font-medium text-white">
                                {item.hours}
                              </span>
                              <button
                                onClick={() => updateHours(item.id, 2)}
                                className="text-zinc-500 hover:text-white px-1 text-xs"
                              >
                                +
                              </button>
                            </div>
                          </td>

                          {/* Base Subtotal */}
                          <td className="py-2.5 px-2 text-right font-mono text-xs text-zinc-400">
                            {baseCost.toLocaleString()}
                          </td>

                          {/* 10% PM fee */}
                          <td className="py-2.5 px-2 text-right font-mono text-xs text-amber-500/80">
                            +{pmFee.toLocaleString()}
                          </td>

                          {/* Price in AED */}
                          <td className="py-2.5 px-3 text-right font-mono font-bold text-white text-xs">
                            {lineTotal.toLocaleString()}
                          </td>

                          {/* Delete line */}
                          <td className="py-2.5 px-2 text-center">
                            <button
                              onClick={() => removeLineItem(item.id)}
                              className="text-zinc-600 hover:text-rose-400 transition opacity-0 group-hover:opacity-100 p-1"
                              title="Remove line"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Bottom Bar */}
              <div className="p-3 border-t border-zinc-850 bg-zinc-950/60 flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                  Pre-configured with standard 10% Project Management calculation on every item.
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => saveCurrentCommercialRecord('Draft')}
                    className="text-xs text-zinc-300 hover:text-white px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 transition"
                  >
                    Save Draft
                  </button>
                  <button
                    onClick={() => exportToExcel()}
                    className="text-xs bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-3.5 py-1.5 rounded transition flex items-center gap-1.5 shadow"
                  >
                    <Download className="h-3.5 w-3.5 text-zinc-950" />
                    <span>Export Multi-Sheet .XLSX</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        /* ================= SCREEN 2: ALL COMMERCIAL RECORDS & TOTAL REVENUE ROLLUP ================= */
        <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex-1 space-y-6">
          
          {/* Top Banner & Quick Return */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-850">
            <div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('studio')}
                  className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded"
                >
                  <ArrowLeft className="h-3 w-3" />
                  <span>Back to Studio</span>
                </button>
                <h1 className="text-lg font-bold text-white tracking-tight">Commercial Submissions Registry</h1>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Portfolio history of all generated commercial scopes, total billings, blended rates, and status.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={exportPortfolioRollup}
                className="text-xs bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-3.5 py-1.5 rounded transition flex items-center gap-1.5 shadow"
              >
                <FileSpreadsheet className="h-3.5 w-3.5 text-zinc-950" />
                <span>Download Pipeline Summary (.XLSX)</span>
              </button>
            </div>
          </div>

          {/* Cumulative Pipeline Financial KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Grand Total Value */}
            <div className="bg-gradient-to-br from-amber-950/40 via-zinc-900/60 to-zinc-900 border border-amber-900/30 p-4 rounded-xl relative overflow-hidden">
              <div className="flex items-center justify-between text-zinc-400 mb-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">Total Commercial Pipeline Value</span>
                <DollarSign className="h-4 w-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-400 font-mono tracking-tight mt-1">
                {symbol}{Math.round(portfolioStats.totalCommercialDollarValue).toLocaleString()}
              </div>
              <div className="text-[11px] text-zinc-400 mt-1.5 flex items-center justify-between">
                <span>Base: {symbol}{Math.round(portfolioStats.totalBaseValue).toLocaleString()}</span>
                <span className="text-amber-500 font-mono">+10% PM: {symbol}{Math.round(portfolioStats.totalPmValue).toLocaleString()}</span>
              </div>
            </div>

            {/* Total Billable Hours */}
            <div className="bg-zinc-900/60 border border-zinc-850 p-4 rounded-xl">
              <div className="flex items-center justify-between text-zinc-400 mb-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">Total Billable Hours</span>
                <Clock className="h-4 w-4 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white tracking-tight mt-1">
                {portfolioStats.totalBillableHours.toLocaleString()} <span className="text-sm font-normal text-zinc-400">hours</span>
              </div>
              <div className="text-[11px] text-zinc-400 mt-1.5">
                Across {portfolioStats.totalCount} commercial submissions
              </div>
            </div>

            {/* Overall Blended Rate */}
            <div className="bg-zinc-900/60 border border-zinc-850 p-4 rounded-xl">
              <div className="flex items-center justify-between text-zinc-400 mb-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">Portfolio Blended Rate</span>
                <TrendingUp className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-zinc-100 font-mono tracking-tight mt-1">
                {symbol}{portfolioStats.overallBlendedRate.toFixed(0)} <span className="text-xs font-normal text-zinc-500">/hr</span>
              </div>
              <div className="text-[11px] text-zinc-400 mt-1.5">
                Agency median baseline: {symbol}{rateCardMedian}/hr
              </div>
            </div>

            {/* Status Breakdown */}
            <div className="bg-zinc-900/60 border border-zinc-850 p-4 rounded-xl flex flex-col justify-between">
              <div className="flex items-center justify-between text-zinc-400 mb-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300">Proposal Stages</span>
                <BarChart3 className="h-4 w-4 text-purple-400" />
              </div>
              <div className="grid grid-cols-3 gap-1.5 pt-1 text-center font-mono">
                <div className="bg-emerald-950/40 border border-emerald-900/40 p-1 rounded">
                  <span className="text-[10px] text-emerald-400 block font-sans">Won</span>
                  <span className="text-xs font-bold text-emerald-300">{portfolioStats.countApproved}</span>
                </div>
                <div className="bg-blue-950/40 border border-blue-900/40 p-1 rounded">
                  <span className="text-[10px] text-blue-400 block font-sans">Presented</span>
                  <span className="text-xs font-bold text-blue-300">{portfolioStats.countPresented}</span>
                </div>
                <div className="bg-zinc-800/50 border border-zinc-700/50 p-1 rounded">
                  <span className="text-[10px] text-zinc-400 block font-sans">Review</span>
                  <span className="text-xs font-bold text-zinc-300">{portfolioStats.countReview}</span>
                </div>
              </div>
              <div className="text-[10px] text-zinc-500 mt-2 text-right">
                {portfolioStats.countDraft} drafts in progress
              </div>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="bg-zinc-900/50 border border-zinc-850 p-3 rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="h-3.5 w-3.5 absolute left-3 top-3 text-zinc-500" />
              <input
                type="text"
                placeholder="Search by client name or proposal scope..."
                value={recordsSearch}
                onChange={(e) => setRecordsSearch(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-zinc-700"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] text-zinc-500">Filter Stage:</span>
              {['ALL', 'Approved', 'Presented', 'Under Review', 'Draft'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`text-xs px-2.5 py-1 rounded transition ${
                    statusFilter === status
                      ? 'bg-zinc-100 text-zinc-950 font-bold'
                      : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Records Table / List */}
          <div className="bg-zinc-900/60 border border-zinc-850 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="bg-zinc-950/70 text-zinc-500 text-[10px] uppercase tracking-wider border-b border-zinc-850">
                  <tr>
                    <th className="py-3 px-4">Client Organization</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-center">Duration</th>
                    <th className="py-3 px-3 text-right">Hours</th>
                    <th className="py-3 px-3 text-right">Blended Rate</th>
                    <th className="py-3 px-4 text-right">Total Price (Inc. 10% PM)</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850/60">
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-xs text-zinc-500">
                        No commercial submissions match the search query.
                      </td>
                    </tr>
                  ) : (
                    filteredRecords.map((rec) => {
                      const formattedDate = new Date(rec.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      });

                      return (
                        <tr key={rec.id} className="hover:bg-zinc-850/30 transition group">
                          {/* Client & brief preview */}
                          <td className="py-3.5 px-4 max-w-[240px]">
                            <div className="font-bold text-white text-xs">{rec.clientName}</div>
                            {rec.briefSummary && (
                              <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                                {rec.briefSummary}
                              </p>
                            )}
                          </td>

                          {/* Date */}
                          <td className="py-3.5 px-3 text-zinc-400 font-mono text-[11px] whitespace-nowrap">
                            {formattedDate}
                          </td>

                          {/* Status Stage with dropdown */}
                          <td className="py-3.5 px-3">
                            <select
                              value={rec.status}
                              onChange={(e) => updateRecordStatus(rec.id, e.target.value)}
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded border focus:outline-none cursor-pointer ${
                                rec.status === 'Approved'
                                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                                  : rec.status === 'Presented'
                                  ? 'bg-blue-950/80 text-blue-300 border-blue-800'
                                  : rec.status === 'Under Review'
                                  ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                                  : 'bg-zinc-900 text-zinc-400 border-zinc-700'
                              }`}
                            >
                              <option value="Approved">Approved</option>
                              <option value="Presented">Presented</option>
                              <option value="Under Review">Under Review</option>
                              <option value="Draft">Draft</option>
                            </select>
                          </td>

                          {/* Timeline */}
                          <td className="py-3.5 px-3 text-center text-zinc-400 text-xs">
                            {rec.timeline}
                          </td>

                          {/* Total Hours */}
                          <td className="py-3.5 px-3 text-right font-mono text-zinc-300">
                            {rec.totalHours} hrs
                          </td>

                          {/* Blended Rate */}
                          <td className="py-3.5 px-3 text-right font-mono text-zinc-300">
                            {symbol}{Math.round(rec.blendedRate)}/hr
                          </td>

                          {/* Total Commercial Price */}
                          <td className="py-3.5 px-4 text-right">
                            <span className="font-bold font-mono text-amber-400 text-sm">
                              {symbol}{Math.round(rec.grandTotal).toLocaleString()}
                            </span>
                            <span className="block text-[10px] text-zinc-500 font-mono">
                              Base: {symbol}{Math.round(rec.baseSubtotal).toLocaleString()}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-1.5">
                              {/* Restore to Editor */}
                              <button
                                onClick={() => loadCommercialRecord(rec)}
                                className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-2 py-1 rounded transition flex items-center gap-1 border border-zinc-700"
                                title="Open this commercial in the proposal builder"
                              >
                                <FolderOpen className="h-3 w-3 text-amber-400" />
                                <span>Load</span>
                              </button>

                              {/* Direct Excel Re-Export */}
                              {Array.isArray(rec.itemsSnapshot) && rec.itemsSnapshot.length > 0 && (
                                <button
                                  onClick={() => exportToExcel(rec.itemsSnapshot, rec.clientName, rec.timeline)}
                                  className="text-xs bg-zinc-800 hover:bg-emerald-900/50 hover:text-emerald-300 text-zinc-300 p-1.5 rounded transition border border-zinc-700"
                                  title="Export formatted Excel file"
                                >
                                  <FileSpreadsheet className="h-3.5 w-3.5" />
                                </button>
                              )}

                              {/* Delete Record */}
                              <button
                                onClick={() => deleteRecord(rec.id)}
                                className="text-zinc-600 hover:text-rose-400 p-1.5 rounded hover:bg-zinc-800/80 transition"
                                title="Delete record"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Bottom Rollup Bar */}
            <div className="p-4 border-t border-zinc-850 bg-zinc-950/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-zinc-400">
                Displaying <span className="text-white font-semibold">{filteredRecords.length}</span> of{' '}
                <span className="text-white font-semibold">{commercialRecords.length}</span> recorded commercial submissions.
              </div>

              <div className="flex items-center gap-4 font-mono">
                <div>
                  <span className="text-zinc-500 mr-1">Visible Sum:</span>
                  <strong className="text-amber-400 font-bold">
                    {symbol}
                    {Math.round(
                      filteredRecords.reduce((acc, curr) => acc + (Number(curr.grandTotal) || 0), 0)
                    ).toLocaleString()}
                  </strong>
                </div>

                <button
                  onClick={() => setActiveTab('studio')}
                  className="bg-zinc-100 hover:bg-white text-zinc-950 font-bold px-3 py-1.5 rounded text-xs transition"
                >
                  Create New Commercial &rarr;
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* --- SLIDE-OVER DRAWER: MASTER BACKSTAGE RATE CARD --- */}
      {isRateDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            onClick={() => setIsRateDrawerOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          />

          <div className="relative w-full max-w-2xl bg-zinc-950 border-l border-zinc-800 p-6 shadow-2xl flex flex-col justify-between z-10 overflow-hidden">
            <div className="flex flex-col h-full overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-850">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-amber-400" />
                    Agency Rate Card Database
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Official UAE Agency Services, Baseline Hours, Rates & 10% PM fee
                  </p>
                </div>
                <button 
                  onClick={() => setIsRateDrawerOpen(false)}
                  className="text-zinc-400 hover:text-white p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Upload & Backup Toolbar */}
              <div className="mt-3 p-3 bg-zinc-900 border border-zinc-850 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-3 py-1.5 rounded transition flex items-center gap-1.5 shadow"
                  >
                    <FileUp className="h-3.5 w-3.5 text-zinc-950" />
                    <span>Import New Card (.xlsx / .csv)</span>
                  </button>

                  <button
                    onClick={downloadRateCardTemplate}
                    className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2.5 py-1.5 rounded transition flex items-center gap-1 border border-zinc-700"
                    title="Download reference template spreadsheet"
                  >
                    <Download className="h-3 w-3 text-zinc-400" />
                    <span>Get Template</span>
                  </button>
                </div>

                <button
                  onClick={resetToOfficialRateCard}
                  className="text-xs text-zinc-400 hover:text-zinc-200 px-2 py-1 rounded hover:bg-zinc-800 transition flex items-center gap-1 self-start sm:self-auto"
                  title="Reset back to standard preset rate card"
                >
                  <RefreshCw className="h-3 w-3 text-zinc-400" />
                  <span>Reset Default</span>
                </button>
              </div>

              {/* Median & Summary Banner */}
              <div className="mt-3 p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-zinc-200">Catalog Size: {rateCard.length} Services</span>
                  <span className="text-[11px] text-zinc-400 block">Baseline currency: United Arab Emirates Dirham (AED)</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Catalog Median Rate</span>
                  <span className="text-base font-bold font-mono text-amber-400">{symbol}{rateCardMedian}/hr</span>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-12 gap-2">
                <div className="sm:col-span-7 relative">
                  <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search service, keywords..."
                    value={drawerSearch}
                    onChange={(e) => setDrawerSearch(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-zinc-700"
                  />
                </div>
                <div className="sm:col-span-5">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none cursor-pointer"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Master Rate Card Items List */}
              <div className="mt-3 flex-1 overflow-y-auto space-y-2 pr-1">
                {filteredRateCard.map((item) => {
                  const base = item.hours * item.hourlyRate;
                  const pm = Math.round(base * 0.10);
                  const total = base + pm;

                  return (
                    <div 
                      key={item.id}
                      className="p-3 bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-850 rounded-lg flex flex-col gap-2 transition"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs text-white">{item.item}</span>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                              item.seniority === 'Senior' 
                                ? 'bg-purple-950 text-purple-300 border border-purple-800/40' 
                                : item.seniority === 'Mid' 
                                ? 'bg-blue-950 text-blue-300 border border-blue-800/40' 
                                : 'bg-emerald-950 text-emerald-300 border border-emerald-800/40'
                            }`}>
                              {item.seniority}
                            </span>
                          </div>
                          <span className="text-[10px] text-zinc-500 block mt-0.5">{item.category}</span>
                        </div>

                        <button
                          onClick={() => {
                            addLineItemFromRateCard(item);
                            setIsRateDrawerOpen(false);
                          }}
                          className="text-[11px] bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-2 py-1 rounded transition flex items-center gap-1 shrink-0 font-medium"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Insert Line</span>
                        </button>
                      </div>

                      <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed whitespace-pre-line">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-zinc-850/80 text-[11px] font-mono">
                        <div className="flex items-center gap-3 text-zinc-400">
                          <span>Hours: <strong className="text-zinc-200">{item.hours} hrs</strong></span>
                          <span>Rate: <strong className="text-zinc-200">{symbol}{item.hourlyRate}/hr</strong></span>
                        </div>
                        <div className="text-right">
                          <span className="text-zinc-500 text-[10px] mr-1">Price (+10% PM):</span>
                          <span className="font-bold text-amber-400">{symbol}{total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Drawer Bar */}
              <div className="pt-3 border-t border-zinc-850 mt-2">
                <button
                  onClick={() => setIsRateDrawerOpen(false)}
                  className="w-full py-2 bg-zinc-100 hover:bg-white text-zinc-950 rounded text-xs font-semibold transition"
                >
                  Return to Proposal Builder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Minimal Footer */}
      <footer className="border-t border-zinc-900 py-3 text-center text-[11px] text-zinc-500">
        ScopeCraft Commercial Studio &bull; Direct Agency Rate Card &bull; Automated SheetJS .XLSX Export
      </footer>
    </div>
  );
}