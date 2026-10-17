# destems: il lanciatore di GrapeScript.
# Non interpreta niente da solo: trova grapescript.exe (l'interprete)
# nella sua stessa cartella e gli passa tutti gli argomenti.
#   destems file.gs   ->  grapescript.exe file.gs
#   destems           ->  grapescript.exe  (console)

import os
import signal
import subprocess
import sys

ROSSO = "\033[91m"
RESET = "\033[0m"


def comando_interprete():
    # cartella in cui si trova destems (l'exe, oppure questo file .py)
    if getattr(sys, 'frozen', False):
        cartella = os.path.dirname(sys.executable)
    else:
        cartella = os.path.dirname(os.path.abspath(__file__))

    exe = os.path.join(cartella, 'grapescript.exe')
    if os.path.exists(exe):
        return [exe]

    # durante lo sviluppo non c'è l'exe: usa direttamente Grapescript.py
    script = os.path.join(cartella, 'Grapescript.py')
    if os.path.exists(script) and not getattr(sys, 'frozen', False):
        return [sys.executable, script]

    return None


def main():
    os.system("")   # attiva i colori nel terminale di Windows
    comando = comando_interprete()
    if comando is None:
        print(f"{ROSSO}Errore: non trovo grapescript.exe accanto a destems. "
              f"Prova a reinstallare GrapeScript.{RESET}", file=sys.stderr)
        sys.exit(1)

    # Ctrl+C lo gestisce l'interprete: il lanciatore non fa niente e aspetta.
    # (non uso SIG_IGN perché verrebbe ereditato dall'interprete,
    #  che così non si potrebbe più fermare con Ctrl+C)
    signal.signal(signal.SIGINT, lambda segnale, frame: None)
    risultato = subprocess.call(comando + sys.argv[1:])
    sys.exit(risultato)   # restituisce lo stesso codice d'uscita dell'interprete


if __name__ == "__main__":
    main()
