const app = document.getElementById('app');
const titleEl = document.getElementById('title');
const tabs = document.querySelectorAll('#tabs button');

function loadAzkar(file){
  fetch(file)
  .then(res => res.json())
  .then(data => {
    app.innerHTML = '';
    titleEl.textContent = data.title;

    data.content.forEach(item => {
      const box = document.createElement('div');
      box.className = 'box';

      const progress = document.createElement('div');
      progress.className = 'progress';

      const text = document.createElement('div');
      text.className = 'text';
      text.textContent = item.zekr;

      const target = document.createElement('div');
      target.className = 'target';

      const circle = document.createElement('p');
      circle.textContent = `0/${item.repeat}`;

      target.appendChild(circle);
      box.appendChild(progress);
      box.appendChild(text);
      box.appendChild(target);
      app.appendChild(box);

      let count = 0;
      const targetNum = item.repeat;

      box.addEventListener('click', ()=>{
        if(count >= targetNum) return;
        count++;
        progress.style.width = (count/targetNum*100)+'%';
        circle.textContent = `${count}/${targetNum}`;

        if(count === targetNum){
          circle.textContent = '✔';
          target.classList.add('done');
        }
      });
    });
  });
}

tabs.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    tabs.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    loadAzkar(btn.dataset.file);
  });
});

// تحميل افتراضي
loadAzkar('data/azkar_sabah.json');
tabs[0].classList.add('active');