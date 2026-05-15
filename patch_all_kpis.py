import re
import os

files = ['src/Actifs.js', 'src/CRM.js', 'src/Production.js', 'src/RH.js', 'src/GED.js', 'src/Administration.js']

for filepath in files:
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r') as f:
        content = f.read()

    # Pattern for single value KPI
    # <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 border border-blue-700">
    #   <div className="flex items-center justify-between">
    #     <div>
    #       <p className="text-blue-200 text-sm">{t.valueBrute}</p>
    #       <p className="text-white text-2xl font-bold">{totalValeur.toLocaleString()}</p>
    #     </div>
    #     <Building2 size={32} className="text-blue-400" />
    #   </div>
    # </div>
    
    def replacer(m):
        color = m.group(1)
        inner = m.group(2)
        
        # Extract title
        title_m = re.search(r'<p className="text-[a-z]+-200 text-(?:sm|xs)">([^<]+)</p>', inner)
        title = title_m.group(1) if title_m else ""
        
        # Extract value
        val_m = re.search(r'<p className="text-white text-(?:2xl|xl|lg|sm) font-bold">([^<]+)</p>', inner)
        value = val_m.group(1) if val_m else ""
        
        # Extract icon
        icon_m = re.search(r'<([A-Za-z0-9]+) size=\{[0-9]+\} className="text-[a-z]+-400"(?: /)?>', inner)
        if not icon_m:
            icon_m = re.search(r'<([A-Za-z0-9]+) className="text-[a-z]+-400" size=\{[0-9]+\}(?: /)?>', inner)
        
        icon = icon_m.group(1) if icon_m else "Activity"
        
        new_card = f'''<div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-{color}-500/10 hover:border-{color}-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-xs font-medium">{title}</p>
              <{icon} size={{16}} className="text-{color}-400 group-hover:animate-pulse" />
            </div>
            <p className="text-lg font-bold text-white leading-tight group-hover:text-{color}-400 transition-colors">{value}</p>
          </div>'''
        return new_card

    # It's tricky to match the closing </div> of the outer div. We can match up to the icon div and closing tags.
    pattern = r'<div className="bg-gradient-to-br from-([a-z]+)-900 to-\1-800 rounded-lg p-[46] border border-\1-700">\s*<div className="flex items-center justify-between">\s*<div>\s*<p className="text-[a-z]+-200 text-(?:sm|xs)">[^<]+</p>\s*<p className="text-white text-(?:2xl|xl|lg|sm) font-bold">[^<]+</p>\s*</div>\s*<[A-Za-z0-9]+ size=\{[0-9]+\} className="text-[a-z]+-400" />\s*</div>\s*</div>'
    
    # We can capture the whole block
    pattern_capture = r'<div className="bg-gradient-to-br from-([a-z]+)-900 to-\1-800 rounded-lg p-[46] border border-\1-700">([\s\S]*?</div>\s*</div>\s*</div>)'
    
    # Let's use a simpler approach. Just match the whole block since it's 8-9 lines.
    regex = re.compile(r'<div className="bg-gradient-to-br from-([a-z]+)-900 to-\1-800 rounded-lg p-[46] border border-\1-700">\s*<div className="flex items-center justify-between">\s*<div>\s*<p className="text-\1-200 text-(?:sm|xs)">([^<]+)</p>\s*<p className="text-white text-(?:2xl|xl|lg|sm) font-bold">([^<]+)</p>\s*</div>\s*<([A-Za-z0-9]+) size=\{[0-9]+\} className="text-\1-400"\s*/>\s*</div>\s*</div>')
    
    def simple_replacer(m):
        color = m.group(1)
        title = m.group(2)
        value = m.group(3)
        icon = m.group(4)
        
        # Dual currency hack for CRM totalDons if needed?
        # User asked for "mets les montants en CFA meme style que en CHF... applique ce style d'indicateurs sur toutes les pages"
        # CRM has {totalDons.toLocaleString()}, maybe it should be CHF and CFA?
        # Let's add CFA dual display to CRM totalDons if title is t.totalDons or similar
        # Wait, if we don't have formatDualCurrency in those files, it would crash!
        # Let's just output the standard modern card.
        
        return f'''<div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-lg hover:shadow-{color}-500/10 hover:border-{color}-500/40 hover:-translate-y-1 transition-all duration-300 cursor-default group">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-xs font-medium">{title}</p>
              <{icon} size={{16}} className="text-{color}-400 group-hover:animate-pulse" />
            </div>
            <p className="text-lg font-bold text-white leading-tight group-hover:text-{color}-400 transition-colors">{value}</p>
          </div>'''
          
    new_content = regex.sub(simple_replacer, content)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Patched {filepath}")

