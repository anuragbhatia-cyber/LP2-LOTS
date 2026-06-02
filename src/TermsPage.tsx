// Terms & Conditions — verbatim content provided by client.
// Layout-only component: do not alter wording without explicit approval.

function navigate(path: string) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function TermsPage() {
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
          Terms and Conditions
        </h1>
        <p className="mt-4 text-[15px] sm:text-[16px] leading-[1.6] text-stone-600 max-w-[640px]">
          LOTS 24*7 Roadside Legal Assistance Platform
          <br />
          Sproutech Solutions Private Limited (operating as LOTS247)
        </p>

        <div className="mt-10 prose-terms space-y-5 text-[14px] sm:text-[15px] leading-[1.75] text-stone-700">
          <p>
            These Terms and Conditions (&ldquo;Terms&rdquo;) constitute a legally binding agreement between Sproutech Solutions Private Limited, a company incorporated under the Companies Act, 2013, having its registered office at MGF Metropolis Mall, Ground Floor, UG-006, Mehrauli-Gurgaon Road, Sector 28, Gurugram, Haryana 122002, operating the platform under the brand name &ldquo;LOTS247&rdquo; (hereinafter referred to as the &ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;), and the subscriber entity that has accepted these Terms (hereinafter referred to as the &ldquo;Subscriber&rdquo; or &ldquo;you&rdquo;). Together the Company and the Subscriber shall be referred to as the &ldquo;Parties&rdquo; and individually as a &ldquo;Party&rdquo;.
          </p>
          <p>
            By subscribing to any Subscription Plan offered on the LOTS247 platform, or by accessing or using the Dashboard or any service thereunder, the Subscriber unconditionally agrees to be bound by these Terms and by such other policies, guidelines, and annexures as the Company may publish or communicate from time to time, which shall form an integral part of these Terms. If the Subscriber does not agree with any of these Terms, the Subscriber must immediately discontinue access and use of the platform and services.
          </p>
        </div>

        <Section number="1" title="Definitions and Interpretation">
          <p>
            1.1&nbsp;&nbsp;In these Terms, unless the context otherwise requires, the following expressions shall have the meanings assigned to them below:
          </p>
          <DefList>
            <Def term="Activation">means the successful enrollment of a vehicle under a Subscription Plan following verification of required details and receipt of the applicable Subscription Fee by the Company.</Def>
            <Def term="Applicable Law">means all statutes, regulations, rules, orders, notifications, circulars, guidelines, and directions issued by any competent governmental or regulatory authority in India as in force from time to time, including but not limited to the Information Technology Act, 2000, the Digital Personal Data Protection Act, 2023, the Indian Contract Act, 1872, the Motor Vehicles Act, 1988, the Advocates Act, 1961, and the Consumer Protection Act, 2019.</Def>
            <Def term="Challan">means any traffic violation notice, fine, or penalty issued by a Regional Transport Office, traffic police authority, or any other competent transport authority in India under the Motor Vehicles Act, 1988 or applicable traffic regulations.</Def>
            <Def term="Challan Resolution Services">means services provided through the Platform for facilitating discovery, submission, tracking, and settlement of Challans, subject to the limitations set out in these Terms.</Def>
            <Def term="Company">means Sproutech Solutions Private Limited, operating under the brand LOTS247.</Def>
            <Def term="Credit">means a prepaid unit of value loaded into the Subscriber&apos;s Wallet upon purchase of an applicable Subscription Plan, where one (1) Credit is equivalent to Indian Rupee one (1) (INR 1), which is deductible upon each Successful API Hit in respect of challan-related services and may be applied towards payment of Challans, subject to these Terms.</Def>
            <Def term="Dashboard">means the mobile-responsive, web-based interface provided by the Company to the Subscriber for accessing and managing RSLA Services, vehicle details, Wallet, Challan data, incident reporting, and other features as made available by the Company from time to time.</Def>
            <Def term="Force Majeure Event">means any event beyond the reasonable control of a Party, including but not limited to acts of God, natural disasters, pandemic, epidemic, governmental actions or orders, failure of third-party telecommunications networks, internet infrastructure outages, downtime of Government Source APIs, power failures, labour unrest, cyberattacks, or any other event that was not foreseeable and could not have been prevented by reasonable precaution.</Def>
            <Def term="Government Source">means any database, repository, system, or application programming interface operated by any central or state government authority in India, including but not limited to the Ministry of Road Transport and Highways, National Informatics Centre, or any Regional Transport Office, from which the Company fetches Challan and vehicle data on behalf of the Subscriber.</Def>
            <Def term="Government Source Data">means data retrieved from Government Sources including Challan records, vehicle registration details, compliance status, and driving licence information, which the Company delivers to the Subscriber through the Platform in its original form without modification or authentication.</Def>
            <Def term="Insurance Aggregator">means the third-party insurance intermediary empanelled by the Company to facilitate insurance activation services for Subscribers.</Def>
            <Def term="Legal Counsel&rdquo; or &ldquo;Lawyer">means any advocate, legal representative, legal resource, or legal panel member engaged or facilitated by the Company through the Platform to provide on-call legal guidance or on-the-spot legal representation to the Subscriber.</Def>
            <Def term="RSLA Services&rdquo; or &ldquo;Roadside Legal Assistance Services">means the suite of legal facilitation and assistance services offered through the Platform including but not limited to On-Call Legal Resolution, On-the-Spot Legal Representation, Challan Resolution Services, and RTO Services.</Def>
            <Def term="RTO Services">means facilitation services in connection with Regional Transport Office procedures and compliance.</Def>
            <Def term="Scheduled Maintenance">means planned maintenance activities conducted by the Company on the Platform, notified to Subscribers with advance notice as provided under these Terms.</Def>
            <Def term="Subscription Fee">means the consideration paid or payable by the Subscriber for subscribing to a Subscription Plan.</Def>
            <Def term="Subscription Plan">means any subscription tier or product offering made available by the Company on the Platform from time to time, under such names and commercial terms as the Company may determine and communicate at its sole discretion, as further described in Clause 3.</Def>
            <Def term="Subscription Term">means the duration of the Subscriber&apos;s active subscription, commencing from the date of Activation and continuing for the period specified at the time of subscription.</Def>
            <Def term="Successful API Hit">means each individual, confirmed, and successful API request made to a Government Source through the Platform that returns a valid response with data, excluding failed requests, error responses, timeouts, or unsuccessful queries not attributable to any act or omission on the part of the Company.</Def>
            <Def term="Wallet">means the prepaid credit-based account maintained within the Subscriber&apos;s Dashboard, reflecting Credits available for use.</Def>
          </DefList>
          <p>
            1.2&nbsp;&nbsp;References to statutes and regulations shall include their amendments and re-enactments. Singular includes plural and vice versa. Headings are for convenience only and shall not affect interpretation.
          </p>
        </Section>

        <Section number="2" title="Eligibility and Capacity">
          <p>2.1&nbsp;&nbsp;These Terms govern use of the Platform on a business-to-business (B2B) basis. The Subscriber must be a legal entity duly incorporated or registered under applicable Indian law, or an individual who is at least eighteen (18) years of age and is otherwise legally competent to enter into a binding contract under the Indian Contract Act, 1872.</p>
          <p>2.2&nbsp;&nbsp;By subscribing, the Subscriber represents and warrants that: (a) it has the full legal capacity, power, and authority to execute and be bound by these Terms; (b) the execution and performance of these Terms do not conflict with any Applicable Law, court order, or third-party agreement binding upon the Subscriber; and (c) all information provided to the Company during registration and subscription is true, complete, and accurate.</p>
          <p>2.3&nbsp;&nbsp;The Company reserves the right to refuse subscription, suspend access, or terminate services in the event the Subscriber is found to be ineligible or in breach of this Clause 2.</p>
        </Section>

        <Section number="3" title="Subscription Plans and Products">
          <SubHead>3.1&nbsp;&nbsp;Subscription Plans Offered by the Company</SubHead>
          <p>The Company offers and shall continue to offer various Subscription Plans through the Platform, each carrying such name, product description, vehicle coverage limits, service scope, credit entitlement, and Subscription Fee as the Company shall determine and communicate to the Subscriber at the time of subscription. The details of each Subscription Plan, including its features, benefits, coverage, and commercial terms, shall be as described in the product communication, subscription confirmation, or such other documentation as the Company makes available to the Subscriber at the relevant time. The Subscriber acknowledges that the specific features, pricing, and commercial terms applicable to a Subscription Plan are those communicated to the Subscriber at the time of subscription, and not otherwise.</p>

          <SubHead>3.2&nbsp;&nbsp;Nature of Subscription</SubHead>
          <p>Each Subscription Plan grants the Subscriber a limited, non-exclusive, non-transferable, non-sublicensable right to access and use the Platform and the RSLA Services described therein, strictly for the Subscriber&apos;s own internal business operations during the Subscription Term. No title or ownership in any intellectual property of the Company is transferred to the Subscriber by reason of any subscription.</p>

          <SubHead>3.3&nbsp;&nbsp;Non-Transferability</SubHead>
          <p>Subscriptions are strictly personal to the Subscriber and are not transferable or assignable to any other entity or person under any circumstances whatsoever. Any purported transfer or assignment of a Subscription shall be null and void and shall entitle the Company to immediately terminate the Subscription without refund.</p>

          <SubHead>3.4&nbsp;&nbsp;Company&apos;s Right to Modify, Suspend, or Discontinue Plans</SubHead>
          <p>The Company reserves the sole and absolute right, at its discretion and without any obligation to assign reasons, to: (a) introduce new Subscription Plans; (b) modify the features, benefits, pricing, service scope, or commercial terms of any Subscription Plan; (c) temporarily suspend availability of any Subscription Plan for new subscriptions; or (d) permanently discontinue any Subscription Plan for future subscriptions, at any time, with or without prior notice to prospective subscribers, and with such prior notice to existing subscribers as the Company deems reasonable.</p>
          <p>Notwithstanding the foregoing, a Subscriber who has already subscribed to and paid for a Subscription Plan prior to such modification or discontinuation shall continue to receive the services under the terms of such Subscription Plan until the expiry of the then-current Subscription Term for which payment has been duly received by the Company. The Company shall not be liable to the Subscriber for any loss, inconvenience, or claim arising from the modification or discontinuation of a Subscription Plan that does not affect the Subscriber&apos;s then-active, paid Subscription Term.</p>

          <SubHead>3.5&nbsp;&nbsp;Pricing</SubHead>
          <p>Subscription Fees are as communicated to the Subscriber at the time of subscription and as published on the Platform from time to time. Prices are subject to revision by the Company at any time without prior notice, save that any revised pricing shall apply only from the next renewal or new subscription and shall not affect the Subscriber&apos;s ongoing paid Subscription Term. All amounts are exclusive of Goods and Services Tax (GST) and any other applicable taxes, which shall be charged additionally as per Applicable Law. The Company makes no representation as to the continued availability of any pricing tier.</p>
        </Section>

        <Section number="4" title="Registration, Dashboard, and Account Responsibilities">
          <SubHead>4.1&nbsp;&nbsp;Dashboard Access</SubHead>
          <p>Upon subscription, the Subscriber shall be provided access to a mobile-friendly, web-based Dashboard through which the Subscriber may access and manage RSLA Services, register vehicles, check Challan status, manage the Wallet, report incidents, and use other available features as made available by the Company from time to time.</p>

          <SubHead>4.2&nbsp;&nbsp;Registration of Vehicle Number</SubHead>
          <p>The Subscriber shall register the vehicle registration number(s) on the Dashboard in accordance with the vehicle limits applicable to the Subscriber&apos;s Subscription Plan. The Subscriber is solely responsible for ensuring that vehicle registration numbers entered on the Dashboard are accurate, correct, and complete. Once a vehicle registration number has been entered and saved on the Dashboard, it cannot be changed, edited, corrected, or substituted under any circumstances and at any time during the Subscription Term. The Company shall have no obligation to alter any vehicle registration number once submitted. The Company shall not be liable for any loss, damage, failure of service, or inconvenience arising from incorrect, incomplete, or erroneous vehicle registration numbers entered by the Subscriber, and the Subscriber shall bear sole and absolute responsibility for such errors.</p>

          <SubHead>4.3&nbsp;&nbsp;Registration of Mobile Number</SubHead>
          <p>The Subscriber is required to register a valid mobile number during account creation, which is used for communications, service delivery, and verification purposes. Once registered, the mobile number cannot be edited, changed, or updated at any time, including during the Subscription Term. The Subscriber is solely responsible for ensuring that a correct and active mobile number is provided at the time of registration. The Company shall bear no responsibility or liability for any failure in service delivery, communication breakdown, or consequential loss arising from the Subscriber&apos;s provision of an incorrect or inactive mobile number.</p>

          <SubHead>4.4&nbsp;&nbsp;Account Security</SubHead>
          <p>The Subscriber shall be solely responsible for maintaining the confidentiality and security of its Dashboard login credentials. Any activity conducted through the Subscriber&apos;s Dashboard credentials shall be deemed to have been carried out by the Subscriber, and the Subscriber shall be solely accountable for such activity. The Subscriber shall immediately notify the Company in writing upon becoming aware of any unauthorised access to or use of its account.</p>

          <SubHead>4.5&nbsp;&nbsp;Accurate Information</SubHead>
          <p>The Subscriber shall at all times provide true, complete, and accurate information on the Dashboard. The Company relies entirely on the information furnished by the Subscriber for delivery of RSLA Services. The Company shall not be liable for any deficiency, delay, interruption, or failure in service delivery arising from inaccurate, incomplete, or incorrect information provided by the Subscriber.</p>
        </Section>

        <Section number="5" title="Wallet, Credits, and Challan Payment">
          <SubHead>5.1&nbsp;&nbsp;Credits</SubHead>
          <p>Upon purchase of an applicable Subscription Plan, Credits may be loaded into the Subscriber&apos;s Wallet as specified in the relevant Subscription Plan details. One (1) Credit is equivalent to Indian Rupee one (1) (INR 1). Credits represent prepaid value usable exclusively within the LOTS247 Platform for the purposes described in these Terms.</p>

          <SubHead>5.2&nbsp;&nbsp;Deduction on Challan Check</SubHead>
          <p>Each time the Subscriber initiates a challan check through the Dashboard, two (2) Credits shall be automatically deducted from the Subscriber&apos;s Wallet for each Successful API Hit. Credits shall be deducted only upon a Successful API Hit. No Credits shall be deducted for failed requests, timeout errors attributable to the Platform, or API calls that do not return valid data due to failures on the Company&apos;s side or on account of Government Source unavailability or downtime.</p>

          <SubHead>5.3&nbsp;&nbsp;Application of Credits Against Challan Payment</SubHead>
          <p>The Subscriber may apply available Credits in the Wallet towards the payment of Challans facilitated through the Platform, subject to the availability of Credits in the Wallet and the terms applicable to the relevant Challan Resolution Service at the relevant time.</p>

          <SubHead>5.4&nbsp;&nbsp;Non-Refundability and Non-Redeemability of Credits</SubHead>
          <p>Credits once purchased and loaded into the Wallet are strictly non-refundable, non-redeemable for cash, non-encashable, and non-transferable in all circumstances whatsoever, including but not limited to expiry of the Subscription Plan, termination of subscription for any reason, modification or discontinuation of any plan, or any claim of non-usage or partial usage. Unused Credits at the time of expiry or termination of the Subscription shall lapse automatically and irrevocably, with no obligation on the Company to compensate, refund, carry forward, or otherwise account for such unused Credits.</p>

          <SubHead>5.5&nbsp;&nbsp;Credit Replenishment</SubHead>
          <p>Credits cannot be replenished or topped up outside of a new Subscription purchase, except where the Company introduces and makes available a feature for additional credit purchase on the Dashboard, in which case such purchase shall be subject to the terms communicated at that time. The Company makes no representation, warranty, or commitment that a replenishment feature will be introduced.</p>

          <SubHead>5.6&nbsp;&nbsp;Credit Depletion and Subscription Expiry</SubHead>
          <p>The Subscriber acknowledges and agrees that credit depletion and subscription expiry are independent and separate events. The Subscriber&apos;s Credits may be exhausted while the Subscription Term remains active, in which case the Subscriber will not be able to conduct further challan checks until Credits are replenished (subject to availability of such feature). Conversely, the Subscription Term may expire while Credits remain in the Wallet, in which case all such unused Credits shall automatically lapse upon expiry with no entitlement to compensation or refund.</p>

          <SubHead>5.7&nbsp;&nbsp;Non-Refundability of Subscription Fees</SubHead>
          <p>Subscription Fees paid to the Company are non-refundable in all circumstances once payment has been received and the Subscription has been activated or the Subscription Term has commenced, except as may be expressly required under Applicable Law. The Subscriber waives any claim for refund of Subscription Fees upon termination, suspension, or discontinuation of the Subscription.</p>
        </Section>

        <Section number="6" title="RSLA Services">
          <SubHead>6.1&nbsp;&nbsp;On-Call Legal Resolution</SubHead>
          <p>The Subscriber may access on-call legal guidance on road-related legal matters through the Platform. The Company shall endeavour to make a Legal Counsel available to the Subscriber within two (2) business hours of a service request being raised. The Subscriber expressly acknowledges and agrees that the Company does not guarantee the availability of a Legal Counsel within the said two (2) business hour period. Actual availability is subject to the nature of the matter, geographic location, availability of legal personnel, workload at the time of request, and other operational constraints. Non-availability within the stated period shall not constitute a breach by the Company, and the Company shall not be liable for any loss, damage, claim, or inconvenience arising from non-availability or delayed availability of Legal Counsel.</p>

          <SubHead>6.2&nbsp;&nbsp;On-the-Spot Legal Representation</SubHead>
          <p>The Company may, subject to availability and geographic feasibility, arrange for deputation of a Legal Counsel to the site of a road incident. The Subscriber acknowledges that such service is subject to operational constraints including but not limited to geographic coverage, Legal Counsel availability, traffic and road conditions, and the time of request. The Company makes no guarantee as to the time of arrival or availability of a Legal Counsel for on-the-spot assistance, and shall not be liable for any delay, non-arrival, or failure to depute Legal Counsel on account of such constraints.</p>

          <SubHead>6.3&nbsp;&nbsp;Challan Resolution Services</SubHead>
          <p>The Company shall facilitate discovery, tracking, and settlement of Challans through the Platform. The following turnaround times (TAT) shall apply subject to the conditions set out below:</p>
          <p>(a) Court Challan Resolution: Forty-five (45) Court Working Days from the date of confirmed submission of complete documentation and applicable payment.</p>
          <p>(b) Online Challan Resolution: Fifteen (15) Working Days from the date of confirmed submission.</p>
          <p>The TAT clock commences only upon the Company&apos;s confirmed receipt of all required documentation from the Subscriber and, where applicable, full payment towards the relevant Challan. The Company shall not be liable for any delay attributable to: Government Source downtime or unavailability, delayed or incomplete documentation submitted by the Subscriber, court holidays, Force Majeure Events, delays by government or judicial authorities, changes in government system policies, or any other cause beyond the Company&apos;s reasonable control.</p>

          <SubHead>6.4&nbsp;&nbsp;RTO Services</SubHead>
          <p>The Company shall provide facilitation services for RTO-related compliance and procedures as applicable to the Subscriber&apos;s Subscription Plan. The outcome of any RTO application or process is subject entirely to the discretion, timelines, and requirements of the concerned Regional Transport Office or government authority. The Company shall not be liable for any rejection, delay, adverse outcome, or additional requirement in connection with RTO Services arising from reasons attributable to the RTO or any government authority.</p>
        </Section>

        <Section number="7" title="Company Not a Law Firm: Nature of Legal Facilitation">
          <p>7.1&nbsp;&nbsp;The Company is a legal technology company and a technology platform operator. The Company is not a law firm, an advocate, a legal practitioner, or a regulated legal services provider under the Advocates Act, 1961 or any other Applicable Law. Nothing in these Terms, on the Platform, in any communication from the Company, or in the provision of RSLA Services shall be construed as the Company practising law, providing legal advice, rendering legal opinions, or holding itself out as a qualified legal practitioner or law firm.</p>
          <p>7.2&nbsp;&nbsp;The RSLA Services, including On-Call Legal Resolution and On-the-Spot Legal Representation, involve the Company facilitating access to third-party Legal Counsel for the benefit of the Subscriber. The Legal Counsel facilitated through the Platform are independent professionals and are not employees, partners, agents, or representatives of the Company. The Company does not supervise, direct, control, or take responsibility for the professional conduct, advice, opinions, judgments, strategies, actions, or omissions of any Legal Counsel.</p>
          <p>7.3&nbsp;&nbsp;Any advice, guidance, opinion, representation, or assistance rendered by Legal Counsel facilitated through the Platform is the sole professional responsibility of the respective Legal Counsel rendering it. The Company shall not be liable, directly or indirectly, for:</p>
          <p>(a) the accuracy, correctness, completeness, or appropriateness of any legal advice, guidance, or opinion rendered by Legal Counsel;</p>
          <p>(b) any act, omission, error, negligence, misconduct, or default of any Legal Counsel;</p>
          <p>(c) any outcome, loss, damage, liability, or consequence arising from the Subscriber&apos;s reliance upon, or action or inaction based upon, any advice, guidance, or representation given by Legal Counsel;</p>
          <p>(d) any professional liability, claim, or complaint arising against any Legal Counsel in connection with the services rendered to the Subscriber;</p>
          <p>(e) the qualification, standing, registration, or professional competence of any Legal Counsel facilitated through the Platform, although the Company shall use commercially reasonable efforts to empanel Legal Counsel who are duly qualified and registered advocates.</p>
          <p>7.4&nbsp;&nbsp;The Subscriber expressly acknowledges and agrees that any engagement between the Subscriber and the Legal Counsel facilitated through the Platform creates a professional relationship solely between the Subscriber and such Legal Counsel, and does not create any attorney-client relationship between the Subscriber and the Company. The Company is not a party to any professional engagement between the Subscriber and Legal Counsel and shall not be bound by the terms of any such engagement.</p>
          <p>7.5&nbsp;&nbsp;The Knowledge Base accessible on the Dashboard is provided for general informational purposes only and does not constitute legal advice, legal opinion, or a substitute for independent professional legal advice from a qualified advocate. The Subscriber shall not rely on the Knowledge Base as the basis for any legal, regulatory, commercial, or financial decision. The Company shall not be liable for any loss or damage arising from the Subscriber&apos;s reliance on the Knowledge Base.</p>
          <p>7.6&nbsp;&nbsp;Nothing in the provision of RSLA Services shall be construed as creating a fiduciary duty, duty of care, or professional obligation on the part of the Company towards the Subscriber in the capacity of a legal advisor, legal counsel, or law firm.</p>
        </Section>

        <Section number="8" title="Challan Data, Government Source Data, and Disclaimer">
          <p>8.1&nbsp;&nbsp;The Subscriber acknowledges and agrees that the Company acts solely as an intermediary technology platform to retrieve and deliver Government Source Data to the Subscriber through the Platform. The Company does not create, generate, modify, authenticate, or warrant the accuracy, completeness, correctness, or timeliness of Government Source Data.</p>
          <p>8.2&nbsp;&nbsp;The availability and accuracy of Challan data, vehicle compliance information, and vehicle reports are entirely dependent upon: (a) the operational status, uptime, and reliability of the Government Sources from which data is fetched; (b) the accuracy and completeness of records maintained by the relevant government authorities; and (c) the correctness of data provided by the Subscriber on the Dashboard.</p>
          <p>8.3&nbsp;&nbsp;The Company does not warrant or represent that Government Source Data shall be available at all times, free from error, current, or complete. In the event of downtime, unavailability, interruption, or delay from Government Sources, the Company shall not be liable for any failure to retrieve, provide, or process Challan data, and such failure shall not constitute a breach by the Company.</p>
          <p>8.4&nbsp;&nbsp;Any reliance placed by the Subscriber or any third party on Government Source Data obtained through the Platform shall be at the Subscriber&apos;s sole risk and responsibility. The Company shall not be held responsible or liable for any claim, loss, damage, or consequence arising from inaccuracies, omissions, incompleteness, or unavailability of Government Source Data.</p>
          <p>8.5&nbsp;&nbsp;Vehicle Reports and compliance data generated through the Platform are derived from API data obtained from Government Sources. The accuracy of such reports is entirely contingent upon the quality and completeness of the underlying government data. Such reports do not constitute a legal verification, official certification, or conclusive confirmation of the vehicle&apos;s status under Applicable Law.</p>
          <p>8.6&nbsp;&nbsp;Challan data fetched through Government Sources may be subject to inherent technical limitations, data lag, and system dependencies beyond the Company&apos;s control. The Subscriber accepts the Platform&apos;s Challan-related services on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis with respect to Government Source Data.</p>
        </Section>

        <Section number="9" title="Insurance Facilitation Services">
          <p>9.1&nbsp;&nbsp;The Company offers insurance facilitation services through its Dashboard, whereby the Subscriber may request activation of vehicle or driver insurance policies. The Company acts solely as a facilitator between the Subscriber and the empanelled Insurance Aggregator. The Company is expressly not an insurer, insurance company, insurance broker, corporate agent, or insurance intermediary under the Insurance Act, 1938 or the regulations and guidelines of the Insurance Regulatory and Development Authority of India (IRDAI), and these Terms shall not be construed as creating any such relationship or status.</p>
          <p>9.2&nbsp;&nbsp;For availing insurance facilitation, the Subscriber is required to mandatorily provide the following details, which once submitted cannot be changed, edited, or amended under any circumstances: (a) full legal name of the vehicle owner or driver; (b) registered mobile number; (c) driving licence number; and (d) date of birth. The Subscriber is solely responsible for the accuracy and correctness of the information provided. The Company shall not be liable for any rejection, invalidity, policy deficiency, or claims complication arising from incorrect or incomplete information provided by the Subscriber.</p>
          <p>9.3&nbsp;&nbsp;The process for insurance activation is as follows: (a) the Subscriber submits a request through the Dashboard; (b) the Company forwards the request to the empanelled Insurance Aggregator; (c) the Insurance Aggregator issues the Certificate of Insurance, with the Company endeavouring to obtain and make available the same within a maximum turnaround time of ten (10) Working Days, subject to the Insurance Aggregator&apos;s availability and internal processes.</p>
          <p>9.4&nbsp;&nbsp;The Company makes no representation or warranty that the Subscriber shall obtain or be eligible for an insurance policy. The grant, issuance, continuation, modification, cancellation, and renewal of any insurance policy rests entirely at the sole discretion of the concerned insurance company and/or Insurance Aggregator. The Company shall not be liable under any circumstances for: (a) refusal or failure to issue an insurance policy by the insurer or Insurance Aggregator; (b) rejection, partial settlement, or delayed settlement of any insurance claim by the insurer; (c) delay in issuance of a policy on account of the Insurance Aggregator&apos;s processes or the insurer&apos;s requirements; (d) any terms, exclusions, sub-limits, or conditions imposed by the insurer in the policy; or (e) any dispute between the Subscriber and the insurer or Insurance Aggregator.</p>
          <p>9.5&nbsp;&nbsp;All insurance policies issued under the facilitation arrangement shall be governed exclusively by the terms and conditions of the respective insurer and the Insurance Aggregator. The Subscriber shall be bound by the insurer&apos;s policy terms and conditions for all purposes including coverage scope, claims procedures, exclusions, sub-limits, and renewals. The Company shall not be party to, or liable under, the insurance contract between the Subscriber and the insurer.</p>
          <p>9.6&nbsp;&nbsp;In the event of an insurance claim, the Company shall provide reasonable facilitation assistance to the Subscriber in navigating the claims process. However, the approval, rejection, quantum, conditions, and timelines of any insurance claim are entirely at the discretion of the insurer, and the Company shall bear no responsibility or liability for any adverse claim decision or outcome.</p>
        </Section>

        <Section number="10" title="Service Availability, Maintenance, and Interruptions">
          <p>10.1&nbsp;&nbsp;The Company shall use commercially reasonable efforts to maintain availability and operational performance of the Platform and Dashboard. However, the Company does not warrant or represent uninterrupted, error-free, or continuous availability of the Platform or any feature thereof.</p>
          <p>10.2&nbsp;&nbsp;The Platform and services may be unavailable, degraded, or restricted due to: (a) Scheduled Maintenance, for which the Company shall endeavour to provide reasonable prior notice; (b) unplanned or emergency maintenance required to maintain security, data integrity, or platform stability; (c) downtime, outages, or interruptions in third-party services including Government Source APIs, internet infrastructure, telecommunications providers, or cloud service providers; (d) Force Majeure Events; or (e) any other technical, regulatory, or operational circumstances beyond the Company&apos;s reasonable control.</p>
          <p>10.3&nbsp;&nbsp;The Subscriber expressly acknowledges that services dependent on Government Source APIs, including Challan checking, vehicle compliance checks, and vehicle reports, are subject to the availability and reliability of such third-party government systems, which the Company does not operate, maintain, or control. Any failure, delay, or interruption arising from Government Source downtime or unavailability shall not constitute a failure or breach on the part of the Company.</p>
          <p>10.4&nbsp;&nbsp;The Company reserves the right to carry out Scheduled Maintenance of the Platform during which services may be temporarily unavailable. The Company shall endeavour to schedule maintenance during off-peak hours and shall provide advance notice wherever practicable.</p>
          <p>10.5&nbsp;&nbsp;The Company shall not be liable for any loss, damage, claim, inconvenience, or cost of any nature suffered by the Subscriber arising from unavailability of the Platform or its services due to any of the reasons specified in Clause 10.2 above.</p>
        </Section>

        <Section number="11" title="Prohibited Use and Fair Usage Policy">
          <p>11.1&nbsp;&nbsp;The Subscriber shall use the Platform and RSLA Services strictly for its own internal lawful business purposes and in accordance with these Terms and Applicable Law. The Subscriber shall not, directly or indirectly: (a) use the Platform for any unlawful, fraudulent, or unauthorised purpose; (b) resell, sublicense, or provide access to the Platform or any part thereof to any third party without the Company&apos;s prior written consent; (c) attempt to reverse engineer, decompile, disassemble, or derive source code from the Platform or any component thereof; (d) use automated scripts, bots, crawlers, or any automated means to access or use the Platform; (e) overload, disrupt, or impair the operational integrity or security of the Platform; (f) upload or transmit any malicious code, viruses, or harmful data; (g) misrepresent the scope, nature, or coverage of RSLA Services to any third party; or (h) use the Platform in any manner that causes reputational, commercial, or legal harm to the Company.</p>
          <p>11.2&nbsp;&nbsp;The Company reserves the right to implement a Fair Usage Policy to ensure equitable access to Platform resources. Usage of API calls, Dashboard requests, service requests, and incident reporting may be subject to reasonable usage limits as determined by the Company from time to time and communicated to Subscribers. In the event of abnormal, excessive, automated, or abusive usage, the Company may restrict, throttle, or temporarily suspend access to certain features without prior notice and without liability.</p>
        </Section>

        <Section number="12" title="Intellectual Property Rights">
          <p>12.1&nbsp;&nbsp;The Company is and shall remain the sole and exclusive owner of all intellectual property rights in and to the LOTS247 brand, Platform, Dashboard, technology infrastructure, software, source code, databases, algorithms, methodologies, documentation, and all content, materials, and outputs generated by or through the Platform. All rights not expressly granted are reserved by the Company.</p>
          <p>12.2&nbsp;&nbsp;Nothing in these Terms shall be construed as transferring any intellectual property right or ownership interest in the Platform or any part thereof to the Subscriber. The Subscriber&apos;s rights are strictly limited to the limited, non-exclusive access granted under Clause 3.2.</p>
          <p>12.3&nbsp;&nbsp;The Subscriber shall not reproduce, copy, adapt, modify, translate, create derivative works from, publish, distribute, transmit, or commercially exploit any part of the Platform, its content, or any materials obtained through the Platform without the Company&apos;s prior written consent.</p>
        </Section>

        <Section number="13" title="Confidentiality">
          <p>13.1&nbsp;&nbsp;Each Party acknowledges that in the course of the subscription arrangement, it may receive or have access to information that is non-public, proprietary, or confidential in nature, including but not limited to business information, pricing, customer data, vehicle data, technology specifications, and operational processes (&ldquo;Confidential Information&rdquo;).</p>
          <p>13.2&nbsp;&nbsp;Each Party shall: (a) maintain all Confidential Information of the other Party in strict confidence; (b) use Confidential Information solely for the purposes of this arrangement; and (c) not disclose Confidential Information to any third party without prior written consent of the Disclosing Party, except to employees and advisors on a strict need-to-know basis who are bound by equivalent confidentiality obligations.</p>
          <p>13.3&nbsp;&nbsp;These confidentiality obligations shall not apply to information that: (a) is or becomes publicly available through no fault of the Receiving Party; (b) was known to the Receiving Party prior to disclosure without any confidentiality obligation; (c) is independently developed without reference to the Confidential Information; or (d) is required to be disclosed by Applicable Law or court order, provided the Receiving Party gives prompt prior written notice to the Disclosing Party and cooperates in seeking a protective order.</p>
          <p>13.4&nbsp;&nbsp;The obligations of confidentiality shall survive the termination or expiry of the Subscription for a period of five (5) years.</p>
        </Section>

        <Section number="14" title="Disclaimer of Warranties">
          <p>14.1&nbsp;&nbsp;TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, THE COMPANY PROVIDES THE PLATFORM, DASHBOARD, AND ALL RSLA SERVICES ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS, WITHOUT ANY REPRESENTATION OR WARRANTY OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, UNINTERRUPTED OPERATION, OR ERROR-FREE PERFORMANCE.</p>
          <p>14.2&nbsp;&nbsp;The Company makes no warranty or representation that: (a) the Platform will be available at all times or free from interruptions, errors, or defects; (b) Government Source Data will be accurate, complete, current, or available; (c) any legal representation, guidance, or facilitation will result in a favourable outcome; (d) Challan resolution services will achieve any particular outcome within or outside the stated TAT; (e) insurance activation will be successful or that any insurance claim will be approved; (f) Legal Counsel facilitated through the Platform will be available within the stated timeframe or at all; or (g) any advice or guidance rendered by Legal Counsel will be accurate, complete, or appropriate for the Subscriber&apos;s specific circumstances.</p>
          <p>14.3&nbsp;&nbsp;The Company does not warrant the professional competence, conduct, or advice of any Legal Counsel facilitated through the Platform. The Company does not hold itself out as a law firm and expressly disclaims any professional legal responsibility arising from services rendered by Legal Counsel accessed through the Platform.</p>
        </Section>

        <Section number="15" title="Limitation of Liability and Indemnification">
          <SubHead>15.1&nbsp;&nbsp;Exclusion of Consequential Damages</SubHead>
          <p>To the fullest extent permitted by Applicable Law, the Company shall not be liable to the Subscriber or any third party for any indirect, incidental, consequential, special, exemplary, or punitive damages, including but not limited to loss of profits, loss of business, loss of data, loss of goodwill, business interruption, regulatory fines, or any claim by any third party, arising out of or in connection with these Terms, the Platform, or the RSLA Services, regardless of the form of action, whether in contract, tort, negligence, or otherwise, and whether or not the Company has been advised of the possibility of such damages.</p>

          <SubHead>15.2&nbsp;&nbsp;Aggregate Liability Cap</SubHead>
          <p>Notwithstanding any other provision of these Terms, the Company&apos;s total aggregate liability to the Subscriber arising out of or in connection with these Terms, the Platform, or the RSLA Services, whether in contract, tort, negligence, breach of statutory duty, or otherwise, shall not exceed the total Subscription Fee actually paid by the Subscriber to the Company in the three (3) calendar months immediately preceding the event giving rise to the relevant claim.</p>

          <SubHead>15.3&nbsp;&nbsp;Specific Exclusions from Liability</SubHead>
          <p>Without prejudice to the generality of Clauses 15.1 and 15.2, and without limiting any other protection afforded to the Company under these Terms, the Company shall not be liable for any claim, loss, damage, liability, or cost of any nature arising from:</p>
          <p>(a) downtime, unavailability, degradation, or interruption of Government Source APIs or any third-party systems not operated or controlled by the Company;</p>
          <p>(b) inaccuracy, incompleteness, unavailability, delay, or discontinuation of Government Source Data;</p>
          <p>(c) any incorrect vehicle registration number, mobile number, or any other incorrect, incomplete, or inaccurate information entered by the Subscriber on the Dashboard;</p>
          <p>(d) failure or delay in On-Call Legal Resolution within the two (2) business hour window;</p>
          <p>(e) non-availability, delayed arrival, or failure to depute Legal Counsel for On-the-Spot Legal Representation;</p>
          <p>(f) the accuracy, correctness, appropriateness, or outcome of any advice, opinion, guidance, representation, or action of any Legal Counsel facilitated through the Platform;</p>
          <p>(g) any professional negligence, misconduct, omission, or default of any Legal Counsel;</p>
          <p>(h) the Subscriber&apos;s reliance on or action or inaction based upon any advice, guidance, or representation rendered by any Legal Counsel;</p>
          <p>(i) delay or failure in Challan Resolution Services arising from Government Source downtime, incomplete or incorrect documentation, court holidays, Force Majeure Events, or reasons attributable to government or judicial authorities;</p>
          <p>(j) rejection, delay, adverse terms, or non-issuance of an insurance policy by the insurer or Insurance Aggregator;</p>
          <p>(k) rejection, delay, partial settlement, or adverse decision on any insurance claim by the insurer;</p>
          <p>(l) unavailability of the Platform during Scheduled Maintenance or emergency maintenance;</p>
          <p>(m) the Subscriber&apos;s breach of these Terms or Applicable Law;</p>
          <p>(n) any Force Majeure Event;</p>
          <p>(o) any decision, order, direction, or action of any government authority, court, tribunal, or statutory body;</p>
          <p>(p) any third-party claim arising from the Subscriber&apos;s use of Government Source Data or from information provided by the Subscriber to any third party;</p>
          <p>(q) the Subscriber&apos;s failure to comply with any Applicable Law in connection with its use of the Platform or RSLA Services; or</p>
          <p>(r) any loss arising from the expiry, lapse, or forfeiture of Credits or the Subscription.</p>

          <SubHead>15.4&nbsp;&nbsp;No Liability for Third-Party Services</SubHead>
          <p>The Company shall not be liable for any act, omission, failure, delay, or default of any third party, including Government Sources, the Insurance Aggregator, Legal Counsel, telecommunications providers, internet service providers, cloud service providers, or payment processors, even where the Company has arranged or facilitated access to such third parties as part of the RSLA Services.</p>

          <SubHead>15.5&nbsp;&nbsp;Subscriber&apos;s Indemnity</SubHead>
          <p>The Subscriber shall indemnify, defend, and hold harmless the Company and its directors, officers, employees, agents, Legal Counsel panel members, and affiliates (collectively, &ldquo;Company Indemnitees&rdquo;) from and against any and all claims, demands, proceedings, losses, liabilities, damages, penalties, costs, and expenses (including reasonable legal fees) arising out of or in connection with: (a) the Subscriber&apos;s breach of any representation, warranty, or obligation under these Terms; (b) the Subscriber&apos;s use of the Platform or RSLA Services in violation of Applicable Law or these Terms; (c) incorrect, fraudulent, or misleading information provided by the Subscriber; (d) any third-party claim arising from the Subscriber&apos;s use of Government Source Data; (e) any claim arising from the Subscriber&apos;s reliance on advice or guidance of Legal Counsel; or (f) any wilful misconduct or gross negligence by the Subscriber or its personnel.</p>
        </Section>

        <Section number="16" title="Data Protection and Privacy">
          <p>16.1&nbsp;&nbsp;The Company shall collect, use, process, store, and share personal data and other information provided by the Subscriber in accordance with Applicable Law, including the Digital Personal Data Protection Act, 2023, and the Company&apos;s Privacy Policy as published on the Platform from time to time, which forms an integral part of these Terms.</p>
          <p>16.2&nbsp;&nbsp;The Subscriber consents to the collection and processing of personal data, vehicle data, transaction data, and usage data for the purpose of delivering RSLA Services, managing subscriptions, processing Challans, and facilitating insurance activation.</p>
          <p>16.3&nbsp;&nbsp;The Company may share Subscriber data with: (a) Government Sources and relevant government authorities for the purpose of Challan resolution and compliance; (b) the empanelled Insurance Aggregator for insurance facilitation; and (c) such other third parties as may be necessary for service delivery, subject to appropriate confidentiality obligations. The Subscriber acknowledges that once data is transmitted to Government Sources or the Insurance Aggregator, the Company has no control over subsequent processing within those external systems.</p>
          <p>16.4&nbsp;&nbsp;The Subscriber represents and warrants that all personal data shared with the Company has been obtained by the Subscriber in accordance with Applicable Law and with all necessary consents, authorisations, and permissions from the concerned individuals.</p>
          <p>16.5&nbsp;&nbsp;The Company shall implement reasonable technical and organisational measures to protect Subscriber data from unauthorised access, disclosure, alteration, or destruction. The Company shall not be liable for any data breach or security incident occurring within Government Source systems, Insurance Aggregator systems, or any system outside the Company&apos;s reasonable control.</p>
        </Section>

        <Section number="17" title="Term, Renewal, Suspension, and Termination">
          <SubHead>17.1&nbsp;&nbsp;Term</SubHead>
          <p>The Subscription Term shall commence from the date of Activation and shall continue for the period applicable to the respective Subscription Plan as communicated to the Subscriber at the time of subscription.</p>

          <SubHead>17.2&nbsp;&nbsp;Renewal</SubHead>
          <p>Renewal of Subscription Plans shall be subject to the terms and pricing communicated by the Company at the time of renewal. The Company makes no commitment to automatic renewal. Renewed subscriptions shall be subject to the Terms and pricing in force at the time of renewal.</p>

          <SubHead>17.3&nbsp;&nbsp;Right to Suspend</SubHead>
          <p>The Company shall have the right to immediately suspend the Subscriber&apos;s access to the Platform and RSLA Services, without prior notice and without any liability to the Subscriber, if: (a) the Subscriber is in breach of any provision of these Terms; (b) the Subscriber has engaged in fraudulent, abusive, or unlawful use of the Platform; (c) suspension is required by a government order or regulatory directive; or (d) continued access poses a security, legal, or reputational risk to the Company.</p>

          <SubHead>17.4&nbsp;&nbsp;Termination</SubHead>
          <p>The Company may terminate the Subscriber&apos;s Subscription with thirty (30) days&apos; prior written notice for any reason. The Company may terminate the Subscription immediately upon written notice in the event the Subscriber commits a material breach of these Terms that is incapable of being cured, engages in fraud or wilful misconduct, or is subject to insolvency proceedings. Upon termination, all rights and licences granted to the Subscriber shall immediately cease. Subscription Fees and Credits paid or issued in connection with the terminated Subscription shall not be refundable, except as may be required by Applicable Law.</p>

          <SubHead>17.5&nbsp;&nbsp;Effect of Expiry or Termination</SubHead>
          <p>Upon expiry or termination of the Subscription for any reason: (a) the Subscriber&apos;s access to the Dashboard and all RSLA Services shall be discontinued; (b) any unused Credits in the Wallet shall automatically and irrevocably lapse; (c) the Subscriber shall immediately cease use of the Platform; and (d) the obligations under Clauses 13 (Confidentiality), 15 (Limitation of Liability), and 16 (Data Protection) shall survive.</p>
        </Section>

        <Section number="18" title="Force Majeure">
          <p>18.1&nbsp;&nbsp;Neither Party shall be liable for any failure or delay in the performance of its obligations under these Terms (other than payment obligations) to the extent such failure or delay is directly caused by a Force Majeure Event, provided that the affected Party: (a) promptly notifies the other Party in writing of the occurrence, nature, and expected duration of such event; and (b) uses commercially reasonable efforts to mitigate the impact and resume performance as soon as reasonably practicable.</p>
          <p>18.2&nbsp;&nbsp;For the avoidance of doubt, downtime or unavailability of Government Source APIs, NIC systems, MoRTH portals, or any government database or platform shall constitute a Force Majeure Event or a third-party dependency event beyond the Company&apos;s control, and the Company shall not be liable for any consequence arising therefrom.</p>
          <p>18.3&nbsp;&nbsp;The non-availability or delayed availability of Legal Counsel on account of operational constraints, emergency situations, or events beyond the Company&apos;s control shall also constitute a Force Majeure or operational constraint event, and the Company shall not be liable for any consequence arising therefrom.</p>
        </Section>

        <Section number="19" title="Changes to These Terms">
          <p>19.1&nbsp;&nbsp;The Company reserves the right to modify, amend, or update these Terms at any time at its sole discretion. Any material change to these Terms shall be communicated to the Subscriber by email or through a prominent notice on the Dashboard with reasonable prior notice.</p>
          <p>19.2&nbsp;&nbsp;The Subscriber&apos;s continued use of the Platform or RSLA Services after the effective date of any modification shall constitute unconditional acceptance of the modified Terms. If the Subscriber does not agree with any modified Terms, the Subscriber must immediately discontinue all use of the Platform and notify the Company in writing.</p>
        </Section>

        <Section number="20" title="Governing Law, Jurisdiction, and Dispute Resolution">
          <p>20.1&nbsp;&nbsp;These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of laws principles.</p>
          <p>20.2&nbsp;&nbsp;Amicable Resolution: In the event of any dispute, controversy, or claim arising out of or relating to these Terms, the Platform, or the RSLA Services, the Parties shall first attempt to resolve such dispute through good faith negotiations between their authorised representatives within thirty (30) days of one Party providing written notice of the dispute to the other.</p>
          <p>20.3&nbsp;&nbsp;Jurisdiction: If the dispute is not resolved through negotiation within thirty (30) days, the Parties agree that the courts at New Delhi, India shall have exclusive jurisdiction over any dispute arising out of or in connection with these Terms.</p>
        </Section>

        <Section number="21" title="General Provisions">
          <SubHead>21.1&nbsp;&nbsp;Entire Agreement</SubHead>
          <p>These Terms, together with the Subscription confirmation, product communication, privacy policy, and any other policies published by the Company on the Platform from time to time, constitute the entire agreement between the Parties with respect to the subject matter hereof and supersede all prior negotiations, representations, understandings, and agreements, whether written or oral.</p>

          <SubHead>21.2&nbsp;&nbsp;Severability</SubHead>
          <p>If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be modified to the minimum extent necessary to make it valid and enforceable. The remaining provisions shall continue in full force and effect without modification.</p>

          <SubHead>21.3&nbsp;&nbsp;Waiver</SubHead>
          <p>No failure or delay by the Company in exercising any right under these Terms shall operate as a waiver of such right. No single or partial exercise of any right shall preclude any other or further exercise thereof or the exercise of any other right.</p>

          <SubHead>21.4&nbsp;&nbsp;Relationship of Parties</SubHead>
          <p>The Parties are independent contractors. Nothing in these Terms shall be construed to create a partnership, joint venture, agency, employment, or fiduciary relationship between the Parties. Neither Party shall have authority to bind the other or incur any obligation on behalf of the other.</p>

          <SubHead>21.5&nbsp;&nbsp;Notices</SubHead>
          <p>All notices under these Terms shall be in writing and shall be delivered by registered post with acknowledgement due, or by email with confirmed delivery, to the addresses notified by the respective Party from time to time.</p>

          <SubHead>21.6&nbsp;&nbsp;Assignment</SubHead>
          <p>The Subscriber shall not assign, transfer, or delegate any rights or obligations under these Terms without the prior written consent of the Company. The Company may assign these Terms to any affiliate, successor entity, or in connection with a merger, acquisition, or sale of assets, without the Subscriber&apos;s consent, provided the Company gives written notice to the Subscriber within a reasonable time of such assignment.</p>

          <SubHead>21.7&nbsp;&nbsp;Language</SubHead>
          <p>These Terms are executed and shall be interpreted in the English language. In the event of any translation into another language, the English version shall prevail.</p>

          <SubHead>21.8&nbsp;&nbsp;Electronic Acceptance</SubHead>
          <p>Acceptance of these Terms by electronic means, including clicking an &ldquo;I Agree&rdquo; button, completing the subscription process, or making payment on the Platform, shall constitute valid, binding, and enforceable acceptance and shall have the same legal force and effect as a written and signed agreement, in accordance with the Information Technology Act, 2000 and the rules thereunder.</p>
        </Section>

        <div className="mt-16 pt-8 border-t border-stone-200">
          <p className="text-[12.5px] leading-[1.65] text-stone-500">
            Sproutech Solutions Private Limited (LOTS247)&nbsp;&nbsp;|&nbsp;&nbsp;MGF Metropolis Mall, Ground Floor, UG-006, Mehrauli-Gurgaon Road, Sector 28, Gurugram, Haryana 122002
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

function DefList({ children }: { children: React.ReactNode }) {
  return <dl className="space-y-3 pl-0 sm:pl-4 border-l-0 sm:border-l border-stone-200">{children}</dl>
}

function Def({ term, children }: { term: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <dt className="inline font-semibold text-stone-900">&ldquo;{term}&rdquo;</dt>{' '}
      <dd className="inline text-stone-700">{children}</dd>
    </div>
  )
}
