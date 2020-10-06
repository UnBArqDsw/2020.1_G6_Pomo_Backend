# Pomo Backend

**Número do Grupo**: 06<br>
**Código da Disciplina**: FGA0208-T01<br>

## Alunos

| Matrícula  | Aluno                                                                 |
| ---------- | --------------------------------------------------------------------- |
| 16/0111978 | [André Eduardo](https://github.com/Andre-Eduardo "User's github")     |
| 16/0112974 | [Arthur Rodrigues](https://github.com/arthurarp "User's github")      |
| 17/0013651 | [João Gabriel Antunes](https://github.com/flyerjohn "User's github")  |
| 16/0135681 | [Marco Antônio Costa](https://github.com/markinlimac "User's github") |
| 17/0045943 | [Thallys Braz](https://github.com/thallysbraz "User's github")        |

## Sobre

Repositório destinado para a implementação do backend do projeto Pomo.

## Screenshots

Adicione 3 ou mais screenshots do projeto em termos de interface e funcionamento.

## Instalação

**Linguagens**: Javascript<br>
**Tecnologias**: Node.js, Docker CE<br>
Descreva os pré-requisitos para rodar o seu projeto e os comandos necessários.
Insira um manual ou um script para auxiliar ainda mais.

## Uso

### Para executar o projeto

1. Clone o repositório com o comando, via terminal:

```bash
git clone: https://github.com/UnBArqDsw/2020.1_G6_Pomo_Backend
```

2. Verifique a disponibilidade de host:

```bash
Verifique se a porta localhost 3000  não estão sendo usada.
```

3. Entre na pasta `backend` dentro do projeto

4. Execute o seguinte comando:

```bash
yarn install
```

5. Em seguida, via terminal, execute o seguinte comando:

```bash
docker run --name "NOME_DO_BANCO" -e POSTGRES_PASSWORD="senha" -p 5432:5432 -d postgres
```

6. Entre no projeto e crie um arquivo com o nome:

```bash
.env
```

6.1 Dentro dele coloque o seguinte código:

```bash
DB_HOST=localhost
DB_USER=postgres
DB_PASS="senha" -> senha que você colocou no docker
DB_NAME="NOME_DO_BANCO"
DB_PORT=5432
```

7. Agora, execute o comando:

```bash
yarn dev
```

8. Se tudo deu certo, no terminal exibirá a seguinte mensagem:

```bash
server rodando na porta: 3002
```

## Vídeo

Adicione 1 ou mais vídeos com a execução do projeto final.

## Outros

Quaisquer outras informações sobre seu projeto podem ser descritas abaixo.
