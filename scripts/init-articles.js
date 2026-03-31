const mysql = require('mysql2/promise');

const articles = [
  // ── 해외주식·글로벌 (cat 1) ──────────────────────────────
  {
    cat: 1,
    title_ko: '모멘텀 팩터, 왜 S&P 500에서 꾸준히 작동하는가',
    title: 'Why Momentum Factor Consistently Works in the S&P 500',
    slug: 'momentum-factor-sp500-performance',
    summary_ko: '모멘텀 전략이 미국 주식시장에서 초과수익을 내는 이유를 행동재무학과 시장 마찰 관점에서 분석한다.',
    ko: `**모멘텀(Momentum)**은 주식 투자에서 가장 강력하고 검증된 팩터 중 하나다. 지난 6~12개월간 상승한 주식은 앞으로도 상승하고, 하락한 주식은 계속 하락하는 경향이 있다. 단순해 보이지만, 이 현상은 수십 년의 데이터로 반복적으로 확인됐다.

**왜 모멘텀이 작동하는가?** 논문들은 크게 두 가지 관점을 제시한다.

첫째, **행동재무학적 설명**: 투자자들은 새로운 정보에 느리게 반응한다(under-reaction). 기업의 실적이 좋아졌을 때 주가가 즉각 완전히 반영되지 않고, 시간이 지나면서 점진적으로 상승한다. 이 지연이 모멘텀을 만든다.

둘째, **시장 마찰**: 기관투자자들의 운용 제약(추적오차 한계, 벤치마크 제약)이 강한 종목을 더 사게 만들고, 이것이 트렌드를 강화한다.

**S&P 500에서의 성과**: 연구에 따르면 모멘텀 팩터는 S&P 500 내에서 연 3~5%의 초과수익을 꾸준히 기록했다. 단, **크래시 리스크**가 있다 — 시장 급락 후 반등 시기에 모멘텀 전략은 급격히 역전될 수 있다.

실용적 적용: 모멘텀은 단독 전략보다 **가치(Value) + 퀄리티(Quality) 팩터와 결합**할 때 리스크 조정 수익이 극대화된다.

---
📖 *Momentum factor in US equity markets (Academic review)* | [관련 연구](https://papers.ssrn.com/)`,
    en: `**Momentum** is one of the most powerful and validated factors in stock investing. Stocks that rose over the past 6-12 months tend to continue rising; fallen stocks tend to keep falling. Simple as it sounds, this phenomenon has been repeatedly confirmed across decades of data.

**Why does momentum work?** Research offers two main perspectives.

First, **behavioral finance**: investors react slowly to new information (under-reaction). When a company's results improve, stock prices don't immediately fully reflect this — they rise gradually over time. This delay creates momentum.

Second, **market frictions**: institutional investor constraints (tracking error limits, benchmark restrictions) force them to buy stronger-performing stocks, reinforcing trends.

**S&P 500 performance**: momentum factor has consistently generated 3-5% annual excess returns within the S&P 500. However, **crash risk** exists — momentum strategies can reverse sharply after market crashes during recovery periods.

Practical application: momentum maximizes risk-adjusted returns when **combined with Value + Quality factors** rather than used alone.

---
📖 *Momentum factor in US equity markets (Academic review)*`,
    journal: 'Journal of Finance', pubdate: '2024',
  },
  {
    cat: 1,
    title_ko: 'ESG 투자, 실제로 수익률이 높을까? — 글로벌 메타분석',
    title: 'Does ESG Investing Actually Outperform? A Global Meta-Analysis',
    slug: 'esg-investing-performance-meta-analysis',
    summary_ko: '전 세계 ESG 투자 성과를 분석한 200여 편의 논문을 메타분석해, ESG가 수익률에 미치는 실제 영향을 검토한다.',
    ko: `**ESG(환경·사회·거버넌스)** 투자는 지난 10년간 가장 뜨거운 투자 트렌드였다. "착하게 투자하면서도 돈을 더 번다"는 주장이 넘쳐났다. 하지만 정말 그럴까?

이번 메타분석은 전 세계 200여 편의 ESG 투자 성과 연구를 종합했다.

**결론은 "중립적 플러스"다.** ESG 포트폴리오는 전통 포트폴리오 대비 통계적으로 유의미하게 **낮은 성과를 보이지 않았다.** 즉, ESG를 고려해도 수익률을 크게 희생하지 않는다는 것이다. 일부 연구에서는 소폭 초과수익도 확인됐다.

**왜 ESG가 수익에 중립~긍정적인가?**
- **리스크 관리**: ESG 높은 기업은 규제 리스크, 환경 사고, 거버넌스 스캔들 가능성이 낮아 꼬리 리스크(tail risk)가 감소한다.
- **장기 경쟁력**: 지속가능한 비즈니스 모델이 장기적으로 더 강한 수익성을 보인다.

**중요한 주의사항**: ESG 레이팅 기관마다 점수가 크게 다르다. "ESG 워싱(greenwashing)" 문제로 ESG 레이블이 실질적 내용과 다를 수 있다. 투자자는 ESG 지수의 구성 방식을 직접 확인해야 한다.

---
📖 *ESG investing and financial performance (Meta-analysis)* | [관련 연구](https://papers.ssrn.com/)`,
    en: `**ESG (Environmental, Social, Governance)** investing was the hottest investment trend of the past decade. Claims of "doing good while earning more" abounded. But is it true?

This meta-analysis synthesized 200+ global ESG investing performance studies.

**The conclusion is "neutral to positive."** ESG portfolios showed **no statistically significant underperformance** versus traditional portfolios — meaning ESG consideration doesn't substantially sacrifice returns. Some studies found modest excess returns.

**Why is ESG neutral to positive for returns?**
- **Risk management**: high-ESG firms have lower regulatory risk, environmental incidents, and governance scandal probability, reducing tail risk.
- **Long-term competitiveness**: sustainable business models demonstrate stronger long-term profitability.

**Important caveats**: ESG ratings vary widely across rating agencies. "Greenwashing" means ESG labels may differ from actual substance. Investors should directly examine ESG index construction methodology.

---
📖 *ESG investing and financial performance (Meta-analysis)*`,
    journal: 'Journal of Portfolio Management', pubdate: '2023',
  },
  {
    cat: 1,
    title_ko: '배당 성장주, 저금리와 고금리 환경에서 어떻게 다르게 행동하나',
    title: 'Dividend Growth Stocks Behavior in Low vs High Interest Rate Environments',
    slug: 'dividend-growth-stocks-interest-rate-environment',
    summary_ko: '금리 환경 변화가 배당 성장주의 상대 성과에 미치는 영향을 분석하고, 금리 사이클에 맞는 배당주 전략을 제시한다.',
    ko: `**배당 성장주**는 매년 배당금을 꾸준히 늘려온 기업들이다. 코카콜라, 존슨앤존슨, P&G 같은 "배당 귀족(Dividend Aristocrats)"이 대표적이다. 안정적인 캐시플로우와 주주 친화적 경영의 상징으로 여겨진다.

그런데 이 배당 성장주들은 **금리 환경에 따라 전혀 다른 성과**를 보인다.

**저금리 환경(2009-2021)**에서는 배당 성장주가 시장을 크게 앞질렀다. 채권 금리가 낮으니 배당 수익률이 상대적으로 매력적이었고, 배당주로 자금이 몰렸다.

**고금리 환경(2022-)**에서는 반대다. 국채 금리가 4-5%로 오르면서 배당 수익률 2-3%의 배당주 매력이 상대적으로 감소했다. 특히 **부채 의존도가 높은 유틸리티, 리츠(REITs)** 섹터가 큰 타격을 받았다.

**논문이 제안하는 전략**: 금리 상승기에는 **배당 지속가능성(payout ratio)과 부채 비율**이 낮은 배당 성장주를 선별해야 한다. 단순히 배당 수익률이 높다고 좋은 것이 아니다 — 높은 배당 수익률은 주가 하락의 결과일 수 있다(수익률 함정, Yield Trap).

---
📖 *Dividend growth stocks and interest rate sensitivity (Empirical study)* | [관련 연구](https://papers.ssrn.com/)`,
    en: `**Dividend growth stocks** are companies that have steadily increased dividends every year — Coca-Cola, Johnson & Johnson, P&G, the "Dividend Aristocrats" — symbols of stable cash flow and shareholder-friendly management.

Yet these stocks show **completely different performance depending on the interest rate environment.**

In **low-rate environments (2009-2021)**, dividend growth stocks significantly outperformed the market. With bond yields low, dividend yields were relatively attractive, drawing capital to dividend stocks.

In **high-rate environments (2022-)**, the reverse: as Treasury yields rose to 4-5%, dividend stocks yielding 2-3% became less attractive. **High-debt sectors like utilities and REITs** took significant hits.

**Paper-proposed strategy**: during rate rises, select dividend growth stocks with **low payout ratios and low debt ratios.** High dividend yield alone isn't sufficient — high yields can result from price declines (the Yield Trap).

---
📖 *Dividend growth stocks and interest rates (Empirical)*`,
    journal: 'Financial Analysts Journal', pubdate: '2024',
  },

  // ── 국내주식·한국 (cat 2) ────────────────────────────────
  {
    cat: 2,
    title_ko: '외국인 투자자의 매매가 코스피 주가에 미치는 영향',
    title: 'Impact of Foreign Investor Trading on KOSPI Stock Prices',
    slug: 'foreign-investor-impact-kospi',
    summary_ko: '외국인 투자자의 순매수·순매도가 코스피 주가와 변동성에 미치는 단기·장기 영향을 분석한다.',
    ko: `한국 주식시장에서 외국인 투자자는 특별한 존재다. 코스피 시가총액의 약 **30-35%**를 보유하면서도, 일별 거래량에서는 기관·개인보다 훨씬 큰 영향력을 행사한다. "외인이 사면 오르고, 팔면 내린다"는 말이 시장 격언처럼 통하는 이유다.

이번 연구는 외국인 순매수/순매도와 코스피 주가 움직임의 관계를 심층 분석했다.

**단기 효과**: 외국인 순매수가 강한 날은 당일과 다음날 주가가 유의미하게 올랐다. 이는 외국인의 **정보 우위(information advantage)** 또는 **가격 압력(price pressure)** 효과를 반영한다.

**장기 효과**: 3~6개월 관점에서는 외국인 순매수의 예측력이 약화됐다. 즉, 외국인 매수는 단기 모멘텀을 만들지만, 장기적으로는 펀더멘털이 더 중요하다.

**섹터별 차이**: 반도체, IT, 화학 등 **글로벌 경기 민감 섹터**에서 외국인의 영향력이 컸다. 내수 소비재, 통신 등 방어적 섹터는 상대적으로 영향이 적었다.

개인투자자 입장에서의 함의: 외국인 동향은 단기 매매 시그널로 참고할 수 있지만, **무조건적인 추종은 위험하다.** 외국인이 매도할 때도 구조적 성장 기업은 장기 보유 시 오히려 기회가 된다.

---
📖 *Foreign investor trading and KOSPI returns (Event study)* | [관련 연구](https://papers.ssrn.com/)`,
    en: `Foreign investors occupy a special position in Korea's stock market. Holding approximately **30-35% of KOSPI market cap**, they exert far greater influence on daily trading volume than institutions or individuals. The market saying "foreigners buy, prices rise; they sell, prices fall" exists for good reason.

This study deeply analyzed the relationship between foreign net buying/selling and KOSPI price movements.

**Short-term effects**: days with strong foreign net buying showed significantly higher prices that day and the next — reflecting foreign **information advantage** or **price pressure** effects.

**Long-term effects**: over 3-6 months, foreign net buying's predictive power weakened. Foreign buying creates short-term momentum, but fundamentals matter more long-term.

**Sector differences**: foreign influence was strongest in **globally cyclical sectors** like semiconductors, IT, and chemicals. Defensive sectors like domestic consumer goods and telecom showed relatively less impact.

Implication for individual investors: foreign trends can be referenced as short-term trading signals, but **blind following is dangerous.** Even when foreigners sell, structurally growing companies can become opportunities for long-term holders.

---
📖 *Foreign investor trading and KOSPI (Event study)*`,
    journal: 'Pacific-Basin Finance Journal', pubdate: '2024',
  },
  {
    cat: 2,
    title_ko: '코스닥 소형주 효과 — 한국 시장에서 소형주가 대형주를 이기는가',
    title: 'KOSDAQ Small-Cap Effect: Do Small Stocks Outperform Large in Korea',
    slug: 'kosdaq-small-cap-effect-korea',
    summary_ko: '한국 코스닥 소형주가 코스피 대형주 대비 장기 초과수익을 내는지, 그 원인과 리스크를 분석한다.',
    ko: `**소형주 효과(Small-Cap Effect)**는 소형주가 대형주보다 장기적으로 높은 수익률을 낸다는 것이다. 1981년 Banz 교수가 미국 시장에서 처음 발견한 이 현상이 한국 시장에서도 작동하는가?

코스닥 소형주와 코스피 대형주를 장기간 비교한 연구에 따르면, **한국 시장에서도 소형주 효과는 존재하지만 일관적이지 않다.**

**소형주 초과수익이 나타나는 환경**: 경기 확장기, 코스닥 투자 심리가 좋을 때, 개인투자자 활동이 활발할 때 소형주 초과수익이 두드러졌다.

**대형주가 앞서는 환경**: 글로벌 불확실성 증가, 환율 변동성 확대, 기관·외국인 중심 장세에서는 대형 우량주가 방어적으로 강했다.

**한국 특유의 요인**: 코스닥 시장은 **개인투자자 비율이 80% 이상**으로, 개인 심리와 테마에 의한 급등락이 잦다. 이것이 소형주 수익률의 변동성을 크게 만든다.

실용적 결론: 소형주 투자는 **장기 분산 포트폴리오** 관점에서, 그리고 **재무 안정성이 검증된** 기업에 한해 고려해야 한다. 코스닥 테마주 추종은 학술적 소형주 효과와 전혀 다른 투기다.

---
📖 *Small-cap effect in Korean equity market (Empirical)* | [관련 연구](https://papers.ssrn.com/)`,
    en: `The **Small-Cap Effect** posits that small-cap stocks generate higher long-term returns than large-caps. First documented in US markets by Professor Banz in 1981 — does it work in Korea?

Long-term comparison of KOSDAQ small-caps versus KOSPI large-caps shows **the small-cap effect exists in Korea but is inconsistent.**

**Environments where small-cap outperformance appears**: economic expansions, positive KOSDAQ sentiment, and high individual investor activity periods showed pronounced small-cap excess returns.

**Environments where large-caps lead**: during increased global uncertainty, exchange rate volatility, and institutional/foreign-driven markets, large quality stocks showed defensive strength.

**Korea-specific factors**: the KOSDAQ market has **over 80% individual investor participation**, making sharp moves driven by individual psychology and themes frequent — this creates high small-cap return volatility.

Practical conclusion: small-cap investing should be considered in a **long-term diversified portfolio** context, limited to companies with **verified financial stability.** Chasing KOSDAQ theme stocks is speculation, not the academic small-cap effect.

---
📖 *Small-cap effect in Korean equity (Empirical)*`,
    journal: 'Korea Journal of Financial Studies', pubdate: '2023',
  },

  // ── 투자전략·퀀트 (cat 3) ────────────────────────────────
  {
    cat: 3,
    title_ko: '팩터 투자의 5가지 핵심 — Fama-French 모델 완전 정복',
    title: 'Five Factor Investing Essentials: Mastering the Fama-French Model',
    slug: 'fama-french-five-factor-model-guide',
    summary_ko: 'Fama-French 5팩터 모델(시장, 규모, 가치, 수익성, 투자)의 각 팩터가 초과수익을 내는 메커니즘을 해설한다.',
    ko: `**팩터 투자(Factor Investing)**는 "왜 어떤 주식은 꾸준히 시장을 이기는가?"라는 질문에 답하는 체계다. 노벨 경제학상을 받은 Eugene Fama와 Kenneth French가 수십 년의 연구 끝에 제시한 **5팩터 모델**이 현재 가장 광범위하게 사용된다.

**5가지 팩터:**

**① 시장 팩터(Market)**: 주식이 채권보다 높은 수익을 내는 이유 — 리스크 프리미엄. 기본이자 가장 크다.

**② 규모 팩터(SMB, Small Minus Big)**: 소형주 > 대형주. 소형주는 리스크가 높아 더 높은 기대수익을 제공한다. 단, 최근 약화됐다는 연구가 많다.

**③ 가치 팩터(HML, High Minus Low)**: 저PBR·저PER > 고PBR·고PER. "싼 주식이 비싼 주식을 이긴다"의 학술적 표현.

**④ 수익성 팩터(RMW, Robust Minus Weak)**: 수익성 높은 기업 > 수익성 낮은 기업. 같은 가격이면 돈 잘 버는 회사가 낫다.

**⑤ 투자 팩터(CMA, Conservative Minus Aggressive)**: 보수적 투자 기업 > 공격적 투자 기업. 무리하게 확장하는 기업보다 선별적으로 투자하는 기업이 더 가치를 창출한다.

실용적 시사점: 팩터 ETF(예: 가치 ETF, 퀄리티 ETF)를 활용하면 개인투자자도 팩터 프리미엄에 저비용으로 접근할 수 있다.

---
📖 *Fama-French five factor model (Foundational research)* | [관련 연구](https://papers.ssrn.com/)`,
    en: `**Factor Investing** answers the question: "Why do some stocks consistently beat the market?" Nobel laureate Eugene Fama and Kenneth French's **5-factor model**, developed over decades of research, is now the most widely used framework.

**The 5 Factors:**

**① Market Factor**: why stocks earn more than bonds — the risk premium. The most fundamental and largest factor.

**② Size Factor (SMB, Small Minus Big)**: small-caps > large-caps. Small caps carry higher risk, thus offering higher expected returns. Note: recent research suggests this has weakened.

**③ Value Factor (HML, High Minus Low)**: low PBR/PER > high PBR/PER. The academic expression of "cheap stocks beat expensive ones."

**④ Profitability Factor (RMW, Robust Minus Weak)**: highly profitable firms > low-profitability firms. Given equal price, better-earning companies win.

**⑤ Investment Factor (CMA, Conservative Minus Aggressive)**: conservatively investing firms > aggressively expanding firms. Selective investors create more value than aggressive expanders.

Practical implication: factor ETFs (value ETF, quality ETF) allow individual investors to access factor premiums at low cost.

---
📖 *Fama-French five factor model (Foundational)*`,
    journal: 'Journal of Financial Economics', pubdate: '2015',
  },
  {
    cat: 3,
    title_ko: '퀀트 투자의 역설 — 알려진 팩터는 왜 약해지는가',
    title: 'The Quant Paradox: Why Published Factors Decay Over Time',
    slug: 'factor-decay-quant-investing-paradox',
    summary_ko: '학술적으로 발표된 투자 팩터들이 발표 이후 성과가 약해지는 "팩터 붕괴" 현상을 분석하고, 살아남는 팩터의 조건을 탐구한다.',
    ko: `학술지에 "이 전략으로 초과수익을 낼 수 있다"는 논문이 발표되면 어떻게 될까? **아이러니하게도 그 전략의 수익이 줄어든다.** 투자자들이 논문을 보고 그 전략에 따라 투자하면서 초과수익 기회가 소진되기 때문이다.

이 현상을 **팩터 붕괴(Factor Decay)** 혹은 **출판 이후 수익 감소(Post-Publication Decay)**라고 부른다.

연구에 따르면 학술 논문에 발표된 팩터들의 **평균 초과수익은 발표 전 대비 발표 후 약 32% 감소**했다. 특히 규모가 작고 유동성이 낮은 주식에서 발견된 팩터들, 그리고 **데이터 마이닝으로 의심되는 팩터들**에서 감소폭이 컸다.

**살아남는 팩터의 3가지 조건:**
1. **경제적 근거가 명확할 것** — 단순 통계적 발견이 아닌 행동재무적·리스크 기반 설명이 있어야 한다
2. **대용량·고유동성 시장에서도 작동할 것** — 소형주에서만 나타나는 팩터는 실제로 활용 불가능하다
3. **여러 국가에서 재현될 것** — 하나의 시장에서만 발견된 팩터는 우연일 가능성이 높다

모멘텀, 가치, 수익성 팩터는 이 세 조건을 만족해 여전히 유효하다는 평가를 받는다.

---
📖 *Factor decay and post-publication performance (Meta-analysis)* | [관련 연구](https://papers.ssrn.com/)`,
    en: `What happens when an academic paper publishes "this strategy generates excess returns"? **Ironically, that strategy's returns diminish** — investors read the paper and trade accordingly, exhausting the excess return opportunity.

This phenomenon is called **Factor Decay** or **Post-Publication Decay.**

Research shows that factors published in academic papers experienced **average excess return declines of ~32% post-publication** versus pre-publication. Particularly large declines occurred for factors found in small, low-liquidity stocks and factors **suspected of data mining**.

**3 Conditions for Factor Survival:**
1. **Clear economic rationale** — must have behavioral finance or risk-based explanation, not mere statistical finding
2. **Works in large, liquid markets** — factors only appearing in small-caps are practically unusable
3. **Replicates across multiple countries** — factors found only in one market are likely coincidental

Momentum, value, and profitability factors satisfy these three conditions and continue to be considered valid.

---
📖 *Factor decay and post-publication performance (Meta-analysis)*`,
    journal: 'Review of Financial Studies', pubdate: '2023',
  },

  // ── 행동재무·심리 (cat 4) ────────────────────────────────
  {
    cat: 4,
    title_ko: '투자자의 10가지 심리적 함정 — 행동재무학이 밝히는 손실의 원인',
    title: '10 Psychological Traps Investors Fall Into: Behavioral Finance Insights',
    slug: 'investor-psychological-biases-behavioral-finance',
    summary_ko: '행동재무학 연구에서 밝혀진 투자 수익률을 갉아먹는 10가지 인지적 편향과 그 극복 전략을 소개한다.',
    ko: `합리적 인간이라면 주식 투자에서 항상 최적 결정을 내려야 한다. 하지만 현실은 정반대다. 수십 년의 행동재무학 연구가 밝혀낸 것은 **인간은 체계적으로 비합리적**이라는 것이다.

투자 수익률을 갉아먹는 주요 심리 편향:

**① 손실 회피(Loss Aversion)**: 동일한 금액이라도 손실의 고통이 이익의 기쁨보다 2배 이상 크게 느껴진다. 결과: 손실 종목을 팔지 못하고 계속 보유한다.

**② 확인 편향(Confirmation Bias)**: 자신의 투자 논리를 지지하는 정보만 찾고, 반대 정보는 무시한다. 결과: 잘못된 투자 논리를 수정하지 못한다.

**③ 과잉 자신감(Overconfidence)**: 자신의 종목 선택 능력을 과대평가한다. 연구에 따르면 더 많이 거래하는 투자자일수록 수익률이 낮다.

**④ 닻 내림 효과(Anchoring)**: "고점 대비 몇 % 하락했다"는 임의의 기준에 집착한다. 주가의 절대 레벨보다 중요한 것은 미래 가치다.

**⑤ 군중 심리(Herding)**: 남들이 사면 나도 사고, 남들이 팔면 나도 판다. 버블 형성의 핵심 원인이다.

**극복 전략**: 사전에 투자 원칙을 문서화하고, 정기적으로 기계적 리밸런싱을 실시하며, 가급적 감정이 개입되지 않는 **규칙 기반(rules-based) 투자**를 실천하는 것이 효과적이다.

---
📖 *Investor cognitive biases and portfolio performance (Behavioral finance review)* | [관련 연구](https://papers.ssrn.com/)`,
    en: `A rational investor should always make optimal decisions. Reality is the opposite — decades of behavioral finance research reveal that **humans are systematically irrational.**

Key psychological biases eating into investment returns:

**① Loss Aversion**: losses feel 2x+ more painful than equivalent gains feel pleasurable. Result: holding losing positions instead of selling.

**② Confirmation Bias**: seeking only information supporting existing investment thesis, ignoring contrary evidence. Result: inability to correct flawed investment logic.

**③ Overconfidence**: overestimating stock selection ability. Research shows more active traders earn lower returns.

**④ Anchoring**: obsessing over arbitrary reference points like "% down from high." Future value matters more than absolute price level.

**⑤ Herding**: buying because others are buying, selling because others are selling. Core cause of bubble formation.

**Overcoming strategies**: documenting investment principles in advance, regularly conducting mechanical rebalancing, and practicing **rules-based investing** that minimizes emotional involvement are proven effective approaches.

---
📖 *Investor biases and portfolio performance (Behavioral finance)*`,
    journal: 'Journal of Behavioral Finance', pubdate: '2023',
  },
  {
    cat: 4,
    title_ko: '공포 탐욕 지수, 투자 신호로 실제로 작동하는가',
    title: 'Does the Fear and Greed Index Actually Work as an Investment Signal',
    slug: 'fear-greed-index-investment-signal-efficacy',
    summary_ko: 'CNN Fear & Greed Index를 비롯한 투자 심리 지표들의 역투자(contrarian) 신호로서의 유효성을 실증 분석한다.',
    ko: `"탐욕스러울 때 두려워하고, 두려워할 때 탐욕스러워라" — 워런 버핏의 유명한 격언이다. CNN이 개발한 **공포 탐욕 지수(Fear & Greed Index)**는 이 원칙을 수치화한 도구다. 7가지 시장 지표를 종합해 0(극도의 공포) ~ 100(극도의 탐욕)으로 나타낸다.

학술적 검증: 공포 탐욕 지수가 실제로 역투자 신호로 작동하는가?

**연구 결과**: 공포 탐욕 지수가 **극도의 공포(0-25)** 구간에서 매수하고 **극도의 탐욕(75-100)** 구간에서 매도하는 전략이 단순 보유(buy-and-hold) 대비 **통계적으로 유의미한 초과수익**을 보였다.

**하지만 주의사항이 있다:**
- 극단 구간이 지속되는 기간이 예측 불가능하다 — 공포 구간이 몇 주에서 몇 달간 이어질 수 있다
- 구조적 하락장(secular bear market)에서는 신호의 신뢰도가 낮아진다
- 단기 트레이딩보다 **중기(3-6개월) 포지셔닝**에 더 유효했다

종합적으로, 공포 탐욕 지수는 **포트폴리오 비중 조절**의 보조 도구로 활용하기에 적합하다. 단독 매매 신호로 사용하기에는 노이즈가 너무 많다.

---
📖 *Sentiment indicators as contrarian investment signals (Empirical study)* | [관련 연구](https://papers.ssrn.com/)`,
    en: `"Be fearful when others are greedy, and greedy when others are fearful" — Warren Buffett's famous maxim. CNN's **Fear & Greed Index** quantifies this principle, synthesizing 7 market indicators into a 0 (extreme fear) to 100 (extreme greed) scale.

Academic validation: does the Fear & Greed Index actually work as a contrarian signal?

**Research findings**: a strategy buying when the index was in **extreme fear (0-25)** and selling at **extreme greed (75-100)** showed **statistically significant excess returns** versus buy-and-hold.

**Important caveats:**
- The duration of extreme zones is unpredictable — fear zones can persist for weeks to months
- Signal reliability decreases during structural bear markets (secular downtrends)
- More effective for **medium-term (3-6 month) positioning** than short-term trading

Overall, the Fear & Greed Index is suitable as a **supplementary portfolio allocation tool**. Too much noise to use as a standalone trading signal.

---
📖 *Sentiment indicators as contrarian signals (Empirical)*`,
    journal: 'Journal of Behavioral and Experimental Finance', pubdate: '2024',
  },

  // ── 기술적 분석 (cat 5) ──────────────────────────────────
  {
    cat: 5,
    title_ko: '딥러닝이 캔들차트를 읽는다 — AI 기술적 분석의 현주소',
    title: 'Deep Learning Reads Candlestick Charts: Current State of AI Technical Analysis',
    slug: 'deep-learning-candlestick-technical-analysis',
    summary_ko: 'CNN, LSTM 등 딥러닝 모델이 캔들스틱 패턴을 학습해 주가를 예측하는 연구들을 종합하고, 실제 수익성을 검토한다.',
    ko: `기술적 분석가들은 수십 년간 캔들차트에서 **망치형, 도지, 삼성형** 같은 패턴을 찾아 매매 시점을 판단해왔다. 이 패턴들이 실제로 작동한다면, 딥러닝이 훨씬 더 많은 패턴을 인식하고 더 정확하게 예측할 수 있지 않을까?

최근 연구들은 **CNN(합성곱 신경망)**과 **LSTM(장단기 메모리)** 모델을 캔들차트 이미지 학습에 적용했다.

**성과**: 딥러닝 모델이 전통적인 규칙 기반 기술적 분석보다 패턴 인식에서 우수한 성능을 보였다. 단기(1-5일) 방향성 예측 정확도가 55-62% 수준으로, 50%를 유의미하게 상회했다.

**하지만 실제 수익성은 별개 문제다.** 55% 정확도가 있어도, 거래 비용(수수료, 슬리피지)을 고려하면 실제 전략의 초과수익이 사라지는 경우가 많았다. 또한 **오버피팅(overfitting)** 문제 — 학습 데이터에 지나치게 맞춰져 실제 시장에서 성능이 저하되는 현상 — 이 심각한 과제로 남아 있다.

결론: AI 기술적 분석은 학문적으로 흥미롭고 일부 시그널은 유효하지만, **실제 투자 전략으로 사용하려면 체계적인 백테스트와 실제 거래 비용 반영**이 필수적이다.

---
📖 *Deep learning for candlestick pattern prediction (Empirical/ML study)* | [관련 연구](https://papers.ssrn.com/)`,
    en: `Technical analysts have spent decades identifying patterns like **Hammer, Doji, and Three Stars** in candlestick charts to time trades. If these patterns actually work, could deep learning recognize far more patterns and predict more accurately?

Recent research applied **CNN (Convolutional Neural Networks)** and **LSTM (Long Short-Term Memory)** models to candlestick chart image learning.

**Performance**: deep learning models showed superior pattern recognition versus traditional rule-based technical analysis. Short-term (1-5 day) directional prediction accuracy reached 55-62%, significantly exceeding the 50% baseline.

**But actual profitability is a separate question.** Even with 55% accuracy, many strategies lost excess returns when accounting for transaction costs (commissions, slippage). Additionally, **overfitting** — models performing well on training data but deteriorating in real markets — remains a serious challenge.

Conclusion: AI technical analysis is academically interesting and some signals are valid, but **systematic backtesting with realistic transaction costs** is essential before deploying as an actual investment strategy.

---
📖 *Deep learning for candlestick prediction (ML empirical)*`,
    journal: 'Expert Systems with Applications', pubdate: '2024',
  },
  {
    cat: 5,
    title_ko: '이동평균선 전략의 진실 — 50일선과 200일선은 정말 의미 있는가',
    title: 'Truth About Moving Average Strategies: Are the 50-Day and 200-Day Lines Real',
    slug: 'moving-average-strategy-50day-200day-evidence',
    summary_ko: '50일, 200일 이동평균선 기반 매매 전략의 실증적 성과를 분석하고, 어떤 시장 환경에서 유효한지 탐구한다.',
    ko: `주식 방송과 HTS 화면에서 빠질 수 없는 **50일선(MA50)**과 **200일선(MA200)**. "주가가 200일선 위에 있으면 상승 추세, 아래면 하락 추세"라는 말은 투자자들의 공식처럼 굳어졌다. 두 이동평균선의 **골든크로스(MA50이 MA200을 상향 돌파)**와 **데드크로스(MA50이 MA200을 하향 돌파)**는 매매 신호로 널리 사용된다.

학술 연구는 이 전략을 어떻게 평가하는가?

**장기 데이터 분석 결과**: 미국 주식시장에서 200일선 기반 전략(200일선 위→보유, 아래→현금)은 **단순 보유보다 변동성을 줄이는 데 효과적**이었다. 연 수익률은 비슷하지만 최대 낙폭(Maximum Drawdown)이 크게 감소했다.

**그러나 단순하지 않다**: 이 효과는 **추세가 뚜렷한 장세**에서만 작동했다. 횡보장에서는 잦은 신호로 인한 거래 비용이 수익을 잠식했고, 급락 후 급반등 시에는 오히려 크게 불리했다.

**한국 시장 적용**: 코스피에서도 유사한 패턴이 확인됐지만, **미국보다 신호의 신뢰도가 낮았다.** 외부 충격(지정학, 환율)에 의한 예측 불가능한 변동이 많기 때문이다.

이동평균선은 **추세 확인과 리스크 관리 도구**로 가치 있지만, 단독 매매 신호로의 신뢰도는 제한적이다.

---
📖 *Moving average trading strategies performance (Empirical)* | [관련 연구](https://papers.ssrn.com/)`,
    en: `**MA50 and MA200** — staples of stock broadcasts and trading platforms. "Price above the 200-day line means uptrend; below means downtrend" has become investors' conventional wisdom. The **Golden Cross (MA50 crossing above MA200)** and **Death Cross (MA50 crossing below MA200)** are widely used as trading signals.

How does academic research evaluate these strategies?

**Long-term data analysis**: in US equity markets, MA200-based strategies (hold above MA200, cash below) were **effective at reducing volatility** versus simple buy-and-hold. Annual returns were similar, but Maximum Drawdown significantly decreased.

**But it's not simple**: this effect only worked in **strong trending markets.** In sideways markets, frequent signals' transaction costs eroded returns, and sharp rebounds after declines were particularly disadvantageous.

**Korean market application**: similar patterns confirmed in KOSPI, but **signal reliability was lower than in the US** — more unpredictable volatility from external shocks (geopolitics, exchange rates).

Moving averages have value as **trend confirmation and risk management tools**, but reliability as standalone trading signals is limited.

---
📖 *Moving average trading strategies (Empirical)*`,
    journal: 'Journal of Technical Analysis', pubdate: '2023',
  },

  // ── 투자비법·인사이트 (cat 6) ────────────────────────────
  {
    cat: 6,
    title_ko: '워런 버핏 포트폴리오 40년 분석 — 그의 진짜 투자 원칙',
    title: 'Warren Buffett Portfolio 40-Year Analysis: His Real Investment Principles',
    slug: 'warren-buffett-portfolio-analysis-investment-principles',
    summary_ko: '버크셔 해서웨이 연차보고서와 포트폴리오 공시 데이터를 분석해 워런 버핏의 실제 종목 선택 기준과 패턴을 규명한다.',
    ko: `워런 버핏은 역사상 가장 위대한 투자자다. 1965년부터 버크셔 해서웨이를 운영하며 S&P 500의 **연평균 2배 이상의 수익률**을 60년간 기록했다. 그의 말은 투자 격언이 되고, 그의 주주서한은 MBA 교재가 됐다.

그런데 버핏이 **실제로** 어떤 기준으로 주식을 선택했는지 데이터로 분석하면 어떤 결론이 나올까?

**팩터 분석 결과**: 버핏의 포트폴리오를 학술적 팩터로 분해하면, 그의 성과는 크게 세 가지 팩터에서 설명된다.
1. **저변동성(Low Volatility)**: 버핏은 변동성이 낮고 안정적인 수익을 내는 기업을 선호했다
2. **높은 수익성(High Profitability)**: ROE, ROA가 높은 기업 — 즉 돈을 잘 버는 기업
3. **레버리지 활용**: 버핏은 보험 사업에서 나오는 **플로트(float)**를 저금리 레버리지처럼 활용해 수익을 증폭했다

**개인투자자가 배울 수 있는 것:**
- 이해할 수 있는 사업만 투자한다
- 경쟁우위(해자, Economic Moat)가 뚜렷한 기업을 선택한다
- 장기 보유를 전제로 하되, 논리가 깨지면 과감히 매도한다
- 분산보다 집중 — 확신하는 몇 개 종목에 의미 있는 비중 투자

---
📖 *Buffett alpha factor decomposition (Academic study)* | [관련 연구](https://papers.ssrn.com/)`,
    en: `Warren Buffett is the greatest investor in history. Running Berkshire Hathaway since 1965, he has recorded **more than double the S&P 500's annual average return** over 60 years. His words became investment maxims; his shareholder letters became MBA textbooks.

But what does data analysis reveal about Buffett's **actual** stock selection criteria?

**Factor decomposition results**: breaking down Buffett's portfolio into academic factors, his performance is largely explained by three factors:
1. **Low Volatility**: Buffett favored companies with low volatility and stable earnings
2. **High Profitability**: high ROE, ROA companies — firms that earn money well
3. **Leverage utilization**: Buffett amplified returns using insurance business **float** as low-cost leverage

**What individual investors can learn:**
- Only invest in businesses you can understand
- Choose companies with clear competitive advantages (Economic Moat)
- Commit to long-term holding, but sell decisively when the logic breaks
- Concentration over diversification — meaningful positions in a few high-conviction holdings

---
📖 *Buffett alpha factor decomposition (Academic)*`,
    journal: 'Financial Analysts Journal', pubdate: '2018',
  },
  {
    cat: 6,
    title_ko: '분산투자의 수학 — 몇 개 종목이 최적인가',
    title: 'Mathematics of Diversification: How Many Stocks Are Optimal',
    slug: 'portfolio-diversification-optimal-stock-count',
    summary_ko: '포트폴리오 분산투자에서 종목 수와 리스크 감소의 관계를 수학적으로 분석하고, 개인투자자에게 최적인 종목 수를 제시한다.',
    ko: `"분산투자가 중요하다"는 말은 누구나 안다. 하지만 **몇 개 종목에 투자해야 충분히 분산되는가?** 이 질문에는 놀랍도록 명확한 수학적 답이 있다.

**포트폴리오 분산의 수학:**
- 1개 종목: 시장 대비 변동성 100% (개별 리스크 전부 부담)
- 5개 종목: 변동성 약 60% 감소
- 10개 종목: 변동성 약 75% 감소
- 20개 종목: 변동성 약 85% 감소
- 30개 종목: 변동성 약 88% 감소
- 100개 종목: 변동성 약 90% 감소 (시장 리스크만 남음)

결론: **20-30개 종목부터 추가 분산 효과가 급격히 감소한다.** 500개 종목을 보유한 인덱스 펀드와 30개 종목 포트폴리오의 분산 효과 차이는 겨우 2%다.

**단, 이 계산은 무작위 분산을 가정한다.** 삼성전자, SK하이닉스, TSMC를 모두 보유해도 모두 반도체 섹터이므로 진정한 분산이 아니다. 진짜 분산은 **섹터, 지역, 자산군의 다변화**다.

**개인투자자 실용 전략**: 핵심 자산(시장 ETF)으로 베이스를 만들고, 10-15개의 확신 종목을 위성(satellite)으로 운용하는 **코어-새틀라이트** 전략이 분산과 집중의 균형을 잡는 최선의 방법이다.

---
📖 *Optimal portfolio diversification and stock count (Portfolio theory)* | [관련 연구](https://papers.ssrn.com/)`,
    en: `Everyone knows "diversification is important." But **how many stocks are enough for sufficient diversification?** This question has a surprisingly clear mathematical answer.

**The mathematics of portfolio diversification:**
- 1 stock: 100% market-relative volatility (bearing all individual risk)
- 5 stocks: ~60% volatility reduction
- 10 stocks: ~75% volatility reduction
- 20 stocks: ~85% volatility reduction
- 30 stocks: ~88% volatility reduction
- 100 stocks: ~90% volatility reduction (only market risk remains)

Conclusion: **after 20-30 stocks, additional diversification benefit decreases sharply.** The diversification difference between a 500-stock index fund and a 30-stock portfolio is only 2%.

**However, this calculation assumes random diversification.** Holding Samsung Electronics, SK Hynix, and TSMC together isn't true diversification — all are semiconductor sector. Real diversification means **sector, geographic, and asset class variety.**

**Practical individual investor strategy**: build a base with core assets (market ETF) and operate 10-15 high-conviction stocks as satellites — the **Core-Satellite** strategy best balances diversification and concentration.

---
📖 *Optimal diversification and stock count (Portfolio theory)*`,
    journal: 'Journal of Portfolio Management', pubdate: '2022',
  },
];

function extractSummary(c) {
  if (!c) return '';
  return c.replace(/\*\*/g,'').replace(/\[([^\]]+)\]\([^)]+\)/g,'$1')
    .replace(/^#{1,3}\s+.*/gm,'').replace(/^---.*$/gm,'').replace(/^📖.*$/gm,'')
    .replace(/\n{2,}/g,'\n').trim()
    .split('\n').filter(l=>l.trim().length>20)[0]?.trim().substring(0,200) || '';
}

function makeSlug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'');
}

(async () => {
  const conn = await mysql.createConnection({ host:'127.0.0.1', port:3306, user:'user', password:'devapril#aws123', database:'stock' });

  // 각 카테고리 샘플 썸네일 (Unsplash 공개 이미지)
  const thumbs = {
    1: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop',
    2: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop',
    3: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
    4: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=800&auto=format&fit=crop',
    5: 'https://images.unsplash.com/photo-1642790551116-18e4f0d5e0cf?w=800&auto=format&fit=crop',
    6: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop',
  };

  let added = 0;
  for (const a of articles) {
    try {
      const slug = a.slug || makeSlug(a.title).substring(0, 60);
      await conn.query(
        `INSERT IGNORE INTO articles
         (category_id, status, title, title_ko, slug, summary, summary_ko, content, content_ko, thumbnail, source_journal, source_pubdate)
         VALUES (?, 'published', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [a.cat, a.title, a.title_ko, slug,
         a.en.split('\n')[0].replace(/[#*>]/g,'').trim().substring(0,200),
         a.summary_ko || extractSummary(a.ko),
         a.en, a.ko,
         thumbs[a.cat] || '',
         a.journal || '', a.pubdate || '2024']
      );
      added++;
      console.log(`✅ ${a.title_ko}`);
    } catch(e) { console.log(`❌ ${a.title_ko}: ${e.message}`); }
  }

  // article_count 업데이트
  await conn.query(`UPDATE categories c SET article_count=(SELECT COUNT(*) FROM articles a WHERE a.category_id=c.id AND a.status='published')`);

  const [stats] = await conn.query("SELECT c.name_ko, COUNT(*) as cnt FROM articles a JOIN categories c ON a.category_id=c.id WHERE a.status='published' GROUP BY c.name_ko");
  console.log(`\n✅ ${added}건 추가`);
  console.table(stats);
  await conn.end();
})();
