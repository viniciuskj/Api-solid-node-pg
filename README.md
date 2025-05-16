# App

Gympass style app.

# Requisitos Funcionais 

- Cadastro
- Autenticação
- Obter dados do perfil de um usuário logado
- Obter números de check-ins realizados pelo usuário 
- Histórico de check-ins
- Buscar academias próximas 
- Buscar academias pelo nome
- Realizar check-in em uma academia 
- Validar check-in de um usuário 
- Cadastrar uma academia

# Regras de Negócio 

- O usuário não pode se cadastrar com um email duplicado
- O usuário não fazer 2 check-ins no mesmo dia
- O usuário não pode fazer check-in se não estiver (100m) da academia
- O check-in só pode ser valido até 20 minutos após criado
- O check-in só pode ser validado por administradores 
- A academia só pode ser cadastrada por administradores

# Requisitos Não Funcionais

- A senha do usuário precisa ser criptografado 
- Os dados da aplicação precisam estar persistidos em banco no postgreSQL
- Todas as listas de dados precisam ser paginadas com 20 itens por página 
- O usuario deve ser identificado por um JWT (Jason Web Token)
