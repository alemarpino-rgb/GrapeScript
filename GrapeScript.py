import re
import sys
import operator



# ==========================================
# GrapeScript Di Alessandro Marpino
# ==========================================
#
# I'm italian, so all the comments are in italian : )
#
# Com'è fatto questo interprete?
#
# E' composto da 4 parti principali: 
#   1. TOKENIZZAZIONE
#   2. NODI (AST)
#   3. PARSER DINAMICO
#   4. INTERPRETE
#
# Perchè l'ho fatto?
#
# Ho iniziato questo progetto per puro interesse personale 
# e perchè sinceramente odio i for e i while, quindi ho 
# pensato di rimpiazzarli con un unico comando che trovo geniale: REPEAT
#
# Per più info guardate il README : ) 
#
# QUESTO PROGETTO E' COMPLETAMENTE AI-FREE
#
# ==========================================
# Buona lettura del codice !
# ==========================================

# Associazioni tra la stringa e la funzione logica
operatori = {
    '<': operator.lt,
    '>': operator.gt,
    '==': operator.eq,
    '!=':operator.ne
}

# ==========================================
# 1. TOKENIZZATORE (Gestisce anche i ritorni a capo)
# ==========================================

def tokenizza(codice):
    #[\s\S]*? legge qualsiasi carattere incluso il \n senza mandare in crash il motore regex
    pattern = r"//[ \t]*\r?\n[\s\S]*?//|//[^\n]*|'[^'\n]*'|\"[^\"]*\"|-=|==|\+=|\*=|\/=|%%|!=|--|>|<|\+\+|[a-zA-Zà-ù_][a-zA-Zà-ù0-9_]*|\d+|[=+\-*/\"',!∞{}]"
    
    tokens = []
    for t in re.findall(pattern, codice):
        if t.startswith("//"):
            continue
            
        t = t.strip()
        if not t: 
            continue
            
        if (t.startswith("'") and t.endswith("'")) or (t.startswith('"') and t.endswith('"')):
            tokens.extend([t[0], t[1:-1], t[-1]])
        else:
            tokens.append(t)
            
    return tokens


# ==========================================
# 2. STRUTTURA DEI NODI (AST)
# ==========================================
class NumberNode:
    def __init__(self, value):
        self.value = value

class AssignNode:
    def __init__(self, var_name, value_node, is_type, is_var=False):
        self.var_name = var_name
        self.value_node = value_node
        self.is_var=is_var
        self.is_type=is_type

class PrintNode:
    # AGGIORNATO: Ora accetta content, printype (print/printn) e is_var (True/False)
    def __init__(self, content, printype, is_var=False):
        self.content = content
        self.printype = printype
        self.is_var = is_var

class SumVarNumNode:
    def __init__(self, var_name, value_node, is_var=False):
        self.var_name = var_name
        self.value_node = value_node
        self.is_var = is_var

class SubVarNumNode:
    def __init__(self, var_name, value_node, is_var=False):
        self.var_name = var_name
        self.value_node = value_node
        self.is_var = is_var
class MulVarNumNode:
    def __init__(self, var_name, value_node, is_var=False):
        self.var_name = var_name
        self.value_node = value_node
        self.is_var = is_var
class DivVarNumNode:
    def __init__(self, var_name, value_node, is_var=False):
        self.var_name = var_name
        self.value_node = value_node
        self.is_var = is_var

class IncrementNode:
    def __init__(self, var_name):
        self.var_name = var_name
class DecrementNode:
    def __init__(self, var_name):
        self.var_name = var_name

class ProgramNode:
    def __init__(self, instructions):
        self.instructions = instructions
# REPEAT, che secondo me, è geniale
class RepeatNode:
    def __init__(self, count, body, is_var=False):
        self.count = count      # int, oppure nome variabile se is_var=True
        self.body = body        # un ProgramNode
        self.is_var = is_var
class IfNode:
    def __init__(self, var_name, body, confront, operand, elsebody,is_var=False ):
        self.var_name = var_name      # int, oppure nome variabile se is_var=True
        self.body = body        # un ProgramNode
        self.is_var = is_var
        self.operand = operand
        self.confront=confront
        self.else_body=elsebody


def estrai_blocco(tokens, posizione):
    # posizione = indice del '{'
    profondita = 0
    inizio = posizione + 1
    while posizione < len(tokens):
        if tokens[posizione] == '{':
            profondita += 1
        elif tokens[posizione] == '}':
            profondita -= 1
            if profondita == 0:
                return tokens[inizio:posizione], posizione + 1  # corpo, indice dopo '}'
                # quindi, praticamente, trova tutti i tokens tra le parentesi e li restituisce, saltando la }
        posizione += 1
    raise SyntaxError("Manca una '}'!")

# ==========================================
# 3. PARSER DINAMICO (Scorre i token con un ciclo)
# ==========================================
def parse(tokens):
    istruzioni = []
    posizione = 0
    
    while posizione < len(tokens):
        if posizione < len(tokens) and re.match(r'[a-zA-Z]+', tokens[posizione]):

            # == REPEAT == #

            if tokens[posizione] == 'repeat':
                conteggio = tokens[posizione+1]
                if conteggio.isdigit():
                    nodo_conteggio, is_var = int(conteggio), False
                else:
                    nodo_conteggio, is_var = conteggio, True      # es. repeat n { ... }

                corpo_token, posizione = estrai_blocco(tokens, posizione + 2)
                corpo = parse(corpo_token)                        # ricorsione: riusi tutto il parser
                istruzioni.append(RepeatNode(nodo_conteggio, corpo, is_var))
            elif tokens[posizione] == 'if':
                if re.match(r'[a-zA-Z]+', tokens[posizione+1]):
                    nome_var = tokens[posizione+1]
                    if tokens[posizione+2] in ['<','>','==','%%','!=']:
                        operando=tokens[posizione+2]
                        if re.match(r'[a-zA-Z]+', tokens[posizione+3]):
                            confronto=tokens[posizione+3]
                            is_var=True
                        else:
                            confronto=tokens[posizione+3]
                            is_var=False
                        corpo_token, posizione = estrai_blocco(tokens, posizione + 4)
                        corpo = parse(corpo_token)    
                        # Controllo: c'è un else?
                        corpo_else = None

                        if posizione < len(tokens) and tokens[posizione] == 'else':
                            else_token, posizione = estrai_blocco(tokens, posizione + 1)
                            corpo_else = parse(else_token)

                        istruzioni.append(IfNode(nome_var, corpo, confronto, operando,corpo_else, is_var ))

                else:
                    raise SyntaxError(f"Ci vuole una variabile per il confronto!")    # es. repeat n { ... }
            elif tokens[posizione] == 'else':
                raise SyntaxError("'else' senza un 'if' che lo precede!")



            # --- ASSEGNA ---
            elif posizione + 1 < len(tokens) and tokens[posizione+1] == '=':
                if re.match(r'[a-zA-Z]+', tokens[posizione+2]):
                    valore_num = tokens[posizione+2]
                    type='var'
                    nome_var = tokens[posizione]          
                    nodo_assegnazione = AssignNode(nome_var, valore_num, type, is_var=True)
                    istruzioni.append(nodo_assegnazione)
                    posizione += 3
                elif tokens[posizione+2] in ['\'', '\"']:
                    type='string'
                    valore_num=tokens[posizione+3]
                    if tokens[posizione+4] in ['\'', '\"']:
                        nome_var = tokens[posizione]          
                        nodo_assegnazione = AssignNode(nome_var, valore_num, type, is_var=False)
                        istruzioni.append(nodo_assegnazione)
                        posizione += 5
                    else:
                        raise SyntaxError("Dopo la dichiarazione di una stringa ci vogliono le \"!!")
                else:
                    valore_num = tokens[posizione+2]
                    type='int'
                    if valore_num == '∞':
                        valore_num = float('inf')
                    else:
                        try:
                            valore_num = int(valore_num)
                        except ValueError:
                            print("Numero non valido!")
                            break  
                    
                    nome_var = tokens[posizione]          
                    nodo_assegnazione = AssignNode(nome_var, NumberNode(valore_num),type, is_var=False)
                    istruzioni.append(nodo_assegnazione)
                    posizione += 3
                
            # --- STAMPA ---
            elif tokens[posizione] in ['print','printn']:
                printf = tokens[posizione]
                
                # Caso testo (es: print 'Ciao')
                if tokens[posizione+1] in ['"', "'"]:
                    posizione += 2
                    stringa = tokens[posizione]
                    posizione += 1

                    # is_var=False (è un testo fisso)
                    nodo_stampa = PrintNode(stringa, printf, is_var=False)
                    istruzioni.append(nodo_stampa)
                    posizione += 1  # Salta il delimitatore di chiusura

                # Caso variabile (es: print r)
                elif re.match(r'[a-zA-Z]+', tokens[posizione+1]):
                    # is_var=True (è una variabile)
                    nodo_stampa = PrintNode(tokens[posizione+1], printf, is_var=True)
                    istruzioni.append(nodo_stampa)
                    posizione += 2
            elif posizione + 1 < len(tokens) and tokens[posizione+1] == '++':
                nome_var=tokens[posizione]
                nodo_assegnazione = IncrementNode(nome_var)
                istruzioni.append(nodo_assegnazione)
                posizione += 2
            elif posizione + 1 < len(tokens) and tokens[posizione+1] == '--':
                nome_var=tokens[posizione]
                nodo_assegnazione = DecrementNode(nome_var)
                istruzioni.append(nodo_assegnazione)
                posizione += 2
            # --- SOMMA (+=) ---
            elif posizione + 1 < len(tokens) and tokens[posizione+1] == '+=':
                if tokens[posizione+2].isdigit():
                    nome_var = tokens[posizione]
                    valore_somma = tokens[posizione+2]
                    
                    if valore_somma == '∞':
                        valore_somma = float('inf')
                    else:
                        valore_somma = int(valore_somma)
                            
                    nodo_assegnazione = SumVarNumNode(nome_var, valore_somma, is_var=False)
                    istruzioni.append(nodo_assegnazione)
                    posizione += 3
                    
                elif re.match(r'[a-zA-Z]+', tokens[posizione+2]):
                    nome_var = tokens[posizione]
                    valore_somma = tokens[posizione+2]
                            
                    nodo_assegnazione = SumVarNumNode(nome_var, valore_somma, is_var=True)
                    istruzioni.append(nodo_assegnazione)
                    posizione += 3
            elif posizione + 1 < len(tokens) and tokens[posizione+1] == '/=':
                if tokens[posizione+2].isdigit():
                    nome_var = tokens[posizione]
                    valore_somma = tokens[posizione+2]
                    
                    if valore_somma == '∞':
                        raise SyntaxError("Impossibile dividere per infinito!")
                    else:
                        valore_somma = int(valore_somma)
                            
                    nodo_assegnazione = SumVarNumNode(nome_var, valore_somma, is_var=False)
                    istruzioni.append(nodo_assegnazione)
                    posizione += 3
                    
                elif re.match(r'[a-zA-Z]+', tokens[posizione+2]):
                    nome_var = tokens[posizione]
                    valore_somma = tokens[posizione+2]
                            
                    nodo_assegnazione = SumVarNumNode(nome_var, valore_somma, is_var=True)
                    istruzioni.append(nodo_assegnazione)
                    posizione += 3

            # --- SOTTRAI (-=) ---
            elif posizione + 1 < len(tokens) and tokens[posizione+1] == '-=':
                if tokens[posizione+2].isdigit():
                    nome_var = tokens[posizione]
                    valore_somma = tokens[posizione+2]
                    
                    if valore_somma == '∞':
                        valore_somma = float('inf')
                    else:
                        valore_somma = int(valore_somma)
                            
                    nodo_assegnazione = SubVarNumNode(nome_var, valore_somma, is_var=False)
                    istruzioni.append(nodo_assegnazione)
                    posizione += 3
                    
                elif re.match(r'[a-zA-Z]+', tokens[posizione+2]):
                    nome_var = tokens[posizione]
                    valore_somma = tokens[posizione+2]
                            
                    nodo_assegnazione = SubVarNumNode(nome_var, valore_somma, is_var=True)
                    istruzioni.append(nodo_assegnazione)
                    posizione += 3
            elif posizione + 1 < len(tokens) and tokens[posizione+1] == '*=':
                if tokens[posizione+2].isdigit():
                    nome_var = tokens[posizione]
                    valore_somma = tokens[posizione+2]
                    
                    if valore_somma == '∞':
                        valore_somma = float('inf')
                    else:
                        valore_somma = int(valore_somma)
                            
                    nodo_assegnazione = MulVarNumNode(nome_var, valore_somma, is_var=False)
                    istruzioni.append(nodo_assegnazione)
                    posizione += 3
                    
                elif re.match(r'[a-zA-Z]+', tokens[posizione+2]):
                    nome_var = tokens[posizione]
                    valore_somma = tokens[posizione+2]
                            
                    nodo_assegnazione = MulVarNumNode(nome_var, valore_somma, is_var=True)
                    istruzioni.append(nodo_assegnazione)
                    posizione += 3

            else:
                posizione += 1
        else:
            posizione += 1

    return ProgramNode(istruzioni)


# ==========================================
# 4. INTERPRETE / ESECUTORE
# ==========================================
def esegui(nodo, ambiente):
    if isinstance(nodo, ProgramNode):
        for istruzione in nodo.instructions:
            esegui(istruzione, ambiente)
            
    elif isinstance(nodo, NumberNode):
        return nodo.value
    
    elif isinstance(nodo, AssignNode):
        if nodo.is_var:
            if nodo.value_node not in ambiente:
                raise SyntaxError(f"La variabile {nodo.value_node} non esiste!!")
            valore = ambiente[nodo.value_node]
        else:
            if nodo.is_type=='string':
                valore=nodo.value_node
            elif nodo.is_type=='int':
                valore = esegui(nodo.value_node, ambiente)
        ambiente[nodo.var_name] = valore
        return valore

    elif isinstance(nodo, PrintNode):
        # RISOLUZIONE: Decide cosa stampare
        if nodo.is_var:
            if nodo.content in ambiente:
                da_stampare = ambiente[nodo.content]
            else:
                raise SyntaxError(f"La variabile {nodo.content} non esiste!!")
        else:
            da_stampare = nodo.content
            
        # Decide se andare a capo
        if nodo.printype == 'printn':
            print(da_stampare, end='\n')
        else:
            print(da_stampare, end='')
    elif isinstance(nodo, IncrementNode):
        if nodo.var_name in ambiente:
            ambiente[nodo.var_name]+=1
        else:
            raise SyntaxError(f"La variabile {nodo.var_name} non esiste!!")
    elif isinstance(nodo, DecrementNode):
        if nodo.var_name in ambiente:
            ambiente[nodo.var_name]-=1
        else:
            raise SyntaxError(f"La variabile {nodo.var_name} non esiste!!")
    elif isinstance(nodo, SumVarNumNode):
        if nodo.var_name in ambiente:
            if nodo.is_var:
                if nodo.value_node in ambiente:
                    da_sommare = ambiente[nodo.value_node]
                else:
                    raise SyntaxError(f"La variabile {nodo.value_node} non esiste!!")
            else:
                da_sommare = nodo.value_node
            ambiente[nodo.var_name]+=da_sommare
        else:
            raise SyntaxError(f"La variabile {nodo.var_name} non esiste!!")
            
    elif isinstance(nodo, SubVarNumNode):
        if nodo.var_name in ambiente:
            if nodo.is_var:
                if nodo.value_node in ambiente:
                    da_sottrarre = ambiente[nodo.value_node]
                else:
                    raise SyntaxError(f"La variabile {nodo.value_node} non esiste!!")
            else:
                da_sottrarre = nodo.value_node
            ambiente[nodo.var_name]-=da_sottrarre
        else:
            raise SyntaxError(f"La variabile {nodo.var_name} non esiste!!")

    elif isinstance(nodo, MulVarNumNode):
        if nodo.var_name in ambiente:
            if nodo.is_var:
                if nodo.value_node in ambiente:
                    da_moltiplicare = ambiente[nodo.value_node]
                else:
                    raise SyntaxError(f"La variabile {nodo.value_node} non esiste!!")
            else:
                da_moltiplicare = nodo.value_node
            ambiente[nodo.var_name]*=da_moltiplicare
        else:
            raise SyntaxError(f"La variabile {nodo.var_name} non esiste!!")
    elif isinstance(nodo, DivVarNumNode):
        if nodo.var_name in ambiente:
            if nodo.is_var:
                if nodo.value_node in ambiente:
                    da_dividere = ambiente[nodo.value_node]
                else:
                    raise SyntaxError(f"La variabile {nodo.value_node} non esiste!!")
            else:
                da_dividere = nodo.value_node
            if da_dividere==0:
                raise SyntaxError("Impossibile dividere per 0!")
            ambiente[nodo.var_name]/=da_dividere
        else:
            raise SyntaxError(f"La variabile {nodo.var_name} non esiste!!")
    # == REPEAT == #

    elif isinstance(nodo, RepeatNode):
        if nodo.is_var:
            if nodo.count not in ambiente:
                raise SyntaxError(f"La variabile {nodo.count} non esiste!!")
            volte = ambiente[nodo.count]
        else:
            volte = nodo.count

        for _ in range(volte):
            esegui(nodo.body, ambiente)
    elif isinstance(nodo, IfNode):
        if nodo.var_name in ambiente:
            valore1=ambiente[nodo.var_name]
            if nodo.is_var:
                if nodo.confront not in ambiente:
                    raise SyntaxError(f"La variabile {nodo.confront} non esiste!!")
                valore2 = ambiente[nodo.confront]
                operatore=nodo.operand
            else:
                try:
                    valore2=int(nodo.confront)
                except ValueError:
                    raise SyntaxError(f"Numero non valido!")
                operatore = nodo.operand
        else:
            raise SyntaxError(f"La variabile {nodo.confront} non esiste!!")
        if operatore=='%%':
            vero = (valore1 % valore2 == 0)
        else:
            vero = operatori[operatore](valore1, valore2)

        if vero:
            esegui(nodo.body, ambiente)
        elif nodo.else_body is not None:
            esegui(nodo.else_body, ambiente)




# ==========================================
# TEST DI ESECUZIONE
# ==========================================
#∞∞∞∞∞∞∞ ecco qui il simbolo, così è più facile prenderlo

if __name__ == "__main__":
    if len(sys.argv) > 1:
        nome_file = sys.argv[1] # Prende il file da riga di comando (e.g. Fibonacci.gs)
        try:
            with open(nome_file, "r", encoding="utf-8") as file:
                codice_sorgente = file.read()
            ambiente_memoria = {}
            elenco_token = tokenizza(codice_sorgente)
            albero_ast = parse(elenco_token)

            print("--- OUTPUT DEL CODICE ---")
            esegui(albero_ast, ambiente_memoria)
            print("\n-------------------------\n")

            print("Token estratti:", elenco_token)
            print("Stato finale memoria:", ambiente_memoria)

        except FileNotFoundError:
            print(f"Error: file '{nome_file}' does not exist!")
    else:
        print("Correct usage: .\\destems <file_name.gs>")
