import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { 
      emergencyType,
      location,
      description,
      personalInfo,
      urgency = 'normal',
      language = 'en'
    } = await request.json()

    // Generate emergency response protocol
    const emergencyProtocol = generateEmergencyProtocol({
      emergencyType,
      location,
      description,
      personalInfo,
      urgency,
      language
    })

    // Get legal contacts and resources
    const legalResources = getLegalResources(emergencyType, location)

    // Generate constitutional rights references
    const constitutionalRights = getConstitutionalRights(emergencyType)

    // Create action plan
    const actionPlan = createActionPlan(emergencyType, urgency, location)

    return NextResponse.json({
      success: true,
      data: {
        emergencyProtocol,
        legalResources,
        constitutionalRights,
        actionPlan,
        timeline: getEmergencyTimeline(emergencyType, urgency),
        checklists: getEmergencyChecklists(emergencyType),
        forms: getRequiredForms(emergencyType),
        contacts: getEmergencyContacts(location)
      }
    })

  } catch (error) {
    console.error('Legal Emergency Assistant Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to process emergency request'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const location = searchParams.get('location')
    const language = searchParams.get('lang') || 'en'

    // Get emergency types and resources
    const emergencyTypes = getEmergencyTypes()
    const filteredTypes = type ? emergencyTypes.filter(t => t.id === type) : emergencyTypes
    
    // Get legal emergency statistics
    const statistics = getLegalEmergencyStatistics()

    // Get recent emergency cases
    const recentCases = getRecentEmergencyCases(language)

    return NextResponse.json({
      success: true,
      data: {
        emergencyTypes: filteredTypes,
        statistics,
        recentCases,
        constitutionalBasis: getLegalEmergencyConstitutionalBasis(),
        hotlines: getEmergencyHotlines(),
        legalAid: getLegalAidCenters(location)
      }
    })

  } catch (error) {
    console.error('Legal Emergency Directory Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch emergency resources'
    }, { status: 500 })
  }
}

function generateEmergencyProtocol(data: any) {
  const {
    emergencyType,
    location,
    description,
    personalInfo,
    urgency = 'normal',
    language = 'en'
  } = data

  const protocols = {
    arrest: {
      immediate: [
        "Remain calm and do not resist",
        "Ask for the reason of arrest",
        "Do not make any statements without a lawyer",
        "Inform family or friend immediately",
        "Note down badge number and name of arresting officer"
      ],
      constitutional: [
        "Article 22(1): Right to be informed of grounds of arrest",
        "Article 22(2): Right to consult lawyer of choice",
        "Article 21: Right to life and personal liberty",
        "D.K. Basu vs. State of West Bengal guidelines"
      ],
      timeline: {
        "0-2 hours": "Inform family, contact lawyer",
        "2-24 hours": "File habeas corpus petition if unlawful",
        "24-48 hours": "Apply for bail if eligible",
        "48+ hours": "Follow up on case progress"
      },
      documents: [
        "Arrest memo copy",
        "Lawyer's contact information",
        "Family member's contact details",
        "Personal identification documents"
      ]
    },
    search: {
      immediate: [
        "Ask for search warrant",
        "Observe the search process",
        "Do not interfere with legal search",
        "Note down officer details",
        "Call a lawyer if possible"
      ],
      constitutional: [
        "Article 21: Right to privacy",
        "Article 19(1)(d): Right to move freely",
        "Article 14: Right to equality before law",
        "Citizen's rights during police procedures"
      ],
      timeline: {
        "0-1 hour": "Verify search warrant",
        "1-6 hours": "Document any violations",
        "6-24 hours": "File complaint if illegal search",
        "24+ hours": "Follow up on complaint"
      },
      documents: [
        "Search warrant copy",
        "Officer identification",
        "Inventory of seized items",
        "Witness contact information"
      ]
    },
    detention: {
      immediate: [
        "Ask for grounds of detention",
        "Contact family immediately",
        "Request access to lawyer",
        "Do not sign any documents without legal advice",
        "Note detention conditions"
      ],
      constitutional: [
        "Article 22: Protection against arrest and detention",
        "Article 21: Right to life and personal liberty",
        "Article 14: Right to equality",
        "International Covenant on Civil and Political Rights"
      ],
      timeline: {
        "0-6 hours": "Inform family, contact lawyer",
        "6-24 hours": "File habeas corpus petition",
        "24-48 hours": "Apply for bail",
        "48+ hours": "Regular legal follow-up"
      },
      documents: [
        "Detention order copy",
        "Legal representation documents",
        "Family contact information",
        "Medical records if needed"
      ]
    },
    harassment: {
      immediate: [
        "Move to a safe location",
        "Document all incidents",
        "Report to appropriate authorities",
        "Seek legal help immediately",
        "Preserve all evidence"
      ],
      constitutional: [
        "Article 21: Right to life with dignity",
        "Article 14: Right to equality",
        "Article 19(1)(a): Right to freedom of speech",
        "Sexual Harassment of Women at Workplace Act"
      ],
      timeline: {
        "0-24 hours": "File FIR, seek medical help",
        "1-7 days": "File complaint with relevant authorities",
        "7-30 days": "Follow up on investigation",
        "30+ days": "Legal proceedings"
      },
      documents: [
        "Incident report",
        "Medical examination report",
        "Evidence preservation",
        "Witness statements"
      ]
    },
    property: {
      immediate: [
        "Secure the property",
        "Document the situation",
        "Contact local authorities",
        "Gather evidence",
        "Seek legal advice"
      ],
      constitutional: [
        "Article 300A: Right to property",
        "Article 19(1)(f): Right to acquire, hold and dispose of property",
        "Article 14: Right to equality",
        "Land Acquisition Act provisions"
      ],
      timeline: {
        "0-12 hours": "Secure property, document",
        "1-7 days": "File police report",
        "1-30 days": "Civil proceedings if needed",
        "30+ days": "Long-term legal resolution"
      },
      documents: [
        "Property documents",
        "Photographs/videos",
        "Police report",
        "Civil complaint copy"
      ]
    }
  }

  return protocols[emergencyType as keyof typeof protocols] || protocols.arrest
}

function getLegalResources(emergencyType: string, location: string) {
  const resources = {
    arrest: {
      hotlines: [
        { name: "National Legal Services Authority", phone: "1800-11-1320", 24/7: true },
        { name: "State Legal Services Authority", phone: "011-2338225", 24/7: false },
        { name: "Police Control Room", phone: "100", 24/7: true }
      ],
      lawyers: [
        { name: "Criminal Lawyers Association", phone: "011-23234567", 24/7: true },
        { name: "Human Rights Lawyers Network", phone: "1800-123-4567", 24/7: true }
      ],
      organizations: [
        { name: "Commonwealth Human Rights Initiative", phone: "011-23456789", 24/7: false },
        { name: "Legal Aid Cell", phone: "011-34567890", 24/7: false }
      ],
      websites: [
        "https://nalsa.gov.in",
        "https://nhrc.nic.in",
        "https://legalservices.gov.in"
      ]
    },
    search: {
      hotlines: [
        { name: "Police Complaint Helpline", phone: "1090", 24/7: true },
        { name: "Legal Aid Helpline", phone: "1800-11-1320", 24/7: false }
      ],
      lawyers: [
        { name: "Constitutional Lawyers Forum", phone: "011-23456789", 24/7: false }
      ],
      organizations: [
        { name: "Civil Liberties Union", phone: "011-34567890", 24/7: false }
      ],
      websites: [
        "https://nhrc.nic.in",
        "https://humanrights.gov.in"
      ]
    },
    detention: {
      hotlines: [
        { name: "Prison Helpline", phone: "1800-123-4567", 24/7: true },
        { name: "Legal Services", phone: "1800-11-1320", 24/7: false }
      ],
      lawyers: [
        { name: "Criminal Defense Lawyers", phone: "011-23456789", 24/7: true }
      ],
      organizations: [
        { name: "Prisoners Rights Organization", phone: "011-34567890", 24/7: false }
      ],
      websites: [
        "https://prisons.gov.in",
        "https://nalsa.gov.in"
      ]
    },
    harassment: {
      hotlines: [
        { name: "Women Helpline", phone: "1091", 24/7: true },
        { name: "Sexual Harassment Helpline", phone: "1800-123-4567", 24/7: true },
        { name: "NCW Complaint Helpline", phone: "011-23372244", 24/7: false }
      ],
      lawyers: [
        { name: "Women Lawyers Association", phone: "011-23456789", 24/7: true }
      ],
      organizations: [
        { name: "National Commission for Women", phone: "011-23372244", 24/7: false },
        { name: "Women's Rights Organizations", phone: "011-34567890", 24/7: false }
      ],
      websites: [
        "https://ncw.gov.in",
        "https://wcd.gov.in"
      ]
    },
    property: {
      hotlines: [
        { name: "Property Dispute Helpline", phone: "1800-123-4567", 24/7: false },
        { name: "Legal Aid", phone: "1800-11-1320", 24/7: false }
      ],
      lawyers: [
        { name: "Property Lawyers Association", phone: "011-23456789", 24/7: false }
      ],
      organizations: [
        { name: "Housing Rights Organization", phone: "011-34567890", 24/7: false }
      ],
      websites: [
        "https://housing.gov.in",
        "https://urbanaffairs.gov.in"
      ]
    }
  }

  return resources[emergencyType as keyof typeof resources] || resources.arrest
}

function getConstitutionalRights(emergencyType: string) {
  const rights = {
    arrest: [
      {
        article: "Article 22",
        title: "Protection against arrest and detention",
        description: "No person who is arrested shall be detained in custody without being informed of the grounds for such arrest",
        application: "You have the right to be informed immediately of the grounds of arrest"
      },
      {
        article: "Article 22(2)",
        title: "Right to consult lawyer",
        description: "Every person who is arrested shall be entitled to consult and be defended by a legal practitioner of his choice",
        application: "You can call your lawyer immediately upon arrest"
      },
      {
        article: "Article 21",
        title: "Right to life and personal liberty",
        description: "No person shall be deprived of his life or personal liberty except according to procedure established by law",
        application: "Arrest must follow due process of law"
      }
    ],
    search: [
      {
        article: "Article 21",
        title: "Right to privacy",
        description: "Right to privacy is implicit in the right to life and liberty guaranteed by Article 21",
        application: "Illegal search violates your right to privacy"
      },
      {
        article: "Article 19(1)(d)",
        title: "Right to move freely",
        description: "Every citizen shall have the right to move freely throughout the territory of India",
        application: "Unlawful restriction of movement violates this right"
      }
    ],
    detention: [
      {
        article: "Article 22",
        title: "Protection against arrest and detention",
        description: "Provides safeguards against arbitrary arrest and detention",
        application: "Detention must be lawful and justified"
      },
      {
        article: "Article 21",
        title: "Right to life and personal liberty",
        description: "Protects against unlawful deprivation of liberty",
        application: "Detention must follow legal procedures"
      }
    ],
    harassment: [
      {
        article: "Article 21",
        title: "Right to life with dignity",
        description: "Includes right to live with human dignity, free from harassment",
        application: "Harassment violates right to dignity"
      },
      {
        article: "Article 14",
        title: "Right to equality",
        description: "Equality before law and equal protection of laws",
        application: "Gender-based harassment violates equality"
      }
    ],
    property: [
      {
        article: "Article 300A",
        title: "Right to property",
        description: "No person shall be deprived of his property save by authority of law",
        application: "Illegal property seizure violates this right"
      },
      {
        article: "Article 19(1)(f)",
        title: "Right to acquire, hold and dispose of property",
        description: "Includes the right to acquire, hold and dispose of property",
        application: "Unlawful interference with property rights"
      }
    ]
  }

  return rights[emergencyType as keyof typeof rights] || rights.arrest
}

function createActionPlan(emergencyType: string, urgency: string, location: string) {
  const plans = {
    arrest: {
      immediate: [
        "Contact family members",
        "Call emergency legal helpline (1800-11-1320)",
        "Document arrest details",
        "Preserve evidence"
      ],
      short: [
        "File habeas corpus petition if unlawful arrest",
        "Apply for bail through lawyer",
        "Gather character witnesses",
        "Prepare for court proceedings"
      ],
      long: [
        "Follow up on court case",
        "Maintain legal documentation",
        "Appeal if conviction",
        "Seek compensation for wrongful arrest"
      ]
    },
    search: {
      immediate: [
        "Verify search warrant validity",
        "Document search process",
        "Note any violations",
        "Call lawyer if needed"
      ],
      short: [
        "File complaint if illegal search",
        "Seek judicial remedy",
        "Gather witness statements",
        "Prepare for legal proceedings"
      ],
      long: [
        "Follow up on complaint",
        "Pursue compensation",
        "Challenge search in court",
        "Establish legal precedent"
      ]
    },
    detention: {
      immediate: [
        "Contact family immediately",
        "Call legal helpline",
        "Document detention details",
        "Arrange for legal representation"
      ],
      short: [
        "File habeas corpus petition",
        "Apply for bail",
        "Prepare for bail hearing",
        "Arrange for surety"
      ],
      long: [
        "Follow court proceedings",
        "Maintain regular contact with lawyer",
        "Prepare for trial",
        "Plan for post-detention support"
      ]
    },
    harassment: {
      immediate: [
        "Ensure personal safety",
        "Document all evidence",
        "Report to police",
        "Seek medical help if needed"
      ],
      short: [
        "File FIR/complaint",
        "Engage with investigation",
        "Seek counseling support",
        "Consider civil action"
      ],
      long: [
        "Follow criminal proceedings",
        "Pursue civil remedies",
        "Seek compensation",
        "Join support groups"
      ]
    },
    property: {
      immediate: [
        "Secure the property",
        "Document situation",
        "Contact authorities",
        "Gather evidence"
      ],
      short: [
        "File police report",
        "Engage with investigation",
        "Consider civil action",
        "Seek injunction"
      ],
      long: [
        "Pursue legal proceedings",
        "Seek compensation",
        "Establish property rights",
        "Plan for long-term resolution"
      ]
    }
  }

  const urgencyMultiplier = {
    urgent: 0.5,
    priority: 0.75,
    normal: 1
  }

  return plans[emergencyType as keyof typeof plans] || plans.arrest
}

function getEmergencyTimeline(emergencyType: string, urgency: string) {
  const baseTimelines = {
    arrest: {
      immediate: "0-2 hours",
      legal: "2-24 hours",
      bail: "24-48 hours",
      court: "48-72 hours"
    },
    search: {
      immediate: "0-1 hour",
      complaint: "1-6 hours",
      investigation: "6-24 hours",
      legal: "24-48 hours"
    },
    detention: {
      immediate: "0-6 hours",
      legal: "6-24 hours",
      bail: "24-48 hours",
      court: "48-72 hours"
    },
    harassment: {
      immediate: "0-24 hours",
      report: "1-7 days",
      investigation: "7-30 days",
      legal: "30-90 days"
    },
    property: {
      immediate: "0-12 hours",
      report: "1-7 days",
      civil: "7-30 days",
      court: "30-60 days"
    }
  }

  const urgencyAdjustment = {
    urgent: 0.5,
    priority: 0.75,
    normal: 1
  }

  const timeline = baseTimelines[emergencyType as keyof typeof baseTimelines] || baseTimelines.arrest
  const multiplier = urgencyAdjustment[urgency as keyof typeof urgencyAdjustment] || 1

  return Object.keys(timeline).reduce((acc, key) => {
    const [start, end] = timeline[key as keyof typeof timeline].split('-')
    const startNum = parseInt(start) * multiplier
    const endNum = parseInt(end) * multiplier
    acc[key] = `${startNum}-${endNum} ${end.includes('hour') ? 'hours' : 'days'}`
    return acc
  }, {} as any)
}

function getEmergencyChecklists(emergencyType: string) {
  const checklists = {
    arrest: {
      pre: [
        "Keep emergency lawyer contacts handy",
        "Know your constitutional rights",
        "Carry identification documents",
        "Have family emergency contacts"
      ],
      during: [
        "Stay calm and cooperative",
        "Ask for identification of officers",
        "Note down badge numbers and names",
        "Do not make statements without lawyer"
      ],
      post: [
        "File complaint if rights violated",
        "Document all violations",
        "Seek compensation if applicable",
        "Join support groups if needed"
      ]
    },
    search: {
      pre: [
        "Know your rights regarding searches",
        "Keep lawyer contact information",
        "Understand search warrant requirements",
        "Prepare for potential search"
      ],
      during: [
        "Ask for search warrant",
        "Observe the search process",
        "Document any violations",
        "Call lawyer if possible"
      ],
      post: [
        "File complaint if illegal search",
        "Document evidence",
        "Seek legal remedies",
        "Follow up on complaint"
      ]
    },
    detention: {
      pre: [
        "Know detention rights",
        "Keep emergency contacts",
        "Understand bail process",
        "Have lawyer information ready"
      ],
      during: [
        "Ask for grounds of detention",
        "Contact family immediately",
        "Request lawyer access",
        "Document detention conditions"
      ],
      post: [
        "File habeasarus if unlawful",
        "Apply for bail promptly",
        "Maintain legal documentation",
        "Follow court proceedings"
      ]
    },
    harassment: [
      pre: [
        "Know your rights",
        "Keep emergency contacts",
        "Understand reporting procedures",
        "Know support resources"
      ],
      during: [
        "Ensure personal safety",
        "Document everything",
        "Report to authorities",
        "Seek immediate help"
      ],
      post: [
        "Follow up on reports",
        "Seek counseling",
        "Join support groups",
        "Consider legal action"
      ]
    },
    property: [
      pre: [
        "Keep property documents safe",
        "Know your property rights",
        "Have lawyer contacts",
        "Understand dispute resolution"
      ],
      during: [
        "Secure the property",
        "Document situation",
        "Contact authorities",
        "Gather evidence"
      ],
      post: [
        "Follow legal procedures",
        "Maintain documentation",
        "Seek legal remedies",
        "Plan for long-term resolution"
      ]
    }
  }

  return checklists[emergencyType as keyof typeof checklists] || checklists.arrest
}

function getRequiredForms(emergencyType: string) {
  const forms = {
    arrest: [
      {
        name: "Habeas Corpus Petition",
        purpose: "Challenge unlawful arrest or detention",
        where: "High Court or Supreme Court",
        urgency: "Immediate"
      },
      {
        name: "Bail Application",
        purpose: "Seek release from custody",
        where: "Court of competent jurisdiction",
        urgency: "High"
      },
      {
        name: "Complaint against Police",
        purpose: "Report police misconduct",
        where: "State Human Rights Commission",
        urgency: "Medium"
      }
    ],
    search: [
      {
        name: "Complaint against Illegal Search",
        purpose: "Report unlawful search",
        where: "Police Complaint Authority",
        urgency: "Medium"
      },
      {
        name: "Writ Petition",
        purpose: "Seek judicial remedy",
        where: "High Court",
        urgency: "High"
      }
    ],
    detention: [
      {
        name: "Habeas Corpus Petition",
        purpose: "Challenge unlawful detention",
        where: "High Court",
        urgency: "Immediate"
      },
      {
        name: "Bail Application",
        purpose: "Seek release from detention",
        where: "Court",
        urgency: "High"
      }
    ],
    harassment: [
      {
        name: "FIR (First Information Report)",
        purpose: "Report criminal offense",
        where: "Police Station",
        urgency: "Immediate"
      },
      {
        name: "Complaint under Sexual Harassment Act",
        purpose: "Report workplace harassment",
        where: "Internal Complaints Committee",
        urgency: "High"
      }
    ],
    property: [
      {
        name: "Police Complaint",
        purpose: "Report property offense",
        where: "Police Station",
        urgency: "Medium"
      },
      {
        name: "Civil Suit",
        purpose: "Seek civil remedy",
        where: "Civil Court",
        urgency: "Medium"
      },
      {
        name: "Injunction Application",
        purpose: "Stop ongoing violation",
        where: "Court",
        urgency: "High"
      }
    ]
  }

  return forms[emergencyType as keyof typeof forms] || forms.arrest
}

function getEmergencyContacts(location: string) {
  const baseContacts = {
    national: [
      { name: "National Legal Services Authority", phone: "1800-11-1320", type: "legal_aid" },
      { name: "National Human Rights Commission", phone: "011-23382565", type: "human_rights" },
      { name: "National Commission for Women", phone: "011-23372244", type: "women" }
    ],
    police: [
      { name: "Police Control Room", phone: "100", type: "emergency" },
      { name: "Women Helpline", phone: "1091", type: "women" },
      { name: "Senior Citizen Helpline", phone: "1291", type: "senior" }
    ],
    legal: [
      { name: "Supreme Court Legal Services", phone: "011-23388025", type: "court" },
      { name: "Bar Association", phone: "011-2338225", type: "lawyer" },
      { name: "Legal Aid Clinic", phone: "1800-11-1320", type: "legal_aid" }
    ]
  }

  return baseContacts
}

function getEmergencyTypes() {
  return [
    {
      id: "arrest",
      name: "Police Arrest",
      description: "When you or someone you know is arrested by police",
      urgency: "high",
      constitutional: ["Article 22", "Article 21"],
      hotlines: ["1800-11-1320", "100"],
      timeline: "Immediate action required"
    },
    {
      id: "search",
      name: "Police Search",
      description: "When police are searching your property or person",
      urgency: "medium",
      constitutional: ["Article 21", "Article 19(1)(d)"],
      hotlines: ["100", "1800-11-1320"],
      timeline: "24-48 hours"
    },
    {
      id: "detention",
      name: "Illegal Detention",
      description: "When someone is detained without proper legal process",
      urgency: "high",
      constitutional: ["Article 22", "Article 21"],
      hotlines: ["1800-11-1320", "100"],
      timeline: "Immediate action required"
    },
    {
      id: "harassment",
      name: "Harassment Cases",
      description: "When facing harassment or discrimination",
      urgency: "high",
      constitutional: ["Article 21", "Article 14"],
      hotlines: ["1091", "1800-11-1320"],
      timeline: "Immediate action required"
    },
    {
      id: "property",
      name: "Property Disputes",
      description: "When your property rights are violated",
      urgency: "medium",
      constitutional: ["Article 300A", "Article 19(1)(f)"],
      hotlines: ["1800-11-1320"],
      timeline: "7-30 days"
    }
  ]
}

function getLegalEmergencyStatistics() {
  return {
    totalCases: 50000,
    successRate: 72,
    averageResponseTime: 4, // hours
    constitutionalCitations: 15000,
      hotlines: [
        { name: "National Legal Services Authority", phone: "1800-11-1320", 24/7: true },
        { name: "State Legal Services Authority", phone: "011-2338225", 24/7: false },
        { name: "Police Control Room", phone: "100", 24/7: true }
      ],
      lawyers: [
        { name: "Criminal Lawyers Association", phone: "011-23234567", 24/7: true },
        { name: "Human Rights Lawyers Network", phone: "1800-123-4567", 24/7: true }
      ],
      organizations: [
        { name: "Commonwealth Human Rights Initiative", phone: "011-23456789", 24/7: false },
        { name: "Legal Aid Cell", phone: "011-34567890", 24/7: false }
      ],
      websites: [
        "https://nalsa.gov.in",
        "https://nhrc.nic.in",
        "https://legalservices.gov.in"
      ]
    },
    arrests: 15000,
    searches: 8000,
    detentions: 5000,
    harassment: 12000,
    property: 10000,
    lastUpdated: new Date().toISOString()
  }
}

function getRecentEmergencyCases(language: string = 'en') {
  return [
    {
      id: 1,
      type: "arrest",
      title: "Unlawful Arrest Prevented",
      description: "Habeasaurus petition filed, person released within 24 hours",
      outcome: "success",
      location: "Delhi",
      date: "2023-12-20",
      constitutional: "Article 22"
    },
    {
      id: 2,
      type: "harassment",
      title: "Workplace Harassment Case Resolved",
      description: "Internal complaint filed, action taken against harasser",
      outcome: "success",
      location: "Mumbai",
      date: "2023-12-18",
      constitutional: "Article 21"
    },
    {
      id: 3,
      type: "property",
      title: "Property Rights Restored",
      description: "Civil suit filed, court ordered restoration of property",
      outcome: "success",
      location: "Bangalore",
      date: "2023-12-15",
      constitutional: "Article 300A"
    }
  ]
}

function getLegalEmergencyConstitutionalBasis() {
  return {
    primary: {
      article: "Article 21",
      title: "Right to life and personal liberty",
      description: "No person shall be deprived of his life or personal liberty except according to procedure established by law",
      applications: ["Arrest", "Detention", "Harassment", "Search"]
    },
    secondary: {
      article: "Article 22",
      title: "Protection against arrest and detention",
      description: "Provides procedural safeguards for arrest and detention",
      applications: ["Arrest", "Detention"]
    },
    landmark: {
      case: "D.K. Basu vs. State of West Bengal (1997)",
      title: "Rights of arrested persons",
      description: "Established guidelines for arrest, detention, and legal representation",
      applications: ["Arrest", "Detention"]
    },
    legislation: {
      act: "Code of Criminal Procedure, 1973",
      title: "Procedural law for criminal matters",
      description: "Provides detailed procedures for arrest, search, and detention",
      applications: ["Arrest", "Search", "Detention"]
    }
  }
}

function getEmergencyHotlines() {
  return [
    {
      name: "National Emergency Response",
      phone: "112",
      category: "general",
      24/7: true,
      description: "All emergencies - police, fire, ambulance"
    },
    {
      name: "Women Helpline",
      phone: "1091",
      category: "women",
      24/7: true,
      description: "Women safety and emergency assistance"
    },
    {
      name: "Child Helpline",
      phone: "1098",
      category: "child",
      24/7: true,
      description: "Child protection and emergency assistance"
    },
    {
      name: "Senior Citizen Helpline",
      phone: "1291",
      category: "senior",
      24/7: true,
      description: "Senior citizen assistance and emergency help"
    },
    {
      name: "Legal Services Authority",
      phone: "1800-11-1320",
      category: "legal",
      24/7: false,
      description: "Free legal aid and assistance"
    }
  ]
}

function getLegalAidCenters(location: string) {
  return [
    {
      name: "National Legal Services Authority",
      address: "Supreme Court, New Delhi",
      phone: "1800-11-1320",
      website: "https://nalsa.gov.in",
      services: ["Legal advice", "Documentation", "Court representation"],
      24/7: false
    },
    {
      name: "Delhi State Legal Services Authority",
      address: "Delhi High Court, New Delhi",
      phone: "011-2338225",
      website: "https://dlsa.delhi.gov.in",
      services: ["Legal advice", "Mediation", "Legal aid"],
      24/7: false
    },
    {
      name: "Human Rights Law Network",
      address: "Multiple locations",
      phone: "011-2338225",
      website: "https://hrln.org",
      services: ["Human rights", "Emergency response", "Legal aid"],
      24/7: true
    }
  ]
}