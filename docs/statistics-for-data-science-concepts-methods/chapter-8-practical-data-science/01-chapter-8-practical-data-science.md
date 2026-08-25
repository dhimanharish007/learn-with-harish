---
id: chapter-8
title: Chapter 8 — Practical Data Science with Statistics
description: Applies statistics in Python, walking through descriptive statistics, visualization, statistical testing, and end-to-end case studies.
sidebar_position: 1
---
## 8.1 🐍 Statistics with Python
### 8.1.1 Python for Statistics

Python has become the default language for statistical analysis in data science — not because it's the most statistically sophisticated (R still holds that title), but because it combines statistics, data manipulation, machine learning, and production deployment in one ecosystem.

**The core stack:**

| Library | Role |
|---|---|
| **NumPy** | Fast numerical arrays and math operations |
| **Pandas** | Loading, cleaning, and manipulating tabular data |
| **SciPy** | Statistical tests and distributions |
| **Statsmodels** | Regression, ANOVA, full statistical output tables |
| **Matplotlib** | Base plotting engine |
| **Seaborn** | Statistical visualizations with less code |
| **Pingouin** | Modern, convenient statistical tests with effect sizes |

**Installation:**

```bash
pip install numpy pandas scipy statsmodels matplotlib seaborn pingouin
```

<HindiBox>

Python data science mein statistical analysis ki default bhasha ban chuka hai — isliye nahi ki ye statistically sabse advanced hai (wo tag ab bhi R ke paas hai), balki isliye ki ye statistics, data handling, machine learning aur production deployment — sab ek hi jagah de deta hai.

**Core stack:**

| Library | Kaam |
|---|---|
| **NumPy** | Tez numerical arrays aur math |
| **Pandas** | Data load, clean aur manipulate karna |
| **SciPy** | Statistical tests aur distributions |
| **Statsmodels** | Regression, ANOVA, poori statistical tables |
| **Matplotlib** | Base plotting engine |
| **Seaborn** | Kam code mein statistical visualizations |
| **Pingouin** | Modern tests, effect sizes ke sath |

**SciPy vs Statsmodels — kaunsa kab?**
- Jaldi ek test chalana hai → **SciPy**
- Poori report chahiye (SS, df, MS, F, $R^2$) → **Statsmodels**

</HindiBox>

### 8.1.2 NumPy

NumPy provides the fast array structure on which the entire Python data stack is built.

```python
import numpy as np

data = np.array([23, 45, 12, 67, 34, 89, 21, 56, 78, 43])

# Central tendency
print("Mean   :", np.mean(data))
print("Median :", np.median(data))

# Dispersion — note ddof!
print("Population SD :", np.std(data, ddof=0))
print("Sample SD     :", np.std(data, ddof=1))
print("Variance      :", np.var(data, ddof=1))

# Position
print("Range      :", np.ptp(data))
print("Quartiles  :", np.percentile(data, [25, 50, 75]))
print("IQR        :", np.percentile(data, 75) - np.percentile(data, 25))

# Handling missing values
data_nan = np.array([23, 45, np.nan, 67, 34])
print("Mean ignoring NaN:", np.nanmean(data_nan))

# Reproducible random data
rng = np.random.default_rng(seed=42)
normal_sample = rng.normal(loc=100, scale=15, size=1000)
```

<HindiBox>

NumPy wo tez array structure deta hai jis par poora Python data stack khada hai.

**Sabse zaroori parameter — `ddof`:**

| Code | Kya nikalta hai |
|---|---|
| `np.std(data)` | **Population** SD (divide by $N$) |
| `np.std(data, ddof=1)` | **Sample** SD (divide by $n-1$) |

⚠️ **Ye sabse common galti hai!** NumPy ka default `ddof=0` hai, yani population SD. Lekin practically aapke paas hamesha sample hota hai — isliye `ddof=1` likhna zaroori hai. Pandas ka default ulta hai (`ddof=1`), isliye dono ke answers alag aate hain.

**Missing values:** normal functions NaN dekh kar NaN hi return karte hain. Isliye `np.nanmean()`, `np.nanstd()` use karo.

**Random data:** `default_rng(seed=42)` use karo — isse har baar same result aayega, jo debugging aur teaching dono ke liye zaroori hai.

</HindiBox>

### 8.1.3 Pandas

Pandas is the workhorse for loading, cleaning, and exploring real datasets.

```python
import pandas as pd

df = pd.DataFrame({
    "student": ["A", "B", "C", "D", "E", "F"],
    "gender":  ["M", "F", "M", "F", "M", "F"],
    "hours":   [2, 5, 3, 8, 4, 7],
    "marks":   [45, 72, 55, 88, 61, 82]
})

# ---- Inspect ----
df.head()
df.info()          # dtypes + non-null counts
df.shape           # (rows, columns)

# ---- Summarize ----
df.describe()                    # numeric columns
df.describe(include="all")       # all columns
df["gender"].value_counts()

# ---- Individual statistics ----
df["marks"].mean()
df["marks"].std()      # ddof=1 by default (sample SD)
df["marks"].skew()
df["marks"].kurt()

# ---- Group comparisons ----
df.groupby("gender")["marks"].agg(["count", "mean", "std", "median"])

# ---- Missing data ----
df.isnull().sum()
df["marks"].fillna(df["marks"].median())
df.dropna(subset=["marks"])

# ---- Correlation matrix ----
df[["hours", "marks"]].corr()
```

<HindiBox>

Pandas asli datasets load, clean aur explore karne ka main tool hai.

**Sabse zyada use hone wale commands:**

| Command | Kya karta hai |
|---|---|
| `df.head()` | Pehli 5 rows dikhata hai |
| `df.info()` | Data types aur missing values ka summary |
| `df.describe()` | Poora statistical summary ek line mein |
| `df.groupby()` | Groups ke hisaab se comparison |
| `df.isnull().sum()` | Har column mein kitne missing hain |

**⚠️ NumPy vs Pandas ka farak:**
- `np.std(data)` → population SD (ddof=0)
- `df["col"].std()` → **sample SD** (ddof=1)

Isliye ek hi data par dono se alag answer aata hai! Ye interview ka favourite sawaal hai.

**Workflow tip:** Naya dataset milte hi ye teen commands chalao — `df.shape`, `df.info()`, `df.describe()`. 30 second mein poora andaza lag jaayega.

</HindiBox>

### 8.1.4 SciPy

`scipy.stats` contains the statistical tests and probability distributions.

```python
from scipy import stats
import numpy as np

group_a = np.array([78, 82, 75, 88, 79, 85, 77, 81])
group_b = np.array([70, 74, 68, 77, 72, 71, 69, 75])

# ---- Assumption checks ----
stats.shapiro(group_a)              # normality
stats.levene(group_a, group_b)      # equal variances

# ---- Comparing means ----
stats.ttest_1samp(group_a, popmean=75)
stats.ttest_ind(group_a, group_b, equal_var=False)   # Welch's
stats.ttest_rel(group_a, group_b)                     # paired
stats.f_oneway(group_a, group_b)                      # ANOVA

# ---- Non-parametric alternatives ----
stats.mannwhitneyu(group_a, group_b)
stats.wilcoxon(group_a, group_b)
stats.kruskal(group_a, group_b)

# ---- Correlation ----
stats.pearsonr(group_a, group_b)
stats.spearmanr(group_a, group_b)

# ---- Categorical ----
observed = np.array([[30, 45], [40, 25]])
stats.chi2_contingency(observed)

# ---- Distributions ----
stats.norm.cdf(1.96)              # 0.975
stats.norm.ppf(0.975)             # 1.96 (critical value)
stats.t.ppf(0.975, df=20)         # t critical value
```

<HindiBox>

`scipy.stats` mein saare statistical tests aur probability distributions hain.

**Tests ka map — parametric ↔ non-parametric:**

| Parametric | Non-parametric |
|---|---|
| `ttest_ind()` | `mannwhitneyu()` |
| `ttest_rel()` | `wilcoxon()` |
| `f_oneway()` | `kruskal()` |
| `pearsonr()` | `spearmanr()` |

**Distributions ke do main functions:**
- `.cdf(x)` → "is value tak kitni probability hai?"
- `.ppf(p)` → "is probability ke liye critical value kya hai?"

Ye dono ek dusre ke ulta hain. `norm.ppf(0.975) = 1.96` — wahi famous number jo 95% confidence interval mein aata hai.

**Yaad rakho:** `equal_var=False` set karna — isse Welch's test chalta hai jo safer default hai.

</HindiBox>

### 8.1.5 Matplotlib

Matplotlib is the base plotting library — verbose, but gives complete control.

```python
import matplotlib.pyplot as plt
import numpy as np

data = np.random.default_rng(42).normal(70, 10, 200)

fig, axes = plt.subplots(2, 2, figsize=(11, 8))

# Histogram
axes[0,0].hist(data, bins=20, color="#8a4fff", edgecolor="white")
axes[0,0].axvline(data.mean(), color="red", linestyle="--", label="Mean")
axes[0,0].set_title("Histogram")
axes[0,0].legend()

# Box plot
axes[0,1].boxplot(data, vert=True)
axes[0,1].set_title("Box Plot")

# Scatter plot
x = np.arange(200)
axes[1,0].scatter(x, data, alpha=0.5, color="#8a4fff", s=15)
axes[1,0].set_title("Scatter Plot")

# Q-Q plot (normality check)
from scipy import stats
stats.probplot(data, dist="norm", plot=axes[1,1])
axes[1,1].set_title("Q-Q Plot")

plt.tight_layout()
plt.savefig("plots.png", dpi=150, bbox_inches="tight")
plt.show()
```

<HindiBox>

Matplotlib base plotting library hai — code lamba hota hai, lekin poora control milta hai.

**Sabse zaroori plot — Q-Q Plot:**
`stats.probplot()` normality check karne ka sabse achha visual tarika hai. Agar points diagonal line par hain toh data normal hai. Ye Shapiro-Wilk test se bhi zyada bharosemand hai, khaas kar bade samples mein.

**Chaar plots jo har EDA mein hone chahiye:**
1. **Histogram** → distribution ki shape
2. **Box plot** → outliers aur quartiles
3. **Scatter plot** → do variables ka rishta
4. **Q-Q plot** → normality

**Practical tips:**
- `plt.subplots(2, 2)` se ek saath 4 plots
- `plt.tight_layout()` — overlapping labels theek karta hai
- `dpi=150` — save karte waqt achhi quality ke liye

</HindiBox>

### 8.1.6 Seaborn

Seaborn builds on Matplotlib and produces statistical plots in far less code.

```python
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

sns.set_theme(style="whitegrid")
tips = sns.load_dataset("tips")

# Distribution
sns.histplot(data=tips, x="total_bill", kde=True)

# Group comparison
sns.boxplot(data=tips, x="day", y="total_bill", hue="sex")
sns.violinplot(data=tips, x="day", y="total_bill")

# Relationship + regression line
sns.regplot(data=tips, x="total_bill", y="tip")

# All pairwise relationships at once
sns.pairplot(tips, hue="sex", diag_kind="kde")

# Correlation heatmap
corr = tips[["total_bill", "tip", "size"]].corr()
sns.heatmap(corr, annot=True, cmap="coolwarm",
            vmin=-1, vmax=1, fmt=".2f")

plt.show()
```

<HindiBox>

Seaborn Matplotlib ke upar bana hai aur bahut kam code mein statistical plots deta hai.

**Sabse useful teen functions:**

| Function | Kab use karein |
|---|---|
| `pairplot()` | Ek command mein saare variables ke rishte — EDA ka best starting point |
| `heatmap()` | Correlation matrix ko rangon mein dekhna |
| `regplot()` | Scatter plot + regression line + confidence band, sab ek sath |

**Heatmap ke liye zaroori:** `vmin=-1, vmax=1` set karo — warna colors misleading ho sakte hain kyunki scale automatically adjust ho jaati hai.

**Seaborn ka fayda:** Matplotlib mein jo 15 lines lagti hain, Seaborn mein 1 line mein ho jaata hai. Lekin fine control chahiye toh Matplotlib hi kaam aata hai — isliye dono aane chahiye.

</HindiBox>

### 8.1.7 Loading a Dataset

```python
import pandas as pd

# ---- From files ----
df = pd.read_csv("data.csv")
df = pd.read_excel("data.xlsx", sheet_name="Sheet1")
df = pd.read_json("data.json")

# ---- Handling messy CSVs ----
df = pd.read_csv(
    "data.csv",
    sep=",",
    header=0,
    na_values=["NA", "N/A", "", "-", "missing"],
    parse_dates=["date_column"],
    encoding="utf-8"
)

# ---- Built-in practice datasets ----
import seaborn as sns
tips = sns.load_dataset("tips")
iris = sns.load_dataset("iris")

# ---- The first-look checklist ----
print("Shape        :", df.shape)
print("Columns      :", df.columns.tolist())
print("Missing      :\n", df.isnull().sum())
print("Duplicates   :", df.duplicated().sum())
print("Data types   :\n", df.dtypes)
df.head()
df.describe()
```

<HindiBox>

**Naya dataset milne par ye checklist chalao — 1 minute mein poora andaza:**

1. `df.shape` — kitni rows aur columns?
2. `df.head()` — data dikhta kaisa hai?
3. `df.info()` — types sahi hain? (dates text mein toh nahi?)
4. `df.isnull().sum()` — kahan missing values hain?
5. `df.duplicated().sum()` — duplicates hain kya?
6. `df.describe()` — koi impossible value? (negative age, 200% percentage)

**Messy CSV ke liye zaroori parameters:**
- `na_values=["NA", "-", "missing"]` — real data mein missing values kai roopon mein aati hain
- `parse_dates=["date_col"]` — warna dates text ban kar reh jaayengi
- `encoding="utf-8"` — Hindi ya special characters ke liye

**Tip:** Practice ke liye `sns.load_dataset("tips")` ya `"iris"` use karo — ye ready-made clean datasets hain.

</HindiBox>

### 8.1.8 Descriptive Statistics

```python
import pandas as pd
import numpy as np
from scipy import stats

df = pd.DataFrame({
    "gender": ["M","F","M","F","M","F","M","F","M","F"],
    "hours":  [2, 5, 3, 8, 4, 7, 6, 9, 3, 6],
    "marks":  [45, 72, 55, 88, 61, 82, 75, 91, 52, 79]
})

def describe_full(series):
    """A complete descriptive summary in one function."""
    return pd.Series({
        "n":        series.count(),
        "mean":     series.mean(),
        "median":   series.median(),
        "mode":     series.mode()[0],
        "std":      series.std(),          # ddof=1
        "variance": series.var(),
        "min":      series.min(),
        "Q1":       series.quantile(0.25),
        "Q3":       series.quantile(0.75),
        "max":      series.max(),
        "IQR":      series.quantile(0.75) - series.quantile(0.25),
        "range":    series.max() - series.min(),
        "skewness": series.skew(),
        "kurtosis": series.kurt(),
        "CV%":      (series.std() / series.mean()) * 100,
        "SE":       series.std() / np.sqrt(series.count())
    })

print(describe_full(df["marks"]).round(3))

# Grouped summary
print(df.groupby("gender")["marks"].agg(
    ["count", "mean", "median", "std", "min", "max"]
).round(2))

# Outlier detection (IQR method)
Q1, Q3 = df["marks"].quantile([0.25, 0.75])
IQR = Q3 - Q1
outliers = df[(df["marks"] < Q1 - 1.5*IQR) | (df["marks"] > Q3 + 1.5*IQR)]
print(f"Outliers found: {len(outliers)}")
```

<HindiBox>

Ye `describe_full()` function pandas ke `.describe()` se kaafi zyada deta hai — skewness, kurtosis, CV aur standard error bhi.

**Kaunsa number kya batata hai:**

| Statistic | Kya dekhna hai |
|---|---|
| **mean vs median** | Bahut alag hain? → data skewed hai |
| **skewness** | $-1$ se $+1$ ke bahar? → transformation sochо |
| **CV%** | Alag units wale datasets compare karne ke liye |
| **SE** | Aapka mean estimate kitna reliable hai |

**Quick skewness check:** Agar `mean > median` hai toh right-skewed, aur `mean < median` toh left-skewed. Formula ke bina hi andaza lag jaata hai.

**Outlier detection:** IQR method sabse standard hai — $Q_1 - 1.5 \times IQR$ se neeche ya $Q_3 + 1.5 \times IQR$ se upar. Lekin yaad rakho — outlier milna matlab use hatana nahi, pehle **jaanchna** hai.

</HindiBox>

### 8.1.9 Visualization

```python
import seaborn as sns
import matplotlib.pyplot as plt
from scipy import stats

sns.set_theme(style="whitegrid")
fig, axes = plt.subplots(2, 3, figsize=(16, 9))

# 1. Distribution shape
sns.histplot(data=df, x="marks", kde=True, ax=axes[0,0])
axes[0,0].set_title("Distribution")

# 2. Outliers and quartiles
sns.boxplot(data=df, y="marks", ax=axes[0,1])
axes[0,1].set_title("Box Plot")

# 3. Group comparison
sns.boxplot(data=df, x="gender", y="marks", ax=axes[0,2])
axes[0,2].set_title("By Group")

# 4. Relationship
sns.regplot(data=df, x="hours", y="marks", ax=axes[1,0])
axes[1,0].set_title("Relationship")

# 5. Normality check
stats.probplot(df["marks"], dist="norm", plot=axes[1,1])
axes[1,1].set_title("Q-Q Plot")

# 6. Correlations
sns.heatmap(df[["hours","marks"]].corr(), annot=True,
            cmap="coolwarm", vmin=-1, vmax=1, ax=axes[1,2])
axes[1,2].set_title("Correlation")

plt.tight_layout()
plt.show()
```

<HindiBox>

**Ye 6 plots milkar ek complete EDA dashboard bana dete hain:**

| Plot | Kaunsa sawaal answer karta hai |
|---|---|
| Histogram | Distribution ki shape kaisi hai? |
| Box Plot | Outliers hain kya? |
| Grouped Box | Groups mein farak hai? |
| Reg Plot | Do variables mein rishta hai? |
| Q-Q Plot | Data normal hai? |
| Heatmap | Kaunse variables jude hue hain? |

**Chart chunne ka simple rule:**

| Kya dekhna hai | Kaunsa chart |
|---|---|
| Ek variable ki distribution | Histogram |
| Groups compare | Box plot |
| Do numeric variables | Scatter plot |
| Time ke sath trend | Line chart |
| Categories compare | Bar chart |

**Golden rule:** Koi bhi statistical test chalane se **pehle** ye plots dekho. Aksar answer plot mein hi dikh jaata hai, aur test sirf confirm karta hai.

</HindiBox>

### 8.1.10 Statistical Tests

```python
import numpy as np
from scipy import stats

def run_test(group1, group2, paired=False, alpha=0.05):
    """Choose and run the appropriate test automatically."""

    # Step 1: Check normality
    p1 = stats.shapiro(group1).pvalue
    p2 = stats.shapiro(group2).pvalue
    normal = (p1 > alpha) and (p2 > alpha)
    print(f"Normality: p1={p1:.4f}, p2={p2:.4f} → "
          f"{'Normal' if normal else 'Not normal'}")

    # Step 2: Check equal variances
    if not paired:
        p_lev = stats.levene(group1, group2).pvalue
        equal_var = p_lev > alpha
        print(f"Levene: p={p_lev:.4f} → "
              f"{'Equal' if equal_var else 'Unequal'} variances")
    else:
        equal_var = None

    # Step 3: Pick and run the test
    if paired:
        if normal:
            stat, p = stats.ttest_rel(group1, group2); name = "Paired t-test"
        else:
            stat, p = stats.wilcoxon(group1, group2);  name = "Wilcoxon"
    else:
        if normal:
            stat, p = stats.ttest_ind(group1, group2, equal_var=equal_var)
            name = "Student's t-test" if equal_var else "Welch's t-test"
        else:
            stat, p = stats.mannwhitneyu(group1, group2); name = "Mann-Whitney U"

    # Step 4: Effect size (Cohen's d)
    n1, n2 = len(group1), len(group2)
    sp = np.sqrt(((n1-1)*np.var(group1, ddof=1) +
                  (n2-1)*np.var(group2, ddof=1)) / (n1+n2-2))
    d = (np.mean(group1) - np.mean(group2)) / sp

    print(f"\nTest      : {name}")
    print(f"Statistic : {stat:.4f}")
    print(f"p-value   : {p:.4f}")
    print(f"Cohen's d : {d:.4f}")
    print(f"Decision  : {'Reject H0' if p <= alpha else 'Fail to reject H0'}")
    return p, d

a = np.array([78, 82, 75, 88, 79, 85, 77, 81, 84, 80])
b = np.array([70, 74, 68, 77, 72, 71, 69, 75, 73, 70])
run_test(a, b)
```

<HindiBox>

Ye function poora decision-making process automate kar deta hai — normality check, variance check, sahi test chunna, aur effect size — sab ek jagah.

**Ye function jo logic follow karta hai:**

```
Paired data hai?
├─ Haan → Normal? → Paired t-test / Wilcoxon
└─ Nahi → Normal?
          ├─ Haan → Equal variance? → Student's / Welch's t-test
          └─ Nahi → Mann-Whitney U
```

**Chaar zaroori steps jo koi bhi test karte waqt chhootne nahi chahiye:**
1. Assumptions check (`shapiro`, `levene`)
2. Sahi test chuno
3. Test chalao
4. **Effect size** report karo

**Sirf p-value likhna adhoora kaam hai.** p-value batati hai "effect hai ya nahi", effect size batati hai "kitna bada hai". Dono chahiye.

</HindiBox>

## 8.2 📁 Statistical Analysis Case Studies

### 8.2.1 Case Study 1 — Chi-Square

**Research Question:** Is there an association between gender and preferred payment method in an e-commerce store?

**Data:** 400 customers surveyed.

| | UPI | Card | Cash on Delivery | Total |
|---|---|---|---|---|
| **Male** | 90 | 70 | 40 | 200 |
| **Female** | 60 | 60 | 80 | 200 |
| **Total** | 150 | 130 | 120 | 400 |

**Hypotheses:**
$H_0$: Gender and payment method are independent
$H_1$: They are associated

```python
import numpy as np
from scipy.stats import chi2_contingency

observed = np.array([[90, 70, 40],
                     [60, 60, 80]])

# Step 1: Assumptions — all expected counts must be >= 5
chi2, p, dof, expected = chi2_contingency(observed)
print("Expected frequencies:\n", expected.round(2))
print("All expected >= 5:", (expected >= 5).all())

# Step 2: Test results
print(f"\nChi-square : {chi2:.4f}")
print(f"df         : {dof}")
print(f"p-value    : {p:.6f}")

# Step 3: Effect size
n = observed.sum()
v = np.sqrt(chi2 / (n * (min(observed.shape) - 1)))
print(f"Cramér's V : {v:.4f}")

# Step 4: Which cells drive the result?
residuals = (observed - expected) / np.sqrt(expected)
print("\nStandardized residuals:\n", residuals.round(2))
```

**Results:** $\chi^2(2, N=400) = 26.15$, $p < .001$, Cramér's $V = 0.256$

**Conclusion:** Reject $H_0$. Gender and payment method are significantly associated, with a small-to-moderate effect. Examining residuals shows males over-use UPI while females over-use Cash on Delivery.

<HindiBox>

**Sawaal:** Kya gender aur payment method mein koi rishta hai?

**Poora workflow:**

| Step | Kya kiya |
|---|---|
| 1. Assumptions | Saare expected counts $\geq 5$ ✅ |
| 2. Test | $\chi^2 = 26.15$, $df = 2$ |
| 3. p-value | $p < .001$ → $H_0$ reject |
| 4. Effect size | Cramér's $V = 0.256$ → small-moderate |
| 5. Residuals | Kaunsa cell zimmedar hai |

**Nateeja:** Gender aur payment method jude hue hain. Males UPI zyada use karte hain, Females Cash on Delivery zyada.

**Sabse zaroori step jo log chhod dete hain — residuals.** Chi-square sirf batata hai ki "farak hai", residuals batate hain ki **kahan** farak hai. Bina iske business decision nahi le sakte.

**Business action:** Female customers ke liye COD option prominent rakho, Male customers ko UPI offers dikhao.

</HindiBox>

### 8.2.2 Case Study 2 — t-Test

**Research Question:** Does a new training program improve employee productivity scores?

**Data:** 25 employees measured before and after training (paired design).

**Hypotheses:**
$H_0$: $\mu_d = 0$ (no change)
$H_1$: $\mu_d > 0$ (productivity improved)

```python
import numpy as np
from scipy import stats

before = np.array([65,70,68,72,66,71,69,67,73,64,
                   70,68,66,72,69,65,71,67,70,68,
                   66,73,69,71,67])
after  = np.array([72,76,71,79,74,77,73,75,80,70,
                   78,74,72,81,76,71,79,73,77,75,
                   72,82,76,78,74])

diff = after - before

# Step 1: Check normality OF THE DIFFERENCES
w, p_norm = stats.shapiro(diff)
print(f"Shapiro on differences: W={w:.4f}, p={p_norm:.4f}")

# Step 2: Descriptives
print(f"\nBefore : M={before.mean():.2f}, SD={before.std(ddof=1):.2f}")
print(f"After  : M={after.mean():.2f}, SD={after.std(ddof=1):.2f}")
print(f"Diff   : M={diff.mean():.2f}, SD={diff.std(ddof=1):.2f}")

# Step 3: Paired t-test (one-tailed)
t_stat, p_val = stats.ttest_rel(after, before, alternative="greater")
print(f"\nt({len(diff)-1}) = {t_stat:.4f}, p = {p_val:.8f}")

# Step 4: Effect size
d = diff.mean() / diff.std(ddof=1)
print(f"Cohen's d = {d:.4f}")

# Step 5: Confidence interval
se = diff.std(ddof=1) / np.sqrt(len(diff))
ci = stats.t.interval(0.95, len(diff)-1, loc=diff.mean(), scale=se)
print(f"95% CI for mean difference: [{ci[0]:.2f}, {ci[1]:.2f}]")
```

**Results:** $M_{\text{before}} = 68.6$, $M_{\text{after}} = 75.6$, mean difference $= 7.0$, $t(24) = 21.4$, $p < .001$, $d = 4.28$, 95% CI [6.32, 7.68]

**Conclusion:** Reject $H_0$. The training produced a statistically significant and very large improvement of about 7 points.

<HindiBox>

**Sawaal:** Kya nayi training se productivity badhi?

**Yahan Paired t-test kyun?** Kyunki **ek hi 25 employees** ko do baar naapa gaya — pehle aur baad. Agar Independent t-test use karte toh power kaafi kam ho jaati.

**Poora workflow:**

| Step | Result |
|---|---|
| 1. Normality (**differences** ki) | $p = 0.61$ ✅ |
| 2. Descriptives | Before 68.6 → After 75.6 |
| 3. Paired t-test | $t(24) = 21.4$, $p < .001$ |
| 4. Effect size | $d = 4.28$ → bahut bada |
| 5. CI | [6.32, 7.68] |

**⚠️ Sabse zaroori technical point:** Paired t-test mein normality **differences** ki check karni hai, `before` aur `after` ki alag-alag nahi. Ye bahut log galat karte hain.

**Nateeja kaise likhein:**
> "Training ke baad productivity mein significant sudhaar hua, $t(24) = 21.4$, $p < .001$, $d = 4.28$. Average 7 points ka improvement, jiska 95% CI [6.32, 7.68] hai."

</HindiBox>

### 8.2.3 Case Study 3 — ANOVA

**Research Question:** Do four different fertilizers produce different crop yields?

**Data:** 40 plots, 10 per fertilizer type.

**Hypotheses:**
$H_0$: $\mu_1 = \mu_2 = \mu_3 = \mu_4$
$H_1$: At least one mean differs

```python
import numpy as np
import pandas as pd
from scipy import stats
import statsmodels.api as sm
from statsmodels.formula.api import ols
from statsmodels.stats.multicomp import pairwise_tukeyhsd

f1 = [45,48,42,50,46,44,47,43,49,46]
f2 = [52,55,50,58,54,53,56,51,57,54]
f3 = [48,50,46,52,49,47,51,48,50,49]
f4 = [60,63,58,65,61,62,64,59,66,62]

# Step 1: Assumptions
for name, g in [("F1",f1),("F2",f2),("F3",f3),("F4",f4)]:
    print(f"Shapiro {name}: p={stats.shapiro(g).pvalue:.4f}")
print(f"Levene: p={stats.levene(f1,f2,f3,f4).pvalue:.4f}")

# Step 2: One-way ANOVA
f_stat, p_val = stats.f_oneway(f1, f2, f3, f4)
print(f"\nANOVA: F={f_stat:.4f}, p={p_val:.10f}")

# Step 3: Full table + effect size
df = pd.DataFrame({
    "yield": f1+f2+f3+f4,
    "fert":  ["F1"]*10+["F2"]*10+["F3"]*10+["F4"]*10
})
model = ols("Q('yield') ~ C(fert)", data=df).fit()
table = sm.stats.anova_lm(model, typ=2)
print("\n", table)

eta_sq = table["sum_sq"].iloc[0] / table["sum_sq"].sum()
print(f"Eta-squared: {eta_sq:.4f}")

# Step 4: Post-hoc — ONLY because ANOVA was significant
if p_val <= 0.05:
    print("\n", pairwise_tukeyhsd(df["yield"], df["fert"], alpha=0.05))
```

**Results:** $F(3, 36) = 82.5$, $p < .001$, $\eta^2 = 0.87$

**Tukey HSD:** F4 > F2 > F3 ≈ F1. All pairs differ significantly except F1 vs F3.

**Conclusion:** Reject $H_0$. Fertilizer type explains 87% of the variance in yield. Fertilizer 4 is clearly the best performer.

<HindiBox>

**Sawaal:** Kya chaar alag fertilizers ke yields mein farak hai?

**ANOVA kyun, t-test kyun nahi?** 4 groups ke liye 6 t-tests chahiye honge — aur Type I error 26.5% tak pahunch jaayegi! ANOVA ek hi test mein sab kar deta hai.

**Poora workflow:**

| Step | Result |
|---|---|
| 1. Normality | Saare groups ✅ |
| 2. Levene's | $p > 0.05$ ✅ equal variances |
| 3. ANOVA | $F(3,36) = 82.5$, $p < .001$ |
| 4. Effect size | $\eta^2 = 0.87$ → bahut bada |
| 5. Post-hoc (Tukey) | F4 > F2 > F3 ≈ F1 |

**ANOVA ki sabse badi limitation:** Ye sirf batata hai ki "kahin toh farak hai" — **kahan** farak hai ye nahi. Uske liye **Tukey HSD** chahiye.

**⚠️ Zaroori rule:** Post-hoc test **tabhi** chalao jab ANOVA significant ho. Warna wahi multiple-comparison problem wapas aa jaayegi.

**$\eta^2 = 0.87$ ka matlab:** Yield ka 87% variation sirf fertilizer se explain ho raha hai — ye bahut strong effect hai.

</HindiBox>

### 8.2.4 Case Study 4 — Correlation

**Research Question:** Is there a relationship between daily screen time and sleep quality?

**Data:** 30 participants — screen time (hours/day) and sleep quality score (0–100).

**Hypotheses:**
$H_0$: $\rho = 0$
$H_1$: $\rho \neq 0$

```python
import numpy as np
from scipy import stats
import seaborn as sns
import matplotlib.pyplot as plt

screen = np.array([2,3,4,5,6,7,8,9,10,11,2.5,3.5,4.5,5.5,6.5,
                   7.5,8.5,9.5,10.5,3,4,5,6,7,8,9,4,6,8,5])
sleep  = np.array([85,82,78,74,70,66,60,55,50,45,84,80,76,72,68,
                   64,58,53,48,83,79,75,71,67,61,54,77,69,59,73])

# Step 1: ALWAYS plot first
sns.regplot(x=screen, y=sleep)
plt.xlabel("Screen time (hours/day)"); plt.ylabel("Sleep quality")
# plt.show()

# Step 2: Check normality
print("Shapiro screen:", stats.shapiro(screen).pvalue.round(4))
print("Shapiro sleep :", stats.shapiro(sleep).pvalue.round(4))

# Step 3: Pearson correlation
r, p = stats.pearsonr(screen, sleep)
print(f"\nPearson r = {r:.4f}, p = {p:.10f}")
print(f"r-squared = {r**2:.4f}  ({r**2*100:.1f}% of variance)")

# Step 4: Spearman (robustness check)
rho, p_s = stats.spearmanr(screen, sleep)
print(f"Spearman rho = {rho:.4f}, p = {p_s:.10f}")

# Step 5: Confidence interval via Fisher's z
n = len(screen)
z, se = np.arctanh(r), 1/np.sqrt(n-3)
lo, hi = np.tanh(z - 1.96*se), np.tanh(z + 1.96*se)
print(f"95% CI for r: [{lo:.4f}, {hi:.4f}]")
```

**Results:** $r = -0.996$, $p < .001$, $r^2 = 0.99$, 95% CI $[-0.998, -0.991]$. Spearman $\rho = -0.996$ confirms the result is not driven by outliers.

**Conclusion:** Reject $H_0$. There is a very strong negative correlation — more screen time is associated with poorer sleep quality.

**Critical caveat:** This is **observational** data. The correlation does **not** establish that screen time causes poor sleep. Plausible alternatives: reverse causation (poor sleepers stay up using screens), or confounding (stress, shift work, or age driving both).

<HindiBox>

**Sawaal:** Kya screen time aur sleep quality mein rishta hai?

**Poora workflow:**

| Step | Result |
|---|---|
| 1. **Plot pehle** | Linear pattern, koi outlier nahi |
| 2. Normality | Dono ✅ → Pearson theek hai |
| 3. Pearson | $r = -0.996$, $p < .001$ |
| 4. $r^2$ | 0.99 → 99% variance explained |
| 5. Spearman check | $\rho = -0.996$ → same result |
| 6. CI | $[-0.998, -0.991]$ |

**Negative $r$ ka matlab:** Screen time badhne par sleep quality **girti** hai. Ye "kharab" correlation nahi, bas ulti direction hai.

**⚠️ Sabse zaroori baat — Causation nahi!**

Ye **observational** data hai. Correlation strong hone se ye sabit **nahi** hota ki screen time hi kharab neend ka **kaaran** hai. Dusre possible explanations:

- **Reverse causation:** Jinhe neend nahi aati wo phone use karte hain (ulta rishta)
- **Confounding:** Stress ya night shift dono cheezon ko affect kar raha ho
- **Bidirectional:** Dono ek dusre ko bigaad rahe hon

**Causation sabit karne ke liye** ek randomized experiment chahiye — jahan logon ko randomly screen time assign kiya jaaye.

</HindiBox>