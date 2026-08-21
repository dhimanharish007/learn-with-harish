---
id: chapter-5
title: Chapter 5 — Exploratory Data Analysis
description: Introduces exploratory data analysis, the relationships between variables, and a framework for choosing the appropriate statistical test.
sidebar_position: 1
---
## 5.1 🔍 Exploratory Data Analysis (EDA)
### 5.1.1 What is EDA?

Exploratory Data Analysis (EDA) is the process of investigating a dataset to understand its structure, spot patterns, detect anomalies, and check assumptions — mostly through summary statistics and visualizations — **before** applying formal modelling or hypothesis testing. The term was popularized by statistician John Tukey, who argued that you should let the data speak first, rather than arriving with a hypothesis and only looking for confirmation.

EDA is **iterative and open-ended**: you look, you ask a question, you look again.

<HindiBox>

Exploratory Data Analysis (EDA) wo process hai jisme hum dataset ko investigate karte hain — uski structure samajhne, patterns dhoondhne, anomalies pakadne aur assumptions check karne ke liye — mostly summary statistics aur visualizations ke through, aur ye sab formal modelling ya hypothesis testing se **pehle** hota hai. Ye term statistician John Tukey ne popular kiya tha, jinka kehna tha ki pehle data ko bolne do, apni hypothesis lekar sirf confirmation dhoondhne mat jao.

EDA **iterative aur open-ended** hai: dekho, sawaal poocho, phir dobara dekho.

**Example:** Ek nayi CSV file mili. Model banane se pehle aap dekhte hain — kitni rows-columns hain, kaunse columns mein missing values hain, salary column ka distribution kaisa hai, koi ajeeb value toh nahi (jaise age = 200). Yahi EDA hai.

</HindiBox>

### 5.1.2 Objectives of EDA

- **Understand the data:** size, structure, data types, and meaning of each variable
- **Assess data quality:** missing values, duplicates, inconsistencies, impossible values
- **Discover patterns and trends** that aren't obvious from raw numbers
- **Identify relationships** between variables
- **Detect outliers and anomalies**
- **Check assumptions** (normality, linearity, independence) required by later tests
- **Generate hypotheses** worth testing formally
- **Guide feature engineering** and model selection
- **Decide which statistical methods** are appropriate

<HindiBox>

- **Data ko samajhna:** size, structure, data types aur har variable ka matlab
- **Data quality check karna:** missing values, duplicates, inconsistencies, impossible values
- **Patterns aur trends dhoondhna** jo raw numbers mein nahi dikhte
- **Variables ke beech relationships** pehchanna
- **Outliers aur anomalies** detect karna
- **Assumptions check karna** (normality, linearity, independence) jo aage ke tests maangte hain
- **Hypotheses generate karna** jinhe formally test kiya ja sake
- **Feature engineering aur model selection** ke liye direction dena
- **Ye decide karna ki kaunse statistical methods** sahi rahenge

**Yaad rakho:** EDA ka maksad answer dena nahi, balki **sahi sawaal dhoondhna** hai.

</HindiBox>

### 5.1.3 Data Cleaning Before EDA

Raw data is almost never analysis-ready. Typical cleaning steps:

- **Remove duplicates** — the same record entered more than once
- **Handle missing values** — drop, impute, or flag them
- **Fix data types** — dates stored as text, numbers stored as strings
- **Standardize formats** — consistent units, date formats, capitalization
- **Correct inconsistent categories** — "Male", "male", "M" merged into one
- **Handle impossible values** — negative age, 200% percentage
- **Trim whitespace and fix typos** in text fields
- **Rename columns** to clear, consistent names

Cleaning and EDA are not strictly sequential — EDA often *reveals* problems that send you back to cleaning.

<HindiBox>

Raw data lagbhag kabhi bhi seedha analysis ke layak nahi hota. Typical cleaning steps:

- **Duplicates hatao** — ek hi record baar-baar
- **Missing values handle karo** — drop, impute, ya flag
- **Data types theek karo** — dates text mein, numbers string mein
- **Formats standardize karo** — same units, date format, capitalization
- **Inconsistent categories theek karo** — "Male", "male", "M" ko ek banao
- **Impossible values handle karo** — negative age, 200% percentage
- **Extra spaces aur typos** theek karo text fields mein
- **Columns ke naam** clear aur consistent karo

Cleaning aur EDA bilkul alag steps nahi hain — aksar EDA hi problems *dikhata* hai jinke liye wapas cleaning par jaana padta hai.

**Example:** Ek dataset mein City column mein "Delhi", "delhi", "New Delhi", "DELHI " (extra space ke sath) — ye chaar alag categories gini jaayengi, jabki hain ek hi. Analysis se pehle inhe merge karna zaroori hai.

</HindiBox>

### 5.1.4 Univariate Analysis

Univariate analysis examines **one variable at a time**, describing its distribution without looking at relationships.

**For numerical variables:**
- Statistics: mean, median, mode, range, variance, standard deviation, quartiles, skewness, kurtosis
- Plots: histogram, box plot, density plot, violin plot

**For categorical variables:**
- Statistics: frequency counts, relative frequencies (percentages), mode
- Plots: bar chart, pie chart, frequency table

Key questions: What is the typical value? How spread out is it? What shape is the distribution? Are there outliers?

<HindiBox>

Univariate analysis mein **ek time par sirf ek variable** dekha jaata hai — uski distribution describe ki jaati hai, relationships nahi.

**Numerical variables ke liye:**
- Statistics: mean, median, mode, range, variance, SD, quartiles, skewness, kurtosis
- Plots: histogram, box plot, density plot, violin plot

**Categorical variables ke liye:**
- Statistics: frequency counts, percentages, mode
- Plots: bar chart, pie chart, frequency table

Main sawaal: Typical value kya hai? Kitna faila hua hai? Distribution ki shape kaisi hai? Outliers hain kya?

**Example:** Sirf "Salary" column ka histogram banana aur uska mean, median nikalna — ye Univariate analysis hai. Yahan hum salary ko kisi aur variable se compare nahi kar rahe.

</HindiBox>

### 5.1.5 Bivariate Analysis

Bivariate analysis examines the relationship between **two variables**. The right method depends on the variable types:

| Variable pair | Methods | Plots |
|---|---|---|
| Numeric × Numeric | Correlation ($r$), covariance, simple regression | Scatter plot, line plot |
| Categorical × Numeric | Group means, t-test, ANOVA | Grouped box plot, bar chart |
| Categorical × Categorical | Cross-tabulation, Chi-square test | Stacked/grouped bar chart, heatmap |

Key questions: Is there a relationship? How strong is it? What direction? Is it linear?

<HindiBox>

Bivariate analysis mein **do variables** ke beech ka relationship dekha jaata hai. Sahi method variable types par depend karta hai:

| Variable pair | Methods | Plots |
|---|---|---|
| Numeric × Numeric | Correlation ($r$), covariance, regression | Scatter plot, line plot |
| Categorical × Numeric | Group means, t-test, ANOVA | Grouped box plot, bar chart |
| Categorical × Categorical | Cross-tabulation, Chi-square test | Stacked bar chart, heatmap |

Main sawaal: Koi relationship hai? Kitna strong? Kis direction mein? Linear hai ya nahi?

**Example:** "Padhai ke ghante" aur "Marks" ka scatter plot banakar correlation nikalna — ye Bivariate analysis hai. Ya "Gender" ke hisaab se "Average Salary" compare karna.

</HindiBox>

### 5.1.6 Multivariate Analysis

Multivariate analysis examines **three or more variables** simultaneously, revealing interactions and combined effects that pairwise analysis misses.

**Common techniques:**
- Correlation matrix and heatmap
- Multiple regression
- Principal Component Analysis (PCA) for dimensionality reduction
- Cluster analysis (K-means, hierarchical)
- Factor analysis

**Common plots:** pair plot (scatter matrix), correlation heatmap, 3D scatter, bubble chart, faceted plots, parallel coordinates.

<HindiBox>

Multivariate analysis mein **teen ya zyada variables** ek saath dekhe jaate hain, jisse wo interactions aur combined effects dikhte hain jo do-do karke dekhne mein chhoot jaate hain.

**Common techniques:**
- Correlation matrix aur heatmap
- Multiple regression
- Principal Component Analysis (PCA) — dimensions kam karne ke liye
- Cluster analysis (K-means, hierarchical)
- Factor analysis

**Common plots:** pair plot, correlation heatmap, 3D scatter, bubble chart, faceted plots.

**Example:** Ghar ki price sirf size par depend nahi karti — location, age, aur rooms sab milkar asar daalte hain. Multivariate analysis ye batata hai ki kis variable ka kitna contribution hai jab baaki sab constant ho.

</HindiBox>

### 5.1.7 Outliers

An outlier is an observation that lies far away from the rest of the data. It may be a genuine extreme value, or an error.

**Detection methods:**

*IQR method* — flag any value outside:

$$
[\,Q_1 - 1.5 \times IQR,\;\; Q_3 + 1.5 \times IQR\,]
$$

*Z-score method* — flag values where:

$$
|z| = \left|\frac{x - \bar{x}}{s}\right| > 3
$$

Also: box plots, scatter plots, and model-based methods (Isolation Forest, DBSCAN).

**Handling:** first *investigate* — is it a data-entry error, a measurement fault, or a real phenomenon? Only then decide to correct it, remove it, cap it (winsorize), transform the variable, or keep it and use robust methods.

<HindiBox>

Outlier wo observation hai jo baaki data se bahut door hoti hai. Ye ek asli extreme value bhi ho sakti hai, ya ek error bhi.

**Detection methods:**

*IQR method* — is range se bahar ki har value flag karo:

$$
[\,Q_1 - 1.5 \times IQR,\;\; Q_3 + 1.5 \times IQR\,]
$$

*Z-score method* — jab $|z| > 3$ ho:

$$
z = \frac{x - \bar{x}}{s}
$$

Iske alawa box plots, scatter plots, aur model-based methods (Isolation Forest, DBSCAN).

**Handling:** pehle *investigate* karo — kya ye data-entry error hai, measurement fault hai, ya sach mein aisa hua hai? Uske baad hi decide karo: correct karo, hatao, cap karo (winsorize), transform karo, ya rakh kar robust methods use karo.

**Example:** Salary data mein ₹5 crore ki entry — agar ye CEO ki asli salary hai toh ye **valid outlier** hai (hatana galat hoga). Lekin agar kisi ne galti se extra zero laga diya (₹50,000 ki jagah ₹5,00,000) toh ye **error** hai. Bina jaanche outlier hatana khatarnak hai.

</HindiBox>

### 5.1.8 Missing Values

**Types (why data is missing):**
- **MCAR** (Missing Completely At Random) — missingness unrelated to anything; safest case
- **MAR** (Missing At Random) — missingness depends on *other observed* variables
- **MNAR** (Missing Not At Random) — missingness depends on the *missing value itself*; most problematic

**Handling strategies:**
- **Deletion:** listwise (drop rows) or column-wise (drop variables) — simple, but loses information
- **Imputation:** mean/median/mode, forward-fill, regression, KNN, or multiple imputation
- **Flag and fill:** add an indicator column marking what was missing
- **Model-based:** use algorithms that handle missingness natively (e.g. XGBoost)

Rule of thumb: less than 5% missing → deletion is usually fine; more than 40% missing → consider dropping the variable entirely.

<HindiBox>

**Types (data missing kyun hai):**
- **MCAR** (Missing Completely At Random) — missingness ka kisi se koi lena-dena nahi; sabse safe case
- **MAR** (Missing At Random) — missingness *dusre observed* variables par depend karti hai
- **MNAR** (Missing Not At Random) — missingness *us missing value par hi* depend karti hai; sabse problematic

**Handling strategies:**
- **Deletion:** rows hatao ya poora column hatao — simple, lekin information ka nuksan
- **Imputation:** mean/median/mode, forward-fill, regression, KNN, multiple imputation
- **Flag and fill:** ek indicator column banao jo bataye kya missing tha
- **Model-based:** aise algorithms use karo jo missing values khud handle karte hain (jaise XGBoost)

Rule of thumb: 5% se kam missing → deletion theek hai; 40% se zyada → poora variable hatane par sochо.

**Example (MNAR):** Survey mein bahut ameer log apni income batane se mana kar dete hain. Yahan missing hona hi income se juda hua hai — isliye average se fill karna poore analysis ko galat kar dega.

</HindiBox>

### 5.1.9 Distribution Analysis

Understanding a variable's distribution determines which statistical methods are valid.

**What to check:**
- **Shape:** symmetric, right-skewed, left-skewed, bimodal, uniform
- **Center and spread:** mean/median, standard deviation/IQR
- **Normality:** Q-Q plot, histogram, Shapiro-Wilk test, Kolmogorov-Smirnov test
- **Tails:** kurtosis, presence of extreme values

**Common transformations for skewed data:** $\log(x)$, $\sqrt{x}$, $\dfrac{1}{x}$, or Box-Cox — these can make skewed data approximately normal so parametric tests become valid.

<HindiBox>

Kisi variable ki distribution samajhna ye decide karta hai ki kaunse statistical methods valid hain.

**Kya check karna hai:**
- **Shape:** symmetric, right-skewed, left-skewed, bimodal, uniform
- **Center aur spread:** mean/median, SD/IQR
- **Normality:** Q-Q plot, histogram, Shapiro-Wilk test, K-S test
- **Tails:** kurtosis, extreme values

**Skewed data ke liye common transformations:** $\log(x)$, $\sqrt{x}$, $\dfrac{1}{x}$, ya Box-Cox — inse skewed data lagbhag normal ban jaata hai aur parametric tests valid ho jaate hain.

**Example:** Income data hamesha right-skewed hota hai. $\log(\text{income})$ lene par wo lagbhag normal ban jaata hai — isi liye economics mein aksar "log income" use kiya jaata hai.

</HindiBox>

### 5.1.10 Summary Statistics

Summary statistics condense a dataset into a few key numbers. A standard summary (e.g. pandas `.describe()`) reports:

| Statistic | Meaning |
|---|---|
| count | Number of non-missing values |
| mean | Arithmetic average |
| std | Standard deviation |
| min / max | Smallest and largest values |
| 25% / 50% / 75% | $Q_1$, median, $Q_3$ |

**Important caveat:** summary statistics alone can hide dramatically different data. **Anscombe's Quartet** — four datasets with nearly identical means, variances, and correlations but completely different shapes — is the classic demonstration of why you must *always* plot your data too.

<HindiBox>

Summary statistics dataset ko kuch key numbers mein compress kar deti hain. Ek standard summary (jaise pandas `.describe()`) ye deta hai:

| Statistic | Matlab |
|---|---|
| count | Non-missing values ki sankhya |
| mean | Arithmetic average |
| std | Standard deviation |
| min / max | Sabse chhoti aur sabse badi value |
| 25% / 50% / 75% | $Q_1$, median, $Q_3$ |

**Important caveat:** sirf summary statistics dekh kar dhoka ho sakta hai. **Anscombe's Quartet** — chaar datasets jinke mean, variance aur correlation lagbhag same hain lekin shapes bilkul alag — yahi sabit karta hai ki data ko **plot karna hamesha zaroori hai**.

**Example:** Do datasets ka mean 50 aur SD 10 same ho sakta hai, lekin ek normal distribution ho aur dusra bimodal (do peaks wala). Sirf numbers dekh kar ye kabhi pata nahi chalega — graph banane par turant dikh jayega.

</HindiBox>

## 5.2 🔗 Variables and Relationships

### 5.2.1 Independent Variables

An independent variable is the one that is **manipulated, controlled, or assumed to be the cause** in a study. It stands on its own and is not affected by the other variables being measured. In an experiment, it is what the researcher deliberately changes.

Also called: predictor, explanatory variable, feature, input, regressor, $X$.

<HindiBox>

Independent variable wo hai jise study mein **manipulate, control ya cause maana jaata hai**. Ye apne aap mein khada hota hai aur baaki measure kiye ja rahe variables se affect nahi hota. Experiment mein ye wahi cheez hai jise researcher jaan-boojh kar badalta hai.

Iske dusre naam: predictor, explanatory variable, feature, input, regressor, $X$.

**Example:** "Padhai ke ghante ka marks par kya asar hai?" — yahan **padhai ke ghante** independent variable hai, kyunki hum use badal kar dekhte hain ki kya hota hai.

</HindiBox>

### 5.2.2 Dependent Variables

A dependent variable is the **outcome being measured** — it "depends on" the independent variable. It is the effect, not the cause.

Also called: response, outcome, target, label, $Y$.

In the relationship $Y = f(X)$, $Y$ is dependent and $X$ is independent.

<HindiBox>

Dependent variable wo **outcome hai jise measure kiya jaata hai** — ye independent variable par "depend" karta hai. Ye effect hai, cause nahi.

Iske dusre naam: response, outcome, target, label, $Y$.

$Y = f(X)$ mein $Y$ dependent hai aur $X$ independent.

**Example:** Usi study mein **marks** dependent variable hain — kyunki hum dekh rahe hain ki padhai ke ghante badalne se marks par kya asar padta hai.

**Yaad rakhne ka tarika:** Independent = jo aap **badalte** ho. Dependent = jo aap **naapte** ho.

</HindiBox>

### 5.2.3 Predictor Variables

"Predictor variable" is the term used in **modelling and prediction** contexts (regression, machine learning) for the inputs used to predict an outcome. Practically it is the same as an independent variable, but with a subtle difference in intent:

- **Independent variable** implies a *causal* or experimental role
- **Predictor variable** implies only *predictive usefulness* — it may predict well without causing anything

In ML these are usually called **features**, and multiple predictors are written $X_1, X_2, \ldots, X_p$.

<HindiBox>

"Predictor variable" wo term hai jo **modelling aur prediction** ke context mein use hoti hai (regression, machine learning) — un inputs ke liye jinse outcome predict kiya jaata hai. Practically ye independent variable jaisa hi hai, bas intent mein farak hai:

- **Independent variable** ek *causal* ya experimental role batata hai
- **Predictor variable** sirf *predictive usefulness* batata hai — ye achha predict kar sakta hai bina koi cause bane

ML mein inhe **features** kehte hain, aur multiple predictors ko $X_1, X_2, \ldots, X_p$ likhte hain.

**Example:** Ice cream ki sales, doobne ki ghatnaon ki achhi **predictor** hai (dono garmi mein badhte hain) — lekin ice cream doobne ka **cause** bilkul nahi hai. Predictor hona aur cause hona alag baat hai.

</HindiBox>

### 5.2.4 Response Variables

"Response variable" is the modelling-context term for the dependent variable — the quantity the model is built to explain or predict. Its type determines the modelling approach:

- **Continuous response** → regression (e.g. Linear Regression)
- **Binary response** → binary classification (e.g. Logistic Regression)
- **Multi-class response** → multi-class classification
- **Count response** → Poisson regression
- **Time-to-event response** → survival analysis

<HindiBox>

"Response variable" modelling ke context mein dependent variable ka naam hai — wo quantity jise model explain ya predict karne ke liye banaya jaata hai. Iska type modelling approach decide karta hai:

- **Continuous response** → regression (jaise Linear Regression)
- **Binary response** → binary classification (jaise Logistic Regression)
- **Multi-class response** → multi-class classification
- **Count response** → Poisson regression
- **Time-to-event response** → survival analysis

**Example:** "Ghar ki price" predict karni ho (continuous) → Linear Regression. "Customer chhodega ya nahi" (binary) → Logistic Regression. Response ka type hi model chunta hai.

</HindiBox>

### 5.2.5 Confounding Variables

A confounding variable is a **third variable** that influences both the independent and dependent variables, creating a spurious association between them. Confounders are the single biggest reason correlation gets mistaken for causation.

To qualify as a confounder, a variable must:
1. Be associated with the independent variable
2. Independently affect the dependent variable
3. Not lie on the causal path between them (that would be a *mediator*)

**How to control for confounders:** randomization (the gold standard), restriction, matching, stratification, or statistical adjustment (multiple regression, ANCOVA, propensity scores).

<HindiBox>

Confounding variable ek **teesra variable** hai jo independent aur dependent dono ko affect karta hai, aur unke beech ek jhootha (spurious) rishta bana deta hai. Correlation ko causation samajh lene ki sabse badi wajah yahi hoti hai.

Confounder banne ke liye variable ko:
1. Independent variable se associated hona chahiye
2. Dependent variable ko alag se affect karna chahiye
3. Unke beech ke causal path par nahi hona chahiye (warna wo *mediator* kehlata hai)

**Control kaise karein:** randomization (best tarika), restriction, matching, stratification, ya statistical adjustment (multiple regression, ANCOVA, propensity scores).

**Example:** Data dikhata hai ki jo log zyada coffee peete hain unhe heart disease zyada hoti hai. Lekin asli wajah **smoking** ho sakti hai — coffee peene wale aksar smoke bhi karte hain, aur smoking hi heart disease ka cause hai. Yahan **smoking = confounder**.

</HindiBox>

### 5.2.6 Correlation vs Causation

**Correlation** means two variables move together in a predictable way. **Causation** means one variable actually *produces* a change in the other. Correlation is necessary but far from sufficient for causation.

**Why correlation appears without causation:**
- **Confounding:** a hidden third variable drives both
- **Reverse causation:** $Y$ actually causes $X$, not the other way round
- **Coincidence:** pure chance, especially when testing many variables (spurious correlation)
- **Selection bias:** the sample was chosen in a way that creates the pattern

**Establishing causation requires** (Bradford Hill-style criteria): temporal precedence (cause before effect), a plausible mechanism, consistency across studies, dose-response relationship, and — most powerfully — a **randomized controlled experiment**.

<HindiBox>

**Correlation** ka matlab hai do variables ek predictable tarike se saath badalte hain. **Causation** ka matlab hai ek variable sach mein dusre mein change *paida* karta hai. Correlation zaroori hai lekin causation ke liye kaafi bilkul nahi.

**Bina causation ke correlation kyun dikhta hai:**
- **Confounding:** koi chhupa hua teesra variable dono ko chala raha hai
- **Reverse causation:** asal mein $Y$, $X$ ka cause hai — ulta
- **Coincidence:** sirf sanyog, khaas kar jab bahut saare variables test kiye jaayein
- **Selection bias:** sample hi aise chuna gaya ki pattern ban gaya

**Causation sabit karne ke liye chahiye:** cause pehle aur effect baad mein, ek plausible mechanism, alag-alag studies mein consistency, dose-response relationship, aur sabse strong — ek **randomized controlled experiment**.

**Example:** Garmi mein ice cream ki sales bhi badhti hai aur doobne ki ghatnaayein bhi. Correlation strong hai, lekin ice cream doobne ka cause nahi — asli cause **garam mausam** hai (log swimming karne jaate hain).

**Golden rule:** *Correlation does not imply causation* — lekin causation hamesha correlation dikhata hai.

</HindiBox>

### 5.2.7 Relationships Between Variables

**By direction:**
- **Positive:** both increase together ($r > 0$)
- **Negative:** one increases as the other decreases ($r < 0$)
- **No relationship:** $r \approx 0$

**By form:**
- **Linear:** a straight-line pattern
- **Non-linear:** curved — quadratic, exponential, logarithmic
- **Monotonic:** consistently increasing or decreasing, but not necessarily straight

**By strength (Pearson's $r$):**

$$
r = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum (x_i - \bar{x})^2 \sum (y_i - \bar{y})^2}}
$$

where $-1 \leq r \leq +1$. Rough interpretation: $|r| < 0.3$ weak, $0.3$–$0.7$ moderate, $> 0.7$ strong.

**Which correlation to use:** Pearson for linear relationships between continuous variables; **Spearman** for monotonic or ordinal data; **Kendall's tau** for small samples with many ties.

<HindiBox>

**Direction ke hisaab se:**
- **Positive:** dono saath badhte hain ($r > 0$)
- **Negative:** ek badhta hai toh dusra ghatta hai ($r < 0$)
- **No relationship:** $r \approx 0$

**Form ke hisaab se:**
- **Linear:** seedhi line jaisa pattern
- **Non-linear:** curved — quadratic, exponential, logarithmic
- **Monotonic:** lagatar badhta ya ghatta, lekin zaroori nahi ki seedha ho

**Strength (Pearson's $r$):**

$$
r = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum (x_i - \bar{x})^2 \sum (y_i - \bar{y})^2}}
$$

Yahan $-1 \leq r \leq +1$. Mota-moti matlab: $|r| < 0.3$ weak, $0.3$–$0.7$ moderate, $> 0.7$ strong.

**Kaunsa correlation use karein:** continuous variables ke linear relationship ke liye **Pearson**; monotonic ya ordinal data ke liye **Spearman**; chhote samples aur bahut saare ties ke liye **Kendall's tau**.

**Zaroori warning:** $r = 0$ ka matlab "koi relationship nahi" **nahi** hai — iska matlab sirf "koi *linear* relationship nahi" hai. Ek perfect U-shape curve ka bhi $r \approx 0$ aa sakta hai! Isi liye scatter plot dekhna zaroori hai.

</HindiBox>

## 5.3 🧭 Choosing the Right Statistical Method

### 5.3.1 How to Choose a Statistical Test?

Choosing a test is a systematic process, not guesswork. Work through these questions in order:

1. **What is your research question?** Comparing groups, testing association, or predicting an outcome?
2. **What type are your variables?** Categorical (nominal/ordinal) or numerical (interval/ratio)?
3. **How many variables and groups** are involved?
4. **Are the groups independent or paired?** (different subjects vs the same subjects measured twice)
5. **Is the data approximately normally distributed?** → parametric vs non-parametric
6. **Is the sample size adequate?** Small samples restrict your options
7. **Are the test's assumptions met?** (normality, equal variances, independence)

Getting this wrong is one of the most common errors in applied statistics — a technically correct calculation on the wrong test still gives a meaningless answer.

<HindiBox>

Test chunna ek systematic process hai, guess-work nahi. In sawaalon ko order mein poocho:

1. **Aapka research question kya hai?** Groups compare karne hain, association test karni hai, ya outcome predict karna hai?
2. **Variables kis type ke hain?** Categorical (nominal/ordinal) ya numerical (interval/ratio)?
3. **Kitne variables aur kitne groups** shamil hain?
4. **Groups independent hain ya paired?** (alag log vs ek hi log do baar naape gaye)
5. **Data lagbhag normally distributed hai?** → parametric vs non-parametric
6. **Sample size kaafi hai?** Chhote samples mein options kam ho jaate hain
7. **Test ki assumptions poori ho rahi hain?** (normality, equal variances, independence)

Ye galat karna applied statistics ki sabse common galtiyon mein se ek hai — galat test par bilkul sahi calculation bhi bekaar answer hi deti hai.

</HindiBox>

### 5.3.2 The Six Deciding Factors

**1. Type of Variable**
Nominal → Chi-square, mode. Ordinal → non-parametric tests, Spearman. Interval/Ratio → t-test, ANOVA, Pearson, regression.

**2. Number of Groups**
One group → one-sample t-test. Two groups → t-test. Three or more → ANOVA. (Never run multiple t-tests instead of ANOVA — it inflates the Type I error rate.)

**3. Distribution**
Normal → **parametric** tests (more powerful). Non-normal → **non-parametric** tests (distribution-free, based on ranks).

| Parametric | Non-parametric equivalent |
|---|---|
| Independent t-test | Mann-Whitney U test |
| Paired t-test | Wilcoxon signed-rank test |
| One-way ANOVA | Kruskal-Wallis test |
| Repeated-measures ANOVA | Friedman test |
| Pearson correlation | Spearman correlation |

**4. Sample Size**
$n < 30$ → check normality carefully; prefer non-parametric if in doubt. $n \geq 30$ → the Central Limit Theorem makes parametric tests reasonably robust.

**5. Independence**
Independent samples (different subjects) → independent t-test, one-way ANOVA. Paired/related samples (same subjects) → paired t-test, repeated-measures ANOVA.

**6. Measurement Scale**
The scale sets a hard ceiling on which operations are meaningful — you cannot compute a mean on nominal data no matter how the numbers are coded.

<HindiBox>

**1. Variable ka Type**
Nominal → Chi-square, mode. Ordinal → non-parametric tests, Spearman. Interval/Ratio → t-test, ANOVA, Pearson, regression.

**2. Groups ki Sankhya**
Ek group → one-sample t-test. Do groups → t-test. Teen ya zyada → ANOVA. (ANOVA ki jagah baar-baar t-test kabhi mat karo — isse Type I error badh jaata hai.)

**3. Distribution**
Normal → **parametric** tests (zyada powerful). Non-normal → **non-parametric** tests (ranks par based).

| Parametric | Non-parametric equivalent |
|---|---|
| Independent t-test | Mann-Whitney U test |
| Paired t-test | Wilcoxon signed-rank test |
| One-way ANOVA | Kruskal-Wallis test |
| Repeated-measures ANOVA | Friedman test |
| Pearson correlation | Spearman correlation |

**4. Sample Size**
$n < 30$ → normality dhyan se check karo; doubt ho toh non-parametric behtar. $n \geq 30$ → CLT ki wajah se parametric tests kaafi robust ho jaate hain.

**5. Independence**
Independent samples (alag log) → independent t-test, one-way ANOVA. Paired samples (ek hi log) → paired t-test, repeated-measures ANOVA.

**6. Measurement Scale**
Scale hi decide karta hai ki kaunsi operations meaningful hain — nominal data par mean nikalna kabhi sahi nahi, chahe numbers kaise bhi code kiye gaye hon.

**Example (Independent vs Paired):** Do alag classes ke marks compare karna → **Independent t-test**. Ek hi class ke students ke coaching se pehle aur baad ke marks → **Paired t-test**.

</HindiBox>

### 5.3.3 Statistical Test Decision Tree

Work down the tree, answering one question at a time:

```
START: What is your goal?
│
├─ COMPARE GROUPS
│  │
│  ├─ Outcome is NUMERICAL
│  │  ├─ 1 group vs known value ──────── One-sample t-test
│  │  ├─ 2 groups
│  │  │  ├─ Independent ──── normal? → Independent t-test
│  │  │  │                └─ not normal? → Mann-Whitney U
│  │  │  └─ Paired ─────── normal? → Paired t-test
│  │  │                    └─ not normal? → Wilcoxon signed-rank
│  │  └─ 3+ groups
│  │     ├─ Independent ── normal? → One-way ANOVA
│  │     │                 └─ not normal? → Kruskal-Wallis
│  │     └─ Repeated ───── normal? → Repeated-measures ANOVA
│  │                       └─ not normal? → Friedman test
│  │
│  └─ Outcome is CATEGORICAL
│     ├─ Independent groups ────────── Chi-square test of independence
│     │  └─ small expected counts (<5) → Fisher's exact test
│     └─ Paired groups ─────────────── McNemar's test
│
├─ TEST ASSOCIATION between two variables
│  ├─ Both numerical ── linear & normal? → Pearson correlation
│  │                    └─ monotonic/ordinal? → Spearman correlation
│  └─ Both categorical ───────────────── Chi-square test
│
└─ PREDICT an outcome
   ├─ Outcome numerical ──────────────── Linear regression
   ├─ Outcome binary ─────────────────── Logistic regression
   ├─ Outcome multi-class ────────────── Multinomial logistic regression
   ├─ Outcome count ──────────────────── Poisson regression
   └─ Outcome time-to-event ──────────── Cox / survival analysis
```

<HindiBox>

Tree ko upar se neeche follow karo, ek time par ek sawaal ka jawab dete hue:

**Step 1 — Aapka goal kya hai?** Groups compare karne hain / association test karni hai / prediction karni hai

**Step 2 — Outcome variable numerical hai ya categorical?**

**Step 3 — Kitne groups hain?** (1, 2, ya 3+)

**Step 4 — Groups independent hain ya paired?**

**Step 5 — Data normal hai?** Haan → parametric, Nahi → non-parametric

**Sabse zaroori shortcut yaad rakho:**

| Situation | Test |
|---|---|
| 2 categorical variables | Chi-square |
| 2 independent groups, numeric outcome | Independent t-test |
| Ek hi group, pehle-baad mein | Paired t-test |
| 3+ groups | ANOVA |
| 2 continuous variables ka rishta | Correlation |
| Outcome predict karna | Regression |

</HindiBox>

### 5.3.4 Worked Examples

| Scenario | Variables | Test | Why |
|---|---|---|---|
| Is gender related to product preference? | 2 categorical | **Chi-square** | Both nominal; testing association in a contingency table |
| Do men and women have different average salaries? | 1 categorical (2 groups) + 1 numeric | **Independent t-test** | Comparing means of two separate, unrelated groups |
| Did a training program improve scores? | Same people, before & after | **Paired t-test** | The two measurements come from the same subjects |
| Do four teaching methods differ in results? | 1 categorical (4 groups) + 1 numeric | **One-way ANOVA** | More than two independent groups |
| Are study hours related to marks? | 2 numeric | **Pearson correlation** | Both continuous; measuring linear association |
| Can we predict house price from size and location? | Multiple predictors, numeric outcome | **Multiple regression** | Predicting a continuous outcome |
| Will a customer churn or not? | Multiple predictors, binary outcome | **Logistic regression** | Binary response variable |

<HindiBox>

| Sawaal | Variables | Test | Kyun |
|---|---|---|---|
| Kya gender aur product preference mein rishta hai? | 2 categorical | **Chi-square** | Dono nominal; association test karni hai |
| Kya mard aur auraton ki average salary alag hai? | 1 categorical (2 groups) + 1 numeric | **Independent t-test** | Do alag, unrelated groups ke means compare |
| Kya training se scores behtar hue? | Ek hi log, pehle aur baad | **Paired t-test** | Dono measurements ek hi logon se |
| Kya chaar teaching methods ke results alag hain? | 1 categorical (4 groups) + 1 numeric | **One-way ANOVA** | Do se zyada independent groups |
| Kya padhai ke ghante aur marks mein rishta hai? | 2 numeric | **Pearson correlation** | Dono continuous; linear association |
| Size aur location se ghar ki price predict karni hai | Multiple predictors, numeric outcome | **Multiple regression** | Continuous outcome predict karna |
| Customer chhodega ya nahi? | Multiple predictors, binary outcome | **Logistic regression** | Binary response variable |

**Sabse important tip:** Test chunne se pehle hamesha **do sawaal** poocho —
1. Mera **outcome variable** numerical hai ya categorical?
2. Mere groups **independent** hain ya **paired**?

In do sawaalon ka jawab hi 80% cases mein sahi test tak pahuncha deta hai.

</HindiBox>