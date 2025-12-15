// Парсер сценария. Читает исходный текстовый файл и превращает строки в главы новеллы.
// Благодаря этому текст в игре всегда совпадает с содержимым файла
// «Окончательное решение демонического вопроса.txt».

const SOURCE_PATH = './Окончательное решение демонического вопроса.txt';

const isBackgroundLine = (line) => line.trim().startsWith(':');
const extractBackground = (line) => line.replace(':', '').trim();
const extractSpeakerAndText = (line) => {
  const match = line.match(/^\s*\[(.+?)\]\s*(.*)$/);
  if (!match) return { speaker: 'Нарратор', text: line.trim() };
  const [, speaker, text] = match;
  return { speaker: speaker.trim() || 'Нарратор', text: text || '...' };
};

const pushLine = (lines, background, line) => {
  if (!line.trim()) return;
  if (isBackgroundLine(line)) return;
  const { speaker, text } = extractSpeakerAndText(line);
  lines.push({ background, speaker, text });
};

export const loadStory = async () => {
  const response = await fetch(SOURCE_PATH);
  const raw = await response.text();
  const lines = raw.split(/\r?\n/);

  const chapter = {
    id: 'source',
    title: 'Окончательное решение демонического вопроса',
    lines: [],
  };

  let currentBackground = null;
  for (const line of lines) {
    if (!line.trim()) continue;
    if (isBackgroundLine(line)) {
      currentBackground = extractBackground(line);
      continue;
    }
    pushLine(chapter.lines, currentBackground, line);
  }

  return [chapter];
};
