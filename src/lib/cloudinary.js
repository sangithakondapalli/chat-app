// src/lib/cloudinary.js
export default async function uploadImageToCloudinary(file) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  console.log(cloudName);
  console.log(uploadPreset);

//const url=import.meta.env.VITE_CLOUDINARY_URL;
  const url="https://api.cloudinary.com/v1_1/dhffx2gpd/image/upload";
  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary env vars missing");
  }

  // optional: basic client-side guards
  //if (!file.type.startsWith("image/")) throw new Error("Only images allowed");
  //if (file.size > 2 * 1024 * 1024) throw new Error("Max 2MB image"); // tweak as you like

  
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", uploadPreset);
  form.append("folder", "chat-images"); // matches your preset/folder

  const res = await fetch(url, { method: "POST", body: form });
  if (!res.ok) {
    throw new Error(`Cloudinary upload failed: ${res.statusText}`);
  }

  const data = await res.json();
  console.log("Cloudinary upload response:", data); // 👈 check browser console
  return data.secure_url; // this is the actual image link
}

