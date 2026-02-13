import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      rightsType,
      housingIssue,
      propertyType,
      location,
      description,
      evidence,
      urgency = 'normal',
      language = 'en',
      ownerInfo,
      landlordInfo,
      documents,
      legalAction = false
    } = body

    // Generate housing rights strategy
    const rightsStrategy = generateRightsStrategy({
      rightsType,
      housingIssue,
      propertyType,
      location,
      description,
      evidence,
      urgency,
      language,
      ownerInfo,
      landlordInfo,
      documents,
      legalAction
    })

    // Get housing resources
    const housingResources = getHousingResources(rightsType, location)

    // Get legal options and remedies
    const legalOptions = getLegalOptions(rightsType, housingIssue, urgency)

    // Create action plan
    const actionPlan = createActionPlan(rightsType, urgency, location)

    return NextResponse.json({
      success: true,
      data: {
        rightsStrategy,
        housingResources,
        legalOptions,
        actionPlan,
        timeline: getHousingTimeline(rightsType, urgency),
        checklists: getHousingChecklists(rightsType),
        templates: getHousingTemplates(language),
        contacts: getHousingContacts(location),
        statistics: getHousingStatistics(),
        constitutionalBasis: getHousingConstitutionalBasis()
      }
    })

  } catch (error) {
    console.error('Housing Rights Center Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to process housing rights request'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const location = searchParams.get('location')
    const language = searchParams.get('lang') || 'en'

    // Get housing issue types
    const issueTypes = getHousingIssueTypes()
    const filteredTypes = type ? issueTypes.filter(t => t.id === type) : issueTypes
    
    // Get housing statistics
    const statistics = getHousingStatistics()

    // Get recent cases
    const recentCases = getRecentCases(language)

    // Get location-specific resources
    const locationResources = location ? getLocationHousingResources(location) : null

    return NextResponse.json({
      success: true,
      data: {
        issueTypes: filteredTypes,
        statistics,
        recentCases,
        locationResources,
        constitutionalBasis: getHousingConstitutionalBasis(),
        housingLaws: getHousingLaws(),
        governmentSchemes: getGovernmentHousingSchemes()
      }
    })

  } catch (error) {
    console.error('Housing Directory Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch housing resources'
    }, { status: 500 })
  }
}

// Helper functions
function generateRightsStrategy(data: any) {
  const { rightsType, housingIssue, propertyType, location, description, evidence, urgency, language, ownerInfo, landlordInfo, documents, legalAction } = data
  
  const strategies = {
    right_to_housing: {
      immediate: [
        "Document housing rights violations",
        "Contact housing authorities",
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact housing NGOs"
      ],
      legal: [
        "File complaint under housing laws",
        "Seek intervention from housing authorities",
        "File writ petition under Article 21",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 21: Right to housing",
        "Article 19(1)(e): Right to reside",
        "Article 14: Right to equality in housing",
        "Housing Rights Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    landlord_tenant: {
      immediate: [
        "Document landlord-tenant violations",
        "Contact housing authorities",
        "Seek immediate legal advice",
        "Preserve all evidence and documentation",
        "Contact tenant associations"
      ],
      legal: [
        "File complaint under rent control laws",
        "Seek intervention from housing authorities",
        "File civil suit for violations",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 21: Right to housing with dignity",
        "Article 14: Right to equality",
        "Article 19(1)(e): Right to reside",
        "Rent Control Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    property_rights: {
      immediate: [
        "Document property rights violations",
        "Contact property authorities",
        "Seek immediate legal advice",
        "Preserve all evidence and documentation",
        "Contact property associations"
      ],
      legal: [
        "File complaint under property laws",
        "Seek intervention from property authorities",
        "File civil suit for violations",
        "Consider criminal complaint for fraud"
      ],
      constitutional: [
        "Article 300A: Right to property",
        "Article 14: Right to equality",
        "Article 21: Right to life with dignity",
        "Property Rights Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "60-120 days"
      }
    },
    slum_rehabilitation: {
      immediate: [
        "Document slum rehabilitation violations",
        "Contact housing authorities",
        "Seek immediate legal advice",
        "Preserve all evidence and documentation",
        "Contact slum NGOs"
      ],
      legal: [
        "File complaint under housing laws",
        "Seek intervention from housing authorities",
        "File writ petition under Article 21",
        "Consider public interest litigation"
      ],
      constitutional: [
        "Article 21: Right to adequate housing",
        "Article 14: Right to equality",
        "Article 19(1)(e): Right to reside",
        "Slum Rehabilitation Act provisions"
      ],
      timeline: {
        "documentation": "3-7 days",
        "complaint": "14-30 days",
        "investigation": "30-60 days",
        "resolution": "60-120 days"
      }
    },
    affordable_housing: {
      immediate: [
        "Document affordable housing violations",
        "Contact housing authorities",
        "Seek immediate legal advice",
        "Preserve all evidence and documentation",
        "Contact housing NGOs"
      ],
      legal: [
        "File complaint under housing laws",
        "Seek intervention from housing authorities",
        "File writ petition under Article 21",
        "Consider public interest litigation"
      ],
      constitutional: [
        "Article 21: Right to adequate housing",
        "Article 14: Right to equality",
        "Article 19(1)(e): Right to reside",
        "Affordable Housing Act provisions"
      },
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    housing_discrimination: {
      immediate: [
        "Document housing discrimination",
        "Contact housing authorities",
        "Seek immediate legal advice",
        "Preserve all evidence and documentation",
        "Contact housing rights NGOs"
      ],
      legal: [
        "File complaint under anti-discrimination laws",
        "Seek intervention from housing authorities",
        "File writ petition under Article 14",
        "Consider criminal complaint for severe discrimination"
      ],
      constitutional: [
        "Article 14: Right to equality",
        "Article 15: Prohibition of discrimination",
        "Article 21: Right to housing with dignity",
        "Anti-discrimination laws"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    infrastructure: {
      immediate: [
        "Document housing infrastructure violations",
        "Contact housing authorities",
        "Seek immediate repairs if needed",
        "Preserve all evidence and documentation",
        "Contact housing maintenance"
      ],
      legal: [
        "File complaint under housing laws",
        "Seek intervention from housing authorities",
        "File writ petition under Article 21",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 21: Right to safe housing",
        "Article 14: Right to equality",
        "Article 19(1)(e): Right to reside",
        "Building regulations provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    housing_finance: {
      immediate: [
        "Document housing finance violations",
        "Contact financial authorities",
        "Seek immediate legal advice",
        "Preserve all evidence and documentation",
        "Contact housing finance NGOs"
      ],
      legal: [
        "File complaint under financial regulations",
        "Seek intervention from financial authorities",
        "File civil suit for violations",
        "Consider criminal complaint for fraud"
      ],
      constitutional: [
        "Article 21: Right to housing finance",
        "Article 14: Right to equality",
        "Article 19(1)(g): Right to practice any profession",
        "Financial regulations provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "60-120 days"
      }
    }
  }

  return strategies[rightsType as keyof typeof strategies] || strategies.right_to_housing
}

function getHousingResources(rightsType: string, location: string) {
  const resources = {
    right_to_housing: {
      authorities: [
        { name: "National Housing Authority", phone: "011-2338225", type: "national" },
        { name: "Ministry of Housing", phone: "011-2338225", type: "ministry" },
        { name: "State Housing Department", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "Housing Rights NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Housing Support Groups", phone: "011-2338225", type: "support" },
        { name: "Tenant Associations", phone: "011-2338225", type: "tenant" }
      ],
      legal: [
        { name: "Housing Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Property Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Housing Support Services", phone: "011-2338225", type: "support" },
        { name: "Tenant Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Housing Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    landlord_tenant: {
      authorities: [
        { name: "Rent Control Authority", phone: "011-2338225", type: "authority" },
        { name: "Housing Department", phone: "011-2338225", type: "department" },
        { name: "Municipal Corporation", phone: "011-2338225", type: "municipal" }
      ],
      organizations: [
        { name: "Tenant Rights Groups", phone: "011-2338225", type: "tenant" },
        { name: "Landlord Associations", phone: "011-2338225", type: "landlord" },
        { name: "Housing NGOs", phone: "011-2338225", type: "ngo" }
      ],
      legal: [
        { name: "Rent Control Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Housing Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Tenant Support", phone: "011-2338225", type: "support" },
        { name: "Landlord Support", phone: "011-2338225", type: "support" },
        { name: "Housing Counseling", phone: "011-2338225", type: "counseling" }
      ]
    },
    property_rights: {
      authorities: [
        { name: "Property Registration Authority", phone: "011-2338225", type: "authority" },
        { name: "Land Records Department", phone: "011-2338225", type: "department" },
        { name: "Municipal Corporation", phone: "011-2338225", type: "municipal" }
      ],
      organizations: [
        { name: "Property Rights Groups", phone: "011-2338225", type: "rights" },
        { name: "Owner Associations", phone: "011-2338225", type: "owner" },
        { name: "Property NGOs", phone: "011-2338225", type: "ngo" }
      ],
      legal: [
        { name: "Property Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Real Estate Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Property Support", phone: "011-2338225", type: "support" },
        { name: "Real Estate Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Property Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    slum_rehabilitation: {
      authorities: [
        { name: "Slum Rehabilitation Authority", phone: "011-2338225", type: "authority" },
        { name: "Housing Department", phone: "011-2338225", type: "department" },
        { name: "Municipal Corporation", phone: "011-2338225", type: "municipal" }
      ],
      organizations: [
        { name: "Slum NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Community Housing Groups", phone: "011-2338225", type: "community" },
        { name: "Rehabilitation Support", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "Housing Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Public Interest Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Slum Support", phone: "011-2338225", type: "support" },
        { name: "Community Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Rehabilitation Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    affordable_housing: {
      authorities: [
        { name: "Affordable Housing Authority", phone: "011-2338225", type: "authority" },
        { name: "Housing Ministry", phone: "011-2338225", type: "ministry" },
        { name: "State Housing Department", phone: "011-2338225", type: "department" }
      ],
      organizations: [
        { name: "Affordable Housing NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Housing Support Groups", phone: "011-2338225", type: "support" },
        { name: "Community Housing", phone: "011-2338225", type: "community" }
      ],
      legal: [
        { name: "Housing Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Affordable Housing Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Affordable Housing Support", phone: "011-2338225", type: "support" },
        { name: "Housing Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Housing Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    housing_discrimination: {
      authorities: [
        { name: "Housing Discrimination Authority", phone: "011-2338225", type: "authority" },
        { name: "Housing Department", phone: "011-2338225", type: "department" },
        { name: "Equal Opportunity Commission", phone: "011-2338225", type: "commission" }
      ],
      organizations: [
        { name: "Anti-Discrimination Groups", phone: "011-2338225", type: "rights" },
        { name: "Housing Rights NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Equal Housing Groups", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "Discrimination Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Housing Rights Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Discrimination Support", phone: "011-2338225", type: "support" },
        { name: "Equal Housing Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Housing Rights Support", phone: "011-2338225", type: "support" }
      ]
    },
    infrastructure: {
      authorities: [
        { name: "Housing Infrastructure Authority", phone: "011-2338225", type: "authority" },
        { name: "Building Department", phone: "011-2338225", type: "department" },
        { name: "Municipal Corporation", phone: "011-2338225", type: "municipal" }
      ],
      organizations: [
        { name: "Infrastructure NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Housing Maintenance", phone: "011-2338225", type: "maintenance" },
        { name: "Community Housing", phone: "011-2338225", type: "community" }
      ],
      legal: [
        { name: "Housing Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Building Regulation Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Infrastructure Support", phone: "011-2338225", type: "support" },
        { name: "Housing Maintenance", phone: "011-2338225", type: "maintenance" },
        { name: "Community Support", phone: "011-2338225", type: "community" }
      ]
    },
    housing_finance: {
      authorities: [
        { name: "Housing Finance Authority", phone: "011-2338225", type: "authority" },
        { name: "RBI Housing Finance", phone: "011-2338225", type: "regulatory" },
        { name: "Banking Department", phone: "011-2338225", type: "department" }
      ],
      organizations: [
        { name: "Housing Finance NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Mortgage Support Groups", phone: "011-2338225", type: "support" },
        { name: "Financial Counseling", phone: "011-2338225", type: "counseling" }
      ],
      legal: [
        { name: "Housing Finance Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Banking Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Housing Finance Support", phone: "011-2338225", type: "support" },
        { name: "Mortgage Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Financial Advisors", phone: "011-2338225", type: "advisor" }
      ]
    }
  }

  return resources[rightsType as keyof typeof resources] || resources.right_to_housing
}

function getLegalOptions(rightsType: string, housingIssue: string, urgency: string) {
  const options = {
    right_to_housing: {
      administrative: {
        description: "File complaint with housing authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for housing rights violations",
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
      regulatory: {
        description: "Seek intervention from housing authorities",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    landlord_tenant: {
      administrative: {
        description: "File complaint with rent control authority",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for landlord-tenant violations",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      criminal: {
        description: "File criminal case for severe violations",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      },
      regulatory: {
        description: "Seek intervention from housing department",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    property_rights: {
      administrative: {
        description: "File complaint with property authorities",
        timeline: "7-14 days",
        success: 65,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for property rights violations",
        timeline: "60-120 days",
        success: 60,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 300A",
        timeline: "90-180 days",
        success: 70,
        cost: "High",
        effort: "High"
      },
      criminal: {
        description: "File criminal case for property fraud",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      }
    },
    slum_rehabilitation: {
      administrative: {
        description: "File complaint with housing authorities",
        timeline: "14-30 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for rehabilitation violations",
        timeline: "60-120 days",
        success: 55,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 21",
        timeline: "90-180 days",
        success: 70,
        cost: "High",
        effort: "High"
      },
      public_interest: {
        description: "File public interest litigation",
        timeline: "90-180 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      }
    },
    affordable_housing: {
      administrative: {
        description: "File complaint with housing authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for affordable housing violations",
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
      public_interest: {
        description: "File public interest litigation",
        timeline: "90-180 days",
        success: 70,
        cost: "Medium",
        effort: "Medium"
      }
    },
    housing_discrimination: {
      administrative: {
        description: "File complaint with housing authorities",
        timeline: "7-14 days",
        success: 65,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for housing discrimination",
        timeline: "60-120 days",
        success: 60,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 14",
        timeline: "90-180 days",
        success: 70,
        cost: "High",
        effort: "High"
      },
      criminal: {
        description: "File criminal case for severe discrimination",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      }
    },
    infrastructure: {
      administrative: {
        description: "File complaint with housing authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for infrastructure violations",
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
        success: 70,
        cost: "Low",
        effort: "High"
      }
    },
    housing_finance: {
      administrative: {
        description: "File complaint with financial authorities",
        timeline: "7-14 days",
        success: 65,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for finance violations",
        timeline: "60-120 days",
        success: 60,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 21",
        timeline: "90-180 days",
        success: 70,
        cost: "High",
        effort: "High"
      },
      criminal: {
        description: "File criminal case for finance fraud",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      }
    }
  }

  return options[rightsType as keyof typeof options] || options.right_to_housing
}

function createActionPlan(rightsType: string, urgency: string, location: string) {
  const plans = {
    right_to_housing: {
      immediate: [
        "Document housing rights violations",
        "Contact housing authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact housing NGOs"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor housing improvements",
        "Document changes in housing policies",
        "Seek alternative housing if needed"
      ],
      long: [
        "Monitor housing quality",
        "Follow up on legal proceedings",
        "Update housing documentation",
        "Educate about housing rights"
      ]
    },
    landlord_tenant: {
      immediate: [
        "Document landlord-tenant violations",
        "Contact housing authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Contact tenant associations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor housing conditions",
        "Document changes in landlord policies",
        "Seek alternative housing if needed"
      ],
      long: [
        "Monitor landlord-tenant relations",
        "Follow up on legal proceedings",
        "Update housing documentation",
        "Educate about tenant rights"
      ]
    },
    property_rights: {
      immediate: [
        "Document property rights violations",
        "Contact property authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Contact property associations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor property conditions",
        "Document changes in property policies",
        "Seek alternative property if needed"
      ],
      long: [
        "Monitor property quality",
        "Follow up on legal proceedings",
        "Update property documentation",
        "Educate about property rights"
      ]
    },
    slum_rehabilitation: {
      immediate: [
        "Document slum rehabilitation violations",
        "Contact housing authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Contact slum NGOs"
      ],
      short: [
        "Follow up on rehabilitation progress",
        "Monitor housing improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor slum rehabilitation",
        "Follow up on legal proceedings",
        "Update housing documentation",
        "Educate about rehabilitation rights"
      ]
    },
    affordable_housing: {
      immediate: [
        "Document affordable housing violations",
        "Contact housing authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Contact housing NGOs"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor housing improvements",
        "Document changes in policies",
        "Seek alternative housing if needed"
      ],
      long: [
        "Monitor affordable housing",
        "Follow up on legal proceedings",
        "Update housing documentation",
        "Educate about affordable housing"
      ]
    },
    housing_discrimination: {
      immediate: [
        "Document housing discrimination",
        "Contact housing authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Contact anti-discrimination NGOs"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor housing environment",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor housing equality",
        "Follow up on legal proceedings",
        "Update housing documentation",
        "Educate about housing rights"
      ]
    },
    infrastructure: {
      immediate: [
        "Document infrastructure violations",
        "Contact housing authorities",
        "Seek immediate repairs if needed",
        "Preserve all evidence",
        "Contact maintenance services"
      ],
      short: [
        "Follow up on repairs",
        "Monitor housing conditions",
        "Document improvements",
        "Seek additional resources if needed"
      ],
      long: [
        "Monitor housing infrastructure",
        "Follow up on legal proceedings",
        "Update housing documentation",
        "Educate about infrastructure"
      ]
    },
    housing_finance: {
      immediate: [
        "Document housing finance violations",
        "Contact financial authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Contact finance NGOs"
      ],
      short: [
        "Follow up on finance resolution",
        "Monitor loan conditions",
        "Document changes",
        "Seek alternative financing if needed"
      ],
      long: [
        "Monitor housing finance",
        "Follow up on legal proceedings",
        "Update housing documentation",
        "Educate about housing finance"
      ]
    }
  }

  return plans[rightsType as keyof typeof plans] || plans.right_to_housing
}

function getHousingTimeline(rightsType: string, urgency: string) {
  const baseTimelines = {
    right_to_housing: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    landlord_tenant: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    property_rights: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "60-120 days"
    },
    slum_rehabilitation: {
      "documentation": "3-7 days",
      "complaint": "14-30 days",
      "investigation": "30-60 days",
      "resolution": "60-120 days"
    },
    affordable_housing: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    housing_discrimination: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    infrastructure: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    housing_finance: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "60-120 days"
    }
  }

  const urgencyMultiplier = {
    urgent: 0.5,
    priority: 0.75,
    normal: 1
  }

  const timeline = baseTimelines[rightsType as keyof typeof baseTimelines] || baseTimelines.right_to_housing
  const multiplier = urgencyMultiplier[urgency as keyof typeof urgencyMultiplier] || 1

  return Object.keys(timeline).reduce((acc, key) => {
    const [start, end] = timeline[key as keyof typeof timeline].split('-')
    const startNum = parseInt(start) * multiplier
    const endNum = parseInt(end) * multiplier
    acc[key] = `${startNum}-${endNum} ${end.includes('day') ? 'days' : 'hours'}`
    return acc
  }, {} as any)
}

function getHousingChecklists(rightsType: string) {
  const checklists = {
    right_to_housing: {
      pre: [
        "Know housing rights laws",
        "Document all housing-related incidents",
        "Keep housing records organized",
        "Know complaint procedures",
        "Have housing contacts ready"
      ],
      during: [
        "Document housing violations",
        "Report to housing authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow housing procedures"
      ],
      post: [
        "Monitor housing quality",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional resources if needed",
        "Educate about housing rights"
      ]
    },
    landlord_tenant: {
      pre: [
        "Know landlord-tenant laws",
        "Document all rental agreements",
        "Keep rent records organized",
        "Know dispute procedures",
        "Have landlord-tenant contacts ready"
      ],
      during: [
        "Document landlord-tenant violations",
        "Report to housing authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Follow dispute procedures"
      ],
      post: [
        "Monitor housing conditions",
        "Follow up on dispute resolution",
        "Document changes",
        "Seek additional support if needed",
        "Educate about tenant rights"
      ]
    },
    property_rights: {
      pre: [
        "Know property rights laws",
        "Document all property transactions",
        "Keep property records organized",
        "Know registration procedures",
        "Have property contacts ready"
      ],
      during: [
        "Document property rights violations",
        "Report to property authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Follow property procedures"
      ],
      post: [
        "Monitor property quality",
        "Follow up on legal proceedings",
        "Update property documentation",
        "Educate about property rights"
      ]
    },
    slum_rehabilitation: {
      pre: [
        "Know rehabilitation laws",
        "Document slum conditions",
        "Keep rehabilitation records organized",
        "Know rehabilitation procedures",
        "Have community contacts ready"
      ],
      during: [
        "Document rehabilitation violations",
        "Report to housing authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Follow rehabilitation procedures"
      ],
      post: [
        "Monitor rehabilitation progress",
        "Follow up on improvements",
        "Document changes",
        "Seek additional support if needed",
        "Educate about rehabilitation rights"
      ]
    },
    affordable_housing: {
      pre: [
        "Know affordable housing laws",
        "Document housing applications",
        "Keep housing records organized",
        "Know application procedures",
        "Have housing contacts ready"
      ],
      during: [
        "Document affordable housing violations",
        "Report to housing authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Follow housing procedures"
      ],
      post: [
        "Monitor affordable housing",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional resources if needed",
        "Educate about affordable housing"
      ]
    },
    housing_discrimination: {
      pre: [
        "Know anti-discrimination laws",
        "Document discrimination incidents",
        "Keep evidence organized",
        "Know reporting procedures",
        "Have support contacts ready"
      ],
      during: [
        "Document housing discrimination",
        "Report to housing authorities",
        "Seek immediate intervention",
        "Preserve all evidence",
        "Follow reporting procedures"
      ],
      post: [
        "Monitor housing equality",
        "Follow up on complaint resolution",
        "Document changes",
        "Seek additional support if needed",
        "Educate about housing rights"
      ]
    },
    infrastructure: {
      pre: [
        "Know infrastructure standards",
        "Document facility conditions",
        "Keep maintenance records organized",
        "Know reporting procedures",
        "Have maintenance contacts ready"
      ],
      during: [
        "Document infrastructure violations",
        "Report to housing authorities",
        "Seek immediate repairs if needed",
        "Preserve all evidence",
        "Follow maintenance procedures"
      ],
      post: [
        "Monitor infrastructure quality",
        "Follow up on repairs",
        "Document improvements",
        "Seek additional resources if needed",
        "Educate about infrastructure"
      ]
    },
    housing_finance: {
      pre: [
        "Know housing finance laws",
        "Document all loan agreements",
        "Keep finance records organized",
        "Know dispute procedures",
        "Have finance contacts ready"
      ],
      during: [
        "Document housing finance violations",
        "Report to financial authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Follow finance procedures"
      ],
      post: [
        "Monitor loan conditions",
        "Follow up on finance resolution",
        "Document changes",
        "Seek alternatives if needed",
        "Educate about housing finance"
      ]
    }
  }

  return checklists[rightsType as keyof typeof checklists] || checklists.right_to_housing
}

function getHousingTemplates(language: string = 'en') {
  return [
    {
      id: 1,
      title: "Housing Rights Complaint",
      type: "right_to_housing",
      template: `To,
The Housing Authority
[Housing Authority Address]
[City]
[Pincode]
[Date]

Subject: Complaint Regarding Housing Rights Violation

Dear Sir/Madam,

I, [Your Name], hereby file a complaint regarding housing rights violation at [Property Address].

Violation Details:
- Date of Violation: [Date]
- Time of Violation: [Time]
- Place of Violation: [Place]
- Nature of Violation: [Nature]
- Housing Staff Involved: [Staff Names]
- Impact on Occupants: [Impact Details]
- Witnesses: [Witness Names]

Legal Provisions:
This complaint is filed under the Housing Rights Act and Article 21 of the Constitution which guarantees the right to adequate housing.

Prayer:
I request you to:
1. Investigate the housing rights violation thoroughly
2. Take appropriate action against the violator
3. Ensure compliance with housing standards
4. Provide compensation for damages if applicable
5. Implement measures to prevent future violations

I am available for further investigation and can provide additional information as required.

Thank you.

Yours faithfully,
[Your Name]
[Phone Number]
[Email]
[Date]`,
      fields: ["Name", "Property Address", "Date", "Time", "Place", "Nature", "Staff Names"]
    },
    {
      id: 2,
      title: "Landlord-Tenant Dispute Complaint",
      type: "landlord_tenant",
      template: `To,
The Rent Control Authority
[Rent Control Authority Address]
[City]
[Pincode]
[Date]

Subject: Complaint Regarding Landlord-Tenant Dispute

Dear Sir/Madam,

I, [Your Name], hereby file a complaint regarding landlord-tenant dispute at [Property Address].

Dispute Details:
- Date of Dispute: [Date]
- Type of Dispute: [Dispute Type]
- Nature of Violation: [Nature]
- Landlord/Tenant Involved: [Name]
- Impact on Occupancy: [Impact Details]
- Witnesses: [Witness Names]

Legal Provisions:
This complaint is filed under the Rent Control Act and Article 21 of the Constitution which guarantees the right to housing with dignity.

Prayer:
I request you to:
1. Investigate the landlord-tenant dispute thoroughly
2. Take appropriate action against the violator
3. Ensure compliance with rent control regulations
4. Provide compensation for damages if applicable
5. Implement measures to prevent future disputes

I am available for further investigation and can provide additional information as required.

Thank you.

Yours faithfully,
[Your Name]
[Phone Number]
[Email]
[Date]`,
      fields: ["Name", "Property Address", "Date", "Dispute Type", "Nature", "Name"]
    }
  ]
}

function getHousingContacts(location: string) {
  const baseContacts = {
    national: [
      { name: "Ministry of Housing", phone: "011-2338225", type: "ministry" },
      { name: "National Housing Authority", phone: "011-2338225", type: "national" },
      { name: "Housing Department", phone: "011-2338225", type: "department" }
    ],
    state: [
      { name: "State Housing Department", phone: "011-2338225", type: "state" },
      { name: "District Housing Office", phone: "011-2338225", type: "district" },
      { name: "Municipal Corporation", phone: "011-2338225", type: "municipal" }
    ],
    support: [
      { name: "Housing Support Services", phone: "011-2338225", type: "support" },
      { name: "Tenant Counseling", phone: "011-2338225", type: "counseling" },
      { name: "Housing Advisors", phone: "011-2338225", type: "advisor" }
    ]
  }

  return baseContacts.national
}

function getHousingStatistics() {
  return {
    totalComplaints: 200000,
    successRate: 68,
    averageResolutionTime: 40, // days
    landlordTenantCases: 50000,
    propertyRightsCases: 40000,
    slumRehabilitationCases: 30000,
    affordableHousingCases: 25000,
    discriminationCases: 20000,
    lastUpdated: new Date().toISOString()
  }
}

function getHousingIssueTypes() {
  return [
    {
      id: "right_to_housing",
      name: "Right to Housing",
      description: "Fundamental right to adequate housing for all",
      category: "rights",
      urgency: "high",
      constitutional: ["Article 21", "Article 19(1)(e)", "Article 14"],
      legal: ["Housing Rights Act", "Constitutional Law"],
      timeline: "30-60 days"
    },
    {
      id: "landlord_tenant",
      name: "Landlord-Tenant Rights",
      description: "Rights and protections for tenants and landlords",
      category: "rights",
      urgency: "medium",
      constitutional: ["Article 21", "Article 14"],
      legal: ["Rent Control Act", "Housing Regulations"],
      timeline: "30-60 days"
    },
    {
      id: "property_rights",
      name: "Property Rights",
      description: "Rights to own, use, and dispose of property",
      category: "rights",
      urgency: "medium",
      constitutional: ["Article 300A", "Article 14", "Article 21"],
      legal: ["Property Rights Act", "Registration Act"],
      timeline: "60-120 days"
    },
    {
      id: "slum_rehabilitation",
      name: "Slum Rehabilitation",
      description: "Rehabilitation of slum areas with adequate housing",
      category: "social",
      urgency: "medium",
      constitutional: ["Article 21", "Article 14"],
      legal: ["Slum Rehabilitation Act", "Housing Laws"],
      timeline: "60-120 days"
    },
    {
      id: "affordable_housing",
      name: "Affordable Housing",
      description: "Access to affordable housing for low-income groups",
      category: "social",
      urgency: "medium",
      constitutional: ["Article 21", "Article 14"],
      legal: ["Affordable Housing Act", "Housing Policies"],
      timeline: "30-60 days"
    },
    {
      id: "housing_discrimination",
      name: "Housing Discrimination",
      description: "Protection against discrimination in housing",
      category: "rights",
      urgency: "high",
      constitutional: ["Article 14", "Article 15"],
      legal: ["Anti-discrimination Laws", "Housing Regulations"],
      timeline: "30-60 days"
    },
    {
      id: "infrastructure",
      name: "Housing Infrastructure",
      description: "Right to safe and adequate housing infrastructure",
      category: "infrastructure",
      urgency: "medium",
      constitutional: ["Article 21", "Article 14"],
      legal: ["Building Regulations", "Infrastructure Standards"],
      timeline: "30-60 days"
    },
    {
      id: "housing_finance",
      name: "Housing Finance",
      description: "Access to housing finance and mortgage facilities",
      category: "finance",
      urgency: "medium",
      constitutional: ["Article 21", "Article 19(1)(g)"],
      legal: ["Housing Finance Act", "Banking Regulations"],
      timeline: "60-120 days"
    }
  ]
}

function getRecentCases(language: string = 'en') {
  return [
    {
      id: 1,
      type: "right_to_housing",
      title: "Housing Rights Protected",
      description: "Successfully protected housing rights and improved housing conditions",
      outcome: "success",
      timeline: "45 days",
      date: "2023-12-20",
      location: "Delhi",
      constitutional: "Article 21"
    },
    {
      id: 2,
      type: "landlord_tenant",
      title: "Landlord-Tenant Dispute Resolved",
      description: "Successfully resolved landlord-tenant dispute with favorable outcome",
      outcome: "success",
      timeline: "30 days",
      date: "2023-12-18",
      location: "Mumbai",
      constitutional: "Article 21"
    },
    {
      id: 3,
      type: "property_rights",
      title: "Property Rights Case Won",
      description: "Successfully won property rights case with title confirmation",
      outcome: "success",
      timeline: "90 days",
      date: "2023-12-15",
      location: "Bangalore",
      constitutional: "Article 300A"
    }
  ]
}

function getHousingConstitutionalBasis() {
  return {
    primary: {
      article: "Article 21",
      title: "Right to Housing",
      description: "Right to adequate housing and living conditions",
      applications: ["all_housing"]
    },
    secondary: {
      article: "Article 19(1)(e)",
      title: "Right to Reside",
      description: "Right to reside and settle in any part of India",
      applications: ["all_housing"]
    },
    landmark: {
      case: "Olga Tellis vs. Bombay Municipal Corporation (1985)",
      title: "Right to Housing",
      description: "Supreme Court judgment on right to housing for pavement dwellers",
      applications: ["all_housing"]
    },
    legislation: {
      act: "Housing Rights Act, 1987",
      title: "Housing Rights Legislation",
      description: "Comprehensive law for housing rights and regulations",
      applications: ["all_housing"]
    },
    act: "Rent Control Act, 1949",
      title: "Rent Control Regulations",
      description: "Regulates rent and protects tenants from exploitation",
      applications: ["landlord_tenant"]
    }
  }
}

function getHousingLaws() {
  return [
    {
      name: "Housing Rights Act, 1987",
      description: "Comprehensive law for housing rights and regulations",
      year: 1987,
      provisions: ["housing", "rights", "regulation"],
      applications: ["all_housing"]
    },
    {
      name: "Rent Control Act, 1949",
      description: "Regulates rent and protects tenants from exploitation",
      year: 1949,
      provisions: ["rent_control", "tenant_protection", "regulation"],
      applications: ["landlord_tenant"]
    },
    {
      name: "Property Rights Act, 2002",
      description: "Protects property rights and registration",
      year: 2002,
      provisions: ["property", "rights", "registration"],
      applications: ["property_rights"]
    },
    {
      name: "Slum Areas (Improvement and Clearance) Act, 1956",
      description: "Provides for improvement and clearance of slum areas",
      year: 1956,
      provisions: ["slum", "improvement", "clearance"],
      applications: ["slum_rehabilitation"]
    },
    {
      name: "Affordable Housing Act, 2010",
      description: "Promotes affordable housing for low-income groups",
      year: 2010,
      provisions: ["affordable", "housing", "finance"],
      applications: ["affordable_housing"]
    },
    {
      name: "Building Regulations Act, 2016",
      description: "Regulates building construction and safety standards",
      year: 2016,
      provisions: ["building", "safety", "regulation"],
      applications: ["infrastructure"]
    }
  ]
}

function getGovernmentHousingSchemes() {
  return [
    {
      name: "Pradhan Mantri Awas Yojana (PMAY)",
      url: "https://pmaymis.gov.in",
      description: "Credit Linked Subsidy Scheme for affordable housing",
      services: ["housing_finance", "subsidy", "affordable"],
      contact: "1800-11-3377",
      coverage: "National"
    },
    {
      name: "Rajiv Awas Yojana (RAY)",
      url: "https://ray.gov.in",
      description: "Credit Linked Subsidy Scheme for housing interest subsidy",
      services: ["housing_finance", "subsidy", "interest"],
      contact: "1800-11-3377",
      coverage: "National"
    },
    {
      name: "Indira Awas Yojana (IAY)",
      url: "https://iay.gov.in",
      description: "Housing scheme for rural poor",
      services: ["affordable_housing", "rural", "subsidy"],
      contact: "1800-11-3377",
      coverage: "National"
    },
    {
      name: "Pradhan Mantri Gramin Awas Yojana (PMGAY)",
      url: "https://pmgmis.gov.in",
      description: "Housing scheme for rural poor",
      services: ["affordable_housing", "rural", "subsidy"],
      contact: "1800-11-3377",
      coverage: "National"
    },
    {
      name: "Basic Services for Urban Poor (BSUP)",
      url: "https://bsup.gov.in",
      description: "Urban poverty alleviation program",
      services: ["slum_rehabilitation", "urban", "poverty"],
      contact: "011-2338225",
      coverage: "National"
    }
  ]
}