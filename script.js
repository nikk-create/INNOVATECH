// Animation 3D avec Three.js (Globe rotatif avec connexions)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('hero-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Globe
const geometry = new THREE.SphereGeometry(5, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x00FFFF, wireframe: true });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Connexions (lignes)
const linesGeometry = new THREE.BufferGeometry();
const positions = [];
for (let i = 0; i < 100; i++) {
    positions.push((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20);
}
linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
const linesMaterial = new THREE.LineBasicMaterial({ color: 0xFF6B35 });
const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
scene.add(lines);

camera.position.z = 10;

function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    lines.rotation.x += 0.005;
    renderer.render(scene, camera);
}
animate();

// Redimensionnement
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Intersection Observer pour animations au scroll (optimisé)
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
sections.forEach(section => observer.observe(section));

// Fonction pour basculer les cartes flip
function toggleFlip(card) {
    card.classList.toggle('flipped');
}

// Menu Hamburger pour Mobile
document.addEventListener('DOMContentLoaded', function() {
    const navContainer = document.querySelector('nav .container');
    const navUl = document.querySelector('nav ul');

    // Créer le bouton hamburger
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<div></div><div></div><div></div>';

    // Créer le menu mobile
    const mobileMenu = document.createElement('ul');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = navUl.innerHTML;

    // Insérer le hamburger et le menu mobile
    navContainer.appendChild(hamburger);
    navContainer.appendChild(mobileMenu);

    // Toggle menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('show');
    });

    // Fermer le menu en cliquant sur un lien
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('show');
        });
    });

    // Bouton retour en haut
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Retour en haut');
    document.body.appendChild(backToTopBtn);

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Animation de chargement pour le hero
    const hero = document.getElementById('hero');
    const loader = document.createElement('div');
    loader.className = 'hero-loader';
    loader.innerHTML = '<div class="spinner"></div>';
    hero.appendChild(loader);

    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }, 2000);

    // Formulaire de contact
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const method = document.getElementById('method').value;
        const message = document.getElementById('message').value;

        const fullMessage = `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`;

        if (method === 'email') {
            // Ouvrir le client email avec les données pré-remplies
            const subject = encodeURIComponent('Message de contact depuis le site');
            const body = encodeURIComponent(fullMessage);
            window.location.href = `mailto:protechinova@gmail.com?subject=${subject}&body=${body}`;
        } else if (method === 'whatsapp') {
            // Ouvrir WhatsApp avec le message pré-rempli
            const whatsappMessage = encodeURIComponent(fullMessage);
            window.open(`https://wa.me/2290159888703?text=${whatsappMessage}`, '_blank');
        }
    });

    // Formulaire newsletter
    document.getElementById('newsletterForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('newsletterEmail').value;
        alert(`Merci de vous être inscrit avec ${email}! Nous vous tiendrons informé de nos dernières actualités.`);
        document.getElementById('newsletterForm').reset();
    });
});
