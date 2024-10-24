import config from '../config';
const URL = `${config.path}`;

async function uploadImage(imageFile: File, userToken: string): Promise<string | undefined> {
  try {
    const formData = new FormData();
    
    if (imageFile) {
      formData.append('file', imageFile);
    }
  
    const response = await fetch(`${URL}/images`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${userToken}`
      },
      body: formData
    });
  
    const data = await response.text();
  
    return data;
  } catch (err) {
    console.error(err);
  }
}

export default uploadImage