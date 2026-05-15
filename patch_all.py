import os
import re

files = ['src/Actifs.js', 'src/CRM.js', 'src/Production.js', 'src/RH.js', 'src/GED.js', 'src/Administration.js']

for file in files:
    if not os.path.exists(file):
        continue
        
    with open(file, 'r') as f:
        content = f.read()

    # Find the KPIs block
    # It usually starts with {/* KPIs */} or similar
    # we can just find <div className="grid grid-cols-1 md:grid-cols-
    
    # We want to replace <div className="bg-gradient-to-br from-COLOR-900 to-COLOR-800 rounded-lg p-6 border border-COLOR-700">
    # with <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-COLOR-500/10 hover:border-COLOR-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
    
    def replacer(match):
        color = match.group(1)
        inner = match.group(2)
        
        # Now we parse the inner content
        # It looks like:
        # <div className="flex items-center justify-between">
        #   <div>
        #     <p className="text-COLOR-200 text-sm">{title}</p>
        #     <p className="text-white text-2xl font-bold">{value}</p>
        #   </div>
        #   <Icon size={32} className="text-COLOR-400" />
        # </div>
        
        inner_pattern = r'<div className="flex items-center justify-between">\s*<div>\s*<p className="text-[a-z]+-200 text-(?:sm|xs)">(.*?)</p>\s*<p className="text-white text-(?:2xl|xl|lg|sm) font-bold">(.*?)</p>\s*</div>\s*<([A-Za-z0-9]+) size=\{[0-9]+\} className="text-[a-z]+-400"\s*/>\s*</div>'
        m = re.search(inner_pattern, inner)
        if m:
            title = m.group(1)
            value = m.group(2)
            icon = m.group(3)
            
            # Since some values might have `CHF` or `CFA` in them or need to be dual currency...
            # Wait, Actifs.js uses `totalValeur.toLocaleString()`, CRM uses `totalDons.toLocaleString()`.
            # I can just render the value, but if the user wanted dual currencies on ALL pages?
            # "et applique ce style d'indicateurs sur toutes les pages avec indicateurs"
            # It just says "applique ce style d'indicateurs".
            
            new_card = f'''<div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-{color}-500/10 hover:border-{color}-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-xs font-medium">{title}</p>
              <{icon} size={{16}} className="text-{color}-400 group-hover:animate-pulse" />
            </div>
            <p className="text-lg font-bold text-white leading-tight group-hover:text-{color}-400 transition-colors">{value}</p>
          </div>'''
            return new_card
        
        # If it doesn't match the simple pattern (e.g. soldeNet with dual currency in Finance)
        return match.group(0)

    # find div bg-gradient
    pattern = r'<div className="bg-gradient-to-br from-([a-z]+)-900 to-\1-800 rounded-lg p-6 border border-\1-700">\s*(.*?)\s*</div>'
    # Use non-greedy for inner
    pattern = r'<div className="bg-gradient-to-br from-([a-z]+)-900 to-\1-800 rounded-lg p-[46] border border-\1-700">([\s\S]*?)</div>\s*(?=</div|<div className="bg-gradient)'
    # Actually matching nested divs with regex is hard. Let's do it manually or simply.

