---
id: chapter-7
title: Chapter 7 — Statistical Tests
description: "Covers the core statistical tests used in data science: chi-square, normality and homogeneity checks, t-tests, ANOVA, MANOVA, and correlation analysis."
sidebar_position: 1
---
## 7.1 🔲 Chi-Square Tests
### 7.1.1 Chi-Square Distribution

The chi-square ($\chi^2$) distribution is a continuous probability distribution that arises when summing squared standard normal variables:

$$
\chi^2_k = \sum_{i=1}^{k} Z_i^2
$$

**Key properties:**
- Defined only for non-negative values ($\chi^2 \geq 0$)
- Right-skewed, becoming more symmetric as degrees of freedom $df$ increase
- Mean $= df$, Variance $= 2 \times df$
- Shape is controlled entirely by a single parameter, $df$

It is the reference distribution for tests involving **categorical data** and variance.

<HindiBox>

Chi-square ($\chi^2$) distribution ek continuous probability distribution hai jo standard normal variables ke squares jodne par banti hai:

$$
\chi^2_k = \sum_{i=1}^{k} Z_i^2
$$

**Main properties:**
- Sirf non-negative values ke liye ($\chi^2 \geq 0$) — kyunki squares kabhi negative nahi hote
- Right-skewed, aur $df$ badhne par zyada symmetric ho jaati hai
- Mean $= df$, Variance $= 2 \times df$
- Shape sirf ek parameter $df$ se control hoti hai

Ye **categorical data** aur variance se jude tests ki reference distribution hai.

**Example:** Agar aap 5 standard normal numbers lein, unhe square karein aur jod dein — wo sum $\chi^2$ distribution follow karega jiska $df = 5$ hai.

</HindiBox>

### 7.1.2 Chi-Square Test of Independence

This test checks whether **two categorical variables are related** in a population, using data arranged in a contingency table.

$$
H_0: \text{The two variables are independent} \qquad H_1: \text{They are associated}
$$

$$
\chi^2 = \sum \frac{(O_{ij} - E_{ij})^2}{E_{ij}}, \qquad E_{ij} = \frac{(\text{Row total}) \times (\text{Column total})}{\text{Grand total}}
$$

$$
df = (r - 1)(c - 1)
$$

where $r$ = number of rows and $c$ = number of columns.

<HindiBox>

Ye test check karta hai ki **do categorical variables aapas mein jude hue hain ya nahi**, contingency table ke data se.

$$
H_0: \text{Dono variables independent hain} \qquad H_1: \text{Dono mein sambandh hai}
$$

$$
\chi^2 = \sum \frac{(O_{ij} - E_{ij})^2}{E_{ij}}, \qquad E_{ij} = \frac{(\text{Row total}) \times (\text{Column total})}{\text{Grand total}}
$$

$$
df = (r - 1)(c - 1)
$$

Yahan $r$ = rows ki sankhya, $c$ = columns ki sankhya.

**Example:** Kya Gender aur Product Preference mein koi rishta hai? 2 rows (Male/Female) × 3 columns (A/B/C) → $df = (2-1)(3-1) = 2$.

**Logic simple hai:** Observed aur Expected mein jitna zyada farak, $\chi^2$ utna bada, aur $H_0$ reject hone ka chance utna zyada.

</HindiBox>

### 7.1.3 Goodness-of-Fit Test

This tests whether a **single categorical variable** follows a hypothesized distribution.

$$
H_0: \text{The observed frequencies match the expected distribution}
$$

$$
\chi^2 = \sum_{i=1}^{k} \frac{(O_i - E_i)^2}{E_i}, \qquad df = k - 1 - m
$$

where $k$ = number of categories and $m$ = number of parameters estimated from the data (usually $m = 0$ when expected proportions are specified in advance).

<HindiBox>

Ye test check karta hai ki **ek single categorical variable** kisi expected distribution ko follow karta hai ya nahi.

$$
H_0: \text{Observed frequencies expected distribution se match karti hain}
$$

$$
\chi^2 = \sum_{i=1}^{k} \frac{(O_i - E_i)^2}{E_i}, \qquad df = k - 1 - m
$$

Yahan $k$ = categories ki sankhya, $m$ = data se estimate kiye gaye parameters (usually $m = 0$).

**Example:** Kya ek paasa fair hai? 60 baar phenka, har number ke liye expected $= 10$. Agar observed values 10 se bahut alag hain toh paasa loaded ho sakta hai. Yahan $df = 6 - 1 = 5$.

**Difference yaad rakho:** Goodness-of-Fit → **ek** variable. Test of Independence → **do** variables.

</HindiBox>

### 7.1.4 Assumptions

For a valid chi-square test:

1. **Categorical data** — the test works on counts, never on percentages or means
2. **Independent observations** — each subject appears in exactly one cell
3. **Random sampling**
4. **Expected frequency rule** — all $E_{ij} \geq 5$; ideally none below 5, and at most 20% of cells between 1 and 5
5. **Sufficient sample size** — generally $n \geq 50$
6. **Mutually exclusive categories** — every observation fits exactly one category

If expected counts are too small, use **Fisher's exact test** (for 2×2 tables) or combine sparse categories.

<HindiBox>

Valid chi-square test ke liye:

1. **Categorical data** — test counts par kaam karta hai, kabhi percentages ya means par nahi
2. **Independent observations** — har subject sirf ek cell mein
3. **Random sampling**
4. **Expected frequency rule** — saare $E_{ij} \geq 5$; ideally koi bhi 5 se kam na ho, aur zyada se zyada 20% cells 1 se 5 ke beech
5. **Kaafi sample size** — generally $n \geq 50$
6. **Mutually exclusive categories** — har observation exactly ek category mein

Agar expected counts bahut chhote hain, toh **Fisher's exact test** use karo (2×2 tables ke liye) ya categories ko merge kar do.

**⚠️ Sabse common galti:** Chi-square test **percentages par nahi chalta** — hamesha actual counts (frequencies) daalo. 50% likhne se kaam nahi chalega, "50 out of 100" likhna padega.

</HindiBox>

### 7.1.5 Interpretation

**Decision rule:** reject $H_0$ if $p \leq \alpha$ or if $\chi^2_{\text{calculated}} \geq \chi^2_{\text{critical}}$.

Since chi-square only tells you *whether* an association exists, report an **effect size** to describe its strength:

$$
\text{Cramér's V} = \sqrt{\frac{\chi^2}{n \times \min(r-1,\, c-1)}}
$$

| Cramér's V | Strength |
|---|---|
| 0.10 | Weak |
| 0.30 | Moderate |
| 0.50+ | Strong |

For 2×2 tables, the **phi coefficient** $\phi = \sqrt{\chi^2/n}$ is used instead.

<HindiBox>

**Decision rule:** $p \leq \alpha$ ho ya $\chi^2_{\text{calculated}} \geq \chi^2_{\text{critical}}$ ho toh $H_0$ reject karo.

Chi-square sirf ye batata hai ki association **hai ya nahi** — uski strength batane ke liye **effect size** report karo:

$$
\text{Cramér's V} = \sqrt{\frac{\chi^2}{n \times \min(r-1,\, c-1)}}
$$

| Cramér's V | Strength |
|---|---|
| 0.10 | Weak |
| 0.30 | Moderate |
| 0.50+ | Strong |

2×2 tables ke liye **phi coefficient** $\phi = \sqrt{\chi^2/n}$ use hota hai.

**Zaroori baat:** Chi-square ye **nahi** batata ki association kis direction mein hai ya kaun-si category zimmedar hai. Uske liye **standardized residuals** dekhne padte hain.

</HindiBox>

### 7.1.6 Python Implementation

```python
import numpy as np
import pandas as pd
from scipy.stats import chi2_contingency, chisquare

# ---- Test of Independence ----
# Rows: Male, Female | Columns: Product A, B, C
observed = np.array([[30, 45, 25],
                     [40, 25, 35]])

chi2, p, dof, expected = chi2_contingency(observed)

print(f"Chi-square statistic : {chi2:.4f}")
print(f"p-value              : {p:.4f}")
print(f"Degrees of freedom   : {dof}")
print(f"Expected frequencies :\n{expected}")

# Effect size (Cramér's V)
n = observed.sum()
min_dim = min(observed.shape) - 1
cramers_v = np.sqrt(chi2 / (n * min_dim))
print(f"Cramér's V           : {cramers_v:.4f}")

if p <= 0.05:
    print("→ Reject H0: variables are associated")
else:
    print("→ Fail to reject H0: no evidence of association")


# ---- Goodness-of-Fit Test ----
# Is the die fair? 60 rolls
observed_rolls = [8, 12, 9, 14, 7, 10]
expected_rolls = [10] * 6

stat, p_gof = chisquare(f_obs=observed_rolls, f_exp=expected_rolls)
print(f"\nGoodness-of-fit: chi2={stat:.4f}, p={p_gof:.4f}")
```

<HindiBox>

**Code samajhne ki key baatein:**

- `chi2_contingency()` — Test of Independence ke liye. Ye 4 cheezein return karta hai: statistic, p-value, df, aur expected frequencies.
- `chisquare()` — Goodness-of-Fit ke liye, jab ek hi variable ho.
- **Hamesha `expected` array check karo** — agar koi value 5 se kam hai toh test invalid ho sakta hai.
- Input mein **counts** dena hai, percentages nahi.

**2×2 table ke liye zaroori:** `chi2_contingency` by default Yates' continuity correction lagata hai. Agar nahi chahiye toh `correction=False` set karo.

</HindiBox>

### 7.1.7 Example

**Question:** Is there a relationship between gender and preferred mode of transport?

| | Car | Bus | Train | Row total |
|---|---|---|---|---|
| **Male** | 40 | 20 | 40 | 100 |
| **Female** | 30 | 50 | 20 | 100 |
| **Column total** | 70 | 70 | 60 | 200 |

**Step 1 — Hypotheses:** $H_0$: gender and transport are independent; $H_1$: they are associated.

**Step 2 — Expected frequencies:** $E_{11} = \dfrac{100 \times 70}{200} = 35$, and similarly for the rest.

| | Car | Bus | Train |
|---|---|---|---|
| Male | 35 | 35 | 30 |
| Female | 35 | 35 | 30 |

**Step 3 — Test statistic:**

$$
\chi^2 = \frac{(40-35)^2}{35} + \frac{(20-35)^2}{35} + \frac{(40-30)^2}{30} + \frac{(30-35)^2}{35} + \frac{(50-35)^2}{35} + \frac{(20-30)^2}{30} \approx 22.10
$$

**Step 4 — Decision:** $df = (2-1)(3-1) = 2$, critical value $\chi^2_{0.05,2} = 5.991$. Since $22.10 > 5.991$ (and $p < 0.001$), reject $H_0$.

**Step 5 — Effect size:** $V = \sqrt{22.10/(200 \times 1)} = 0.33$ → moderate association.

<HindiBox>

**Sawaal:** Kya gender aur transport ke tarike mein koi rishta hai?

**Nateeja:** $\chi^2 = 22.10$, $df = 2$, $p < 0.001$ → $H_0$ reject. Gender aur transport preference **jude hue hain**.

**Cramér's V $= 0.33$** → moderate strength ka rishta.

**Table dekh kar kya samajh aata hai:** Males expected se zyada Train use karte hain (40 vs 30), aur Females expected se zyada Bus (50 vs 35). Yahi pattern $\chi^2$ ko bada bana raha hai.

**Reporting ka sahi tarika:**
> "Gender aur transport preference mein significant sambandh paaya gaya, $\chi^2(2, N=200) = 22.10$, $p < .001$, Cramér's V $= .33$."

</HindiBox>

## 7.2 📐 Normality and Homogeneity Tests

### 7.2.1 Why Check Assumptions?

Parametric tests (t-test, ANOVA, Pearson correlation) derive their p-values from mathematical assumptions about the data. If those assumptions are violated, the resulting p-values and confidence intervals can be **badly wrong** — the test may report significance that doesn't exist, or miss real effects.

**Core assumptions of most parametric tests:**
1. **Normality** — the data (or residuals) are approximately normally distributed
2. **Homogeneity of variance** — groups have roughly equal variances
3. **Independence** — observations don't influence each other
4. **Appropriate measurement scale** — interval or ratio data

Of these, **independence is the most critical** — it usually cannot be fixed after the fact, whereas normality and homogeneity violations often have workarounds.

<HindiBox>

Parametric tests (t-test, ANOVA, Pearson correlation) apni p-values data ke baare mein kuch mathematical assumptions se nikalte hain. Agar wo assumptions toot jaayein, toh p-values aur confidence intervals **bilkul galat** ho sakte hain — test aisi significance dikha sakta hai jo hai hi nahi, ya asli effect miss kar sakta hai.

**Zyadatar parametric tests ki main assumptions:**
1. **Normality** — data (ya residuals) lagbhag normally distributed
2. **Homogeneity of variance** — groups ka variance lagbhag barabar
3. **Independence** — observations ek dusre ko affect na karein
4. **Sahi measurement scale** — interval ya ratio data

Inme se **independence sabse critical hai** — ise baad mein theek nahi kiya ja sakta, jabki normality aur homogeneity ke violations ke solutions maujood hain.

**Simple bhasha mein:** Assumptions check karna aisa hai jaise gaadi chalane se pehle brake check karna. Skip kar sakte ho, lekin nateeja bura ho sakta hai.

</HindiBox>

### 7.2.2 Shapiro-Wilk Test

The Shapiro-Wilk test formally tests whether a sample comes from a normally distributed population.

$$
H_0: \text{The data are normally distributed} \qquad H_1: \text{They are not}
$$

**Interpretation is counter-intuitive:** here you *want* a large p-value.

- $p > 0.05$ → fail to reject $H_0$ → normality is **acceptable** ✅
- $p \leq 0.05$ → reject $H_0$ → data are **not normal** ❌

**Important limitation:** the test's sensitivity depends heavily on $n$. With very large samples ($n > 1000$) it flags trivial deviations as significant; with very small samples ($n < 20$) it lacks power to detect real non-normality. Always pair it with a **Q-Q plot** and histogram.

Alternatives: Kolmogorov-Smirnov (weaker), Anderson-Darling (better for tails), D'Agostino-Pearson.

<HindiBox>

Shapiro-Wilk test formally check karta hai ki sample kisi normally distributed population se aaya hai ya nahi.

$$
H_0: \text{Data normally distributed hai} \qquad H_1: \text{Nahi hai}
$$

**Interpretation ulti hai:** yahan aap **badi** p-value chahte ho.

- $p > 0.05$ → $H_0$ reject nahi → normality **theek hai** ✅
- $p \leq 0.05$ → $H_0$ reject → data **normal nahi hai** ❌

**Zaroori limitation:** test ki sensitivity $n$ par bahut depend karti hai. Bahut bade samples ($n > 1000$) mein ye mamooli deviations ko bhi significant bata deta hai; bahut chhote samples ($n < 20$) mein asli non-normality pakad hi nahi paata. Isliye hamesha **Q-Q plot** aur histogram ke sath dekho.

**Example:** $p = 0.35$ aaya → "achha, data normal hai, t-test kar sakte hain." $p = 0.001$ aaya → "data normal nahi hai, non-parametric test sochna padega."

**Yaad rakho:** Yahan chhoti p-value **buri khabar** hai — baaki tests ke ulta!

</HindiBox>

### 7.2.3 Normality

**How to assess normality — use multiple methods, not just one test:**

**Visual (most reliable):**
- **Histogram** — should look roughly bell-shaped
- **Q-Q plot** — points should fall along the diagonal line
- **Box plot** — should be roughly symmetric

**Numerical:**
- **Skewness** — acceptable between $-1$ and $+1$
- **Kurtosis** — acceptable between $-1$ and $+1$ (excess kurtosis)
- Formal tests: Shapiro-Wilk, Anderson-Darling

**When normality matters less:**
- $n \geq 30$ per group — the Central Limit Theorem makes t-tests and ANOVA fairly robust
- The test is comparing means (means become normal even when raw data isn't)

**Fixing non-normality:** log transform for right-skewed data, square root for count data, Box-Cox for a general solution, or simply switch to a non-parametric test.

<HindiBox>

**Normality kaise check karein — sirf ek test par bharosa mat karo:**

**Visual (sabse reliable):**
- **Histogram** — lagbhag bell-shaped dikhna chahiye
- **Q-Q plot** — points diagonal line par hone chahiye
- **Box plot** — lagbhag symmetric

**Numerical:**
- **Skewness** — $-1$ se $+1$ ke beech acceptable
- **Kurtosis** — $-1$ se $+1$ ke beech acceptable
- Formal tests: Shapiro-Wilk, Anderson-Darling

**Kab normality kam matter karti hai:**
- Har group mein $n \geq 30$ — CLT ki wajah se t-test aur ANOVA kaafi robust ho jaate hain
- Jab test means compare kar raha ho (means normal ho jaate hain chahe raw data na ho)

**Non-normality theek karne ke tarike:** right-skewed data ke liye log transform, count data ke liye square root, general solution ke liye Box-Cox, ya seedha non-parametric test par switch kar jao.

**Zaroori baat:** ANOVA aur regression mein normality **residuals** ki chahiye hoti hai, raw data ki nahi. Ye ek bahut common galatfehmi hai.

</HindiBox>

### 7.2.4 Levene's Test

Levene's test checks whether two or more groups have **equal variances** (homoscedasticity).

$$
H_0: \sigma_1^2 = \sigma_2^2 = \cdots = \sigma_k^2 \qquad H_1: \text{At least one variance differs}
$$

Like Shapiro-Wilk, you *want* $p > 0.05$ here (equal variances confirmed).

$$
W = \frac{(N-k)}{(k-1)} \cdot \frac{\sum_{i=1}^{k} n_i (\bar{Z}_i - \bar{Z})^2}{\sum_{i=1}^{k}\sum_{j=1}^{n_i} (Z_{ij} - \bar{Z}_i)^2}
$$

where $Z_{ij} = |x_{ij} - \bar{x}_i|$ (absolute deviations from the group mean).

**Why Levene over Bartlett's test:** Levene's is far more robust to non-normality. Bartlett's test is more powerful but breaks down badly if the data isn't normal. The **Brown-Forsythe** variant (using medians instead of means) is even more robust.

<HindiBox>

Levene's test check karta hai ki do ya zyada groups ka **variance barabar** hai ya nahi (homoscedasticity).

$$
H_0: \sigma_1^2 = \sigma_2^2 = \cdots = \sigma_k^2 \qquad H_1: \text{Kam se kam ek alag hai}
$$

Shapiro-Wilk ki tarah, yahan bhi aap $p > 0.05$ **chahte ho** (variances barabar hain).

**Levene vs Bartlett:** Levene's non-normality ke sath kahin zyada robust hai. Bartlett's zyada powerful hai lekin data normal na ho toh bilkul bekaar ho jaata hai. **Brown-Forsythe** version (means ki jagah medians use karke) aur bhi robust hai.

**Example:** Do classes ke marks compare karne hain. Levene's test mein $p = 0.42$ aaya → variances barabar hain → standard t-test theek hai. Agar $p = 0.01$ aata → **Welch's t-test** use karna padta.

</HindiBox>

### 7.2.5 Homogeneity of Variance

Homogeneity of variance (homoscedasticity) means the spread of scores is roughly the same across all groups. Its opposite is **heteroscedasticity**.

**Why it matters:** t-tests and ANOVA pool variance across groups. If one group is far more variable than another, the pooled estimate misrepresents both, distorting the test statistic and p-value.

**Rough check:** if the largest group variance is less than 4× the smallest, the violation is usually tolerable — especially with **equal group sizes**, which make these tests quite robust.

**Solutions when violated:**
- **Welch's t-test** or **Welch's ANOVA** — do not assume equal variances (many statisticians recommend using Welch's *by default*)
- **Games-Howell** post-hoc test instead of Tukey
- Transform the data
- Use a non-parametric alternative

<HindiBox>

Homogeneity of variance (homoscedasticity) ka matlab hai ki saare groups mein scores ka phailav lagbhag ek jaisa hai. Iska ulta hai **heteroscedasticity**.

**Ye kyun matter karta hai:** t-test aur ANOVA groups ka variance pool karte hain. Agar ek group dusre se bahut zyada variable hai, toh pooled estimate dono ko galat represent karta hai, aur test statistic aur p-value bigad jaate hain.

**Mota-moti check:** agar sabse bade group ka variance sabse chhote se 4 guna se kam hai, toh violation usually chal jaata hai — khaas kar jab **group sizes barabar** hon, tab ye tests kaafi robust hote hain.

**Violate hone par solutions:**
- **Welch's t-test** ya **Welch's ANOVA** — ye equal variance nahi maante (kai statisticians toh Welch's ko *default* hi use karne ki salah dete hain)
- Tukey ki jagah **Games-Howell** post-hoc test
- Data transform karo
- Non-parametric alternative use karo

**Example:** Ek coaching class ke marks 60–70 ke beech hain (kam variance), dusri ke 20–95 ke beech (bahut zyada variance). Average dono ka 65 ho sakta hai, lekin variance bilkul alag — yahan Welch's t-test hi sahi hai.

</HindiBox>

### 7.2.6 What to Do When Assumptions Fail?

| Violated assumption | Options |
|---|---|
| **Normality** | Transform ($\log$, $\sqrt{\cdot}$, Box-Cox); use non-parametric test; rely on CLT if $n \geq 30$; bootstrap |
| **Homogeneity of variance** | Welch's t-test / Welch's ANOVA; Games-Howell post-hoc; transform; non-parametric |
| **Independence** | Use the correct design — mixed models, repeated-measures ANOVA, clustered standard errors. **Cannot be patched afterwards.** |
| **Outliers** | Investigate first; use robust methods, trimmed means, or non-parametric tests |
| **Small sample** | Non-parametric tests; exact tests; bootstrap; permutation tests |

**Parametric → non-parametric map:**

| Parametric | Non-parametric |
|---|---|
| One-sample t-test | Wilcoxon signed-rank |
| Independent t-test | Mann-Whitney U |
| Paired t-test | Wilcoxon signed-rank |
| One-way ANOVA | Kruskal-Wallis |
| Repeated-measures ANOVA | Friedman |
| Pearson correlation | Spearman / Kendall |

**Trade-off:** non-parametric tests make fewer assumptions but have less power (roughly 95% of parametric power when assumptions *are* met) and test medians/ranks rather than means.

<HindiBox>

| Toot gayi assumption | Options |
|---|---|
| **Normality** | Transform ($\log$, $\sqrt{\cdot}$, Box-Cox); non-parametric test; $n \geq 30$ ho toh CLT par bharosa; bootstrap |
| **Homogeneity of variance** | Welch's t-test / ANOVA; Games-Howell; transform; non-parametric |
| **Independence** | Sahi design use karo — mixed models, repeated-measures ANOVA. **Baad mein theek nahi ho sakta.** |
| **Outliers** | Pehle jaancho; robust methods, trimmed means, ya non-parametric |
| **Chhota sample** | Non-parametric tests; exact tests; bootstrap; permutation tests |

**Parametric → non-parametric ka map:**

| Parametric | Non-parametric |
|---|---|
| One-sample t-test | Wilcoxon signed-rank |
| Independent t-test | Mann-Whitney U |
| Paired t-test | Wilcoxon signed-rank |
| One-way ANOVA | Kruskal-Wallis |
| Repeated-measures ANOVA | Friedman |
| Pearson correlation | Spearman / Kendall |

**Trade-off:** non-parametric tests kam assumptions maangte hain lekin unki power kam hoti hai (jab assumptions poori hon tab lagbhag 95%), aur wo means ki jagah medians/ranks test karte hain.

**Sabse zaroori:** Independence ka violation sabse khatarnak hai — ise baad mein theek nahi kiya ja sakta. Isliye study **design** karte waqt hi dhyan rakhna padta hai.

</HindiBox>

## 7.3 🔬 t-Tests

### 7.3.1 One-Sample t-Test

Compares a sample mean against a known or hypothesized population value.

$$
H_0: \mu = \mu_0 \qquad H_1: \mu \neq \mu_0
$$

$$
t = \frac{\bar{x} - \mu_0}{s / \sqrt{n}}, \qquad df = n - 1
$$

**Use when:** you have one group and want to compare its average to a benchmark, standard, or claimed value.

<HindiBox>

Ye ek sample ke mean ko kisi known ya claimed population value se compare karta hai.

$$
H_0: \mu = \mu_0 \qquad H_1: \mu \neq \mu_0
$$

$$
t = \frac{\bar{x} - \mu_0}{s / \sqrt{n}}, \qquad df = n - 1
$$

**Kab use karein:** jab ek hi group ho aur uska average kisi benchmark, standard, ya claim se compare karna ho.

**Example:** Ek company claim karti hai ki uske packets mein 500 gm hota hai. Aap 30 packets check karte hain, average 495 gm milta hai. Kya ye difference significant hai ya sirf random variation? → One-sample t-test.

</HindiBox>

### 7.3.2 Independent-Samples t-Test

Compares the means of **two separate, unrelated groups**.

$$
H_0: \mu_1 = \mu_2 \qquad H_1: \mu_1 \neq \mu_2
$$

**Student's t-test** (assumes equal variances):

$$
t = \frac{\bar{x}_1 - \bar{x}_2}{s_p \sqrt{\dfrac{1}{n_1} + \dfrac{1}{n_2}}}, \qquad s_p^2 = \frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1 + n_2 - 2}
$$

with $df = n_1 + n_2 - 2$.

**Welch's t-test** (does not assume equal variances — the safer default):

$$
t = \frac{\bar{x}_1 - \bar{x}_2}{\sqrt{\dfrac{s_1^2}{n_1} + \dfrac{s_2^2}{n_2}}}
$$

<HindiBox>

Ye **do alag, unrelated groups** ke means compare karta hai.

$$
H_0: \mu_1 = \mu_2 \qquad H_1: \mu_1 \neq \mu_2
$$

**Student's t-test** (equal variances maanta hai) mein pooled variance $s_p^2$ use hota hai, $df = n_1 + n_2 - 2$.

**Welch's t-test** (equal variances nahi maanta — safer default):

$$
t = \frac{\bar{x}_1 - \bar{x}_2}{\sqrt{\dfrac{s_1^2}{n_1} + \dfrac{s_2^2}{n_2}}}
$$

**Example:** Class A (40 students) aur Class B (35 students) ke marks compare karna — dono alag students hain, isliye **Independent** t-test.

**Practical salah:** Aaj kal kai statisticians kehte hain ki hamesha **Welch's** hi use karo — kyunki jab variances barabar hote hain tab bhi ye lagbhag utna hi achha kaam karta hai, aur jab nahi hote tab bacha leta hai.

</HindiBox>

### 7.3.3 Paired-Samples t-Test

Compares two **related** measurements — the same subjects measured twice, or matched pairs.

$$
H_0: \mu_d = 0 \qquad H_1: \mu_d \neq 0
$$

$$
t = \frac{\bar{d}}{s_d / \sqrt{n}}, \qquad df = n - 1
$$

where $d_i = x_{i,\text{after}} - x_{i,\text{before}}$ and $\bar{d}$ is the mean difference.

**Why it's more powerful:** by analyzing differences within each subject, it removes between-subject variability entirely — so it can detect smaller effects with fewer participants.

<HindiBox>

Ye do **related** measurements compare karta hai — ek hi subjects do baar naape gaye, ya matched pairs.

$$
H_0: \mu_d = 0 \qquad H_1: \mu_d \neq 0
$$

$$
t = \frac{\bar{d}}{s_d / \sqrt{n}}, \qquad df = n - 1
$$

Yahan $d_i = x_{i,\text{baad}} - x_{i,\text{pehle}}$ aur $\bar{d}$ mean difference hai.

**Ye zyada powerful kyun hai:** har subject ke andar ka difference dekhne se subjects ke beech ka variation poori tarah hat jaata hai — isliye kam logon ke sath bhi chhote effects pakde ja sakte hain.

**Example:** 20 students ke coaching se **pehle** aur **baad** ke marks — ek hi log dono baar. Isliye **Paired** t-test.

**Sabse common galti:** Paired data par Independent t-test chala dena — isse power kaafi ghat jaati hai aur asli effect miss ho sakta hai.

</HindiBox>

### 7.3.4 Assumptions

| # | Assumption | How to check | If violated |
|---|---|---|---|
| 1 | **Continuous dependent variable** | Check data type | Use chi-square or logistic regression |
| 2 | **Independence of observations** | Study design | Use paired test or mixed model |
| 3 | **Normality** (of data, or of differences for paired) | Shapiro-Wilk, Q-Q plot | Mann-Whitney U / Wilcoxon |
| 4 | **Homogeneity of variance** (independent test only) | Levene's test | Welch's t-test |
| 5 | **No extreme outliers** | Box plot, z-scores | Robust or non-parametric methods |
| 6 | **Random sampling** | Study design | Limits generalizability |

**Note:** for the paired t-test, normality is required of the **differences**, not of the two sets of raw scores.

<HindiBox>

| # | Assumption | Kaise check karein | Violate hone par |
|---|---|---|---|
| 1 | **Continuous dependent variable** | Data type dekho | Chi-square ya logistic regression |
| 2 | **Independence of observations** | Study design | Paired test ya mixed model |
| 3 | **Normality** (paired mein differences ki) | Shapiro-Wilk, Q-Q plot | Mann-Whitney U / Wilcoxon |
| 4 | **Homogeneity of variance** (sirf independent test mein) | Levene's test | Welch's t-test |
| 5 | **Koi extreme outliers nahi** | Box plot, z-scores | Robust ya non-parametric |
| 6 | **Random sampling** | Study design | Generalizability limit ho jaati hai |

**Zaroori note:** Paired t-test mein normality **differences** ki chahiye, dono raw score sets ki nahi. Ye bahut log galat samajhte hain.

</HindiBox>

### 7.3.5 Interpretation

**Decision:** reject $H_0$ if $p \leq \alpha$.

**A complete report includes:**
1. Descriptive statistics for each group (mean, SD, $n$)
2. The test used and why
3. $t$, $df$, and $p$
4. Effect size (Cohen's $d$)
5. Confidence interval for the mean difference
6. A plain-language conclusion

**Standard format:**
> Group A ($M = 78.4$, $SD = 8.2$) scored significantly higher than Group B ($M = 71.6$, $SD = 9.1$), $t(73) = 3.42$, $p = .001$, $d = 0.79$, 95% CI [2.84, 10.76].

<HindiBox>

**Decision:** $p \leq \alpha$ ho toh $H_0$ reject.

**Complete report mein ye sab hona chahiye:**
1. Har group ki descriptive statistics (mean, SD, $n$)
2. Kaunsa test use kiya aur kyun
3. $t$, $df$, aur $p$
4. Effect size (Cohen's $d$)
5. Mean difference ka confidence interval
6. Aam bhasha mein conclusion

**Standard format:**
> Group A ($M = 78.4$, $SD = 8.2$) ke marks Group B ($M = 71.6$, $SD = 9.1$) se significantly zyada the, $t(73) = 3.42$, $p = .001$, $d = 0.79$, 95% CI [2.84, 10.76].

**Sirf p-value likhna kaafi nahi hai** — effect size aur CI ke bina reader ko pata hi nahi chalega ki difference practically kitna bada hai.

</HindiBox>

### 7.3.6 Effect Size

p-values tell you *whether* an effect exists; effect sizes tell you *how big* it is.

**Cohen's $d$** (independent samples):

$$
d = \frac{\bar{x}_1 - \bar{x}_2}{s_p}
$$

**Cohen's $d$** (paired samples):

$$
d = \frac{\bar{d}}{s_d}
$$

| $|d|$ | Interpretation |
|---|---|
| 0.2 | Small |
| 0.5 | Medium |
| 0.8 | Large |
| 1.2+ | Very large |

**Also useful:** Hedges' $g$ (bias-corrected $d$, better for $n < 20$), Glass's $\Delta$ (uses the control group's SD only), and $r = \sqrt{t^2/(t^2 + df)}$.

<HindiBox>

p-value batati hai ki effect **hai ya nahi**; effect size batati hai ki wo **kitna bada** hai.

**Cohen's $d$** (independent samples):

$$
d = \frac{\bar{x}_1 - \bar{x}_2}{s_p}
$$

**Cohen's $d$** (paired samples): $d = \dfrac{\bar{d}}{s_d}$

| $|d|$ | Matlab |
|---|---|
| 0.2 | Small |
| 0.5 | Medium |
| 0.8 | Large |
| 1.2+ | Very large |

**Kyun zaroori hai:** $d$ sample size par depend **nahi** karta, jabki p-value karti hai. Isi liye bade sample mein bekaar chhote effect bhi "significant" dikh jaate hain — lekin $d$ sach bata deta hai.

**Example:** $d = 0.8$ ka matlab hai dono groups ke means ek poore standard deviation ka farak rakhte hain — ye sach mein noticeable difference hai.

</HindiBox>

### 7.3.7 Python Implementation

```python
import numpy as np
from scipy import stats

group_a = np.array([78, 82, 75, 88, 79, 85, 77, 81, 84, 80])
group_b = np.array([70, 74, 68, 77, 72, 71, 69, 75, 73, 70])

# ---- Step 1: Check assumptions ----
print("Shapiro-Wilk (A):", stats.shapiro(group_a))
print("Shapiro-Wilk (B):", stats.shapiro(group_b))
print("Levene's test   :", stats.levene(group_a, group_b))

# ---- Step 2: One-sample t-test (vs benchmark of 75) ----
t_stat, p_val = stats.ttest_1samp(group_a, popmean=75)
print(f"\nOne-sample: t={t_stat:.4f}, p={p_val:.4f}")

# ---- Step 3: Independent t-test ----
# equal_var=False runs Welch's test (safer default)
t_ind, p_ind = stats.ttest_ind(group_a, group_b, equal_var=False)
print(f"Independent (Welch): t={t_ind:.4f}, p={p_ind:.4f}")

# ---- Step 4: Paired t-test ----
before = np.array([65, 70, 68, 72, 66, 71, 69, 67])
after  = np.array([72, 76, 71, 79, 74, 77, 73, 75])
t_pair, p_pair = stats.ttest_rel(after, before)
print(f"Paired: t={t_pair:.4f}, p={p_pair:.4f}")

# ---- Step 5: Effect size (Cohen's d) ----
def cohens_d(x, y):
    nx, ny = len(x), len(y)
    pooled_sd = np.sqrt(((nx-1)*np.var(x, ddof=1) +
                         (ny-1)*np.var(y, ddof=1)) / (nx+ny-2))
    return (np.mean(x) - np.mean(y)) / pooled_sd

print(f"\nCohen's d: {cohens_d(group_a, group_b):.4f}")
```

<HindiBox>

**Teen main functions yaad rakho:**

| Function | Kab use karein |
|---|---|
| `ttest_1samp()` | Ek group vs ek known value |
| `ttest_ind()` | Do alag groups |
| `ttest_rel()` | Ek hi group, pehle-baad |

**Sabse zaroori parameter:** `equal_var=False` — isse Welch's test chalta hai. SciPy ka default `True` hai, lekin practically `False` hi safer choice hai.

**Ek-tailed test chahiye?** SciPy mein `alternative='greater'` ya `alternative='less'` use karo.

**Workflow yaad rakho:** pehle assumptions check (`shapiro`, `levene`), phir test, phir effect size. Seedha t-test chala dena adhoora kaam hai.

</HindiBox>

## 7.4 🔀 ANOVA

### 7.4.1 Why ANOVA?

When comparing three or more groups, running multiple t-tests inflates the Type I error rate dramatically. With $k$ groups you need $\binom{k}{2}$ comparisons, and the family-wise error rate becomes:

$$
\alpha_{FW} = 1 - (1 - \alpha)^m
$$

| Groups $k$ | Comparisons $m$ | $\alpha_{FW}$ at $\alpha = 0.05$ |
|---|---|---|
| 3 | 3 | 14.3% |
| 4 | 6 | 26.5% |
| 5 | 10 | 40.1% |
| 6 | 15 | 53.7% |

ANOVA solves this by testing all groups **simultaneously** with a single test, holding the overall error rate at $\alpha$.

<HindiBox>

Jab teen ya zyada groups compare karne hon, baar-baar t-test chalane se Type I error bahut badh jaati hai. $k$ groups ke liye $\binom{k}{2}$ comparisons chahiye, aur overall error rate ban jaati hai:

$$
\alpha_{FW} = 1 - (1 - \alpha)^m
$$

| Groups $k$ | Comparisons $m$ | $\alpha_{FW}$ ($\alpha = 0.05$ par) |
|---|---|---|
| 3 | 3 | 14.3% |
| 4 | 6 | 26.5% |
| 5 | 10 | 40.1% |
| 6 | 15 | 53.7% |

ANOVA is problem ko solve karta hai — saare groups ko **ek saath** ek hi test se check karke, aur overall error rate ko $\alpha$ par hi rakh kar.

**Example:** 5 groups ke liye 10 t-tests karne par kam se kam ek false positive ka chance **40%** hai! Ye bilkul unacceptable hai. Isi liye ANOVA banaya gaya.

</HindiBox>

### 7.4.2 One-Way ANOVA

One-way ANOVA compares the means of three or more groups defined by a **single** categorical factor.

$$
H_0: \mu_1 = \mu_2 = \cdots = \mu_k \qquad H_1: \text{At least one mean differs}
$$

**Critical point:** rejecting $H_0$ tells you only that *some* difference exists — not which groups differ. That requires **post-hoc tests**.

Despite its name, ANOVA compares **means** by analysing **variances** — it asks whether the variation *between* group means is larger than the variation *within* groups.

<HindiBox>

One-way ANOVA teen ya zyada groups ke means compare karta hai, jo **ek** categorical factor se bane hote hain.

$$
H_0: \mu_1 = \mu_2 = \cdots = \mu_k \qquad H_1: \text{Kam se kam ek mean alag hai}
$$

**Bahut zaroori baat:** $H_0$ reject hone se sirf itna pata chalta hai ki *koi* difference hai — **kaunse groups** alag hain, ye nahi. Uske liye **post-hoc tests** chahiye.

Naam ke bawajood, ANOVA **means** compare karta hai lekin **variances** ka analysis karke — ye poochta hai ki groups ke *beech* ka variation, groups ke *andar* ke variation se zyada hai ya nahi.

**Example:** 4 alag teaching methods ke results compare karne hain → One-way ANOVA. Factor ek hi hai (teaching method), lekin uske 4 levels hain.

</HindiBox>

### 7.4.3 Between-Group Variance

Between-group variance measures how much the **group means differ from the overall grand mean** — this is the "signal" ANOVA is looking for.

$$
SS_{\text{between}} = \sum_{i=1}^{k} n_i (\bar{x}_i - \bar{x}_{\text{grand}})^2
$$

$$
df_{\text{between}} = k - 1, \qquad MS_{\text{between}} = \frac{SS_{\text{between}}}{k - 1}
$$

A large $MS_{\text{between}}$ means the group means are spread far apart — evidence that the groups genuinely differ.

<HindiBox>

Between-group variance batata hai ki **group means overall grand mean se kitne alag hain** — yahi wo "signal" hai jo ANOVA dhoondh raha hai.

$$
SS_{\text{between}} = \sum_{i=1}^{k} n_i (\bar{x}_i - \bar{x}_{\text{grand}})^2
$$

$$
df_{\text{between}} = k - 1, \qquad MS_{\text{between}} = \frac{SS_{\text{between}}}{k - 1}
$$

Bada $MS_{\text{between}}$ ka matlab hai group means ek dusre se door-door hain — yani groups mein sach mein farak hai.

**Iska matlab:** Agar teeno classes ke averages 60, 61, 62 hain toh between-group variance chhota hoga. Lekin agar 50, 70, 90 hain toh bahut bada — aur ANOVA significant aayega.

</HindiBox>

### 7.4.4 Within-Group Variance

Within-group variance measures how much individual scores vary **around their own group's mean** — this is the "noise" or unexplained error.

$$
SS_{\text{within}} = \sum_{i=1}^{k} \sum_{j=1}^{n_i} (x_{ij} - \bar{x}_i)^2
$$

$$
df_{\text{within}} = N - k, \qquad MS_{\text{within}} = \frac{SS_{\text{within}}}{N - k}
$$

**The fundamental partition:**

$$
SS_{\text{total}} = SS_{\text{between}} + SS_{\text{within}}
$$

This decomposition — splitting total variation into explained and unexplained parts — is the conceptual heart of ANOVA and, later, of regression.

<HindiBox>

Within-group variance batata hai ki individual scores **apne hi group ke mean ke aas-paas** kitna vary karte hain — yahi "noise" ya unexplained error hai.

$$
SS_{\text{within}} = \sum_{i=1}^{k} \sum_{j=1}^{n_i} (x_{ij} - \bar{x}_i)^2
$$

$$
df_{\text{within}} = N - k, \qquad MS_{\text{within}} = \frac{SS_{\text{within}}}{N - k}
$$

**Basic partition:**

$$
SS_{\text{total}} = SS_{\text{between}} + SS_{\text{within}}
$$

Total variation ko explained aur unexplained hisson mein baantna — yahi ANOVA ka (aur aage chal kar regression ka bhi) asli concept hai.

**Simple bhasha mein:** Between = "groups ke beech ka farak" (signal). Within = "ek hi group ke andar ka farak" (noise). ANOVA dono ka ratio dekhta hai.

</HindiBox>

### 7.4.5 F-statistic

The F-statistic is the ratio of explained to unexplained variance — literally a signal-to-noise ratio:

$$
F = \frac{MS_{\text{between}}}{MS_{\text{within}}} = \frac{\text{Signal}}{\text{Noise}}
$$

**Interpretation:**
- $F \approx 1$ → between-group variation is no larger than random noise → no real difference
- $F \gg 1$ → group means differ far more than chance would produce → likely a real effect

**ANOVA summary table:**

| Source | SS | df | MS | F |
|---|---|---|---|---|
| Between | $SS_B$ | $k-1$ | $SS_B/(k-1)$ | $MS_B/MS_W$ |
| Within | $SS_W$ | $N-k$ | $SS_W/(N-k)$ | |
| Total | $SS_T$ | $N-1$ | | |

**Effect size:** $\eta^2 = \dfrac{SS_{\text{between}}}{SS_{\text{total}}}$ — the proportion of variance explained (0.01 small, 0.06 medium, 0.14 large).

<HindiBox>

F-statistic explained aur unexplained variance ka ratio hai — literally signal-to-noise ratio:

$$
F = \frac{MS_{\text{between}}}{MS_{\text{within}}} = \frac{\text{Signal}}{\text{Noise}}
$$

**Interpretation:**
- $F \approx 1$ → groups ke beech ka variation random noise jitna hi hai → koi asli difference nahi
- $F \gg 1$ → group means sanyog se kahin zyada alag hain → asli effect hai

**Effect size:** $\eta^2 = \dfrac{SS_{\text{between}}}{SS_{\text{total}}}$ — kitna variance explain hua (0.01 small, 0.06 medium, 0.14 large).

**Yaad rakhne ka aasan tarika:** F ka matlab hai — "groups ke beech ka shor, groups ke andar ke shor se kitna guna zyada hai?" Agar 1 ke aas-paas hai toh kuch khaas nahi. Agar 5-10 hai toh sach mein kuch hai.

**Note:** ANOVA hamesha **right-tailed** test hota hai — sirf bada F hi significant hota hai.

</HindiBox>

### 7.4.6 Assumptions

1. **Independence of observations** — most critical; cannot be fixed afterwards
2. **Normality** — residuals should be approximately normal (robust if $n \geq 30$ per group)
3. **Homogeneity of variance** — check with Levene's test
4. **Continuous dependent variable** — interval or ratio scale
5. **Categorical independent variable** — with 3+ levels
6. **No extreme outliers**

**Robustness:** ANOVA tolerates moderate violations of normality and homogeneity **when group sizes are equal**. Unequal group sizes plus unequal variances is the genuinely dangerous combination.

**When violated:** use **Welch's ANOVA** (unequal variances) or the **Kruskal-Wallis test** (non-normal data).

<HindiBox>

1. **Independence of observations** — sabse critical; baad mein theek nahi ho sakta
2. **Normality** — residuals lagbhag normal ($n \geq 30$ per group ho toh robust)
3. **Homogeneity of variance** — Levene's test se check karo
4. **Continuous dependent variable** — interval ya ratio scale
5. **Categorical independent variable** — 3+ levels ke sath
6. **Koi extreme outliers nahi**

**Robustness:** ANOVA normality aur homogeneity ke halke violations sah leta hai — **jab group sizes barabar hon**. Alag-alag group sizes **aur** alag variances — ye combination sach mein khatarnak hai.

**Violate hone par:** **Welch's ANOVA** (unequal variances) ya **Kruskal-Wallis test** (non-normal data).

**Practical tip:** Study design karte waqt hi koshish karo ki har group mein lagbhag barabar log hon — isse aadhi problems apne aap khatam ho jaati hain.

</HindiBox>

### 7.4.7 Post-Hoc Tests

A significant ANOVA says *some* groups differ; post-hoc tests identify **which** ones, while controlling the family-wise error rate.

| Test | Use when |
|---|---|
| **Tukey's HSD** | Equal variances, equal $n$ — the standard choice for all pairwise comparisons |
| **Bonferroni** | Few planned comparisons; simple but conservative ($\alpha/m$) |
| **Games-Howell** | Unequal variances or unequal $n$ |
| **Scheffé** | Complex contrasts; very conservative |
| **Dunnett's** | Comparing several treatments against one control only |
| **Holm-Bonferroni** | More powerful stepwise version of Bonferroni |

**Important:** only run post-hoc tests **if** the overall ANOVA is significant. Running them regardless reintroduces exactly the multiple-comparison problem ANOVA was designed to avoid.

<HindiBox>

Significant ANOVA batata hai ki *kuch* groups alag hain; post-hoc tests batate hain ki **kaunse**, aur sath hi overall error rate bhi control karte hain.

| Test | Kab use karein |
|---|---|
| **Tukey's HSD** | Equal variances, equal $n$ — saare pairs ke liye standard choice |
| **Bonferroni** | Kam planned comparisons; simple lekin conservative ($\alpha/m$) |
| **Games-Howell** | Unequal variances ya unequal $n$ |
| **Scheffé** | Complex contrasts; bahut conservative |
| **Dunnett's** | Kai treatments ko sirf ek control se compare karna |
| **Holm-Bonferroni** | Bonferroni ka zyada powerful stepwise version |

**Zaroori:** Post-hoc tests **tabhi** chalao jab overall ANOVA significant ho. Warna wahi multiple-comparison problem wapas aa jaayegi jise rokne ke liye ANOVA banaya gaya tha.

**Example:** ANOVA ne bataya ki 4 teaching methods mein farak hai. Ab Tukey's HSD batayega ki Method A vs B mein farak hai ya nahi, A vs C mein hai ya nahi — har jodi ke liye alag se.

</HindiBox>

### 7.4.8 Python Implementation

```python
import numpy as np
import pandas as pd
from scipy import stats
import statsmodels.api as sm
from statsmodels.formula.api import ols
from statsmodels.stats.multicomp import pairwise_tukeyhsd

method_a = [78, 82, 75, 88, 79, 85, 77, 81]
method_b = [70, 74, 68, 77, 72, 71, 69, 75]
method_c = [85, 89, 83, 91, 87, 90, 86, 88]
method_d = [76, 79, 74, 81, 77, 78, 75, 80]

# ---- Step 1: Assumptions ----
for name, grp in [("A", method_a), ("B", method_b),
                  ("C", method_c), ("D", method_d)]:
    w, p = stats.shapiro(grp)
    print(f"Shapiro {name}: W={w:.4f}, p={p:.4f}")

lev_stat, lev_p = stats.levene(method_a, method_b, method_c, method_d)
print(f"Levene: stat={lev_stat:.4f}, p={lev_p:.4f}")

# ---- Step 2: One-way ANOVA ----
f_stat, p_val = stats.f_oneway(method_a, method_b, method_c, method_d)
print(f"\nANOVA: F={f_stat:.4f}, p={p_val:.4f}")

# ---- Step 3: Full ANOVA table + effect size ----
df = pd.DataFrame({
    "score":  method_a + method_b + method_c + method_d,
    "method": ["A"]*8 + ["B"]*8 + ["C"]*8 + ["D"]*8
})
model = ols("score ~ C(method)", data=df).fit()
table = sm.stats.anova_lm(model, typ=2)
print("\n", table)

eta_sq = table["sum_sq"][0] / table["sum_sq"].sum()
print(f"Eta-squared: {eta_sq:.4f}")

# ---- Step 4: Post-hoc (only if ANOVA significant) ----
if p_val <= 0.05:
    tukey = pairwise_tukeyhsd(endog=df["score"],
                              groups=df["method"], alpha=0.05)
    print("\n", tukey)

# ---- Alternative: Welch's ANOVA if variances unequal ----
# import pingouin as pg
# pg.welch_anova(dv="score", between="method", data=df)

# ---- Alternative: Kruskal-Wallis if not normal ----
h_stat, p_kw = stats.kruskal(method_a, method_b, method_c, method_d)
print(f"\nKruskal-Wallis: H={h_stat:.4f}, p={p_kw:.4f}")
```

<HindiBox>

**Do libraries, do maksad:**

| Library | Kya deta hai |
|---|---|
| `scipy.stats.f_oneway()` | Sirf F aur p — jaldi check ke liye |
| `statsmodels` | Poora ANOVA table (SS, df, MS, F) + effect size |

**Workflow yaad rakho:**
1. `shapiro()` aur `levene()` — assumptions
2. `f_oneway()` ya `anova_lm()` — main test
3. **Agar significant ho tabhi** → `pairwise_tukeyhsd()`

**Backup options:**
- Variances alag hain → `pingouin.welch_anova()`
- Data normal nahi hai → `stats.kruskal()`

**Note:** `pingouin` alag se install karna padta hai (`pip install pingouin`), lekin ye ANOVA ke liye kaafi convenient library hai.

</HindiBox>

## 7.5 🧩 MANOVA

### 7.5.1 What is MANOVA?

Multivariate Analysis of Variance (MANOVA) extends ANOVA to situations with **two or more dependent variables** analysed simultaneously.

$$
H_0: \boldsymbol{\mu}_1 = \boldsymbol{\mu}_2 = \cdots = \boldsymbol{\mu}_k
$$

where each $\boldsymbol{\mu}_i$ is a **vector** of means across all dependent variables.

**Why not just run separate ANOVAs?**
- Running $p$ separate ANOVAs inflates the Type I error rate
- Separate tests ignore the **correlations** between dependent variables
- MANOVA can detect effects that emerge only from the *combination* of variables — differences invisible to any single ANOVA

**Test statistics:** Wilks' Lambda ($\Lambda$, most common), Pillai's Trace (most robust), Hotelling's Trace, Roy's Largest Root.

<HindiBox>

Multivariate Analysis of Variance (MANOVA) ANOVA ka wo version hai jisme **do ya zyada dependent variables** ek saath analyze kiye jaate hain.

$$
H_0: \boldsymbol{\mu}_1 = \boldsymbol{\mu}_2 = \cdots = \boldsymbol{\mu}_k
$$

Yahan har $\boldsymbol{\mu}_i$ ek **vector** hai — saare dependent variables ke means ka.

**Alag-alag ANOVA kyun nahi chala dete?**
- $p$ alag ANOVAs chalane se Type I error badh jaati hai
- Alag tests dependent variables ke beech ke **correlations** ko ignore kar dete hain
- MANOVA aise effects pakad sakta hai jo variables ke *combination* se hi dikhte hain — jinhe koi single ANOVA nahi pakad paata

**Test statistics:** Wilks' Lambda ($\Lambda$, sabse common), Pillai's Trace (sabse robust), Hotelling's Trace, Roy's Largest Root.

**Example:** Teen teaching methods ka asar sirf **marks** par nahi, balki **marks + confidence + attendance** teeno par ek saath dekhna → MANOVA.

</HindiBox>

### 7.5.2 ANOVA vs MANOVA

| Aspect | ANOVA | MANOVA |
|---|---|---|
| Dependent variables | One | Two or more |
| Test statistic | $F$ | Wilks' $\Lambda$, Pillai's Trace |
| Null hypothesis | $\mu_1 = \mu_2 = \cdots$ | $\boldsymbol{\mu}_1 = \boldsymbol{\mu}_2 = \cdots$ (vectors) |
| Handles DV correlation | No | Yes |
| Type I error with many DVs | Inflated | Controlled |
| Interpretation | Straightforward | More complex |
| Sample size needed | Smaller | Larger |
| Follow-up | Post-hoc tests | Separate ANOVAs, then post-hoc |

**When MANOVA is the better choice:** when the dependent variables are conceptually related and moderately correlated ($r \approx 0.3$–$0.7$). If they are uncorrelated, separate ANOVAs with a Bonferroni correction are simpler and just as valid.

<HindiBox>

| Aspect | ANOVA | MANOVA |
|---|---|---|
| Dependent variables | Ek | Do ya zyada |
| Test statistic | $F$ | Wilks' $\Lambda$, Pillai's Trace |
| Null hypothesis | $\mu_1 = \mu_2 = \cdots$ | Vectors ke roop mein |
| DV correlation handle karta hai | Nahi | Haan |
| Kai DVs ke sath Type I error | Badh jaati hai | Control mein |
| Interpretation | Simple | Zyada complex |
| Sample size chahiye | Kam | Zyada |
| Follow-up | Post-hoc tests | Alag ANOVAs, phir post-hoc |

**MANOVA kab behtar hai:** jab dependent variables conceptually jude hue hon aur moderately correlated hon ($r \approx 0.3$–$0.7$). Agar wo bilkul uncorrelated hain, toh Bonferroni correction ke sath alag ANOVAs hi simpler aur utne hi valid hain.

**Yaad rakho:** MANOVA hamesha behtar nahi hota — ye tabhi useful hai jab DVs ek dusre se jude hon.

</HindiBox>

### 7.5.3 Multiple Dependent Variables

**Guidelines for choosing dependent variables:**

- **Theoretical relevance:** they should all relate to a single underlying construct
- **Moderate correlation:** $r \approx 0.3$–$0.7$ is ideal
  - Too low ($r < 0.2$) → separate ANOVAs are simpler
  - Too high ($r > 0.8$) → redundant; risk of multicollinearity
- **Keep the number small:** 2–5 DVs; power drops sharply beyond that
- **Sample size:** each group's $n$ must exceed the number of DVs — ideally $n \geq 20$ per group per DV

**Warning:** adding weakly related dependent variables *dilutes* the multivariate effect and can turn a significant result non-significant.

<HindiBox>

**Dependent variables chunne ke guidelines:**

- **Theoretical relevance:** sab ek hi underlying concept se jude hone chahiye
- **Moderate correlation:** $r \approx 0.3$–$0.7$ ideal hai
  - Bahut kam ($r < 0.2$) → alag ANOVAs simpler
  - Bahut zyada ($r > 0.8$) → redundant; multicollinearity ka risk
- **Sankhya kam rakho:** 2–5 DVs; usse zyada par power tezi se girti hai
- **Sample size:** har group ka $n$ DVs ki sankhya se zyada hona chahiye — ideally $n \geq 20$ per group per DV

**⚠️ Warning:** kamzor related dependent variables add karne se multivariate effect *patla* pad jaata hai, aur ek significant result non-significant ban sakta hai.

**Example (achha):** Math score, Science score, English score — teeno "academic performance" se jude hain, moderately correlated. **Bura:** Math score + shoe size — inka koi rishta hi nahi.

</HindiBox>

### 7.5.4 Assumptions

1. **Independence of observations**
2. **Multivariate normality** — the DVs jointly follow a multivariate normal distribution (check each DV individually plus Mardia's test)
3. **Homogeneity of covariance matrices** — tested by **Box's M test** (use $p < 0.001$ as the threshold; Box's M is notoriously oversensitive)
4. **Linear relationships** between all pairs of DVs
5. **No multicollinearity** — DVs shouldn't correlate above $\approx 0.9$
6. **Adequate sample size** — $n$ per group $>$ number of DVs
7. **No multivariate outliers** — check with **Mahalanobis distance**

MANOVA is considerably more sensitive to assumption violations than ANOVA. **Pillai's Trace** is the most robust statistic when assumptions are shaky.

<HindiBox>

1. **Independence of observations**
2. **Multivariate normality** — DVs milkar multivariate normal distribution follow karein (har DV alag se check karo + Mardia's test)
3. **Homogeneity of covariance matrices** — **Box's M test** se check (threshold $p < 0.001$ rakho; Box's M bahut oversensitive hai)
4. **Linear relationships** — saare DV pairs ke beech
5. **No multicollinearity** — DVs ka correlation $\approx 0.9$ se upar nahi hona chahiye
6. **Kaafi sample size** — har group ka $n$ > DVs ki sankhya
7. **No multivariate outliers** — **Mahalanobis distance** se check karo

MANOVA assumption violations ke prati ANOVA se kahin zyada sensitive hai. Jab assumptions kamzor hon toh **Pillai's Trace** sabse robust statistic hai.

**Practical tip:** Box's M test itna sensitive hai ki wo lagbhag hamesha significant aa jaata hai. Isliye uske liye $\alpha = 0.001$ use karo, $0.05$ nahi.

</HindiBox>

### 7.5.5 Interpretation

**Step-by-step interpretation:**

1. **Check the multivariate test first.** Wilks' $\Lambda$ ranges from 0 to 1, where **smaller values indicate a stronger effect** (opposite of most statistics).
2. **If significant**, run follow-up univariate ANOVAs on each DV — with a Bonferroni-corrected $\alpha$ ($\alpha/p$).
3. **If a univariate ANOVA is significant**, run post-hoc tests to locate which groups differ.
4. **Report effect size:** multivariate $\eta^2 = 1 - \Lambda^{1/s}$, plus univariate $\eta^2$ for each DV.
5. **Consider discriminant analysis** to understand which combination of DVs best separates the groups.

**Sample reporting:**
> A one-way MANOVA revealed a significant multivariate effect of teaching method on the combined outcomes, $\Lambda = 0.62$, $F(6, 112) = 5.14$, $p < .001$, $\eta^2 = 0.22$.

<HindiBox>

**Step-by-step interpretation:**

1. **Pehle multivariate test dekho.** Wilks' $\Lambda$ 0 se 1 ke beech hota hai, aur **chhoti value = strong effect** (zyadatar statistics ke ulta!).
2. **Agar significant hai**, toh har DV par alag univariate ANOVA chalao — Bonferroni-corrected $\alpha$ ke sath ($\alpha/p$).
3. **Agar koi univariate ANOVA significant hai**, toh post-hoc test se pata karo kaunse groups alag hain.
4. **Effect size report karo:** multivariate $\eta^2 = 1 - \Lambda^{1/s}$, aur har DV ka univariate $\eta^2$.
5. **Discriminant analysis** par socho — ye batata hai ki DVs ka kaunsa combination groups ko sabse achhe se alag karta hai.

**Sabse zaroori:** Wilks' Lambda mein **chhoti value achhi khabar hai**. $\Lambda = 0.3$ ka matlab strong effect, $\Lambda = 0.95$ ka matlab lagbhag koi effect nahi. Ye ulta logic yaad rakhna.

</HindiBox>

### 7.5.6 Python Implementation

```python
import numpy as np
import pandas as pd
from statsmodels.multivariate.manova import MANOVA
from statsmodels.formula.api import ols
import statsmodels.api as sm
from scipy import stats

np.random.seed(42)

df = pd.DataFrame({
    "method": ["A"]*20 + ["B"]*20 + ["C"]*20,
    "math":   np.concatenate([np.random.normal(75, 8, 20),
                              np.random.normal(82, 8, 20),
                              np.random.normal(70, 8, 20)]),
    "science":np.concatenate([np.random.normal(72, 7, 20),
                              np.random.normal(80, 7, 20),
                              np.random.normal(68, 7, 20)]),
    "english":np.concatenate([np.random.normal(78, 6, 20),
                              np.random.normal(79, 6, 20),
                              np.random.normal(74, 6, 20)])
})

# ---- Step 1: Check DV correlations ----
print("DV correlations:\n", df[["math", "science", "english"]].corr())

# ---- Step 2: Run MANOVA ----
manova = MANOVA.from_formula(
    "math + science + english ~ method", data=df
)
print("\n", manova.mv_test())

# ---- Step 3: Follow-up univariate ANOVAs (Bonferroni) ----
alpha_corrected = 0.05 / 3
print(f"\nBonferroni-corrected alpha: {alpha_corrected:.4f}\n")

for dv in ["math", "science", "english"]:
    model = ols(f"{dv} ~ C(method)", data=df).fit()
    table = sm.stats.anova_lm(model, typ=2)
    p = table["PR(>F)"][0]
    eta_sq = table["sum_sq"][0] / table["sum_sq"].sum()
    flag = "SIGNIFICANT" if p < alpha_corrected else "not significant"
    print(f"{dv:8s}: F={table['F'][0]:.3f}, p={p:.4f}, "
          f"eta2={eta_sq:.3f} → {flag}")
```

<HindiBox>

**Output kaise padhein:**

`mv_test()` chaar statistics deta hai — **Wilks' Lambda** aur **Pillai's Trace** par dhyan do. Assumptions kamzor hon toh Pillai's zyada bharosemand hai.

**Workflow yaad rakho:**
1. Pehle DVs ka correlation check karo — agar sab $< 0.2$ hain toh MANOVA ka koi fayda nahi
2. MANOVA chalao
3. **Significant ho tabhi** → har DV par alag ANOVA, Bonferroni corrected $\alpha$ ke sath ($0.05/3 = 0.0167$)
4. Jo DVs significant nikle, un par post-hoc

**Note:** `statsmodels` mein Box's M test built-in nahi hai. Uske liye `pingouin` ya R use karna padta hai.

**Reality check:** MANOVA ki zaroorat practically kam padti hai. Zyadatar cases mein alag-alag ANOVAs Bonferroni correction ke sath kaafi hote hain aur samajhne mein bhi aasan hote hain.

</HindiBox>

## 7.6 🔗 Correlation Analysis

### 7.6.1 What is Correlation?

Correlation measures the **strength and direction of the relationship** between two variables. It is a standardized, unit-free measure bounded between $-1$ and $+1$.

**Correlation vs Covariance:**

$$
\text{Cov}(X,Y) = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{n - 1}, \qquad r = \frac{\text{Cov}(X,Y)}{s_x s_y}
$$

Covariance indicates direction but its magnitude depends on the units, making it hard to interpret. Correlation standardizes it, so an $r$ of 0.7 means the same thing whether you're measuring rupees or kilometres.

**Critical limitations:**
- Measures only **linear** relationships — a perfect curve can have $r = 0$
- Highly sensitive to outliers
- Does **not** imply causation

<HindiBox>

Correlation do variables ke beech ke rishte ki **strength aur direction** measure karta hai. Ye ek standardized, unit-free measure hai jo $-1$ aur $+1$ ke beech rehta hai.

**Correlation vs Covariance:**

$$
\text{Cov}(X,Y) = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{n - 1}, \qquad r = \frac{\text{Cov}(X,Y)}{s_x s_y}
$$

Covariance direction toh batati hai lekin uski magnitude units par depend karti hai, isliye samajhna mushkil. Correlation use standardize kar deta hai — isliye $r = 0.7$ ka matlab wahi hai chahe aap rupaye naap rahe ho ya kilometre.

**Zaroori limitations:**
- Sirf **linear** relationships measure karta hai — ek perfect curve ka bhi $r = 0$ aa sakta hai
- Outliers se bahut affect hota hai
- Causation **nahi** batata

**Sabse badi galatfehmi:** $r = 0$ ka matlab "koi rishta nahi" **nahi** hai — iska matlab sirf "koi *seedha* rishta nahi" hai.

</HindiBox>

### 7.6.2 Positive and Negative Correlation

**Positive correlation ($r > 0$):** both variables move in the same direction — as one increases, so does the other.
Examples: height and weight, study hours and marks, advertising spend and sales.

**Negative correlation ($r < 0$):** the variables move in opposite directions — as one increases, the other decreases.
Examples: price and demand, exercise and body fat, absences and grades.

**Zero correlation ($r \approx 0$):** no *linear* relationship.
Examples: shoe size and IQ, birth month and salary.

**Perfect correlation ($r = \pm 1$):** all points lie exactly on a straight line — extremely rare in real data, and usually a sign that the two variables are measuring the same thing.

<HindiBox>

**Positive correlation ($r > 0$):** dono variables ek hi direction mein badalte hain — ek badhta hai toh dusra bhi.
Examples: height aur weight, padhai ke ghante aur marks, advertising kharch aur sales.

**Negative correlation ($r < 0$):** dono ulti direction mein — ek badhta hai toh dusra ghatta hai.
Examples: price aur demand, exercise aur body fat, absences aur grades.

**Zero correlation ($r \approx 0$):** koi *linear* rishta nahi.
Examples: shoe size aur IQ, janam ka mahina aur salary.

**Perfect correlation ($r = \pm 1$):** saare points bilkul ek seedhi line par — real data mein bahut hi rare, aur usually ye signal hai ki dono variables ek hi cheez naap rahe hain.

**⚠️ Dhyan do:** Negative correlation ka matlab "kharab rishta" nahi hai — ye bas ulti direction batata hai. $r = -0.8$ utna hi strong hai jitna $r = +0.8$.

</HindiBox>

### 7.6.3 Pearson Correlation

Pearson's $r$ measures the strength of a **linear** relationship between two continuous variables.

$$
r = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum (x_i - \bar{x})^2 \sum (y_i - \bar{y})^2}}
$$

**Assumptions:**
1. Both variables are continuous (interval or ratio)
2. The relationship is **linear** — always check the scatter plot first
3. Bivariate normality (for significance testing)
4. Homoscedasticity — even spread across the range
5. No significant outliers
6. Independent observations

$r^2$ is the **coefficient of determination** — the proportion of variance in one variable explained by the other. An $r$ of 0.7 gives $r^2 = 0.49$, meaning 49% of the variance is shared.

<HindiBox>

Pearson's $r$ do continuous variables ke beech **linear** rishte ki strength measure karta hai.

$$
r = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum (x_i - \bar{x})^2 \sum (y_i - \bar{y})^2}}
$$

**Assumptions:**
1. Dono variables continuous (interval ya ratio)
2. Rishta **linear** ho — pehle scatter plot zaroor dekho
3. Bivariate normality (significance testing ke liye)
4. Homoscedasticity — poori range mein barabar phailav
5. Koi bade outliers nahi
6. Independent observations

$r^2$ ko **coefficient of determination** kehte hain — ek variable ka kitna variance dusre se explain hota hai. $r = 0.7$ par $r^2 = 0.49$, yani 49% variance shared hai.

**$r^2$ kyun zyada useful hai:** $r = 0.5$ sunne mein "aadha" lagta hai, lekin $r^2 = 0.25$ hai — yani sirf 25% variance explain hota hai. Ye zyada honest picture deta hai.

</HindiBox>

### 7.6.4 Spearman Correlation

Spearman's $\rho$ (rho) measures **monotonic** relationships by correlating the *ranks* of the data rather than the raw values.

$$
\rho = 1 - \frac{6 \sum d_i^2}{n(n^2 - 1)}
$$

where $d_i$ is the difference between the two ranks for observation $i$ (this simplified formula applies when there are no ties).

**Use Spearman when:**
- Data is **ordinal** (rankings, Likert scales)
- The relationship is monotonic but **not linear**
- Data is **not normally distributed**
- There are **outliers** (ranks limit their influence)
- Sample size is small

**Kendall's tau ($\tau$)** is an alternative — more robust and better for small samples with many tied ranks, though computationally heavier.

<HindiBox>

Spearman's $\rho$ (rho) **monotonic** rishte measure karta hai — raw values ki jagah unke *ranks* ka correlation nikaal kar.

$$
\rho = 1 - \frac{6 \sum d_i^2}{n(n^2 - 1)}
$$

Yahan $d_i$ har observation ke do ranks ka difference hai (ye simplified formula tab hai jab koi ties na hon).

**Spearman kab use karein:**
- Data **ordinal** ho (rankings, Likert scales)
- Rishta monotonic ho lekin **linear nahi**
- Data **normally distributed nahi** ho
- **Outliers** hon (ranks unka asar kam kar dete hain)
- Sample size chhota ho

**Kendall's tau ($\tau$)** ek alternative hai — zyada robust aur chhote samples mein behtar jahan bahut ties hon.

**Example:** Do judges ne 10 contestants ko rank kiya. Yahan actual scores nahi, sirf ranks matter karte hain → **Spearman**.

</HindiBox>

### 7.6.5 Correlation Coefficient

$$
-1 \leq r \leq +1
$$

| $|r|$ | Strength |
|---|---|
| 0.00 – 0.19 | Very weak / negligible |
| 0.20 – 0.39 | Weak |
| 0.40 – 0.59 | Moderate |
| 0.60 – 0.79 | Strong |
| 0.80 – 1.00 | Very strong |

**Important caveats:**
- These thresholds are **field-dependent**. In physics $r = 0.9$ may be disappointing; in psychology $r = 0.3$ can be a meaningful finding.
- Always report $r^2$ alongside $r$ — it shows the practical share of variance explained.
- **Always plot the data.** Anscombe's Quartet contains four datasets with identical $r = 0.816$ but completely different shapes — one linear, one curved, one dominated by a single outlier.

<HindiBox>

$$
-1 \leq r \leq +1
$$

| $|r|$ | Strength |
|---|---|
| 0.00 – 0.19 | Bahut weak |
| 0.20 – 0.39 | Weak |
| 0.40 – 0.59 | Moderate |
| 0.60 – 0.79 | Strong |
| 0.80 – 1.00 | Very strong |

**Zaroori baatein:**
- Ye thresholds **field ke hisaab se badalte hain**. Physics mein $r = 0.9$ nirash kar sakta hai; psychology mein $r = 0.3$ bhi meaningful hai.
- $r$ ke sath hamesha $r^2$ report karo — wo practical picture deta hai.
- **Data hamesha plot karo.** Anscombe's Quartet mein chaar datasets hain jinka $r = 0.816$ bilkul same hai lekin shapes ekdum alag — ek linear, ek curved, ek sirf ek outlier ki wajah se.

**Sabse zaroori sabak:** Sirf $r$ ka number dekh kar conclusion nikalna khatarnak hai. Scatter plot banao — 10 second lagenge, lekin galat conclusion se bach jaoge.

</HindiBox>

### 7.6.6 Statistical Significance

A correlation coefficient is a sample statistic, so we test whether it reflects a real population correlation $\rho$:

$$
H_0: \rho = 0 \qquad H_1: \rho \neq 0
$$

$$
t = \frac{r\sqrt{n-2}}{\sqrt{1-r^2}}, \qquad df = n - 2
$$

**Confidence interval** (via Fisher's z-transformation):

$$
z' = \frac{1}{2}\ln\!\left(\frac{1+r}{1-r}\right), \qquad SE_{z'} = \frac{1}{\sqrt{n-3}}
$$

**The sample-size trap:** significance depends heavily on $n$. With $n = 10$, $r = 0.6$ is not significant; with $n = 1000$, even $r = 0.07$ is significant ($p < .05$) despite explaining only 0.5% of the variance.

**Therefore:** significance answers "is it real?", effect size answers "does it matter?" — you need both.

<HindiBox>

Correlation coefficient ek sample statistic hai, isliye hum test karte hain ki ye asli population correlation $\rho$ ko darshata hai ya nahi:

$$
H_0: \rho = 0 \qquad H_1: \rho \neq 0
$$

$$
t = \frac{r\sqrt{n-2}}{\sqrt{1-r^2}}, \qquad df = n - 2
$$

**Sample-size ka jaal:** significance $n$ par bahut depend karti hai. $n = 10$ par $r = 0.6$ significant nahi hai; lekin $n = 1000$ par $r = 0.07$ bhi significant ho jaata hai ($p < .05$) — jabki wo sirf 0.5% variance explain karta hai!

**Isliye:** significance batati hai "kya ye asli hai?", effect size batati hai "kya isse farak padta hai?" — dono chahiye.

**Example:** Ek study mein 50,000 logon par $r = 0.03$ mila aur $p < 0.001$. Statistically significant — bilkul. Practically bekaar — bilkul. $r^2 = 0.0009$, yani 0.09% variance!

</HindiBox>

### 7.6.7 Correlation vs Causation

Correlation shows that two variables move together; causation means one *produces* a change in the other. Correlation is necessary but far from sufficient.

**Why correlation appears without causation:**

| Reason | Example |
|---|---|
| **Confounding** | Ice cream sales ↔ drowning (both caused by hot weather) |
| **Reverse causation** | Exercise ↔ health (which causes which?) |
| **Coincidence** | Spurious correlations found by testing many variables |
| **Selection bias** | The sample was chosen in a way that creates the pattern |
| **Bidirectional** | Stress ↔ poor sleep (each worsens the other) |

**Establishing causation requires:** temporal precedence (cause before effect), a plausible mechanism, consistency across studies, dose-response, elimination of alternatives, and ideally a **randomized controlled experiment**.

<HindiBox>

Correlation batata hai ki do variables saath badalte hain; causation ka matlab hai ek dusre mein change *paida* karta hai. Correlation zaroori hai lekin kaafi bilkul nahi.

**Bina causation ke correlation kyun dikhta hai:**

| Wajah | Example |
|---|---|
| **Confounding** | Ice cream sales ↔ doobna (dono garmi ki wajah se) |
| **Reverse causation** | Exercise ↔ health (kaun kiska cause hai?) |
| **Coincidence** | Bahut saare variables test karne par bane spurious correlations |
| **Selection bias** | Sample hi aise chuna gaya ki pattern ban gaya |
| **Bidirectional** | Stress ↔ kharab neend (dono ek dusre ko bigadte hain) |

**Causation sabit karne ke liye chahiye:** cause pehle aur effect baad mein, ek plausible mechanism, alag studies mein consistency, dose-response, dusre explanations ka khatma, aur ideally ek **randomized controlled experiment**.

**Mashhoor spurious correlation:** USA mein cheese consumption aur bedsheet mein ulajh kar marne walon ki sankhya ka correlation 0.95 hai! Ye sirf sanyog hai — koi rishta nahi.

**Golden rule:** *Correlation does not imply causation.*

</HindiBox>

### 7.6.8 Python Implementation

```python
import numpy as np
import pandas as pd
from scipy import stats
import matplotlib.pyplot as plt

hours = np.array([2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
marks = np.array([45, 52, 58, 63, 68, 72, 78, 82, 88, 91])

# ---- Step 1: ALWAYS plot first ----
plt.scatter(hours, marks)
plt.xlabel("Study Hours"); plt.ylabel("Marks")
plt.title("Check for linearity and outliers")
# plt.show()

# ---- Step 2: Check normality ----
print("Shapiro (hours):", stats.shapiro(hours))
print("Shapiro (marks):", stats.shapiro(marks))

# ---- Step 3: Pearson correlation ----
r, p = stats.pearsonr(hours, marks)
print(f"\nPearson : r={r:.4f}, p={p:.6f}, r^2={r**2:.4f}")

# ---- Step 4: Spearman (robust alternative) ----
rho, p_s = stats.spearmanr(hours, marks)
print(f"Spearman: rho={rho:.4f}, p={p_s:.6f}")

# ---- Step 5: Kendall's tau ----
tau, p_k = stats.kendalltau(hours, marks)
print(f"Kendall : tau={tau:.4f}, p={p_k:.6f}")

# ---- Step 6: Confidence interval (Fisher's z) ----
n = len(hours)
z = np.arctanh(r)
se = 1 / np.sqrt(n - 3)
lo, hi = np.tanh(z - 1.96*se), np.tanh(z + 1.96*se)
print(f"95% CI for r: [{lo:.4f}, {hi:.4f}]")

# ---- Step 7: Correlation matrix for many variables ----
df = pd.DataFrame({
    "hours": hours, "marks": marks,
    "attendance": [60,65,70,75,80,82,85,88,92,95]
})
print("\nPearson matrix:\n", df.corr())
print("\nSpearman matrix:\n", df.corr(method="spearman"))
```

<HindiBox>

**Teen correlation functions:**

| Function | Kab use karein |
|---|---|
| `pearsonr()` | Continuous data, linear rishta, normal distribution |
| `spearmanr()` | Ordinal data, non-linear monotonic, outliers hon |
| `kendalltau()` | Chhota sample, bahut ties |

**Workflow yaad rakho:**
1. **Pehle plot karo** — ye step kabhi mat chhodo
2. Normality check karo → Pearson ya Spearman decide karo
3. Correlation nikalo
4. $r$ ke sath $r^2$ aur CI bhi report karo

**Kai variables ek saath:** `df.corr()` poora correlation matrix de deta hai. Ise `seaborn.heatmap()` ke sath dikhane par pattern turant saaf ho jaata hai.

**⚠️ Sabse badi galti:** `pearsonr()` chala kar seedha conclusion nikaal lena bina scatter plot dekhe. Anscombe's Quartet yaad rakho — number kabhi poori kahani nahi batata.

</HindiBox>