

/* KAJLA DIDI - CINEMATIC ANIMATION ENGINE */

window.KajlaAnimation = {
  mount(container) {
    if (!container) return;

    container.innerHTML = `
      <div class="kajla-stage">
        <canvas id="kajlaCanvas"></canvas>
        <div class="kajla-overlay">
          <h1 class="kajla-title">কাজলা দিদি</h1>
          <p class="kajla-poem-line">
            বাঁশ-বাগানের মাথার উপর চাঁদ উঠেছে ওই...
          </p>
        </div>
      </div>
    `;

    const canvas = container.querySelector("#kajlaCanvas");
    const ctx = canvas.getContext("2d");

    let w, h, frame = 0;
    let fireflies = [];

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      w = rect.width;
      h = rect.height;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      fireflies = Array.from({ length: 35 }, () => ({
        x: Math.random() * w,
        y: h * (.35 + Math.random() * .5),
        phase: Math.random() * 10,
        speed: .3 + Math.random() * .8
      }));
    }

    function draw() {
      frame += 0.012;
      ctx.clearRect(0, 0, w, h);

      // Night sky
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, "#101c35");
      sky.addColorStop(.65, "#35475b");
      sky.addColorStop(1, "#65715d");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      // Stars
      for (let i = 0; i < 70; i++) {
        const x = (i * 137) % w;
        const y = (i * 71) % (h * .55);
        const glow = .35 + Math.sin(frame * 2 + i) * .25;
        ctx.fillStyle = `rgba(255,255,220,${glow})`;
        ctx.fillRect(x, y, 2, 2);
      }

      // Moon
      const mx = w * .72;
      const my = h * .22;
      const mr = Math.min(w, h) * .075;

      const glow = ctx.createRadialGradient(mx, my, 2, mx, my, mr * 2.8);
      glow.addColorStop(0, "rgba(255,230,170,.35)");
      glow.addColorStop(1, "rgba(255,230,170,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(mx - mr * 3, my - mr * 3, mr * 6, mr * 6);

      ctx.beginPath();
      ctx.arc(mx, my, mr, 0, Math.PI * 2);
      ctx.fillStyle = "#fff0c4";
      ctx.fill();

      // Distant village landscape
      ctx.fillStyle = "#263e38";
      ctx.beginPath();
      ctx.moveTo(0, h * .59);
      ctx.quadraticCurveTo(w * .25, h * .46, w * .48, h * .6);
      ctx.quadraticCurveTo(w * .75, h * .48, w, h * .58);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.fill();

      // Bamboo grove
      for (let i = 0; i < 17; i++) {
        const x = i * w / 15 - 10;
        const height = h * (.28 + (i % 4) * .045);

        ctx.strokeStyle = "#152d27";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(x, h * .7);
        ctx.quadraticCurveTo(
          x + Math.sin(frame + i) * 12,
          h * .3,
          x + Math.sin(frame + i) * 20,
          h - height
        );
        ctx.stroke();

        ctx.strokeStyle = "rgba(160,180,110,.3)";
        ctx.lineWidth = 1.5;

        for (let j = 1; j < 5; j++) {
          const yy = h * .7 - j * height / 5;
          ctx.beginPath();
          ctx.moveTo(x - 4, yy);
          ctx.lineTo(x + 4, yy);
          ctx.stroke();
        }
      }

      // Pond
      const pondY = h * .73;
      const water = ctx.createLinearGradient(0, pondY, 0, h);
      water.addColorStop(0, "#294e51");
      water.addColorStop(1, "#101f2b");
      ctx.fillStyle = water;
      ctx.fillRect(0, pondY, w, h - pondY);

      // Moon reflection
      for (let i = 0; i < 12; i++) {
        const rw = 15 + Math.sin(frame * 2 + i) * 8;
        const rx = mx + Math.sin(frame * 2 + i) * 18;
        const ry = pondY + 12 + i * 13;

        ctx.fillStyle = `rgba(255,225,170,${.12 + i * .008})`;
        ctx.fillRect(rx - rw / 2, ry, rw, 2);
      }

      // Water ripples
      for (let i = 0; i < 8; i++) {
        const x = (i * 157 + frame * 18) % w;
        const y = pondY + 25 + (i * 29) % Math.max(30, h - pondY - 30);

        ctx.beginPath();
        ctx.ellipse(
          x, y,
          8 + (frame * 8 + i * 7) % 25,
          2, 0, 0, Math.PI * 2
        );
        ctx.strokeStyle = "rgba(190,220,190,.18)";
        ctx.stroke();
      }

      // Fireflies
      fireflies.forEach(f => {
        f.phase += .025 * f.speed;
        f.x += Math.sin(f.phase) * .35;
        f.y += Math.cos(f.phase * .7) * .2;

        const alpha = .25 + (Math.sin(f.phase * 2) + 1) * .3;

        ctx.beginPath();
        ctx.arc(f.x, f.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,235,130,${alpha})`;
        ctx.shadowBlur = 14;
        ctx.shadowColor = "#ffe58a";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    draw();
  }
};
