import gsap from 'gsap';

// Magnetic Button Mouse Tracking Effect
export const initMagneticButton = (element, strength = 0.3) => {
  if (!element) return;

  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;

    gsap.to(element, {
      x,
      y,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.4)'
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// 3D Card Interactive Tilt Effect
export const init3DTiltCard = (cardElement, maxTilt = 12) => {
  if (!cardElement) return;

  const handleMouseMove = (e) => {
    const rect = cardElement.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const tiltX = (mouseY / height - 0.5) * -maxTilt;
    const tiltY = (mouseX / width - 0.5) * maxTilt;

    gsap.to(cardElement, {
      rotateX: tiltX,
      rotateY: tiltY,
      transformPerspective: 1000,
      scale: 1.04,
      duration: 0.25,
      ease: 'power1.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardElement, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  cardElement.addEventListener('mousemove', handleMouseMove);
  cardElement.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    cardElement.removeEventListener('mousemove', handleMouseMove);
    cardElement.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Floating Continuous Bobbing Physics
export const initFloatingPhysics = (element, distance = 14, duration = 3.5) => {
  if (!element) return;
  return gsap.to(element, {
    y: `-=${distance}`,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    duration
  });
};
