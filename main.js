import { storyChapters } from './storyData.js';
import { backgrounds, sprites, fallbackBackground, fallbackSprite } from './assets.js';

class NovelEngine {
  constructor({ stageEl, overlayEl, speakerEl, textEl }) {
    this.stageEl = stageEl;
    this.overlayEl = overlayEl;
    this.speakerEl = speakerEl;
    this.textEl = textEl;
    this.chapterIndex = 0;
    this.lineIndex = 0;
    this.story = storyChapters;
    this.renderLine();
    this.bindControls();
  }

  currentLine() {
    return this.story[this.chapterIndex].lines[this.lineIndex];
  }

  setBackground(name) {
    const texture = backgrounds[name];
    const fallback = fallbackBackground;
    const url = texture
      ? `url(${texture}), linear-gradient(135deg, #1a2234, #0f111a)`
      : `url(${fallback})`;
    this.stageEl.style.backgroundImage = url;
    this.stageEl.dataset.background = name || 'Unknown';
  }

  setSprites(objects = []) {
    this.overlayEl.innerHTML = '';
    objects.forEach((obj, index) => {
      const spriteWrap = document.createElement('div');
      spriteWrap.className = 'sprite';
      spriteWrap.style.left = `${30 + index * 25}%`;

      const img = document.createElement('img');
      const src = sprites[obj.texture] || sprites.__fallback || fallbackSprite;
      img.src = src;
      img.alt = obj.texture;
      img.onerror = () => {
        img.onerror = null;
        img.src = sprites.__fallback || fallbackSprite;
      };
      spriteWrap.appendChild(img);

      const label = document.createElement('div');
      label.className = 'label';
      label.textContent = obj.label || obj.texture || '???';
      spriteWrap.appendChild(label);

      this.overlayEl.appendChild(spriteWrap);
    });
  }

  renderLine() {
    const chapter = this.story[this.chapterIndex];
    const line = chapter.lines[this.lineIndex];
    if (!line) return;

    if (line.background) {
      this.setBackground(line.background);
    } else {
      this.setBackground(null);
    }

    this.setSprites(line.objects || []);

    this.speakerEl.textContent = line.speaker || chapter.title || 'Нарратор';
    this.textEl.textContent = line.text || '';
  }

  next() {
    const chapter = this.story[this.chapterIndex];
    if (this.lineIndex < chapter.lines.length - 1) {
      this.lineIndex += 1;
    } else if (this.chapterIndex < this.story.length - 1) {
      this.chapterIndex += 1;
      this.lineIndex = 0;
    }
    this.renderLine();
  }

  prev() {
    if (this.lineIndex > 0) {
      this.lineIndex -= 1;
    } else if (this.chapterIndex > 0) {
      this.chapterIndex -= 1;
      this.lineIndex = this.story[this.chapterIndex].lines.length - 1;
    }
    this.renderLine();
  }

  bindControls() {
    document.getElementById('next').addEventListener('click', () => this.next());
    document.getElementById('prev').addEventListener('click', () => this.prev());
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Space' || event.code === 'ArrowRight') {
        event.preventDefault();
        this.next();
      }
      if (event.code === 'ArrowLeft') {
        event.preventDefault();
        this.prev();
      }
    });
    document.querySelector('.game-shell').addEventListener('click', (event) => {
      if (event.target.classList.contains('button')) return;
      this.next();
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const engine = new NovelEngine({
    stageEl: document.getElementById('stage'),
    overlayEl: document.getElementById('overlay'),
    speakerEl: document.getElementById('speaker'),
    textEl: document.getElementById('text'),
  });
  window.__novel = engine;
});
