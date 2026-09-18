// 3D tilt + hologram interaction — mengikuti gerakan kursor, mirip depth-effect di apple.com
(function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    // --- 3D tilt (rotateX/rotateY pada elemen itu sendiri) ---
    function attachTilt(el, strength) {
        let rect = null;

        function onEnter() {
            rect = el.getBoundingClientRect();
            el.style.transition = 'transform 0.15s ease-out';
        }

        function onMove(e) {
            if (!rect) rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            const rotateY = x * strength;
            const rotateX = -y * strength;
            el.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }

        function onLeave() {
            el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg)';
            rect = null;
        }

        el.addEventListener('pointerenter', onEnter);
        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerleave', onLeave);
    }

    // --- Hologram sheen (mengisi --hx/--hy agar gradien .holo::after ikut kursor) ---
    function attachHologram(el) {
        let rect = null;

        function onEnter() {
            rect = el.getBoundingClientRect();
        }

        function onMove(e) {
            if (!rect) rect = el.getBoundingClientRect();
            const px = ((e.clientX - rect.left) / rect.width) * 100;
            const py = ((e.clientY - rect.top) / rect.height) * 100;
            el.style.setProperty('--hx', `${px}%`);
            el.style.setProperty('--hy', `${py}%`);
        }

        function onLeave() {
            rect = null;
            el.style.setProperty('--hx', '50%');
            el.style.setProperty('--hy', '50%');
        }

        el.addEventListener('pointerenter', onEnter);
        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerleave', onLeave);
    }

    // Kartu bento: tilt 3D
    document.querySelectorAll('.bento-card').forEach(card => attachTilt(card, 6));

    // Gambar hero utama (mis. iPhone 18 Pro): tilt lebih halus
    const heroImageWrap = document.querySelector('.hero-landscape-image');
    if (heroImageWrap) attachTilt(heroImageWrap, 4);

    // Semua elemen dengan class "holo" dapat efek hologram mengikuti kursor
    document.querySelectorAll('.holo').forEach(el => attachHologram(el));
})();