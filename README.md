# JobFinder 🎯

**Uma plataforma web desenvolvida para conectar candidatos a oportunidades de emprego e empregadores em busca de talentos, com foco inicial na cidade de *Itacoatiara, Amazonas*.**  
O projeto visa simplificar e agilizar o processo de recrutamento, oferecendo uma ferramenta intuitiva e eficiente para o mercado de trabalho local.

---

## 📚 Índice

- [📝 Sobre o Projeto](#-sobre-o-projeto)
- [🌟 Objetivos Específicos](#-objetivos-específicos)
- [✨ Funcionalidades](#-funcionalidades)
- [💻 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [📂 Estrutura de Arquivos](#-estrutura-de-arquivos)
- [🚀 Como Executar o Projeto](#-como-executar-o-projeto)
- [🤝 Como Contribuir](#-como-contribuir)
- [📄 Documentação](#-documentação)
- [👥 Equipe do Projeto](#-equipe-do-projeto)
- [📜 Licença](#-licença)

---

## 📝 Sobre o Projeto

O **JobFinder** nasceu da necessidade de criar uma ponte mais eficaz entre quem procura emprego e quem oferece vagas na região de **Itacoatiara**. A plataforma foi idealizada para ser um ecossistema completo onde:

- Candidatos constroem seus perfis, buscam vagas e se candidatam.
- Empresas divulgam oportunidades, gerenciam candidaturas e encontram talentos.

Objetivo: **centralizar e facilitar a busca por empregos locais**, diminuindo dificuldades e custos do recrutamento tradicional.

---

## 🌟 Objetivos Específicos

### Para Candidatos:
- Interface simples para buscar vagas, criar perfil e acompanhar candidaturas.

### Para Empregadores:
- Ferramenta para publicar vagas, buscar candidatos e gerenciar processos seletivos.

### Para a Comunidade:
- Fomentar o desenvolvimento econômico local conectando talentos e oportunidades.

---

## ✨ Funcionalidades

### 👤 Para Candidatos
- ✅ Cadastro e login seguro  
- 📝 Criação e edição de perfil (dados, educação, experiências, habilidades)  
- 🔍 Busca avançada de vagas (por área, palavra-chave, filtros)  
- 📄 Visualização de detalhes das vagas  
- 🚀 Candidatura simplificada  
- 👀 Acompanhamento do status das candidaturas  

### 🏢 Para Empregadores
- ✅ Cadastro e login de empresa  
- 🏢 Criação e edição do perfil empresarial  
- 📢 Publicação e gerenciamento de vagas  
- 👥 Busca e filtragem de candidatos  
- 🗂️ Gerenciamento de candidaturas (aceitar/rejeitar)  

---

## 💻 Tecnologias Utilizadas

**Backend:**
- Node.js
- Express.js

**Frontend:**
- Handlebars.js (Template Engine)
- HTML5, CSS3, JavaScript

**Banco de Dados:**
- MongoDB + Mongoose

**Outros:**
- Autenticação: Express Session, Bcrypt  
- Upload de Arquivos: Multer  
- Versionamento: Git e GitHub  

---

## 📂 Estrutura de Arquivos

```
reyneralegria13-app-jobfinderv1/
├── docs/                         # Documentação (Personas, UML, C4, etc.)
└── sistema/
    └── application/
        └── api/
            ├── db.js             # Configuração do banco de dados
            ├── server.js         # Arquivo principal do servidor
            ├── .env              # Variáveis de ambiente
            ├── package.json
            └── src/
                ├── assets/       # Arquivos estáticos (CSS, JS, Imagens)
                ├── controller/   # Lógica de negócio e controle de rotas
                ├── middleware/   # Funções de middleware (ex: autenticação)
                ├── models/       # Schemas do Mongoose
                ├── routes/       # Definição das rotas da API
                └── views/        # Templates Handlebars (.hbs)
                    ├── can/      # Views para candidatos
                    ├── fun/      # Views para empregadores
                    └── layouts/  # Layouts principais
```

---

## 🚀 Como Executar o Projeto

### ✔️ Pré-requisitos

- Node.js (versão 16 ou superior)  
- NPM ou Yarn  
- MongoDB (local ou MongoDB Atlas)  

### 🧰 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/reyneralegria13/app-jobfinderv1.git
```

2. Acesse o diretório:
```bash
cd reyneralegria13-app-jobfinderv1/sistema/application/api
```

3. Instale as dependências:
```bash
npm install
```

4. Configure o `.env` com suas variáveis:

```env
# Chave secreta para a sessão
SESSION_SECRET=SUA_CHAVE_SECRETA_AQUI

# URI do MongoDB
MONGO_URI=mongodb://localhost:27017/JobFinder

# E-mail para recuperação de senha (opcional)
APP_EMAIL=seu_email@gmail.com
APP_PASS=sua_senha_de_app_do_gmail

NODE_ENV=development
```

5. Inicie o servidor:
```bash
npm start
```

6. Acesse no navegador:  
[http://localhost:3000/home](http://localhost:3000/home)

---

## 🤝 Como Contribuir

Contribuições são bem-vindas! 💙  
Para contribuir:

1. Faça um fork do projeto  
2. Crie uma branch com sua feature:
```bash
git checkout -b feature/NomeDaFeature
```
3. Commit suas mudanças:
```bash
git commit -m 'Adiciona nova feature'
```
4. Envie para seu fork:
```bash
git push origin feature/NomeDaFeature
```
5. Abra uma Pull Request.

🌟 Não se esqueça de dar uma estrela no projeto!

---

## 📄 Documentação

Toda a documentação (UML, Modelo C4, Personas, Histórias de Usuário, Inspeções) está disponível na pasta:

```
/docs
```

---

## 👥 Equipe do Projeto

- **Scrum Master:** Reyner Aelgria 
- **Modelador:** João Paulo  
- **Analista de Requisitos:** Nicolas Rocha  
- **Prototipação:** Felipe William, Reyner Alegria  
- **Avaliadores de Inspeção:** Mayro Sá, Calil Lima  
- **Programador:** João Carlos, Felipe William 

---

## 📜 Licença

Este projeto está sob a licença **MIT**.  
Consulte o arquivo [`LICENSE`](LICENSE) para mais informações.
