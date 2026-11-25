/* ===== Área Vip Barbearia — scripts ===== */

// CONFIGURAÇÃO — troque pelo seu número (DDI + DDD + número, só dígitos)
const WHATSAPP = '5561998734692';

const SERVICOS = [
  { icone: 'bi-scissors', nome: 'Corte Premium', desc: 'Consultoria de estilo, corte personalizado, lavagem e finalização.', preco: 70, tempo: '45 min' },
  { icone: 'bi-lightning-charge', nome: 'Corte Simples', desc: 'Corte só na máquina, rápido e bem alinhado.', preco: 50, tempo: '25 min' },
  { icone: 'bi-person-bounding-box', nome: 'Barba', desc: 'Barba alinhada na navalha, com contorno e acabamento.', preco: 50, tempo: '30 min' },
  { icone: 'bi-droplet', nome: 'Barboterapia', desc: 'Toalha quente, navalha e hidratação profunda da barba.', preco: 100, tempo: '50 min' },
  { icone: 'bi-gem', nome: 'Combo Premium', desc: 'Corte Premium + Barboterapia, a experiência completa.', preco: 150, tempo: '1h40', destaque: true },
  { icone: 'bi-wind', nome: 'Alisamento', desc: 'Fios alinhados e sem volume, com acabamento natural.', preco: 100, tempo: '1h' },
  { icone: 'bi-stars', nome: 'Progressiva', desc: 'Liso duradouro, com redução de frizz e brilho.', preco: 200, tempo: '2h' },
  { icone: 'bi-droplet-half', nome: 'Pigmentação', desc: 'Correção de falhas na barba ou cabelo com acabamento natural.', preco: 50, tempo: '30 min' },
  { icone: 'bi-calendar2-check', nome: 'Plano Mensal', desc: 'Assinatura: corte de cabelo toda semana, com horário garantido.', preco: 500, tempo: 'por mês', destaque: true, tag: 'Assinatura' }
];

// Trabalhos reais do Guga (@ggugaducorte)
const GALERIA = [
  { cat: 'corte', titulo: 'Freestyle com desenho na navalha', img: 'images/trabalho-1.jpg' },
  { cat: 'corte', titulo: 'Degradê com risco e cruz', img: 'images/trabalho-2.jpg' },
  { cat: 'barba', titulo: 'Guga — barba desenhada e fade', img: 'images/trabalho-3.jpg' },
  { cat: 'corte', titulo: 'Platinado com risco lateral', img: 'images/trabalho-4.jpg' },
  { cat: 'corte', titulo: 'Social clássico com acabamento', img: 'images/trabalho-5.jpg' },
  { cat: 'corte', titulo: 'Fade baixo com textura', img: 'images/trabalho-6.jpg' },
  { cat: 'corte', titulo: 'Degradê com desenho lateral', img: 'images/trabalho-7.jpg' },
  { cat: 'corte', titulo: 'Fade com riscos no cabelo crespo', img: 'images/trabalho-8.jpg' }
];

const HORARIOS = ['09:00','10:00','11:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00'];
const brl = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('ano').textContent = new Date().getFullYear();
  document.getElementById('whatsFloat').href =
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Olá! Gostaria de agendar um horário.')}`;

  renderServicos();
  renderGaleria();
  initFiltros();
  initNavbar();
  initReveal();
  initForm();
});

function renderServicos() {
  const lista = document.getElementById('lista-servicos');
  const select = document.getElementById('servico');
  SERVICOS.forEach(s => {
    lista.insertAdjacentHTML('beforeend', `
      <div class="col-sm-6 col-lg-4 reveal">
        <div class="card-servico">
          ${s.destaque ? `<span class="tag-destaque">${s.tag || 'Mais pedido'}</span>` : ''}
          <i class="bi ${s.icone}"></i>
          <h4>${s.nome}</h4>
          <p>${s.desc}</p>
          <div class="d-flex justify-content-between align-items-end">
            <span class="preco">${brl(s.preco)}</span>
            <span class="tempo"><i class="bi bi-clock me-1" style="font-size:.8rem"></i>${s.tempo}</span>
          </div>
        </div>
      </div>`);
    select.insertAdjacentHTML('beforeend', `<option value="${s.nome}">${s.nome} — ${brl(s.preco)}</option>`);
  });
}

function renderGaleria() {
  const grid = document.getElementById('grid-galeria');
  const modal = new bootstrap.Modal('#modalFoto');
  GALERIA.forEach(g => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4 col-lg-3 galeria-col';
    col.dataset.cat = g.cat;
    const bg = g.img ? `style="background-image:url('${g.img}')"` : '';
    col.innerHTML = `
      <div class="galeria-item">
        <div class="img" ${bg}>${g.img ? '' : '<i class="bi bi-scissors"></i>'}</div>
        <div class="legenda">${g.titulo}</div>
      </div>`;
    col.addEventListener('click', () => {
      document.getElementById('modalTitulo').textContent = g.titulo;
      const box = document.getElementById('modalImg');
      box.style.backgroundImage = g.img ? `url('${g.img}')` : '';
      box.innerHTML = g.img ? '' : '<i class="bi bi-scissors"></i>';
      modal.show();
    });
    grid.appendChild(col);
  });
}

function initFiltros() {
  document.querySelectorAll('.btn-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.galeria-col').forEach(c =>
        c.classList.toggle('hide', f !== 'todos' && c.dataset.cat !== f));
    });
  });
}

function initNavbar() {
  const nav = document.getElementById('menu');
  const topo = document.getElementById('toTop');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    topo.classList.toggle('show', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll);
  onScroll();
  topo.addEventListener('click', () => window.scrollTo({ top: 0 }));

  // fecha o menu no mobile ao clicar num link
  const collapse = document.getElementById('nav');
  document.querySelectorAll('#nav .nav-link, #nav .btn').forEach(l =>
    l.addEventListener('click', () => {
      if (collapse.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(collapse).hide();
    }));
}

function initReveal() {
  const contados = new WeakSet();
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      e.target.querySelectorAll('.counter').forEach(c => {
        if (contados.has(c)) return;
        contados.add(c);
        animarContador(c);
      });
      obs.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

function animarContador(el) {
  const alvo = +el.dataset.target;
  const dur = 1500, ini = performance.now();
  const passo = t => {
    const p = Math.min((t - ini) / dur, 1);
    el.textContent = Math.floor(alvo * p).toLocaleString('pt-BR');
    if (p < 1) requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
}

function initForm() {
  const form = document.getElementById('formAgenda');
  const data = document.getElementById('data');
  const hora = document.getElementById('hora');

  // data mínima = hoje
  const hoje = new Date();
  hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset());
  data.min = hoje.toISOString().split('T')[0];

  data.addEventListener('change', () => {
    hora.innerHTML = '<option value="">Escolha...</option>';
    const d = new Date(data.value + 'T12:00');
    const dia = d.getDay(); // 0 dom, 1 seg
    if (dia === 0 || dia === 1) {
      data.setCustomValidity('fechado');
      data.classList.add('is-invalid');
      return;
    }
    data.setCustomValidity('');
    data.classList.remove('is-invalid');
    const agora = new Date();
    const ehHoje = data.value === data.min;
    HORARIOS
      .filter(h => !(dia === 6 && h >= '18:00'))
      .filter(h => !ehHoje || +h.slice(0, 2) > agora.getHours())
      .forEach(h => hora.insertAdjacentHTML('beforeend', `<option>${h}</option>`));
    if (hora.options.length === 1) hora.insertAdjacentHTML('beforeend', '<option disabled>Sem horários neste dia</option>');
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.classList.add('was-validated'); return; }
    const [a, m, d] = data.value.split('-');
    const obs = document.getElementById('obs').value.trim();
    const msg =
      `Olá! Quero agendar na Área Vip Barbearia:\n` +
      `• Nome: ${document.getElementById('nome').value.trim()}\n` +
      `• Serviço: ${document.getElementById('servico').value}\n` +
      `• Data: ${d}/${m}/${a} às ${hora.value}` +
      (obs ? `\n• Obs: ${obs}` : '');
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
    form.reset();
    form.classList.remove('was-validated');
  });
}
