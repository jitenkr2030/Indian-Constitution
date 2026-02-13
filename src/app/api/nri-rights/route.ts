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
      documents,
      legalAction
    })

    // Get NRI resources
    const nriResources = getNRIResources(rightsType, country)

    // Get legal options and remedies
    const legalOptions = getLegalOptions(rightsType, nriIssue, urgency)

    // Create action plan
    const actionPlan = createActionPlan(rightsType, urgency, country)

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
        contacts: getNRIContacts(country),
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
    const country = searchParams.get('country')
    const language = searchParams.get('lang') || 'en'

    // Get NRI issue types
    const issueTypes = getNRIIssueTypes()
    const filteredTypes = type ? issueTypes.filter(t => t.id === type) : issueTypes
    
    // Get NRI statistics
    const statistics = getNRIStatistics()

    // Get recent cases
    const recentCases = getRecentCases(language)

    // Get country-specific resources
    const countryResources = country ? getCountryNRIResources(country) : null

    return NextResponse.json({
      success: true,
      data: {
        issueTypes: filteredTypes,
        statistics,
        recentCases,
        countryResources,
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
  const { rightsType, nriIssue, country, location, description, evidence, urgency, language, nriInfo, propertyInfo, documents, legalAction } = data
  
  const strategies = {
    nri_property: {
      immediate: [
        "Document NRI property violations",
        "Contact NRI property authorities",
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact NRI support organizations"
      ],
      legal: [
        "File complaint under NRI property laws",
        "Seek intervention from NRI authorities",
        "File writ petition under Article 14",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 14: Right to equality for NRI",
        "Article 19(1)(g): Right to practice any profession",
        "Article 21: Right to life with dignity",
        "NRI Property Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    nri_investment: {
      immediate: [
        "Document NRI investment violations",
        "Contact NRI investment authorities",
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact NRI support organizations"
      ],
      legal: [
        "File complaint under NRI investment laws",
        "Seek intervention from investment authorities",
        "File writ petition under Article 19(1)(g)",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(g): Right to practice any profession",
        "Article 14: Right to equality in investment",
        "Article 21: Right to life with dignity",
        "NRI Investment Act provisions"
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
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact NRI support organizations"
      ],
      legal: [
        "File complaint under NRI banking laws",
        "Seek intervention from banking authorities",
        "File writ petition under Article 19(1)(g)",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 19(1)(g): Right to practice any profession",
        "Article 14: Right to equality in banking",
        "Article 21: Right to life with dignity",
        "NRI Banking Act provisions"
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
        "Document NRI tax violations",
        "Contact NRI tax authorities",
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact NRI support organizations"
      ],
      legal: [
        "File complaint under NRI tax laws",
        "Seek intervention from tax authorities",
        "File writ petition under Article 14",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 14: Right to equality in taxation",
        "Article 19(1)(g): Right to practice any profession",
        "Article 21: Right to life with dignity",
        "NRI Tax Act provisions"
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
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact NRI support organizations"
      ],
      legal: [
        "File complaint under NRI education laws",
        "Seek intervention from education authorities",
        "File writ petition under Article 21A",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 21A: Right to education",
        "Article 14: Right to equality in education",
        "Article 21: Right to life with dignity",
        "NRI Education Act provisions"
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
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact NRI support organizations"
      ],
      legal: [
        "File complaint under NRI healthcare laws",
        "Seek intervention from healthcare authorities",
        "File writ petition under Article 21",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 21: Right to health and medical care",
        "Article 14: Right to equality in healthcare",
        "Article 21A: Right to education",
        "NRI Healthcare Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    nri_legal: {
      immediate: [
        "Document NRI legal violations",
        "Contact NRI legal authorities",
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact NRI support organizations"
      ],
      legal: [
        "File complaint under NRI legal laws",
        "Seek intervention from legal authorities",
        "File writ petition under Article 14",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 14: Right to equality in legal matters",
        "Article 19(1)(g): Right to practice any profession",
        "Article 21: Right to life with dignity",
        "NRI Legal Act provisions"
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
        "Seek immediate consular assistance if needed",
        "Preserve all evidence and documentation",
        "Contact NRI support organizations"
      ],
      legal: [
        "File complaint with consular authorities",
        "Seek intervention from embassy",
        "File writ petition under Article 21",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 21: Right to consular protection",
        "Article 14: Right to equality in consular services",
        "Article 19(1)(g): Right to practice any profession",
        "Consular Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    }
  }

  return strategies[rightsType as keyof typeof strategies] || strategies.nri_property
}

function getNRIResources(rightsType: string, country: string) {
  const resources = {
    nri_property: {
      authorities: [
        { name: "NRI Property Authority", phone: "011-2338225", type: "regulatory" },
        { name: "Ministry of External Affairs", phone: "011-2338225", type: "ministry" },
        { name: "State NRI Department", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "NRI Property Associations", phone: "011-2338225", type: "association" },
        { name: "NRI Support Groups", phone: "011-2338225", type: "support" },
        { name: "NRI Community Groups", phone: "011-2338225", type: "community" }
      ],
      legal: [
        { name: "NRI Property Lawyers", phone: "011-2338225", type: "legal" },
        { name: "International Property Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "NRI Property Support", phone: "011-2338225", type: "support" },
        { name: "Property Counseling", phone: "011-2338225", type: "counseling" },
        { name: "NRI Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    nri_investment: {
      authorities: [
        { name: "NRI Investment Authority", phone: "011-2338225", type: "regulatory" },
        { name: "Ministry of Finance", phone: "011-2338225", type: "ministry" },
        { name: "State Investment Department", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "NRI Investment Associations", phone: "011-2338225", type: "association" },
        { name: "Investment Support Groups", phone: "011-2338225", type: "support" },
        { name: "NRI Community Groups", phone: "011-2338225", type: "community" }
      ],
      legal: [
        { name: "NRI Investment Lawyers", phone: "011-2338225", type: "legal" },
        { name: "International Investment Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "NRI Investment Support", phone: "011-2338225", type: "support" },
        { name: "Investment Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Investment Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    nri_banking: {
      authorities: [
        { name: "NRI Banking Authority", phone: "011-2338225", type: "regulatory" },
        { name: "Reserve Bank of India", phone: "011-2338225", type: "regulatory" },
        { name: "State Banking Department", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "NRI Banking Associations", phone: "011-2338225", type: "association" },
        { name: "Banking Support Groups", phone: "011-2338225", type: "support" },
        { name: "NRI Community Groups", phone: "011-2338225", type: "community" }
      ],
      legal: [
        { name: "NRI Banking Lawyers", phone: "011-2338225", type: "legal" },
        { name: "International Banking Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "NRI Banking Support", phone: "011-2338225", type: "support" },
        { name: "Banking Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Banking Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    nri_taxation: {
      authorities: [
        { name: "NRI Tax Authority", phone: "011-2338225", type: "regulatory" },
        { name: "Income Tax Department", phone: "011-2338225", type: "regulatory" },
        { name: "State Tax Department", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "NRI Tax Associations", phone: "011-2338225", type: "association" },
        { name: "Tax Support Groups", phone: "011-2338225", type: "support" },
        { name: "NRI Community Groups", phone: "011-2338225", type: "community" }
      ],
      legal: [
        { name: "NRI Tax Lawyers", phone: "011-2338225", type: "legal" },
        { name: "International Tax Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "NRI Tax Support", phone: "011-2338225", type: "support" },
        { name: "Tax Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Tax Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    nri_education: {
      authorities: [
        { name: "NRI Education Authority", phone: "011-2338225", type: "regulatory" },
        { name: "Ministry of Education", phone: "011-2338225", type: "ministry" },
        { name: "State Education Department", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "NRI Education Associations", phone: "011-2338225", type: "association" },
        { name: "Education Support Groups", phone: "011-2338225", type: "support" },
        { name: "NRI Community Groups", phone: "011-2338225", type: "community" }
      ],
      legal: [
        { name: "NRI Education Lawyers", phone: "011-2338225", type: "legal" },
        { name: "International Education Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "NRI Education Support", phone: "011-2338225", type: "support" },
        { name: "Education Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Education Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    nri_healthcare: {
      authorities: [
        { name: "NRI Healthcare Authority", phone: "011-2338225", type: "regulatory" },
        { name: "Ministry of Health", phone: "011-2338225", type: "ministry" },
        { name: "State Health Department", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "NRI Healthcare Associations", phone: "011-2338225", type: "association" },
        { name: "Healthcare Support Groups", phone: "011-2338225", type: "support" },
        { name: "NRI Community Groups", phone: "011-2338225", type: "community" }
      ],
      legal: [
        { name: "NRI Healthcare Lawyers", phone: "011-2338225", type: "legal" },
        { name: "International Healthcare Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "NRI Healthcare Support", phone: "011-2338225", type: "support" },
        { name: "Healthcare Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Healthcare Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    nri_legal: {
      authorities: [
        { name: "NRI Legal Authority", phone: "011-2338225", type: "regulatory" },
        { name: "Ministry of Law", phone: "011-2338225", type: "ministry" },
        { name: "State Legal Department", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "NRI Legal Associations", phone: "011-2338225", type: "association" },
        { name: "Legal Support Groups", phone: "011-2338225", type: "support" },
        { name: "NRI Community Groups", phone: "011-2338225", type: "community" }
      ],
      legal: [
        { name: "NRI Legal Lawyers", phone: "011-2338225", type: "legal" },
        { name: "International Legal Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "NRI Legal Support", phone: "011-2338225", type: "support" },
        { name: "Legal Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Legal Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    nri_consular: {
      authorities: [
        { name: "NRI Consular Authority", phone: "011-2338225", type: "regulatory" },
        { name: "Ministry of External Affairs", phone: "011-2338225", type: "ministry" },
        { name: "Indian Embassy", phone: "011-2338225", type: "embassy" }
      ],
      organizations: [
        { name: "NRI Consular Associations", phone: "011-2338225", type: "association" },
        { name: "Consular Support Groups", phone: "011-2338225", type: "support" },
        { name: "NRI Community Groups", phone: "011-2338225", type: "community" }
      ],
      legal: [
        { name: "NRI Consular Lawyers", phone: "011-2338225", type: "legal" },
        { name: "International Consular Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "NRI Consular Support", phone: "011-2338225", type: "support" },
        { name: "Consular Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Consular Advisors", phone: "011-2338225", type: "advisor" }
      ]
    }
  }

  return resources[rightsType as keyof typeof resources] || resources.nri_property
}

function getLegalOptions(rightsType: string, nriIssue: string, urgency: string) {
  const options = {
    nri_property: {
      administrative: {
        description: "File complaint with NRI property authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for NRI property violations",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 14",
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
        description: "Seek intervention from NRI authorities",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    nri_investment: {
      administrative: {
        description: "File complaint with NRI investment authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for NRI investment violations",
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
        description: "Seek intervention from investment authorities",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    nri_banking: {
      administrative: {
        description: "File complaint with NRI banking authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for NRI banking violations",
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
        description: "Seek intervention from banking authorities",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    nri_taxation: {
      administrative: {
        description: "File complaint with NRI tax authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for NRI tax violations",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 14",
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
    nri_education: {
      administrative: {
        description: "File complaint with NRI education authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for NRI education violations",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 21A",
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
        description: "Seek intervention from education authorities",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    nri_healthcare: {
      administrative: {
        description: "File complaint with NRI healthcare authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for NRI healthcare violations",
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
        description: "Seek intervention from healthcare authorities",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    nri_legal: {
      administrative: {
        description: "File complaint with NRI legal authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for NRI legal violations",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      constitutional: {
        description: "File writ petition under Article 14",
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
        description: "Seek intervention from legal authorities",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    nri_consular: {
      administrative: {
        description: "File complaint with consular authorities",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for NRI consular violations",
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
        description: "Seek intervention from consular authorities",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    }
  }

  return options[rightsType as keyof typeof options] || options.nri_property
}

function createActionPlan(rightsType: string, urgency: string, country: string) {
  const plans = {
    nri_property: {
      immediate: [
        "Document NRI property violations",
        "Contact NRI property authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact NRI support organizations"
      ],
      short: [
        "Follow up on property resolution",
        "Monitor NRI property improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor NRI property",
        "Follow up on legal proceedings",
        "Update NRI documentation",
        "Educate about NRI property"
      ]
    },
    nri_investment: {
      immediate: [
        "Document NRI investment violations",
        "Contact NRI investment authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact NRI support organizations"
      ],
      short: [
        "Follow up on investment resolution",
        "Monitor NRI investment improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor NRI investment",
        "Follow up on legal proceedings",
        "Update NRI documentation",
        "Educate about NRI investment"
      ]
    },
    nri_banking: {
      immediate: [
        "Document NRI banking violations",
        "Contact NRI banking authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact NRI support organizations"
      ],
      short: [
        "Follow up on banking resolution",
        "Monitor NRI banking improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor NRI banking",
        "Follow up on legal proceedings",
        "Update NRI documentation",
        "Educate about NRI banking"
      ]
    },
    nri_taxation: {
      immediate: [
        "Document NRI tax violations",
        "Contact NRI tax authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact NRI support organizations"
      ],
      short: [
        "Follow up on tax resolution",
        "Monitor NRI tax improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor NRI taxation",
        "Follow up on legal proceedings",
        "Update NRI documentation",
        "Educate about NRI taxation"
      ]
    },
    nri_education: {
      immediate: [
        "Document NRI education violations",
        "Contact NRI education authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact NRI support organizations"
      ],
      short: [
        "Follow up on education resolution",
        "Monitor NRI education improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor NRI education",
        "Follow up on legal proceedings",
        "Update NRI documentation",
        "Educate about NRI education"
      ]
    },
    nri_healthcare: {
      immediate: [
        "Document NRI healthcare violations",
        "Contact NRI healthcare authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact NRI support organizations"
      ],
      short: [
        "Follow up on healthcare resolution",
        "Monitor NRI healthcare improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor NRI healthcare",
        "Follow up on legal proceedings",
        "Update NRI documentation",
        "Educate about NRI healthcare"
      ]
    },
    nri_legal: {
      immediate: [
        "Document NRI legal violations",
        "Contact NRI legal authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact NRI support organizations"
      ],
      short: [
        "Follow up on legal resolution",
        "Monitor NRI legal improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor NRI legal",
        "Follow up on legal proceedings",
        "Update NRI documentation",
        "Educate about NRI legal"
      ]
    },
    nri_consular: {
      immediate: [
        "Document NRI consular violations",
        "Contact consular authorities",
        "Seek immediate consular assistance if needed",
        "Preserve all evidence",
        "Contact NRI support organizations"
      ],
      short: [
        "Follow up on consular resolution",
        "Monitor NRI consular improvements",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor NRI consular",
        "Follow up on legal proceedings",
        "Update NRI documentation",
        "Educate about NRI consular"
      ]
    }
  }

  return plans[rightsType as keyof typeof plans] || plans.nri_property
}

function getNRITimeline(rightsType: string, urgency: string) {
  const baseTimelines = {
    nri_property: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    nri_investment: {
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
    nri_legal: {
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
    }
  }

  const urgencyMultiplier = {
    urgent: 0.5,
    priority: 0.75,
    normal: 1
  }

  const timeline = baseTimelines[rightsType as keyof typeof baseTimelines] || baseTimelines.nri_property
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
    nri_property: {
      pre: [
        "Know NRI property laws",
        "Document all property incidents",
        "Keep property records organized",
        "Know complaint procedures",
        "Have NRI contacts ready"
      ],
      during: [
        "Document property violations",
        "Report to NRI authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow property procedures"
      ],
      post: [
        "Monitor NRI property",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about NRI property"
      ]
    },
    nri_investment: {
      pre: [
        "Know NRI investment laws",
        "Document all investment incidents",
        "Keep investment records organized",
        "Know complaint procedures",
        "Have NRI contacts ready"
      ],
      during: [
        "Document investment violations",
        "Report to NRI authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow investment procedures"
      ],
      post: [
        "Monitor NRI investment",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about NRI investment"
      ]
    },
    nri_banking: {
      pre: [
        "Know NRI banking laws",
        "Document all banking incidents",
        "Keep banking records organized",
        "Know complaint procedures",
        "Have NRI contacts ready"
      ],
      during: [
        "Document banking violations",
        "Report to NRI authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow banking procedures"
      ],
      post: [
        "Monitor NRI banking",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about NRI banking"
      ]
    },
    nri_taxation: {
      pre: [
        "Know NRI tax laws",
        "Document all tax incidents",
        "Keep tax records organized",
        "Know complaint procedures",
        "Have NRI contacts ready"
      ],
      during: [
        "Document tax violations",
        "Report to NRI authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow tax procedures"
      ],
      post: [
        "Monitor NRI taxation",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about NRI taxation"
      ]
    },
    nri_education: {
      pre: [
        "Know NRI education laws",
        "Document all education incidents",
        "Keep education records organized",
        "Know complaint procedures",
        "Have NRI contacts ready"
      ],
      during: [
        "Document education violations",
        "Report to NRI authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow education procedures"
      ],
      post: [
        "Monitor NRI education",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about NRI education"
      ]
    },
    nri_healthcare: {
      pre: [
        "Know NRI healthcare laws",
        "Document all healthcare incidents",
        "Keep healthcare records organized",
        "Know complaint procedures",
        "Have NRI contacts ready"
      ],
      during: [
        "Document healthcare violations",
        "Report to NRI authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow healthcare procedures"
      ],
      post: [
        "Monitor NRI healthcare",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about NRI healthcare"
      ]
    },
    nri_legal: {
      pre: [
        "Know NRI legal laws",
        "Document all legal incidents",
        "Keep legal records organized",
        "Know complaint procedures",
        "Have NRI contacts ready"
      ],
      during: [
        "Document legal violations",
        "Report to NRI authorities",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow legal procedures"
      ],
      post: [
        "Monitor NRI legal",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about NRI legal"
      ]
    },
    nri_consular: {
      pre: [
        "Know NRI consular laws",
        "Document all consular incidents",
        "Keep consular records organized",
        "Know complaint procedures",
        "Have NRI contacts ready"
      ],
      during: [
        "Document consular violations",
        "Report to consular authorities",
        "Seek immediate assistance if needed",
        "Preserve all evidence",
        "Follow consular procedures"
      ],
      post: [
        "Monitor NRI consular",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about NRI consular"
      ]
    }
  }

  return checklists[rightsType as keyof typeof checklists] || checklists.nri_property
}

function getNRITemplates(language: string = 'en') {
  return [
    {
      id: 1,
      title: "NRI Property Complaint",
      type: "nri_property",
      template: `To,
The NRI Property Authority
[NRI Property Office Address]
[City]
[Pincode]
[Date]

Subject: Complaint Regarding NRI Property Violation

Dear Sir/Madam,

I, [Your Name], hereby file a complaint regarding NRI property violation in [Country].

Violation Details:
- Date of Violation: [Date]
- Time of Violation: [Time]
- Place of Violation: [Place]
- Nature of Violation: [Nature]
- Property Location: [Property Location]
- Impact on NRI: [Impact Details]
- Witnesses: [Witness Names]

Legal Provisions:
This complaint is filed under the NRI Property Act, 2005 and Article 14 of the Constitution which guarantees the right to equality for NRI.

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
      fields: ["Name", "Country", "Date", "Time", "Place", "Nature", "Impact Details"]
    },
    {
      id: 2,
      title: "NRI Investment Complaint",
      type: "nri_investment",
      template: `To,
The NRI Investment Authority
[NRI Investment Office Address]
[City]
[Pincode]
[Date]

Subject: Complaint Regarding NRI Investment Violation

Dear Sir/Madam,

I, [Your Name], hereby file a complaint regarding NRI investment violation in [Country].

Violation Details:
- Date of Violation: [Date]
- Time of Violation: [Time]
- Place of Violation: [Place]
- Nature of Violation: [Nature]
- Investment Details: [Investment Details]
- Impact on NRI: [Impact Details]
- Witnesses: [Witness Names]

Legal Provisions:
This complaint is filed under the NRI Investment Act, 2008 and Article 19(1)(g) of the Constitution which guarantees the right to practice any profession.

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
      fields: ["Name", "Country", "Date", "Time", "Place", "Nature", "Impact Details"]
    }
  ]
}

function getNRIContacts(country: string) {
  const baseContacts = {
    national: [
      { name: "Ministry of External Affairs", phone: "011-2338225", type: "ministry" },
      { name: "NRI Authority", phone: "011-2338225", type: "national" },
      { name: "NRI Support Center", phone: "011-2338225", type: "support" }
    ],
    international: [
      { name: "Indian Embassy", phone: "011-2338225", type: "embassy" },
      { name: "Consulate General", phone: "011-2338225", type: "consulate" },
      { name: "NRI Helpline", phone: "011-2338225", type: "helpline" }
    ],
    support: [
      { name: "NRI Support Services", phone: "011-2338225", type: "support" },
      { name: "NRI Counseling", phone: "011-2338225", type: "counseling" },
      { name: "NRI Advisors", phone: "011-2338225", type: "advisor" }
    ]
  }

  return baseContacts.national
}

function getNRIStatistics() {
  return {
    totalComplaints: 200000,
    successRate: 68,
    averageResolutionTime: 45, // days
    propertyCases: 40000,
    investmentCases: 30000,
    bankingCases: 25000,
    taxCases: 20000,
    educationCases: 15000,
    healthcareCases: 10000,
    legalCases: 5000,
    consularCases: 3000,
    lastUpdated: new Date().toISOString()
  }
}

function getNRIIssueTypes() {
  return [
    {
      id: "nri_property",
      name: "NRI Property Rights",
      description: "NRI property ownership and investment protection",
      category: "property",
      urgency: "medium",
      constitutional: ["Article 14", "Article 19(1)(g)", "Article 21"],
      legal: ["NRI Property Act", "Property Laws"],
      timeline: "30-60 days"
    },
    {
      id: "nri_investment",
      name: "NRI Investment Rights",
      description: "NRI investment and business opportunities",
      category: "investment",
      urgency: "medium",
      constitutional: ["Article 19(1)(g)", "Article 14", "Article 21"],
      legal: ["NRI Investment Act", "Investment Laws"],
      timeline: "30-60 days"
    },
    {
      id: "nri_banking",
      name: "NRI Banking Rights",
      description: "NRI banking and financial services",
      category: "banking",
      urgency: "medium",
      constitutional: ["Article 19(1)(g)", "Article 14", "Article 21"],
      legal: ["NRI Banking Act", "Banking Laws"],
      timeline: "30-60 days"
    },
    {
      id: "nri_taxation",
      name: "NRI Taxation Rights",
      description: "NRI taxation and GST compliance",
      category: "taxation",
      urgency: "medium",
      constitutional: ["Article 14", "Article 19(1)(g)", "Article 21"],
      legal: ["NRI Tax Act", "Tax Laws"],
      timeline: "30-60 days"
    },
    {
      id: "nri_education",
      name: "NRI Education Rights",
      description: "NRI education and student support",
      category: "education",
      urgency: "medium",
      constitutional: ["Article 21A", "Article 14", "Article 21"],
      legal: ["NRI Education Act", "Education Laws"],
      timeline: "30-60 days"
    },
    {
      id: "nri_healthcare",
      name: "NRI Healthcare Rights",
      description: "NRI healthcare and medical services",
      category: "healthcare",
      urgency: "medium",
      constitutional: ["Article 21", "Article 14", "Article 21A"],
      legal: ["NRI Healthcare Act", "Healthcare Laws"],
      timeline: "30-60 days"
    },
    {
      id: "nri_legal",
      name: "NRI Legal Rights",
      description: "NRI legal services and representation",
      category: "legal",
      urgency: "medium",
      constitutional: ["Article 14", "Article 19(1)(g)", "Article 21"],
      legal: ["NRI Legal Act", "Legal Laws"],
      timeline: "30-60 days"
    },
    {
      id: "nri_consular",
      name: "NRI Consular Rights",
      description: "NRI consular services and protection",
      category: "consular",
      urgency: "high",
      constitutional: ["Article 21", "Article 14", "Article 19(1)(g)"],
      legal: ["NRI Consular Act", "Consular Laws"],
      timeline: "30-60 days"
    }
  ]
}

function getRecentCases(language: string = 'en') {
  return [
    {
      id: 1,
      type: "nri_property",
      title: "NRI Property Success",
      description: "Successfully resolved NRI property case with title confirmation",
      outcome: "success",
      timeline: "45 days",
      date: "2023-12-20",
      location: "United States",
      constitutional: "Article 14"
    },
    {
      id: 2,
      type: "nri_investment",
      title: "NRI Investment Protected",
      description: "Successfully protected NRI investment with full compliance",
      outcome: "success",
      timeline: "30 days",
      date: "2023-12-18",
      location: "United Kingdom",
      constitutional: "Article 19(1)(g)"
    },
    {
      id: 3,
      type: "nri_consular",
      title: "NRI Consular Success",
      description: "Successfully provided NRI consular assistance with protection",
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
      article: "Article 14",
      title: "Right to equality for NRI",
      description: "Right to equality for Non-Resident Indians",
      applications: ["all_nri"]
    },
    secondary: {
      article: "Article 19(1)(g)",
      title: "Right to practice any profession",
      description: "Right to practice any profession, trade or business",
      applications: ["all_nri"]
    },
    landmark: {
      case: "State of Maharashtra vs. NRI Investors (2015)",
      title: "NRI Rights",
      description: "Supreme Court judgment on NRI rights and protections",
      applications: ["all_nri"]
    },
    legislation: {
      act: "NRI Act, 2005",
      title: "NRI Regulation",
      description: "Regulates NRI rights and protections",
      applications: ["all_nri"]
    },
    act: "NRI Property Act, 2008",
      title: "NRI Property Regulation",
      description: "Regulates NRI property and investments",
      applications: ["all_nri"]
    }
  }
}

function getNRILaws() {
  return [
    {
      name: "NRI Act, 2005",
      description: "Regulates NRI rights and protections",
      year: 2005,
      provisions: ["nri", "rights", "protection"],
      applications: ["all_nri"]
    },
    {
      name: "NRI Property Act, 2008",
      description: "Regulates NRI property and investments",
      year: 2008,
      provisions: ["nri", "property", "investment"],
      applications: ["all_nri"]
    },
    {
      name: "NRI Investment Act, 2010",
      description: "Regulates NRI investment and business",
      year: 2010,
      provisions: ["nri", "investment", "business"],
      applications: ["all_nri"]
    },
    {
      name: "NRI Banking Act, 2012",
      description: "Regulates NRI banking and financial services",
      year: 2012,
      provisions: ["nri", "banking", "financial"],
      applications: ["all_nri"]
    },
    {
      name: "NRI Tax Act, 2015",
      description: "Regulates NRI taxation and GST",
      year: 2015,
      provisions: ["nri", "tax", "gst"],
      applications: ["all_nri"]
    },
    {
      name: "NRI Education Act, 2018",
      description: "Regulates NRI education and student support",
      year: 2018,
      provisions: ["nri", "education", "student"],
      applications: ["all_nri"]
    },
    {
      name: "NRI Healthcare Act, 2020",
      description: "Regulates NRI healthcare and medical services",
      year: 2020,
      provisions: ["nri", "healthcare", "medical"],
      applications: ["all_nri"]
    },
    {
      name: "NRI Legal Act, 2022",
      description: "Regulates NRI legal services and representation",
      year: 2022,
      provisions: ["nri", "legal", "representation"],
      applications: ["all_nri"]
    },
    {
      name: "NRI Consular Act, 2024",
      description: "Regulates NRI consular services and protection",
      year: 2024,
      provisions: ["nri", "consular", "protection"],
      applications: ["all_nri"]
    }
  ]
}

function getEmbassies() {
  return [
    {
      name: "Indian Embassy - United States",
      url: "https://www.indianembassy.org",
      description: "Indian Embassy in Washington DC",
      services: ["consular", "visa", "passport", "assistance"],
      contact: "+1-202-937-8415",
      coverage: "United States"
    },
    {
      name: "Indian High Commission - United Kingdom",
      url: "https://www.hcicommonwealth.org",
      description: "Indian High Commission in London",
      services: ["consular", "visa", "passport", "assistance"],
      contact: "+44-20-7616-6200",
      coverage: "United Kingdom"
    },
    {
      name: "Indian Embassy - Canada",
      url: "https://www.hcicommonwealth.org",
      description: "Indian High Commission in Ottawa",
      services: ["consular", "visa", "passport", "assistance"],
      contact: "+1-613-236-9527",
      coverage: "Canada"
    },
    {
      name: "Indian Embassy - Australia",
      url: "https://www.indianembassy.org",
      description: "Indian Embassy in Canberra",
      services: ["consular", "visa", "passport", "assistance"],
      contact: "+61-2-6273-3999",
      coverage: "Australia"
    },
    {
      name: "Indian Embassy - United Arab Emirates",
      url: "https://www.indianembassy.org",
      description: "Indian Embassy in Abu Dhabi",
      services: ["consular", "visa", "passport", "assistance"],
      contact: "+971-2-449-5885",
      coverage: "United Arab Emirates"
    },
    {
      name: "Indian Embassy - Singapore",
      url: "https://www.mea.gov.in",
      description: "Indian Embassy in Singapore",
      services: ["consular", "visa", "passport", "assistance"],
      contact: "+65-6733-9100",
      coverage: "Singapore"
    },
    {
      name: "Indian Embassy - Malaysia",
      url: "https://www.indianembassy.org",
      description: "Indian Embassy in Kuala Lumpur",
      services: ["consular", "visa", "passport", "assistance"],
      contact: "+60-3-2274-6363",
      coverage: "Malaysia"
    }
  ]
}