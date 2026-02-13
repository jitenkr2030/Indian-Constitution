import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      rightsType,
      healthcareIssue,
      hospitalName,
      patientInfo,
      medicalDetails,
      urgency = 'normal',
      language = 'en',
      location,
      insuranceInfo,
      medicalRecords,
      legalAction = false
    } = body

    // Generate healthcare rights strategy
    const rightsStrategy = generateRightsStrategy({
      rightsType,
      healthcareIssue,
      hospitalName,
      patientInfo,
      medicalDetails,
      urgency,
      language,
      location,
      insuranceInfo,
      medicalRecords,
      legalAction
    })

    // Get healthcare resources
    const healthcareResources = getHealthcareResources(rightsType, location)

    // Get legal options and remedies
    const legalOptions = getLegalOptions(rightsType, healthcareIssue, urgency)

    // Create action plan
    const actionPlan = createActionPlan(rightsType, urgency, location)

    return NextResponse.json({
      success: true,
      data: {
        rightsStrategy,
        healthcareResources,
        legalOptions,
        actionPlan,
        timeline: getHealthcareTimeline(rightsType, urgency),
        checklists: getHealthcareChecklists(rightsType),
        templates: getHealthcareTemplates(language),
        contacts: getHealthcareContacts(location),
        statistics: getHealthcareStatistics(),
        constitutionalBasis: getHealthcareConstitutionalBasis()
      }
    })

  } catch (error) {
    console.error('Healthcare Rights Navigator Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to process healthcare rights request'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const location = searchParams.get('location')
    const language = searchParams.get('lang') || 'en'

    // Get healthcare issue types
    const issueTypes = getHealthcareIssueTypes()
    const filteredTypes = type ? issueTypes.filter(t => t.id === type) : issueTypes
    
    // Get healthcare statistics
    const statistics = getHealthcareStatistics()

    // Get recent cases
    const recentCases = getRecentCases(language)

    // Get location-specific resources
    const locationResources = location ? getLocationHealthcareResources(location) : null

    return NextResponse.json({
      success: true,
      data: {
        issueTypes: filteredTypes,
        statistics,
        recentCases,
        locationResources,
        constitutionalBasis: getHealthcareConstitutionalBasis(),
        healthcareLaws: getHealthcareLaws(),
        governmentHealthSchemes: getGovernmentHealthSchemes()
      }
    })

  } catch (error) {
    console.error('Healthcare Directory Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch healthcare resources'
    }, { status: 500 })
  }
}

// Helper functions
function generateRightsStrategy(data: any) {
  const { rightsType, healthcareIssue, hospitalName, patientInfo, medicalDetails, urgency, language, location, insuranceInfo, medicalRecords, legalAction } = data
  
  const strategies = {
    emergency_care: {
      immediate: [
        "Ensure immediate medical attention",
        "Contact emergency services (108)",
        "Document all medical incidents",
        "Preserve medical records and evidence",
        "Contact family members if needed"
      ],
      legal: [
        "File complaint under Clinical Establishments Act",
        "Seek intervention from Medical Council",
        "File civil suit for medical negligence",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 21: Right to health and medical care",
        "Article 14: Right to equality in healthcare",
        "Article 47: Duty of state to raise nutrition level",
        "Clinical Establishments Act provisions"
      ],
      timeline: {
        "emergency": "0-2 hours",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    medical_negligence: {
      immediate: [
        "Document all medical negligence details",
        "Seek immediate alternative medical care",
        "Preserve all medical records and evidence",
        "Contact medical legal experts",
        "Report to hospital administration"
      ],
      legal: [
        "File complaint under Medical Council of India",
        "File civil suit for medical negligence",
        "Seek compensation for damages",
        "Consider criminal complaint for gross negligence"
      ],
      constitutional: [
        "Article 21: Right to health with dignity",
        "Article 14: Right to equality in medical treatment",
        "Article 47: Right to proper healthcare",
        "Medical Council Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "60-120 days"
      }
    },
    patient_rights: {
      immediate: [
        "Document patient rights violations",
        "Request copy of medical records",
        "Seek second opinion if needed",
        "Contact hospital patient relations",
        "Preserve all communication evidence"
      ],
      legal: [
        "File complaint under Clinical Establishments Act",
        "Seek intervention from Medical Council",
        "File civil suit for rights violations",
        "Report to State Health Authority"
      ],
      constitutional: [
        "Article 21: Right to health and dignity",
        "Article 14: Right to equal treatment",
        "Article 47: Right to proper healthcare",
        "Clinical Establishments Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    insurance_rights: {
      immediate: [
        "Document insurance claim denial",
        "Review insurance policy terms",
        "Contact insurance company immediately",
        "Preserve all communication evidence",
        "Seek legal advice for claim disputes"
      ],
      legal: [
        "File complaint with IRDAI (Insurance Regulatory Authority)",
        "File civil suit for insurance claim denial",
        "Seek intervention from consumer court",
        "Consider criminal complaint for fraud"
      ],
      constitutional: [
        "Article 21: Right to health and insurance",
        "Article 14: Right to equality in insurance",
        "Article 47: Right to social security",
        "Insurance Act provisions"
      ],
      timeline: {
        "claim": "7-14 days",
        "complaint": "14-30 days",
        "investigation": "30-60 days",
        "resolution": "60-120 days"
      }
    },
    public_health: {
      immediate: [
        "Document public health violations",
        "Report to local health authorities",
        "Seek immediate preventive measures",
        "Preserve evidence of violations",
        "Contact community health organizations"
      ],
      legal: [
        "File complaint under Public Health Act",
        "Seek intervention from Health Ministry",
        "File public interest litigation",
        "Report to WHO if international issue"
      ],
      constitutional: [
        "Article 21: Right to health for all",
        "Article 14: Right to equality in public health",
        "Article 47: Duty to improve public health",
        "Public Health Act provisions"
      ],
      timeline: {
        "reporting": "1-3 days",
        "investigation": "7-14 days",
        "action": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    mental_health: {
      immediate: [
        "Ensure immediate mental health support",
        "Contact mental health helplines",
        "Document mental healthcare violations",
        "Seek crisis intervention if needed",
        "Preserve all communication evidence"
      ],
      legal: [
        "File complaint under Mental Healthcare Act",
        "Seek intervention from Mental Health Authority",
        "File civil suit for rights violations",
        "Report to State Mental Health Authority"
      ],
      constitutional: [
        "Article 21: Right to mental healthcare",
        "Article 14: Right to equality in mental health",
        "Article 47: Right to proper healthcare",
        "Mental Healthcare Act provisions"
      ],
      timeline: {
        "crisis": "0-2 hours",
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    pharmaceutical_rights: {
      immediate: [
        "Document pharmaceutical violations",
        "Report to drug regulatory authorities",
        "Seek immediate medical attention for adverse reactions",
        "Preserve medication evidence",
        "Contact consumer protection agencies"
      ],
      legal: [
        "File complaint with Drug Controller General",
        "Report to pharmaceutical company",
        "File civil suit for drug violations",
        "Seek intervention from consumer court"
      ],
      constitutional: [
        "Article 21: Right to essential medicines",
        "Article 14: Right to equality in pharmaceutical access",
        "Article 47: Right to nutrition and public health",
        "Drugs and Cosmetics Act provisions"
      ],
      timeline: {
        "adverse_reaction": "0-1 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    rural_healthcare: {
      immediate: [
        "Document rural healthcare violations",
        "Contact local rural health centers",
        "Seek immediate medical attention for emergencies",
        "Preserve evidence of healthcare gaps",
        "Contact community health workers"
      ],
      legal: [
        "File complaint under National Rural Health Mission",
        "Seek intervention from State Health Authority",
        "File public interest litigation",
        "Report to Ministry of Health"
      ],
      constitutional: [
        "Article 21: Right to health in rural areas",
        "Article 14: Right to equality in rural healthcare",
        "Article 47: Duty to improve public health",
        "National Rural Health Mission provisions"
      ],
      timeline: {
        "documentation": "3-7 days",
        "complaint": "14-30 days",
        "investigation": "30-60 days",
        "resolution": "60-120 days"
      }
    }
  }

  return strategies[rightsType as keyof typeof strategies] || strategies.emergency_care
}

function getHealthcareResources(rightsType: string, location: string) {
  const resources = {
    emergency_care: {
      authorities: [
        { name: "National Health Authority", phone: "011-2338225", type: "national" },
        { name: "Emergency Medical Services", phone: "108", type: "emergency" },
        { name: "Hospital Administration", phone: "011-2338225", type: "hospital" }
      ],
      organizations: [
        { name: "Indian Medical Association", phone: "011-2338225", type: "professional" },
        { name: "Hospital Association", phone: "011-2338225", type: "hospital" },
        { name: "Emergency Medicine Association", phone: "011-2338225", type: "emergency" }
      ],
      legal: [
        { name: "Medical Council of India", phone: "011-2323225", type: "regulatory" },
        { name: "Healthcare Legal Firms", phone: "011-2338225", type: "legal" },
        { name: "Consumer Court", phone: "011-23231785", type: "judicial" }
      ],
      helplines: [
        { name: "National Health Helpline", phone: "1800-11-2247", type: "helpline" },
        { name: "Emergency Services", phone: "108", type: "emergency" },
        { name: "Mental Health Helpline", phone: "1800-599-6669", type: "helpline" }
      ]
    },
    medical_negligence: {
      authorities: [
        { name: "Medical Council of India", phone: "011-2323225", type: "regulatory" },
        { name: "State Medical Council", phone: "011-2338225", type: "state" },
        { name: "National Medical Commission", phone: "011-2323225", type: "national" }
      ],
      organizations: [
        { name: "Patient Rights Organizations", phone: "011-2338225", type: "ngo" },
        { name: "Medical Negligence Support", phone: "011-2338225", type: "support" },
        { name: "Consumer Protection Groups", phone: "011-23231785", type: "consumer" }
      ],
      legal: [
        { name: "Medical Negligence Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Consumer Court", phone: "011-23231785", type: "judicial" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      experts: [
        { name: "Medical Experts", phone: "011-2338225", type: "expert" },
        { name: "Healthcare Consultants", phone: "011-2338225", type: "consultant" },
        { name: "Medical Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    patient_rights: {
      authorities: [
        { name: "National Health Authority", phone: "011-2338225", type: "national" },
        { name: "Hospital Administration", phone: "011-2338225", type: "hospital" },
        { name: "Patient Rights Commission", phone: "011-2338225", type: "commission" }
      ],
      organizations: [
        { name: "Patient Rights Groups", phone: "011-2338225", type: "ngo" },
        { name: "Healthcare Advocacy", phone: "011-2338225", type: "advocacy" },
        { name: "Patient Support Organizations", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "Patient Rights Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Healthcare Legal Firms", phone: "011-2338225", type: "legal" },
        { name: "Consumer Court", phone: "011-23231785", type: "judicial" }
      ],
      support: [
        { name: "Patient Support Services", phone: "011-2338225", type: "support" },
        { name: "Healthcare Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Patient Advocacy Groups", phone: "011-2338225", type: "advocacy" }
      ]
    },
    insurance_rights: {
      authorities: [
        { name: "IRDAI", phone: "011-2338225", type: "regulatory" },
        { name: "Insurance Ombudsman", phone: "1800-425-4747", type: "ombudsman" },
        { name: "Insurance Regulatory Authority", phone: "011-2338225", type: "regulatory" }
      ],
      organizations: [
        { name: "Insurance Consumer Groups", phone: "011-2338225", type: "consumer" },
        { name: "Health Insurance Associations", phone: "011-2338225", type: "insurance" },
        { name: "TPA Organizations", phone: "011-2338225", type: "tpa" }
      ],
      legal: [
        { name: "Insurance Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Consumer Court", phone: "011-23231785", type: "judicial" },
        { name: "Insurance Legal Aid", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Insurance Support", phone: "011-2338225", type: "support" },
        { name: "Claim Assistance", phone: "011-2338225", type: "assistance" },
        { name: "Policy Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    public_health: {
      authorities: [
        { name: "Ministry of Health", phone: "011-2338225", type: "ministry" },
        { name: "State Health Department", phone: "011-2338225", type: "state" },
        { name: "Public Health Foundation", phone: "011-2338225", type: "organization" }
      ],
      organizations: [
        { name: "Public Health Organizations", phone: "011-2338225", type: "ngo" },
        { name: "Health NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Community Health Groups", phone: "011-2338225", type: "community" }
      ],
      legal: [
        { name: "Public Health Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Health Law Firms", phone: "011-2338225", type: "legal" },
        { name: "Consumer Court", phone: "011-23231785", type: "judicial" }
      ],
      experts: [
        { name: "Public Health Experts", phone: "011-2338225", type: "expert" },
        { name: "Epidemiologists", phone: "011-2338225", type: "expert" },
        { name: "Health Policy Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    mental_health: {
      authorities: [
        { name: "National Mental Health Authority", phone: "011-2338225", type: "national" },
        { name: "Mental Healthcare Services", phone: "1800-599-6669", type: "helpline" },
        { name: "State Mental Health Authority", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "Mental Health NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Psychiatric Associations", phone: "011-2338225", type: "professional" },
        { name: "Support Groups", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "Mental Health Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Healthcare Legal Firms", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      helplines: [
        { name: "Mental Health Helpline", phone: "1800-599-6669", type: "helpline" },
        { name: "Crisis Intervention", phone: "9152987825", type: "crisis" },
        { name: "Suicide Prevention", phone: "1800-209-6789", type: "prevention" }
      ]
    },
    pharmaceutical_rights: {
      authorities: [
        { name: "Drug Controller General", phone: "011-2323225", type: "regulatory" },
        { name: "Pharmacy Council", phone: "011-2338225", type: "regulatory" },
        { name: "Central Drugs Standard Control", phone: "011-2323225", type: "national" }
      ],
      organizations: [
        { name: "Pharmaceutical Associations", phone: "011-2338225", type: "professional" },
        { name: "Drug Safety Organizations", phone: "011-2338225", type: "safety" },
        { name: "Consumer Groups", phone: "011-2338225", type: "consumer" }
      ],
      legal: [
        { name: "Pharmaceutical Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Drug Law Firms", phone: "011-2338225", type: "legal" },
        { name: "Consumer Court", phone: "011-23231785", type: "judicial" }
      ],
      experts: [
        { name: "Pharmacists", phone: "011-2338225", type: "professional" },
        { name: "Drug Experts", phone: "011-2338225", type: "expert" },
        { name: "Clinical Pharmacologists", phone: "011-2338225", type: "expert" }
      ]
    },
    rural_healthcare: {
      authorities: [
        { name: "National Rural Health Mission", phone: "011-2338225", type: "national" },
        { name: "State Rural Health Mission", phone: "011-2338225", type: "state" },
        { name: "Primary Health Centers", phone: "011-2338225", type: "facility" }
      ],
      organizations: [
        { name: "Rural Health NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Community Health Groups", phone: "011-2338225", type: "community" },
        { name: "ASHA Workers", phone: "011-2338225", type: "healthcare" }
      ],
      legal: [
        { name: "Rural Health Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Health Law Firms", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Rural Health Support", phone: "011-2338225", type: "support" },
        { name: "Community Health Workers", phone: "011-2338225", type: "healthcare" },
        { name: "ASHA Support", phone: "011-2338225", type: "support" }
      ]
    }
  }

  return resources[rightsType as keyof typeof resources] || resources.emergency_care
}

function getLegalOptions(rightsType: string, healthcareIssue: string, urgency: string) {
  const options = {
    emergency_care: {
      administrative: {
        description: "File complaint with hospital administration",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for medical negligence",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      criminal: {
        description: "File criminal case for severe negligence",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      },
      regulatory: {
        description: "File complaint with Medical Council",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    medical_negligence: {
      administrative: {
        description: "File complaint with hospital administration",
        timeline: "7-14 days",
        success: 65,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for medical negligence",
        timeline: "60-120 days",
        success: 60,
        cost: "Medium",
        effort: "Medium"
      },
      criminal: {
        description: "File criminal case for gross negligence",
        timeline: "90-180 days",
        success: 70,
        cost: "Low",
        effort: "High"
      },
      regulatory: {
        description: "File complaint with Medical Council",
        timeline: "30-60 days",
        success: 55,
        cost: "Low",
        effort: "Low"
      }
    },
    patient_rights: {
      administrative: {
        description: "File complaint with hospital administration",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for rights violations",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      regulatory: {
        description: "File complaint with State Health Authority",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      },
      constitutional: {
        description: "File writ petition under Article 21",
        timeline: "90-180 days",
        success: 75,
        cost: "High",
        effort: "High"
      }
    },
    insurance_rights: {
      insurance: {
        description: "File complaint with insurance company",
        timeline: "14-30 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      },
      regulatory: {
        description: "File complaint with IRDAI",
        timeline: "30-60 days",
        success: 65,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for claim denial",
        timeline: "60-120 days",
        success: 55,
        cost: "Medium",
        effort: "Medium"
      },
      consumer: {
        description: "File complaint in consumer court",
        timeline: "30-60 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      }
    },
    public_health: {
      administrative: {
        description: "File complaint with health department",
        timeline: "14-30 days",
        success: 65,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File public interest litigation",
        timeline: "90-180 days",
        success: 70,
        cost: "Medium",
        effort: "Medium"
      },
      regulatory: {
        description: "Seek intervention from Health Ministry",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      },
      constitutional: {
        description: "File writ petition under Article 21",
        timeline: "90-180 days",
        success: 75,
        cost: "High",
        effort: "High"
      }
    },
    mental_health: {
      administrative: {
        description: "File complaint with mental health authority",
        timeline: "14-30 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for rights violations",
        timeline: "60-120 days",
        success: 60,
        cost: "Medium",
        effort: "Medium"
      },
      regulatory: {
        description: "File complaint with State Mental Health Authority",
        timeline: "30-60 days",
        success: 65,
        cost: "Low",
        effort: "Low"
      },
      constitutional: {
        description: "File writ petition under Article 21",
        timeline: "90-180 days",
        success: 75,
        cost: "High",
        effort: "High"
      }
    },
    pharmaceutical_rights: {
      administrative: {
        description: "File complaint with drug controller",
        timeline: "14-30 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for drug violations",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      regulatory: {
        description: "File complaint with pharmaceutical company",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      },
      criminal: {
        description: "File criminal case for drug violations",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      }
    },
    rural_healthcare: {
      administrative: {
        description: "File complaint with rural health authorities",
        timeline: "14-30 days",
        success: 65,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for healthcare violations",
        timeline: "60-120 days",
        success: 60,
        cost: "Medium",
        effort: "Medium"
      },
      regulatory: {
        description: "Seek intervention from State Health Authority",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      },
      constitutional: {
        description: "File writ petition under Article 21",
        timeline: "90-180 days",
        success: 70,
        cost: "High",
        effort: "High"
      }
    }
  }

  return options[rightsType as keyof typeof options] || options.emergency_care
}

function createActionPlan(rightsType: string, urgency: string, location: string) {
  const plans = {
    emergency_care: {
      immediate: [
        "Ensure immediate medical attention",
        "Contact emergency services (108)",
        "Document all medical incidents",
        "Preserve medical records and evidence",
        "Contact family members if needed"
      ],
      short: [
        "Follow up on medical treatment",
        "Monitor patient recovery",
        "Document improvements or complications",
        "Seek second opinion if needed"
      ],
      long: [
        "Maintain health monitoring",
        "Follow up on legal proceedings",
        "Update medical records",
        "Educate about healthcare rights"
      ]
    },
    medical_negligence: {
      immediate: [
        "Document all negligence details",
        "Seek alternative medical care",
        "Preserve all evidence",
        "Contact medical legal experts",
        "Report to hospital administration"
      ],
      short: [
        "Follow up on complaint investigation",
        "Monitor legal proceedings",
        "Document medical improvements",
        "Seek additional medical care if needed"
      ],
      long: [
        "Monitor ongoing medical care",
        "Follow up on legal resolution",
        "Update medical documentation",
        "Educate about patient rights"
      ]
    },
    patient_rights: {
      immediate: [
        "Document rights violations",
        "Request copy of medical records",
        "Seek second opinion if needed",
        "Contact hospital patient relations",
        "Preserve all communication evidence"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor healthcare improvements",
        "Document changes in hospital policies",
        "Seek alternative care if needed"
      ],
      long: [
        "Maintain healthcare monitoring",
        "Follow up on legal proceedings",
        "Update medical documentation",
        "Educate about patient rights"
      ]
    },
    insurance_rights: {
      immediate: [
        "Document insurance claim issues",
        "Review insurance policy terms",
        "Contact insurance company",
        "Preserve all communication evidence",
        "Seek legal advice"
      ],
      short: [
        "Follow up on insurance claim",
        "Monitor claim processing",
        "Document claim resolution",
        "Seek alternative coverage if needed"
      ],
      long: [
        "Monitor insurance coverage",
        "Follow up on legal proceedings",
        "Update insurance documentation",
        "Educate about insurance rights"
      ]
    },
    public_health: {
      immediate: [
        "Document public health violations",
        "Report to local health authorities",
        "Seek preventive measures",
        "Preserve evidence of violations",
        "Contact community health organizations"
      ],
      short: [
        "Follow up on health interventions",
        "Monitor public health improvements",
        "Document health outcomes",
        "Seek additional resources if needed"
      ],
      long: [
        "Monitor public health trends",
        "Follow up on policy implementations",
        "Update health documentation",
        "Educate about public health"
      ]
    },
    mental_health: {
      immediate: [
        "Ensure immediate mental health support",
        "Contact mental health helplines",
        "Document mental healthcare violations",
        "Seek crisis intervention if needed",
        "Preserve all communication evidence"
      ],
      short: [
        "Follow up on mental health treatment",
        "Monitor patient progress",
        "Document improvements",
        "Seek additional support if needed"
      ],
      long: [
        "Maintain mental health monitoring",
        "Follow up on legal proceedings",
        "Update mental health documentation",
        "Educate about mental health"
      ]
    },
    pharmaceutical_rights: {
      immediate: [
        "Document pharmaceutical violations",
        "Report to drug authorities",
        "Seek immediate medical attention",
        "Preserve medication evidence",
        "Contact consumer protection agencies"
      ],
      short: [
        "Follow up on regulatory action",
        "Monitor patient safety",
        "Document improvements",
        "Seek alternative medications if needed"
      ],
      long: [
        "Monitor pharmaceutical safety",
        "Follow up on legal proceedings",
        "Update medication documentation",
        "Educate about pharmaceutical rights"
      ]
    },
    rural_healthcare: {
      immediate: [
        "Document rural healthcare gaps",
        "Contact local health centers",
        "Seek immediate medical attention",
        "Preserve evidence of healthcare gaps",
        "Contact community health workers"
      ],
      short: [
        "Follow up on healthcare improvements",
        "Monitor rural health outcomes",
        "Document changes in healthcare access",
        "Seek additional resources if needed"
      ],
      long: [
        "Monitor rural healthcare trends",
        "Follow up on policy implementations",
        "Update healthcare documentation",
        "Educate about rural healthcare"
      ]
    }
  }

  return plans[rightsType as keyof typeof plans] || plans.emergency_care
}

function getHealthcareTimeline(rightsType: string, urgency: string) {
  const baseTimelines = {
    emergency_care: {
      "emergency": "0-2 hours",
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    medical_negligence: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "60-120 days",
      "legal_proceedings": "90-180 days"
    },
    patient_rights: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    insurance_rights: {
      "claim": "7-14 days",
      "complaint": "14-30 days",
      "investigation": "30-60 days",
      "resolution": "60-120 days"
    },
    public_health: {
      "reporting": "1-3 days",
      "investigation": "7-14 days",
      "action": "14-30 days",
      "resolution": "30-60 days"
    },
    mental_health: {
      "crisis": "0-2 hours",
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    pharmaceutical_rights: {
      "adverse_reaction": "0-1 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    rural_healthcare: {
      "documentation": "3-7 days",
      "complaint": "14-30 days",
      "investigation": "30-60 days",
      "resolution": "60-120 days"
    }
  }

  const urgencyMultiplier = {
    urgent: 0.5,
    priority: 0.75,
    normal: 1
  }

  const timeline = baseTimelines[rightsType as keyof typeof baseTimelines] || baseTimelines.emergency_care
  const multiplier = urgencyMultiplier[urgency as keyof typeof urgencyMultiplier] || 1

  return Object.keys(timeline).reduce((acc, key) => {
    const [start, end] = timeline[key as keyof typeof timeline].split('-')
    const startNum = parseInt(start) * multiplier
    const endNum = parseInt(end) * multiplier
    acc[key] = `${startNum}-${endNum} ${end.includes('day') ? 'days' : 'hours'}`
    return acc
  }, {} as any)
}

function getHealthcareChecklists(rightsType: string) {
  const checklists = {
    emergency_care: {
      pre: [
        "Know emergency medical procedures",
        "Keep emergency contacts handy",
        "Document medical history",
        "Know nearest emergency facilities",
        "Have first aid knowledge"
      ],
      during: [
        "Ensure patient safety first",
        "Call emergency services immediately",
        "Document all medical events",
        "Preserve all evidence",
        "Follow medical protocols"
      ],
      post: [
        "Monitor patient recovery",
        "Follow up on medical treatment",
        "Document improvements",
        "Seek additional care if needed",
        "Educate about emergency procedures"
      ]
    },
    medical_negligence: {
      pre: [
        "Know medical negligence laws",
        "Document all medical care",
        "Keep medical records organized",
        "Know patient rights",
        "Have legal contacts ready"
      ],
      during: [
        "Document negligence details",
        "Seek alternative medical care",
        "Preserve all evidence",
        "Report to authorities",
        "Contact legal experts"
      ],
      post: [
        "Monitor medical recovery",
        "Follow up on legal proceedings",
        "Document improvements",
        "Seek additional care if needed",
        "Educate about patient rights"
      ]
    },
    patient_rights: {
      pre: [
        "Know patient rights laws",
        "Document all medical care",
        "Keep medical records organized",
        "Know hospital procedures",
        "Have contacts ready"
      ],
      during: [
        "Document rights violations",
        "Request medical records",
        "Seek second opinion if needed",
        "Report to hospital administration",
        "Preserve evidence"
      ],
      post: [
        "Monitor healthcare quality",
        "Follow up on complaint resolution",
        "Document changes",
        "Seek alternative care if needed",
        "Educate about patient rights"
      ]
    },
    insurance_rights: {
      pre: [
        "Know insurance policy terms",
        "Document all medical expenses",
        "Keep insurance documents organized",
        "Know claim procedures",
        "Have contacts ready"
      ],
      during: [
        "Document claim issues",
        "Contact insurance company",
        "Preserve all evidence",
        "Seek legal advice",
        "Follow claim procedures"
      ],
      post: [
        "Monitor claim processing",
        "Follow up on claim resolution",
        "Document outcomes",
        "Seek alternative coverage if needed",
        "Educate about insurance rights"
      ]
    },
    public_health: {
      pre: [
        "Know public health laws",
        "Document health violations",
        "Know reporting procedures",
        "Have health contacts ready",
        "Educate about public health"
      ],
      during: [
        "Document health violations",
        "Report to health authorities",
        "Seek preventive measures",
        "Preserve evidence",
        "Contact health organizations"
      ],
      post: [
        "Monitor health improvements",
        "Follow up on interventions",
        "Document outcomes",
        "Seek additional resources if needed",
        "Educate about public health"
      ]
    },
    mental_health: {
      pre: [
        "Know mental health resources",
        "Document mental health history",
        "Keep crisis contacts handy",
        "Know warning signs",
        "Have support network ready"
      ],
      during: [
        "Ensure immediate safety",
        "Contact mental health services",
        "Document all incidents",
        "Preserve evidence",
        "Seek crisis intervention"
      ],
      post: [
        "Monitor mental health",
        "Follow up on treatment",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about mental health"
      ]
    },
    pharmaceutical_rights: {
      pre: [
        "Know pharmaceutical laws",
        "Document medication use",
        "Keep medication records",
        "Know adverse reactions",
        "Have pharmacy contacts ready"
      ],
      during: [
        "Document adverse reactions",
        "Report to drug authorities",
        "Seek medical attention",
        "Preserve evidence",
        "Contact poison control"
      ],
      post: [
        "Monitor medication safety",
        "Follow up on regulatory action",
        "Document improvements",
        "Seek alternatives if needed",
        "Educate about pharmaceutical rights"
      ]
    },
    rural_healthcare: {
      pre: [
        "Know rural healthcare resources",
        "Document healthcare access",
        "Keep local contacts handy",
        "Know emergency procedures",
        "Educate about rural health"
      ],
      during: [
        "Document healthcare gaps",
        "Contact local health centers",
        "Seek immediate care if needed",
        "Preserve evidence",
        "Contact community health workers"
      ],
      post: [
        "Monitor rural healthcare",
        "Follow up on improvements",
        "Document changes",
        "Seek additional resources if needed",
        "Educate about rural healthcare"
      ]
    }
  }

  return checklists[rightsType as keyof typeof checklists] || checklists.emergency_care
}

function getHealthcareTemplates(language: string = 'en') {
  return [
    {
      id: 1,
      title: "Emergency Medical Complaint",
      type: "emergency_care",
      template: `To,
The Medical Superintendent
[Hospital Name]
[Hospital Address]
[City]
[Pincode]
[Date]

Subject: Complaint Regarding Emergency Medical Care

Dear Sir/Madam,

I, [Your Name], hereby file a complaint regarding emergency medical care provided at [Hospital Name].

Incident Details:
- Date of Incident: [Date]
- Time of Incident: [Time]
- Place of Incident: [Place]
- Nature of Emergency: [Nature]
- Medical Staff Involved: [Staff Names]
- Treatment Provided: [Treatment Details]
- Outcome: [Outcome]
- Witnesses: [Witness Names]

Legal Provisions:
This complaint is filed under the Clinical Establishments Act, 1987 and Article 21 of the Constitution which guarantees the right to emergency medical care.

Prayer:
I request you to:
1. Investigate the emergency medical care provided
2. Take appropriate action against negligence
3. Ensure compliance with emergency care standards
4. Provide compensation for damages if applicable
5. Implement measures to prevent future incidents

I am available for further investigation and can provide additional information as required.

Thank you.

Yours faithfully,
[Your Name]
[Phone Number]
[Email]
[Date]`,
      fields: ["Name", "Hospital Name", "Date", "Time", "Place", "Nature", "Staff Names"]
    },
    {
      id: 2,
      title: "Medical Negligence Complaint",
      type: "medical_negligence",
      template: `To,
The Medical Council of India
[MCI Office Address]
[City]
[Pincode]
[Date]

Subject: Complaint Regarding Medical Negligence

Dear Sir/Madam,

I, [Your Name], hereby file a complaint regarding medical negligence by [Doctor's Name] at [Hospital Name].

Negligence Details:
- Date of Treatment: [Date]
- Nature of Treatment: [Treatment Type]
- Standard of Care Breach: [Details]
- Harm Caused: [Harm Details]
- Medical Records: [Records Available]
- Witnesses: [Witness Names]

Legal Provisions:
This complaint is filed under the Medical Council of India regulations and Article 21 of the Constitution which guarantees the right to proper medical care.

Prayer:
I request you to:
1. Investigate the medical negligence thoroughly
2. Take disciplinary action against the doctor
3. Ensure compliance with medical standards
4. Provide compensation for damages
5. Implement measures to prevent future negligence

I am available for further investigation and can provide additional information as required.

Thank you.

Yours faithfully,
[Your Name]
[Phone Number]
[Email]
[Date]`,
      fields: ["Name", "Doctor Name", "Hospital Name", "Date", "Treatment Type", "Harm Details"]
    }
  ]
}

function getHealthcareContacts(location: string) {
  const baseContacts = {
    national: [
      { name: "National Health Authority", phone: "011-2338225", type: "national" },
      { name: "Ministry of Health", phone: "011-2338225", type: "ministry" },
      { name: "Emergency Services", phone: "108", type: "emergency" }
    ],
    state: [
      { name: "State Health Authority", phone: "011-2338225", type: "state" },
      { name: "State Health Department", phone: "011-2338225", type: "department" },
      { name: "District Health Office", phone: "011-2338225", type: "district" }
    ],
    emergency: [
      { name: "Emergency Services", phone: "108", type: "emergency" },
      { name: "Ambulance Services", phone: "102", type: "ambulance" },
      { name: "Crisis Helpline", phone: "9152987825", type: "crisis" }
    ]
  }

  return baseContacts.national
}

function getHealthcareStatistics() {
  return {
    totalComplaints: 300000,
    successRate: 68,
    averageResolutionTime: 45, // days
    emergencyCases: 50000,
    negligenceCases: 25000,
    patientRightsCases: 20000,
    insuranceClaims: 15000,
    publicHealthIssues: 10000,
    lastUpdated: new Date().toISOString()
  }
}

function getHealthcareIssueTypes() {
  return [
    {
      id: "emergency_care",
      name: "Emergency Medical Care",
      description: "Emergency medical treatment and urgent healthcare services",
      category: "emergency",
      urgency: "urgent",
      constitutional: ["Article 21", "Article 14"],
      legal: ["Clinical Establishments Act", "Emergency Medical Services"],
      timeline: "0-2 hours"
    },
    {
      id: "medical_negligence",
      name: "Medical Negligence",
      description: "Protection against medical negligence and malpractice",
      category: "legal",
      urgency: "high",
      constitutional: ["Article 21", "Article 14"],
      legal: ["Medical Council Act", "Clinical Establishments Act"],
      timeline: "60-120 days"
    },
    {
      id: "patient_rights",
      name: "Patient Rights",
      description: "Protection of patient rights and dignity in healthcare",
      category: "rights",
      urgency: "medium",
      constitutional: ["Article 21", "Article 14"],
      legal: ["Clinical Establishments Act", "Patient Rights Act"],
      timeline: "30-60 days"
    },
    {
      id: "insurance_rights",
      name: "Health Insurance Rights",
      description: "Protection of health insurance policyholders and claim rights",
      category: "insurance",
      urgency: "medium",
      constitutional: ["Article 21", "Article 14"],
      legal: ["Insurance Act", "IRDAI Regulations"],
      timeline: "14-30 days"
    },
    {
      id: "public_health",
      name: "Public Health Protection",
      description: "Protection of public health and prevention of diseases",
      category: "public",
      urgency: "medium",
      constitutional: ["Article 21", "Article 47"],
      legal: ["Public Health Act", "Epidemic Diseases Act"],
      timeline: "30-60 days"
    },
    {
      id: "mental_health",
      name: "Mental Healthcare",
      description: "Mental health services and psychological support",
      category: "mental",
      urgency: "high",
      constitutional: ["Article 21", "Article 14"],
      legal: ["Mental Healthcare Act", "Psychiatric Services"],
      timeline: "0-2 hours"
    },
    {
      id: "pharmaceutical_rights",
      name: "Pharmaceutical Rights",
      description: "Protection of pharmaceutical rights and drug safety",
      category: "pharmaceutical",
      urgency: "medium",
      constitutional: ["Article 21", "Article 47"],
      legal: ["Drugs and Cosmetics Act", "Pharmacy Act"],
      timeline: "7-14 days"
    },
    {
      id: "rural_healthcare",
      name: "Rural Healthcare",
      description: "Healthcare services in rural and remote areas",
      category: "rural",
      urgency: "medium",
      constitutional: ["Article 21", "Article 14"],
      legal: ["National Rural Health Mission", "Clinical Establishments Act"],
      timeline: "60-120 days"
    }
  ]
}

function getRecentCases(language: string = 'en') {
  return [
    {
      id: 1,
      type: "emergency_care",
      title: "Emergency Care Success",
      description: "Successfully provided emergency medical care in critical condition",
      outcome: "success",
      timeline: "2 hours",
      date: "2023-12-20",
      location: "Delhi",
      constitutional: "Article 21"
    },
    {
      id: 2,
      type: "medical_negligence",
      title: "Negligence Case Resolved",
      description: "Successfully resolved medical negligence case with compensation",
      outcome: "success",
      timeline: "90 days",
      date: "2023-12-18",
      location: "Mumbai",
      constitutional: "Article 21"
    },
    {
      id: 3,
      type: "patient_rights",
      title: "Patient Rights Protected",
      description: "Successfully protected patient rights and improved hospital policies",
      outcome: "success",
      timeline: "45 days",
      date: "2023-12-15",
      location: "Bangalore",
      constitutional: "Article 21"
    }
  ]
}

function getHealthcareConstitutionalBasis() {
  return {
    primary: {
      article: "Article 21",
      title: "Right to health and medical care",
      description: "Right to emergency medical care and proper health services",
      applications: ["all_healthcare"]
    },
    secondary: {
      article: "Article 47",
      title: "Duty of state to raise nutrition level",
      description: "State responsibility to improve public health and nutrition",
      applications: ["public_health", "rural_healthcare"]
    },
    landmark: {
      case: "Paschim Bangal v. State of West Bengal (2017)",
      title: "Right to Health",
      description: "Supreme Court recognized right to health as fundamental right",
      applications: ["all_healthcare"]
    },
    legislation: {
      act: "Clinical Establishments Act, 1987",
      title: "Clinical Establishments Regulation",
      description: "Regulates clinical establishments and healthcare standards",
      applications: ["all_healthcare"]
    },
    act: "Mental Healthcare Act, 2017",
      title: "Mental Healthcare Services",
      description: "Provides for mental healthcare services and patient rights",
      applications: ["mental_health"]
    }
  }
}

function getHealthcareLaws() {
  return [
    {
      name: "Clinical Establishments Act, 1987",
      description: "Regulates clinical establishments and healthcare standards",
      year: 1987,
      provisions: ["standards", "rights", "regulation"],
      applications: ["all_healthcare"]
    },
    {
      name: "Mental Healthcare Act, 2017",
      description: "Provides for mental healthcare services and patient rights",
      year: 2017,
      provisions: ["mental_health", "rights", "services"],
      applications: ["mental_health"]
    },
    {
      name: "Drugs and Cosmetics Act, 1940",
      description: "Regulates pharmaceuticals and cosmetic products",
      year: 1940,
      provisions: ["pharmaceutical", "safety", "regulation"],
      applications: ["pharmaceutical_rights"]
    },
    {
      name: "Insurance Act, 1938",
      description: "Regulates insurance business and protects policyholders",
      year: 1938,
      provisions: ["insurance", "rights", "regulation"],
      applications: ["insurance_rights"]
    },
    {
      name: "Public Health Act, 1981",
      description: "Prevents spread of communicable diseases",
      year: 1981,
      provisions: ["public_health", "prevention", "regulation"],
      applications: ["public_health"]
    },
    {
      name: "National Rural Health Mission, 2005",
      description: "Provides healthcare services in rural areas",
      year: 2005,
      provisions: ["rural_healthcare", "services", "infrastructure"],
      applications: ["rural_healthcare"]
    }
  ]
}

function getGovernmentHealthSchemes() {
  return [
    {
      name: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana",
      url: "https://www.pmjay.gov.in",
      description: "National Health Protection Scheme",
      services: ["health_insurance", "hospitalization", "cashless"],
      contact: "1800-11-2247",
      coverage: "National"
    },
    {
      name: "National Mental Health Programme",
      url: "https://www.nmhp.gov.in",
      description: "National mental health services and awareness",
      services: ["mental_health", "awareness", "treatment"],
      contact: "011-2338225",
      coverage: "National"
    },
    {
      name: "National Rural Health Mission",
      url: "https://www.nhm.gov.in",
      description: "Rural healthcare services and infrastructure",
      services: ["rural_healthcare", "infrastructure", "training"],
      contact: "011-2338225",
      coverage: "National"
    },
    {
      name: "Reproductive and Child Health",
      url: "https://rch.gov.in",
      description: "Maternal and child health services",
      services: ["maternal_health", "child_health", "family_planning"],
      contact: "011-2338225",
      coverage: "National"
    },
    {
      name: "National TB Elimination Programme",
      url: "https://tbcindia.gov.in",
      description: "Tuberculosis control and elimination services",
      services: ["treatment", "prevention", "awareness"],
      contact: "011-2338225",
      coverage: "National"
    }
  ]
}