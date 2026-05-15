import re

with open('src/Header.js', 'r') as f:
    content = f.read()

# Replace the info elements section
old_info = r'''        \{\/\* Centre - Dakar, Date \+ Taux, Zurich \*\/\}
        <div className="flex items-center space-x-4 text-xs flex-shrink-0">
          \{\/\* SENEGAL - Dakar \*\/\}
          <div className="flex items-center space-x-2 bg-slate-700/50 rounded px-3 py-2">
            <span className="text-2xl">🇸🇳</span>
            <div>
              <p className="text-slate-300 font-semibold">\{t\.dakar\}</p>
              <p className="text-slate-400">\{dakarTime\}</p>
            </div>
          </div>

          \{\/\* Météo Dakar \*\/\}
          <div className="flex items-center space-x-1 bg-slate-700/50 rounded px-3 py-2">
            <Sun size=\{16\} className="text-yellow-400" />
            <div>
              <p className="text-slate-300 font-semibold">28°C</p>
              <p className="text-slate-400">\{t\.sunny\}</p>
            </div>
          </div>

          \{\/\* Séparateur \*\/\}
          <div className="w-px h-8 bg-slate-600"></div>

          \{\/\* Date et Taux de Change - Centre \*\/\}
          <div className="flex flex-col items-center space-y-1">
            <div className="text-slate-300 font-semibold">\{dateFormatted\}</div>
            <div className="bg-blue-600/30 rounded px-3 py-1 border border-blue-500/50">
              <p className="text-blue-300 font-bold text-xs">\{t\.exchangeRate\}</p>
            </div>
          </div>

          \{\/\* Séparateur \*\/\}
          <div className="w-px h-8 bg-slate-600"></div>

          \{\/\* Météo Zurich \*\/\}
          <div className="flex items-center space-x-1 bg-slate-700/50 rounded px-3 py-2">
            <Cloud size=\{16\} className="text-slate-300" />
            <div>
              <p className="text-slate-300 font-semibold">18°C</p>
              <p className="text-slate-400">\{t\.cloudy\}</p>
            </div>
          </div>

          \{\/\* SUISSE - Zurich \*\/\}
          <div className="flex items-center space-x-2 bg-slate-700/50 rounded px-3 py-2">
            <span className="text-2xl">🇨🇭</span>
            <div>
              <p className="text-slate-300 font-semibold">\{t\.zurich\}</p>
              <p className="text-slate-400">\{zurichTime\}</p>
            </div>
          </div>
        </div>'''

new_info = '''        {/* Centre - Dakar, Date + Taux, Zurich - Épuré */}
        <div className="flex items-center space-x-6 text-xs flex-shrink-0">
          {/* Logo 2SG */}
          <div className="flex items-center justify-center mr-2">
            <img src="/assets/LOGO_BLANC_3_Vers_Epuree_Slogan.png" alt="2SG" className="h-10 object-contain" />
          </div>
          
          {/* SENEGAL - Dakar */}
          <div className="flex items-center space-x-3">
            <img src="/assets/Drapeau_Flottant_SN.gif" alt="Sénégal" className="w-8 h-6 object-cover rounded shadow-sm" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-slate-300 font-medium tracking-wide">{t.dakar}</span>
                <span className="text-slate-400 font-light">{dakarTime}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                <Sun size={12} className="text-yellow-500" />
                <span>28°C {t.sunny}</span>
              </div>
            </div>
          </div>

          {/* Séparateur */}
          <div className="w-px h-8 bg-slate-700/50"></div>

          {/* Date et Taux de Change - Centre */}
          <div className="flex flex-col items-center">
            <span className="text-slate-300 font-medium tracking-wide mb-1">{dateFormatted}</span>
            <span className="text-blue-400/90 font-medium text-[10px] tracking-wider px-2 py-0.5 rounded-full border border-blue-500/20 bg-blue-500/5">{t.exchangeRate}</span>
          </div>

          {/* Séparateur */}
          <div className="w-px h-8 bg-slate-700/50"></div>

          {/* SUISSE - Zurich */}
          <div className="flex items-center space-x-3">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-light">{zurichTime}</span>
                <span className="text-slate-300 font-medium tracking-wide">{t.zurich}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                <span>18°C {t.cloudy}</span>
                <Cloud size={12} className="text-slate-400" />
              </div>
            </div>
            <img src="/assets/Drapeau_Flottant_CH.jpg" alt="Suisse" className="w-8 h-6 object-cover rounded shadow-sm" />
          </div>
        </div>'''

content = re.sub(old_info, new_info, content, flags=re.DOTALL)

old_right = r'''          \{\/\* Sélecteur de Langue \*\/\}
          <div className="flex items-center gap-2">
            <Globe size=\{18\} className="text-slate-400" />
            <select
              value=\{language\}
              onChange=\{\(e\) => setLanguage\(e\.target\.value\)\}
              className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs text-slate-300 hover:bg-slate-600 focus:outline-none focus:border-blue-500"
            >
              <option value="FR">FR</option>
              <option value="EN">EN</option>
              <option value="DE">DE</option>
            </select>
          </div>'''

new_right = '''          {/* Sélecteur de Thème */}
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-1.5 rounded-full hover:bg-slate-700/50 text-slate-400 hover:text-slate-300 transition-colors border border-transparent hover:border-slate-600"
            title="Basculer le thème"
          >
            {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Sélecteur de Langue */}
          <div className="flex items-center gap-2">
            <Globe size={18} className="text-slate-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent border border-slate-600/50 rounded px-2 py-1 text-xs text-slate-300 hover:bg-slate-800 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer appearance-none pr-4"
            >
              <option value="FR">FR</option>
              <option value="EN">EN</option>
              <option value="DE">DE</option>
            </select>
          </div>'''

content = re.sub(old_right, new_right, content, flags=re.DOTALL)

# Add theme state and Moon import
content = content.replace("import { Cloud, Sun, LayoutDashboard, Globe } from 'lucide-react';", "import { Cloud, Sun, Moon, LayoutDashboard, Globe } from 'lucide-react';")
content = content.replace("const [userRole, setUserRole] = useState('');", "const [userRole, setUserRole] = useState('');\n  const [theme, setTheme] = useState('dark');")


with open('src/Header.js', 'w') as f:
    f.write(content)

