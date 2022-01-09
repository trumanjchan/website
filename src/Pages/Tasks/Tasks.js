import React from 'react';
import './Tasks.css';
import SubNavbar from '../../Components/SubNavbar/SubNavbar';

function Tasks() {
    const listcontents = [];
    var stored = "Your tasks from last time:\n" + localStorage.getItem("list-contents");

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
        else if (inputvalue === "/showless") {
            document.getElementById("storedinfo").style.display = "none";
            console.log("Used command '/showless' to hide previous tasks!");
        }
        else if (inputvalue === "/showall") {
            document.getElementById("storedinfo").style.display = "block";
            console.log("Used command '/showall' to show previous tasks!");
        }
        else {
            var textnode = document.createTextNode(inputvalue);
            node.appendChild(textnode);
            document.getElementById("list").appendChild(node);

            listcontents.push(node.innerText);
            console.log("Pushed '" + node.innerText + "' to listcontents array.");
            localStorage.setItem("list-contents", JSON.stringify(listcontents));
            console.log(JSON.stringify(listcontents));
        }
        
        node.addEventListener("click", function() {
            node.style.display = "none";
        });

        var form = document.getElementById("form");
        form.reset();
    }

    return (
        <main className='Tasks'>
            <SubNavbar />
            <div className='outer-container'>
                <div className='grid-container'>
                    <div className='date'>
                        <div>{today}</div>
                    </div>
                    <div className='list'>
                        <ul id='list'></ul>
                        <ul id='storedinfo'>{stored}</ul>
                    </div>
                    <div className='form'>
                        <form id='form' onSubmit={submitEntry}>
                            <input placeholder='Create New Task' />
                            <button id='button' type='button' onClick={addToList}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Tasks;
