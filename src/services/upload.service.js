export const uploadService = {
  uploadProfileImg,
  uploadImg
}
async function uploadProfileImg(ev) {
  const CLOUD_NAME = "dkyjustoe"
  const UPLOAD_PRESET = "xkdpkuk3"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  try {
    const formData = new FormData()
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('file', ev.target.files[0])

    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData
    })
    const imgUrl = await res.json()
    return imgUrl
  } catch (err) {
    console.error('Failed to upload', err)
    throw err
  }
}
async function uploadImg(ev) {
  const CLOUD_NAME = "dkyjustoe"
  const UPLOAD_PRESET = "xkdpkuk3"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  try {
    const formData = new FormData()
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('file', ev)

    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData
    })
    const imgUrl = await res.json()
    return imgUrl
  } catch (err) {
    console.error('Failed to upload', err)
    throw err
  }
}

