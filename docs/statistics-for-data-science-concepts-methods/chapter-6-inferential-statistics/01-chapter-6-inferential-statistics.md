---
id: chapter-6
title: Chapter 6 — Inferential Statistics
description: Introduces inferential statistics, the logic of hypothesis testing, Type I and Type II errors, and confidence intervals.
sidebar_position: 1
---
## 6.1 🔮 Introduction to Inferential Statistics
### 6.1.1 Descriptive vs Inferential Statistics

**Descriptive Statistics** summarizes the data you actually have. Its conclusions apply only to that dataset — no uncertainty is involved, because you are simply describing what is in front of you.

**Inferential Statistics** uses a sample to draw conclusions about a larger population. Because you are generalizing beyond what you observed, every conclusion carries **uncertainty**, which inferential statistics quantifies using probability.

| Aspect | Descriptive | Inferential |
|---|---|---|
| Scope | The data in hand | Beyond the data (population) |
| Goal | Summarize | Generalize, test, predict |
| Uncertainty | None | Always quantified |
| Tools | Mean, SD, charts | Confidence intervals, hypothesis tests |
| Output | "This is what we saw" | "This is what it likely means" |

<HindiBox>

**Descriptive Statistics** sirf us data ko summarize karti hai jo aapke paas hai. Iske conclusions sirf usi dataset par lagu hote hain — koi uncertainty nahi hoti, kyunki aap bas jo saamne hai use describe kar rahe ho.

**Inferential Statistics** ek sample use karke badi population ke baare mein conclusions nikalti hai. Kyunki aap observed data se aage generalize kar rahe ho, isliye har conclusion mein **uncertainty** hoti hai — aur inferential statistics us uncertainty ko probability se naapti hai.

| Aspect | Descriptive | Inferential |
|---|---|---|
| Scope | Jo data paas hai | Data se aage (population) |
| Goal | Summarize karna | Generalize, test, predict |
| Uncertainty | Nahi | Hamesha, aur naapi jaati hai |
| Tools | Mean, SD, charts | Confidence intervals, hypothesis tests |
| Output | "Humne ye dekha" | "Iska matlab shayad ye hai" |

**Example:** "Hamare sample ke 500 logon ka average income ₹45,000 hai" — **Descriptive**. "Hum 95% confidence ke sath keh sakte hain ki poore shehar ka average income ₹43,000 se ₹47,000 ke beech hai" — **Inferential**.

</HindiBox>

### 6.1.2 Population Parameters

A parameter is a numerical characteristic of the **entire population**. Parameters are fixed but usually **unknown** — that is precisely why we do inference.

| Parameter | Symbol | Meaning |
|---|---|---|
| Population mean | $\mu$ | Average of all values |
| Population SD | $\sigma$ | Spread of all values |
| Population variance | $\sigma^2$ | Squared spread |
| Population proportion | $P$ or $\pi$ | Fraction with a trait |
| Population size | $N$ | Total count |
| Population correlation | $\rho$ | Association strength |

<HindiBox>

Parameter **poori population** ki ek numerical characteristic hai. Parameters fixed hote hain lekin usually **unknown** — aur isi wajah se hum inference karte hain.

| Parameter | Symbol | Matlab |
|---|---|---|
| Population mean | $\mu$ | Saari values ka average |
| Population SD | $\sigma$ | Saari values ka spread |
| Population variance | $\sigma^2$ | Squared spread |
| Population proportion | $P$ ya $\pi$ | Kitne hisse mein wo trait hai |
| Population size | $N$ | Total count |
| Population correlation | $\rho$ | Association ki strength |

**Yaad rakhne ka tarika:** Parameters ke liye **Greek letters** ($\mu$, $\sigma$, $\rho$) use hote hain — "P for Population, P for Parameter, aur Greek letters".

**Example:** India ke saare logon ki asli average height $\mu$ hai. Ye ek fixed number hai — lekin humein kabhi exactly pata nahi chalega, kyunki 140 crore logon ko naapna possible nahi.

</HindiBox>

### 6.1.3 Sample Statistics

A statistic is a numerical characteristic calculated from a **sample**. Statistics are **known** (you computed them) but they **vary** from sample to sample.

| Statistic | Symbol | Estimates |
|---|---|---|
| Sample mean | $\bar{x}$ | $\mu$ |
| Sample SD | $s$ | $\sigma$ |
| Sample variance | $s^2$ | $\sigma^2$ |
| Sample proportion | $\hat{p}$ | $P$ |
| Sample size | $n$ | — |
| Sample correlation | $r$ | $\rho$ |

A statistic is called an **unbiased estimator** if its expected value equals the parameter, e.g. $E[\bar{x}] = \mu$.

<HindiBox>

Statistic ek numerical characteristic hai jo **sample** se calculate hoti hai. Statistics **known** hote hain (aapne khud nikale hain) lekin har sample mein **badalte** hain.

| Statistic | Symbol | Kiska estimate |
|---|---|---|
| Sample mean | $\bar{x}$ | $\mu$ |
| Sample SD | $s$ | $\sigma$ |
| Sample variance | $s^2$ | $\sigma^2$ |
| Sample proportion | $\hat{p}$ | $P$ |
| Sample size | $n$ | — |
| Sample correlation | $r$ | $\rho$ |

Ek statistic ko **unbiased estimator** kehte hain jab uski expected value parameter ke barabar ho, jaise $E[\bar{x}] = \mu$.

**Sabse important baat:** Parameter **fixed** hai lekin unknown; Statistic **known** hai lekin badalta rehta hai. Statistics ka poora khel isi gap ko samajhne ka hai.

**Example:** 1000 logon ka sample lekar average height 165 cm nikli — ye $\bar{x}$ hai. Agle 1000 log lene par 166 cm aa sakti hai. $\bar{x}$ badalta hai, lekin asli $\mu$ waisa hi rehta hai.

</HindiBox>

### 6.1.4 Sampling Distribution

A sampling distribution is the distribution of a **statistic** (not raw data) across all possible samples of the same size drawn from a population. It is the theoretical bridge that makes inference possible.

For the sample mean:

$$
\mu_{\bar{x}} = \mu \qquad\text{and}\qquad \sigma_{\bar{x}} = \frac{\sigma}{\sqrt{n}}
$$

where $\sigma_{\bar{x}}$ is the **standard error** of the mean.

**Central Limit Theorem (CLT)** — the single most important result in inferential statistics: as $n$ increases, the sampling distribution of $\bar{x}$ approaches a normal distribution **regardless of the population's shape**:

$$
\bar{x} \sim N\!\left(\mu,\; \frac{\sigma^2}{n}\right) \quad \text{for large } n
$$

In practice $n \geq 30$ is usually sufficient. This is why we can use normal-based methods even when the underlying data is skewed.

<HindiBox>

Sampling distribution kisi **statistic** ki distribution hai (raw data ki nahi) — jab ek hi size ke saare possible samples population se liye jaayein. Yahi theoretical pul hai jo inference possible banata hai.

Sample mean ke liye:

$$
\mu_{\bar{x}} = \mu, \qquad \sigma_{\bar{x}} = \frac{\sigma}{\sqrt{n}}
$$

Yahan $\sigma_{\bar{x}}$ ko **standard error** kehte hain.

**Central Limit Theorem (CLT)** — inferential statistics ka sabse important result: $n$ badhne par $\bar{x}$ ki sampling distribution normal ban jaati hai, **chahe population ki shape kuch bhi ho**:

$$
\bar{x} \sim N\!\left(\mu,\; \frac{\sigma^2}{n}\right)
$$

Practically $n \geq 30$ kaafi hota hai. Isi wajah se hum normal-based methods use kar sakte hain, chahe original data skewed ho.

**Example:** Ek pasa (dice) ki single throw ki distribution flat hoti hai (har number ka barabar chance). Lekin agar aap 30 throws ka average nikalein, aur ye hazaar baar karein — un averages ki distribution bell curve banegi! Yahi CLT ka jaadu hai.

**Dhyan do:** SD data ka spread batata hai; Standard Error **statistic** ka spread batata hai. $n$ badhane se SD nahi badalta, lekin SE chhota ho jaata hai.

</HindiBox>

### 6.1.5 Statistical Inference

Statistical inference is the process of drawing conclusions about a population from sample data, while explicitly accounting for uncertainty. It has two main branches:

1. **Estimation** — what is the value of the parameter? (point and interval estimates)
2. **Hypothesis Testing** — is a specific claim about the parameter supported by the data?

**Two philosophical approaches:**
- **Frequentist:** parameters are fixed; probability describes long-run frequency of the data. Uses p-values and confidence intervals.
- **Bayesian:** parameters are random variables with distributions; prior beliefs are updated by data into a posterior. Uses credible intervals.

Inference always requires **randomization** in the sampling — without it, no amount of mathematics can justify generalizing to the population.

<HindiBox>

Statistical inference wo process hai jisme sample data se population ke baare mein conclusions nikale jaate hain, aur uncertainty ko saaf-saaf hisaab mein liya jaata hai. Iski do main branches hain:

1. **Estimation** — parameter ki value kya hai? (point aur interval estimates)
2. **Hypothesis Testing** — parameter ke baare mein koi specific claim data se support hota hai ya nahi?

**Do philosophical approaches:**
- **Frequentist:** parameters fixed hote hain; probability data ki long-run frequency batati hai. p-values aur confidence intervals use karta hai.
- **Bayesian:** parameters khud random variables hote hain; prior beliefs ko data se update karke posterior banaya jaata hai. Credible intervals use karta hai.

Inference ke liye sampling mein **randomization** zaroori hai — uske bina koi bhi maths population par generalize karne ko justify nahi kar sakti.

**Example:** Aap 500 voters se poochte hain aur nikalta hai ki 52% support kar rahe hain. Inference ye batati hai ki asli figure kya ho sakta hai (estimation), ya kya 50% se zyada support hona statistically sabit hota hai (hypothesis testing).

</HindiBox>

### 6.1.6 Estimation

Estimation uses sample data to approximate an unknown population parameter.

**Point Estimation** — a single best-guess value, e.g. $\bar{x} = 45{,}000$ estimates $\mu$. Simple, but gives no sense of precision.

**Interval Estimation** — a range of plausible values with an attached confidence level, e.g. $[43{,}000,\; 47{,}000]$ at 95% confidence.

**Properties of a good estimator:**
- **Unbiased:** $E[\hat{\theta}] = \theta$ — correct on average
- **Consistent:** converges to $\theta$ as $n \to \infty$
- **Efficient:** has the smallest variance among unbiased estimators
- **Sufficient:** uses all the relevant information in the sample

<HindiBox>

Estimation mein sample data se unknown population parameter ka andaza lagaya jaata hai.

**Point Estimation** — ek single best-guess value, jaise $\bar{x} = 45{,}000$ se $\mu$ ka estimate. Simple hai, lekin precision ka koi andaza nahi deta.

**Interval Estimation** — plausible values ki ek range, confidence level ke sath, jaise 95% confidence par $[43{,}000,\; 47{,}000]$.

**Achhe estimator ki properties:**
- **Unbiased:** $E[\hat{\theta}] = \theta$ — average mein sahi
- **Consistent:** $n \to \infty$ par $\theta$ ke paas pahunch jaata hai
- **Efficient:** unbiased estimators mein sabse kam variance
- **Sufficient:** sample ki saari relevant information use karta hai

**Example:** "Bus 10 minute mein aayegi" — Point estimate. "Bus 8 se 13 minute ke beech aayegi" — Interval estimate. Dusra zyada honest hai, kyunki wo uncertainty bhi batata hai.

</HindiBox>

### 6.1.7 Hypothesis Testing

Hypothesis testing is a formal procedure for deciding whether sample evidence is strong enough to reject a default claim about the population.

**The standard steps:**
1. State the null ($H_0$) and alternative ($H_1$) hypotheses
2. Choose the significance level $\alpha$ (usually 0.05)
3. Select the appropriate test based on data type and assumptions
4. Compute the test statistic from the sample
5. Find the p-value (or compare against the critical value)
6. Make a decision: reject or fail to reject $H_0$
7. Interpret the result in the context of the original question

The logic mirrors a courtroom: the null hypothesis is "innocent until proven guilty" — we never *prove* $H_0$ true, we only find insufficient evidence against it.

<HindiBox>

Hypothesis testing ek formal procedure hai jisse decide kiya jaata hai ki sample ka evidence itna strong hai ya nahi ki population ke baare mein ek default claim ko reject kiya ja sake.

**Standard steps:**
1. Null ($H_0$) aur alternative ($H_1$) hypotheses likho
2. Significance level $\alpha$ chuno (usually 0.05)
3. Data type aur assumptions ke hisaab se sahi test chuno
4. Sample se test statistic calculate karo
5. p-value nikalo (ya critical value se compare karo)
6. Decision lo: $H_0$ reject karo ya reject karne mein fail raho
7. Result ko original sawaal ke context mein interpret karo

**Court ka analogy:** Null hypothesis ka matlab hai "jab tak dosh sabit na ho, insaan nirdosh hai." Hum $H_0$ ko kabhi *sach sabit* nahi karte — hum sirf ye kehte hain ki uske khilaaf kaafi evidence nahi mila.

**Example:** Ek company kehti hai uski dawai purani dawai se behtar hai. $H_0$: "koi farak nahi hai." Trial ka data agar strong ho, tabhi hum $H_0$ reject karke kehte hain ki nayi dawai behtar hai.

</HindiBox>

## 6.2 🧪 Hypothesis Testing

### 6.2.1 What is a Hypothesis?

A hypothesis is a **specific, testable statement** about a population parameter — a claim that data can potentially support or contradict.

**Requirements of a good hypothesis:**
- **Testable:** it must be possible to gather data that bears on it
- **Falsifiable:** there must be some possible result that would contradict it
- **Specific:** stated precisely, not vaguely
- **About a parameter:** it concerns the population, not the sample

Note the direction of reasoning: hypotheses are stated *before* looking at the data. Formulating a hypothesis after seeing the results and testing it on the same data is called **HARKing** (Hypothesizing After Results are Known) and invalidates the test.

<HindiBox>

Hypothesis ek **specific, testable statement** hai population parameter ke baare mein — ek claim jise data support ya contradict kar sakta hai.

**Achhi hypothesis ki requirements:**
- **Testable:** uske baare mein data collect karna possible ho
- **Falsifiable:** koi aisa possible result ho jo use galat sabit kare
- **Specific:** clearly likha ho, vague nahi
- **Parameter ke baare mein:** population ke baare mein, sample ke nahi

**Bahut important:** Hypothesis data dekhne se **pehle** banai jaati hai. Results dekhne ke baad hypothesis banana aur usi data par test karna **HARKing** kehlata hai — aur isse test bekaar ho jaata hai.

**Example:**
- ✅ Achhi hypothesis: "Naya training program employees ki productivity 10% badhata hai"
- ❌ Kharab hypothesis: "Naya training program achha hai" (testable nahi, specific nahi)

</HindiBox>

### 6.2.2 Research Hypothesis

The research hypothesis is the statement of what the researcher actually **believes or expects** — the substantive claim the study was designed to investigate. It is expressed in the language of the subject matter, not in statistical notation.

It usually corresponds to the **alternative hypothesis** ($H_1$) in the formal test. Types:

- **Directional:** predicts a specific direction ("Group A will score *higher* than Group B")
- **Non-directional:** predicts a difference without direction ("Groups A and B will *differ*")

<HindiBox>

Research hypothesis wo statement hai jo researcher asal mein **maanta ya expect karta** hai — wo substantive claim jiske liye poori study design ki gayi. Ye subject ki bhasha mein likhi jaati hai, statistical notation mein nahi.

Ye usually formal test ke **alternative hypothesis** ($H_1$) se match karti hai. Types:

- **Directional:** specific direction predict karti hai ("Group A ka score Group B se *zyada* hoga")
- **Non-directional:** sirf difference predict karti hai, direction nahi ("Group A aur B *alag* honge")

**Example:** Ek teacher maanti hai ki "Online classes se offline classes ke muqable results behtar aate hain" — ye uski **Research Hypothesis** hai. Statistically ise $H_1$ ke roop mein likha jaayega.

</HindiBox>

### 6.2.3 Null Hypothesis

The null hypothesis ($H_0$) is the **default position** — typically that there is no effect, no difference, or no relationship. It always contains an equality ($=$, $\leq$, or $\geq$) and is the hypothesis actually being tested.

Examples:

$$
H_0: \mu = 100 \qquad H_0: \mu_1 = \mu_2 \qquad H_0: \rho = 0
$$

**Critical points about $H_0$:**
- It is *assumed true* for the purpose of calculating the test statistic
- We either **reject** it or **fail to reject** it — we never "accept" or "prove" it
- Failing to reject $H_0$ means insufficient evidence, **not** that $H_0$ is true

<HindiBox>

Null hypothesis ($H_0$) **default position** hai — usually ye ki koi effect nahi, koi difference nahi, koi relationship nahi. Isme hamesha equality hoti hai ($=$, $\leq$, ya $\geq$), aur asal mein yahi test kiya jaata hai.

Examples:

$$
H_0: \mu = 100 \qquad H_0: \mu_1 = \mu_2 \qquad H_0: \rho = 0
$$

**$H_0$ ke baare mein zaroori baatein:**
- Test statistic calculate karne ke liye ise *sach maana* jaata hai
- Hum ise ya **reject** karte hain ya **reject karne mein fail** hote hain — kabhi "accept" ya "prove" nahi karte
- $H_0$ reject na kar paana ka matlab hai evidence kaafi nahi tha, **na** ki $H_0$ sach hai

**Bahut common galti:** "p-value 0.4 aaya, isliye sabit hua ki koi farak nahi hai" — ye **galat** hai. Sahi baat: "Farak hone ka kaafi evidence nahi mila."

**Example:** Court mein $H_0$ = "aadmi nirdosh hai." Agar evidence kaafi na ho toh aadmi chhoot jaata hai — lekin iska matlab ye nahi ki wo *sach mein* nirdosh sabit ho gaya.

</HindiBox>

### 6.2.4 Alternative Hypothesis

The alternative hypothesis ($H_1$ or $H_a$) is the claim we hope to establish — that there **is** an effect, difference, or relationship. It contains an inequality and is accepted (provisionally) only when $H_0$ is rejected.

**Two-tailed** (non-directional) — detects a difference in either direction:

$$
H_0: \mu = 100 \qquad H_1: \mu \neq 100
$$

**One-tailed** (directional) — detects a difference in one specified direction only:

$$
H_0: \mu \leq 100 \qquad H_1: \mu > 100
$$

One-tailed tests have more power in the predicted direction but **cannot detect** an effect in the opposite direction. The choice must be made before seeing the data — switching to one-tailed after a two-tailed test fails is a serious methodological error.

<HindiBox>

Alternative hypothesis ($H_1$ ya $H_a$) wo claim hai jise hum sabit karna chahte hain — ki effect, difference, ya relationship **hai**. Isme inequality hoti hai, aur ise (provisionally) tabhi accept kiya jaata hai jab $H_0$ reject ho.

**Two-tailed** (non-directional) — dono directions mein difference pakadta hai:

$$
H_0: \mu = 100 \qquad H_1: \mu \neq 100
$$

**One-tailed** (directional) — sirf ek specified direction mein:

$$
H_0: \mu \leq 100 \qquad H_1: \mu > 100
$$

One-tailed test predicted direction mein zyada powerful hota hai lekin ulti direction ka effect **pakad hi nahi sakta**. Ye choice data dekhne se **pehle** karni padti hai — two-tailed fail hone ke baad one-tailed par switch karna serious methodological galti hai.

**Example:** "Nayi dawai purani se **behtar** hai" → One-tailed. "Nayi dawai purani se **alag** hai (behtar ya kharab)" → Two-tailed. Agar dawai nuksan bhi kar sakti hai, toh two-tailed hi sahi hai.

</HindiBox>

### 6.2.5 Significance Level

The significance level $\alpha$ is the threshold probability of rejecting $H_0$ when it is actually true — i.e. the maximum Type I error rate you are willing to accept. It is chosen **before** the analysis.

**Conventional values:**
- $\alpha = 0.05$ — the default in most fields (5% risk)
- $\alpha = 0.01$ — stricter, used when false positives are costly
- $\alpha = 0.10$ — more lenient, sometimes used in exploratory research
- $\alpha = 5 \times 10^{-8}$ — genome-wide studies, correcting for millions of tests

**Multiple comparisons problem:** running many tests inflates the chance of at least one false positive. With $m$ independent tests:

$$
P(\text{at least one Type I error}) = 1 - (1-\alpha)^m
$$

Corrections include **Bonferroni** ($\alpha/m$) and the **Benjamini-Hochberg** FDR procedure.

<HindiBox>

Significance level $\alpha$ wo threshold probability hai ki $H_0$ ko reject kar diya jaaye jabki wo sach tha — yani maximum Type I error rate jo aap accept karne ko tayyar hain. Ye analysis se **pehle** chuna jaata hai.

**Common values:**
- $\alpha = 0.05$ — zyadatar fields mein default (5% risk)
- $\alpha = 0.01$ — zyada strict, jab false positive mehnga pade
- $\alpha = 0.10$ — zyada lenient, exploratory research mein
- $\alpha = 5 \times 10^{-8}$ — genome studies, jahan lakhon tests hote hain

**Multiple comparisons problem:** bahut saare tests karne se kam se kam ek false positive ka chance badh jaata hai. $m$ independent tests ke sath:

$$
P(\text{kam se kam ek Type I error}) = 1 - (1-\alpha)^m
$$

Corrections: **Bonferroni** ($\alpha/m$) aur **Benjamini-Hochberg** FDR.

**Example:** Agar aap 20 alag-alag tests karein $\alpha = 0.05$ par, toh $1 - (0.95)^{20} \approx 64\%$ chance hai ki kam se kam ek result jhootha "significant" nikal aayega — chahe koi asli effect na ho! Isi ko *p-hacking* ka khatra kehte hain.

</HindiBox>

### 6.2.6 p-value

The p-value is the probability of obtaining a result **at least as extreme** as the observed one, *assuming $H_0$ is true*:

$$
p = P(\text{data at least this extreme} \mid H_0 \text{ true})
$$

A small p-value means the observed data would be unlikely if $H_0$ were true — which counts as evidence against $H_0$.

**What the p-value is NOT** (these are the most common misinterpretations):
- ❌ The probability that $H_0$ is true
- ❌ The probability that your finding occurred by chance
- ❌ A measure of effect size or importance
- ❌ $p = 0.049$ meaningfully different from $p = 0.051$

**Decision rule:** if $p \leq \alpha$, reject $H_0$; if $p > \alpha$, fail to reject $H_0$.

<HindiBox>

p-value wo probability hai ki aapko observed result se **kam se kam utna hi extreme** result mile, *ye maan kar ki $H_0$ sach hai*:

$$
p = P(\text{itna ya isse zyada extreme data} \mid H_0 \text{ sach hai})
$$

Chhoti p-value ka matlab: agar $H_0$ sach hota, toh aisa data milna unlikely tha — aur yahi $H_0$ ke khilaaf evidence maana jaata hai.

**p-value ye NAHI hai** (sabse common galtiyan):
- ❌ Ye probability ki $H_0$ sach hai
- ❌ Ye probability ki aapka result sanyog se aaya
- ❌ Effect ke size ya importance ka measure
- ❌ $p = 0.049$ aur $p = 0.051$ mein koi meaningful farak

**Decision rule:** $p \leq \alpha$ → $H_0$ reject; $p > \alpha$ → reject nahi kar sakte.

**Sabse important samajhne wali baat:** p-value batati hai ki *data kitna surprising hai*, ye nahi ki *effect kitna bada hai*. Bahut bade sample mein ek bilkul bekaar chhota difference bhi $p < 0.001$ de sakta hai!

**Example:** $p = 0.03$ ka matlab: "Agar sach mein koi farak na hota, toh aisa data sirf 3% baar milta." Iska matlab ye **nahi** hai ki "97% chance hai ki mera result sahi hai."

</HindiBox>

### 6.2.7 Test Statistic

A test statistic is a single number computed from the sample that measures how far the observed result lies from what $H_0$ predicts, in units of standard error:

$$
\text{Test Statistic} = \frac{\text{Observed} - \text{Expected under } H_0}{\text{Standard Error}}
$$

**Common test statistics:**

| Test | Statistic | Used for |
|---|---|---|
| z-test | $z = \dfrac{\bar{x} - \mu_0}{\sigma/\sqrt{n}}$ | Known $\sigma$, large $n$ |
| One-sample t-test | $t = \dfrac{\bar{x} - \mu_0}{s/\sqrt{n}}$ | Unknown $\sigma$ |
| Chi-square | $\chi^2 = \sum \dfrac{(O-E)^2}{E}$ | Categorical data |
| ANOVA | $F = \dfrac{MS_{\text{between}}}{MS_{\text{within}}}$ | 3+ group means |

The larger the absolute value of the test statistic, the stronger the evidence against $H_0$.

<HindiBox>

Test statistic ek single number hai jo sample se nikalta hai aur batata hai ki observed result, $H_0$ ki prediction se kitna door hai — standard error ki units mein:

$$
\text{Test Statistic} = \frac{\text{Observed} - \text{Expected under } H_0}{\text{Standard Error}}
$$

**Common test statistics:**

| Test | Statistic | Kiske liye |
|---|---|---|
| z-test | $z = \dfrac{\bar{x} - \mu_0}{\sigma/\sqrt{n}}$ | $\sigma$ pata ho, bada $n$ |
| One-sample t-test | $t = \dfrac{\bar{x} - \mu_0}{s/\sqrt{n}}$ | $\sigma$ pata na ho |
| Chi-square | $\chi^2 = \sum \dfrac{(O-E)^2}{E}$ | Categorical data |
| ANOVA | $F = \dfrac{MS_{\text{between}}}{MS_{\text{within}}}$ | 3+ groups ke means |

Test statistic ki absolute value jitni badi, $H_0$ ke khilaaf evidence utna strong.

**Example:** $t = 0.5$ ka matlab observed result $H_0$ ke bahut paas hai (normal baat). $t = 4.2$ ka matlab result $H_0$ se bahut door hai — kuch asli baat lag rahi hai.

</HindiBox>

### 6.2.8 Critical Value

The critical value is the cut-off point on the test statistic's distribution that separates the **rejection region** from the non-rejection region. It depends on $\alpha$, the degrees of freedom, and whether the test is one- or two-tailed.

**Common z critical values:**

| $\alpha$ | Two-tailed | One-tailed |
|---|---|---|
| 0.10 | $\pm 1.645$ | $1.282$ |
| 0.05 | $\pm 1.96$ | $1.645$ |
| 0.01 | $\pm 2.576$ | $2.326$ |

**Critical value approach vs p-value approach:** both always give the same decision. The critical value method was standard before computers (you looked values up in a table); the p-value method is now preferred because it reports *how much* evidence there is, not just a yes/no verdict.

<HindiBox>

Critical value wo cut-off point hai test statistic ki distribution par, jo **rejection region** ko non-rejection region se alag karta hai. Ye $\alpha$, degrees of freedom, aur one/two-tailed hone par depend karta hai.

**Common z critical values:**

| $\alpha$ | Two-tailed | One-tailed |
|---|---|---|
| 0.10 | $\pm 1.645$ | $1.282$ |
| 0.05 | $\pm 1.96$ | $1.645$ |
| 0.01 | $\pm 2.576$ | $2.326$ |

**Critical value vs p-value approach:** dono hamesha same decision dete hain. Critical value method computers se pehle standard tha (table mein dekhna padta tha); ab p-value method preferred hai kyunki wo batata hai ki evidence *kitna* hai, sirf haan/na nahi.

**Example:** $\alpha = 0.05$ two-tailed test mein, agar calculated $|z| = 2.3$ hai aur critical value $1.96$ hai — toh $2.3 > 1.96$, isliye $H_0$ reject. (Aur p-value bhi $0.05$ se kam hi aayega.)

</HindiBox>

### 6.2.9 Decision Rules

**Using the p-value:**

$$
p \leq \alpha \;\Rightarrow\; \text{reject } H_0 \qquad\qquad p > \alpha \;\Rightarrow\; \text{fail to reject } H_0
$$

**Using the critical value:** reject $H_0$ if the test statistic falls in the rejection region ($|z_{\text{calc}}| > z_{\text{crit}}$).

**Using the confidence interval:** reject $H_0$ if the hypothesized value lies **outside** the CI.

All three approaches are mathematically equivalent for the same $\alpha$.

**Correct wording matters:**
- ✅ "We reject $H_0$; there is significant evidence that…"
- ✅ "We fail to reject $H_0$; there is insufficient evidence that…"
- ❌ "We accept $H_0$" / "We proved there is no difference"

<HindiBox>

**p-value se:**

$$
p \leq \alpha \;\Rightarrow\; H_0 \text{ reject} \qquad\qquad p > \alpha \;\Rightarrow\; \text{reject nahi kar sakte}
$$

**Critical value se:** agar test statistic rejection region mein gire toh $H_0$ reject ($|z_{\text{calc}}| > z_{\text{crit}}$).

**Confidence interval se:** agar hypothesized value CI ke **bahar** ho toh $H_0$ reject.

Teeno approaches ek hi $\alpha$ par mathematically barabar hain.

**Sahi shabd bolna zaroori hai:**
- ✅ "Hum $H_0$ reject karte hain; significant evidence hai ki…"
- ✅ "Hum $H_0$ reject nahi kar sakte; kaafi evidence nahi hai ki…"
- ❌ "Hum $H_0$ accept karte hain" / "Humne sabit kiya ki koi farak nahi hai"

**Example:** 95% CI = $[102, 108]$ hai aur $H_0: \mu = 100$. Kyunki 100 is interval ke bahar hai, isliye $H_0$ reject ho jaata hai. Agar CI $[98, 105]$ hoti, toh reject nahi karte.

</HindiBox>

### 6.2.10 Statistical Significance vs Practical Significance

**Statistical significance** means the observed effect is unlikely to be due to chance ($p \leq \alpha$). **Practical significance** means the effect is large enough to actually matter in the real world.

These are independent — all four combinations occur:

| | Practically significant | Not practically significant |
|---|---|---|
| **Statistically significant** | ✅ Ideal — act on it | ⚠️ Trivial effect, huge $n$ |
| **Not statistically significant** | ⚠️ Possibly underpowered — investigate | ❌ No effect worth pursuing |

Because $p$ depends on $n$, a very large sample makes even a meaningless difference "significant". This is why you should **always report effect size** alongside $p$:

- **Cohen's $d$** for mean differences: $0.2$ small, $0.5$ medium, $0.8$ large
- **$r$ or $R^2$** for associations and variance explained
- **Odds ratio / relative risk** for categorical outcomes
- **Confidence intervals**, which show both significance and magnitude

<HindiBox>

**Statistical significance** ka matlab hai ki observed effect sanyog se hone ki sambhavna kam hai ($p \leq \alpha$). **Practical significance** ka matlab hai ki effect itna bada hai ki asli duniya mein farak padta hai.

Ye dono independent hain — chaaron combinations possible hain:

| | Practically significant | Practically significant nahi |
|---|---|---|
| **Statistically significant** | ✅ Ideal — action lo | ⚠️ Bekaar effect, bahut bada $n$ |
| **Statistically significant nahi** | ⚠️ Shayad sample chhota tha — jaancho | ❌ Koi kaam ka effect nahi |

Kyunki $p$ sample size par depend karta hai, bahut bade sample mein ek bekaar difference bhi "significant" ban jaata hai. Isliye $p$ ke sath **effect size hamesha report karo**:

- **Cohen's $d$** means ke difference ke liye: $0.2$ chhota, $0.5$ medium, $0.8$ bada
- **$r$ ya $R^2$** associations aur explained variance ke liye
- **Odds ratio / relative risk** categorical outcomes ke liye
- **Confidence intervals**, jo significance aur magnitude dono dikhate hain

**Best example:** 10 lakh logon ke sample mein pata chala ki ek nayi dawai blood pressure ko 0.2 mmHg kam karti hai, $p < 0.001$. **Statistically significant** hai — lekin 0.2 mmHg ka koi medical faayda nahi. Yani statistically significant, practically bekaar.

**Ulta case:** 20 logon ke chhote trial mein dawai 15 mmHg kam karti hai lekin $p = 0.09$. Practically bahut important lag raha hai — sample chhota hone ki wajah se significant nahi aaya. Yahan bada study karna chahiye, result phenkna nahi chahiye.

</HindiBox>

## 6.3 ⚠️ Type I and Type II Errors

### 6.3.1 Type I Error

A Type I error occurs when we **reject a true $H_0$** — concluding there is an effect when in reality there is none.

$$
\alpha = P(\text{reject } H_0 \mid H_0 \text{ is true})
$$

The probability of a Type I error is exactly the significance level $\alpha$, which means it is **directly under the researcher's control** — you choose it.

**Consequences:** false discoveries enter the literature, resources are wasted on ineffective interventions, and harmful products may be approved.

**How to reduce it:** lower $\alpha$, correct for multiple comparisons, pre-register hypotheses, and replicate findings.

<HindiBox>

Type I error tab hoti hai jab hum **sach $H_0$ ko reject** kar dete hain — yani keh dete hain ki effect hai, jabki asal mein nahi hai.

$$
\alpha = P(H_0 \text{ reject} \mid H_0 \text{ sach hai})
$$

Type I error ki probability bilkul $\alpha$ ke barabar hoti hai — matlab ye **researcher ke direct control mein** hai, aap khud chunte ho.

**Nateeje:** jhoothi discoveries research mein aa jaati hain, bekaar interventions par paisa barbaad hota hai, aur nuksan pahunchane wale products approve ho sakte hain.

**Kam kaise karein:** $\alpha$ chhota rakho, multiple comparisons ke liye correction karo, hypotheses pre-register karo, aur findings ko replicate karo.

**Example:** Ek nirdosh aadmi ko court doshi thehra deti hai. Ya ek bekaar dawai ko "kaam karti hai" declare kar diya jaata hai. Dono Type I errors hain.

</HindiBox>

### 6.3.2 Type II Error

A Type II error occurs when we **fail to reject a false $H_0$** — missing a real effect.

$$
\beta = P(\text{fail to reject } H_0 \mid H_0 \text{ is false})
$$

Unlike $\alpha$, $\beta$ is not chosen directly. It depends on the true effect size, the sample size, the variability in the data, and $\alpha$.

**Consequences:** genuine effects go undiscovered, effective treatments are abandoned, and research effort is wasted on underpowered studies.

**How to reduce it:** increase $n$ (the most reliable lever), reduce measurement noise, use a more powerful test, or accept a larger $\alpha$.

<HindiBox>

Type II error tab hoti hai jab hum **jhoothe $H_0$ ko reject karne mein fail** ho jaate hain — yani ek asli effect ko miss kar dete hain.

$$
\beta = P(H_0 \text{ reject nahi kar paaye} \mid H_0 \text{ jhootha hai})
$$

$\alpha$ ki tarah $\beta$ ko hum directly nahi chunte. Ye asli effect size, sample size, data ki variability aur $\alpha$ par depend karta hai.

**Nateeje:** asli effects pata hi nahi chalte, kaam karne wale treatments chhod diye jaate hain, aur underpowered studies mein mehnat barbaad hoti hai.

**Kam kaise karein:** $n$ badhao (sabse bharosemand tarika), measurement noise kam karo, zyada powerful test use karo, ya bada $\alpha$ accept karo.

**Example:** Ek asli doshi aadmi evidence ki kami se chhoot jaata hai. Ya ek sach mein kaam karne wali dawai ko "bekaar" samajh kar chhod diya jaata hai. Dono Type II errors hain.

</HindiBox>

### 6.3.3 False Positive

"False positive" is the applied, everyday name for a Type I error — the test says **yes** when the truth is **no**.

In diagnostic terms, the relevant quantity is **specificity**:

$$
\text{Specificity} = \frac{TN}{TN + FP} = 1 - \text{False Positive Rate}
$$

**Crucial insight — base rates matter enormously.** Even a highly accurate test produces mostly false positives when the condition is rare:

$$
P(\text{disease} \mid \text{positive}) = \frac{P(\text{pos} \mid \text{disease}) \cdot P(\text{disease})}{P(\text{pos})}
$$

This is Bayes' theorem, and ignoring the base rate is called the **base rate fallacy**.

<HindiBox>

"False positive" Type I error ka practical, roz-marra ka naam hai — test kehta hai **haan**, jabki sach hai **na**.

Diagnostic terms mein relevant quantity **specificity** hai:

$$
\text{Specificity} = \frac{TN}{TN + FP} = 1 - \text{False Positive Rate}
$$

**Sabse zaroori insight — base rate bahut matter karta hai.** Ek bahut accurate test bhi zyadatar false positives hi deta hai jab bimari rare ho:

$$
P(\text{bimari} \mid \text{positive}) = \frac{P(\text{pos} \mid \text{bimari}) \cdot P(\text{bimari})}{P(\text{pos})}
$$

Ye Bayes' theorem hai, aur base rate ignore karne ko **base rate fallacy** kehte hain.

**Chaunkane wala example:** Ek bimari 1000 logon mein 1 ko hoti hai. Test 99% accurate hai. Aapka test positive aaya — aapko bimari hone ka chance kitna hai?

Jawab sirf **~9%** hai! Kyunki 1000 logon mein: 1 asli patient (test pakad lega) + 999 healthy mein se ~10 false positives. Toh 11 positives mein sirf 1 asli hai.

Isi liye rare diseases mein screening ke baad confirmatory test kiya jaata hai.

</HindiBox>

### 6.3.4 False Negative

"False negative" is the applied name for a Type II error — the test says **no** when the truth is **yes**.

The corresponding diagnostic measure is **sensitivity** (also called recall or the true positive rate):

$$
\text{Sensitivity} = \frac{TP}{TP + FN} = 1 - \text{False Negative Rate}
$$

**The fundamental trade-off:** for any given test, lowering the decision threshold catches more true cases (fewer false negatives) but also flags more healthy cases (more false positives). You cannot reduce both at once with the same test — you can only choose where to sit on the curve. This trade-off is visualized by the **ROC curve**, summarized by **AUC**.

**Which error is worse depends entirely on context:**
- Cancer screening → false negatives are far worse → prioritize sensitivity
- Spam filtering → false positives are worse (losing a real email) → prioritize specificity

<HindiBox>

"False negative" Type II error ka practical naam hai — test kehta hai **na**, jabki sach hai **haan**.

Iska diagnostic measure **sensitivity** hai (jise recall ya true positive rate bhi kehte hain):

$$
\text{Sensitivity} = \frac{TP}{TP + FN} = 1 - \text{False Negative Rate}
$$

**Fundamental trade-off:** kisi bhi test mein threshold neeche karne se zyada asli cases pakde jaate hain (kam false negatives) lekin zyada healthy log bhi flag ho jaate hain (zyada false positives). Ek hi test se dono kam nahi kar sakte — sirf ye chun sakte hain ki curve par kahan baithna hai. Ye trade-off **ROC curve** se dikhaya jaata hai, aur **AUC** se summarize hota hai.

**Kaunsi error zyada buri hai — ye poori tarah context par depend karta hai:**
- Cancer screening → false negative bahut zyada khatarnak → sensitivity par focus
- Spam filter → false positive zyada bura (asli email kho jaana) → specificity par focus

**Example:** Airport security ka metal detector jaan-boojh kar bahut sensitive rakha jaata hai — bahut saare false alarms bajte hain (false positives), lekin ek bhi hathiyaar miss karna (false negative) unacceptable hai.

</HindiBox>

### 6.3.5 Significance Level (α)

Beyond being the Type I error rate, $\alpha$ functions as the researcher's explicit statement of **how much false-positive risk is acceptable** in this particular context.

**Choosing $\alpha$ thoughtfully:**

| Context | Suggested $\alpha$ | Reasoning |
|---|---|---|
| Exploratory / pilot study | 0.10 | Missing a lead is costlier than a false lead |
| Standard research | 0.05 | Conventional balance |
| Drug approval, safety-critical | 0.01 or lower | False positives can harm people |
| Genome-wide association | $5\times10^{-8}$ | Millions of simultaneous tests |

$\alpha$ must be fixed **before** analysis. Adjusting it after seeing the p-value — or trying variations until something crosses the line — is **p-hacking**, and it invalidates the entire inference.

<HindiBox>

Type I error rate hone ke alawa, $\alpha$ researcher ka ek saaf statement bhi hai ki **is context mein kitna false-positive risk acceptable hai**.

**$\alpha$ soch-samajh kar chunna:**

| Context | Suggested $\alpha$ | Wajah |
|---|---|---|
| Exploratory / pilot study | 0.10 | Ek lead miss karna zyada nuksan |
| Standard research | 0.05 | Conventional balance |
| Drug approval, safety-critical | 0.01 ya kam | False positive se logon ko nuksan |
| Genome-wide association | $5\times10^{-8}$ | Lakhon simultaneous tests |

$\alpha$ analysis se **pehle** fix hona chahiye. p-value dekhne ke baad use badalna — ya variations try karte rehna jab tak kuch significant na aa jaaye — ise **p-hacking** kehte hain, aur isse poori inference bekaar ho jaati hai.

**Example:** Agar aap $\alpha = 0.05$ set karte hain aur $p = 0.06$ aata hai, toh "chalo $\alpha = 0.10$ kar lein" kehna cheating hai. Sahi baat: result significant nahi aaya, aur ye report karna chahiye.

</HindiBox>

### 6.3.6 Statistical Power

Power is the probability of correctly detecting a real effect — of rejecting $H_0$ when it is genuinely false:

$$
\text{Power} = 1 - \beta = P(\text{reject } H_0 \mid H_0 \text{ is false})
$$

The conventional target is **80% power** (i.e. $\beta = 0.20$); 90% is preferred for high-stakes studies.

**Four factors determine power:**
1. **Sample size ($n$)** — larger $n$ → higher power (the main lever you control)
2. **Effect size** — bigger real effects are easier to detect
3. **Variability ($\sigma$)** — less noise → higher power
4. **Significance level ($\alpha$)** — larger $\alpha$ → higher power (but more Type I risk)

**Why it matters:** an underpowered study is a waste of resources — it is likely to miss real effects, and when it *does* find something, that finding is more likely to be an exaggerated fluke. This is why a **power analysis should be done before data collection** to determine the required $n$.

<HindiBox>

Power wo probability hai ki hum ek asli effect ko sahi tarike se detect kar lein — yani $H_0$ ko reject karein jab wo sach mein jhootha ho:

$$
\text{Power} = 1 - \beta = P(H_0 \text{ reject} \mid H_0 \text{ jhootha hai})
$$

Conventional target **80% power** hai (yani $\beta = 0.20$); important studies mein 90% preferred hai.

**Power ko 4 cheezein decide karti hain:**
1. **Sample size ($n$)** — bada $n$ → zyada power (aapke haath ka main lever)
2. **Effect size** — bade asli effects aasani se pakde jaate hain
3. **Variability ($\sigma$)** — kam noise → zyada power
4. **Significance level ($\alpha$)** — bada $\alpha$ → zyada power (lekin Type I risk badhta hai)

**Kyun zaroori hai:** underpowered study resources ki barbaadi hai — wo asli effects miss kar degi, aur jab kuch mil jaaye toh wo exaggerated fluke hone ka chance zyada hai. Isi liye **data collection se pehle power analysis** karke required $n$ nikalna chahiye.

**Example:** Agar aapki study ki power sirf 30% hai, toh iska matlab hai ki asli effect hone par bhi aap use 10 mein se sirf 3 baar pakad paayenge. Aise study karne ka faayda hi kya?

</HindiBox>

### 6.3.7 Relationship between Type I and Type II Errors

The complete picture:

| | $H_0$ is TRUE | $H_0$ is FALSE |
|---|---|---|
| **Reject $H_0$** | ❌ Type I error ($\alpha$) | ✅ Correct — Power ($1-\beta$) |
| **Fail to reject $H_0$** | ✅ Correct ($1-\alpha$) | ❌ Type II error ($\beta$) |

**The inverse relationship:** with everything else held constant, reducing $\alpha$ **increases** $\beta$, and vice versa. Tightening the threshold to avoid false alarms inevitably means missing more real effects.

**The way out of the trade-off:** increasing the sample size reduces $\beta$ **without** raising $\alpha$. This is the only clean way to improve both error rates at once — which is exactly why sample size planning is so central to good study design.

**How to balance them in practice:** ask which error is more costly in your specific situation. In cancer screening, a missed diagnosis (Type II) is worse than a false alarm. In criminal justice, convicting an innocent person (Type I) is traditionally treated as worse than acquitting a guilty one.

<HindiBox>

Poori picture:

| | $H_0$ SACH hai | $H_0$ JHOOTHA hai |
|---|---|---|
| **$H_0$ Reject** | ❌ Type I error ($\alpha$) | ✅ Sahi — Power ($1-\beta$) |
| **Reject nahi kiya** | ✅ Sahi ($1-\alpha$) | ❌ Type II error ($\beta$) |

**Inverse relationship:** baaki sab constant rakhein toh $\alpha$ kam karne se $\beta$ **badh** jaata hai, aur ulta bhi. Jhoothe alarm se bachne ke liye threshold tight karne ka matlab hai zyada asli effects miss karna.

**Trade-off se nikalne ka rasta:** sample size badhane se $\beta$ kam hota hai **bina** $\alpha$ badhaye. Ye ekmatr saaf tarika hai dono error rates ek saath behtar karne ka — aur isi liye sample size planning achhi study design ka dil hai.

**Practically balance kaise karein:** poocho ki aapki situation mein kaunsi error zyada mehngi hai. Cancer screening mein diagnosis miss karna (Type II) jhoothe alarm se bura hai. Criminal justice mein ek nirdosh ko saza dena (Type I) traditionally ek doshi ko chhodne se bura maana jaata hai.

**Simple analogy (smoke detector):**
- Bahut sensitive → toast jalne par bhi bajega (Type I / false alarm zyada)
- Kam sensitive → asli aag mein bhi der se bajega (Type II / miss zyada)
- **Behtar detector khareedna** = sample size badhana — dono problems ek saath kam!

</HindiBox>

## 6.4 🎚️ Confidence Intervals

### 6.4.1 Point Estimation

A point estimate is a **single value** used as the best guess for an unknown parameter.

| Parameter | Point estimate |
|---|---|
| $\mu$ | $\bar{x}$ |
| $\sigma^2$ | $s^2$ |
| $P$ | $\hat{p}$ |
| $\rho$ | $r$ |

**Limitations:** a point estimate gives no indication of precision, is almost certainly not exactly equal to the parameter, and conveys false confidence when reported alone. "The average is 45.3" sounds definitive, but says nothing about whether the true value could be 40 or 50.

This is exactly why interval estimates exist.

<HindiBox>

Point estimate ek **single value** hai jo unknown parameter ke best guess ke roop mein use hoti hai.

| Parameter | Point estimate |
|---|---|
| $\mu$ | $\bar{x}$ |
| $\sigma^2$ | $s^2$ |
| $P$ | $\hat{p}$ |
| $\rho$ | $r$ |

**Limitations:** point estimate precision ke baare mein kuch nahi batati, lagbhag pakka hai ki parameter ke exactly barabar nahi hogi, aur akele report karne par jhoothi confidence deti hai. "Average 45.3 hai" definitive lagta hai, lekin ye nahi batata ki asli value 40 ya 50 bhi ho sakti hai.

Isi liye interval estimates ki zaroorat padti hai.

**Example:** "Cricket match mein India 280 runs banayega" — point estimate. Bahut precise lagta hai, lekin kitna bharosa kiya ja sakta hai? Kuch nahi pata.

</HindiBox>

### 6.4.2 Interval Estimation

Interval estimation provides a **range** of plausible values for a parameter, together with a statement of how confident we are that the procedure captures it. The general form:

$$
\text{Point Estimate} \;\pm\; \text{Margin of Error}
$$

**Advantages over point estimation:**
- Explicitly communicates uncertainty
- Its width shows the precision of the estimate
- Allows hypothesis tests to be read directly off the interval
- Far more honest and informative in reporting

Modern statistical practice increasingly recommends reporting confidence intervals **instead of** (or at least alongside) bare p-values, because intervals show both the direction *and* the magnitude of an effect.

<HindiBox>

Interval estimation parameter ke liye plausible values ki ek **range** deti hai, sath mein ye batati hai ki hum kitne confident hain ki procedure use capture karta hai. General form:

$$
\text{Point Estimate} \;\pm\; \text{Margin of Error}
$$

**Point estimation se fayde:**
- Uncertainty ko saaf-saaf batata hai
- Iski width estimate ki precision dikhati hai
- Hypothesis test seedha interval se padha ja sakta hai
- Reporting mein zyada honest aur informative

Aaj ki statistical practice mein interval report karna, akele p-value ke **bajaye** (ya kam se kam uske sath) recommend kiya jaata hai — kyunki interval effect ki direction *aur* magnitude dono dikhata hai.

**Example:** "India 280 runs banayega" ki jagah "India 250 se 310 runs ke beech banayega" kehna zyada honest hai — kyunki ye uncertainty bhi bata deta hai.

</HindiBox>

### 6.4.3 Confidence Interval

A confidence interval (CI) is an interval estimate constructed so that, across repeated sampling, a stated proportion of such intervals would contain the true parameter.

**For a mean with known $\sigma$:**

$$
\bar{x} \pm z_{\alpha/2} \cdot \frac{\sigma}{\sqrt{n}}
$$

**For a mean with unknown $\sigma$ (the usual case):**

$$
\bar{x} \pm t_{\alpha/2,\, df} \cdot \frac{s}{\sqrt{n}} \qquad df = n-1
$$

**For a proportion:**

$$
\hat{p} \pm z_{\alpha/2} \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}
$$

**What makes a CI narrower (more precise):** larger $n$, smaller $\sigma$, or a lower confidence level.

<HindiBox>

Confidence interval (CI) ek interval estimate hai jo aise banaya jaata hai ki repeated sampling mein aise intervals ka ek bataya gaya hissa asli parameter ko cover karega.

**Mean ke liye, $\sigma$ pata ho:**

$$
\bar{x} \pm z_{\alpha/2} \cdot \frac{\sigma}{\sqrt{n}}
$$

**Mean ke liye, $\sigma$ pata na ho (aam case):**

$$
\bar{x} \pm t_{\alpha/2,\, df} \cdot \frac{s}{\sqrt{n}}, \qquad df = n-1
$$

**Proportion ke liye:**

$$
\hat{p} \pm z_{\alpha/2} \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}
$$

**CI patli (zyada precise) kab hoti hai:** bada $n$, chhota $\sigma$, ya kam confidence level.

**Example:** $\bar{x} = 45$, $s = 10$, $n = 100$ ke sath 95% CI:

$$
45 \pm 1.96 \times \frac{10}{\sqrt{100}} = 45 \pm 1.96 = [43.04,\; 46.96]
$$

</HindiBox>

### 6.4.4 Interpretation of 95% CI

This is the single most misunderstood concept in introductory statistics, so it is worth stating precisely.

**Correct interpretation:** "If we repeated this sampling procedure many times and computed a 95% CI each time, about 95% of those intervals would contain the true population parameter."

Or in practical reporting language: "We are 95% confident that the true mean lies between 43.0 and 47.0."

**Incorrect interpretations:**
- ❌ "There is a 95% probability that $\mu$ lies in this specific interval." (In the frequentist framework $\mu$ is fixed, not random — this particular interval either contains it or doesn't.)
- ❌ "95% of the data falls within this interval." (That describes a different concept entirely.)
- ❌ "95% of future sample means will fall in this interval."

The 95% refers to the **long-run reliability of the method**, not to the specific interval you happen to have computed. If you want a statement of probability about the parameter itself, you need a Bayesian **credible interval**.

<HindiBox>

Ye introductory statistics ka sabse zyada galat samjha jaane wala concept hai, isliye ise theek se samajhna zaroori hai.

**Sahi interpretation:** "Agar hum ye sampling procedure bahut baar dohrayein aur har baar 95% CI nikalein, toh unmese lagbhag 95% intervals asli population parameter ko cover karenge."

Ya practical reporting bhasha mein: "Hum 95% confident hain ki asli mean 43.0 aur 47.0 ke beech hai."

**Galat interpretations:**
- ❌ "95% probability hai ki $\mu$ isi interval mein hai." (Frequentist framework mein $\mu$ fixed hai, random nahi — ye particular interval use ya toh cover karta hai ya nahi.)
- ❌ "95% data is interval mein hai." (Ye bilkul dusri cheez hai.)
- ❌ "Aage ke 95% sample means is interval mein aayenge."

Ye 95% **method ki long-run reliability** ke baare mein hai, us ek interval ke baare mein nahi jo aapne nikala hai. Agar aap parameter ke baare mein hi probability statement chahte hain, toh Bayesian **credible interval** chahiye.

**Simple analogy:** Ek basketball player 95% free throws banata hai. Ye us player ke *tarike* ke baare mein statement hai. Jab wo ek throw maar chuka ho, toh wo throw ya toh gaya ya nahi gaya — us ek throw ki "95% probability" nahi hoti. CI bhi aise hi kaam karta hai.

</HindiBox>

### 6.4.5 Margin of Error

The margin of error (MOE) is the half-width of a confidence interval — the "$\pm$" part:

$$
MOE = z_{\alpha/2} \cdot \frac{\sigma}{\sqrt{n}} \qquad\text{or}\qquad MOE = t_{\alpha/2,\,df} \cdot \frac{s}{\sqrt{n}}
$$

**What increases the margin of error:** higher confidence level, greater variability, or smaller sample size.

**The $\sqrt{n}$ relationship is the key practical insight** — because $n$ sits under a square root, halving the margin of error requires **quadrupling** the sample:

$$
n = \left(\frac{z_{\alpha/2} \cdot \sigma}{MOE}\right)^2
$$

This is why survey precision gets expensive fast: going from $\pm 3\%$ to $\pm 1.5\%$ means collecting four times as much data.

<HindiBox>

Margin of error (MOE) confidence interval ki aadhi width hai — wo "$\pm$" wala hissa:

$$
MOE = z_{\alpha/2} \cdot \frac{\sigma}{\sqrt{n}} \qquad\text{ya}\qquad MOE = t_{\alpha/2,\,df} \cdot \frac{s}{\sqrt{n}}
$$

**MOE kab badhta hai:** zyada confidence level, zyada variability, ya chhota sample size.

**$\sqrt{n}$ ka rishta sabse important practical insight hai** — kyunki $n$ square root ke andar hai, MOE aadha karne ke liye sample **char guna** karna padta hai:

$$
n = \left(\frac{z_{\alpha/2} \cdot \sigma}{MOE}\right)^2
$$

Isi liye survey ki precision jaldi mehngi ho jaati hai: $\pm 3\%$ se $\pm 1.5\%$ par jaane ke liye char guna data chahiye.

**Example:** News mein "52% support, margin of error ±3%" ka matlab hai asli figure 49% se 55% ke beech hai. Agar do candidates 51% aur 49% par hain aur MOE ±3% hai — toh race statistically **tied** hai, koi aage nahi hai!

</HindiBox>

### 6.4.6 Confidence Level

The confidence level is the long-run proportion of intervals that would capture the parameter, expressed as $(1-\alpha) \times 100\%$.

| Confidence level | $\alpha$ | $z_{\alpha/2}$ | Interval width |
|---|---|---|---|
| 90% | 0.10 | 1.645 | Narrowest |
| 95% | 0.05 | 1.960 | Standard |
| 99% | 0.01 | 2.576 | Widest |

**The fundamental trade-off:** higher confidence requires a wider interval. A 100% confidence interval would be $(-\infty, +\infty)$ — perfectly reliable and completely useless. Conversely, a very narrow interval is precise but frequently wrong.

95% has become the convention largely by historical accident (Fisher's influence), not because it is mathematically special. The right level depends on the cost of being wrong in your specific application.

<HindiBox>

Confidence level wo long-run proportion hai jitne intervals parameter ko capture karenge, aur ise $(1-\alpha) \times 100\%$ likhte hain.

| Confidence level | $\alpha$ | $z_{\alpha/2}$ | Interval width |
|---|---|---|---|
| 90% | 0.10 | 1.645 | Sabse patli |
| 95% | 0.05 | 1.960 | Standard |
| 99% | 0.01 | 2.576 | Sabse chaudi |

**Fundamental trade-off:** zyada confidence chahiye toh interval chaudi hogi. 100% confidence interval $(-\infty, +\infty)$ hoga — poori tarah reliable aur poori tarah bekaar. Ulta, bahut patli interval precise hoti hai lekin aksar galat.

95% convention ban gaya zyadatar historical wajah se (Fisher ka influence), isliye nahi ki wo mathematically special hai. Sahi level is baat par depend karta hai ki aapke case mein galat hone ki keemat kya hai.

**Example:** "Kal baarish 0 se 100 mm ke beech hogi" — 100% sach, lekin bilkul bekaar. "Kal baarish 12 mm hogi" — useful, lekin aksar galat. CI in dono ke beech ka balance hai.

</HindiBox>

### 6.4.7 Confidence Interval vs Prediction Interval

These are frequently confused, but they answer fundamentally different questions.

**Confidence Interval** — estimates a **population parameter** (a fixed, unknown number):

$$
\bar{x} \pm t \cdot \frac{s}{\sqrt{n}}
$$

**Prediction Interval** — predicts a **single future observation** (a random variable):

$$
\bar{x} \pm t \cdot s\sqrt{1 + \frac{1}{n}}
$$

| Aspect | Confidence Interval | Prediction Interval |
|---|---|---|
| Estimates | A parameter ($\mu$) | A single new observation |
| Sources of uncertainty | Estimation error only | Estimation error **+** individual variation |
| Width | Narrower | Always wider |
| As $n \to \infty$ | Shrinks toward zero width | Approaches $\pm t \cdot s$, never zero |

That last row is the conceptual heart of the difference: with infinite data you could know $\mu$ perfectly, but you still could never predict one individual perfectly, because individuals genuinely vary.

<HindiBox>

Ye dono aksar confuse kiye jaate hain, lekin bilkul alag sawaalon ka jawab dete hain.

**Confidence Interval** — ek **population parameter** ka estimate (ek fixed, unknown number):

$$
\bar{x} \pm t \cdot \frac{s}{\sqrt{n}}
$$

**Prediction Interval** — ek **single future observation** ki prediction (ek random variable):

$$
\bar{x} \pm t \cdot s\sqrt{1 + \frac{1}{n}}
$$

| Aspect | Confidence Interval | Prediction Interval |
|---|---|---|
| Kiska estimate | Parameter ($\mu$) | Ek naya single observation |
| Uncertainty kahan se | Sirf estimation error | Estimation error **+** individual variation |
| Width | Patli | Hamesha chaudi |
| $n \to \infty$ par | Zero width tak simat jaati hai | $\pm t \cdot s$ tak pahunchti hai, zero nahi |

Aakhri row hi asli farak ka dil hai: infinite data se aap $\mu$ perfectly jaan sakte hain, lekin ek individual ko perfectly predict kabhi nahi kar sakte — kyunki individuals sach mein alag-alag hote hain.

**Example (sabse clear farak):**
- **CI:** "Hum 95% confident hain ki *saare* Indian mardon ki **average** height 168–170 cm ke beech hai." (Patli — kyunki averages stable hote hain)
- **PI:** "Hum 95% confident hain ki *agla* aane wala aadmi 155–183 cm ke beech hoga." (Chaudi — kyunki har insaan alag hai)

Chahe aap 1 crore logon ko naap lein, average toh pakka pata chal jayega — lekin agla insaan kitna lamba hoga, ye kabhi pakka nahi keh sakte.

</HindiBox>