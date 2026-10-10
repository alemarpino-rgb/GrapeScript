import sys
import random
import os

ROSSO = "\033[91m"
RESET = "\033[0m"
os.system("")   # attiva i colori nel terminale di Windows

sys.set_int_max_str_digits(0)   # 0 = nessun limite di digits

def tokenizza(codice):
    tokens = []
    i = 0
    lun = len(codice)
    while i < lun:
        c = codice[i]
        
        if c == '@':
            i += 1
            while i < lun and codice[i] not in '\n@':
                i += 1
            if i < lun and codice[i] == '@':
                i += 1   # salta la @ di chiusura

        elif c == '\n':
            tokens.append(['A_CAPO', '\n'])
            i += 1
        elif c in ' \t':
            i += 1
        elif c.isalpha():
            parola = ''
            while i < lun and (codice[i].isalnum() or codice[i] == '_'):
                parola += codice[i]
                i += 1
            if parola == 'print':
                tokens.append(['STAMPA', parola])
            elif parola== 'if':
                tokens.append(['IF', parola])
            elif parola== 'loop':
                tokens.append(['LOOP', parola])
            elif parola== 'repeat':
                tokens.append(['REPEAT', parola])
            elif parola== 'break':
                tokens.append(['BREAK', parola])
            elif parola== 'randint':
                tokens.append(['RANDINT', parola])
            elif parola== 'input':
                tokens.append(['INPUT', parola])
            elif parola == 'else':
                tokens.append(['ELSE', parola])
            elif parola == 'elif':
                tokens.append(['ELIF', parola])
            else:
                tokens.append(['NOME_VAR', parola])
        elif c.isdigit():
            numstr = ''
            while i < lun and codice[i].isdigit():
                numstr += codice[i]
                i += 1
            try:
                numstr=int(numstr)
            except ValueError:
                raise SyntaxError("Numero non valido")
            
            tokens.append(['NUMERO', numstr])
        elif c in '\'"':
            delim = c
            i += 1
            testo = ''
            while i < lun and codice[i] != delim:
                testo += codice[i]
                i += 1
            if i >= lun:
                raise SyntaxError("Stringa non chiusa")
            i += 1  # salta la virgoletta di chiusura
            tokens.append(['TESTO', testo])
        elif codice[i:i+2] == '->':
            tokens.append(['FRECCIA', '->'])
            i += 2
        elif codice[i:i+2] == '==':
            tokens.append(['COMPARAZIONE_UGUALE', '=='])
            i += 2
        elif codice[i:i+2] == '<=':
            tokens.append(['COMPARAZIONE_MINORE_UGUALE', '<='])
            i += 2
        elif codice[i:i+2] == '>=':
            tokens.append(['COMPARAZIONE_MAGGIORE_UGUALE', '>='])
            i += 2
        elif codice[i:i+2] == '%%':
            tokens.append(['COMPARAZIONE_DIVISIBILE', '%%'])
            i += 2
        elif codice[i] == '<':
            tokens.append(['COMPARAZIONE_MINORE', '<'])
            i += 1
        elif codice[i] == '>':
            tokens.append(['COMPARAZIONE_MAGGIORE', '>'])
            i += 1
        elif c == '=':
            tokens.append(['UGUALE', '='])
            i += 1
        elif c == '+':
            tokens.append(['PIU', '+'])
            i += 1
        elif c == '-':
            tokens.append(['MENO', '-'])
            i += 1
        elif c == '*':
            tokens.append(['PER', '*'])
            i += 1
        elif c == '/':
            tokens.append(['DIVISO', '/'])
            i += 1
        elif c == '{':
            tokens.append(['APRI_GRAFFA', '{'])
            i += 1
        elif c == '}':
            tokens.append(['CHIUDI_GRAFFA', '}'])
            i += 1
        elif c == '(':
            tokens.append(['APRI_TONDA', '('])
            i += 1
        elif c == ')':
            tokens.append(['CHIUDI_TONDA', ')'])
            i += 1
        elif c == ',':
            tokens.append(['VIRGOLA', ','])
            i += 1
                
        else:
            raise SyntaxError(f"Carattere non riconosciuto: {c!r}")

    return tokens

# Tipi disponibili per le conversioni con ->
# Per aggiungerne uno nuovo basta una riga qui
CONVERSIONI = {
    'int': int,
    'float': float,
    'str': str,
}

class CastNode:
    def __init__(self, valore, tipo):
        self.valore = valore
        self.tipo = tipo
class AssignNode:
    def __init__(self, nome_var, valore_var):
        self.nome_var=nome_var
        self.valore_var=valore_var

class VarNode:
    def __init__(self, nome_var):
        self.nome_var = nome_var

class PrintNode:
    def __init__(self, da_stampare):
        self.da_stampare = da_stampare

class InputNode:
    def __init__(self, da_stampare):
        self.da_stampare = da_stampare

class ProgramNode:
    def __init__(self, instructions):
        self.instructions = instructions

class NumberNode:
    def __init__(self, number):
        self.number = number

class TextNode:
    def __init__(self, text):
        self.text = text


class BinOpNode:
    def __init__(self, sinistra, op, destra):
        self.sinistra = sinistra
        self.op = op
        self.destra = destra

class IfNode:
    def __init__(self, rami, altrimenti):
        self.rami = rami              # lista di (condizione, corpo)
        self.altrimenti = altrimenti  # corpo dell'else, oppure None

class RepeatNode:
    def __init__(self, volte, body):
        self.volte = volte
        self.body = body

class LoopNode:
    def __init__(self, body):
        self.body = body

class BoolOpNode:
    def __init__(self, sinistra, op, destra):
        self.sinistra = sinistra
        self.op = op
        self.destra = destra

class RandIntNode:
    def __init__(self, rangemin, rangemax):

        self.rangemin=rangemin
        self.rangemax=rangemax

class BreakNode:
    pass

class InterrompiLoop(Exception):
    pass
        
# Grammatica del linguaggio (ogni riga = una funzione del parser):
#
# programma   -> istruzione*
# blocco      -> '{' istruzione* '}'
# istruzione  -> 'print' espressione
#              | 'if' espressione blocco ('elif' espressione blocco)* ('else' blocco)?
#              | NOME '=' espressione
# espressione -> somma ( '==' somma )?
# somma       -> termine ( ('+' | '-') termine )*
# termine     -> valore ( ('*' | '/') valore )*
# valore      -> NUMERO | TESTO | NOME | RANDINT

class Parser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.pos = 0

    # ritorna la riga corrente per rendere gli errori più capibili
    def riga(self):
        return 1 + sum(1 for t in self.tokens[:self.pos] if t[0] == 'A_CAPO')
    # --- strumenti di base ---

    # attuale ritorna il token attuale, se i tokes sono finiti, ritorna FINE

    def attuale(self):
        if self.pos < len(self.tokens):
            return self.tokens[self.pos]
        return ['FINE', None]

    # stessa cosa di attuale, solo che ritorna il token prossimo

    def prossimo(self):
        if self.pos + 1 < len(self.tokens):
            return self.tokens[self.pos + 1]
        return ['FINE', None]

    # consuma serve ad aumentare di uno la posizione,
    # e dato un tipo, ad esempio 'CHIUDI_GRAFFA' controlla che
    # il token attuale corrisponda effettivamente al tipo  

    def consuma(self, tipo):
        tok = self.attuale()
        if tok[0] != tipo:
            raise SyntaxError(f"Atteso {tipo}, trovato {tok[1]!r}")
        self.pos += 1
        return tok

    # salta gli a capo

    def salta_a_capo(self):
        while self.attuale()[0] == 'A_CAPO':
            self.pos += 1

    # Controlla se un token indica la fine di un istruzione

    def fine_istruzione(self):
        # dopo un'istruzione deve esserci un a capo, una } o la fine
        if self.attuale()[0] not in ('A_CAPO', 'CHIUDI_GRAFFA', 'FINE'):
            raise SyntaxError(f"Simbolo inatteso: {self.attuale()[1]!r}")

    # --- istruzioni ---

    # legge tutto il programma, saltando gli a capo con la funzione
    # salta_a_capo, e lo chiude in un programnode 

    def programma(self):
        istruzioni = []
        self.salta_a_capo()
        while self.attuale()[0] != 'FINE':
            istruzioni.append(self.istruzione())
            self.salta_a_capo()
        return ProgramNode(istruzioni)

    # Legge tutto il blocco fra graffe e lo nodizza :)

    def blocco(self):
        self.consuma('APRI_GRAFFA')
        istruzioni = []
        self.salta_a_capo()
        while self.attuale()[0] != 'CHIUDI_GRAFFA':
            if self.attuale()[0] == 'FINE':
                raise SyntaxError("Manca la } di chiusura")
            istruzioni.append(self.istruzione())
            self.salta_a_capo()
        self.consuma('CHIUDI_GRAFFA')
        return ProgramNode(istruzioni)

    # Capisce l'attuale istruzione

    def istruzione(self):
        tipo = self.attuale()[0]

        if tipo == 'STAMPA':
            self.consuma('STAMPA')
            self.consuma('APRI_TONDA')
            nodo = PrintNode(self.espressione())
            self.consuma('CHIUDI_TONDA')

        elif tipo == 'IF':
            self.consuma('IF')
            rami = [(self.espressione(), self.blocco())]
            altrimenti = None
            while True:
                # guarda oltre gli a capo per vedere se c'è un elif/else,
                # ma se non c'è torna indietro
                salvata = self.pos
                self.salta_a_capo()
                # se c'è elif, continua
                if self.attuale()[0] == 'ELIF':
                    self.consuma('ELIF')
                    rami.append((self.espressione(), self.blocco()))
                # se c'è else, stoppa
                elif self.attuale()[0] == 'ELSE':
                    self.consuma('ELSE')
                    altrimenti = self.blocco()
                    break
                # sennò stoppa lo stesso. (casi = if e basta, if, elif e basta)
                else:
                    self.pos = salvata
                    break

            return IfNode(rami, altrimenti)

        elif tipo == 'REPEAT':
            self.consuma('REPEAT')
            volte = self.espressione()
            corpo = self.blocco()
            return RepeatNode(volte, corpo)

        elif tipo == 'LOOP':
            self.consuma('LOOP')
            corpo = self.blocco()
            return LoopNode(corpo)

        elif tipo == 'BREAK':
            self.consuma('BREAK')
            nodo = BreakNode()

        elif tipo == 'NOME_VAR' and self.prossimo()[0] == 'UGUALE':
            nome = self.consuma('NOME_VAR')[1]
            self.consuma('UGUALE')
            nodo = AssignNode(nome, self.espressione())

        else:
            raise SyntaxError(f"Istruzione non valida vicino a {self.attuale()[1]!r}")

        self.fine_istruzione()
        return nodo

    # --- espressioni (dalla precedenza più bassa alla più alta) ---

    # Creano i nodi di determinate cose

    # controlla che il casting sia valido

    def espressione(self):
        espr = self.confronto()
        while self.attuale()[0] == 'FRECCIA':
            self.consuma('FRECCIA')
            tipo = self.consuma('NOME_VAR')[1]
            if tipo not in CONVERSIONI:
                raise SyntaxError(f"Tipo sconosciuto: {tipo!r}")
            espr = CastNode(espr, tipo)
        return espr

    def confronto(self):
        sx = self.somma()
        if self.attuale()[0] in ['COMPARAZIONE_UGUALE', 'COMPARAZIONE_MINORE_UGUALE', 'COMPARAZIONE_MAGGIORE_UGUALE', 'COMPARAZIONE_MINORE', 'COMPARAZIONE_MAGGIORE', 'COMPARAZIONE_DIVISIBILE']:
            op = self.consuma(self.attuale()[0])[1]
            dx = self.somma()
            return BoolOpNode(sx, op, dx)
        return sx

    def somma(self):
        espr = self.termine()
        while self.attuale()[0] in ('PIU', 'MENO'):
            op = self.consuma(self.attuale()[0])[1]
            espr = BinOpNode(espr, op, self.termine())
        return espr

    def termine(self):
        espr = self.valore()
        while self.attuale()[0] in ('PER', 'DIVISO'):
            op = self.consuma(self.attuale()[0])[1]
            espr = BinOpNode(espr, op, self.valore())
        return espr

    def valore(self):
        tok = self.attuale()
        if tok[0] == 'NUMERO':
            self.pos += 1
            return NumberNode(tok[1])
        if tok[0] == 'TESTO':
            self.pos += 1
            return TextNode(tok[1])
        if tok[0] == 'NOME_VAR':
            self.pos += 1
            return VarNode(tok[1])
        if tok[0] == 'RANDINT':
            self.consuma('RANDINT')
            self.consuma('APRI_TONDA')
            minimo = self.espressione()
            self.consuma('VIRGOLA')
            massimo = self.espressione()
            self.consuma('CHIUDI_TONDA')
            return RandIntNode(minimo, massimo)
        if tok[0] == 'INPUT':
            self.consuma('INPUT')
            self.consuma('APRI_TONDA')
            nodo=self.espressione()
            self.consuma('CHIUDI_TONDA')
            return InputNode(nodo)
        
        raise SyntaxError(f"Valore atteso, trovato {tok[1]!r}")

# errore!!
class ErroreGrape(Exception):
    pass

def parse(tokens):
    parser = Parser(tokens)
    # prova a parsare
    try:
        return parser.programma()
    # a mano che non arrivi un errore
    except SyntaxError as e:
        raise ErroreGrape(f"riga {parser.riga()}: {e}")

# Analizza ogni nodo e lo esegue

def esegui(nodo, ambiente):
    if isinstance(nodo, ProgramNode):
        for istruzione in nodo.instructions:
            esegui(istruzione, ambiente)

    if isinstance(nodo, NumberNode):       
        return int(nodo.number)
    
    if isinstance(nodo, TextNode):       
        return nodo.text
    
    if isinstance(nodo, VarNode):   
        if nodo.nome_var in ambiente:    
            return ambiente[nodo.nome_var]
        else:
            raise SyntaxError(f"Variabile {nodo.nome_var} non esistente!")
        
    if isinstance(nodo, AssignNode):
        ambiente[nodo.nome_var] = esegui(nodo.valore_var, ambiente)

    if isinstance(nodo, PrintNode):
        print(esegui(nodo.da_stampare, ambiente))

    if isinstance(nodo, InputNode):
            x = input(esegui(nodo.da_stampare, ambiente))
            return x

    if isinstance(nodo, BinOpNode):
        sx = esegui(nodo.sinistra, ambiente)
        dx = esegui(nodo.destra, ambiente)
        if nodo.op == '+':
            # se vede che i due operandi sono delle stringhe, le somma come tali, 
            # altrimenti li somma come numeri

            if isinstance(sx, str) or isinstance(dx, str):
                return str(sx) + str(dx)
            return sx + dx
        
        if nodo.op == '-':
            # se vede che una delle due è una stringa, dice che non si possono sottrarre
            # altrimenti li sottrae come numeri

            if isinstance(sx, str) or isinstance(dx, str):
                raise TypeError("Non si può sottrarre un testo")
            return sx - dx
        
        if nodo.op == '*':
            if isinstance(sx, str) and isinstance(dx, str):
                raise TypeError("Non si può moltiplicare 2 testi")
            return sx * dx
        
        if nodo.op == '/':
            if isinstance(sx, str) or isinstance(dx, str):
                raise TypeError("Non si può dividere i testi")
            if dx==0:
                raise SyntaxError("Non si puo' dividere per 0!!")
            
            return sx / dx

    if isinstance(nodo, BoolOpNode):
            sx = esegui(nodo.sinistra, ambiente)
            dx = esegui(nodo.destra, ambiente)

            if nodo.op == '==':
                return sx == dx
            
            if nodo.op == '<=':
                return sx <= dx
            
            if nodo.op == '>=':
                return sx >= dx

            if nodo.op == '<':
                return sx < dx
                        
            if nodo.op == '>':
                return sx > dx
            
            # Controlla se x è divisibile per y
            if nodo.op == '%%':
                return sx % dx == 0
            
    if isinstance(nodo, IfNode):
        # vede i nodi (false/true, corpo)
        for condizione, corpo in nodo.rami:
            # vede se sono da eseguire
            if esegui(condizione, ambiente):
                esegui(corpo, ambiente)
                return
        if nodo.altrimenti is not None:
            esegui(nodo.altrimenti, ambiente)

    if isinstance(nodo, BreakNode):
        raise InterrompiLoop()

    if isinstance(nodo, LoopNode):
        try:
            while True:
                esegui(nodo.body, ambiente)
        except InterrompiLoop:
            pass

    if isinstance(nodo, RepeatNode):
        try:
            for _ in range(int(esegui(nodo.volte, ambiente))):
                esegui(nodo.body, ambiente)
        except InterrompiLoop:
            pass

    if isinstance(nodo, RandIntNode):
        return random.randint(esegui(nodo.rangemin, ambiente), esegui(nodo.rangemax, ambiente))

    if isinstance(nodo, CastNode):
        v = esegui(nodo.valore, ambiente)
        try:
            return CONVERSIONI[nodo.tipo](v)
        except ValueError:
            raise ValueError(f"Impossibile convertire {v!r} in {nodo.tipo}")


# Una funzione che esegue tutto

def esegui_tutto(codice):

    ambiente={}
    tokens=tokenizza(codice)
    #print(tokens)
    istruzioni=parse(tokens)
    #print(istruzioni)
    esegui(istruzioni, ambiente)
    return ambiente

if __name__ == "__main__":
    if len(sys.argv) > 1:
        nome_file = sys.argv[1] # Prende il file da riga di comando (e.g. Fibonacci.gs)
        try:
            with open(nome_file, "r", encoding="utf-8") as file:
                codice_sorgente = file.read()
            esegui_tutto(codice_sorgente)

        except FileNotFoundError:
            print(f"Error: file '{nome_file}' does not exist!")

        except KeyboardInterrupt:
            print("\nProgramma interrotto.")
        except Exception as e:
            print(f"{ROSSO}Errore: {e}{RESET}", file=sys.stderr)
            sys.exit(1)

    else:
        print("Correct usage: .\\destems <file_name.gs>")
