; Installer di GrapeScript, da compilare con Inno Setup (https://jrsoftware.org/isinfo.php)
; Mettere questo file nella cartella del progetto, accanto a Grapescript.py, "dist" ed "esempi".
; Si compila da solo con crea_release.cmd

#define MyAppName "GrapeScript"
#define MyAppVersion "0.1.0"

[Setup]
; Identificativo unico dell'app: in Inno Setup puoi generarne uno nuovo da Tools > Generate GUID
AppId={{6B1E3F2A-9C4D-4E7B-8A51-2F0D9C3E7A14}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher=GrapeScript
; Con PrivilegesRequired=lowest non servono permessi di amministratore:
; {autopf} diventa C:\Users\<nome>\AppData\Local\Programs
DefaultDirName={autopf}\GrapeScript
PrivilegesRequired=lowest
DisableProgramGroupPage=yes
OutputDir=Output
OutputBaseFilename=GrapeScript-{#MyAppVersion}-setup
Compression=lzma
SolidCompression=yes
; avvisa Windows che il PATH è cambiato, così i nuovi terminali lo vedono subito
ChangesEnvironment=yes
; SetupIconFile=uva.ico

[Languages]
Name: "italian"; MessagesFile: "compiler:Languages\Italian.isl"

[Files]
; grapescript.exe = l'interprete, destems.exe = il lanciatore che lo chiama
Source: "dist\destems.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "dist\grapescript.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "esempi\*"; DestDir: "{app}\esempi"; Flags: ignoreversion recursesubdirs createallsubdirs skipifsourcedoesntexist
Source: "README.md"; DestDir: "{app}"; Flags: ignoreversion skipifsourcedoesntexist
Source: "LICENSE"; DestDir: "{app}"; Flags: ignoreversion skipifsourcedoesntexist

[Icons]
; collegamento nel menu Start: apre la console di GrapeScript
Name: "{autoprograms}\GrapeScript Console"; Filename: "{app}\grapescript.exe"; WorkingDir: "{userdocs}"

[Registry]
; aggiunge la cartella di installazione al PATH dell'utente (solo se non c'è già)
Root: HKCU; Subkey: "Environment"; ValueType: expandsz; ValueName: "Path"; ValueData: "{olddata};{app}"; Check: NeedsAddPath(ExpandConstant('{app}'))

[Code]
// true se la cartella non è ancora nel PATH dell'utente
function NeedsAddPath(Param: string): Boolean;
var
  OrigPath: string;
begin
  if not RegQueryStringValue(HKEY_CURRENT_USER, 'Environment', 'Path', OrigPath) then
  begin
    Result := True;
    exit;
  end;
  Result := Pos(';' + Uppercase(Param) + ';', ';' + Uppercase(OrigPath) + ';') = 0;
end;

// alla disinstallazione toglie la cartella dal PATH
procedure CurUninstallStepChanged(CurUninstallStep: TUninstallStep);
var
  Path, AppDir: string;
  P: Integer;
begin
  if CurUninstallStep = usPostUninstall then
  begin
    if RegQueryStringValue(HKEY_CURRENT_USER, 'Environment', 'Path', Path) then
    begin
      AppDir := ExpandConstant('{app}');
      P := Pos(';' + Uppercase(AppDir), Uppercase(Path));
      if P > 0 then
      begin
        Delete(Path, P, Length(AppDir) + 1);
        RegWriteExpandStringValue(HKEY_CURRENT_USER, 'Environment', 'Path', Path);
      end;
    end;
  end;
end;
