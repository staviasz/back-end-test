1. **AccountRoutes**:
   - *Descrição*: Declaração das rotas que utiliza um adaptador de rota (`adaptRoute`)
    para executar um controlador e retornar uma resposta.
   
2. **makeAddUserController**:
   - *Descrição*: O `makeAddUserController` faz as instâncias necessárias para a 
   execução do controlador, como bibliotecas externas e o caso de uso adequado, e 
   retorna um controlador que satisfaz a interface/protocolo definida em apresentações.
   
3. **AddUserController**:
   - *Descrição*: O controlador valida os dados de entrada e executa o caso de uso que 
   recebeu, desde que esse caso satisfaça a interface/protocolo definida no domínio.
   
4. **AddAccountUseCase**:
   - *Descrição*: O caso de uso executa a lógica para a regra de negócio.


### Descrição da arquitetura hexagonal

1. **Domain**:
   - *Descrição*: Contém os tipos e protocolos referentes às regras de negócio.

2. **Infraestrutura (Infra)**:
   - *Descrição*: Contém a execução das bibliotecas externas à aplicação.

3. **Adaptadores (Adapters)**:
   - *Descrição*: Vai conter os adaptadores que farão a ligação entre as classes do sistema.

4. **Fábricas (Factories)**:
   - *Descrição*: Vai orquestrar a execução do controlador, instanciando as dependências e o caso de uso necessários aos controladores.

5. **Apresentação (Presentation)**:
   - *Descrição*: Será responsável pela execução dos controladores, assim como seus protocolos e tipos. Validará os dados de entrada e retornará a resposta do caso de uso recebido.

6. **Casos de Uso (Use Cases)**:
   - *Descrição*: Implementará a lógica para as regras de negócio protocoladas pelo domínio e protocolará as bibliotecas externas.
