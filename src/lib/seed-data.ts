import { db } from '@/lib/db'

// Sample data seeding script
async function seedSampleData() {
  try {
    // Create Parts
    const part1 = await db.part.create({
      data: {
        number: 1,
        titleEn: "The Union and its Territory",
        titleHi: "संघ और उसका क्षेत्र",
        titleTa: "ஒன்றியம் மற்றும் அதன் பிரதேசம்",
        description: "Formation of first states, admission of states, formation of new states, union territories",
        order: 1
      }
    })

    const part3 = await db.part.create({
      data: {
        number: 3,
        titleEn: "Fundamental Rights",
        titleHi: "मौलिक अधिकार",
        titleTa: "அடிப்படை உரிமைகள்",
        description: "Rights guaranteed to all citizens of India for their personal and collective development",
        order: 3
      }
    })

    // Create Articles
    const article14 = await db.article.create({
      data: {
        number: "14",
        partId: part1.id,
        titleEn: "Equality before Law",
        titleHi: "कानून के समक्ष समानता",
        titleTa: "சட்டத்தின் கீழ் சமத்துவம்",
        contentEn: "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.",
        contentHi: "राज्य किसी भी व्यक्ति को भारत के क्षेत्र के भीतर कानून के समक्ष समानता या कानूनों के समान संरक्षण से इनकार नहीं करेगा।",
        contentTa: "மாநிலம் எந்தவொரு நபருக்கும் இந்தியாவின் பிரதேசத்திற்குள் சட்டத்தின் கீழ் சமத்துவம் அல்லது சட்டங்களின் சம பாதுகாப்பை மறுக்காது.",
        category: "fundamental_right",
        importance: 5
      }
    })

    const article21 = await db.article.create({
      data: {
        number: "21",
        partId: part3.id,
        titleEn: "Protection of Life and Personal Liberty",
        titleHi: "जीवन और व्यक्तिगत स्वतंत्रता का संरक्षण",
        titleTa: "வாழ்க்கை மற்றும் தனிப்பட்ட சுதந்திரத்தின் பாதுகாப்பு",
        contentEn: "No person shall be deprived of his life or personal liberty except according to procedure established by law.",
        contentHi: "किसी व्यक्ति को कानून द्वारा स्थापित प्रक्रिया के अनुसार ही उसके जीवन या व्यक्तिगत स्वतंत्रता से वंचित नहीं किया जाएगा।",
        contentTa: "சட்டத்தால் நிறுவப்பட்ட நடைமுறைக்கு இணங்க, ஒருவரின் வாழ்க்கை அல்லது தனிப்பட்ட சுதந்திரத்திலிருந்து அவரை பறிக்கக்கூடாது.",
        category: "fundamental_right",
        importance: 5
      }
    })

    const article19 = await db.article.create({
      data: {
        number: "19",
        partId: part3.id,
        titleEn: "Protection of certain rights regarding freedom of speech",
        titleHi: "भाषण की स्वतंत्रता के संबंध में कुछ अधिकारों का संरक्षण",
        titleTa: "பேச்சு சுதந்திரம் தொடர்பான சில உரிமைகளின் பாதுகாப்பு",
        contentEn: "All citizens shall have the right to freedom of speech and expression, to assemble peaceably and without arms, to form associations or unions, to move freely throughout the territory of India, to reside and settle in any part of India, and to practice any profession or to carry on any occupation, trade or business.",
        contentHi: "सभी नागरिकों को भाषण और अभिव्यक्ति की स्वतंत्रता, बिना हथियार शांतिपूर्वक इकट्ठा होने, संघों या संघों का गठन करने, भारत के क्षेत्र में स्वतंत्र रूप से घूमने, भारत के किसी भी भाग में निवास करने और बसने, और कोई भी पेशा अभ्यास करने या कोई भी व्यवसाय, व्यापार या व्यवसाय करने का अधिकार होगा।",
        contentTa: "அனைத்து குடிமக்களும் பேச்சு மற்றும் வெளிப்பாட்டு சுதந்திரம், ஆயுதங்களின்றி அமைதியாக கூடுவதற்கும், சங்கங்கள் அல்லது யூனியன்களை உருவாக்குவதற்கும், இந்தியாவின் பிரதேசம் முழுவதும் சுதந்திரமாக நகர்வதற்கும், இந்தியாவின் எந்தவொரு பகுதியிலும் வசிப்பதற்கும் மற்றும் எந்தவொரு தொழிலையும் பயிற்சி செய்வதற்கோ அல்லது எந்தவொரு தொழில், வர்த்தகம் அல்லது வணிகத்தை நடத்துவதற்கோ உரிமை பெற்றிருப்பார்கள்.",
        category: "fundamental_right",
        importance: 5
      }
    })

    // Create Simplified Explanations
    await db.simplifiedExplanation.createMany({
      data: [
        {
          articleId: article14.id,
          language: "en",
          title: "What Equality Before Law Means for You",
          content: "Article 14 ensures that everyone is equal in the eyes of law. No one can be discriminated against based on religion, race, caste, sex, or place of birth.",
          examples: "If a rich person and a poor person commit the same crime, they should receive the same punishment. Government officials cannot use their power to favor certain people.",
          dos: "Treat everyone equally, expect equal treatment from authorities, report discrimination",
          donts: "Don't expect special treatment because of wealth/status, don't discriminate against others"
        },
        {
          articleId: article21.id,
          language: "en",
          title: "Your Right to Life and Liberty",
          content: "Article 21 protects your fundamental right to live with dignity. The government cannot take away your life or freedom except through proper legal procedures.",
          examples: "Police cannot torture you, hospitals cannot deny emergency treatment, you have the right to fair trial if accused of a crime.",
          dos: "Know your rights during arrest, seek legal help immediately, report human rights violations",
          donts: "Don't resist legal procedures, don't take law into your own hands"
        },
        {
          articleId: article19.id,
          language: "en",
          title: "Freedom of Speech and Expression",
          content: "Article 19 gives you the right to express your opinions, ideas, and beliefs freely. This includes speaking, writing, art, and peaceful protests.",
          examples: "You can criticize government policies, write blogs about social issues, participate in peaceful protests, create art and music.",
          dos: "Express yourself responsibly, respect others' opinions, use peaceful means",
          donts: "Don't spread hate speech, don't incite violence, don't defame others without proof"
        }
      ]
    })

    // Create Emergency Guides
    await db.emergencyGuide.createMany({
      data: [
        {
          title: "Police Arrest",
          category: "arrest",
          contentEn: "If you're arrested by police: 1) Ask why you're being arrested 2) Remain silent except to provide basic identity 3) Call your lawyer or family 4) Don't sign anything without legal advice 5) You have the right to bail for many offenses.",
          contentHi: "यदि पुलिस आपको गिरफ्तार करती है: 1) पूछें कि आपको क्यों गिरफ्तार किया जा रहा है 2) बुनियादी पहचान को छोड़कर चुप रहें 3) अपने वकील या परिवार को कॉल करें 4) बिना कानूनी सलाह के कुछ भी हस्ताक्षर न करें 5) कई अपराधों के लिए आपको जमानत का अधिकार है।",
          contentTa: "காவல்துறையால் நீங்கள் கைது செய்யப்பட்டால்: 1) ஏன் கைது செய்யப்படுகிறீர்கள் என்று கேளுங்கள் 2) அடிப்படை அடையாளத்தைத் தவிர செய்திகளை சொல்லுங்கள் 3) உங்கள் வழக்கறிஞர் அல்லது குடும்பத்தை அழைக்கவும் 4) சட்ட ஆலோசனை இல்லாமல் எதையும் கையெழுத்திட வேண்டாம் 5) பல குற்றங்களுக்கு ஜாமீன் உரிமை உங்களுக்கு உள்ளது.",
          helpline: "Police Complaint: 100, Legal Services: 1800-11-1320",
          legalAid: "Contact District Legal Services Authority for free legal aid"
        },
        {
          title: "Search & Seizure",
          category: "search",
          contentEn: "During police searches: 1) Ask for search warrant 2) You have the right to be present 3) Police must conduct search in your presence 4) Get a list of seized items 5) Women can only be searched by female officers.",
          contentHi: "पुलिस खोज के दौरान: 1) खोज वारंट मांगें 2) आपके उपस्थित होने का अधिकार है 3) पुलिस को आपकी उपस्थिति में खोज करनी होगी 4) जब्त किए गए सामान की सूची प्राप्त करें 5) महिलाओं की खोज केवल महिला अधिकारियों द्वारा ही की जा सकती है।",
          contentTa: "காவல்துறை தேடுதலின் போது: 1) தேடும் உத்தரவைக் கேளுங்கள் 2) நீங்கள் உடன் இருக்க உரிமை உங்களுக்கு உள்ளது 3) காவல்துறையினர் உங்கள் முன்னிலையில் தேடுதலை நடத்த வேண்டும் 4) பறிமுதல் செய்யப்பட்ட பொருட்களின் பட்டியலைப் பெறுங்கள் 5) பெண்களை பெண் அதிகாரிகள் மட்டுமே தேடலாம்.",
          helpline: "Police Complaint: 100, Human Rights: 1091",
          legalAid: "National Human Rights Commission: 011-23385368"
        }
      ]
    })

    // Create MCQs
    await db.mCQ.createMany({
      data: [
        {
          articleId: article14.id,
          question: "What does Article 14 guarantee?",
          optionA: "Right to equality",
          optionB: "Right to freedom",
          optionC: "Right against exploitation",
          optionD: "Right to education",
          correctAnswer: "A",
          explanation: "Article 14 guarantees equality before law and equal protection of laws to all persons.",
          difficulty: "easy",
          category: "UPSC"
        },
        {
          articleId: article21.id,
          question: "Under what condition can a person be deprived of life according to Article 21?",
          optionA: "Never under any condition",
          optionB: "According to procedure established by law",
          optionC: "During emergency",
          optionD: "If convicted by court",
          correctAnswer: "B",
          explanation: "Article 21 states that no person shall be deprived of life except according to procedure established by law.",
          difficulty: "medium",
          category: "Judiciary"
        },
        {
          articleId: article19.id,
          question: "Which of the following is NOT covered under Article 19?",
          optionA: "Freedom of speech",
          optionB: "Right to move freely",
          optionC: "Right to practice any profession",
          optionD: "Right to property",
          correctAnswer: "D",
          explanation: "Right to property was originally a fundamental right but is now a legal right under Article 300A.",
          difficulty: "hard",
          category: "UPSC"
        }
      ]
    })

    // Create Amendments
    await db.amendment.createMany({
      data: [
        {
          number: 1,
          year: 1951,
          titleEn: "First Amendment Act",
          titleHi: "प्रथम संविधान संशोधन अधिनियम",
          titleTa: "முதல் அரசியலமைப்பு திருத்தச் சட்டம்",
          description: "Made changes to Fundamental Rights to allow land reform laws and placed reasonable restrictions on freedom of speech.",
          actName: "The Constitution (First Amendment) Act, 1951"
        },
        {
          number: 42,
          year: 1976,
          titleEn: "Forty-Second Amendment",
          titleHi: "बयालीसवां संविधान संशोधन",
          titleTa: "நாற்பத்தி இரண்டாவது அரசியலமைப்பு திருத்தம்",
          description: "Added words 'Socialist' and 'Secular' to the Preamble, and made changes to strengthen the central government.",
          actName: "The Constitution (Forty-Second Amendment) Act, 1976"
        }
      ]
    })

    // Create Case Laws
    await db.caseLaw.createMany({
      data: [
        {
          title: "Kesavananda Bharati v. State of Kerala",
          citation: "AIR 1973 SC 1461",
          court: "Supreme Court",
          year: 1973,
          summaryEn: "Landmark case that established the 'Basic Structure Doctrine' - Parliament cannot amend the basic structure of the Constitution.",
          summaryHi: "ऐतिहासिक मामला जिसने 'मूल संरचना सिद्धांत' स्थापित किया - संसद संविधान की मूल संरचना को संशोधित नहीं कर सकती।",
          summaryTa: "சட்டத்தின் அடிப்படை அமைப்புக் கோட்பாட்டை நிறுவிய முக்கிய வழக்கு - நாடாளுமன்றம் அரசியலமைப்பின் அடிப்படை அமைப்பைத் திருத்த முடியாது.",
          judgmentUrl: "https://judiciary.gov.in/judgments/kesavananda-bharati",
          landmark: true
        },
        {
          title: "Maneka Gandhi v. Union of India",
          citation: "AIR 1978 SC 597",
          court: "Supreme Court",
          year: 1978,
          summaryEn: "Expanded the scope of Article 21 and established that procedure established by law must be fair, just and reasonable.",
          summaryHi: "अनुच्छेद 21 के दायरे का विस्तार किया और स्थापित किया कि कानून द्वारा स्थापित प्रक्रिया निष्पक्ष, न्यायोचित और उचित होनी चाहिए।",
          summaryTa: "பிரிவு 21-ன் வரம்பை விரிவுபடுத்தியது மற்றும் சட்டத்தால் நிறுவப்பட்ட நடைமுறை நியாயமானது, நியாயமானது மற்றும் நியாயமானது என்பதை நிலைநிறுத்தியது.",
          judgmentUrl: "https://judiciary.gov.in/judgments/maneka-gandhi",
          landmark: true
        }
      ]
    })

    // Create App Settings
    await db.appSettings.createMany({
      data: [
        { key: "app_version", value: "1.0.0" },
        { key: "last_data_update", value: new Date().toISOString() },
        { key: "supported_languages", value: "en,hi,ta,te,bn,mr,gu,kn,ml,pa,as" },
        { key: "emergency_helpline", value: "100" },
        { key: "legal_aid_helpline", value: "1800-11-1320" }
      ]
    })

    console.log('Sample data seeded successfully!')
    return { success: true, message: 'Sample data created' }

  } catch (error) {
    console.error('Error seeding data:', error)
    return { success: false, error: error.message }
  }
}

// Export for use in API routes
export { seedSampleData }