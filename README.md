# EnergyStep

EnergyStep é uma solução revolucionária que utiliza módulos para gerar energia limpa a partir do movimento das pessoas. Cada passo é convertido em energia elétrica e moedas virtuais, criando um ecossistema sustentável e inovador para empresas e comunidades.

## Como funciona?

1. **Instalação de Módulos Piezoelétricos:**
   - Os módulos EnergyStep são instalados em locais estratégicos, como:
     - Shoppings.
     - Estações de transporte público.
     - Arenas esportivas.
     - Calçadas movimentadas.
   - Esses módulos capturam a energia gerada pela pressão dos passos.

2. **Geração de Energia:**
   - Cada passo emite pressão mecânica que é convertida em eletricidade através de pastilhas piezoelétricas.
   - A energia gerada pode ser:
     - Armazenada em baterias para uso posterior.
     - Utilizada diretamente para alimentar instalações locais, como iluminação e displays.

3. **Recompensas em Moedas:**
   - O sistema EnergyStep calcula os passos dados pelos usuários sobre os módulos.
   - Esses passos são convertidos em **moedas virtuais**, que podem ser acumuladas e usadas para:
     - Pagar contas de energia, água ou outros serviços.
     - Trocas em marketplaces parceiros no futuro.

4. **Interface Intuitiva:**
   - **Usuários:** Acompanham seus passos e moedas acumuladas em um aplicativo ou painel interativo.
   - **Empresas:** Monitoram a energia gerada pelos módulos instalados em seus locais através de dashboards com gráficos e relatórios em tempo real.

5. **Sustentabilidade na Prática:**
   - Cada módulo contribui para a redução de emissões de carbono, promovendo um modelo de geração de energia renovável e sustentável.
   - Empresas e usuários colaboram para um futuro mais verde, enquanto são recompensados por sua participação.


## Arquitetura do Projeto

O projeto é dividido em duas partes principais:

1. **Back-end (Java)**:
   - Framework: Spring Boot.
   - Funções principais:
     - Leitura de dados de energia gerada.
     - Gerenciamento de usuários (login, saldo de moedas, pagamentos).
     - Persistência de dados em arquivos JSON.

2. **Front-end (React)**:
   - Framework: React.
   - Funções principais:
     - Exibição de gráficos e indicadores de energia.
     - Login de usuários.
     - Gerenciamento de pagamentos.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- Java 17+
- Maven 3.8+
- Node.js 16+
- Git

## Estrutura do Projeto

```plaintext
app/
├── .idea/ (Configurações do IntelliJ IDEA)
├── src/
│   ├── main/ (Arquivos do back-end)
│   ├── components/ (Componentes React)
│   ├── css/ (Arquivos de estilo)
│   ├── routes/ (Rotas React)
│   ├── App.jsx (Arquivo principal React)
│   └── main.jsx (Ponto de entrada do React)
├── data/ (Arquivos JSON de dados)
│   ├── leituras.json (Leituras de energia)
│   └── usuarios.json (Dados dos usuários)
├── target/ (Build do Maven)
├── node_modules/ (Dependências do Node.js)
├── pom.xml (Configuração do Maven)
├── package.json (Dependências do React)
└── README.md (Documentação do projeto)
```

## Instalação

### Clonando o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd app
```

### Configurando o Back-end

1. Certifique-se de que o Maven e o Java estão configurados corretamente.
2. Acesse o diretório do projeto:
   ```bash
   cd src/main/java
   ```
3. Compile o projeto e instale as dependências:
   ```bash
   mvn clean install
   ```
4. Execute o servidor:
   ```bash
   mvn spring-boot:run
   ```
5. O servidor estará disponível em: `http://localhost:8080`

### Configurando o Front-end

1. Retorne ao diretório raiz do projeto:
   ```bash
   cd ../..
   ```
2. Instale as dependências do Node.js:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. O front-end estará disponível em: `http://localhost:5173`

## Uso

1. **Login de Usuário**:
   - Acesse a rota `/login` no front-end.
   - Insira o e-mail e senha de um usuário existente.

2. **Dashboard**:
   - Após o login, visualize as leituras de energia, total de moedas e estatísticas na página inicial.

3. **Pagamentos**:
   - Na página do usuário, clique em "Pagar Conta", insira o valor e tipo de conta, e confirme o pagamento.

## Dependências

### Back-end

- Spring Boot 3.1.0
- Jackson Databind 2.15.0
- Lombok 1.18.28

### Front-end

- React 18.2.0
- Chart.js 4.2.0
- React-Router-DOM 6.4.3

## Problemas Conhecidos

- O sistema não suporta salvamento dinâmico direto na pasta `resources` por limitações de leitura/escrita em runtime. Os dados persistidos são armazenados na pasta `data` do projeto.

## Contribuições

Sinta-se à vontade para contribuir com o projeto. Abra uma issue ou envie um pull request no repositório Git.

## Autores

Este projeto foi desenvolvido por João Viktor, Victor Augusto e Diana Leticia.

