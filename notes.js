var titlesearch=document.getElementById('Title');
var contentsearch=document.getElementById('cont')
var rowDisplay=document.getElementById('rowDisplay')
var noteIndex;
var update=document.getElementById('updatebtn');
var add=document.getElementById('addbtn');
var allnotes=[];

if(localStorage.getItem('notes')){
    allnotes=JSON.parse(localStorage.getItem('notes'));
     displayNotes();
}
function addnote(){
    if(!titlesearch.value){
        Swal.fire({
  icon: "error",
  title: "Title is empty",
  text: "Enter anything in title!",
  confirmButtonText:"Ok"
});}
  if(!contentsearch.value){
        Swal.fire({
  icon: "error",
  title: "Content is empty",
  text: "Enter anything in content!",
  confirmButtonText:"Ok"
});}
    else{
    var note={
        title:titlesearch.value,
        content:contentsearch.value
    }
    allnotes.push(note);
    localStorage.setItem('notes',JSON.stringify(allnotes));
    // console.log(allnotes);
    displayNotes();
    clearinput();
} }

function displayNotes(){
    var container='';
    for(var i=0;i<allnotes.length;i++){
      container+=`
      
        <div class="nota">
        <h2>${allnotes[i].title}</h2>
        <p>${allnotes[i].content}</p>
        <button class="NN1" onclick="Deletenotes(${i})">Delete</button> <button class="NN2" onclick="preupdate(${i})">Edit</button>
  
   
    </div> `
      
    }
  rowDisplay.innerHTML=container;
}
function clearinput(){
    titlesearch.value='';
    contentsearch.value='';
}

function Deletenotes(index){
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!",
 cancelButtonText: "No,Cancel it!"
}).then((result) => {
  if (result.isConfirmed) { allnotes.splice(index,1);
localStorage.setItem('notes',JSON.stringify(allnotes));
displayNotes();
Swal.fire({
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success"
  });
}
});

}
function preupdate(index){
noteIndex=index;
titlesearch.value=allnotes[noteIndex].title;
contentsearch.value=allnotes[noteIndex].content;
add.classList.add('d-none');
update.classList.remove('d-none');
}
function updatenote(){
   var updatednote={
    title:titlesearch.value,
    content:contentsearch.value
   }
   allnotes.splice(noteIndex,1,updatednote);
   localStorage.setItem("notes",JSON.stringify(allnotes));
    displayNotes();
    clearinput();
    update.classList.add('d-none');
 add.classList.remove('d-none');
}
function searchByTitle(term){
    for(var i=0;i<allnotes.length;i++){
        if(allnotes[i].title.toLowerCase().includes(term.toLowerCase())){
            var container="";
            container+=` <div class="nota">
        <h2>${allnotes[i].title}</h2>
        <p>${allnotes[i].content}</p>
        <button class="NN1" onclick="Deletenotes(${i})">Delete</button> <button class="NN2" onclick="preupdate(${i})">Edit</button>
  
   
    </div>`
        }
    }
    rowDisplay.innerHTML=container;
}
function searchByContent(cont){
    for(var i=0;i<allnotes.length;i++){
        if(allnotes[i].content.toLowerCase().includes(cont.toLowerCase())){
            var container="";
            container+=` <div class="nota">
        <h2>${allnotes[i].title}</h2>
        <p>${allnotes[i].content}</p>
        <button class="NN1" onclick="Deletenotes(${i})">Delete</button> <button class="NN2" onclick="preupdate(${i})">Edit</button>
  
   
    </div>`
        }
    }
    rowDisplay.innerHTML=container;
}
