export function showTip(data, duration = 3000) {
  const outter = document.createElement('div');
  outter.setAttribute('class', 'plv-iar-tip');
  const outterStyle = ['position: fixed', 'z-index: 9999', 'top: 0', 'right: 0', 'bottom: 0', 'left: 0'];
  outter.setAttribute('style', outterStyle.join(';'));
  const innerStyle = [
    'position: absolute',
    'top: 50%',
    'left: 50%',
    'transform: translate(-50%, -50%)',
    'width: fit-content',
    'padding: 16px',
    'color: #fff',
    'font-size: 16px',
    'line-height: 22px',
    'font-weight: 500',
    'text-align: center',
    'background-color: rgba(0, 0, 0, .8)',
    'border-radius: 4px',
  ];
  outter.innerHTML = `<span style="${innerStyle.join(';')}">${data}</span>`;
  document.body.appendChild(outter);
  outter.onclick = () => {
    document.body.removeChild(outter);
  };
  setTimeout(() => {
    document.body.removeChild(outter);
  }, duration);
}
