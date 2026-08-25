---
id: chapter-9
title: Chapter 9 — Putting Everything Together
description: Ties everything together into a complete statistical analysis workflow and the core habits of statistical thinking.
sidebar_position: 1
---
## 9.1 🔄 Complete Statistical Analysis Workflow

### 9.1.1 The Full Workflow

Every solid statistical analysis follows the same twelve stages. Skipping any one of them is where most flawed analyses go wrong.

```
1.  Research Question       → What exactly am I trying to find out?
2.  Identify Variables      → What is my IV, DV, and possible confounders?
3.  Collect Data            → Sampling method, sample size, ethics
4.  Clean Data              → Duplicates, missing values, errors, formats
5.  Understand Scale        → Nominal / Ordinal / Interval / Ratio
6.  Descriptive Statistics  → Mean, median, SD, IQR, skewness
7.  EDA                     → Plot everything; find patterns and surprises
8.  Check Assumptions       → Normality, homogeneity, independence
9.  Select Statistical Test → Based on variables, groups, distribution
10. Hypothesis Testing      → Run the test; get statistic and p-value
11. Interpret Results       → p-value + effect size + CI + limitations
12. Communicate Findings    → Plain language, honest, decision-focused
```

**The three most commonly skipped stages** — and the damage each causes:

| Skipped stage | What goes wrong |
|---|---|
| **Step 4 (Clean Data)** | Garbage in, garbage out — every downstream number is wrong |
| **Step 7 (EDA)** | You miss the outlier, the bimodal shape, the curved relationship |
| **Step 8 (Assumptions)** | The p-value you report is simply invalid |

**Two properties of this workflow that matter:**

1. **It's iterative, not linear.** EDA (7) routinely sends you back to cleaning (4). A failed assumption check (8) sends you back to test selection (9). This is normal, not a failure.

2. **Decisions must be made in order.** Choosing the test *after* seeing which one gives $p < 0.05$ is p-hacking. Fix your test, your $\alpha$, and your hypothesis direction *before* you look at the results.

<HindiBox>

Har achha statistical analysis inhi 12 stages se guzarta hai. Inme se koi bhi step chhodna hi wo jagah hai jahan zyadatar analyses galat ho jaate hain.

**Poora workflow ek nazar mein:**

| # | Step | Sawaal |
|---|---|---|
| 1 | Research Question | Mujhe exactly kya pata karna hai? |
| 2 | Variables identify | IV, DV, aur confounders kaun se hain? |
| 3 | Data collect | Sampling method, sample size |
| 4 | Data clean | Duplicates, missing, errors |
| 5 | Scale samjho | Nominal/Ordinal/Interval/Ratio |
| 6 | Descriptive stats | Mean, median, SD, IQR |
| 7 | EDA | Sab kuch plot karo |
| 8 | Assumptions check | Normality, homogeneity |
| 9 | Test select | Variables aur groups ke hisaab se |
| 10 | Hypothesis testing | Test chalao |
| 11 | Interpret | p-value + effect size + CI |
| 12 | Communicate | Aam bhasha mein, imaandari se |

**Teen steps jo sabse zyada chhode jaate hain:**

| Chhoda gaya step | Kya bigadta hai |
|---|---|
| **Step 4 (Cleaning)** | Garbage in, garbage out — har aage ka number galat |
| **Step 7 (EDA)** | Outlier, bimodal shape, curved rishta — sab miss |
| **Step 8 (Assumptions)** | Aapki p-value hi invalid ho jaati hai |

**Do zaroori baatein:**

**1. Ye iterative hai, linear nahi.** EDA (7) aksar wapas cleaning (4) par bhej deta hai. Assumption fail hone par (8) wapas test selection (9) par. Ye normal hai, galti nahi.

**2. Decisions order mein leni hai.** Test dekh kar chunna ki kaunsa $p < 0.05$ de raha hai — ye **p-hacking** hai. Apna test, $\alpha$, aur hypothesis ki direction results dekhne se **pehle** fix karo.

**Example:** Aap $p = 0.06$ dekh kar two-tailed se one-tailed test par switch kar dein taaki $p = 0.03$ aa jaaye — ye cheating hai, chahe calculation bilkul sahi ho.

</HindiBox>

## 9.2 🏛️ Basic Pillars of EDA and Statistical Thinking

### 9.2.1 Asking the Right Question

Everything downstream depends on this. A vague question produces a vague analysis that answers nothing.

**A good statistical question is:**
- **Specific** — names the variables and the population
- **Measurable** — every concept can be operationalized
- **Answerable with data** you can realistically obtain
- **Falsifiable** — a possible answer would prove it wrong

| Vague | Sharp |
|---|---|
| "Is our app good?" | "Do users who complete onboarding have higher 30-day retention than those who don't?" |
| "Does marketing work?" | "Did the March campaign increase weekly signups among users aged 18–25?" |
| "Are the two groups different?" | "Is the mean recovery time of Treatment A lower than Treatment B by at least 2 days?" |

**Also decide upfront:** what result would change your decision? If no possible outcome would change what you do next, the analysis isn't worth running.

<HindiBox>

Aage ka sab kuch isi par tika hai. Vague sawaal se vague analysis nikalti hai jo kisi kaam ki nahi hoti.

**Achha statistical question hota hai:**
- **Specific** — variables aur population dono clear
- **Measurable** — har concept ko naapa ja sake
- **Data se answerable** — jo data realistically mil sake
- **Falsifiable** — koi aisa answer possible ho jo ise galat sabit kar de

| Vague | Sharp |
|---|---|
| "Kya hamara app achha hai?" | "Jo users onboarding poora karte hain, kya unka 30-day retention zyada hai?" |
| "Kya marketing kaam karti hai?" | "Kya March campaign se 18–25 age group ke weekly signups badhe?" |
| "Kya do groups alag hain?" | "Kya Treatment A ka recovery time B se kam se kam 2 din kam hai?" |

**Ek aur baat pehle hi tay karo:** kaunsa result aapka decision badal dega? Agar koi bhi nateeja aapke agle kadam ko nahi badalta, toh wo analysis karne ka koi matlab hi nahi hai.

</HindiBox>

### 9.2.2 Understanding the Data

Before computing anything, know what you're holding. Data has context, history, and flaws — and those matter more than any formula.

**The checklist:**
- **Provenance:** Where did this come from? Who collected it, when, and why?
- **Structure:** How many rows and columns? What is one row — a person, a transaction, a day?
- **Definitions:** What does each column actually mean? What are the units?
- **Quality:** Missing values, duplicates, impossible values, inconsistent categories
- **Coverage:** Who is *not* in this data? That absence is often the most important fact.

```python
df.shape            # size
df.info()           # types + non-nulls
df.head(10)         # what does a row look like?
df.isnull().sum()   # where is data missing?
df.duplicated().sum()
df.describe()       # any impossible values?
```

<HindiBox>

Kuch bhi calculate karne se pehle jaan lo ki aapke haath mein hai kya. Data ka apna context, history aur khamiyan hoti hain — aur ye kisi bhi formula se zyada matter karti hain.

**Checklist:**
- **Provenance:** Ye kahan se aaya? Kisne, kab aur kyun collect kiya?
- **Structure:** Kitni rows-columns? Ek row ka matlab kya hai — ek insaan, ek transaction, ek din?
- **Definitions:** Har column ka asal matlab kya hai? Units kya hain?
- **Quality:** Missing values, duplicates, impossible values, inconsistent categories
- **Coverage:** Is data mein kaun **nahi** hai? Ye gair-maujoodgi aksar sabse zaroori baat hoti hai.

**Sabse important sawaal — "Kaun missing hai?"**

**Example:** Ek app ke feedback data mein sirf un logon ke jawab hain jo app abhi bhi use kar rahe hain. Jo log app chhod chuke hain — jinki raay sabse zyada zaroori thi — wo data mein hain hi nahi. Isi ko **survivorship bias** kehte hain.

**Sabse pehle ye 5 commands chalao:** `df.shape`, `df.info()`, `df.head()`, `df.isnull().sum()`, `df.describe()` — 1 minute mein poora andaza lag jaayega.

</HindiBox>

### 9.2.3 Understanding Distribution

The distribution's shape determines everything that follows — which summary statistic is honest, which test is valid, and whether transformation is needed.

**What to look at:**

| Property | Tool | Why it matters |
|---|---|---|
| **Shape** | Histogram, density plot | Symmetric vs skewed vs bimodal |
| **Normality** | Q-Q plot, Shapiro-Wilk | Determines parametric vs non-parametric |
| **Skewness** | $-1$ to $+1$ acceptable | Decides mean vs median |
| **Kurtosis** | Excess kurtosis | Heavy tails → more extreme values |
| **Modality** | Histogram | Bimodal often means two hidden subgroups |

**A bimodal distribution is a signal, not a nuisance.** It usually means you've mixed two populations — and analyzing them together produces a mean that describes neither.

<HindiBox>

Distribution ki shape aage ka sab kuch tay karti hai — kaunsi summary statistic imaandar hai, kaunsa test valid hai, aur transformation chahiye ya nahi.

| Property | Tool | Kyun zaroori |
|---|---|---|
| **Shape** | Histogram, density plot | Symmetric, skewed, ya bimodal |
| **Normality** | Q-Q plot, Shapiro-Wilk | Parametric ya non-parametric |
| **Skewness** | $-1$ se $+1$ acceptable | Mean use karein ya median |
| **Kurtosis** | Excess kurtosis | Bhaari tails → zyada extreme values |
| **Modality** | Histogram | Bimodal = do chhupe hue groups |

**Bimodal distribution ek signal hai, problem nahi.** Iska matlab usually ye hai ki aapne do alag populations mila di hain — aur unhe saath analyze karne se aisa mean nikalta hai jo kisi ka bhi sahi representation nahi.

**Example:** Ek company ki salary distribution mein do peaks dikhein — ek ₹30k ke aas-paas, dusra ₹1.5 lakh ke aas-paas. Ye do alag groups hain (junior aur senior). Inka combined average ₹60k kisi ki bhi asli salary nahi hai.

</HindiBox>

### 9.2.4 Measuring Central Tendency

The "typical" value is not a single concept — pick the one that is honest for your data's shape.

| Measure | Use when | Breaks when |
|---|---|---|
| **Mean** | Symmetric data, no outliers | Skewed data or outliers present |
| **Median** | Skewed data, outliers, ordinal | Multimodal data |
| **Mode** | Categorical data | Continuous data (rarely repeats) |

**Quick diagnostic:** compare mean and median.

$$
\text{Mean} \approx \text{Median} \Rightarrow \text{symmetric}
$$
$$
\text{Mean} > \text{Median} \Rightarrow \text{right-skewed}
$$
$$
\text{Mean} < \text{Median} \Rightarrow \text{left-skewed}
$$

**The reporting rule:** for skewed data, report **median with IQR**; for symmetric data, report **mean with SD**.

<HindiBox>

"Typical value" ek hi cheez nahi hai — apne data ki shape ke hisaab se imaandar measure chuno.

| Measure | Kab use karein | Kab bekaar |
|---|---|---|
| **Mean** | Symmetric data, koi outlier nahi | Skewed data ya outliers |
| **Median** | Skewed data, outliers, ordinal | Multimodal data |
| **Mode** | Categorical data | Continuous data |

**Jaldi diagnostic — mean aur median compare karo:**
- Barabar → symmetric
- Mean > Median → right-skewed
- Mean < Median → left-skewed

**Reporting ka rule:** Skewed data → **Median + IQR**. Symmetric data → **Mean + SD**.

**Classic example:** Ek office mein 9 logon ki salary ₹30k hai aur boss ki ₹5 lakh.
- Mean = ₹77,000 — jo kisi ki bhi salary nahi
- Median = ₹30,000 — jo 9 logon ki asli sthiti hai

Media aur politics mein aksar mean ya median jaan-boojh kar chuna jaata hai — jo baat sabit karni ho uske hisaab se.

</HindiBox>

### 9.2.5 Measuring Variability

Central tendency alone is half a story. Two datasets with identical means can behave completely differently.

| Measure | Best for |
|---|---|
| **Range** | Quick, rough sense of spread |
| **IQR** | Skewed data or data with outliers |
| **Variance** | Further calculations (ANOVA, regression) |
| **Standard Deviation** | Symmetric data — most interpretable |
| **Coefficient of Variation** | Comparing spread across different units |

$$
CV = \frac{s}{\bar{x}} \times 100\%
$$

**Why CV matters:** an SD of 5 means very different things for a variable averaging 10 versus one averaging 1000. CV standardizes it, making cross-variable comparison possible.

<HindiBox>

Sirf central tendency aadhi kahani hai. Do datasets ka mean bilkul same ho sakta hai lekin behaviour ekdum alag.

| Measure | Kab best |
|---|---|
| **Range** | Jaldi mota-moti andaza |
| **IQR** | Skewed data ya outliers |
| **Variance** | Aage ke calculations (ANOVA, regression) |
| **Standard Deviation** | Symmetric data — sabse samajhne layak |
| **Coefficient of Variation** | Alag units wale variables compare karna |

$$
CV = \frac{s}{\bar{x}} \times 100\%
$$

**CV kyun zaroori:** SD = 5 ka matlab bilkul alag hai jab average 10 ho, aur jab average 1000 ho. CV isse standardize kar deta hai.

**Example:** Do batsmen ka average 45 runs hai. Pehle ki SD 8 hai, doosre ki 35. Average same, lekin pehla **consistent** hai aur doosra unpredictable. Team selection ke liye ye baat average se zyada matter karti hai.

**Yaad rakho:** Variability sirf "shor" nahi hoti — aksar wahi asli kahani hoti hai.

</HindiBox>

### 9.2.6 Detecting Outliers

An outlier is a point far from the rest of the data. It may be an error, or it may be the most important observation you have.

**Detection methods:**

$$
\text{IQR: } x < Q_1 - 1.5 \times IQR \;\text{ or }\; x > Q_3 + 1.5 \times IQR
$$

$$
\text{Z-score: } |z| = \left|\frac{x - \bar{x}}{s}\right| > 3
$$

Also: box plots, scatter plots, Mahalanobis distance (multivariate), Isolation Forest.

**The decision process — investigate before you act:**

| Cause | Action |
|---|---|
| Data entry error | Correct it, or remove it |
| Measurement fault | Remove, and document why |
| Genuine extreme value | **Keep it** — use robust methods |
| Different population | Analyze separately |

**Never delete an outlier just because it is inconvenient.** Deleting real extreme values biases your results and hides exactly the phenomena that are often most interesting — fraud, breakthrough performance, system failure.

<HindiBox>

Outlier wo point hai jo baaki data se bahut door hai. Ye error bhi ho sakta hai, aur aapka sabse zaroori observation bhi.

**Detection methods:** IQR method ($1.5 \times IQR$ rule), Z-score ($|z| > 3$), box plots, Mahalanobis distance.

**Decision process — pehle jaancho, phir kadam uthao:**

| Kaaran | Kya karein |
|---|---|
| Data entry error | Theek karo ya hatao |
| Measurement fault | Hatao, aur wajah likho |
| Asli extreme value | **Rakho** — robust methods use karo |
| Alag population | Alag se analyze karo |

**⚠️ Outlier ko sirf isliye mat hatao ki wo "pareshan" kar raha hai.** Asli extreme values hatane se results biased ho jaate hain aur wahi cheezein chhup jaati hain jo aksar sabse interesting hoti hain — fraud, breakthrough performance, system failure.

**Example:** Credit card fraud detection mein **outliers hi asli target hain**. Agar aap unhe "clean" kar dein toh poora system hi bekaar ho jaayega.

</HindiBox>

### 9.2.7 Understanding Relationships

Once you understand variables individually, examine how they move together.

**Choosing the right measure:**

| Variable pair | Method |
|---|---|
| Numeric × Numeric (linear) | Pearson $r$ |
| Numeric × Numeric (monotonic) | Spearman $\rho$ |
| Categorical × Numeric | Group means, t-test, ANOVA |
| Categorical × Categorical | Chi-square, Cramér's V |

**Three warnings that catch almost everyone:**

1. **$r = 0$ does not mean "no relationship."** It means no *linear* relationship. A perfect U-shaped curve has $r \approx 0$.
2. **Correlation is extremely sensitive to outliers.** One point can move $r$ from 0.1 to 0.9.
3. **Correlation never proves causation.** Confounding, reverse causation, and coincidence all produce correlation without cause.

**Always plot before you trust a coefficient.** Anscombe's Quartet — four datasets with identical $r = 0.816$ but completely different shapes — exists precisely to make this point.

<HindiBox>

Jab har variable ko alag samajh lo, tab dekho ki wo saath mein kaise badalte hain.

| Variable pair | Method |
|---|---|
| Numeric × Numeric (linear) | Pearson $r$ |
| Numeric × Numeric (monotonic) | Spearman $\rho$ |
| Categorical × Numeric | Group means, t-test, ANOVA |
| Categorical × Categorical | Chi-square, Cramér's V |

**Teen warnings jo lagbhag sabko pakadti hain:**

1. **$r = 0$ ka matlab "koi rishta nahi" nahi hai.** Matlab sirf "koi *seedha* rishta nahi." Ek perfect U-shape curve ka bhi $r \approx 0$ aata hai.
2. **Correlation outliers se bahut affect hota hai.** Ek point $r$ ko 0.1 se 0.9 kar sakta hai.
3. **Correlation kabhi causation sabit nahi karta.**

**Coefficient par bharosa karne se pehle hamesha plot karo.** Anscombe's Quartet mein chaar datasets hain jinka $r = 0.816$ bilkul same hai lekin shapes ekdum alag — ek linear, ek curved, ek sirf ek outlier ki wajah se.

**10 second ka plot** aapko ghante ki galat analysis se bacha sakta hai.

</HindiBox>

### 9.2.8 Testing Hypotheses

Hypothesis testing formalizes the question: *is what I'm seeing bigger than random noise?*

**The sequence:**
1. State $H_0$ and $H_1$ — **before** looking at results
2. Fix $\alpha$ — **before** looking at results
3. Check assumptions
4. Select the test that matches your design
5. Compute the statistic and p-value
6. Decide: $p \leq \alpha$ → reject $H_0$

**Test selection in two questions:**
- Is my outcome **numerical or categorical**?
- Are my groups **independent or paired**?

These two answers get you to the right test in most cases.

**What p really means:**

$$
p = P(\text{data at least this extreme} \mid H_0 \text{ true})
$$

It is *not* the probability that $H_0$ is true, and *not* the probability your result was chance.

<HindiBox>

Hypothesis testing sawaal ko formal banata hai: *jo main dekh raha hoon, kya wo random shor se bada hai?*

**Sequence:**
1. $H_0$ aur $H_1$ likho — results dekhne se **pehle**
2. $\alpha$ fix karo — results dekhne se **pehle**
3. Assumptions check karo
4. Apne design ke hisaab se test chuno
5. Statistic aur p-value nikalo
6. Decide: $p \leq \alpha$ → $H_0$ reject

**Test chunne ke sirf do sawaal:**
- Mera outcome **numerical hai ya categorical**?
- Mere groups **independent hain ya paired**?

In do jawabon se 80% cases mein sahi test mil jaata hai.

**p-value ka asli matlab:** "Agar sach mein koi effect nahi hota, toh mujhe aisa data milne ka chance kitna tha?"

**Ye NAHI hai:** $H_0$ ke sach hone ki probability, ya "result sanyog se aaya" ki probability.

**Yaad rakhne ka tarika:** *"If p is low, the null must go."*

</HindiBox>

### 9.2.9 Interpreting Results

A p-value alone is an incomplete answer. A responsible interpretation has four parts.

| Component | Question answered |
|---|---|
| **p-value** | Is the effect real, or plausibly noise? |
| **Effect size** | How big is it? |
| **Confidence interval** | How precise is the estimate? |
| **Context** | Does this magnitude matter here? |

**Standard reporting format:**

> Group A ($M = 78.4$, $SD = 8.2$, $n = 40$) scored significantly higher than Group B ($M = 71.6$, $SD = 9.1$, $n = 38$), $t(76) = 3.42$, $p = .001$, $d = 0.79$, 95% CI [2.84, 10.76].

**Statistical vs practical significance:** with a large enough $n$, a trivial effect becomes statistically significant, because $SE = s/\sqrt{n}$ shrinks toward zero. Always ask whether the effect size would change a real decision.

**Also state your limitations:** sampling method, assumptions that were shaky, confounders you couldn't control, and whether the design supports causal claims at all.

<HindiBox>

Sirf p-value ek adhoora jawab hai. Zimmedar interpretation ke chaar hisse hote hain.

| Component | Kaunsa sawaal answer karta hai |
|---|---|
| **p-value** | Effect asli hai ya shor? |
| **Effect size** | Kitna bada hai? |
| **Confidence interval** | Estimate kitna precise hai? |
| **Context** | Kya itne size se yahan farak padta hai? |

**Standard reporting format:**
> Group A ($M = 78.4$, $SD = 8.2$) ke marks Group B ($M = 71.6$, $SD = 9.1$) se significantly zyada the, $t(76) = 3.42$, $p = .001$, $d = 0.79$, 95% CI [2.84, 10.76].

**Statistical vs Practical significance:** bahut bade $n$ ke sath mamooli effect bhi "significant" ban jaata hai, kyunki $SE = s/\sqrt{n}$ zero ki taraf chala jaata hai.

**Example:** Nayi dawai BP ko **0.3 mmHg** kam karti hai, 5 lakh logon par $p < 0.001$. Statistically significant — bilkul. Practically useless — bilkul. 0.3 mmHg se kisi ki sehat par koi asar nahi.

**Apni limitations bhi zaroor likho:** sampling method, kamzor assumptions, jo confounders control nahi kar paaye, aur kya aapka design causal claim support karta bhi hai ya nahi.

</HindiBox>

### 9.2.10 Avoiding Statistical Misinterpretation

The most common ways analyses go wrong — and how to avoid each.

| Mistake | Reality | Fix |
|---|---|---|
| **Correlation ⇒ causation** | Confounders, reverse causation, coincidence | Only claim causation from randomized experiments |
| **p-value = probability $H_0$ is true** | It's $P(\text{data} \mid H_0)$, not $P(H_0 \mid \text{data})$ | Learn the definition precisely |
| **$p > .05$ proves no effect** | Absence of evidence ≠ evidence of absence | Report CI; consider power |
| **p-hacking** | Testing until something hits $p < .05$ | Pre-register; correct for multiple tests |
| **Ignoring effect size** | Significant ≠ important | Always report $d$, $r$, or $\eta^2$ |
| **Cherry-picking** | Reporting only favourable results | Report everything you ran |
| **Simpson's Paradox** | Trends reverse when groups are combined | Always check subgroups |
| **Survivorship bias** | Only analyzing what survived | Ask who is *missing* from the data |
| **Extrapolating** | Predicting outside the observed range | State the valid range explicitly |
| **Ignoring assumptions** | Invalid p-values | Check normality, variance, independence |

**Simpson's Paradox deserves special attention** — it is the most counter-intuitive of these. A treatment can appear better in *every* subgroup yet worse overall, purely because of how group sizes are distributed. The only defence is to always disaggregate before concluding.

**The single best habit:** before believing your own result, ask *"what else could explain this?"* — and try honestly to answer it.

<HindiBox>

Analyses galat hone ke sabse common tarike — aur har ek se bachne ka upay.

| Galti | Sachai | Upay |
|---|---|---|
| **Correlation ⇒ causation** | Confounders, reverse causation, sanyog | Causation sirf randomized experiment se |
| **p-value = $H_0$ sach hone ki probability** | Ye $P(\text{data} \mid H_0)$ hai, ulta nahi | Definition theek se seekho |
| **$p > .05$ = koi effect nahi** | Evidence na milna ≠ effect na hona | CI report karo; power dekho |
| **p-hacking** | Jab tak $p < .05$ na aaye, test karte rehna | Pehle se plan; multiple tests correct karo |
| **Effect size ignore karna** | Significant ≠ important | Hamesha $d$, $r$, ya $\eta^2$ do |
| **Cherry-picking** | Sirf achhe results dikhana | Jo bhi chalaya, sab batao |
| **Simpson's Paradox** | Groups milane par trend ulta ho jaata hai | Subgroups hamesha check karo |
| **Survivorship bias** | Sirf bache hue cases dekhna | Poocho: data mein kaun **nahi** hai? |
| **Extrapolating** | Observed range se bahar predict karna | Valid range saaf batao |
| **Assumptions ignore karna** | p-value hi invalid | Normality, variance, independence check |

**Simpson's Paradox par khaas dhyan** — ye sabse ulti-samajh wali cheez hai. Ek treatment **har subgroup** mein behtar dikh sakta hai, phir bhi overall kharab — sirf isliye ki group sizes alag hain. Iska ekmatr bachav hai — conclusion se pehle hamesha data ko subgroups mein todkar dekhna.

**Sabse achhi aadat:** apne hi result par yakeen karne se pehle poocho — *"iska aur kya explanation ho sakta hai?"* — aur imaandari se uska jawab dhoondho.

**Aakhiri baat:** Statistics ka maksad ye sabit karna nahi hai ki aap sahi hain — balki ye pata lagana hai ki sach kya hai. Ye farak hi ek achhe analyst ko dusron se alag karta hai.

</HindiBox>