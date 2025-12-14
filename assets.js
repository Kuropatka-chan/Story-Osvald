// Файл отвечает за сопоставление логических названий сцен и спрайтов с фактическими текстурами.
// Текстуры можно положить рядом и обновить пути, сохранив те же ключи.

const createPlaceholder = (label, colorFrom, colorTo, width, height) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${colorFrom}"/><stop offset="100%" stop-color="${colorTo}"/></linearGradient></defs>` +
    `<rect width="100%" height="100%" fill="url(#g)"/>` +
    `<text x="50%" y="50%" font-family="Montserrat, Arial, sans-serif" font-size="${Math.min(width, height) / 10}" fill="#e8ecf3" opacity="0.9" text-anchor="middle" dominant-baseline="middle">${label}</text>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const fallbackBackground = createPlaceholder('Нет фона', '#1a2234', '#0f111a', 1280, 720);
export const fallbackSprite = createPlaceholder('Нет спрайта', '#143040', '#0a1822', 320, 420);

export const backgrounds = {
  UpperTown1: createPlaceholder('UpperTown1', '#23314d', '#0f182a', 1280, 720),
  LowerTown1: createPlaceholder('LowerTown1', '#262f2e', '#0f1314', 1280, 720),
  Home1: createPlaceholder('Home1', '#2f2430', '#140c18', 1280, 720),
  LowerTown2: createPlaceholder('LowerTown2', '#2b1f1f', '#0f0b0b', 1280, 720),
  Jobtown: createPlaceholder('Jobtown', '#243223', '#0c170b', 1280, 720),
  Podzalupie: createPlaceholder('Podzalupie', '#1f222c', '#090b10', 1280, 720),
};

export const sprites = {
  Osvald1: createPlaceholder('Освальд', '#26425a', '#0e2433', 320, 420),
  Osvald2: createPlaceholder('Освальд', '#26425a', '#0e2433', 320, 420),
  Osvald3: createPlaceholder('Освальд', '#26425a', '#0e2433', 320, 420),
  Osvald4: createPlaceholder('Освальд', '#26425a', '#0e2433', 320, 420),
  Mom1: createPlaceholder('Мама', '#3d2c42', '#1b0f23', 320, 420),
  Karl1: createPlaceholder('Карл', '#223a2f', '#0c1d13', 320, 420),
  Dryg1: createPlaceholder('Дрыг', '#3c2b28', '#180e0b', 320, 420),
  Dryg2: createPlaceholder('Дрыг', '#3c2b28', '#180e0b', 320, 420),
  loh: createPlaceholder('Бродяга', '#383b2c', '#16170d', 320, 420),
  npc1: createPlaceholder('NPC', '#2e373f', '#10161b', 320, 420),
  war1: createPlaceholder('Страж', '#253546', '#0d1723', 320, 420),
  Shmir1: createPlaceholder('Шмир', '#332a1f', '#151008', 320, 420),
  Laur1: createPlaceholder('Лаур', '#263243', '#0d1520', 320, 420),
  Ganud1: createPlaceholder('Гануд', '#2b2e3f', '#11121b', 320, 420),
  Ganud2: createPlaceholder('Гануд', '#2b2e3f', '#11121b', 320, 420),
  __fallback: fallbackSprite,
};
