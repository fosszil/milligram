let reelCount = 0;

const target = document.querySelector(div[role="presentation"])
const config = { attributes:true,childList:true,subtree:true};

const callback = (mutationList,observer) => {
    for (const mutation of mutationList) {
        if(mutation.type == "childList"){
            console.log("child list has been added or removed");
        } else if (mutation.type == "attributes") {
            console.log("Attributes have been changed");
        }
    }
};

const observer = new MutationObserver(callback);
observer.observe(target,config);