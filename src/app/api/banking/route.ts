import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { 
      issueType,
      bankName,
      accountType,
      description,
      amount,
      urgency = 'normal',
      category = 'general',
      language = 'en',
      accountNumber,
      transactionDate
    } = await request.json()

    // Generate banking issue resolution strategy
    const bankingStrategy = generateBankingStrategy({
      issueType,
      bankName,
      accountType,
      description,
      amount,
      urgency,
      category,
      language,
      accountNumber,
      transactionDate
    })

    // Get banking resources and contacts
    const bankingResources = getBankingResources(issueType, bankName, category)

    // Get legal options and remedies
    const legalOptions = getBankingLegalOptions(issueType, amount, urgency)

    // Get banking rights references
    const bankingRights = getBankingRights(issueType, category)

    // Create action plan
    const actionPlan = createBankingActionPlan(issueType, urgency, bankName, amount)

    return NextResponse.json({
      success: true,
      data: {
        bankingStrategy,
        bankingResources,
        legalOptions,
        bankingRights,
        actionPlan,
        timeline: getBankingTimeline(issueType, urgency),
        checklists: getBankingChecklists(issueType),
        templates: getBankingTemplates(language),
        contacts: getBankingContacts(bankName, category),
        statistics: getBankingStatistics(),
        regulations: getBankingRegulations()
      }
    })

  } catch (error) {
    console.error('Banking Rights Navigator Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to process banking issue'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const bank = searchParams.get('bank')
    const category = searchParams.get('category')
    const language = searchParams.get('lang') || 'en'

    // Get banking issue types
    const issueTypes = getBankingIssueTypes()
    const filteredTypes = type ? issueTypes.filter(t => t.id === type) : issueTypes
    
    // Get banking statistics
    const statistics = getBankingStatistics()

    // Get recent successful cases
    const recentCases = getRecentBankingCases(language)

    // Get bank information
    const bankInfo = bank ? getBankInfo(bank) : null

    return NextResponse.json({
      success: true,
      data: {
        issueTypes: filteredTypes,
        statistics,
        recentCases,
        bankInfo,
        constitutionalBasis: getBankingConstitutionalBasis(),
        hotlines: getBankingHotlines(),
        regulations: getBankingRegulations()
      }
    })

  } catch (error) {
    console.error('Banking Directory Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch banking resources'
    }, { status: 500 })
  }
}

function generateBankingStrategy(data: any) {
  const {
    issueType,
    bankName,
    accountType,
    description,
    amount,
    urgency = 'normal',
    category = 'general',
    language = 'en',
    accountNumber,
    transactionDate
  } = data

  const strategies = {
    account: {
      immediate: [
        "Document account issues with screenshots",
        "Stop automatic payments if needed",
        "Secure account credentials",
        "Contact bank customer service immediately"
      ],
      legal: [
        "File complaint with banking ombudsman",
        "Send legal notice to bank",
        "Prepare for consumer court case",
        "Consider criminal complaint for fraud"
      ],
      constitutional: [
        "Article 14: Right to equality",
        "Article 19(1)(g): Right to practice any profession",
        "Banking Regulation Act provisions",
        "Right to fair treatment"
      ],
      timeline: {
        "0-3 days": "Contact bank, document issues",
        "7-30 days": "File ombudsman complaint",
        "30-60 days": "Send legal notice",
        "60+ days": "File consumer court case"
      }
    },
    transaction: {
      immediate: [
        "Document transaction details",
        "Preserve receipts and statements",
        "Contact merchant/bank immediately",
        "Stop payment if possible"
      ],
      legal: [
        "File chargeback request",
        "File dispute with bank",
        "Send legal notice for unauthorized transaction",
        "Consider criminal complaint for fraud"
      ],
      constitutional: [
        "Article 14: Right to equality",
        "Article 21: Right to life and liberty",
        "Payment and Settlement Systems Act provisions",
        "Right to fair treatment"
      ],
      timeline: {
        "0-2 days": "Contact bank/merchant",
        "7-14 days": "File chargeback/dispute",
        "15-30 days": "Send legal notice",
        "30+ days": "File court case"
      }
    },
    loan: {
      immediate: [
        "Document loan agreement",
        "Preserve payment receipts",
        "Stop automatic payments if needed",
        "Contact loan officer immediately"
      ],
      legal: [
        "File complaint with banking ombudsman",
        "Send legal notice to bank",
        "File consumer court case",
        "Consider criminal complaint for harassment"
      ],
      constitutional: [
        "Article 14: Right to equality",
        "Article 21: Right to life and liberty",
        "Banking Regulation Act provisions",
        "Right to fair lending practices"
      ],
      timeline: {
        "0-7 days": "Contact bank, document issues",
        "15-30 days": "File ombudsman complaint",
        "30-60 days": "Send legal notice",
        "60+ days": "File consumer court case"
      }
    },
    card: {
      immediate: [
        "Block card immediately",
        "Document unauthorized transactions",
        "Preserve card statements",
        "Contact bank card services"
      ],
      legal: [
        "File chargeback for unauthorized charges",
        "File dispute with bank",
        "Send legal notice for liability issues",
        "Consider criminal complaint for fraud"
      ],
      constitutional: [
        "Article 14: Right to equality",
        "Article 21: Right to life and liberty",
        "Credit Card Agreements Act provisions",
        "Right to fair treatment"
      ],
      timeline: {
        "0-1 days": "Block card, contact bank",
        "3-7 days": "File chargeback",
        "15-30 days": "Send legal notice",
        "30+ days": "File court case"
      }
    },
    fraud: {
      immediate: [
        "Block all accounts immediately",
        "Document all suspicious activities",
        "File cyber complaint if needed",
        "Contact bank fraud department"
      ],
      legal: [
        "File police FIR",
        "File complaint with banking ombudsman",
        "Send legal notice to bank",
        "File criminal complaint for fraud"
      ],
      constitutional: [
        "Article 14: Right to equality",
        "Article 21: Right to life and liberty",
        "IT Act provisions for digital fraud",
        "Right to protection from fraud"
      ],
      timeline: {
        "0-1 days": "Block accounts, file police complaint",
        "2-7 days": "File cyber complaint",
        "15-30 days": "File ombudsman complaint",
        "30+ days": "File criminal case"
      }
    },
    charges: {
      immediate: [
        "Document unexpected charges",
        "Question charges with bank",
        "Request charge reversal",
        "Stop automatic payments"
      ],
      legal: [
        "File complaint with banking ombudsman",
        "Send legal notice for illegal charges",
        "File consumer court case",
        "Consider class action for widespread issues"
      ],
      constitutional: [
        "Article 14: Right to equality",
        "Article 19(1)(g): Right to practice any profession",
        "Banking Regulation Act provisions",
        "Right to fair charges"
      ],
      timeline: {
        "0-7 days": "Question charges with bank",
        "15-30 days": "File ombudsman complaint",
        "30-60 days": "Send legal notice",
        "60+ days": "File consumer court case"
      }
    }
  }

  return strategies[issueType as keyof typeof strategies] || strategies.account
}

function getBankingResources(issueType: string, bankName: string, category: string) {
  const resources = {
    account: {
      authorities: [
        { name: "Banking Ombudsman", phone: "1800-425-0019", type: "dispute" },
        { name: "Reserve Bank of India", phone: "011-2338225", type: "regulatory" },
        { name: "Consumer Protection Council", phone: "011-23231784", type: "consumer" }
      ],
      organizations: [
        { name: "Banking Consumers Association", phone: "011-23231790", type: "consumer" },
        { name: "Financial Consumer Forum", phone: "011-23231791", type: "finance" },
        { name: "Account Holders Association", phone: "011-23231792", type: "account" }
      ],
      websites: [
        "https://rbi.org.in",
        "https://bankingombudsman.org",
        "https://consumer.gov.in"
      ]
    },
    transaction: {
      authorities: [
        { name: "Banking Ombudsman", phone: "1800-425-0019", type: "dispute" },
        { name: "National Payments Corporation", phone: "011-2338226", type: "payments" },
        { name: "Consumer Protection Council", phone: "011-23231784", type: "consumer" }
      ],
      organizations: [
        { name: "Payment Systems Association", phone: "011-2338227", type: "payments" },
        { name: "Digital Payments Forum", phone: "011-23231793", type: "digital" },
        { name: "Transaction Security Council", phone: "011-23231794", type: "security" }
      ],
      websites: [
        "https://npci.org.in",
        "https://rbi.org.in",
        "https://payments.gov.in"
      ]
    },
    loan: {
      authorities: [
        { name: "Banking Ombudsman", phone: "1800-425-0019", type: "dispute" },
        { name: "Reserve Bank of India", phone: "011-2338225", type: "regulatory" },
        { name: "Credit Information Bureau", phone: "011-2338228", type: "credit" }
      ],
      organizations: [
        { name: "Loan Borrowers Association", phone: "011-23231795", type: "loan" },
        { name: "Credit Counseling Services", phone: "011-23231796", type: "counseling" },
        { name: "Debt Relief Forum", phone: "011-23231797", type: "debt" }
      ],
      websites: [
        "https://rbi.org.in",
        "https://cibil.com",
        "https://bankingombudsman.org"
      ]
    },
    card: {
      authorities: [
        { name: "Banking Ombudsman", phone: "1800-425-0019", type: "dispute" },
        { name: "RBI Card Division", phone: "011-2338229", type: "regulatory" },
        { name: "Consumer Protection Council", phone: "011-23231784", type: "consumer" }
      ],
      organizations: [
        { name: "Card Holders Association", phone: "011-23231798", type: "card" },
        { name: "Credit Card Users Forum", phone: "011-23231799", type: "credit_card" },
        { name: "Digital Payments Association", phone: "011-23231793", type: "digital" }
      ],
      websites: [
        "https://rbi.org.in",
        "https://npci.org.in",
        "https://cardsecurity.org"
      ]
    },
    fraud: {
      authorities: [
        { name: "Cyber Cell", phone: "011-23381789", type: "cyber" },
        { name: "Banking Ombudsman", phone: "1800-425-0019", type: "dispute" },
        { name: "Economic Offences Wing", phone: "011-2338180", type: "economic" }
      ],
      organizations: [
        { name: "Cyber Security Forum", phone: "011-2323180", type: "security" },
        { name: "Fraud Prevention Association", phone: "011-2323181", type: "fraud" },
        { name: "Digital Security Council", phone: "011-2323182", type: "security" }
      ],
      websites: [
        "https://cybercell.gov.in",
        "https://rbi.org.in",
        "https://cybercrime.gov.in"
      ]
    },
    charges: {
      authorities: [
        { name: "Banking Ombudsman", phone: "1800-425-0019", type: "dispute" },
        { name: "Reserve Bank of India", phone: "011-2338225", type: "regulatory" },
        { name: "Consumer Protection Council", phone: "011-23231784", type: "consumer" }
      ],
      organizations: [
        { name: "Banking Fee Forum", phone: "011-2323183", type: "fees" },
        { name: "Consumer Charges Association", phone: "011-2323184", type: "charges" },
        { name: "Financial Transparency Council", phone: "011-2323185", type: "transparency" }
      ],
      websites: [
        "https://rbi.org.in",
        "https://bankingombudsman.org",
        "https://fees.gov.in"
      ]
    }
  }

  return resources[issueType as keyof typeof resources] || resources.account
}

function getBankingLegalOptions(issueType: string, amount: number, urgency: string) {
  const options = {
    account: {
      negotiation: {
        description: "Negotiate with bank for resolution",
        timeline: "7-14 days",
        success: 65,
        cost: "None",
        effort: "Low"
      },
      ombudsman: {
        description: "File complaint with Banking Ombudsman",
        timeline: "30-60 days",
        success: 80,
        cost: "None",
        effort: "Low"
      },
      legal: {
        description: "Send legal notice to bank",
        timeline: "15-30 days",
        success: 75,
        cost: "Medium",
        effort: "Medium"
      },
      court: {
        description: "File case in Consumer Court",
        timeline: "60-120 days",
        success: 85,
        cost: "High",
        effort: "High"
      }
    },
    transaction: {
      chargeback: {
        description: "File chargeback with card issuer",
        timeline: "3-7 days",
        success: 70,
        cost: "None",
        effort: "Low"
      },
      dispute: {
        description: "File dispute with bank",
        timeline: "7-14 days",
        success: 60,
        cost: "None",
        effort: "Low"
      },
      legal: {
        description: "Send legal notice for unauthorized transaction",
        timeline: "15-30 days",
        success: 80,
        cost: "Medium",
        effort: "Medium"
      },
      court: {
        description: "File case in Consumer Court",
        timeline: "45-90 days",
        success: 85,
        cost: "High",
        effort: "High"
      }
    },
    loan: {
      negotiation: {
        description: "Negotiate with bank for loan restructuring",
        timeline: "14-30 days",
        success: 55,
        cost: "None",
        effort: "Medium"
      },
      ombudsman: {
        description: "File complaint with Banking Ombudsman",
        timeline: "30-60 days",
        success: 75,
        cost: "None",
        effort: "Low"
      },
      legal: {
        description: "Send legal notice for loan issues",
        timeline: "15-30 days",
        success: 70,
        cost: "Medium",
        effort: "Medium"
      },
      court: {
        description: "File case in Consumer Court",
        timeline: "60-120 days",
        success: 80,
        cost: "High",
        effort: "High"
      }
    },
    card: {
      chargeback: {
        description: "File chargeback for unauthorized charges",
        timeline: "3-7 days",
        success: 80,
        cost: "None",
        effort: "Low"
      },
      dispute: {
        description: "File dispute with bank",
        timeline: "7-14 days",
        success: 60,
        cost: "None",
        effort: "Low"
      },
      legal: {
        description: "Send legal notice for card liability issues",
        timeline: "15-30 days",
        success: 75,
        cost: "Medium",
        effort: "Medium"
      },
      court: {
        description: "File case in Consumer Court",
        timeline: "45-90 days",
        success: 85,
        cost: "High",
        effort: "High"
      }
    },
    fraud: {
      police: {
        description: "File FIR with police cyber cell",
        timeline: "1-3 days",
        success: 40,
        cost: "None",
        effort: "Medium"
      },
      ombudsman: {
        description: "File complaint with Banking Ombudsman",
        timeline: "30-60 days",
        success: 70,
        cost: "None",
        effort: "Low"
      },
      legal: {
        description: "Send legal notice to bank",
        timeline: "15-30 days",
        success: 60,
        cost: "Medium",
        effort: "Medium"
      },
      court: {
        description: "File case in Consumer Court",
        timeline: "60-120 days",
        success: 75,
        cost: "High",
        effort: "High"
      }
    },
    charges: {
      negotiation: {
        description: "Negotiate with bank for charge reversal",
        timeline: "7-14 days",
        success: 60,
        cost: "None",
        effort: "Low"
      },
      ombudsman: {
        description: "File complaint with Banking Ombudsman",
        timeline: "30-60 days",
        success: 75,
        cost: "None",
        effort: "Low"
      },
      legal: {
        description: "Send legal notice for illegal charges",
        timeline: "15-30 days",
        success: 80,
        cost: "Medium",
        effort: "Medium"
      },
      court: {
        description: "File case in Consumer Court",
        timeline: "60-120 days",
        success: 85,
        cost: "High",
        effort: "High"
      }
    }
  }

  return options[issueType as keyof typeof options] || options.account
}

function getBankingRights(issueType: string, category: string) {
  const rights = {
    account: [
      {
        article: "Article 14",
        title: "Right to equality",
        description: "Equal access to banking services for all citizens",
        application: "No discrimination in banking services"
      },
      {
        article: "Article 19(1)(g)",
        title: "Right to practice any profession",
        description: "Right to engage in lawful banking activities",
        application: "Right to banking services"
      },
      {
        legislation: "Banking Regulation Act, 1949",
        title: "Banking regulations",
        description: "Comprehensive regulation of banking operations",
        application: "All banking operations covered"
      }
    ],
    transaction: [
      {
        article: "Article 14",
        title: "Right to equality",
        description: "Equal treatment in payment transactions",
        application: "No discrimination in payment systems"
      },
      {
        article: "Article 21",
        title: "Right to life and liberty",
        description: "Includes right to secure payment systems",
        application: "Right to secure payment transactions"
      },
      {
        legislation: " "Payment and Settlement Systems Act, 2007",
        title: "Payment systems regulation",
        description: "Regulates payment and settlement systems",
        application: "All payment transactions covered"
      }
    ],
    loan: [
      {
        article: "Article 14",
        title: "Right to equality",
        description: "Equal access to credit facilities",
        application: "No discrimination in lending"
      },
      {
        article: "Article 21",
        title: "Right to life and liberty",
        description: "Includes right to fair lending practices",
        application: "Right to fair credit terms"
      },
      {
        legislation: "Banking Regulation Act, 1949",
        title: "Banking regulations",
        description: "Regulates lending and credit operations",
        application: "All lending operations covered"
      }
    ],
    card: [
      {
        article: "Article 14",
        title: "Right to equality",
        description: "Equal access to card facilities",
        application: "No discrimination in card issuance"
      },
      {
        article: "Article 21",
        title: "Right to life and liberty",
        description: "Includes right to secure card transactions",
        application: "Right to secure card usage"
      },
      {
        legislation: "Credit Card Agreements Act, 2006",
        title: "Credit card regulations",
        description: "Regulates credit card operations",
        application: "All card operations covered"
      }
    ],
    fraud: [
      {
        article: "Article 14",
        title: "Right to equality",
        description: "Equal protection from fraud",
        application: "No discrimination in fraud response"
      },
      {
        article: "Article 21",
        title: "Right to life and liberty",
        description: "Includes right to protection from fraud",
        application: "Right to fraud protection"
      },
      {
        legislation: "IT Act, 2000",
        title: "Information Technology regulations",
        description: "Regulates digital transactions and cyber security",
        application: "All digital transactions covered"
      }
    ],
    charges: [
      {
        article: "Article 14",
        title: "Right to equality",
        description: "Equal treatment in banking charges",
        application: "No discrimination in fee structures"
      },
      {
        article: "Article 19(1)(g)",
        title: "Right to practice any profession",
        description: "Right to fair banking charges",
        application: "Right to reasonable charges"
      },
      {
        legislation: "Banking Regulation Act, 1949",
        title: "Banking regulations",
        description: "Regulates banking charges and fees",
        application: "All banking charges covered"
      }
    ]
  }

  return rights[issueType as keyof typeof rights] || rights.account
}

function createBankingActionPlan(issueType: string, urgency: string, bankName: string, amount: number) {
  const plans = {
    account: {
      immediate: [
        "Document all account issues",
        "Secure account credentials",
        "Monitor account activity",
        "Contact bank immediately"
      ],
      short: [
        "File complaint with bank",
        "File ombudsman complaint if needed",
        "Send legal notice if no response",
        "Prepare for consumer court"
      ],
      long: [
        "Monitor account health",
        "Review banking practices",
        "Share experience with others",
        "Consider changing banks if needed"
      ]
    },
    transaction: [
      "Document transaction details",
      "Preserve receipts and statements",
        "Monitor payment status",
        "Follow up with merchant/bank"
      ],
      short: [
        "File chargeback/dispute",
        "File complaint with bank",
        "Send legal notice if unresolved",
        "File consumer court case"
      ],
      long: [
        "Monitor payment systems",
        "Review transaction security",
        "Share payment experience",
        "Consider alternative payment methods"
      ]
    ],
    loan: [
      "Document loan agreement",
      "Monitor loan statements",
        "Track payment schedule",
        "Communicate with loan officer"
      ],
      short: [
        "File complaint with bank",
        "File ombudsman complaint",
        "Send legal notice",
        "File consumer court case"
      ],
      long: [
        "Monitor loan performance",
        "Review loan terms",
        "Consider loan restructuring",
        "Plan for loan closure"
      ]
    ],
    card: [
      "Block card immediately if fraud",
      "Document card issues",
      "Monitor card statements",
        "Follow up with bank"
      ],
      short: [
        "File chargeback/dispute",
        "File complaint with bank",
        "Send legal notice",
        "File consumer court case"
      ],
      long: [
        "Monitor card security",
        "Review card terms",
        "Consider card replacement",
        "Plan for card upgrade"
      ]
    ],
    fraud: [
      "Block all accounts immediately",
      "File police FIR",
      "File cyber complaint",
        "Contact bank fraud department"
      ],
      short: [
        "Follow up on police investigation",
        "File ombudsman complaint",
        "Send legal notice",
        "File criminal case"
      ],
      long: [
        "Monitor account security",
        "Review banking practices",
        "Share fraud awareness",
        "Consider security improvements"
      ]
    ],
    charges: [
      "Document unexpected charges",
        "Question charges with bank",
        "Request charge reversal",
        "Monitor future statements"
      ],
      short: [
        "File complaint with bank",
        "File ombudsman complaint",
        "Send legal notice",
        "File consumer court case"
      ],
      long: [
        "Monitor banking charges",
        "Review fee structures",
        "Share charge experience",
        "Consider changing banks"
      ]
    }
  }

  return plans[issueType as keyof typeof plans] || plans.account
}

function getBankingTimeline(issueType: string, urgency: string) {
  const baseTimelines = {
    account: {
      bank: "7-14 days",
      ombudsman: "30-60 days",
      legal: "15-30 days",
      court: "60-120 days"
    },
    transaction: {
      chargeback: "3-7 days",
      dispute: "7-14 days",
      legal: "15-30 days",
      court: "45-90 days"
    },
    loan: {
      bank: "14-30 days",
      ombudsman: "30-60 days",
      legal: "15-30 days",
      court: "60-120 days"
    },
    card: {
      bank: "3-7 days",
      chargeback: "3-7 days",
      legal: "15-30 days",
      court: "45-90 days"
    },
    fraud: {
      police: "1-3 days",
      cyber: "2-7 days",
      ombudsman: "30-60 days",
      legal: "15-30 days"
    },
    charges: {
      bank: "7-14 days",
      ombudsman: "30-60 days",
      legal: "15-30 days",
      court: "60-120 days"
    }
  }

  const urgencyAdjustment = {
    urgent: 0.5,
    priority: 0.75,
    normal: 1
  }

  const timeline = baseTimelines[issueType as keyof typeof baseTimelines] || baseTimelines.account
  const multiplier = urgencyAdjustment[urgency as keyof typeof urgencyAdjustment] || 1

  return Object.keys(timeline).reduce((acc, key) => {
    const [start, end] = timeline[key as keyof typeof timeline].split('-')
    const startNum = parseInt(start) * multiplier
    const endNum = parseInt(end) * multiplier
    acc[key] = `${startNum}-${endNum} ${end.includes('day') ? 'days' : 'hours'}`
    return acc
  }, {} as any)
}

function getBankingChecklists(issueType: string) {
  const checklists = {
    account: {
      pre: [
        "Keep all account documents",
        "Monitor account statements",
        "Use strong passwords",
        "Enable two-factor authentication"
      ],
      during: [
        "Document all account issues",
        "Preserve communication records",
        "Take screenshots",
        "Record all phone calls"
      ],
      post: [
        "Monitor account activity",
        "Update security settings",
        "Review banking practices",
        "Share experience with others"
      ]
    },
    transaction: [
      "Keep transaction records",
      "Monitor payment status",
        "Use secure payment methods",
        "Verify merchant details"
      ],
      "short: [
        "File chargeback promptly",
        "Document all issues",
        "Follow up regularly",
        "Preserve evidence"
      ],
      long: [
        "Monitor payment systems",
        "Review security practices",
        "Share payment experience",
        "Consider alternative methods"
      ]
    ],
    loan: [
      "Keep loan agreement",
      "Monitor loan statements",
        "Track payment schedule",
        "Understand loan terms"
      ],
      "short: [
        "File complaint promptly",
        "Document all issues",
        "Follow up regularly",
        "Preserve evidence"
      ],
      long: [
        "Monitor loan performance",
        "Review loan terms",
        "Plan for loan closure",
        "Consider refinancing"
      ]
    ],
    card: [
      "Keep card agreements",
      "Monitor card statements",
        "Use secure payment methods",
        "Enable transaction alerts"
      ],
      "short: [
        "File chargeback promptly",
        "Block card if fraud",
        "Document all issues",
        "Preserve evidence"
      ],
      long: [
        "Monitor card security",
        "Review card terms",
        "Consider card upgrade",
        "Plan for card replacement"
      ]
    ],
    fraud: [
      "Use strong passwords",
      "Enable two-factor authentication",
        "Monitor account activity",
        "Use secure networks"
      ],
      "short: [
        "File police FIR immediately",
        "Block all accounts",
        "File cyber complaint",
        "Document all evidence"
      ],
      long: [
        "Monitor account security",
        "Update security settings",
        "Share fraud awareness",
        "Consider security improvements"
      ]
    ],
    charges: [
      "Keep fee schedules",
      "Monitor statements",
        "Question unexpected charges",
        "Review banking practices"
      ],
      "short: [
        "Question charges immediately",
        "File complaint if needed",
        "Document all issues",
        "Follow up regularly"
      ],
      long: [
        "Monitor banking charges",
        "Review fee structures",
        "Share charge experience",
        "Consider alternative banks"
      ]
    ]
  }

  return checklists[issueType as keyof typeof checklists] || checklists.account
}

function getBankingTemplates(language: string = 'en') {
  return [
    {
      id: 1,
      title: "Bank Account Complaint",
      type: "account",
      template: `
To,
The Branch Manager
[Bank Name]
[Bank Address]
[Date]

Subject: Complaint Regarding Banking Account - [Account Number]

Dear Sir/Madam,

I am writing to file a formal complaint regarding issues with my banking account [Account Number] held at your branch.

Account Details:
- Account Number: [Account Number]
- Account Type: [Savings/Current/Loan]
- Account Holder: [Your Name]
- Branch: [Branch Name]
- Since: [Account Opening Date]

Issues Faced:
[Describe banking issues in detail]

These issues violate my rights under the Banking Regulation Act, 1949, and I request immediate remedial action.

I look forward to your prompt response within 15 days.

Sincerely,
[Your Name]
[Your Contact Information]
[Account Number]
      `,
      fields: ["Bank Name", "Account Number", "Branch Name", "Issues Description"]
    },
    {
      id: 2,
      title: "Transaction Dispute Complaint",
      type: "transaction",
      template: `
To,
The Manager
[Bank Name]
[Bank Address]
[Date]

Subject: Complaint Regarding Transaction Dispute - [Transaction ID]

Dear Sir/Madam,

I am writing to file a complaint regarding the disputed transaction [Transaction ID] in my account [Account Number].

Transaction Details:
- Transaction ID: [Transaction ID]
- Date: [Transaction Date]
- Amount: [Amount]
- Merchant: [Merchant Name]
- Type: [Debit/Credit]
- Reference: [Transaction Reference]

Issue Description:
[Describe transaction dispute in detail]

This dispute violates my rights under the Payment and Settlement Systems Act, 2007, and I request immediate resolution.

I expect your response within 7 days.

Sincerely,
[Your Name]
[Your Contact Information]
[Account Number]
      `,
      fields: ["Bank Name", "Transaction ID", "Merchant Name", "Issue Description"]
    }
  ]
}

function getBankingContacts(bankName: string, category: string) {
  const baseContacts = {
    national: [
      { name: "Reserve Bank of India", phone: "011-2338225", type: "regulatory" },
      { name: "Banking Ombudsman", phone: "1800-425-0019", type: "dispute" },
      { name: "Consumer Protection Council", phone: "011-23231784", type: "consumer" }
    ],
    regulatory: [
      { name: "RBI Customer Service", phone: "011-2338225", type: "service" },
      { name: "Banking Ombudsman", phone: "1800-425-0019", type: "dispute" },
      { name: "Consumer Protection Council", phone: "011-23231784", type: "consumer" }
    ],
    security: [
      { name: "RBI Security Department", phone: "011-2338230", type: "security" },
      { name: "Cyber Cell", phone: "011-23381789", type: "cyber" },
      { name: "Banking Security Forum", phone: "011-2323186", type: "security" }
    ],
    legal: [
      { name: "Banking Legal Cell", phone: "011-2338225", type: "legal" },
      { name: "Consumer Court", phone: "011-23231785", type: "court" },
      { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
    ]
  }

  return baseContacts
}

function getBankingIssueTypes() {
  return [
    {
      id: "account",
      name: "Account Issues",
      description: "Account opening, closure, balance issues, unauthorized access",
      urgency: "medium",
      common: true,
      timeline: "30-60 days"
    },
    {
      id: "transaction",
      name: "Transaction Problems",
      description: "Payment failures, unauthorized transactions, processing delays",
      urgency: "high",
      common: true,
      timeline: "7-14 days"
    },
    {
      id: "loan",
      name: "Loan Issues",
      description: "Loan approval, interest rates, harassment, foreclosure",
      urgency: "high",
      common: true,
      timeline: "30-60 days"
    },
    {
      id: "card",
      name: "Card Issues",
      description: "Unauthorized charges, card blocking, liability disputes",
      urgency: "high",
      common: true,
      timeline: "3-7 days"
    },
    {
      id: "fraud",
      name: "Banking Fraud",
      description: "Identity theft, phishing, account takeover, financial fraud",
      urgency: "urgent",
      common: false,
      timeline: "1-3 days"
    },
    {
      id: "charges",
      name: "Banking Charges",
      description: "Excessive fees, hidden charges, illegal deductions",
      urgency: "medium",
      common: true,
      timeline: "30-60 days"
    }
  ]
}

function getBankingStatistics() {
  return {
    totalIssues: 180000,
    successRate: 72,
    averageResolutionTime: 35, // days
    compensation: 8500000, // total compensation awarded
    categories: {
      account: 50000,
      transaction: 45000,
      loan: 35000,
      card: 25000,
      fraud: 15000,
      charges: 10000
    },
    lastUpdated: new Date().toISOString()
  }
}

function getRecentBankingCases(language: string = 'en') {
  return [
    {
      id: 1,
      type: "transaction",
      title: "Unauthorized Transaction Reversed",
      bank: "Nationalized Bank",
      description: "Bank reversed unauthorized transaction within 5 days",
      outcome: "success",
      compensation: 2500,
      date: "2023-12-20",
      timeline: "5 days"
    },
    {
      id: 2,
      type: "card",
      title: "Fraudulent Charges Refunded",
      bank: "Private Bank",
      description: "Bank refunded fraudulent charges after investigation",
      outcome: "success",
      compensation: 5000,
      date: "2023-12-18",
      timeline: "10 days"
    },
    {
      id: 3,
      type: "loan",
      title: "Loan Harassment Stopped",
      bank: "NBFC",
      description: "Bank stopped loan harassment after legal notice",
      outcome: "success",
      compensation: 0,
      date: "2023-12-15",
      timeline: "20 days"
    }
  ]
}

function getBankInfo(bankName: string) {
  const banks = {
    "State Bank of India": {
      name: "State Bank of India",
      category: "public",
      address: "State Bank Bhavan, Madame Cama Road, New Delhi - 110001",
      phone: "1800-425-3800",
      email: "sbi@sbi.co.in",
      website: "https://sbi.co.in",
      customerService: "1800-425-3800",
      legal: "legal@sbi.co.in"
    },
    "ICICI Bank": {
      name: "ICICI Bank",
      category: "private",
      address: "ICICI Bank Tower, Vadodara, Gujarat - 390007",
      phone: "1800-103-8181",
      email: "customer.care@icicibank.com",
      website: "https://icicibank.com",
      customerService: "1800-103-8181",
      legal: "legal@icicibank.com"
    },
    "HDFC Bank": {
      name: "HDFC Bank",
      category: "private",
      address: "HDFC Bank House, 171, Senapati Bapat Marg, Mumbai - 400026",
      phone: "1800-258-6181",
      email: "support@hdfcbank.com",
      website: "https://hdfcbank.com",
      customerService: "1800-258-6181",
      legal: "legal@hdfcbank.com"
    }
  }

  return banks[bankName as keyof typeof banks] || null
}

function getBankingConstitutionalBasis() {
  return {
    primary: {
      article: "Article 14",
      title: "Right to equality",
      description: "Equal protection of laws in banking services",
      applications: ["Account", "Transaction", "Loan", "Card", "Charges"]
    },
    secondary: {
      article: "Article 19(1)(g)",
      title: "Right to practice any profession",
      description: "Right to engage in lawful banking activities",
      applications: ["Account", "Transaction", "Loan", "Card"]
    },
    landmark: {
      case: "M.C. Mehta vs. Union of India (1997)",
      title: "Right to healthy environment",
      description: "Includes right to pollution-free environment affecting banking",
      applications: ["Account", "Transaction", "Loan", "Card", "Charges"]
    },
    legislation: {
      act: "Banking Regulation Act, 1949",
      title: "Banking regulations",
      description: "Comprehensive regulation of banking operations in India",
      applications: ["Account", "Transaction", "Loan", "Card", "Charges"]
    }
  }
}

function getBankingHotlines() {
  return [
    {
      name: "Reserve Bank of India",
      phone: "011-2338225",
      category: "regulatory",
      is247: false,
      description: "Central banking authority and regulator"
    },
    {
      name: "Banking Ombudsman",
      phone: "1800-425-0019",
      category: "dispute",
      is247: false,
      description: "Banking dispute resolution"
    },
    {
      name: "RBI Customer Service",
      phone: "011-2338225",
      category: "service",
      is247: false,
      description: "RBI customer assistance"
    },
    {
      name: "Cyber Cell",
      phone: "011-23381789",
      category: "security",
      is247: true,
      description: "Cybercrime reporting and assistance"
    },
    {
      name: "National Helpline",
      phone: "112",
      category: "emergency",
      is247: true,
      description: "All emergencies including banking fraud"
    }
  ]
}

function getBankingRegulations() {
  return [
    {
      name: "Banking Regulation Act, 1949",
      description: "Comprehensive regulation of banking operations in India",
      authority: "Reserve Bank of India",
      year: 1949
    },
    {
      name: "Payment and Settlement Systems Act, 2007",
      description: "Regulates payment systems and settlement systems",
      authority: "Reserve Bank of India",
      year: 2007
    },
    {
      name: "Credit Information Companies (Regulation) Act, 2005",
      description: "Regulates credit information bureaus and credit reporting",
      authority: "Reserve Bank of India",
      year: 2005
    },
    {
      name: "Foreign Exchange Management Act, 1999",
      description: "Regulates foreign exchange transactions",
      authority: "Reserve Bank of India",
      year: 1999
    },
    {
      name: "Securities and Exchange Board Act, 1992",
      description: "Regulates securities markets and mutual funds",
      authority: "SEBI",
      year: 1992
    }
  ]
}