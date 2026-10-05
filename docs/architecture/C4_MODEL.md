``markdown
# Modelo C4 — Arquitetura de Sistema

Esta documentação descreve a arquitetura técnica da **Cirrus Platform** utilizando a metodologia do Modelo C4 para mapeamento de sistemas de software.

---

## Nível 1: Diagrama de Contexto do Sistema

O diagrama de contexto descreve as interações entre os usuários principais e a plataforma no ecossistema corporativo.

+-------------------+       Comandos / CLI       +-----------------------+
|  Desenvolvedor    | -------------------------> |    Cirrus Platform    |
|  de Aplicação     |                            |  (Platform Engine)    |
+-------------------+                            +-----------------------+
|
| Provisionamento
v
+-----------------------+
|   Cluster Kubernetes  |
|   & Cloud Resources   |
+-----------------------+

---

## Nível 2: Diagrama de Contentores

Os contentores representam as aplicações e repositórios de dados executáveis que constituem a solução.

* **Developer CLI (TypeScript):** Ponto de entrada para os engenheiros interagirem com o plano de controle da plataforma.
* **Orchestrator API (Go):** Mecanismo central de validação de políticas, controle de acesso e autorização de infraestrutura.
* **IaC Engine (Terraform):** Módulos responsáveis por traduzir requisições em recursos declarativos na nuvem.

---

## Nível 3: Componentes e Integração

1. **Autenticação e Validação:** A CLI valida o token de acesso do usuário antes de enviar requisições ao Orchestrator.
2. **Parsing de Configuração:** O Core API interpreta arquivos de definição de serviço e verifica a conformidade com as regras da organização.
3. **Aplicação de Estado:** A execução dos planos do Terraform garante a criação e manutenção do estado desejado no cluster target.