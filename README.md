# labenu-fs1-backend
Projeto full-stack 1 Labenu: Back-end LABESOUND

### QUERYS PARA TABELAS CRIADAS:
### TABELA DE USUÁRIOS:
```
CREATE TABLE IF NOT EXISTS user_labesound(
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  nickname VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
```
### TABELA DE MÚSICAS:
```
CREATE TABLE IF NOT EXISTS music_labesound(
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  createdAt DATE NOT NULL,
  file VARCHAR(255) NOT NULL,
  album VARCHAR(255) NOT NULL
);
```
### TABELA DE GÊNEROS:
```
CREATE TABLE genre_labesound(
  id VARCHAR (255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);
```
### TABELA DE GÊNERO - MÚSICA:
```
CREATE TABLE music_genre_labesound(
  genre_id VARCHAR (255),
  music_id VARCHAR(255),    
  FOREIGN KEY (music_id) REFERENCES music_labesound(id),
  FOREIGN KEY (genre_id) REFERENCES genre_labesound(id)    
);
```
### REQUISIÇÃO USUÁRIOS 
### SIGNUP
```
.../user/signup
- RAW -> JSON:
{
    "email": "SEU_EMAIL_AQUI",
    "name": "SEU_NOME_AQUI",
    "nickname": "SEU_NICKNAME_AQUI",
    "password": "SUA_SENHA_AQUI"
}
```
### LOGIN
```
...user/login
- RAW -> JSON:
{
    "emailOrNickname": "SEU_EMAIL_OU_NICKNAME_AQUI",
    "password": "SUA_SENHA_AQUI"
}
```
