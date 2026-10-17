@echo off
rem Crea grapescript.exe (l'interprete) e destems.exe (il lanciatore), poi l'installer.
rem Va tenuto nella cartella del progetto, accanto a Grapescript.py e GrapeScript.iss
cd /d "%~dp0"

rem --- cerca il compilatore di Inno Setup (versione 6 o 7) ---
set "ISCC="
for %%P in (
    "%ProgramFiles%\Inno Setup 7\ISCC.exe"
    "%ProgramFiles(x86)%\Inno Setup 7\ISCC.exe"
    "%LOCALAPPDATA%\Programs\Inno Setup 7\ISCC.exe"
    "%ProgramFiles%\Inno Setup 6\ISCC.exe"
    "%ProgramFiles(x86)%\Inno Setup 6\ISCC.exe"
    "%LOCALAPPDATA%\Programs\Inno Setup 6\ISCC.exe"
) do if not defined ISCC if exist %%P set "ISCC=%%~P"
if not defined ISCC (
    echo Non trovo ISCC.exe: Inno Setup e' installato?
    goto errore
)

if not exist "Grapescript.py" (
    echo Non trovo Grapescript.py in %CD%
    goto errore
)
if not exist "destems.py" (
    echo Non trovo destems.py in %CD%
    goto errore
)
if not exist "GrapeScript.iss" (
    echo Non trovo GrapeScript.iss in %CD%
    goto errore
)
rem --- legge VERSIONE da Grapescript.py ---
for /f "delims=" %%V in ('python -c "import Grapescript; print(Grapescript.VERSIONE)"') do set "VER=%%V"
if not defined VER (
    echo Non riesco a leggere VERSIONE da Grapescript.py
    goto errore
)
echo === Versione %VER% ===

echo === Creo grapescript.exe (l'interprete) ===
python crea_versione.py grapescript "Interprete di GrapeScript" || goto errore
python -m PyInstaller --onefile --name grapescript --version-file versione_grapescript.txt --clean --noconfirm Grapescript.py || goto errore

echo === Creo destems.exe (il lanciatore) ===
python crea_versione.py destems "Lanciatore di GrapeScript" || goto errore
python -m PyInstaller --onefile --name destems --version-file versione_destems.txt --clean --noconfirm destems.py || goto errore
if exist Output rmdir /s /q Output

echo === Creo l'installer con "%ISCC%" ===
"%ISCC%" /DMyAppVersion=%VER% "GrapeScript.iss" || goto errore

rem --- pulizia dei file temporanei ---
if exist build rmdir /s /q build
if exist grapescript.spec del grapescript.spec
if exist destems.spec del destems.spec
del versione_*.txt
echo.
echo Fatto! L'installer e' in Output\
pause
exit /b

:errore
echo.
echo Qualcosa e' andato storto, leggi i messaggi sopra.
pause
exit /b 1
