const githubUsername = 'deltafromx';

async function loadRepos() {
  try {
    const res = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated`);
    const repos = await res.json();
    const container = document.getElementById('projects-list');

    repos.slice(0, 6).forEach(repo => {
      const el = document.createElement('div');
      el.className = 'project';
      el.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || 'No description available'}</p>
      `;

      // Сделать весь блок кликабельным
      el.addEventListener('click', () => {
        window.open(repo.html_url, '_blank');
      });

      container.appendChild(el);
    });

    // Обновить видимость (для появления)
    handleScroll();
  } catch (e) {
    console.error('Ошибка при загрузке проектов:', e);
  }
}

function handleScroll() {
  const elements = document.querySelectorAll('.project');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add('visible');
    }
  });
}

// Parallax Background Scroll
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  const hero = document.querySelector('#home');
  hero.style.setProperty('--bg-position', `${scrollY * 0.4}px`);
  hero.style.backgroundPositionY = `${scrollY * 0.4}px`;

  handleScroll();
});

// Init
loadRepos();
window.addEventListener('scroll', handleScroll);
const texts = [
  'delta["fromx"]',
  'known as @anytcp',
  'changing the world'
];

const typingElement = document.getElementById('typing');
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentText = texts[textIndex];
  if (isDeleting) {
    charIndex--;
    typingElement.textContent = charIndex === 0 ? ' ' : currentText.slice(0, charIndex);
  } else {
    charIndex++;
    typingElement.textContent = currentText.slice(0, charIndex);
  }

  let delay = isDeleting ? 50 : 100; // скорость печати

  if (!isDeleting && charIndex === currentText.length) {
    delay = 1500; // пауза перед удалением
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length; // переход к следующему тексту
    delay = 0; // пауза перед печатью нового текста
  }

  setTimeout(type, delay);
}

// Запуск
type();
