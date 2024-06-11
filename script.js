let uploadButton = document.getElementById("upload-button");
let chosenImage = document.getElementById("chosen-image");
let fileName = document.getElementById("file-name");
let container = document.querySelector(".container");
let error = document.getElementById("error");
let imageDisplay = document.getElementById("image-display");
var icons="";
var Name="";
const dt = new DataTransfer(); 

const fileHandler = (file, name, type) => {
  if (type.split("/")[0] !== "image") {
    //File Type Error
    error.innerText = "Please upload an image file";
    return false;
  }
  error.innerText = "";
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    //image and file name
    let imageContainer = document.createElement("figure");
    let img = document.createElement("img");
    let icon=document.createElement("i");
    
    icon.id='icon-close';
    icon.style.transform='translate(-15px,28px)';
    icon.style.width='40px';
    icon.style.cursor='pointer';
    icon.className='bi bi-x rounded-circle bg-white d-block p-1 h3';
    img.src = reader.result;
    imageContainer.appendChild(icon);
    imageContainer.appendChild(img);
    imageContainer.innerHTML += `<figcaption>${name}</figcaption>`;
    imageDisplay.appendChild(imageContainer);
    icons=document.getElementsByClassName('bi');

    for(let item of icons) {
          item.addEventListener('click',DeleteItem);
    }
  };
};

function DeleteItem(e){
   e.target.parentElement.parentElement.removeChild(e.target.parentElement);
              icons=document.getElementsByClassName('bi');
              for(let i = 0; i < dt.items.length; i++){
                  if(e.target.nextSibling.nextSibling.textContent === dt.items[i].getAsFile().name){
                      dt.items.remove(i);
                      uploadButton.files=dt.files;
                      continue;
                  }
              }
}



//Upload Button
uploadButton.addEventListener("change", () => {
  imageDisplay.innerHTML = "";
  
  for (const item of uploadButton.files) {
    dt.items.add(item);
  }

  Array.from(uploadButton.files).forEach((file) => {
    Name=file.name;
    fileHandler(file, file.name, file.type);
  });
});

container.addEventListener(
  "dragenter",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.add("active");
  },
  false
);

container.addEventListener(
  "dragleave",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.remove("active");
  },
  false
);

container.addEventListener(
  "dragover",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.add("active");
  },
  false
);

container.addEventListener(
  "drop",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.remove("active");
    // draggedData = e.dataTransfer;
    let filelist = e.dataTransfer.files;

    for (let file of filelist) {
		dt.items.add(file);
	}

    uploadButton.files = filelist

    imageDisplay.innerHTML = "";
    Array.from(filelist).forEach((file) => {
      fileHandler(file, file.name, file.type);
    });
  },
  false
);

window.onload = () => {
  error.innerText = "";
};