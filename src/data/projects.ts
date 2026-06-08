export interface Project {
  id: number;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
  objectives: string[];
  code: string;
  explanation: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: '数据读取与基础操作',
    description: '学习如何读取CSV和Excel文件，掌握DataFrame的基本操作',
    difficulty: 'beginner',
    icon: 'Database',
    objectives: [
      '读取CSV文件',
      '查看数据基本信息',
      '选择列和行',
      '基本统计信息'
    ],
    code: `import pandas as pd
import numpy as np

# 创建示例数据
data = {
    '姓名': ['张三', '李四', '王五', '赵六', '钱七'],
    '年龄': [25, 30, 35, 28, 40],
    '城市': ['北京', '上海', '广州', '深圳', '杭州'],
    '薪资': [8000, 12000, 15000, 10000, 18000]
}

# 创建DataFrame
df = pd.DataFrame(data)
print("原始数据:")
print(df)
print("\\n" + "="*50 + "\\n")

# 查看基本信息
print("数据形状:", df.shape)
print("\\n列名:", df.columns.tolist())
print("\\n数据类型:")
print(df.dtypes)
print("\\n" + "="*50 + "\\n")

# 选择列
print("选择'姓名'和'薪资'列:")
print(df[['姓名', '薪资']])
print("\\n" + "="*50 + "\\n")

# 基本统计
print("数值列统计信息:")
print(df.describe())`,
    explanation: '本项目介绍了pandas的基础操作，包括DataFrame的创建、数据查看、列选择和基本统计。这些是数据分析的第一步，帮助你快速了解数据概况。'
  },
  {
    id: 2,
    title: '数据清洗',
    description: '处理缺失值、重复值和数据类型转换',
    difficulty: 'beginner',
    icon: 'SprayCan',
    objectives: [
      '识别缺失值',
      '处理缺失值',
      '删除重复值',
      '数据类型转换'
    ],
    code: `import pandas as pd
import numpy as np

# 创建包含缺失值的数据
data = {
    '产品': ['A', 'B', None, 'A', 'C', 'B'],
    '价格': [100, None, 300, 100, 250, 180],
    '销量': [50, 30, 20, 50, None, 45],
    '日期': ['2024-01-01', '2024-01-02', '2024-01-03', 
             '2024-01-01', '2024-01-04', '2024-01-05']
}

df = pd.DataFrame(data)
print("原始数据:")
print(df)
print("\\n" + "="*50 + "\\n")

# 检查缺失值
print("缺失值统计:")
print(df.isnull().sum())
print("\\n" + "="*50 + "\\n")

# 删除重复行
df_clean = df.drop_duplicates()
print("删除重复后:")
print(df_clean)
print("\\n" + "="*50 + "\\n")

# 填充缺失值
df_clean['价格'] = df_clean['价格'].fillna(df_clean['价格'].mean())
df_clean['销量'] = df_clean['销量'].fillna(0)
df_clean['产品'] = df_clean['产品'].fillna('未知')

# 转换日期类型
df_clean['日期'] = pd.to_datetime(df_clean['日期'])

print("清洗后的数据:")
print(df_clean)
print("\\n数据类型:")
print(df_clean.dtypes)`,
    explanation: '数据清洗是数据分析的关键步骤。本项目学习如何识别和处理缺失值、删除重复数据，以及进行数据类型转换，为后续分析做好准备。'
  },
  {
    id: 3,
    title: '数据筛选与排序',
    description: '使用布尔索引和条件筛选数据，掌握排序技巧',
    difficulty: 'beginner',
    icon: 'Filter',
    objectives: [
      '条件筛选',
      '多重条件',
      '排序数据',
      '模糊匹配'
    ],
    code: `import pandas as pd

# 创建销售数据
data = {
    '产品': ['手机', '电脑', '平板', '耳机', '键盘', '鼠标', '显示器', '音箱'],
    '类别': ['数码', '数码', '数码', '配件', '配件', '配件', '数码', '配件'],
    '价格': [3999, 7999, 2999, 299, 199, 99, 1599, 399],
    '销量': [120, 85, 60, 300, 450, 600, 75, 250],
    '库存': [50, 30, 25, 100, 150, 200, 20, 80]
}

df = pd.DataFrame(data)
print("原始数据:")
print(df)
print("\\n" + "="*50 + "\\n")

# 单一条件筛选
print("价格大于1000的产品:")
print(df[df['价格'] > 1000])
print("\\n" + "="*50 + "\\n")

# 多重条件筛选
print("数码类且销量大于100的产品:")
print(df[(df['类别'] == '数码') & (df['销量'] > 100)])
print("\\n" + "="*50 + "\\n")

# 排序
print("按销量降序排列:")
print(df.sort_values('销量', ascending=False))
print("\\n" + "="*50 + "\\n")

# 添加销售额列并排序
df['销售额'] = df['价格'] * df['销量']
print("按销售额降序排列TOP 5:")
print(df.sort_values('销售额', ascending=False).head())`,
    explanation: '数据筛选和排序能帮助你快速找到需要的信息。本项目学习各种筛选技巧和排序方法，让数据探索更加高效。'
  },
  {
    id: 4,
    title: '数据聚合与分组',
    description: '使用groupby进行数据分组和聚合分析',
    difficulty: 'intermediate',
    icon: 'BarChart2',
    objectives: [
      'groupby基本使用',
      '多个聚合函数',
      '透视表',
      '分组统计'
    ],
    code: `import pandas as pd
import numpy as np

# 创建销售数据
data = {
    '日期': ['2024-01-01', '2024-01-01', '2024-01-02', '2024-01-02', 
             '2024-01-03', '2024-01-03', '2024-01-04', '2024-01-04'],
    '地区': ['华东', '华北', '华东', '华北', '华东', '华北', '华东', '华北'],
    '产品': ['A', 'A', 'B', 'B', 'A', 'B', 'B', 'A'],
    '销量': [100, 80, 150, 120, 90, 130, 140, 85],
    '销售额': [10000, 8000, 22500, 18000, 9000, 19500, 21000, 8500]
}

df = pd.DataFrame(data)
print("原始数据:")
print(df)
print("\\n" + "="*60 + "\\n")

# 按地区分组
print("按地区分组统计:")
print(df.groupby('地区').agg({
    '销量': ['sum', 'mean', 'max'],
    '销售额': ['sum', 'mean']
}))
print("\\n" + "="*60 + "\\n")

# 按地区和产品分组
print("按地区和产品分组:")
print(df.groupby(['地区', '产品']).agg({
    '销量': 'sum',
    '销售额': 'sum'
}))
print("\\n" + "="*60 + "\\n")

# 创建透视表
print("透视表 - 地区x产品销量:")
pivot = pd.pivot_table(df, values='销量', index='地区', 
                       columns='产品', aggfunc='sum', fill_value=0)
print(pivot)`,
    explanation: '数据分组聚合是数据分析的核心技能。通过groupby和透视表，你可以快速汇总数据，发现不同维度的业务规律。'
  },
  {
    id: 5,
    title: '数据合并与连接',
    description: '学习merge、concat和join的使用方法',
    difficulty: 'intermediate',
    icon: 'GitMerge',
    objectives: [
      'concat轴向合并',
      'merge键连接',
      'join索引连接',
      '不同连接类型'
    ],
    code: `import pandas as pd

# 创建用户数据
users = pd.DataFrame({
    '用户ID': [1, 2, 3, 4, 5],
    '姓名': ['张三', '李四', '王五', '赵六', '钱七'],
    '城市': ['北京', '上海', '广州', '深圳', '杭州']
})

# 创建订单数据
orders = pd.DataFrame({
    '订单ID': [101, 102, 103, 104, 105],
    '用户ID': [1, 2, 1, 3, 6],
    '商品': ['手机', '电脑', '耳机', '平板', '键盘'],
    '金额': [3999, 7999, 299, 2999, 199]
})

print("用户数据:")
print(users)
print("\\n订单数据:")
print(orders)
print("\\n" + "="*60 + "\\n")

# 内连接 - 只保留匹配的
print("内连接 (Inner Join):")
inner = pd.merge(users, orders, on='用户ID', how='inner')
print(inner)
print("\\n" + "="*60 + "\\n")

# 左连接 - 保留左边所有
print("左连接 (Left Join):")
left = pd.merge(users, orders, on='用户ID', how='left')
print(left)
print("\\n" + "="*60 + "\\n")

# 垂直合并
df1 = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})
df2 = pd.DataFrame({'A': [5, 6], 'B': [7, 8]})
print("垂直合并:")
print(pd.concat([df1, df2], ignore_index=True))`,
    explanation: '实际工作中数据经常分散在多个表中。本项目学习如何将不同数据源合并在一起，包括各种连接类型的使用场景。'
  },
  {
    id: 6,
    title: '时间序列分析',
    description: '处理日期时间数据，进行时间序列分析',
    difficulty: 'intermediate',
    icon: 'Calendar',
    objectives: [
      '日期时间处理',
      '时间索引',
      '重采样',
      '滑动窗口'
    ],
    code: `import pandas as pd
import numpy as np

# 创建时间序列数据
dates = pd.date_range('2024-01-01', periods=30, freq='D')
np.random.seed(42)
data = {
    '日期': dates,
    '销量': np.random.randint(100, 500, 30),
    '访客数': np.random.randint(500, 2000, 30)
}

df = pd.DataFrame(data)
print("原始数据(前5行):")
print(df.head())
print("\\n" + "="*60 + "\\n")

# 将日期设为索引
df = df.set_index('日期')

# 按周重采样
print("按周统计销量总和:")
weekly = df.resample('W')['销量'].sum()
print(weekly)
print("\\n" + "="*60 + "\\n")

# 按月聚合
print("按月统计:")
monthly = df.resample('M').agg({
    '销量': ['sum', 'mean'],
    '访客数': ['sum', 'mean']
})
print(monthly)
print("\\n" + "="*60 + "\\n")

# 滑动窗口
print("7天移动平均:")
df['销量_7MA'] = df['销量'].rolling(window=7).mean()
print(df[['销量', '销量_7MA']].tail(10))`,
    explanation: '时间序列分析在销售预测、趋势分析中非常重要。本项目学习日期处理、重采样和移动平均等常用时间序列技术。'
  },
  {
    id: 7,
    title: '数据可视化基础',
    description: '结合matplotlib绘制常用图表',
    difficulty: 'intermediate',
    icon: 'BarChart3',
    objectives: [
      '折线图',
      '柱状图',
      '散点图',
      '直方图'
    ],
    code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 创建数据
np.random.seed(42)
months = ['1月', '2月', '3月', '4月', '5月', '6月']
data = {
    '月份': months * 3,
    '产品': (['A']*6) + (['B']*6) + (['C']*6),
    '销量': np.concatenate([
        np.random.randint(100, 200, 6),
        np.random.randint(150, 250, 6),
        np.random.randint(80, 150, 6)
    ])
}

df = pd.DataFrame(data)
print("数据预览:")
print(df)
print("\\n" + "="*60 + "\\n")

# 汇总数据
pivot_df = df.pivot_table(values='销量', index='月份', columns='产品', aggfunc='sum')
pivot_df = pivot_df.reindex(months)

print("数据透视表:")
print(pivot_df)
print("\\n" + "="*60 + "\\n")

# 统计信息
print("各产品总销量:")
print(df.groupby('产品')['销量'].sum().sort_values(ascending=False))
print("\\n月均销量:")
print(df.groupby('月份')['销量'].mean())`,
    explanation: '可视化让数据更直观。本项目学习常用图表的绘制，注意：完整的图表渲染需要matplotlib环境，本示例展示数据准备和统计分析过程。'
  },
  {
    id: 8,
    title: '文本数据处理',
    description: '使用字符串方法和正则表达式处理文本',
    difficulty: 'advanced',
    icon: 'FileText',
    objectives: [
      '字符串方法',
      '正则表达式',
      '文本提取',
      '特征提取'
    ],
    code: `import pandas as pd
import re

# 创建文本数据
data = {
    '用户ID': [1, 2, 3, 4, 5, 6],
    '文本': [
        '张三 电话:13800138000 邮箱:zhangsan@example.com 北京',
        '李四 手机:13912345678 email:lisi@gmail.com 上海市浦东新区',
        '王五 Tel:15011112222 mail:wangwu@qq.com 广州天河',
        '赵六 联系:18688889999 zhaoliu@163.com 深圳南山',
        '钱七 13777778888 qianqi@outlook.com 杭州',
        '孙八 电话:13666666666 邮箱:sunba@example.com'
    ]
}

df = pd.DataFrame(data)
print("原始数据:")
print(df)
print("\\n" + "="*60 + "\\n")

# 提取手机号
df['手机号'] = df['文本'].str.extract(r'(1[3-9]\\d{9})')

# 提取邮箱
df['邮箱'] = df['文本'].str.extract(r'([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})')

# 提取姓名
df['姓名'] = df['文本'].str[:2]

print("提取后的数据:")
print(df[['用户ID', '姓名', '手机号', '邮箱']])
print("\\n" + "="*60 + "\\n")

# 文本长度统计
df['文本长度'] = df['文本'].str.len()
print("文本长度统计:")
print(df['文本长度'].describe())`,
    explanation: '文本数据处理在日志分析、信息提取中非常有用。本项目学习字符串方法和正则表达式，从非结构化文本中提取有用信息。'
  },
  {
    id: 9,
    title: '综合案例：电商数据分析',
    description: '完整的电商数据清洗、分析和报告流程',
    difficulty: 'advanced',
    icon: 'ShoppingCart',
    objectives: [
      '数据导入与清洗',
      '销售趋势分析',
      '用户行为分析',
      '综合报告'
    ],
    code: `import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# 模拟电商数据
np.random.seed(42)
dates = pd.date_range('2024-01-01', '2024-03-31', freq='H')
dates = dates[np.random.choice(len(dates), 2000, replace=False)]

categories = ['手机', '电脑', '平板', '耳机', '键盘', '鼠标', '显示器', '音箱']
products = {
    '手机': {'price': (3000, 8000), 'weight': 0.3},
    '电脑': {'price': (5000, 15000), 'weight': 0.25},
    '平板': {'price': (2000, 6000), 'weight': 0.15},
    '耳机': {'price': (100, 2000), 'weight': 0.1},
    '键盘': {'price': (50, 1000), 'weight': 0.08},
    '鼠标': {'price': (30, 500), 'weight': 0.07},
    '显示器': {'price': (800, 5000), 'weight': 0.03},
    '音箱': {'price': (100, 3000), 'weight': 0.02}
}

product_list = np.random.choice(categories, 2000, p=[p['weight'] for p in products.values()])
prices = [np.random.randint(products[p]['price'][0], products[p]['price'][1]) for p in product_list]
quantities = np.random.randint(1, 5, 2000)
user_ids = np.random.randint(1, 500, 2000)

df = pd.DataFrame({
    '订单时间': dates,
    '用户ID': user_ids,
    '产品类别': product_list,
    '单价': prices,
    '数量': quantities
})

df['订单金额'] = df['单价'] * df['数量']
df['订单日期'] = df['订单时间'].dt.date

print("电商订单数据 (前10行):")
print(df.head(10))
print("\\n" + "="*70 + "\\n")

print("数据概览:")
print(f"总订单数: {len(df)}")
print(f"总用户数: {df['用户ID'].nunique()}")
print(f"总销售额: {df['订单金额'].sum():,.2f} 元")
print("\\n" + "="*70 + "\\n")

print("各类别销售统计:")
category_stats = df.groupby('产品类别').agg({
    '订单金额': ['sum', 'mean'],
    '数量': 'sum',
    '用户ID': 'nunique'
}).round(2)
category_stats.columns = ['总销售额', '平均客单价', '总销量', '购买用户数']
print(category_stats.sort_values('总销售额', ascending=False))`,
    explanation: '本项目是一个完整的电商数据分析案例，涵盖数据生成、清洗、探索性分析、销售统计等完整流程，是对前面所学知识的综合应用。'
  },
  {
    id: 10,
    title: '综合案例：用户行为分析',
    description: '深入分析用户行为模式，构建用户画像',
    difficulty: 'advanced',
    icon: 'Users',
    objectives: [
      '用户分层',
      '行为路径分析',
      'RFM模型',
      '用户画像'
    ],
    code: `import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# 模拟用户行为数据
np.random.seed(42)
user_count = 500

# 用户基础数据
users = pd.DataFrame({
    '用户ID': range(1, user_count + 1),
    '注册日期': pd.date_range('2023-01-01', '2024-03-31', periods=user_count),
    '渠道': np.random.choice(['APP', '小程序', 'H5', 'WEB'], user_count, p=[0.4, 0.3, 0.2, 0.1])
})

# 行为数据
behavior_types = ['浏览', '搜索', '加购', '收藏', '下单', '支付']
behavior_weights = [0.4, 0.2, 0.15, 0.1, 0.1, 0.05]
behavior_records = []

for user_id in range(1, user_count + 1):
    num_behaviors = np.random.randint(5, 100)
    user_dates = pd.date_range(users.loc[user_id-1, '注册日期'], '2024-04-15', periods=num_behaviors)
    for i in range(num_behaviors):
        behavior_records.append({
            '用户ID': user_id,
            '行为时间': user_dates[i],
            '行为类型': np.random.choice(behavior_types, p=behavior_weights)
        })

behaviors = pd.DataFrame(behavior_records)
behaviors = behaviors.sort_values('行为时间').reset_index(drop=True)

print("用户数据样本:")
print(users.head())
print("\\n行为数据样本:")
print(behaviors.head(10))
print("\\n" + "="*70 + "\\n")

# 用户行为统计
user_stats = behaviors.groupby('用户ID').agg({
    '行为时间': ['min', 'max', 'count'],
    '行为类型': lambda x: x.value_counts().to_dict()
}).round(2)
user_stats.columns = ['首次行为', '最近行为', '行为次数', '行为分布']
user_stats = user_stats.merge(users, on='用户ID')

# 计算活跃度
cutoff_date = datetime(2024, 4, 15)
user_stats['活跃天数'] = (user_stats['最近行为'] - user_stats['首次行为']).dt.days + 1
user_stats['日均行为数'] = user_stats['行为次数'] / user_stats['活跃天数']
user_stats['距今天数'] = (cutoff_date - user_stats['最近行为']).dt.days

print("用户行为统计 (前10名):")
print(user_stats[['用户ID', '渠道', '行为次数', '活跃天数', '日均行为数', '距今天数']].head(10))
print("\\n" + "="*70 + "\\n")

print("各行为类型总数:")
print(behaviors['行为类型'].value_counts())
print("\\n渠道分布:")
print(users['渠道'].value_counts())`,
    explanation: '用户行为分析是互联网产品的核心。本项目通过RFM模型、用户分层等方法，帮助你从海量行为数据中洞察用户，为精细化运营提供数据支持。'
  }
];
