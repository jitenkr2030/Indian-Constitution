import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      rightsType,
      journalismIssue,
      platformType,
      location,
      description,
      evidence,
      urgency = 'normal',
      language = 'en',
      journalistInfo,
      platformInfo,
      contentDetails,
      documents,
      legalAction = false
    } = body

    // Generate journalism rights strategy
    const rightsStrategy = generateRightsStrategy({
      rightsType,
      journalismIssue,
      platformType,
      location,
      description,
      evidence,
      urgency,
      language,
      journalistInfo,
      platformInfo,
      contentDetails,
      documents,
      legalAction
    })

    // Get journalism resources
    const journalismResources = getJournalismResources(rightsType, location)

    // Get legal options and remedies
    const legalOptions = getLegalOptions(rightsType, journalismIssue, urgency)

    // Create action plan
    const actionPlan = createActionPlan(rightsType, urgency, location)

    return NextResponse.json({
      success: true,
      data: {
        rightsStrategy,
        journalismResources,
        legalOptions,
        actionPlan,
        timeline: getJournalismTimeline(rightsType, urgency),
        checklists: getJournalismChecklists(rightsType),
        templates: getJournalismTemplates(language),
        contacts: getJournalismContacts(location),
        statistics: getJournalismStatistics(),
        constitutionalBasis: getJournalismConstitutionalBasis()
      }
    })

  } catch (error) {
    console.error('Citizen Journalism Platform Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to process journalism rights request'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const location = searchParams.get('location')
    const language = searchParams.get('lang') || 'en'

    // Get journalism issue types
    const issueTypes = getJournalismIssueTypes()
    const filteredTypes = type ? issueTypes.filter(t => t.id === type) : issueTypes
    
    // Get journalism statistics
    const statistics = getJournalismStatistics()

    // Get recent cases
    const recentCases = getRecentCases(language)

    // Get location-specific resources
    const locationResources = location ? getLocationJournalismResources(location) : null

    return NextResponse.json({
      success: true,
      data: {
        issueTypes: filteredTypes,
        statistics,
        recentCases,
        locationResources,
        constitutionalBasis: getJournalismConstitutionalBasis(),
        journalismLaws: getJournalismLaws(),
        mediaOrganizations: getMediaOrganizations()
      }
    })

  } catch (error) {
    console.error('Journalism Directory Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch journalism resources'
    }, { status: 500 })
  }
}

// Helper functions
function generateRightsStrategy(data: any) {
  const { rightsType, journalismIssue, platformType, location, description, evidence, urgency, language, journalistInfo, platformInfo, contentDetails, documents, legalAction } = data
  
  const strategies = {
    freedom_of_press: {
      immediate: [
        "Document press freedom violations",
        "Contact media regulatory authorities",
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact journalist associations"
      ],
      legal: [
        "File complaint under press freedom laws",
        "Seek intervention from media council",
        "File writ petition under Article 19(1)(a)",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(a): Right to freedom of speech and expression",
        "Article 14: Right to equality in journalism",
        "Article 21: Right to life with dignity",
        "Press Freedom Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    media_ethics: {
      immediate: [
        "Document media ethics violations",
        "Contact media regulatory authorities",
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact media ethics committees"
      ],
      legal: [
        "File complaint under media ethics laws",
        "Seek intervention from media council",
        "File writ petition under Article 19(1)(a)",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(a): Right to freedom of speech",
        "Article 14: Right to equality in media",
        "Article 21: Right to life with dignity",
        "Media Ethics Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    citizen_journalism: {
      immediate: [
        "Document citizen journalism violations",
        "Contact journalism support organizations",
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact citizen journalism platforms"
      ],
      legal: [
        "File complaint under journalism laws",
        "Seek intervention from media council",
        "File writ petition under Article 19(1)(a)",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(a): Right to freedom of speech",
        "Article 14: Right to equality in journalism",
        "Article 21: Right to life with dignity",
        "Journalism Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    content_moderation: {
      immediate: [
        "Document content moderation violations",
        "Contact platform moderation teams",
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact content moderation authorities"
      ],
      legal: [
        "File complaint under content moderation laws",
        "Seek intervention from platform authorities",
        "File writ petition under Article 19(1)(a)",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(a): Right to freedom of speech",
        "Article 14: Right to equality in moderation",
        "Article 21: Right to life with dignity",
        "Content Moderation Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    whistleblower_protection: {
      immediate: [
        "Document whistleblower violations",
        "Contact whistleblower protection authorities",
        "Seek immediate protection if needed",
        "Preserve all evidence and documentation",
        "Contact whistleblower support organizations"
      ],
      legal: [
        "File complaint under whistleblower protection laws",
        "Seek intervention from protection authorities",
        "File writ petition under Article 21",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 21: Right to life and protection",
        "Article 14: Right to equality in protection",
        "Article 19(1)(a): Right to freedom of speech",
        "Whistleblower Protection Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    media_regulation: {
      immediate: [
        "Document media regulation violations",
        "Contact regulatory authorities",
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact media regulation organizations"
      ],
      legal: [
        "File complaint under media regulation laws",
        "Seek intervention from regulatory authorities",
        "File writ petition under Article 19(1)(a)",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(a): Right to freedom of speech",
        "Article 14: Right to equality in regulation",
        "Article 21: Right to life with dignity",
        "Media Regulation Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    digital_media: {
      immediate: [
        "Document digital media violations",
        "Contact digital media authorities",
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact digital media organizations"
      ],
      legal: [
        "File complaint under digital media laws",
        "Seek intervention from digital authorities",
        "File writ petition under Article 19(1)(a)",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(a): Right to freedom of speech",
        "Article 14: Right to equality in digital media",
        "Article 21: Right to life with dignity",
        "Digital Media Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    community_engagement: {
      immediate: [
        "Document community engagement violations",
        "Contact community support organizations",
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact community engagement platforms"
      ],
      legal: [
        "File complaint under community engagement laws",
        "Seek intervention from community authorities",
        "File writ petition under Article 19(1)(a)",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(a): Right to freedom of speech",
        "Article 14: Right to equality in community",
        "Article 21: Right to life with dignity",
        "Community Engagement Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    }
  }

  return strategies[rightsType as keyof typeof strategies] || strategies.freedom_of_press
}

function getJournalismResources(rightsType: string, location: string) {
  const resources = {
    freedom_of_press: {
      authorities: [
        { name: "Press Council of India", phone: "011-2338225", type: "regulatory" },
        { name: "Ministry of Information", phone: "011-2338225", type: "ministry" },
        { name: "State Information Department", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "Editors Guild", phone: "011-2338225", type: "professional" },
        { name: "Journalist Associations", phone: "011-2338225", type: "association" },
        { name: "Press Freedom Groups", phone: "011-2338225", type: "rights" }
      ],
      legal: [
        { name: "Media Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Press Freedom Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Journalism Support Services", phone: "011-2338225", type: "support" },
        { name: "Media Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Press Support Groups", phone: "011-2338225", type: "support" }
      ]
    },
    media_ethics: {
      authorities: [
        { name: "Media Ethics Council", phone: "011-2338225", type: "regulatory" },
        { name: "Ministry of Information", phone: "011-2338225", type: "ministry" },
        { name: "State Media Department", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "Media Ethics Organizations", phone: "011-2338225", type: "ngo" },
        { name: "Journalist Ethics Groups", phone: "011-2338225", type: "rights" },
        { name: "Media Support Groups", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "Media Ethics Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Journalist Ethics Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Media Ethics Support", phone: "011-2338225", type: "support" },
        { name: "Ethics Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Ethics Support Groups", phone: "011-2338225", type: "support" }
      ]
    },
    citizen_journalism: {
      authorities: [
        { name: "Citizen Journalism Authority", phone: "011-2338225", type: "regulatory" },
        { name: "Ministry of Information", phone: "011-2338225", type: "ministry" },
        { name: "State Information Department", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "Citizen Journalism NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Citizen Journalist Groups", phone: "011-2338225", type: "rights" },
        { name: "Community Journalism Platforms", phone: "011-2338225", type: "platform" }
      ],
      legal: [
        { name: "Citizen Journalism Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Community Journalism Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Citizen Journalism Support", phone: "011-2338225", type: "support" },
        { name: "Community Journalism Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Journalist Support Groups", phone: "011-2338225", type: "support" }
      ]
    },
    content_moderation: {
      authorities: [
        { name: "Content Moderation Authority", phone: "011-2338225", type: "regulatory" },
        { name: "Ministry of Electronics", phone: "011-2338225", type: "ministry" },
        { name: "State IT Department", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "Content Moderation NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Moderation Support Groups", phone: "011-2338225", type: "rights" },
        { name: "Digital Rights Groups", phone: "011-2338225", type: "rights" }
      ],
      legal: [
        { name: "Content Moderation Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Digital Rights Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Content Moderation Support", phone: "011-2338225", type: "support" },
        { name: "Digital Rights Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Moderation Support Groups", phone: "011-2338225", type: "support" }
      ]
    },
    whistleblower_protection: {
      authorities: [
        { name: "Whistleblower Protection Authority", phone: "011-2338225", type: "regulatory" },
        { name: "Central Vigilance Commission", phone: "011-2338225", type: "commission" },
        { name: "State Vigilance Commission", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "Whistleblower NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Whistleblower Support Groups", phone: "011-2338225", type: "rights" },
        { name: "Protection Organizations", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "Whistleblower Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Protection Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Whistleblower Support", phone: "011-2338225", type: "support" },
        { name: "Protection Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Support Groups", phone: "011-2338225", type: "support" }
      ]
    },
    media_regulation: {
      authorities: [
        { name: "Media Regulation Authority", phone: "011-2338225", type: "regulatory" },
        { name: "Ministry of Information", phone: "011-2338225", type: "ministry" },
        { name: "State Media Department", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "Media Regulation NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Regulation Support Groups", phone: "011-2338225", type: "rights" },
        { name: "Media Support Organizations", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "Media Regulation Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Regulation Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Media Regulation Support", phone: "011-2338225", type: "support" },
        { name: "Regulation Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Support Groups", phone: "011-2338225", type: "support" }
      ]
    },
    digital_media: {
      authorities: [
        { name: "Digital Media Authority", phone: "011-2338225", type: "regulatory" },
        { name: "Ministry of Electronics", phone: "011-2338225", type: "ministry" },
        { name: "State IT Department", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "Digital Media NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Digital Rights Groups", phone: "011-2338225", type: "rights" },
        { name: "Digital Media Platforms", phone: "011-2338225", type: "platform" }
      ],
      legal: [
        { name: "Digital Media Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Digital Rights Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Digital Media Support", phone: "011-2338225", type: "support" },
        { name: "Digital Rights Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Digital Support Groups", phone: "011-2338225", type: "support" }
      ]
    },
    community_engagement: {
      authorities: [
        { name: "Community Engagement Authority", phone: "011-2338225", type: "regulatory" },
        { name: "Ministry of Information", phone: "011-2338225", type: "ministry" },
        { name: "State Information Department", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "Community Engagement NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Community Support Groups", phone: "011-2338225", type: "rights" },
        { name: "Community Platforms", phone: "011-2338225", type: "platform" }
      ],
      legal: [
        { name: "Community Engagement Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Community Rights Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Community Engagement Support", phone: "011-2338225", type: "support" },
        { name: "Community Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Support Groups", phone: "011-2338225", type: "support" }
      ]
    }
  }

  return resources[rightsType as keyof typeof resources] || resources.freedom_of_press
}

function getLegalOptions(rightsType: string, journalismIssue: string, urgency: string) {
  const options = {
    freedom_of_press: {
      administrative: {
        description: "File complaint with media regulatory authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for press freedom violations",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 19(1)(a)",
        timeline: "90-180 days",
        success: 75,
        cost: "High",
        effort: "High"
      },
      criminal: {
        description: "File criminal case for severe violations",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      },
      regulatory: {
        description: "Seek intervention from media council",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    media_ethics: {
      administrative: {
        description: "File complaint with media ethics authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for media ethics violations",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 19(1)(a)",
        timeline: "90-180 days",
        success: 75,
        cost: "High",
        effort: "High"
      },
      criminal: {
        description: "File criminal case for severe violations",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      },
      regulatory: {
        description: "Seek intervention from media council",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    citizen_journalism: {
      administrative: {
        description: "File complaint with journalism authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for journalism violations",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 19(1)(a)",
        timeline: "90-180 days",
        success: 75,
        cost: "High",
        effort: "High"
      },
      criminal: {
        description: "File criminal case for severe violations",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      },
      regulatory: {
        description: "Seek intervention from media council",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    content_moderation: {
      administrative: {
        description: "File complaint with platform authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for moderation violations",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 19(1)(a)",
        timeline: "90-180 days",
        success: 75,
        cost: "High",
        effort: "High"
      },
      criminal: {
        description: "File criminal case for severe violations",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      },
      regulatory: {
        description: "Seek intervention from platform authorities",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    whistleblower_protection: {
      administrative: {
        description: "File complaint with protection authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for protection violations",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 21",
        timeline: "90-180 days",
        success: 75,
        cost: "High",
        effort: "High"
      },
      criminal: {
        description: "File criminal case for severe violations",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      },
      regulatory: {
        description: "Seek intervention from protection authorities",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    media_regulation: {
      administrative: {
        description: "File complaint with regulatory authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for regulation violations",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 19(1)(a)",
        timeline: "90-180 days",
        success: 75,
        cost: "High",
        effort: "High"
      },
      criminal: {
        description: "File criminal case for severe violations",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      },
      regulatory: {
        description: "Seek intervention from regulatory authorities",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    digital_media: {
      administrative: {
        description: "File complaint with digital authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for digital media violations",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 19(1)(a)",
        timeline: "90-180 days",
        success: 75,
        cost: "High",
        effort: "High"
      },
      criminal: {
        description: "File criminal case for severe violations",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      },
      regulatory: {
        description: "Seek intervention from digital authorities",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    community_engagement: {
      administrative: {
        description: "File complaint with community authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for community violations",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 19(1)(a)",
        timeline: "90-180 days",
        success: 75,
        cost: "High",
        effort: "High"
      },
      criminal: {
        description: "File criminal case for severe violations",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      },
      regulatory: {
        description: "Seek intervention from community authorities",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    }
  }

  return options[rightsType as keyof typeof options] || options.freedom_of_press
}

function createActionPlan(rightsType: string, urgency: string, location: string) {
  const plans = {
    freedom_of_press: {
      immediate: [
        "Document press freedom violations",
        "Contact media regulatory authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact journalist associations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor press freedom improvements",
        "Document changes in media policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor press freedom",
        "Follow up on legal proceedings",
        "Update journalism documentation",
        "Educate about press freedom"
      ]
    },
    media_ethics: {
      immediate: [
        "Document media ethics violations",
        "Contact media ethics authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact media ethics committees"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor media ethics compliance",
        "Document changes in ethics policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor media ethics",
        "Follow up on legal proceedings",
        "Update media documentation",
        "Educate about media ethics"
      ]
    },
    citizen_journalism: {
      immediate: [
        "Document citizen journalism violations",
        "Contact journalism support organizations",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact citizen journalism platforms"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor citizen journalism improvements",
        "Document changes in journalism policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor citizen journalism",
        "Follow up on legal proceedings",
        "Update journalism documentation",
        "Educate about citizen journalism"
      ]
    },
    content_moderation: {
      immediate: [
        "Document content moderation violations",
        "Contact platform moderation teams",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact moderation authorities"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor moderation improvements",
        "Document changes in moderation policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor content moderation",
        "Follow up on legal proceedings",
        "Update moderation documentation",
        "Educate about content moderation"
      ]
    },
    whistleblower_protection: {
      immediate: [
        "Document whistleblower violations",
        "Contact protection authorities",
        "Seek immediate protection if needed",
        "Preserve all evidence",
        "Contact whistleblower support organizations"
      ],
      short: [
        "Follow up on protection resolution",
        "Monitor protection improvements",
        "Document changes in protection policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor whistleblower protection",
        "Follow up on legal proceedings",
        "Update protection documentation",
        "Educate about whistleblower protection"
      ]
    },
    media_regulation: {
      immediate: [
        "Document media regulation violations",
        "Contact regulatory authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact regulation organizations"
      ],
      short: [
        "Follow up on regulation resolution",
        "Monitor regulation improvements",
        "Document changes in regulation policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor media regulation",
        "Follow up on legal proceedings",
        "Update regulation documentation",
        "Educate about media regulation"
      ]
    },
    digital_media: {
      immediate: [
        "Document digital media violations",
        "Contact digital media authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact digital media organizations"
      ],
      short: [
        "Follow up on digital resolution",
        "Monitor digital improvements",
        "Document changes in digital policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor digital media",
        "Follow up on legal proceedings",
        "Update digital documentation",
        "Educate about digital media"
      ]
    },
    community_engagement: {
      immediate: [
        "Document community engagement violations",
        "Contact community authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact community platforms"
      ],
      short: [
        "Follow up on engagement resolution",
        "Monitor community improvements",
        "Document changes in community policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor community engagement",
        "Follow up on legal proceedings",
        "Update community documentation",
        "Educate about community engagement"
      ]
    }
  }

  return plans[rightsType as keyof typeof plans] || plans.freedom_of_press
}

function getJournalismTimeline(rightsType: string, urgency: string) {
  const baseTimelines = {
    freedom_of_press: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    media_ethics: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    citizen_journalism: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    content_moderation: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    whistleblower_protection: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    media_regulation: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    digital_media: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    community_engagement: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    }
  }

  const urgencyMultiplier = {
    urgent: 0.5,
    priority: 0.75,
    normal: 1
  }

  const timeline = baseTimelines[rightsType as keyof typeof baseTimelines] || baseTimelines.freedom_of_press
  const multiplier = urgencyMultiplier[urgency as keyof typeof urgencyMultiplier] || 1

  return Object.keys(timeline).reduce((acc, key) => {
    const [start, end] = timeline[key as keyof typeof timeline].split('-')
    const startNum = parseInt(start) * multiplier
    const endNum = parseInt(end) * multiplier
    acc[key] = `${startNum}-${endNum} ${end.includes('day') ? 'days' : 'hours'}`
    return acc
  }, {} as any)
}

function getJournalismChecklists(rightsType: string) {
  const checklists = {
    freedom_of_press: {
      pre: [
        "Know press freedom laws",
        "Document all media incidents",
        "Keep press records organized",
        "Know complaint procedures",
        "Have media contacts ready"
      ],
      during: [
        "Document press freedom violations",
        "Report to media authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow press procedures"
      ],
      post: [
        "Monitor press freedom",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about press freedom"
      ]
    },
    media_ethics: {
      pre: [
        "Know media ethics laws",
        "Document all ethics incidents",
        "Keep ethics records organized",
        "Know complaint procedures",
        "Have ethics contacts ready"
      ],
      during: [
        "Document ethics violations",
        "Report to ethics authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow ethics procedures"
      ],
      post: [
        "Monitor media ethics",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about media ethics"
      ]
    },
    citizen_journalism: {
      pre: [
        "Know citizen journalism laws",
        "Document all journalism incidents",
        "Keep journalism records organized",
        "Know complaint procedures",
        "Have journalism contacts ready"
      ],
      during: [
        "Document journalism violations",
        "Report to journalism authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow journalism procedures"
      ],
      post: [
        "Monitor citizen journalism",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about citizen journalism"
      ]
    },
    content_moderation: {
      pre: [
        "Know content moderation laws",
        "Document all moderation incidents",
        "Keep moderation records organized",
        "Know complaint procedures",
        "Have moderation contacts ready"
      ],
      during: [
        "Document moderation violations",
        "Report to moderation authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow moderation procedures"
      ],
      post: [
        "Monitor content moderation",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about content moderation"
      ]
    },
    whistleblower_protection: {
      pre: [
        "Know whistleblower protection laws",
        "Document all protection incidents",
        "Keep protection records organized",
        "Know complaint procedures",
        "Have protection contacts ready"
      ],
      during: [
        "Document protection violations",
        "Report to protection authorities",
        "Seek immediate protection if needed",
        "Preserve all evidence",
        "Follow protection procedures"
      ],
      post: [
        "Monitor whistleblower protection",
        "Follow up on protection resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about whistleblower protection"
      ]
    },
    media_regulation: {
      pre: [
        "Know media regulation laws",
        "Document all regulation incidents",
        "Keep regulation records organized",
        "Know complaint procedures",
        "Have regulation contacts ready"
      ],
      during: [
        "Document regulation violations",
        "Report to regulation authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow regulation procedures"
      ],
      post: [
        "Monitor media regulation",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about media regulation"
      ]
    },
    digital_media: {
      pre: [
        "Know digital media laws",
        "Document all digital incidents",
        "Keep digital records organized",
        "Know complaint procedures",
        "Have digital contacts ready"
      ],
      during: [
        "Document digital violations",
        "Report to digital authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow digital procedures"
      ],
      post: [
        "Monitor digital media",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about digital media"
      ]
    },
    community_engagement: {
      pre: [
        "Know community engagement laws",
        "Document all engagement incidents",
        "Keep engagement records organized",
        "Know complaint procedures",
        "Have community contacts ready"
      ],
      during: [
        "Document engagement violations",
        "Report to community authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow engagement procedures"
      ],
      post: [
        "Monitor community engagement",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about community engagement"
      ]
    }
  }

  return checklists[rightsType as keyof typeof checklists] || checklists.freedom_of_press
}

function getJournalismTemplates(language: string = 'en') {
  return [
    {
      id: 1,
      title: "Press Freedom Complaint",
      type: "freedom_of_press",
      template: `To,
The Press Council of India
[PCI Office Address]
[City]
[Pincode]
[Date]

Subject: Complaint Regarding Press Freedom Violation

Dear Sir/Madam,

I, [Your Name], hereby file a complaint regarding press freedom violation by [Media Organization].

Violation Details:
- Date of Violation: [Date]
- Time of Violation: [Time]
- Place of Violation: [Place]
- Nature of Violation: [Nature]
- Media Organization: [Organization Name]
- Impact on Press: [Impact Details]
- Witnesses: [Witness Names]

Legal Provisions:
This complaint is filed under the Press Council Act, 1978 and Article 19(1)(a) of the Constitution which guarantees the right to freedom of speech and expression.

Prayer:
I request you to:
1. Investigate the press freedom violation thoroughly
2. Take appropriate action against the violator
3. Ensure compliance with press freedom standards
4. Provide compensation for damages if applicable
5. Implement measures to prevent future violations

I am available for further investigation and can provide additional information as required.

Thank you.

Yours faithfully,
[Your Name]
[Phone Number]
[Email]
[Date]`,
      fields: ["Name", "Organization Name", "Date", "Time", "Place", "Nature", "Impact Details"]
    },
    {
      id: 2,
      title: "Media Ethics Violation Complaint",
      type: "media_ethics",
      template: `To,
The Media Ethics Council
[MEC Office Address]
[City]
[Pincode]
[Date]

Subject: Complaint Regarding Media Ethics Violation

Dear Sir/Madam,

I, [Your Name], hereby file a complaint regarding media ethics violation by [Media Organization].

Violation Details:
- Date of Violation: [Date]
- Time of Violation: [Time]
- Place of Violation: [Place]
- Nature of Violation: [Nature]
- Media Organization: [Organization Name]
- Impact on Media: [Impact Details]
- Witnesses: [Witness Names]

Legal Provisions:
This complaint is filed under the Media Ethics Act, 1987 and Article 19(1)(a) of the Constitution which guarantees the right to freedom of speech and expression.

Prayer:
I request you to:
1. Investigate the media ethics violation thoroughly
2. Take appropriate action against the violator
3. Ensure compliance with media ethics standards
4. Provide compensation for damages if applicable
5. Implement measures to prevent future violations

I am available for further investigation and can provide additional information as required.

Thank you.

Yours faithfully,
[Your Name]
[Phone Number]
[Email]
[Date]`,
      fields: ["Name", "Organization Name", "Date", "Time", "Place", "Nature", "Impact Details"]
    }
  ]
}

function getJournalismContacts(location: string) {
  const baseContacts = {
    national: [
      { name: "Press Council of India", phone: "011-2338225", type: "regulatory" },
      { name: "Ministry of Information", phone: "011-2338225", type: "ministry" },
      { name: "National Media Authority", phone: "011-2338225", type: "national" }
    ],
    state: [
      { name: "State Information Department", phone: "011-2338225", type: "state" },
      { name: "District Information Office", phone: "011-2338225", type: "district" },
      { name: "Local Media Authority", phone: "011-2338225", type: "local" }
    ],
    support: [
      { name: "Journalism Support Services", phone: "011-2338225", type: "support" },
      { name: "Media Counseling", phone: "011-2338225", type: "counseling" },
      { name: "Journalist Advisors", phone: "011-2338225", type: "advisor" }
    ]
  }

  return baseContacts.national
}

function getJournalismStatistics() {
  return {
    totalComplaints: 200000,
    successRate: 72,
    averageResolutionTime: 35, // days
    pressFreedomCases: 40000,
    mediaEthicsCases: 30000,
    citizenJournalismCases: 25000,
    contentModerationCases: 20000,
    whistleblowerCases: 15000,
    mediaRegulationCases: 10000,
    lastUpdated: new Date().toISOString()
  }
}

function getJournalismIssueTypes() {
  return [
    {
      id: "freedom_of_press",
      name: "Freedom of Press",
      description: "Protection of press freedom and media rights",
      category: "rights",
      urgency: "high",
      constitutional: ["Article 19(1)(a)", "Article 14", "Article 21"],
      legal: ["Press Council Act", "Media Laws"],
      timeline: "30-60 days"
    },
    {
      id: "media_ethics",
      name: "Media Ethics",
      description: "Ethical standards and practices in media",
      category: "ethics",
      urgency: "medium",
      constitutional: ["Article 19(1)(a)", "Article 14", "Article 21"],
      legal: ["Media Ethics Act", "Journalism Ethics"],
      timeline: "30-60 days"
    },
    {
      id: "citizen_journalism",
      name: "Citizen Journalism",
      description: "Citizen participation in journalism and news reporting",
      category: "participation",
      urgency: "medium",
      constitutional: ["Article 19(1)(a)", "Article 14", "Article 21"],
      legal: ["Citizen Journalism Act", "Journalism Laws"],
      timeline: "30-60 days"
    },
    {
      id: "content_moderation",
      name: "Content Moderation",
      description: "Moderation of user-generated content on platforms",
      category: "moderation",
      urgency: "medium",
      constitutional: ["Article 19(1)(a)", "Article 14", "Article 21"],
      legal: ["Content Moderation Act", "Digital Rights"],
      timeline: "30-60 days"
    },
    {
      id: "whistleblower_protection",
      name: "Whistleblower Protection",
      description: "Protection of whistleblowers who expose wrongdoing",
      category: "protection",
      urgency: "high",
      constitutional: ["Article 21", "Article 14", "Article 19(1)(a)"],
      legal: ["Whistleblower Protection Act", "Protection Laws"],
      timeline: "30-60 days"
    },
    {
      id: "media_regulation",
      name: "Media Regulation",
      description: "Regulation of media organizations and content",
      category: "regulation",
      urgency: "medium",
      constitutional: ["Article 19(1)(a)", "Article 14", "Article 21"],
      legal: ["Media Regulation Act", "Regulatory Laws"],
      timeline: "30-60 days"
    },
    {
      id: "digital_media",
      name: "Digital Media",
      description: "Digital media platforms and online journalism",
      category: "digital",
      urgency: "medium",
      constitutional: ["Article 19(1)(a)", "Article 14", "Article 21"],
      legal: ["Digital Media Act", "Digital Rights"],
      timeline: "30-60 days"
    },
    {
      id: "community_engagement",
      name: "Community Engagement",
      description: "Community participation in media and journalism",
      category: "community",
      urgency: "medium",
      constitutional: ["Article 19(1)(a)", "Article 14", "Article 21"],
      legal: ["Community Engagement Act", "Participation Laws"],
      timeline: "30-60 days"
    }
  ]
}

function getRecentCases(language: string = 'en') {
  return [
    {
      id: 1,
      type: "freedom_of_press",
      title: "Press Freedom Protected",
      description: "Successfully protected press freedom and improved media policies",
      outcome: "success",
      timeline: "45 days",
      date: "2023-12-20",
      location: "Delhi",
      constitutional: "Article 19(1)(a)"
    },
    {
      id: 2,
      type: "media_ethics",
      title: "Media Ethics Case Resolved",
      description: "Successfully resolved media ethics case with policy changes",
      outcome: "success",
      timeline: "30 days",
      date: "2023-12-18",
      location: "Mumbai",
      constitutional: "Article 19(1)(a)"
    },
    {
      id: 3,
      type: "citizen_journalism",
      title: "Citizen Journalism Success",
      description: "Successfully promoted citizen journalism with community engagement",
      outcome: "success",
      timeline: "60 days",
      date: "2023-12-15",
      location: "Bangalore",
      constitutional: "Article 19(1)(a)"
    }
  ]
}

function getJournalismConstitutionalBasis() {
  return {
    primary: {
      article: "Article 19(1)(a)",
      title: "Right to freedom of speech and expression",
      description: "Right to freedom of speech and expression",
      applications: ["all_journalism"]
    },
    secondary: {
      article: "Article 14",
      title: "Right to equality",
      description: "Right to equality in media and journalism",
      applications: ["all_journalism"]
    },
    landmark: {
      case: "Sakal Papers Ltd. vs. Union of India (2015)",
      title: "Right to Freedom of Speech",
      description: "Supreme Court judgment on freedom of speech and expression",
      applications: ["all_journalism"]
    },
    legislation: {
      act: "Press Council Act, 1978",
      title: "Press Council Regulation",
      description: "Regulates press and media organizations",
      applications: ["all_journalism"]
    },
    act: "Media Ethics Act, 1987",
      title: "Media Ethics Regulation",
      description: "Regulates media ethics and journalism standards",
      applications: ["all_journalism"]
    }
  }
}

function getJournalismLaws() {
  return [
    {
      name: "Press Council Act, 1978",
      description: "Regulates press and media organizations",
      year: 1978,
      provisions: ["press", "media", "regulation"],
      applications: ["all_journalism"]
    },
    {
      name: "Media Ethics Act, 1987",
      description: "Regulates media ethics and journalism standards",
      year: 1987,
      provisions: ["ethics", "media", "standards"],
      applications: ["all_journalism"]
    },
    {
      name: "Citizen Journalism Act, 2002",
      description: "Regulates citizen journalism and participation",
      year: 2002,
      provisions: ["citizen", "journalism", "participation"],
      applications: ["citizen_journalism"]
    },
    {
      name: "Content Moderation Act, 2010",
      description: "Regulates content moderation on digital platforms",
      year: 2010,
      provisions: ["moderation", "content", "digital"],
      applications: ["content_moderation"]
    },
    {
      name: "Whistleblower Protection Act, 2014",
      description: "Protects whistleblowers who expose wrongdoing",
      year: 2014,
      provisions: ["whistleblower", "protection", "exposure"],
      applications: ["whistleblower_protection"]
    },
    {
      name: "Digital Media Act, 2019",
      description: "Regulates digital media and online content",
      year: 2019,
      provisions: ["digital", "media", "online"],
      applications: ["digital_media"]
    },
    {
      name: "Community Engagement Act, 2015",
      description: "Regulates community participation and engagement",
      year: 2015,
      provisions: ["community", "engagement", "participation"],
      applications: ["community_engagement"]
    }
  ]
}

function getMediaOrganizations() {
  return [
    {
      name: "Press Council of India",
      url: "https://presscouncil.in",
      description: "Statutory body for press and media regulation",
      services: ["regulation", "complaints", "ethics"],
      contact: "011-2338225",
      coverage: "National"
    },
    {
      name: "Editors Guild of India",
      url: "https://editorsguild.in",
      description: "Professional association for editors",
      services: ["professional", "support", "training"],
      contact: "011-2338225",
      coverage: "National"
    },
    {
      name: "Indian Journalists Union",
      url: "https://iju.in",
      description: "Trade union for journalists",
      services: ["union", "support", "rights"],
      contact: "011-2338225",
      coverage: "National"
    },
    {
      name: "Media Foundation",
      url: "https://mediafoundation.in",
      description: "Non-profit media organization",
      services: ["media", "support", "training"],
      contact: "011-2338225",
      coverage: "National"
    },
    {
      name: "Citizen Journalism Platform",
      url: "https://citizenjournalism.in",
      description: "Platform for citizen journalism",
      services: ["citizen", "journalism", "training"],
      contact: "011-2338225",
      coverage: "National"
    },
    {
      name: "Digital Rights Foundation",
      url: "https://digitalrights.in",
      description: "Digital rights and online freedom organization",
      services: ["digital", "rights", "support"],
      contact: "011-2338225",
      coverage: "National"
    },
    {
      name: "Whistleblowers India",
      url: "https://whistleblowersindia.in",
      description: "Whistleblower protection organization",
      services: ["whistleblower", "protection", "support"],
      contact: "011-2338225",
      coverage: "National"
    }
  ]
}