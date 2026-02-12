import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { 
      complaintType,
      productName,
      company,
      description,
      purchaseDate,
      amount,
      evidence,
      urgency = 'normal',
      category = 'general',
      language = 'en'
    } = await request.json()

    // Generate complaint content and strategy
    const complaintStrategy = generateComplaintStrategy({
      complaintType,
      productName,
      company,
      description,
      purchaseDate,
      amount,
      evidence,
      urgency,
      category,
      language
    })

    // Get consumer protection resources
    const consumerResources = getConsumerResources(complaintType, company, category)

    // Get legal options and remedies
    const legalOptions = getLegalOptions(complaintType, amount, urgency)

    // Get consumer rights references
    const consumerRights = getConsumerRights(complaintType, category)

    // Create action plan
    const actionPlan = createActionPlan(complaintType, urgency, company, amount)

    return NextResponse.json({
      success: true,
      data: {
        complaintStrategy,
        consumerResources,
        legalOptions,
        consumerRights,
        actionPlan,
        timeline: getComplaintTimeline(complaintType, urgency),
        checklists: getComplaintChecklists(complaintType),
        templates: getComplaintTemplates(language),
        contacts: getConsumerContacts(company, category),
        statistics: getConsumerStatistics()
      }
    })

  } catch (error) {
    console.error('Consumer Protection Hub Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to process consumer complaint'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const company = searchParams.get('company')
    const category = searchParams.get('category')
    const language = searchParams.get('lang') || 'en'

    // Get consumer complaint types
    const complaintTypes = getComplaintTypes()
    const filteredTypes = type ? complaintTypes.filter(t => t.id === type) : complaintTypes
    
    // Get consumer statistics
    const statistics = getConsumerStatistics()

    // Get recent successful cases
    const recentCases = getRecentConsumerCases(language)

    // Get company information
    const companyInfo = company ? getCompanyInfo(company) : null

    return NextResponse.json({
      success: true,
      data: {
        complaintTypes: filteredTypes,
        statistics,
        recentCases,
        companyInfo,
        constitutionalBasis: getConsumerConstitutionalBasis(),
        hotlines: getConsumerHotlines(),
        regulations: getConsumerRegulations()
      }
    })

  } catch (error) {
    console.error('Consumer Directory Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch consumer resources'
    }, { status: 500 })
  }
}

function generateComplaintStrategy(data: any) {
  const {
    complaintType,
    productName,
    company,
    description,
    purchaseDate,
    amount,
    evidence,
    urgency = 'normal',
    category = 'general',
    language = 'en'
  } = data

  const strategies = {
    product: {
      immediate: [
        "Document all issues with photos/videos",
        "Stop using the defective product",
        "Keep original packaging and receipts",
        "Contact company customer service"
      ],
      legal: [
        "File consumer complaint with appropriate authority",
        "Send legal notice to company",
        "Prepare for consumer court proceedings",
        "Gather expert testimony if needed"
      ],
      constitutional: [
        "Article 14: Right to equality",
        "Article 19: Right to trade and business",
        "Consumer Protection Act provisions",
        "Right to safety and quality"
      ],
      timeline: {
        "0-7 days": "Contact company, document issues",
        "15-30 days": "File consumer complaint",
        "30-60 days": "Send legal notice",
        "60+ days": "File consumer court case"
      }
    },
    service: {
      immediate: [
        "Document service failures",
        "Stop payment if possible",
        "Keep service agreements",
        "Record communication attempts"
      ],
      legal: [
        "File complaint with service regulator",
        "Send legal notice for breach",
        "Prepare for consumer forum case",
        "Consider class action if multiple affected"
      ],
      constitutional: [
        "Article 14: Right to equality",
        "Right to quality service",
        "Consumer Protection Act service provisions",
        "Regulatory compliance requirements"
      ],
      timeline: {
        "0-7 days": "Document service issues",
        "15-30 days": "File complaint with regulator",
        "30-45 days": "Send legal notice",
        "45+ days": "File consumer forum case"
      }
    },
    financial: {
      immediate: [
        "Stop automatic payments",
        "Document all transactions",
        "Contact bank immediately",
        "Preserve all communication"
      ],
      legal: [
        "File complaint with banking ombudsman",
        "Send legal notice to financial institution",
        "Prepare for consumer court case",
        "Consider criminal complaint for fraud"
      ],
      constitutional: [
        "Article 14: Right to equality",
        "Banking Regulation Act provisions",
        "RBI guidelines and circulars",
        "Right to fair treatment"
      ],
      timeline: {
        "0-3 days": "Contact bank, stop payments",
        "7-30 days": "File banking ombudsman complaint",
        "30-60 days": "Send legal notice",
        "60+ days": "File consumer court case"
      }
    },
    digital: {
      immediate: [
        "Screenshot all issues",
        "Document platform errors",
        "Check terms of service",
        "Preserve digital evidence"
      ],
      legal: [
        "File IT Act complaint if applicable",
        "Send legal notice to platform",
        "Consider class action for widespread issues",
        "Report to cyber cell for fraud"
      ],
      constitutional: [
        "Article 19(1)(a): Right to freedom of speech",
        "IT Act provisions for digital services",
        "Consumer Protection Act for e-commerce",
        "Right to data privacy"
      ],
      timeline: {
        "0-7 days": "Document digital issues",
        "15-30 days": "File platform complaint",
        "30-45 days": "Send legal notice",
        "45+ days": "File consumer court case"
      }
    },
    real_estate: {
      immediate: [
        "Document all property issues",
        "Take photos/videos",
        "Keep all agreements",
        "Contact builder/developer"
      ],
      legal: [
        "File RERA complaint",
        "Send legal notice to builder",
        "Prepare for consumer court case",
        "Consider criminal complaint for fraud"
      ],
      constitutional: [
        "Article 300A: Right to property",
        "RERA provisions",
        "Real Estate Regulation Act",
        "Right to quality construction"
      ],
      timeline: {
        "0-15 days": "Document issues, contact builder",
        "30-60 days": "File RERA complaint",
        "60-90 days": "Send legal notice",
        "90+ days": "File consumer court case"
      }
    }
  }

  return strategies[complaintType as keyof typeof strategies] || strategies.product
}

function getConsumerResources(complaintType: string, company: string, category: string) {
  const resources = {
    product: {
      authorities: [
        { name: "Consumer Protection Council", phone: "1800-11-4030", type: "regulatory" },
        { name: "Bureau of Indian Standards", phone: "011-23231784", type: "standards" },
        { name: "Food Safety and Standards Authority", phone: "011-23231768", type: "food" }
      ],
      organizations: [
        { name: "Consumer Guidance Society", phone: "011-23231784", type: "guidance" },
        { name: "Consumer Voice", phone: "011-23231785", type: "advocacy" },
        { name: "Consumer Education Society", phone: "011-23231786", type: "education" }
      ],
      websites: [
        "https://consumer.gov.in",
        "https://confonet.nic.in",
        "https://core.nic.in"
      ]
    },
    service: {
      authorities: [
        { name: "Telecom Regulatory Authority", phone: "1800-11-2804", type: "telecom" },
        { name: "Banking Ombudsman", phone: "1800-425-0019", type: "banking" },
        { name: "Insurance Regulatory Authority", phone: "011-2338225", type: "insurance" }
      ],
      organizations: [
        { name: "Service Quality Forum", phone: "011-23231787", type: "quality" },
        { name: "Consumer Service Association", phone: "011-23231788", type: "service" },
        { name: "Service Standards Organization", phone: "011-23231789", type: "standards" }
      ],
      websites: [
        "https://trai.gov.in",
        "https://bankingombudsman.org",
        "https://irdai.gov.in"
      ]
    },
    financial: {
      authorities: [
        { name: "Reserve Bank of India", phone: "011-2338225", type: "banking" },
        { name: "Banking Ombudsman", phone: "1800-425-0019", type: "dispute" },
        { name: "SEBI", phone: "011-26449000", type: "securities" }
      ],
      organizations: [
        { name: "Banking Consumers Association", phone: "011-23231790", type: "banking" },
        { name: "Financial Consumer Forum", phone: "011-23231791", type: "finance" },
        { name: "Investor Protection Association", phone: "011-23231792", type: "investment" }
      ],
      websites: [
        "https://rbi.org.in",
        "https://bankingombudsman.org",
        "https://sebi.gov.in"
      ]
    },
    digital: {
      authorities: [
        { name: "Cyber Cell", phone: "011-23431789", type: "cyber" },
        { name: "IT Ministry", phone: "011-24630100", type: "it" },
        { name: "Data Protection Authority", phone: "011-23431790", type: "data" }
      ],
      organizations: [
        { name: "Digital Rights Foundation", phone: "011-23231793", type: "digital" },
        { name: "Internet Users Association", phone: "011-23231794", type: " " },
        { name: "Cyber Security Forum", phone: "011-23231795", type: "security" }
      ],
      websites: [
        "https://cybercell.gov.in",
        "https://meity.gov.in",
        "https://core.nic.in"
      ]
    },
    real_estate: {
      authorities: [
        { name: "RERA", phone: "011-2338225", type: "regulatory" },
        { name: "Real Estate Regulatory Authority", phone: "011-2338226", type: "real_estate" },
        { name: "Housing Development Authority", phone: "011-2338227", type: "housing" }
      ],
      organizations: [
        { name: "Home Buyers Association", phone: "011-23231796", type: "housing" },
        { name: "Real Estate Consumer Forum", phone: "011-23231797", type: "property" },
        { name: "Housing Rights Organization", phone: "011-23231798", type: "rights" }
      ],
      websites: [
        "https://rera.gov.in",
        "https://mohua.gov.in",
        "https://core.nic.in"
      ]
    }
  }

  return resources[complaintType as keyof typeof resources] || resources.product
}

function getLegalOptions(complaintType: string, amount: number, urgency: string) {
  const options = {
    product: {
      negotiation: {
        description: "Direct negotiation with company",
        timeline: "7-14 days",
        success: 60,
        cost: "Low",
        effort: "Medium"
      },
      complaint: {
        description: "File consumer complaint with appropriate authority",
        timeline: "30-45 days",
        success: 75,
        cost: "None",
        effort: "Low"
      },
      legal: {
        description: "Send legal notice to company",
        timeline: "15-30 days",
        success: 85,
        cost: "Medium",
        effort: "Medium"
      },
      court: {
        description: "File case in Consumer Court",
        timeline: "60-180 days",
        success: 90,
        cost: "High",
        effort: "High"
      }
    },
    service: {
      negotiation: {
        description: "Negotiate with service provider",
        timeline: "7-14 days",
        success: 55,
        cost: "Low",
        effort: "Low"
      },
      complaint: {
        description: "File with service regulator",
        timeline: "30-45 days",
        success: 70,
        cost: "None",
        effort: "Low"
      },
      legal: {
        description: "Send legal notice for breach",
        timeline: "15-30 days",
        success: 80,
        cost: "Medium",
        effort: "Medium"
      },
      court: {
        description: "File in Consumer Forum",
        timeline: "45-90 days",
        success: 85,
        cost: "High",
        effort: "High"
      }
    },
    financial: {
      negotiation: {
        description: "Negotiate with financial institution",
        timeline: "7-14 days",
        success: 45,
        cost: "Low",
        effort: "Low"
      },
      ombudsman: {
        description: "File with Banking Ombudsman",
        timeline: "30-60 days",
        success: 80,
        cost: "None",
        effort: "Low"
      },
      legal: {
        description: "Send legal notice",
        timeline: "15-30 days",
        success: 75,
        cost: "Medium",
        effort: "Medium"
      },
      court: {
        description: "File in Consumer Court",
        timeline: "60-120 days",
        success: 85,
        cost: "High",
        effort: "High"
      }
    },
    digital: {
      negotiation: {
        description: "Contact platform support",
        timeline: "3-7 days",
        success: 40,
        cost: "None",
        effort: "Low"
      },
      complaint: {
        description: "File IT Act complaint if applicable",
        timeline: "30-60 days",
        success: 70,
        cost: "None",
        effort: "Medium"
      },
      legal: {
        description: "Send legal notice to platform",
        timeline: "15-30 days",
        success: 80,
        cost: "Medium",
        effort: "Medium"
      },
      court: {
        description: "File in Consumer Court",
        timeline: "45-90 days",
        success: 85,
        cost: "High",
        effort: "High"
      }
    },
    real_estate: {
      negotiation: {
        description: "Negotiate with builder/developer",
        timeline: "14-30 days",
        success: 50,
        cost: "Low",
        effort: "Medium"
      },
      rera: {
        description: "File RERA complaint",
        timeline: "30-90 days",
        success: 85,
        cost: "None",
        effort: "Medium"
      },
      legal: {
        description: "Send legal notice to builder",
        timeline: "30-60 days",
        success: 80,
        cost: "Medium",
        effort: "Medium"
      },
      court: {
        description: "File in Consumer Court",
        timeline: "60-180 days",
        success: 90,
        cost: "High",
        effort: "High"
      }
    }
  }

  return options[complaintType as keyof typeof options] || options.product
}

function getConsumerRights(complaintType: string, category: string) {
  const rights = {
    product: [
      {
        article: "Article 14",
        title: "Right to equality",
        description: "Equal protection of laws for all consumers",
        application: "No discrimination in consumer transactions"
      },
      {
        article: "Article 19(1)(g)",
        title: "Right to practice any profession",
        description: "Right to engage in lawful trade and business",
        application: "Right to buy and sell goods"
      },
      {
        legislation: "Consumer Protection Act, 2019",
        title: "Consumer rights protection",
        description: "Comprehensive protection of consumer rights",
        application: "All consumer transactions covered"
      }
    ],
    service: [
      {
        article: "Article 14",
        title: "Right to equality",
        description: "Equal treatment in service provision",
        application: "No discrimination in service delivery"
      },
      {
        article: "Article 21",
        title: "Right to life",
        description: "Includes right to quality essential services",
        application: "Right to quality public services"
      },
      {
        legislation: "Consumer Protection Act, 2019",
        title: "Service quality standards",
        description: "Standards for service quality and delivery",
        application: "All service transactions covered"
      }
    ],
    financial: [
      {
        article: "Article 14",
        title: "Right to equality",
        description: "Equal access to financial services",
        application: "No discrimination in banking"
      },
      {
        article: "Article 19(1)(g)",
        title: "Right to practice any profession",
        description: "Right to engage in lawful financial activities",
        application: "Right to banking and financial services"
      },
      {
        legislation: "Banking Regulation Act, 1949",
        title: "Banking regulations",
        description: "Regulates banking operations and consumer protection",
        application: "All banking transactions covered"
      }
    ],
    digital: [
      {
        article: "Article 19(1)(a)",
        title: "Right to freedom of speech",
        description: "Includes digital speech and expression",
        application: "Right to digital communication"
      },
      {
        article: "Article 21",
        title: "Right to privacy",
        description: "Right to privacy in digital transactions",
        application: "Data protection in digital services"
      },
      {
        legislation: "IT Act, 2000",
        title: "Information Technology regulations",
        description: "Regulates digital transactions and cyber activities",
        application: "All digital transactions covered"
      }
    ],
    real_estate: [
      {
        article: "Article 300A",
        title: "Right to property",
        description: "Right to acquire, hold, and dispose of property",
        application: "Property rights in real estate"
      },
      {
        article: "Article 19(1)(f)",
        title: "Right to acquire, hold and dispose of property",
        description: "Comprehensive property rights",
        application: "All property transactions covered"
      },
      {
        legislation: "RERA Act, 2016",
        title: "Real Estate Regulation",
        description: "Regulates real estate transactions and protects buyers",
        application: "All real estate transactions covered"
      }
    ]
  }

  return rights[complaintType as keyof typeof rights] || rights.product
}

function createActionPlan(complaintType: string, urgency: string, company: string, amount: number) {
  const plans = {
    product: {
      immediate: [
        "Document all product defects",
        "Stop using defective product",
        "Preserve evidence",
        "Contact company customer service"
      ],
      short: [
        "File consumer complaint",
        "Send legal notice if no response",
        "Prepare for consumer forum",
        "Consider class action"
      ],
      long: [
        "Monitor company compliance",
        "Follow up on remedies",
        "Share experience to help others",
        "Consider systemic changes"
      ]
    },
    service: [
      "Document service issues",
      "Record all communications",
        "Seek alternative services",
        "File complaint with regulator"
      ],
      short: [
        "Send legal notice",
        "File consumer forum case",
        "Consider class action",
        "Seek regulatory intervention"
      ],
      long: [
        "Monitor service improvements",
        "Share service quality feedback",
        "Advocate for better standards",
        "Consider policy changes"
      ]
    ],
    financial: [
      "Stop automatic payments",
        "Document all transactions",
        "Contact bank immediately",
        "File banking ombudsman complaint"
      ],
      short: [
        "Send legal notice",
        "File consumer court case",
        "Consider criminal complaint",
        "Seek compensation"
      ],
      long: [
        "Monitor account status",
        "Review financial practices",
        "Share experience",
        "Advocate for better regulations"
      ]
    ],
    digital: [
      "Document platform issues",
        "Take screenshots",
        "Check terms of service",
        "File platform complaint"
      ],
      short: [
        "Send legal notice",
        "File cyber complaint if needed",
        "Consider class action",
        "Seek regulatory action"
      ],
      long: [
        "Monitor platform compliance",
        "Share digital rights experience",
        "Advocate for better policies",
        "Consider legislative changes"
      ]
    ],
    real_estate: [
      "Document all property issues",
        "Take photos/videos",
        "Check builder credentials",
        "File RERA complaint"
      ],
      short: [
        "Send legal notice",
        "File consumer court case",
        "Seek RERA intervention",
        "Consider criminal complaint"
      ],
      long: [
        "Monitor construction progress",
        "Share home buyer experience",
        "Advocate for better regulations",
        "Consider policy changes"
      ]
    }
  }

  return plans[complaintType as keyof typeof plans] || plans.product
}

function getComplaintTimeline(complaintType: string, urgency: string) {
  const baseTimelines = {
    product: {
      company: "7-14 days",
      complaint: "30-45 days",
      legal: "15-30 days",
      court: "60-180 days"
    },
    service: {
      company: "7-14 days",
      complaint: "30-45 days",
      legal: "15-30 days",
      court: "45-90 days"
    },
    financial: {
      bank: "3-7 days",
      ombudsman: "30-60 days",
      legal: "15-30 days",
      court: "60-120 days"
    },
    digital: {
      platform: "3-7 days",
      complaint: "30-45 days",
      legal: "15-30 days",
      court: "45-90 days"
    },
    real_estate: {
      builder: "14-30 days",
      rera: "30-90 days",
      legal: "30-60 days",
      court: "60-180 days"
    }
  }

  const urgencyAdjustment = {
    urgent: 0.5,
    priority: 0.75,
    normal: 1
  }

  const timeline = baseTimelines[complaintType as keyof typeof baseTimelines] || baseTimelines.product
  const multiplier = urgencyAdjustment[urgency as keyof typeof urgencyAdjustment] || 1

  return Object.keys(timeline).reduce((acc, key) => {
    const [start, end] = timeline[key as keyof typeof timeline].split('-')
    const startNum = parseInt(start) * multiplier
    const endNum = parseInt(end) * multiplier
    acc[key] = `${startNum}-${endNum} ${end.includes('day') ? 'days' : 'hours'}`
    return acc
  }, {} as any)
}

function getComplaintChecklists(complaintType: string) {
  const checklists = {
    product: {
      pre: [
        "Keep all purchase documents",
        "Check warranty terms",
        "Know return policies",
        "Research product reviews"
      ],
      during: [
        "Document all defects",
        "Preserve packaging and receipts",
        "Take photos/videos",
        "Record all communications"
      ],
      post: [
        "Follow up on remedies",
        "Document resolution",
        "Share experience",
        "Monitor product quality"
      ]
    },
    service: [
      "Keep service agreements",
      "Document service standards",
        "Record performance metrics",
        "Know complaint procedures"
      ],
      "short: [
        "File complaint promptly",
        "Document all issues",
        "Follow up regularly",
        "Consider alternative services"
      ],
      long: [
        "Monitor service quality",
        "Share feedback",
        "Advocate for improvements",
        "Consider systemic changes"
      ]
    ],
    financial: [
      "Keep all financial documents",
        "Monitor account statements",
        "Know banking rights",
        "Understand complaint procedures"
      ],
      "short: [
        "File ombudsman complaint",
        "Document all transactions",
        "Follow up regularly",
        "Monitor account status"
      ],
      long: [
        "Monitor financial health",
        "Review banking practices",
        "Share experience",
        "Consider policy changes"
      ]
    ],
    digital: [
      "Keep screenshots",
      "Save terms of service",
        "Document platform behavior",
        "Know digital rights"
      ],
      "short: [
        "File platform complaint",
        "Document all issues",
        "Preserve digital evidence",
        "Consider cyber complaint"
      ],
      long: [
        "Monitor platform changes",
        "Share digital experience",
        "Advocate for better policies",
        "Consider legislative changes"
      ]
    ],
    real_estate: [
      "Keep all property documents",
        "Research builder credentials",
        "Understand RERA provisions",
        "Know property rights"
      ],
      "short: [
        "File RERA complaint",
        "Document construction",
        "Monitor progress",
        "Follow up regularly"
      ],
      long: [
        "Monitor construction quality",
        "Share home buyer experience",
        "Advocate for better regulations",
        "Consider policy changes"
      ]
    ]
  }

  return checklists[complaintType as keyof typeof checklists] || checklists.product
}

function getComplaintTemplates(language: string = 'en') {
  return [
    {
      id: 1,
      title: "Product Defect Complaint",
      type: "product",
      template: `
To,
The Manager
[Company Name]
[Company Address]
[Date]

Subject: Complaint Regarding Defective Product - [Product Name]

Dear Sir/Madam,

I am writing to file a formal complaint regarding the defective [Product Name] that I purchased from your establishment on [Purchase Date].

Product Details:
- Product Name: [Product Name]
- Model/Serial Number: [Model/Serial]
- Purchase Date: [Purchase Date]
- Purchase Amount: [Amount]
- Warranty Period: [Warranty]

Defect Description:
[Describe the defect in detail]

This defect violates my consumer rights under the Consumer Protection Act, 2019, and I request immediate remedial action.

I look forward to your prompt response within 15 days.

Sincerely,
[Your Name]
[Your Contact Information]
      `,
      fields: ["Product Name", "Company Name", "Purchase Date", "Defect Description"]
    },
    {
      id: 2,
      title: "Service Quality Complaint",
      type: "service",
      template: `
To,
The Manager
[Service Provider Name]
[Service Provider Address]
[Date]

Subject: Complaint Regarding Poor Service Quality

Dear Sir/Madam,

I am writing to file a formal complaint regarding the poor quality of service provided by [Service Provider] since [Start Date].

Service Details:
- Service Type: [Service Type]
- Service Period: [Service Period]
- Amount Paid: [Amount]
- Agreement Reference: [Agreement Reference]

Issues Faced:
[Describe service issues in detail]

The poor service quality violates my rights under the Consumer Protection Act, 2019, and I request immediate improvement and compensation.

I expect your response within 15 days.

Sincerely,
[Your Name]
[Your Contact Information]
      `,
      fields: ["Service Provider", "Service Type", "Start Date", "Issues Description"]
    }
  ]
}

function getConsumerContacts(company: string, category: string) {
  const baseContacts = {
    national: [
      { name: "National Consumer Helpline", phone: "1800-11-4030", type: "general" },
      { name: "Consumer Protection Council", phone: "011-23231784", type: "council" },
      { name: "Consumer Court", phone: "011-23231785", type: "court" }
    ],
    regulatory: [
      { name: "RBI Banking Ombudsman", phone: "1800-425-0019", type: "banking" },
      { name: "TRAI Consumer Helpline", phone: "1800-11-2804", type: "telecom" },
      { name: "IRDA Grievance Cell", phone: "011-2338225", type: "insurance" }
    ],
    legal: [
      { name: "Consumer Court", phone: "011-23231785", type: "court" },
      { name: "Consumer Advocacy", phone: "011-23231786", type: "advocacy" },
      { name: "Legal Aid", phone: "1800-11-1320", type: "legal_aid" }
    ]
  }

  return baseContacts
}

function getComplaintTypes() {
  return [
    {
      id: "product",
      name: "Product Issues",
      description: "Defective products, quality issues, warranty problems",
      urgency: "medium",
      common: true,
      timeline: "30-60 days"
    },
    {
      id: "service",
      name: "Service Problems",
      description: "Poor service quality, delivery issues, billing problems",
      urgency: "medium",
      common: true,
      timeline: "30-45 days"
    },
    {
      id: "financial",
      name: "Banking & Finance",
      description: "Bank account issues, loan problems, card fraud",
      urgency: "high",
      common: true,
      timeline: "15-30 days"
    },
    {
      id: "digital",
      name: "Digital Services",
      description: "E-commerce, social media, online services",
      urgency: "medium",
      common: true,
      timeline: "30-45 days"
    },
    {
      id: "real_estate",
      name: "Real Estate",
      description: "Property issues, builder problems, RERA violations",
      urgency: "high",
      common: false,
      timeline: "60-90 days"
    }
  ]
}

function getConsumerStatistics() {
  return {
    totalComplaints: 250000,
    successRate: 68,
    averageResolutionTime: 45, // days
    compensation: 12500000, // total compensation awarded
    categories: {
      product: 80000,
      service: 60000,
      financial: 45000,
      digital: 35000,
      real_estate: 30000
    },
    lastUpdated: new Date().toISOString()
  }
}

function getRecentConsumerCases(language: string = 'en') {
  return [
    {
      id: 1,
      type: "product",
      title: "Defective Phone Replaced",
      company: "Mobile Phone Company",
      description: "Customer received replacement phone for defective unit",
      outcome: "success",
      compensation: 5000,
      date: "2023-12-20",
      timeline: "25 days"
    },
    {
      id: 2,
      type: "service",
      title: "Internet Service Improved",
      company: "Broadband Provider",
      description: "ISP improved service after consumer complaint",
      outcome: "success",
      compensation: 0,
      date: "2023-12-18",
      timeline: "20 days"
    },
    {
      id: 3,
      type: "financial",
      title: "Bank Error Corrected",
      company: "Nationalized Bank",
      description: "Bank corrected account error and compensated customer",
      outcome: "success",
      compensation: 2500,
      date: "2023-12-15",
      timeline: "15 days"
    }
  ]
}

function getCompanyInfo(company: string) {
  const companies = {
    "Mobile Phone Company": {
      name: "Mobile Phone Company",
      category: "telecom",
      address: "Telecom Park, Gurgaon, Haryana",
      phone: "1800-180-1234",
      email: "support@mobilephone.com",
      website: "https://mobilephone.com",
      customerService: "1800-180-1234",
      legal: "legal@mobilephone.com"
    },
    "Broadband Provider": {
      name: "Broadband Provider",
      category: "telecom",
      address: "Internet City, Hyderabad, Telangana",
      phone: "1800-200-5678",
      email: "support@broadband.com",
      website: "https://broadband.com",
      customerService: "1800-200-5678",
      legal: "legal@broadband.com"
    }
  }

  return companies[company as keyof typeof companies] || null
}

function getConsumerConstitutionalBasis() {
  return {
    primary: {
      article: "Article 14",
      title: "Right to equality",
      description: "Equal protection of laws for all consumers",
      applications: ["Product", "Service", "Financial", "Digital", "Real Estate"]
    },
    secondary: {
      article: "Article 19(1)(g)",
      title: "Right to practice any profession",
      description: "Right to engage in lawful trade and business",
      applications: ["Product", "Service", "Financial", "Digital"]
    },
    landmark: {
      case: "M.C. Mehta vs. Union of India (1987)",
      title: "Right to healthy environment",
      description: "Right to pollution-free environment as part of right to life",
      applications: ["Product", "Service", "Financial", "Digital", "Real Estate"]
    },
    legislation: {
      act: "Consumer Protection Act, 2019",
      title: "Consumer rights protection",
      description: "Comprehensive protection of consumer rights with establishment of CCPA",
      applications: ["Product", "Service", "Financial", "Digital", "Real Estate"]
    }
  }
}

function getConsumerHotlines() {
  return [
    {
      name: "National Consumer Helpline",
      phone: "1800-11-4030",
      category: "general",
      24/7: false,
      description: "Consumer rights and assistance"
    },
    {
      name: "Banking Ombudsman",
      phone: "1800-425-0019",
      category: "banking",
      24/7: false,
      description: "Banking complaint resolution"
    },
    {
      name: "TRAI Consumer Helpline",
      phone: "1800-11-2804",
      category: "telecom",
      24/7: false,
      description: "Telecom consumer assistance"
    },
    {
      name: "IRDA Grievance Cell",
      phone: "011-2338225",
      category: "insurance",
      24/7: false,
      description: "Insurance complaint resolution"
    },
    {
      name: "Cyber Cell",
      phone: "011-23381789",
      category: "digital",
      24/7: true,
      description: "Cybercrime assistance"
    }
  ]
}

function getConsumerRegulations() {
  return [
    {
      name: "Consumer Protection Act, 2019",
      description: "Comprehensive consumer rights protection",
      authority: "Consumer Protection Council",
      year: 2019
    },
    {
      name: "Information Technology Act, 2000",
      description: "Digital transactions and cyber security",
      authority: "Ministry of Electronics and IT",
      year: 2000
    },
    {
      name: "Banking Regulation Act, 1949",
      description: "Banking operations and consumer protection",
      authority: "Reserve Bank of India",
      year: 1949
    },
    {
      name: "Telecom Regulatory Authority of India Act, 1997",
      description: "Telecom regulations and consumer protection",
      authority: "TRAI",
      year: 1997
    },
    {
      name: "Insurance Regulatory and Development Authority Act, 1999",
      description: "Insurance regulations and consumer protection",
      authority: "IRDA",
      year: 1999
    },
    {
      name: "Real Estate (Regulation and Development) Act, 2016",
      description: "Real estate regulations and homebuyer protection",
      authority: "RERA",
      year: 2016
    }
  ]
}