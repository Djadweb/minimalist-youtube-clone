let key = "AIzaSyCWDdqboDsZw2n9IpjEPgYWAi8pbPnXmhw";
let search = document.querySelector('#search');

search.addEventListener('keyup', (e) => {
    if(e.keyCode === 13) {
        let searchValue = search.value;
        let url = `https://youtube.googleapis.com/youtube/v3/search?key=${key}&q=${searchValue}&type=video&part=snippet&maxResults=50`;
                
        fetch(url, {
            method: 'GET',    
            mode: 'cors',        
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            } 
        }).then(
            (response) => {
                let resultJson = response.json();                                
                console.log(resultJson);
                return resultJson;
            }
        ).then(
            (response) => {
                //console.log(response.items[0]);     
                let items = response.items;   
                console.log(response.items)
                console.log("Result : " + items.length + " Videos")
                let videosContainer = document.querySelector('.searched__videos');
                videosContainer.innerHTML = "";
                for(item of items) {            
                    let videoId = item.id.videoId;                          
                    let thumbnails = item.snippet.thumbnails;
                    let defaultImage = thumbnails.default.url;
                    let title = item.snippet.title;      
                    let description = item.snippet.description;      

                    let element = `<div onclick="showMovie('${videoId}')" class="watcher-later__video" id="${videoId}">
                                        <div class="video-thumbnail">
                                            <img src="${defaultImage}">
                                        </div>
                                        <div class="video-infos">
                                            <div class="video-title">${title}</div>
                                            <div class="video-description">${description}</div>                        
                                        </div>                    
                                    </div>`;

                    videosContainer.innerHTML += element;
                }            
            }
        )

    }
})


function showMovie(id) {
    let video = document.querySelector('.video');
    video.innerHTML = "";
    let element = `<iframe class="youtube-video"
                      src="https://www.youtube.com/embed/${id}">
                   </iframe>`;
    video.innerHTML = element;
    video.style.display = "block";         
    window.scrollTo({top: 0, behavior: "smooth"});
}