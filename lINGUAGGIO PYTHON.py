import re

# ==========================================
# 1. TOKENIZZATORE (Gestisce anche i ritorni a capo)
# ==========================================
def tokenizza(codice):
    pattern = r"'[^'\n]*'|\"[^\"]*\"|-=|\+=|[a-zA-Zà-ù]+|\d+|[=+\-*/\"',!∞]"
    
    tokens = []
    for t in re.findall(pattern, codice):
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
    def __init__(self, var_name, value_node):
        self.var_name = var_name
        self.value_node = value_node

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
    def __init__(self, var_name, value_node):
        self.var_name = var_name
        self.value_node = value_node

class ProgramNode:
    def __init__(self, instructions):
        self.instructions = instructions


# ==========================================
# 3. PARSER DINAMICO (Scorre i token con un ciclo)
# ==========================================
def parse(tokens):
    istruzioni = []
    posizione = 0
    
    while posizione < len(tokens):
        if posizione < len(tokens) and re.match(r'[a-zA-Z]+', tokens[posizione]):
            
            # --- ASSEGNA ---
            if posizione + 1 < len(tokens) and tokens[posizione+1] == '=':
                valore_num = tokens[posizione+2]
                if valore_num == '∞':
                    valore_num = float('inf')
                else:
                    try:
                        valore_num = int(valore_num)
                    except ValueError:
                        print("Numero non valido!")
                        break  
                
                nome_var = tokens[posizione]          
                nodo_assegnazione = AssignNode(nome_var, NumberNode(valore_num))
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

            # --- SOTTRAI (-=) ---
            elif posizione + 1 < len(tokens) and tokens[posizione+1] == '-=':
                nome_var = tokens[posizione]
                valore_sottrazione = tokens[posizione+2]
                
                if valore_sottrazione == '∞':
                    valore_sottrazione = float('inf')
                else:
                    valore_sottrazione = int(valore_sottrazione)
                        
                nodo_assegnazione = SubVarNumNode(nome_var, valore_sottrazione)
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
        valore = nodo.value_node
        if nodo.var_name in ambiente:
            ambiente[nodo.var_name] -= valore
        else:
            raise SyntaxError(f"La variabile {nodo.var_name} non esiste!!")


# ==========================================
# TEST DI ESECUZIONE
# ==========================================
codice_sorgente = """
r=635
printn r
r-=635
r+=57
qwerty=637
r+=qwerty
printn r
printn qwerty
print 'Ciao Mondo'
"""
ambiente_memoria = {}
elenco_token = tokenizza(codice_sorgente)
albero_ast = parse(elenco_token)

print("--- OUTPUT DEL CODICE ---")
esegui(albero_ast, ambiente_memoria)
print("\n-------------------------\n")

print("Token estratti:", elenco_token)
print("Stato finale memoria:", ambiente_memoria)
