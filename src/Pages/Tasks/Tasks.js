import React from 'react';
import './Tasks.css';
import Navbar from '../../Components/Navbar/Navbar';

function Tasks() {
    const listcontents = [];
    var stored = localStorage.getItem("list-contents");
    if (stored) {
        stored = stored.split(",");
    } else {
        stored = [];
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');  // January is 0!
    var yyyy = today.getFullYear();
    today = mm + ' / ' + dd + ' / ' + yyyy;

    function submitEntry(event) {
        event.preventDefault();
        document.getElementById("button").click();
    }

    listcontents.push("");
    function addToList() {
        var node = document.createElement("LI");
        var inputvalue = document.getElementById("inputfield").value;
        if (inputvalue === "") {
            return;
        }
        else {
            var textnode = document.createTextNode(inputvalue);
            node.appendChild(textnode);
            document.getElementById("list").appendChild(node);

            listcontents.push(node.innerText);
            console.log("Pushed '" + node.innerText + "' to listcontents array.");
            var storetodaydate = new Date().toLocaleDateString();
            var storetodaytime = new Date().toLocaleTimeString();
            listcontents[0] = storetodaydate + " - " + storetodaytime;
            console.log(listcontents);
            localStorage.setItem("list-contents", listcontents.join(', '));

            node.addEventListener("click", function() {
                node.style.display = "none";
                const index = listcontents.indexOf(node.innerText);
                if (index > -1) {
                    listcontents.splice(index, 1);
                    console.log("Popped '" + node.innerText + "' from listcontents array.");
                    var storetodaydate = new Date().toLocaleDateString();
                    var storetodaytime = new Date().toLocaleTimeString();
                    listcontents[0] = storetodaydate + " - " + storetodaytime;
                    console.log(listcontents);
                    localStorage.setItem("list-contents", listcontents.join(', '));
                }
            });
        }
        document.getElementById("form").reset();
    }

    return (
        <main className='Tasks'>
            <Navbar />
            <div className='outer-container'>
                <div className='grid-container'>
                    <div className='date'>
                        <div>{today}</div>
                    </div>
                    <div className='list'>
                        <ul id='list'></ul>
                    </div>
                    <div className='form'>
                        <form id='form' onSubmit={submitEntry}>
                            <input id='inputfield' placeholder='Create New Task' />
                            <button id='button' type='button' onClick={addToList}>Send</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className='desc-container'>
                <div className='storedinfo-container'>
                    <div className='title'>Your Saved Tasks</div>
                    <ol className='stored'>{stored.map((item) => (<li key={item}>{item}</li>))}</ol>
                </div>
                <div className='description-container'>
                    <div className='title'>Description</div>
                    <p className='description'>A user can <b>create tasks</b> and <b>delete specific tasks</b> by hovering over and clicking them.<br/>The localStorage object <b>saves tasks</b> that weren't deleted, across browser sessions, and <b>displays</b> them under the section "Your Saved Tasks" along with the time of the last appended or deleted task <i>after page refresh</i>.<br/><i>So if you decide to keep this page open all day, you can use it as a note-taking app with no fear of your tasks being lost!</i></p>
                </div>
            </div>
        </main>
    );
}

export default Tasks;
