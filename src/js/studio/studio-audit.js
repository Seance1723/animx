export function initAudit() {
  const auditBtn = document.getElementById('btn-audit');
  auditBtn.onclick = () => {
    const a11y = window.AnimX.auditAccessibility();
    const sec = window.AnimX.securityAudit();
    
    let msg = '--- AnimX Studio Audit ---\n\n';
    msg += `Accessibility: ${a11y.ok ? '✅ OK' : '❌ Issues Found'}\n`;
    if (a11y.warnings.length > 0) msg += `A11y Warnings:\n- ${a11y.warnings.join('\n- ')}\n`;
    
    msg += `\nSecurity: ${sec.ok ? '✅ OK' : '❌ Issues Found'}\n`;
    if (sec.warnings.length > 0) msg += `Security Warnings:\n- ${sec.warnings.join('\n- ')}\n`;
    
    alert(msg);
  };
}
