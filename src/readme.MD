# Objetivo
Quero criar uma aplicacão simples no estilo to-do list para que eu possa praticar algumas coisa neste projeto pessoal. Apesar de ser um projeto pessoa, pretendo fazer o deploy em algum servico da AWS futuramente com sua ajuda.

Não quero ser nenhum especialista em frontend, por isso estou passando essa minha para voce.

A ideia é que vc me de sugetões de arquitetura, estrutura de pastas, seguranca e etc. 

A parte do backend vou fazer em outro repositório em Java e talvez eu crie um BFF também.

O nome da aplicacao é Let.

# A ideia
A ideia é poder criar diversas lista nessa aplicacão. Onde fique fácil de visualizar as tasks e move-las de coluna ou mudar o status.

# Caracteristicas
## Caracteristicas do site
- Na página inicial, se nao tiver nenhuma lista criada deve aparecer um botão para criar um nova lista. Se já existir listas criadas, deve-se exibir essas listas.

- A lista podem ser encolhidas ou expandidas. Também deve ter um botão para encolher ou expandir todas as lista

- Deve ter um menu lateral onde é possível acessar todas as listas ou acessar lista individualmente

- Estrutura do menu:
    - Listas (todas as listas)
        - lista1 (visualizacao individual)
        - lista2

- Deve ser possível logar e se cadastrar via Google e GitHub

## Caracteristicas da lista
- Cada lista deve ter um nome unico 
- Cada lista deve ter no minimo 1 coluna e no máximo 7
- Em cada lista pode ser adicionado N card
- A quantidade de colunas deve ser definida no momento da criacao da lista, mas poderá ser aditado depois
- Dentro de cada lista, deve ser poss;ivel agrupar os cards com base nos campos dos card.
- Deve ser possível mudar o card de coluna arrastando ou mudando o nome da coluna dentro do card

## Caracteristicas do card
- Cada card deve ter um nome
- Cada card pode ter N campos (Exemplo: assunto, tipo, cor)
- Cada campo do card deve um tipo (exemplo: texto, numero int ou float, valor monetário, data, etc)

# Consideracoes finais
A ideia é criar em next.js com typescript
Me de sugestões de design System, libs, frameworks e etc.
Você vai me sugerindo passo a passo, eu vou aprovando ou recusando e assim seguiremos até que o projeto esteja 100%
