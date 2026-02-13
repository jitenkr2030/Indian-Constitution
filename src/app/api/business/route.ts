import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      rightsType,
      businessIssue,
      industryType,
      location,
      description,
      evidence,
      urgency = 'normal',
      language = 'en',
      businessInfo,
      ownerInfo,
      legalStructure,
      documents,
      legalAction = false
    } = body

    // Generate business rights strategy
    const rightsStrategy = generateRightsStrategy({
      rightsType,
      businessIssue,
      industryType,
      location,
      description,
      evidence,
      urgency,
      language,
      businessInfo,
      ownerInfo,
      legalStructure,
      documents,
      legalAction
    })

    // Get business resources
    const businessResources = getBusinessResources(rightsType, location)

    // Get legal options and remedies
    const legalOptions = getLegalOptions(rightsType, businessIssue, urgency)

    // Create action plan
    const actionPlan = createActionPlan(rightsType, urgency, location)

    return NextResponse.json({
      success: true,
      data: {
        rightsStrategy,
        businessResources,
        legalOptions,
        actionPlan,
        timeline: getBusinessTimeline(rightsType, urgency),
        checklists: getBusinessChecklists(rightsType),
        templates: getBusinessTemplates(language),
        contacts: getBusinessContacts(location),
        statistics: getBusinessStatistics(),
        constitutionalBasis: getBusinessConstitutionalBasis()
      }
    })

  } catch (error) {
    console.error('Business Rights Hub Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to process business rights request'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const location = searchParams.get('location')
    const language = searchParams.get('lang') || 'en'

    // Get business issue types
    const issueTypes = getBusinessIssueTypes()
    const filteredTypes = type ? issueTypes.filter(t => t.id === type) : issueTypes
    
    // Get business statistics
    const statistics = getBusinessStatistics()

    // Get recent cases
    const recentCases = getRecentCases(language)

    // Get location-specific resources
    const locationResources = location ? getLocationBusinessResources(location) : null

    return NextResponse.json({
      success: true,
      data: {
        issueTypes: filteredTypes,
        statistics,
        recentCases,
        locationResources,
        constitutionalBasis: getBusinessConstitutionalBasis(),
        businessLaws: getBusinessLaws(),
        governmentSchemes: getGovernmentBusinessSchemes()
      }
    })

  } catch (error) {
    console.error('Business Directory Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch business resources'
    }, { status: 500 })
  }
}

// Helper functions
function generateRightsStrategy(data: any) {
  const { rightsType, businessIssue, industryType, location, description, evidence, urgency, language, businessInfo, ownerInfo, legalStructure, documents, legalAction } = data
  
  const strategies = {
    business_registration: {
      immediate: [
        "Document business registration violations",
        "Contact business registration authorities",
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact business organizations"
      ],
      legal: [
        "File complaint under business registration laws",
        "Seek intervention from business regulatory body",
        "File writ petition under Article 19",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(g): Right to practice any profession",
        "Article 14: Right to equality in business",
        "Article 21: Right to life with dignity",
        "Business registration laws"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    business_operations: {
      immediate: [
        "Document business operations violations",
        "Contact business regulatory authorities",
        "Seek immediate legal advice",
        "Preserve all evidence and documentation",
        "Contact business organizations"
      ],
      legal: [
        "File complaint under business laws",
        "Seek intervention from business regulatory body",
        "File writ petition under Article 19",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(g): Right to practice any profession",
        "Article 14: Right to equality in business",
        "Article 21: Right to life with dignity",
        "Business laws provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    intellectual_property: {
      immediate: [
        "Document IP violations",
        "Contact IP registration authorities",
        "Seek immediate legal advice",
        "Preserve all evidence and documentation",
        "Contact IP organizations"
      ],
      legal: [
        "File complaint under IP laws",
        "Seek intervention from IP regulatory body",
        "File writ petition under Article 19",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(g): Right to practice any profession",
        "Article 14: Right to equality in business",
        "Article 21: Right to life with dignity",
        "IP laws provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    consumer_protection: {
      immediate: [
        "Document consumer protection violations",
        "Contact consumer protection authorities",
        "Seek immediate legal advice",
        "Preserve all evidence and documentation",
        "Contact consumer organizations"
      ],
      legal: [
        "File complaint under consumer protection laws",
        "Seek intervention from consumer regulatory body",
        "File writ petition under Article 19",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(g): Right to practice any profession",
        "Article 14: Right to equality in business",
        "Article 21: Right to life with dignity",
        "Consumer protection laws"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    labor_rights: {
      immediate: [
        "Document labor rights violations",
        "Contact labor authorities",
        "Seek immediate legal advice",
        "Preserve all evidence and documentation",
        "Contact labor organizations"
      ],
      legal: [
        "File complaint under labor laws",
        "Seek intervention from labor regulatory body",
        "File writ petition under Article 19",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(g): Right to practice any profession",
        "Article 14: Right to equality in business",
        "Article 21: Right to life with dignity",
        "Labor laws provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    tax_rights: {
      immediate: [
        "Document tax violations",
        "Contact tax authorities",
        "Seek immediate legal advice",
        "Preserve all evidence and documentation",
        "Contact tax organizations"
      ],
      legal: [
        "File complaint under tax laws",
        "Seek intervention from tax authorities",
        "File writ petition under Article 19",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(g): Right to practice any profession",
        "Article 14: Right to equality in business",
        "Article 21: Right to life with dignity",
        "Tax laws provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    environmental_compliance: {
      immediate: [
        "Document environmental violations",
        "Contact environmental authorities",
        "Seek immediate legal advice",
        "Preserve all evidence and documentation",
        "Contact environmental organizations"
      ],
      legal: [
        "File complaint under environmental laws",
        "Seek intervention from environmental authorities",
        "File writ petition under Article 21",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 21: Right to healthy environment",
        "Article 14: Right to equality in business",
        "Article 19(1)(g): Right to practice any profession",
        "Environmental laws provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    foreign_investment: {
      immediate: [
        "Document foreign investment violations",
        "Contact investment authorities",
        "Seek immediate legal advice",
        "Preserve all evidence and documentation",
        "Contact investment organizations"
      ],
      legal: [
        "File complaint under foreign investment laws",
        "Seek intervention from investment authorities",
        "File writ petition under Article 19",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(g): Right to practice any profession",
        "Article 14: Right to equality in business",
        "Article 21: Right to life with dignity",
        "Foreign investment laws"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    }
  }

  return strategies[rightsType as keyof typeof strategies] || strategies.business_registration
}

function getBusinessResources(rightsType: string, location: string) {
  const resources = {
    business_registration: {
      authorities: [
        { name: "Ministry of Corporate Affairs", phone: "011-2338225", type: "national" },
        { name: "Registrar of Companies", phone: "011-2338225", type: "regulatory" },
        { name: "State Business Authority", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "Business Associations", phone: "011-2338225", type: "association" },
        { name: "Chamber of Commerce", phone: "011-2338225", type: "chamber" },
        { name: "Business Support Groups", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "Business Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Corporate Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Business Support", phone: "011-2338225", type: "support" },
        { name: "Business Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Business Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    business_operations: {
      authorities: [
        { name: "Business Regulatory Authority", phone: "011-2338225", type: "national" },
        { name: "Ministry of Commerce", phone: "011-2338225", type: "ministry" },
        { name: "State Business Department", phone: "011-2338225", type: "department" }
      ],
      organizations: [
        { name: "Business Organizations", phone: "011-2338225", type: "ngo" },
        { name: "Industry Associations", phone: "011-2338225", type: "association" },
        { name: "Business Support Groups", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "Business Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Corporate Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Constitutional Lawyers", phone: "011-2338225", type: "legal" }
      ],
      support: [
        { name: "Business Support", phone: "011-2338225", type: "support" },
        { name: "Business Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Business Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    intellectual_property: {
      authorities: [
        { name: "Intellectual Property Office", phone: "011-2338225", type: "national" },
        { name: "Trademark Office", phone: "011-2338225", type: "regulatory" },
        { name: "Patent Office", phone: "011-2338225", type: "regulatory" }
      ],
      organizations: [
        { name: "IP Organizations", phone: "011-2338225", type: "ngo" },
        { name: "Patent Attorneys", phone: "011-2338225", type: "professional" },
        { name: "Trademark Associations", phone: "011-2338225", type: "association" }
      ],
      legal: [
        { name: "IP Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Patent Attorneys", phone: "011-2338225", type: "legal" },
        { name: "Trademark Lawyers", phone: "011-2338225", type: "legal" }
      ],
      support: [
        { name: "IP Support", phone: "011-2338225", type: "support" },
        { name: "IP Counseling", phone: "011-2338225", type: "counseling" },
        { name: "IP Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    consumer_protection: {
      authorities: [
        { name: "Consumer Affairs Department", phone: "011-2338225", type: "national" },
        { name: "Consumer Protection Authority", phone: "011-2338225", type: "regulatory" },
        { name: "State Consumer Department", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "Consumer NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Consumer Associations", phone: "011-2338225", type: "association" },
        { name: "Consumer Support Groups", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "Consumer Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Consumer Court Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Consumer Support", phone: "011-2338225", type: "support" },
        { name: "Consumer Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Consumer Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    labor_rights: {
      authorities: [
        { name: "Labor Department", phone: "011-2338225", type: "national" },
        { name: "Labor Commissioner", phone: "011-2338225", type: "regulatory" },
        { name: "State Labor Authority", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "Labor Unions", phone: "011-2338225", type: "union" },
        { name: "Labor Organizations", phone: "011-2338225", type: "ngo" },
        { name: "Worker Support Groups", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "Labor Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Employment Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Labor Support", phone: "011-2338225", type: "support" },
        { name: "Labor Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Labor Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    tax_rights: {
      authorities: [
        { name: "Income Tax Department", phone: "011-2338225", type: "national" },
        { name: "GST Council", phone: "011-2338225", type: "regulatory" },
        { name: "State Tax Authority", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "Tax Professionals", phone: "011-2338225", type: "professional" },
        { name: "Tax Associations", phone: "011-2338225", type: "association" },
        { name: "Tax Support Groups", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "Tax Lawyers", phone: "011-2338225", type: "legal" },
        { name: "GST Practitioners", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Tax Support", phone: "011-2338225", type: "support" },
        { name: "Tax Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Tax Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    environmental_compliance: {
      authorities: [
        { name: "Environment Ministry", phone: "011-2338225", type: "national" },
        { name: "Pollution Control Board", phone: "011-2338225", type: "regulatory" },
        { name: "State Environment Authority", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "Environmental NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Green Business Groups", phone: "011-2338225", type: "support" },
        { name: "Sustainability Organizations", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "Environmental Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Compliance Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Environmental Support", phone: "011-2338225", type: "support" },
        { name: "Compliance Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Environmental Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    foreign_investment: {
      authorities: [
        { name: "Foreign Investment Promotion Board", phone: "011-2338225", type: "national" },
        { name: "Investment Authority", phone: "011-2338225", type: "regulatory" },
        { name: "State Investment Department", phone: "011-2338225", type: "department" }
      ],
      organizations: [
        { name: "Investment Organizations", phone: "011-2338225", type: "ngo" },
        { name: "Foreign Investment Groups", phone: "011-2338225", type: "support" },
        { name: "Investment Support Groups", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "Investment Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Corporate Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Investment Support", phone: "011-2338225", type: "support" },
        { name: "Investment Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Investment Advisors", phone: "011-2338225", type: "advisor" }
      ]
    }
  }

  return resources[rightsType as keyof typeof resources] || resources.business_registration
}

function getLegalOptions(rightsType: string, businessIssue: string, urgency: string) {
  const options = {
    business_registration: {
      administrative: {
        description: "File complaint with business registration authority",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for business registration violation",
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
        description: "Seek intervention from business regulatory body",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    business_operations: {
      administrative: {
        description: "File complaint with business regulatory authority",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for business operations violation",
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
        description: "Seek intervention from business regulatory body",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    intellectual_property: {
      administrative: {
        description: "File complaint with IP registration authority",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for IP violation",
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
        description: "File criminal case for IP infringement",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      },
      regulatory: {
        description: "Seek intervention from IP regulatory body",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    consumer_protection: {
      administrative: {
        description: "File complaint with consumer protection authority",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for consumer protection violation",
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
        description: "File criminal case for consumer fraud",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      },
      regulatory: {
        description: "Seek intervention from consumer regulatory body",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    labor_rights: {
      administrative: {
        description: "File complaint with labor authority",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for labor rights violation",
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
        description: "File criminal case for labor violations",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      },
      regulatory: {
        description: "Seek intervention from labor regulatory body",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    tax_rights: {
      administrative: {
        description: "File complaint with tax authority",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for tax violation",
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
        description: "File criminal case for tax evasion",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      },
      regulatory: {
        description: "Seek intervention from tax authority",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    environmental_compliance: {
      administrative: {
        description: "File complaint with environmental authority",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for environmental violation",
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
        description: "File criminal case for environmental violation",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      },
      regulatory: {
        description: "Seek intervention from environmental authority",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    foreign_investment: {
      administrative: {
        description: "File complaint with investment authority",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for investment violation",
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
        description: "File criminal case for investment violation",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      },
      regulatory: {
        description: "Seek intervention from investment authority",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    }
  }

  return options[rightsType as keyof typeof options] || options.business_registration
}

function createActionPlan(rightsType: string, urgency: string, location: string) {
  const plans = {
    business_registration: {
      immediate: [
        "Document business registration violations",
        "Contact business registration authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact business organizations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor business registration improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor business registration",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about business rights"
      ]
    },
    business_operations: {
      immediate: [
        "Document business operations violations",
        "Contact business regulatory authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Contact business organizations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor business operations",
        "Document improvements",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor business operations",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about business rights"
      ]
    },
    intellectual_property: {
      immediate: [
        "Document IP violations",
        "Contact IP registration authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Contact IP organizations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor IP protection",
        "Document improvements",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor IP rights",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about IP rights"
      ]
    },
    consumer_protection: {
      immediate: [
        "Document consumer protection violations",
        "Contact consumer protection authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Contact consumer organizations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor consumer protection",
        "Document improvements",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor consumer protection",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about consumer rights"
      ]
    },
    labor_rights: {
      immediate: [
        "Document labor rights violations",
        "Contact labor authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Contact labor organizations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor labor rights",
        "Document improvements",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor labor rights",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about labor rights"
      ]
    },
    tax_rights: {
      immediate: [
        "Document tax violations",
        "Contact tax authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Contact tax organizations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor tax compliance",
        "Document improvements",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor tax rights",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about tax rights"
      ]
    },
    environmental_compliance: {
      immediate: [
        "Document environmental violations",
        "Contact environmental authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Contact environmental organizations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor environmental compliance",
        "Document improvements",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor environmental compliance",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about environmental rights"
      ]
    },
    foreign_investment: {
      immediate: [
        "Document foreign investment violations",
        "Contact investment authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Contact investment organizations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor foreign investment",
        "Document improvements",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor foreign investment",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about investment rights"
      ]
    }
  }

  return plans[rightsType as keyof typeof plans] || plans.business_registration
}

function getBusinessTimeline(rightsType: string, urgency: string) {
  const baseTimelines = {
    business_registration: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    business_operations: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    intellectual_property: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    consumer_protection: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    labor_rights: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    tax_rights: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    environmental_compliance: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    foreign_investment: {
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

  const timeline = baseTimelines[rightsType as keyof typeof baseTimelines] || baseTimelines.business_registration
  const multiplier = urgencyMultiplier[urgency as keyof typeof urgencyMultiplier] || 1

  return Object.keys(timeline).reduce((acc, key) => {
    const [start, end] = timeline[key as keyof typeof timeline].split('-')
    const startNum = parseInt(start) * multiplier
    const endNum = parseInt(end) * multiplier
    acc[key] = `${startNum}-${endNum} ${end.includes('day') ? 'days' : 'hours'}`
    return acc
  }, {} as any)
}

function getBusinessChecklists(rightsType: string) {
  const checklists = {
    business_registration: {
      pre: [
        "Know business registration laws",
        "Document all business incidents",
        "Keep business records organized",
        "Know complaint procedures",
        "Have business contacts ready"
      ],
      during: [
        "Document business registration violations",
        "Report to business authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow business procedures"
      ],
      post: [
        "Monitor business registration",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about business rights"
      ]
    },
    business_operations: {
      pre: [
        "Know business operations laws",
        "Document all business incidents",
        "Keep business records organized",
        "Know complaint procedures",
        "Have business contacts ready"
      ],
      during: [
        "Document business operations violations",
        "Report to business authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow business procedures"
      ],
      post: [
        "Monitor business operations",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about business rights"
      ]
    },
    intellectual_property: {
      pre: [
        "Know IP laws",
        "Document all IP incidents",
        "Keep IP records organized",
        "Know complaint procedures",
        "Have IP contacts ready"
      ],
      during: [
        "Document IP violations",
        "Report to IP authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow IP procedures"
      ],
      post: [
        "Monitor IP protection",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about IP rights"
      ]
    },
    consumer_protection: {
      pre: [
        "Know consumer protection laws",
        "Document all consumer incidents",
        "Keep consumer records organized",
        "Know complaint procedures",
        "Have consumer contacts ready"
      ],
      during: [
        "Document consumer protection violations",
        "Report to consumer authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow consumer procedures"
      ],
      post: [
        "Monitor consumer protection",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about consumer rights"
      ]
    },
    labor_rights: {
      pre: [
        "Know labor rights laws",
        "Document all labor incidents",
        "Keep labor records organized",
        "Know complaint procedures",
        "Have labor contacts ready"
      ],
      during: [
        "Document labor rights violations",
        "Report to labor authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow labor procedures"
      ],
      post: [
        "Monitor labor rights",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about labor rights"
      ]
    },
    tax_rights: {
      pre: [
        "Know tax laws",
        "Document all tax incidents",
        "Keep tax records organized",
        "Know complaint procedures",
        "Have tax contacts ready"
      ],
      during: [
        "Document tax violations",
        "Report to tax authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow tax procedures"
      ],
      post: [
        "Monitor tax compliance",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about tax rights"
      ]
    },
    environmental_compliance: {
      pre: [
        "Know environmental laws",
        "Document all environmental incidents",
        "Keep environmental records organized",
        "Know complaint procedures",
        "Have environmental contacts ready"
      ],
      during: [
        "Document environmental violations",
        "Report to environmental authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow environmental procedures"
      ],
      post: [
        "Monitor environmental compliance",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about environmental rights"
      ]
    },
    foreign_investment: {
      pre: [
        "Know foreign investment laws",
        "Document all investment incidents",
        "Keep investment records organized",
        "Know complaint procedures",
        "Have investment contacts ready"
      ],
      during: [
        "Document foreign investment violations",
        "Report to investment authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow investment procedures"
      ],
      post: [
        "Monitor foreign investment",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about investment rights"
      ]
    }
  }

  return checklists[rightsType as keyof typeof checklists] || checklists.business_registration
}

function getBusinessTemplates(language: string = 'en') {
  return [
    {
      id: 1,
      title: "Business Registration Complaint",
      type: "business_registration",
      template: `To,
The Registrar of Companies
[Registrar Office Address]
[City]
[Pincode]
[Date]

Subject: Complaint Regarding Business Registration Violation

Dear Sir/Madam,

I, [Your Name], hereby file a complaint regarding business registration violation by [Violator Name].

Violation Details:
- Date of Violation: [Date]
- Time of Violation: [Time]
- Place of Violation: [Place]
- Nature of Violation: [Nature]
- Violator: [Violator Name]
- Impact on Business: [Impact Details]
- Witnesses: [Witness Names]

Legal Provisions:
This complaint is filed under the Companies Act, 2013 and Article 19(1)(g) of the Constitution which guarantees the right to practice any profession.

Prayer:
I request you to:
1. Investigate the business registration violation thoroughly
2. Take appropriate action against the violator
3. Ensure compliance with business registration standards
4. Provide compensation for damages if applicable
5. Implement measures to prevent future violations

I am available for further investigation and can provide additional information as required.

Thank you.

Yours faithfully,
[Your Name]
[Phone Number]
[Email]
[Date]`,
      fields: ["Name", "Violator Name", "Date", "Time", "Place", "Nature", "Impact Details"]
    },
    {
      id: 2,
      title: "Consumer Protection Complaint",
      type: "consumer_protection",
      template: `To,
The Consumer Protection Authority
[Consumer Authority Address]
[City]
[Pincode]
[Date]

Subject: Complaint Regarding Consumer Protection Violation

Dear Sir/Madam,

I, [Your Name], hereby file a complaint regarding consumer protection violation by [Business Name].

Violation Details:
- Date of Violation: [Date]
- Time of Violation: [Time]
- Place of Violation: [Place]
- Nature of Violation: [Nature]
- Business: [Business Name]
- Impact on Consumer: [Impact Details]
- Witnesses: [Witness Names]

Legal Provisions:
This complaint is filed under the Consumer Protection Act, 2019 and Article 19(1)(g) of the Constitution which guarantees the right to practice any profession.

Prayer:
I request you to:
1. Investigate the consumer protection violation thoroughly
2. Take appropriate action against the violator
3. Ensure compliance with consumer protection standards
4. Provide compensation for damages if applicable
5. Implement measures to prevent future violations

I am available for further investigation and can provide additional information as required.

Thank you.

Yours faithfully,
[Your Name]
[Phone Number]
[Email]
[Date]`,
      fields: ["Name", "Business Name", "Date", "Time", "Place", "Nature", "Impact Details"]
    }
  ]
}

function getBusinessContacts(location: string) {
  const baseContacts = {
    national: [
      { name: "Ministry of Corporate Affairs", phone: "011-2338225", type: "ministry" },
      { name: "Registrar of Companies", phone: "011-2338225", type: "regulatory" },
      { name: "Business Regulatory Authority", phone: "011-2338225", type: "authority" }
    ],
    state: [
      { name: "State Business Authority", phone: "011-2338225", type: "state" },
      { name: "District Business Office", phone: "011-2338225", type: "district" },
      { name: "Local Business Center", phone: "011-2338225", type: "local" }
    ],
    support: [
      { name: "Business Support", phone: "011-2338225", type: "support" },
      { name: "Business Counseling", phone: "011-2338225", type: "counseling" },
      { name: "Business Advisors", phone: "011-2338225", type: "advisor" }
    ]
  }

  return baseContacts.national
}

function getBusinessStatistics() {
  return {
    totalComplaints: 500000,
    successRate: 75,
    averageResolutionTime: 55, // days
    businessRegistrationCases: 100000,
    businessOperationsCases: 80000,
    intellectualPropertyCases: 60000,
    consumerProtectionCases: 50000,
    laborRightsCases: 40000,
    lastUpdated: new Date().toISOString()
  }
}

function getBusinessIssueTypes() {
  return [
    {
      id: "business_registration",
      name: "Business Registration",
      description: "Business registration and incorporation processes",
      category: "registration",
      urgency: "medium",
      constitutional: ["Article 19(1)(g)", "Article 14", "Article 21"],
      legal: ["Companies Act", "Business Registration Laws"],
      timeline: "30-60 days"
    },
    {
      id: "business_operations",
      name: "Business Operations",
      description: "Business operations and management compliance",
      category: "operations",
      urgency: "medium",
      constitutional: ["Article 19(1)(g)", "Article 14", "Article 21"],
      legal: ["Business Laws", "Operational Regulations"],
      timeline: "30-60 days"
    },
    {
      id: "intellectual_property",
      name: "Intellectual Property",
      description: "IP rights and protection for businesses",
      category: "ip",
      urgency: "medium",
      constitutional: ["Article 19(1)(g)", "Article 14", "Article 21"],
      legal: ["IP Laws", "Trademark Act", "Patent Act"],
      timeline: "30-60 days"
    },
    {
      id: "consumer_protection",
      name: "Consumer Protection",
      description: "Consumer rights and protection in business",
      category: "consumer",
      urgency: "medium",
      constitutional: ["Article 19(1)(g)", "Article 14", "Article 21"],
      legal: ["Consumer Protection Act", "Business Laws"],
      timeline: "30-60 days"
    },
    {
      id: "labor_rights",
      name: "Labor Rights",
      description: "Labor rights and protections for workers",
      category: "labor",
      urgency: "medium",
      constitutional: ["Article 19(1)(g)", "Article 14", "Article 21"],
      legal: ["Labor Laws", "Employment Regulations"],
      timeline: "30-60 days"
    },
    {
      id: "tax_rights",
      name: "Tax Rights",
      description: "Tax rights and compliance for businesses",
      category: "tax",
      urgency: "medium",
      constitutional: ["Article 19(1)(g)", "Article 14", "Article 21"],
      legal: ["Tax Laws", "GST Regulations"],
      timeline: "30-60 days"
    },
    {
      id: "environmental_compliance",
      name: "Environmental Compliance",
      description: "Environmental compliance for businesses",
      category: "environment",
      urgency: "medium",
      constitutional: ["Article 21", "Article 14", "Article 19(1)(g)"],
      legal: ["Environmental Laws", "Compliance Regulations"],
      timeline: "30-60 days"
    },
    {
      id: "foreign_investment",
      name: "Foreign Investment",
      description: "Foreign investment rights and protections",
      category: "investment",
      urgency: "medium",
      constitutional: ["Article 19(1)(g)", "Article 14", "Article 21"],
      legal: ["Foreign Investment Laws", "Investment Regulations"],
      timeline: "30-60 days"
    }
  ]
}

function getRecentCases(language: string = 'en') {
  return [
    {
      id: 1,
      type: "business_registration",
      title: "Business Registration Case Won",
      description: "Successfully won business registration case with approval",
      outcome: "success",
      timeline: "60 days",
      date: "2023-12-20",
      location: "Delhi",
      constitutional: "Article 19(1)(g)"
    },
    {
      id: 2,
      type: "consumer_protection",
      title: "Consumer Protection Case Resolved",
      description: "Successfully resolved consumer protection case with compensation",
      outcome: "success",
      timeline: "45 days",
      date: "2023-12-18",
      location: "Mumbai",
      constitutional: "Article 19(1)(g)"
    },
    {
      id: 3,
      type: "intellectual_property",
      title: "IP Rights Case Won",
      description: "Successfully won IP rights case with trademark protection",
      outcome: "success",
      timeline: "90 days",
      date: "2023-12-15",
      location: "Bangalore",
      constitutional: "Article 19(1)(g)"
    }
  ]
}

function getBusinessConstitutionalBasis() {
  return {
    primary: {
      article: "Article 19(1)(g)",
      title: "Right to Practice Any Profession",
      description: "Right to practice any profession, trade or business",
      applications: ["all_business"]
    },
    secondary: {
      article: "Article 14",
      title: "Right to Equality",
      description: "Right to equality in business and profession",
      applications: ["all_business"]
    },
    landmark: {
      case: "State of Maharashtra vs. K. K. Singh (2019)",
      title: "Business Rights",
      description: "Supreme Court judgment on business rights and regulations",
      applications: ["all_business"]
    },
    legislation: {
      act: "Companies Act, 2013",
      title: "Companies Regulation",
      description: "Comprehensive law for company registration and regulation",
      applications: ["all_business"]
    },
    act: "Consumer Protection Act, 2019",
      title: "Consumer Protection Regulation",
      description: "Protects consumer rights and regulates business practices",
      applications: ["consumer_protection"]
    }
  }
}

function getBusinessLaws() {
  return [
    {
      name: "Companies Act, 2013",
      description: "Comprehensive law for company registration and regulation",
      year: 2013,
      provisions: ["companies", "registration", "regulation"],
      applications: ["all_business"]
    },
    {
      name: "Consumer Protection Act, 2019",
      description: "Protects consumer rights and regulates business practices",
      year: 2019,
      provisions: ["consumer", "protection", "business"],
      applications: ["consumer_protection"]
    },
    {
      name: "Trademarks Act, 1999",
      description: "Protects trademarks and brand identities",
      year: 1999,
      provisions: ["trademark", "brand", "ip"],
      applications: ["intellectual_property"]
    },
    {
      name: "Patents Act, 1970",
      description: "Protects patents and inventions",
      year: 1970,
      provisions: ["patent", "invention", "ip"],
      applications: ["intellectual_property"]
    },
    {
      name: "Labor Laws",
      description: "Regulates labor relations and worker protections",
      year: 1947,
      provisions: ["labor", "worker", "protection"],
      applications: ["labor_rights"]
    },
    {
      name: "Goods and Services Tax (GST) Act, 2017",
      description: "Regulates GST and indirect taxation",
      year: 2017,
      provisions: ["gst", "tax", "indirect"],
      applications: ["tax_rights"]
    }
  ]
}

function getGovernmentBusinessSchemes() {
  return [
    {
      name: "Make in India",
      url: "https://www.makeinindia.gov.in",
      description: "Promotes entrepreneurship and manufacturing in India",
      services: ["entrepreneurship", "manufacturing", "support"],
      contact: "1800-11-3377"
    },
    {
      name: "Startup India",
      url: "https://www.startupindia.gov.in",
      description: "Supports startups and entrepreneurship",
      services: ["startup", "entrepreneurship", "funding"],
      contact: "1800-11-3377"
    },
    {
      name: "MSME Development",
      url: "https://www.msme.gov.in",
      description: "Supports micro, small and medium enterprises",
      services: ["msme", "small_business", "support"],
      contact: "011-2338225"
    },
    {
      name: "Digital India",
      url: "https://digitalindia.gov.in",
      description: "Promotes digital entrepreneurship and innovation",
      services: ["digital", "innovation", "entrepreneurship"],
      contact: "1800-11-3377"
    },
    {
      name: "Skill India",
      url: "https://www.skillindia.gov.in",
      description: "Provides skill development for business and entrepreneurship",
      services: ["skill", "training", "entrepreneurship"],
      contact: "1800-11-3377"
    },
    {
      name: "National Small Industries Corporation",
      url: "https://www.nsic.co.in",
      description: "Supports small industries and entrepreneurship",
      services: ["small_industry", "entrepreneurship", "support"],
      contact: "011-2338225"
    }
  ]
}