# Área Vip Barbearia — Barbearia Premium

Site portfólio de uma barbearia de alto padrão. Feito com HTML, CSS, JavaScript e Bootstrap 5.3.8. Funciona bem no celular.

## Estrutura
```
alto-corte/
├── index.html      → conteúdo (HTML)
├── css/style.css   → estilos
├── js/main.js      → serviços, galeria, filtros, agendamento via WhatsApp
└── images/         → logo, favicon e suas fotos
```

## Personalizar
1. **WhatsApp:** em `js/main.js`, troque `WHATSAPP = '5561998734692'` (já configurado: 5561998734692).
2. **Fotos:** hoje vêm do Unsplash (licença gratuita) por link. Para fotos próprias, salve em `images/` e troque os links no array `GALERIA` (`js/main.js`), no `index.html` (seção Sobre) e no `css/style.css` (hero e parallax).
3. **Serviços e preços:** edite o array `SERVICOS` em `js/main.js`.
4. **Endereço, horários e depoimentos:** edite em `index.html`.

## Publicar no GitHub Pages
```bash
git init
git add .
git commit -m "Site Área Vip Barbearia"
git branch -M main
git remote add origin https://github.com/gustavobsb10/area-vip-barbearia.git
git push -u origin main
```
No GitHub, vá em **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**.
O site fica em `https://gustavobsb10.github.io/area-vip-barbearia/`.

## Bootstrap local (opcional)
O site carrega o Bootstrap 5.3.8 pelo CDN. Para usar o seu `bootstrap-5.3.8-dist`, copie `bootstrap.min.css` para `css/` e `bootstrap.bundle.min.js` para `js/`, e troque os links no `index.html` por `css/bootstrap.min.css` e `js/bootstrap.bundle.min.js`.
