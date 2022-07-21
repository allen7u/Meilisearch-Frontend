












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
      console.log(button)
      let button_container = document.getElementById('index_chooser')
      button_container.append(button)
     })
     })   
  // let res = await client.getIndexes({ limit: 3 })
  // console.log(res)
  console.log('from preQuery')
}

function query() {
  const search = instantsearch({
    indexName: "linely",
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
