# Vibe-Trading 项目 Code Wiki

## 1. 项目概述

Vibe-Trading 是一个开源的量化研究工作空间，将金融问题转化为可执行的分析。它将自然语言提示连接到市场数据加载器、策略生成、回测引擎、报告、导出和持久化研究记忆。

### 主要特性

- **自改进交易代理** - 自然语言市场研究、策略草稿和文件/网页分析
- **多代理交易团队** - 29个预配置团队，如投资、量化、加密和风险管理团队
- **跨市场数据和回测** - 支持A股/H股/美股、加密货币、期货和外汇
- **影子账户** - 从经纪人交易日志提取策略规则并回测对比
- **Alpha Zoo** - 452个预构建量化因子，跨4个因子库

### 技术栈

- **后端**: Python 3.11+, FastAPI, LangChain, LangGraph
- **前端**: React 19, TypeScript, Vite, ECharts
- **数据**: Pandas, NumPy, Tushare, AKShare, yfinance, OKX, CCXT
- **AI**: 支持 OpenRouter, OpenAI, DeepSeek, Gemini, Groq, 通义千问等多个LLM提供商

---

## 2. 项目目录结构

```
Vibe-Trading/
├── agent/                          # 后端（Python）
│   ├── backtest/                   # 回测系统
│   │   ├── engines/                # 回测引擎
│   │   │   ├── base.py             # 基础回测引擎
│   │   │   ├── china_a.py          # A股回测引擎
│   │   │   ├── china_futures.py    # 中国期货引擎
│   │   │   ├── crypto.py           # 加密货币引擎
│   │   │   ├── forex.py            # 外汇引擎
│   │   │   ├── global_equity.py    # 全球股票引擎
│   │   │   └── composite.py        # 混合市场引擎
│   │   ├── loaders/                # 数据加载器
│   │   │   ├── tushare.py          # Tushare数据加载
│   │   │   ├── akshare.py          # AKShare数据加载
│   │   │   ├── yfinance_loader.py  # yfinance加载
│   │   │   ├── okx.py              # OKX加密数据
│   │   │   └── ccxt_loader.py      # CCXT通用加载器
│   │   ├── optimizers/             # 优化器
│   │   ├── metrics.py              # 回测指标计算
│   │   ├── models.py               # 回测数据模型
│   │   ├── runner.py               # 回测入口
│   │   └── validation.py           # 验证工具
│   │
│   ├── src/                        # 核心源代码
│   │   ├── agent/                  # ReAct代理核心
│   │   │   ├── loop.py             # 5层上下文管理循环
│   │   │   ├── context.py          # 上下文构建器
│   │   │   ├── memory.py           # 工作区内存
│   │   │   ├── tools.py            # 工具基类和注册表
│   │   │   ├── skills.py           # 技能加载器
│   │   │   ├── trace.py            # 执行跟踪记录
│   │   │   └── progress.py         # 进度心跳事件
│   │   │
│   │   ├── factors/                # Alpha因子系统
│   │   │   ├── zoo/                # 预构建因子库
│   │   │   │   ├── qlib158/        # Microsoft QLib (Apache 2.0)
│   │   │   │   ├── alpha101/       # Kakushadze 101因子
│   │   │   │   ├── gtja191/        # 国泰君安191因子
│   │   │   │   └── academic/       # 学术因子（FF5+Carhart）
│   │   │   ├── base.py             # 因子基础算子
│   │   │   ├── registry.py         # 因子注册表
│   │   │   ├── bench_runner.py     # 因子benchmark
│   │   │   └── cli_handlers.py     # 因子CLI命令
│   │   │
│   │   ├── swarm/                  # 多代理系统
│   │   │   ├── presets/            # 团队预设（29个）
│   │   │   ├── models.py           # Swarm数据模型
│   │   │   ├── runtime.py          # 运行时引擎
│   │   │   ├── worker.py           # 工作代理
│   │   │   ├── store.py            # 状态存储
│   │   │   └── grounding.py        # 数据落地
│   │   │
│   │   ├── shadow_account/         # 影子账户系统
│   │   │   ├── extractor.py        # 策略规则提取
│   │   │   ├── backtester.py       # 影子回测
│   │   │   ├── reporter.py         # 报告生成
│   │   │   └── storage.py          # 数据存储
│   │   │
│   │   ├── tools/                  # 31个代理工具
│   │   │   ├── backtest_tool.py    # 回测工具
│   │   │   ├── alpha_zoo_tool.py   # Alpha Zoo工具
│   │   │   ├── factor_analysis_tool.py # 因子分析
│   │   │   ├── web_reader_tool.py  # 网页读取
│   │   │   ├── doc_reader_tool.py  # 文档读取
│   │   │   ├── read_file_tool.py   # 文件读取
│   │   │   ├── write_file_tool.py  # 文件写入
│   │   │   └── ...
│   │   │
│   │   ├── skills/                 # 75个金融技能
│   │   │   ├── technical_basic/    # 基础技术分析
│   │   │   ├── multi_factor/       # 多因子策略
│   │   │   ├── fundamental_filter/ # 基本面筛选
│   │   │   ├── crypto_derivatives/ # 加密衍生品
│   │   │   └── ...
│   │   │
│   │   ├── providers/              # LLM提供商适配器
│   │   │   ├── chat.py             # 通用聊天接口
│   │   │   ├── llm.py              # LLM配置
│   │   │   ├── openai_codex.py     # OpenAI Codex OAuth
│   │   │   └── llm_providers.json  # 提供商元数据
│   │   │
│   │   ├── session/                # 会话管理
│   │   │   ├── service.py          # 会话服务
│   │   │   ├── store.py            # 会话存储
│   │   │   ├── search.py           # FTS5全文搜索
│   │   │   └── events.py           # SSE事件
│   │   │
│   │   ├── memory/                 # 持久化记忆
│   │   │   └── persistent.py       # 基于文件的记忆
│   │   │
│   │   ├── core/                   # 核心模块
│   │   │   ├── runner.py           # 代码执行器
│   │   │   └── state.py            # 运行状态存储
│   │   │
│   │   ├── config/                 # 配置系统
│   │   ├── security/               # 安全相关
│   │   ├── api/                    # API路由
│   │   ├── preflight.py            # 预检查
│   │   └── ui_services.py          # UI服务
│   │
│   ├── cli.py                      # CLI入口
│   ├── api_server.py               # FastAPI服务器
│   ├── mcp_server.py               # MCP服务器
│   ├── requirements.txt            # Python依赖
│   ├── .env.example                # 环境变量示例
│   └── tests/                      # 测试套件
│
├── frontend/                       # 前端（React）
│   ├── src/
│   │   ├── components/
│   │   │   ├── charts/             # 图表组件
│   │   │   ├── chat/               # 聊天组件
│   │   │   └── common/             # 通用组件
│   │   ├── pages/                  # 页面
│   │   ├── stores/                 # Zustand状态管理
│   │   ├── lib/                    # 工具库
│   │   └── main.tsx                # 入口
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.ts
│
├── wiki/                           # 文档
├── Dockerfile
├── docker-compose.yml
├── pyproject.toml                  # Python项目配置
└── README.md
```

---

## 3. 核心架构详解

### 3.1 AgentLoop：5层上下文管理系统

**文件**: [agent/src/agent/loop.py](file:///workspace/agent/src/agent/loop.py)

Vibe-Trading 的 ReAct 代理循环实现了 5 层上下文管理，确保在长对话中保持高效的上下文使用：

| 层级 | 名称 | 描述 |
|------|------|------|
| L1 | microcompact | 静默修剪旧工具结果，保留最近N个完整 |
| L2 | context_collapse | 无LLM调用的文本折叠（零成本） |
| L3 | auto_compact | 带token预算尾部保护的LLM结构化摘要 |
| L4 | compact tool | 模型显式调用压缩工具触发L3 |
| L5 | iterative update | 第N次压缩更新之前摘要而非重新开始 |

**关键类**:
```python
class AgentLoop:
    def __init__(
        self,
        registry: ToolRegistry,
        llm: ChatLLM,
        event_callback: Callable,
        max_iterations: int = 50,
        persistent_memory: Optional[PersistentMemory] = None,
    ):
        # 初始化代理循环
        pass
    
    def run(self, user_message: str, history: Optional[List[Dict]] = None) -> Dict:
        # 执行代理循环
        pass
    
    def cancel(self):
        # 优雅取消当前运行
        pass
```

**工具执行**:
- 读/写批处理：连续的只读工具通过线程并行运行
- 进度心跳：每个工具调用发出 3 秒间隔的心跳事件
- 结构化进度：分阶段进度，带已知总数时的确定进度环

### 3.2 回测系统架构

**核心文件**: [agent/backtest/engines/base.py](file:///workspace/agent/backtest/engines/base.py)

回测系统使用继承式架构，所有市场引擎继承自 `BaseEngine` 并重写市场规则方法：

```
BaseEngine
├── ChinaAEngine (A股)
├── ChinaFuturesEngine (中国期货)
├── CryptoEngine (加密货币)
├── ForexEngine (外汇)
├── GlobalEquityEngine (全球股票)
├── GlobalFuturesEngine (全球期货)
└── CompositeEngine (混合市场)
```

**回测流程**:
1. 数据加载 → `loader.load()`
2. 信号生成 → `signal_engine.compute()`
3. 目标权重预计算（带优化器）→ `optimizer()`
4. 逐根K线执行，执行市场规则 → `engine.run_backtest()`
5. 指标计算 → `calc_metrics()`
6. 生成artifact → `equity.csv`, `metrics.csv`, `trades.csv`

**回测工具**: [agent/src/tools/backtest_tool.py](file:///workspace/agent/src/tools/backtest_tool.py)
```python
def run_backtest(run_dir: str) -> str:
    """
    1. 验证 run_dir 和 config.json
    2. 验证 signal_engine.py
    3. 调用内置回测引擎
    4. 收集 artifacts 并返回JSON结果
    """
```

### 3.3 Alpha Zoo 因子系统

**文件**: [agent/src/factors/base.py](file:///workspace/agent/src/factors/base.py)

Alpha Zoo 提供 452 个预构建量化因子，所有因子算子都作用于宽格式 `pd.DataFrame`：
- `index`: 交易日期 (DatetimeIndex)
- `columns`: 证券代码 (str)
- 返回相同形状的 DataFrame，原始分数，NaN 保留

**因子库**:
| 库 | 数量 | 来源 | 许可 |
|----|------|------|------|
| qlib158 | 154 | Microsoft QLib | Apache 2.0 |
| alpha101 | 101 | Kakushadze (2015) | 数学内容 |
| gtja191 | 191 | 国泰君安 | 数学内容 |
| academic | 6 | Fama-French 5 + Carhart | 公开学术 |

**核心算子**:
```python
def rank(df: pd.DataFrame) -> pd.DataFrame
    # 横截面百分位排名
def scale(df: pd.DataFrame, a: float = 1.0) -> pd.DataFrame
    # 每行L1归一化
def ts_rank(df: pd.DataFrame, n: int) -> pd.DataFrame
    # 滚动窗口排名
```

**关键保证**:
- NaN 传播：无静默 fillna(0)
- 前瞻性禁止：delta(df, d) 要求 d >= 1
- 无 +/- inf：注册表拒绝无效值

### 3.4 Swarm 多代理系统

**文件**: [agent/src/swarm/models.py](file:///workspace/agent/src/swarm/models.py)

Swarm 系统实现了多代理协作研究，包含 29 个预配置团队。

**数据模型**:
- `SwarmAgentSpec` - 代理角色定义（身份、工具、约束）
- `SwarmTask` - 任务节点（DAG依赖、状态、摘要）
- `SwarmRun` - 完整运行状态（持久化）
- `SwarmEvent` - 事件日志（SSE流式）

**生命周期**:
```
TaskStatus: pending → blocked → in_progress → completed|failed|cancelled
RunStatus:  pending → running → completed|failed|cancelled
```

**预配置团队示例** ([agent/src/swarm/presets/](file:///workspace/agent/src/swarm/presets)):
- `investment_committee` - 牛熊辩论→风险审查→PM最终决策
- `global_equities_desk` - A股+港股+美股+加密研究员→全球策略师
- `crypto_trading_desk` - 资金费率+清算+资金流→风控经理
- `quant_strategy_desk` - 筛选→因子研究→回测→风险审计

### 3.5 影子账户系统

**文件**: [agent/src/shadow_account/](file:///workspace/agent/src/shadow_account/)

影子账户从经纪人交易日志提取策略规则并进行回测对比：

1. **交易日志分析** - 解析同花顺/东方财富/富途/通用CSV
2. **行为画像** - 持仓天数、胜率、盈亏比、回撤、处置效应
3. **规则提取** - 将重复的入场/出场转换为明确策略
4. **影子回测** - 回测提取的规则，高亮规则违反、早出场、错过信号
5. **报告生成** - HTML/PDF报告，可检查、存档或后续会话优化

---

## 4. API 接口说明

**文件**: [agent/api_server.py](file:///workspace/agent/api_server.py)

### 4.1 核心API端点

| 方法 | 端点 | 描述 |
|------|------|------|
| GET/POST | `/runs` | 列出运行 / 创建新运行 |
| GET | `/runs/{run_id}` | 获取运行详情 |
| GET | `/runs/{run_id}/pine` | 导出指标（TradingView/TDX/MT5） |
| POST | `/sessions` | 创建会话 |
| POST | `/sessions/{id}/messages` | 发送消息 |
| GET | `/sessions/{id}/events` | SSE事件流 |
| POST | `/upload` | 上传文件（PDF/CSV等） |
| GET | `/swarm/presets` | 列出Swarm预设 |
| POST | `/swarm/runs` | 启动Swarm运行 |
| GET | `/swarm/runs/{id}/events` | Swarm SSE流 |
| GET | `/alpha/list` | 列出Alpha因子 |
| GET | `/alpha/{alpha_id}` | 因子详情和源码 |
| POST | `/alpha/bench` | 启动Benchmark |
| GET | `/settings/llm` | 读取LLM设置 |
| PUT | `/settings/llm` | 更新LLM设置 |

### 4.2 安全机制

- `API_AUTH_KEY` - 远程部署时的Bearer令牌认证
- 本地开发时无认证
- Shell工具仅在 `VIBE_TRADING_ENABLE_SHELL_TOOLS=1` 时暴露
- 文件读取限制在允许的根目录内

---

## 5. 前端架构

**文件**: [frontend/package.json](file:///workspace/frontend/package.json)

### 5.1 技术栈

| 技术 | 用途 |
|------|------|
| React 19 | UI框架 |
| TypeScript | 类型安全 |
| Vite | 构建工具 |
| Tailwind CSS | 样式框架 |
| ECharts | 数据可视化（K线、权益曲线、相关性矩阵） |
| Zustand | 状态管理 |
| React Router | 路由 |
| React Markdown | Markdown渲染 |
| Sonner | Toast通知 |

### 5.2 页面结构

| 页面 | 路径 | 功能 |
|------|------|------|
| Home | `/` | 欢迎屏幕，快速开始 |
| Agent | `/agent` | 主聊天界面 |
| Alpha Zoo | `/alpha-zoo` | 因子浏览器 |
| Compare | `/compare` | 运行对比 |
| Correlation | `/correlation` | 相关性分析 |
| Run Detail | `/run/{id}` | 运行详情 |
| Settings | `/settings` | 设置 |

---

## 6. 配置与环境变量

**文件**: [agent/.env.example](file:///workspace/agent/.env.example)

### 6.1 LLM提供商配置

```env
LANGCHAIN_PROVIDER=deepseek  # openrouter/openai/deepseek/gemini/groq/qwen/zhipu/moonshot/minmax/mimo/zai/ollama
LANGCHAIN_MODEL_NAME=deepseek-chat
DEEPSEEK_API_KEY=your-key
DEEPSEEK_BASE_URL=https://api.deepseek.com
```

### 6.2 系统配置

```env
TUSHARE_TOKEN=your-tushare-token  # 可选，AKShare作为免费备份
TIMEOUT_SECONDS=120
TOKEN_THRESHOLD=40000
API_AUTH_KEY=your-secret-key  # 推荐用于远程部署
VIBE_TRADING_ENABLE_SHELL_TOOLS=0
VIBE_TRADING_ALLOWED_FILE_ROOTS=/extra/path1,/extra/path2
VIBE_TRADING_ALLOWED_RUN_ROOTS=/extra/run/path
```

---

## 7. 关键类与函数参考

### 7.1 代理核心 ([agent/src/agent/](file:///workspace/agent/src/agent/))

#### AgentLoop
```python
class AgentLoop:
    def __init__(
        self,
        registry: ToolRegistry,
        llm: ChatLLM,
        event_callback: Callable,
        max_iterations: int = 50,
        persistent_memory: Optional[PersistentMemory] = None,
    ): ...
    
    def run(self, user_message: str, history: Optional[List[Dict]] = None) -> Dict:
        """执行完整的 ReAct 循环"""
    
    def cancel(self):
        """优雅取消当前运行"""
```

#### ToolRegistry
```python
class ToolRegistry:
    def register(self, tool: BaseTool): ...
    def get(self, name: str) -> Optional[BaseTool]: ...
    def list(self) -> List[Dict]: ...
```

### 7.2 回测核心 ([agent/backtest/](file:///workspace/agent/backtest/))

#### BaseEngine
```python
class BaseEngine(ABC):
    @abstractmethod
    def validate_config(self, config: Dict) -> None: ...
    
    @abstractmethod
    def calculate_position_size(self, ...) -> float: ...
    
    def run_backtest(self, data_map: Dict, signal_map: Dict, config: Dict, run_dir: Path):
        """执行完整回测流程"""
```

### 7.3 因子核心 ([agent/src/factors/](file:///workspace/agent/src/factors/))

#### AlphaCompute (Protocol)
```python
@runtime_checkable
class AlphaCompute(Protocol):
    def __call__(self, panel: dict[str, pd.DataFrame]) -> pd.DataFrame:
        """
        panel 包含: 'open', 'high', 'low', 'close', 'volume', 'vwap'
        返回: 相同形状的 DataFrame，原始分数
        """
```

### 7.4 Swarm 核心 ([agent/src/swarm/](file:///workspace/agent/src/swarm/))

#### SwarmRuntime
```python
class SwarmRuntime:
    def __init__(self, preset_path: Path, variables: Dict): ...
    
    async def run(self, run_dir: Path, event_callback: Callable):
        """执行完整的 Swarm 运行"""
```

---

## 8. 开发与部署

### 8.1 本地开发

```bash
# 克隆并安装
git clone https://github.com/HKUDS/Vibe-Trading.git
cd Vibe-Trading
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\Activate.ps1
pip install -e .

# 配置环境
cp agent/.env.example agent/.env
# 编辑 agent/.env，设置 LLM 提供商和 API 密钥

# 运行 CLI
vibe-trading

# 运行 Web UI（终端1）
vibe-trading serve --port 8899

# 运行前端（终端2）
cd frontend && npm install && npm run dev
```

### 8.2 Docker 部署

```bash
git clone https://github.com/HKUDS/Vibe-Trading.git
cd Vibe-Trading
cp agent/.env.example agent/.env
# 编辑 agent/.env
docker compose up --build
# 访问 http://localhost:8899
```

### 8.3 测试

```bash
cd agent
pytest tests/ -v  # 运行所有测试
pytest tests/test_alpha101_samples.py  # 特定测试
```

---

## 9. 依赖关系图

```
agent/
├── langchain, langgraph, langchain-openai
│   └── 用于 LLM 编排和 ReAct 循环
├── pandas, numpy, scipy
│   └── 用于数据处理和因子计算
├── fastapi, uvicorn
│   └── 用于 API 服务器
├── fastmcp
│   └── 用于 MCP 服务器
├── tushare, akshare, yfinance, ccxt, okx
│   └── 用于市场数据加载
├── rich, prompt_toolkit
│   └── 用于 CLI 界面
├── weasyprint, jinja2
│   └── 用于报告生成
└── pytest
    └── 用于测试

frontend/
├── react, react-dom, react-router-dom
│   └── UI 框架和路由
├── echarts
│   └── 数据可视化
├── zustand
│   └── 状态管理
├── tailwindcss
│   └── 样式
└── vite
    └── 构建工具
```

---

## 10. 常见工作流程

### 10.1 回测工作流程

1. 用户用自然语言描述策略 → 代理理解
2. 代理加载相关技能 → 调用数据工具
3. 代理生成 `config.json` 和 `signal_engine.py`
4. 代理调用 `backtest` 工具执行回测
5. 回测引擎生成 artifacts（equity.csv, metrics.csv, trades.csv）
6. 代理分析结果并返回给用户

### 10.2 Swarm 工作流程

1. 用户选择团队预设（如 `investment_committee`）
2. SwarmRuntime 加载预设 YAML
3. 任务 DAG 拓扑排序
4. Worker 按依赖顺序执行
5. 事件通过 SSE 流式返回
6. 最终报告聚合所有工作产品

### 10.3 因子 Benchmark 流程

1. CLI: `vibe-trading alpha bench --zoo gtja191 --universe csi300 --period 2018-2025`
2. BenchRunner 加载所有因子
3. 逐个因子计算 IC/IR
4. 分类 alive/reversed/dead
5. 生成报告和对比图

---

## 11. 版本历史与更新

### 0.1.8 (当前)
- Alpha Zoo v1: 452 个预构建量化因子
- 工具进度反馈和优雅取消
- CompositeEngine 修复（中国期货路由）
- 会话 FTS5 索引持久化时间戳

### 0.1.7
- 安全边界加固
- Web UI 设置页面
- 相关性热图
- OpenAI Codex OAuth
- A股预ST筛选

### 0.1.6
- Swarm 预设打包
- Futu 数据加载器
- vn.py 导出技能
- 前端懒加载优化

---

## 12. 附录：快速参考命令

```bash
# 安装
pip install vibe-trading-ai

# 初始化
vibe-trading init

# 运行研究
vibe-trading run -p "Backtest BTC-USDT 20/50 MA strategy for 2024"

# 启动 Web UI
vibe-trading serve --port 8899

# 启动 MCP 服务器
vibe-trading-mcp

# Alpha Zoo 命令
vibe-trading alpha list --zoo gtja191 --limit 10
vibe-trading alpha show gtja191_171
vibe-trading alpha bench --zoo gtja191 --universe csi300 --period 2018-2025 --top 20

# Swarm 命令
vibe-trading --swarm-presets
vibe-trading --swarm-run investment_committee '{"topic": "BTC outlook"}'
```
