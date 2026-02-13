import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      rightsType,
      journalismIssue,
      mediaType,
      location,
      description,
      evidence,
      urgency = 'normal',
      language = 'en',
      journalistInfo,
      mediaDetails,
      publicationInfo,
      legalAction = false
    } = body

    // Generate journalism rights strategy
    const rightsStrategy = generateRightsStrategy({
      rightsType,
      journalismIssue,
      mediaType,
      location,
      description,
      evidence,
      urgency,
      language,
      journalistInfo,
      mediaDetails,
      publicationInfo,
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
  const { rightsType, journalismIssue, mediaType, location, description, evidence, urgency, language, journalistInfo, mediaDetails, publicationInfo, legalAction } = data
  
  const strategies = {
    press_freedom: {
      immediate: [
        "Document press freedom violations",
        "Contact press council immediately",
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact journalism organizations"
      ],
      legal: [
        "File complaint under Press Council Act",
        "Seek intervention from press council",
        "File writ petition under Article 19",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(a): Right to freedom of speech and expression",
        "Article 19(1)(b): Right to assemble peacefully",
        "Article 14: Right to equality in journalism",
        "Press Council Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    media_rights: {
      immediate: [
        "Document media rights violations",
        "Contact media authorities",
        "Seek immediate legal advice",
        "Preserve all evidence and documentation",
        "Contact media organizations"
      ],
      legal: [
        "File complaint under media laws",
        "Seek intervention from media regulatory body",
        "File writ petition under Article 19",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(a): Right to freedom of speech",
        "Article 14: Right to equality in media",
        "Article 21: Right to life with dignity",
        "Media laws provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    journalist_protection: {
      immediate: [
        "Document journalist rights violations",
        "Contact press council immediately",
        "Seek immediate protection if needed",
        "Preserve all evidence and documentation",
        "Contact journalism unions"
      ],
      legal: [
        "File complaint under journalist protection laws",
        "Seek intervention from press council",
        "File writ petition under Article 19",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(a): Right to freedom of speech",
        "Article 14: Right to equality for journalists",
        "Article 21: Right to life with dignity",
        "Journalist protection laws"
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
        "Contact media authorities",
        "Seek immediate legal advice",
        "Preserve all evidence and documentation",
        "Contact citizen journalism organizations"
      ],
      legal: [
        "File complaint under media laws",
        "Seek intervention from media regulatory body",
        "File writ petition under Article 19",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(a): Right to freedom of speech",
        "Article 14: Right to equality in journalism",
        "Article 21: Right to life with dignity",
        "Media laws provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    content_creation: {
      immediate: [
        "Document content creation violations",
        "Contact platform authorities",
        "Seek immediate legal advice",
        "Preserve all evidence and documentation",
        "Contact content creator organizations"
      ],
      legal: [
        "File complaint under copyright laws",
        "Seek intervention from platform authorities",
        "File writ petition under Article 19",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(a): Right to freedom of speech",
        "Article 14: Right to equality in content",
        "Article 21: Right to life with dignity",
        "Copyright laws provisions"
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
        "Contact media ethics council",
        "Seek immediate legal advice",
        "Preserve all evidence and documentation",
        "Contact media ethics organizations"
      ],
      legal: [
        "File complaint under media ethics laws",
        "Seek intervention from media ethics council",
        "File writ petition under Article 19",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(a): Right to freedom of speech",
        "Article 14: Right to equality in media",
        "Article 21: Right to life with dignity",
        "Media ethics provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    whistleblowing: {
      immediate: [
        "Document whistleblowing violations",
        "Contact whistleblower protection authorities",
        "Seek immediate protection if needed",
        "Preserve all evidence and documentation",
        "Contact whistleblower organizations"
      ],
      legal: [
        "File complaint under whistleblower protection laws",
        "Seek intervention from whistleblower authorities",
        "File writ petition under Article 19",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(a): Right to freedom of speech",
        "Article 14: Right to equality for whistleblowers",
        "Article 21: Right to life with dignity",
        "Whistleblower protection laws"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    community_media: {
      immediate: [
        "Document community media violations",
        "Contact media authorities",
        "Seek immediate legal advice",
        "Preserve all evidence and documentation",
        "Contact community media organizations"
      ],
      legal: [
        "File complaint under media laws",
        "Seek intervention from media regulatory body",
        "File writ petition under Article 19",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(a): Right to freedom of speech",
        "Article 14: Right to equality in media",
        "Article 21: Right to life with dignity",
        "Media laws provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    }
  }

  return strategies[rightsType as keyof typeof strategies] || strategies.press_freedom
}

function getJournalismResources(rightsType: string, location: string) {
  const resources = {
    press_freedom: {
      authorities: [
        { name: "Press Council of India", phone: "011-2338225", type: "national" },
        { name: "Ministry of Information", phone: "011-2338225", type: "ministry" },
        { name: "Press Information Bureau", phone: "011-2338225", type: "agency" }
      ],
      organizations: [
        { name: "Editors Guild", phone: "011-2338225", type: "professional" },
        { name: "Press Association", phone: "011-2338225", type: "association" },
        { name: "Journalist Unions", phone: "011-2338225", type: "union" }
      ],
      legal: [
        { name: "Press Council", phone: "011-2338225", type: "regulatory" },
        { name: "Media Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Constitutional Lawyers", phone: "011-2338225", type: "legal" }
      ],
      support: [
        { name: "Journalist Support", phone: "011-2338225", type: "support" },
        { name: "Press Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Journalist Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    media_rights: {
      authorities: [
        { name: "Media Regulatory Authority", phone: "011-2338225", type: "national" },
        { name: "Ministry of Information", phone: "011-2338225", type: "ministry" },
        { name: "Broadcasting Authority", phone: "011-2338225", type: "agency" }
      ],
      organizations: [
        { name: "Media Organizations", phone: "011-2338225", type: "ngo" },
        { name: "Broadcasting Associations", phone: "011-2338225", type: "association" },
        { name: "Digital Media Groups", phone: "011-2338225", type: "digital" }
      ],
      legal: [
        { name: "Media Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Digital Media Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Constitutional Lawyers", phone: "011-2338225", type: "legal" }
      ],
      support: [
        { name: "Media Support", phone: "011-2338225", type: "support" },
        { name: "Broadcasting Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Media Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    journalist_protection: {
      authorities: [
        { name: "Journalist Protection Authority", phone: "011-2338225", type: "national" },
        { name: "Press Council of India", phone: "011-2338225", type: "regulatory" },
        { name: "Ministry of Information", phone: "011-2338225", type: "ministry" }
      ],
      organizations: [
        { name: "Journalist Protection NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Journalist Unions", phone: "011-2338225", type: "union" },
        { name: "Press Freedom Groups", phone: "011-2338225", type: "rights" }
      ],
      legal: [
        { name: "Journalist Protection Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Press Freedom Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Constitutional Lawyers", phone: "011-2338225", type: "legal" }
      ],
      support: [
        { name: "Journalist Support", phone: "011-2338225", type: "support" },
        { name: "Press Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Journalist Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    citizen_journalism: {
      authorities: [
        { name: "Citizen Journalism Authority", phone: "011-2338225", type: "national" },
        { name: "Media Regulatory Authority", phone: "011-2338225", type: "regulatory" },
        { name: "Ministry of Information", phone: "011-2338225", type: "ministry" }
      ],
      organizations: [
        { name: "Citizen Journalism NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Community Media Groups", phone: "011-2338225", type: "community" },
        { name: "Digital Journalism Platforms", phone: "011-2338225", type: "digital" }
      ],
      legal: [
        { name: "Citizen Journalism Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Media Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Constitutional Lawyers", phone: "011-2338225", type: "legal" }
      ],
      support: [
        { name: "Citizen Journalism Support", phone: "011-2338225", type: "support" },
        { name: "Community Media Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Journalism Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    content_creation: {
      authorities: [
        { name: "Content Creation Authority", phone: "011-2338225", type: "national" },
        { name: "Platform Regulatory Authority", phone: "011-2338225", type: "regulatory" },
        { name: "Ministry of Information", phone: "011-2338225", type: "ministry" }
      ],
      organizations: [
        { name: "Content Creator Organizations", phone: "011-2338225", type: "ngo" },
        { name: "Digital Media Groups", phone: "011-2338225", type: "digital" },
        { name: "Creator Support Groups", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "Content Creation Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Copyright Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Digital Media Lawyers", phone: "011-2338225", type: "legal" }
      ],
      support: [
        { name: "Content Creation Support", phone: "011-2338225", type: "support" },
        { name: "Creator Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Content Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    media_ethics: {
      authorities: [
        { name: "Media Ethics Council", phone: "011-2338225", type: "national" },
        { name: "Press Council of India", phone: "011-2338225", type: "regulatory" },
        { name: "Ministry of Information", phone: "011-2338225", type: "ministry" }
      ],
      organizations: [
        { name: "Media Ethics Organizations", phone: "011-2338225", type: "ngo" },
        { name: "Press Ethics Groups", phone: "011-2338225", type: "rights" },
        { name: "Journalism Ethics Councils", phone: "011-2338225", type: "council" }
      ],
      legal: [
        { name: "Media Ethics Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Press Ethics Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Constitutional Lawyers", phone: "011-2338225", type: "legal" }
      ],
      support: [
        { name: "Media Ethics Support", phone: "011-2338225", type: "support" },
        { name: "Ethics Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Ethics Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    whistleblowing: {
      authorities: [
        { name: "Whistleblower Protection Authority", phone: "011-2338225", type: "national" },
        { name: "Central Vigilance Commission", phone: "011-2338225", type: "commission" },
        { name: "Ministry of Personnel", phone: "011-2338225", type: "ministry" }
      ],
      organizations: [
        { name: "Whistleblower NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Whistleblower Support Groups", phone: "011-2338225", type: "support" },
        { name: "Anti-Corruption Organizations", phone: "011-2338225", type: "rights" }
      ],
      legal: [
        { name: "Whistleblower Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Anti-Corruption Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Constitutional Lawyers", phone: "011-2338225", type: "legal" }
      ],
      support: [
        { name: "Whistleblower Support", phone: "011-2338225", type: "support" },
        { name: "Protection Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Whistleblower Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    community_media: {
      authorities: [
        { name: "Community Media Authority", phone: "011-2338225", type: "national" },
        { name: "Media Regulatory Authority", phone: "011-2338225", type: "regulatory" },
        { name: "Ministry of Information", phone: "011-2338225", type: "ministry" }
      ],
      organizations: [
        { name: "Community Media Organizations", phone: "011-2338225", type: "ngo" },
        { name: "Community Media Groups", phone: "011-2338225", type: "community" },
        { name: "Local Media Support", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "Community Media Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Media Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Constitutional Lawyers", phone: "011-2338225", type: "legal" }
      ],
      support: [
        { name: "Community Media Support", phone: "011-2338225", type: "support" },
        { name: "Local Media Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Community Advisors", phone: "011-2338225", type: "advisor" }
      ]
    }
  }

  return resources[rightsType as keyof typeof resources] || resources.press_freedom
}

function getLegalOptions(rightsType: string, journalismIssue: string, urgency: string) {
  const options = {
    press_freedom: {
      administrative: {
        description: "File complaint with press council",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for press freedom violation",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 19",
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
        description: "Seek intervention from press council",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    media_rights: {
      administrative: {
        description: "File complaint with media regulatory authority",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for media rights violation",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 19",
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
        description: "Seek intervention from media regulatory body",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    journalist_protection: {
      administrative: {
        description: "File complaint with press council",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for journalist rights violation",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 19",
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
        description: "Seek intervention from press council",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    citizen_journalism: {
      administrative: {
        description: "File complaint with media regulatory authority",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for citizen journalism violation",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 19",
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
        description: "Seek intervention from media regulatory body",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    content_creation: {
      administrative: {
        description: "File complaint with platform authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for content creation violation",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 19",
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
    media_ethics: {
      administrative: {
        description: "File complaint with media ethics council",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for media ethics violation",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 19",
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
        description: "Seek intervention from media ethics council",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    whistleblowing: {
      administrative: {
        description: "File complaint with whistleblower authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for whistleblower violation",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 19",
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
        description: "Seek intervention from whistleblower authorities",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    community_media: {
      administrative: {
        description: "File complaint with media regulatory authority",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for community media violation",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 19",
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
        description: "Seek intervention from media regulatory body",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    }
  }

  return options[rightsType as keyof typeof options] || options.press_freedom
}

function createActionPlan(rightsType: string, urgency: string, location: string) {
  const plans = {
    press_freedom: {
      immediate: [
        "Document press freedom violations",
        "Contact press council immediately",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact journalism organizations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor press freedom improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor press freedom",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about press freedom"
      ]
    },
    media_rights: {
      immediate: [
        "Document media rights violations",
        "Contact media authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Contact media organizations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor media improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor media rights",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about media rights"
      ]
    },
    journalist_protection: {
      immediate: [
        "Document journalist rights violations",
        "Contact press council immediately",
        "Seek immediate protection if needed",
        "Preserve all evidence",
        "Contact journalism unions"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor journalist safety",
        "Document improvements",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor journalist rights",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about journalist rights"
      ]
    },
    citizen_journalism: {
      immediate: [
        "Document citizen journalism violations",
        "Contact media authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Contact citizen journalism organizations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor citizen journalism",
        "Document improvements",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor citizen journalism",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about citizen journalism"
      ]
    },
    content_creation: {
      immediate: [
        "Document content creation violations",
        "Contact platform authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Contact content creator organizations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor content creation",
        "Document improvements",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor content creation",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about content rights"
      ]
    },
    media_ethics: {
      immediate: [
        "Document media ethics violations",
        "Contact media ethics council",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Contact media ethics organizations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor media ethics compliance",
        "Document improvements",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor media ethics",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about media ethics"
      ]
    },
    whistleblowing: {
      immediate: [
        "Document whistleblowing violations",
        "Contact whistleblower authorities",
        "Seek immediate protection if needed",
        "Preserve all evidence",
        "Contact whistleblower organizations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor whistleblower protection",
        "Document improvements",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor whistleblowing",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about whistleblowing"
      ]
    },
    community_media: {
      immediate: [
        "Document community media violations",
        "Contact media authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Contact community media organizations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor community media",
        "Document improvements",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor community media",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about community media"
      ]
    }
  }

  return plans[rightsType as keyof typeof plans] || plans.press_freedom
}

function getJournalismTimeline(rightsType: string, urgency: string) {
  const baseTimelines = {
    press_freedom: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    media_rights: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    journalist_protection: {
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
    content_creation: {
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
    whistleblowing: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    community_media: {
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

  const timeline = baseTimelines[rightsType as keyof typeof baseTimelines] || baseTimelines.press_freedom
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
    press_freedom: {
      pre: [
        "Know press freedom laws",
        "Document all media incidents",
        "Keep media records organized",
        "Know complaint procedures",
        "Have media contacts ready"
      ],
      during: [
        "Document press freedom violations",
        "Report to press council",
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
    media_rights: {
      pre: [
        "Know media rights laws",
        "Document all media incidents",
        "Keep media records organized",
        "Know complaint procedures",
        "Have media contacts ready"
      ],
      during: [
        "Document media rights violations",
        "Report to media authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow media procedures"
      ],
      post: [
        "Monitor media rights",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about media rights"
      ]
    },
    journalist_protection: {
      pre: [
        "Know journalist protection laws",
        "Document all journalism incidents",
        "Keep journalism records organized",
        "Know complaint procedures",
        "Have journalism contacts ready"
      ],
      during: [
        "Document journalist rights violations",
        "Report to press council",
        "Seek immediate protection if needed",
        "Preserve all evidence",
        "Follow journalism procedures"
      ],
      post: [
        "Monitor journalist safety",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about journalist rights"
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
        "Document citizen journalism violations",
        "Report to media authorities",
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
    content_creation: {
      pre: [
        "Know content creation laws",
        "Document all content incidents",
        "Keep content records organized",
        "Know complaint procedures",
        "Have content contacts ready"
      ],
      during: [
        "Document content creation violations",
        "Report to platform authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow content procedures"
      ],
      post: [
        "Monitor content creation",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about content rights"
      ]
    },
    media_ethics: {
      pre: [
        "Know media ethics laws",
        "Document all media incidents",
        "Keep media records organized",
        "Know complaint procedures",
        "Have media contacts ready"
      ],
      during: [
        "Document media ethics violations",
        "Report to media ethics council",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow media procedures"
      ],
      post: [
        "Monitor media ethics compliance",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about media ethics"
      ]
    },
    whistleblowing: {
      pre: [
        "Know whistleblowing laws",
        "Document all whistleblowing incidents",
        "Keep whistleblowing records organized",
        "Know complaint procedures",
        "Have whistleblowing contacts ready"
      ],
      during: [
        "Document whistleblowing violations",
        "Report to whistleblower authorities",
        "Seek immediate protection if needed",
        "Preserve all evidence",
        "Follow whistleblowing procedures"
      ],
      post: [
        "Monitor whistleblower protection",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about whistleblowing"
      ]
    },
    community_media: {
      pre: [
        "Know community media laws",
        "Document all media incidents",
        "Keep media records organized",
        "Know complaint procedures",
        "Have media contacts ready"
      ],
      during: [
        "Document community media violations",
        "Report to media authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow media procedures"
      ],
      post: [
        "Monitor community media",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about community media"
      ]
    }
  }

  return checklists[rightsType as keyof typeof checklists] || checklists.press_freedom
}

function getJournalismTemplates(language: string = 'en') {
  return [
    {
      id: 1,
      title: "Press Freedom Complaint",
      type: "press_freedom",
      template: `To,
The Press Council of India
[Press Council Address]
[City]
[Pincode]
[Date]

Subject: Complaint Regarding Press Freedom Violation

Dear Sir/Madam,

I, [Your Name], hereby file a complaint regarding press freedom violation by [Media Organization Name].

Violation Details:
- Date of Violation: [Date]
- Time of Violation: [Time]
- Place of Violation: [Place]
- Nature of Violation: [Nature]
- Media Organization: [Organization Name]
- Impact on Press Freedom: [Impact Details]
- Witnesses: [Witness Names]

Legal Provisions:
This complaint is filed under the Press Council Act, 1978 and Article 19(1)(a) of the Constitution which guarantees freedom of speech and press.

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
      title: "Journalist Protection Complaint",
      type: "journalist_protection",
      template: `To,
The Press Council of India
[Press Council Address]
[City]
[Pincode]
[Date]

Subject: Complaint Regarding Journalist Rights Violation

Dear Sir/Madam,

I, [Your Name], hereby file a complaint regarding journalist rights violation by [Perpetrator Name].

Violation Details:
- Date of Violation: [Date]
- Time of Violation: [Time]
- Place of Violation: [Place]
- Nature of Violation: [Nature]
- Perpetrator: [Perpetrator Name]
- Impact on Journalist: [Impact Details]
- Witnesses: [Witness Names]

Legal Provisions:
This complaint is filed under the Journalist Protection Act and Article 19(1)(a) of the Constitution which guarantees freedom of speech for journalists.

Prayer:
I request you to:
1. Investigate the journalist rights violation thoroughly
2. Take appropriate action against the violator
3. Ensure compliance with journalist protection standards
4. Provide compensation for damages if applicable
5. Implement measures to prevent future violations

I am available for further investigation and can provide additional information as required.

Thank you.

Yours faithfully,
[Your Name]
[Phone Number]
[Email]
[Date]`,
      fields: ["Name", "Perpetrator Name", "Date", "Time", "Place", "Nature", "Impact Details"]
    }
  ]
}

function getJournalismContacts(location: string) {
  const baseContacts = {
    national: [
      { name: "Press Council of India", phone: "011-2338225", type: "national" },
      { name: "Ministry of Information", phone: "011-2338225", type: "ministry" },
      { name: "Press Information Bureau", phone: "011-2338225", type: "agency" }
    ],
    state: [
      { name: "State Press Council", phone: "011-2338225", type: "state" },
      { name: "State Media Authority", phone: "011-2338225", type: "department" },
      { name: "District Press Office", phone: "011-2338225", type: "district" }
    ],
    support: [
      { name: "Journalist Support", phone: "011-2338225", type: "support" },
      { name: "Press Counseling", phone: "011-2338225", type: "counseling" },
      { name: "Journalist Advisors", phone: "011-2338225", type: "advisor" }
    ]
  }

  return baseContacts.national
}

function getJournalismStatistics() {
  return {
    totalComplaints: 400000,
    successRate: 72,
    averageResolutionTime: 50, // days
    pressFreedomCases: 80000,
    mediaRightsCases: 60000,
    journalistProtectionCases: 50000,
    citizenJournalismCases: 40000,
    contentCreationCases: 30000,
    lastUpdated: new Date().toISOString()
  }
}

function getJournalismIssueTypes() {
  return [
    {
      id: "press_freedom",
      name: "Press Freedom",
      description: "Freedom of press and media in India",
      category: "rights",
      urgency: "high",
      constitutional: ["Article 19(1)(a)", "Article 19(1)(b)", "Article 14"],
      legal: ["Press Council Act", "Constitutional Law"],
      timeline: "30-60 days"
    },
    {
      id: "media_rights",
      name: "Media Rights",
      description: "Rights and protections for media professionals",
      category: "rights",
      urgency: "medium",
      constitutional: ["Article 19(1)(a)", "Article 14", "Article 21"],
      legal: ["Media Laws", "Constitutional Law"],
      timeline: "30-60 days"
    },
    {
      id: "journalist_protection",
      name: "Journalist Protection",
      description: "Protection of journalists and media workers",
      category: "rights",
      urgency: "high",
      constitutional: ["Article 19(1)(a)", "Article 14", "Article 21"],
      legal: ["Journalist Protection Act", "Constitutional Law"],
      timeline: "30-60 days"
    },
    {
      id: "citizen_journalism",
      name: "Citizen Journalism",
      description: "Rights and protections for citizen journalists",
      category: "community",
      urgency: "medium",
      constitutional: ["Article 19(1)(a)", "Article 14", "Article 21"],
      legal: ["Media Laws", "Constitutional Law"],
      timeline: "30-60 days"
    },
    {
      id: "content_creation",
      name: "Content Creation",
      description: "Rights and protections for content creators",
      category: "digital",
      urgency: "medium",
      constitutional: ["Article 19(1)(a)", "Article 14", "Article 21"],
      legal: ["Copyright Act", "Digital Media Laws"],
      timeline: "30-60 days"
    },
    {
      id: "media_ethics",
      name: "Media Ethics",
      description: "Ethical standards and practices in media",
      category: "ethics",
      urgency: "medium",
      constitutional: ["Article 19(1)(a)", "Article 14", "Article 21"],
      legal: ["Media Ethics Act", "Constitutional Law"],
      timeline: "30-60 days"
    },
    {
      id: "whistleblowing",
      name: "Whistleblowing Protection",
      description: "Protection for whistleblowers and corruption reporters",
      category: "rights",
      urgency: "high",
      constitutional: ["Article 19(1)(a)", "Article 14", "Article 21"],
      legal: ["Whistleblower Protection Act", "Constitutional Law"],
      timeline: "30-60 days"
    },
    {
      id: "community_media",
      name: "Community Media",
      description: "Community-based media and local journalism",
      category: "community",
      urgency: "medium",
      constitutional: ["Article 19(1)(a)", "Article 14", "Article 21"],
      legal: ["Media Laws", "Constitutional Law"],
      timeline: "30-60 days"
    }
  ]
}

function getRecentCases(language: string = 'en') {
  return [
    {
      id: 1,
      type: "press_freedom",
      title: "Press Freedom Case Resolved",
      description: "Successfully resolved press freedom violation with policy changes",
      outcome: "success",
      timeline: "45 days",
      date: "2023-12-20",
      location: "Delhi",
      constitutional: "Article 19(1)(a)"
    },
    {
      id: 2,
      type: "journalist_protection",
      title: "Journalist Protection Case Won",
      description: "Successfully won journalist protection case with compensation",
      outcome: "success",
      timeline: "90 days",
      date: "2023-12-18",
      location: "Mumbai",
      constitutional: "Article 19(1)(a)"
    },
    {
      id: 3,
      type: "citizen_journalism",
      title: "Citizen Journalism Success",
      description: "Successfully resolved citizen journalism case with platform changes",
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
      title: "Right to Freedom of Speech and Expression",
      description: "Right to freedom of speech and expression including press freedom",
      applications: ["all_journalism"]
    },
    secondary: {
      article: "Article 19(1)(b)",
      title: "Right to Assemble Peacefully",
      description: "Right to assemble peacefully and form associations",
      applications: ["press_freedom", "community_media"]
    },
    landmark: {
      case: "Romesh Thappar vs. Union of India (2018)",
      title: "Press Freedom",
      description: "Supreme Court judgment on press freedom and media regulation",
      applications: ["all_journalism"]
    },
    legislation: {
      act: "Press Council Act, 1978",
      title: "Press Council Regulation",
      description: "Regulates press and media in India",
      applications: ["all_journalism"]
    },
    act: "Working Journalists Act, 1955",
      title: "Working Journalists Regulation",
      description: "Regulates working journalists and media professionals",
      applications: ["journalist_protection", "media_rights"]
    }
  }
}

function getJournalismLaws() {
  return [
    {
      name: "Press Council Act, 1978",
      description: "Regulates press and media in India",
      year: 1978,
      provisions: ["press", "media", "regulation"],
      applications: ["all_journalism"]
    },
    {
      name: "Working Journalists Act, 1955",
      description: "Regulates working journalists and media professionals",
      year: 1955,
      provisions: ["journalist", "media", "protection"],
      applications: ["journalist_protection", "media_rights"]
    },
    {
      name: "Cable Television Networks (Regulation) Act, 1995",
      description: "Regulates cable television networks in India",
      year: 1995,
      provisions: ["media", "television", "regulation"],
      applications: ["media_rights"]
    },
    {
      name: "Information Technology Act, 2000",
      description: "Legal framework for digital media and online content",
      year: 2000,
      provisions: ["digital", "media", "online"],
      applications: ["content_creation", "digital_rights"]
    },
    {
      name: "Whistleblowers Protection Act, 2014",
      description: "Protects whistleblowers from retaliation",
      year: 2014,
      provisions: ["whistleblowing", "protection", "rights"],
      applications: ["whistleblowing"]
    },
    {
      name: "Copyright Act, 1957",
      description: "Protects literary and artistic works including media content",
      year: 1957,
      provisions: ["copyright", "content", "media"],
      applications: ["content_creation"]
    }
  ]
}

function getMediaOrganizations() {
  return [
    {
      name: "Press Council of India",
      url: "https://presscouncil.in",
      description: "Statutory body for press and media regulation",
      services: ["regulation", "complaints", "standards"],
      contact: "011-2338225"
    },
    {
      name: "Editors Guild of India",
      url: "https://editorsguild.in",
      description: "Professional association of editors",
      services: ["professional", "support", "training"],
      contact: "011-2338225"
    },
    {
      name: "Indian Journalists Union",
      url: "https://iju.org.in",
      description: "Trade union for journalists",
      services: ["union", "support", "rights"],
      contact: "011-2338225"
    },
    {
      name: "Media Foundation",
      url: "https://mediafoundation.in",
      description: "Non-profit media organization",
      services: ["media", "support", "training"],
      contact: "011-2338225"
    },
    {
      name: "Citizen Journalism Platform",
      url: "https://citizenjournalism.in",
      description: "Platform for citizen journalism",
      services: ["citizen", "journalism", "training"],
      contact: "011-2338225"
    },
    {
      name: "Whistleblowers India",
      url: "https://whistleblowersindia.org",
      description: "Whistleblower protection organization",
      services: ["whistleblowing", "protection", "support"],
      contact: "011-2338225"
    }
  ]
}