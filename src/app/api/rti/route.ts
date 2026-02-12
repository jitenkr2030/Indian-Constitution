import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { 
      applicantName, 
      applicantAddress, 
      departmentName, 
      subject, 
      description, 
      periodFrom, 
      periodTo,
      language = 'en',
      urgency = 'normal'
    } = await request.json()

    // Validate required fields
    if (!applicantName || !applicantAddress || !departmentName || !subject) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: applicant name, address, department, and subject'
      }, { status: 400 })
    }

    // Generate RTI application content
    const rtiContent = generateRTIContent({
      applicantName,
      applicantAddress,
      departmentName,
      subject,
      description,
      periodFrom,
      periodTo,
      language,
      urgency
    })

    // Get department contact information
    const departmentInfo = getDepartmentInfo(departmentName)

    return NextResponse.json({
      success: true,
      data: {
        rtiApplication: rtiContent,
        departmentInfo,
        submissionGuidelines: getSubmissionGuidelines(departmentName, urgency),
        appealProcess: getAppealProcess(),
        sampleApplications: getSampleApplications(language),
        constitutionalReferences: getConstitutionalReferences()
      }
    })

  } catch (error) {
    console.error('RTI Assistant Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to process RTI application'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const department = searchParams.get('department')
    const category = searchParams.get('category')
    const language = searchParams.get('lang') || 'en'

    // Get department directory
    const departments = getDepartmentDirectory(category)
    const filteredDepartments = department 
      ? departments.filter(dept => dept.name.toLowerCase().includes(department.toLowerCase()))
      : departments

    // Get RTI success stories
    const successStories = getRTISuccessStories(language)

    return NextResponse.json({
      success: true,
      data: {
        departments: filteredDepartments,
        successStories,
        statistics: getRTIStatistics(),
        constitutionalBasis: getRTIConstitutionalBasis(),
        recentApplications: getRecentApplications()
      }
    })

  } catch (error) {
    console.error('RTI Directory Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch RTI directory'
    }, { status: 500 })
  }
}

function generateRTIContent(data: any) {
  const {
    applicantName,
    applicantAddress,
    departmentName,
    subject,
    description,
    periodFrom,
    periodTo,
    language = 'en',
    urgency = 'normal'
  } = data

  const currentDate = new Date().toLocaleDateString('en-IN')
  const applicationNumber = `RTI/${currentDate.replace(/\//g, '')}/${Math.floor(Math.random() * 1000)}`

  const templates = {
    en: {
      header: `RIGHT TO INFORMATION ACT, 2005`,
      subheader: `Application under Section 6(1) of the RTI Act, 2005`,
      applicant: `Name of Applicant: ${applicantName}`,
      address: `Address: ${applicantAddress}`,
      department: `Public Authority: ${departmentName}`,
      subject: `Particulars of Information Required: ${subject}`,
      description: `Description of Information Required: ${description || 'N/A'}`,
      period: `Period to which information relates: ${periodFrom || 'N/A'} to ${periodTo || 'N/A'}`,
      constitution: `This application is made under the constitutional right to information as upheld by the Supreme Court in various judgments.`,
      signature: `Signature of Applicant: _____________________`,
      date: `Date: ${currentDate}`
    },
    hi: {
      header: `सूचना का अधिकार अधिनियम, 2005`,
      subheader: `सूचना का अधिकार अधिनियम, 2005 की धारा 6(1) के तहत आवेदन`,
      applicant: `आवेदकर का नाम: ${applicantName}`,
      address: `पता: ${applicantAddress}`,
      department: `सार्वजनिक प्राधिकरण: ${departmentName}`,
      subject: `आवश्यक जानकारी के विवरण: ${subject}`,
      description: `आवश्यक जानकारी का विवरण: ${description || 'N/A'}`,
      period: `जानकारी अवधि: ${periodFrom || 'N/A'} से ${periodTo || 'N/A'}`,
      constitution: `यह आवेदन संविधान के तहत सूचना के अधिकार के तहत किया गया है।`,
      signature: `आवेदकर के हस्ताक्षर: _____________________`,
      date: `दिनांक: ${currentDate}`
    }
  }

  const template = templates[language as keyof typeof templates] || templates.en

  return {
    applicationNumber,
    urgency,
    content: `
${template.header}

${template.subheader}

${template.applicant}
${template.address}

${template.department}

${template.subject}

${template.description}

${template.period}

${template.constitution}

${template.signature}

${template.date}
    `.trim(),
    wordCount: template.subject.length + (description?.length || 0),
    estimatedDays: urgency === 'urgent' ? 5 : urgency === 'priority' ? 10 : 30
  }
}

function getDepartmentInfo(departmentName: string) {
  const departments = {
    "Ministry of Home Affairs": {
      address: "North Block, Central Secretariat, New Delhi - 110001",
      phone: "011-2338225",
      email: "mha@gov.in",
      website: "https://mha.gov.in",
      cpio: "Shri Rajiv Kumar Jain, Joint Secretary (RTI)",
      firstAppellate: "Shri Rajesh Kashyap, Additional Secretary",
      fees: "Rs. 10/- for BPL category, Rs. 50/- for others"
    },
    "Ministry of Finance": {
      address: "North Block, Central Secretariat, New Delhi - 110001",
      phone: "011-2309243",
      email: "finmin@nic.in",
      website: "https://finmin.gov.in",
      cpio: "Shri V.K. Jain, Joint Secretary (Budget)",
      firstAppellate: "Shri S.S. Meena, Additional Secretary",
      fees: "Rs. 10/- for BPL category, Rs. 50/- for others"
    },
    "Supreme Court of India": {
      address: "Supreme Court of India, Tilak Marg, New Delhi - 110201",
      phone: "011-23388025",
      email: "sci@nic.in",
      website: "https://sci.gov.in",
      cpio: "Shri Jagdish Singh Khehar, Registrar (RTI)",
      firstAppellate: "Shri Jagdish Singh Khehar, Registrar (RTI)",
      fees: "Rs. 10/- for BPL category, Rs. 50/- for others"
    },
    "Delhi Police": {
      address: "Police Headquarters, Delhi Police, ITO, Delhi - 110002",
      phone: "011-2341000",
      email: "delhi.police@gov.in",
      website: "https://delhipolice.gov.in",
      cpio: "Shri Sanjay Singh, Joint Commissioner (RTI)",
      firstAppellate: "Shri Sanjay Singh, Joint Commissioner (RTI)",
      fees: "Rs. 10/- for BPL category, Rs. 50/- for others"
    }
  }

  return departments[departmentName] || {
    address: "Department Address",
    phone: "Contact Number",
    email: "department@email.com",
    website: "https://department.gov.in",
    cpio: "CPIO Name",
    firstAppellate: "First Appellate Authority",
    fees: "Rs. 50/-"
  }
}

function getDepartmentDirectory(category?: string) {
  const allDepartments = [
    {
      name: "Ministry of Home Affairs",
      category: "central",
      level: "ministry",
      address: "North Block, Central Secretariat, New Delhi - 110001",
      phone: "011-2338225",
      email: "mha@gov.in",
      website: "https://mha.gov.in",
      jurisdiction: "National Security, Internal Security"
    },
    {
      name: "Ministry of Finance",
      category: "central",
      level: "ministry",
      address: "North Block, Central Secretariat, New Delhi - 110001",
      phone: "011-2309243",
      email: "finmin@nic.in",
      website: "https://finmin.gov.in",
      jurisdiction: "Finance, Economic Affairs"
    },
    {
      name: "Ministry of Health and Family Welfare",
      category: "central",
      level: "ministry",
      address: "Nirman Bhavan, Maulana Azad Road, New Delhi - 110001",
      phone: "011-23061302",
      email: "mohfw@nic.in",
      website: "https://mohfw.gov.in",
      jurisdiction: "Healthcare, Family Welfare"
    },
    {
      name: "Ministry of Education",
      category: "central",
      level: "ministry",
      address: "Shastri Bhavan, Dr. Rajendra Prasad Road, New Delhi - 110001",
      phone: "011-26156583",
      email: "edu@nic.in",
      website: "https://education.gov.in",
      jurisdiction: "Education, Literacy"
    },
    {
      name: "Supreme Court of India",
      category: "judiciary",
      level: "supreme",
      address: "Supreme Court of India, Tilak Marg, New Delhi - 110201",
      phone: "011-23388025",
      email: "sci@nic.in",
      website: "https://sci.gov.in",
      jurisdiction: "Judicial Matters, Constitutional Interpretation"
    },
    {
      name: "Delhi Police",
      category: "state",
      level: "police",
      address: "Police Headquarters, Delhi Police, ITO, Delhi - 110002",
      phone: "011-2341000",
      email: "delhi.police@gov.in",
      website: "https://delhipolice.gov.in",
      jurisdiction: "Law Enforcement, Public Safety"
    },
    {
      name: "Municipal Corporation of Delhi",
      category: "local",
      level: "municipal",
      address: "MCD Headquarters, Civic Centre, New Delhi - 110002",
      phone: "011-23227790",
      email: "mcd@nic.in",
      website: "https://mcdonline.gov.in",
      jurisdiction: "Municipal Services, Civic Amenities"
    }
  ]

  if (category) {
    return allDepartments.filter(dept => dept.category === category)
  }
  return allDepartments
}

function getSubmissionGuidelines(departmentName: string, urgency: string) {
  const baseGuidelines = {
    normal: {
      timeline: "30 days for response",
      fees: "Rs. 10/- for BPL, Rs. 50/- for others",
      documents: "Identity proof, Address proof",
      submission: "In person or registered post"
    },
    priority: {
      timeline: "7 days for response",
      fees: "Rs. 100/- (expedited processing)",
      documents: "Identity proof, Address proof, Urgency proof",
      submission: "In person with priority handling"
    },
    urgent: {
      timeline: "48 hours for response",
      fees: "Rs. 500/- (emergency processing)",
      documents: "Identity proof, Address proof, Emergency proof",
      submission: "In person with emergency handling"
    }
  }

  const departmentSpecific = {
    "Supreme Court": {
      timeline: "30 days",
      fees: "Rs. 10/- for BPL, Rs. 50/- for others",
      documents: "Case number, Identity proof",
      submission: "In person or through Supreme Court portal"
    }
  }

  return departmentSpecific[departmentName] || baseGuidelines[urgency as keyof typeof baseGuidelines]
}

function getAppealProcess() {
  return {
    firstAppeal: {
      timeline: "30 days from CPIO response",
      authority: "First Appellate Authority",
      fees: "Rs. 50/- (additional to RTI fee)",
      procedure: "File First Appeal with CPIO within 30 days"
    },
    secondAppeal: {
      timeline: "90 days from First Appellate Authority decision",
      authority: "Central Information Commission (CIC) or State Information Commission (SIC)",
      fees: "Rs. 100/- (additional to First Appeal fee)",
      procedure: "File Second Appeal with CIC/SIC within 90 days"
    },
    complaint: {
      timeline: "30 days from final decision",
      authority: "Information Commission",
      fees: "No fee for complaint",
      procedure: "File complaint if no response or unsatisfactory response"
    }
  }
}

function getSampleApplications(language: string = 'en') {
  return [
    {
      id: 1,
      title: "Information about Government Schemes",
      category: "schemes",
      department: "Ministry of Rural Development",
      subject: "Details of all government welfare schemes implemented in 2023",
      description: "Complete list of schemes, eligibility criteria, benefits, and implementation status",
      status: "approved",
      constitutionalReference: "Article 21 - Right to Information",
      date: "2023-12-01"
    },
    {
      id: 2,
      title: "Police Investigation Report",
      category: "legal",
      department: "Delhi Police",
      subject: "Status of FIR No. 123/2023 dated 15/11/2023",
      description: "Current investigation status, evidence collected, chargesheet filed",
      status: "pending",
      constitutionalReference: "Article 21 - Right to Life and Liberty",
      date: "2023-12-15"
    }
  ]
}

function getRTISuccessStories(language: string = 'en') {
  return [
    {
      id: 1,
      title: "Citizen Exposes Corruption in Municipal Corporation",
      department: "Municipal Corporation of Delhi",
      category: "anti-corruption",
      impact: "Recovered Rs. 50 lakhs of misappropriated funds",
      timeline: "45 days",
      constitutionalReference: "Article 19(1)(a) - Right to know",
      date: "2023-10-15"
    },
    {
      id: 2,
      title: "Student Gets Admission Details from University",
      department: "University Grants Commission",
      category: "education",
      impact: "Received complete admission process details",
      timeline: "15 days",
      constitutionalReference: "Article 21 - Right to Education",
      date: "2023-11-20"
    },
    {
      id: 3,
      title: "Farmer Gets Land Records from Revenue Department",
      department: "Ministry of Rural Development",
      category: "land",
      impact: "Received 7/12 extract of agricultural land",
      timeline: "22 days",
      constitutionalReference: "Article 300A - Right to Property",
      date: "2023-09-10"
    }
  ]
}

function getRTIStatistics() {
  return {
    totalApplications: 1500000,
    successRate: 65,
    averageResponseTime: 25, // days
    departmentsCovered: 2500,
    constitutionalCases: 5000,
    lastUpdated: new Date().toISOString()
  }
}

function getRTIConstitutionalBasis() {
  return {
    primary: {
      article: "Article 19(1)(a)",
      title: "Right to freedom of speech and expression",
      description: "Includes the right to information as part of freedom of speech"
    },
    secondary: {
      article: "Article 21",
      title: "Protection of life and personal liberty",
      description: "Right to information includes right to know about government actions"
    },
    landmark: {
      case: "Union of India v. State of Rajasthan (2014)",
      title: "Right to Information as Fundamental Right",
      description: "Supreme Court declared Right to Information as fundamental right"
    },
    legislation: {
      act: "Right to Information Act, 2005",
      title: "Statutory framework for right to information",
      description: "Provides mechanism for citizens to access government information"
    }
  }
}

function getRecentApplications() {
  return [
    {
      id: "RTI2023/456",
      applicant: "Rajesh Kumar",
      department: "Ministry of Finance",
      subject: "GST Implementation Data",
      status: "under_process",
      date: "2023-12-20",
      responseDue: "2024-01-19"
    },
    {
      id: "RTI2023/457",
      applicant: "Priya Sharma",
      department: "Delhi Police",
      subject: "CCTV Camera Installation",
      status: "approved",
      date: "2023-12-19",
      responseDue: "2024-01-18"
    }
  ]
}