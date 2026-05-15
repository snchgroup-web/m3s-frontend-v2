with open('src/Finance.js', 'r') as f:
    content = f.read()

import re

start_tag = '        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">'
end_tag = '        </div>\n\n        <div className="flex gap-4 mb-6 border-b border-slate-700">'

if start_tag in content and end_tag in content:
    start_idx = content.find(start_tag)
    end_idx = content.find(end_tag)
    
    new_kpis = '''        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-green-500/10 hover:border-green-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-xs font-medium">{t.totalRecettes}</p>
              <TrendingUp size={16} className="text-green-400 group-hover:animate-pulse" />
            </div>
            <p className="text-lg font-bold text-white leading-tight group-hover:text-green-400 transition-colors">{formatDualCurrency(totalRecettes).chf} <span className="text-xs font-normal text-slate-400">CHF</span></p>
            <p className="text-lg font-bold text-white leading-tight group-hover:text-green-400 transition-colors mt-0.5">{formatDualCurrency(totalRecettes).cfa} <span className="text-xs font-normal text-slate-400">CFA</span></p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-red-500/10 hover:border-red-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-xs font-medium">{t.totalDepenses}</p>
              <TrendingDown size={16} className="text-red-400 group-hover:animate-pulse" />
            </div>
            <p className="text-lg font-bold text-white leading-tight group-hover:text-red-400 transition-colors">{formatDualCurrency(totalDepenses).chf} <span className="text-xs font-normal text-slate-400">CHF</span></p>
            <p className="text-lg font-bold text-white leading-tight group-hover:text-red-400 transition-colors mt-0.5">{formatDualCurrency(totalDepenses).cfa} <span className="text-xs font-normal text-slate-400">CFA</span></p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-xs font-medium">{t.soldeNet}</p>
              <DollarSign size={16} className={solde >= 0 ? 'text-blue-400 group-hover:animate-pulse' : 'text-orange-400 group-hover:animate-pulse'} />
            </div>
            <p className="text-lg font-bold text-white leading-tight group-hover:text-blue-400 transition-colors">{formatDualCurrency(solde).chf} <span className="text-xs font-normal text-slate-400">CHF</span></p>
            <p className="text-lg font-bold text-white leading-tight group-hover:text-blue-400 transition-colors mt-0.5">{formatDualCurrency(solde).cfa} <span className="text-xs font-normal text-slate-400">CFA</span></p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-purple-500/10 hover:border-purple-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-xs font-medium">{t.tauxFX}</p>
              <ArrowRightLeft size={16} className="text-purple-400 group-hover:animate-pulse" />
            </div>
            <p className="text-lg font-bold text-white leading-tight group-hover:text-purple-400 transition-colors">1 <span className="text-xs font-normal text-slate-400">CHF</span></p>
            <p className="text-lg font-bold text-white leading-tight group-hover:text-purple-400 transition-colors mt-0.5">656 <span className="text-xs font-normal text-slate-400">CFA</span></p>
          </div>\n'''
    
    content = content[:start_idx] + new_kpis + content[end_idx:]
    with open('src/Finance.js', 'w') as f:
        f.write(content)
else:
    print("Tags not found")

