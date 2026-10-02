/* Sitio de casos de prueba de Ziclo · Santa Teresa.
   Lee window.QA_DATOS, que escribe generar_sitio.py en recursos/datos.js. */
(function () {
  'use strict';
  var D = window.QA_DATOS || { modulos: [], razones: {} };
  var ORDER = ['Pasa', 'Falla', 'Observación', 'Bloqueado', 'Pendiente'];
  var LBL = { 'Pasa': 'Exitoso', 'Falla': 'Fallido', 'Observación': 'Bajo observación', 'Bloqueado': 'Bloqueado', 'Pendiente': 'Pendiente' };
  var KEY = { 'Pasa': 'ok', 'Falla': 'fail', 'Observación': 'warn', 'Bloqueado': 'block', 'Pendiente': 'pend' };
  var AUTO = [['Automatizado', 'done', 'var(--ok-fill)'], ['Automatizable', 'yes', 'var(--accent)'], ['No automatizable', 'no', 'var(--auto-no)']];
  var ICONS = {
    login: 'M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3',
    home: 'M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10',
    clientes: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
    cobranzas: 'M2 7h20v12H2zM2 11h20M6 15h4',
    pedidos: 'M9 2h6v4H9zM16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 12h6M9 16h4',
    'punto-de-venta': 'M3 9l1.5-5h15L21 9M3 9h18M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M5 12v9h14v-9M10 21v-5h4v5',
    'mi-cuota': 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01'
  };
  var ICON_DEF = 'M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6';
  var SUN = 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4';
  var MOON = 'M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z';
  var LOGO = '<svg width="40" height="40" viewBox="0 0 200 200" aria-hidden="true"><rect width="200" height="200" rx="46" fill="var(--logo-bg)"/><path d="M78 64 L100 42 L122 64" fill="none" stroke="var(--logo-fg)" stroke-width="8"/><path d="M83.5 152 V110 a16.5 16.5 0 0 1 33 0 V152" fill="none" stroke="var(--logo-fg)" stroke-width="11"/></svg>';
  var CHEV_L = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';
  var CHEV_R = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';

  function ico(d) { return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d + '"/></svg>'; }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function md(t) { return esc(t).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1'); }
  function plain(t) { return String(t || '').replace(/\*\*|`/g, ''); }
  function fmt(f) { return f ? f.split('-').reverse().join('/') : ''; }
  function pctOf(n, t) { return t ? Math.round(n / t * 100) : 0; }
  function load(k) { try { return localStorage.getItem('qa-' + k); } catch (e) { return null; } }
  function save(k, v) { try { localStorage.setItem('qa-' + k, v); } catch (e) { /* sin almacenamiento */ } }
  function tag(st) { return '<span class="tag k-' + (KEY[st] || 'pend') + '"><i></i>' + esc(LBL[st] || st) + '</span>'; }
  function autoCls(a) { return a === 'Automatizado' ? 'done' : a === 'Automatizable' ? 'yes' : ''; }
  function sq(color) { return '<span class="sq" style="background:' + color + '"></span>'; }
  function fill(st) { return 'var(--' + KEY[st] + '-fill)'; }

  var MODS = D.modulos.map(function (m) {
    var c = {}; ORDER.forEach(function (k) { c[k] = 0; });
    var a = { done: 0, yes: 0, no: 0 };
    m.casos.forEach(function (r) {
      c[r.estado] = (c[r.estado] || 0) + 1;
      a[r.auto === 'Automatizado' ? 'done' : r.auto === 'Automatizable' ? 'yes' : 'no']++;
    });
    return { clave: m.clave, nombre: m.nombre, desc: m.descripcion, casos: m.casos, total: m.casos.length, c: c, a: a };
  });

  var S = {
    view: 'report', mod: null, sel: null, filtro: 'Todos', autoF: 'Todas', q: '', per: 10, page: 1,
    collapsed: {}, razon: false, mini: load('mini') === '1', theme: load('theme') === 'light' ? 'light' : 'dark'
  };
  var app = document.getElementById('app');

  function segs(c, total, cls) {
    return ORDER.filter(function (k) { return c[k] > 0; }).map(function (k) {
      var tip = LBL[k] + ': ' + c[k] + ' (' + pctOf(c[k], total) + '%)';
      return '<span class="bar ' + (cls || '') + '"' + (cls ? ' data-tip="' + esc(tip) + '"' : '') + ' title="' + esc(tip) + '" style="width:' + (c[k] / total * 100) + '%;background:' + fill(k) + '"></span>';
    }).join('');
  }

  /* Menú lateral */
  function side() {
    var rep = S.view === 'report';
    var h = '<aside class="side"><div class="brand">' + LOGO +
      '<div class="brand-txt fade"><span class="brand-name">Ziclo</span><span class="brand-sub">Santa Teresa · QA</span></div>' +
      '<button type="button" class="icon-btn t collapse" data-act="side" aria-label="' + (S.mini ? 'Expandir menú' : 'Encoger menú') + '" title="' + (S.mini ? 'Expandir menú' : 'Encoger menú') + '">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M9 4v16"/><path d="' + (S.mini ? 'M14 10l2 2-2 2' : 'M16 10l-2 2 2 2') + '"/></svg></button></div>' +
      '<nav aria-label="Navegación"><div class="nav-group"><span class="nav-title fade">General</span>' +
      '<a href="#/" class="nav-btn t' + (rep ? ' on' : '') + '"' + (rep ? ' aria-current="page"' : '') + ' title="Reporte"><span class="nav-ic t">' + ico('M3 3v18h18M7 15l4-4 3 3 5-6') + '</span><span class="nav-lbl fade">Reporte</span></a></div>' +
      '<div class="nav-group"><span class="nav-title fade">Módulos</span><div class="nav-list">';
    MODS.forEach(function (m) {
      var on = !rep && m.clave === S.mod;
      h += '<a href="#/' + esc(m.clave) + '" data-act="mod" data-mod="' + esc(m.clave) + '" class="nav-btn t' + (on ? ' on' : '') + '"' + (on ? ' aria-current="page"' : '') + ' title="' + esc(m.nombre) + '">' +
        '<span class="nav-ic t">' + ico(ICONS[m.clave] || ICON_DEF) + '</span><span class="nav-lbl fade">' + esc(m.nombre) + '</span><span class="nav-count fade">' + m.total + '</span></a>';
    });
    var tl = S.theme === 'dark' ? 'Modo claro' : 'Modo oscuro';
    h += '</div></div></nav><div class="side-foot"><button type="button" class="nav-btn t" data-act="theme" aria-label="' + tl + '" title="' + tl + '">' +
      '<span class="nav-ic">' + ico(S.theme === 'dark' ? SUN : MOON) + '</span><span class="nav-lbl fade">' + tl + '</span></button></div></aside>';
    return h;
  }

  /* Reporte */
  function report() {
    var tc = {}; ORDER.forEach(function (k) { tc[k] = 0; });
    var at = { done: 0, yes: 0, no: 0 }, total = 0;
    MODS.forEach(function (m) { total += m.total; at.done += m.a.done; at.yes += m.a.yes; at.no += m.a.no; ORDER.forEach(function (k) { tc[k] += m.c[k]; }); });
    var exec = total - tc['Pendiente'];
    var kpis = [
      ['Casos documentados', total, MODS.length + (MODS.length === 1 ? ' módulo' : ' módulos')],
      ['Ejecutados', exec, pctOf(exec, total) + '% del total'],
      ['Exitosos', tc['Pasa'], pctOf(tc['Pasa'], exec) + '% de los ejecutados'],
      ['Fallidos', tc['Falla'], pctOf(tc['Falla'], exec) + '% de los ejecutados']
    ];
    var C = 2 * Math.PI * 64, cum = 0, donut = '';
    if (total) ORDER.filter(function (k) { return tc[k] > 0; }).forEach(function (k) {
      var len = C * tc[k] / total;
      donut += '<circle class="bar" cx="84" cy="84" r="64" fill="none" stroke="' + fill(k) + '" stroke-width="20" stroke-dasharray="' + Math.max(len - 2, 0).toFixed(2) + ' ' + C.toFixed(2) + '" stroke-dashoffset="' + (-cum).toFixed(2) + '"/>';
      cum += len;
    });
    var legend = ORDER.map(function (k) { return '<li>' + sq(fill(k)) + '<span class="l">' + LBL[k] + '</span><span class="v">' + tc[k] + '</span><span class="p">' + pctOf(tc[k], total) + '%</span></li>'; }).join('');
    var mini = ORDER.map(function (k) { return '<span>' + sq(fill(k)) + LBL[k] + '</span>'; }).join('');

    var h = '<header class="head in"><h1>Reporte general</h1><span class="muted">Estado de todos los casos de prueba de la app, por módulo.</span></header>';
    h += '<section class="kpis" aria-label="Cifras principales">' + kpis.map(function (k) {
      return '<div class="kpi t in"><span class="kpi-l">' + k[0] + '</span><span class="kpi-v">' + k[1] + '</span><span class="kpi-s">' + k[2] + '</span></div>';
    }).join('') + '</section>';
    h += '<section class="charts"><div class="card t in"><div class="card-head"><h2>Casos por estado</h2><span>Todos los módulos</span></div>' +
      '<div class="donut-wrap"><div class="donut"><svg width="168" height="168" viewBox="0 0 168 168" aria-hidden="true"><circle cx="84" cy="84" r="64" fill="none" stroke="var(--chip2)" stroke-width="20"/>' + donut + '</svg>' +
      '<div class="donut-c"><b>' + total + '</b><span>casos</span></div></div><ul class="legend">' + legend + '</ul></div></div>';
    h += '<div class="card t in"><div class="row-between"><div class="card-head"><h2>Estado por módulo</h2><span>Toca un módulo para ver sus casos</span></div><div class="mini-legend">' + mini + '</div></div><div class="mod-bars">';
    MODS.forEach(function (m) {
      var p = pctOf(m.total - m.c['Pendiente'], m.total);
      h += '<a href="#/' + esc(m.clave) + '" data-act="mod" data-mod="' + esc(m.clave) + '" class="mod-bar t" style="text-decoration:none"><span class="stack"><b>' + esc(m.nombre) + '</b><small>' + m.total + ' casos</small></span>' +
        '<span class="track">' + segs(m.c, m.total) + '</span><span class="stack r"><b>' + p + '%</b><small>ejecutado</small></span></a>';
    });
    h += '</div></div></section>';
    h += '<section><div class="card t in"><div class="card-head"><h2>Automatización</h2><span>Avance de los casos con Maestro</span></div><div class="auto-tot">' +
      AUTO.map(function (a) { return '<div><span class="l">' + sq(a[2]) + a[0] + '</span><span class="v">' + at[a[1]] + '</span></div>'; }).join('') + '</div><div class="auto-bars">';
    MODS.forEach(function (m) {
      h += '<div><div class="row-between"><b>' + esc(m.nombre) + '</b><span class="muted">' + m.total + ' casos</span></div><div class="track thin">' +
        AUTO.filter(function (a) { return m.a[a[1]] > 0; }).map(function (a) {
          return '<span class="bar" title="' + a[0] + ': ' + m.a[a[1]] + '" style="width:' + (m.a[a[1]] / m.total * 100) + '%;background:' + a[2] + '"></span>';
        }).join('') + '</div></div>';
    });
    h += '</div></div></section>';
    h += '<section><div class="card card-flat t in"><div class="card-head" style="padding:24px 24px 16px"><h2>Resumen por módulo</h2><span>Cantidad de casos en cada estado</span></div>' +
      '<div class="sum sum-head"><span>Módulo</span><span class="hide-md">Casos</span><span>Exitoso</span><span>Fallido</span><span class="hide-md">Bajo observación</span><span class="hide-md">Bloqueado</span><span class="hide-md">Pendiente</span><span>Avance</span></div>';
    MODS.forEach(function (m) {
      var p = pctOf(m.total - m.c['Pendiente'], m.total);
      h += '<div class="sum sum-row"><b>' + esc(m.nombre) + '</b><span class="hide-md">' + m.total + '</span><b class="c-ok">' + m.c['Pasa'] + '</b><b class="c-fail">' + m.c['Falla'] + '</b>' +
        '<b class="hide-md c-warn">' + m.c['Observación'] + '</b><b class="hide-md c-block">' + m.c['Bloqueado'] + '</b><b class="hide-md c-pend">' + m.c['Pendiente'] + '</b>' +
        '<span class="prog"><span class="prog-t"><span class="bar" style="width:' + p + '%"></span></span><span class="prog-p">' + p + '%</span></span></div>';
    });
    return h + '</div></section>';
  }

  /* Lista del módulo */
  function cur() { return MODS.filter(function (m) { return m.clave === S.mod; })[0]; }
  function filtered(m) {
    var q = S.q.toLowerCase().trim();
    return m.casos.filter(function (r) {
      return (S.filtro === 'Todos' || r.estado === S.filtro) && (S.autoF === 'Todas' || r.auto === S.autoF) &&
        (!q || r.id.toLowerCase().indexOf(q) >= 0 || plain(r.que).toLowerCase().indexOf(q) >= 0);
    });
  }

  function list() {
    var m = cur(), ej = m.total - m.c['Pendiente'];
    var h = '<header class="mhead in"><div class="head" style="min-width:0"><h1>' + esc(m.nombre) + '</h1><span class="desc">' + md(m.desc) + '</span></div></header>';
    h += '<div class="avance in"><div class="avance-top"><span>' + ej + ' de ' + m.total + ' casos ejecutados</span><b>' + pctOf(ej, m.total) + '%</b></div>' +
      '<div class="segs">' + segs(m.c, m.total, 'seg') + '</div><div class="stats">' +
      ORDER.map(function (k) { return '<span>' + sq(fill(k)) + LBL[k] + ' <b>' + m.c[k] + '</b></span>'; }).join('') + '</div></div>';
    h += '<section class="card card-flat in"><div class="tabs" role="tablist" aria-label="Filtrar por estado">' +
      ['Todos'].concat(ORDER).map(function (k) {
        var on = k === S.filtro;
        return '<button type="button" role="tab" aria-selected="' + on + '" class="tab t' + (on ? ' on' : '') + '" data-act="filtro" data-v="' + esc(k) + '">' +
          (k === 'Todos' ? 'Todos' : LBL[k]) + '<span class="n t">' + (k === 'Todos' ? m.total : m.c[k]) + '</span></button>';
      }).join('') + '</div>';
    var active = S.filtro !== 'Todos' || S.autoF !== 'Todas' || !!S.q;
    h += '<div class="filters"><label class="field grow">Buscar caso<span class="search">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>' +
      '<input id="q" type="search" placeholder="Nombre o ID del caso, ej. huella" value="' + esc(S.q) + '"></span></label>' +
      '<label class="field">Automatización<select id="autoF" class="sel">' +
      ['Todas', 'Automatizado', 'Automatizable', 'No automatizable'].map(function (o) { return '<option value="' + o + '"' + (o === S.autoF ? ' selected' : '') + '>' + o + '</option>'; }).join('') +
      '</select></label>' + (active ? '<button type="button" class="link-btn t fade" data-act="clear">Limpiar filtros</button>' : '') + '</div>';
    h += '<div class="row row-head"><span class="hide-sm">ID</span><span>Qué se prueba</span><span>Estado</span><span class="hide-md">Automatización</span><span class="hide-md">Última ejecución</span><span class="hide-sm"></span></div>';

    var rows = filtered(m), per = S.per, pages = Math.max(1, Math.ceil(rows.length / per));
    S.page = Math.min(Math.max(S.page, 1), pages);
    var pl = rows.slice((S.page - 1) * per, S.page * per), secs = [];
    pl.forEach(function (r) { if (secs.indexOf(r.seccion) < 0) secs.push(r.seccion); });
    secs.forEach(function (name) {
      var g = pl.filter(function (r) { return r.seccion === name; }), open = !S.collapsed[name];
      h += '<div><button type="button" class="grp t" data-act="grp" data-v="' + esc(name) + '" aria-expanded="' + open + '">' +
        '<svg class="t" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>' +
        '<span>' + esc(name || 'Sin sección') + '</span><span class="n">' + g.length + '</span></button>';
      if (open) g.forEach(function (r) {
        h += '<a href="#/' + esc(m.clave) + '/' + esc(r.id) + '" class="row case t in' + (r.id === S.sel ? ' sel' : '') + '" style="text-decoration:none">' +
          '<span class="id hide-sm">' + esc(r.id) + '</span><span class="que">' + md(r.que) + '</span><span>' + tag(r.estado) + '</span>' +
          '<span class="auto hide-md ' + autoCls(r.auto) + '">' + esc(r.auto) + '</span>' +
          '<span class="fecha hide-md' + (r.fecha ? '' : ' no') + '">' + (r.fecha ? fmt(r.fecha) : 'Sin ejecutar') + '</span>' +
          '<span class="chev t hide-sm">' + CHEV_R + '</span></a>';
      });
      h += '</div>';
    });
    if (!rows.length) h += '<div class="empty fade"><b>No hay casos para mostrar</b><span>' + (m.total ? 'Prueba con otro filtro o borra la búsqueda.' : 'Este módulo todavía no tiene casos.') + '</span></div>';
    var rango = rows.length ? ((S.page - 1) * per + 1) + '–' + Math.min(S.page * per, rows.length) : '0';
    h += '<div class="pager"><span>Mostrando ' + rango + ' de ' + rows.length + ' casos</span><div class="pager-r"><label>Casos por página<select id="per">' +
      [10, 25, 50, 100].map(function (n) { return '<option value="' + n + '"' + (n === per ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></label>' +
      '<div class="pager-n"><button type="button" class="pg t" data-act="page" data-v="-1" aria-label="Página anterior"' + (S.page <= 1 ? ' disabled' : '') + '>' + CHEV_L + '</button>' +
      '<span>Página ' + S.page + ' de ' + pages + '</span>' +
      '<button type="button" class="pg t" data-act="page" data-v="1" aria-label="Página siguiente"' + (S.page >= pages ? ' disabled' : '') + '>' + CHEV_R + '</button></div></div></div>';
    return h + '</section>';
  }

  /* Ficha del caso */
  function detail() {
    var m = cur(), r = m.casos.filter(function (x) { return x.id === S.sel; })[0];
    var nav = filtered(m); if (!nav.length || nav.indexOf(r) < 0) nav = m.casos;
    var idx = nav.indexOf(r), n = nav.length;
    var prev = nav[(idx - 1 + n) % n], next = nav[(idx + 1) % n];
    var k = KEY[r.estado] || 'pend', no = r.auto === 'No automatizable';
    var raz = D.razones[r.razon];
    var h = '<header class="dhead in"><nav class="crumb" aria-label="Ruta"><a href="#/' + esc(m.clave) + '" class="t">' + esc(m.nombre) + '</a><span class="sl">/</span><span class="cid">' + esc(r.id) + '</span></nav>' +
      tag(r.estado) + '<span class="spacer"></span><div class="dnav">' +
      '<a href="#/' + esc(m.clave) + '/' + esc(prev.id) + '" class="pg t" aria-label="Caso anterior">' + CHEV_L + '</a>' +
      '<span class="pos">' + (idx + 1) + ' / ' + n + '</span>' +
      '<a href="#/' + esc(m.clave) + '/' + esc(next.id) + '" class="pg t" aria-label="Caso siguiente">' + CHEV_R + '</a></div></header>';
    h += '<section class="detail in"><div class="dmain"><h1>' + md(r.que) + '</h1>' +
      '<div class="strip"><div><small>Sección</small><b>' + esc(r.seccion || 'Sin sección') + '</b></div><div><small>Última ejecución</small><b>' + (r.fecha ? fmt(r.fecha) : 'Sin ejecutar') + '</b></div></div>' +
      '<div class="blk"><h2 class="lbl">Pasos</h2><ol class="pasos">' +
      r.pasos.map(function (p, i) { return '<li><span class="n">' + (i + 1) + '</span><span class="tx">' + md(p) + '</span></li>'; }).join('') + '</ol></div>';
    if (r.datos) h += '<div class="blk" style="gap:10px"><h2 class="lbl">Datos</h2><div class="datos">' + md(r.datos) + '</div></div>';
    h += '<div class="results"><div class="res"><h2 class="lbl">Resultado esperado</h2><span class="tx">' + md(r.esp) + '</span></div>' +
      '<div class="res obt k-' + k + '"><h2 class="lbl">Resultado obtenido</h2><span class="tx">' + (r.obt ? md(r.obt) : 'Todavía no se ejecuta.') + '</span></div></div></div>';
    h += '<aside class="dside"><div><h2 class="lbl">Estado</h2>' + tag(r.estado) + '</div>' +
      '<div style="gap:8px"><h2 class="lbl">Automatización</h2><span class="auto-d ' + autoCls(r.auto) + '">' + esc(r.auto) + '</span>';
    if (no) {
      h += '<button type="button" class="why t" data-act="razon" aria-expanded="' + S.razon + '">ver por qué</button>';
      if (S.razon) h += '<div class="razon in">' + (raz ? (raz.titulo ? '<strong>' + esc(raz.titulo) + '.</strong> ' : '') + md(raz.texto) : 'Necesita a una persona frente al teléfono.') + '</div>';
    }
    return h + '</div></aside></section>';
  }

  function render() {
    document.documentElement.setAttribute('data-theme', S.theme);
    var body = S.view === 'report' ? report() : S.view === 'list' ? list() : detail();
    app.innerHTML = '<div class="shell' + (S.mini ? ' mini' : '') + '">' + side() + '<main class="main">' + body + '</main></div>';
  }

  function route() {
    var p = decodeURIComponent(location.hash.replace(/^#\/?/, '')).split('/');
    var m = MODS.filter(function (x) { return x.clave === p[0]; })[0];
    var prevView = S.view + S.sel;
    if (!m) { S.view = 'report'; }
    else {
      if (S.mod !== m.clave) { S.mod = m.clave; S.filtro = 'Todos'; S.autoF = 'Todas'; S.q = ''; S.page = 1; S.collapsed = {}; S.sel = null; }
      var c = p[1] && m.casos.filter(function (x) { return x.id === p[1]; })[0];
      if (c) { if (S.sel !== c.id) S.razon = false; S.view = 'detail'; S.sel = c.id; } else S.view = 'list';
    }
    render();
    if (prevView !== S.view + S.sel) window.scrollTo(0, 0);
  }

  app.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act]'); if (!t) return;
    var a = t.getAttribute('data-act'), v = t.getAttribute('data-v');
    if (a === 'mod') { if (S.mod === t.getAttribute('data-mod')) { S.filtro = 'Todos'; S.page = 1; } return; }
    if (a === 'side') { S.mini = !S.mini; save('mini', S.mini ? '1' : '0'); }
    else if (a === 'theme') { S.theme = S.theme === 'dark' ? 'light' : 'dark'; save('theme', S.theme); }
    else if (a === 'filtro') { S.filtro = v; S.page = 1; }
    else if (a === 'clear') { S.filtro = 'Todos'; S.autoF = 'Todas'; S.q = ''; S.page = 1; }
    else if (a === 'grp') { S.collapsed[v] = !S.collapsed[v]; }
    else if (a === 'page') { S.page += Number(v); }
    else if (a === 'razon') { S.razon = !S.razon; }
    render();
  });
  app.addEventListener('input', function (e) {
    if (e.target.id !== 'q') return;
    S.q = e.target.value; S.page = 1;
    var pos = e.target.selectionStart;
    render();
    var q = document.getElementById('q');
    if (q) { q.focus(); try { q.setSelectionRange(pos, pos); } catch (er) { /* sin cursor */ } }
  });
  app.addEventListener('change', function (e) {
    if (e.target.id === 'autoF') { S.autoF = e.target.value; S.page = 1; render(); }
    else if (e.target.id === 'per') { S.per = Number(e.target.value); S.page = 1; render(); }
  });
  window.addEventListener('hashchange', route);
  route();
})();
