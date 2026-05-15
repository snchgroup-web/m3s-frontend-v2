with open('src/Finance.js', 'r') as f:
    content = f.read()

import re

old_kpis = r'''        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-4 border border-green-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-xs">\{t\.totalRecettes\}</p>
                <div className="text-sm font-bold mt-1 leading-tight">
                  <p className="text-white">\{formatDualCurrency\(totalRecettes\)\.chf\} CHF</p>
                  <p className="text-white">\{formatDualCurrency\(totalRecettes\)\.cfa\} CFA</p>
                </div>
              </div>
              <TrendingUp size=\{24\} className="text-green-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-lg p-4 border border-red-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-200 text-xs">\{t\.totalDepenses\}</p>
                <div className="text-xs font-bold mt-1 leading-tight">
                  <p className="text-white">\{formatDualCurrency\(totalDepenses\)\.chf\} CHF</p>
                  <p className="text-white">\{formatDualCurrency\(totalDepenses\)\.cfa\} CFA</p>
                </div>
              </div>
              <TrendingDown size=\{24\} className="text-red-400" />
            </div>
          </div>

          <div className=\{`bg-gradient-to-br \$\{solde >= 0 \? 'from-blue-900 to-blue-800' : 'from-orange-900 to-orange-800'\} rounded-lg p-4 border \$\{solde >= 0 \? 'border-blue-700' : 'border-orange-700'\}`\}>
            <div className="flex items-center justify-between">
              <div>
                <p className=\{`\$\{solde >= 0 \? 'text-blue-200' : 'text-orange-200'\} text-xs`\}>\{t\.soldeNet\}</p>
                <div className="text-xs font-bold mt-1 leading-tight">
                  <p className="text-white">\{formatDualCurrency\(solde\)\.chf\} CHF</p>
                  <p className="text-white">\{formatDualCurrency\(solde\)\.cfa\} CFA</p>
                </div>
              </div>
              <DollarSign size=\{24\} className=\{solde >= 0 \? 'text-blue-400' : 'text-orange-400'\} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-4 border border-purple-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-xs">\{t\.tauxFX\}</p>
                <p className="text-white text-lg font-bold">656 CFA</p>
              </div>
              <ArrowRightLeft size=\{24\} className="text-purple-400" />
            </div>
          </div>
        </div>'''

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
          </div>
        </div>'''

content = re.sub(old_kpis, new_kpis, content)

with open('src/Finance.js', 'w') as f:
    f.write(content)

