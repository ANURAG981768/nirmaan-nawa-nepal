import type { Locale } from "./org";

/**
 * Bilingual copy. English is the default; Nepali is a first-class
 * translation, not a machine pass — it uses the constitution's own
 * vocabulary (नागरिक चेतना, लोकतान्त्रिक अभ्यास, अध्ययन/अनुसन्धान)
 * so the site reads as though it came from the organisation itself.
 *
 * PLACEHOLDER RULE: where the organisation has not yet supplied real
 * material (people, past programmes, published papers), the copy says
 * so plainly. It does not invent achievements.
 */

const en = {
  htmlLang: "en",
  langName: "English",
  otherLangName: "नेपाली",

  nav: {
    about: "About",
    programs: "Programs",
    publications: "Publications",
    complaints: "Complaints",
    join: "Join",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
  },

  common: {
    readMore: "Read more",
    backHome: "Back to home",
    skip: "Skip to content",
    comingSoon: "Not published yet",
    clausePrefix: "Clause",
    required: "required",
    optional: "optional",
  },

  home: {
    metaTitle: "Nirman Nawa Nepal — Build New Nepal through civic action",
    metaDesc:
      "A registered, non-partisan civic organisation in Kathmandu. Research on law and governance, youth civic education, scrutiny of public policy, and a public complaints channel.",
    eyebrow: "Kathmandu · Established 2082 · Registration no. 34",
    titleNe: "निर्माण नव नेपाल",
    titleEn: "Build New Nepal through civic action.",
    lead: "A registered, non-partisan social organisation. We study how Nepal is governed, bring young citizens into democratic practice, and carry public complaints to the institutions that have to answer them.",
    ctaComplaint: "File a complaint",
    ctaJoin: "Become a member",

    sealTitle: "Registered organisation",
    facts: {
      regNo: "Registration",
      regWith: "Registered with",
      pan: "PAN",
      status: "Status",
      location: "Location",
      statusValue: "Non-profit, non-governmental",
    },

    purposeTag: "What we work on",
    purposeTitle: "Four commitments that guide everything we do.",
    purposeLead:
      "Not a mission statement drafted for a website — these are the commitments we registered and are held accountable for. Each one is work, not a slogan.",

    objectives: [
      {
        icon: "research",
        title: "Study, research and teaching",
        body: "Work across law, history, geopolitics and economics — and teaching what we learn, so the knowledge reaches the people it affects, not only the researchers.",
      },
      {
        icon: "youth",
        title: "Youth in democratic practice",
        body: "Bringing young people into civic consciousness, voter rights and the everyday practice of democracy.",
      },
      {
        icon: "scrutiny",
        title: "Scrutiny of government",
        body: "Investigation, analysis and commentary on government work, policy and rules — read through the public interest.",
      },
      {
        icon: "society",
        title: "Working for a stronger society",
        body: "Partnering with organisations that share our goals to strengthen communities — adding to good work already underway, never duplicating it.",
      },
    ],

    nonPartisanTag: "Why you can trust this",
    nonPartisanTitle: "No member of this organisation may belong to a political party.",
    nonPartisanBody:
      "That is not a promise — it is an eligibility condition in our own constitution, alongside the requirement that members have no conviction involving moral turpitude and no record of misusing public property. An organisation that scrutinises government has to be able to prove it is not working for one.",
    nonPartisanClause: "Written into our constitution",

    complaintTag: "Public accountability",
    complaintTitle: "Seen corruption, neglect, or a service that failed you? Report it.",
    complaintBody:
      "You don't need your name, and you don't need proof — just tell us what happened. We record every report and carry it to the office that has to answer for it. Speaking up is where accountability begins.",
    complaintCta: "File a complaint",
    complaintTrack: "Check a complaint",
    complaintFull: "Read the full guidance and your rights",
    reportWhatTag: "What you can report",
    complaintExamples: [
      "Corruption or misuse of public money",
      "A public office that ignored, delayed, or mistreated you",
      "A local service that failed — roads, water, waste, electricity",
      "Feedback on our own work",
    ],

    workTag: "Our work",
    workTitle: "What the organisation does.",
    workCta: "See all programs",

    pubTag: "Publications",
    pubTitle: "Articles, research papers and civic briefings.",
    pubCta: "See all publications",

    joinTag: "Get involved",
    joinTitle: "Membership is open to any Nepali citizen over eighteen.",
    joinBody:
      "Membership is open to any Nepali citizen over eighteen who is not affiliated with a political party. The tiers and conditions are set by our constitution, not by us.",
    joinCta: "Apply for membership",
    joinVolunteer: "Volunteer instead",
  },

  about: {
    metaTitle: "About — Nirman Nawa Nepal",
    metaDesc:
      "Who we are, what our constitution requires of us, how we are governed, and the registration details that make us verifiable.",
    tag: "About",
    title: "A civic organisation that can be checked.",
    lead: "Nirman Nawa Nepal is a registered, non-partisan social organisation based in Kathmandu, established in 2082 BS under the Association Registration Act, 2034. We study how Nepal is governed, bring young citizens into democratic practice, and carry public concerns to the institutions responsible for them.",

    storyTag: "Why we exist",
    storyTitle: "Civic knowledge, held by the people it affects.",
    storyBody: [
      "Decisions about law, budgets, land and services are made continuously, and most of them are legible only to the people who already work inside the system. That gap is not an accident of complexity — it is what allows poor decisions to go unchallenged.",
      "We work on the gap from three sides at once: we research how things actually work, we teach young citizens how to take part, and we publish analysis of what the government is doing. Alongside that, we take complaints from the public and follow them.",
      "The organisation is young. What we can show today is a registered legal footing, a constitution that binds us, and an open door. What we do with it will be published here as it happens.",
    ],

    govTag: "Governance",
    govTitle: "How decisions get made.",
    govLead:
      "The General Assembly is the supreme body. It approves the budget, receives the audit report, and elects the Working Committee. Below is the structure our constitution requires.",
    govItems: [
      {
        clause: "11",
        title: "General Assembly",
        body: "The supreme body of the organisation. Meets annually within two months of the close of the financial year. A quarter of the members can compel a special assembly at seven days' notice.",
      },
      {
        clause: "13",
        title: "Working Committee — 11 members",
        body: "Nine officers elected by the General Assembly, plus two members nominated by the elected chairperson: Chairperson, Vice-chairperson, Secretary, Treasurer, and five members.",
      },
      {
        clause: "13(b)",
        title: "Two-year terms",
        body: "The Working Committee serves a fixed two-year term. Meetings need 51% of officers present, and decisions carry on a two-thirds majority.",
      },
      {
        clause: "18",
        title: "Quorum of 67%",
        body: "The General Assembly cannot transact business without 67% of members present. If an assembly fails for want of quorum, the reconvened assembly proceeds at 51%.",
      },
    ],

    moneyTag: "Money",
    moneyTitle: "Where funds come from, and the limits on them.",
    moneyLead:
      "Our constitution lists exactly which sources the organisation's fund may draw on, and requires an annual audit presented to the General Assembly.",
    moneyItems: [
      "Membership entry fees, annual fees and renewal charges",
      "Voluntary donations from individuals or organisations",
      "Grants and support from associations and institutions",
      "Support from local government bodies",
      "Proceeds from programmes and events run for our objectives",
    ],
    moneyForeign:
      "Foreign funding is not at our discretion. Under Section 16 of the Social Welfare Act 2049, any financial support from a foreign organisation or individual requires the prior approval of the Social Welfare Council.",
    moneyAudit:
      "The Treasurer keeps accounts under Nepal's prevailing financial law, arranges an annual audit, and cannot release funds without the Chairperson's written order.",

    teamTag: "Working Committee",
    teamTitle: "The people responsible.",
    teamPending:
      "Officer names and photographs will be published here once the Working Committee is seated and its details are confirmed. We would rather leave this section visibly empty than fill it with names we have not verified.",

    docsTag: "Questions & concerns",
    docsTitle: "Have a question, or something you want to raise?",
    docsBody:
      "Ask us anything about our work, our governance, or how we handle a concern — we would rather answer plainly than have you wonder. If you have a public issue to report, the complaint channel gives you a tracking code.",
    docsCta: "Ask a question",
    docsReport: "Report an issue",
  },

  programs: {
    metaTitle: "Programs — Nirman Nawa Nepal",
    metaDesc:
      "Civic education, research and study circles, policy analysis, community issue documentation, and institutional collaboration.",
    tag: "Programs",
    title: "The work, and where it stands.",
    lead: "Each of these areas is authorised by our constitution. We have marked honestly which are running and which are still being set up, because an organisation that publishes analysis of other people's claims should be careful with its own.",
    statusRunning: "Running",
    statusSetup: "Being set up",
    items: [
      {
        title: "Civic awareness sessions",
        body: "Sessions with young people on voter rights, how local government actually works, and what a citizen can require of a public office.",
        clause: "4(b)",
      },
      {
        title: "Research and study circles",
        body: "Small, regular reading and research groups on law, history, geopolitics and economics — the base that the published work comes out of.",
        clause: "4(a)",
      },
      {
        title: "Policy analysis and commentary",
        body: "Written analysis of government decisions, rules and budgets, in plain language, aimed at people the decision affects rather than at specialists.",
        clause: "4(c)",
      },
      {
        title: "Community issue documentation",
        body: "Recording problems raised through our complaints channel, establishing the facts, and following them with the responsible office.",
        clause: "4(c)",
      },
      {
        title: "Institutional collaboration",
        body: "Joint programmes with organisations working toward the same objectives, so effort is added rather than duplicated.",
        clause: "4(d)",
      },
      {
        title: "Membership and volunteer engagement",
        body: "Bringing in members and volunteers, and giving them real work rather than a certificate.",
        clause: "6",
      },
    ],
    proposeTag: "Propose something",
    proposeTitle: "If you are working on the same thing, tell us.",
    proposeBody:
      "We would rather join an effort that already exists than start a parallel one. If your organisation is working on civic education, governance research or public accountability in Kathmandu, get in touch.",
  },

  publications: {
    metaTitle: "Publications — Nirman Nawa Nepal",
    metaDesc:
      "Articles, research papers and civic briefings on law, governance, policy and public accountability in Nepal.",
    tag: "Publications",
    title: "Articles, research papers and briefings.",
    lead: "We publish three kinds of work. Everything here is written to be read by the people a decision affects, not only by people who already work in policy.",
    kinds: [
      {
        kind: "Article",
        title: "Civic briefings",
        body: "Plain-language explainers on citizen rights, public institutions, voting, and how to actually use a public service or make a complaint stick.",
      },
      {
        kind: "Research paper",
        title: "Policy and governance research",
        body: "Longer, evidence-led studies on law, history, geopolitics and the economy, with sources listed so the argument can be checked.",
      },
      {
        kind: "Analysis",
        title: "Government accountability notes",
        body: "Short pieces examining a specific government decision, rule or budget line, and what it means for the people it lands on.",
      },
    ],
    emptyTag: "Published work",
    emptyTitle: "Nothing published yet.",
    emptyBody:
      "The first briefings and research notes are being written now. When they are published they will appear here with their date and author. We are not going to fill this page with borrowed content to look established.",
    emptyCta: "Get told when we publish",
    submitTag: "Contribute",
    submitTitle: "Writing on any of this? Send it.",
    submitBody:
      "We accept submissions from students, researchers and practitioners. Send a draft or an outline by email — tell us what you are arguing and what your evidence is.",
    submitCta: "Send a submission",
  },

  complaints: {
    metaTitle: "File a complaint — Nirman Nawa Nepal",
    metaDesc:
      "Report a civic or public service problem in Kathmandu. Anonymous submissions accepted. Every complaint gets a reference code you can track.",
    tag: "Public complaints",
    title: "Report a problem.",
    lead: "Use this for civic issues, public service failures, community problems, or feedback on our own programmes. You do not have to give your name.",

    noticeTitle: "Read this before you write",
    noticePoints: [
      "You can file anonymously. Leave the contact fields empty and we will have no way to identify you.",
      "You will get a reference code. Save it — it is the only way to check your complaint later, and we cannot recover it for you.",
      "We are not a government body and have no legal enforcement power. What we can do is document an issue, publish analysis, and take it to the office responsible.",
      "In an emergency, or where someone is in immediate danger, contact the police (100) or the relevant authority directly. Do not wait for us.",
    ],

    form: {
      categoryLabel: "What is this about?",
      categories: {
        service: "Public service or local government",
        governance: "Governance, policy or a rule",
        community: "A community problem",
        programme: "Feedback on our own work",
        other: "Something else",
      },
      subjectLabel: "Subject",
      subjectPlaceholder: "One line describing the problem",
      locationLabel: "Where is this happening?",
      locationPlaceholder: "Ward, tole, municipality — as specific as you can",
      descLabel: "Describe the problem",
      descPlaceholder:
        "What happened, when, who is affected, and what you have already tried. The more specific you are, the more we can do.",
      descHint: "Please include dates and places if you know them.",
      filesLabel: "Add a photo or video",
      filesHint:
        "Attach evidence — a photo or a short video. Sent straight to the organisation. Up to 18 MB in total.",

      identityLabel: "Your details",
      identityHint:
        "All three fields below are optional. Fill them in only if you want us to be able to reach you about this complaint.",
      nameLabel: "Your name",
      namePlaceholder: "Leave blank to stay anonymous",
      emailLabel: "Email",
      phoneLabel: "Phone",

      consentLabel:
        "You may contact the responsible office about this, referring to the issue but not to me by name.",

      submit: "File complaint",
      submitting: "Filing…",
    },

    successTag: "Complaint filed",
    successTitle: "Save this reference code.",
    successBody:
      "This is the only record you will get. We cannot look it up for you by name, especially if you filed anonymously.",
    successNext: "What happens now",
    successSteps: [
      "We read every complaint. Serious or repeated issues get documented and followed with the office responsible.",
      "If you left contact details, we will use them only about this complaint.",
      "Check the status any time using your reference code.",
    ],
    successTrack: "Check this complaint",
    successAnother: "File another complaint",

    trackTag: "Check a complaint",
    trackTitle: "Look up a complaint by reference code.",
    trackLead:
      "Enter the code you were given when you filed. Codes look like NNN-2082-04F7A1.",
    trackLabel: "Reference code",
    trackSubmit: "Check status",
    trackChecking: "Checking…",
    trackNotFound:
      "No complaint found with that code. Check the code and try again — it is case-insensitive but every character matters.",
    trackFiled: "Filed",
    trackStatus: "Status",
    trackCategory: "Category",
    trackNote: "Note from the organisation",
    statuses: {
      received: "Received",
      reviewing: "Under review",
      forwarded: "Forwarded to the responsible office",
      resolved: "Resolved",
      closed: "Closed",
    },

    errors: {
      subject: "Please give the complaint a subject.",
      description: "Please describe the problem — at least a couple of sentences.",
      generic:
        "The complaint could not be filed. Please try again in a moment, or email us directly.",
      code: "Enter a reference code.",
    },
  },

  join: {
    metaTitle: "Join — Nirman Nawa Nepal",
    metaDesc:
      "Membership, volunteering and partnership with Nirman Nawa Nepal. Membership tiers and eligibility are set by our constitution.",
    tag: "Get involved",
    title: "Ask us something, or join us.",
    lead: "One form for all of it. Ask a question, apply for membership, offer to volunteer, or propose a partnership — say which below and it reaches the right person.",

    tiersTag: "Membership",
    tiersTitle: "Three ways to be a member.",
    tiersLead:
      "The tiers and their conditions are set by our constitution, not by whoever is in charge. Apply below — the Working Committee reviews every application and will tell you what comes next. Please don't send anything with the form.",
    tiers: [
      {
        name: "General member",
        note: "Open to any Nepali citizen over eighteen",
        body: "Full membership with a vote in the General Assembly, renewed each year.",
        clause: "10(a)",
      },
      {
        name: "Life member",
        note: "A one-time commitment, no renewal",
        body: "The same standing in the General Assembly as a general member, for life.",
        clause: "10(c)",
      },
      {
        name: "Honorary member",
        note: "Granted by the Assembly",
        body: "For people who have made a distinguished contribution to social work. Honorary members are invited to the Assembly, and do not vote.",
        clause: "10(d)",
      },
    ],

    eligibilityTag: "Eligibility",
    eligibilityTitle: "Who can be a member.",
    eligibilityLead:
      "These conditions are set by our constitution. The political-party condition is what lets us scrutinise government credibly.",
    eligibility: [
      "A Nepali citizen",
      "Eighteen years of age or older",
      "Of sound mind",
      "No record of misusing public property",
      "No conviction for corruption or an offence involving moral turpitude",
      "Not a member of any political party",
      "Genuinely interested in social work",
    ],

    formTag: "Get in touch",
    formTitle: "Send it here.",
    formLead:
      "Questions are answered by whoever handles that area. A membership application is an expression of interest, not automatic membership — the Working Committee decides, and if it declines our constitution requires it to tell you why.",
    form: {
      intentLabel: "What is this about?",
      intents: {
        inquiry: "I have a question",
        general: "General membership",
        life: "Life membership",
        volunteer: "Volunteering — no membership needed",
        partner: "Partnership — I represent an organisation",
      },
      subjectLabel: "Your question",
      subjectPlaceholder: "A line or two — what do you want to know?",
      nameLabel: "Full name",
      emailLabel: "Email",
      phoneLabel: "Phone",
      addressLabel: "Where you live",
      addressPlaceholder: "Municipality and ward",
      orgLabel: "Organisation",
      orgPlaceholder: "The organisation you represent",
      interestLabel: "What do you want to work on?",
      interestPlaceholder:
        "Research, civic education, policy analysis, documentation, events, communications — and anything you already know how to do.",
      declarationLabel:
        "I meet the membership conditions, including that I am not a member of any political party.",
      submit: "Send",
      submitting: "Sending…",
    },
    successTag: "Sent",
    successTitle: "We have it.",
    successBody:
      "We will reply at the details you gave. If this was a membership application, the Working Committee reviews it — and if it declines, our constitution requires it to tell you why.",
    errors: {
      name: "Please give your name.",
      contact: "Please give an email or a phone number so we can reply.",
      declaration:
        "Please confirm you meet the membership conditions.",
      generic:
        "The application could not be sent. Please try again, or email us directly.",
    },
  },

  contact: {
    metaTitle: "Contact — Nirman Nawa Nepal",
    metaDesc:
      "Reach Nirman Nawa Nepal in Kathmandu. Phone, email, social media, and a message form for questions, membership and partnership.",
    tag: "Contact",
    title: "Get in touch.",
    lead: "For membership, partnership, document requests, or press. If you are reporting a problem, the complaints form gives you a tracking code — use that instead.",
    officeTag: "Office",
    officeTitle: "Where we are",
    emailTag: "Email",
    phoneTag: "Phone",
    followTitle: "Follow",
    followBody: "Updates, work and notices on Facebook, Instagram and TikTok.",
    hoursNote:
      "We are a volunteer-run organisation. Email usually gets a faster reply than a phone call.",
    complaintPrompt: "Reporting a problem?",
    complaintPromptBody:
      "Use the complaints form instead — it gives you a reference code so you can follow what happened.",
    complaintPromptCta: "File a complaint",
    formTag: "Enquiries",
    formTitle: "Send us a message.",
  },

  footer: {
    tagline: "Build New Nepal through civic action.",
    followTitle: "Follow",
    exploreTitle: "Site",
    contactTitle: "Contact",
    registeredTitle: "Registered",
    registeredLine: "Registered under the Association Registration Act, 2034",
    rights: "Nirman Nawa Nepal",
    nonProfit: "Non-profit · Non-partisan · Kathmandu",
  },

  notFound: {
    title: "That page does not exist.",
    body: "The link may be old, or mistyped. Everything on the site is reachable from the home page.",
  },
};

export type Copy = typeof en;

const ne: Copy = {
  htmlLang: "ne",
  langName: "नेपाली",
  otherLangName: "English",

  nav: {
    about: "हाम्रोबारे",
    programs: "कार्यक्रम",
    publications: "प्रकाशन",
    complaints: "गुनासो",
    join: "सदस्यता",
    contact: "सम्पर्क",
    menu: "मेनु",
    close: "बन्द",
  },

  common: {
    readMore: "थप पढ्नुहोस्",
    backHome: "गृहपृष्ठमा फर्कनुहोस्",
    skip: "मुख्य सामग्रीमा जानुहोस्",
    comingSoon: "अझै प्रकाशित छैन",
    clausePrefix: "दफा",
    required: "अनिवार्य",
    optional: "ऐच्छिक",
  },

  home: {
    metaTitle: "निर्माण नव नेपाल — नागरिक कर्मबाट नयाँ नेपाल",
    metaDesc:
      "काठमाडौंमा दर्ता भएको गैरदलीय सामाजिक संस्था। कानून र शासन व्यवस्थामा अनुसन्धान, युवा नागरिक शिक्षा, सार्वजनिक नीतिको विश्लेषण, र नागरिक गुनासोको माध्यम।",
    eyebrow: "काठमाडौं · स्थापना २०८२ · दर्ता नं. ३४",
    titleNe: "निर्माण नव नेपाल",
    titleEn: "नागरिक कर्मबाट नयाँ नेपाल।",
    lead: "दर्ता भएको, गैरदलीय सामाजिक संस्था। नेपाल कसरी सञ्चालित छ भन्ने अध्ययन गर्छौं, युवा नागरिकलाई लोकतान्त्रिक अभ्यासमा सहभागी गराउँछौं, र सार्वजनिक गुनासो जवाफ दिनुपर्ने निकायसम्म पुर्‍याउँछौं।",
    ctaComplaint: "गुनासो दर्ता गर्नुहोस्",
    ctaJoin: "सदस्य बन्नुहोस्",

    sealTitle: "दर्ता भएको संस्था",
    facts: {
      regNo: "दर्ता नं.",
      regWith: "दर्ता गर्ने निकाय",
      pan: "स्थायी लेखा नं.",
      status: "स्वरूप",
      location: "स्थान",
      statusValue: "मुनाफारहित, गैरसरकारी",
    },

    purposeTag: "हामी केमा काम गर्छौं",
    purposeTitle: "हाम्रो हरेक कामलाई डोर्‍याउने चार प्रतिबद्धता।",
    purposeLead:
      "वेबसाइटका लागि लेखिएका वाक्य होइनन् — यी हामीले दर्ता गरेका र जवाफदेही हुनुपर्ने प्रतिबद्धता हुन्। हरेक नारा होइन, काम हो।",

    objectives: [
      {
        icon: "research",
        title: "अध्ययन, अनुसन्धान र अध्यापन",
        body: "कानून, इतिहास, भू-राजनीति र अर्थतन्त्रमा अध्ययन र अनुसन्धान — र सिकेको कुरा अध्यापन गर्ने, ताकि ज्ञान अनुसन्धानकर्तासँगै नअड्कियोस्।",
      },
      {
        icon: "youth",
        title: "लोकतान्त्रिक अभ्यासमा युवा",
        body: "युवामा नागरिक चेतना, मतदाता अधिकार र दैनिक लोकतान्त्रिक अभ्यास बढाउने कार्यक्रमहरू।",
      },
      {
        icon: "scrutiny",
        title: "सरकारी कामको अनुगमन",
        body: "सरकारी कार्य, नीति र नियममाथि अन्वेषण, विश्लेषण र टिप्पणी — सार्वजनिक हितको दृष्टिकोणबाट।",
      },
      {
        icon: "society",
        title: "समाजको उत्थानका लागि काम",
        body: "साझा उद्देश्य भएका संस्थासँग मिलेर समुदाय सुदृढ बनाउने — भइरहेको असल कामलाई थप्ने, दोहोर्‍याउने होइन।",
      },
    ],

    nonPartisanTag: "किन विश्वास गर्ने",
    nonPartisanTitle: "यस संस्थाको कुनै पनि सदस्य राजनीतिक दलको सदस्य हुन पाउँदैन।",
    nonPartisanBody:
      "यो हाम्रो वाचा होइन — विधानमै लेखिएको सदस्यताको सर्त हो। सँगै नैतिक पतन देखिने फौजदारी अभियोगमा सजाय नपाएको र सार्वजनिक सम्पत्ति हिनामिना नगरेको हुनुपर्ने सर्त पनि छ। सरकारी कामको अनुगमन गर्ने संस्थाले आफू कुनै दलका लागि काम गरिरहेको छैन भन्ने प्रमाणित गर्न सक्नुपर्छ।",
    nonPartisanClause: "विधानमै लेखिएको",

    complaintTag: "सार्वजनिक जवाफदेहिता",
    complaintTitle: "भ्रष्टाचार, लापरबाही, वा तपाईंलाई असर गरेको सेवा — सुनाउनुहोस्।",
    complaintBody:
      "नाम चाहिँदैन, प्रमाण पनि चाहिँदैन — के भयो, त्यति भन्नुहोस्। हामी हरेक गुनासो अभिलेख गरी जवाफ दिनुपर्ने कार्यालयसम्म पुर्‍याउँछौं। बोल्नु नै जवाफदेहिताको सुरुवात हो।",
    complaintCta: "गुनासो दर्ता गर्नुहोस्",
    complaintTrack: "गुनासोको अवस्था हेर्नुहोस्",
    complaintFull: "पूर्ण मार्गदर्शन र तपाईंका अधिकार पढ्नुहोस्",
    reportWhatTag: "के-के सुनाउन सकिन्छ",
    complaintExamples: [
      "भ्रष्टाचार वा सार्वजनिक रकमको दुरुपयोग",
      "बेवास्ता गर्ने, ढिलाइ गर्ने वा दुर्व्यवहार गर्ने सार्वजनिक कार्यालय",
      "बिग्रिएको स्थानीय सेवा — सडक, खानेपानी, फोहोर, बिजुली",
      "हाम्रै कामबारे प्रतिक्रिया",
    ],

    workTag: "हाम्रो काम",
    workTitle: "संस्थाले के गर्छ।",
    workCta: "सबै कार्यक्रम हेर्नुहोस्",

    pubTag: "प्रकाशन",
    pubTitle: "लेख, अनुसन्धान पत्र र नागरिक ब्रिफिङ।",
    pubCta: "सबै प्रकाशन हेर्नुहोस्",

    joinTag: "सहभागी हुनुहोस्",
    joinTitle: "अठार वर्ष पुगेका जुनसुकै नेपाली नागरिक सदस्य बन्न सक्नुहुन्छ।",
    joinBody:
      "अठार वर्ष पुगेका, कुनै राजनीतिक दलमा आबद्ध नरहेका जुनसुकै नेपाली नागरिक सदस्य बन्न सक्नुहुन्छ। सदस्यताका तह र सर्त विधानले तोकेका हुन्, हामीले होइन।",
    joinCta: "सदस्यताका लागि आवेदन",
    joinVolunteer: "स्वयंसेवक बन्नुहोस्",
  },

  about: {
    metaTitle: "हाम्रोबारे — निर्माण नव नेपाल",
    metaDesc:
      "हामी को हौं, विधानले हामीबाट के माग गर्छ, संस्था कसरी सञ्चालित छ, र हामीलाई प्रमाणित गर्न सकिने दर्ता विवरण।",
    tag: "हाम्रोबारे",
    title: "जाँच्न सकिने नागरिक संस्था।",
    lead: "निर्माण नव नेपाल काठमाडौंमा आधारित दर्ता भएको, गैरदलीय सामाजिक संस्था हो, जुन संस्था दर्ता ऐन, २०३४ अन्तर्गत २०८२ सालमा स्थापना भएको हो। नेपाल कसरी सञ्चालित छ भन्ने अध्ययन गर्छौं, युवा नागरिकलाई लोकतान्त्रिक अभ्यासमा सहभागी गराउँछौं, र सार्वजनिक सरोकार जिम्मेवार निकायसम्म पुर्‍याउँछौं।",

    storyTag: "किन आवश्यक",
    storyTitle: "नागरिक ज्ञान, त्यसले असर पार्ने मानिससँगै।",
    storyBody: [
      "कानून, बजेट, जग्गा र सेवाबारे निर्णय निरन्तर भइरहन्छन्, तर धेरैजसो निर्णय प्रणालीभित्रै काम गर्नेलाई मात्र बुझिने हुन्छन्। यो दूरी जटिलताको संयोग होइन — यही दूरीले नै कमजोर निर्णयलाई प्रश्न नसोधी जान दिन्छ।",
      "हामी यो दूरीमा तीन तिरबाट काम गर्छौं: कुरा वास्तवमा कसरी चल्छ भन्ने अनुसन्धान गर्छौं, युवा नागरिकलाई सहभागी हुन सिकाउँछौं, र सरकारले के गरिरहेको छ भन्ने विश्लेषण प्रकाशित गर्छौं। सँगै नागरिकबाट गुनासो लिन्छौं र त्यसको पछि लाग्छौं।",
      "संस्था नयाँ हो। आज हामीसँग देखाउन सक्ने कुरा हो — दर्ता भएको कानुनी आधार, हामीलाई बाँध्ने विधान, र खुला ढोका। यसबाट के गर्छौं भन्ने कुरा भइसकेपछि यहीँ प्रकाशित हुनेछ।",
    ],

    govTag: "सञ्चालन प्रणाली",
    govTitle: "निर्णय कसरी हुन्छ।",
    govLead:
      "साधारण सभा संस्थाको सर्वोच्च निकाय हो। यसले बजेट पारित गर्छ, लेखापरीक्षण प्रतिवेदन स्वीकृत गर्छ, र कार्य समिति निर्वाचित गर्छ। तल विधानले तोकेको संरचना छ।",
    govItems: [
      {
        clause: "११",
        title: "साधारण सभा",
        body: "संस्थाको सर्वोच्च निकाय। आर्थिक वर्ष समाप्त भएको दुई महिनाभित्र वार्षिक सभा बस्छ। कुल सदस्यको एक चौथाइले कारण खुलाई माग गरे सात दिनभित्र विशेष सभा बोलाउनुपर्छ।",
      },
      {
        clause: "१३",
        title: "कार्य समिति — ११ सदस्य",
        body: "साधारण सभाबाट निर्वाचित नौ पदाधिकारी, र निर्वाचित अध्यक्षद्वारा मनोनीत दुई सदस्य: अध्यक्ष, उपाध्यक्ष, सचिव, कोषाध्यक्ष र पाँच सदस्य।",
      },
      {
        clause: "१३(ख)",
        title: "दुई वर्षे कार्यकाल",
        body: "कार्य समितिको कार्यकाल दुई वर्षको हुन्छ। बैठकका लागि ५१% पदाधिकारीको उपस्थिति चाहिन्छ, र निर्णय दुई तिहाइ बहुमतले हुन्छ।",
      },
      {
        clause: "१८",
        title: "६७% गणपूरक संख्या",
        body: "कुल सदस्यको ६७% उपस्थित नभई साधारण सभाको कारबाही हुँदैन। गणपूरक नपुगी सभा नभएमा पुनः बोलाइएको सभा ५१% उपस्थितिमा हुन सक्छ।",
      },
    ],

    moneyTag: "आर्थिक व्यवस्था",
    moneyTitle: "कोष कहाँबाट आउँछ, र त्यसका सीमा।",
    moneyLead:
      "विधानले संस्थाको कोषमा कुन-कुन स्रोतबाट रकम जम्मा हुन सक्छ भन्ने स्पष्ट तोकेको छ, र वार्षिक लेखापरीक्षण गराई साधारण सभामा पेस गर्नुपर्ने व्यवस्था छ।",
    moneyItems: [
      "सदस्यता प्रवेश शुल्क, वार्षिक शुल्क र थप दस्तुर",
      "व्यक्ति वा संस्थाले स्वेच्छाले दिएको अनुदान र सहयोग",
      "संघ संस्थाबाट प्राप्त सहयोग र अनुदान",
      "स्थानीय निकायबाट प्राप्त सहयोग र अनुदान",
      "उद्देश्यअनुरूप आयोजित समारोह र कार्यक्रमबाट प्राप्त रकम",
    ],
    moneyForeign:
      "विदेशी सहयोग हाम्रो स्वेच्छामा छैन। समाज कल्याण ऐन २०४९ को दफा १६ बमोजिम विदेशी संघ संस्था वा व्यक्तिबाट आर्थिक सहयोग लिनुपरे समाज कल्याण परिषद्को पूर्व स्वीकृति अनिवार्य छ।",
    moneyAudit:
      "कोषाध्यक्षले नेपाल सरकारको प्रचलित आर्थिक ऐन अनुसार लेखा दुरुस्त राख्छन्, नियमित वार्षिक लेखापरीक्षण गराउँछन्, र अध्यक्षको आदेशविना रकम निकासा गर्न पाउँदैनन्।",

    teamTag: "कार्य समिति",
    teamTitle: "जिम्मेवार व्यक्तिहरू।",
    teamPending:
      "कार्य समिति गठन भई विवरण पुष्टि भएपछि पदाधिकारीको नाम र तस्बिर यहाँ प्रकाशित हुनेछ। पुष्टि नभएका नाम राख्नुभन्दा यो ठाउँ खुलै राख्नु उचित ठान्यौं।",

    docsTag: "प्रश्न र सरोकार",
    docsTitle: "कुनै प्रश्न छ, वा केही उठाउन चाहनुहुन्छ?",
    docsBody:
      "हाम्रो काम, सञ्चालन, वा कुनै सरोकार कसरी सम्बोधन गर्छौं — जेसुकै सोध्नुहोस्। तपाईंलाई अन्योलमा राख्नुभन्दा प्रस्ट जवाफ दिन रुचाउँछौं। सार्वजनिक समस्या सुनाउने हो भने गुनासो माध्यमले सन्दर्भ नम्बर दिन्छ।",
    docsCta: "प्रश्न सोध्नुहोस्",
    docsReport: "समस्या सुनाउनुहोस्",
  },

  programs: {
    metaTitle: "कार्यक्रम — निर्माण नव नेपाल",
    metaDesc:
      "नागरिक शिक्षा, अनुसन्धान र अध्ययन समूह, नीति विश्लेषण, सामुदायिक समस्याको अभिलेखीकरण, र संस्थागत सहकार्य।",
    tag: "कार्यक्रम",
    title: "काम, र त्यसको अहिलेको अवस्था।",
    lead: "यी हरेक क्षेत्र विधानले अधिकार दिएका हुन्। कुन चलिरहेको छ र कुन तयारीमा छ भन्ने इमानदारीपूर्वक छुट्याएका छौं — अरूको दाबीको विश्लेषण प्रकाशित गर्ने संस्था आफ्नै दाबीमा सतर्क हुनुपर्छ।",
    statusRunning: "सञ्चालनमा",
    statusSetup: "तयारीमा",
    items: [
      {
        title: "नागरिक चेतना सत्र",
        body: "युवासँग मतदाता अधिकार, स्थानीय सरकार वास्तवमा कसरी चल्छ, र नागरिकले सार्वजनिक कार्यालयबाट के माग्न सक्छन् भन्ने विषयमा सत्र।",
        clause: "४(ख)",
      },
      {
        title: "अनुसन्धान र अध्ययन समूह",
        body: "कानून, इतिहास, भू-राजनीति र अर्थतन्त्रमा नियमित सानो अध्ययन तथा अनुसन्धान समूह — प्रकाशित काम यसैबाट निस्कन्छ।",
        clause: "४(क)",
      },
      {
        title: "नीति विश्लेषण र टिप्पणी",
        body: "सरकारी निर्णय, नियम र बजेटको सरल भाषामा लिखित विश्लेषण — विज्ञका लागि होइन, त्यो निर्णयले असर पार्ने मानिसका लागि।",
        clause: "४(ग)",
      },
      {
        title: "सामुदायिक समस्याको अभिलेखीकरण",
        body: "गुनासो माध्यमबाट आएका समस्या अभिलेख गर्ने, तथ्य पुष्टि गर्ने, र जिम्मेवार कार्यालयसँग त्यसको पछि लाग्ने।",
        clause: "४(ग)",
      },
      {
        title: "संस्थागत सहकार्य",
        body: "उही उद्देश्यमा काम गर्ने संस्थासँग संयुक्त कार्यक्रम, ताकि प्रयास दोहोरिनुको साटो थपियोस्।",
        clause: "४(घ)",
      },
      {
        title: "सदस्यता र स्वयंसेवक परिचालन",
        body: "सदस्य र स्वयंसेवक भित्र्याउने, र उनीहरूलाई प्रमाणपत्र होइन साँच्चै काम दिने।",
        clause: "६",
      },
    ],
    proposeTag: "प्रस्ताव राख्नुहोस्",
    proposeTitle: "तपाईं पनि यही काम गर्दै हुनुहुन्छ भने भन्नुहोस्।",
    proposeBody:
      "समानान्तर प्रयास सुरु गर्नुभन्दा पहिलेदेखि चलिरहेको प्रयासमा सामेल हुन चाहन्छौं। तपाईंको संस्था काठमाडौंमा नागरिक शिक्षा, शासन अनुसन्धान वा सार्वजनिक जवाफदेहितामा काम गर्दैछ भने सम्पर्क गर्नुहोस्।",
  },

  publications: {
    metaTitle: "प्रकाशन — निर्माण नव नेपाल",
    metaDesc:
      "नेपालको कानून, शासन, नीति र सार्वजनिक जवाफदेहिताबारे लेख, अनुसन्धान पत्र र नागरिक ब्रिफिङ।",
    tag: "प्रकाशन",
    title: "लेख, अनुसन्धान पत्र र ब्रिफिङ।",
    lead: "हामी तीन किसिमको सामग्री प्रकाशित गर्छौं। यहाँका सबै सामग्री नीति क्षेत्रमै काम गर्नेका लागि मात्र होइन, निर्णयले असर पार्ने मानिसले पढ्न सकून् भनेर लेखिएका छन्।",
    kinds: [
      {
        kind: "लेख",
        title: "नागरिक ब्रिफिङ",
        body: "नागरिक अधिकार, सार्वजनिक निकाय, मतदान, र सार्वजनिक सेवा कसरी प्रयोग गर्ने वा गुनासो कसरी टिकाउने भन्ने सरल भाषाका व्याख्या।",
      },
      {
        kind: "अनुसन्धान पत्र",
        title: "नीति र शासन अनुसन्धान",
        body: "कानून, इतिहास, भू-राजनीति र अर्थतन्त्रमा लामो, प्रमाणमा आधारित अध्ययन — तर्क जाँच्न सकियोस् भनेर स्रोत उल्लेख गरिएका।",
      },
      {
        kind: "विश्लेषण",
        title: "सरकारी जवाफदेहिता टिप्पणी",
        body: "कुनै निश्चित सरकारी निर्णय, नियम वा बजेट शीर्षकको छोटो विश्लेषण, र त्यसले जसमाथि पर्छ उनीहरूका लागि त्यसको अर्थ।",
      },
    ],
    emptyTag: "प्रकाशित सामग्री",
    emptyTitle: "अझै केही प्रकाशित छैन।",
    emptyBody:
      "पहिलो ब्रिफिङ र अनुसन्धान टिप्पणी अहिले लेखिँदैछन्। प्रकाशित भएपछि मिति र लेखकसहित यहीँ देखिनेछन्। स्थापित देखिनका लागि अरूको सामग्रीले यो पृष्ठ भर्ने छैनौं।",
    emptyCta: "प्रकाशित हुँदा जानकारी पाउनुहोस्",
    submitTag: "योगदान",
    submitTitle: "यी विषयमा लेख्दै हुनुहुन्छ? पठाउनुहोस्।",
    submitBody:
      "विद्यार्थी, अनुसन्धानकर्ता र क्षेत्रमा काम गर्नेबाट सामग्री स्वीकार गर्छौं। मस्यौदा वा खाका इमेल गर्नुहोस् — के तर्क गर्दै हुनुहुन्छ र प्रमाण के हो, खुलाउनुहोस्।",
    submitCta: "सामग्री पठाउनुहोस्",
  },

  complaints: {
    metaTitle: "गुनासो दर्ता — निर्माण नव नेपाल",
    metaDesc:
      "काठमाडौंमा नागरिक वा सार्वजनिक सेवासम्बन्धी समस्या सुनाउनुहोस्। नाम नदिई पनि दर्ता गर्न सकिन्छ। हरेक गुनासोको सन्दर्भ नम्बर पाइन्छ।",
    tag: "सार्वजनिक गुनासो",
    title: "समस्या सुनाउनुहोस्।",
    lead: "नागरिक समस्या, सार्वजनिक सेवामा भएको कमजोरी, सामुदायिक समस्या, वा हाम्रै कार्यक्रमबारे प्रतिक्रियाका लागि यो प्रयोग गर्नुहोस्। नाम दिनु अनिवार्य छैन।",

    noticeTitle: "लेख्नुअघि यो पढ्नुहोस्",
    noticePoints: [
      "नाम नदिई दर्ता गर्न सकिन्छ। सम्पर्क विवरण खाली छोड्नुभयो भने हामीसँग तपाईंलाई चिन्ने कुनै उपाय हुँदैन।",
      "तपाईंले सन्दर्भ नम्बर पाउनुहुनेछ। सुरक्षित राख्नुहोस् — पछि गुनासोको अवस्था हेर्ने एउटै उपाय यही हो, र हामीले तपाईंका लागि यो फेला पार्न सक्दैनौं।",
      "हामी सरकारी निकाय होइनौं र हामीसँग कानुनी कारबाहीको अधिकार छैन। हामीले गर्न सक्ने कुरा हो — समस्या अभिलेख गर्ने, विश्लेषण प्रकाशित गर्ने, र जिम्मेवार कार्यालयसम्म पुर्‍याउने।",
      "आपत्कालीन अवस्थामा वा कसैको ज्यानै जोखिममा छ भने प्रहरी (१००) वा सम्बन्धित निकायलाई सीधै सम्पर्क गर्नुहोस्। हाम्रो प्रतीक्षा नगर्नुहोस्।",
    ],

    form: {
      categoryLabel: "यो केसँग सम्बन्धित छ?",
      categories: {
        service: "सार्वजनिक सेवा वा स्थानीय सरकार",
        governance: "शासन, नीति वा नियम",
        community: "सामुदायिक समस्या",
        programme: "हाम्रै कामबारे प्रतिक्रिया",
        other: "अन्य",
      },
      subjectLabel: "विषय",
      subjectPlaceholder: "समस्या बताउने एक हरफ",
      locationLabel: "यो कहाँ भइरहेको छ?",
      locationPlaceholder: "वडा, टोल, नगरपालिका — सकेसम्म स्पष्ट",
      descLabel: "समस्याको विवरण",
      descPlaceholder:
        "के भयो, कहिले भयो, कसलाई असर परेको छ, र तपाईंले पहिले के प्रयास गर्नुभयो। जति स्पष्ट लेख्नुहुन्छ, हामीले त्यति धेरै गर्न सक्छौं।",
      descHint: "थाहा भएसम्म मिति र स्थान उल्लेख गर्नुहोस्।",
      filesLabel: "फोटो वा भिडियो थप्नुहोस्",
      filesHint:
        "प्रमाण संलग्न गर्नुहोस् — फोटो वा छोटो भिडियो। सिधै संस्थामा पठाइन्छ। कुल १८ MB सम्म।",

      identityLabel: "तपाईंको विवरण",
      identityHint:
        "तलका तीनै महल ऐच्छिक हुन्। यस गुनासोबारे हामीले तपाईंलाई सम्पर्क गरेको चाहनुहुन्छ भने मात्र भर्नुहोस्।",
      nameLabel: "तपाईंको नाम",
      namePlaceholder: "नाम गोप्य राख्न खाली छोड्नुहोस्",
      emailLabel: "इमेल",
      phoneLabel: "फोन",

      consentLabel:
        "यस विषयमा जिम्मेवार कार्यालयसँग कुरा गर्न सक्नुहुन्छ, तर मेरो नाम उल्लेख नगरी।",

      submit: "गुनासो दर्ता गर्नुहोस्",
      submitting: "दर्ता हुँदैछ…",
    },

    successTag: "गुनासो दर्ता भयो",
    successTitle: "यो सन्दर्भ नम्बर सुरक्षित राख्नुहोस्।",
    successBody:
      "तपाईंले पाउने एउटै अभिलेख यही हो। विशेषगरी नाम नदिई दर्ता गर्नुभएको छ भने हामीले नामबाट खोजी दिन सक्दैनौं।",
    successNext: "अब के हुन्छ",
    successSteps: [
      "हामी हरेक गुनासो पढ्छौं। गम्भीर वा दोहोरिएका समस्या अभिलेख गरी जिम्मेवार कार्यालयसँग पछ्याइन्छ।",
      "सम्पर्क विवरण दिनुभएको छ भने त्यो यही गुनासोका लागि मात्र प्रयोग हुनेछ।",
      "सन्दर्भ नम्बरबाट जुनसुकै बेला अवस्था हेर्न सक्नुहुन्छ।",
    ],
    successTrack: "यो गुनासो हेर्नुहोस्",
    successAnother: "अर्को गुनासो दर्ता गर्नुहोस्",

    trackTag: "गुनासो हेर्नुहोस्",
    trackTitle: "सन्दर्भ नम्बरबाट गुनासो खोज्नुहोस्।",
    trackLead:
      "दर्ता गर्दा पाएको नम्बर हाल्नुहोस्। नम्बर NNN-2082-04F7A1 जस्तो देखिन्छ।",
    trackLabel: "सन्दर्भ नम्बर",
    trackSubmit: "अवस्था हेर्नुहोस्",
    trackChecking: "हेर्दैछ…",
    trackNotFound:
      "यो नम्बरको गुनासो फेला परेन। नम्बर जाँचेर फेरि प्रयास गर्नुहोस् — ठूलो-सानो अक्षरले फरक पार्दैन, तर हरेक अक्षर मिल्नुपर्छ।",
    trackFiled: "दर्ता मिति",
    trackStatus: "अवस्था",
    trackCategory: "वर्ग",
    trackNote: "संस्थाको टिप्पणी",
    statuses: {
      received: "प्राप्त भयो",
      reviewing: "अध्ययनमा",
      forwarded: "जिम्मेवार कार्यालयमा पठाइयो",
      resolved: "समाधान भयो",
      closed: "बन्द गरियो",
    },

    errors: {
      subject: "कृपया गुनासोको विषय लेख्नुहोस्।",
      description: "कृपया समस्याको विवरण लेख्नुहोस् — कम्तीमा दुई-तीन वाक्य।",
      generic:
        "गुनासो दर्ता हुन सकेन। कृपया केही बेरमा फेरि प्रयास गर्नुहोस्, वा सीधै इमेल गर्नुहोस्।",
      code: "सन्दर्भ नम्बर हाल्नुहोस्।",
    },
  },

  join: {
    metaTitle: "सदस्यता — निर्माण नव नेपाल",
    metaDesc:
      "निर्माण नव नेपालको सदस्यता, स्वयंसेवा र साझेदारी। सदस्यताका तह र योग्यता विधानले तोकेका छन्।",
    tag: "सहभागी हुनुहोस्",
    title: "केही सोध्नुहोस्, वा सँगै जुट्नुहोस्।",
    lead: "सबैका लागि एउटै फारम। प्रश्न सोध्नुहोस्, सदस्यताका लागि आवेदन दिनुहोस्, स्वयंसेवाको प्रस्ताव राख्नुहोस्, वा साझेदारीको कुरा गर्नुहोस् — तल छान्नुहोस्, सम्बन्धित व्यक्तिसम्म पुग्छ।",

    tiersTag: "सदस्यता",
    tiersTitle: "सदस्य बन्ने तीन तह।",
    tiersLead:
      "सदस्यताका तह र सर्त विधानले तोकेका हुन्, नेतृत्वमा जो भए पनि फेरिँदैनन्। तल आवेदन दिनुहोस् — कार्य समितिले हरेक आवेदन हेर्छ र अबको प्रक्रिया के हो भनी जानकारी दिनेछ। फारमसँगै केही नपठाउनुहोस्।",
    tiers: [
      {
        name: "साधारण सदस्य",
        note: "अठार वर्ष पुगेका जुनसुकै नेपाली नागरिकका लागि खुला",
        body: "साधारण सभामा मताधिकारसहितको पूर्ण सदस्यता, प्रत्येक वर्ष नवीकरण हुने।",
        clause: "१०(क)",
      },
      {
        name: "आजीवन सदस्य",
        note: "एकपटकको, नवीकरण नचाहिने",
        body: "साधारण सभामा साधारण सदस्यसरहकै हैसियत, जीवनभरका लागि।",
        clause: "१०(ग)",
      },
      {
        name: "मानार्थ सदस्य",
        note: "साधारण सभाको निर्णयबाट प्रदान हुने",
        body: "सामाजिक क्षेत्रमा विशिष्ट योगदान पुर्‍याएका व्यक्तिलाई प्रदान गरिन्छ। मानार्थ सदस्य सभामा आमन्त्रित हुन्छन्, र मताधिकार हुँदैन।",
        clause: "१०(घ)",
      },
    ],

    eligibilityTag: "योग्यता",
    eligibilityTitle: "को सदस्य बन्न सक्छ।",
    eligibilityLead:
      "यी सर्त विधानले तोकेका हुन्। राजनीतिक दलसम्बन्धी सर्तले नै हामीलाई सरकारी कामको अनुगमन विश्वसनीय ढंगले गर्न दिन्छ।",
    eligibility: [
      "नेपाली नागरिक",
      "अठार वर्ष उमेर पुगेको",
      "मानसिक सन्तुलन ठीक भएको",
      "सार्वजनिक सम्पत्ति हिनामिना नगरेको",
      "भ्रष्टाचार वा नैतिक पतन देखिने अभियोगमा सजाय नपाएको",
      "कुनै पनि राजनीतिक पार्टीको सदस्य नरहेको",
      "सामाजिक कार्यमा साँच्चै अभिरुचि भएको",
    ],

    formTag: "सम्पर्क गर्नुहोस्",
    formTitle: "यहीं पठाउनुहोस्।",
    formLead:
      "प्रश्नको जवाफ सम्बन्धित क्षेत्र हेर्ने व्यक्तिले दिनेछन्। सदस्यताको आवेदन इच्छा व्यक्त गर्ने माध्यम हो, स्वतः सदस्यता होइन — कार्य समितिले निर्णय गर्छ, र अस्वीकार गरेमा कारण बताउनुपर्ने व्यवस्था विधानमै छ।",
    form: {
      intentLabel: "यो केसँग सम्बन्धित छ?",
      intents: {
        inquiry: "मेरो प्रश्न छ",
        general: "साधारण सदस्यता",
        life: "आजीवन सदस्यता",
        volunteer: "स्वयंसेवा — सदस्यता चाहिँदैन",
        partner: "साझेदारी — म संस्थाको प्रतिनिधि हुँ",
      },
      subjectLabel: "तपाईंको प्रश्न",
      subjectPlaceholder: "एक-दुई हरफ — तपाईं के जान्न चाहनुहुन्छ?",
      nameLabel: "पूरा नाम",
      emailLabel: "इमेल",
      phoneLabel: "फोन",
      addressLabel: "बसोबास",
      addressPlaceholder: "नगरपालिका र वडा",
      orgLabel: "संस्था",
      orgPlaceholder: "तपाईंले प्रतिनिधित्व गर्ने संस्था",
      interestLabel: "तपाईं केमा काम गर्न चाहनुहुन्छ?",
      interestPlaceholder:
        "अनुसन्धान, नागरिक शिक्षा, नीति विश्लेषण, अभिलेखीकरण, कार्यक्रम, सञ्चार — र तपाईंलाई पहिले नै आउने कुनै सीप।",
      declarationLabel:
        "म सदस्यताका सर्त पूरा गर्छु, कुनै पनि राजनीतिक दलको सदस्य नरहेको समेत।",
      submit: "पठाउनुहोस्",
      submitting: "पठाउँदै…",
    },
    successTag: "पठाइयो",
    successTitle: "हामीले पायौं।",
    successBody:
      "तपाईंले दिनुभएको विवरणमा हामी जवाफ दिनेछौं। यो सदस्यताको आवेदन हो भने कार्य समितिले हेर्छ — अस्वीकार गरेमा कारण बताउनुपर्ने व्यवस्था विधानमै छ।",
    errors: {
      name: "कृपया आफ्नो नाम लेख्नुहोस्।",
      contact: "जवाफ दिन सकियोस् भनेर इमेल वा फोन नम्बर दिनुहोस्।",
      declaration: "कृपया सदस्यताका सर्त पूरा गरेको पुष्टि गर्नुहोस्।",
      generic:
        "आवेदन पठाउन सकिएन। कृपया फेरि प्रयास गर्नुहोस्, वा सीधै इमेल गर्नुहोस्।",
    },
  },

  contact: {
    metaTitle: "सम्पर्क — निर्माण नव नेपाल",
    metaDesc:
      "काठमाडौंमा रहेको निर्माण नव नेपालसँग सम्पर्क। फोन, इमेल, सामाजिक सञ्जाल, र प्रश्न, सदस्यता तथा साझेदारीका लागि सन्देश फारम।",
    tag: "सम्पर्क",
    title: "सम्पर्क गर्नुहोस्।",
    lead: "सदस्यता, साझेदारी, कागजात माग वा सञ्चारमाध्यमका लागि। समस्या सुनाउन खोज्नुभएको हो भने गुनासो फारमले सन्दर्भ नम्बर दिन्छ — त्यही प्रयोग गर्नुहोस्।",
    officeTag: "कार्यालय",
    officeTitle: "हामी कहाँ छौं",
    emailTag: "इमेल",
    phoneTag: "फोन",
    followTitle: "फलो गर्नुहोस्",
    followBody: "फेसबुक, इन्स्टाग्राम र टिकटकमा हाम्रा काम, अपडेट र सूचना।",
    hoursNote:
      "हामी स्वयंसेवामा आधारित संस्था हौं। फोनभन्दा इमेलमा प्रायः छिटो जवाफ पाइन्छ।",
    complaintPrompt: "समस्या सुनाउन खोज्नुभएको हो?",
    complaintPromptBody:
      "बरु गुनासो फारम प्रयोग गर्नुहोस् — त्यसले सन्दर्भ नम्बर दिन्छ, जसबाट के भयो भनेर पछ्याउन सकिन्छ।",
    complaintPromptCta: "गुनासो दर्ता गर्नुहोस्",
    formTag: "जिज्ञासा",
    formTitle: "हामीलाई सन्देश पठाउनुहोस्।",
  },

  footer: {
    tagline: "नागरिक कर्मबाट नयाँ नेपाल।",
    followTitle: "फलो गर्नुहोस्",
    exploreTitle: "साइट",
    contactTitle: "सम्पर्क",
    registeredTitle: "दर्ता",
    registeredLine: "संस्था दर्ता ऐन, २०३४ अन्तर्गत दर्ता",
    rights: "निर्माण नव नेपाल",
    nonProfit: "मुनाफारहित · गैरदलीय · काठमाडौं",
  },

  notFound: {
    title: "यो पृष्ठ छैन।",
    body: "लिंक पुरानो भएको वा गलत टाइप भएको हुन सक्छ। साइटका सबै पृष्ठ गृहपृष्ठबाट पुग्न सकिन्छ।",
  },
};

export const content: Record<Locale, Copy> = { en, ne };

export function getCopy(locale: Locale): Copy {
  return content[locale] ?? content.en;
}
