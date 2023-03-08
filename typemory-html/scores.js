function loadScores() {
    let memorized = [];
    const scoresText = localStorage.getItem('memorized');
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }//this code should be good to go I think
  
    const tableBodyEl = document.querySelector('#scores');
  
    if (scores.length) {
      for (const [i, wc] of memorized.entries()) {
        const positionTdEl = document.createElement('td');
        const nameTdEl = document.createElement('td');
        const titleTdEl = document.createElement('td');
        const wcTdEl = document.createElement('td');
        const dateTdEl = document.createElement('td');
  
        positionTdEl.textContent = i + 1;
        nameTdEl.textContent = score.name;
        titleTdEl.textContent = 
        wcTdEl.textContent = score.score;
        dateTdEl.textContent = score.date;
  
        const rowEl = document.createElement('tr');
        rowEl.appendChild(positionTdEl);
        rowEl.appendChild(nameTdEl);
        rowEl.appendChild(wcTdEl);
        rowEl.appendChild(dateTdEl);
  
        tableBodyEl.appendChild(rowEl);
      }
    } else {
      tableBodyEl.innerHTML = '<tr><td colSpan=4>Be the first to score</td></tr>';
    }
  }
  
  loadScores();
  