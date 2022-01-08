import React from 'react';
import './Tasks.css';
import SubNavbar from '../../Components/SubNavbar/SubNavbar';

function Tasks() {
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
