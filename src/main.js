import './style.css'
import * as XLSX from 'xlsx';

const uploadSection = document.getElementById('uploadSection');
const confettiContainer = document.getElementById('confetti-container');

// Array of { text: "Display String", site: "NormalizedSite" }
let allData = [];
// Array of strings (filtered) used for spinning
let participants = [];
let isSpinning = false;

const fileInput = document.getElementById('fileInput');

const controls = document.getElementById('controls');
const spinBtn = document.getElementById('spinBtn');
const winnerDisplay = document.getElementById('winnerDisplay');
// factorySelect removed
fileInput.addEventListener('change', handleFileUpload);
spinBtn.addEventListener('click', startSpin);
// factorySelect.addEventListener('change', filterParticipants); // Removed

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;



  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      if (!workbook.SheetNames.length) {
        throw new Error("Excel file has no sheets.");
      }

      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Convert to JSON with header option to use keys
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: "A" });

      if (!jsonData || jsonData.length === 0) {
        throw new Error("Sheet is empty or could not be parsed.");
      }

      allData = jsonData.slice(1).map(row => {
        // Read Columns A, C, D
        const colA = row['A'] || '';
        const colC = row['C'] || '';
        const colD = row['D'] || '';
        // Safely handle Column H (Site/Factory)
        let colH = (row['H'] || '').toString().trim().toUpperCase();

        if (!colA && !colC && !colD) return null; // Skip empty rows

        // Logic: Check by include (flexible for Thai text or extra info)
        let normalizedSite = 'OTHER';

        if (colH.includes('HOGT')) {
          normalizedSite = 'HOGT';
        } else if (colH.includes('HECT')) {
          normalizedSite = 'HECT';
        } else if (colH.includes('HSOT') || colH.includes('GDC')) {
          normalizedSite = 'HSOT';
        }

        return {
          text: `${colA} ${colC} ${colD} ${colH}`.trim(),
          site: normalizedSite
        };
      }).filter(p => p !== null);

      if (allData.length === 0) {
        alert("No valid participants found! Check Columns A, C, D.");
        return;
      }

      filterParticipants(); // Initial filter (ALL)

      controls.classList.remove('hidden');
      uploadSection.classList.add('hidden'); // Hide upload button
      console.log(`Loaded ${allData.length} participants.`);

    } catch (err) {
      console.error(err);
      alert("Error parsing file: " + err.message);
    }
  };
  reader.readAsArrayBuffer(file);
}

// Old filterParticipants removed

// Cyber Code Rain Setup
const canvas = document.createElement('canvas');
canvas.id = 'matrix-canvas';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let matrixInterval;
// Code snippets instead of random chars
const codeSnippets = [
  'function', 'return', 'const', 'let', 'var', 'if', 'else', 'for', 'while',
  'class', 'import', 'export', '=>', '{}', '[]', '()', ';', '//',
  'constructor', 'this.name', 'console.log', 'await', 'async', 'Promise',
  '0x00', '0xFF', '101010', 'null', 'undefined', 'NaN', 'void'
];

const fontSize = 16;
let columns = 0;
let drops = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize); // Dense columns
  drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100; // Start at random heights above screen
  }
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function startMatrix() {
  resizeCanvas(); // Ensure correct size
  document.body.classList.add('matrix-mode', 'cyber-glitch'); // Add glitch class

  // Recalculate columns based on dense spacing
  columns = Math.floor(canvas.width / fontSize);
  drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
  }

  if (matrixInterval) clearInterval(matrixInterval);
  matrixInterval = setInterval(drawScene, 50);
}
// --- HEXAGON PARTICLE SYSTEM ---
const hexagons = [];
const hexCount = 40; // Number of floating hexagons
const factories = ['HOGT', 'HECT', 'HSOT', 'HO', 'GDC']; // Factory list

class Hexagon {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 20 + 15; // Increased size for text
    this.speed = Math.random() * 2 + 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '#0057B8' : '#4C9EFF'; // Hoya Blue or Neon
    this.text = factories[Math.floor(Math.random() * factories.length)]; // Random Factory
    // Perspective movement logic (moving towards edges or center)
    this.dx = (Math.random() - 0.5) * 2;
    this.dy = (Math.random() - 0.5) * 2;
  }

  update() {
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;

    // Pulse opacity
    this.opacity += (Math.random() - 0.5) * 0.05;
    if (this.opacity < 0.1) this.opacity = 0.1;
    if (this.opacity > 0.6) this.opacity = 0.6;

    // Reset if out of bounds
    if (this.x < -50 || this.x > canvas.width + 50 || this.y < -50 || this.y > canvas.height + 50) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    const s = this.size;
    // Hexagon math
    for (let i = 0; i < 6; i++) {
      const angle = 2 * Math.PI / 6 * i;
      const x_i = this.x + s * Math.cos(angle);
      const y_i = this.y + s * Math.sin(angle);
      if (i === 0) ctx.moveTo(x_i, y_i);
      else ctx.lineTo(x_i, y_i);
    }
    ctx.closePath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = this.opacity;
    ctx.stroke();

    // Draw Text inside
    ctx.fillStyle = this.color;
    ctx.font = '10px "Share Tech Mono"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.text, this.x, this.y);

    ctx.globalAlpha = 1.0; // Reset
  }
}

// Initialize Hexagons
for (let i = 0; i < hexCount; i++) {
  hexagons.push(new Hexagon());
}

function drawScene() {
  // 1. Draw Background Fade
  ctx.fillStyle = 'rgba(5, 5, 20, 0.3)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Draw Hexagons (Reference Image: Floating Hexagons)
  hexagons.forEach(hex => {
    hex.update();
    hex.draw();
  });

  // 3. Draw Matrix Rain (Existing Code)
  drawMatrixValues();
}

function drawMatrixValues() {
  const fonts = ['"Share Tech Mono"', '"Courier New"', 'Consolas', 'Monospace', 'Arial'];

  for (let i = 0; i < drops.length; i++) {
    // Cyber Palette: Hoya Blue dominant
    const rand = Math.random();
    if (rand > 0.95) ctx.fillStyle = '#FFFFFF';       // White Glitch
    else if (rand > 0.6) ctx.fillStyle = '#4C9EFF';   // Neon Hoya Blue
    else if (rand > 0.3) ctx.fillStyle = '#0057B8';   // Deep Hoya Blue
    else ctx.fillStyle = '#549CCE';                   // Light Hoya Blue

    // Standardize Font Size to Grid to prevent gaps
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    ctx.font = `${fontSize}px ${randomFont}`;

    // Pick text: Use Participant Data if available (80% chance), else Code Snippet
    let text;
    if (participants.length > 0 && Math.random() > 0.2) {
      text = participants[Math.floor(Math.random() * participants.length)];
    } else {
      text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    }

    // Draw the text
    // Draw the text
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // Reset loop
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}


// --- REFINED LOGIC: REMOVED FILTER, ADDED MODAL ---

// Elements
const winnerModal = document.getElementById('winnerModal');
const modalWinnerName = document.getElementById('modalWinnerName');
const closeModalBtn = document.getElementById('closeModalBtn');

// Event Listeners for Modal
closeModalBtn.addEventListener('click', closeModal);

function closeModal() {
  winnerModal.classList.add('hidden');
  stopMatrix(); // Stop Matrix when closing modal
  isSpinning = false;
  spinBtn.disabled = false;
  winnerDisplay.textContent = "READY";
  winnerDisplay.classList.remove('winner', 'animate');
  document.body.classList.remove('winner-spotlight');
}


function filterParticipants() {
  // Logic Removed - defaults to ALL
  participants = allData.map(d => d.text);

  if (!isSpinning) {
    if (participants.length > 0) {
      winnerDisplay.textContent = "READY";
      spinBtn.disabled = false;
    } else {
      winnerDisplay.textContent = "NO DATA";
      spinBtn.disabled = true;
    }
  }
}

// Restored Matrix Logic
function stopMatrix() {
  document.body.classList.remove('matrix-mode', 'cyber-glitch');
  clearInterval(matrixInterval);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ... existing matrix setup ...

function startSpin() {
  if (isSpinning || participants.length === 0) return;

  isSpinning = true;
  spinBtn.disabled = true;
  winnerDisplay.classList.remove('winner');
  winnerDisplay.classList.add('animate');
  // congratsMessage.classList.add('hidden'); // Removed old messsage

  // Clear previous confetti
  confettiContainer.innerHTML = '';

  // Start Matrix Effect
  startMatrix();
  document.body.classList.add('searching'); // Start chaotic lights

  // Duration: Random between 5 - 6 seconds (Requested)
  let duration = Math.floor(Math.random() * (6000 - 5000 + 1) + 5000);
  let intervalTime = 50;
  let elapsed = 0;

  const interval = setInterval(() => {
    // Show random names in the main display while spinning
    const randomIndex = Math.floor(Math.random() * participants.length);
    winnerDisplay.textContent = participants[randomIndex];

    elapsed += intervalTime;

    if (elapsed >= duration) {
      clearInterval(interval);
      finalizeWinner();
    }
  }, intervalTime);
}

function finalizeWinner() {
  // Select Winner
  const finalIndex = Math.floor(Math.random() * participants.length);
  const winner = participants[finalIndex];

  // 1. Update Display (Background)
  winnerDisplay.textContent = winner;
  winnerDisplay.classList.remove('animate');
  winnerDisplay.classList.add('winner');

  // 2. Show Modal (Winner Card)
  modalWinnerName.textContent = winner;
  winnerModal.classList.remove('hidden');
  document.body.classList.remove('searching'); // Stop chaos
  document.body.classList.add('winner-spotlight'); // Focus lights

  // 3. Trigger Effects
  triggerConfetti();

  // 4. REMOVE WINNER FROM LIST (Requirement: "remove that line in excel" logic)
  // Remove from participants array
  const pIndex = participants.indexOf(winner);
  if (pIndex > -1) {
    participants.splice(pIndex, 1);
  }

  // Remove from allData array to prevent re-filtering inclusion
  const dIndex = allData.findIndex(d => d.text === winner);
  if (dIndex > -1) {
    allData.splice(dIndex, 1);
  }

  console.log(`Removed winner: ${winner}. Remaining: ${participants.length}`);

  // Disable if empty
  if (participants.length === 0) {
    winnerDisplay.textContent = "ALL WINNERS PICKED";
    spinBtn.disabled = true;
  }
}

function triggerConfetti() {
  // Hoya Brand Colors: Dark Blue, Light Blue, Neon variant, White
  const colors = ['#0057B8', '#549CCE', '#FFFFFF', '#4C9EFF'];

  for (let i = 0; i < 150; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');

    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
    confetti.style.opacity = Math.random();

    confettiContainer.appendChild(confetti);

    // Cleanup
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}
