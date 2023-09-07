import React, { Fragment, useState } from "react"
import axios from "axios"

const UserEditBooking = ({ book }) => {

    const [status, setStatus] = useState(book.status);

    // Edit description function

    const updateStatus = async e => {
        e.preventDefault()

        try {
            const body = {status};
            const response = await fetch(`http://localhost:5000/booking/${book.bookingid}`,{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            //window.location = "/";
        } catch (err) {
            console.error(err.message);
            
        }
    };

  return (
    <Fragment>
        <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${book.bookingid}`}>
        Edit
        </button>

        <div class="modal" id={`id${book.bookingid}`}>
            <div class="modal-dialog">
                <div class="modal-content">

                <div class="modal-header">
                    <h4 class="modal-title">Edit Booking</h4>
                    <button 
                        type="button" 
                        class="close" 
                        data-dismiss="modal"
                        onClick={() => setStatus(book.status)}
                    >
                        &times;
                    </button>
                </div>


                <div class="modal-body">
                    <input 
                        type="text" 
                        className="form-control" 
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                    />
                </div>

                <div class="modal-footer">
                    <button 
                        type="button" 
                        class="btn btn-warning" 
                        data-dismiss="modal" onClick={e => updateStatus(e)}
                    >
                        Save
                    </button>
                    <button 
                        type="button" 
                        class="btn btn-danger" 
                        data-dismiss="modal"
                        //onClick={() => setDescription(todo.description)}
                    >
                        Close
                    </button>
                </div>

                </div>
            </div>
            </div>
           
    </Fragment>
  )
}

export default UserEditBooking