## Configurações Adicionais para Integração com o Back-end

Durante o desenvolvimento deste projeto Next.js para o teste de processo seletivo, foi necessário realizar algumas configurações e ajustes no back-end local (API em Flask), a fim de garantir o correto funcionamento da comunicação entre front-end e back-end.

---

### Problema com CORS

#### Contexto:

O front-end deste projeto é executado localmente em http://localhost:3000, enquanto a API (back-end) Flask roda em uma porta diferente (localhost:7000).

Por padrão, o Flask não permite requisições de origens diferentes (CORS – Cross-Origin Resource Sharing), o que resultava no seguinte erro ao tentar consumir a API:

```bash
   Access to fetch at 'http://localhost:7000/users' from origin 'http://   localhost:3000' has been blocked by CORS policy
```

#### Solução aplicada no back-end:

Foi realizada a instalação da extensão Flask-CORS no back-end:

```bash
pip install flask-cors
```

Em seguida, a configuração de CORS foi adicionada ao código do Flask:

```bash
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

```

✅ Resultado:
Com essa configuração, a API passou a aceitar requisições originadas do front-end em localhost:3000.

### Ajuste no Back-end para Inclusão de ID dos Usuários

Contexto:
Outro problema identificado durante o desenvolvimento foi que a API, por padrão, não estava retornando o campo id na listagem de usuários (endpoint /users).

Essa ausência dificultava operações de exclusão, que dependem de um identificador único para cada usuário.

Solução aplicada:
Foi feita uma modificação local no back-end para incluir o campo id na resposta do endpoint de listagem de usuários.

```bash
   'id': fields.Integer(required=True, description='id'),
```

### Fallback implementado no front-end:

Para garantir a retrocompatibilidade e evitar falhas futuras (caso o campo id volte a ser omitido pela API por engano), foi implementado um mecanismo de fallback no front-end.

Função responsável por lidar com a exclusão de um usuário.
IMPORTANTE: Por padrão, o back-end local (API) não estava enviando o campo `id` na resposta da listagem de usuários.
Para contornar esse problema e evitar erros na exclusão, foi feita uma alteração local no back-end para incluir o `id`.
No entanto, para garantir a retrocompatibilidade e evitar falhas em caso de esquecimento ou inconsistência da API,
esta função implementa um fallback:
Caso o `id` ainda não venha na resposta da API, será utilizado o índice do array + 1 (`index + 1`) como ID provisório
para identificação e exclusão do usuário.

    const handleDeleteUser = (users: FormTypes, index: number) => {
        if ("id" in users) {
            console.log("existe id", users.id);
            return;
        }
        console.log("Não existe id usar o array mais 1", index + 1);
    };
