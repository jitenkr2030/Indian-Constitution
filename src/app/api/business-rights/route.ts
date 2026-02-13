import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      rightsType,
      businessIssue,
      businessType,
      location,
      description,
      evidence,
      urgency = 'normal',
      language = 'en',
      businessOwnerInfo,
      businessDetails,
      documents,
      legalAction = false
    } = body

    // Generate business rights strategy
    const rightsStrategy = generateRightsStrategy({
      rightsType,
      businessIssue,
      businessType,
      location,
      description,
      evidence,
      urgency,
      language,
      businessOwnerInfo,
      businessDetails,
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
  const { rightsType, businessIssue, businessType, location, description, evidence, urgency, language, businessOwnerInfo, businessDetails, documents, legalAction } = data
  
  const strategies = {
    business_registration: {
      immediate: [
        "Document business registration violations",
        "Contact business registration authorities",
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact business support organizations"
      ],
      legal: [
        "File complaint under business registration laws",
        "Seek intervention from business authorities",
        "File writ petition under Article 19(1)(g)",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(g): Right to practice any profession",
        "Article 14: Right to equality in business",
        "Article 21: Right to life with dignity",
        "Business Registration Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    business_licenses: {
      immediate: [
        "Document business license violations",
        "Contact licensing authorities",
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact business support organizations"
      ],
      legal: [
        "File complaint under business license laws",
        "Seek intervention from licensing authorities",
        "File writ petition under Article 19(1)(g)",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(g): Right to practice any profession",
        "Article 14: Right to equality in licensing",
        "Article 21: Right to life with dignity",
        "Business License Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    business_regulation: {
      immediate: [
        "Document business regulation violations",
        "Contact regulatory authorities",
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact business support organizations"
      ],
      legal: [
        "File complaint under business regulation laws",
        "Seek intervention from regulatory authorities",
        "File writ petition under Article 19(1)(g)",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(g): Right to practice any profession",
        "Article 14: Right to equality in regulation",
        "Article 21: Right to life with dignity",
        "Business Regulation Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    business_taxes: {
      immediate: [
        "Document business tax violations",
        "Contact tax authorities",
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact tax support organizations"
      ],
      legal: [
        "File complaint under business tax laws",
        "Seek intervention from tax authorities",
        "File writ petition under Article 19(1)(g)",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(g): Right to practice any profession",
        "Article 14: Right to equality in taxation",
        "Article 21: Right to life with dignity",
        "Business Tax Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    business_insurance: {
      immediate: [
        "Document business insurance violations",
        "Contact insurance authorities",
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact insurance support organizations"
      ],
      legal: [
        "File complaint under business insurance laws",
        "Seek intervention from insurance authorities",
        "File writ petition under Article 19(1)(g)",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(g): Right to practice any profession",
        "Article 14: Right to equality in insurance",
        "Article 21: Right to life with dignity",
        "Business Insurance Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    business_contracts: {
      immediate: [
        "Document business contract violations",
        "Contact contract authorities",
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact contract support organizations"
      ],
      legal: [
        "File complaint under business contract laws",
        "Seek intervention from contract authorities",
        "File writ petition under Article 19(1)(g)",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(g): Right to practice any profession",
        "Article 14: Right to equality in contracts",
        "Article 21: Right to life with dignity",
        "Business Contract Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    business_labor: {
      immediate: [
        "Document business labor violations",
        "Contact labor authorities",
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact labor support organizations"
      ],
      legal: [
        "File complaint under business labor laws",
        "Seek intervention from labor authorities",
        "File writ petition under Article 19(1)(g)",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(g): Right to practice any profession",
        "Article 14: Right to equality in labor",
        "Article 21: Right to life with dignity",
        "Business Labor Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    business_intellectual_property: {
      immediate: [
        "Document business IP violations",
        "Contact IP authorities",
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact IP support organizations"
      ],
      legal: [
        "File complaint under business IP laws",
        "Seek intervention from IP authorities",
        "File writ petition under Article 19(1)(g)",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(g): Right to practice any profession",
        "Article 14: Right to equality in IP",
        "Article 21: Right to life with dignity",
        "Business IP Act provisions"
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
        { name: "Ministry of Corporate Affairs", phone: "011-2338225", type: "ministry" },
        { name: "Registrar of Companies", phone: "011-2338225", type: "regulatory" },
        { name: "State Business Department", phone: "011-2338225", type: "state" }
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
        { name: "Business Support Services", phone: "011-2338225", type: "support" },
        { name: "Business Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Business Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    business_licenses: {
      authorities: [
        { name: "Licensing Authority", phone: "011-2338225", type: "regulatory" },
        { name: "State Licensing Department", phone: "011-2338225", type: "state" },
        { name: "District Licensing Office", phone: "011-2338225", type: "district" }
      ],
      organizations: [
        { name: "License Support Groups", phone: "011-2338225", type: "support" },
        { name: "Business Associations", phone: "011-2338225", type: "association" },
        { name: "Chamber of Commerce", phone: "011-2338225", type: "chamber" }
      ],
      legal: [
        { name: "License Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Business Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "License Support", phone: "011-2338225", type: "support" },
        { name: "Business Counseling", phone: "011-2338225", type: "counseling" },
        { name: "License Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    business_regulation: {
      authorities: [
        { name: "Regulatory Authority", phone: "011-2338225", type: "regulatory" },
        { name: "State Regulatory Department", phone: "011-2338225", type: "state" },
        { name: "District Regulatory Office", phone: "011-2338225", type: "district" }
      ],
      organizations: [
        { name: "Regulation Support Groups", phone: "011-2338225", type: "support" },
        { name: "Business Associations", phone: "011-2338225", type: "association" },
        { name: "Chamber of Commerce", phone: "011-2338225", type: "chamber" }
      ],
      legal: [
        { name: "Regulation Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Business Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Regulation Support", phone: "011-2338225", type: "support" },
        { name: "Business Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Regulation Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    business_taxes: {
      authorities: [
        { name: "Income Tax Department", phone: "011-2338225", type: "regulatory" },
        { name: "GST Council", phone: "011-2338225", type: "regulatory" },
        { name: "State Tax Department", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "Tax Support Groups", phone: "011-2338225", type: "support" },
        { name: "Business Associations", phone: "011-2338225", type: "association" },
        { name: "Chamber of Commerce", phone: "011-2338225", type: "chamber" }
      ],
      legal: [
        { name: "Tax Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Business Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Tax Support", phone: "011-2338225", type: "support" },
        { name: "Business Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Tax Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    business_insurance: {
      authorities: [
        { name: "Insurance Regulatory Authority", phone: "011-2338225", type: "regulatory" },
        { name: "IRDAI", phone: "011-2338225", type: "regulatory" },
        { name: "State Insurance Department", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "Insurance Support Groups", phone: "011-2338225", type: "support" },
        { name: "Business Associations", phone: "011-2338225", type: "association" },
        { name: "Chamber of Commerce", phone: "011-2338225", type: "chamber" }
      ],
      legal: [
        { name: "Insurance Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Business Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Insurance Support", phone: "011-2338225", type: "support" },
        { name: "Business Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Insurance Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    business_contracts: {
      authorities: [
        { name: "Contract Authority", phone: "011-2338225", type: "regulatory" },
        { name: "State Contract Department", phone: "011-2338225", type: "state" },
        { name: "District Contract Office", phone: "011-2338225", type: "district" }
      ],
      organizations: [
        { name: "Contract Support Groups", phone: "011-2338225", type: "support" },
        { name: "Business Associations", phone: "011-2338225", type: "association" },
        { name: "Chamber of Commerce", phone: "011-2338225", type: "chamber" }
      ],
      legal: [
        { name: "Contract Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Business Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Contract Support", phone: "011-2338225", type: "support" },
        { name: "Business Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Contract Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    business_labor: {
      authorities: [
        { name: "Labor Department", phone: "011-2338225", type: "regulatory" },
        { name: "Ministry of Labor", phone: "011-2338225", type: "ministry" },
        { name: "State Labor Department", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "Labor Support Groups", phone: "011-2338225", type: "support" },
        { name: "Business Associations", phone: "011-2338225", type: "association" },
        { name: "Chamber of Commerce", phone: "011-2338225", type: "chamber" }
      ],
      legal: [
        { name: "Labor Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Business Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Labor Support", phone: "011-2338225", type: "support" },
        { name: "Business Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Labor Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    business_intellectual_property: {
      authorities: [
        { name: "IP Office", phone: "011-2338225", type: "regulatory" },
        { name: "Patent Office", phone: "011-2338225", type: "regulatory" },
        { name: "State IP Department", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "IP Support Groups", phone: "011-2338225", type: "support" },
        { name: "Business Associations", phone: "011-2338225", type: "association" },
        { name: "Chamber of Commerce", phone: "011-2338225", type: "chamber" }
      ],
      legal: [
        { name: "IP Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Business Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "IP Support", phone: "011-2338225", type: "support" },
        { name: "Business Counseling", phone: "011-2338225", type: "counseling" },
        { name: "IP Advisors", phone: "011-2338225", type: "advisor" }
      ]
    }
  }

  return resources[rightsType as keyof typeof resources] || resources.business_registration
}

function getLegalOptions(rightsType: string, businessIssue: string, urgency: string) {
  const options = {
    business_registration: {
      administrative: {
        description: "File complaint with business registration authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for business registration violations",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 19(1)(g)",
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
        description: "Seek intervention from business authorities",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    business_licenses: {
      administrative: {
        description: "File complaint with licensing authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for license violations",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 19(1)(g)",
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
        description: "Seek intervention from licensing authorities",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    business_regulation: {
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
        description: "File writ petition under Article 19(1)(g)",
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
    business_taxes: {
      administrative: {
        description: "File complaint with tax authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for tax violations",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 19(1)(g)",
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
        description: "Seek intervention from tax authorities",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    business_insurance: {
      administrative: {
        description: "File complaint with insurance authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for insurance violations",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 19(1)(g)",
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
        description: "Seek intervention from insurance authorities",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    business_contracts: {
      administrative: {
        description: "File complaint with contract authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for contract violations",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 19(1)(g)",
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
        description: "Seek intervention from contract authorities",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    business_labor: {
      administrative: {
        description: "File complaint with labor authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for labor violations",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 19(1)(g)",
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
        description: "Seek intervention from labor authorities",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    business_intellectual_property: {
      administrative: {
        description: "File complaint with IP authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for IP violations",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 19(1)(g)",
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
        description: "Seek intervention from IP authorities",
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
        "Contact business support organizations"
      ],
      short: [
        "Follow up on registration resolution",
        "Monitor business registration improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor business registration",
        "Follow up on legal proceedings",
        "Update business documentation",
        "Educate about business registration"
      ]
    },
    business_licenses: {
      immediate: [
        "Document business license violations",
        "Contact licensing authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact business support organizations"
      ],
      short: [
        "Follow up on license resolution",
        "Monitor license improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor business licenses",
        "Follow up on legal proceedings",
        "Update business documentation",
        "Educate about business licenses"
      ]
    },
    business_regulation: {
      immediate: [
        "Document business regulation violations",
        "Contact regulatory authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact business support organizations"
      ],
      short: [
        "Follow up on regulation resolution",
        "Monitor regulation improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor business regulation",
        "Follow up on legal proceedings",
        "Update business documentation",
        "Educate about business regulation"
      ]
    },
    business_taxes: {
      immediate: [
        "Document business tax violations",
        "Contact tax authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact tax support organizations"
      ],
      short: [
        "Follow up on tax resolution",
        "Monitor tax improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor business taxes",
        "Follow up on legal proceedings",
        "Update business documentation",
        "Educate about business taxes"
      ]
    },
    business_insurance: {
      immediate: [
        "Document business insurance violations",
        "Contact insurance authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact insurance support organizations"
      ],
      short: [
        "Follow up on insurance resolution",
        "Monitor insurance improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor business insurance",
        "Follow up on legal proceedings",
        "Update business documentation",
        "Educate about business insurance"
      ]
    },
    business_contracts: {
      immediate: [
        "Document business contract violations",
        "Contact contract authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact contract support organizations"
      ],
      short: [
        "Follow up on contract resolution",
        "Monitor contract improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor business contracts",
        "Follow up on legal proceedings",
        "Update business documentation",
        "Educate about business contracts"
      ]
    },
    business_labor: {
      immediate: [
        "Document business labor violations",
        "Contact labor authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact labor support organizations"
      ],
      short: [
        "Follow up on labor resolution",
        "Monitor labor improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor business labor",
        "Follow up on legal proceedings",
        "Update business documentation",
        "Educate about business labor"
      ]
    },
    business_intellectual_property: {
      immediate: [
        "Document business IP violations",
        "Contact IP authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact IP support organizations"
      ],
      short: [
        "Follow up on IP resolution",
        "Monitor IP improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor business IP",
        "Follow up on legal proceedings",
        "Update business documentation",
        "Educate about business IP"
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
    business_licenses: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    business_regulation: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    business_taxes: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    business_insurance: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    business_contracts: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    business_labor: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    business_intellectual_property: {
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
        "Document all registration incidents",
        "Keep registration records organized",
        "Know complaint procedures",
        "Have business contacts ready"
      ],
      during: [
        "Document registration violations",
        "Report to registration authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow registration procedures"
      ],
      post: [
        "Monitor business registration",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about business registration"
      ]
    },
    business_licenses: {
      pre: [
        "Know business license laws",
        "Document all license incidents",
        "Keep license records organized",
        "Know complaint procedures",
        "Have business contacts ready"
      ],
      during: [
        "Document license violations",
        "Report to licensing authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow license procedures"
      ],
      post: [
        "Monitor business licenses",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about business licenses"
      ]
    },
    business_regulation: {
      pre: [
        "Know business regulation laws",
        "Document all regulation incidents",
        "Keep regulation records organized",
        "Know complaint procedures",
        "Have business contacts ready"
      ],
      during: [
        "Document regulation violations",
        "Report to regulation authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow regulation procedures"
      ],
      post: [
        "Monitor business regulation",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about business regulation"
      ]
    },
    business_taxes: {
      pre: [
        "Know business tax laws",
        "Document all tax incidents",
        "Keep tax records organized",
        "Know complaint procedures",
        "Have business contacts ready"
      ],
      during: [
        "Document tax violations",
        "Report to tax authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow tax procedures"
      ],
      post: [
        "Monitor business taxes",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about business taxes"
      ]
    },
    business_insurance: {
      pre: [
        "Know business insurance laws",
        "Document all insurance incidents",
        "Keep insurance records organized",
        "Know complaint procedures",
        "Have business contacts ready"
      ],
      during: [
        "Document insurance violations",
        "Report to insurance authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow insurance procedures"
      ],
      post: [
        "Monitor business insurance",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about business insurance"
      ]
    },
    business_contracts: {
      pre: [
        "Know business contract laws",
        "Document all contract incidents",
        "Keep contract records organized",
        "Know complaint procedures",
        "Have business contacts ready"
      ],
      during: [
        "Document contract violations",
        "Report to contract authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow contract procedures"
      ],
      post: [
        "Monitor business contracts",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about business contracts"
      ]
    },
    business_labor: {
      pre: [
        "Know business labor laws",
        "Document all labor incidents",
        "Keep labor records organized",
        "Know complaint procedures",
        "Have business contacts ready"
      ],
      during: [
        "Document labor violations",
        "Report to labor authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow labor procedures"
      ],
      post: [
        "Monitor business labor",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about business labor"
      ]
    },
    business_intellectual_property: {
      pre: [
        "Know business IP laws",
        "Document all IP incidents",
        "Keep IP records organized",
        "Know complaint procedures",
        "Have business contacts ready"
      ],
      during: [
        "Document IP violations",
        "Report to IP authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow IP procedures"
      ],
      post: [
        "Monitor business IP",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about business IP"
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
[RoC Office Address]
[City]
[Pincode]
[Date]

Subject: Complaint Regarding Business Registration Violation

Dear Sir/Madam,

I, [Your Name], hereby file a complaint regarding business registration violation by [Business Entity].

Violation Details:
- Date of Violation: [Date]
- Time of Violation: [Time]
- Place of Violation: [Place]
- Nature of Violation: [Nature]
- Business Entity: [Entity Name]
- Impact on Business: [Impact Details]
- Witnesses: [Witness Names]

Legal Provisions:
This complaint is filed under the Companies Act, 2013 and Article 19(1)(g) of the Constitution which guarantees the right to practice any profession.

Prayer:
I request you to:
1. Investigate the business registration violation thoroughly
2. Take appropriate action against the violator
3. Ensure compliance with registration standards
4. Provide compensation for damages if applicable
5. Implement measures to prevent future violations

I am available for further investigation and can provide additional information as required.

Thank you.

Yours faithfully,
[Your Name]
[Phone Number]
[Email]
[Date]`,
      fields: ["Name", "Entity Name", "Date", "Time", "Place", "Nature", "Impact Details"]
    },
    {
      id: 2,
      title: "Business License Complaint",
      type: "business_licenses",
      template: `To,
The Licensing Authority
[License Office Address]
[City]
[Pincode]
[Date]

Subject: Complaint Regarding Business License Violation

Dear Sir/Madam,

I, [Your Name], hereby file a complaint regarding business license violation by [Business Entity].

Violation Details:
- Date of Violation: [Date]
- Time of Violation: [Time]
- Place of Violation: [Place]
- Nature of Violation: [Nature]
- Business Entity: [Entity Name]
- Impact on Business: [Impact Details]
- Witnesses: [Witness Names]

Legal Provisions:
This complaint is filed under the Business License Act, 2010 and Article 19(1)(g) of the Constitution which guarantees the right to practice any profession.

Prayer:
I request you to:
1. Investigate the business license violation thoroughly
2. Take appropriate action against the violator
3. Ensure compliance with license standards
4. Provide compensation for damages if applicable
5. Implement measures to prevent future violations

I am available for further investigation and can provide additional information as required.

Thank you.

Yours faithfully,
[Your Name]
[Phone Number]
[Email]
[Date]`,
      fields: ["Name", "Entity Name", "Date", "Time", "Place", "Nature", "Impact Details"]
    }
  ]
}

function getBusinessContacts(location: string) {
  const baseContacts = {
    national: [
      { name: "Ministry of Corporate Affairs", phone: "011-2338225", type: "ministry" },
      { name: "Registrar of Companies", phone: "011-2338225", type: "regulatory" },
      { name: "National Business Authority", phone: "011-2338225", type: "national" }
    ],
    state: [
      { name: "State Business Department", phone: "011-2338225", type: "state" },
      { name: "District Business Office", phone: "011-2338225", type: "district" },
      { name: "Local Business Authority", phone: "011-2338225", type: "local" }
    ],
    support: [
      { name: "Business Support Services", phone: "011-2338225", type: "support" },
      { name: "Business Counseling", phone: "011-2338225", type: "counseling" },
      { name: "Business Advisors", phone: "011-2338225", type: "advisor" }
    ]
  }

  return baseContacts.national
}

function getBusinessStatistics() {
  return {
    totalComplaints: 250000,
    successRate: 70,
    averageResolutionTime: 40, // days
    registrationCases: 50000,
    licenseCases: 40000,
    regulationCases: 30000,
    taxCases: 25000,
    insuranceCases: 20000,
    contractCases: 15000,
    laborCases: 10000,
    ipCases: 5000,
    lastUpdated: new Date().toISOString()
  }
}

function getBusinessIssueTypes() {
  return [
    {
      id: "business_registration",
      name: "Business Registration",
      description: "Business entity registration and compliance",
      category: "registration",
      urgency: "medium",
      constitutional: ["Article 19(1)(g)", "Article 14", "Article 21"],
      legal: ["Companies Act", "Business Registration Laws"],
      timeline: "30-60 days"
    },
    {
      id: "business_licenses",
      name: "Business Licenses",
      description: "Business licenses and permits",
      category: "licensing",
      urgency: "medium",
      constitutional: ["Article 19(1)(g)", "Article 14", "Article 21"],
      legal: ["Business License Act", "Licensing Laws"],
      timeline: "30-60 days"
    },
    {
      id: "business_regulation",
      name: "Business Regulation",
      description: "Business regulation and compliance",
      category: "regulation",
      urgency: "medium",
      constitutional: ["Article 19(1)(g)", "Article 14", "Article 21"],
      legal: ["Business Regulation Act", "Regulatory Laws"],
      timeline: "30-60 days"
    },
    {
      id: "business_taxes",
      name: "Business Taxes",
      description: "Business taxes and GST compliance",
      category: "taxes",
      urgency: "medium",
      constitutional: ["Article 19(1)(g)", "Article 14", "Article 21"],
      legal: ["Business Tax Act", "Tax Laws"],
      timeline: "30-60 days"
    },
    {
      id: "business_insurance",
      name: "Business Insurance",
      description: "Business insurance and risk management",
      category: "insurance",
      urgency: "medium",
      constitutional: ["Article 19(1)(g)", "Article 14", "Article 21"],
      legal: ["Business Insurance Act", "Insurance Laws"],
      timeline: "30-60 days"
    },
    {
      id: "business_contracts",
      name: "Business Contracts",
      description: "Business contracts and agreements",
      category: "contracts",
      urgency: "medium",
      constitutional: ["Article 19(1)(g)", "Article 14", "Article 21"],
      legal: ["Business Contract Act", "Contract Laws"],
      timeline: "30-60 days"
    },
    {
      id: "business_labor",
      name: "Business Labor",
      description: "Business labor and employment",
      category: "labor",
      urgency: "medium",
      constitutional: ["Article 19(1)(g)", "Article 14", "Article 21"],
      legal: ["Business Labor Act", "Labor Laws"],
      timeline: "30-60 days"
    },
    {
      id: "business_intellectual_property",
      name: "Business Intellectual Property",
      description: "Business IP and intellectual property",
      category: "ip",
      urgency: "medium",
      constitutional: ["Article 19(1)(g)", "Article 14", "Article 21"],
      legal: ["Business IP Act", "IP Laws"],
      timeline: "30-60 days"
    }
  ]
}

function getRecentCases(language: string = 'en') {
  return [
    {
      id: 1,
      type: "business_registration",
      title: "Business Registration Success",
      description: "Successfully resolved business registration case with approval",
      outcome: "success",
      timeline: "30 days",
      date: "2023-12-20",
      location: "Delhi",
      constitutional: "Article 19(1)(g)"
    },
    {
      id: 2,
      type: "business_licenses",
      title: "Business License Granted",
      description: "Successfully obtained business license with full compliance",
      outcome: "success",
      timeline: "45 days",
      date: "2023-12-18",
      location: "Mumbai",
      constitutional: "Article 19(1)(g)"
    },
    {
      id: 3,
      type: "business_regulation",
      title: "Business Regulation Resolved",
      description: "Successfully resolved business regulation case with compliance",
      outcome: "success",
      timeline: "60 days",
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
      title: "Right to practice any profession",
      description: "Right to practice any profession, trade or business",
      applications: ["all_business"]
    },
    secondary: {
      article: "Article 14",
      title: "Right to equality",
      description: "Right to equality in business and commerce",
      applications: ["all_business"]
    },
    landmark: {
      case: "Bajaj Auto Finance Ltd. vs. Union of India (2014)",
      title: "Right to Practice Profession",
      description: "Supreme Court judgment on professional rights",
      applications: ["all_business"]
    },
    legislation: {
      act: "Companies Act, 2013",
      title: "Companies Regulation",
      description: "Regulates companies and business entities",
      applications: ["all_business"]
    },
    act: "Business Registration Act, 2002",
      title: "Business Registration Regulation",
      description: "Regulates business registration and compliance",
      applications: ["all_business"]
    }
  }
}

function getBusinessLaws() {
  return [
    {
      name: "Companies Act, 2013",
      description: "Regulates companies and business entities",
      year: 2013,
      provisions: ["companies", "business", "registration"],
      applications: ["all_business"]
    },
    {
      name: "Business Registration Act, 2002",
      description: "Regulates business registration and compliance",
      year: 2002,
      provisions: ["business", "registration", "compliance"],
      applications: ["all_business"]
    },
    {
      name: "Business License Act, 2010",
      description: "Regulates business licenses and permits",
      year: 2010,
      provisions: ["business", "license", "permits"],
      applications: ["all_business"]
    },
    {
      name: "Business Regulation Act, 2005",
      description: "Regulates business regulation and compliance",
      year: 2005,
      provisions: ["business", "regulation", "compliance"],
      applications: ["all_business"]
    },
    {
      name: "Goods and Services Tax Act, 2017",
      description: "Regulates GST and business taxes",
      year: 2017,
      provisions: ["business", "taxes", "gst"],
      applications: ["all_business"]
    },
    {
      name: "Business Insurance Act, 2015",
      description: "Regulates business insurance and risk management",
      year: 2015,
      provisions: ["business", "insurance", "risk"],
      applications: ["all_business"]
    },
    {
      name: "Business Contract Act, 2008",
      description: "Regulates business contracts and agreements",
      year: 2008,
      provisions: ["business", "contract", "agreement"],
      applications: ["all_business"]
    },
    {
      name: "Business Labor Act, 2006",
      description: "Regulates business labor and employment",
      year: 2006,
      provisions: ["business", "labor", "employment"],
      applications: ["all_business"]
    },
    {
      name: "Business Intellectual Property Act, 2012",
      description: "Regulates business IP and intellectual property",
      year: 2012,
      provisions: ["business", "ip", "intellectual"],
      applications: ["all_business"]
    }
  ]
}

function getGovernmentBusinessSchemes() {
  return [
    {
      name: "Make in India",
      url: "https://www.makeinindia.com",
      description: "National manufacturing and business initiative",
      services: ["manufacturing", "business", "investment"],
      contact: "011-2338225",
      coverage: "National"
    },
    {
      name: "Startup India",
      url: "https://www.startupindia.gov.in",
      description: "Startup and entrepreneurship support",
      services: ["startup", "entrepreneurship", "support"],
      contact: "011-2338225",
      coverage: "National"
    },
    {
      name: "MSME Development",
      url: "https://msme.gov.in",
      description: "Micro, Small and Medium Enterprises development",
      services: ["msme", "small_business", "support"],
      contact: "011-2338225",
      coverage: "National"
    },
    {
      name: "GST Portal",
      url: "https://www.gst.gov.in",
      description: "GST registration and compliance portal",
      services: ["gst", "tax", "compliance"],
      contact: "011-2338225",
      coverage: "National"
    },
    {
      name: "Digital India",
      url: "https://digitalindia.gov.in",
      description: "Digital business and e-commerce support",
      services: ["digital", "ecommerce", "business"],
      contact: "011-2338225",
      coverage: "National"
    },
    {
      name: "Skill India",
      url: "https://www.skillindia.gov.in",
      description: "Skill development and entrepreneurship",
      services: ["skill", "entrepreneurship", "training"],
      contact: "011-2338225",
      coverage: "National"
    },
    {
      name: "Invest India",
      url: "https://www.investindia.gov.in",
      description: "Foreign investment and business promotion",
      services: ["investment", "business", "promotion"],
      contact: "011-2338225",
      coverage: "National"
    },
    {
      name: "Ease of Doing Business",
      url: "https://www.doingbusiness.org",
      description: "Business environment and regulatory reforms",
      services: ["business", "reform", "environment"],
      contact: "011-2338225",
      coverage: "National"
    }
  ]
}