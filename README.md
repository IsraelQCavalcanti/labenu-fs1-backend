# labenu-fs1-backend
Projeto full-stack 1 Labenu: Back-end

### TABELA DE USUÁRIOS:
```
CREATE TABLE User_labesound(
id VARCHAR(255) PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
nickname VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL
)
```
