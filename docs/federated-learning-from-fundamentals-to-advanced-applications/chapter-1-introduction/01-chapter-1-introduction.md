---
id: fl-chapter-1
title: Chapter 1 — Introduction to Federated Learning
description: Motivates federated learning from the limits of centralized and distributed machine learning, and introduces its definition, architecture, workflow, and participants.
sidebar_position: 1
---
# Chapter 1 — Introduction to Federated Learning

> **How to read this book.** Every important concept is explained in three layers. First, the **formal academic explanation in English** — definition, mathematics, algorithm, technical considerations — written as it would appear in a university textbook. Immediately after, the same idea **आसान भाषा में**, the way I would explain it standing in front of a class; this is deliberately *not* a word-by-word translation. Finally, wherever it helps, a **real-life example** showing where the idea actually lives in the world. If a concept feels heavy in the first layer, do not stop — the second and third layers exist precisely for that moment.

---

## Learning Objectives

After studying this chapter, the reader should be able to:

1. Formulate machine learning as an optimization problem and identify the one assumption that federated learning removes.
2. Distinguish centralized learning, distributed learning, and federated learning, and justify the distinction technically.
3. State the federated learning objective function and explain the meaning of every symbol in it.
4. Trace one complete round of Federated Averaging, by hand, on a small numerical example.
5. Describe the participants, architectures, and workflow of a federated system.
6. Judge whether federated learning is the correct design choice for a given problem — and recognize when it is not.

---

## Notation Used in This Chapter

| Symbol | Meaning | पढ़िए ऐसे |
|---|---|---|
| $K$ | total number of clients (data owners) | कुल कितने clients हैं |
| $\mathcal{D}_k$ | local dataset held by client $k$ | client $k$ का अपना data |
| $n_k = \lvert\mathcal{D}_k\rvert$ | number of samples at client $k$ | client $k$ के पास कितने examples हैं |
| $n = \sum_k n_k$ | total samples in the federation | सबका मिला-जुला data size |
| $w$ | model parameters (weights) | model की "सीखी हुई" values |
| $w_t$ | global model at round $t$ | server का model, round $t$ पर |
| $w_t^k$ | client $k$'s local model in round $t$ | client $k$ ने locally train करके जो बनाया |
| $\Delta w_k$ | client $k$'s update, $w_t^k - w_t$ | client ने model को कितना बदला |
| $F_k(w)$ | local objective (loss) of client $k$ | client $k$ पर model की गलती |
| $F(w)$ | global objective | पूरी federation पर model की गलती |
| $\eta$ | learning rate | सीखने की step size |
| $E$ | local epochs per round | हर round में client अपना data कितनी बार पढ़ेगा |
| $B$ | local mini-batch size | एक बार में कितने examples |
| $C$ | fraction of clients selected per round | हर round में कितने प्रतिशत clients बुलाए जाएँगे |
| $S_t$ | set of clients selected in round $t$ | round $t$ की cohort |

**आसान भाषा में:** इस table को याद करने की ज़रूरत नहीं है। जब भी आगे कोई equation आए और कोई symbol समझ न आए, यहाँ लौट आइए। Notation एक भाषा है — इसे रटा नहीं जाता, इस्तेमाल करते-करते आ जाती है।

---

## 1.1 Introduction to Machine Learning

### 1.1.1 What is machine learning?

**Formal explanation.** Machine learning (ML) is the study of algorithms that improve their performance on a task by extracting statistical structure from data, rather than by executing rules explicitly written by a programmer. A classical program is a mapping written by a human: the developer specifies the procedure, the machine executes it. Machine learning inverts this. The developer specifies (i) a *family* of candidate functions, (ii) a numerical measure of how wrong a candidate is, and (iii) a search procedure. The **data** then selects the specific function from that family.

Formally, we are given a dataset

$$
\mathcal{D} = \{(x_1, y_1), (x_2, y_2), \dots, (x_n, y_n)\},
$$

where $x_i$ is an input (an image, a sentence, a row of sensor readings) and $y_i$ is the desired output (a label, a number, the next word). We choose a **model** $f_w$ — a function whose behaviour is controlled by a vector of adjustable numbers $w$, called **parameters** or **weights** — and a **loss function** $\ell(\hat{y}, y)$ that returns a small number when the prediction $\hat{y}$ is close to the truth $y$, and a large number when it is far.

**आसान भाषा में:** Traditional programming में हम computer को *तरीका* बताते हैं — "अगर ये हो तो वो करो"। Machine learning में हम तरीका नहीं बताते, हम *उदाहरण* देते हैं। जैसे किसी बच्चे को आप यह नहीं समझाते कि "बिल्ली की मूँछें छह होती हैं और कान त्रिकोण होते हैं" — आप उसे बीस बिल्लियाँ दिखा देते हैं और वह खुद सीख जाता है। Model वही बच्चा है, weights ($w$) उसकी सीखी हुई समझ हैं, और loss उसकी गलती का नंबर है।

**Real-Life Example — Bank का loan department:**
मान लीजिए एक bank को तय करना है कि किसे loan देना है। पुराने तरीके में manager नियम बनाता था: "salary 50,000 से ऊपर हो और CIBIL score 700 से ऊपर हो, तो loan दो।" ये नियम इंसान ने बनाए। Machine learning में bank पिछले दस साल के दो लाख loan records दे देता है — किसने चुकाया, किसने नहीं — और model खुद pattern निकाल लेता है, अक्सर ऐसे patterns भी जो manager ने कभी सोचे ही नहीं थे।

### 1.1.2 Learning as an optimization problem

**Formal explanation.** Nearly all supervised learning can be expressed as **Empirical Risk Minimization (ERM)**. We define the *empirical risk* — the average loss over the training data — as

$$
F(w) \;=\; \frac{1}{n}\sum_{i=1}^{n} \ell\big(f_w(x_i),\, y_i\big),
$$

and training means solving

$$
w^{\star} = \arg\min_{w} F(w).
$$

**Meaning of each symbol:**

- $w$ — the parameters we are allowed to change. This is the *only* thing training modifies.
- $f_w(x_i)$ — the model's prediction for input $x_i$ under the current parameters.
- $\ell(\cdot,\cdot)$ — the penalty for being wrong on one example.
- $\frac{1}{n}\sum$ — the *average* penalty over all $n$ examples. Averaging rather than summing makes the quantity independent of dataset size, so losses from datasets of different sizes remain comparable.
- $\arg\min_w$ — "find the value of $w$ that makes this quantity as small as possible."

The dominant solution method is **Stochastic Gradient Descent (SGD)**. Rather than computing the gradient over all $n$ examples, we sample a small **mini-batch** $\mathcal{B}$ and step opposite to its gradient:

$$
w \;\leftarrow\; w \;-\; \eta \,\nabla_w \frac{1}{\lvert\mathcal{B}\rvert}\sum_{i \in \mathcal{B}} \ell\big(f_w(x_i), y_i\big).
$$

Here $\nabla_w$ is the gradient — the direction in which loss increases fastest — and $\eta$, the **learning rate**, controls how large a step we take in the opposite direction.

**आसान भाषा में:** Loss function को एक पहाड़ी इलाका समझिए, और हमें सबसे नीची घाटी तक पहुँचना है। Gradient बताता है "यहाँ से चढ़ाई किस तरफ़ है"। हम उसकी *उल्टी* दिशा में कदम रखते हैं — यही gradient descent है। $\eta$ तय करता है कि कदम कितना बड़ा हो: बहुत छोटा हुआ तो पहुँचने में उम्र लग जाएगी, बहुत बड़ा हुआ तो घाटी के ऊपर से कूदते रह जाएँगे और कभी नीचे उतरेंगे ही नहीं। "Stochastic" का मतलब सिर्फ़ इतना है कि हर कदम पर पूरा data नहीं देखते — कुछ examples उठाए, अंदाज़ा लगाया, और चल पड़े। अंदाज़ा थोड़ा गलत होता है, पर बहुत तेज़ होता है।

**Worked Example 1.1 — one step of gradient descent, by hand.**

Take the simplest possible model, $f_w(x) = w\cdot x$, with squared error loss $\ell(\hat y, y) = (\hat y - y)^2$. Suppose we have two training examples: $(x_1, y_1) = (2, 6)$ and $(x_2, y_2) = (3, 9)$. Clearly the perfect answer is $w = 3$. Let us deliberately start badly, at $w = 1$, with $\eta = 0.05$.

$$F(w) = \tfrac{1}{2}\big[(2w - 6)^2 + (3w - 9)^2\big]$$
$$F'(w) = (2w-6)\cdot 2 + (3w-9)\cdot 3$$

| Step | $w$ | $F'(w)$ | New $w = w - \eta F'(w)$ |
|---|---|---|---|
| 1 | 1.000 | $(-4)(2) + (-6)(3) = -26.0$ | $1.000 + 1.300 = 2.300$ |
| 2 | 2.300 | $(-1.4)(2) + (-2.1)(3) = -9.1$ | $2.300 + 0.455 = 2.755$ |
| 3 | 2.755 | $(-0.49)(2) + (-0.735)(3) = -3.185$ | $2.755 + 0.159 = 2.914$ |
| 4 | 2.914 | $\approx -1.115$ | $2.970$ |

**आसान भाषा में:** ध्यान दीजिए, हमने कहीं भी "$w = 3$" लिखा ही नहीं। हमने बस बार-बार पूछा "किस तरफ़ जाऊँ?" और छोटा-सा कदम रखा — और चार कदम में हम 1 से 2.97 पर पहुँच गए। यही पूरी deep learning है, बस एक parameter की जगह करोड़ों parameters के साथ, और चार कदम की जगह लाखों कदम।

### 1.1.3 Three properties that matter for this entire book

**Formal explanation.**

1. **Training is iterative, not one-shot.** A model is trained through thousands to millions of small updates. Therefore *anything that slows down a single update slows down the entire run, multiplied by the number of updates.* This is why, later, communication cost will dominate our analysis rather than arithmetic cost.

2. **Model quality is bounded by data.** No algorithm can extract information that is not present in the training set. If a hospital has never recorded a rare disease, no architecture will teach its model to detect that disease.

3. **Classical SGD assumes free access to the entire dataset.** Look carefully at the mini-batch step: it says "sample $\mathcal{B}$ from $\mathcal{D}$". This silently assumes that the whole of $\mathcal{D}$ sits in one place, can be shuffled, and can be sampled uniformly at any moment.

Assumption (3) is invisible in a textbook and enormous in practice. **Federated learning exists because assumption (3) fails in the real world.**

**आसान भाषा में:** इन तीनों में से तीसरी बात सबसे ज़रूरी है और सबसे ज़्यादा नज़रअंदाज़ की जाती है। हर ML किताब लिखती है "randomly एक mini-batch उठाओ" — मानो सारा data एक ही अलमारी में रखा हो। असल दुनिया में वही data पचास करोड़ मोबाइल फ़ोनों में, या बारह अलग-अलग hospitals की locked servers में बिखरा पड़ा है, और आप उसे एक जगह ला ही नहीं सकते — कभी technically, कभी कानूनी रूप से। पूरी किताब का starting point यही एक टूटी हुई मान्यता है।

### 1.1.4 Categories of learning

**Formal explanation.**

| Paradigm | Supervision signal | Typical use |
|---|---|---|
| Supervised learning | Labelled pairs $(x, y)$ | Classification, regression, next-word prediction |
| Unsupervised learning | Structure in $x$ alone | Clustering, dimensionality reduction, anomaly detection |
| Self-supervised learning | Labels manufactured from the data itself | Pretraining of language and vision models |
| Reinforcement learning | Reward signal from an environment | Control, robotics, recommendation, game playing |

> **Common misconception.** Federated learning is *not* a fifth row in this table. This table classifies learning by **what supervision is available**; federated learning classifies by **where the data lives and who owns it**. All four paradigms above can, in principle, be federated.
>
> **आसान भाषा में:** छात्र अक्सर सोचते हैं कि Federated Learning भी supervised और unsupervised की तरह एक "प्रकार" है। ऐसा नहीं है। ये दो अलग सवालों के जवाब हैं। Supervised/unsupervised बताता है *"model को क्या सिखाया जा रहा है"*; federated बताता है *"data कहाँ रखा है और training कहाँ हो रही है"*। दोनों साथ चलते हैं — "federated supervised learning" पूरी तरह सही वाक्य है।

### 1.1.5 The data bottleneck — the central problem of this book

**Formal explanation.** In most high-value application domains, the limiting factor on model quality is neither algorithmic sophistication nor compute; it is **access to representative data**. Critically, that data usually *exists*. It is simply **fragmented** across many independent owners, and legal, commercial, or physical constraints prevent it from being pooled.

This gives us the question that motivates the entire field:

> **Can we train one good model on the union of many private datasets, without ever actually forming that union?**

**आसान भाषा में:** ध्यान दीजिए — समस्या यह नहीं है कि data मौजूद नहीं है। Data भरपूर है। समस्या यह है कि वो बँटा हुआ है और एक जगह लाया नहीं जा सकता। तो सवाल बनता है: क्या हम सबका data "जोड़े बिना" उसका फ़ायदा उठा सकते हैं? इस पूरी किताब का जवाब है — हाँ, और उस तरीके का नाम है Federated Learning.

---

## 1.2 Centralized Machine Learning

### 1.2.1 The centralized pipeline

**Formal explanation.** Centralized machine learning is the conventional pipeline in which data is collected from its points of origin, transported over a network to a single logical repository (a data lake or warehouse), and used for training at that location. The canonical stages are:

**collect → transfer → store → clean and label → train → validate → deploy → monitor**

```
   Sources                Ingest              Central store            Training
 ┌──────────┐          ┌──────────┐          ┌──────────────┐       ┌───────────┐
 │ phones   │ ───┐     │          │          │              │       │  GPU/TPU  │
 │ sensors  │ ───┼───▶ │  ETL /   │ ───────▶ │  data lake / │ ────▶ │  cluster  │
 │ web logs │ ───┤     │ pipeline │          │  warehouse   │       │   (SGD)   │
 │ partners │ ───┘     │          │          │              │       └─────┬─────┘
 └──────────┘          └──────────┘          └──────────────┘             │
                                                                          ▼
         ▲                                                          ┌───────────┐
         └──── RAW DATA travels across the network ────▶            │   model   │
                                                                    │  serving  │
                                                                    └───────────┘
```

The single most important feature of this diagram, for our purposes, is the label on the arrows: **raw data travels**.

**आसान भाषा में:** यह वही तरीका है जो आपने अब तक हर ML course में सीखा है — भले किसी ने इसका नाम "centralized" न बताया हो। सारा data उठाओ, एक server पर डालो, वहीं model train करो। इसे university की central library की तरह समझिए: हर department अपनी किताबें library में जमा कर देता है, और पढ़ने वाला एक ही जगह जाकर सब कुछ पढ़ लेता है।

**Real-Life Example — E-commerce recommendation:**
Amazon या Flipkart जैसी company के पास हर user की browsing और purchase history पहले से ही उनके अपने servers पर आ जाती है। करोड़ों users का data एक ही जगह मौजूद है, इसलिए recommendation model उसी data centre में train हो जाता है। यहाँ centralized learning बिल्कुल सही choice है — data पहले से company के पास है, उस पर उसका कानूनी अधिकार है, और उसे कहीं भेजना ही नहीं पड़ रहा।

### 1.2.2 Why centralized learning became the default

**Formal explanation.**

1. **Statistical convenience.** With all data pooled, mini-batches can be drawn i.i.d. (independent and identically distributed) from the full distribution — exactly the setting in which SGD's convergence guarantees are proved. Theory and practice agree, which is a rare luxury.
2. **Engineering convenience.** One copy of the data, one schema, one place to debug, one place to compute metrics, one access-control policy.
3. **Hardware economics.** Accelerators are expensive and are most efficient when packed densely beside fast storage and high-bandwidth interconnects.
4. **Historical accident.** Cloud storage became cheap at roughly the same time deep learning became effective. "Upload everything now, decide its use later" was, for about a decade, the path of least resistance.

**आसान भाषा में:** Centralized learning इसलिए popular नहीं हुआ कि वो सबसे बेहतर idea था — बल्कि इसलिए कि वो सबसे *आसान* था और उस दौर में उसे रोकने वाला कोई नहीं था। Cloud storage सस्ता था, कानून ढीले थे, और deep learning को data चाहिए था। तीनों बातें एक साथ हो गईं। आगे हम देखेंगे कि इनमें से दो बदल चुकी हैं।

### 1.2.3 The hidden assumptions

**Formal explanation.** Centralized learning quietly assumes four things. Remember these labels — the whole of Section 1.4 is an examination of what happens when each one fails.

| # | Assumption | Fails when… |
|---|---|---|
| **A1** | The organization is *permitted* to hold the raw data | GDPR, HIPAA, DPDP Act, data-residency laws |
| **A2** | Moving the data is cheaper than moving the computation | Petabyte-scale edge data, metered mobile links |
| **A3** | Data owners are *willing* to hand over their data | Competing banks, hospitals, factories |
| **A4** | A single trust domain covers all data sources | Multi-party, multi-jurisdiction collaborations |

**आसान भाषा में:** ये चार शर्तें centralized learning की "fine print" हैं — कोई इन्हें लिखता नहीं, पर सब इन्हें मान कर चलते हैं। जब इनमें से एक भी शर्त टूटती है, तो model गलत नहीं बनता — model बन ही नहीं पाता।

---

## 1.3 Distributed Machine Learning

### 1.3.1 The core idea, and the crucial caveat

**Formal explanation.** As datasets and models outgrew single machines, training itself was parallelized across many workers. This is **distributed machine learning**.

One point must be understood before anything else, because it is the single most common confusion in this subject:

> **Distributed learning distributes the *computation*. It does not decentralize the *data ownership*.**

The data in a distributed training job remains centrally owned and centrally controlled. It has merely been **sharded** across machines inside one data centre, by one organization, deliberately, for speed. If the operator wished, it could pull every shard back together tomorrow morning.

**आसान भाषा में:** यहाँ बहुत ध्यान दीजिए, क्योंकि exam में और interview में — दोनों जगह यही सवाल पूछा जाता है। Distributed और Federated, दोनों में काम कई मशीनों में बँटता है, इसलिए लोग इन्हें एक समझ लेते हैं। पर फ़र्क़ *मालिकाना हक़* का है। Distributed learning में data पहले से ही company का है — company ने खुद उसे सौ मशीनों में सिर्फ़ इसलिए बाँटा कि काम जल्दी हो जाए। Federated learning में data कभी company के पास आया ही नहीं — वो दूसरों का है और दूसरों के पास ही रहेगा।

एक analogy याद रखिए:
- **Distributed** = University को 10,000 copies जाँचनी हैं, तो उसने खुद 50 teachers में बाँट दीं। Copies University की ही हैं।
- **Federated** = 50 अलग-अलग colleges के पास अपनी-अपनी copies हैं। कोई किसी को copy नहीं देगा, फिर भी सब मिलकर एक common marking scheme तैयार करना चाहते हैं।

### 1.3.2 Data parallelism

**Formal explanation.** The dataset is partitioned across $M$ workers, and each worker holds a **complete replica** of the model. In each step:

1. Each worker computes a gradient $g_m$ on its own shard.
2. Gradients are averaged across all workers.
3. Every replica applies the same averaged update, so all replicas remain identical.

$$
g \;=\; \frac{1}{M}\sum_{m=1}^{M} g_m, \qquad w \leftarrow w - \eta \, g
$$

Because the shards were produced by *randomly partitioning a pooled dataset*, each worker's shard is an i.i.d. sample from the same distribution. **This is precisely the property that federated learning cannot rely on**, and its loss is the source of most of the difficulty in later chapters.

**आसान भाषा में:** Data parallelism में model की एक copy हर मशीन पर है और data बँटा हुआ है। हर मशीन अपने हिस्से से gradient निकालती है, सबका average ले लिया जाता है, और सब वही एक update लगा लेती हैं — इसलिए हर मशीन पर model हमेशा एक जैसा रहता है। सबसे ज़रूरी बात: data *randomly* बाँटा गया था, इसलिए हर मशीन के हिस्से में हर तरह का data थोड़ा-थोड़ा पहुँचा। Federated learning में यह सुविधा नहीं मिलेगी — वहाँ हर client के पास सिर्फ़ *उसकी अपनी* तरह का data होगा। इसी एक फ़र्क़ से आगे के सारे algorithms बदल जाते हैं।

### 1.3.3 Model parallelism

**Formal explanation.** When a model does not fit into the memory of a single device, the *model itself* is split: different layers (**pipeline parallelism**) or different slices of a weight tensor (**tensor parallelism**) reside on different devices, and intermediate activations are transmitted between them. Modern large language model training combines data, pipeline, and tensor parallelism simultaneously.

**आसान भाषा में:** अगर model इतना बड़ा है कि एक GPU की memory में समाता ही नहीं, तो model को ही काटकर अलग-अलग GPUs पर रख दिया जाता है — जैसे एक लंबी assembly line जिसमें हर station का काम अलग है। ध्यान दीजिए, यहाँ मशीनों के बीच *data* नहीं जाता, बल्कि बीच के calculations (activations) जाते हैं।

### 1.3.4 Coordination topologies

**Formal explanation.**

| Topology | How it works | Trade-off |
|---|---|---|
| **Parameter server** | One or more server nodes hold the authoritative parameters; workers pull parameters and push gradients | Simple; the server can become a bandwidth bottleneck |
| **AllReduce (ring/tree)** | Workers exchange gradients peer-to-peer in a structured pattern until all hold the same sum | No central bottleneck; standard in modern data centres |
| **Synchronous** | Wait for every worker at each step | Deterministic; sensitive to stragglers |
| **Asynchronous** | Apply updates as they arrive | Fast; suffers from stale gradients |

**आसान भाषा में:** Parameter server ऐसा है जैसे class में एक monitor हो — सब उसी को अपना काम देते हैं और उसी से नया काम लेते हैं; monitor busy हो जाए तो पूरी class रुक जाती है। AllReduce ऐसा है जैसे बच्चे गोल घेरे में बैठकर आपस में ही चीज़ें आगे बढ़ाते जाएँ — कोई monitor नहीं, इसलिए कोई bottleneck भी नहीं। आगे आप देखेंगे कि Federated learning ज़्यादातर parameter-server जैसा ढाँचा अपनाता है, पर बिल्कुल अलग कारणों से — speed के लिए नहीं, coordination और trust के लिए।

### 1.3.5 The operating environment — and why it matters

**Formal explanation.** Data-centre distributed training assumes: tens to thousands of *homogeneous* workers; dedicated hardware; interconnects of 10–400 Gbps; near-zero failure probability within a step; workers that are always available; and shards that are balanced and i.i.d.

Federated learning assumes essentially the **negation of every item on that list**. Its algorithms differ not because researchers wanted novelty, but because every convenient assumption was withdrawn. Section 1.15 makes this comparison precise.

**आसान भाषा में:** ऊपर की list एक बार और पढ़िए, और हर point के आगे मन में "उल्टा" लिख दीजिए — बस, वही Federated Learning का माहौल है। एक जैसी मशीनें → हर तरह के अलग-अलग फ़ोन। तेज़ network → धीमा mobile data। कोई fail नहीं होता → आधे बीच में गायब हो जाते हैं। बराबर बँटा data → किसी के पास पाँच examples, किसी के पास पाँच लाख। इसीलिए वहाँ नए algorithms गढ़ने पड़े।

---

## 1.4 Limitations of Centralized Learning

We now examine, one by one, how each assumption A1–A4 of Section 1.2.3 breaks in practice.

### 1.4.1 Privacy and confidentiality *(breaks A1)*

**Formal explanation.** Raw training data frequently contains personal information: messages typed, photographs taken, locations visited, diagnoses received, transactions performed. Centralization creates a permanent, concentrated, and highly attractive attack target: a breach of a central repository exposes *every* contributor simultaneously. Furthermore, data copying is irreversible — once a record has been transferred it cannot be un-transferred, and its future use can no longer be fully controlled by the person it describes.

**आसान भाषा में:** करोड़ों लोगों का निजी data एक central server पर रखना ऐसा है जैसे पूरे शहर के घरों की चाबियाँ एक ही अलमारी में रख देना। अलमारी कितनी भी मज़बूत हो, एक बार टूटी तो पूरा शहर खुल गया। और data की एक ख़ास बात है — चोरी हुई चीज़ वापस नहीं ली जा सकती। पैसा वापस मिल सकता है, पर एक बार leak हुई medical report कभी वापस नहीं आती।

**Real-Life Example — Fitness app:**
सोचिए एक fitness app आपकी heart rate, नींद और चलने-फिरने का data अपने server पर भेजता है ताकि एक बेहतर health model बना सके। Model तो अच्छा बन जाएगा, लेकिन अब आपकी बीमारी का संकेत देने वाला data किसी और की मशीन पर पड़ा है। आपको यह भी नहीं पता कि कल वो company बिक गई तो वो data किसके हाथ जाएगा।

### 1.4.2 Regulation and legal constraints *(breaks A1)*

**Formal explanation.** Data-protection law increasingly restricts the collection, transfer, and retention of personal data.

| Regulation | Jurisdiction | Key constraint relevant to ML |
|---|---|---|
| **GDPR** | European Union | Purpose limitation, data minimization, restrictions on cross-border transfer, right to erasure |
| **HIPAA** | United States | Strict handling rules for protected health information |
| **DPDP Act, 2023** | India | Consent-based processing, purpose limitation, duties of data fiduciaries |
| **LGPD** | Brazil | Broadly GDPR-aligned |
| **PIPL** | China | Consent, localization, approval for cross-border transfer |

The principle of **data minimization** — collect only what is necessary, for a stated purpose, and retain it only as long as needed — directly contradicts the "collect everything in case it becomes useful" posture of the previous decade. Several regimes additionally impose **data residency**, which can make cross-border pooling outright illegal regardless of consent.

**आसान भाषा में:** पहले data इकट्ठा करना सिर्फ़ एक technical फ़ैसला था; अब वो एक कानूनी ज़िम्मेदारी है। "Data minimization" का सीधा मतलब है — जितना ज़रूरी है उतना ही लो, जिस काम के लिए लिया है उसी में लगाओ, और काम ख़त्म होते ही हटा दो। ध्यान दीजिए, यह नियम centralized ML के मूल मंत्र "सब जमा कर लो, बाद में देखेंगे" के बिल्कुल उल्टा है।

**Real-Life Example — Cross-border hospital collaboration:**
Germany का एक hospital और India का एक hospital मिलकर cancer-detection model बनाना चाहते हैं। दोनों तैयार हैं, दोनों के डॉक्टर उत्साहित हैं। पर German patient का data GDPR के तहत बिना विशेष कानूनी प्रक्रिया के देश से बाहर भेजा ही नहीं जा सकता। यहाँ technical दिक्कत शून्य है — दिक्कत पूरी तरह कानूनी है। और centralized ML के पास इसका कोई जवाब नहीं है।

### 1.4.3 Communication and storage cost *(breaks A2)*

**Formal explanation.** Edge devices collectively generate far more data than can be uploaded to any data centre. A fleet of autonomous vehicles or a network of cameras may produce terabytes per day per site, most of it redundant. Uploading raw data consumes metered bandwidth — frequently paid for by the user — and storing it consumes capacity paid for by the operator, often to train on a small fraction of what was stored.

**Worked Example 1.2 — the asymmetry, in numbers.**

Consider 1,000,000 smartphones, each holding 500 MB of relevant local data, and a model with 8 million parameters stored as 32-bit floats.

| Quantity | Calculation | Result |
|---|---|---|
| Raw data if centralized | $10^6 \times 500$ MB | **500 TB** |
| Size of the model | $8\times10^6 \times 4$ bytes | **32 MB** |
| Uplink for federated training (200 clients/round, 900 rounds) | $200 \times 900 \times 32$ MB | **≈ 5.76 TB** |
| Downlink (same) | — | **≈ 5.76 TB** |
| Total federated traffic | — | **≈ 11.5 TB** |
| Saving | $500 / 11.5$ | **≈ 43× less traffic** |

With 8-bit quantization of uplink updates, the advantage grows beyond $100\times$.

**आसान भाषा में:** इस calculation का निचोड़ एक ही वाक्य में है: **model, data से बहुत छोटा होता है।** 500 TB data भेजने के बजाय बार-बार 32 MB का model भेजना कहीं सस्ता है, चाहे आप उसे सैकड़ों बार भेजें। यह federated learning की सबसे सीधी और सबसे practical दलील है — और ध्यान दीजिए, यह दलील privacy से बिल्कुल अलग है और अपने आप में मज़बूत है। यानी अगर privacy की कोई चिंता न भी हो, तब भी कई बार federated learning ही समझदारी है।

### 1.4.4 Latency and connectivity *(breaks A2)*

**Formal explanation.** Round-tripping data to a cloud service is unacceptable when a decision must be made within milliseconds (collision avoidance, industrial safety interlocks, real-time control), or when connectivity is intermittent or absent (rural deployments, ships, mines, underground facilities, spacecraft).

**आसान भाषा में:** एक self-driving car के सामने अचानक बच्चा आ जाए — क्या वो cloud से पूछेगी कि "brake लगाऊँ या नहीं"? वहाँ 300 milliseconds का network delay भी जानलेवा है। और mining site या समुद्र में जहाज़ पर तो network होता ही नहीं। ऐसी जगहों पर model को *वहीं* होना पड़ेगा जहाँ फ़ैसला लेना है।

### 1.4.5 Data silos and commercial risk *(breaks A3 and A4)*

**Formal explanation.** Hospitals, banks, and manufacturers each hold data whose *combination* would produce a substantially better model than any individual party's data alone. They nonetheless do not pool it, because the data is a competitive asset, because liability for its exposure is unattractive, because existing contracts and consent terms prohibit onward sharing, and because no party wishes to hand a rival an advantage.

The result is a landscape of many mediocre models where a single strong model could exist. This is the **isolated data island** (or **data silo**) problem, and it is the primary motivation for *cross-silo* federated learning.

**आसान भाषा में:** यह समस्या technical नहीं, इंसानी है। तीनों bank जानते हैं कि अगर सबका fraud data मिल जाए तो सबका fraud detection कहीं बेहतर हो जाएगा। फिर भी कोई पहला कदम नहीं उठाता, क्योंकि data देने का मतलब है अपने ग्राहकों की जानकारी प्रतिद्वंद्वी को दे देना। नतीजा: तीनों के पास कमज़ोर model रह जाते हैं, और fraud करने वाला तीनों को अलग-अलग चूना लगाता रहता है। इसी को "data islands" कहते हैं — हर कोई अपने-अपने टापू पर अकेला बैठा है, और सबका नुकसान हो रहा है।

**Real-Life Example — Rare disease:**
Dehradun के एक hospital में किसी दुर्लभ बीमारी के सिर्फ़ 12 मरीज़ हैं। 12 examples से कोई model नहीं बनता। पूरे देश के 200 hospitals में मिलाकर 4,000 मरीज़ हैं — इतने से अच्छा model बन सकता है। पर वो 4,000 records कभी एक जगह नहीं आ सकते। यह "data की कमी" नहीं है; यह "data के बिखराव" की समस्या है, और दोनों का इलाज अलग है।

### 1.4.6 Further costs

**Formal explanation.**

- **Single point of failure** — for both availability and security.
- **Data gravity** — once centralized, data becomes expensive to move, locking in vendors and architectures.
- **Loss of context in labels** — many valuable labels exist only at the edge, in context (whether a keyboard suggestion was accepted, whether a photograph was kept, whether an alert was dismissed). Stripping and uploading raw data often destroys or degrades this signal.
- **Energy and carbon** — of transporting and storing data that is ultimately never used.

**आसान भाषा में:** तीसरे point पर ज़रा रुकिए, क्योंकि यह सबसे कम समझा जाता है। कुछ labels सिर्फ़ *उसी पल* और *उसी जगह* मौजूद होते हैं। जब आपने keyboard के सुझाए शब्द को छुआ — वो एक label था, जो उसी वक़्त उसी फ़ोन पर बना। उसे server तक ले जाने की कोशिश में या तो privacy टूटती है, या context खो जाता है। Federated learning उस label को वहीं इस्तेमाल कर लेता है जहाँ वो पैदा हुआ था।

> **Common misconception.** Students often conclude from this section that "centralized learning is bad." That is wrong. Centralized learning is *excellent* whenever A1–A4 hold — it is simpler, faster, and more accurate. This section does not argue that centralization is bad; it argues that centralization has **preconditions**, and that a large and growing class of valuable problems does not satisfy them.
>
> **आसान भाषा में:** यह मत सोचिए कि "centralized learning ख़राब है और federated अच्छा"। जहाँ data आपका अपना है और आराम से एक जगह आ सकता है, वहाँ centralized ही सबसे अच्छा है — आसान भी, तेज़ भी, accuracy भी ज़्यादा। Federated learning कोई upgrade नहीं है; वो उन हालात के लिए बना एक हल है जहाँ centralized तरीका मुमकिन ही नहीं।

---

## 1.5 Motivation for Federated Learning

### 1.5.1 The one-line insight

**Formal explanation.** The observation that resolves the tension of Section 1.4 is remarkably simple:

> **A model is much smaller than the data that trains it, and only the model needs to travel.**

A modern on-device model may be a few megabytes; the data used to train it across a user population is measured in petabytes. Therefore, instead of moving the data to the code, we move the code to the data:

> Send the current model to where the data lives, train it locally on that data, and send back only what was *learned* — an update — never the data itself.

**आसान भाषा में:** पूरे field का जन्म एक बहुत सीधी सोच से हुआ। पहले हम data को model के पास लाते थे। अब हम model को data के पास भेजेंगे। सोचिए — एक professor को दस शहरों के छात्रों को पढ़ाना है। दो रास्ते हैं: या तो सारे छात्रों को एक शहर में बुला लो (महँगा, और कई छात्र आ ही नहीं सकते), या professor खुद दस शहर घूम आए (सस्ता, और सब अपनी जगह पर बने रहें)। Federated learning दूसरा रास्ता है — और model, छात्रों की भीड़ से कहीं छोटा और हल्का है।

### 1.5.2 Why it became possible when it did

**Formal explanation.** Four independent trends converged in the mid-2010s:

| Trend | What changed | Why it mattered |
|---|---|---|
| **Capable edge hardware** | Smartphones and gateways gained enough compute for on-device *training*, not just inference | Local SGD became feasible on a phone |
| **Regulatory pressure** | Data minimization moved from good practice to legal duty | Centralization acquired a legal cost |
| **Institutional demand** | Hospitals and banks wanted pooled-data benefits without pooling | Created the cross-silo market |
| **Algorithmic insight** | Averaging models trained locally for *several* steps converges well enough to be practical over slow, unreliable links | Made the round count small enough to be affordable |

The fourth item is the technical breakthrough. It was published by **McMahan and colleagues (2016–2017)** under the name **Federated Averaging (FedAvg)** and deployed for next-word prediction in Google's Gboard keyboard. Institution-to-institution work in healthcare and finance followed, and the taxonomy of **horizontal, vertical, and federated transfer learning** proposed by **Yang et al. (2019)** broadened the framing to cross-organization settings.

**आसान भाषा में:** ध्यान दीजिए, इनमें से सिर्फ़ एक बात technical है, बाक़ी तीन दुनिया के बदलने की हैं। यह field सिर्फ़ इसलिए पैदा नहीं हुई कि किसी ने एक चतुर algorithm खोज लिया — बल्कि इसलिए कि फ़ोन ताक़तवर हो गए, कानून सख़्त हो गए, संस्थाओं को ज़रूरत महसूस हुई, *और* तभी एक ऐसा algorithm भी मिल गया जो इन हालात में चल सके। चारों में से कोई एक भी न होता, तो federated learning कागज़ पर ही रह जाता।

### 1.5.3 The design principle

**Formal explanation.** The principle can be stated in one line: **focused collection and minimized data exposure** — compute on the data where it is generated, and transmit only aggregated, task-specific results that are used for their stated purpose and then discarded.

**आसान भाषा में:** इस वाक्य को याद रखिए, क्योंकि आगे हर design फ़ैसला इसी से निकलेगा: *जितना ज़रूरी है उतना ही भेजो, सिर्फ़ उसी काम के लिए भेजो, और काम होते ही मिटा दो।* यही सोच बाद में secure aggregation और differential privacy जैसी तकनीकों तक ले जाएगी।

**Real-Life Example — Gboard (the origin story):**
Google के keyboard को यह सीखना था कि लोग अगला शब्द क्या टाइप करेंगे। सबसे अच्छा data वही था जो लोग असल में टाइप करते हैं — यानी सबसे निजी data जो सोचा जा सकता है: messages, passwords के आसपास का text, बीमारी और पैसे की बातचीत। इसे server पर उठाना न कानूनी रूप से सही था, न नैतिक रूप से। तो Google ने उल्टा किया — model को फ़ोन पर भेजा, रात को जब फ़ोन charging पर और idle था तब उसे वहीं train किया, और सिर्फ़ model का update वापस लिया। आपका टाइप किया एक अक्षर भी server तक नहीं गया, फिर भी keyboard सबसे सीख गया। यह इस field का पहला बड़ा deployment था।

---

## 1.6 Definition of Federated Learning

### 1.6.1 Working definition

**Formal explanation.**

> **Federated learning** is a machine learning setting in which multiple entities (**clients**) collaboratively train a shared model under the coordination of a central server or protocol, while the training data remains **decentralized** at the clients and is never transmitted to the server or to other clients. Instead of raw data, clients transmit **focused updates** intended only for immediate aggregation.

Four conditions must **all** hold for a system to be called federated:

| # | Condition | Meaning |
|---|---|---|
| **C1** | **Data locality** | Raw data never leaves its owner |
| **C2** | **Collaboration** | Two or more parties contribute to a model none could train as well alone |
| **C3** | **Coordination** | A protocol governs how contributions are combined |
| **C4** | **Update minimization** | Only information needed for the current aggregation is sent, and used only for that |

Two negative examples clarify the boundary. A system that *collects* raw data and then trains it in a distributed manner is **not** federated (violates C1). A system that ships a pretrained model to devices for *inference only* is **not** federated either (violates C2 — there is no learning at the edge).

**आसान भाषा में:** परिभाषा को इन चार शर्तों के रूप में याद रखिए, क्योंकि exam में "क्या यह federated है?" वाले सवाल इन्हीं से हल होते हैं। सबसे ज़रूरी C1 है — कच्चा data अपनी जगह से हिलना नहीं चाहिए। अगर data एक बार भी server पर पहुँच गया, चाहे बाद में उसे बाँट कर ही train क्यों न किया जाए, वो federated नहीं है। और सिर्फ़ फ़ोन पर model चलाना (जैसे offline translation app) भी federated नहीं है — वहाँ model सीख नहीं रहा, सिर्फ़ जवाब दे रहा है।

### 1.6.2 The formal objective

**Formal explanation.** Let client $k \in \{1,\dots,K\}$ hold a local dataset $\mathcal{D}_k$ of size $n_k$, with $n = \sum_{k=1}^{K} n_k$. The **local objective** of client $k$ is its own empirical risk:

$$
F_k(w) \;=\; \frac{1}{n_k}\sum_{i \in \mathcal{D}_k} \ell\big(f_w(x_i), y_i\big).
$$

The **federated objective** is the weighted average of all local objectives:

$$
\boxed{\;\min_{w}\; F(w) \;=\; \sum_{k=1}^{K} p_k \, F_k(w), \qquad p_k = \frac{n_k}{n}, \qquad \sum_{k=1}^{K} p_k = 1\;}
$$

**Meaning of each symbol:**

- $F_k(w)$ — how badly the model performs on client $k$'s data alone.
- $p_k = n_k/n$ — client $k$'s share of the total data. A client with more data gets proportionally more influence.
- $F(w)$ — the overall objective we wish to minimize, even though no single party can ever evaluate it directly.

**A crucial observation.** If all local datasets were pooled and shuffled, $F(w)$ would be *exactly* the ordinary empirical risk of the pooled dataset. **The target is identical; only the access pattern is restricted.**

$$
\sum_{k=1}^{K}\frac{n_k}{n}\cdot\frac{1}{n_k}\sum_{i\in\mathcal{D}_k}\ell_i \;=\; \frac{1}{n}\sum_{k=1}^{K}\sum_{i\in\mathcal{D}_k}\ell_i \;=\; \frac{1}{n}\sum_{i=1}^{n}\ell_i
$$

All the difficulty of federated learning comes from optimizing $F$ while being able to evaluate only one $F_k$ at a time, on a device that is slow, sometimes offline, and holding data drawn from a distribution unlike every other client's.

**आसान भाषा में:** इस equation का सबसे बड़ा सबक यह है कि हम कोई *नया* लक्ष्य नहीं बना रहे। जो loss centralized training में कम करनी थी, बिल्कुल वही loss यहाँ भी कम करनी है — बस अब हम पूरे data को एक साथ देख नहीं सकते, एक बार में एक ही client का हिस्सा देख सकते हैं। यानी मंज़िल वही है, रास्ता बदल गया है। और आगे की सारी मुश्किलें रास्ते की हैं, मंज़िल की नहीं।

$p_k$ को ऐसे समझिए: यह हर client का "वोट का वज़न" है। जिसके पास ज़्यादा data, उसकी बात ज़्यादा भारी। यह न्यायसंगत लगता है — और आगे section 1.12 में हम देखेंगे कि यही "न्याय" कभी-कभी अन्याय भी बन जाता है।

**Worked Example 1.3 — computing $F(w)$ for three hospitals.**

Three hospitals hold $n_1 = 6000$, $n_2 = 3000$, $n_3 = 1000$ patient records, so $n = 10{,}000$. For a given model $w$, the local losses measured are $F_1(w) = 0.20$, $F_2(w) = 0.50$, $F_3(w) = 0.80$.

Weights: $p_1 = 0.6,\; p_2 = 0.3,\; p_3 = 0.1$.

$$F(w) = 0.6(0.20) + 0.3(0.50) + 0.1(0.80) = 0.12 + 0.15 + 0.08 = \mathbf{0.35}$$

Note that the *unweighted* average would have been $(0.20+0.50+0.80)/3 = 0.50$ — considerably worse.

**आसान भाषा में:** दोनों नंबरों का फ़र्क़ ध्यान से देखिए: 0.35 बनाम 0.50. Weighted average (0.35) कहता है "model ठीक-ठाक है", क्योंकि सबसे बड़े hospital पर वो अच्छा चल रहा है। Unweighted average (0.50) कहता है "model कमज़ोर है", क्योंकि छोटे hospital पर वो बुरी तरह फ़ेल है। दोनों सच हैं — बस सवाल यह है कि आप किसका भला देखना चाहते हैं। FedAvg पहला वाला चुनता है, और यही आगे fairness की बहस की जड़ है।

### 1.6.3 Categories by data partitioning

**Formal explanation.** Federated learning is classified by *how* data is split across parties.

| Category | Shared across parties | Differs across parties | Example |
|---|---|---|---|
| **Horizontal FL** (sample-partitioned) | Feature space | Samples (users) | Millions of phones with the same feature schema |
| **Vertical FL** (feature-partitioned) | Samples (overlapping users) | Feature space | A bank and an e-commerce firm holding *different attributes of the same customers* |
| **Federated Transfer Learning** | Little of either | Both | Two institutions in different regions and different domains |

```
       HORIZONTAL FL                        VERTICAL FL
   (same columns, different rows)   (same rows, different columns)

   features →                        features →
   ┌───────────────┐                 ┌───────┬───────┐
 s │ ███ Party A   │               s │ ███   │ ▒▒▒   │
 a │ ███           │               a │ ███ A │ ▒▒▒ B │
 m ├───────────────┤               m │ ███   │ ▒▒▒   │
 p │ ▒▒▒ Party B   │               p │ ███   │ ▒▒▒   │
 l │ ▒▒▒           │               l └───────┴───────┘
 e └───────────────┘                e   same customers,
 s   same schema,                   s   different data about them
     different users
```

**आसान भाषा में:** इसे एक Excel sheet की तरह सोचिए। Rows = लोग, Columns = उनकी जानकारी।

- **Horizontal FL** — sheet को *आड़ा* काटा गया है। सबके पास वही columns हैं, पर अलग-अलग लोग हैं। जैसे दस लाख फ़ोन — हर फ़ोन में एक ही तरह की जानकारी है, बस अलग user की।
- **Vertical FL** — sheet को *खड़ा* काटा गया है। लोग वही हैं, पर हर party के पास उनकी अलग जानकारी है। जैसे एक ही ग्राहक की salary bank के पास है और shopping की आदत Amazon के पास।
- **Federated Transfer Learning** — न लोग एक जैसे, न जानकारी। सबसे मुश्किल case.

**Real-Life Example — Vertical FL:**
एक bank के पास आपकी income, EMI और credit history है। एक e-commerce company के पास आपकी shopping की आदत, return rate और payment behaviour है। दोनों के पास *आप ही* हैं, पर आपकी अलग-अलग तस्वीरें। अगर दोनों तस्वीरें जुड़ जाएँ तो loan default का बहुत बेहतर अंदाज़ा लग सकता है — पर कोई भी अपना data दूसरे को नहीं देगा। यही Vertical FL की जगह है। ध्यान दीजिए, यहाँ पहले यह पता लगाना पड़ेगा कि "दोनों के पास कौन-कौन से common ग्राहक हैं" — वो भी बिना नाम बताए। इसे *private entity alignment* कहते हैं और यह अपने आप में एक cryptographic समस्या है।

Unless stated otherwise, the default setting in this book is **horizontal FL**. Vertical FL is treated separately because it requires entity alignment and encrypted intermediate computation rather than simple model averaging.

---

## 1.7 Characteristics of Federated Learning

The following properties distinguish federated learning from data-centre distributed training. Each one is responsible for at least one algorithm in later chapters, so it is worth understanding *why* each is a problem, not merely that it exists.

### 1.7.1 Non-IID data (statistical heterogeneity) — the hardest problem

**Formal explanation.** Client datasets are **not** independent and identically distributed. Each client's data is generated by one user, one hospital, or one machine, and therefore reflects that source's idiosyncrasies. Non-IID-ness takes several distinct forms:

| Type | What differs | Example |
|---|---|---|
| **Label skew** | $P_k(y)$ | One user photographs cats; another photographs documents |
| **Feature skew** | $P_k(x \mid y)$ | The same digit in different handwriting; the same disease on different scanners |
| **Concept drift / shift** | $P_k(y \mid x)$ | Identical input, different label — sarcasm in sentiment analysis |
| **Quantity skew** | $n_k$ | One client has 5 samples, another has 500,000 |
| **Temporal skew** | availability $\times$ distribution | Clients online at 3 a.m. are not a random sample of clients |

**Consequence — client drift.** A locally optimal model is not globally optimal. Local training pulls each client's weights toward *its own* optimum, and the average of these drifted models can be worse than an average of their gradients would have been. This phenomenon is called **client drift**, and it is the central statistical problem of federated optimization.

**आसान भाषा में:** IID का मतलब है — हर हिस्सा पूरे का सही नमूना हो। Centralized learning में data randomly बँटता है, इसलिए यह अपने आप सच हो जाता है। Federated learning में data "कुदरती" तरीके से बँटा है — मेरे फ़ोन में मेरी ज़िंदगी है, आपके फ़ोन में आपकी। ये कभी एक जैसे नहीं हो सकते।

Client drift को ऐसे समझिए: दस लोगों को एक साथ एक जगह पहुँचना है, पर हर एक को अलग-अलग नक़्शा दिया गया है। हर आदमी अपने नक़्शे के हिसाब से पूरे दिन चलता है और शाम को सब मिलते हैं। अब सबकी जगहों का "average" निकाला जाए — तो वो जगह शायद ऐसी होगी जहाँ किसी को नहीं जाना था, शायद किसी नदी के बीच में। अगर सब हर *दस कदम* पर मिलकर सलाह कर लेते तो बेहतर होता, पर बार-बार मिलना (यानी communication) बहुत महँगा है। यही federated learning की सबसे बड़ी उलझन है — और आगे FedProx, SCAFFOLD जैसे algorithms इसी को सुलझाने के लिए बने हैं।

**Real-Life Example — Handwriting recognition:**
एक user हमेशा अंग्रेज़ी में लिखता है, दूसरा देवनागरी में, तीसरा सिर्फ़ नंबर लिखता है। तीनों के फ़ोन पर एक ही model भेजा गया। एक रात की training के बाद पहला model अंग्रेज़ी में माहिर हो गया, दूसरा देवनागरी में, तीसरा नंबरों में। अब तीनों का सीधा average लीजिए — जो model बनेगा वो शायद तीनों में से किसी में भी अच्छा न हो। यह real problem है, कोई theoretical चिंता नहीं।

### 1.7.2 Unbalanced data

**Formal explanation.** Sample counts follow heavy-tailed distributions. A handful of clients may hold as much data as thousands of others combined. This raises both an optimization question (how to weight contributions) and a fairness question (whose data actually shapes the model).

**आसान भाषा में:** Data कभी बराबर नहीं बँटा होता। एक बड़ा शहर का hospital साल में 50,000 मरीज़ देखता है, एक कस्बे का clinic 300. दोनों federation में बराबर के सदस्य हैं, पर उनका असर बराबर नहीं होगा। यह सिर्फ़ गणित की बात नहीं, नैतिकता की भी है।

### 1.7.3 Massive scale and partial participation

**Formal explanation.** A cross-device federation may have $10^6$–$10^{10}$ potential clients, but only a small fraction $C$ — frequently well under 1% — participates in any given round, and typically only when the device is idle, charging, and on an unmetered network. Clients are effectively **stateless**: most will participate once or never, so algorithms cannot assume a client remembers anything from a previous round.

**आसान भाषा में:** सोचिए एक ऐसी class जिसमें दस करोड़ छात्र नामांकित हैं, पर हर lecture में सिर्फ़ सौ आते हैं — और हर बार अलग सौ। आप किसी छात्र से यह नहीं कह सकते कि "पिछले lecture का homework लाना" — क्योंकि वो पिछले lecture में था ही नहीं, और शायद अगले में भी नहीं होगा। इसीलिए federated algorithms में client के पास कोई "memory" नहीं मानी जाती। जो भी हिसाब रखना है, server को रखना है।

### 1.7.4 Limited and expensive communication

**Formal explanation.** Uplink bandwidth is scarce, metered, and asymmetric — uplink is often several times slower than downlink. **Communication, not computation, is the dominant cost.** This *inverts* the usual optimization trade-off: it becomes worthwhile to perform *more* local computation in order to reduce the *number* of communication rounds.

**आसान भाषा में:** यह बात केंद्रीय है और इसे उल्टा समझ लेना बहुत आसान है। Data centre में गणित महँगा है और बातचीत सस्ती — इसलिए वहाँ हर कदम पर बात कर लो। Federated learning में उल्टा है: गणित सस्ता है (फ़ोन रात भर वैसे भी खाली पड़ा है, charging पर है) और बातचीत महँगी (user का mobile data, battery, और धीमा network)। इसलिए यहाँ नियम बनता है — *"जितना हो सके फ़ोन पर ही काम कर लो, बात कम से कम करो।"* FedAvg का पूरा design इसी एक वाक्य से निकला है।

### 1.7.5 Systems heterogeneity

**Formal explanation.** Clients differ in CPU/GPU capability, memory, battery, thermal budget, and network quality. Some will be slow (**stragglers**), some will drop out mid-round, and some will never report back. Protocols must tolerate arbitrary, silent failure.

**आसान भाषा में:** आपकी federation में एक तरफ़ नया flagship फ़ोन है और दूसरी तरफ़ पाँच साल पुराना 2 GB RAM वाला फ़ोन। दोनों को एक ही काम दिया गया है। अगर server सबका इंतज़ार करेगा, तो पूरी training सबसे धीमे फ़ोन की रफ़्तार से चलेगी — इसे straggler problem कहते हैं। और कुछ फ़ोन तो बीच में ही चले जाएँगे: user ने charger निकाल दिया, या lift में network चला गया। Protocol को इन सब को सामान्य मानकर चलना है, exception मानकर नहीं।

### 1.7.6 Privacy as a first-class constraint

**Formal explanation.** Keeping data local is a necessary but **not sufficient** privacy guarantee. Model updates leak information: gradients can be inverted to reconstruct training samples (**gradient inversion**), and the membership of a particular record can sometimes be inferred (**membership inference**). Federated systems therefore compose data locality with additional mechanisms — secure aggregation, differential privacy, trusted execution environments — which are treated in later chapters.

**आसान भाषा में:** यहाँ सबसे बड़ी गलतफ़हमी बैठती है, इसलिए साफ़ कह देता हूँ: **data को local रखना अपने आप में privacy की गारंटी नहीं है।** आप data नहीं भेज रहे, ठीक है — पर आप जो update भेज रहे हैं, वो उसी data से बना है, इसलिए उसमें data की छाप मौजूद है। शोध ने दिखाया है कि छोटे batch से बने gradient से असली तस्वीर तक वापस बनाई जा सकती है। इसलिए federated learning privacy की *शुरुआत* है, अंत नहीं — ऊपर से secure aggregation और differential privacy जैसी परतें चढ़ानी पड़ती हैं।

### 1.7.7 Limited observability

**Formal explanation.** The engineer cannot inspect the training data. Standard practice — plotting a histogram, eyeballing mislabelled examples, debugging a bad batch — is unavailable. Data validation, debugging, and evaluation must themselves be performed *federatedly*, through aggregate statistics only.

**आसान भाषा में:** यह practical दिक्कत textbooks में कम लिखी जाती है, पर असल project में सबसे ज़्यादा परेशान करती है। Model की accuracy गिर रही है — centralized setting में आप data खोलकर देख लेते: शायद labels उलटे लग गए, शायद images corrupt हैं। Federated में आप data देख ही नहीं सकते। आप एक ऐसे डॉक्टर हैं जिसे मरीज़ को छूने की इजाज़त नहीं, सिर्फ़ दूर से औसत तापमान बताया जाता है।

### 1.7.8 Untrusted participants

**Formal explanation.** Because clients lie outside the operator's trust boundary, some may be adversarial: they may submit crafted updates to degrade the model (**poisoning**) or to insert hidden behaviour (**backdoor attack**). Conversely, the server may be *honest-but-curious* with respect to client updates. Both directions of distrust must be designed for.

**आसान भाषा में:** Data centre में सारी मशीनें आपकी अपनी हैं — उन पर शक करने का सवाल ही नहीं। Federated learning में clients अजनबी हैं। कोई शरारती client जान-बूझकर गलत update भेज सकता है ताकि model बिगड़ जाए। और उल्टी तरफ़ से देखें तो clients भी server पर पूरा भरोसा नहीं करते — server ईमानदारी से काम तो करेगा, पर रास्ते में updates पढ़कर कुछ जानने की कोशिश भी कर सकता है (इसे honest-but-curious कहते हैं)। यानी शक दोनों तरफ़ है, और design दोनों को संभाले।

---

## 1.8 Basic Federated Learning Architecture

### 1.8.1 The client–server (star) architecture

**Formal explanation.** The canonical architecture places a coordinating server at the centre of a star of clients.

```
                       ┌──────────────────────────────────────┐
                       │           SERVER / COORDINATOR       │
                       │  ┌────────────┐   ┌───────────────┐  │
                       │  │  global    │   │  aggregator   │  │
                       │  │  model w_t │◀──│   (FedAvg)    │  │
                       │  └─────┬──────┘   └───────▲───────┘  │
                       │        │ broadcast        │ updates  │
                       │  ┌─────▼──────┐   ┌───────┴───────┐  │
                       │  │  client    │   │  round mgr /  │  │
                       │  │  selector  │   │  eval & ckpt  │  │
                       │  └────────────┘   └───────────────┘  │
                       └──────┬─────────────┬─────────────┬───┘
              w_t  ┌──────────┘             │             └──────────┐  w_t
                   ▼                        ▼                        ▼
            ┌─────────────┐          ┌─────────────┐          ┌─────────────┐
            │  CLIENT 1   │          │  CLIENT 2   │   ...    │  CLIENT K   │
            │  data D_1   │          │  data D_2   │          │  data D_K   │
            │ (never sent)│          │ (never sent)│          │ (never sent)│
            │ local train │          │ local train │          │ local train │
            └──────┬──────┘          └──────┬──────┘          └──────┬──────┘
                   └────── Δw_1 ────────────┴────────── Δw_K ────────┘
                            (only updates travel upward)
```

**Server-side components**

| Component | Responsibility |
|---|---|
| Global model store | Holds $w_t$, version history, checkpoints |
| Client selector | Chooses which eligible clients participate in round $t$ |
| Broadcast service | Distributes $w_t$ and the training plan |
| Aggregator | Combines received updates into $w_{t+1}$ |
| Round manager | Handles timeouts, minimum-report thresholds, over-selection, dropouts |
| Evaluator | Computes federated metrics; decides when to stop |

**Client-side components**

| Component | Responsibility |
|---|---|
| Eligibility monitor | Checks charging / idle / unmetered-network conditions before opting in |
| Local data store | On-device examples, usually a rolling window with a retention policy |
| Local trainer | Runs $E$ epochs of SGD on $\mathcal{D}_k$ starting from $w_t$ |
| Update packager | Computes $\Delta w_k$; compresses, quantizes, or clips it |
| Privacy module | Adds noise (DP) or applies secure-aggregation masks |

**आसान भाषा में:** इस चित्र में सिर्फ़ एक बात ध्यान से देखिए — **तीर किस दिशा में क्या ले जा रहे हैं।** नीचे से ऊपर सिर्फ़ $\Delta w$ जा रहा है, data नहीं। ऊपर से नीचे model जा रहा है। बस यही पूरा federated learning है; बाक़ी सब इंतज़ाम इसी एक नियम को निभाने के लिए है।

Server को एक conductor की तरह सोचिए और clients को अलग-अलग शहरों में बैठे संगीतकारों की तरह। Conductor किसी का instrument नहीं छूता — वो सिर्फ़ सबको एक ही धुन का पन्ना भेजता है, सब अपनी-अपनी जगह बजाते हैं, और conductor उनकी आवाज़ों को मिलाकर अगला पन्ना तैयार करता है।

### 1.8.2 Decentralized (peer-to-peer) architecture

**Formal explanation.** The server can be eliminated entirely. Clients exchange models with neighbours over a communication graph and average with them (**gossip protocols**, decentralized SGD). This removes both the single point of failure and the need to trust a coordinator, at the cost of slower and less predictable consensus and more complex analysis. It is attractive between mutually distrustful institutions, and is sometimes combined with a blockchain-based ledger for auditability (Chapter on Blockchain-based FL).

**आसान भाषा में:** यहाँ कोई server है ही नहीं। हर client अपने पड़ोसियों से सीधे model का लेन-देन करता है और average बना लेता है — जैसे गाँव में ख़बर एक-दूसरे से होते हुए सब तक पहुँच जाती है, बिना किसी अख़बार के। फ़ायदा: कोई मालिक नहीं, कोई एक कमज़ोर कड़ी नहीं। नुकसान: सबकी राय एक होने में वक़्त लगता है, और गणित समझना मुश्किल हो जाता है।

### 1.8.3 Hierarchical architecture

**Formal explanation.** An intermediate tier — edge servers, base stations, hospital gateways, regional aggregators — performs *partial* aggregation before forwarding to a global server. This reduces wide-area traffic, exploits locality (clients under one edge node tend to resemble each other), and enables region-specific models. It is the natural fit for telecom and IoT deployments.

**आसान भाषा में:** इसे भारत के प्रशासनिक ढाँचे की तरह समझिए: गाँव → ज़िला → राज्य → केंद्र। हर गाँव सीधे दिल्ली रिपोर्ट नहीं करता; पहले ज़िला जोड़ता है, फिर राज्य, फिर केंद्र। इससे दो फ़ायदे होते हैं — लंबी दूरी का traffic कम हो जाता है, और एक इलाके के लोग आपस में मिलते-जुलते होते हैं इसलिए उनका जोड़ ज़्यादा अर्थपूर्ण बनता है। Mobile networks में base station यही "ज़िला" है।

### 1.8.4 Choosing an architecture

| Criterion | Star | Hierarchical | Peer-to-peer |
|---|---|---|---|
| Simplicity | High | Medium | Low |
| Scalability to $10^9$ clients | Medium | High | Low–Medium |
| Requires a trusted coordinator | Yes (partly) | Yes | No |
| Single point of failure | Yes | Reduced | No |
| Convergence speed | Fast | Fast | Slower |
| Typical setting | Cross-device, cross-silo | Telecom, IoT, multi-region | Mutually distrustful peers |

**आसान भाषा में:** शुरुआत हमेशा star से कीजिए — सबसे आसान, सबसे भरोसेमंद, और 95% मामलों में यही काफ़ी है। Hierarchical तब चुनिए जब clients भौगोलिक रूप से समूहों में बँटे हों। Peer-to-peer तब, जब कोई भी पक्ष किसी एक को "बीच वाला" मानने को तैयार ही न हो — यह अक्सर technical नहीं, राजनीतिक फ़ैसला होता है।

---

## 1.9 Federated Learning Workflow

### 1.9.1 Phases of a federated project

**Formal explanation.**

| Phase | Activity | Key point |
|---|---|---|
| **0. Formulation & simulation** | Define the task; build a *simulated* federation on proxy data; explore hyperparameters offline | Real federated runs are slow and cannot be debugged interactively — simulation is not optional |
| **1. Model engineering** | Ensure the model fits device memory and compute budgets | Architecture choices are constrained (e.g. **group normalization instead of batch normalization**, because per-client batch statistics are unreliable under non-IID data) |
| **2. Federated training** | Repeated rounds (Section 1.9.2) | Days to weeks of wall-clock time |
| **3. Federated evaluation** | Metrics computed on held-out *clients*, aggregated | Both the mean and the *distribution across clients* matter |
| **4. Deployment & monitoring** | Stage, canary on a small population, roll out | Monitoring remains aggregate-only |

**आसान भाषा में:** सबसे ज़रूरी सलाह Phase 0 की है, और नए engineers सबसे ज़्यादा यही चूकते हैं। असली फ़ोनों पर सीधे प्रयोग मत शुरू कीजिए — एक round में घंटों लग सकते हैं और आप कुछ देख भी नहीं पाएँगे। पहले अपने laptop पर एक नक़ली federation बनाइए (एक public dataset को 100 हिस्सों में बाँट दीजिए), वहाँ सब settings आज़मा लीजिए, तब असली दुनिया में जाइए।

Phase 1 में एक बहुत practical बात है: **Batch Normalization से बचिए।** BatchNorm हर batch का औसत निकालकर काम करता है — पर federated setting में हर client के batch का औसत बिल्कुल अलग होता है (क्योंकि data non-IID है), इसलिए ये आँकड़े बेमेल हो जाते हैं और model बिगड़ता है। इसकी जगह Group Normalization इस्तेमाल कीजिए। यह छोटी-सी बात कई projects को डूबने से बचा लेती है।

### 1.9.2 Anatomy of one training round

**Formal explanation.** One round proceeds in eight steps:

1. **Eligibility and check-in.** Devices meeting local conditions (charging, idle, unmetered network) announce availability to the server.
2. **Selection.** The server samples a cohort $S_t$ of $m = \max(\lceil C\cdot K\rceil, 1)$ clients, typically **over-selecting** by 20–30% to absorb dropouts.
3. **Broadcast / configuration.** Each selected client receives $w_t$ plus the training plan: $E$, $B$, $\eta$, clipping norm, and a reporting deadline.
4. **Local computation.** Client $k$ sets $w_t^k \leftarrow w_t$ and performs $E$ epochs of SGD over $\mathcal{D}_k$.
5. **Update construction.** The client forms $\Delta w_k = w_t^k - w_t$, optionally clips its norm, compresses or quantizes it, and applies privacy transformations.
6. **Reporting.** Updates are uploaded before the deadline. Late or failed clients are simply *ignored* for this round.
7. **Aggregation.** The server combines the received updates. For FedAvg, this is the sample-weighted mean:
   $$
   w_{t+1} \;=\; \sum_{k \in S_t} \frac{n_k}{\sum_{j \in S_t} n_j}\, w_t^{k}
   \;=\; w_t \;+\; \sum_{k \in S_t} \frac{n_k}{\sum_{j \in S_t} n_j}\,\Delta w_k .
   $$
8. **Global update and bookkeeping.** The new model is checkpointed, metrics are logged, and the next round begins.

Note that with secure aggregation, the server can see *only the sum* — it cannot read any individual $\Delta w_k$ at all.

**आसान भाषा में:** एक round को एक होमवर्क-चक्र की तरह याद रखिए:
**बुलाओ → बाँटो → घर पर करवाओ → वापस लो → जोड़ो।**

Step 2 और Step 6 पर ख़ास ध्यान दीजिए, क्योंकि यही federated learning को असल दुनिया में चलने लायक बनाते हैं। **Over-selection** का मतलब है — अगर 100 clients चाहिए तो 130 को बुला लो, क्योंकि पता है कुछ बीच में गायब हो जाएँगे। और Step 6 में जो देर से आया, उसका काम इस बार गिना ही नहीं जाएगा — उसका इंतज़ार नहीं किया जाएगा। यह कठोर लगता है, पर ज़रूरी है: अगर server एक-एक client का इंतज़ार करने लगे तो training कभी ख़त्म नहीं होगी।

### 1.9.3 The FedAvg algorithm

**Conceptual idea.** Each selected client starts from the same global model, trains on its own data for a while, and returns the model it ended with. The server averages these models, weighted by how much data each client had. That average becomes the next global model. Repeat.

**Pseudocode.**

```
ALGORITHM: FederatedAveraging (FedAvg)
INPUT: K clients, fraction C, local epochs E, batch size B, learning rate η
OUTPUT: trained global model w_T

SERVER EXECUTES:
    initialize w_0
    for each round t = 0, 1, 2, ..., T-1 do
        m   ← max(C · K, 1)
        S_t ← random subset of m eligible clients
        broadcast w_t to all k ∈ S_t
        for each client k ∈ S_t in parallel do
            w_t^k ← ClientUpdate(k, w_t)
        end for
        N ← Σ n_k  over clients k ∈ S_t that reported in time
        w_{t+1} ← Σ (n_k / N) · w_t^k          // weighted average
    end for
    return w_T

CLIENTUPDATE(k, w):                             // runs on the device
    w^k ← w
    for epoch e = 1 to E do
        for each batch b of size B from D_k do
            w^k ← w^k − η · ∇L(w^k ; b)
        end for
    end for
    return w^k                                  // or Δw = w^k − w
```

**A key relationship.** Setting $E = 1$ and $B = \infty$ (one full-batch gradient step per round) reduces FedAvg to distributed synchronous SGD — communicating every step. Increasing $E$ trades local computation for far fewer rounds, which is the entire point. But large $E$ under strongly non-IID data amplifies client drift, so $E$ is a genuine tuning knob, not a free win.

**आसान भाषा में:** FedAvg का पूरा idea एक वाक्य में — *"सब अपने-अपने घर पर पढ़ें, फिर सबकी कॉपियाँ मिलाकर एक औसत कॉपी बना लें।"*

$E$ वाली बात ज़रा गहराई से समझिए, क्योंकि यही FedAvg का असली फ़ैसला है:
- $E$ छोटा (जैसे 1) → हर client कम पढ़ता है, model कम भटकता है, पर server से बार-बार बात करनी पड़ती है → **communication महँगा**।
- $E$ बड़ा (जैसे 20) → बात कम करनी पड़ती है, पर हर client अपने ही data की तरफ़ बहुत दूर निकल जाता है → **client drift बढ़ जाता है**।

यानी $E$ एक तराज़ू है जिसके एक पलड़े में network का ख़र्च है और दूसरे में model की गुणवत्ता। सही जगह प्रयोग से ही मिलती है, और वो हर dataset पर अलग होती है।

**Worked Example 1.4 — one complete round of FedAvg, by hand.**

For clarity, take a model with a single parameter $w$. Suppose $w_t = 10.0$ and three clients are selected:

| Client | $n_k$ | Local model after training, $w_t^k$ | $\Delta w_k = w_t^k - w_t$ |
|---|---|---|---|
| A | 600 | 12.0 | $+2.0$ |
| B | 300 | 7.0 | $-3.0$ |
| C | 100 | 14.0 | $+4.0$ |

Total reporting samples: $N = 600 + 300 + 100 = 1000$. Weights: $0.6,\; 0.3,\; 0.1$.

**Method 1 — averaging the models:**
$$w_{t+1} = 0.6(12.0) + 0.3(7.0) + 0.1(14.0) = 7.2 + 2.1 + 1.4 = \mathbf{10.7}$$

**Method 2 — averaging the updates:**
$$w_{t+1} = 10.0 + \big[0.6(2.0) + 0.3(-3.0) + 0.1(4.0)\big] = 10.0 + [1.2 - 0.9 + 0.4] = 10.0 + 0.7 = \mathbf{10.7}$$

Both give the same answer, as the algebra of step 7 guarantees.

**Now observe the danger.** Client C moved furthest (+4.0) but carries only 10% weight, so it barely influences the result. And note that the global model moved by only $+0.7$, although every individual client moved by 2 to 4 units. **Disagreement between clients cancels out, and progress slows.** This is client drift, visible in a single line of arithmetic.

**आसान भाषा में:** इस छोटे-से उदाहरण में federated learning की दो बड़ी सच्चाइयाँ छिपी हैं।

पहली: **model जोड़ें या updates जोड़ें — नतीजा एक ही आता है।** असल systems में updates ($\Delta w$) भेजे जाते हैं क्योंकि उन्हें compress करना आसान होता है और उन पर privacy की परत चढ़ाना भी।

दूसरी, और ज़्यादा अहम: देखिए हर client 2 से 4 अंक तक हिला, पर global model सिर्फ़ 0.7 अंक आगे बढ़ा। क्यों? क्योंकि Client B उल्टी दिशा में गया और उसने बाक़ियों की मेहनत काट दी। यही "client drift" है — सब पूरी मेहनत करते हैं, पर आपस के मतभेद एक-दूसरे को काट देते हैं और federation धीरे-धीरे रेंगता है। जब data बहुत non-IID हो, तो यह कटाव और बढ़ जाता है। आगे के chapters में जो भी algorithm आएगा — FedProx, SCAFFOLD, FedNova — वो सब इसी 0.7 को बड़ा करने की कोशिश है।

### 1.9.4 Stopping criteria

**Formal explanation.** Training terminates when federated validation accuracy plateaus; when a round budget or wall-clock budget is exhausted; when a **privacy budget** $\varepsilon$ is spent; or when a target metric is achieved across a sufficient fraction of the client distribution.

**आसान भाषा में:** Centralized training में हम "loss घटना बंद हो गई" पर रुकते हैं। Federated में एक नई वजह जुड़ जाती है — **privacy का बजट ख़त्म हो जाना।** हर round में थोड़ी-सी जानकारी बाहर रिसती है, और हमने पहले से तय कर रखा होता है कि कुल कितनी रिसने देंगे। वो सीमा आते ही training रोक देनी पड़ती है, चाहे accuracy अभी और बढ़ सकती हो। यह एक ऐसी पाबंदी है जो centralized ML में होती ही नहीं।

---

## 1.10 Participants in Federated Learning

### 1.10.1 Roles

**Formal explanation.**

| Role | Description | Note |
|---|---|---|
| **Data owner / client** | Holds raw data, performs local training | May be a person's device or an institution |
| **Coordinator / server** | Orchestrates rounds, selects clients, distributes the model | Often, but not necessarily, the model owner |
| **Aggregator** | Combines the received updates | Can be separated from the coordinator, or replaced by a secure multi-party protocol |
| **Model owner** | Defines the task and owns the resulting model | Decides who may use the trained model |
| **Model consumer** | Uses the trained model at inference time | May be the same parties as the clients |
| **Auditor / regulator** | Verifies compliance, fairness, and privacy claims | Increasingly required in regulated sectors |

**A design point worth internalizing.** Separating the aggregator from the coordinator matters. If one party both *chooses which clients participate* and *reads individual updates*, it can isolate a target client in a round of size one and inspect that client's contribution directly. Good designs split these two powers between different parties.

**आसान भाषा में:** ऊपर वाली चेतावनी को एक उदाहरण से समझिए, क्योंकि यह बहुत सूक्ष्म है। मान लीजिए server ही तय करता है कि किसे बुलाना है, *और* server ही updates पढ़ भी सकता है। अब अगर server किसी एक ख़ास व्यक्ति की जासूसी करना चाहे, तो वो एक round में सिर्फ़ *उसी एक* को बुला लेगा। अब जो update आया वो पूरी तरह उसी का है — "aggregation" का पर्दा हट गया। इसीलिए अच्छे design में "किसे बुलाना है" और "updates कौन पढ़ सकता है" — ये दोनों अधिकार अलग-अलग पक्षों के पास रखे जाते हैं।

### 1.10.2 Cross-device vs cross-silo federations

**Formal explanation.** Two deployment regimes dominate practice, and they differ so sharply that they should be treated as distinct engineering problems.

| Property | **Cross-device** | **Cross-silo** |
|---|---|---|
| Clients | Phones, wearables, IoT nodes | Hospitals, banks, firms, data centres |
| Scale ($K$) | $10^4$ – $10^{10}$ | 2 – 100 |
| Participation per round | Small fraction, unpredictable | Nearly all, scheduled |
| Client statefulness | Stateless, usually one-shot | Stateful, persistent identity |
| Availability | Intermittent; large dropout | High; failures are rare and noticed |
| Compute per client | Weak; battery- and thermally limited | Strong; often GPU clusters |
| Primary bottleneck | Communication and reliability | Trust, governance, and legal agreement |
| Data partitioning | Almost always horizontal | Horizontal *or* vertical |
| Addressability | Clients not individually addressable | Named, contracted parties |
| Main threat | Malicious minority of clients; curious server | Honest-but-curious partners; IP leakage |
| Example | Gboard next-word prediction | Multi-hospital tumour segmentation |

**आसान भाषा में:** इन दोनों को एक ही नाम "federated learning" कहा जाता है, पर असल में ये दो अलग दुनिया हैं — इन्हें अलग-अलग समझिए।

- **Cross-device** = करोड़ों मोबाइल फ़ोन। बहुत सारे, बहुत कमज़ोर, बहुत भरोसे के लायक नहीं, बेनाम। यहाँ असली दुश्मन है — network और भरोसेमंदी। सवाल यह है: "इतने सारे अनजान, कमज़ोर फ़ोनों से काम कैसे निकालें?"
- **Cross-silo** = दस-बारह hospitals या banks। थोड़े से, बहुत ताक़तवर, हमेशा उपलब्ध, नाम और contract के साथ। यहाँ technical दिक्कत लगभग नहीं है — असली दुश्मन है भरोसा, कानून और समझौता। सवाल यह है: "ये दस संस्थाएँ आपस में समझौता कैसे करें और model का मालिक कौन होगा?"

एक वाक्य में: **Cross-device की लड़ाई engineering की है; cross-silo की लड़ाई भरोसे और कानून की है।**

### 1.10.3 Incentives and governance

**Formal explanation.** In cross-device settings, participation is typically implicit in a product's terms of service and requires no compensation. In cross-silo settings, participation is a negotiated commercial arrangement, and the practical questions become governance questions:

- Who may use the final model, and for what?
- How is each party's **contribution** measured? (Shapley-value-based attribution is the common approach.)
- How are **free riders** — parties that contribute little but benefit fully — detected and penalized?
- Who is **liable** if the model causes harm?

These questions are not incidental. In practice, they are usually what determines whether a cross-silo federation ever launches at all.

**आसान भाषा में:** यह section technical नहीं है, पर असल दुनिया में सबसे ज़्यादा project यहीं अटकते हैं। दस hospitals मिलकर model बनाने को राज़ी हो गए — बहुत अच्छा। अब सवाल: तैयार model किसका होगा? जिस hospital ने 60% data दिया और जिसने 2% दिया, दोनों को बराबर हक़ मिलेगा? जिसने बहुत कम दिया पर पूरा फ़ायदा उठा लिया (free rider) उसका क्या? और अगर model ने किसी मरीज़ का गलत निदान कर दिया — मुक़दमा किस पर चलेगा?

मैं छात्रों से अक्सर कहता हूँ: cross-silo federated learning में code लिखना दो महीने का काम है, और समझौता करवाना दो साल का।

---

## 1.11 Advantages of Federated Learning

**Formal explanation.**

1. **Data minimization and privacy by design.** Raw data never leaves the device or institution, sharply reducing exposure and limiting breach impact. Combined with secure aggregation and differential privacy, formal guarantees become achievable.
2. **Regulatory alignment.** Federated designs map naturally onto purpose limitation, data minimization, and residency requirements, and reduce the scope of cross-border transfer obligations.
3. **Access to otherwise unreachable data.** This is the main *accuracy* argument: federated learning can train on data that would never legally or commercially be pooled, so the achievable model may be far better than any single-party model.
4. **Reduced bandwidth and storage cost.** Updates are typically orders of magnitude smaller than the data producing them, and cost scales with model size, not data volume (Worked Example 1.2).
5. **Lower inference latency and offline capability.** The model lives where it is used; predictions do not depend on a network round trip.
6. **Fresh, in-context labels.** Implicit labels available only at the edge can be used without ever being uploaded.
7. **Personalization.** The global model is a strong initialization for local fine-tuning, yielding per-client models better than either a purely local or a purely global model.
8. **Resilience and reduced concentration risk.** No single repository whose compromise exposes everyone; the system degrades gracefully as clients fail.
9. **Continuous learning at scale.** Large device populations supply an ongoing learning signal that adapts to distribution shift.

**आसान भाषा में:** नौ फ़ायदे लिखे हैं, पर मैं चाहता हूँ आप सिर्फ़ **तीसरा** याद रखें, क्योंकि बाक़ी सब उसी के आगे छोटे हैं।

लोग समझते हैं federated learning का मुख्य फ़ायदा privacy है। Privacy बड़ा फ़ायदा है, पर सबसे बड़ा नहीं। सबसे बड़ा फ़ायदा है — **वो data इस्तेमाल हो पाना जो वरना इस्तेमाल होता ही नहीं।** जो 200 hospitals का data कभी एक जगह नहीं आ सकता था, उससे अब model बन रहा है। यह accuracy की बात है, नैतिकता की नहीं। यही वो दलील है जो boardroom में चलती है।

और साथ में एक practical फ़ायदा (point 7) जिसे छात्र अक्सर भूल जाते हैं: global model सबकी समझ लेकर बनता है, इसलिए वो हर client के लिए एक बेहतरीन *शुरुआती बिंदु* होता है। हर client उसे थोड़ा-सा अपने हिसाब से ढाल ले, तो उसे ऐसा model मिल जाता है जो न पूरी तरह "सबका" है और न अकेले अपने data से बना कमज़ोर model — दोनों से बेहतर।

**Real-Life Example — Personalization:**
आपके फ़ोन का keyboard करोड़ों लोगों से सीखा हुआ global model लेकर आता है — इसलिए वो अंग्रेज़ी और हिंदी दोनों की आम आदतें जानता है। फिर वो आपके अपने फ़ोन पर आपके लिखने के ढंग से थोड़ा और ढल जाता है, इसलिए वो आपके दोस्तों के उपनाम और आपके तकियाकलाम भी सीख लेता है। अकेले आपके data से इतना अच्छा model कभी नहीं बनता — आप इतना टाइप ही नहीं करते। और अकेले global model आपके निजी शब्द कभी नहीं जान पाता। दोनों का जोड़ ही असली जादू है।

---

## 1.12 Limitations of Federated Learning

**Formal explanation.**

1. **Communication is the bottleneck.** Wall-clock training time is dominated by rounds, not FLOPs. Reaching a target accuracy may require hundreds or thousands of rounds spread over days or weeks.
2. **Statistical heterogeneity degrades convergence.** Non-IID data causes client drift; FedAvg may converge slowly, oscillate, or reach a worse solution than centralized training on the same pooled data. **Some accuracy loss relative to centralized training is normal and must be budgeted for.**
3. **Systems heterogeneity and stragglers.** Synchronous rounds proceed at the speed of the slowest reporting client, and dropouts bias *which* clients' data actually shapes the model.
4. **Privacy is not automatic.** Gradient inversion can reconstruct recognizable training samples, especially with small batches; membership and property inference are also feasible. Data locality alone is a weaker guarantee than it appears, and the defences (DP noise, encryption) cost accuracy or computation.
5. **Vulnerability to poisoning and backdoors.** Untrusted clients can submit crafted updates. Robust aggregation helps, but trades off against accuracy under non-IID data.
6. **Debuggability and observability.** No access to raw data means no direct data inspection, harder error analysis, and difficult detection of label noise or preprocessing bugs.
7. **Evaluation is harder.** There is no clean held-out test set from the true distribution; metrics must be computed federatedly and reported as *distributions* across clients, not merely as means.
8. **Fairness.** Weighting by $n_k$ favours data-rich clients; minority populations may be systematically underserved by the global model.
9. **Engineering and operational complexity.** Version skew across a heterogeneous fleet, on-device storage and retention policies, battery and thermal management, and a control plane that must operate at population scale.
10. **Cost shifting.** Computation, energy, and battery cost move from the operator to the participant.
11. **Not always necessary.** If the data is already legally poolable and modest in size, centralized training is simpler, faster, and more accurate.

**आसान भाषा में:** इन ग्यारह में से तीन ऐसे हैं जिन पर मैं class में सबसे ज़्यादा ज़ोर देता हूँ।

**(क) Privacy अपने आप नहीं मिलती (point 4).** Data local रखना पहला कदम है, पूरा रास्ता नहीं। Update में data की छाप बची रहती है। जो लोग कहते हैं "हमने federated learning लगा दिया, अब privacy की चिंता ख़त्म" — वो या तो अनजान हैं या बेईमान।

**(ख) एक बहुत बुरा विरोधाभास (points 4 और 5 का टकराव).** Privacy के लिए हम चाहते हैं कि server किसी एक client का update पढ़ ही न पाए। पर security के लिए हम चाहते हैं कि server हर update जाँच सके कि कहीं वो शरारती तो नहीं। ये दोनों इच्छाएँ सीधे-सीधे एक-दूसरे के ख़िलाफ़ हैं। जितनी अच्छी privacy, उतनी मुश्किल जाँच। यह इस field की सबसे गहरी उलझनों में से एक है और अभी तक पूरी तरह सुलझी नहीं है।

**(ग) Fairness (point 8).** याद कीजिए Worked Example 1.3 — बड़े hospital का वज़न 0.6 था और छोटे का 0.1. यानी model मुख्य रूप से बड़े hospital के मरीज़ों जैसा सोचना सीखेगा। अब अगर छोटा hospital किसी दूरदराज़ इलाके का है, जहाँ के मरीज़ों की बीमारियाँ अलग हैं — तो जिन्हें सबसे ज़्यादा मदद चाहिए थी, model उन्हीं के लिए सबसे कमज़ोर निकलेगा। गणित सही है, नतीजा अन्यायपूर्ण है। इसी तनाव पर आगे एक पूरा chapter है।

> **Common misconception.** "Federated learning गरीब आदमी का centralized learning है — accuracy कम मिलेगी।" यह अधूरा सच है। *एक ही data* पर तुलना करें, तो हाँ, centralized बेहतर रहेगा। पर असल तुलना यह है ही नहीं। असल तुलना है — *सबके data पर बना federated model* बनाम *जितना data कानूनी रूप से जुट सका उतने पर बना centralized model*। और उस तुलना में federated अक्सर बड़े अंतर से जीतता है।

---

## 1.13 Applications of Federated Learning

**Formal explanation.**

| Domain | Application | Regime |
|---|---|---|
| **Mobile / consumer** | Next-word prediction, smart reply, emoji and query suggestion, on-device search ranking, wake-word adaptation | Cross-device |
| **Healthcare** | Medical image segmentation (tumour detection, chest radiographs), outcome prediction from EHRs, rare-disease modelling | Cross-silo |
| **Finance** | Anti-money-laundering, fraud detection across banks, credit risk scoring, joint modelling with partners (vertical FL) | Cross-silo |
| **IoT / smart infrastructure** | Anomaly detection on distributed sensors, smart-meter demand forecasting, predictive maintenance | Both |
| **Automotive** | Perception and driver-behaviour models across vehicle fleets, map and traffic modelling, in-cabin personalization | Cross-device |
| **Telecommunications** | Traffic prediction, resource allocation, QoE modelling at base stations | Hierarchical |
| **Pharmaceutical R&D** | Collaborative predictive chemistry across competitors (e.g. the MELLODDY consortium) | Cross-silo |
| **Recommendation** | On-device ranking and re-ranking that keeps behavioural traces local | Cross-device |
| **Public sector** | Cross-agency or cross-border statistics under residency rules | Cross-silo |

**आसान भाषा में:** ऊपर की table में सिर्फ़ पहला column मत पढ़िए, आख़िरी column भी देखिए — और आप एक pattern पकड़ लेंगे। जहाँ **करोड़ों आम लोग** हैं (फ़ोन, गाड़ियाँ), वहाँ cross-device. जहाँ **कुछ बड़ी संस्थाएँ** हैं (hospital, bank, दवा कंपनियाँ), वहाँ cross-silo. यह pattern हर नए use case पर लागू कीजिए और आपको तुरंत पता चल जाएगा कि किस तरह का system बनाना है।

**Real-Life Example — MELLODDY (सबसे दिलचस्प केस):**
दस बड़ी दवा कंपनियाँ, जो आपस में कट्टर प्रतिद्वंद्वी हैं, मिलकर एक model बनाने को राज़ी हुईं। हर कंपनी के पास अपने रासायनिक compounds का data है — यह उनकी सबसे बड़ी और सबसे गोपनीय पूँजी है, जिस पर अरबों रुपये और दशकों की मेहनत लगी है। कोई भी उसे नहीं दिखाएगा, किसी क़ीमत पर नहीं। पर सबको यह भी पता है कि अगर सबका data मिल जाए तो दवा खोजने का model कहीं बेहतर हो जाएगा और सबका फ़ायदा होगा। Federated learning ने वही किया जो और कोई तरीका नहीं कर सकता था — सहयोग, बिना भरोसे के। यही इस field की सबसे साफ़ मिसाल है।

### A practical screening test

**Formal explanation.** Federated learning is worth considering when **all** of the following hold:

1. The data is distributed across multiple parties or devices;
2. It is sensitive, or too large or too slow to move;
3. The parties share a common learning task;
4. The union of their data would train a meaningfully better model than any single party's data alone.

If any condition fails, a simpler design is very likely better.

**आसान भाषा में:** नया project शुरू करने से पहले खुद से यही चार सवाल पूछिए। अगर चारों का जवाब "हाँ" है, तभी federated learning सोचिए। अगर किसी एक का भी जवाब "नहीं" है, तो आसान रास्ता चुनिए। मैंने बहुत से छात्रों और engineers को देखा है जो federated learning इसलिए लगाते हैं कि वो नया और आकर्षक लगता है — और फिर छह महीने एक ऐसी समस्या से जूझते हैं जो `pandas.read_csv()` की एक line से हल हो जाती। नया होना, सही होने का सबूत नहीं है।
