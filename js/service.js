'use-strict'
const API_KEY = 'AIzaSyB52WZadL0qrmDyH9SjRaVGCxg98KR0dfc'
const KEY_YOUTUBE = 'youtube_videos'
const KEY_WIKI = 'wiki_info'

function getVideos(value) {
    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_KEY}&q=${value}`)
        .then(res => {
            saveToStorage(KEY_YOUTUBE, res.data.items)
            return res.data.items
        })
        .catch(err => console.log(err))
}

function getWiki(value) {
    return axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${value}&limit=5`)
        .then(res => {
            let info = [res.data[0].toString(), ...res.data[1]]
            saveToStorage(KEY_WIKI, info)
            return res.data[1]
        }).catch(err => console.log(err))
}

function getVideosFromStorage() {
    return Promise.resolve(loadFromStorage(KEY_YOUTUBE))
}

function getInfoWikiFromStorage() {
    return Promise.resolve(loadFromStorage(KEY_WIKI))
}

function checkStorage(searchValue) {
    if (!loadFromStorage(KEY_WIKI)) return false
    let keyCheck = loadFromStorage(KEY_WIKI)[0]
    if (keyCheck === searchValue.toUpperCase()) return true
    else return false
}