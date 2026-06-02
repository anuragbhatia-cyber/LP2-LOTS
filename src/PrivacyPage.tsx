// Privacy Policy — verbatim content provided by client.
// Layout-only component: do not alter wording without explicit approval.

function navigate(path: string) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function PrivacyPage() {
  return (
    <div className="bg-[var(--color-cream)] text-stone-900 font-sans antialiased min-h-screen">
      <header className="sticky top-0 z-30 bg-[var(--color-cream)]/85 backdrop-blur-md border-b border-stone-200/70">
        <div className="mx-auto max-w-[920px] px-4 sm:px-8 lg:px-12 h-[64px] sm:h-[72px] flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigate('/') }}
            className="inline-flex items-center"
            aria-label="LOTS247 home"
          >
            <img src="/lots247-logo-dark.png" alt="LOTS247" className="h-9 w-auto" />
          </a>
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigate('/') }}
            className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-stone-700 hover:text-stone-900 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to home
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-[920px] px-4 sm:px-8 lg:px-12 py-12 lg:py-20">
        <h1
          className="font-serif-display font-medium text-stone-900 text-balance text-[2rem] sm:text-[2.5rem] lg:text-[3rem] leading-[1.05] tracking-[-0.02em]"
          style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
        >
          Privacy Policy
        </h1>
        <p className="mt-4 text-[15px] sm:text-[16px] leading-[1.6] text-stone-600 max-w-[640px]">
          LOTS 24*7
          <br />
          Roadside Legal Assistance Platform
          <br />
          Sproutech Solutions Private Limited
        </p>

        <div className="mt-10 rounded-2xl border border-stone-200 bg-white/60 px-5 sm:px-7 py-5 text-[13.5px] sm:text-[14px] leading-[1.7] text-stone-800 font-semibold">
          PLEASE READ THIS PRIVACY POLICY CAREFULLY BEFORE ACCESSING OR USING THE LOTS247 PLATFORM. BY SUBSCRIBING TO OR USING THIS PLATFORM, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO THE COLLECTION AND PROCESSING OF YOUR INFORMATION AS DESCRIBED IN THIS POLICY.
        </div>

        <Section number="1" title="About This Policy">
          <p>This Privacy Policy (&ldquo;Policy&rdquo;) sets out the manner in which Sproutech Solutions Private Limited, a company incorporated under the Companies Act, 2013, having its registered office at MGF Metropolis Mall, Ground Floor, UG-006, Mehrauli-Gurgaon Road, Sector 28, Gurugram, Haryana - 122002, operating under the brand LOTS 24*7 (&ldquo;LOTS247&rdquo;) (hereinafter referred to as the &ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), collects, uses, stores, and shares information obtained from subscribers, users, and other individuals in connection with the LOTS247 Platform and services.</p>
          <p>This Policy applies to all information collected through the LOTS247 web-based dashboard, mobile interface, APIs, and associated services (collectively, the &ldquo;Platform&rdquo;). It is to be read in conjunction with the Terms and Conditions published on the Platform. Capitalised terms not defined herein shall carry the meanings assigned to them in the Terms and Conditions.</p>
          <p>This Policy is published in compliance with applicable data protection laws of India, including but not limited to the Digital Personal Data Protection Act, 2023 and the rules made thereunder (collectively, &ldquo;Applicable Data Protection Law&rdquo;), as well as the Information Technology Act, 2000 and applicable rules. The Company reserves the right to update this Policy in line with amendments to Applicable Data Protection Law.</p>
        </Section>

        <Section number="2" title="Information We Collect">
          <p>In the course of providing services through the Platform, the Company collects and processes the following categories of information:</p>

          <SubHead>2.1&nbsp;&nbsp;Identity and Contact Information</SubHead>
          <Bullets>
            <li>Full legal name of the subscriber or authorised representative</li>
            <li>Registered mobile number used for account creation, verification, and service communication</li>
            <li>Entity name, registered address, and related business details for corporate subscribers</li>
            <li>Email address, where provided</li>
          </Bullets>

          <SubHead>2.2&nbsp;&nbsp;Vehicle and Regulatory Information</SubHead>
          <Bullets>
            <li>Vehicle registration number(s) as entered on the Dashboard</li>
            <li>Vehicle compliance data, registration details, and related information retrieved from government databases</li>
            <li>Traffic violation and challan records, compliance status, and vehicle reports</li>
            <li>Driving licence number and related regulatory information, where applicable</li>
          </Bullets>

          <SubHead>2.3&nbsp;&nbsp;Financial and Transaction Information</SubHead>
          <Bullets>
            <li>Subscription fee payment records and transaction history</li>
            <li>Wallet credit balance and utilisation records</li>
            <li>Challan payment records where credits are applied</li>
            <li>Tax and invoicing details as applicable</li>
          </Bullets>

          <SubHead>2.4&nbsp;&nbsp;Insurance-Related Information</SubHead>
          <Bullets>
            <li>Where insurance facilitation services are availed through the Platform, the Company may collect and transmit relevant personal information, including vehicle owner details, driver information, and related documents, to the empanelled insurance intermediary solely for the purpose of procuring, issuing, servicing, or administering insurance products requested by the subscriber.</li>
            <li>Upon such transmission, the insurance intermediary shall process such personal information in its own capacity and in accordance with its applicable legal and regulatory obligations. To the extent required under Applicable Data Protection Law, the insurance intermediary may act as an independent Data Fiduciary or Data Processor, as applicable, in respect of such information. The collection, use, storage, disclosure, retention, and protection of such information by the insurance intermediary shall be governed by its own privacy policy, terms, and regulatory obligations.</li>
            <li>The Company does not control the systems, security practices, or independent processing activities of the insurance intermediary and shall not be responsible for any act, omission, misuse, unauthorized disclosure, security incident, or other processing activity undertaken by the insurance intermediary beyond the Company&apos;s reasonable control, except to the extent required under applicable law.</li>
          </Bullets>

          <SubHead>2.5&nbsp;&nbsp;Usage and Technical Information</SubHead>
          <Bullets>
            <li>IP address, device identifiers, browser type, and operating system details</li>
            <li>Log data, session information, access timestamps, and navigation data</li>
            <li>API call records, usage patterns, and service request history</li>
            <li>Incident reports and communications submitted through the Platform</li>
          </Bullets>

          <SubHead>2.6&nbsp;&nbsp;Government Source Data</SubHead>
          <p>Data retrieved from government databases and systems - including challan records, vehicle registration details, and compliance information - is delivered to the Subscriber through the Platform in the form received from such sources, without modification by the Company. The Company acts solely as a technology intermediary in respect of such data and does not verify, authenticate, or warrant its accuracy or completeness.</p>
        </Section>

        <Section number="3" title="Consent and Lawful Basis for Processing">
          <p>The Company processes personal information on the basis of the consent provided by the subscriber at the time of registration, subscription, and where applicable, at the time of availing specific services on the Platform.</p>
          <p>Consent is sought in a clear and informed manner, limited to the purposes for which information is required. By subscribing to the Platform and accepting these terms, the subscriber provides consent to the collection and processing of information as described in this Policy.</p>
          <p>The Company may also process information to the extent permitted under applicable law without requiring separate consent, including for purposes of compliance with legal obligations, prevention of fraud, or enforcement of legal rights and claims.</p>
          <p>The subscriber may withdraw consent at any time by writing to the Grievance Officer at the contact details specified in Clause 9 of this Policy. Withdrawal of consent shall not affect the lawfulness of any processing carried out prior to such withdrawal, and may affect the Company&rsquo;s ability to continue providing certain services.</p>
        </Section>

        <Section number="4" title="Purposes of Processing">
          <p>Information collected through the Platform is used strictly for the purposes for which it is collected. The Company processes information for the following purposes:</p>
          <Bullets>
            <li>Creation, registration, verification, and management of the subscriber&rsquo;s account and dashboard</li>
            <li>Delivery of roadside legal assistance services, including legal facilitation, challan resolution, and RTO services</li>
            <li>Retrieval of vehicle data, challan records, and compliance information from government databases on the subscriber&rsquo;s behalf</li>
            <li>Processing and facilitation of challan settlement through the Platform</li>
            <li>Facilitation of insurance activation through the empanelled insurance intermediary</li>
            <li>Management of wallet and credits, processing of payments, and generation of invoices and tax documents</li>
            <li>Communication with subscribers including service notifications, operational updates, and responses to queries</li>
            <li>Compliance with obligations under applicable law, including regulatory and tax requirements</li>
            <li>Internal analytics and improvement of Platform functionality and service quality</li>
            <li>Prevention and detection of fraud, misuse, and unauthorised access</li>
            <li>Resolution of disputes and enforcement of the Company&rsquo;s rights</li>
          </Bullets>
        </Section>

        <Section number="5" title="Sharing and Disclosure of Information">
          <p>The Company does not sell, trade, or transfer personal information to third parties for commercial or marketing purposes. Information may be shared in the following circumstances:</p>

          <SubHead>5.1&nbsp;&nbsp;Government Authorities and Regulatory Bodies</SubHead>
          <p>Vehicle and subscriber information is transmitted to and retrieved from government databases and portals, including those operated by central and state transport authorities, as necessary for the delivery of challan resolution, RTO facilitation, and related services. Such transmission is inherent to the nature of the services subscribed for. The Company may also disclose information to law enforcement agencies, courts, tribunals, or government authorities where required under applicable law or by a competent order.</p>

          <SubHead>5.2&nbsp;&nbsp;Insurance Intermediary</SubHead>
          <p>Where insurance facilitation services are availed, the relevant subscriber information is transmitted to the empanelled insurance intermediary for the purpose of policy issuance. Once transmitted, the Company has no control over the processing of such information within the systems of the insurance intermediary, and the subscriber&rsquo;s data will be subject to the insurance intermediary&rsquo;s own policies and practices.</p>

          <SubHead>5.3&nbsp;&nbsp;Legal Counsel and Service Partners</SubHead>
          <p>Where legal facilitation services are availed, relevant incident details and contact information may be shared with the legal resource engaged for that purpose, to the extent strictly necessary for service delivery.</p>

          <SubHead>5.4&nbsp;&nbsp;Technology Service Providers</SubHead>
          <p>The Company requires such service providers to implement reasonable security safeguards and process personal data only in accordance with contractual obligations and applicable law. While the Company undertakes reasonable diligence in selecting and monitoring such service providers, the Company shall not be liable for losses arising solely from the independent acts or omissions of such service providers that are beyond the Company&apos;s reasonable control, except to the extent liability cannot be excluded under applicable law</p>

          <SubHead>5.5&nbsp;&nbsp;Business Restructuring</SubHead>
          <p>In the event of a merger, acquisition, restructuring, or sale involving the Company, information held by the Company may be transferred to the relevant successor or acquirer as part of the transaction, subject to equivalent data protection obligations being imposed on such successor.</p>
        </Section>

        <Section number="6" title="Data Retention">
          <p>The Company retains personal information for as long as is reasonably necessary to fulfil the purposes for which it was collected, to maintain the subscription relationship, and to comply with applicable legal, regulatory, tax, and audit obligations.</p>
          <p>Upon the conclusion of the subscription relationship and the fulfilment of all applicable retention requirements under law, the Company shall take reasonable steps to delete or anonymise personal information in its possession. Certain categories of information, including transaction records, invoicing data, and records related to legal proceedings or regulatory compliance, may be retained for longer periods as required by applicable law.</p>
          <p>Data generated through government source queries and government databases may be retained as part of the subscriber&rsquo;s service history for operational and audit purposes.</p>
        </Section>

        <Section number="7" title="Data Security">
          <p>The Company implements reasonable technical and organisational safeguards to protect personal information in its possession against unauthorised access, disclosure, alteration, or loss. Such measures are reviewed and updated periodically in line with evolving standards and the nature of the information handled.</p>
          <p>The subscriber is responsible for maintaining the confidentiality of its own dashboard login credentials. The Company shall not be liable for any unauthorised access resulting from the subscriber&rsquo;s failure to maintain the security of its credentials.</p>
          <p>The Company shall not be liable for any security incident arising within the systems of government databases, the insurance intermediary, payment processors, or any other third-party systems outside the Company&rsquo;s control.</p>
          <p>In the event the Company becomes aware of any security incident affecting personal information in its control, it shall endeavour to take such remedial steps as are reasonable in the circumstances and shall comply with its obligations under applicable data protection law with respect to such incidents, including notifying relevant authorities and affected parties to the extent required by law.</p>
        </Section>

        <Section number="8" title="Your Rights">
          <p>Subject to the provisions of applicable data protection law, individuals whose personal information is processed by the Company may exercise the following rights by submitting a written request to the Grievance Officer at the details set out in Clause 9:</p>

          <SubHead>8.1&nbsp;&nbsp;Right to Access</SubHead>
          <p>You may request a summary of the personal information being processed about you and information about how it has been used or shared.</p>

          <SubHead>8.2&nbsp;&nbsp;Right to Correction</SubHead>
          <p>You may request correction of inaccurate or incomplete personal information. Please note that certain information, including registered vehicle numbers and mobile numbers, may be subject to operational constraints on amendment as described in the Terms and Conditions.</p>

          <SubHead>8.3&nbsp;&nbsp;Right to Erasure</SubHead>
          <p>You may request deletion of personal information where it is no longer necessary for the purposes for which it was collected, subject to the Company&rsquo;s rights to retain information as required by applicable law, for the resolution of disputes, or for enforcement of its agreements.</p>

          <SubHead>8.4&nbsp;&nbsp;Right to Withdraw Consent</SubHead>
          <p>You may withdraw consent to processing at any time. Please note that withdrawal of consent may affect the Company&rsquo;s ability to continue providing certain services on the Platform, and shall not affect processing already carried out on the basis of consent prior to withdrawal.</p>

          <SubHead>8.5&nbsp;&nbsp;Right to Grievance Redressal</SubHead>
          <p>You have the right to raise grievances with the Company in respect of the handling of your personal information. The Company shall respond to grievances within a reasonable time and in accordance with applicable law. If a grievance cannot be resolved to your satisfaction through the Company&rsquo;s grievance mechanism, you may approach the relevant authority under applicable data protection law.</p>

          <SubHead>8.6&nbsp;&nbsp;Right to Nominate</SubHead>
          <p>You may nominate an individual to exercise your rights in the event of your death or incapacity, in the manner provided under applicable data protection law.</p>

          <SubHead>8.7&nbsp;&nbsp;Verification of Requests</SubHead>
          <p>To protect Personal Data from unauthorized access, disclosure, alteration, or misuse, the Company may require reasonable verification of the identity and authority of any individual submitting a request under this Policy prior to acting upon such request. The Company reserves the right to seek additional information, documentation, or authentication reasonably necessary to verify the identity of the requester or the validity of the request. The Company may decline or delay processing a request where it is unable to satisfactorily verify the identity or authority of the requester, or where such request is otherwise restricted or exempt under Applicable Data Protection Law.</p>
        </Section>

        <Section number="9" title="Data Breach Obligation">
          <p>In the event the Company becomes aware of a Personal Data Breach affecting Personal Data within its possession or control, the Company shall take reasonable and appropriate measures to investigate, contain, mitigate, and remediate the effects of such breach. The Company shall comply with all applicable obligations under Applicable Data Protection Law, including notifying the Data Protection Board of India, affected Data Principals, and any other competent authority, where such notification is required by law. The Company shall maintain reasonable records of such incidents and the corrective actions undertaken in response thereto.</p>
        </Section>

        <Section number="10" title="Grievance Officer">
          <p>In accordance with applicable data protection law, the Company has designated a Grievance Officer to address requests and complaints from individuals regarding the processing of their personal information.</p>
          <div className="mt-2 rounded-xl border border-stone-200 bg-white/60 px-5 py-5 text-[14px] leading-[1.75]">
            <p className="font-semibold text-stone-900">Grievance Officer</p>
            <p className="mt-1 text-stone-800">Deeksha Varshney</p>
            <p className="mt-1 text-stone-700">
              Email:{' '}
              <a href="mailto:deeksha.go@lawyered.in" className="text-emerald-700 hover:text-emerald-800 underline-offset-2 hover:underline">
                deeksha.go@lawyered.in
              </a>
            </p>
            <p className="mt-3 text-stone-700">
              Sproutech Solutions Private Limited (LOTS247)
              <br />
              MGF Metropolis Mall, Ground Floor, UG-006,
              <br />
              Mehrauli-Gurgaon Road, Sector 28, Gurugram, Haryana - 122002
            </p>
          </div>
          <p>The Company shall acknowledge grievances promptly and endeavour to resolve them within a reasonable period. Individuals who remain dissatisfied after the grievance redressal process may approach the appropriate authority under applicable law.</p>
        </Section>

        <Section number="10" title="Minors">
          <p>The Platform is intended for use by corporate entities and adult individuals above the age of eighteen (18) years. The Company does not knowingly collect personal information from minors. If the Company becomes aware that personal information of a minor has been collected, it shall take appropriate steps to delete such information in accordance with applicable law.</p>
        </Section>

        <Section number="11" title="Third-Party Links and Services">
          <p>The Platform may provide access to or links to third-party portals, government systems, or external resources. This Policy does not govern the practices of such third parties. The Company is not responsible for the data handling practices of any third-party services accessed through or in connection with the Platform.</p>
        </Section>

        <Section number="12" title="Amendments to This Policy">
          <p>The Company reserves the right to modify or update this Policy at any time, including in response to changes in applicable law, technology, or business operations. Material changes will be communicated to subscribers through email notification or a prominent notice on the Platform, with reasonable prior notice where practicable.</p>
          <p>Continued use of the Platform following the effective date of any amendment shall constitute acceptance of the revised Policy. Subscribers who do not agree with any amendment should discontinue use of the Platform and notify the Company accordingly.</p>
        </Section>

        <Section number="13" title="Governing Law and Jurisdiction">
          <p>This Policy shall be governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with this Policy shall be subject to the exclusive jurisdiction of the courts at New Delhi, India.</p>
        </Section>

        <div className="mt-16 pt-8 border-t border-stone-200">
          <p className="text-[12.5px] leading-[1.65] text-stone-500">
            Sproutech Solutions Private Limited (LOTS247)&nbsp;&nbsp;|&nbsp;&nbsp;MGF Metropolis Mall, Ground Floor, UG-006, Mehrauli-Gurgaon Road, Sector 28, Gurugram, Haryana - 122002
          </p>
        </div>
      </main>
    </div>
  )
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14 pt-10 border-t border-stone-200">
      <div className="flex items-baseline gap-4">
        <span className="font-mono-label text-[11px] text-stone-400 num-tabular shrink-0">
          {String(number).padStart(2, '0')}
        </span>
        <h2
          className="font-serif-display font-medium text-stone-900 text-[1.5rem] sm:text-[1.75rem] lg:text-[2rem] leading-[1.15] tracking-[-0.015em]"
          style={{ fontVariationSettings: '"opsz" 96, "SOFT" 35' }}
        >
          {title}
        </h2>
      </div>
      <div className="mt-6 space-y-4 text-[14px] sm:text-[15px] leading-[1.75] text-stone-700">
        {children}
      </div>
    </section>
  )
}

function SubHead({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-6 first:mt-0 text-[14.5px] sm:text-[15.5px] font-bold text-stone-900 tracking-tight">
      {children}
    </h3>
  )
}

function Bullets({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc pl-6 space-y-2 marker:text-stone-400">
      {children}
    </ul>
  )
}
