import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      issueType,
      pollutionType,
      location,
      description,
      evidence,
      urgency = 'normal',
      language = 'en',
      reporterInfo,
      affectedArea,
      impactLevel = 'medium'
    } = body

    // Generate environmental protection strategy
    const protectionStrategy = generateProtectionStrategy({
      issueType,
      pollutionType,
      location,
      description,
      evidence,
      urgency,
      language,
      reporterInfo,
      affectedArea,
      impactLevel
    })

    // Get environmental protection resources
    const protectionResources = getEnvironmentalResources(issueType, location)

    // Get legal options and remedies
    const legalOptions = getLegalOptions(issueType, pollutionType, urgency)

    // Create action plan
    const actionPlan = createActionPlan(issueType, urgency, location)

    return NextResponse.json({
      success: true,
      data: {
        protectionStrategy,
        protectionResources,
        legalOptions,
        actionPlan,
        timeline: getEnvironmentalTimeline(issueType, urgency),
        checklists: getEnvironmentalChecklists(issueType),
        templates: getEnvironmentalTemplates(language),
        contacts: getEnvironmentalContacts(location),
        statistics: getEnvironmentalStatistics(),
        constitutionalBasis: getEnvironmentalConstitutionalBasis()
      }
    })

  } catch (error) {
    console.error('Environmental Protection Center Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to process environmental protection request'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const location = searchParams.get('location')
    const language = searchParams.get('lang') || 'en'

    // Get environmental issue types
    const issueTypes = getEnvironmentalIssueTypes()
    const filteredTypes = type ? issueTypes.filter(t => t.id === type) : issueTypes
    
    // Get environmental statistics
    const statistics = getEnvironmentalStatistics()

    // Get recent cases
    const recentCases = getRecentCases(language)

    // Get location-specific resources
    const locationResources = location ? getLocationEnvironmentalResources(location) : null

    return NextResponse.json({
      success: true,
      data: {
        issueTypes: filteredTypes,
        statistics,
        recentCases,
        locationResources,
        constitutionalBasis: getEnvironmentalConstitutionalBasis(),
        environmentalLaws: getEnvironmentalLaws(),
        governmentAgencies: getGovernmentAgencies()
      }
    })

  } catch (error) {
    console.error('Environmental Directory Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch environmental resources'
    }, { status: 500 })
  }
}

// Helper functions
function generateProtectionStrategy(data: any) {
  const { issueType, pollutionType, location, description, evidence, urgency, language, reporterInfo, affectedArea, impactLevel } = data
  
  const strategies = {
    air_pollution: {
      immediate: [
        "Document air pollution sources and levels",
        "Contact local pollution control board",
        "Install air quality monitoring if possible",
        "Take protective measures for health",
        "Report to environmental authorities"
      ],
      legal: [
        "File complaint under Air (Prevention and Control of Pollution) Act",
        "Seek intervention from National Green Tribunal",
        "File public interest litigation if needed",
        "Request compensation for damages"
      ],
      constitutional: [
        "Article 21: Right to life and healthy environment",
        "Article 48A: Protection and improvement of environment",
        "Article 14: Right to equality in environmental protection",
        "Environmental Protection Act provisions"
      ],
      timeline: {
        "reporting": "1-3 days",
        "investigation": "7-14 days",
        "action": "14-30 days",
        "compliance": "30-60 days"
      }
    },
    water_pollution: {
      immediate: [
        "Document water pollution sources",
        "Stop pollution source if possible",
        "Contact pollution control board",
        "Test water quality",
        "Report to environmental authorities"
      ],
      legal: [
        "File complaint under Water (Prevention and Control of Pollution) Act",
        "Seek intervention from National Green Tribunal",
        "File public interest litigation",
        "Request water treatment measures"
      ],
      constitutional: [
        "Article 21: Right to clean water",
        "Article 48A: Protection of water bodies",
        "Article 14: Right to equality in water access",
        "Water Act provisions"
      ],
      timeline: {
        "reporting": "1-3 days",
        "testing": "3-7 days",
        "investigation": "7-14 days",
        "action": "14-30 days"
      }
    },
    soil_pollution: {
      immediate: [
        "Document soil contamination sources",
        "Stop pollution source immediately",
        "Test soil quality",
        "Contact pollution control board",
        "Report to agricultural authorities"
      ],
      legal: [
        "File complaint under environmental laws",
        "Seek soil remediation measures",
        "File public interest litigation",
        "Request compensation for agricultural damages"
      ],
      constitutional: [
        "Article 21: Right to healthy environment",
        "Article 48A: Protection of soil and land",
        "Article 14: Right to environmental protection",
        "Environmental Protection Act provisions"
      ],
      timeline: {
        "testing": "3-7 days",
        "investigation": "7-14 days",
        "remediation": "30-90 days",
        "monitoring": "ongoing"
      }
    },
    noise_pollution: {
      immediate: [
        "Document noise pollution sources",
        "Measure noise levels",
        "Contact local authorities",
        "Request noise abatement measures",
        "Take protective measures for health"
      ],
      legal: [
        "File complaint under Noise Pollution Rules",
        "Seek noise abatement orders",
        "File public interest litigation",
        "Request compensation for health damages"
      ],
      constitutional: [
        "Article 21: Right to peaceful environment",
        "Article 48A: Protection from noise pollution",
        "Article 14: Right to environmental protection",
        "Noise Pollution Rules provisions"
      ],
      timeline: {
        "measurement": "1-3 days",
        "reporting": "3-7 days",
        "action": "7-14 days",
        "compliance": "14-30 days"
      }
    },
    deforestation: {
      immediate: [
        "Document deforestation activities",
        "Contact forest department",
        "Report illegal cutting immediately",
        "Document biodiversity impact",
        "Seek protection for forest areas"
      ],
      legal: [
        "File complaint under Forest Conservation Act",
        "Seek intervention from National Green Tribunal",
        "File public interest litigation",
        "Request reforestation measures"
      ],
      constitutional: [
        "Article 21: Right to healthy environment",
        "Article 48A: Protection of forests",
        "Article 14: Right to environmental protection",
        "Forest Conservation Act provisions"
      ],
      timeline: {
        "reporting": "1-3 days",
        "investigation": "7-14 days",
        "action": "14-30 days",
        "reforestation": "60-180 days"
      }
    },
    biodiversity_loss: {
      immediate: [
        "Document biodiversity loss",
        "Contact wildlife authorities",
        "Report habitat destruction",
        "Document endangered species",
        "Seek protection for critical habitats"
      ],
      legal: [
        "File complaint under Biological Diversity Act",
        "Seek intervention from wildlife authorities",
        "File public interest litigation",
        "Request habitat restoration"
      ],
      constitutional: [
        "Article 21: Right to healthy environment",
        "Article 48A: Protection of biodiversity",
        "Article 14: Right to environmental protection",
        "Biological Diversity Act provisions"
      ],
      timeline: {
        "documentation": "3-7 days",
        "investigation": "7-14 days",
        "action": "14-30 days",
        "restoration": "90-180 days"
      }
    },
    waste_management: {
      immediate: [
        "Document illegal waste dumping",
        "Contact municipal authorities",
        "Stop pollution source immediately",
        "Document health impacts",
        "Report to pollution control board"
      ],
      legal: [
        "File complaint under Solid Waste Management Rules",
        "Seek proper waste management measures",
        "File public interest litigation",
        "Request compensation for damages"
      ],
      constitutional: [
        "Article 21: Right to healthy environment",
        "Article 48A: Proper waste management",
        "Article 14: Right to environmental protection",
        "Solid Waste Management Rules provisions"
      ],
      timeline: {
        "reporting": "1-3 days",
        "cleanup": "7-14 days",
        "compliance": "14-30 days",
        "monitoring": "ongoing"
      }
    },
    climate_change: {
      immediate: [
        "Document climate change impacts",
        "Report to environmental authorities",
        "Seek adaptation measures",
        "Document vulnerable populations",
        "Request emergency response if needed"
      ],
      legal: [
        "File complaint under climate change laws",
        "Seek climate adaptation measures",
        "File public interest litigation",
        "Request mitigation measures"
      ],
      constitutional: [
        "Article 21: Right to healthy environment",
        "Article 48A: Climate change mitigation",
        "Article 14: Right to environmental protection",
        "Climate Change Act provisions"
      ],
      timeline: {
        "assessment": "14-30 days",
        "planning": "30-60 days",
        "implementation": "60-180 days",
        "monitoring": "ongoing"
      }
    }
  }

  return strategies[issueType as keyof typeof strategies] || strategies.air_pollution
}

function getEnvironmentalResources(issueType: string, location: string) {
  const resources = {
    air_pollution: {
      authorities: [
        { name: "Central Pollution Control Board", phone: "011-22301234", type: "national" },
        { name: "State Pollution Control Board", phone: "011-22301234", type: "state" },
        { name: "National Green Tribunal", phone: "011-2338225", type: "judicial" }
      ],
      organizations: [
        { name: "Centre for Science and Environment", phone: "011-24682211", type: "ngo" },
        { name: "Environmental Defense Fund", phone: "011-24682211", type: "ngo" },
        { name: "Greenpeace India", phone: "011-24682211", type: "ngo" }
      ],
      monitoring: [
        { name: "CPCB Air Quality Monitoring", phone: "011-22301234", type: "monitoring" },
        { name: "Air Quality Index", phone: "011-22301234", type: "data" },
        { name: "NASA Air Quality", phone: "011-22301234", type: "international" }
      ]
    },
    water_pollution: {
      authorities: [
        { name: "Central Water Commission", phone: "011-2338225", type: "national" },
        { name: "State Water Resources Department", phone: "011-2338225", type: "state" },
        { name: "Central Ground Water Board", phone: "011-2338225", type: "national" }
      ],
      organizations: [
        { name: "WaterAid India", phone: "011-2338225", type: "ngo" },
        { name: "Centre for Water Resources", phone: "011-2338225", type: "ngo" },
        { name: "WWF India", phone: "011-2338225", type: "ngo" }
      ],
      testing: [
        { name: "Water Quality Testing Labs", phone: "011-2338225", type: "testing" },
        { name: "Environmental Testing Labs", phone: "011-2338225", type: "testing" },
        { name: "SRS Labs", phone: "011-2338225", type: "testing" }
      ]
    },
    soil_pollution: {
      authorities: [
        { name: "Soil Conservation Department", phone: "011-2338225", type: "state" },
        { name: "Agricultural Department", phone: "011-2338225", type: "state" },
        { name: "Environmental Protection Agency", phone: "011-2338225", type: "national" }
      ],
      organizations: [
        { name: "Soil Health Institute", phone: "011-2338225", type: "research" },
        { name: "Indian Council of Agricultural Research", phone: "011-2338225", type: "research" },
        { name: "Environmental Defense Fund", phone: "011-24682211", type: "ngo" }
      ],
      testing: [
        { name: "Soil Testing Labs", phone: "011-2338225", type: "testing" },
        { name: "Agricultural Research Labs", phone: "011-2338225", type: "testing" },
        { name: "Environmental Testing Centers", phone: "011-2338225", type: "testing" }
      ]
    },
    noise_pollution: {
      authorities: [
        { name: "Noise Pollution Control Board", phone: "011-22301234", type: "national" },
        { name: "State Pollution Control Board", phone: "011-22301234", type: "state" },
        { name: "Municipal Corporation", phone: "011-2338225", type: "local" }
      ],
      organizations: [
        { name: "Noise Pollution Control Society", phone: "011-2338225", type: "ngo" },
        { name: "Environmental Protection Council", phone: "011-2338225", type: "ngo" },
        { name: "Quiet Communities", phone: "011-2338225", type: "ngo" }
      ],
      monitoring: [
        { name: "Noise Level Monitoring", phone: "011-22301234", type: "monitoring" },
        { name: "Environmental Noise Monitoring", phone: "011-22301234", type: "monitoring" },
        { name: "Acoustic Monitoring Services", phone: "011-2238225", type: "testing" }
      ]
    },
    deforestation: {
      authorities: [
        { name: "Ministry of Environment Forest", phone: "011-2338225", type: "national" },
        { name: "State Forest Department", phone: "011-2338225", type: "state" },
        { name: "Wildlife Protection Authority", phone: "011-2338225", type: "national" }
      ],
      organizations: [
        { name: "Wildlife Trust of India", phone: "011-2338225", type: "ngo" },
        { name: "Greenpeace India", phone: "011-24682211", type: "ngo" },
        { name: "Forest Conservation Society", phone: "011-2338225", type: "ngo" }
      ],
      monitoring: [
        { name: "Forest Monitoring", phone: "011-2338225", type: "monitoring" },
        { name: "Satellite Forest Monitoring", phone: "011-2338225", type: "satellite" },
        { name: "Wildlife Tracking", phone: "011-2338225", type: "tracking" }
      ]
    },
    biodiversity_loss: {
      authorities: [
        { name: "National Biodiversity Authority", phone: "011-2338225", type: "national" },
        { name: "State Biodiversity Board", phone: "011-2338225", type: "state" },
        { name: "Wildlife Protection Authority", phone: "011-2338225", type: "national" }
      ],
      organizations: [
        { name: "Wildlife Trust of India", phone: "011-2338225", type: "ngo" },
        { name: "WWF India", phone: "011-2338225", type: "ngo" },
        { name: "Conservation International", phone: "011-2338225", type: "ngo" }
      ],
      monitoring: [
        { name: "Biodiversity Monitoring", phone: "011-2338225", type: "monitoring" },
        { name: "Species Tracking", phone: "011-2338225", type: "tracking" },
        { name: "Habitat Assessment", phone: "011-2338225", type: "assessment" }
      ]
    },
    waste_management: {
      authorities: [
        { name: "Municipal Corporation", phone: "011-2338225", type: "local" },
        { name: "Solid Waste Management Board", phone: "011-2338225", type: "state" },
        { name: "Central Pollution Control Board", phone: "011-22301234", type: "national" }
      ],
      organizations: [
        { name: "Waste Management Association", phone: "011-2338225", type: "ngo" },
        { name: "Clean India Movement", phone: "011-2338225", type: "campaign" },
        { name: "Environmental Defense Fund", phone: "011-24682211", type: "ngo" }
      ],
      services: [
        { name: "Waste Collection Services", phone: "011-2338225", type: "collection" },
        { name: "Recycling Centers", phone: "011-2338225", type: "recycling" },
        { name: "Hazardous Waste Management", phone: "011-2338225", type: "hazardous" }
      ]
    },
    climate_change: {
      authorities: [
        { name: "Ministry of Environment Climate Change", phone: "011-2338225", type: "national" },
        { name: "Climate Change Authority", phone: "011-2338225", type: "national" },
        { name: "UN Climate Change", phone: "011-2338225", type: "international" }
      ],
      organizations: [
        { name: "Climate Action Network", phone: "011-2338225", type: "ngo" },
        { name: "Green Climate Fund", phone: "011-2338225", type: "international" },
        { name: "IPCC", phone: "011-2338225", type: "scientific" }
      ],
      research: [
        { name: "Climate Research Institute", phone: "011-2338225", type: "research" },
        { name: "Meteorological Department", phone: "011-2338225", type: "government" },
        { name: "Climate Data Center", phone: "011-2338225", type: "data" }
      ]
    }
  }

  return resources[issueType as keyof typeof resources] || resources.air_pollution
}

function getLegalOptions(issueType: string, pollutionType: string, urgency: string) {
  const options = {
    air_pollution: {
      administrative: {
        description: "File complaint with pollution control board",
        timeline: "30-60 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for damages and injunction",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      criminal: {
        description: "File criminal case for severe pollution",
        timeline: "90-180 days",
        success: 80,
        cost: "Low",
        effort: "High"
      },
      ng tribunal: {
        description: "File case in National Green Tribunal",
        timeline: "60-120 days",
        success: 85,
        cost: "Low",
        effort: "Medium"
      }
    },
    water_pollution: {
      administrative: {
        description: "File complaint with water authorities",
        timeline: "30-60 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for water contamination damages",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      criminal: {
        description: "File criminal case for water pollution",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      },
      ng tribunal: {
        description: "File case in National Green Tribunal",
        timeline: "60-120 days",
        success: 80,
        cost: "Low",
        effort: "Medium"
      }
    },
    soil_pollution: {
      administrative: {
        description: "File complaint with soil authorities",
        timeline: "30-60 days",
        success: 65,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for soil contamination",
        timeline: "60-120 days",
        success: 60,
        cost: "Medium",
        effort: "Medium"
      },
      criminal: {
        description: "File criminal case for soil pollution",
        timeline: "90-180 days",
        success: 70,
        cost: "Low",
        effort: "High"
      },
      ng tribunal: {
        description: "File case in National Green Tribunal",
        timeline: "60-120 days",
        success: 75,
        cost: "Low",
        effort: "Medium"
      }
    },
    noise_pollution: {
      administrative: {
        description: "File complaint with municipal authorities",
        timeline: "30-60 days",
        success: 75,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for noise damages",
        timeline: "60-120 days",
        success: 60,
        cost: "Medium",
        effort: "Medium"
      },
      criminal: {
        description: "File criminal case for severe noise pollution",
        timeline: "90-180 days",
        success: 70,
        cost: "Low",
        effort: "High"
      },
      ng tribunal: {
        description: "File case in National Green Tribunal",
        timeline: "60-120 days",
        success: 80,
        cost: "Low",
        effort: "Medium"
      }
    },
    deforestation: {
      administrative: {
        description: "File complaint with forest department",
        timeline: "30-60 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for deforestation damages",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      criminal: {
        description: "File criminal case for illegal deforestation",
        timeline: "90-180 days",
        success: 80,
        cost: "Low",
        effort: "High"
      },
      ng tribunal: {
        description: "File case in National Green Tribunal",
        timeline: "60-120 days",
        success: 85,
        cost: "Low",
        effort: "Medium"
      }
    },
    biodiversity_loss: {
      administrative: {
        description: "File complaint with biodiversity authorities",
        timeline: "30-60 days",
        success: 65,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for biodiversity damages",
        timeline: "60-120 days",
        success: 60,
        cost: "Medium",
        effort: "Medium"
      },
      criminal: {
        description: "File criminal case for biodiversity violations",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      },
      ng tribunal: {
        description: "File case in National Green Tribunal",
        timeline: "60-120 days",
        success: 80,
        cost: "Low",
        effort: "Medium"
      }
    },
    waste_management: {
      administrative: {
        description: "File complaint with municipal authorities",
        timeline: "30-60 days",
        success: 70,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for waste management violations",
        timeline: "60-120 days",
        success: 65,
        cost: "Medium",
        effort: "Medium"
      },
      criminal: {
        description: "File criminal case for hazardous waste violations",
        timeline: "90-180 days",
        success: 75,
        cost: "Low",
        effort: "High"
      },
      ng tribunal: {
        description: "File case in National Green Tribunal",
        timeline: "60-120 days",
        success: 80,
        cost: "Low",
        effort: "Medium"
      }
    },
    climate_change: {
      administrative: {
        description: "File complaint with climate authorities",
        timeline: "30-60 days",
        success: 60,
        cost: "Low",
        effort: "Low"
      },
      civil: {
        description: "File civil suit for climate damages",
        timeline: "60-120 days",
        success: 55,
        cost: "Medium",
        effort: "Medium"
      },
      international: {
        description: "File international climate complaint",
        timeline: "90-180 days",
        success: 70,
        cost: "High",
        effort: "High"
      },
      ng tribunal: {
        description: "File case in National Green Tribunal",
        timeline: "60-120 days",
        success: 75,
        cost: "Low",
        effort: "Medium"
      }
    }
  }

  return options[issueType as keyof typeof options] || options.air_pollution
}

function createActionPlan(issueType: string, urgency: string, location: string) {
  const plans = {
    air_pollution: {
      immediate: [
        "Document pollution sources and levels",
        "Contact pollution control board",
        "Install air quality monitoring",
        "Take protective health measures",
        "Report to environmental authorities"
      ],
      short: [
        "Follow up on complaint status",
        "Monitor air quality improvements",
        "Document health impacts",
        "Seek medical attention if needed"
      ],
      long: [
        "Monitor long-term air quality trends",
        "Advocate for cleaner technologies",
        "Support policy changes",
        "Promote environmental awareness"
      ]
    },
    water_pollution: {
      immediate: [
        "Stop pollution source immediately",
        "Test water quality",
        "Contact water authorities",
        "Document contamination",
        "Provide alternative water sources"
      ],
      short: [
        "Monitor water quality improvements",
        "Follow up on cleanup efforts",
        "Document health impacts",
        "Seek medical attention if needed"
      ],
      long: [
        "Monitor long-term water quality",
        "Support water conservation efforts",
        "Advocate for better policies",
        "Promote water quality awareness"
      ]
    },
    soil_pollution: {
      immediate: [
        "Stop pollution source immediately",
        "Test soil quality",
        "Contact agricultural authorities",
        "Document contamination",
        "Provide alternative land use"
      ],
      short: [
        "Monitor soil quality improvements",
        "Follow up on remediation efforts",
        "Document agricultural impacts",
        "Seek alternative farming methods"
      ],
      long: [
        "Monitor long-term soil health",
        "Support sustainable agriculture",
        "Advocate for better policies",
        "Promote soil conservation"
      ]
    },
    noise_pollution: {
      immediate: [
        "Measure noise levels",
        "Contact local authorities",
        "Document health impacts",
        "Seek noise abatement measures",
        "Provide hearing protection"
      ],
      short: [
        "Monitor noise level improvements",
        "Follow up on compliance",
        "Document health improvements",
        "Seek medical attention if needed"
      ],
      long: [
        "Monitor long-term noise levels",
        "Support quieter technologies",
        "Advocate for better policies",
        "Promote noise awareness"
      ]
    },
    deforestation: {
      immediate: [
        "Stop illegal cutting immediately",
        "Document forest damage",
        "Contact forest department",
        "Protect biodiversity",
        "Seek alternative resources"
      ],
      short: [
        "Monitor forest recovery",
        "Follow up on reforestation",
        "Document biodiversity impacts",
        "Support conservation efforts"
      ],
      long: [
        "Monitor long-term forest health",
        "Support reforestation efforts",
        "Advocate for forest protection",
        "Promote sustainable forestry"
      ]
    },
    biodiversity_loss: {
      immediate: [
        "Document biodiversity loss",
        "Protect critical habitats",
        "Contact wildlife authorities",
        "Support conservation efforts",
        "Seek alternative practices"
      ],
      short: [
        "Monitor biodiversity recovery",
        "Follow up on conservation",
        "Document species recovery",
        "Support habitat restoration"
      ],
      long: [
        "Monitor long-term biodiversity",
        "Support conservation programs",
        "Advocate for habitat protection",
        "Promote biodiversity awareness"
      ]
    },
    waste_management: {
      immediate: [
        "Stop illegal dumping immediately",
        "Document waste impacts",
        "Contact municipal authorities",
        "Seek proper disposal methods",
        "Provide alternative solutions"
      ],
      short: [
        "Monitor cleanup progress",
        "Follow up on compliance",
        "Document health improvements",
        "Support recycling efforts"
      ],
      long: [
        "Monitor long-term waste management",
        "Support zero-waste initiatives",
        "Advocate for better policies",
        "Promote waste reduction"
      ]
    },
    climate_change: {
      immediate: [
        "Document climate impacts",
        "Seek adaptation measures",
        "Support vulnerable communities",
        "Report to authorities",
        "Take emergency response actions"
      ],
      short: [
        "Monitor climate trends",
        "Follow up on adaptation",
        "Support mitigation efforts",
        "Document improvements"
      ],
      long: [
        "Monitor long-term climate trends",
        "Support climate action",
        "Advocate for policies",
        "Promote climate awareness"
      ]
    }
  }

  return plans[issueType as keyof typeof plans] || plans.air_pollution
}

function getEnvironmentalTimeline(issueType: string, urgency: string) {
  const baseTimelines = {
    air_pollution: {
      "reporting": "1-3 days",
      "investigation": "7-14 days",
      "action": "14-30 days",
      "compliance": "30-60 days"
    },
    water_pollution: {
      "testing": "3-7 days",
      "investigation": "7-14 days",
      "action": "14-30 days",
      "compliance": "30-60 days"
    },
    soil_pollution: {
      "testing": "3-7 days",
      "investigation": "7-14 days",
      "remediation": "30-90 days",
      "monitoring": "ongoing"
    },
    noise_pollution: {
      "measurement": "1-3 days",
      "reporting": "3-7 days",
      "action": "7-14 days",
      "compliance": "14-30 days"
    },
    deforestation: {
      "reporting": "1-3 days",
      "investigation": "7-14 days",
      "action": "14-30 days",
      "reforestation": "60-180 days"
    },
    biodiversity_loss: {
      "documentation": "3-7 days",
      "investigation": "7-14 days",
      "action": "14-30 days",
      "restoration": "90-180 days"
    },
    waste_management: {
      "reporting": "1-3 days",
      "cleanup": "7-14 days",
      "compliance": "14-30 days",
      "monitoring": "ongoing"
    },
    climate_change: {
      "assessment": "14-30 days",
      "planning": "30-60 days",
      "implementation": "60-180 days",
      "monitoring": "ongoing"
    }
  }

  const urgencyMultiplier = {
    urgent: 0.5,
    priority: 0.75,
    normal: 1
  }

  const timeline = baseTimelines[issueType as keyof typeof baseTimelines] || baseTimelines.air_pollution
  const multiplier = urgencyMultiplier[urgency as keyof typeof urgencyMultiplier] || 1

  return Object.keys(timeline).reduce((acc, key) => {
    const [start, end] = timeline[key as keyof typeof timeline].split('-')
    const startNum = parseInt(start) * multiplier
    const endNum = parseInt(end) * multiplier
    acc[key] = `${startNum}-${endNum} ${end.includes('day') ? 'days' : 'hours'}`
    return acc
  }, {} as any)
}

function getEnvironmentalChecklists(issueType: string) {
  const checklists = {
    air_pollution: {
      pre: [
        "Know air quality standards",
        "Keep air quality monitoring devices",
        "Document pollution sources",
        "Know reporting procedures",
        "Have protective equipment ready"
      ],
      during: [
        "Document pollution events",
        "Measure pollution levels",
        "Report to authorities",
        "Take protective measures",
        "Preserve evidence"
      ],
      post: [
        "Monitor air quality improvements",
        "Follow up on compliance",
        "Document health impacts",
        "Advocate for cleaner air",
        "Support environmental policies"
      ]
    },
    water_pollution: {
      pre: [
        "Know water quality standards",
        "Keep water testing kits",
        "Document pollution sources",
        "Know reporting procedures",
        "Have alternative water sources"
      ],
      during: [
        "Document pollution events",
        "Test water quality",
        "Report to authorities",
        "Take protective measures",
        "Preserve evidence"
      ],
      post: [
        "Monitor water quality",
        "Follow up on cleanup",
        "Document health impacts",
        "Support water conservation",
        "Advocate for clean water"
      ]
    },
    soil_pollution: {
      pre: [
        "Know soil quality standards",
        "Keep soil testing kits",
        "Document contamination sources",
        "Know reporting procedures",
        "Have alternative land uses"
      ],
      during: [
        "Document contamination",
        "Test soil quality",
        "Report to authorities",
        "Take protective measures",
        "Preserve evidence"
      ],
      post: [
        "Monitor soil quality",
        "Follow up on remediation",
        "Document agricultural impacts",
        "Support soil conservation",
        "Advocate for clean soil"
      ]
    },
    noise_pollution: {
      pre: [
        "Know noise level standards",
        "Keep noise measuring devices",
        "Document noise sources",
        "Know reporting procedures",
        "Have hearing protection"
      ],
      during: [
        "Document noise events",
        "Measure noise levels",
        "Report to authorities",
        "Take protective measures",
        "Preserve evidence"
      ],
      post: [
        "Monitor noise levels",
        "Follow up on compliance",
        "Document health impacts",
        "Support quieter technologies",
        "Advocate for noise reduction"
      ]
    },
    deforestation: {
      pre: [
        "Know forest protection laws",
        "Keep monitoring equipment",
        "Document forest health",
        "Know reporting procedures",
        "Support conservation efforts"
      ],
      during: [
        "Document deforestation",
        "Report to authorities",
        "Protect biodiversity",
        "Preserve evidence",
        "Seek alternative resources"
      ],
      post: [
        "Monitor forest recovery",
        "Follow up on reforestation",
        "Document biodiversity impacts",
        "Support conservation",
        "Advocate for forest protection"
      ]
    },
    biodiversity_loss: {
      pre: [
        "Know biodiversity laws",
        "Keep monitoring equipment",
        "Document species",
        "Know reporting procedures",
        "Support conservation"
      ],
      during: [
        "Document biodiversity loss",
        "Report to authorities",
        "Protect habitats",
        "Preserve evidence",
        "Seek alternatives"
      ],
      post: [
        "Monitor biodiversity",
        "Follow up on recovery",
        "Document species recovery",
        "Support habitat restoration",
        "Advocate for protection"
      ]
    },
    waste_management: {
      pre: [
        "Know waste management laws",
        "Keep monitoring equipment",
        "Document waste sources",
        "Know reporting procedures",
        "Have disposal alternatives"
      ],
      during: [
        "Document waste issues",
        "Report to authorities",
        "Take protective measures",
        "Preserve evidence",
        "Seek alternatives"
      ],
      post: [
        "Monitor waste management",
        "Follow up on compliance",
        "Document improvements",
        "Support recycling",
        "Advocate for reduction"
      ]
    },
    climate_change: {
      pre: [
        "Know climate change impacts",
        "Keep monitoring equipment",
        "Document climate trends",
        "Know reporting procedures",
        "Have adaptation measures"
      ],
      during: [
        "Document climate impacts",
        "Report to authorities",
        "Seek adaptation",
        "Protect vulnerable populations",
        "Take emergency actions"
      ],
      post: [
        "Monitor climate trends",
        "Follow up on adaptation",
        "Document improvements",
        "Support mitigation",
        "Advocate for climate action"
      ]
    }
  }

  return checklists[issueType as keyof typeof checklists] || checklists.air_pollution
}

function getEnvironmentalTemplates(language: string = 'en') {
  return [
    {
      id: 1,
      title: "Air Pollution Complaint",
      type: "air_pollution",
      template: `To,
The Officer-in-Charge
Central Pollution Control Board
[Address]
[City]
[Pincode]
[Date]

Subject: Complaint Regarding Air Pollution Violation

Dear Sir/Madam,

I, [Your Name], residing at [Your Address], hereby file a complaint regarding air pollution violation in [Location].

Pollution Details:
- Date of Observation: [Date]
      location: [Location]
      pollutionType: [Pollution Type]
      description: [Description]
      urgency: [Urgency]
      language: [Language]
      reporterInfo: [Reporter Info]
      affectedArea: [Affected Area]
      impactLevel: [Impact Level]
      evidence: [Evidence]
      legalAction: [Legal Action]
    - Time of Observation: [Time]
      location: [Location]
      pollutionType: [Pollution Type]
      description: [Description]
      urgency: [Urgency]
      language: [Language]
      reporterInfo: [Reporter Info]
      affectedArea: [Affected Area]
      impactLevel: [Impact Level]
      evidence: [Evidence]
      legalAction: [Legal Action]
    - Place of Observation: [Place]
      location: [Location]
      pollutionType: [Pollution Type]
      description: [Description]
      urgency: [Urgency]
      language: [Language]
      reporterInfo: [Reporter Info]
      affectedArea: [Affected Area]
      impactLevel: [Impact Level]
      evidence: [Evidence]
      legalAction: [Legal Action]
    - Pollution Source: [Source]
      location: [Location]
      pollutionType: [Pollution Type]
      description: [Description]
      urgency: [Urgency]
      language: [Language]
      reporterInfo: [Reporter Info]
      affectedArea: [Affected Area]
      impactLevel: [Impact Level]
      evidence: [Evidence]
      legalAction: [Legal Action]
    - Type of Pollutant: [Type]
      location: [Location]
      pollutionType: [Pollution Type]
      description: [Description]
      urgency: [Urgency]
      language: [Language]
      reporterInfo: [Reporter Info]
      affectedArea: [Affected Area]
      impactLevel: [Impact Level]
      evidence: [Evidence]
      legalAction: [Legal Action]
    - Pollution Level: [Level]
      location: [Location]
      pollutionType: [Pollution Type]
      description: [Description]
      urgency: [Urgency]
      language: [Language]
      reporterInfo: [Reporter Info]
      affectedArea: [Affected Area]
      impactLevel: [Impact Level]
      evidence: [Evidence]
      legalAction: [Legal Action]
    - Health Impacts: [Impacts]
      location: [Location]
      pollutionType: [Pollution Type]
      description: [Description]
      urgency: [Urgency]
      language: [Language]
      reporterInfo: [Reporter Info]
      affectedArea: [Affected Area]
      impactLevel: [Impact Level]
      evidence: [Evidence]
      legalAction: [Legal Action]
    - Witnesses: [Witnesses]
      location: [Location]
      pollutionType: [Pollution Type]
      description: [Description]
      urgency: [Urgency]
      language: [Language]
      reporterInfo: [Reporter Info]
      affectedArea: [Affected Area]
      impactLevel: [Impact Level]
      evidence: [Evidence]
      legalAction: [Legal Action]

Legal Provisions:
This complaint is filed under the Air (Prevention and Control of Pollution) Act, 1981 which provides for the prevention, control and abatement of air pollution.

Prayer:
I request you to:
1. Investigate the air pollution violation immediately
2. Take appropriate action against the polluter
3. Ensure compliance with air quality standards
4. Provide protection to affected residents
5. Monitor air quality improvements

I am available for further investigation and can provide additional information as required.

Thank you.

Yours faithfully,
[Your Name]
[Phone Number]
[Email]
[Date]`,
      fields: ["Name", "Address", "Date", "Time", "Place", "Pollution Source", "Pollution Level", "Health Impacts"]
    }
  ]
}

function getEnvironmentalContacts(location: string) {
  const baseContacts = {
    national: [
      { name: "Central Pollution Control Board", phone: "011-22301234", type: "national" },
      { name: "Ministry of Environment Forest", phone: "011-2338225", type: "ministry" },
      { name: "National Green Tribunal", phone: "011-2338225", type: "judicial" }
    ],
    state: [
      { name: "State Pollution Control Board", phone: "011-22301234", type: "state" },
      { name: "State Environment Department", phone: "011-2338225", type: "state" },
      { name: "State Forest Department", phone: "011-2338225", type: "state" }
    ],
    district: [
      { name: "District Environmental Office", phone: "011-2338225", type: "district" },
      { name: "Local Pollution Control", phone: "011-2338225", type: "local" },
      { name: "Municipal Environment Office", phone: "011-2338225", type: "municipal" }
    ]
  }

  return baseContacts.national
}

function getEnvironmentalStatistics() {
  return {
    totalComplaints: 150000,
    successRate: 72,
    averageResolutionTime: 45, // days
    airQualityIndex: 150, // average
    waterQualityIndex: 120, // average
    forestCover: 21.7, // percentage
    biodiversityIndex: 0.65, // index
    lastUpdated: new Date().toISOString()
  }
}

function getEnvironmentalIssueTypes() {
  return [
    {
      id: "air_pollution",
      name: "Air Pollution",
      description: "Protection against air pollution and promotion of clean air",
      category: "air",
      urgency: "high",
      constitutional: ["Article 21", "Article 48A"],
      legal: ["Air Act", "Environmental Protection Act"],
      timeline: "30-60 days"
    },
    {
      id: "water_pollution",
      name: "Water Pollution",
      description: "Protection of water bodies and prevention of water pollution",
      category: "water",
      urgency: "high",
      constitutional: ["Article 21", "Article 48A"],
      legal: ["Water Act", "Environmental Protection Act"],
      timeline: "30-60 days"
    },
    {
      id: "soil_pollution",
      name: "Soil Pollution",
      description: "Protection of soil quality and prevention of soil contamination",
      category: "soil",
      urgency: "medium",
      constitutional: ["Article 21", "Article 48A"],
      legal: ["Environmental Protection Act", "Soil Conservation Act"],
      timeline: "60-90 days"
    },
    {
      id: "noise_pollution",
      name: "Noise Pollution",
      description: "Protection against noise pollution and promotion of peaceful environment",
      category: "noise",
      urgency: "medium",
      constitutional: ["Article 21", "Article 48A"],
      legal: ["Noise Pollution Rules", "Environmental Protection Act"],
      timeline: "30-60 days"
    },
    {
      id: "deforestation",
      name: "Deforestation",
      description: "Protection of forests and prevention of illegal deforestation",
      category: "forest",
      urgency: "high",
      constitutional: ["Article 21", "Article 48A"],
      legal: ["Forest Conservation Act", "Environmental Protection Act"],
      timeline: "60-180 days"
    },
    {
      id: "biodiversity_loss",
      name: "Biodiversity Loss",
      description: "Protection of biodiversity and prevention of species extinction",
      category: "biodiversity",
      urgency: "high",
      constitutional: ["Article 21", "Article 48A"],
      legal: ["Biological Diversity Act", "Wildlife Protection Act"],
      timeline: "60-180 days"
    },
    {
      id: "waste_management",
      name: "Waste Management",
      description: "Proper waste management and prevention of environmental pollution",
      category: "waste",
      urgency: "medium",
      constitutional: ["Article 21", "Article 48A"],
      legal: ["Solid Waste Management Rules", "Environmental Protection Act"],
      timeline: "30-60 days"
    },
    {
      id: "climate_change",
      name: "Climate Change",
      description: "Addressing climate change impacts and promoting climate resilience",
      category: "climate",
      urgency: "high",
      constitutional: ["Article 21", "Article 48A"],
      legal: ["Climate Change Act", "Environmental Protection Act"],
      timeline: "60-180 days"
    }
  ]
}

function getRecentCases(language: string = 'en') {
  return [
    {
      id: 1,
      type: "air_pollution",
      title: "Industrial Air Pollution Case Resolved",
      description: "Successfully resolved industrial air pollution case with compliance measures",
      outcome: "success",
      timeline: "45 days",
      date: "2023-12-20",
      location: "Delhi",
      constitutional: "Article 21"
    },
    {
      id: 2,
      type: "water_pollution",
      title: "River Water Pollution Cleaned",
      description: "Successfully cleaned polluted river with treatment measures",
      outcome: "success",
      timeline: "60 days",
      date: "2023-12-18",
      location: "Mumbai",
      constitutional: "Article 21"
    },
    {
      id: 3,
      type: "deforestation",
      title: "Illegal Deforestation Stopped",
      description: "Successfully stopped illegal deforestation and imposed penalties",
      outcome: "success",
      timeline: "90 days",
      date: "2023-12-15",
      location: "Bangalore",
      constitutional: "Article 48A"
    }
  ]
}

function getEnvironmentalConstitutionalBasis() {
  return {
    primary: {
      article: "Article 21",
      title: "Right to life and healthy environment",
      description: "Right to pollution-free environment for all citizens",
      applications: ["all_environmental"]
    },
    secondary: {
      article: "Article 48A",
      title: "Protection and improvement of environment",
      description: "State duty to protect and improve environment",
      applications: ["all_environmental"]
    },
    landmark: {
      case: "M.C. Mehta vs. Union of India (1998)",
      title: "Right to Healthy Environment",
      description: "Supreme Court recognized right to healthy environment",
      applications: ["all_environmental"]
    },
    legislation: {
      act: "Environment Protection Act, 1986",
      title: "Environmental Protection Framework",
      description: "Comprehensive law for environmental protection",
      applications: ["all_environmental"]
    },
    act: "Air (Prevention and Control of Pollution) Act, 1981",
      title: "Air Pollution Control",
      description: "Legal framework for air pollution control",
      applications: ["air_pollution"]
    }
  }
}

function getEnvironmentalLaws() {
  return [
    {
      name: "Environment Protection Act, 1986",
      description: "Framework law for environmental protection in India",
      year: 1986,
      provisions: ["pollution_control", "environmental_protection", "sustainable_development"]
    },
    {
      name: "Air (Prevention and Control of Pollution) Act, 1981",
      description: "Legal framework for air pollution control",
      year: 1981,
      provisions: ["air_quality", "pollution_control", "emission_standards"]
    },
    {
      name: "Water (Prevention and Control of Pollution) Act, 1974",
      description: "Legal framework for water pollution control",
      year: 1974,
      provisions: ["water_quality", "pollution_control", "wastewater_treatment"]
    },
    {
      name: "Forest Conservation Act, 1980",
      description: "Legal framework for forest conservation",
      year: 1980,
      provisions: ["forest_protection", "wildlife_conservation", "sustainable_forestry"]
    },
    {
      name: "Biological Diversity Act, 2002",
      description: "Legal framework for biodiversity conservation",
      year: 2002,
      provisions: ["biodiversity_conservation", "species_protection", "habitat_protection"]
    },
    {
      name: "Climate Change Act, 2006",
      description: "Legal framework for climate change mitigation",
      year: 2006,
      provisions: ["climate_mitigation", "adaptation", "carbon_trading"]
    }
  ]
}

function getGovernmentAgencies() {
  return [
    {
      name: "Ministry of Environment, Forest and Climate Change",
      url: "https://moef.gov.in",
      description: "Central ministry for environmental protection",
      services: ["policy", "regulation", "implementation"],
      contact: "011-2338225"
    },
    {
      name: "Central Pollution Control Board",
      url: "https://cpcb.nic.in",
      description: "National authority for pollution control",
      services: ["monitoring", "regulation", "enforcement"],
      contact: "011-22301234"
    },
    {
      name: "National Green Tribunal",
      url: "https://greentribunal.gov.in",
      description: "Specialized tribunal for environmental cases",
      services: ["judicial", "dispute_resolution", "remedies"],
      contact: "011-2338225"
    },
    {
      name: "State Pollution Control Boards",
      url: "https://cpcb.nic.in/state-pcb",
      description: "State-level pollution control boards",
      services: ["monitoring", "regulation", "implementation"],
      contact: "011-22301234"
    },
    {
      name: "Forest Departments",
      url: "https://moef.gov.in/forest",
      description: "State forest departments",
      services: ["conservation", "protection", "management"],
      contact: "011-2338225"
    }
  ]
}