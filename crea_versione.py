# Crea il file con le informazioni di versione per PyInstaller
# (quelle che Windows mostra in Proprieta' -> Dettagli dell'exe).
# Uso:  python crea_versione.py <nome> "<descrizione>"
# La versione viene letta da VERSIONE in Grapescript.py

import sys
from Grapescript import VERSIONE

nome = sys.argv[1]
descrizione = sys.argv[2]

# "0.2.0" -> (0, 2, 0, 0): Windows vuole sempre 4 numeri
numeri = [int(n) for n in VERSIONE.split('.')]
numeri = tuple((numeri + [0, 0, 0, 0])[:4])

testo = f"""VSVersionInfo(
  ffi=FixedFileInfo(
    filevers={numeri},
    prodvers={numeri},
    mask=0x3f, flags=0x0, OS=0x40004, fileType=0x1, subtype=0x0, date=(0, 0)),
  kids=[
    StringFileInfo([StringTable('041004B0', [
      StringStruct('CompanyName', 'GrapeScript'),
      StringStruct('FileDescription', '{descrizione}'),
      StringStruct('FileVersion', '{VERSIONE}'),
      StringStruct('InternalName', '{nome}'),
      StringStruct('OriginalFilename', '{nome}.exe'),
      StringStruct('ProductName', 'GrapeScript'),
      StringStruct('ProductVersion', '{VERSIONE}')])]),
    VarFileInfo([VarStruct('Translation', [1040, 1200])])
  ]
)
"""
with open(f"versione_{nome}.txt", "w", encoding="utf-8") as f:
    f.write(testo)
print(f"Creato versione_{nome}.txt (versione {VERSIONE})")