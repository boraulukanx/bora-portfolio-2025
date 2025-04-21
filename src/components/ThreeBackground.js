import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const ThreeBackground = () => {
  const mountRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Görünürlük API'sini kullanarak sayfadan uzaklaşıldığında veya tab değiştiğinde animasyonları durdur
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Scene, camera, ve renderer kurulumu
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Mevcut DOM öğesindeki tüm çocuk elementleri temizle
    if (mountRef.current) {
      while (mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
      mountRef.current.appendChild(renderer.domElement);
    }

    // Daha basit ve şık yıldızlar
    const particleCount = 600;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Daha düzenli ve geniş dağılım
    for (let i = 0; i < particleCount; i++) {
      // Konum - geniş dağılım
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 80;

      positions[i * 3] = Math.cos(angle) * radius; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 70; // y
      positions[i * 3 + 2] = Math.sin(angle) * radius; // z

      // Renk - daha sade mavimsi-mor tonlar
      colors[i * 3] = 0.2 + Math.random() * 0.1; // r
      colors[i * 3 + 1] = 0.3 + Math.random() * 0.1; // g
      colors[i * 3 + 2] = 0.7 + Math.random() * 0.3; // b

      // Boyut
      sizes[i] = 0.5 + Math.random() * 0.5; // Daha belirgin ve düzenli
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    particles.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Parçacık materyali - daha parlak ve şık
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });

    // Parçacık sistemi
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Mouse takibi
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    // Throttle fonksiyonu
    const throttle = (func, limit) => {
      let inThrottle;
      return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    };

    const onDocumentMouseMove = throttle((event) => {
      mouseX = (event.clientX - window.innerWidth / 2) / 100;
      mouseY = (event.clientY - window.innerHeight / 2) / 100;
    }, 16); // ~60fps için throttle

    document.addEventListener("mousemove", onDocumentMouseMove, {
      passive: true,
    });

    // Pencere boyutu değiştiğinde
    const handleResize = throttle(() => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    }, 100);

    window.addEventListener("resize", handleResize, { passive: true });

    // Animasyon
    let animationFrameId;
    const animate = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      // Parçacıkları döndür
      targetX = mouseX * 0.1;
      targetY = mouseY * 0.1;

      // Daha yavaş ve zarif döndürme
      particleSystem.rotation.x += 0.0003;
      particleSystem.rotation.y += 0.0005;

      // Mouse hareketine göre rotasyonu yumuşat
      particleSystem.rotation.x += (targetY - particleSystem.rotation.x) * 0.01;
      particleSystem.rotation.y += (targetX - particleSystem.rotation.y) * 0.01;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Temizleme
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", onDocumentMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      cancelAnimationFrame(animationFrameId);

      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Memory leak önlemek için kaynakları temizle
      particles.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-[-1]" />;
};

export default ThreeBackground;
