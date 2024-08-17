const menuToggle=document.querySelector('.menuToggle');

    menuToggle.onclick = function() 
    {
        scrollToBottom()
        menuToggle.classList.toggle('active')
    }

    if (localStorage.getItem('isActive') === 'true') {
        menuToggle.classList.toggle('active');
        const input = document.getElementById('inputValue');
            input.focus();
      
    }
    
const closeContainer = document.querySelector('.closeContainer');
    closeContainer.onclick = function() {
        menuToggle.classList.remove('active')
    }

    function scrollToBottom() {
        const container = document.getElementById('secondary-div');
        container.scrollTop = container.scrollHeight;
    }




var inputArray = [];
var outputArray =[];
var counter = 0

// function renderList() {
//     const container = document.getElementById('secondary-div');

// inputArray.forEach(itemArray => { 
//     const newChartSectionDiv = document.createElement('div');
//     newChartSectionDiv.className = 'new-chart-section';

//     const rightPartDiv = document.createElement('div');
//     rightPartDiv.className = "right-part";

//     const rightUl = document.createElement('ul');
//     rightUl.className = "right-ul";

//     const leftPartDiv = document.createElement('div');
//     leftPartDiv.className = "left-part";

//     const leftUl = document.createElement('ul');
//     leftUl.className = "left-ul";

//     const leftLi = document.createElement('li');
//     const rightLi = document.createElement('li');

//     rightLi.textContent = inputArray[counter]
//     leftLi.textContent = outputArray[counter]

//     rightUl.appendChild(rightLi)
//     leftUl.appendChild(leftLi)

//     rightPartDiv.appendChild(rightUl);
//     leftPartDiv.appendChild(leftUl);


//     newChartSectionDiv.appendChild(rightPartDiv)
//     newChartSectionDiv.appendChild(leftPartDiv)

//     container.appendChild(newChartSectionDiv)
    
//     counter++
// })

// }

// renderList()

function additem() {
    const container = document.getElementById('secondary-div');

    const newChartSectionDiv = document.createElement('div');
    newChartSectionDiv.className = 'new-chart-section';

    const rightPartDiv = document.createElement('div');
    rightPartDiv.className = "right-part";

    const rightUl = document.createElement('ul');
    rightUl.className = "right-ul";

    const leftPartDiv = document.createElement('div');
    leftPartDiv.className = "left-part";

    const agentChart = document.createElement('div');
    agentChart.className = "agent-chart";

    const img = document.createElement('img'); 
    img.src ="http://127.0.0.1:5000/static/support-logo.png"

    const leftUl = document.createElement('ul');
    leftUl.className = "left-ul";

    const leftLi = document.createElement('li');
    const rightLi = document.createElement('li');

    rightLi.textContent = inputArray[inputArray.length -1]
    leftLi.textContent = outputArray[outputArray.length -1]

    rightUl.appendChild(rightLi)
    leftUl.appendChild(leftLi)

    rightPartDiv.appendChild(rightUl);
    agentChart.appendChild(img)
    agentChart.appendChild(leftUl);
    


    newChartSectionDiv.appendChild(rightPartDiv)
    leftPartDiv.appendChild(agentChart)
    newChartSectionDiv.appendChild(leftPartDiv)
    container.appendChild(newChartSectionDiv)
}




document.getElementById('myForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission


    const userInput = document.getElementById('userInput').value;
    // var taskInput = document.getElementById('inputValue').value;
    // if (taskInput.trim() === '') return; // Don't add empty tasks

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_input: userInput })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Store the data in a JavaScript variable
            const storedData = data.data;
            inputArray.push(storedData[1])
            outputArray.push(storedData[0])
            console.log(inputArray)
            console.log(outputArray)
            additem()
            scrollToBottom()
            document.getElementById('userInput').value = ''; // Clear input field

            // Display the stored data on the page
            // document.getElementById('storedData').textContent = storedData;
            // console.log(storedData)
        }
    })
    .catch(error => console.error('Error:', error));
   
});



