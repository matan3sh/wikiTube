'use-strict'

function onInit() {
    if (loadFromStorage('youtube_videos') && loadFromStorage('wiki_info')) {
        renderVideos(loadFromStorage('youtube_videos'))
        renderWiki(loadFromStorage('wiki_info'))
    }
}

function onSearch(e) {
    e.preventDefault()
    const searchValue = document.querySelector('#search').value
    if (!checkStorage(searchValue)) {
        getVideos(searchValue)
            .then(res => renderVideos(res))
        getWiki(searchValue)
            .then(res => renderWiki(res))
    } else {
        getVideosFromStorage()
            .then(res => renderVideos(res))
        getInfoWikiFromStorage()
            .then(res => renderWiki(res))
    }
}

function renderVideos(videos) {
    let strHTML = videos.map(video => {
        let videoId = video.id.videoId
        return `
        <iframe class="card text-center"
            <object  width="40" height="40" src="https://www.youtube.com/embed/${videoId}"></object>
        </iframe>
        `
    })
    document.querySelector('.youtube-output').innerHTML = strHTML.join('')
}

function renderWiki(info) {
    let strHTML = `<div class='card text-center'>
                        <h2>Discography</h2>
                    `
    for (let i = 1; i < info.length; i++) strHTML += `<div class='badge badge-${getClass()}'>${info[i]}</div>`
    strHTML += '</div>'
    document.querySelector('.wiki-output').innerHTML = strHTML
}