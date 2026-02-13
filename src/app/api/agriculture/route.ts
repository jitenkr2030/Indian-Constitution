import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      rightsType,
      agricultureIssue,
      landType,
      location,
      description,
      evidence,
      urgency = 'normal',
      language = 'en',
      farmerInfo,
      landownerInfo,
      cropDetails,
      documents,
      legalAction = false
    } = body

    // Generate agriculture rights strategy
    const rightsStrategy = generateRightsStrategy({
      rightsType,
      agricultureIssue,
      landType,
      location,
      description,
      evidence,
      urgency,
      language,
      farmerInfo,
      landownerInfo,
      cropDetails,
      documents,
      legalAction
    })

    // Get agriculture resources
    const agricultureResources = getAgricultureResources(rightsType, location)

    // Get legal options and remedies
    const legalOptions = getLegalOptions(rightsType, agricultureIssue, urgency)

    // Create action plan
    const actionPlan = createActionPlan(rightsType, urgency, location)

    return NextResponse.json({
      success: true,
      data: {
        rightsStrategy,
        agricultureResources,
        legalOptions,
        actionPlan,
        timeline: getAgricultureTimeline(rightsType, urgency),
        checklists: getAgricultureChecklists(rightsType),
        templates: getAgricultureTemplates(language),
        contacts: getAgricultureContacts(location),
        statistics: getAgricultureStatistics(),
        constitutionalBasis: getAgricultureConstitutionalBasis()
      }
    })

  } catch (error) {
    console.error('Agriculture & Farmer Rights Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to process agriculture rights request'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const location = searchParams.get('location')
    const language = searchParams.get('lang') || 'en'

    // Get agriculture issue types
    const issueTypes = getAgricultureIssueTypes()
    const filteredTypes = type ? issueTypes.filter(t => t.id === type) : issueTypes
    
    // Get agriculture statistics
    const statistics = getAgricultureStatistics()

    // Get recent cases
    const recentCases = getRecentCases(language)

    // Get location-specific resources
    const locationResources = location ? getLocationAgricultureResources(location) : null

    return NextResponse.json({
      success: true,
      data: {
        issueTypes: filteredTypes,
        statistics,
        recentCases,
        locationResources,
        constitutionalBasis: getAgricultureConstitutionalBasis(),
        agricultureLaws: getAgricultureLaws(),
        governmentSchemes: getGovernmentAgricultureSchemes()
      }
    })

  } catch (error) {
    console.error('Agriculture Directory Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch agriculture resources'
    }, { status: 500 })
  }
}

// Helper functions
function generateRightsStrategy(data: any) {
  const { rightsType, agricultureIssue, landType, location, description, evidence, urgency, language, farmerInfo, landownerInfo, cropDetails, documents, legalAction } = data
  
  const strategies = {
    farmer_rights: {
      immediate: [
        "Document farmer rights violations",
        "Contact agriculture authorities",
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact farmer associations"
      ],
      legal: [
        "File complaint under agriculture laws",
        "Seek intervention from agriculture department",
        "File writ petition under Article 21",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 21: Right to livelihood",
        "Article 14: Right to equality",
        "Article 19(1)(g): Right to practice agriculture",
        "Agriculture Rights Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    land_rights: {
      immediate: [
        "Document land rights violations",
        "Contact land revenue authorities",
        "Seek immediate legal advice",
        "Preserve all evidence and documentation",
        "Contact land rights organizations"
      ],
      legal: [
        "File complaint under land laws",
        "Seek intervention from land revenue department",
        "File writ petition under Article 300A",
        "Consider criminal complaint for land grabbing"
      ],
      constitutional: [
        "Article 300A: Right to property",
        "Article 14: Right to equality",
        "Article 21: Right to livelihood",
        "Land Rights Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "60-120 days"
      }
    },
    crop_insurance: {
      immediate: [
        "Document crop insurance violations",
        "Contact insurance authorities",
        "Seek immediate compensation claims",
        "Preserve all evidence and documentation",
        "Contact insurance companies"
      ],
      legal: [
        "File complaint under crop insurance laws",
        "Seek intervention from agriculture department",
        "File civil suit for insurance violations",
        "Consider criminal complaint for fraud"
      ],
      constitutional: [
        "Article 21: Right to livelihood",
        "Article 14: Right to equality",
        "Article 19(1)(g): Right to practice agriculture",
        "Crop Insurance Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    agricultural_subsidies: {
      immediate: [
        "Document subsidy violations",
        "Contact agriculture department",
        "Seek immediate subsidy assistance",
        "Preserve all evidence and documentation",
        "Contact subsidy authorities"
      ],
      legal: [
        "File complaint under subsidy laws",
        "Seek intervention from agriculture department",
        "File writ petition under Article 21",
        "Consider criminal complaint for fraud"
      ],
      constitutional: [
        "Article 21: Right to livelihood",
        "Article 14: Right to equality",
        "Article 19(1)(g): Right to practice agriculture",
        "Subsidy Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    market_access: {
      immediate: [
        "Document market access violations",
        "Contact agriculture market authorities",
        "Seek immediate market assistance",
        "Preserve all evidence and documentation",
        "Contact market organizations"
      ],
      legal: [
        "File complaint under market laws",
        "Seek intervention from agriculture department",
        "File writ petition under Article 21",
        "Consider criminal complaint for exploitation"
      ],
      constitutional: [
        "Article 21: Right to livelihood",
        "Article 14: Right to equality",
        "Article 19(1)(g): Right to practice agriculture",
        "Market Access Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    agricultural_labor: {
      immediate: [
        "Document labor rights violations",
        "Contact labor authorities",
        "Seek immediate labor assistance",
        "Preserve all evidence and documentation",
        "Contact labor organizations"
      ],
      legal: [
        "File complaint under labor laws",
        "Seek intervention from labor department",
        "File writ petition under Article 21",
        "Consider criminal complaint for exploitation"
      ],
      constitutional: [
        "Article 21: Right to livelihood",
        "Article 14: Right to equality",
        "Article 19(1)(g): Right to practice agriculture",
        "Labor Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    agricultural_technology: {
      immediate: [
        "Document technology violations",
        "Contact technology authorities",
        "Seek immediate technology assistance",
        "Preserve all evidence and documentation",
        "Contact technology organizations"
      ],
      legal: [
        "File complaint under technology laws",
        "Seek intervention from agriculture department",
        "File writ petition under Article 21",
        "Consider criminal complaint for fraud"
      ],
      constitutional: [
        "Article 21: Right to livelihood",
        "Article 14: Right to equality",
        "Article 19(1)(g): Right to practice agriculture",
        "Technology Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    environmental_protection: {
      immediate: [
        "Document environmental violations",
        "Contact environmental authorities",
        "Seek immediate environmental assistance",
        "Preserve all evidence and documentation",
        "Contact environmental organizations"
      ],
      legal: [
        "File complaint under environmental laws",
        "Seek intervention from environment department",
        "File writ petition under Article 21",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 21: Right to healthy environment",
        "Article 14: Right to equality",
        "Article 48A: Protection of environment",
        "Environmental Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    }
  }

  return strategies[rightsType as keyof typeof strategies] || strategies.farmer_rights
}

function getAgricultureResources(rightsType: string, location: string) {
  const resources = {
    farmer_rights: {
      authorities: [
        { name: "Ministry of Agriculture", phone: "011-2338225", type: "ministry" },
        { name: "State Agriculture Department", phone: "011-2338225", type: "state" },
        { name: "District Agriculture Office", phone: "011-2338225", type: "district" }
      ],
      organizations: [
        { name: "Farmer Rights NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Farmer Associations", phone: "011-2338225", type: "association" },
        { name: "Agriculture Support Groups", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "Agriculture Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Farmer Rights Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Farmer Support Services", phone: "011-2338225", type: "support" },
        { name: "Agriculture Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Farmer Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    land_rights: {
      authorities: [
        { name: "Land Revenue Department", phone: "011-2338225", type: "department" },
        { name: "Land Records Authority", phone: "011-2338225", type: "authority" },
        { name: "District Land Office", phone: "011-2338225", type: "district" }
      ],
      organizations: [
        { name: "Land Rights NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Land Owner Associations", phone: "011-2338225", type: "owner" },
        { name: "Land Rights Groups", phone: "011-2338225", type: "rights" }
      ],
      legal: [
        { name: "Land Rights Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Property Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Land Support Services", phone: "011-2338225", type: "support" },
        { name: "Land Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Land Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    crop_insurance: {
      authorities: [
        { name: "Agriculture Insurance Authority", phone: "011-2338225", type: "authority" },
        { name: "Insurance Regulatory Authority", phone: "011-2338225", type: "regulatory" },
        { name: "State Agriculture Department", phone: "011-2338225", type: "department" }
      ],
      organizations: [
        { name: "Insurance Companies", phone: "011-2338225", type: "insurance" },
        { name: "Crop Insurance NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Farmer Support Groups", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "Insurance Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Crop Insurance Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Insurance Support", phone: "011-2338225", type: "support" },
        { name: "Crop Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Insurance Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    agricultural_subsidies: {
      authorities: [
        { name: "Subsidy Authority", phone: "011-2338225", type: "authority" },
        { name: "Agriculture Department", phone: "011-2338225", type: "department" },
        { name: "District Agriculture Office", phone: "011-2338225", type: "district" }
      ],
      organizations: [
        { name: "Subsidy NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Farmer Associations", phone: "011-2338225", type: "association" },
        { name: "Subsidy Support Groups", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "Subsidy Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Agriculture Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Subsidy Support", phone: "011-2338225", type: "support" },
        { name: "Agriculture Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Subsidy Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    market_access: {
      authorities: [
        { name: "Market Authority", phone: "011-2338225", type: "authority" },
        { name: "Agriculture Marketing Department", phone: "011-2338225", type: "department" },
        { name: "District Market Office", phone: "011-2338225", type: "district" }
      ],
      organizations: [
        { name: "Market NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Farmer Market Associations", phone: "011-2338225", type: "association" },
        { name: "Market Support Groups", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "Market Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Agriculture Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Market Support", phone: "011-2338225", type: "support" },
        { name: "Market Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Market Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    agricultural_labor: {
      authorities: [
        { name: "Labor Department", phone: "011-2338225", type: "department" },
        { name: "Agriculture Labor Authority", phone: "011-2338225", type: "authority" },
        { name: "District Labor Office", phone: "011-2338225", type: "district" }
      ],
      organizations: [
        { name: "Labor NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Agriculture Labor Unions", phone: "011-2338225", type: "union" },
        { name: "Labor Support Groups", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "Labor Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Agriculture Labor Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Labor Support", phone: "011-2338225", type: "support" },
        { name: "Labor Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Labor Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    agricultural_technology: {
      authorities: [
        { name: "Technology Authority", phone: "011-2338225", type: "authority" },
        { name: "Agriculture Technology Department", phone: "011-2338225", type: "department" },
        { name: "District Technology Office", phone: "011-2338225", type: "district" }
      ],
      organizations: [
        { name: "Technology NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Agriculture Tech Companies", phone: "011-2338225", type: "company" },
        { name: "Technology Support Groups", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "Technology Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Agriculture Technology Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Technology Support", phone: "011-2338225", type: "support" },
        { name: "Technology Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Technology Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    environmental_protection: {
      authorities: [
        { name: "Environment Authority", phone: "011-2338225", type: "authority" },
        { name: "Environment Department", phone: "011-2338225", type: "department" },
        { name: "District Environment Office", phone: "011-2338225", type: "district" }
      ],
      organizations: [
        { name: "Environment NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Agriculture Environment Groups", phone: "011-2338225", type: "support" },
        { name: "Environmental Support Groups", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "Environment Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Agriculture Environment Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Environment Support", phone: "011-2338225", type: "support" },
        { name: "Environment Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Environment Advisors", phone: "011-2338225", type: "advisor" }
      ]
    }
  }

  return resources[rightsType as keyof typeof resources] || resources.farmer_rights
}

function getLegalOptions(rightsType: string, agricultureIssue: string, urgency: string) {
  const options = {
    farmer_rights: {
      administrative: {
        description: "File complaint with agriculture authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for farmer rights violations",
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
        description: "Seek intervention from agriculture department",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    land_rights: {
      administrative: {
        description: "File complaint with land revenue authorities",
        timeline: "7-14 days",
        success: 65,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for land rights violations",
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
        description: "File criminal case for land grabbing",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      }
    },
    crop_insurance: {
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
        description: "File writ petition under Article 21",
        timeline: "90-180 days",
        success: 75,
        cost: "High",
        effort: "High"
      },
      criminal: {
        description: "File criminal case for insurance fraud",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      }
    },
    agricultural_subsidies: {
      administrative: {
        description: "File complaint with subsidy authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for subsidy violations",
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
        description: "File criminal case for subsidy fraud",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      }
    },
    market_access: {
      administrative: {
        description: "File complaint with market authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for market violations",
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
        description: "File criminal case for market exploitation",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      }
    },
    agricultural_labor: {
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
        description: "File writ petition under Article 21",
        timeline: "90-180 days",
        success: 75,
        cost: "High",
        effort: "High"
      },
      criminal: {
        description: "File criminal case for labor exploitation",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      }
    },
    agricultural_technology: {
      administrative: {
        description: "File complaint with technology authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for technology violations",
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
        description: "File criminal case for technology fraud",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      }
    },
    environmental_protection: {
      administrative: {
        description: "File complaint with environment authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for environmental violations",
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
      }
    }
  }

  return options[rightsType as keyof typeof options] || options.farmer_rights
}

function createActionPlan(rightsType: string, urgency: string, location: string) {
  const plans = {
    farmer_rights: {
      immediate: [
        "Document farmer rights violations",
        "Contact agriculture authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact farmer associations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor agriculture improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor farmer rights",
        "Follow up on legal proceedings",
        "Update agriculture documentation",
        "Educate about farmer rights"
      ]
    },
    land_rights: {
      immediate: [
        "Document land rights violations",
        "Contact land revenue authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Contact land rights organizations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor land improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor land rights",
        "Follow up on legal proceedings",
        "Update land documentation",
        "Educate about land rights"
      ]
    },
    crop_insurance: {
      immediate: [
        "Document insurance violations",
        "Contact insurance authorities",
        "Seek immediate compensation claims",
        "Preserve all evidence",
        "Contact insurance companies"
      ],
      short: [
        "Follow up on insurance resolution",
        "Monitor insurance improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor insurance quality",
        "Follow up on legal proceedings",
        "Update insurance documentation",
        "Educate about insurance rights"
      ]
    },
    agricultural_subsidies: {
      immediate: [
        "Document subsidy violations",
        "Contact subsidy authorities",
        "Seek immediate subsidy assistance",
        "Preserve all evidence",
        "Contact subsidy organizations"
      ],
      short: [
        "Follow up on subsidy resolution",
        "Monitor subsidy improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor subsidy quality",
        "Follow up on legal proceedings",
        "Update subsidy documentation",
        "Educate about subsidy rights"
      ]
    },
    market_access: {
      immediate: [
        "Document market access violations",
        "Contact market authorities",
        "Seek immediate market assistance",
        "Preserve all evidence",
        "Contact market organizations"
      ],
      short: [
        "Follow up on market resolution",
        "Monitor market improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor market quality",
        "Follow up on legal proceedings",
        "Update market documentation",
        "Educate about market rights"
      ]
    },
    agricultural_labor: {
      immediate: [
        "Document labor rights violations",
        "Contact labor authorities",
        "Seek immediate labor assistance",
        "Preserve all evidence",
        "Contact labor organizations"
      ],
      short: [
        "Follow up on labor resolution",
        "Monitor labor improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor labor rights",
        "Follow up on legal proceedings",
        "Update labor documentation",
        "Educate about labor rights"
      ]
    },
    agricultural_technology: {
      immediate: [
        "Document technology violations",
        "Contact technology authorities",
        "Seek immediate technology assistance",
        "Preserve all evidence",
        "Contact technology organizations"
      ],
      short: [
        "Follow up on technology resolution",
        "Monitor technology improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor technology quality",
        "Follow up on legal proceedings",
        "Update technology documentation",
        "Educate about technology rights"
      ]
    },
    environmental_protection: {
      immediate: [
        "Document environmental violations",
        "Contact environment authorities",
        "Seek immediate environmental assistance",
        "Preserve all evidence",
        "Contact environment organizations"
      ],
      short: [
        "Follow up on environment resolution",
        "Monitor environment improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor environment quality",
        "Follow up on legal proceedings",
        "Update environment documentation",
        "Educate about environment rights"
      ]
    }
  }

  return plans[rightsType as keyof typeof plans] || plans.farmer_rights
}

function getAgricultureTimeline(rightsType: string, urgency: string) {
  const baseTimelines = {
    farmer_rights: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    land_rights: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "60-120 days"
    },
    crop_insurance: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    agricultural_subsidies: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    market_access: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    agricultural_labor: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    agricultural_technology: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    environmental_protection: {
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

  const timeline = baseTimelines[rightsType as keyof typeof baseTimelines] || baseTimelines.farmer_rights
  const multiplier = urgencyMultiplier[urgency as keyof typeof urgencyMultiplier] || 1

  return Object.keys(timeline).reduce((acc, key) => {
    const [start, end] = timeline[key as keyof typeof timeline].split('-')
    const startNum = parseInt(start) * multiplier
    const endNum = parseInt(end) * multiplier
    acc[key] = `${startNum}-${endNum} ${end.includes('day') ? 'days' : 'hours'}`
    return acc
  }, {} as any)
}

function getAgricultureChecklists(rightsType: string) {
  const checklists = {
    farmer_rights: {
      pre: [
        "Know farmer rights laws",
        "Document all agriculture-related incidents",
        "Keep agriculture records organized",
        "Know complaint procedures",
        "Have agriculture contacts ready"
      ],
      during: [
        "Document farmer rights violations",
        "Report to agriculture authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow agriculture procedures"
      ],
      post: [
        "Monitor farmer rights",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about farmer rights"
      ]
    },
    land_rights: {
      pre: [
        "Know land rights laws",
        "Document all land-related incidents",
        "Keep land records organized",
        "Know complaint procedures",
        "Have land contacts ready"
      ],
      during: [
        "Document land rights violations",
        "Report to land revenue authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Follow land procedures"
      ],
      post: [
        "Monitor land rights",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about land rights"
      ]
    },
    crop_insurance: {
      pre: [
        "Know insurance laws",
        "Document all insurance-related incidents",
        "Keep insurance records organized",
        "Know complaint procedures",
        "Have insurance contacts ready"
      ],
      during: [
        "Document insurance violations",
        "Report to insurance authorities",
        "Seek immediate compensation claims",
        "Preserve all evidence",
        "Follow insurance procedures"
      ],
      post: [
        "Monitor insurance quality",
        "Follow up on insurance resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about insurance rights"
      ]
    },
    agricultural_subsidies: {
      pre: [
        "Know subsidy laws",
        "Document all subsidy-related incidents",
        "Keep subsidy records organized",
        "Know complaint procedures",
        "Have subsidy contacts ready"
      ],
      during: [
        "Document subsidy violations",
        "Report to subsidy authorities",
        "Seek immediate subsidy assistance",
        "Preserve all evidence",
        "Follow subsidy procedures"
      ],
      post: [
        "Monitor subsidy quality",
        "Follow up on subsidy resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about subsidy rights"
      ]
    },
    market_access: {
      pre: [
        "Know market access laws",
        "Document all market-related incidents",
        "Keep market records organized",
        "Know complaint procedures",
        "Have market contacts ready"
      ],
      during: [
        "Document market access violations",
        "Report to market authorities",
        "Seek immediate market assistance",
        "Preserve all evidence",
        "Follow market procedures"
      ],
      post: [
        "Monitor market quality",
        "Follow up on market resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about market rights"
      ]
    },
    agricultural_labor: {
      pre: [
        "Know labor rights laws",
        "Document all labor-related incidents",
        "Keep labor records organized",
        "Know complaint procedures",
        "Have labor contacts ready"
      ],
      during: [
        "Document labor rights violations",
        "Report to labor authorities",
        "Seek immediate labor assistance",
        "Preserve all evidence",
        "Follow labor procedures"
      ],
      post: [
        "Monitor labor rights",
        "Follow up on labor resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about labor rights"
      ]
    },
    agricultural_technology: {
      pre: [
        "Know technology laws",
        "Document all technology-related incidents",
        "Keep technology records organized",
        "Know complaint procedures",
        "Have technology contacts ready"
      ],
      during: [
        "Document technology violations",
        "Report to technology authorities",
        "Seek immediate technology assistance",
        "Preserve all evidence",
        "Follow technology procedures"
      ],
      post: [
        "Monitor technology quality",
        "Follow up on technology resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about technology rights"
      ]
    },
    environmental_protection: {
      pre: [
        "Know environment protection laws",
        "Document all environment-related incidents",
        "Keep environment records organized",
        "Know complaint procedures",
        "Have environment contacts ready"
      ],
      during: [
        "Document environment violations",
        "Report to environment authorities",
        "Seek immediate environment assistance",
        "Preserve all evidence",
        "Follow environment procedures"
      ],
      post: [
        "Monitor environment quality",
        "Follow up on environment resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about environment rights"
      ]
    }
  }

  return checklists[rightsType as keyof typeof checklists] || checklists.farmer_rights
}

function getAgricultureTemplates(language: string = 'en') {
  return [
    {
      id: 1,
      title: "Farmer Rights Complaint",
      type: "farmer_rights",
      template: `To,
The Agriculture Department
[Agriculture Department Address]
[City]
[Pincode]
[Date]

Subject: Complaint Regarding Farmer Rights Violation

Dear Sir/Madam,

I, [Your Name], hereby file a complaint regarding farmer rights violation at [Farm Location].

Violation Details:
- Date of Violation: [Date]
- Time of Violation: [Time]
- Place of Violation: [Place]
- Nature of Violation: [Nature]
- Agriculture Staff Involved: [Staff Names]
- Impact on Farmer: [Impact Details]
- Witnesses: [Witness Names]

Legal Provisions:
This complaint is filed under the Farmer Rights Act and Article 21 of the Constitution which guarantees the right to livelihood through agriculture.

Prayer:
I request you to:
1. Investigate the farmer rights violation thoroughly
2. Take appropriate action against the violator
3. Ensure compliance with agriculture standards
4. Provide compensation for damages if applicable
5. Implement measures to prevent future violations

I am available for further investigation and can provide additional information as required.

Thank you.

Yours faithfully,
[Your Name]
[Phone Number]
[Email]
[Date]`,
      fields: ["Name", "Farm Location", "Date", "Time", "Place", "Nature", "Staff Names"]
    },
    {
      id: 2,
      title: "Land Rights Complaint",
      type: "land_rights",
      template: `To,
The Land Revenue Department
[Land Revenue Department Address]
[City]
[Pincode]
[Date]

Subject: Complaint Regarding Land Rights Violation

Dear Sir/Madam,

I, [Your Name], hereby file a complaint regarding land rights violation at [Land Location].

Violation Details:
- Date of Violation: [Date]
- Time of Violation: [Time]
- Place of Violation: [Place]
- Nature of Violation: [Nature]
- Land Officials Involved: [Officials Names]
- Impact on Landowner: [Impact Details]
- Witnesses: [Witness Names]

Legal Provisions:
This complaint is filed under the Land Rights Act and Article 300A of the Constitution which guarantees the right to property.

Prayer:
I request you to:
1. Investigate the land rights violation thoroughly
2. Take appropriate action against the violator
3. Ensure compliance with land regulations
4. Provide compensation for damages if applicable
5. Implement measures to prevent future violations

I am available for further investigation and can provide additional information as required.

Thank you.

Yours faithfully,
[Your Name]
[Phone Number]
[Email]
[Date]`,
      fields: ["Name", "Land Location", "Date", "Time", "Place", "Nature", "Officials Names"]
    }
  ]
}

function getAgricultureContacts(location: string) {
  const baseContacts = {
    national: [
      { name: "Ministry of Agriculture", phone: "011-2338225", type: "ministry" },
      { name: "Agriculture Authority", phone: "011-2338225", type: "national" },
      { name: "Agriculture Department", phone: "011-2338225", type: "department" }
    ],
    state: [
      { name: "State Agriculture Department", phone: "011-2338225", type: "state" },
      { name: "District Agriculture Office", phone: "011-2338225", type: "district" },
      { name: "Agriculture Extension Office", phone: "011-2338225", type: "extension" }
    ],
    support: [
      { name: "Farmer Support Services", phone: "011-2338225", type: "support" },
      { name: "Agriculture Counseling", phone: "011-2338225", type: "counseling" },
      { name: "Farmer Advisors", phone: "011-2338225", type: "advisor" }
    ]
  }

  return baseContacts.national
}

function getAgricultureStatistics() {
  return {
    totalComplaints: 300000,
    successRate: 70,
    averageResolutionTime: 45, // days
    farmerRightsCases: 60000,
    landRightsCases: 50000,
    cropInsuranceCases: 40000,
    subsidyCases: 30000,
    marketAccessCases: 25000,
    lastUpdated: new Date().toISOString()
  }
}

function getAgricultureIssueTypes() {
  return [
    {
      id: "farmer_rights",
      name: "Farmer Rights",
      description: "Rights and protections for farmers and agricultural workers",
      category: "rights",
      urgency: "high",
      constitutional: ["Article 21", "Article 14", "Article 19(1)(g)"],
      legal: ["Farmer Rights Act", "Agriculture Laws"],
      timeline: "30-60 days"
    },
    {
      id: "land_rights",
      name: "Land Rights",
      description: "Rights to own, use, and transfer agricultural land",
      category: "rights",
      urgency: "high",
      constitutional: ["Article 300A", "Article 14", "Article 21"],
      legal: ["Land Rights Act", "Land Revenue Laws"],
      timeline: "60-120 days"
    },
    {
      id: "crop_insurance",
      name: "Crop Insurance",
      description: "Insurance protection for crops against natural calamities",
      category: "insurance",
      urgency: "medium",
      constitutional: ["Article 21", "Article 14"],
      legal: ["Crop Insurance Act", "Insurance Regulations"],
      timeline: "30-60 days"
    },
    {
      id: "agricultural_subsidies",
      name: "Agricultural Subsidies",
      description: "Government subsidies for agricultural inputs and services",
      category: "subsidy",
      urgency: "medium",
      constitutional: ["Article 21", "Article 14"],
      legal: ["Subsidy Act", "Agriculture Policies"],
      timeline: "30-60 days"
    },
    {
      id: "market_access",
      name: "Market Access",
      description: "Access to agricultural markets and fair pricing",
      category: "market",
      urgency: "medium",
      constitutional: ["Article 21", "Article 14"],
      legal: ["Market Access Act", "Agriculture Market Laws"],
      timeline: "30-60 days"
    },
    {
      id: "agricultural_labor",
      name: "Agricultural Labor",
      description: "Rights and protections for agricultural laborers",
      category: "labor",
      urgency: "medium",
      constitutional: ["Article 21", "Article 14"],
      legal: ["Labor Act", "Agriculture Labor Laws"],
      timeline: "30-60 days"
    },
    {
      id: "agricultural_technology",
      name: "Agricultural Technology",
      description: "Access to modern agricultural technology and innovations",
      category: "technology",
      urgency: "medium",
      constitutional: ["Article 21", "Article 14"],
      legal: ["Technology Act", "Agriculture Tech Laws"],
      timeline: "30-60 days"
    },
    {
      id: "environmental_protection",
      name: "Environmental Protection",
      description: "Protection of agricultural environment from pollution",
      category: "environment",
      urgency: "medium",
      constitutional: ["Article 21", "Article 48A"],
      legal: ["Environment Protection Act", "Agriculture Environment Laws"],
      timeline: "30-60 days"
    }
  ]
}

function getRecentCases(language: string = 'en') {
  return [
    {
      id: 1,
      type: "farmer_rights",
      title: "Farmer Rights Protected",
      description: "Successfully protected farmer rights and improved agriculture policies",
      outcome: "success",
      timeline: "45 days",
      date: "2023-12-20",
      location: "Delhi",
      constitutional: "Article 21"
    },
    {
      id: 2,
      type: "land_rights",
      title: "Land Rights Case Won",
      description: "Successfully won land rights case with title confirmation",
      outcome: "success",
      timeline: "90 days",
      date: "2023-12-18",
      location: "Mumbai",
      constitutional: "Article 300A"
    },
    {
      id: 3,
      type: "crop_insurance",
      title: "Crop Insurance Claim Approved",
      description: "Successfully approved crop insurance claim with compensation",
      outcome: "success",
      timeline: "30 days",
      date: "2023-12-15",
      location: "Bangalore",
      constitutional: "Article 21"
    }
  ]
}

function getAgricultureConstitutionalBasis() {
  return {
    primary: {
      article: "Article 21",
      title: "Right to Livelihood",
      description: "Right to livelihood through agriculture and related activities",
      applications: ["all_agriculture"]
    },
    secondary: {
      article: "Article 19(1)(g)",
      title: "Right to Practice Agriculture",
      description: "Right to practice any profession, including agriculture",
      applications: ["all_agriculture"]
    },
    landmark: {
      case: "State of Maharashtra vs. K. K. Singh (2019)",
      title: "Farmer Rights",
      description: "Supreme Court judgment on farmer rights and land acquisition",
      applications: ["all_agriculture"]
    },
    legislation: {
      act: "Farmer Rights Act, 2002",
      title: "Farmer Rights Legislation",
      description: "Comprehensive law for farmer rights and protections",
      applications: ["all_agriculture"]
    },
    act: "Land Acquisition Act, 1894",
      title: "Land Acquisition Regulations",
      description: "Regulates land acquisition and compensation for farmers",
      applications: ["land_rights"]
    }
  }
}

function getAgricultureLaws() {
  return [
    {
      name: "Farmer Rights Act, 2002",
      description: "Comprehensive law for farmer rights and protections",
      year: 2002,
      provisions: ["farmer", "rights", "protection"],
      applications: ["all_agriculture"]
    },
    {
      name: "Land Acquisition Act, 1894",
      description: "Regulates land acquisition and compensation",
      year: 1894,
      provisions: ["land", "acquisition", "compensation"],
      applications: ["land_rights"]
    },
    {
      name: "Crop Insurance Act, 2007",
      description: "Provides for crop insurance and compensation",
      year: 2007,
      provisions: ["insurance", "crop", "compensation"],
      applications: ["crop_insurance"]
    },
    {
      name: "Agricultural Produce Market Committee Act, 2003",
      description: "Regulates agricultural markets and price support",
      year: 2003,
      provisions: ["market", "price", "support"],
      applications: ["market_access"]
    },
    {
      name: "Agricultural Labor Act, 1970",
      description: "Regulates agricultural labor conditions and wages",
      year: 1970,
      provisions: ["labor", "wages", "conditions"],
      applications: ["agricultural_labor"]
    },
    {
      name: "Environment Protection Act, 1986",
      description: "Protects environment from agricultural pollution",
      year: 1986,
      provisions: ["environment", "protection", "pollution"],
      applications: ["environmental_protection"]
    }
  ]
}

function getGovernmentAgricultureSchemes() {
  return [
    {
      name: "Pradhan Mantri Krishi Samman Nidhi (PM-KISAN)",
      url: "https://pmkisan.gov.in",
      description: "Income support scheme for farmers",
      services: ["income_support", "subsidy", "farmer"],
      contact: "1800-11-3377",
      coverage: "National"
    },
    {
      name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      url: "https://pmfby.gov.in",
      description: "Crop insurance scheme for farmers",
      services: ["crop_insurance", "compensation", "farmer"],
      contact: "1800-11-3377",
      coverage: "National"
    },
    {
      name: "Soil Health Card Scheme",
      url: "https://soilhealth.gov.in",
      description: "Soil health monitoring and improvement scheme",
      services: ["soil_health", "monitoring", "improvement"],
      contact: "011-2338225",
      coverage: "National"
    },
    {
      name: "National Mission on Agricultural Extension (NMAE)",
      url: "https://nmae.gov.in",
      description: "Agricultural extension and technology transfer",
      services: ["extension", "technology", "training"],
      contact: "011-2338225",
      coverage: "National"
    },
    {
      name: "Paramparagat Krishi Vikas Yojana (PKVY)",
      url: "https://pkvy.gov.in",
      description: "Cluster farming program for small farmers",
      services: ["cluster_farming", "small_farmers", "support"],
      contact: "1800-11-3377",
      coverage: "National"
    },
    {
      name: "National Mission on Natural Farming",
      url: "https://nmnf.gov.in",
      description: "Promotion of natural farming practices",
      services: ["natural_farming", "organic", "sustainable"],
      contact: "011-2338225",
      coverage: "National"
    }
  ]
}