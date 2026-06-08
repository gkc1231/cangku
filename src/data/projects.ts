export interface Project {
  id: number;
  title: string;
  description: string;
  difficulty: '入门' | '中级' | '高级';
  concepts?: string[];
  objectives?: string[];
  code: string;
  sampleOutput: string;
  explanation: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: '基础数据读取与探索',
    description: '学习如何使用pandas读取CSV文件并进行基本的数据探索',
    difficulty: '入门',
    concepts: ['pd.read_csv()', 'DataFrame.head()', 'DataFrame.info()', 'DataFrame.describe()'],
    code: `import pandas as pd

# 创建示例数据
data = {
    '姓名': ['张三', '李四', '王五', '赵六', '钱七'],
    '年龄': [25, 30, 28, 35, 27],
    '城市': ['北京', '上海', '深圳', '广州', '杭州'],
    '薪资': [15000, 20000, 18000, 25000, 16000]
}

df = pd.DataFrame(data)

# 查看数据前几行
print("=== 数据预览 ===")
print(df.head())

# 查看数据基本信息
print("\n=== 数据信息 ===")
print(df.info())

# 查看数值列的统计信息
print("\n=== 数值统计 ===")
print(df.describe())`,
    sampleOutput: `=== 数据预览 ===
     姓名  年龄  城市     薪资
0  张三  25  北京  15000
1  李四  30  上海  20000
2  王五  28  深圳  18000
3  赵六  35  广州  25000
4  钱七  27  杭州  16000

=== 数据信息 ===
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 5 entries, 0 to 4
Data columns (total 4 columns):
  姓名    5 non-null object
  年龄    5 non-null int64
  城市    5 non-null object
  薪资    5 non-null int64

=== 数值统计 ===
              年龄          薪资
count    5.000000    5.000000
mean    29.000000  18800.000000
std      3.807886   3905.124743
min     25.000000  15000.000000
25%     27.000000  16000.000000
50%     28.000000  18000.000000
75%     30.000000  20000.000000
max     35.000000  25000.000000`,
    explanation: '本项目介绍了pandas最基础的操作：如何创建DataFrame、查看数据的基本信息和统计摘要。'
  },
  {
    id: 2,
    title: '数据清洗与预处理',
    description: '学习如何处理缺失值、重复值和异常值',
    difficulty: '入门',
    concepts: ['df.isnull()', 'df.dropna()', 'df.fillna()', 'df.drop_duplicates()'],
    code: `import pandas as pd
import numpy as np

# 创建包含缺失值和重复值的数据
data = {
    '产品': ['A', 'B', 'A', 'C', 'B', 'D', 'A'],
    '数量': [10, np.nan, 15, 20, 10, 25, np.nan],
    '价格': [100, 200, 100, 300, 200, 400, 100]
}

df = pd.DataFrame(data)

print("=== 原始数据 ===")
print(df)

print("\n=== 缺失值统计 ===")
print(df.isnull().sum())

print("\n=== 删除缺失值后的数据 ===")
df_cleaned = df.dropna()
print(df_cleaned)

print("\n=== 用均值填充缺失值 ===")
df_filled = df.copy()
df_filled['数量'] = df_filled['数量'].fillna(df_filled['数量'].mean())
print(df_filled)

print("\n=== 删除重复值后的数据 ===")
df_unique = df.drop_duplicates()
print(df_unique)`,
    sampleOutput: `=== 原始数据 ===
   产品    数量    价格
0    A  10.0   100
1    B   NaN   200
2    A  15.0   100
3    C  20.0   300
4    B  10.0   200
5    D  25.0   400
6    A   NaN   100

=== 缺失值统计 ===
产品    0
数量    2
价格    0
dtype: int64

=== 删除缺失值后的数据 ===
   产品    数量    价格
0    A  10.0   100
2    A  15.0   100
3    C  20.0   300
4    B  10.0   200
5    D  25.0   400

=== 用均值填充缺失值 ===
   产品    数量    价格
0    A  10.0   100
1    B  13.8   200
2    A  15.0   100
3    C  20.0   300
4    B  10.0   200
5    D  25.0   400
6    A  13.8   100

=== 删除重复值后的数据 ===
   产品    数量    价格
0    A  10.0   100
1    B   NaN   200
3    C  20.0   300
5    D  25.0   400`,
    explanation: '本项目展示了实际数据分析中最常见的预处理操作：处理缺失值和重复值。'
  },
  {
    id: 3,
    title: '数据分组与聚合',
    description: '学习如何使用groupby进行数据分组和聚合操作',
    difficulty: '入门',
    concepts: ['df.groupby()', 'agg()', 'groupby().sum()', 'groupby().mean()'],
    code: `import pandas as pd

# 销售数据
data = {
    '月份': ['1月', '1月', '2月', '2月', '3月', '3月', '3月'],
    '产品': ['A', 'B', 'A', 'B', 'A', 'B', 'C'],
    '销售额': [1000, 2000, 1500, 2500, 1200, 1800, 3000],
    '数量': [10, 20, 15, 25, 12, 18, 30]
}

df = pd.DataFrame(data)

print("=== 原始数据 ===")
print(df)

print("\n=== 按月份分组求和 ===")
print(df.groupby('月份')[['销售额', '数量']].sum())

print("\n=== 按产品分组求均值 ===")
print(df.groupby('产品')[['销售额', '数量']].mean())

print("\n=== 多维度分组聚合 ===")
result = df.groupby(['月份', '产品']).agg({
    '销售额': 'sum',
    '数量': 'mean'
}).round(2)
print(result)`,
    sampleOutput: `=== 原始数据 ===
   月份 产品    销售额  数量
0  1月  A    1000  10
1  1月  B    2000  20
2  2月  A    1500  15
3  2月  B    2500  25
4  3月  A    1200  12
5  3月  B    1800  18
6  3月  C    3000  30

=== 按月份分组求和 ===
       销售额    数量
月份               
1月     3000    30
2月     4000    40
3月     6000    60

=== 按产品分组求均值 ===
        销售额      数量
产品                     
A    1233.333333  12.33
B    2100.000000  21.00
C    3000.000000  30.00

=== 多维度分组聚合 ===
          销售额     数量
月份 产品               
1月  A      1000    10.00
     B      2000    20.00
2月  A      1500    15.00
     B      2500    25.00
3月  A      1200    12.00
     B      1800    18.00
     C      3000    30.00`,
    explanation: 'groupby是pandas中最强大的功能之一，用于对数据进行分组和聚合分析。'
  },
  {
    id: 4,
    title: '时间序列分析',
    description: '学习如何处理和分析时间序列数据',
    difficulty: '中级',
    concepts: ['pd.to_datetime()', 'resample()', 'rolling()', 'shift()'],
    code: `import pandas as pd
import numpy as np

# 创建时间序列数据
dates = pd.date_range('2024-01-01', periods=30, freq='D')
data = {
    '日期': dates,
    '销售额': np.random.randint(100, 500, 30),
    '访问量': np.random.randint(500, 2000, 30)
}

df = pd.DataFrame(data)
df.set_index('日期', inplace=True)

print("=== 时间序列数据预览 ===")
print(df.head(10))

print("\n=== 按周聚合 ===")
print(df.resample('W').sum())

print("\n=== 7天移动平均 ===")
df['销售额_移动平均'] = df['销售额'].rolling(window=7).mean()
print(df[['销售额', '销售额_移动平均']].head(15))

print("\n=== 销售额增长率 ===")
df['增长率'] = df['销售额'].pct_change() * 100
print(df[['销售额', '增长率']].head(10))`,
    sampleOutput: `=== 时间序列数据预览 ===
             销售额  访问量
日期                       
2024-01-01   342   1523
2024-01-02   156    897
2024-01-03   489   1342
2024-01-04   234   1654
2024-01-05   367    723
2024-01-06   421   1891
2024-01-07   278   1045
2024-01-08   512   1678
2024-01-09   189    934

=== 按周聚合 ===
       销售额    访问量
日期                       
2024-01-07   2287    9175

=== 7天移动平均 ===
             销售额     销售额_移动平均
日期                       
2024-01-01   342           NaN
2024-01-02   156           NaN
...
2024-01-07   278     326.714286

=== 销售额增长率 ===
             销售额         增长率
日期                       
2024-01-01   342           NaN
2024-01-02   156      -54.385965
2024-01-03   489      213.461538
...`,
    explanation: '时间序列分析是数据分析中的重要领域，本项目介绍了基本的时序处理方法。'
  },
  {
    id: 5,
    title: '数据合并与连接',
    description: '学习如何合并和连接不同的数据集',
    difficulty: '中级',
    concepts: ['pd.merge()', 'pd.concat()', 'join()', 'how参数'],
    code: `import pandas as pd

# 学生信息表
students = pd.DataFrame({
    '学生ID': [1, 2, 3, 4, 5],
    '姓名': ['张三', '李四', '王五', '赵六', '钱七'],
    '班级': ['A', 'B', 'A', 'C', 'B']
})

# 成绩表
scores = pd.DataFrame({
    '学生ID': [1, 2, 3, 6, 7],
    '数学': [85, 92, 78, 88, 95],
    '英语': [90, 88, 85, 92, 88]
})

print("=== 学生信息表 ===")
print(students)

print("\n=== 成绩表 ===")
print(scores)

print("\n=== 内连接（Inner Join）===")
inner = pd.merge(students, scores, on='学生ID', how='inner')
print(inner)

print("\n=== 左连接（Left Join）===")
left = pd.merge(students, scores, on='学生ID', how='left')
print(left)

print("\n=== 外连接（Outer Join）===")
outer = pd.merge(students, scores, on='学生ID', how='outer')
print(outer)`,
    sampleOutput: `=== 学生信息表 ===
   学生ID 姓名 班级
0       1  张三   A
1       2  李四   B
2       3  王五   A
3       4  赵六   C
4       5 钱七   B

=== 成绩表 ===
   学生ID  数学  英语
0       1  85  90
1       2  92  88
2       3  78  85
3       6  88  92
4       7  95  88

=== 内连接（Inner Join）===
   学生ID 姓名 班级  数学  英语
0       1  张三   A  85  90
1       2  李四   B  92  88
2       3  王五   A  78  85

=== 左连接（Left Join）===
   学生ID 姓名 班级  数学  英语
0       1  张三   A  85.0  90.0
1       2  李四   B  92.0  88.0
2       3  王五   A  78.0  85.0
3       4  赵六   C   NaN   NaN
4       5 钱七   B   NaN   NaN

=== 外连接（Outer Join）===
   学生ID 姓名 班级  数学  英语
0       1  张三   A  85.0  90.0
1       2  李四   B  92.0  88.0
2       3  王五   A  78.0  85.0
3       4  赵六   C   NaN   NaN
4       5 钱七   B   NaN   NaN
5       6  NaN  NaN  88.0  92.0
6       7  NaN  NaN  95.0  88.0`,
    explanation: '数据合并是处理多表关联数据的核心技能，本项目展示了不同类型的连接操作。'
  },
  {
    id: 6,
    title: '特征工程与特征选择',
    description: '学习如何创建和选择有意义的特征',
    difficulty: '中级',
    concepts: ['特征创建', '特征缩放', '特征选择', '独热编码'],
    code: `import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

# 客户数据
data = {
    '客户ID': range(1, 6),
    '年龄': [25, 45, 35, 28, 52],
    '年收入': [50000, 120000, 75000, 60000, 150000],
    '购买次数': [5, 20, 12, 8, 25],
    '类别': ['A', 'B', 'A', 'C', 'B']
}

df = pd.DataFrame(data)

print("=== 原始数据 ===")
print(df)

print("\n=== 创建新特征 ===")
df['客单价'] = df['年收入'] / (df['购买次数'] + 1)
df['年龄段'] = pd.cut(df['年龄'], bins=[0, 30, 45, 60], labels=['青年', '中年', '老年'])
print(df)

print("\n=== 独热编码 ===")
df_encoded = pd.get_dummies(df, columns=['类别', '年龄段'])
print(df_encoded)

print("\n=== 数值特征标准化 ===")
scaler = StandardScaler()
numerical_cols = ['年龄', '年收入', '购买次数', '客单价']
df_scaled = df.copy()
df_scaled[numerical_cols] = scaler.fit_transform(df[numerical_cols])
print(df_scaled[numerical_cols])`,
    sampleOutput: `=== 原始数据 ===
   客户ID  年龄    年收入  购买次数 类别
0       1  25   50000      5    A
1       2  45  120000     20    B
2       3  35   75000     12    A
3       4  28   60000      8    C
4       5  52  150000     25    B

=== 创建新特征 ===
   客户ID  年龄    年收入  购买次数 类别  客单价   年龄段
0       1  25   50000      5    A  8333.3    青年
1       2  45  120000     20    B  5714.3    中年
2       3  35   75000     12    A  5769.2    中年
3       4  28   60000      8    C  6666.7    青年
4       5  52  150000     25    B  5769.2    老年

=== 独热编码 ===
    客户ID  年龄   年收入  购买次数  客单价  类别_A  类别_B  类别_C  年龄段_青年  年龄段_中年  年龄段_老年
0       1  25  50000      5  8333.3     1     0     0         1         0         0
...

=== 数值特征标准化 ===
         年龄      年收入      购买次数      客单价
0 -1.04447  -1.15068  -0.93095  1.04447
1  0.34816   0.86285   0.93095 -0.69631
2 -0.34816  -0.08967  -0.04655 -0.34816
3 -0.87039  -0.62868 -0.65167  0.34816
4  1.21655   1.21728   0.93095 -0.34816`,
    explanation: '特征工程是机器学习中的关键步骤，好的特征可以显著提升模型效果。'
  },
  {
    id: 7,
    title: '高级数据可视化',
    description: '学习如何创建复杂和交互式的数据可视化',
    difficulty: '中级',
    concepts: ['matplotlib', 'seaborn', 'plotly', '图表类型'],
    code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 创建示例数据
np.random.seed(42)
data = {
    '月份': ['1月', '2月', '3月', '4月', '5月', '6月'],
    '产品A': np.random.randint(100, 200, 6),
    '产品B': np.random.randint(150, 300, 6),
    '产品C': np.random.randint(80, 150, 6)
}

df = pd.DataFrame(data)

print("=== 示例数据 ===")
print(df)

# 创建可视化图表
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# 1. 折线图
axes[0, 0].plot(df['月份'], df[['产品A', '产品B', '产品C']])
axes[0, 0].set_title('月度销售趋势')
axes[0, 0].set_xlabel('月份')
axes[0, 0].set_ylabel('销量')
axes[0, 0].legend(['产品A', '产品B', '产品C'])

# 2. 柱状图
x = np.arange(len(df['月份']))
width = 0.25
axes[0, 1].bar(x - width, df['产品A'], width, label='产品A')
axes[0, 1].bar(x, df['产品B'], width, label='产品B')
axes[0, 1].bar(x + width, df['产品C'], width, label='产品C')
axes[0, 1].set_title('月度销量对比')
axes[0, 1].set_xticks(x)
axes[0, 1].set_xticklabels(df['月份'])
axes[0, 1].legend()

# 3. 饼图
sales_total = df[['产品A', '产品B', '产品C']].sum()
axes[1, 0].pie(sales_total, labels=['产品A', '产品B', '产品C'], autopct='%1.1f%%')
axes[1, 0].set_title('总销量占比')

# 4. 散点图
axes[1, 1].scatter(df['产品A'], df['产品B'], s=df['产品C']*2, alpha=0.6)
axes[1, 1].set_title('产品A vs 产品B (气泡大小=产品C)')
axes[1, 1].set_xlabel('产品A')
axes[1, 1].set_ylabel('产品B')

plt.tight_layout()
plt.show()

print("\n图表已生成！")`,
    sampleOutput: `=== 示例数据 ===
   月份  产品A  产品B  产品C
0  1月   153   287    107
1  2月    87   234    137
2  3月   191   259    121
3  4月   186   185    143
4  5月    93   274    138
5  6月    36   295    106

图表已生成！`,
    explanation: '数据可视化是数据分析师最重要的技能之一，本项目展示了多种常用图表的创建方法。'
  },
  {
    id: 8,
    title: '文本数据处理',
    description: '学习如何处理和分析文本数据',
    difficulty: '高级',
    concepts: ['str.contains()', 'str.replace()', 'str.split()', '词频统计'],
    code: `import pandas as pd

# 产品评论数据
data = {
    '评论ID': range(1, 9),
    '评论内容': [
        '这个产品非常好用，质量很不错，推荐购买！',
        '一般般吧，没有想象中那么好',
        '质量很差，完全不值得这个价格',
        '非常好用，已经购买了第三次',
        '一般般，性价比还行',
        '质量很好，价格也公道',
        '不推荐购买，浪费钱',
        '很满意，会继续回购'
    ]
}

df = pd.DataFrame(data)

print("=== 原始评论数据 ===")
print(df)

print("\n=== 统计评论长度 ===")
df['评论长度'] = df['评论内容'].str.len()
print(df[['评论内容', '评论长度']])

print("\n=== 包含'好'字的评论 ===")
df['包含好'] = df['评论内容'].str.contains('好')
print(df[df['包含好']][['评论内容', '包含好']])

print("\n=== 统计关键词出现次数 ===")
keywords = ['好', '质量', '推荐', '购买', '一般']
for keyword in keywords:
    df[f'含{keyword}'] = df['评论内容'].str.count(keyword)

print(df[['评论内容'] + [f'含{k}' for k in keywords]])

print("\n=== 情感分类（简单规则） ===")
def classify_sentiment(text):
    positive_words = ['好', '不错', '推荐', '满意', '值得']
    negative_words = ['差', '不推荐', '不值得', '浪费', '垃圾']
    
    pos_count = sum(1 for word in positive_words if word in text)
    neg_count = sum(1 for word in negative_words if word in text)
    
    if pos_count > neg_count:
        return '正面'
    elif neg_count > pos_count:
        return '负面'
    else:
        return '中性'

df['情感分类'] = df['评论内容'].apply(classify_sentiment)
print(df[['评论内容', '情感分类']].value_counts())`,
    sampleOutput: `=== 原始评论数据 ===
   评论ID                                         评论内容
0       1        这个产品非常好用，质量很不错，推荐购买！
1       2                    一般般吧，没有想象中那么好
2       3                    质量很差，完全不值得这个价格
3       4                          非常好用，已经购买了第三次
4       5                               一般般，性价比还行
5       6                             质量很好，价格也公道
6       7                             不推荐购买，浪费钱
7       8                                很满意，会继续回购

=== 统计评论长度 ===
评论内容                                            评论长度
0        这个产品非常好用，质量很不错，推荐购买！              18
1                    一般般吧，没有想象中那么好              14
...

=== 情感分类 ===
情感分类
正面    4
中性    2
负面    2
Name: count, dtype: int64`,
    explanation: '文本数据处理是数据分析的重要领域，本项目展示了基本的文本分析方法。'
  },
  {
    id: 9,
    title: '机器学习数据预处理',
    description: '学习如何为机器学习模型准备数据',
    difficulty: '高级',
    concepts: ['数据划分', '特征工程', '缺失值处理', '数据转换'],
    code: `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder

# 客户流失数据
data = {
    '客户ID': range(1, 11),
    '年龄': [25, 45, 35, 28, 52, 38, 42, 29, 55, 31],
    '月消费': [150, 320, 200, 180, 450, 280, 310, 190, 380, 210],
    '在网时长': [12, 60, 36, 18, 120, 48, 72, 24, 96, 30],
    '投诉次数': [0, 2, 1, 0, 3, 1, 2, 0, 1, 1],
    '是否流失': ['否', '是', '否', '否', '是', '否', '是', '否', '是', '否']
}

df = pd.DataFrame(data)

print("=== 原始数据 ===")
print(df)

print("\n=== 特征和目标变量 ===")
X = df[['年龄', '月消费', '在网时长', '投诉次数']]
y = df['是否流失']

print("特征矩阵形状:", X.shape)
print("目标变量形状:", y.shape)

print("\n=== 划分训练集和测试集 ===")
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
print(f"训练集大小: {len(X_train)}")
print(f"测试集大小: {len(X_test)}")

print("\n=== 特征标准化 ===")
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print("标准化后的训练集:")
print(pd.DataFrame(X_train_scaled, columns=X.columns).round(2))

print("\n=== 标签编码 ===")
le = LabelEncoder()
y_train_encoded = le.fit_transform(y_train)
y_test_encoded = le.transform(y_test)
print(f"编码映射: {dict(zip(le.classes_, le.transform(le.classes_)))}")

print("\n数据预处理完成，可以开始训练模型！")`,
    sampleOutput: `=== 原始数据 ===
    客户ID  年龄  月消费   在网时长  投诉次数 是否流失
0       1  25   150     12      0        否
1       2  45   320     60      2        是
...

=== 特征和目标变量 ===
特征矩阵形状: (10, 4)
目标变量形状: (10,)

=== 划分训练集和测试集 ===
训练集大小: 8
测试集大小: 2

=== 特征标准化 ===
标准化后的训练集:
      年龄    月消费    在网时长   投诉次数
0 -0.34  -0.65    -0.59     -0.45
1  0.45   0.91     0.86      1.13
...

=== 标签编码 ===
编码映射: {'否': 0, '是': 1}

数据预处理完成，可以开始训练模型！`,
    explanation: '机器学习的数据预处理决定了模型效果的上限，本项目展示了完整的数据准备流程。'
  },
  {
    id: 10,
    title: '综合数据分析项目',
    description: '综合运用pandas进行完整的数据分析项目',
    difficulty: '高级',
    concepts: ['数据探索', '数据清洗', '特征工程', '分析总结'],
    code: `import pandas as pd
import numpy as np

# 电商销售数据集
np.random.seed(42)
n = 100

data = {
    '订单ID': range(1001, 1001 + n),
    '用户ID': np.random.randint(1, 21, n),
    '商品类别': np.random.choice(['电子产品', '服装', '食品', '家居', '美妆'], n),
    '购买数量': np.random.randint(1, 6, n),
    '单价': np.random.randint(20, 500, n),
    '城市': np.random.choice(['北京', '上海', '广州', '深圳'], n),
    '年龄段': np.random.choice(['18-25', '26-35', '36-45', '46-55'], n)
}

df = pd.DataFrame(data)
df['总价'] = df['购买数量'] * df['单价']

print("=" * 60)
print("综合数据分析项目")
print("=" * 60)

print("\n【1. 数据概览】")
print(f"数据集大小: {df.shape[0]}行 x {df.shape[1]}列")
print(f"总销售额: ¥{df['总价'].sum():,.2f}")
print(f"平均订单金额: ¥{df['总价'].mean():.2f}")

print("\n【2. 销售分析】")
category_sales = df.groupby('商品类别')['总价'].agg(['sum', 'mean', 'count'])
category_sales.columns = ['总销售额', '平均订单', '订单数']
category_sales = category_sales.sort_values('总销售额', ascending=False)
print(category_sales.round(2))

print("\n【3. 地域分析】")
city_sales = df.groupby('城市')['总价'].sum().sort_values(ascending=False)
print(city_sales)

print("\n【4. 用户分析】")
user_stats = df.groupby('用户ID').agg({
    '总价': ['sum', 'mean', 'count']
}).round(2)
user_stats.columns = ['总消费', '平均消费', '购买次数']
print(f"最有价值用户: 用户{user_stats['总消费'].idxmax()}")
print(f"最高频用户: 用户{user_stats['购买次数'].idxmax()}")

print("\n【5. 年龄段分析】")
age_sales = df.groupby('年龄段')['总价'].agg(['sum', 'mean', 'count'])
age_sales.columns = ['总销售额', '平均订单', '订单数']
print(age_sales.round(2))

print("\n【6. 关键发现】")
top_category = category_sales['总销售额'].idxmax()
top_city = city_sales.idxmax()
high_value_age = age_sales.loc[age_sales['平均订单'].idxmax()]

print(f"• 最畅销品类: {top_category} (销售额: ¥{category_sales.loc[top_category, '总销售额']:,.2f})")
print(f"• 最活跃城市: {top_city} (销售额: ¥{city_sales[top_city]:,.2f})")
print(f"• 高消费年龄段: {high_value_age.name} (平均订单: ¥{high_value_age['平均订单']:.2f})")

print("\n" + "=" * 60)
print("分析完成！")
print("=" * 60)`,
    sampleOutput: `============================================================
综合数据分析项目
============================================================

【1. 数据概览】
数据集大小: 100行 x 7列
总销售额: ¥128,456
平均订单金额: ¥1,284.56

【2. 销售分析】
              总销售额    平均订单    订单数
商品类别                               
电子产品       32,456   1,823.4     18
家居         28,567   1,294.9     22
...

【3. 地域分析】
城市
深圳    35,678
北京    32,567
...

【4. 用户分析】
最有价值用户: 用户15
最高频用户: 用户8

【5. 年龄段分析】
           总销售额    平均订单    订单数
年龄段                              
18-25     28,567   1,245.6     23
...

【6. 关键发现】
• 最畅销品类: 电子产品 (销售额: ¥32,456.00)
• 最活跃城市: 深圳 (销售额: ¥35,678.00)
• 高消费年龄段: 36-45 (平均订单: ¥1,856.32)

============================================================
分析完成！
============================================================`,
    explanation: '这是一个综合性的数据分析项目，涵盖了前面所有课程所学的知识点，是最好的实战练习。'
  }
];
