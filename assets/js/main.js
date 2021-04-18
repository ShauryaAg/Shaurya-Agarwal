window.onload = async () => {
    const response = await fetch('https://api.github.com/search/issues?q=author%3AShauryaAg+type%3Apr&per_page=100').then(res => res.json())

    const open = document.getElementById('open')
    const closed = document.getElementById('closed')
    const items = response['items']

    openContribs = []
    closedContribs = []
    items.map((item) => {
        contrib = `
        <div class="contrib-item card neumo-shadow mt-4 px-4">
            <div class="contrib-title contrib-overflow">
                <b>Title:</b><a href="${item["html_url"]}"> ${item["title"]}</a>
            </div>
            <div class="contrib-labels">
            ${item['labels'].map(label => {
            return `
                <div class="label-name" style=background-color:#${label['color']}>
                ${label['name']}
                </div>
                `
        })
            }
            </div >
            <div class="contrib-no">
                <b>PR Number:</b><span class="contrib-no"> #${item["number"]}</span>
            </div>
            <div class="contrib-repo contrib-overflow">
                <strong> Repo:</strong> <a href="${item["html_url"].split('pull')[0]}">${item["url"].split('repos/')[1].split('/issues')[0]}</a>
            </div>
        </div>
    `
        if (!(item["url"].includes("Hacktoberfest") || item["title"].includes("readme")))
            if (item.state == "open") {
                openContribs.push(contrib)
            } else {
                closedContribs.push(contrib)
            }
    })

    openInnerHtml = openContribs.join("\r\n")
    closedInnerHtml = closedContribs.join("\r\n")
    open.innerHTML = openInnerHtml
    closed.innerHTML = closedInnerHtml
}