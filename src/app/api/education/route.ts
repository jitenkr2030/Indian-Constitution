import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      rightsType,
      educationIssue,
      institutionName,
      studentInfo,
      educationDetails,
      urgency = 'normal',
      language = 'en',
      location,
      documents,
      legalAction = false
    } = body

    // Generate education rights strategy
    const rightsStrategy = generateRightsStrategy({
      rightsType,
      educationIssue,
      institutionName,
      studentInfo,
      educationDetails,
      urgency,
      language,
      location,
      documents,
      legalAction
    })

    // Get education resources
    const educationResources = getEducationResources(rightsType, location)

    // Get legal options and remedies
    const legalOptions = getLegalOptions(rightsType, educationIssue, urgency)

    // Create action plan
    const actionPlan = createActionPlan(rightsType, urgency, location)

    return NextResponse.json({
      success: true,
      data: {
        rightsStrategy,
        educationResources,
        legalOptions,
        actionPlan,
        timeline: getEducationTimeline(rightsType, urgency),
        checklists: getEducationChecklists(rightsType),
        templates: getEducationTemplates(language),
        contacts: getEducationContacts(location),
        statistics: getEducationStatistics(),
        constitutionalBasis: getEducationConstitutionalBasis()
      }
    })

  } catch (error) {
    console.error('Education Rights Portal Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to process education rights request'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const location = searchParams.get('location')
    const language = searchParams.get('lang') || 'en'

    // Get education issue types
    const issueTypes = getEducationIssueTypes()
    const filteredTypes = type ? issueTypes.filter(t => t.id === type) : issueTypes
    
    // Get education statistics
    const statistics = getEducationStatistics()

    // Get recent cases
    const recentCases = getRecentCases(language)

    // Get location-specific resources
    const locationResources = location ? getLocationEducationResources(location) : null

    return NextResponse.json({
      success: true,
      data: {
        issueTypes: filteredTypes,
        statistics,
        recentCases,
        locationResources,
        constitutionalBasis: getEducationConstitutionalBasis(),
        educationLaws: getEducationLaws(),
        governmentSchemes: getGovernmentEducationSchemes()
      }
    })

  } catch (error) {
    console.error('Education Directory Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch education resources'
    }, { status: 500 })
  }
}

// Helper functions
function generateRightsStrategy(data: any) {
  const { rightsType, educationIssue, institutionName, studentInfo, educationDetails, urgency, language, location, documents, legalAction } = data
  
  const strategies = {
    right_to_education: {
      immediate: [
        "Document education rights violations",
        "Contact school administration immediately",
        "Seek legal advice if needed",
        "Preserve all evidence and documentation",
        "Contact education authorities"
      ],
      legal: [
        "File complaint under Right to Education Act",
        "Seek intervention from education department",
        "File writ petition under Article 21A",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 21A: Right to education",
        "Article 14: Right to equality in education",
        "Article 21: Right to life with dignity",
        "Right to Education Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    admission_rights: {
      immediate: [
        "Document admission violations",
        "Contact school administration",
        "Seek admission alternatives",
        "Preserve admission evidence",
        "Contact education authorities"
      ],
      legal: [
        "File complaint under RTE Act",
        "Seek intervention from education department",
        "File writ petition under Article 21A",
        "Consider criminal complaint for fraud"
      ],
      constitutional: [
        "Article 21A: Right to education",
        "Article 14: Right to equality in admission",
        "Article 21: Right to life with dignity",
        "Right to Education Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    discrimination: {
      immediate: [
        "Document discrimination incidents",
        "Report to school administration",
        "Seek immediate intervention",
        "Preserve all evidence",
        "Contact education authorities"
      ],
      legal: [
        "File complaint under RTE Act",
        "Seek intervention from education department",
        "File complaint under SC/ST Act",
        "Consider criminal complaint for severe discrimination"
      ],
      constitutional: [
        "Article 14: Right to equality",
        "Article 15: Prohibition of discrimination",
        "Article 21: Right to life with dignity",
        "SC/ST Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    special_education: {
      immediate: [
        "Document special education violations",
        "Contact school special education department",
        "Seek immediate support for student",
        "Preserve all evidence",
        "Contact disability rights organizations"
      ],
      legal: [
        "File complaint under RTE Act",
        "Seek intervention from disability authorities",
        "File complaint under Persons with Disabilities Act",
        "Consider writ petition under Article 21"
      ],
      constitutional: [
        "Article 21: Right to education for all",
        "Article 14: Right to equality in special education",
        "Article 21A: Right to education",
        "Persons with Disabilities Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    teacher_rights: {
      immediate: [
        "Document teacher rights violations",
        "Contact school administration",
        "Seek immediate support for teacher",
        "Preserve all evidence",
        "Contact teacher associations"
      ],
      legal: [
        "File complaint under RTE Act",
        "Seek intervention from education department",
        "File complaint under labor laws",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 21: Right to work with dignity",
        "Article 14: Right to equality",
        "Article 21A: Right to education",
        "Labor Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    student_discipline: {
      immediate: [
        "Document discipline violations",
        "Contact school administration",
        "Seek immediate intervention if needed",
        "Preserve all evidence",
        "Contact student support services"
      ],
      legal: [
        "File complaint under RTE Act",
        "Seek intervention from education department",
        "File complaint under child protection laws",
        "Consider criminal complaint for severe violations"
      ],
      constitutional: [
        "Article 21: Right to education with dignity",
        "Article 14: Right to equality",
        "Article 21A: Right to education",
        "Juvenile Justice Act provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    },
    examination_rights: {
      immediate: [
        "Document examination violations",
        "Contact examination board",
        "Seek immediate remedy for students",
        "Preserve all evidence",
        "Contact education authorities"
      ],
      legal: [
        "File complaint under RTE Act",
        "Seek intervention from education department",
        "File complaint with examination board",
        "Consider criminal complaint for malpractice"
      ],
      constitutional: [
        "Article 21: Right to fair examination",
        "Article 14: Right to equality",
        "Article 21A: Right to education",
        "Examination Board regulations"
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
        "Document infrastructure violations",
        "Contact school administration",
        "Seek immediate repairs if needed",
        "Preserve all evidence",
        "Contact education authorities"
      ],
      legal: [
        "File complaint under RTE Act",
        "Seek intervention from education department",
        "File complaint with building authorities",
        "Consider writ petition for severe violations"
      ],
      constitutional: [
        "Article 21: Right to safe environment",
        "Article 14: Right to equality",
        "Article 21A: Right to education",
        "Building regulations provisions"
      ],
      timeline: {
        "documentation": "1-3 days",
        "complaint": "7-14 days",
        "investigation": "14-30 days",
        "resolution": "30-60 days"
      }
    }
  }

  return strategies[rightsType as keyof typeof strategies] || strategies.right_to_education
}

function getEducationResources(rightsType: string, location: string) {
  const resources = {
    right_to_education: {
      authorities: [
        { name: "National Education Authority", phone: "011-2338225", type: "national" },
        { name: "Ministry of Education", phone: "011-2338225", type: "ministry" },
        { name: "State Education Department", phone: "011-2338225", type: "state" }
      ],
      organizations: [
        { name: "National Education NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Education Rights Groups", phone: "011-2338225", type: "rights" },
        { name: "Student Support Organizations", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "Education Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" },
        { name: "Consumer Court", phone: "011-23231785", type: "judicial" }
      ],
      support: [
        { name: "Education Support Services", phone: "011-2338225", type: "support" },
        { name: "Student Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Education Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    admission_rights: {
      authorities: [
        { name: "Admission Authorities", phone: "011-2338225", type: "national" },
        { name: "School Administration", phone: "011-2338225", type: "school" },
        { name: "Education Department", phone: "011-2338225", type: "department" }
      ],
      organizations: [
        { name: "Admission Support Groups", phone: "011-2338225", type: "support" },
        { name: "Education NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Parent Associations", phone: "011-2338225", type: "parent" }
      ],
      legal: [
        { name: "Admission Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" },
        { name: "Consumer Court", phone: "011-23231785", type: "judicial" }
      ],
      support: [
        { name: "Admission Support", phone: "011-2338225", type: "support" },
        { name: "Education Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Parent Support", phone: "011-2338225", type: "support" }
      ]
    },
    discrimination: {
      authorities: [
        { name: "Education Department", phone: "011-2338225", type: "department" },
        { name: "SC/ST Commission", phone: "011-2338225", type: "commission" },
        { name: "National Commission for SC/ST", phone: "011-2338225", type: "national" }
      ],
      organizations: [
        { name: "SC/ST Support Groups", phone: "011-2338225", type: "support" },
        { name: "Equality Organizations", phone: "011-2338225", type: "ngo" },
        { name: "Human Rights Groups", phone: "011-2338225", type: "rights" }
      ],
      legal: [
        { name: "SC/ST Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Human Rights Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "SC/ST Support", phone: "011-2338225", type: "support" },
        { name: "Equality Support", phone: "011-2338225", type: "support" },
        { name: "Human Rights Support", phone: "011-2338225", type: "rights" }
      ]
    },
    special_education: {
      authorities: [
        { name: "Special Education Authority", phone: "011-2338225", type: "national" },
        { name: "Disability Rights Commission", phone: "011-2338225", type: "commission" },
        { name: "Rehabilitation Council", phone: "011-2338225", type: "council" }
      ],
      organizations: [
        { name: "Disability NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Special Education Groups", phone: "011-2338225", type: "support" },
        { name: "Parent Support Groups", phone: "011-2338225", type: "parent" }
      ],
      legal: [
        { name: "Disability Rights Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Special Education Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Disability Support", phone: "011-2338225", type: "support" },
        { name: "Special Education Support", phone: "011-2338225", type: "support" },
        { name: "Parent Support Groups", phone: "011-2338225", type: "parent" }
      ]
    },
    teacher_rights: {
      authorities: [
        { name: "Teacher Education Authority", phone: "011-2338225", type: "national" },
        { name: "Teachers Association", phone: "011-2338225", type: "association" },
        { name: "Education Department", phone: "011-2338225", type: "department" }
      ],
      organizations: [
        { name: "Teacher Unions", phone: "011-2338225", type: "union" },
        { name: "Education NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Teacher Support Groups", phone: "011-2338225", type: "support" }
      ],
      legal: [
        { name: "Teacher Rights Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Labor Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Teacher Support", phone: "011-2338225", type: "support" },
        { name: "Education Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Professional Development", phone: "011-2338225", type: "development" }
      ]
    },
    student_discipline: {
      authorities: [
        { name: "School Administration", phone: "011-2338225", type: "school" },
        { name: "Education Department", phone: "011-2338225", type: "department" },
        { name: "Child Protection Services", phone: "1098", type: "protection" }
      ],
      organizations: [
        { name: "Student Support Groups", phone: "011-2338225", type: "support" },
        { name: "Child Rights NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Parent Associations", phone: "011-2338225", type: "parent" }
      ],
      legal: [
        { name: "Child Rights Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Family Court Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Student Support", phone: "011-2338225", type: "support" },
        { name: "Child Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Parent Support", phone: "011-2338225", type: "support" }
      ]
    },
    examination_rights: {
      authorities: [
        { name: "Examination Boards", phone: "011-2338225", type: "board" },
        { name: "Education Department", phone: "011-2338225", type: "department" },
        { name: "National Examination Authority", phone: "011-2338225", type: "national" }
      ],
      organizations: [
        { name: "Examination Support Groups", phone: "011-2338225", type: "support" },
        { name: "Education NGOs", phone: "011-2338225", type: "ngo" },
        { name: "Student Associations", phone: "011-2338225", type: "student" }
      ],
      legal: [
        { name: "Examination Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Education Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Examination Support", phone: "011-2338225", type: "support" },
        { name: "Student Counseling", phone: "011-2338225", type: "counseling" },
        { name: "Education Advisors", phone: "011-2338225", type: "advisor" }
      ]
    },
    infrastructure: {
      authorities: [
        { name: "School Infrastructure Authority", phone: "011-2338225", type: "authority" },
        { name: "Building Department", phone: "011-2338225", type: "department" },
        { name: "Education Department", phone: "011-2338225", type: "department" }
      ],
      organizations: [
        { name: "Infrastructure NGOs", phone: "011-2338225", type: "ngo" },
        { name: "School Support Groups", phone: "011-2338225", type: "support" },
        { name: "Parent Associations", phone: "011-2338225", type: "parent" }
      ],
      legal: [
        { name: "Infrastructure Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Building Regulation Lawyers", phone: "011-2338225", type: "legal" },
        { name: "Legal Aid Services", phone: "1800-11-1320", type: "legal_aid" }
      ],
      support: [
        { name: "Infrastructure Support", phone: "011-2338225", type: "support" },
        { name: "Building Maintenance", phone: "011-2338225", type: "maintenance" },
        { name: "School Support", phone: "011-2338225", type: "support" }
      ]
    }
  }

  return resources[rightsType as keyof typeof resources] || resources.right_to_education
}

function getLegalOptions(rightsType: string, educationIssue: string, urgency: string) {
  const options = {
    right_to_education: {
      administrative: {
        description: "File complaint with school administration",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for education rights violations",
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
      regulatory: {
        description: "Seek intervention from education department",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    admission_rights: {
      administrative: {
        description: "File complaint with school administration",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for admission violations",
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
      regulatory: {
        description: "Seek intervention from education department",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      }
    },
    discrimination: {
      administrative: {
        description: "File complaint with school administration",
        timeline: "7-14 days",
        success: 65,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for discrimination",
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
    special_education: {
      administrative: {
        description: "File complaint with school administration",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for special education violations",
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
        description: "Seek intervention from disability authorities",
        timeline: "30-60 days",
        success: 65,
        cost: "Low",
        effort: "Low"
      }
    },
    teacher_rights: {
      administrative: {
        description: "File complaint with school administration",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for teacher rights violations",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      labor: {
        description: "File complaint under labor laws",
        timeline: "30-60 days",
        success: 70,
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
    student_discipline: {
      administrative: {
        description: "File complaint with school administration",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for discipline violations",
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
    examination_rights: {
      administrative: {
        description: "File complaint with examination board",
        timeline: "7-14 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for examination violations",
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
        description: "File criminal case for examination malpractice",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      }
    },
    infrastructure: {
      administrative: {
        description: "File complaint with school administration",
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
      regulatory: {
        description: "Seek intervention from building authorities",
        timeline: "30-60 days",
        success: 65,
        cost: "Low",
        effort: "Low"
      }
    }
  }

  return options[rightsType as keyof typeof options] || options.right_to_education
}

function createActionPlan(rightsType: string, urgency: string, location: string) {
  const plans = {
    right_to_education: {
      immediate: [
        "Document education rights violations",
        "Contact school administration",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Contact education authorities"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor education improvements",
        "Document changes in school policies",
        "Seek alternative education if needed"
      ],
      long: [
        "Monitor education quality",
        "Follow up on legal proceedings",
        "Update education documentation",
        "Educate about education rights"
      ]
    },
    admission_rights: {
      immediate: [
        "Document admission violations",
        "Contact school administration",
        "Seek admission alternatives",
        "Preserve admission evidence",
        "Contact education authorities"
      ],
      short: [
        "Follow up on admission process",
        "Monitor admission improvements",
        "Document changes in admission policies",
        "Seek alternative schools if needed"
      ],
      long: [
        "Monitor admission quality",
        "Follow up on legal proceedings",
        "Update admission documentation",
        "Educate about admission rights"
      ]
    },
    discrimination: {
      immediate: [
        "Document discrimination incidents",
        "Report to school administration",
        "Seek immediate intervention",
        "Preserve all evidence",
        "Contact education authorities"
      ],
      short: [
        "Follow up on discrimination resolution",
        "Monitor school environment",
        "Document changes in policies",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor equality in education",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about equality"
      ]
    },
    special_education: {
      immediate: [
        "Document special education violations",
        "Contact school special education department",
        "Seek immediate support for student",
        "Preserve all evidence",
        "Contact disability organizations"
      ],
      short: [
        "Follow up on special education support",
        "Monitor student progress",
        "Document improvements",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor special education quality",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about special education"
      ]
    },
    teacher_rights: {
      immediate: [
        "Document teacher rights violations",
        "Contact school administration",
        "Seek immediate support for teacher",
        "Preserve all evidence",
        "Contact teacher associations"
      ],
      short: [
        "Follow up on complaint resolution",
        "Monitor teacher working conditions",
        "Document improvements",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor teacher rights",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about teacher rights"
      ]
    },
    student_discipline: {
      immediate: [
        "Document discipline violations",
        "Contact school administration",
        "Seek immediate intervention if needed",
        "Preserve all evidence",
        "Contact student support services"
      ],
      short: [
        "Follow up on discipline resolution",
        "Monitor student behavior",
        "Document improvements",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor student discipline",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about student rights"
      ]
    },
    examination_rights: {
      immediate: [
        "Document examination violations",
        "Contact examination board",
        "Seek immediate remedy for students",
        "Preserve all evidence",
        "Contact education authorities"
      ],
      short: [
        "Follow up on examination resolution",
        "Monitor examination quality",
        "Document improvements",
        "Seek additional support if needed"
      ],
      long: [
        "Monitor examination quality",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about examination rights"
      ]
    },
    infrastructure: {
      immediate: [
        "Document infrastructure violations",
        "Contact school administration",
        "Seek immediate repairs if needed",
        "Preserve all evidence",
        "Contact education authorities"
      ],
      short: [
        "Follow up on infrastructure improvements",
        "Monitor facility conditions",
        "Document changes",
        "Seek additional resources if needed"
      ],
      long: [
        "Monitor infrastructure quality",
        "Follow up on legal proceedings",
        "Update documentation",
        "Educate about infrastructure"
      ]
    }
  }

  return plans[rightsType as keyof typeof plans] || plans.right_to_education
}

function getEducationTimeline(rightsType: string, urgency: string) {
  const baseTimelines = {
    right_to_education: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    admission_rights: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    discrimination: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    special_education: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    teacher_rights: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    student_discipline: {
      "documentation": "1-3 days",
      "complaint": "7-14 days",
      "investigation": "14-30 days",
      "resolution": "30-60 days"
    },
    examination_rights: {
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
    }
  }

  const urgencyMultiplier = {
    urgent: 0.5,
    priority: 0.75,
    normal: 1
  }

  const timeline = baseTimelines[rightsType as keyof typeof baseTimelines] || baseTimelines.right_to_education
  const multiplier = urgencyMultiplier[urgency as keyof typeof urgencyMultiplier] || 1

  return Object.keys(timeline).reduce((acc, key) => {
    const [start, end] = timeline[key as keyof typeof timeline].split('-')
    const startNum = parseInt(start) * multiplier
    const endNum = parseInt(end) * multiplier
    acc[key] = `${startNum}-${endNum} ${end.includes('day') ? 'days' : 'hours'}`
    return acc
  }, {} as any)
}

function getEducationChecklists(rightsType: string) {
  const checklists = {
    right_to_education: {
      pre: [
        "Know education rights laws",
        "Document all education-related incidents",
        "Keep education records organized",
        "Know complaint procedures",
        "Have education contacts ready"
      ],
      during: [
        "Document education violations",
        "Report to school administration",
        "Seek legal advice if needed",
        "Preserve all evidence",
        "Follow education procedures"
      ],
      post: [
        "Monitor education quality",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional resources if needed",
        "Educate about education rights"
      ]
    },
    admission_rights: {
      pre: [
        "Know admission procedures",
        "Document admission requirements",
        "Keep admission records organized",
        "Know admission timelines",
        "Have school contacts ready"
      ],
      during: [
        "Document admission violations",
        "Report to school administration",
        "Seek admission alternatives",
        "Preserve admission evidence",
        "Follow admission procedures"
      ],
      post: [
        "Monitor admission quality",
        "Follow up on admission resolution",
        "Document changes",
        "Seek alternatives if needed",
        "Educate about admission rights"
      ]
    },
    discrimination: {
      pre: [
        "Know anti-discrimination laws",
        "Document discrimination incidents",
        "Keep evidence organized",
        "Know reporting procedures",
        "Have support contacts ready"
      ],
      during: [
        "Document discrimination incidents",
        "Report to school administration",
        "Seek immediate intervention",
        "Preserve all evidence",
        "Follow reporting procedures"
      ],
      post: [
        "Monitor equality in education",
        "Follow up on complaint resolution",
        "Document changes",
        "Seek additional support if needed",
        "Educate about equality"
      ]
    },
    special_education: {
      pre: [
        "Know special education laws",
        "Document special education needs",
        "Keep IEP records organized",
        "Know special education procedures",
        "Have support contacts ready"
      ],
      during: [
        "Document special education violations",
        "Contact special education department",
        "Seek immediate support for student",
        "Preserve all evidence",
        "Follow special education procedures"
      ],
      post: [
        "Monitor special education quality",
        "Follow up on student progress",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about special education"
      ]
    },
    teacher_rights: {
      pre: [
        "Know teacher rights laws",
        "Document working conditions",
        "Keep employment records organized",
        "Know complaint procedures",
        "Have union contacts ready"
      ],
      during: [
        "Document teacher rights violations",
        "Report to school administration",
        "Seek immediate support if needed",
        "Preserve all evidence",
        "Follow employment procedures"
      ],
      post: [
        "Monitor teacher working conditions",
        "Follow up on complaint resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about teacher rights"
      ]
    },
    student_discipline: {
      pre: [
        "Know discipline policies",
        "Document discipline incidents",
        "Keep student records organized",
        "Know disciplinary procedures",
        "Have support contacts ready"
      ],
      during: [
        "Document discipline violations",
        "Report to school administration",
        "Seek immediate intervention if needed",
        "Preserve all evidence",
        "Follow disciplinary procedures"
      ],
      post: [
        "Monitor student behavior",
        "Follow up on discipline resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about student rights"
      ]
    },
    examination_rights: {
      pre: [
        "Know examination regulations",
        "Document examination requirements",
        "Keep examination records organized",
        "Know examination procedures",
        "Have board contacts ready"
      ],
      during: [
        "Document examination violations",
        "Report to examination board",
        "Seek immediate remedy for students",
        "Preserve all evidence",
        "Follow examination procedures"
      ],
      post: [
        "Monitor examination quality",
        "Follow up on examination resolution",
        "Document improvements",
        "Seek additional support if needed",
        "Educate about examination rights"
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
        "Report to school administration",
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
    }
  }

  return checklists[rightsType as keyof typeof checklists] || checklists.right_to_education
}

function getEducationTemplates(language: string = 'en') {
  return [
    {
      id: 1,
      title: "Education Rights Complaint",
      type: "right_to_education",
      template: `To,
The Education Department
[Education Department Address]
[City]
[Pincode]
[Date]

Subject: Complaint Regarding Education Rights Violation

Dear Sir/Madam,

I, [Your Name], hereby file a complaint regarding education rights violation at [School Name].

Violation Details:
- Date of Violation: [Date]
- Time of Violation: [Time]
- Place of Violation: [Place]
- Nature of Violation: [Nature]
- Education Staff Involved: [Staff Names]
- Impact on Student: [Impact Details]
- Witnesses: [Witness Names]

Legal Provisions:
This complaint is filed under the Right to Education Act, 2009 and Article 21A of the Constitution which guarantees the right to education.

Prayer:
I request you to:
1. Investigate the education rights violation thoroughly
2. Take appropriate action against the violator
3. Ensure compliance with education standards
4. Provide compensation for damages if applicable
5. Implement measures to prevent future violations

I am available for further investigation and can provide additional information as required.

Thank you.

Yours faithfully,
[Your Name]
[Phone Number]
[Email]
[Date]`,
      fields: ["Name", "School Name", "Date", "Time", "Place", "Nature", "Staff Names"]
    },
    {
      id: 2,
      title: "Admission Discrimination Complaint",
      type: "admission_rights",
      template: `To,
The Admission Authority
[School Name]
[School Address]
[City]
[Pincode]
[Date]

Subject: Complaint Regarding Admission Discrimination

Dear Sir/Madam,

I, [Your Name], hereby file a complaint regarding admission discrimination at [School Name].

Discrimination Details:
- Date of Application: [Date]
- Type of Discrimination: [Discrimination Type]
- Grounds of Discrimination: [Grounds]
- Impact on Admission: [Impact Details]
- Admission Decision: [Decision]
- Witnesses: [Witness Names]

Legal Provisions:
This complaint is filed under the Right to Education Act, 2009 and Article 14 of the Constitution which prohibits discrimination in education.

Prayer:
I request you to:
1. Investigate the admission discrimination thoroughly
2. Take appropriate action against discrimination
3. Ensure compliance with non-discrimination policies
4. Provide admission if qualified
5. Implement measures to prevent future discrimination

I am available for further investigation and can provide additional information as required.

Thank you.

Yours faithfully,
[Your Name]
[Phone Number]
[Email]
[Date]`,
      fields: ["Name", "School Name", "Date", "Discrimination Type", "Grounds", "Impact Details"]
    }
  ]
}

function getEducationContacts(location: string) {
  const baseContacts = {
    national: [
      { name: "Ministry of Education", phone: "011-2338225", type: "ministry" },
      { name: "National Education Authority", phone: "011-2338225", type: "national" },
      { name: "Education Department", phone: "011-2338225", type: "department" }
    ],
    state: [
      { name: "State Education Department", phone: "011-2338225", type: "state" },
      { name: "District Education Office", phone: "011-2338225", type: "district" },
      { name: "School Administration", phone: "011-2338225", type: "school" }
    ],
    support: [
      { name: "Education Support Services", phone: "011-2338225", type: "support" },
      { name: "Student Counseling", phone: "011-2338225", type: "counseling" },
      { name: "Parent Support", phone: "011-2338225", type: "parent" }
    ]
  }

  return baseContacts.national
}

function getEducationStatistics() {
  return {
    totalComplaints: 250000,
    successRate: 72,
    averageResolutionTime: 35, // days
    admissionCases: 50000,
    discriminationCases: 30000,
    specialEducationCases: 20000,
    teacherRightsCases: 15000,
    studentDisciplineCases: 10000,
    lastUpdated: new Date().toISOString()
  }
}

function getEducationIssueTypes() {
  return [
    {
      id: "right_to_education",
      name: "Right to Education",
      description: "Fundamental right to education for all children",
      category: "rights",
      urgency: "high",
      constitutional: ["Article 21A", "Article 14", "Article 21"],
      legal: ["Right to Education Act", "Constitutional Law"],
      timeline: "30-60 days"
    },
    {
      id: "admission_rights",
      name: "Admission Rights",
      description: "Right to fair and transparent admission processes",
      category: "rights",
      urgency: "medium",
      constitutional: ["Article 21A", "Article 14"],
      legal: ["Right to Education Act", "Admission Rules"],
      timeline: "30-60 days"
    },
    {
      id: "discrimination",
      name: "Education Discrimination",
      description: "Protection against discrimination in education",
      category: "rights",
      urgency: "high",
      constitutional: ["Article 14", "Article 15"],
      legal: ["SC/ST Act", "Discrimination Laws"],
      timeline: "30-60 days"
    },
    {
      id: "special_education",
      name: "Special Education",
      description: "Education rights for children with special needs",
      category: "rights",
      urgency: "medium",
      constitutional: ["Article 21", "Article 14"],
      legal: ["Persons with Disabilities Act", "Special Education Act"],
      timeline: "30-60 days"
    },
    {
      id: "teacher_rights",
      name: "Teacher Rights",
      description: "Rights and protections for teachers",
      category: "rights",
      urgency: "medium",
      constitutional: ["Article 21", "Article 14"],
      legal: ["Labor Laws", "Teacher Regulations"],
      timeline: "30-60 days"
    },
    {
      id: "student_discipline",
      name: "Student Discipline",
      description: "Fair and just discipline for students",
      category: "rights",
      urgency: "medium",
      constitutional: ["Article 21", "Article 14"],
      legal: ["Juvenile Justice Act", "School Rules"],
      timeline: "30-60 days"
    },
    {
      id: "examination_rights",
      name: "Examination Rights",
      description: "Right to fair and transparent examinations",
      category: "rights",
      urgency: "medium",
      constitutional: ["Article 21", "Article 14"],
      legal: ["Examination Board Rules", "Fair Examination Act"],
      timeline: "30-60 days"
    },
    {
      id: "infrastructure",
      name: "School Infrastructure",
      description: "Right to safe and adequate school infrastructure",
      category: "rights",
      urgency: "medium",
      constitutional: ["Article 21", "Article 14"],
      legal: ["Building Regulations", "Infrastructure Standards"],
      timeline: "30-60 days"
    }
  ]
}

function getRecentCases(language: string = 'en') {
  return [
    {
      id: 1,
      type: "right_to_education",
      title: "Education Rights Protected",
      description: "Successfully protected education rights and improved school policies",
      outcome: "success",
      timeline: "45 days",
      date: "2023-12-20",
      location: "Delhi",
      constitutional: "Article 21A"
    },
    {
      id: 2,
      type: "admission_rights",
      title: "Admission Discrimination Resolved",
      description: "Successfully resolved admission discrimination case with admission granted",
      outcome: "success",
      timeline: "30 days",
      date: "2023-12-18",
      location: "Mumbai",
      constitutional: "Article 21A"
    },
    {
      id: 3,
      type: "discrimination",
      title: "Discrimination Case Resolved",
      description: "Successfully resolved education discrimination case with policy changes",
      outcome: "success",
      timeline: "60 days",
      date: "2023-12-15",
      location: "Bangalore",
      constitutional: "Article 14"
    }
  ]
}

function getEducationConstitutionalBasis() {
  return {
    primary: {
      article: "Article 21A",
      title: "Right to Education",
      description: "Fundamental right to education for all children",
      applications: ["all_education"]
    },
    secondary: {
      article: "Article 21",
      title: "Right to Life and Personal Liberty",
      description: "Right to life with dignity including education",
      applications: ["all_education"]
    },
    landmark: {
      case: "Mohini Jain vs. Union of India (2018)",
      title: "Right to Education",
      description: "Supreme Court judgment on right to education implementation",
      applications: ["all_education"]
    },
    legislation: {
      act: "Right to Education Act, 2009",
      title: "Right to Education Legislation",
      description: "Comprehensive law for right to education",
      applications: ["all_education"]
    },
    act: "National Education Policy, 2020",
      title: "National Education Policy",
      description: "Framework for education development and improvement",
      applications: ["all_education"]
    }
  }
}

function getEducationLaws() {
  return [
    {
      name: "Right to Education Act, 2009",
      description: "Fundamental right to education for children",
      year: 2009,
      provisions: ["education", "rights", "admission"],
      applications: ["all_education"]
    },
    {
      name: "National Education Policy, 2020",
      description: "Framework for education development and improvement",
      year: 2020,
      provisions: ["policy", "development", "improvement"],
      applications: ["all_education"]
    },
    {
      name: "Persons with Disabilities Act, 1995",
      description: "Rights and protections for persons with disabilities",
      year: 1995,
      provisions: ["disability", "rights", "protection"],
      applications: ["special_education"]
    },
    {
      name: "Juvenile Justice (Care and Protection of Children) Act, 2015",
      description: "Protection and care of children in conflict with law",
      year: 2015,
      provisions: ["child_protection", "rights", "care"],
      applications: ["student_discipline"]
    },
    {
      name: "SC/ST (Prevention of Atrocities) Act, 1989",
      description: "Prevention of atrocities against SC/ST communities",
      year: 1989,
      provisions: ["protection", "rights", "prevention"],
      applications: ["discrimination"]
    },
    {
      name: "National Council for Teacher Education Act, 1993",
      description: "Regulation of teacher education and qualifications",
      year: 1993,
      provisions: ["teacher", "education", "regulation"],
      applications: ["teacher_rights"]
    }
  ]
}

function getGovernmentEducationSchemes() {
  return [
    {
      name: "Sarva Shiksha Abhiyan (SSA)",
      url: "https://ssa.gov.in",
      description: "Universal Elementary Education Program",
      services: ["elementary_education", "infrastructure", "teacher_training"],
      contact: "011-2338225",
      coverage: "National"
    },
    {
      name: "Rashtriya Madhyamik Shiksha Abhiyan (RMSA)",
      url: "https://rmsa.gov.in",
      description: "Secondary Education Improvement Program",
      services: ["secondary_education", "infrastructure", "teacher_training"],
      contact: "011-2338225",
      coverage: "National"
    },
    {
      name: "Samagra Shiksha Abhiyan (SSA)",
      url: "https://samagra.gov.in",
      description: "Integrated School Education Program",
      services: ["integrated_education", "infrastructure", "teacher_training"],
      contact: "011-2338225",
      coverage: "National"
    },
    {
      name: "National Institute of Open Schooling (NIOS)",
      url: "https://www.nios.ac.in",
      description: "Open Schooling System",
      services: ["open_education", "distance_learning", "certification"],
      contact: "011-2338225",
      coverage: "National"
    },
    {
      name: "Kasturba Gandhi Balika Vidyalaya Scheme (KGBV)",
      url: "https://kgbv.gov.in",
      description: "Education for girls from disadvantaged communities",
      services: ["girls_education", "residential", "education"],
      contact: "011-2338225",
      coverage: "National"
    },
    {
      name: "Mid-Day Meal Scheme",
      url: "https://mdm.gov.in",
      description: "School meal program for children",
      services: ["nutrition", "school_meal", "health"],
      contact: "011-2338225",
      coverage: "National"
    }
  ]
}