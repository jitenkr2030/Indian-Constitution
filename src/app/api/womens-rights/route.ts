import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      rightsType,
      incidentType,
      victimInfo,
      perpetratorInfo,
      location,
      urgency = 'normal',
      language = 'en',
      evidence,
      legalAction = false
    } = body

    // Generate women's rights protection strategy
    const rightsStrategy = generateRightsStrategy({
      rightsType,
      incidentType,
      victimInfo,
      perpetratorInfo,
      location,
      urgency,
      language,
      evidence,
      legalAction
    })

    // Get women's rights resources
    const rightsResources = getWomenRightsResources(rightsType, location)

    // Get legal options and remedies
    const legalOptions = getLegalOptions(rightsType, incidentType, urgency)

    // Create action plan
    const actionPlan = createActionPlan(rightsType, urgency, location)

    return NextResponse.json({
      success: true,
      data: {
        rightsStrategy,
        rightsResources,
        legalOptions,
        actionPlan,
        timeline: getRightsTimeline(rightsType, urgency),
        checklists: getRightsChecklists(rightsType),
        templates: getRightsTemplates(language),
        contacts: getWomenRightsContacts(location),
        statistics: getWomenRightsStatistics(),
        constitutionalBasis: getWomenRightsConstitutionalBasis()
      }
    })

  } catch (error) {
    console.error('Women Rights Empowerment Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to process women rights request'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const location = searchParams.get('location')
    const language = searchParams.get('lang') || 'en'

    // Get women's rights types
    const rightsTypes = getWomenRightsTypes()
    const filteredTypes = type ? rightsTypes.filter(t => t.id === type) : rightsTypes
    
    // Get women's rights statistics
    const statistics = getWomenRightsStatistics()

    // Get recent cases
    const recentCases = getRecentCases(language)

    // Get location-specific resources
    const locationResources = location ? getLocationResources(location) : null

    return NextResponse.json({
      success: true,
      data: {
        rightsTypes: filteredTypes,
        statistics,
        recentCases,
        locationResources,
        constitutionalBasis: getWomenRightsConstitutionalBasis(),
        supportOrganizations: getSupportOrganizations(),
        emergencyContacts: getEmergencyContacts()
      }
    })

  } catch (error) {
    console.error('Women Rights Directory Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch women rights resources'
    }, { status: 500 })
  }
}

// Helper functions
function generateRightsStrategy(data: any) {
  const { rightsType, incidentType, victimInfo, perpetratorInfo, location, urgency, language, evidence, legalAction } = data
  
  const strategies = {
    domestic_violence: {
      immediate: [
        "Ensure immediate safety of victim and children",
        "Contact local police or women helpline (1091)",
        "Document injuries and evidence",
        "Seek medical attention if needed",
        "Apply for protection order if necessary"
      ],
      legal: [
        "File FIR under Section 498A IPC",
        "Apply for protection order under Domestic Violence Act",
        "Seek legal aid from women's commissions",
        "Consider filing for divorce if needed"
      ],
      constitutional: [
        "Article 14: Right to equality",
        "Article 21: Right to life and personal liberty",
        "Article 15: Prohibition of discrimination",
        "Domestic Violence Act, 2005 provisions"
      ],
      timeline: {
        "immediate": "0-24 hours",
        "protection_order": "3-7 days",
        "legal_proceedings": "30-90 days",
        "counseling": "ongoing"
      }
    },
    sexual_harassment: {
      immediate: [
        "Ensure victim's safety and privacy",
        "Report to Internal Complaints Committee (if workplace)",
        "File police complaint under Section 354 IPC",
        "Seek medical examination and counseling",
        "Preserve all digital and physical evidence"
      ],
      legal: [
        "File complaint under Sexual Harassment of Women at Workplace Act",
        "File FIR under Section 354 IPC",
        "Seek compensation for damages",
        "Request workplace safety measures"
      ],
      constitutional: [
        "Article 14: Right to equality",
        "Article 19(1)(a): Right to freedom of speech",
        "Article 21: Right to life with dignity",
        "Sexual Harassment of Women at Workplace Act provisions"
      ],
      timeline: {
        "complaint": "1-3 days",
        "investigation": "7-14 days",
        "legal_proceedings": "30-60 days",
        "counseling": "ongoing"
      }
    },
    workplace_discrimination: {
      immediate: [
        "Document discriminatory incidents",
        "Report to HR or Internal Complaints Committee",
        "File complaint with women's commission",
        "Seek legal advice on discrimination",
        "Preserve all evidence"
      ],
      legal: [
        "File complaint under Equal Remuneration Act",
        "File case under Sexual Harassment Act",
        "Seek intervention from labor department",
        "Request workplace policy changes"
      ],
      constitutional: [
        "Article 14: Right to equality",
        "Article 16: Equality of opportunity",
        "Article 39: Equal pay for equal work",
        "Equal Remuneration Act provisions"
      ],
      timeline: {
        "complaint": "3-7 days",
        "investigation": "14-30 days",
        "legal_proceedings": "60-120 days",
        "resolution": "30-60 days"
      }
    },
    property_rights: {
      immediate: [
        "Document property ownership documents",
        "Seek legal advice on property rights",
        "File complaint if rights violated",
        "Apply for injunction if needed",
        "Preserve all evidence"
      ],
      legal: [
        "File case under Hindu Succession Act",
        "Seek intervention from civil court",
        "Apply for maintenance if applicable",
        "Request partition of property"
      ],
      constitutional: [
        "Article 14: Right to equality",
        "Article 300A: Right to property",
        "Hindu Succession Act provisions",
        "Protection of Women from Domestic Violence Act"
      ],
      timeline: {
        "documentation": "7-14 days",
        "legal_proceedings": "60-180 days",
        "resolution": "90-180 days",
        "enforcement": "30-60 days"
      }
    },
    education_rights: {
      immediate: [
        "Document educational discrimination",
        "Report to school/university authorities",
        "File complaint with education department",
        "Seek legal advice on education rights",
        "Preserve evidence of discrimination"
      ],
      legal: [
        "File case under Right to Education Act",
        "Seek intervention from education department",
        "Request compliance with RTE Act",
        "Apply for compensation for damages"
      ],
      constitutional: [
        "Article 14: Right to equality",
        "Article 21A: Right to education",
        "Article 15: Prohibition of discrimination",
        "Right to Education Act provisions"
      ],
      timeline: {
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "legal_proceedings": "60-120 days",
        "resolution": "30-60 days"
      }
    },
    reproductive_rights: {
      immediate: [
        "Ensure access to reproductive healthcare",
        "Document any medical negligence",
        "Report to medical council if needed",
        "Seek legal advice on reproductive rights",
        "Preserve medical records"
      ],
      legal: [
        "File complaint under MTP Act if applicable",
        "Seek intervention from medical council",
        "File case for medical negligence",
        "Request compensation for damages"
      ],
      constitutional: [
        "Article 14: Right to equality",
        "Article 21: Right to health",
        "Medical Termination of Pregnancy Act provisions",
        "Right to privacy and bodily autonomy"
      ],
      timeline: {
        "complaint": "3-7 days",
        "investigation": "14-30 days",
        "legal_proceedings": "60-120 days",
        "resolution": "30-60 days"
      }
    }
  }

  return strategies[rightsType as keyof typeof strategies] || strategies.domestic_violence
}

function getWomenRightsResources(rightsType: string, location: string) {
  const resources = {
    domestic_violence: {
      helplines: [
        { name: "Women Helpline", phone: "1091", type: "emergency", 24/7: true },
        { name: "National Commission for Women", phone: "011-23372244", type: "commission" },
        { name: "State Women Commission", phone: "1800-123-4567", type: "state" }
      ],
      organizations: [
        { name: "Sakhi", phone: "011-24637431", type: "ngo" },
        { name: "Jagori", phone: "011-26692300", type: "ngo" },
        { name: "ActionAid India", phone: "011-46538166", type: "ngo" }
      ],
      legal: [
        { name: "Women Lawyers Association", phone: "011-23234567", type: "legal" },
        { name: "Human Rights Law Network", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      shelters: [
        { name: "Sakhi Shelter", phone: "011-24637431", type: "shelter" },
        { name: "Jagori Shelter", phone: "011-26692300", type: "shelter" },
        { name: "Government Shelter Homes", phone: "1091", type: "government" }
      ]
    },
    sexual_harassment: {
      helplines: [
        { name: "Women Helpline", phone: "1091", type: "emergency", 24/7: true },
        { name: "NCW Sexual Harassment Cell", phone: "011-23372244", type: "commission" },
        { name: "Workplace Harassment Helpline", phone: "1800-123-4567", type: "workplace" }
      ],
      organizations: [
        { name: "Sakhi", phone: "011-24637431", type: "ngo" },
        { name: "Jagori", phone: "011-26692300", type: "ngo" },
        { name: "Vimochana", phone: "011-26687249", type: "ngo" }
      ],
      legal: [
        { name: "Women Lawyers Association", phone: "011-23234567", type: "legal" },
        { name: "Sexual Harassment Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      counseling: [
        { name: "Sakhi Counseling", phone: "011-24637431", type: "counseling" },
        { name: "Jagori Counseling", phone: "011-26692300", type: "counseling" },
        { name: "Mental Health Helpline", phone: "1800-599-6669", type: "health" }
      ]
    },
    workplace_discrimination: {
      helplines: [
        { name: "Women Helpline", phone: "1091", type: "emergency", 24/7: true },
        { name: "Workplace Rights Helpline", phone: "1800-123-4567", type: "workplace" },
        { name: "Labor Department", phone: "011-2338225", type: "government" }
      ],
      organizations: [
        { name: "SEWA", phone: "011-23234567", type: "union" },
        { name: "Working Women's Forum", phone: "011-26692300", type: "ngo" },
        { name: "FICCI FLO", phone: "011-23372244", type: "business" }
      ],
      legal: [
        { name: "Women Lawyers Association", phone: "011-23234567", type: "legal" },
        { name: "Labor Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      unions: [
        { name: "SEWA", phone: "011-23234567", type: "union" },
        { name: "AIFTUC", phone: "011-2338225", type: "union" },
        { name: "CITU", phone: "011-2338225", type: "union" }
      ]
    },
    property_rights: {
      helplines: [
        { name: "Women Helpline", phone: "1091", type: "emergency", 24/7: true },
        { name: "Property Rights Helpline", phone: "1800-123-4567", type: "property" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      organizations: [
        { name: "HRLN", phone: "011-2338225", type: "ngo" },
        { name: "Sajag", phone: "011-26692300", type: "ngo" },
        { name: "ActionAid", phone: "011-46538166", type: "ngo" }
      ],
      legal: [
        { name: "Property Rights Lawyers", phone: "011-23234567", type: "legal" },
        { name: "Family Court Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      counseling: [
        { name: "Family Counseling Center", phone: "011-2338225", type: "counseling" },
        { name: "Legal Aid Counseling", phone: "1800-11-1320", type: "counseling" },
        { name: "Property Counseling", phone: "011-2338225", type: "counseling" }
      ]
    },
    education_rights: {
      helplines: [
        { name: "Women Helpline", phone: "1091", type: "emergency", 24/7: true },
        { name: "Education Rights Helpline", phone: "1800-123-4567", type: "education" },
        { name: "RTE Helpline", phone: "1800-123-4567", type: "government" }
      ],
      organizations: [
        { name: "Pratham", phone: "011-2338225", type: "ngo" },
        { name: "Educate Girls", phone: "011-2338225", type: "ngo" },
        { name: "Room to Read", phone: "011-2338225", type: "ngo" }
      ],
      legal: [
        { name: "Education Rights Lawyers", phone: "011-23234567", type: "legal" },
        { name: "Child Rights Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      educational: [
        { name: "NCERT", phone: "011-26151383", type: "government" },
        { name: "Education Department", phone: "011-2338225", type: "government" },
        { name: "School Education", phone: "011-2338225", type: "government" }
      ]
    },
    reproductive_rights: {
      helplines: [
        { name: "Women Helpline", phone: "1091", type: "emergency", 24/7: true },
        { name: "Reproductive Health Helpline", phone: "1800-123-4567", type: "health" },
        { name: "MTP Helpline", phone: "1800-123-4567", type: "medical" }
      ],
      organizations: [
        { name: "IPAS", phone: "011-2338225", type: "ngo" },
        { name: "Parivar Seva Sansthan", phone: "011-2338225", type: "ngo" },
        { name: "FPA India", phone: "011-2338225", type: "ngo" }
      ],
      medical: [
        { name: "Medical Council of India", phone: "011-2323225", type: "medical" },
        { name: "Women's Health Organizations", phone: "011-2338225", type: "health" },
        { name: "Reproductive Health Services", phone: "011-2338225", type: "medical" }
      ],
      counseling: [
        { name: "Reproductive Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Women's Health Counseling", phone: "011-2338225", type: "health" },
        { name: "Mental Health Helpline", phone: "1800-599-6669", type: "health" }
      ]
    }
  }

  return resources[rightsType as keyof typeof resources] || resources.domestic_violence
}

function getLegalOptions(rightsType: string, incidentType: string, urgency: string) {
  const options = {
    domestic_violence: {
      civil: {
        description: "File civil suit for protection and compensation",
        timeline: "30-60 days",
        success: 75,
        cost: "Medium",
        effort: "Medium"
      },
      criminal: {
        description: "File criminal case under Section 498A IPC",
        timeline: "60-120 days",
        success: 80,
        cost: "Low",
        effort: "High"
      },
      mediation: {
        description: "Mediation through family court or counseling",
        timeline: "15-30 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      },
      ngo: {
        description: "Seek help from women's NGOs for support",
        timeline: "7-14 days",
        success: 70,
        cost: "Free",
        effort: "Low"
      }
    },
    sexual_harassment: {
      workplace: {
        description: "File workplace complaint under Sexual Harassment Act",
        timeline: "30-60 days",
        success: 85,
        cost: "Low",
        effort: "Medium"
      },
      criminal: {
        description: "File FIR under Section 354 IPC",
        timeline: "60-120 days",
        success: 70,
        cost: "Low",
        effort: "High"
      },
      civil: {
        description: "File civil suit for damages and compensation",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      ngo: {
        description: "Seek help from women's NGOs for support",
        timeline: "7-14 days",
        success: 75,
        cost: "Free",
        effort: "Low"
      }
    },
    workplace_discrimination: {
      labor: {
        description: "File complaint under labor laws",
        timeline: "30-60 days",
        success: 80,
        cost: "Low",
        effort: "Medium"
      },
      civil: {
        description: "File civil suit for discrimination damages",
        timeline: "60-120 days",
        success: 70,
        cost: "Medium",
        effort: "Medium"
      },
      administrative: {
        description: "File complaint with administrative authorities",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      },
      union: {
        description: "Seek help from women's labor unions",
        timeline: "14-30 days",
        success: 75,
        cost: "Free",
        effort: "Low"
      }
    },
    property_rights: {
      civil: {
        description: "File civil suit for property rights",
        timeline: "90-180 days",
        success: 70,
        cost: "High",
        effort: "High"
      },
      family_court: {
        description: "File case in family court for property division",
        timeline: "60-120 days",
        success: 75,
        cost: "Medium",
        effort: "Medium"
      },
      revenue: {
        description: "File appeal with revenue authorities",
        timeline: "60-120 days",
        success: 60,
        cost: "Low",
        effort: "Medium"
      },
      ngo: {
        description: "Seek help from women's legal NGOs",
        timeline: "14-30 days",
        success: 65,
        cost: "Free",
        effort: "Low"
      }
    },
    education_rights: {
      administrative: {
        description: "File complaint with education authorities",
        timeline: "30-60 days",
        success: 75,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for education rights violation",
        timeline: "60-120 days",
        success: 70,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 21A",
        timeline: "90-180 days",
        success: 80,
        cost: "High",
        effort: "High"
      },
      ngo: {
        description: "Seek help from education NGOs",
        timeline: "7-14 days",
        success: 70,
        cost: "Free",
        effort: "Low"
      }
    },
    reproductive_rights: {
      medical_council: {
        description: "File complaint with Medical Council",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Medium"
      },
      civil: {
        description: "File civil suit for medical negligence",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      criminal: {
        description: "File criminal case for medical negligence",
        timeline: "60-120 days",
        success: 70,
        cost: "Low",
        effort: "High"
      },
      ngo: {
        description: "Seek help from women's health NGOs",
        timeline: "7-14 days",
        success: 75,
        cost: "Free",
        effort: "Low"
      }
    }
  }

  return options[rightsType as keyof typeof options] || options.domestic_violence
}

function createActionPlan(rightsType: string, urgency: string, location: string) {
  const plans = {
    domestic_violence: {
      immediate: [
        "Ensure immediate safety and security",
        "Contact women's helpline (1091)",
        "Document all evidence and injuries",
        "Seek medical attention if needed",
        "Apply for protection order"
      ],
      short: [
        "File police complaint under Section 498A IPC",
        "Apply for protection order from court",
        "Seek temporary shelter if needed",
        "Start legal proceedings"
      ],
      long: [
        "Continue counseling and support",
        "Maintain safety measures",
        "Follow up on legal proceedings",
        "Rebuild life independently"
      ]
    },
    sexual_harassment: {
      immediate: [
        "Ensure victim's safety and privacy",
        "Report to appropriate authorities",
        "Preserve all evidence",
        "Seek medical attention if needed",
        "Provide emotional support"
      ],
      short: [
        "File complaint under Sexual Harassment Act",
        "File FIR under Section 354 IPC",
        "Seek workplace policy changes",
        "Start legal proceedings"
      ],
      long: [
        "Continue counseling and therapy",
        "Monitor workplace compliance",
        "Advocate for policy changes",
        "Support other victims"
      ]
    },
    workplace_discrimination: {
      immediate: [
        "Document discriminatory incidents",
        "Report to HR or authorities",
        "Seek legal advice",
        "Preserve evidence",
        "Ensure safety"
      ],
      short: [
        "File formal complaint under relevant laws",
        "Seek workplace policy changes",
        "Request compensation for damages",
        "Monitor compliance"
      ],
      long: [
        "Monitor workplace practices",
        "Advocate for policy changes",
        "Support other affected women",
        "Promote workplace equality"
      ]
    },
    property_rights: {
      immediate: [
        "Document property ownership",
        "Secure property documents",
        "Seek legal advice",
        "File complaint if rights violated",
        "Ensure safety"
      ],
      short: [
        "File case under relevant property laws",
        "Seek injunction if needed",
        "Request partition of property",
        "Start legal proceedings"
      ],
      long: [
        "Monitor property compliance",
        "Ensure equal inheritance rights",
        "Advocate for policy changes",
        "Support other affected women"
      ]
    },
    education_rights: {
      immediate: [
        "Document educational discrimination",
        "Report to educational authorities",
        "Seek legal advice",
        "Preserve evidence",
        "Ensure continued education"
      ],
      short: [
        "File complaint under RTE Act",
        "Seek intervention from education department",
        "Request compliance with educational laws",
        "Monitor implementation"
      ],
      long: [
        "Monitor educational compliance",
        "Advocate for policy changes",
        "Support other affected girls/women",
        "Promote educational equality"
      ]
    },
    reproductive_rights: {
      immediate: [
        "Ensure access to healthcare",
        "Document medical negligence",
        "Seek legal advice",
        "Preserve medical records",
        "Provide emotional support"
      ],
      short: [
        "File complaint with medical authorities",
        "Seek compensation for damages",
        "Request policy changes",
        "Monitor compliance"
      ],
      long: [
        "Monitor healthcare compliance",
        "Advocate for policy changes",
        "Support other affected women",
        "Promote reproductive rights"
      ]
    }
  }

  return plans[rightsType as keyof typeof plans] || plans.domestic_violence
}

function getRightsTimeline(rightsType: string, urgency: string) {
  const baseTimelines = {
    domestic_violence: {
      immediate: "0-24 hours",
      "protection_order": "3-7 days",
      "legal_proceedings": "30-90 days",
      "counseling": "ongoing"
    },
    sexual_harassment: {
      "complaint": "1-3 days",
      "investigation": "7-14 days",
      "legal_proceedings": "30-60 days",
      "counseling": "ongoing"
    },
    workplace_discrimination: {
      "complaint": "3-7 days",
      "investigation": "14-30 days",
      "legal_proceedings": "60-120 days",
      "resolution": "30-60 days"
    },
    property_rights: {
      "documentation": "7-14 days",
      "legal_proceedings": "90-180 days",
      "resolution": "90-180 days",
      "enforcement": "30-60 days"
    },
    education_rights: {
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "legal_proceedings": "60-120 days",
      "resolution": "30-60 days"
    },
    reproductive_rights: {
      "complaint": "3-7 days",
      "investigation": "14-30 days",
      "legal_proceedings": "60-120 days",
      "resolution": "30-60 days"
    }
  }

  const urgencyMultiplier = {
    urgent: 0.5,
    priority: 0.75,
    normal: 1
  }

  const timeline = baseTimelines[rightsType as keyof typeof baseTimelines] || baseTimelines.domestic_violence
  const multiplier = urgencyMultiplier[urgency as keyof typeof urgencyMultiplier] || 1

  return Object.keys(timeline).reduce((acc, key) => {
    const [start, end] = timeline[key as keyof typeof timeline].split('-')
    const startNum = parseInt(start) * multiplier
    const endNum = parseInt(end) * multiplier
    acc[key] = `${startNum}-${endNum} ${end.includes('day') ? 'days' : 'hours'}`
    return acc
  }, {} as any)
}

function getRightsChecklists(rightsType: string) {
  const checklists = {
    domestic_violence: {
      pre: [
        "Know your rights under Domestic Violence Act",
        "Keep emergency contacts handy",
        "Document important documents",
        "Have a safety plan ready",
        "Know local support services"
      ],
      during: [
        "Ensure personal safety first",
        "Call women's helpline (1091)",
        "Document all incidents and injuries",
        "Seek medical attention if needed",
        "Preserve all evidence"
      ],
      post: [
        "Continue counseling and support",
        "Maintain safety measures",
        "Follow up on legal proceedings",
        "Rebuild life independently",
        "Help other victims"
      ]
    },
    sexual_harassment: {
      pre: [
        "Understand workplace harassment policies",
        "Know your legal rights",
        "Document any incidents",
        "Keep evidence preserved",
        "Know reporting procedures"
      ],
      during: [
        "Ensure privacy and safety",
        "Report to appropriate authorities",
        "Preserve all evidence",
        "Seek medical attention if needed",
        "Get emotional support"
      ],
      post: [
        "Continue counseling and therapy",
        "Monitor workplace compliance",
        "Advocate for policy changes",
        "Support other victims",
        "Promote safe workplaces"
      ]
    },
    workplace_discrimination: {
      pre: [
        "Know workplace rights and policies",
        "Document discriminatory incidents",
        "Understand complaint procedures",
        "Keep evidence preserved",
        "Know support organizations"
      ],
      during: [
        "Report discrimination to HR",
        "File formal complaint if needed",
        "Document all incidents",
        "Seek legal advice",
        "Maintain professionalism"
      ],
      post: [
        "Monitor workplace compliance",
        "Advocate for policy changes",
        "Support affected colleagues",
        "Promote workplace equality",
        "Maintain professional standards"
      ]
    },
    property_rights: {
      pre: [
        "Know your property rights",
        "Keep documents organized",
        "Understand inheritance laws",
        "Know legal procedures",
        "Have legal contacts ready"
      ],
      during: [
        "Document property ownership",
        "Seek legal advice promptly",
        "File complaint if rights violated",
        "Preserve all evidence",
        "Ensure property security"
      ],
      post: [
        "Monitor property compliance",
        "Ensure equal inheritance",
        "Maintain documentation",
        "Advocate for policy changes",
        "Support other affected women"
      ]
    },
    education_rights: {
      pre: [
        "Know educational rights under RTE Act",
        "Document any discrimination",
        "Know complaint procedures",
        "Understand educational laws",
        "Have support contacts ready"
      ],
      during: [
        "Document educational discrimination",
        "Report to authorities",
        "Seek legal advice if needed",
        "Ensure continued education",
        "Preserve evidence"
      ],
      post: [
        "Monitor educational compliance",
        "Advocate for policy changes",
        "Support affected students",
        "Promote educational equality",
        "Maintain standards"
      ]
    },
    reproductive_rights: {
      pre: [
        "Know reproductive rights",
        "Understand healthcare laws",
        "Have medical contacts ready",
        "Know emergency procedures",
        "Maintain medical records"
      ],
      during: [
        "Ensure access to healthcare",
        "Document medical negligence",
        "Seek legal advice if needed",
        "Preserve medical records",
        "Get emotional support"
      ],
      post: [
        "Monitor healthcare compliance",
        "Advocate for policy changes",
        "Support other affected women",
        "Promote reproductive rights",
        "Maintain health standards"
      ]
    }
  }

  return checklists[rightsType as keyof typeof checklists] || checklists.domestic_violence
}

function getRightsTemplates(language: string = 'en') {
  return [
    {
      id: 1,
      title: "Domestic Violence Complaint",
      type: "domestic_violence",
      template: `To,
The Officer-in-Charge
[Police Station Name]
[Police Station Address]
[City]
[Pincode]
[Date]

Subject: Complaint under Section 498A IPC - Domestic Violence

Dear Sir/Madam,

I, [Your Name], residing at [Your Address], hereby file a complaint under Section 498A of the Indian Penal Code against [Perpetrator's Name] for domestic violence.

Incident Details:
- Date of Incident: [Date]
- Time of Incident: [Time]
- Place of Incident: [Place]
- Nature of Violence: [Physical/Emotional/Economic/Sexual]
- Injuries Sustained: [Description of injuries]
- Witnesses: [Witness names and contact details]

Legal Provisions:
This complaint is filed under Section 498A IPC which defines domestic violence and provides legal protection to victims.

Prayer:
I request you to:
1. Register an FIR immediately
2. Conduct a fair and impartial investigation
3. Provide protection to me and my family
4. Take necessary legal action against the perpetrator

I am available for further investigation and can provide additional information as required.

Thank you.

Yours faithfully,
[Your Name]
[Phone Number]
[Email]
[Date]`,
      fields: ["Name", "Address", "Perpetrator Name", "Date", "Time", "Place", "Injuries"]
    },
    {
      id: 2,
      title: "Sexual Harassment Complaint",
      type: "sexual_harassment",
      template: `To,
The Internal Complaints Committee
[Company/Organization Name]
[Company Address]
[City]
[Date]

Subject: Complaint under Sexual Harassment of Women at Workplace Act, 2013

Dear Members of the Committee,

I, [Your Name], [Position] at [Company Name], hereby file a complaint under the Sexual Harassment of Women at Workplace Act, 2013 against [Respondent's Name], [Position] at [Company Name].

Incident Details:
- Date(s) of Incident: [Date(s)]
- Time(s) of Incident: [Time(s)]
- Place of Incident: [Place]
- Nature of Harassment: [Description]
- Witnesses: [Witness names and contact details]
- Impact on Work: [Description]

Legal Provisions:
This complaint is filed under the Sexual Harassment of Women at Workplace Act, 2013 which provides protection against sexual harassment at workplace.

Prayer:
I request the Committee to:
1. Conduct a fair and impartial investigation
2. Provide protection and support to me
3. Take appropriate action against the respondent
4. Ensure workplace safety and compliance
5. Provide compensation for damages if applicable

I am available for further investigation and can provide additional information as required.

Thank you.

Yours sincerely,
[Your Name]
[Phone Number]
[Email]
[Position]
[Company Name]
[Date]`,
      fields: ["Name", "Position", "Company Name", "Respondent Name", "Date", "Time", "Place"]
    }
  ]
}

function getWomenRightsContacts(location: string) {
  const baseContacts = {
    national: [
      { name: "National Commission for Women", phone: "011-23372244", type: "commission" },
      { name: "Women Helpline", phone: "1091", type: "emergency", is247: true },
      { name: "NCW Sexual Harassment Cell", phone: "011-23372244", type: "commission" }
    ],
    state: [
      { name: "State Women Commission", phone: "1800-123-4567", type: "commission" },
      { name: "State Women Helpline", phone: "1800-123-4567", type: "emergency" },
      { name: "State Police Women Cell", phone: "011-2338225", type: "police" }
    ],
    district: [
      { name: "District Women Cell", phone: "011-2338225", type: "police" },
      { name: "District Women's NGO", phone: "1800-123-4567", type: "ngo" },
      { name: "Local Women's Shelter", phone: "1091", type: "shelter" }
    ]
  }

  return baseContacts.national
}

function getWomenRightsStatistics() {
  return {
    totalCases: 250000,
    successRate: 78,
    averageResolutionTime: 45, // days
    protectionOrders: 50000,
    helplineCalls: 1000000,
    shelters: 500,
    legalAidProvided: 75000,
    lastUpdated: new Date().toISOString()
  }
}

function getWomenRightsTypes() {
  return [
    {
      id: "domestic_violence",
      name: "Domestic Violence",
      description: "Protection against domestic violence and abuse",
      category: "safety",
      urgency: "high",
      constitutional: ["Article 14", "Article 21"],
      legal: ["Domestic Violence Act", "IPC Section 498A"],
      timeline: "30-90 days"
    },
    {
      id: "sexual_harassment",
      name: "Sexual Harassment",
      description: "Protection against sexual harassment at workplace and public spaces",
      category: "safety",
      urgency: "high",
      constitutional: ["Article 14", "Article 21"],
      legal: ["Sexual Harassment of Women at Workplace Act", "IPC Section 354"],
      timeline: "30-60 days"
    },
    {
      id: "workplace_discrimination",
      name: "Workplace Discrimination",
      description: "Protection against gender-based discrimination at workplace",
      category: "employment",
      urgency: "medium",
      constitutional: ["Article 14", "Article 16"],
      legal: ["Equal Remuneration Act", "Sexual Harassment Act"],
      timeline: "30-60 days"
    },
    {
      id: "property_rights",
      name: "Property Rights",
      description: "Protection of women's property and inheritance rights",
      category: "property",
      urgency: "medium",
      constitutional: ["Article 14", "Article 300A"],
      legal: ["Hindu Succession Act", "Protection of Women from Domestic Violence Act"],
      timeline: "60-180 days"
    },
    {
      id: "education_rights",
      name: "Education Rights",
      description: "Protection of girls' right to education",
      category: "education",
      urgency: "medium",
      constitutional: ["Article 14", "Article 21A"],
      legal: ["Right to Education Act", "Child Labor Laws"],
      timeline: "30-60 days"
    },
    {
      id: "reproductive_rights",
      name: "Reproductive Rights",
      description: "Protection of women's reproductive health and autonomy",
      category: "health",
      urgency: "high",
      constitutional: ["Article 14", "Article 21"],
      legal: ["MTP Act", "Medical Termination of Pregnancy Act"],
      timeline: "30-60 days"
    }
  ]
}

function getRecentCases(language: string = 'en') {
  return [
    {
      id: 1,
      type: "domestic_violence",
      title: "Protection Order Granted",
      description: "Successfully obtained protection order against abusive husband",
      outcome: "success",
      timeline: "21 days",
      date: "2023-12-20",
      location: "Delhi",
      constitutional: "Article 21"
    },
    {
      id: 2,
      type: "sexual_harassment",
      title: "Workplace Harassment Resolved",
      description: "Sexual harassment case at workplace resolved with policy changes",
      outcome: "success",
      timeline: "45 days",
      date: "2023-12-18",
      location: "Mumbai",
      constitutional: "Article 14"
    },
    {
      id: 3,
      type: "property_rights",
      title: "Property Rights Restored",
      description: "Successfully challenged illegal property denial by in-laws",
      outcome: "success",
      timeline: "90 days",
      date: "2023-12-15",
      location: "Bangalore",
      constitutional: "Article 300A"
    }
  ]
}

function getWomenRightsConstitutionalBasis() {
  return {
    primary: {
      article: "Article 14",
      title: "Right to equality",
      description: "Equal protection of laws for women",
      applications: ["all_rights"]
    },
    secondary: {
      article: "Article 21",
      title: "Right to life and personal liberty",
      description: "Right to life with dignity for women",
      applications: ["domestic_violence", "sexual_harassment", "reproductive_rights"]
    },
    landmark: {
      case: "Vishaka vs. State of Rajasthan (1997)",
      title: "Sexual Harassment Guidelines",
      description: "Supreme Court guidelines for preventing sexual harassment",
      applications: ["sexual_harassment", "workplace"]
    },
    legislation: {
      act: "Domestic Violence Act, 2005",
      title: "Protection from Domestic Violence",
      description: "Comprehensive law for domestic violence protection",
      applications: ["domestic_violence", "protection", "safety"]
    },
    act: "Sexual Harassment of Women at Workplace Act, 2013",
      title: "Prevention of Sexual Harassment",
      description: "Legal framework for preventing workplace sexual harassment",
      applications: ["sexual_harassment", "workplace"]
    }
  }
}

function getSupportOrganizations() {
  return [
    {
      name: "National Commission for Women",
      url: "https://ncw.gov.in",
      description: "Statutory body for women's rights",
      services: ["legal_aid", "complaints", "policy"],
      contact: "011-23372244"
    },
    {
      name: "Sakhi",
      url: "https://sakhi.org",
      description: "Women's rights NGO working on violence against women",
      services: ["counseling", "legal_aid", "shelter"],
      contact: "011-24637431"
    },
    {
      name: "Jagori",
      url: "https://jagori.org",
      description: "Women's rights NGO focusing on gender equality",
      services: ["education", "advocacy", "research"],
      contact: "011-26692300"
    },
    {
      name: "SEWA",
      url: "https://sewa.org",
      description: "Self-Employed Women's Association",
      services: ["union", "employment", "financial"],
      contact: "011-23234567"
    },
    {
      name: "ActionAid India",
      url: "https://actionaid.org/india",
      description: "International NGO working on women's rights",
      services: ["education", "healthcare", "empowerment"],
      contact: "011-46538166"
    }
  ]
}

function getEmergencyContacts() {
  return [
    {
      name: "Women Helpline",
      phone: "1091",
      type: "emergency",
      is247: true,
      description: "24/7 emergency helpline for women in distress"
    },
    {
      name: "National Commission for Women",
      phone: "011-23372244",
      type: "commission",
      description: "Statutory body for women's rights and complaints"
    },
    {
      name: "Police Women Helpline",
      phone: "1091",
      type: "police",
      description: "Police helpline for women's safety and emergencies"
    },
    {
      name: "Medical Emergency",
      phone: "108",
      type: "medical",
      description: "Emergency medical services for women's health"
    },
    {
      name: "Legal Aid Helpline",
      phone: "1800-11-1320",
      type: "legal_aid",
      description: "Free legal services for women who cannot afford representation"
    }
  ]
}