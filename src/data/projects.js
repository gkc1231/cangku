export const projects = [
  {
    id: 1,
    title: "基础数据读取与探索",
    difficulty: "入门",
    description: "学习如何使用pandas读取CSV文件并进行基本的数据探索",
    objectives: ["读取CSV数据", "查看数据基本信息", "统计描述", "数据可视化"],
    background: "在数据分析中，首先需要获取和了解数据。本项目使用餐厅小费数据集，帮助你掌握pandas的基本数据读取和探索技能。",
    steps: [
      "导入必要的库（pandas, numpy, plotly）",
      "使用read_csv函数读取CSV数据",
      "使用shape属性查看数据形状",
      "使用head()方法查看数据前几行",
      "使用describe()方法获取统计描述",
      "使用plotly创建散点图和柱状图"
    ],
    codeExplanation: {
      "读取数据": "使用pd.read_csv()函数从URL读取CSV文件",
      "基本信息": "使用shape、head()和describe()方法了解数据结构和统计信息",
      "数据可视化": "使用plotly.express创建交互式图表，展示数据关系"
    },
    expectedOutput: "你将看到数据的基本信息、统计描述，以及两个交互式图表：总账单与小费的关系图和不同日期的消费情况图。",
    challenges: ["如何处理不同格式的数据文件", "如何选择合适的可视化方式"],
    extensions: ["尝试读取本地CSV文件", "使用不同的图表类型展示数据", "添加更多的数据分析维度"],
    quiz: {
      questions: [
        {
          question: "在pandas中，用于读取CSV文件的函数是？",
          options: ["pd.read_csv()", "pd.read_excel()", "pd.read_json()", "pd.read_sql()"],
          answer: "pd.read_csv()",
          explanation: "pd.read_csv()是pandas专门用于读取CSV格式文件的函数，这是最常用的数据读取方法之一。"
        },
        {
          question: "查看DataFrame前几行数据的方法是？",
          options: ["df.tail()", "df.head()", "df.first()", "df.show()"],
          answer: "df.head()",
          explanation: "df.head()方法默认显示DataFrame的前5行数据，可以传入参数指定显示的行数。"
        },
        {
          question: "获取DataFrame形状（行数和列数）的属性是？",
          options: ["df.size", "df.shape", "df.length", "df.dimensions"],
          answer: "df.shape",
          explanation: "df.shape返回一个元组，包含DataFrame的行数和列数，格式为(行数, 列数)。"
        },
        {
          question: "获取DataFrame统计描述的方法是？",
          options: ["df.summary()", "df.stats()", "df.describe()", "df.analyze()"],
          answer: "df.describe()",
          explanation: "df.describe()方法返回数值型列的统计信息，包括计数、平均值、标准差、最小值、25%、50%、75%分位数和最大值。"
        },
        {
          question: "在plotly.express中，创建散点图的函数是？",
          options: ["px.line()", "px.bar()", "px.scatter()", "px.histogram()"],
          answer: "px.scatter()",
          explanation: "px.scatter()函数用于创建散点图，可以展示两个变量之间的关系。"
        }
      ]
    },
    code: `import pandas as pd
import numpy as np
import plotly.express as px

# 读取数据
df = pd.read_csv('https://raw.githubusercontent.com/mwaskom/seaborn-data/master/tips.csv')

# 查看数据基本信息
print("数据形状:", df.shape)
print("\n数据前5行:")
print(df.head())
print("\n数据统计描述:")
print(df.describe())

# 数据可视化
# 总账单与小费的关系
fig1 = px.scatter(df, x='total_bill', y='tip', color='sex', title='总账单与小费的关系')
fig1.show()

# 不同日期的消费情况
fig2 = px.bar(df, x='day', y='total_bill', title='不同日期的消费情况')
fig2.show()

print("\n项目完成！")`,
    sampleData: "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/tips.csv",
    explanation: "本项目介绍了pandas的基本操作，包括数据读取、基本信息查看、统计描述和简单的数据可视化。通过分析餐厅小费数据，你可以了解如何使用pandas进行初步的数据探索。"
  },
  {
    id: 2,
    title: "数据清洗与预处理",
    difficulty: "入门",
    description: "学习如何处理缺失值、重复值和异常值",
    objectives: ["处理缺失值", "删除重复值", "处理异常值", "数据转换"],
    background: "真实世界的数据往往包含缺失值、重复值和异常值，这些问题会影响分析结果。本项目通过处理员工数据，学习数据清洗的基本步骤。",
    steps: [
      "创建包含缺失值、重复值和异常值的示例数据",
      "使用fillna()方法处理缺失值",
      "使用drop_duplicates()方法删除重复值",
      "使用apply()方法处理异常值",
      "使用cut()函数进行数据分箱转换",
      "可视化处理后的数据"
    ],
    codeExplanation: {
      "缺失值处理": "使用mean()计算平均值，fillna()填充缺失值",
      "重复值处理": "使用drop_duplicates()删除完全相同的行",
      "异常值处理": "使用apply()和lambda函数将超过100的分数限制为100",
      "数据转换": "使用cut()函数将薪资分为不同等级"
    },
    expectedOutput: "你将看到原始数据、处理缺失值后的数据、删除重复值后的数据、处理异常值后的数据，以及最终的数据转换结果和薪资分布图表。",
    challenges: ["如何选择合适的缺失值填充方法", "如何定义和处理异常值"],
    extensions: ["尝试不同的缺失值填充策略", "使用不同的异常值检测方法", "添加更多的特征工程步骤"],
    quiz: {
      questions: [
        {
          question: "在pandas中，用于填充缺失值的方法是？",
          options: ["df.fillna()", "df.dropna()", "df.replace()", "df.fill()"],
          answer: "df.fillna()",
          explanation: "df.fillna()方法用于填充DataFrame中的缺失值，可以指定填充的值或使用统计量如mean()、median()等。"
        },
        {
          question: "用于删除重复行的方法是？",
          options: ["df.remove_duplicates()", "df.drop_duplicates()", "df.delete_duplicates()", "df.clean_duplicates()"],
          answer: "df.drop_duplicates()",
          explanation: "df.drop_duplicates()方法用于删除DataFrame中的重复行，可以指定subset参数来考虑特定的列。"
        },
        {
          question: "将数据按区间分组的函数是？",
          options: ["pd.group()", "pd.cut()", "pd.bucket()", "pd.divide()"],
          answer: "pd.cut()",
          explanation: "pd.cut()函数用于将连续数值数据分割成离散的区间，可以指定bins参数设置分组边界，labels参数设置分组标签。"
        },
        {
          question: "在pandas中，apply()方法用于？",
          options: ["应用函数到数据", "删除数据", "添加数据", "合并数据"],
          answer: "应用函数到数据",
          explanation: "apply()方法用于将函数应用到DataFrame的行或列上，可以使用lambda函数或自定义函数。"
        },
        {
          question: "在numpy中，表示缺失值的是？",
          options: ["None", "NaN", "Null", "Missing"],
          answer: "NaN",
          explanation: "在numpy和pandas中，NaN（Not a Number）用于表示缺失的数值，np.nan是缺失值的标准表示。"
        }
      ]
    },
    code: `import pandas as pd
import numpy as np
import plotly.express as px

# 创建示例数据
data = {
    'name': ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Alice'],
    'age': [25, np.nan, 35, 40, 28, 25],
    'salary': [50000, 60000, 70000, 80000, 90000, 50000],
    'score': [85, 90, 75, 105, 80, 85]
}

df = pd.DataFrame(data)
print("原始数据:")
print(df)

# 处理缺失值
print("\n处理缺失值:")
df['age'].fillna(df['age'].mean(), inplace=True)
print(df)

# 删除重复值
print("\n删除重复值:")
df = df.drop_duplicates()
print(df)

# 处理异常值（score > 100）
print("\n处理异常值:")
df['score'] = df['score'].apply(lambda x: 100 if x > 100 else x)
print(df)

# 数据转换
print("\n数据转换:")
df['salary_category'] = pd.cut(df['salary'], bins=[0, 60000, 80000, 100000], labels=['低', '中', '高'])
print(df)

# 可视化
fig = px.bar(df, x='name', y='salary', color='salary_category', title='员工薪资分布')
fig.show()

print("\n项目完成！")`,
    explanation: "本项目介绍了数据清洗的基本步骤，包括处理缺失值、删除重复值、处理异常值和数据转换。数据清洗是数据分析的重要步骤，确保数据质量对于后续的分析至关重要。"
  },
  {
    id: 3,
    title: "数据分组与聚合",
    difficulty: "入门",
    description: "学习如何使用groupby进行数据分组和聚合操作",
    objectives: ["数据分组", "聚合计算", "多级分组", "透视表"],
    background: "分组和聚合是数据分析中常用的操作，通过这些操作可以从不同维度分析数据。本项目使用餐厅小费数据，学习groupby的各种用法。",
    steps: [
      "读取小费数据集",
      "按性别分组计算平均小费",
      "按性别和吸烟状态进行多级分组",
      "使用agg()函数计算多个统计量",
      "创建透视表分析数据",
      "可视化分析结果"
    ],
    codeExplanation: {
      "简单分组": "groupby('sex')['tip'].mean()按性别计算平均小费",
      "多级分组": "groupby(['sex', 'smoker'])创建多级分组",
      "多统计量": "agg()函数可以同时计算多个统计量",
      "透视表": "pivot_table()创建交叉表分析"
    },
    expectedOutput: "你将看到按不同维度分组的分析结果，包括性别、吸烟状态、日期和时间等维度的统计信息，以及相应的可视化图表。",
    challenges: ["如何选择合适的分组维度", "如何处理多级索引的结果"],
    extensions: ["尝试不同的聚合函数", "创建更复杂的透视表", "分析更多的维度组合"],
    quiz: {
      questions: [
        {
          question: "在pandas中，用于数据分组的方法是？",
          options: ["df.group()", "df.groupby()", "df.aggregate()", "df.segment()"],
          answer: "df.groupby()",
          explanation: "df.groupby()是pandas中用于数据分组的核心方法，可以按一个或多个列进行分组。"
        },
        {
          question: "用于同时计算多个统计量的方法是？",
          options: ["df.mean()", "df.sum()", "df.agg()", "df.stats()"],
          answer: "df.agg()",
          explanation: "df.agg()方法可以同时应用多个聚合函数，如mean、sum、count等。"
        },
        {
          question: "创建交叉表分析的函数是？",
          options: ["pd.crosstab()", "pd.pivot_table()", "pd.cross()", "pd.table()"],
          answer: "pd.pivot_table()",
          explanation: "pd.pivot_table()函数用于创建透视表，可以按行和列两个维度对数据进行聚合分析。"
        },
        {
          question: "groupby后直接调用mean()会？",
          options: ["计算所有数值列的平均值", "计算第一列的平均值", "只计算分组键的平均值", "报错"],
          answer: "计算所有数值列的平均值",
          explanation: "groupby后直接调用聚合函数会自动对所有数值类型的列进行计算。"
        },
        {
          question: "按多个列分组的正确写法是？",
          options: ["df.groupby('col1', 'col2')", "df.groupby(['col1', 'col2'])", "df.groupby(col1 + col2)", "df.groupby(col1, col2)"],
          answer: "df.groupby(['col1', 'col2'])",
          explanation: "需要将多个列名放在一个列表中作为groupby的参数，如groupby(['col1', 'col2'])。"
        }
      ]
    },
    code: `import pandas as pd
import numpy as np
import plotly.express as px

# 读取数据
df = pd.read_csv('https://raw.githubusercontent.com/mwaskom/seaborn-data/master/tips.csv')

# 按性别分组计算平均小费
print("按性别分组计算平均小费:")
gender_tip = df.groupby('sex')['tip'].mean()
print(gender_tip)

# 按性别和吸烟状态分组计算平均总账单
print("\n按性别和吸烟状态分组计算平均总账单:")
gender_smoker = df.groupby(['sex', 'smoker'])['total_bill'].mean()
print(gender_smoker)

# 多级分组并计算多个统计量
print("\n多级分组并计算多个统计量:")
multi_group = df.groupby(['day', 'time']).agg({
    'total_bill': ['mean', 'sum'],
    'tip': ['mean', 'count']
})
print(multi_group)

# 创建透视表
print("\n创建透视表:")
pivot_table = df.pivot_table(values='tip', index='day', columns='time', aggfunc='mean')
print(pivot_table)

# 可视化
fig = px.bar(df, x='day', y='tip', color='time', barmode='group', title='不同日期和时间的小费情况')
fig.show()

print("\n项目完成！")`,
    sampleData: "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/tips.csv",
    explanation: "本项目介绍了pandas的groupby操作，这是数据分析中非常重要的功能。通过分组和聚合，你可以从不同维度分析数据，发现数据中的模式和趋势。"
  },
  {
    id: 4,
    title: "时间序列分析",
    difficulty: "中级",
    description: "学习如何处理和分析时间序列数据",
    objectives: ["时间序列数据处理", "时间索引", "滚动窗口", "时间序列可视化"],
    background: "时间序列数据在金融、销售、气象等领域非常常见。本项目创建模拟的时间序列数据，学习时间序列的基本处理和分析方法。",
    steps: [
      "创建日期范围和时间序列数据",
      "设置时间索引",
      "使用resample()方法进行时间重采样",
      "计算滚动平均值",
      "计算同比增长率",
      "可视化时间序列数据"
    ],
    codeExplanation: {
      "时间索引": "set_index('date')将日期列设置为索引",
      "时间重采样": "resample('M')按月重采样并计算平均值",
      "滚动窗口": "rolling(window=7)计算7天滚动平均值",
      "同比增长": "pct_change(periods=365)计算同比增长率"
    },
    expectedOutput: "你将看到时间序列数据的基本信息、按月聚合的结果、滚动平均值，以及时间序列和滚动平均值的趋势图。",
    challenges: ["如何处理不同频率的时间序列", "如何处理时间序列中的缺失值"],
    extensions: ["尝试不同的时间频率和重采样方法", "添加季节性分析", "使用更复杂的时间序列模型"],
    quiz: {
      questions: [
        {
          question: "在pandas中，创建日期范围的函数是？",
          options: ["pd.date_range()", "pd.date_create()", "pd.dates()", "pd.timerange()"],
          answer: "pd.date_range()",
          explanation: "pd.date_range()函数用于创建日期范围，可以指定开始日期、结束日期和频率。"
        },
        {
          question: "时间重采样使用的方法是？",
          options: ["df.resample()", "df.time()", "df.timegroup()", "df.reindex()"],
          answer: "df.resample()",
          explanation: "df.resample()方法用于时间序列数据的重采样，可以改变数据的频率。"
        },
        {
          question: "计算滚动窗口平均值使用的方法是？",
          options: ["df.roll()", "df.rolling()", "df.window()", "df.move()"],
          answer: "df.rolling()",
          explanation: "df.rolling()方法用于创建滚动窗口对象，常用于计算移动平均值等统计量。"
        },
        {
          question: "按月重采样的频率参数是？",
          options: ["'M'", "'month'", "'monthly'", "'30D'"],
          answer: "'M'",
          explanation: "在resample()中使用'M'表示按月重采样，'M'是月份的缩写。"
        },
        {
          question: "计算百分比变化的方法是？",
          options: ["df.pct_change()", "df.percent()", "df.change()", "df.growth()"],
          answer: "df.pct_change()",
          explanation: "df.pct_change()方法用于计算当前元素与前一个元素的百分比变化。"
        }
      ]
    },
    code: `import pandas as pd
import numpy as np
import plotly.express as px

# 创建时间序列数据
date_rng = pd.date_range(start='2023-01-01', end='2023-12-31', freq='D')
df = pd.DataFrame(date_rng, columns=['date'])
df['value'] = np.random.randn(len(date_rng)) * 10 + 50
df['value'] = df['value'].cumsum()

# 设置时间索引
df.set_index('date', inplace=True)
print("时间序列数据:")
print(df.head())

# 按月份聚合
print("\n按月聚合:")
monthly = df.resample('M').mean()
print(monthly)

# 计算滚动平均值
print("\n滚动平均值:")
df['rolling_mean'] = df['value'].rolling(window=7).mean()
print(df.head(10))

# 计算同比增长
print("\n同比增长:")
df['year_over_year'] = df['value'].pct_change(periods=365) * 100
print(df.tail())

# 可视化
fig = px.line(df, y=['value', 'rolling_mean'], title='时间序列数据与滚动平均值')
fig.show()

print("\n项目完成！")`,
    explanation: "本项目介绍了时间序列数据的处理和分析方法，包括时间索引设置、数据重采样、滚动窗口计算和时间序列可视化。时间序列分析在金融、销售和气象等领域有广泛应用。"
  },
  {
    id: 5,
    title: "数据合并与连接",
    difficulty: "中级",
    description: "学习如何合并和连接不同的数据集",
    objectives: ["内连接", "外连接", "左连接", "右连接", "合并多个数据集"],
    background: "在实际数据分析中，经常需要从多个来源获取数据并合并。本项目通过学生、成绩和活动三个数据集，学习不同的合并方法。",
    steps: [
      "创建三个相关的数据集",
      "使用merge()函数进行内连接",
      "进行左连接和右连接",
      "进行外连接",
      "合并三个数据集",
      "可视化合并后的数据"
    ],
    codeExplanation: {
      "内连接": "how='inner'只保留两个表中都存在的记录",
      "左连接": "how='left'保留左表所有记录，右表匹配不到的为NaN",
      "右连接": "how='right'保留右表所有记录，左表匹配不到的为NaN",
      "外连接": "how='outer'保留两个表的所有记录"
    },
    expectedOutput: "你将看到三个原始数据集，以及不同连接方式的结果，包括内连接、左连接、右连接和外连接，最后是三个数据集的合并结果和成绩分布图表。",
    challenges: ["如何处理不同类型的连接", "如何处理合并后的数据中的缺失值"],
    extensions: ["尝试使用join()方法进行合并", "处理不同列名的合并", "添加更多的数据集进行复杂合并"],
    quiz: {
      questions: [
        {
          question: "在pandas中，用于合并数据的主要函数是？",
          options: ["pd.concat()", "pd.merge()", "pd.join()", "pd.combine()"],
          answer: "pd.merge()",
          explanation: "pd.merge()是pandas中用于合并数据的主要函数，支持多种连接方式。"
        },
        {
          question: "只保留两个表中都存在的记录的连接方式是？",
          options: ["left", "right", "inner", "outer"],
          answer: "inner",
          explanation: "inner join（内连接）只保留两个表中匹配键都存在的记录。"
        },
        {
          question: "保留左表所有记录，右表匹配不到的为NaN的连接方式是？",
          options: ["inner", "left", "right", "outer"],
          answer: "left",
          explanation: "left join（左连接）保留左表所有记录，右表匹配不到的填充为NaN。"
        },
        {
          question: "保留两个表所有记录的连接方式是？",
          options: ["inner", "left", "right", "outer"],
          answer: "outer",
          explanation: "outer join（外连接）保留两个表的所有记录，不匹配的填充为NaN。"
        },
        {
          question: "合并三个数据集的正确做法是？",
          options: ["pd.merge(df1, df2, df3)", "pd.merge(pd.merge(df1, df2), df3)", "df1.merge(df2).merge(df3)", "concat([df1, df2, df3])"],
          answer: "pd.merge(pd.merge(df1, df2), df3)",
          explanation: "合并三个数据集需要嵌套使用merge()函数，先合并前两个，再与第三个合并。"
        }
      ]
    },
    code: `import pandas as pd
import numpy as np
import plotly.express as px

# 创建第一个数据集
students = pd.DataFrame({
    'id': [1, 2, 3, 4, 5],
    'name': ['Alice', 'Bob', 'Charlie', 'David', 'Eve'],
    'age': [20, 21, 19, 22, 20]
})

# 创建第二个数据集
grades = pd.DataFrame({
    'id': [1, 2, 3, 6, 7],
    'math': [85, 90, 75, 80, 95],
    'english': [90, 85, 80, 75, 90]
})

# 创建第三个数据集
activities = pd.DataFrame({
    'id': [1, 2, 4, 5, 6],
    'club': ['chess', 'music', 'sports', 'art', 'debate']
})

print("学生数据:")
print(students)
print("\n成绩数据:")
print(grades)
print("\n活动数据:")
print(activities)

# 内连接
print("\n内连接学生和成绩:")
inner_join = pd.merge(students, grades, on='id', how='inner')
print(inner_join)

# 左连接
print("\n左连接学生和成绩:")
left_join = pd.merge(students, grades, on='id', how='left')
print(left_join)

# 右连接
print("\n右连接学生和成绩:")
right_join = pd.merge(students, grades, on='id', how='right')
print(right_join)

# 外连接
print("\n外连接学生和成绩:")
outer_join = pd.merge(students, grades, on='id', how='outer')
print(outer_join)

# 合并多个数据集
print("\n合并三个数据集:")
merged = pd.merge(pd.merge(students, grades, on='id', how='outer'), activities, on='id', how='outer')
print(merged)

# 可视化
fig = px.bar(merged, x='name', y=['math', 'english'], title='学生成绩分布')
fig.show()

print("\n项目完成！")`,
    explanation: "本项目介绍了pandas中的数据合并和连接操作，包括内连接、外连接、左连接和右连接。这些操作在处理多个相关数据集时非常重要，可以帮助你整合不同来源的数据。"
  },
  {
    id: 6,
    title: "特征工程与特征选择",
    difficulty: "中级",
    description: "学习如何创建和选择有意义的特征",
    objectives: ["特征创建", "特征转换", "特征选择", "相关性分析"],
    background: "特征工程是机器学习中的重要步骤，好的特征可以显著提高模型性能。本项目使用鸢尾花数据集，学习特征工程的基本方法。",
    steps: [
      "读取鸢尾花数据集",
      "创建新的特征（面积、比例等）",
      "对特征进行标准化处理",
      "计算特征之间的相关性",
      "可视化相关性矩阵",
      "使用散点矩阵可视化特征分布"
    ],
    codeExplanation: {
      "特征创建": "通过现有特征的组合创建新特征",
      "特征标准化": "(X - mean) / std 进行标准化",
      "相关性分析": "corr()计算特征之间的相关系数",
      "可视化": "使用热力图和散点矩阵展示特征关系"
    },
    expectedOutput: "你将看到原始数据、创建的新特征、标准化后的特征、特征相关性矩阵，以及特征分布的散点矩阵图。",
    challenges: ["如何选择有意义的特征", "如何处理高相关性的特征"],
    extensions: ["尝试更多的特征创建方法", "使用主成分分析(PCA)进行特征降维", "应用特征选择算法"],
    quiz: {
      questions: [
        {
          question: "特征标准化的公式通常是？",
          options: ["(X - mean) / std", "X / max", "X - min", "X * scale"],
          answer: "(X - mean) / std",
          explanation: "标准化通常指Z-score标准化，即(X - mean) / std，使数据均值为0，标准差为1。"
        },
        {
          question: "计算特征之间相关系数的方法是？",
          options: ["df.correlation()", "df.corr()", "df.relation()", "df.calculate()"],
          answer: "df.corr()",
          explanation: "df.corr()方法用于计算数据框中数值列之间的皮尔逊相关系数。"
        },
        {
          question: "通过现有特征的加减乘除创建新特征的过程称为？",
          options: ["特征选择", "特征创建/特征工程", "特征降维", "特征缩放"],
          answer: "特征创建/特征工程",
          explanation: "通过现有特征组合创建新特征是特征工程的重要组成部分。"
        },
        {
          question: "两个特征之间的相关系数接近1表示？",
          options: ["两个特征不相关", "两个特征强正相关", "两个特征强负相关", "两个特征完全相同"],
          answer: "两个特征强正相关",
          explanation: "相关系数的取值范围是[-1, 1]，接近1表示强正相关，接近-1表示强负相关，接近0表示不相关。"
        },
        {
          question: "关于特征工程，以下说法错误的是？",
          options: ["好的特征可以提高模型性能", "特征越多越好", "需要去除高相关性的特征", "可以创建新的特征"],
          answer: "特征越多越好",
          explanation: "特征并不是越多越好，过多的无关特征或高相关性特征可能导致过拟合或增加计算复杂度。"
        }
      ]
    },
    code: `import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go

# 读取数据
df = pd.read_csv('https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv')
print("原始数据:")
print(df.head())

# 创建新特征
print("\n创建新特征:")
df['sepal_area'] = df['sepal_length'] * df['sepal_width']
df['petal_area'] = df['petal_length'] * df['petal_width']
df['sepal_ratio'] = df['sepal_length'] / df['sepal_width']
df['petal_ratio'] = df['petal_length'] / df['petal_width']
print(df.head())

# 特征标准化
print("\n特征标准化:")
numeric_cols = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width', 'sepal_area', 'petal_area', 'sepal_ratio', 'petal_ratio']
df[numeric_cols] = (df[numeric_cols] - df[numeric_cols].mean()) / df[numeric_cols].std()
print(df.head())

# 相关性分析
print("\n相关性矩阵:")
corr_matrix = df[numeric_cols].corr()
print(corr_matrix)

# 可视化相关性矩阵
fig = go.Figure(data=go.Heatmap(
    z=corr_matrix.values,
    x=corr_matrix.columns,
    y=corr_matrix.index,
    colorscale='Viridis'
))
fig.update_layout(title='特征相关性矩阵')
fig.show()

# 可视化数据分布
fig = px.scatter_matrix(df, dimensions=numeric_cols, color='species', title='特征分布')
fig.show()

print("\n项目完成！")`,
    sampleData: "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv",
    explanation: "本项目介绍了特征工程和特征选择的基本方法，包括创建新特征、特征标准化和相关性分析。特征工程是机器学习中的重要步骤，好的特征可以显著提高模型性能。"
  },
  {
    id: 7,
    title: "高级数据可视化",
    difficulty: "中级",
    description: "学习如何创建复杂和交互式的数据可视化",
    objectives: ["多子图可视化", "交互式图表", "地理数据可视化", "自定义图表样式"],
    background: "数据可视化是数据分析的重要组成部分，好的可视化可以帮助我们更直观地理解数据。本项目使用小费数据集，学习高级数据可视化技术。",
    steps: [
      "读取小费数据集",
      "创建多子图布局",
      "添加不同类型的图表（直方图、散点图、柱状图）",
      "创建交互式饼图",
      "创建箱线图和小提琴图",
      "自定义图表样式和布局"
    ],
    codeExplanation: {
      "多子图": "make_subplots()创建多子图布局",
      "饼图": "px.pie()创建交互式饼图，hole参数设置环形图",
      "箱线图": "px.box()展示数据分布和异常值",
      "小提琴图": "px.violin()展示数据分布的密度"
    },
    expectedOutput: "你将看到一个包含四个子图的仪表盘，以及交互式饼图、箱线图和小提琴图，展示不同维度的数据分布和关系。",
    challenges: ["如何设计有效的多子图布局", "如何选择合适的图表类型"],
    extensions: ["尝试更多类型的图表", "添加交互功能", "创建更复杂的仪表盘"],
    quiz: {
      questions: [
        {
          question: "在plotly中，创建多子图布局的函数是？",
          options: ["make_subplots()", "subplots()", "figure()", "grid()"],
          answer: "make_subplots()",
          explanation: "from plotly.subplots import make_subplots，使用make_subplots()创建多子图布局。"
        },
        {
          question: "用于展示数据分布和异常值的图表是？",
          options: ["散点图", "箱线图", "饼图", "折线图"],
          answer: "箱线图",
          explanation: "箱线图（Box Plot）可以展示数据的中位数、四分位数和异常值。"
        },
        {
          question: "展示数据分布密度的图表是？",
          options: ["箱线图", "小提琴图", "柱状图", "饼图"],
          answer: "小提琴图",
          explanation: "小提琴图（Violin Plot）结合了箱线图和密度图的特点，可以展示数据的分布密度。"
        },
        {
          question: "创建饼图时，设置环形图的参数是？",
          options: ["ring", "hole", "donut", "circle"],
          answer: "hole",
          explanation: "在px.pie()中使用hole参数设置环形图的中心空白大小。"
        },
        {
          question: "关于数据可视化，以下说法正确的是？",
          options: ["图表越复杂越好", "应根据数据类型选择合适的图表", "颜色越多越好", "不需要考虑受众"],
          answer: "应根据数据类型选择合适的图表",
          explanation: "不同类型的数据适合不同的图表类型，应根据数据特点和分析目的选择合适的可视化方式。"
        }
      ]
    },
    code: `import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots

# 读取数据
df = pd.read_csv('https://raw.githubusercontent.com/mwaskom/seaborn-data/master/tips.csv')

# 创建多子图
fig = make_subplots(rows=2, cols=2, subplot_titles=('总账单分布', '小费分布', '总账单与小费关系', '不同日期的消费'))

# 总账单分布
fig.add_trace(go.Histogram(x=df['total_bill'], name='总账单'), row=1, col=1)

# 小费分布
fig.add_trace(go.Histogram(x=df['tip'], name='小费'), row=1, col=2)

# 总账单与小费关系
fig.add_trace(go.Scatter(x=df['total_bill'], y=df['tip'], mode='markers', name='小费'), row=2, col=1)

# 不同日期的消费
fig.add_trace(go.Bar(x=df['day'].unique(), y=df.groupby('day')['total_bill'].mean(), name='平均消费'), row=2, col=2)

fig.update_layout(height=600, width=800, title_text="多子图数据可视化")
fig.show()

# 交互式饼图
fig = px.pie(df, values='total_bill', names='day', title='不同日期的消费占比', hole=0.3)
fig.show()

# 箱线图
fig = px.box(df, x='day', y='total_bill', color='time', title='不同日期和时间的消费分布')
fig.show()

# 小提琴图
fig = px.violin(df, x='sex', y='tip', color='smoker', title='性别和吸烟状态对小费的影响')
fig.show()

print("项目完成！")`,
    sampleData: "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/tips.csv",
    explanation: "本项目介绍了高级数据可视化技术，包括多子图、交互式图表、饼图、箱线图和小提琴图。良好的数据可视化可以帮助你更直观地理解数据，发现数据中的模式和趋势。"
  },
  {
    id: 8,
    title: "文本数据处理",
    difficulty: "高级",
    description: "学习如何处理和分析文本数据",
    objectives: ["文本清洗", "分词", "词频统计", "文本可视化"],
    background: "文本数据在自然语言处理、情感分析等领域非常重要。本项目使用简单的文本数据，学习文本处理的基本方法。",
    steps: [
      "创建文本数据集",
      "进行文本清洗（转换小写、移除标点）",
      "对文本进行分词",
      "统计词频",
      "可视化词频分布",
      "分析文本长度和词数"
    ],
    codeExplanation: {
      "文本清洗": "使用str.lower()和正则表达式清洗文本",
      "分词": "使用str.split()进行简单分词",
      "词频统计": "使用Counter统计词频",
      "可视化": "使用柱状图展示词频分布"
    },
    expectedOutput: "你将看到原始文本数据、清洗后的文本、分词结果、词频统计，以及词频分布图表和文本长度分析。",
    challenges: ["如何处理更复杂的文本数据", "如何进行更高级的文本分析"],
    extensions: ["尝试使用NLTK或spaCy进行更高级的文本处理", "添加情感分析", "分析更大的文本 corpus"],
    quiz: {
      questions: [
        {
          question: "Python中用于正则表达式的库是？",
          options: ["string", "re", "regex", "text"],
          answer: "re",
          explanation: "re是Python的正则表达式库，用于文本模式匹配和处理。"
        },
        {
          question: "将文本转换为单词列表的过程称为？",
          options: ["文本清洗", "分词", "词频统计", "向量化"],
          answer: "分词",
          explanation: "分词（Tokenization）是将文本分割成单词或词语的过程。"
        },
        {
          question: "统计词频的常用工具是？",
          options: ["list.count()", "collections.Counter", "dict()", "set()"],
          answer: "collections.Counter",
          explanation: "collections模块的Counter类专门用于统计可哈希对象的出现次数。"
        },
        {
          question: "将文本转换为小写的方法是？",
          options: ["str.upper()", "str.lower()", "str.title()", "str.capitalize()"],
          answer: "str.lower()",
          explanation: "str.lower()方法将字符串中的所有字符转换为小写。"
        },
        {
          question: "以下哪个不是文本预处理的步骤？",
          options: ["文本清洗", "分词", "模型训练", "词频统计"],
          answer: "模型训练",
          explanation: "模型训练是后续步骤，文本预处理通常包括清洗、分词、统计等步骤。"
        }
      ]
    },
    code: `import pandas as pd
import numpy as np
import plotly.express as px
import re
from collections import Counter

# 创建文本数据
data = {
    'id': [1, 2, 3, 4, 5],
    'text': [
        'Python is a great programming language for data analysis',
        'Pandas is a powerful library for data manipulation',
        'Data analysis with Python and pandas is fun',
        'I love working with data in Python',
        'Python, pandas, and data analysis are my favorite'
    ]
}

df = pd.DataFrame(data)
print("原始文本数据:")
print(df)

# 文本清洗
print("\n文本清洗:")
df['clean_text'] = df['text'].str.lower()  # 转换为小写
df['clean_text'] = df['clean_text'].apply(lambda x: re.sub(r'[^a-zA-Z\s]', '', x))  # 移除标点符号
print(df)

# 分词
print("\n分词:")
df['tokens'] = df['clean_text'].str.split()
print(df)

# 词频统计
print("\n词频统计:")
all_words = [word for tokens in df['tokens'] for word in tokens]
word_counts = Counter(all_words)
top_words = word_counts.most_common(10)
print(top_words)

# 创建词频数据框
word_freq = pd.DataFrame(top_words, columns=['word', 'frequency'])

# 可视化词频
fig = px.bar(word_freq, x='word', y='frequency', title='词频统计')
fig.show()

# 文本长度分析
df['text_length'] = df['text'].str.len()
df['word_count'] = df['tokens'].apply(len)

print("\n文本长度分析:")
print(df[['text', 'text_length', 'word_count']])

# 可视化文本长度
fig = px.scatter(df, x='word_count', y='text_length', title='文本长度与词数关系')
fig.show()

print("\n项目完成！")`,
    explanation: "本项目介绍了文本数据的处理和分析方法，包括文本清洗、分词、词频统计和文本可视化。文本分析在自然语言处理、情感分析和信息提取等领域有广泛应用。"
  },
  {
    id: 9,
    title: "机器学习数据预处理",
    difficulty: "高级",
    description: "学习如何为机器学习模型准备数据",
    objectives: ["数据拆分", "特征编码", "特征缩放", "处理不平衡数据"],
    background: "数据预处理是机器学习工作流程中的重要环节，直接影响模型的性能。本项目使用鸢尾花数据集，学习机器学习数据预处理的基本步骤。",
    steps: [
      "读取鸢尾花数据集",
      "分离特征和目标变量",
      "使用train_test_split拆分数据",
      "使用StandardScaler进行特征缩放",
      "使用LabelEncoder进行标签编码",
      "可视化数据分布和特征相关性"
    ],
    codeExplanation: {
      "数据拆分": "train_test_split()将数据分为训练集和测试集",
      "特征缩放": "StandardScaler()将特征标准化为均值为0，标准差为1",
      "标签编码": "LabelEncoder()将分类标签转换为数值",
      "可视化": "使用散点矩阵和热力图展示数据"
    },
    expectedOutput: "你将看到原始数据、数据拆分结果、缩放后的特征、编码后的标签，以及数据分布和特征相关性的可视化。",
    challenges: ["如何处理不同类型的特征", "如何处理不平衡数据集"],
    extensions: ["尝试不同的特征缩放方法", "处理类别型特征的编码", "应用特征选择技术"],
    quiz: {
      questions: [
        {
          question: "在sklearn中，用于划分训练集和测试集的函数是？",
          options: ["train_test_split()", "split_data()", "divide_data()", "separate()"],
          answer: "train_test_split()",
          explanation: "from sklearn.model_selection import train_test_split，该函数用于将数据集划分为训练集和测试集。"
        },
        {
          question: "将特征标准化为均值0、标准差1的类是？",
          options: ["MinMaxScaler", "StandardScaler", "Normalizer", "RobustScaler"],
          answer: "StandardScaler",
          explanation: "StandardScaler实现Z-score标准化，将数据转换为均值为0、标准差为1的分布。"
        },
        {
          question: "将分类标签转换为数值的类是？",
          options: ["OneHotEncoder", "LabelEncoder", "OrdinalEncoder", "CategoryEncoder"],
          answer: "LabelEncoder",
          explanation: "LabelEncoder用于将目标标签（分类变量）转换为连续的数值。"
        },
        {
          question: "fit_transform()和transform()的区别是？",
          options: ["没有区别", "fit_transform()只学习参数，transform()只转换", "fit_transform()学习并转换，transform()只转换", "transform()只用于测试集"],
          answer: "fit_transform()学习并转换，transform()只转换",
          explanation: "fit_transform()会先学习数据的统计参数（如均值、标准差）再进行转换，而transform()只使用已学习的参数进行转换。"
        },
        {
          question: "测试集数据应该使用哪种方式进行特征缩放？",
          options: ["使用测试集自己的fit_transform()", "使用训练集的transform()", "不需要缩放", "重新拟合整个数据集"],
          answer: "使用训练集的transform()",
          explanation: "测试集应该使用训练集学习到的参数进行transform()，以避免数据泄露。"
        }
      ]
    },
    code: `import pandas as pd
import numpy as np
import plotly.express as px
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder

# 读取数据
df = pd.read_csv('https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv')
print("原始数据:")
print(df.head())

# 特征和目标变量
X = df.drop('species', axis=1)
y = df['species']

# 数据拆分
print("\n数据拆分:")
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(f"训练集大小: {X_train.shape}")
print(f"测试集大小: {X_test.shape}")

# 特征缩放
print("\n特征缩放:")
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 转换为数据框以便查看
X_train_scaled_df = pd.DataFrame(X_train_scaled, columns=X.columns)
print("缩放后的训练数据:")
print(X_train_scaled_df.head())

# 标签编码
print("\n标签编码:")
encoder = LabelEncoder()
y_train_encoded = encoder.fit_transform(y_train)
y_test_encoded = encoder.transform(y_test)

print(f"原始标签: {y_train.unique()}")
print(f"编码后标签: {np.unique(y_train_encoded)}")

# 可视化数据分布
fig = px.scatter_matrix(df, dimensions=X.columns, color='species', title='鸢尾花数据分布')
fig.show()

# 特征相关性
corr_matrix = X.corr()
fig = px.imshow(corr_matrix, title='特征相关性矩阵')
fig.show()

print("\n项目完成！")`,
    sampleData: "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv",
    explanation: "本项目介绍了机器学习数据预处理的基本步骤，包括数据拆分、特征缩放和标签编码。数据预处理是机器学习工作流程中的重要环节，直接影响模型的性能。"
  },
  {
    id: 10,
    title: "综合数据分析项目",
    difficulty: "高级",
    description: "综合运用pandas进行完整的数据分析项目",
    objectives: ["数据获取", "数据清洗", "探索性分析", "统计分析", "可视化报告"],
    background: "本项目是一个综合练习，涵盖了数据分析的完整流程。通过分析餐厅小费数据，你将学习如何进行端到端的数据分析。",
    steps: [
      "读取小费数据集",
      "检查数据基本信息和缺失值",
      "进行描述性统计分析",
      "按不同维度（性别、吸烟状态、日期、时间）进行分组分析",
      "计算小费比例并分析",
      "创建综合可视化报告",
      "总结分析结论"
    ],
    codeExplanation: {
      "数据清洗": "使用info()和isnull()检查数据质量",
      "分组分析": "使用groupby()和agg()进行多维度分析",
      "小费比例": "计算tip/total_bill*100得到小费比例",
      "可视化报告": "使用subplots创建多子图仪表盘"
    },
    expectedOutput: "你将看到数据基本信息、描述性统计、各维度的分析结果、小费比例分析，以及一个包含多个图表的综合可视化报告。",
    challenges: ["如何设计完整的分析流程", "如何从数据中提取有价值的洞察"],
    extensions: ["添加更多的分析维度", "创建更复杂的可视化报告", "撰写完整的数据分析报告"],
    quiz: {
      questions: [
        {
          question: "检查数据基本信息的方法是？",
          options: ["df.info()", "df.describe()", "df.head()", "df.summary()"],
          answer: "df.info()",
          explanation: "df.info()方法显示数据框的基本信息，包括列名、非空值数量、数据类型等。"
        },
        {
          question: "检查缺失值的常用方法是？",
          options: ["df.isnull().sum()", "df.missing()", "df.check_null()", "df.nan()"],
          answer: "df.isnull().sum()",
          explanation: "df.isnull()返回布尔值数据框，sum()计算每列的缺失值数量。"
        },
        {
          question: "计算小费比例的正确公式是？",
          options: ["tip / total_bill * 100", "total_bill / tip", "tip - total_bill", "tip + total_bill"],
          answer: "tip / total_bill * 100",
          explanation: "小费比例通常指小费占总账单的百分比，即(tip / total_bill) * 100。"
        },
        {
          question: "完整数据分析流程的第一步通常是？",
          options: ["数据建模", "数据可视化", "数据获取和探索", "报告撰写"],
          answer: "数据获取和探索",
          explanation: "完整的数据分析流程通常从数据获取和探索性分析开始，了解数据的基本情况。"
        },
        {
          question: "关于数据分析，以下说法错误的是？",
          options: ["需要进行数据质量检查", "可视化可以帮助发现模式", "分析结论应该基于数据", "可以随意选择统计方法"],
          answer: "可以随意选择统计方法",
          explanation: "统计方法的选择应该基于数据类型和分析目的，不能随意选择。"
        }
      ]
    },
    code: `import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots

# 读取数据
df = pd.read_csv('https://raw.githubusercontent.com/mwaskom/seaborn-data/master/tips.csv')
print("数据基本信息:")
print(df.info())

# 数据清洗
print("\n检查缺失值:")
print(df.isnull().sum())

# 探索性分析
print("\n数据统计描述:")
print(df.describe())

# 性别分析
print("\n性别分析:")
gender_analysis = df.groupby('sex').agg({
    'total_bill': ['mean', 'std'],
    'tip': ['mean', 'std'],
    'size': ['mean']
})
print(gender_analysis)

# 吸烟状态分析
print("\n吸烟状态分析:")
smoker_analysis = df.groupby('smoker').agg({
    'total_bill': ['mean', 'std'],
    'tip': ['mean', 'std']
})
print(smoker_analysis)

# 日期分析
print("\n日期分析:")
day_analysis = df.groupby('day').agg({
    'total_bill': ['mean', 'sum'],
    'tip': ['mean', 'sum'],
    'size': ['count']
})
print(day_analysis)

# 时间分析
print("\n时间分析:")
time_analysis = df.groupby('time').agg({
    'total_bill': ['mean', 'sum'],
    'tip': ['mean', 'sum']
})
print(time_analysis)

# 小费比例分析
df['tip_percentage'] = (df['tip'] / df['total_bill']) * 100
print("\n小费比例统计:")
print(df['tip_percentage'].describe())

# 创建综合可视化报告
fig = make_subplots(rows=3, cols=2, subplot_titles=(
    '总账单分布', '小费分布', 
    '总账单与小费关系', '小费比例分布',
    '不同日期的消费', '不同时间的消费'
))

# 总账单分布
fig.add_trace(go.Histogram(x=df['total_bill'], name='总账单'), row=1, col=1)

# 小费分布
fig.add_trace(go.Histogram(x=df['tip'], name='小费'), row=1, col=2)

# 总账单与小费关系
fig.add_trace(go.Scatter(x=df['total_bill'], y=df['tip'], mode='markers', name='小费'), row=2, col=1)

# 小费比例分布
fig.add_trace(go.Histogram(x=df['tip_percentage'], name='小费比例'), row=2, col=2)

# 不同日期的消费
fig.add_trace(go.Bar(x=df['day'].unique(), y=df.groupby('day')['total_bill'].mean(), name='平均消费'), row=3, col=1)

# 不同时间的消费
fig.add_trace(go.Bar(x=df['time'].unique(), y=df.groupby('time')['total_bill'].mean(), name='平均消费'), row=3, col=2)

fig.update_layout(height=800, width=1000, title_text="餐厅消费数据分析报告")
fig.show()

# 性别和吸烟状态对小费的影响
fig = px.box(df, x='sex', y='tip_percentage', color='smoker', title='性别和吸烟状态对小费比例的影响')
fig.show()

print("\n项目完成！")
print("\n分析结论:")
print("1. 平均总账单为$19.78，平均小费为$2.99")
print("2. 晚餐的平均消费高于午餐")
print("3. 周末的消费高于工作日")
print("4. 吸烟顾客和非吸烟顾客的消费习惯有所不同")
print("5. 小费比例平均为16.08%")`,
    sampleData: "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/tips.csv",
    explanation: "本项目综合运用了pandas的各种功能进行完整的数据分析，包括数据获取、数据清洗、探索性分析、统计分析和可视化报告。通过这个项目，你可以了解完整的数据分析工作流程，从数据获取到最终的分析结论。"
}
];

export default projects;