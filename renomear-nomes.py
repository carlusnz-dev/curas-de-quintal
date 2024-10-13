import os
import unidecode

def renomear_arquivos(pasta):
    for nome_arquivo in os.listdir(pasta):
        # Remove acentos e converte para minúsculas
        nome_sem_acentos = unidecode.unidecode(nome_arquivo).lower()
        
        # Substitui espaços por underline e remove caracteres especiais
        novo_nome = nome_sem_acentos.replace(" ", "_")
        
        # Gera o caminho completo dos arquivos antigos e novos
        caminho_antigo = os.path.join(pasta, nome_arquivo)
        caminho_novo = os.path.join(pasta, novo_nome)
        
        # Renomeia o arquivo
        os.rename(caminho_antigo, caminho_novo)
        print(f"Renomeado: {nome_arquivo} -> {novo_nome}")

# Defina o caminho da pasta onde estão os arquivos
pasta = "./public/assets/imgs/plantas/"

# Executa a função
renomear_arquivos(pasta)
