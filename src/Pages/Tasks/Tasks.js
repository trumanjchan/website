import React from 'react';
import './Tasks.css';
import Navbar from '../../Components/Navbar/Navbar';

function Tasks() {
    const listcontents = [];
    var stored = localStorage.getItem("list-contents");

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');  // January is 0!
    var yyyy = today.getFullYear();
    today = mm + ' / ' + dd + ' / ' + yyyy;

    function submitEntry(event) {
        event.preventDefault();
        document.getElementById("button").click();
    }

    function addToList() {
        var node = document.createElement("LI");
        var inputvalue = document.querySelector("input").value;
        if (inputvalue === "") {
            return;
        }
        else {
            var textnode = document.createTextNode(inputvalue);
            node.appendChild(textnode);
            document.getElementById("list").appendChild(node);

            listcontents.push(node.innerText);
            console.log("Pushed '" + node.innerText + "' to listcontents array.");
            localStorage.setItem("list-contents", listcontents.join(', '));
            console.log(listcontents);

            node.addEventListener("click", function() {
                node.style.display = "none";
                const index = listcontents.indexOf(node.innerText);
                if (index > -1) {
                    listcontents.splice(index, 1);
                    console.log("Popped '" + node.innerText + "' from listcontents array.");
                    localStorage.setItem("list-contents", listcontents.join(', '));
                    console.log(listcontents);
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
                            <input placeholder='Create New Task' />
                            <button id='button' type='button' onClick={addToList}>Send</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className='desc-container'>
                <div className='storedinfo-container'>
                    <div className='title'>Your Saved Tasks</div>
                    <div className='stored'>{stored}</div>
                </div>
                <div className='description-container'>
                    <div className='title'>Description</div>
                    <p className='description'>A user can <b>create tasks</b> and <b>delete specific tasks</b> by hovering over and clicking them.<br/>The localStorage object <b>saves tasks</b> that weren't deleted, across browser sessions, and displays them under the section "Your Saved Tasks".<br/><i>So if you decide to keep this page open all day, you can use it as a note-taking app with no fear of your tasks being lost!</i></p>
                </div>
            </div>
        </main>
    );
}

export default Tasks;
