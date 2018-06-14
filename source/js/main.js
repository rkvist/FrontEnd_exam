"use strict";
let data;
let bartenderTemp = document.querySelector("#bartender_temp").content;
let orderTemp = document.querySelector("#order_temp").content;
let kegTemp = document.querySelector("#keg_temp").content;
let storageTemp = document.querySelector("#storage_temp").content;
let infoTemp = document.querySelector("#info_temp").content;
let beerShown = false;

document.addEventListener("DOMContentLoaded",loadScript);


function loadScript(){

        data = JSON.parse(FooBar.getData());

        //Clear previous data
     document.querySelector("#bartenderInfo").innerHTML = '';
     document.querySelector("#orderContainer").innerHTML = '';
     document.querySelector("#kegInfo").innerHTML = '';
     document.querySelector("#storageInfo").innerHTML = '';
        
        let queuePeople = data.queue.length;
        document.querySelector("#queueNumber").textContent = queuePeople;

        let servingPeople = data.serving.length;
        document.querySelector("#servingNumber").textContent = servingPeople;

         data.bartenders.forEach(function(e){
        
//                 // CLONING THE TEMPLATES
                 let cloneBartender = bartenderTemp.cloneNode(true);

//                 // PUTTING STUFF INTO THE TEMPLATE
                 cloneBartender.querySelector(".bartenderNames").textContent = e.name;
                 cloneBartender.querySelector(".bartenderStatus").textContent = e.status;


//                 // APPENDING THE STUFF TO THE TEMPLATE RECIEVER
                 document.querySelector("#bartenderInfo").appendChild(cloneBartender);
     });

     data.serving.forEach(function(e){
        let cloneOrder = orderTemp.cloneNode(true);
        let listThing = cloneOrder.querySelector(".orderItem");
         
        let i;
        for (i = 0; i < e.order.length; ++i) {
                // create an item for each one
                var listItem = document.createElement("li");
                // Add the item text
                listItem.innerHTML = e.order[i];
        
                // Add listItem to the listElement
                listThing.appendChild(listItem);
            }
            document.querySelector("#orderContainer").appendChild(cloneOrder);
                
    });

    data.taps.forEach(function(e){
        let cloneKeg = kegTemp.cloneNode(true);
        cloneKeg.querySelector(".kegName").textContent = e.beer; 
        if(e.level < 200){
                cloneKeg.querySelector(".capacityIndicator").style.backgroundColor = "rgb(219, 89, 89)";
        }else if(e.level >= 200 && e.level <= 1000){
                cloneKeg.querySelector(".capacityIndicator").style.backgroundColor = "rgb(219, 190, 89)";
        }else if(e.level > 1001){
                cloneKeg.querySelector(".capacityIndicator").style.backgroundColor = "rgb(89, 219, 89)";
        }
  
                let cap = (e.capacity - e.level) / 50;
                let thing = 17 / 50;
                cloneKeg.querySelector(".liquid").style.transform = `translateY(${cap * thing}vw)`;
        
        
            document.querySelector("#kegInfo").appendChild(cloneKeg); 
    });
    
    data.storage.forEach(function(e){
        let cloneStorage = storageTemp.cloneNode(true);
        cloneStorage.querySelector(".storageName").textContent = e.name;
        cloneStorage.querySelector(".storageAmount").textContent = e.amount;
        if(e.amount <= 2){
                cloneStorage.querySelector(".storageIndicator").style.backgroundColor = "rgb(219, 89, 89)";
        }else if(e.amount >= 3 && e.amount <= 5){
                cloneStorage.querySelector(".storageIndicator").style.backgroundColor = "rgb(219, 190, 89)";
        }else if(e.amount >= 6){
                cloneStorage.querySelector(".storageIndicator").style.backgroundColor = "rgb(89, 219, 89)";
        }

        document.querySelector("#storageInfo").appendChild(cloneStorage);
    });
  if (beerShown === false){
    data.beertypes.forEach(function(e){
        let cloneInfo = infoTemp.cloneNode(true);
        
        cloneInfo.querySelector(".BeerName").textContent = e.name;
        cloneInfo.querySelector(".beerImg").setAttribute("src", "assets/img/" + e.label);
        cloneInfo.querySelector(".catInfo").textContent = e.category;
        cloneInfo.querySelector(".pouringInfo").textContent = e.pouringSpeed;
        cloneInfo.querySelector(".popInfo").textContent = e.popularity;
        cloneInfo.querySelector(".alcInfo").textContent = e.alc;
        cloneInfo.querySelector(".overall").textContent = e.description.overallImpression;
        cloneInfo.querySelector(".appInfo").textContent = e.description.appearance;
        cloneInfo.querySelector(".aromaInfo").textContent = e.description.aroma;
        cloneInfo.querySelector(".mouthInfo").textContent = e.description.mouthfeel;
        cloneInfo.querySelector(".flavorInfo").textContent = e.description.flavor;
        document.querySelector("#infoboks").appendChild(cloneInfo);
    });
        beerShown = true;
  }
        let i;
    for(i = 1; i <= 10; ++i){

        let clickedElement = document.querySelector("#storageInfo article:nth-child("+i+")");
        let infoElement = document.querySelector("#infoboks section:nth-child("+i+")");
        let closeElement = document.querySelector("#infoboks section:nth-child("+i+") .close");

        clickedElement.addEventListener("click", function(){
                infoElement.style.right = "0";
                closeElement.addEventListener("click", function(){
                        let media = window.matchMedia("(max-width: 1024px)");
                        if(media.matches){
                                infoElement.style.right = "-100vw";  
                        }else{
                                infoElement.style.right = "-70vw";  
                        }

                 });
        });
        
        
        };

    let cap = 2500 / 50;
    let thing = 17 / 50;
    console.log(`translateY(${cap * thing}vw)`);
}
 setInterval(function(){loadScript();
 console.log("updated")}, 1000);

