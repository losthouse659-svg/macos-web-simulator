// GLOBAL STATE
let zIndexCounter = 100;
let windows = {};

// BOOT SEQUENCE
window.addEventListener('DOMContentLoaded', () => {
  bootSequence();
});

function bootSequence() {
  const bootBar = document.getElementById('boot-bar');
  let width = 0;
  const interval = setInterval(() => {
    width += 2;
    bootBar.style.width = width + '%';
    if (width >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        document.getElementById('boot-screen').style.display = 'none';
        showLockScreen();
      }, 300);
    }
  }, 30);
}

function showLockScreen() {
  const lockScreen = document.getElementById('lock-screen');
  lockScreen.style.display = 'flex';
  updateLockScreenTime();
  setInterval(updateLockScreenTime, 1000);
  lockScreen.onclick = () => unlockScreen();
}

function updateLockScreenTime() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'long' });
  document.getElementById('lock-time').textContent = timeStr;
  document.getElementById('lock-date').textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
}

function unlockScreen() {
  document.getElementById('lock-screen').style.display = 'none';
  document.getElementById('desktop').style.display = 'block';
  initDesktop();
}

function lockMac() {
  closeAppleMenu();
  document.getElementById('desktop').style.display = 'none';
  document.getElementById('lock-screen').style.display = 'flex';
}

// DESKTOP INITIALIZATION
function initDesktop() {
  updateMenuTime();
  setInterval(updateMenuTime, 1000);
  
  // Apple menu toggle
  document.getElementById('apple-menu-btn').onclick = (e) => {
    e.stopPropagation();
    const dropdown = document.getElementById('apple-dropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  };
  
  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    document.getElementById('apple-dropdown').style.display = 'none';
  });
}

function updateMenuTime() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('cs-CZ', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  document.getElementById('menu-time').textContent = timeStr;
}

function closeAppleMenu() {
  document.getElementById('apple-dropdown').style.display = 'none';
}

// WINDOW MANAGEMENT
function openWindow(appName) {
  if (windows[appName]) {
    focusWindow(appName);
    return;
  }
  
  const win = document.createElement('div');
  win.className = 'mac-window focused';
  win.id = 'window-' + appName;
  win.style.left = (100 + Object.keys(windows).length * 30) + 'px';
  win.style.top = (80 + Object.keys(windows).length * 30) + 'px';
  win.style.width = '600px';
  win.style.height = '400px';
  win.style.zIndex = ++zIndexCounter;
  
  const appData = getAppData(appName);
  
  win.innerHTML = `
    <div class="window-titlebar">
      <button class="window-btn close" onclick="closeWindow('${appName}')"></button>
      <button class="window-btn min" onclick="minimizeWindow('${appName}')"></button>
      <button class="window-btn max" onclick="maximizeWindow('${appName}')"></button>
      <span class="window-title">${appData.title}</span>
    </div>
    <div class="window-body ${appData.bodyClass || ''}">${appData.content}</div>
  `;
  
  document.getElementById('windows-container').appendChild(win);
  windows[appName] = win;
  
  makeDraggable(win, appName);
  
  if (appData.onInit) appData.onInit(appName);
  
  win.onclick = () => focusWindow(appName);
}

function getAppData(appName) {
  const apps = {
    finder: {
      title: 'Finder',
      content: `
        <h3>Finder</h3>
        <p>M\u016fj Mac</p>
        <ul style="margin-top:16px;line-height:1.8">
          <li>\uD83D\uDCC1 Dokumenty</li>
          <li>\uD83D\uDCC1 Sta\u017Een\xe9 soubory</li>
          <li>\uD83D\uDCC1 Plocha</li>
          <li>\uD83D\uDCC1 Obr\xe1zky</li>
          <li>\uD83D\uDCC1 Videa</li>
        </ul>
      `
    },
    safari: {
      title: 'Safari',
      content: `
        <h3>Safari</h3>
        <input type="text" placeholder="Vyhledat nebo zadat adresu" style="width:100%;padding:10px;margin:16px 0;border:1px solid #ddd;border-radius:6px;font-size:14px">
        <div style="margin-top:20px">
          <h4>Obl\xedben\xe9</h4>
          <div style="display:flex;gap:12px;margin-top:12px;flex-wrap:wrap">
            <div style="padding:12px;background:#f5f5f5;border-radius:8px;cursor:pointer">Google</div>
            <div style="padding:12px;background:#f5f5f5;border-radius:8px;cursor:pointer">GitHub</div>
            <div style="padding:12px;background:#f5f5f5;border-radius:8px;cursor:pointer">YouTube</div>
          </div>
        </div>
      `
    },
    notes: {
      title: 'Pozn\xe1mky',
      content: `
        <h3>Nov\xe1 pozn\xe1mka</h3>
        <textarea style="width:100%;height:250px;margin-top:16px;padding:12px;border:1px solid #ddd;border-radius:6px;font-size:14px;font-family:inherit;resize:none" placeholder="Za\u010dn\u011bte ps\xe1t..."></textarea>
      `
    },
    terminal: {
      title: 'Termin\xe1l',
      bodyClass: 'terminal-body',
      content: `
        <div class="terminal-line"><span class="terminal-prompt">user@mac ~ %</span> echo "V\xedtejte v macOS Web Simulatoru!"</div>
        <div class="terminal-line">V\xedtejte v macOS Web Simulatoru!</div>
        <div class="terminal-line"><span class="terminal-prompt">user@mac ~ %</span> ls</div>
        <div class="terminal-line">Desktop  Documents  Downloads  Pictures  Videos</div>
        <div class="terminal-line"><span class="terminal-prompt">user@mac ~ %</span> </div>
      `
    },
    calculator: {
      title: 'Kalkula\u010dka',
      bodyClass: 'calc-body',
      content: `
        <div class="calc-display" id="calc-display">0</div>
        <div class="calc-buttons">
          <button class="calc-btn fn" onclick="calcClear()">C</button>
          <button class="calc-btn fn" onclick="calcToggleSign()">+/-</button>
          <button class="calc-btn fn" onclick="calcPercent()">%</button>
          <button class="calc-btn op" onclick="calcOp('/')">/</button>
          <button class="calc-btn num" onclick="calcNum(7)">7</button>
          <button class="calc-btn num" onclick="calcNum(8)">8</button>
          <button class="calc-btn num" onclick="calcNum(9)">9</button>
          <button class="calc-btn op" onclick="calcOp('*')">\xd7</button>
          <button class="calc-btn num" onclick="calcNum(4)">4</button>
          <button class="calc-btn num" onclick="calcNum(5)">5</button>
          <button class="calc-btn num" onclick="calcNum(6)">6</button>
          <button class="calc-btn op" onclick="calcOp('-')">-</button>
          <button class="calc-btn num" onclick="calcNum(1)">1</button>
          <button class="calc-btn num" onclick="calcNum(2)">2</button>
          <button class="calc-btn num" onclick="calcNum(3)">3</button>
          <button class="calc-btn op" onclick="calcOp('+')">+</button>
          <button class="calc-btn num zero" onclick="calcNum(0)">0</button>
          <button class="calc-btn num" onclick="calcDecimal()">.</button>
          <button class="calc-btn op" onclick="calcEquals()">=</button>
        </div>
      `,
      onInit: () => initCalculator()
    }
  };
  return apps[appName] || { title: appName, content: '<p>App not found</p>' };
}

function closeWindow(appName) {
  const win = windows[appName];
  if (win) {
    win.remove();
    delete windows[appName];
  }
}

function minimizeWindow(appName) {
  const win = windows[appName];
  if (win) {
    win.style.transform = 'scale(0)';
    win.style.opacity = '0';
    win.style.transition = 'all 0.3s';
    setTimeout(() => {
      win.style.display = 'none';
    }, 300);
  }
}

function maximizeWindow(appName) {
  // Toggle fullscreen
}

function focusWindow(appName) {
  Object.values(windows).forEach(w => w.classList.remove('focused'));
  const win = windows[appName];
  if (win) {
    win.classList.add('focused');
    win.style.zIndex = ++zIndexCounter;
  }
}

function makeDraggable(win, appName) {
  const titlebar = win.querySelector('.window-titlebar');
  let isDragging = false;
  let startX, startY, startLeft, startTop;
  
  titlebar.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'BUTTON') return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    const rect = win.getBoundingClientRect();
    startLeft = rect.left;
    startTop = rect.top;
    focusWindow(appName);
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    win.style.left = (startLeft + dx) + 'px';
    win.style.top = Math.max(28, startTop + dy) + 'px';
  });
  
  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
}

// CALCULATOR LOGIC
let calcState = { current: '0', previous: null, operation: null };

function initCalculator() {
  calcState = { current: '0', previous: null, operation: null };
}

function calcNum(num) {
  if (calcState.current === '0') calcState.current = String(num);
  else calcState.current += String(num);
  updateCalcDisplay();
}

function calcOp(op) {
  if (calcState.operation && calcState.previous !== null) calcEquals();
  calcState.previous = parseFloat(calcState.current);
  calcState.operation = op;
  calcState.current = '0';
}

function calcEquals() {
  if (!calcState.operation || calcState.previous === null) return;
  const curr = parseFloat(calcState.current);
  const prev = calcState.previous;
  let result = 0;
  switch(calcState.operation) {
    case '+': result = prev + curr; break;
    case '-': result = prev - curr; break;
    case '*': result = prev * curr; break;
    case '/': result = prev / curr; break;
  }
  calcState.current = String(result);
  calcState.previous = null;
  calcState.operation = null;
  updateCalcDisplay();
}

function calcClear() {
  calcState = { current: '0', previous: null, operation: null };
  updateCalcDisplay();
}

function calcToggleSign() {
  calcState.current = String(parseFloat(calcState.current) * -1);
  updateCalcDisplay();
}

function calcPercent() {
  calcState.current = String(parseFloat(calcState.current) / 100);
  updateCalcDisplay();
}

function calcDecimal() {
  if (!calcState.current.includes('.')) calcState.current += '.';
  updateCalcDisplay();
}

function updateCalcDisplay() {
  const display = document.getElementById('calc-display');
  if (display) display.textContent = calcState.current;
}

// APPLE MENU ACTIONS
function aboutMac() {
  closeAppleMenu();
  document.getElementById('about-modal').style.display = 'flex';
}

function closeAbout() {
  document.getElementById('about-modal').style.display = 'none';
}

function openAppStore() {
  closeAppleMenu();
  alert('\uD83C\uDFEA App Store otev\u0159en (demo)');
}

function shutdownMac() {
  closeAppleMenu();
  const shutdownScreen = document.getElementById('shutdown-screen');
  shutdownScreen.style.display = 'flex';
  setTimeout(() => shutdownScreen.classList.add('visible'), 10);
  
  setTimeout(() => {
    document.getElementById('shutdown-text').textContent = 'Mac vypnut';
    setTimeout(() => {
      // Reload page to restart
      location.reload();
    }, 2000);
  }, 2000);
}

function restartMac() {
  closeAppleMenu();
  const shutdownScreen = document.getElementById('shutdown-screen');
  document.getElementById('shutdown-text').textContent = 'Mac se restartuje...';
  shutdownScreen.style.display = 'flex';
  setTimeout(() => shutdownScreen.classList.add('visible'), 10);
  
  setTimeout(() => {
    location.reload();
  }, 2000);
}
