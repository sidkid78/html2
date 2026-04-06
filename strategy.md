# Project Autonomy — Listen & Fix Launch
## Meta Ads Growth Strategy

---

## Step 1: Campaign Structure & Audience Targeting

### Campaign Structure

- **Objective:** Lead Generation (Native Instant Forms). This minimizes friction for mobile users and keeps them on-platform where conversion rates are highest.
- **Budget Optimization:** Advantage Campaign Budget (CBO) enabled to fluidly allocate spend across creative variations and audience segments based on real-time performance.

### Audience Targeting Strategy

- **Location:** Austin, TX (+15 miles)

**Balancing Constraints:** To balance the hyper-local constraint of 15 miles, we will deploy a two-ad-set structure targeting self-reliant Texans, "Right to Repair" advocates, hands-on homeowners, and anyone who feels a spike of anxiety when the "Check Engine" light comes on.

| Ad Set | Targeting | Notes |
|---|---|---|
| **Ad Set 1 — Broad/Local** | Location only | Relies entirely on Meta's ML and highly specific creative to filter the right audience. Prevents rapid ad fatigue and high frequency caps in a small radius. |
| **Ad Set 2 — Stacked Interests** | Location + stacked interests | Monitor frequency closely. If audience size falls below 250k, expand interests or shift budget entirely to Ad Set 1. |

### Budget Pacing & Placements

- **Placements:** Advantage+ Placements, with creative specifically tailored for **9:16** (Reels/Stories) where local UGC performs best and CPMs are often more efficient.

---

## Step 2: Creative & Copy Execution

### 9:16 Video Storyboard (0–15s)

**Concept:**

> *Visual:* Extreme close-up of a driver gripping the steering wheel. We hear an awful, rhythmic grinding sound from the engine.
>
> *On-Screen Text:* "That sinking feeling in your stomach..."
>
> *Audio (Internal Monologue):* "Please not today. A tow is $200. The mechanic is going to invent three different things wrong with it. I don't have $1,000 for this."
>
> *Action:* The driver takes a breath. Her expression shifts from panic to resolve. She opens Listen & Fix, holds her phone near the dash. The screen glows **Safety Cyan**, analyzing the audio waves.
>
> *The Reveal:* The AI identifies a loose heat shield. Cost to fix? **$0.** Time to fix? **3 minutes.** We see her tighten a bolt on the shoulder of the road. She slams the hood, wipes grease off her hand, and smiles. **She just beat the system.**

---

#### `0–3s` — THE HOOK
Fast-paced, native-looking intro in a recognizable Austin, TX spot. Text overlay calling out locals directly to stop the scroll.

#### `3–9s` — VALUE PROP
Quick cuts showing the app in action. Voiceover:

> *"Modern car companies designed the 'Check Engine' light to make you feel stupid. They want you helpless, sitting in a waiting room, paying $150 just for a mechanic to plug in a scanner. Enough. We built Listen & Fix because you have the right to know what's happening under your own hood. Our AI has listened to millions of broken engines so it can tell you **exactly** what that rattle, hum, or grind is. No more guessing. No more getting ripped off by the 'black box.' Let our AI diagnose the problem, guide you through the fix, and put the wrench back in your hands. Take your power back. Download for free today."*

#### `9–15s` — THE OFFER & CTA
Clear visual of the offer: **"Join the Rebellion: Get your first 3 'Master Mechanic' AI Scans on us."** On-screen arrow pointing down to the **Sign Up** button.

---

### Copy Variations

#### Primary Text 1 — Direct & Offer-Led

Hey Austin, TX! 👋 Modern car companies designed the "Check Engine" light to make you feel stupid — but not anymore. We built **Listen & Fix** so you know exactly what that rattle, hum, or grind is. **No more guessing. No more getting ripped off.**

🎁 We're giving away **3 free "Master Mechanic" AI Scans** to local residents. Tap **Sign Up** to claim yours before they're gone!

---

#### Primary Text 2 — Story-Driven

That sinking feeling when the "Check Engine" light comes on? It doesn't have to end in a $1,000 repair bill. 📱

**Listen & Fix** uses AI to diagnose your car — in seconds. Join the rebellion and claim your **3 free AI scans** today.

---

#### Primary Text 3 — Urgency & Niche

📍 Austin, TX exclusive! We have a limited number of **free "Master Mechanic" AI Scans** available for self-reliant Texans who refuse to get ripped off at the shop.

If you believe in your **Right to Repair**, this app is for you. 👇

---

### Local Authenticity Execution

- Use **local landmarks** in the first 3 seconds
- Mention **Austin, TX** explicitly in copy
- Use **UGC creators** with a genuine local accent/vibe
- Intentionally **avoid overly polished studio lighting** — ads must feel like native social content

---

## Step 3: Meta Instant Form Design

### Form Type Recommendation

**"More Volume"** is recommended initially. Since the ultimate goal is an app download (which adds friction), capture lead information with minimal resistance first, then use the automated funnel to drive the download.

### Form Structure & Fields

- **Intro Section:** Use the winning ad creative as the background image
- **Headline:** *"Claim Your 3 Free Master Mechanic AI Scans"*
- **Paragraph:** *"Enter your details below to get your exclusive access link sent instantly."*

**Questions** *(optimized for completion rate):*
- First Name *(Auto-fill)*
- Email *(Auto-fill)*
- Phone Number *(Auto-fill — crucial for SMS delivery of the app link)*

**Privacy Policy:** Link to company privacy policy.  
**Custom disclaimer:** *"By submitting, you agree to receive your offer via SMS/Email."*

---

### ⭐ Completion Screen — Critical Conversion Point

| Field | Content |
|---|---|
| **Headline** | "You're In! Step 2: Download to Claim." |
| **Description** | "Your 3 free AI Scans are waiting inside the app. Tap the button below to download and activate now." |
| **CTA Button** | "Download App Now" → links to dynamic deep link (Branch.io / AppsFlyer OneLink → App Store / Google Play) |

---

## Step 4: Funnel Automation & Attribution Workflow

### Technical Stack

1. Meta Lead Form
2. Zapier / Make.com
3. CRM & SMS *(e.g., Klaviyo / Twilio)*
4. MMP *(AppsFlyer / Adjust)*

### Immediate Post-Submission Sequence

The moment a lead is captured, intent is at its peak. We trigger an immediate multi-channel sequence:

| Timing | Channel | Message |
|---|---|---|
| **T+0 min** | SMS | *"Hey [Name]! Here's your link to claim your 3 free AI Scans. Download: [Deferred Deep Link]. See you inside!"* |
| **T+5 min** | Email | *"Welcome! Your free scans are ready — here's how to get started..."* + QR code for desktop-to-mobile flow |
| **T+24 hrs** | SMS *(if no install tracked)* | *"Just a reminder — your free scans expire soon. Tap here to download and claim them."* |

### Bridging the Attribution Gap

We will use a **Mobile Measurement Partner (MMP)** to generate deferred deep links. When the user clicks the SMS link or the Completion Screen CTA:

1. The MMP **fingerprints the click**
2. After app install + first open, the MMP **matches the install to the click**
3. Conversion data is passed back to Meta via **Conversions API (CAPI)** for offline conversion tracking and algorithm optimization

---

## Step 5: KPI Measurement & Optimization Plan

### Target KPIs

| Metric | Target |
|---|---|
| Cost Per Install (CPI) | < $3.00 |
| Cost Per Acquisition (CPA) | < $5.00 |
| **True North** | Users who successfully fix their own machine without calling a mechanic in **week one** |

Tracked via **Meta Ads Manager** (CPL, Form Completion Rate) and **MMP Dashboard** (Install Rate, CPA, In-App Events).

---

### Troubleshooting Matrix

| Scenario | Signal | Action Plan |
|---|---|---|
| **Form Completion Rate < 15%** | Form is too long or intent is low | Remove custom questions. Ensure ad creative clearly states a form submit is required to claim the offer. Test "Higher Intent" form type if lead quality is the issue. |
| **CPL Spikes (Local Saturation)** | Audience fatigue in Austin, TX | Refresh creative immediately (new hooks, new angles). Broaden radius if possible. Shift budget to Broad Ad Set to let the algorithm find cheaper inventory pockets. |
| **Low Lead-to-App-User Rate** | Leads captured but not downloading | Optimize Completion Screen CTA prominence. Improve SMS deliverability and copy urgency. Launch a retargeting campaign targeting "Lead Form Submitters" with a direct App Install objective. |