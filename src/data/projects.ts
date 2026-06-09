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
  quiz?: {
    questions: Array<{
      question: string;
      options: string[];
      answer: string;
      explanation: string;
    }>;
  };
}

export const projects: Project[] = [
  {
    id: 1,
    title: '基础数据读取与探索',
    description: '学习如何使用pandas读取CSV文件并进行基本的数据探索',
    difficulty: '入门',
    concepts: [
      '学习使用pd.read_csv()读取CSV文件',
      '使用DataFrame.head()查看数据前几行',
      '通过DataFrame.info()了解数据基本信息',
      '使用DataFrame.describe()获取数值统计',
      '掌握DataFrame的基本结构和操作'
    ],
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
    explanation: '本项目介绍了pandas最基础的操作：如何创建DataFrame、查看数据的基本信息和统计摘要。',
    quiz: {
      questions: [
        {
          question: '在pandas中，用于读取CSV文件的函数是？',
          options: ['pd.read_csv()', 'pd.read_excel()', 'pd.read_json()', 'pd.read_sql()'],
          answer: 'pd.read_csv()',
          explanation: 'pd.read_csv()是pandas专门用于读取CSV格式文件的函数，这是最常用的数据读取方法之一。'
        },
        {
          question: '查看DataFrame前几行数据的方法是？',
          options: ['df.tail()', 'df.head()', 'df.first()', 'df.show()'],
          answer: 'df.head()',
          explanation: 'df.head()方法默认显示DataFrame的前5行数据，可以传入参数指定显示的行数。'
        },
        {
          question: '获取DataFrame形状（行数和列数）的属性是？',
          options: ['df.size', 'df.shape', 'df.length', 'df.dimensions'],
          answer: 'df.shape',
          explanation: 'df.shape返回一个元组，包含DataFrame的行数和列数，格式为(行数, 列数)。'
        },
        {
          question: '获取DataFrame统计描述的方法是？',
          options: ['df.summary()', 'df.stats()', 'df.describe()', 'df.analyze()'],
          answer: 'df.describe()',
          explanation: 'df.describe()方法返回数值型列的统计信息，包括计数、平均值、标准差、最小值、25%、50%、75%分位数和最大值。'
        },
        {
          question: '创建DataFrame的正确方式是？',
          options: ['df = pd.DataFrame()', 'df = new DataFrame()', 'df = DataFrame.create()', 'df = pd.createFrame()'],
          answer: 'pd.DataFrame()',
          explanation: '在pandas中，使用pd.DataFrame()函数来创建DataFrame对象。'
        }
      ]
    }
  },
  {
    id: 2,
    title: '数据清洗与预处理',
    description: '学习如何处理缺失值、重复值和异常值',
    difficulty: '入门',
    concepts: [
      '使用df.isnull()检测缺失值',
      '通过df.dropna()删除缺失值',
      '掌握df.fillna()填充缺失值的方法',
      '使用df.drop_duplicates()删除重复值',
      '学习数据清洗的最佳实践'
    ],
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
    explanation: '本项目展示了实际数据分析中最常见的预处理操作：处理缺失值和重复值。',
    quiz: {
      questions: [
        {
          question: '在pandas中，用于填充缺失值的方法是？',
          options: ['df.fillna()', 'df.dropna()', 'df.replace()', 'df.fill()'],
          answer: 'df.fillna()',
          explanation: 'df.fillna()方法用于填充DataFrame中的缺失值，可以指定填充的值或使用统计量如mean()、median()等。'
        },
        {
          question: '用于删除重复行的方法是？',
          options: ['df.remove_duplicates()', 'df.drop_duplicates()', 'df.delete_duplicates()', 'df.clean_duplicates()'],
          answer: 'df.drop_duplicates()',
          explanation: 'df.drop_duplicates()方法用于删除DataFrame中的重复行，可以指定subset参数来考虑特定的列。'
        },
        {
          question: '检查缺失值的方法是？',
          options: ['df.isna()', 'df.check_null()', 'df.missing()', 'df.nan()'],
          answer: 'df.isna()',
          explanation: 'df.isna()或df.isnull()用于检查DataFrame中的缺失值，返回布尔值矩阵。'
        },
        {
          question: '在numpy中，表示缺失值的是？',
          options: ['None', 'NaN', 'Null', 'Missing'],
          answer: 'NaN',
          explanation: '在numpy和pandas中，NaN（Not a Number）用于表示缺失的数值，np.nan是缺失值的标准表示。'
        },
        {
          question: '删除含有缺失值的行的方法是？',
          options: ['df.dropna()', 'df.fillna()', 'df.remove_na()', 'df.clean_na()'],
          answer: 'df.dropna()',
          explanation: 'df.dropna()方法用于删除含有缺失值的行或列，可以通过参数指定删除的条件。'
        }
      ]
    }
  },
  {
    id: 3,
    title: '数据分组与聚合',
    description: '学习如何使用groupby进行数据分组和聚合操作',
    difficulty: '入门',
    concepts: [
      '使用df.groupby()对数据进行分组',
      '掌握分组后的聚合操作：sum()、mean()、count()',
      '学习使用agg()进行多指标聚合',
      '理解多维度分组的方法',
      '学会分析分组后的数据结果'
    ],
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
    explanation: 'groupby是pandas中最强大的功能之一，用于对数据进行分组和聚合分析。',
    quiz: {
      questions: [
        {
          question: '在pandas中，用于数据分组的方法是？',
          options: ['df.group()', 'df.groupby()', 'df.aggregate()', 'df.segment()'],
          answer: 'df.groupby()',
          explanation: 'df.groupby()是pandas中用于数据分组的核心方法，可以按一个或多个列进行分组。'
        },
        {
          question: '用于同时计算多个统计量的方法是？',
          options: ['df.mean()', 'df.sum()', 'df.agg()', 'df.stats()'],
          answer: 'df.agg()',
          explanation: 'df.agg()方法可以同时应用多个聚合函数，如mean、sum、count等。'
        },
        {
          question: '按多个列分组的正确写法是？',
          options: ['df.groupby(col1, col2)', 'df.groupby([col1, col2])', 'df.groupby(col1 + col2)', 'df.groupby(col1, col2)'],
          answer: 'df.groupby([col1, col2])',
          explanation: '需要将多个列名放在一个列表中作为groupby的参数，如groupby([col1, col2])。'
        },
        {
          question: 'groupby后直接调用mean()会？',
          options: ['计算所有数值列的平均值', '计算第一列的平均值', '只计算分组键的平均值', '报错'],
          answer: '计算所有数值列的平均值',
          explanation: 'groupby后直接调用聚合函数会自动对所有数值类型的列进行计算。'
        },
        {
          question: '计算分组求和的方法是？',
          options: ['df.groupby().sum()', 'df.groupby().total()', 'df.groupby().add()', 'df.groupby().aggregate()'],
          answer: 'df.groupby().sum()',
          explanation: 'sum()是最常用的聚合函数之一，用于计算分组数据的总和。'
        }
      ]
    }
  },
  {
    id: 4,
    title: '时间序列分析',
    description: '学习如何处理和分析时间序列数据',
    difficulty: '中级',
    concepts: [
      '使用pd.to_datetime()解析日期字符串',
      '掌握resample()进行时间序列重采样',
      '学习rolling()计算移动窗口统计',
      '使用shift()处理时间序列偏移',
      '理解时间序列数据的分析方法'
    ],
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
    explanation: '时间序列分析是数据分析中的重要领域，本项目介绍了基本的时序处理方法。',
    quiz: {
      questions: [
        {
          question: '解析日期字符串的函数是？',
          options: ['pd.to_datetime()', 'pd.date()', 'pd.parse_date()', 'pd.convert_date()'],
          answer: 'pd.to_datetime()',
          explanation: 'pd.to_datetime()用于将字符串或其他格式解析为datetime对象。'
        },
        {
          question: '时间序列重采样的方法是？',
          options: ['resample()', 'sample()', 'frequency()', 'time()'],
          answer: 'resample()',
          explanation: 'resample()方法用于改变时间序列的频率，如从日数据转换为月数据。'
        },
        {
          question: '计算滚动窗口统计的方法是？',
          options: ['rolling()', 'window()', 'slide()', 'move()'],
          answer: 'rolling()',
          explanation: 'rolling()方法用于创建滚动窗口对象，然后可以应用聚合函数。'
        },
        {
          question: '创建日期范围的函数是？',
          options: ['pd.date_range()', 'pd.range()', 'pd.date()', 'pd.sequence()'],
          answer: 'pd.date_range()',
          explanation: 'pd.date_range()用于创建一个日期范围序列，可以指定开始、结束和频率。'
        },
        {
          question: '按周重采样的频率代码是？',
          options: ['W', 'D', 'M', 'Y'],
          answer: 'W',
          explanation: 'W表示周频率，D表示天，M表示月，Y表示年。'
        }
      ]
    }
  },
  {
    id: 5,
    title: '数据合并与连接',
    description: '学习如何合并和连接不同的数据集',
    difficulty: '中级',
    concepts: [
      '使用pd.merge()合并多个数据集',
      '掌握不同连接类型：inner、left、right、outer',
      '学习pd.concat()进行数据拼接',
      '理解join()连接方法的使用场景',
      '学会处理多表关联数据的技巧'
    ],
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
    explanation: '数据合并是处理多表关联数据的核心技能，本项目展示了不同类型的连接操作。',
    quiz: {
      questions: [
        {
          question: '用于数据合并的函数是？',
          options: ['pd.merge()', 'pd.concat()', 'pd.join()', 'pd.connect()'],
          answer: 'pd.merge()',
          explanation: 'pd.merge()用于根据一个或多个键连接两个DataFrame，类似于SQL中的JOIN操作。'
        },
        {
          question: '内连接的参数值是？',
          options: ['inner', 'outer', 'left', 'right'],
          answer: 'inner',
          explanation: 'inner连接只保留在两个DataFrame中都存在的键，是默认的连接类型。'
        },
        {
          question: '只保留左表所有数据的连接类型是？',
          options: ['left', 'right', 'inner', 'outer'],
          answer: 'left',
          explanation: 'left连接保留左表的所有行，右表中匹配不到的部分用NaN填充。'
        },
        {
          question: '用于数据拼接的函数是？',
          options: ['pd.concat()', 'pd.merge()', 'pd.join()', 'pd.append()'],
          answer: 'pd.concat()',
          explanation: 'pd.concat()用于沿行或列拼接多个DataFrame，而不是基于键连接。'
        },
        {
          question: '指定连接键的参数是？',
          options: ['on', 'key', 'by', 'using'],
          answer: 'on',
          explanation: 'on参数用于指定连接的键，两个DataFrame必须有相同名称的列。'
        }
      ]
    }
  },
  {
    id: 6,
    title: '特征工程与特征选择',
    description: '学习如何创建和选择有意义的特征',
    difficulty: '中级',
    concepts: [
      '学习创建新特征的常用方法',
      '掌握pd.cut()进行数据分箱操作',
      '使用pd.get_dummies()实现独热编码',
      '学习StandardScaler进行特征标准化',
      '理解特征选择的重要性'
    ],
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
    explanation: '特征工程是机器学习中的关键步骤，好的特征可以显著提升模型效果。',
    quiz: {
      questions: [
        {
          question: '进行独热编码的函数是？',
          options: ['pd.get_dummies()', 'pd.one_hot()', 'pd.encode()', 'pd.dummies()'],
          answer: 'pd.get_dummies()',
          explanation: 'pd.get_dummies()用于将分类变量转换为独热编码（dummy variables）。'
        },
        {
          question: '将数据分箱的函数是？',
          options: ['pd.cut()', 'pd.bin()', 'pd.split()', 'pd.divide()'],
          answer: 'pd.cut()',
          explanation: 'pd.cut()用于将连续数值数据分割成离散的区间（分箱）。'
        },
        {
          question: 'sklearn中用于标准化的类是？',
          options: ['StandardScaler', 'MinMaxScaler', 'Normalizer', 'Scaler'],
          answer: 'StandardScaler',
          explanation: 'StandardScaler实现Z-score标准化，将数据转换为均值为0、标准差为1的分布。'
        },
        {
          question: '特征工程的主要目的是？',
          options: ['创建更有意义的特征', '删除无用特征', '增加数据量', '提高运算速度'],
          answer: '创建更有意义的特征',
          explanation: '特征工程的核心是通过转换、组合原始数据，创建更能表达数据模式的新特征。'
        },
        {
          question: '处理类别型特征的常用方法是？',
          options: ['独热编码', '标准化', '归一化', '删除'],
          answer: '独热编码',
          explanation: '独热编码是处理类别型特征最常用的方法，可以避免引入不必要的顺序关系。'
        }
      ]
    }
  },
  {
    id: 7,
    title: '高级数据可视化',
    description: '学习如何创建复杂和交互式的数据可视化',
    difficulty: '中级',
    concepts: [
      '学习使用matplotlib创建基本图表',
      '掌握plt.plot()绘制折线图',
      '使用plt.bar()绘制柱状图',
      '学习plt.pie()绘制饼图',
      '使用plt.scatter()绘制散点图',
      '理解不同图表类型的适用场景'
    ],
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
    explanation: '数据可视化是数据分析师最重要的技能之一，本项目展示了多种常用图表的创建方法。',
    quiz: {
      questions: [
        {
          question: '创建折线图的matplotlib函数是？',
          options: ['plt.plot()', 'plt.line()', 'plt.lineplot()', 'plt.draw()'],
          answer: 'plt.plot()',
          explanation: 'plt.plot()是matplotlib中用于创建折线图的基本函数。'
        },
        {
          question: '创建柱状图的matplotlib函数是？',
          options: ['plt.bar()', 'plt.column()', 'plt.histogram()', 'plt.chart()'],
          answer: 'plt.bar()',
          explanation: 'plt.bar()是matplotlib中用于创建柱状图的函数。'
        },
        {
          question: '创建散点图的函数是？',
          options: ['plt.scatter()', 'plt.dot()', 'plt.point()', 'plt.bubble()'],
          answer: 'plt.scatter()',
          explanation: 'plt.scatter()用于创建散点图，展示两个变量之间的关系。'
        },
        {
          question: '选择合适的图表类型很重要，展示趋势通常用？',
          options: ['折线图', '饼图', '散点图', '热力图'],
          answer: '折线图',
          explanation: '折线图最适合展示数据随时间变化的趋势。'
        },
        {
          question: '展示占比关系通常用？',
          options: ['饼图', '折线图', '散点图', '箱线图'],
          answer: '饼图',
          explanation: '饼图最适合展示各部分占整体的比例关系。'
        }
      ]
    }
  },
  {
    id: 8,
    title: '文本数据处理',
    description: '学习如何处理和分析文本数据',
    difficulty: '高级',
    concepts: [
      '使用str.contains()检查字符串包含关系',
      '掌握str.replace()进行字符串替换',
      '学习str.split()分割字符串',
      '使用str.len()获取字符串长度',
      '学习str.count()统计关键词出现次数',
      '实现简单的文本情感分析'
    ],
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
    explanation: '文本数据处理是数据分析的重要领域，本项目展示了基本的文本分析方法。',
    quiz: {
      questions: [
        {
          question: '检查字符串是否包含子串的方法是？',
          options: ['str.contains()', 'str.find()', 'str.match()', 'str.search()'],
          answer: 'str.contains()',
          explanation: 'str.contains()用于检查Series中的字符串是否包含指定的子串。'
        },
        {
          question: '获取字符串长度的方法是？',
          options: ['str.len()', 'str.length()', 'str.size()', 'str.count()'],
          answer: 'str.len()',
          explanation: 'str.len()用于计算Series中每个字符串的长度。'
        },
        {
          question: '统计子串出现次数的方法是？',
          options: ['str.count()', 'str.frequency()', 'str.number()', 'str.times()'],
          answer: 'str.count()',
          explanation: 'str.count()用于统计每个字符串中指定子串出现的次数。'
        },
        {
          question: 'Python中用于正则表达式的库是？',
          options: ['re', 'regex', 'string', 'text'],
          answer: 're',
          explanation: 're是Python的正则表达式库，用于文本模式匹配和处理。'
        },
        {
          question: '将字符串转换为小写的方法是？',
          options: ['str.lower()', 'str.small()', 'str.min()', 'str.down()'],
          answer: 'str.lower()',
          explanation: 'str.lower()方法将字符串中的所有字符转换为小写。'
        }
      ]
    }
  },
  {
    id: 9,
    title: '机器学习数据预处理',
    description: '学习如何为机器学习模型准备数据',
    difficulty: '高级',
    concepts: [
      '学习数据探索的基本步骤',
      '使用train_test_split()划分训练集和测试集',
      '掌握LabelEncoder进行标签编码',
      '学习StandardScaler进行特征标准化',
      '理解fit_transform()和transform()的区别',
      '为机器学习模型准备高质量数据'
    ],
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
    explanation: '机器学习的数据预处理决定了模型效果的上限，本项目展示了完整的数据准备流程。',
    quiz: {
      questions: [
        {
          question: 'sklearn中划分训练集和测试集的函数是？',
          options: ['train_test_split()', 'split_data()', 'divide_data()', 'separate()'],
          answer: 'train_test_split()',
          explanation: 'train_test_split()用于将数据集划分为训练集和测试集，是机器学习的标准做法。'
        },
        {
          question: '将标签编码为数值的类是？',
          options: ['LabelEncoder', 'OneHotEncoder', 'OrdinalEncoder', 'CategoryEncoder'],
          answer: 'LabelEncoder',
          explanation: 'LabelEncoder用于将分类标签转换为连续的数值。'
        },
        {
          question: 'fit_transform()和transform()的区别是？',
          options: ['fit_transform()学习并转换，transform()只转换', '没有区别', 'fit_transform()只学习参数', 'transform()只用于测试集'],
          answer: 'fit_transform()学习并转换，transform()只转换',
          explanation: 'fit_transform()会先学习数据的统计参数再进行转换，而transform()只使用已学习的参数进行转换。'
        },
        {
          question: '测试集数据应该如何标准化？',
          options: ['使用训练集的transform()', '使用测试集自己的fit_transform()', '不需要缩放', '重新拟合整个数据集'],
          answer: '使用训练集的transform()',
          explanation: '测试集应该使用训练集学习到的参数进行transform()，以避免数据泄露。'
        },
        {
          question: '数据预处理的第一步通常是？',
          options: ['数据探索', '特征工程', '数据清洗', '特征选择'],
          answer: '数据探索',
          explanation: '数据预处理通常从数据探索开始，了解数据的基本情况和特点。'
        }
      ]
    }
  },
  {
    id: 10,
    title: '综合数据分析项目',
    description: '综合运用pandas进行完整的数据分析项目',
    difficulty: '高级',
    concepts: [
      '综合运用数据读取和探索技能',
      '熟练进行数据清洗和预处理',
      '使用groupby进行多维度数据分析',
      '结合时间序列和特征工程方法',
      '完成从数据到洞察的完整分析流程',
      '培养数据分析思维和问题解决能力'
    ],
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
    explanation: '这是一个综合性的数据分析项目，涵盖了前面所有课程所学的知识点，是最好的实战练习。',
    quiz: {
      questions: [
        {
          question: '查看数据集基本信息的方法是？',
          options: ['df.info()', 'df.describe()', 'df.head()', 'df.summary()'],
          answer: 'df.info()',
          explanation: 'df.info()方法显示数据框的基本信息，包括列名、非空值数量、数据类型等。'
        },
        {
          question: '计算字段总和的聚合函数是？',
          options: ['sum()', 'total()', 'add()', 'count()'],
          answer: 'sum()',
          explanation: 'sum()是最常用的聚合函数之一，用于计算字段的总和。'
        },
        {
          question: '排序数据的方法是？',
          options: ['df.sort_values()', 'df.order()', 'df.arrange()', 'df.sort()'],
          answer: 'df.sort_values()',
          explanation: 'df.sort_values()用于按指定列的值排序DataFrame。'
        },
        {
          question: '完整的数据分析流程第一步通常是？',
          options: ['数据探索', '数据建模', '数据可视化', '报告撰写'],
          answer: '数据探索',
          explanation: '完整的数据分析流程通常从数据探索开始，了解数据的基本情况。'
        },
        {
          question: '查找最大值的方法是？',
          options: ['idxmax()', 'max()', 'argmax()', 'maximum()'],
          answer: 'idxmax()',
          explanation: 'idxmax()用于找到最大值所在的索引或标签。'
        }
      ]
    }
  }
];
