document.addEventListener('DOMContentLoaded', () => {
    const btns = document.querySelectorAll('.tool-btn');
    const sections = document.querySelectorAll('.tool-section');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(`${btn.dataset.tool}-tool`).classList.add('active');
        });
    });
});

async function formatJson() {
    const text = document.getElementById('json-input').value;
    const output = document.getElementById('json-output');
    
    if (!text.trim()) {
        output.value = "Please enter some JSON first.";
        return;
    }

    try {
        const response = await fetch('/api/json-format', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        const data = await response.json();
        
        if (data.status === 'success') {
            output.value = data.result;
            output.style.color = '#e2e8f0';
        } else {
            output.value = data.result;
            output.style.color = '#ef4444'; // Red error
        }
    } catch (e) {
        output.value = "Network error. Could not connect to server.";
        output.style.color = '#ef4444';
    }
}

async function convertMarkdown() {
    const text = document.getElementById('md-input').value;
    const output = document.getElementById('md-output');

    if (!text.trim()) {
        output.innerHTML = "HTML Preview will appear here...";
        output.classList.add('placeholder-text');
        return;
    }

    try {
        const response = await fetch('/api/markdown', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        const data = await response.json();
        
        if (data.status === 'success') {
            output.innerHTML = data.result;
            output.classList.remove('placeholder-text');
        } else {
            output.innerHTML = `<span style="color: #ef4444;">Error: ${data.result}</span>`;
        }
    } catch (e) {
        output.innerHTML = `<span style="color: #ef4444;">Network error.</span>`;
    }
}

async function processBase64(action) {
    const text = document.getElementById('b64-input').value;
    const output = document.getElementById('b64-output');

    if (!text.trim()) {
        output.value = "Please enter text first.";
        return;
    }

    try {
        const response = await fetch('/api/base64', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, action })
        });
        const data = await response.json();
        
        if (data.status === 'success') {
            output.value = data.result;
            output.style.color = '#e2e8f0';
        } else {
            output.value = data.result;
            output.style.color = '#ef4444';
        }
    } catch (e) {
        output.value = "Network error.";
        output.style.color = '#ef4444';
    }
}
