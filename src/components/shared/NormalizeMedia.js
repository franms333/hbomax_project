const transformMedia = (mediaItems, size = 7) => {
    const loadedMediaItems = [];
  
    for (let index = 0; loadedMediaItems.length < size; index++) {
      let randomValue = Math.floor(Math.random() * 49) + 1;
      const element = mediaItems[randomValue];
      const verifyDuplicates = loadedMediaItems.find(item => item.ids.simkl_id === mediaItems[randomValue].ids.simkl_id);
      if(!verifyDuplicates){
        loadedMediaItems.push(element);
      }
    }
  
    return loadedMediaItems;
  }

export default transformMedia;