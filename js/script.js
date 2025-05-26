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
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            <p>${repo.description || 'No description available'}</p>
          `;
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
      const parallax = document.querySelector('#home::before'); // won't work directly
      document.querySelector('#home').style.setProperty('--scrollY', scrollY + 'px');

      // Apply parallax manually to pseudo-element
      const hero = document.querySelector('#home');
      hero.style.setProperty('--bg-position', `${scrollY * 0.4}px`);
      hero.style.backgroundPositionY = `${scrollY * 0.4}px`;

      handleScroll();
    });

    // Init
    loadRepos();
    window.addEventListener('scroll', handleScroll);
