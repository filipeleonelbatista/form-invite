# Festivite — Formulário de Convite Digital

Aplicação web para criação de convites digitais personalizados, desenvolvida com HTML, CSS e JavaScript puro.

## Como visualizar

Abra o arquivo `index.html` diretamente no navegador — não é necessário servidor ou instalação de dependências.

```bash
# Opção 1: abrir direto
open index.html

# Opção 2: servidor local simples (Python)
python3 -m http.server 3000
# acesse http://localhost:3000
```

## Funcionalidades

- Campos: título, data de início/fim, tipo (presencial ou online), local e descrição
- Personalização: paleta de 11 cores, 12 temas de evento, alternância claro/escuro e upload de foto de capa
- Dados de contato: nome, e-mail e telefone com máscara `(99) 99999-9999`
- Validação de campos obrigatórios com mensagens de erro em tempo real
- Toast de confirmação ao gerar o convite
- Layout responsivo (desktop, tablet e mobile)

## Tecnologias

- HTML5 semântico
- CSS3 com custom properties (design tokens)
- JavaScript vanilla (sem frameworks)
- [Lucide Icons](https://lucide.dev) via CDN
- Google Fonts: Leckerli One, Baloo 2, Open Sans
