const formatLoopedItems = (item, itemInfo, type='', size='_medium') => {  
    const fanartPath = item.fanart.split("/");    
    const posterPath = item.poster.split("/"); 
    if(type === 'fanart'){
        if(item.fanart && !item.fanart.includes('http')){
            item.fanart = `https://simkl.in/fanart/${fanartPath[0]}/${fanartPath[1]}${size}.jpg`;
        }         
    }else {
        if(!item.poster.includes(size)){
            item.poster = `https://simkl.in/posters/${posterPath[0]}/${posterPath[1]}${size}.jpg`;
        } 
    }
    item.trailer = `https://simkl.com/tv/${item.ids.simkl_id}/trailer`;

    item.title = itemInfo.title;       
  
    return item;
  }

const formatPosters = (item) => {
    const posterPath = item.poster.split("/");
                
    if(!item.poster.includes('https')){
        item.poster = `https://simkl.in/posters/${posterPath[0]}/${posterPath[1]}_m.jpg`;
    } 

    return item;
}

export {formatLoopedItems, formatPosters} ;