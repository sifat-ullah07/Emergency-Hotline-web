const transectionData = []

const data = {
    name: "National Emergency Services",
    phone: "999",
    date: new Date().toLocaleTimeString()
};
document.getElementById("national-emergency-services").addEventListener("click", function() {
    
    const data = {
       name: "National Emergency Services",
       phone: "999",
       date: new Date().toLocaleTimeString()

    };
    transectionData.push(data)
  

});
document.getElementById("police-helpline").addEventListener('click', function(){

    const data = {
       name: "Police Helpline Number",
       phone: "999",
       date: new Date().toLocaleTimeString()
    };
    transectionData.push(data)
    console.log(transectionData)

})
document.getElementById("call-history").addEventListener('click',function(){
    // console.log( transectiondata)
    const transectionContainer = document.getElementById('history-container')
    for (const data of transectionData){
        const div = document.createElement('div')
        div.innerHTML=`
                   <div class="w-[400px] h-[1126px] border-2  mx-auto mt-4 gap-x-[30px] gap-y-[30px]  px-4  bg-white shadow-md" id="history-container">
                <!-- side content -->
                 <div>
                    <div class="flex justify-between items-center bg-white mt-[24px] mr-[24px] ml-[24px] mb-[16px]  border border-gray-300 rounded-lg ">

                        <button class="btn btn-soft h-[28px] w-[104px] bg-[#00a63e]" id="call-history">Call History</button>
                        <button class="btn btn-soft  h-[52px] w-[114px] bg-[#00a63e]">Clear</button>

                    </div>
                    <div class="border-2 border-red-600 bg-white">
                        <div class="flex justify-between ">
                            <div class="w-[215px] h-[51px]">
                                <h2 class="font-samibold text-base">${data.name}</h2>
                                <p>${data.phone}</p>

                            </div>
                            <div>
                                <p>${data.Date}</p>
                            </div>
                        </div>

                    </div>
                 </div>
            </div>  
        

        `
        transectionContainer.appendChild(div)

    }

    

})