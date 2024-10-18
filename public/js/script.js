const galleryList = document.querySelector(".gallery")

const getImageList = async () => {
  const storageRef = await storage.ref().child(`images/`)

  const list = await storageRef.listAll()

  if (list.items.length > 0) {
    list.items.forEach(async (item) => {
      const pathReference = await storage.ref(item.fullPath).getDownloadURL()

      if (pathReference) {
        const div = document.createElement("div")
        const img = document.createElement("img")
        img.src = pathReference
        img.alt = item.name

        div.appendChild(img)
        galleryList.appendChild(div)
      }
    })
  }
}

getImageList()
