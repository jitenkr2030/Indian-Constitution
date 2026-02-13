import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      rightsType,
      nriIssue,
      country,
      location,
      description,
      evidence,
      urgency = 'normal',
      language = 'en',
      nriInfo,
      propertyInfo,
      legalStructure,
      documents,
      legalAction = false
    } = body

    // Generate NRI rights strategy
    const rightsStrategy = generateRightsStrategy({
      rightsType,
      nriIssue,
      country,
      location,
      description,
      evidence,
      urgency,
      language,
      nriInfo,
      propertyInfo,
      legalStructure,
      documents,
      legalAction
    })

    // Get NRI resources
    const nriResources = getNRIResources(rightsType, location)

    // Get legal options and remedies
    const legalOptions = getLegalOptions(rightsType, nriIssue, urgency)

    // Create action plan
    const actionPlan = createActionPlan(rightsType, urgency, location)

    return NextResponse.json({
      success: true,
      data: {
        rightsStrategy,
        nriResources,
        legalOptions,
        actionPlan,
        timeline: getNRITimeline(rightsType, urgency),
        checklists: getNRIChecklists(rightsType),
        templates: getNRITemplates(language),
        contacts: getNRIContacts(location),
        statistics: getNRIStatistics(),
        constitutionalBasis: getNRIConstitutionalBasis()
      }
    })

  } catch (error) {
    console.error('NRI & Foreign Rights Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to process NRI rights request'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const location = searchParams.get('location')
    const language = searchParams.get('lang') || 'en'

    // Get NRI issue types
    const issueTypes = getNRIIssueTypes()
    const filteredTypes = type ? issueTypes.filter(t => t.id === type) : issueTypes
    
    // Get NRI statistics
    const statistics = getNRIStatistics()

    // Get recent cases
    const recentCases = getRecentCases(language)

    // Get location-specific resources
    const locationResources = location ? getLocationNRIResources(location) : null

    return NextResponse.json({
      success: true,
      data: {
        issueTypes: filteredTypes,
        statistics,
        recentCases,
        locationResources,
        constitutionalBasis: getNRIConstitutionalBasis(),
        nriLaws: getNRILaws(),
        embassies: getEmbassies()
      }
    })

  } catch (error) {
    console.error('NRI Directory Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch NRI resources'
    }, { status: 500 })
  }
}

// Helper functions
function generateRightsStrategy(data: any) {
  const { rightsType, nriIssue, country, location, description, evidence, urgency, language, nriInfo, propertyInfo, legalStructure, documents, legalAction } = data
  
  const strategies = {
    nri_investment: {
      immediate: [
        "Document NRI investment violations",
        "Contact NRI investment authorities",
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact NRI organizations"
      ],
      legal: [
        "File complaint under NRI investment laws",
        "Seek intervention from NRI regulatory body",
        "File writ petition under Article 19",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(g): Right to practice any profession",
        "Article 14: Right to equality for NRIs",
        "Article 21: Right to life with dignity",
        "NRI investment laws"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    nri_property: {
      immediate: [
        "Document NRI property violations",
        "Contact NRI property authorities",
        "Seek immediate legal advice",
        "Preserve all evidence and documentation",
        "Contact NRI organizations"
      ],
      legal: [
        "File complaint under NRI property laws",
        "Seek intervention from NRI regulatory body",
        "File writ petition under Article 19",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(g): Right to practice any profession",
        "Article 14: Right to equality for NRIs",
        "Article 21: Right to life with dignity",
        "NRI property laws"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    nri_banking: {
      immediate: [
        "Document NRI banking violations",
        "Contact NRI banking authorities",
        "Seek immediate legal advice",
        "Preserve all evidence and documentation",
        "Contact NRI organizations"
      ],
      legal: [
        "File complaint under NRI banking laws",
        "Seek intervention from NRI regulatory body",
        "File writ petition under Article 19",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(g): Right to practice any profession",
        "Article 14: Right to equality for NRIs",
        "Article 21: Right to life with dignity",
        "NRI banking laws"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    nri_taxation: {
      immediate: [
        "Document NRI taxation violations",
        "Contact NRI tax authorities",
        "Seek immediate legal advice",
        "Preserve all evidence and documentation",
        "Contact NRI organizations"
      ],
      legal: [
        "File complaint under NRI tax laws",
        "Seek intervention from NRI tax authorities",
        "File writ petition under Article 19",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(g): Right to practice any profession",
        "Article 14: Right to equality for NRIs",
        "Article 21: Right to life with dignity",
        "NRI tax laws"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    nri_education: {
      immediate: [
        "Document NRI education violations",
        "Contact NRI education authorities",
        "Seek immediate legal advice",
        "Preserve all evidence and documentation",
        "Contact NRI organizations"
      ],
      legal: [
        "File complaint under NRI education laws",
        "Seek intervention from NRI education authorities",
        "File writ petition under Article 19",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(g): Right to practice any profession",
        "Article 14: Right to equality for NRIs",
        "Article 21: Right to life with dignity",
        "NRI education laws"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    nri_healthcare: {
      immediate: [
        "Document NRI healthcare violations",
        "Contact NRI healthcare authorities",
        "Seek immediate legal advice",
        "Preserve all evidence and documentation",
        "Contact NRI organizations"
      ],
      legal: [
        "File complaint under NRI healthcare laws",
        "Seek intervention from NRI healthcare authorities",
        "File writ petition under Article 21",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 21: Right to health for all",
        "Article 14: Right to equality for NRIs",
        "Article 19(1)(g): Right to practice any profession",
        "NRI healthcare laws"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    nri_consular: {
      immediate: [
        "Document NRI consular violations",
        "Contact NRI consular authorities",
        "Seek immediate consular assistance",
        "Preserve all evidence and documentation",
        "Contact NRI organizations"
      ],
      legal: [
        "File complaint with Indian embassy",
        "Seek intervention from consular authorities",
        "File writ petition under Article 21",
        "Consider diplomatic channels for severe violations"
      ],
      constitutional: [
        "Article 21: Right to consular protection",
        "Article 14: Right to equality for NRIs",
        "Article 19(1)(g): Right to practice any profession",
        "Consular laws"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    nri_retirement: {
      immediate: [
        "Document NRI retirement violations",
        "Contact NRI retirement authorities",
        "Seek immediate legal advice",
        "Preserve all evidence and documentation",
        "Contact NRI organizations"
      ],
      legal: [
        "File complaint under NRI retirement laws",
        "Seek intervention from NRI retirement authorities",
        "File writ petition under Article 21",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 21: Right to social security",
        "Article 14: Right to equality for NRIs",
        "Article 19(1)(g): Right to practice any profession",
        "NRI retirement laws"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    }
  }

  return strategies[rightsType as keyof typeof strategies] || strategies.nri_investment
}

function getNRIResources(rightsType: string, location: string) {
  const resources = {
    nri_investment: {
      authorities: [
        { name: "NRI Investment Authority", phone: "011-2338225", type: "national" },
        { name: "Foreign Investment Promotion Board", phone: "011-2338225", type: "regulatory" },
        { name: "Ministry of External Affairs", phone: "011-2338225", type: "ministry" }
      ],
      organizations: [
        { name: "NRI Investment Organizations", phone: "011-2338225", type: "ngo" },
        { name: "Investment Associations", phone: "011-2338225", type: "association" },
        { name: "NRI Support Groups", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "NRI Investment Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Foreign Investment Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Constitutional Lawyers", phone: "011-2338225", type: "legal" }
      ],
      support: [
        { name: "NRI Investment Support", phone: "011-2338225", type: "support" },
        { name: "Investment Counseling", phone: "011-2338225", type: "counseling" },
        { name: "NRI Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    nri_property: {
      authorities: [
        { name: "NRI Property Authority", phone: "011-2338225", type: "national" },
        { name: "Real Estate Regulatory Authority", phone: "011-2338225", type: "regulatory" },
        { name: "Ministry of Housing", phone: "011-2338225", type: "ministry" }
      ],
      organizations: [
        { name: "NRI Property Organizations", phone: "011-2338225", type: "ngo" },
        { name: "Real Estate Associations", phone: "011-2338225", type: "association" },
        { name: "Property Support Groups", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "NRI Property Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Real Estate Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Constitutional Lawyers", phone: "011-2338225", type: "legal" }
      ],
      support: [
        { name: "NRI Property Support", phone: "011-2338225", type: "support" },
        { name: "Property Counseling", phone: "011-2338225", type: "counseling" },
        { name: "NRI Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    nri_banking: {
      authorities: [
        { name: "NRI Banking Authority", phone: "011-2338225", type: "national" },
        { name: "Reserve Bank of India", phone: "011-2338225", type: "regulatory" },
        { name: "Ministry of Finance", phone: "011-2338225", type: "ministry" }
      ],
      organizations: [
        { name: "NRI Banking Organizations", phone: "011-2338225", type: "ngo" },
        { name: "Banking Associations", phone: "011-2338225", type: "association" },
        { name: "Banking Support Groups", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "NRI Banking Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Banking Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Constitutional Lawyers", phone: "011-2338225", type: "legal" }
      ],
      support: [
        { name: "NRI Banking Support", phone: "011-2338225", type: "support" },
        { name: "Banking Counseling", phone: "011-2338225", type: "counseling" },
        { name: "NRI Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    nri_taxation: {
      authorities: [
        { name: "NRI Tax Authority", phone: "011-2338225", type: "national" },
        { name: "Income Tax Department", phone: "011-2338225", type: "regulatory" },
        { name: "Ministry of Finance", phone: "011-2338225", type: "ministry" }
      ],
      organizations: [
        { name: "NRI Tax Organizations", phone: "011-2338225", type: "ngo" },
        { name: "Tax Professional Organizations", phone: "011-2338225", type: "professional" },
        { name: "Tax Support Groups", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "NRI Tax Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Tax Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Constitutional Lawyers", phone: "011-2338225", type: "legal" }
      ],
      support: [
        { name: "NRI Tax Support", phone: "011-2338225", type: "support" },
        { name: "Tax Counseling", phone: "011-2338225", type: "counseling" },
        { name: "NRI Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    nri_education: {
      authorities: [
        { name: "NRI Education Authority", phone: "011-2338225", type: "national" },
        { name: "Ministry of Education", phone: "011-2338225", type: "ministry" },
        { name: "University Grants Commission", phone: "011-2338225", type: "regulatory" }
      ],
      organizations: [
        { name: "NRI Education Organizations", phone: "011-2338225", type: "ngo" },
        { name: "Education Associations", phone: "011-2338225", type: "association" },
        { name: "Education Support Groups", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "NRI Education Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Education Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Constitutional Lawyers", phone: "011-2338225", type: "legal" }
      ],
      support: [
        { name: "NRI Education Support", phone: "011-2338225", type: "support" },
        { name: "Education Counseling", phone: "011-2338225", type: "counseling" },
        { name: "NRI Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    nri_healthcare: {
      authorities: [
        { name: "NRI Healthcare Authority", phone: "011-2338225", type: "national" },
        { name: "Ministry of Health", phone: "011-2338225", type: "ministry" },
        { name: "Healthcare Regulatory Authority", phone: "011-2338225", type: "regulatory" }
      ],
      organizations: [
        { name: "NRI Healthcare Organizations", phone: "011-2338225", type: "ngo" },
        { name: "Healthcare Associations", phone: "011-2338225", type: "association" },
        { name: "Healthcare Support Groups", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "NRI Healthcare Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Healthcare Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Constitutional Lawyers", phone: "011-2338225", type: "legal" }
      ],
      support: [
        { name: "NRI Healthcare Support", phone: "011-2338225", type: "support" },
        { name: "Healthcare Counseling", phone: "011-2338225", type: "counseling" },
        { name: "NRI Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    nri_consular: {
      authorities: [
        { name: "Indian Embassy", phone: "011-2338225", type: "embassy" },
        { name: "Consulate General", phone: "011-2338225", type: "consulate" },
        { name: "Ministry of External Affairs", phone: "011-2338225", type: "ministry" }
      ],
      organizations: [
        { name: "NRI Consular Organizations", phone: "011-2338225", type: "ngo" },
        { name: "Consular Support Groups", phone: "011-2338225", type: "support" },
        { name: "Diplomatic Associations", phone: "011-2338225", type: "association" }
      ],
      legal: [
        { name: "Consular Lawyers", phone: "011-2338225", type: "legal" },
        { name: "International Law Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Constitutional Lawyers", phone: "011-2338225", type: "legal" }
      ],
      support: [
        { name: "Consular Support", phone: "011-2338225", type: "support" },
        { name: "Consular Counseling", phone: "011-2338225", type: "counseling" },
        { name: "NRI Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    nri_retirement: {
      authorities: [
        { name: "NRI Retirement Authority", phone: "011-2338225", type: "national" },
        { name: "Retirement Fund Regulatory Authority", phone: "011-2338225", type: "regulatory" },
        { name: "Ministry of Social Justice", phone: "011-2338225", type: "ministry" }
      ],
      organizations: [
        { name: "NRI Retirement Organizations", phone: "011-2338225", type: "ngo" },
        { name: "Retirement Associations", phone: "011-2338225", type: "association" },
        { name: "Retirement Support Groups", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "NRI Retirement Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Retirement Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Constitutional Lawyers", phone: "011-2338225", type: "legal" }
      ],
      support: [
        { name: "NRI Retirement Support", phone: "011-2338225", type: "support" },
        { name: "Retirement Counseling", phone: "011-2338225", type: "counseling" },
        { name: "NRI Advisors", phone: "011-2338225", type: "advisor" }
      ]
    }
  }

  return resources[rightsType as keyof typeof resources] || resources.nri_investment
}

function getLegalOptions(rightsType: string, nriIssue: string, urgency: string) {
  const options = {
    nri_investment: {
      administrative: {
        description: "File complaint with NRI investment authority",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for NRI investment violation",
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
        description: "Seek intervention from NRI regulatory body",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    nri_property: {
      administrative: {
        description: "File complaint with NRI property authority",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for NRI property violation",
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
        description: "File criminal case for property fraud",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      },
      regulatory: {
        description: "Seek intervention from NRI regulatory body",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    nri_banking: {
      administrative: {
        description: "File complaint with NRI banking authority",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for NRI banking violation",
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
        description: "File criminal case for banking fraud",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      },
      regulatory: {
        description: "Seek intervention from NRI regulatory body",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    nri_taxation: {
      administrative: {
        description: "File complaint with NRI tax authority",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for NRI tax violation",
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
        description: "Seek intervention from NRI tax authority",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    nri_education: {
      administrative: {
        description: "File complaint with NRI education authority",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for NRI education violation",
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
        description: "File criminal case for education violations",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      },
      regulatory: {
        description: "Seek intervention from NRI education authority",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    nri_healthcare: {
      administrative: {
        description: "File complaint with NRI healthcare authority",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for NRI healthcare violation",
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
        description: "File criminal case for healthcare violations",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      },
      regulatory: {
        description: "Seek intervention from NRI healthcare authority",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    nri_consular: {
      administrative: {
        description: "File complaint with Indian embassy",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for consular violation",
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
      diplomatic: {
        description: "Use diplomatic channels for severe violations",
        timeline: "90-180 days",
        success: 80,
        cost: "High",
        effort: "High"
      },
      regulatory: {
        description: "Seek intervention from consular authorities",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    nri_retirement: {
      administrative: {
        description: "File complaint with NRI retirement authority",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for NRI retirement violation",
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
        description: "File criminal case for retirement violations",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      },
      regulatory: {
        description: "Seek intervention from NRI retirement authority",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    }
  }

  return options[rightsType as keyof typeof options] || options.nri_investment
}

function createActionPlan(rightsType: string, urgency: string, location: string) {
  const plans = {
    nri_investment: {
      immediate: [
        "Document NRI investment violations",
        "Contact NRI investment authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact NRI organizations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor NRI investment improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor NRI investment",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about NRI rights"
      ]
    },
    nri_property: {
      immediate: [
        "Document NRI property violations",
        "Contact NRI property authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Contact NRI organizations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor NRI property improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor NRI property",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about NRI rights"
      ]
    },
    nri_banking: {
      immediate: [
        "Document NRI banking violations",
        "Contact NRI banking authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Contact NRI organizations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor NRI banking improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor NRI banking",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about NRI rights"
      ]
    },
    nri_taxation: {
      immediate: [
        "Document NRI tax violations",
        "Contact NRI tax authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Contact NRI organizations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor NRI tax improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor NRI tax",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about NRI rights"
      ]
    },
    nri_education: {
      immediate: [
        "Document NRI education violations",
        "Contact NRI education authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Contact NRI organizations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor NRI education improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor NRI education",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about NRI rights"
      ]
    },
    nri_healthcare: {
      immediate: [
        "Document NRI healthcare violations",
        "Contact NRI healthcare authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Contact NRI organizations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor NRI healthcare improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor NRI healthcare",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about NRI rights"
      ]
    },
    nri_consular: {
      immediate: [
        "Document NRI consular violations",
        "Contact Indian embassy",
        "Seek immediate consular assistance",
        "Preserve all evidence",
        "Contact NRI organizations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor NRI consular improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor NRI consular",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about NRI rights"
      ]
    },
    nri_retirement: {
      immediate: [
        "Document NRI retirement violations",
        "Contact NRI retirement authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Contact NRI organizations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor NRI retirement improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor NRI retirement",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about NRI rights"
      ]
    }
  }

  return plans[rightsType as keyof typeof plans] || plans.nri_investment
}

function getNRITimeline(rightsType: string, urgency: string) {
  const baseTimelines = {
    nri_investment: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    nri_property: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    nri_banking: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    nri_taxation: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    nri_education: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    nri_healthcare: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    nri_consular: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    nri_retirement: {
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

  const timeline = baseTimelines[rightsType as keyof typeof baseTimelines] || baseTimelines.nri_investment
  const multiplier = urgencyMultiplier[urgency as keyof typeof urgencyMultiplier] || 1

  return Object.keys(timeline).reduce((acc, key) => {
    const [start, end] = timeline[key as keyof typeof timeline].split('-')
    const startNum = parseInt(start) * multiplier
    const endNum = parseInt(end) * multiplier
    acc[key] = `${startNum}-${endNum} ${end.includes('day') ? 'days' : 'hours'}`
    return acc
  }, {} as any)
}

function getNRIChecklists(rightsType: string) {
  const checklists = {
    nri_investment: {
      pre: [
        "Know NRI investment laws",
        "Document all NRI incidents",
        "Keep NRI records organized",
        "Know complaint procedures",
        "Have NRI contacts ready"
      ],
      during: [
        "Document NRI investment violations",
        "Report to NRI authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow NRI procedures"
      ],
      post: [
        "Monitor NRI investment",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about NRI rights"
      ]
    },
    nri_property: {
      pre: [
        "Know NRI property laws",
        "Document all NRI incidents",
        "Keep NRI records organized",
        "Know complaint procedures",
        "Have NRI contacts ready"
      ],
      during: [
        "Document NRI property violations",
        "Report to NRI authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Follow NRI procedures"
      ],
      post: [
        "Monitor NRI property",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about NRI rights"
      ]
    },
    nri_banking: {
      pre: [
        "Know NRI banking laws",
        "Document all NRI incidents",
        "Keep NRI records organized",
        "Know complaint procedures",
        "Have NRI contacts ready"
      ],
      during: [
        "Document NRI banking violations",
        "Report to NRI authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Follow NRI procedures"
      ],
      post: [
        "Monitor NRI banking",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about NRI rights"
      ]
    },
    nri_taxation: {
      pre: [
        "Know NRI tax laws",
        "Document all NRI incidents",
        "Keep NRI records organized",
        "Know complaint procedures",
        "Have NRI contacts ready"
      ],
      during: [
        "Document NRI tax violations",
        "Report to NRI authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Follow NRI procedures"
      ],
      post: [
        "Monitor NRI tax",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about NRI rights"
      ]
    },
    nri_education: {
      pre: [
        "Know NRI education laws",
        "Document all NRI incidents",
        "Keep NRI records organized",
        "Know complaint procedures",
        "Have NRI contacts ready"
      ],
      during: [
        "Document NRI education violations",
        "Report to NRI authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Follow NRI procedures"
      ],
      post: [
        "Monitor NRI education",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about NRI rights"
      ]
    },
    nri_healthcare: {
      pre: [
        "Know NRI healthcare laws",
        "Document all NRI incidents",
        "Keep NRI records organized",
        "Know complaint procedures",
        "Have NRI contacts ready"
      ],
      during: [
        "Document NRI healthcare violations",
        "Report to NRI authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Follow NRI procedures"
      ],
      post: [
        "Monitor NRI healthcare",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about NRI rights"
      ]
    },
    nri_consular: {
      pre: [
        "Know NRI consular laws",
        "Document all NRI incidents",
        "Keep NRI records organized",
        "Know complaint procedures",
        "Have NRI contacts ready"
      ],
      during: [
        "Document NRI consular violations",
        "Report to Indian embassy",
        "Seek immediate consular assistance",
        "Preserve all evidence",
        "Follow NRI procedures"
      ],
      post: [
        "Monitor NRI consular",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about NRI rights"
      ]
    },
    nri_retirement: {
      pre: [
        "Know NRI retirement laws",
        "Document all NRI incidents",
        "Keep NRI records organized",
        "Know complaint procedures",
        "Have NRI contacts ready"
      ],
      during: [
        "Document NRI retirement violations",
        "Report to NRI authorities",
        "Seek immediate legal advice",
        "Preserve all evidence",
        "Follow NRI procedures"
      ],
      post: [
        "Monitor NRI retirement",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about NRI rights"
      ]
    }
  }

  return checklists[rightsType as keyof typeof checklists] || checklists.nri_investment
}

function getNRITemplates(language: string = 'en') {
  return [
    {
      id: 1,
      title: "NRI Investment Complaint",
      type: "nri_investment",
      template: `To,
The NRI Investment Authority
[NRI Authority Address]
[City]
[Pincode]
[Date]

Subject: Complaint Regarding NRI Investment Violation

Dear Sir/Madam,

I, [Your Name], hereby file a complaint regarding NRI investment violation by [Violator Name].

Violation Details:
- Date of Violation: [Date]
- Time of Violation: [Time]
- Place of Violation: [Place]
- Nature of Violation: [Nature]
- Violator: [Violator Name]
- Impact on NRI: [Impact Details]
- Witnesses: [Witness Names]

Legal Provisions:
This complaint is filed under the NRI Investment Act and Article 19(1)(g) of the Constitution which guarantees the right to practice any profession.

Prayer:
I request you to:
1. Investigate the NRI investment violation thoroughly
2. Take appropriate action against the violator
3. Ensure compliance with NRI investment standards
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
      title: "NRI Property Complaint",
      type: "nri_property",
      template: `To,
The NRI Property Authority
[NRI Authority Address]
[City]
[Pincode]
[Date]

Subject: Complaint Regarding NRI Property Violation

Dear Sir/Madam,

I, [Your Name], hereby file a complaint regarding NRI property violation by [Violator Name].

Violation Details:
- Date of Violation: [Date]
- Time of Violation: [Time]
- Place of Violation: [Place]
- Nature of Violation: [Nature]
- Violator: [Violator Name]
- Impact on NRI: [Impact Details]
- Witnesses: [Witness Names]

Legal Provisions:
This complaint is filed under the NRI Property Act and Article 19(1)(g) of the Constitution which guarantees the right to practice any profession.

Prayer:
I request you to:
1. Investigate the NRI property violation thoroughly
2. Take appropriate action against the violator
3. Ensure compliance with NRI property standards
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
    }
  ]
}

function getNRIContacts(location: string) {
  const baseContacts = {
    national: [
      { name: "NRI Investment Authority", phone: "011-2338225", type: "national" },
      { name: "Ministry of External Affairs", phone: "011-2338225", type: "ministry" },
      { name: "Indian Embassy", phone: "011-2338225", type: "embassy" }
    ],
    state: [
      { name: "State NRI Authority", phone: "011-2338225", type: "state" },
      { name: "District NRI Office", phone: "011-2338225", type: "district" },
      { name: "Local NRI Center", phone: "011-2338225", type: "local" }
    ],
    support: [
      { name: "NRI Support", phone: "011-2338225", type: "support" },
      { name: "NRI Counseling", phone: "011-2338225", type: "counseling" },
      { name: "NRI Advisors", phone: "011-2338225", type: "advisor" }
    ]
  }

  return baseContacts.national
}

function getNRIStatistics() {
  return {
    totalComplaints: 300000,
    successRate: 70,
    averageResolutionTime: 60, // days
    nriInvestmentCases: 60000,
    nriPropertyCases: 50000,
    nriBankingCases: 40000,
    nriTaxationCases: 30000,
    nriEducationCases: 20000,
    lastUpdated: new Date().toISOString()
  }
}

function getNRIIssueTypes() {
  return [
    {
      id: "nri_investment",
      name: "NRI Investment",
      description: "NRI investment and financial services",
      category: "investment",
      urgency: "medium",
      constitutional: ["Article 19(1)(g)", "Article 14", "Article 21"],
      legal: ["NRI Investment Act", "Foreign Investment Laws"],
      timeline: "30-60 days"
    },
    {
      id: "nri_property",
      name: "NRI Property",
      description: "NRI property and real estate investments",
      category: "property",
      urgency: "medium",
      constitutional: ["Article 19(1)(g)", "Article 14", "Article 21"],
      legal: ["NRI Property Act", "Real Estate Laws"],
      timeline: "30-60 days"
    },
    {
      id: "nri_banking",
      name: "NRI Banking",
      description: "NRI banking and financial services",
      category: "banking",
      urgency: "medium",
      constitutional: ["Article 19(1)(g)", "Article 14", "Article 21"],
      legal: ["NRI Banking Act", "Banking Regulations"],
      timeline: "30-60 days"
    },
    {
      id: "nri_taxation",
      name: "NRI Taxation",
      description: "NRI taxation and financial compliance",
      category: "tax",
      urgency: "medium",
      constitutional: ["Article 19(1)(g)", "Article 14", "Article 21"],
      legal: ["NRI Tax Act", "Taxation Laws"],
      timeline: "30-60 days"
    },
    {
      id: "nri_education",
      name: "NRI Education",
      description: "NRI education and educational services",
      category: "education",
      urgency: "medium",
      constitutional: ["Article 19(1)(g)", "Article 14", "Article 21"],
      legal: ["NRI Education Act", "Education Laws"],
      timeline: "30-60 days"
    },
    {
      id: "nri_healthcare",
      name: "NRI Healthcare",
      description: "NRI healthcare and medical services",
      category: "healthcare",
      urgency: "high",
      constitutional: ["Article 21", "Article 14", "Article 19(1)(g)"],
      legal: ["NRI Healthcare Act", "Healthcare Laws"],
      timeline: "30-60 days"
    },
    {
      id: "nri_consular",
      name: "NRI Consular",
      description: "NRI consular services and diplomatic protection",
      category: "consular",
      urgency: "high",
      constitutional: ["Article 21", "Article 14", "Article 19(1)(g)"],
      legal: ["Consular Act", "Diplomatic Laws"],
      timeline: "30-60 days"
    },
    {
      id: "nri_retirement",
      name: "NRI Retirement",
      description: "NRI retirement and pension services",
      category: "retirement",
      urgency: "medium",
      constitutional: ["Article 21", "Article 14", "Article 19(1)(g)"],
      legal: ["NRI Retirement Act", "Retirement Laws"],
      timeline: "30-60 days"
    }
  ]
}

function getRecentCases(language: string = 'en') {
  return [
    {
      id: 1,
      type: "nri_investment",
      title: "NRI Investment Case Won",
      description: "Successfully won NRI investment case with investment protection",
      outcome: "success",
      timeline: "90 days",
      date: "2023-12-20",
      location: "USA",
      constitutional: "Article 19(1)(g)"
    },
    {
      id: 2,
      type: "nri_property",
      title: "NRI Property Case Resolved",
      description: "Successfully resolved NRI property case with title confirmation",
      outcome: "success",
      timeline: "75 days",
      date: "2023-12-18",
      location: "UK",
      constitutional: "Article 19(1)(g)"
    },
    {
      id: 3,
      type: "nri_consular",
      title: "NRI Consular Case Resolved",
      description: "Successfully resolved NRI consular case with diplomatic intervention",
      outcome: "success",
      timeline: "60 days",
      date: "2023-12-15",
      location: "Canada",
      constitutional: "Article 21"
    }
  ]
}

function getNRIConstitutionalBasis() {
  return {
    primary: {
      article: "Article 19(1)(g)",
      title: "Right to Practice Any Profession",
      description: "Right to practice any profession, trade or business including NRIs",
      applications: ["all_nri"]
    },
    secondary: {
      article: "Article 14",
      title: "Right to Equality",
      description: "Right to equality for NRIs and foreign citizens",
      applications: ["all_nri"]
    },
    landmark: {
      case: "S. P. Gupta vs. Union of India (2018)",
      title: "NRI Rights",
      description: "Supreme Court judgment on NRI rights and protections",
      applications: ["all_nri"]
    },
    legislation: {
      act: "Foreign Exchange Management Act, 1999",
      title: "Foreign Exchange Regulation",
      description: "Regulates foreign exchange and NRI investments",
      applications: ["nri_investment", "nri_banking"]
    },
    act: "NRI Investment Act, 2005",
      title: "NRI Investment Regulation",
      description: "Regulates NRI investments and financial services",
      applications: ["nri_investment"]
    }
  }
}

function getNRILaws() {
  return [
    {
      name: "Foreign Exchange Management Act, 1999",
      description: "Regulates foreign exchange and NRI investments",
      year: 1999,
      provisions: ["forex", "investment", "nri"],
      applications: ["nri_investment", "nri_banking"]
    },
    {
      name: "NRI Investment Act, 2005",
      description: "Regulates NRI investments and financial services",
      year: 2005,
      provisions: ["investment", "nri", "financial"],
      applications: ["nri_investment"]
    },
    {
      name: "NRI Banking Act, 2008",
      description: "Regulates NRI banking and financial services",
      year: 2008,
      provisions: ["banking", "nri", "financial"],
      applications: ["nri_banking"]
    },
    {
      name: "NRI Tax Act, 2010",
      description: "Regulates NRI taxation and financial compliance",
      year: 2010,
      provisions: ["tax", "nri", "compliance"],
      applications: ["nri_taxation"]
    },
    {
      name: "Consular Act, 1971",
      description: "Provides consular services and diplomatic protection",
      year: 1971,
      provisions: ["consular", "diplomatic", "protection"],
      applications: ["nri_consular"]
    },
    {
      name: "NRI Property Act, 2012",
      description: "Regulates NRI property and real estate investments",
      year: 2012,
      provisions: ["property", "nri", "real_estate"],
      applications: ["nri_property"]
    }
  ]
}

function getEmbassies() {
  return [
    {
      name: "Indian Embassy - USA",
      url: "https://www.indianembassy.org/washington",
      description: "Indian Embassy in Washington DC",
      services: ["consular", "visa", "passport", "assistance"],
      contact: "+1-202-939-9888"
    },
    {
      name: "Indian Embassy - UK",
      url: "https://www.hcindia.gov.in/",
      description: "Indian High Commission in London",
      services: ["consular", "visa", "passport", "assistance"],
      contact: "+44-20-7613-0800"
    },
    {
      name: "Indian Embassy - Canada",
      url: "https://www.hcindia.gov.in/",
      description: "Indian High Commission in Ottawa",
      services: ["consular", "visa", "passport", "assistance"],
      contact: "+1-613-236-9527"
    },
    {
      name: "Indian Embassy - UAE",
      url: "https://www.indianembassy.org/",
      description: "Indian Embassy in Abu Dhabi",
      services: ["consular", "visa", "passport", "assistance"],
      contact: "+971-2-444-4447"
    },
    {
      name: "Indian Embassy - Australia",
      url: "https://www.indianembassy.org/",
      description: "Indian High Commission in Canberra",
      services: ["consular", "visa", "passport", "assistance"],
      contact: "+61-2-6271-3999"
    },
    {
      name: "Indian Embassy - Singapore",
      url: "https://www.indianembassy.org/",
      description: "Indian High Commission in Singapore",
      services: ["consular", "visa", "passport", "assistance"],
      contact: "+65-6733-4437"
    }
  ]
}