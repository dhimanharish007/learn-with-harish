---
id: chapter-3
title: Chapter 3 — Descriptive Statistics
description: Introduces descriptive statistics, including measures of central tendency and dispersion, and how data distributions are characterized.
sidebar_position: 1
---
## 3.1 📈 Introduction to Descriptive Statistics
### 3.1.1 What is Descriptive Statistics?

Descriptive Statistics is the branch of statistics that focuses on summarizing, organizing, and presenting data in a clear and understandable way. It describes **what the data shows** — without making any predictions or generalizations beyond the dataset in hand. Its main tools are measures of central tendency (mean, median, mode), measures of dispersion (range, variance, standard deviation), and visual summaries (tables, charts, graphs).

<HindiBox>

Descriptive Statistics statistics ki wo branch hai jo data ko summarize, organize aur clearly present karne par focus karti hai. Ye batati hai ki **data kya dikha raha hai** — bina koi prediction ya generalization kiye. Iske main tools hain: central tendency (mean, median, mode), dispersion (range, variance, standard deviation), aur visual summaries (tables, charts, graphs).

**Example:** Ek class ke 50 students ke marks ka average 68, highest 95, lowest 32 batana — ye Descriptive Statistics hai. Yahan hum sirf apne paas maujood data ko describe kar rahe hain, kisi aur class ke baare mein kuch nahi keh rahe.

</HindiBox>

### 3.1.2 Population and Sample

- **Population:** the complete set of all individuals or items that we are interested in studying. Its measures are called **parameters** (e.g., population mean $\mu$).
- **Sample:** a smaller subset selected from the population, used because studying everyone is often impractical. Its measures are called **statistics** (e.g., sample mean $\bar{x}$).

A good sample must be **representative** of the population, otherwise conclusions drawn from it will be misleading.

<HindiBox>

- **Population:** un sabhi individuals ya items ka poora set jinke baare mein hum study karna chahte hain. Iske measures ko **parameters** kehte hain (jaise population mean $\mu$).
- **Sample:** population mein se chuna gaya ek chhota hissa, kyunki sabko study karna aksar practical nahi hota. Iske measures ko **statistics** kehte hain (jaise sample mean $\bar{x}$).

Ek achha sample population ka **representative** hona chahiye, warna usse nikale gaye conclusions galat honge.

**Example:** Agar aap "India ke logon ki average height" jaanna chahte hain — 140 crore log **Population** hain. Alag-alag states se chune gaye 10,000 log aapka **Sample** hain.

</HindiBox>

### 3.1.3 Variables and Observations

- **Variable:** a characteristic being measured that can vary from one unit to another — for example age, salary, or city. In a dataset, variables are usually the **columns**.
- **Observation:** a single record or data point containing values for all the variables — usually the **rows** of a dataset.

Variables can be **independent** (the input or predictor) or **dependent** (the outcome being studied).

<HindiBox>

- **Variable:** koi aisi characteristic jo alag-alag units mein badalti hai — jaise age, salary, ya city. Dataset mein variables usually **columns** hote hain.
- **Observation:** ek single record ya data point jisme saare variables ki values hoti hain — usually dataset ki **rows**.

Variables **independent** (input ya predictor) ya **dependent** (jo outcome study kiya ja raha ho) ho sakte hain.

**Example:** Ek employee dataset mein Name, Age, Department aur Salary — ye 4 **variables** (columns) hain. Har ek employee ki puri row ek **observation** hai. Agar 500 employees hain, toh 500 observations hue.

</HindiBox>

### 3.1.4 Summarizing Data

Summarizing means condensing a large dataset into a few meaningful numbers or visuals that capture its essential features. A good summary typically answers three questions:

- **Where is the center?** → mean, median, mode
- **How spread out is the data?** → range, IQR, variance, standard deviation
- **What is the shape?** → skewness, kurtosis, and distribution plots

<HindiBox>

Summarizing ka matlab hai ek bade dataset ko kuch meaningful numbers ya visuals mein compress karna, jo uske main features capture kar lein. Ek achha summary teen sawaalon ka jawab deta hai:

- **Center kahan hai?** → mean, median, mode
- **Data kitna faila hua hai?** → range, IQR, variance, standard deviation
- **Shape kaisi hai?** → skewness, kurtosis, distribution plots

**Example:** 1 lakh customers ka data dekhna mushkil hai. Lekin "average order value ₹850, median ₹600, aur zyadatar orders ₹300–₹1200 ke beech" — ye teen line poore dataset ki kahani bata deti hai.

</HindiBox>

### 3.1.5 Frequency Distribution

A frequency distribution shows how often each value or range of values occurs in a dataset. It is usually presented as a table with classes (bins) and their corresponding counts. Related concepts:

- **Frequency** ($f$): number of times a value occurs
- **Relative Frequency:** $\dfrac{f}{n}$ — the proportion or percentage of the total
- **Cumulative Frequency:** running total of frequencies up to a given class

<HindiBox>

Frequency distribution batati hai ki dataset mein har value ya value-range kitni baar aayi hai. Ise usually ek table ke roop mein dikhaya jaata hai jisme classes (bins) aur unke counts hote hain. Related concepts:

- **Frequency** ($f$): koi value kitni baar aayi
- **Relative Frequency:** $\dfrac{f}{n}$ — total ka proportion ya percentage
- **Cumulative Frequency:** kisi class tak ka running total

**Example:** 100 students ke marks:

| Marks Range | Students (Frequency) |
|---|---|
| 0–40 | 12 |
| 41–60 | 35 |
| 61–80 | 38 |
| 81–100 | 15 |

Ek nazar mein pata chal jaata hai ki zyadatar students 41–80 ke beech hain.

</HindiBox>

### 3.1.6 Tables and Graphs

Visual representations make patterns visible that raw numbers often hide. Common choices:

- **Bar Chart:** comparing categories (categorical data)
- **Histogram:** showing distribution of continuous data
- **Pie Chart:** showing parts of a whole (best with few categories)
- **Line Chart:** showing trends over time
- **Box Plot:** showing spread, quartiles, and outliers
- **Scatter Plot:** showing relationship between two numeric variables

<HindiBox>

Visual representations wo patterns dikha dete hain jo raw numbers mein chhupe reh jaate hain. Common choices:

- **Bar Chart:** categories compare karne ke liye (categorical data)
- **Histogram:** continuous data ki distribution dikhane ke liye
- **Pie Chart:** poore ka hissa dikhane ke liye (kam categories ho toh best)
- **Line Chart:** time ke sath trend dikhane ke liye
- **Box Plot:** spread, quartiles aur outliers dikhane ke liye
- **Scatter Plot:** do numeric variables ke beech relationship dikhane ke liye

**Note:** Bar chart aur Histogram alag hain — Bar chart **categories** ke liye (gaps ke sath), Histogram **continuous ranges** ke liye (bina gaps ke).

**Example:** Mahine ke hisaab se sales ka trend dekhna ho toh **Line Chart** best hai; alag-alag products ki sales compare karni ho toh **Bar Chart**.

</HindiBox>

## 3.2 🎯 Measures of Central Tendency

### 3.2.1 Mean

The mean is the most commonly used measure of central tendency — it represents the "balancing point" of the data. In everyday usage, "mean" usually refers to the arithmetic mean, but there are several types (arithmetic, weighted, geometric, harmonic), each suited to different kinds of data.

<HindiBox>

Mean central tendency ka sabse zyada use hone wala measure hai — ye data ka "balancing point" represent karta hai. Aam bhasha mein "mean" ka matlab arithmetic mean hota hai, lekin iske kai types hain (arithmetic, weighted, geometric, harmonic), aur har ek alag tarah ke data ke liye suitable hai.

**Example:** 5 dost ki age: 20, 22, 24, 26, 28. Inka mean $= \frac{120}{5} = 24$ saal. Ye ek single number poore group ki age ko represent kar deta hai.

</HindiBox>

### 3.2.2 Arithmetic Mean

The arithmetic mean is the sum of all values divided by the number of values.

$$
\bar{x} = \frac{x_1 + x_2 + \cdots + x_n}{n} = \frac{1}{n}\sum_{i=1}^{n} x_i
$$

It uses every data point, which makes it informative — but also sensitive to extreme values (outliers).

<HindiBox>

Arithmetic mean saari values ka sum divide kiya jaata hai values ki sankhya se.

$$
\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i
$$

Ye har data point ko use karta hai, isliye informative hai — lekin isi wajah se extreme values (outliers) se easily affect bhi ho jaata hai.

**Example:** Marks: 60, 70, 80, 90 → $\bar{x} = \frac{300}{4} = 75$. Lekin agar ek student ke 0 marks aa jaayein: 0, 60, 70, 80, 90 → $\bar{x} = \frac{300}{5} = 60$. Ek hi value ne poora average badal diya.

</HindiBox>

### 3.2.3 Weighted Mean

The weighted mean is used when some values matter more than others. Each value is multiplied by its weight, and the total is divided by the sum of weights.

$$
\bar{x}_w = \frac{\sum_{i=1}^{n} w_i x_i}{\sum_{i=1}^{n} w_i}
$$

<HindiBox>

Weighted mean tab use hota hai jab kuch values dusron se zyada important hoti hain. Har value ko uske weight se multiply kiya jaata hai, phir total ko weights ke sum se divide karte hain.

$$
\bar{x}_w = \frac{\sum w_i x_i}{\sum w_i}
$$

**Example:** Ek subject mein Assignment ka weight 30% aur Exam ka 70% hai. Agar student ke Assignment mein 90 aur Exam mein 60 marks hain:

$$
\bar{x}_w = (0.30 \times 90) + (0.70 \times 60) = 27 + 42 = 69
$$

Simple average 75 hota, lekin weighted mean 69 hai — kyunki exam zyada important tha.

</HindiBox>

### 3.2.4 Geometric Mean

The geometric mean is the $n$th root of the product of $n$ values. It is the correct measure for data that grows multiplicatively — such as growth rates, returns, and ratios.

$$
GM = \sqrt[n]{x_1 \times x_2 \times \cdots \times x_n} = \left(\prod_{i=1}^{n} x_i\right)^{1/n}
$$

It only works with positive values, and always $GM \leq \bar{x}$.

<HindiBox>

Geometric mean $n$ values ke product ka $n$th root hota hai. Ye us data ke liye sahi measure hai jo multiplicatively badhta hai — jaise growth rates, returns, aur ratios.

$$
GM = \left(\prod_{i=1}^{n} x_i\right)^{1/n}
$$

Ye sirf positive values ke sath kaam karta hai aur hamesha $GM \leq \bar{x}$ hota hai.

**Example:** Ek investment 3 saal mein 10%, 20% aur 30% return deta hai. Sahi average return $\sqrt[3]{1.10 \times 1.20 \times 1.30} - 1 \approx 19.7\%$ hai — Arithmetic Mean (20%) yahan galat answer dega, kyunki returns compound hote hain.

</HindiBox>

### 3.2.5 Harmonic Mean

The harmonic mean is the reciprocal of the arithmetic mean of the reciprocals. It is appropriate for averaging rates and ratios, especially speeds over equal distances.

$$
HM = \frac{n}{\sum_{i=1}^{n} \dfrac{1}{x_i}}
$$

It gives more weight to smaller values, and always $HM \leq GM \leq \bar{x}$.

<HindiBox>

Harmonic mean reciprocals ke arithmetic mean ka reciprocal hota hai. Ye rates aur ratios ka average nikalne ke liye sahi hai, khaas kar equal distance par speeds ke liye.

$$
HM = \frac{n}{\sum \dfrac{1}{x_i}}
$$

Ye chhoti values ko zyada weight deta hai, aur hamesha $HM \leq GM \leq \bar{x}$ hota hai.

**Example:** Aap ek shehar 60 km/h se jaate hain aur wapas 40 km/h se aate hain. Average speed 50 km/h **nahi** hai:

$$
HM = \frac{2}{\frac{1}{60} + \frac{1}{40}} = 48 \text{ km/h}
$$

(Machine Learning mein F1-Score bhi precision aur recall ka harmonic mean hi hota hai.)

</HindiBox>

### 3.2.6 Median

The median is the middle value when data is arranged in ascending order.

$$
\text{Median} =
\begin{cases}
x_{\left(\frac{n+1}{2}\right)} & \text{if } n \text{ is odd} \\[8pt]
\dfrac{x_{\left(\frac{n}{2}\right)} + x_{\left(\frac{n}{2}+1\right)}}{2} & \text{if } n \text{ is even}
\end{cases}
$$

Its biggest advantage is that it is **resistant to outliers**, making it the better choice for skewed data.

<HindiBox>

Median wo beech ki value hai jo data ko ascending order mein arrange karne par milti hai.

- Agar $n$ **odd** ho → beech wali value $x_{\left(\frac{n+1}{2}\right)}$
- Agar $n$ **even** ho → beech ki do values ka average

Iska sabse bada fayda ye hai ki ye **outliers se affect nahi hoti**, isliye skewed data ke liye behtar choice hai.

**Example:** Ek office mein 5 logon ki salary: ₹20k, ₹25k, ₹30k, ₹35k, ₹5,00,000 (boss).
Mean = ₹1,22,000 — jo kisi ki bhi asli salary ke kareeb nahi.
Median = **₹30,000** — jo sach mein typical salary batati hai.

</HindiBox>

### 3.2.7 Mode

The mode is the value that appears most frequently in a dataset. A dataset can have:

- **No mode:** all values occur equally often
- **Unimodal:** one mode
- **Bimodal / Multimodal:** two or more modes

The mode is the only measure of central tendency that works with **nominal (categorical)** data.

<HindiBox>

Mode wo value hai jo dataset mein sabse zyada baar aati hai. Ek dataset mein ho sakta hai:

- **No mode:** saari values barabar baar aayein
- **Unimodal:** ek mode
- **Bimodal / Multimodal:** do ya zyada modes

Mode central tendency ka ekmatr measure hai jo **nominal (categorical)** data par bhi kaam karta hai.

**Example:** Ek shoe store mein sabse zyada bikne wala size 8 hai — yahi **Mode** hai. Store owner ke liye average size (jaise 7.6) bekaar hai; use pata hona chahiye ki stock size 8 ka zyada rakhna hai.

</HindiBox>

### 3.2.8 Mean vs Median vs Mode

| Aspect | Mean | Median | Mode |
|---|---|---|---|
| Definition | Average of all values | Middle value | Most frequent value |
| Outlier effect | Highly affected | Not affected | Not affected |
| Data type | Interval / Ratio | Ordinal and above | Any, incl. Nominal |
| Best for | Symmetric data | Skewed data | Categorical data |

For a perfectly symmetric distribution:

$$
\text{Mean} = \text{Median} = \text{Mode}
$$

For a right-skewed distribution: $\text{Mean} > \text{Median} > \text{Mode}$, and for left-skewed: $\text{Mean} < \text{Median} < \text{Mode}$.

<HindiBox>

| Aspect | Mean | Median | Mode |
|---|---|---|---|
| Definition | Saari values ka average | Beech ki value | Sabse zyada aane wali value |
| Outlier ka asar | Bahut zyada | Nahi hota | Nahi hota |
| Data type | Interval / Ratio | Ordinal aur upar | Koi bhi, Nominal sahit |
| Best for | Symmetric data | Skewed data | Categorical data |

Perfectly symmetric distribution mein $\text{Mean} = \text{Median} = \text{Mode}$. Right-skewed mein $\text{Mean} > \text{Median} > \text{Mode}$, aur left-skewed mein $\text{Mean} < \text{Median} < \text{Mode}$.

**Example:** India ki "average income" par bahas isi wajah se hoti hai — Mean bahut ameer logon ki wajah se upar chala jaata hai, jabki Median aam aadmi ki asli sthiti batata hai.

</HindiBox>

### 3.2.9 Limitations of Mean

Despite being the most popular measure, the mean has real weaknesses:

- **Highly sensitive to outliers** — a single extreme value can distort it badly
- **Misleading for skewed distributions** — it no longer represents a "typical" value
- **Cannot be used with nominal or ordinal data**
- **May not correspond to any actual observation** (e.g., "average family has 2.3 children")
- **Hides variability** — two very different datasets can share the same mean

<HindiBox>

Sabse popular measure hone ke bawajood, mean ki asli kamzoriyan hain:

- **Outliers se bahut zyada affect hota hai** — ek extreme value hi use bigaad deti hai
- **Skewed distributions mein misleading** — phir ye "typical" value represent nahi karta
- **Nominal ya ordinal data par use nahi ho sakta**
- **Kabhi-kabhi kisi actual observation se match hi nahi karta** (jaise "average family mein 2.3 bacche")
- **Variability chhupa deta hai** — do bilkul alag datasets ka mean same ho sakta hai

**Example:** Do class ke marks — Class A: 50, 50, 50, 50 aur Class B: 0, 25, 75, 100. Dono ka $\bar{x} = 50$ hai, lekin dono classes bilkul alag hain. Sirf mean dekh kar dhoka ho sakta hai.

</HindiBox>

### 3.2.10 Population Mean vs Sample Mean

| Aspect | Population Mean | Sample Mean |
|---|---|---|
| Symbol | $\mu$ (mu) | $\bar{x}$ (x-bar) |
| Based on | Every member of the population | A subset of the population |
| Nature | A fixed **parameter** | A varying **statistic** |
| Formula | $\mu = \dfrac{\sum_{i=1}^{N} x_i}{N}$ | $\bar{x} = \dfrac{\sum_{i=1}^{n} x_i}{n}$ |

The sample mean is an **unbiased estimator** of the population mean, i.e. $E[\bar{x}] = \mu$. But any single sample mean will usually differ from $\mu$; this difference is called **sampling error**.

<HindiBox>

| Aspect | Population Mean | Sample Mean |
|---|---|---|
| Symbol | $\mu$ (mu) | $\bar{x}$ (x-bar) |
| Kis par based | Population ke har member par | Population ke ek hisse par |
| Nature | Ek fixed **parameter** | Ek badalne wala **statistic** |
| Formula | $\mu = \dfrac{\sum x_i}{N}$ | $\bar{x} = \dfrac{\sum x_i}{n}$ |

Sample mean, population mean ka **unbiased estimator** hai — yani $E[\bar{x}] = \mu$. Lekin koi ek single sample mean usually $\mu$ se thoda alag hoga; is difference ko **sampling error** kehte hain.

**Example:** Ek factory ke saare 10,000 bulbs ki average life $\mu$ hai. Lekin practically 100 bulbs test karke jo average nikalta hai, wo $\bar{x}$ hai. Har baar alag 100 bulbs lene par $\bar{x}$ thoda-thoda badlega.

</HindiBox>

## 3.3 📉 Measures of Dispersion

### 3.3.1 Why Measure Variability?

Central tendency alone tells only half the story — it says where the center is, but not how spread out the data is around that center. Two datasets can have identical means but completely different behavior. Measuring variability helps us:

- Understand consistency and reliability
- Assess risk and uncertainty
- Detect outliers and unusual patterns
- Compare the stability of different groups

<HindiBox>

Sirf central tendency aadhi kahani batati hai — ye center kahan hai ye batati hai, lekin data us center ke aas-paas kitna faila hua hai ye nahi. Do datasets ka mean same ho sakta hai lekin behavior bilkul alag. Variability measure karne se hum:

- Consistency aur reliability samajh paate hain
- Risk aur uncertainty assess kar paate hain
- Outliers aur unusual patterns pakad paate hain
- Alag-alag groups ki stability compare kar paate hain

**Example:** Do batsmen ka average 45 runs hai. Pehla har match mein 40–50 banata hai; doosra kabhi 0 toh kabhi 150. Average same, lekin pehla **consistent** hai — ye baat sirf dispersion se pata chalti hai.

</HindiBox>

### 3.3.2 Range

The range is the simplest measure of spread — the difference between the maximum and minimum values.

$$
\text{Range} = x_{\max} - x_{\min}
$$

It is quick to compute but uses only two data points, making it extremely sensitive to outliers and uninformative about the rest of the distribution.

<HindiBox>

Range spread ka sabse simple measure hai — maximum aur minimum values ka difference.

$$
\text{Range} = x_{\max} - x_{\min}
$$

Ye jaldi nikal jaata hai lekin sirf do data points use karta hai, isliye outliers se bahut affect hota hai aur baaki distribution ke baare mein kuch nahi batata.

**Example:** Marks: 45, 50, 52, 55, 98 → Range $= 98 - 45 = 53$. Lekin ye 53 misleading hai, kyunki 4 students toh 45–55 ke beech hi hain. Sirf ek outlier ne range bada kar diya.

</HindiBox>

### 3.3.3 Interquartile Range (IQR)

The IQR measures the spread of the **middle 50%** of the data, making it robust to outliers.

$$
IQR = Q_3 - Q_1
$$

where $Q_1$ is the 25th percentile and $Q_3$ is the 75th percentile. IQR is also the standard basis for outlier detection — a value is flagged as an outlier if:

$$
x < Q_1 - 1.5 \times IQR \quad \text{or} \quad x > Q_3 + 1.5 \times IQR
$$

It is the measure visualized by the box in a box plot.

<HindiBox>

IQR data ke **beech ke 50%** hisse ka spread measure karta hai, isliye ye outliers se safe rehta hai.

$$
IQR = Q_3 - Q_1
$$

Yahan $Q_1$ 25th percentile hai aur $Q_3$ 75th percentile. Outlier detection ke liye rule:

$$
x < Q_1 - 1.5 \times IQR \quad \text{ya} \quad x > Q_3 + 1.5 \times IQR
$$

Box plot mein jo box dikhta hai, wo yahi IQR hai.

**Example:** Salaries mein CEO ki bahut badi salary Range ko kharab kar degi, lekin IQR aaram se batayega ki aam employees ki salary kis range mein hai.

</HindiBox>

### 3.3.4 Variance

Variance measures the average squared deviation of each value from the mean. Squaring ensures that positive and negative deviations don't cancel each other out.

$$
\sigma^2 = \frac{\sum_{i=1}^{N} (x_i - \mu)^2}{N} \qquad \text{(Population)}
$$

$$
s^2 = \frac{\sum_{i=1}^{n} (x_i - \bar{x})^2}{n - 1} \qquad \text{(Sample)}
$$

Its main drawback is interpretability: because deviations are squared, variance is expressed in **squared units** (e.g., $\text{rupees}^2$, $\text{kg}^2$), which have no intuitive meaning.

<HindiBox>

Variance batata hai ki har value mean se average kitni squared duri par hai. Square karne se positive aur negative deviations aapas mein cancel nahi hote.

$$
\sigma^2 = \frac{\sum (x_i - \mu)^2}{N}, \qquad s^2 = \frac{\sum (x_i - \bar{x})^2}{n - 1}
$$

Iski main problem interpretation ki hai: square karne ki wajah se variance **squared units** mein aata hai (jaise $\text{rupees}^2$, $\text{kg}^2$), jinka koi intuitive matlab nahi hota.

**Example:** Agar heights centimetre mein hain, toh variance $\text{cm}^2$ mein aayega — jise samajhna mushkil hai. Isi liye aage Standard Deviation use karte hain.

</HindiBox>

### 3.3.5 Standard Deviation

Standard deviation is simply the square root of variance, which brings the measure back to the **original units** of the data — making it far easier to interpret.

$$
\sigma = \sqrt{\frac{\sum_{i=1}^{N} (x_i - \mu)^2}{N}} \qquad
s = \sqrt{\frac{\sum_{i=1}^{n} (x_i - \bar{x})^2}{n - 1}}
$$

A small $s$ means values cluster tightly around the mean; a large $s$ means they are widely spread. It is the most widely used measure of dispersion in practice.

<HindiBox>

Standard deviation variance ka square root hai, jisse measure wapas data ke **original units** mein aa jaata hai — aur samajhna bahut aasan ho jaata hai.

$$
\sigma = \sqrt{\sigma^2}, \qquad s = \sqrt{s^2}
$$

Chhota $s$ ka matlab values mean ke aas-paas tightly clustered hain; bada $s$ ka matlab values door-door faili hui hain. Practically ye dispersion ka sabse zyada use hone wala measure hai.

**Example:** Do shops ki daily sales ka average ₹10,000 hai. Shop A ki $s = 500$ hai aur Shop B ki $s = 4000$. Shop A ki sales predictable hai, Shop B ki bahut ups-downs wali.

</HindiBox>

### 3.3.6 Population vs Sample Variance

The key difference lies in the denominator:

$$
\sigma^2 = \frac{\sum (x_i - \mu)^2}{N} \qquad \text{vs} \qquad s^2 = \frac{\sum (x_i - \bar{x})^2}{n - 1}
$$

The reason for $(n-1)$ — known as **Bessel's correction** — is that a sample's values tend to be closer to their own sample mean than to the true population mean, so dividing by $n$ would systematically **underestimate** the true variance. The quantity $(n-1)$ is called the **degrees of freedom**.

<HindiBox>

Main difference denominator mein hai:

$$
\sigma^2 = \frac{\sum (x_i - \mu)^2}{N} \qquad \text{vs} \qquad s^2 = \frac{\sum (x_i - \bar{x})^2}{n - 1}
$$

$(n-1)$ use karne ki wajah — jise **Bessel's correction** kehte hain — ye hai ki sample ki values apne hi sample mean ke zyada kareeb hoti hain, asli population mean ke nahi. Isliye $n$ se divide karne par variance systematically **kam** aa jaata. Is $(n-1)$ ko **degrees of freedom** kehte hain.

**Example:** Agar aap 10 students ka sample lekar variance nikaal rahe hain, toh 10 se nahi balki **9** se divide karenge — taaki poori class ka variance sahi estimate ho.

</HindiBox>

### 3.3.7 Standard Deviation vs Standard Error

These are often confused, but they answer different questions:

$$
SE = \frac{s}{\sqrt{n}}
$$

| Aspect | Standard Deviation ($s$) | Standard Error ($SE$) |
|---|---|---|
| Measures | Spread of individual data points | Spread of the sample **mean** |
| Question | How variable are the observations? | How precise is my estimate of $\mu$? |
| Effect of larger $n$ | Stays roughly the same | Gets smaller |

<HindiBox>

Ye dono aksar confuse kiye jaate hain, lekin alag sawaalon ka jawab dete hain:

$$
SE = \frac{s}{\sqrt{n}}
$$

| Aspect | Standard Deviation ($s$) | Standard Error ($SE$) |
|---|---|---|
| Kya measure karta hai | Individual data points ka spread | Sample **mean** ka spread |
| Sawaal | Observations kitne alag-alag hain? | Mera $\mu$ ka estimate kitna accurate hai? |
| Bada $n$ hone par | Lagbhag same rehta hai | Chhota hota jaata hai |

**Example:** $s$ batata hai ki logon ki heights kitni alag-alag hain. $SE$ batata hai ki 100 logon se nikala gaya average height, asli average ke kitna kareeb hai. Sample bada karne se $s$ nahi badalta, lekin $SE$ kam ho jaata hai — kyunki $\sqrt{n}$ denominator mein hai.

</HindiBox>

### 3.3.8 When to Use Which Measure?

| Situation | Best Measure |
|---|---|
| Quick, rough sense of spread | Range |
| Data has outliers or is skewed | IQR |
| Data is roughly symmetric / normal | Standard Deviation |
| Comparing datasets with different units | Coefficient of Variation, $CV = \dfrac{s}{\bar{x}} \times 100\%$ |
| Reporting precision of a sample estimate | Standard Error |
| Further calculations (ANOVA, regression) | Variance |

A practical rule of thumb: report **Median with IQR** for skewed data, and **Mean with SD** for symmetric data.

<HindiBox>

| Situation | Best Measure |
|---|---|
| Jaldi, mota-moti spread jaanna ho | Range |
| Data mein outliers hon ya skewed ho | IQR |
| Data lagbhag symmetric / normal ho | Standard Deviation |
| Alag units wale datasets compare karne hon | Coefficient of Variation, $CV = \dfrac{s}{\bar{x}} \times 100\%$ |
| Sample estimate ki precision batani ho | Standard Error |
| Aage ke calculations (ANOVA, regression) | Variance |

Ek practical rule: skewed data ke liye **Median + IQR** report karo, aur symmetric data ke liye **Mean + SD**.

**Example:** House prices report karte waqt Median + IQR use karna behtar hai (kyunki kuch bahut mehnge ghar data ko skew karte hain), jabki students ki heights ke liye Mean + SD sahi hai.

</HindiBox>

## 3.4 🔔 Distribution of Data

### 3.4.1 What is a Distribution?

A distribution describes how the values of a variable are spread out — which values occur, and how frequently. It answers: what shape does the data take? Distributions can be shown visually (histogram, density curve) or described mathematically (a probability distribution function). Understanding the distribution is essential because most statistical tests assume a particular shape.

<HindiBox>

Distribution batati hai ki kisi variable ki values kaise faili hui hain — kaunsi values aati hain aur kitni baar. Ye sawaal ka jawab deti hai: data ki shape kaisi hai? Distribution ko visually dikha sakte hain (histogram, density curve) ya mathematically describe kar sakte hain (probability distribution function). Distribution samajhna zaroori hai kyunki zyadatar statistical tests ek particular shape maan kar chalte hain.

**Example:** Agar aap 1000 logon ki heights ka histogram banayein, toh ek ghanti (bell) jaisi shape banegi — zyadatar log beech mein, bahut kam log bahut chhote ya bahut lambe. Yahi uski distribution hai.

</HindiBox>

### 3.4.2 Normal Distribution

The normal distribution (also called the Gaussian distribution or bell curve) is the most important distribution in statistics. Its probability density function is:

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}} \, e^{-\frac{(x - \mu)^2}{2\sigma^2}}
$$

Key properties:

- Perfectly **symmetric** about the mean
- $\text{Mean} = \text{Median} = \text{Mode}$, all at the center
- Bell-shaped, with tails extending infinitely in both directions
- Fully defined by just two parameters: $\mu$ and $\sigma$, written $X \sim N(\mu, \sigma^2)$
- Total area under the curve $= 1$

It matters so much because of the **Central Limit Theorem** — sample means tend toward a normal distribution regardless of the population's shape.

<HindiBox>

Normal distribution (jise Gaussian distribution ya bell curve bhi kehte hain) statistics ki sabse important distribution hai. Iska formula:

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}} \, e^{-\frac{(x - \mu)^2}{2\sigma^2}}
$$

Main properties:

- Mean ke aas-paas bilkul **symmetric**
- $\text{Mean} = \text{Median} = \text{Mode}$, teeno center par
- Ghanti jaisi shape, dono taraf tails infinite tak jaati hain
- Sirf do parameters se define ho jaati hai: $\mu$ aur $\sigma$, likhte hain $X \sim N(\mu, \sigma^2)$
- Curve ke neeche ka total area $= 1$

Ye itni important isliye hai kyunki **Central Limit Theorem** ke according, sample means normal distribution ki taraf jaate hain — chahe original population ki shape kuch bhi ho.

**Example:** Logon ki heights, exam scores, aur measurement errors — ye sab real duniya mein aksar normal distribution follow karte hain.

</HindiBox>

### 3.4.3 Standard Normal Distribution

The standard normal distribution is a special normal distribution with $\mu = 0$ and $\sigma = 1$, written $Z \sim N(0, 1)$. Any normal distribution can be converted to it using the **z-score**:

$$
z = \frac{x - \mu}{\sigma}
$$

A z-score tells you how many standard deviations a value lies above (positive) or below (negative) the mean. This standardization allows values from completely different scales to be compared directly.

<HindiBox>

Standard normal distribution ek special normal distribution hai jiska $\mu = 0$ aur $\sigma = 1$ hota hai, yani $Z \sim N(0, 1)$. Kisi bhi normal distribution ko **z-score** se ismein convert kiya ja sakta hai:

$$
z = \frac{x - \mu}{\sigma}
$$

Z-score batata hai ki koi value mean se kitne standard deviations upar (positive) ya neeche (negative) hai. Is standardization se bilkul alag scales wali values ko bhi directly compare kiya ja sakta hai.

**Example:** Aapke Maths mein 80/100 aur Physics mein 65/100 hain. Kaunsa behtar hai?

$$
z_{\text{Maths}} = \frac{80 - 75}{10} = 0.5, \qquad z_{\text{Physics}} = \frac{65 - 50}{5} = 3.0
$$

Yani Physics ka performance kaafi behtar hai!

</HindiBox>

### 3.4.4 Empirical Rule / 68–95–99.7 Rule

For any approximately normal distribution:

$$
P(\mu - \sigma < X < \mu + \sigma) \approx 68\%
$$

$$
P(\mu - 2\sigma < X < \mu + 2\sigma) \approx 95\%
$$

$$
P(\mu - 3\sigma < X < \mu + 3\sigma) \approx 99.7\%
$$

This rule provides a fast way to judge whether a value is typical or unusual — anything beyond $3\sigma$ is extremely rare (roughly 3 in 1000).

<HindiBox>

Kisi bhi lagbhag normal distribution ke liye:

- Lagbhag **68%** values $\mu \pm 1\sigma$ ke andar hoti hain
- Lagbhag **95%** values $\mu \pm 2\sigma$ ke andar
- Lagbhag **99.7%** values $\mu \pm 3\sigma$ ke andar

Is rule se turant pata chal jaata hai ki koi value normal hai ya unusual — $3\sigma$ se bahar kuch bhi extremely rare hota hai (lagbhag 1000 mein 3).

**Example:** Agar IQ ka $\mu = 100$ aur $\sigma = 15$ hai, toh 68% logon ka IQ 85–115 ke beech hoga, 95% ka 70–130 ke beech, aur 99.7% ka 55–145 ke beech. IQ 150 wala insaan isliye bahut hi rare hai.

</HindiBox>

### 3.4.5 Standard Deviation and Normal Distribution

Standard deviation controls the **width** of the bell curve, while the mean controls its **position**:

- **Small $\sigma$** → tall, narrow curve; data tightly concentrated near the mean
- **Large $\sigma$** → short, wide, flat curve; data widely dispersed

Changing $\mu$ shifts the entire curve left or right without changing its shape. This is why $\mu$ and $\sigma$ together fully describe any normal distribution.

<HindiBox>

Standard deviation bell curve ki **chaudai (width)** control karta hai, jabki mean uski **position** control karta hai:

- **Chhota $\sigma$** → lambi, patli curve; data mean ke bahut paas concentrated
- **Bada $\sigma$** → chhoti, chaudi, flat curve; data door-door tak faila hua

$\mu$ badalne se poori curve left ya right shift ho jaati hai, lekin uski shape nahi badalti. Isi liye $\mu$ aur $\sigma$ milkar kisi bhi normal distribution ko poori tarah describe kar dete hain.

**Example:** Do schools ke exam scores ka $\mu = 70$ hai. School A ka $\sigma = 5$ hai (patli curve — sab lagbhag ek jaise), School B ka $\sigma = 20$ (chaudi curve — kuch bahut achhe, kuch bahut kamzor).

</HindiBox>

### 3.4.6 Skewness

Skewness measures the **asymmetry** of a distribution:

$$
\text{Skewness} = \frac{\sum_{i=1}^{n}(x_i - \bar{x})^3}{(n-1)s^3}
$$

- **Positive (Right) Skew:** long tail on the right → $\text{Mean} > \text{Median} > \text{Mode}$
- **Negative (Left) Skew:** long tail on the left → $\text{Mean} < \text{Median} < \text{Mode}$
- **Zero Skew:** perfectly symmetric → $\text{Mean} = \text{Median} = \text{Mode}$

As a rough guide, skewness between $-0.5$ and $+0.5$ is considered fairly symmetric; beyond $\pm 1$ is highly skewed.

<HindiBox>

Skewness kisi distribution ki **asymmetry** measure karti hai:

$$
\text{Skewness} = \frac{\sum (x_i - \bar{x})^3}{(n-1)s^3}
$$

- **Positive (Right) Skew:** right taraf lambi tail → $\text{Mean} > \text{Median} > \text{Mode}$
- **Negative (Left) Skew:** left taraf lambi tail → $\text{Mean} < \text{Median} < \text{Mode}$
- **Zero Skew:** bilkul symmetric → $\text{Mean} = \text{Median} = \text{Mode}$

Mota-moti rule: skewness $-0.5$ se $+0.5$ ke beech ho toh symmetric maana jaata hai; $\pm 1$ se bahar highly skewed.

**Example:** **Income** right-skewed hoti hai — zyadatar log normal kamate hain, lekin kuch bahut ameer log tail ko right taraf kheench dete hain. **Bahut aasan exam paper** left-skewed hota hai — zyadatar ke achhe marks, kuch ke bahut kam.

</HindiBox>

### 3.4.7 Kurtosis

Kurtosis measures the **"tailedness"** of a distribution — how heavy the tails are and how sharp the peak is:

$$
\text{Kurtosis} = \frac{\sum_{i=1}^{n}(x_i - \bar{x})^4}{(n-1)s^4}
$$

- **Mesokurtic:** normal-like tails ($\text{Kurtosis} \approx 3$, or excess kurtosis $\approx 0$)
- **Leptokurtic:** sharp peak, heavy tails → more extreme outliers than normal
- **Platykurtic:** flat peak, light tails → fewer extreme values than normal

Kurtosis matters in risk analysis: heavy tails mean rare extreme events are more likely than a normal model would predict.

<HindiBox>

Kurtosis kisi distribution ki **"tailedness"** measure karta hai — tails kitni bhaari hain aur peak kitna teekha hai:

$$
\text{Kurtosis} = \frac{\sum (x_i - \bar{x})^4}{(n-1)s^4}
$$

- **Mesokurtic:** normal jaisi tails ($\approx 3$, ya excess kurtosis $\approx 0$)
- **Leptokurtic:** teekha peak, bhaari tails → normal se zyada extreme outliers
- **Platykurtic:** flat peak, halki tails → normal se kam extreme values

Kurtosis risk analysis mein important hai: bhaari tails ka matlab hai ki rare extreme events normal model ki prediction se zyada ho sakte hain.

**Example:** Stock market returns **leptokurtic** hote hain — zyadatar din kuch khaas nahi hota, lekin kabhi-kabhi bahut bada crash ya jump aa jaata hai. Isi liye normal model market risk ko underestimate kar deta hai.

</HindiBox>

### 3.4.8 Symmetric vs Asymmetric Distributions

- **Symmetric Distribution:** the left and right halves mirror each other around the center, so $\text{Mean} = \text{Median} = \text{Mode}$. The normal distribution is the classic example.
- **Asymmetric (Skewed) Distribution:** one tail is longer than the other; mean, median, and mode separate.

Why it matters in practice:

- For **symmetric** data → report $\bar{x}$ and $s$; parametric tests (t-test, ANOVA) are appropriate
- For **asymmetric** data → report Median and IQR; consider transformations ($\log x$, $\sqrt{x}$) or non-parametric tests

<HindiBox>

- **Symmetric Distribution:** left aur right dono halves center ke aas-paas ek dusre ka mirror hote hain, isliye $\text{Mean} = \text{Median} = \text{Mode}$. Normal distribution iska classic example hai.
- **Asymmetric (Skewed) Distribution:** ek tail dusri se lambi hoti hai; mean, median aur mode alag-alag ho jaate hain.

Practically ye kyun matter karta hai:

- **Symmetric** data ke liye → $\bar{x}$ aur $s$ report karo; parametric tests (t-test, ANOVA) sahi rahenge
- **Asymmetric** data ke liye → Median aur IQR report karo; transformations ($\log x$, $\sqrt{x}$) ya non-parametric tests par vichaar karo

**Example:** Students ki heights symmetric hoti hain — Mean + SD sahi hai. Lekin website par users ka "time spent" bahut right-skewed hota hai (zyadatar log kuch second, kuch log ghanton tak) — yahan Median + IQR hi sahi picture dega.

</HindiBox>





