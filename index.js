





 function getRandomColor() {
  var letters = 'BCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

function randomDivBg(){
  console.log('from randomDivBg')
  document.querySelectorAll('div').forEach(function(div){
    console.log(div)
    console.log(div.style)
    console.log(div.textContent)
    div.style.background = getRandomColor()
  })
}


document.onchange = function(){
  console.log('from document onchange')
}

async function preQuery() {
  
  const client = new MeiliSearch({ host: 'http://127.0.0.1:7700' });
  // client.getStats().then((response)=>{ console.log(response.indexes)})
  client.getIndexes({ limit: 999 }).then((r)=>{
     console.log(r)
     console.log(r.results)
     r.results.forEach( (v,k) => {
      console.log(k,v)
      console.log(k,v.uid)
      // add buttons per index
      let button = document.createElement('button')
      button.textContent = v.uid
      // button.id = v.uid+'_id'
      button.onclick = query
      console.log(button)
      let button_container = document.getElementById('index_chooser')
      button_container.append(button)
     })
     })   
  // let res = await client.getIndexes({ limit: 3 })
  // console.log(res)
  console.log('from preQuery')
}

function query2(){

  let button_container = document.getElementById('index_chooser')
      button_container.append('from query2')
      console.log(this.innerHTML)
      // console.log(this.getAttribute('id'))
      button_container.append(this)
}

function query(index_Name) {
  const search = instantsearch({
    indexName: this.innerHTML,
    searchClient: instantMeiliSearch(
      "http://localhost:7700"
    )
  });
  search.addWidgets([
    instantsearch.widgets.searchBox({
      container: "#searchbox"
    }),
    instantsearch.widgets.configure({ hitsPerPage: 8 }),
    instantsearch.widgets.hits({
      container: "#hits",
      templates: {
        item: `
        <div>
          <div class="hit-name">
              {{#helpers.highlight}}{ "attribute": "date" }{{/helpers.highlight}}
          </div>
          <div class="hit-name">
                {{#helpers.highlight}}{ "attribute": "content" }{{/helpers.highlight}}
          </div>
        </div>
      `
      }
    })
  ]);
  search.start();
}
