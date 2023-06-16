// window.onload = (e) => {


//     let v = Math.floor(Math.random() * 3);
//     // document.getElementById('glslCanvas').getAttribute("data-fragment-url").value = `/frag${v}.glsl`;

//     var request = new XMLHttpRequest();
//     request.open('GET', `/frag${v}.glsl`, true);
//     request.responseType = 'blob';
//     request.onload = function() {
//         let fr = new FileReader();
//         fr.readAsText(request.response);
//         fr.onload =  function(e){
//             // console.log(e.target.result);
//             document.getElementById('glsl-canvas').setAttribute("data-fragment", e.target.result);
//         };
//     };
//     request.send();
// };




///////////failed attempt to randomize shaders ina single box.  Then i realized it was a bad idea anyways
