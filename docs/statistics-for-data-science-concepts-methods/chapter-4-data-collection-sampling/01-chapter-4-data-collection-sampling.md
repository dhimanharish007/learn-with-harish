---
id: chapter-4
title: Chapter 4 — Data Collection and Sampling
description: Covers how data is collected, the relationship between populations and samples, and the probability and non-probability sampling techniques used to select them.
sidebar_position: 1
---
## 4.1 🗃️ Data Collection
### 4.1.1 Primary Data

Primary data is collected **first-hand** by the researcher, directly from the original source, specifically for the current research problem. Since the researcher controls the entire process, the data is fresh, relevant, and tailored to the exact question being studied.

**Advantages:** highly relevant, current, full control over quality, ownership of the data.
**Disadvantages:** expensive, time-consuming, requires expertise and effort.

<HindiBox>

Primary data researcher khud **first-hand** collect karta hai, seedha original source se, specially apni current research problem ke liye. Kyunki poora process researcher ke control mein hota hai, isliye data fresh, relevant aur exactly usi sawaal ke hisaab se hota hai.

**Fayde:** highly relevant, current, quality par poora control, data par ownership.
**Nuksan:** mehnga, time-consuming, expertise aur mehnat maangta hai.

**Example:** Agar aap apne college ke students ki study habits jaanna chahte hain aur khud ek survey form banakar 200 students se bharwate hain — ye **Primary Data** hai.

</HindiBox>

### 4.1.2 Secondary Data

Secondary data has already been collected by someone else, for some other purpose, and is being reused by the current researcher. Examples include government reports, published research papers, company records, and public datasets.

**Advantages:** cheap or free, quickly available, often large-scale and historical.
**Disadvantages:** may be outdated, may not exactly fit your research question, quality and collection methods are outside your control.

<HindiBox>

Secondary data pehle se hi kisi aur ne, kisi aur purpose ke liye collect kiya hua hota hai, aur ab researcher use dobara use kar raha hota hai. Examples: government reports, published research papers, company records, public datasets.

**Fayde:** sasta ya free, turant available, aksar bade scale ka aur historical.
**Nuksan:** purana ho sakta hai, aapke sawaal se exactly match na kare, aur uski quality aur collection method aapke control mein nahi hoti.

**Example:** Census of India ka data, RBI ki reports, ya Kaggle se download kiya gaya dataset use karna — ye sab **Secondary Data** hai.

</HindiBox>

### 4.1.3 Sources of Data

| Type | Common Sources |
|---|---|
| **Internal** | Company databases, sales records, CRM systems, website analytics, transaction logs |
| **External (Public)** | Government portals, census data, WHO/World Bank datasets, open data repositories |
| **External (Commercial)** | Market research firms, paid data providers, industry reports |
| **Digital / Automated** | APIs, web scraping, IoT sensors, mobile apps, social media platforms |
| **Field-based** | Surveys, interviews, experiments, direct observation |

<HindiBox>

| Type | Common Sources |
|---|---|
| **Internal** | Company databases, sales records, CRM, website analytics, transaction logs |
| **External (Public)** | Government portals, census data, WHO/World Bank datasets, open data |
| **External (Commercial)** | Market research firms, paid data providers, industry reports |
| **Digital / Automated** | APIs, web scraping, IoT sensors, mobile apps, social media |
| **Field-based** | Surveys, interviews, experiments, direct observation |

**Example:** Ek e-commerce company ke paas apna internal sales data hota hai (Internal), wo competitor pricing web scraping se nikalti hai (Digital), aur market size ke liye government report use karti hai (External Public).

</HindiBox>

### 4.1.4 Data Collection Methods

- **Surveys / Questionnaires:** structured questions given to many respondents — cheap and scalable, but depends on honest answers.
- **Interviews:** one-on-one conversations (structured, semi-structured, or unstructured) — rich detail, but slow and costly.
- **Observation:** watching and recording behaviour without asking — avoids self-report bias, but can't capture reasons or intent.
- **Experiments:** deliberately manipulating a variable to observe its effect — the only method that establishes causation.
- **Focus Groups:** guided group discussion — good for exploring ideas, but risks groupthink.
- **Automated Collection:** sensors, logs, APIs, and trackers — high volume and continuous, but may raise privacy concerns.

<HindiBox>

- **Surveys / Questionnaires:** structured questions bahut saare logon ko — sasta aur scalable, lekin honest answers par depend karta hai.
- **Interviews:** one-on-one baatcheet (structured, semi-structured, ya unstructured) — detailed information, lekin slow aur mehnga.
- **Observation:** bina pooche behaviour dekhna aur record karna — self-report bias se bachta hai, lekin "kyun" ka jawab nahi deta.
- **Experiments:** jaan-boojh kar ek variable badal kar uska asar dekhna — ekmatr method jo **causation** prove kar sakta hai.
- **Focus Groups:** group discussion — naye ideas explore karne ke liye achha, lekin groupthink ka risk.
- **Automated Collection:** sensors, logs, APIs, trackers — bahut zyada aur continuous data, lekin privacy concerns.

**Example:** Ek app ki usability jaanchne ke liye — Survey se ratings lo, kuch users ka Interview karo, aur analytics logs se dekho ki wo asal mein app kaise use karte hain.

</HindiBox>

### 4.1.5 Questionnaire and Survey Data

A questionnaire is the instrument (the set of questions); a survey is the whole process of administering it. Common question types:

- **Closed-ended:** fixed options (Yes/No, multiple choice) — easy to analyze
- **Open-ended:** free text — rich but hard to quantify
- **Likert Scale:** agreement on a 5- or 7-point scale (Strongly Disagree → Strongly Agree)
- **Rating / Ranking:** scoring or ordering items

**Design principles:** keep questions short and neutral, avoid leading and double-barrelled questions, use simple language, order from easy to sensitive, and always pilot-test before full rollout.

<HindiBox>

Questionnaire **instrument** hai (sawaalon ka set); Survey poora **process** hai jisme wo questionnaire logon tak pahunchaya jaata hai. Common question types:

- **Closed-ended:** fixed options (Yes/No, MCQ) — analyze karna aasan
- **Open-ended:** free text — detailed, lekin quantify karna mushkil
- **Likert Scale:** 5 ya 7 point par agreement (Strongly Disagree → Strongly Agree)
- **Rating / Ranking:** items ko score ya order dena

**Design principles:** sawaal chhote aur neutral rakho, leading aur double-barrelled questions se bacho, simple bhasha use karo, aasan sawaal pehle aur sensitive baad mein, aur full rollout se pehle hamesha pilot-test karo.

**Galat sawaal ke examples:**
- *Leading:* "Aapko hamara excellent service kitna pasand aaya?" → answer ko push kar raha hai
- *Double-barrelled:* "Kya product sasta aur accha hai?" → do sawaal ek mein, jawab confusing hoga

</HindiBox>

### 4.1.6 Best Practices for Data Collection

- **Define the objective first** — know exactly what question the data must answer
- **Choose the right method** for your question, budget, and timeline
- **Pilot test** the instrument on a small group before full deployment
- **Standardize procedures** so every observation is collected the same way
- **Train data collectors** to reduce observer bias and inconsistency
- **Validate as you go** — build range checks and mandatory fields into forms
- **Document everything** — source, date, method, and known limitations (metadata)
- **Protect privacy** — obtain informed consent, anonymize, and follow data-protection rules
- **Back up data** securely and maintain version control

<HindiBox>

- **Pehle objective define karo** — pata ho ki data kis sawaal ka jawab dega
- **Sahi method chuno** — sawaal, budget aur timeline ke hisaab se
- **Pilot test karo** — full deployment se pehle chhote group par
- **Procedures standardize karo** — har observation ek hi tarike se collect ho
- **Data collectors ko train karo** — observer bias aur inconsistency kam karne ke liye
- **Sath-sath validate karo** — forms mein range checks aur mandatory fields daalo
- **Sab kuch document karo** — source, date, method aur known limitations (metadata)
- **Privacy protect karo** — informed consent lo, anonymize karo, data-protection rules follow karo
- **Backup rakho** securely, aur version control maintain karo

**Example:** Agar 5 alag-alag log survey kar rahe hain aur sabne apne-apne tarike se sawaal poocha, toh data mein inconsistency aa jayegi. Isliye sabko ek hi script aur training deni chahiye.

</HindiBox>

### 4.1.7 Common Data Collection Problems

- **Missing Data:** blank fields due to skipped questions or system failures
- **Low Response Rate:** too few people respond, raising non-response bias
- **Measurement Error:** faulty instruments or badly worded questions
- **Duplicate Records:** the same entity recorded more than once
- **Inconsistent Formats:** dates, units, or spellings entered differently
- **Sampling Bias:** the sample doesn't represent the target population
- **Respondent Fatigue:** long surveys lead to careless, low-quality answers
- **Data Entry Errors:** typos, misplaced decimals, wrong column entries
- **Outdated Data:** information that was valid once but no longer is

<HindiBox>

- **Missing Data:** khaali fields — sawaal skip hone ya system failure se
- **Low Response Rate:** bahut kam log jawab dete hain → non-response bias
- **Measurement Error:** kharab instruments ya galat likhe gaye sawaal
- **Duplicate Records:** ek hi entity do baar record ho jaana
- **Inconsistent Formats:** dates, units ya spellings alag-alag tarike se enter hona
- **Sampling Bias:** sample target population ko represent na karna
- **Respondent Fatigue:** lamba survey → careless, low-quality answers
- **Data Entry Errors:** typos, decimal galat jagah, galat column mein entry
- **Outdated Data:** jo information pehle sahi thi lekin ab nahi

**Example:** Ek hi customer ka naam "Rajesh Kumar", "rajesh kumar" aur "R. Kumar" teen alag rows mein hai — analysis mein ye 3 alag customers gine jaayenge. Isliye data cleaning zaroori hai.

</HindiBox>

## 4.2 👥 Population and Sampling

### 4.2.1 Population

The population (also called the *target population*) is the **complete set** of all individuals, objects, or events that a study is about. It must be defined precisely — by who is included, where, and when.

- **Finite population:** countable, e.g. all employees of a company
- **Infinite population:** conceptually unlimited, e.g. all possible coin tosses

Population size is denoted by $N$, and population measures are called **parameters** ($\mu$, $\sigma$, $P$).

<HindiBox>

Population (jise *target population* bhi kehte hain) un sabhi individuals, objects ya events ka **poora set** hai jinke baare mein study ki ja rahi hai. Ise clearly define karna zaroori hai — kaun shamil hai, kahan, aur kab.

- **Finite population:** ginne layak, jaise ek company ke saare employees
- **Infinite population:** conceptually unlimited, jaise coin ke saare possible tosses

Population size $N$ se denote hoti hai, aur population ke measures ko **parameters** kehte hain ($\mu$, $\sigma$, $P$).

**Example:** "Delhi ke saare 18–25 saal ke college students, 2026 mein" — ye ek clearly defined population hai. Sirf "students" kehna bahut vague hoga.

</HindiBox>

### 4.2.2 Sample

A sample is a **subset** selected from the population and actually studied. Its size is denoted by $n$, and its measures are called **statistics** ($\bar{x}$, $s$, $\hat{p}$).

A sample is useful only if it is **representative** — its characteristics should mirror those of the population. Representativeness comes from the *method* of selection (ideally randomization), not merely from the sample being large.

<HindiBox>

Sample population mein se chuna gaya ek **subset** hai jise actually study kiya jaata hai. Iska size $n$ se denote hota hai, aur iske measures ko **statistics** kehte hain ($\bar{x}$, $s$, $\hat{p}$).

Sample tabhi useful hai jab wo **representative** ho — uski characteristics population jaisi honi chahiye. Representativeness selection ke *method* se aati hai (ideally randomization se), sirf sample bada hone se nahi.

**Example:** 10,000 logon ka sample bhi bekaar hai agar sabhi ek hi shehar ke ho aur aap poore India ka anumaan lagana chahte hain. 1,000 logon ka **random** sample usse behtar hoga.

</HindiBox>

### 4.2.3 Census vs Sampling

| Aspect | Census | Sampling |
|---|---|---|
| Coverage | Every member of the population | A subset only |
| Cost & time | Very high | Much lower |
| Accuracy | No sampling error | Has sampling error |
| Practicality | Often infeasible for large populations | Feasible almost always |
| Detail per unit | Usually shallow (too many units) | Can be deep and thorough |
| Destructive testing | Impossible | Possible |

<HindiBox>

| Aspect | Census | Sampling |
|---|---|---|
| Coverage | Population ka har member | Sirf ek hissa |
| Cost & time | Bahut zyada | Kaafi kam |
| Accuracy | Sampling error nahi | Sampling error hota hai |
| Practicality | Badi population ke liye aksar impossible | Lagbhag hamesha possible |
| Har unit ki detail | Usually kam (units bahut zyada) | Gehri aur detailed ho sakti hai |
| Destructive testing | Impossible | Possible |

**Example:** India ka Census har 10 saal mein hota hai — poori population cover hoti hai, lekin bahut mehnga aur lamba process hai. Wahin TV ratings (TRP) sirf kuch hazaar ghar ke sample se nikalti hain — har hafte.

</HindiBox>

### 4.2.4 Why Sampling is Necessary?

- **Cost:** studying everyone is prohibitively expensive
- **Time:** a census can take years; decisions often can't wait
- **Feasibility:** some populations are infinite or impossible to fully list
- **Destructive testing:** testing every unit would destroy the product
- **Better quality:** with fewer units, each can be measured more carefully, often making a good sample *more* accurate than a rushed census
- **Sufficient accuracy:** a well-designed sample gives estimates precise enough for most decisions

<HindiBox>

- **Cost:** sabko study karna bahut mehnga hai
- **Time:** census mein saal lag sakte hain; decisions itna intezaar nahi kar sakte
- **Feasibility:** kuch populations infinite hoti hain ya unki poori list banana impossible
- **Destructive testing:** har unit test karne se product hi khatam ho jayega
- **Behtar quality:** kam units hone par har ek ko dhyan se measure kiya ja sakta hai — isliye achha sample kabhi-kabhi jaldbaazi mein kiye gaye census se *zyada* accurate hota hai
- **Kaafi accuracy:** achhe se design kiya gaya sample zyadatar decisions ke liye kaafi precise hota hai

**Example (Destructive testing):** Ek bulb company ye check karna chahti hai ki bulb kitne ghante chalta hai. Agar wo saare 1 lakh bulbs test kare toh sab jal kar khatam ho jaayenge aur bechne ko kuch bachega hi nahi! Isliye sirf 100 bulbs ka sample test hota hai.

</HindiBox>

### 4.2.5 Sampling Frame

The sampling frame is the **actual list** from which the sample is drawn — for example, a voter roll, a customer database, or a student register. Ideally it matches the target population exactly. In practice, gaps appear:

- **Undercoverage:** population members missing from the frame
- **Overcoverage:** the frame includes people outside the population
- **Duplication:** the same unit listed more than once
- **Outdated entries:** people who moved, left, or died

The difference between the target population and the sampling frame is called **coverage error**, and no amount of good sampling can fix a bad frame.

<HindiBox>

Sampling frame wo **asli list** hai jismese sample nikala jaata hai — jaise voter list, customer database, ya student register. Ideally ye target population se exactly match karni chahiye. Practically gaps aa jaate hain:

- **Undercoverage:** population ke kuch log list mein hain hi nahi
- **Overcoverage:** list mein wo log bhi hain jo population ka hissa nahi
- **Duplication:** ek hi unit do baar listed
- **Outdated entries:** jo log shift ho gaye, chhod gaye, ya nahi rahe

Target population aur sampling frame ke beech ke difference ko **coverage error** kehte hain — aur kharab frame ko koi bhi achhi sampling theek nahi kar sakti.

**Example:** Aap "poore shehar ke logon" ka survey karna chahte hain lekin landline phone directory se naam le rahe hain. Jinke paas landline nahi (zyadatar young log) wo kabhi select ho hi nahi sakte — ye undercoverage hai.

</HindiBox>

### 4.2.6 Sample Size

Sample size ($n$) is the number of units actually studied. For estimating a population proportion, the standard formula is:

$$
n_0 = \frac{Z^2 \, p(1-p)}{E^2}
$$

where $Z$ is the confidence-level z-value (1.96 for 95%), $p$ is the estimated proportion (use $0.5$ for the most conservative estimate), and $E$ is the margin of error.

For a finite population of size $N$, apply the finite population correction:

$$
n = \frac{n_0}{1 + \dfrac{n_0 - 1}{N}}
$$

Larger $n$ reduces the standard error, since $SE = \dfrac{s}{\sqrt{n}}$ — but note the $\sqrt{n}$: to halve the error you must **quadruple** the sample.

<HindiBox>

Sample size ($n$) wo sankhya hai jitni units actually study ki jaati hain. Population proportion estimate karne ka standard formula:

$$
n_0 = \frac{Z^2 \, p(1-p)}{E^2}
$$

Yahan $Z$ confidence level ka z-value hai (95% ke liye 1.96), $p$ estimated proportion (safest ke liye $0.5$ lo), aur $E$ margin of error.

Agar population finite ho (size $N$), toh correction lagao:

$$
n = \frac{n_0}{1 + \dfrac{n_0 - 1}{N}}
$$

Bada $n$ standard error kam karta hai, kyunki $SE = \dfrac{s}{\sqrt{n}}$ — lekin $\sqrt{n}$ par dhyan do: error aadha karne ke liye sample **char guna** karna padta hai.

**Example:** 95% confidence aur $\pm 5\%$ margin of error ke liye:

$$
n_0 = \frac{(1.96)^2 \times 0.5 \times 0.5}{(0.05)^2} \approx 384
$$

Yani lagbhag **384 log** kaafi hain — chahe population 10 lakh ho ya 100 crore! Isi liye national polls sirf kuch hazaar logon se hote hain.

</HindiBox>

### 4.2.7 Sampling Error

Sampling error is the difference between a sample statistic and the true population parameter, arising purely because we studied a subset rather than everyone:

$$
\text{Sampling Error} = \bar{x} - \mu
$$

It is **random, unavoidable, and measurable** — it shrinks as $n$ grows, and is quantified by the standard error and reported as a margin of error:

$$
\text{Margin of Error} = Z \times \frac{s}{\sqrt{n}}
$$

It must not be confused with **non-sampling error** (bias, measurement error, data entry mistakes), which is systematic and does *not* shrink with a larger sample.

<HindiBox>

Sampling error sample statistic aur asli population parameter ke beech ka difference hai, jo sirf isliye aata hai kyunki humne sabko nahi, ek hisse ko study kiya:

$$
\text{Sampling Error} = \bar{x} - \mu
$$

Ye **random, unavoidable aur measurable** hai — $n$ badhne par kam hota hai, aur ise standard error se naapa jaata hai aur margin of error ke roop mein report kiya jaata hai:

$$
\text{Margin of Error} = Z \times \frac{s}{\sqrt{n}}
$$

Ise **non-sampling error** (bias, measurement error, data entry galtiyan) se confuse nahi karna chahiye — wo systematic hota hai aur sample bada karne se kam **nahi** hota.

**Example:** News mein aata hai "Survey ke according 52% log support karte hain, margin of error ±3%." Iska matlab asli figure 49% se 55% ke beech kahin bhi ho sakta hai — yahi sampling error hai.

</HindiBox>

## 4.3 🎲 Sampling Techniques

### 4.3.1 Probability Sampling

In probability sampling, every member of the population has a **known, non-zero chance** of being selected. This is what allows results to be generalized to the population with measurable confidence.

**Simple Random Sampling (SRS)**
Every unit has an equal chance of selection, chosen by lottery or random number generator. For a population of size $N$, each unit's selection probability is $\dfrac{1}{N}$.
*Pros:* unbiased, simple to understand. *Cons:* needs a complete sampling frame; may miss small subgroups by chance.

**Systematic Sampling**
Select every $k$-th unit after a random start, where the sampling interval is:

$$
k = \frac{N}{n}
$$

*Pros:* easy to implement, spreads the sample evenly. *Cons:* dangerous if the list has a hidden periodic pattern matching $k$.

**Stratified Sampling**
Divide the population into homogeneous groups (**strata**) based on a relevant characteristic, then sample from each stratum — usually proportionally:

$$
n_h = n \times \frac{N_h}{N}
$$

*Pros:* guarantees representation of every subgroup; more precise than SRS. *Cons:* requires knowing the strata in advance.

**Cluster Sampling**
Divide the population into naturally occurring groups (**clusters**), randomly select whole clusters, and study everyone within them.
*Pros:* far cheaper for geographically spread populations; no full frame needed. *Cons:* higher sampling error than stratified sampling.

<HindiBox>

Probability sampling mein population ke har member ke select hone ka **known, non-zero chance** hota hai. Isi wajah se results ko poori population par confidently generalize kiya ja sakta hai.

**1. Simple Random Sampling (SRS)** — har unit ka barabar chance, lottery ya random number generator se. Har unit ki probability $\dfrac{1}{N}$.
*Fayda:* unbiased aur simple. *Nuksan:* poori list chahiye; chhote subgroups sanyog se chhoot sakte hain.
🔹 *Example:* 500 students ke naam ek dabbe mein daal kar 50 parchiyaan uthana.

**2. Systematic Sampling** — random start ke baad har $k$-th unit lena, jahan $k = \dfrac{N}{n}$.
*Fayda:* implement karna aasan, sample evenly faila hua. *Nuksan:* agar list mein koi chhupa hua pattern $k$ se match kar jaaye toh khatarnak.
🔹 *Example:* Factory mein har 20th product quality check ke liye uthana.

**3. Stratified Sampling** — population ko similar groups (**strata**) mein baanto, phir har group se sample lo, usually proportionally: $n_h = n \times \dfrac{N_h}{N}$.
*Fayda:* har subgroup ka representation pakka; SRS se zyada precise. *Nuksan:* strata pehle se pata hone chahiye.
🔹 *Example:* College mein 60% girls aur 40% boys hain. 100 ka sample lena hai toh 60 girls aur 40 boys chuno.

**4. Cluster Sampling** — population ko natural groups (**clusters**) mein baanto, kuch poore clusters randomly chuno, aur unke sabhi members study karo.
*Fayda:* door-door faili population ke liye bahut sasta; poori list ki zaroorat nahi. *Nuksan:* stratified se zyada sampling error.
🔹 *Example:* Poore state ke schools ki list banane ke bajaye, 20 schools randomly chuno aur unke saare students survey karo.

**Stratified vs Cluster (sabse common confusion):**

| | Stratified | Cluster |
|---|---|---|
| Groups kaise | Homogeneous (andar se ek jaise) | Heterogeneous (andar se mixed) |
| Kya chunte hain | **Har** group se kuch members | **Kuch** groups, phir unke sab members |
| Maksad | Accuracy badhana | Cost ghatana |

</HindiBox>

### 4.3.2 Non-Probability Sampling

In non-probability sampling, selection is based on judgement, convenience, or accessibility rather than randomness — so the probability of selection is unknown. Results **cannot** be statistically generalized to the population, but these methods are fast, cheap, and useful for exploratory work.

**Convenience Sampling** — selecting whoever is easiest to reach.
*Pros:* fastest and cheapest. *Cons:* highest risk of bias.

**Purposive (Judgemental) Sampling** — the researcher deliberately selects units believed to be most informative.
*Pros:* targets experts or rare cases efficiently. *Cons:* entirely dependent on the researcher's judgement.

**Quota Sampling** — set target counts for subgroups (like stratified sampling), but fill those quotas non-randomly.
*Pros:* ensures subgroup coverage cheaply. *Cons:* selection within each quota is still biased.

**Snowball Sampling** — existing participants refer further participants, growing the sample through referrals.
*Pros:* the only practical way to reach hidden or hard-to-find populations. *Cons:* sample stays limited to connected social networks.

<HindiBox>

Non-probability sampling mein selection randomness se nahi, balki judgement, convenience ya accessibility se hota hai — isliye select hone ki probability unknown hoti hai. Results ko statistically generalize **nahi** kiya ja sakta, lekin ye methods fast, saste aur exploratory kaam ke liye useful hain.

**1. Convenience Sampling** — jo sabse aasani se mil jaaye usi ko chun lena.
*Fayda:* sabse fast aur sasta. *Nuksan:* bias ka sabse zyada risk.
🔹 *Example:* Metro station ke bahar khade hokar jo bhi mile usse survey kar lena.

**2. Purposive (Judgemental) Sampling** — researcher jaan-boojh kar wo units chunta hai jo sabse zyada informative lagti hain.
*Fayda:* experts ya rare cases tak jaldi pahunch. *Nuksan:* poori tarah researcher ke judgement par nirbhar.
🔹 *Example:* AI policy par research ke liye sirf 15 senior AI researchers ko interview karna.

**3. Quota Sampling** — subgroups ke liye target counts fix karo (stratified jaisa), lekin unhe non-randomly bharo.
*Fayda:* subgroup coverage sasta mein pakka. *Nuksan:* har quota ke andar selection ab bhi biased hai.
🔹 *Example:* "50 mard aur 50 auratein chahiye" — lekin jo bhi pehle mil jaaye usse hi bhar lena.

**4. Snowball Sampling** — maujooda participants aur logon ko refer karte hain, aur sample referrals se badhta jaata hai.
*Fayda:* chhupi hui ya mushkil se milne wali population tak pahunchne ka ekmatr practical tarika. *Nuksan:* sample sirf ek social network tak simat jaata hai.
🔹 *Example:* Kisi rare disease ke patients ki study — ek patient dusre patients se milwata hai.

</HindiBox>

### 4.3.3 Hybrid Sampling

Hybrid (or **multi-stage**) sampling combines two or more techniques in sequence, usually to balance accuracy against cost. Large national surveys almost always use this approach.

Common combinations:
- **Stratified + Cluster:** stratify by region, then randomly select clusters within each stratum
- **Multi-stage:** select states → then districts → then villages → then households
- **Stratified + Systematic:** divide into strata, then apply systematic selection within each
- **Probability + Non-probability:** a random main sample, topped up with purposive sampling for rare subgroups

<HindiBox>

Hybrid (ya **multi-stage**) sampling mein do ya zyada techniques ko ek ke baad ek use kiya jaata hai, usually accuracy aur cost ke beech balance banane ke liye. Bade national surveys lagbhag hamesha yahi approach use karte hain.

Common combinations:
- **Stratified + Cluster:** pehle region ke hisaab se strata banao, phir har stratum mein se clusters chuno
- **Multi-stage:** states chuno → phir districts → phir villages → phir households
- **Stratified + Systematic:** strata banao, phir har stratum mein systematic selection
- **Probability + Non-probability:** ek random main sample, aur rare subgroups ke liye purposive sampling se top-up

**Example:** NSSO ke national surveys — pehle states (stratified), phir har state se villages (cluster), phir har village se households (systematic). Isse cost bhi kam rehti hai aur representation bhi banta hai.

</HindiBox>

### 4.3.4 Choosing the Appropriate Sampling Technique

| Your situation | Recommended technique |
|---|---|
| Complete list available, population fairly uniform | Simple Random Sampling |
| Ordered list, need something quick and practical | Systematic Sampling |
| Population has important distinct subgroups | Stratified Sampling |
| Population spread over a wide geographic area | Cluster Sampling |
| Large-scale national study | Hybrid / Multi-stage |
| Early exploratory research, very tight budget | Convenience Sampling |
| Need expert opinion or rare cases | Purposive Sampling |
| Subgroup coverage needed but no frame available | Quota Sampling |
| Hidden or hard-to-reach population | Snowball Sampling |

**Key questions to ask:** Do I have a complete sampling frame? Must results be generalizable? What are my budget and timeline? Are there subgroups I must represent? How geographically dispersed is the population?

<HindiBox>

| Aapki situation | Recommended technique |
|---|---|
| Poori list available, population lagbhag ek jaisi | Simple Random Sampling |
| Ordered list hai, jaldi aur practical chahiye | Systematic Sampling |
| Population mein important alag-alag subgroups hain | Stratified Sampling |
| Population door-door tak faili hui hai | Cluster Sampling |
| Bada national-level study | Hybrid / Multi-stage |
| Shuruaati exploratory research, budget bahut kam | Convenience Sampling |
| Expert opinion ya rare cases chahiye | Purposive Sampling |
| Subgroup coverage chahiye lekin list nahi hai | Quota Sampling |
| Chhupi hui ya mushkil se milne wali population | Snowball Sampling |

**Chunne se pehle ye sawaal poocho:** Kya mere paas poori sampling frame hai? Kya results ko generalize karna zaroori hai? Mera budget aur time kitna hai? Kya koi subgroups hain jinka representation zaroori hai? Population kitni faili hui hai?

**Golden rule:** Agar aapko results ko poori population par apply karna hai, toh **probability sampling** hi use karo. Non-probability sampling sirf exploration ya idea generation ke liye theek hai.

</HindiBox>