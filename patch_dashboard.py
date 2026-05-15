with open('src/Dashboard.js', 'r') as f:
    content = f.read()

colors = {
    'revenue': 'green',
    'expenses': 'red',
    'balance': 'blue',
    'donations': 'amber',
    'financing': 'cyan'
}

for key, color in colors.items():
    old = f'<p className="text-xs text-slate-500 mt-0.5">{{formatDualCurrency(dashboardData?.moduleStats.finance.{key}).cfa}} CFA</p>'
    new = f'<p className="text-lg font-bold text-white leading-tight group-hover:text-{color}-400 transition-colors mt-0.5">{{formatDualCurrency(dashboardData?.moduleStats.finance.{key}).cfa}} <span className="text-xs font-normal text-slate-400">CFA</span></p>'
    content = content.replace(old, new)

with open('src/Dashboard.js', 'w') as f:
    f.write(content)

