class UserCard extends HTMLElement { 
  constructor () {
    super()
    console.debug('vns-img constructor')
     
    const defaultImgSrc = '/files/default/picture.jpg'
    const imgList = this.getElementsByTagName('img')
    if (imgList.length > 0) {
      const img = imgList[0]
      img.onerror = () => {  
        console.debug('image load error', img.src)
        if (img.src !== defaultImgSrc) {
          img.src = defaultImgSrc
        }
      }
      const newSrc = img.src
      img.src = newSrc
    }
  }
}

window.customElements.define('vns-img', UserCard)

  