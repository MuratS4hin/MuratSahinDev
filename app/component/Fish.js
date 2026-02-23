// Fish Class - Different types of animated fish
class Fish {
  constructor(canvas, ctx, type) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.type = type || 'tropical';
    this.init();
  }

  init() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.direction = Math.random() > 0.5 ? 1 : -1;
    this.bobOffset = Math.random() * Math.PI * 2;
    
    // Different fish types with unique properties
    if (this.type === 'tropical') {
      this.size = Math.random() * 15 + 12;
      this.speed = Math.random() * 1.5 + 0.8;
      this.color = `hsla(${Math.random() * 60 + 10}, 85%, 60%, 0.9)`; // Orange/Yellow
    } else if (this.type === 'clownfish') {
      this.size = Math.random() * 12 + 10;
      this.speed = Math.random() * 1.2 + 0.6;
      this.color = '#FF6B35';
      this.stripeColor = '#FFFFFF';
    } else if (this.type === 'angelfish') {
      this.size = Math.random() * 20 + 15;
      this.speed = Math.random() * 1 + 0.4;
      this.color = `hsla(${Math.random() * 40 + 180}, 70%, 60%, 0.8)`; // Blue/Teal
    } else if (this.type === 'neon') {
      this.size = Math.random() * 8 + 6;
      this.speed = Math.random() * 2 + 1;
      this.color = `hsla(${Math.random() * 20 + 200}, 90%, 65%, 0.9)`; // Bright blue
      this.glowColor = `hsla(${Math.random() * 20 + 200}, 90%, 65%, 0.4)`;
    } else if (this.type === 'goldfish') {
      this.size = Math.random() * 18 + 14;
      this.speed = Math.random() * 0.8 + 0.4;
      this.color = `hsla(${Math.random() * 30 + 30}, 95%, 55%, 0.85)`; // Gold/Orange
    } else if (this.type === 'shark') {
      this.size = Math.random() * 30 + 25;
      this.speed = Math.random() * 2 + 1.5;
      this.color = '#4a5568'; // Dark gray
      this.y = Math.random() * (this.canvas.height * 0.6) + 50; // Keep sharks in upper-middle area
    }
  }

  draw() {
    if (this.type === 'neon') {
      this.drawNeonFish();
    } else if (this.type === 'clownfish') {
      this.drawClownfish();
    } else if (this.type === 'angelfish') {
      this.drawAngelfish();
    } else if (this.type === 'goldfish') {
      this.drawGoldfish();
    } else if (this.type === 'shark') {
      this.drawShark();
    } else {
      this.drawTropicalFish();
    }
  }

  drawTropicalFish() {
    const ctx = this.ctx;
    ctx.fillStyle = this.color;
    
    // Body
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.size, this.size / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tail
    ctx.beginPath();
    const tailOffset = this.direction === 1 ? -this.size : this.size;
    ctx.moveTo(this.x + tailOffset, this.y);
    ctx.lineTo(this.x + tailOffset + (this.direction === 1 ? -10 : 10), this.y - 8);
    ctx.lineTo(this.x + tailOffset + (this.direction === 1 ? -10 : 10), this.y + 8);
    ctx.closePath();
    ctx.fill();

    // Eye
    ctx.fillStyle = 'white';
    const eyeOffset = this.direction === 1 ? this.size / 2 : -this.size / 2;
    ctx.beginPath();
    ctx.arc(this.x + eyeOffset, this.y - 2, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  drawNeonFish() {
    const ctx = this.ctx;
    // Glow effect
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.glowColor;
    
    ctx.fillStyle = this.color;
    
    // Small streamlined body
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.size, this.size / 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Small tail
    ctx.beginPath();
    const tailOffset = this.direction === 1 ? -this.size : this.size;
    ctx.moveTo(this.x + tailOffset, this.y);
    ctx.lineTo(this.x + tailOffset + (this.direction === 1 ? -5 : 5), this.y - 4);
    ctx.lineTo(this.x + tailOffset + (this.direction === 1 ? -5 : 5), this.y + 4);
    ctx.closePath();
    ctx.fill();

    ctx.shadowBlur = 0;
    
    // Eye
    ctx.fillStyle = 'white';
    const eyeOffset = this.direction === 1 ? this.size / 2 : -this.size / 2;
    ctx.beginPath();
    ctx.arc(this.x + eyeOffset, this.y, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  drawClownfish() {
    const ctx = this.ctx;
    ctx.fillStyle = this.color;
    
    // Body
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.size, this.size / 1.8, 0, 0, Math.PI * 2);
    ctx.fill();

    // White stripes
    ctx.fillStyle = this.stripeColor;
    const stripeWidth = this.size / 5;
    const dir = this.direction;
    
    // Stripe 1
    ctx.fillRect(
      this.x - stripeWidth / 2, 
      this.y - this.size / 1.8, 
      stripeWidth, 
      this.size / 0.9
    );
    
    // Stripe 2
    ctx.fillRect(
      this.x + (dir === 1 ? this.size / 2 : -this.size / 2) - stripeWidth / 2, 
      this.y - this.size / 1.8, 
      stripeWidth, 
      this.size / 0.9
    );

    // Tail
    ctx.fillStyle = this.color;
    ctx.beginPath();
    const tailOffset = dir === 1 ? -this.size : this.size;
    ctx.moveTo(this.x + tailOffset, this.y);
    ctx.lineTo(this.x + tailOffset + (dir === 1 ? -8 : 8), this.y - 7);
    ctx.lineTo(this.x + tailOffset + (dir === 1 ? -8 : 8), this.y + 7);
    ctx.closePath();
    ctx.fill();

    // Eye
    ctx.fillStyle = 'black';
    const eyeOffset = dir === 1 ? this.size / 2.5 : -this.size / 2.5;
    ctx.beginPath();
    ctx.arc(this.x + eyeOffset, this.y - 2, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  drawAngelfish() {
    const ctx = this.ctx;
    ctx.fillStyle = this.color;
    
    // Tall body
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.size / 1.5, this.size, 0, 0, Math.PI * 2);
    ctx.fill();

    // Top fin
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.size / 3, this.y - this.size * 1.2);
    ctx.lineTo(this.x + this.size / 3, this.y - this.size * 1.2);
    ctx.closePath();
    ctx.fill();

    // Bottom fin
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.size / 3, this.y + this.size * 1.2);
    ctx.lineTo(this.x + this.size / 3, this.y + this.size * 1.2);
    ctx.closePath();
    ctx.fill();

    // Tail
    const dir = this.direction;
    ctx.beginPath();
    const tailOffset = dir === 1 ? -this.size / 1.5 : this.size / 1.5;
    ctx.moveTo(this.x + tailOffset, this.y);
    ctx.lineTo(this.x + tailOffset + (dir === 1 ? -12 : 12), this.y - 10);
    ctx.lineTo(this.x + tailOffset + (dir === 1 ? -12 : 12), this.y + 10);
    ctx.closePath();
    ctx.fill();

    // Eye
    ctx.fillStyle = 'white';
    const eyeOffset = dir === 1 ? this.size / 3 : -this.size / 3;
    ctx.beginPath();
    ctx.arc(this.x + eyeOffset, this.y - this.size / 3, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  drawGoldfish() {
    const ctx = this.ctx;
    ctx.fillStyle = this.color;
    
    // Round body
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();

    // Fancy tail
    const dir = this.direction;
    const tailOffset = dir === 1 ? -this.size : this.size;
    
    ctx.beginPath();
    ctx.moveTo(this.x + tailOffset, this.y);
    ctx.lineTo(this.x + tailOffset + (dir === 1 ? -15 : 15), this.y - 12);
    ctx.lineTo(this.x + tailOffset + (dir === 1 ? -12 : 12), this.y);
    ctx.lineTo(this.x + tailOffset + (dir === 1 ? -15 : 15), this.y + 12);
    ctx.closePath();
    ctx.fill();

    // Top fin
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.size);
    ctx.lineTo(this.x - 5, this.y - this.size - 8);
    ctx.lineTo(this.x + 5, this.y - this.size - 8);
    ctx.closePath();
    ctx.fill();

    // Eye
    ctx.fillStyle = 'black';
    const eyeOffset = dir === 1 ? this.size / 2 : -this.size / 2;
    ctx.beginPath();
    ctx.arc(this.x + eyeOffset, this.y - 4, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  drawShark() {
    const ctx = this.ctx;
    ctx.fillStyle = this.color;
    
    // Body - larger and more streamlined
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.size * 1.3, this.size * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Dorsal fin
    ctx.beginPath();
    ctx.moveTo(this.x - this.size * 0.3, this.y - this.size * 0.6);
    ctx.lineTo(this.x - this.size * 0.1, this.y - this.size * 1.3);
    ctx.lineTo(this.x, this.y - this.size * 0.6);
    ctx.closePath();
    ctx.fill();

    // Tail fin
    ctx.beginPath();
    const tailOffset = this.direction === 1 ? -this.size * 1.3 : this.size * 1.3;
    ctx.moveTo(this.x + tailOffset, this.y);
    ctx.lineTo(this.x + tailOffset + (this.direction === 1 ? -this.size * 1.2 : this.size * 1.2), this.y - this.size * 0.8);
    ctx.lineTo(this.x + tailOffset + (this.direction === 1 ? -this.size * 1.2 : this.size * 1.2), this.y + this.size * 0.8);
    ctx.closePath();
    ctx.fill();

    // Eye
    ctx.fillStyle = '#FFD700';
    const eyeOffset = this.direction === 1 ? this.size * 0.8 : -this.size * 0.8;
    ctx.beginPath();
    ctx.arc(this.x + eyeOffset, this.y - this.size * 0.3, 3, 0, Math.PI * 2);
    ctx.fill();

    // Gill lines
    ctx.strokeStyle = '#2d3748';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x - this.size * 0.5, this.y);
    ctx.lineTo(this.x - this.size * 0.6, this.y + this.size * 0.3);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(this.x - this.size * 0.3, this.y);
    ctx.lineTo(this.x - this.size * 0.4, this.y + this.size * 0.3);
    ctx.stroke();
  }

  update() {
    this.x += this.speed * this.direction;

    // Reset position if fish goes off-screen
    if (this.direction === 1 && this.x > this.canvas.width + 50) this.x = -50;
    if (this.direction === -1 && this.x < -50) this.x = this.canvas.width + 50;

    // Subtle bobbing motion
    this.bobOffset += 0.02;
    this.y += Math.sin(this.bobOffset) * 0.3;
    
    this.draw();
  }
}

export default Fish;
