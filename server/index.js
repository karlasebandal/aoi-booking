const bcrypt = require("bcrypt")
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());


// Create user
app.post("/User", async(req, res) => {
    const { name, userName, emailAdd, role, pass } = req.body

  try {
    // Check if the userName is already in use
    const existingUser = await pool.query('SELECT * FROM \"User\" WHERE userName = $1', [userName]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Username is not available' })
    }

    const hashedPassword = await bcrypt.hash(pass, 10)
    const newUser = await pool.query(
      'INSERT INTO \"User\" (name, username, emailadd, role, pass) VALUES($1, $2, $3, $4, $5)',
      [name, userName, emailAdd, role, hashedPassword]
    )
    res.json(newUser.rows)

  } catch (err) {
    console.error(err.message)
    res.status(500).json({ message: 'An error occurred while creating the user' })
  }
})

// Create service
app.post("/service", async(req, res) => {
    const { name, description, price, status } = req.body

    try {
        
        const newService = await pool.query(
            "INSERT INTO Service (name, description, price, status) VALUES($1, $2, $3, $4) RETURNING *", 
        [name, description, price, status]
        );
        res.json(newService.rows);

    } catch (err) {
        console.error(err.message);
    }
})

// Create Guests
app.post("/guest", async(req, res) => {
    const { firstName, lastName, emailAdd, contactNum, pass } = req.body

    try {
        const existingGuest = await pool.query("SELECT * FROM Guest WHERE emailadd = $1", [emailAdd]);

        if (existingGuest.rows.length > 0) {
        return res.status(400).json({ message: 'Email address already in use' })
        }

        const hashedPassword = await bcrypt.hash(pass, 10)
        const newGuest = await pool.query(
            "INSERT INTO Guest (firstName, lastName, emailAdd, contactNum, pass) VALUES($1, $2, $3, $4, $5) RETURNING *", 
        [firstName, lastName, emailAdd, contactNum, hashedPassword]
        );
        res.json(newGuest.rows);

    } catch (err) {
        console.error(err.message);
    }
})

// Create Booking
app.post("/booking", async(req, res) => {
    try {
        const { status, bookingtype, serviceid, guestid, bookingdate, bookingtime } = req.body
        const bookingCreated = new Date().toISOString()

        const newBooking = await pool.query(
            "INSERT INTO booking (bookingCreated, status, bookingtype, serviceid, guestid, bookingdate, bookingtime) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *", 
        [bookingCreated, status, bookingtype, serviceid, guestid, bookingdate, bookingtime]
        );
        res.json(newBooking.rows);

    } catch (err) {
        console.error(err.message);
    }
})

// Create Payment
app.post("/payment", async(req, res) => {
    try {
        const { depositamount, totalpayment, numguests, voucher, bookingid } = req.body

        const newPayment = await pool.query(
            "INSERT INTO payment (depositamount, totalpayment, numguests, voucher, bookingid) VALUES($1, $2, $3, $4, $5) RETURNING *", 
        [depositamount, totalpayment, numguests, voucher, bookingid]
        );
        res.json(newPayment.rows);

    } catch (err) {
        console.error(err.message);
    }
})

// Create PaymentMode
app.post("/paymentmode", async(req, res) => {
    try {
        const { modedesc, paymentid } = req.body

        const newPaymentMode = await pool.query(
            "INSERT INTO PaymentMode (modedesc, paymentid) VALUES($1, $2) RETURNING *", 
        [modedesc, paymentid]
        );
        res.json(newPaymentMode.rows);

    } catch (err) {
        console.error(err.message);
    }
})

// Get Users
app.get("/User", async(req, res) => {
    try {
        const allUsers = await pool.query(
            'SELECT * FROM \"User\"')
        res.json(allUsers.rows);
    
    } catch (err) {
        console.error(err.message); 
    }
})

// Get Users by ID
app.get("/User/:userId", async(req, res) => {
    try {
        const { userid } = req.params;
        const allUsers = await pool.query(
            'SELECT * FROM \"User\" WHERE userid = $1', [userid]);
        res.json(allUsers.rows);
    
    } catch (err) {
        console.error(err.message); 
    }
})

//Get Services
app.get("/Service", async(req, res) => {
    try {
        const allServices = await pool.query(
            'SELECT * FROM service');
        res.json(allServices.rows);
    
    } catch (err) {
        console.error(err.message);
    }
});

//get service by id //updated as of 4:39
app.get("/Service/:serviceId", async(req, res) => {
    try {
        const allServices = await pool.query(
            'SELECT * FROM Service WHERE serviceid = $1', [serviceid]);
        res.json(allServices.rows);
    
    } catch (err) {
        console.error(err.message);
    }
});

//Get Guest
app.get("/guest", async(req, res) => {
    try {
        const allGuests = await pool.query(
            'SELECT * FROM guest');
        res.json(allGuests.rows);
    
    } catch (err) {
        console.error(err.message);
    }
})



//Get Booking
app.get("/booking", async(req, res) => {
    try {
        const allBooking = await pool.query(
            'SELECT * FROM booking');
        res.json(allBooking.rows);
    
    } catch (err) {
        console.error(err.message);
    }
});

//Get Payment
app.get("/payment", async(req, res) => {
    try {
        const allPayment = await pool.query(
            'SELECT * FROM payment');
        res.json(allPayment.rows);
    
    } catch (err) {
        console.error(err.message);
    }
});

//Get PaymentMode
app.get("/paymentmode", async(req, res) => {
    try {
        const allPaymentMode = await pool.query(
            'SELECT * FROM paymentmode');
        res.json(allPaymentMode.rows);
    
    } catch (err) {
        console.error(err.message);
    }
});


// Update user
app.put("/User/:userID", async(req, res) => {
    try {
        const { userID } = req.params;
        const { name, username, emailadd, role, pass } = req.body;
        const updateUser = await pool.query(
            'UPDATE \"User\" SET name = $1, username = $2, emailadd = $3, role = $4, pass = $5 WHERE userID = $6',
        [name, username, emailadd, role, pass, userID]);

        res.json("User is logged in");
    } catch (err) {
        console.error(err.message);
     
    }
});

// Update service
app.put("/Service/:serviceID", async(req, res) => {
    try {
        const { serviceID } = req.params;
        const { name, description, price, status } = req.body;
        const updateBooking = await pool.query(
            "UPDATE Service SET name = $1, description = $2, price = $3, status = $4  WHERE serviceID = $5",
        [name, description, price, status, serviceID]);

        res.json("Service was updated");
    } catch (err) {
        console.error(err.message);
     
    }
});

// Update guest
app.put("/Guest/:guestID", async(req, res) => {
    try {
        const { guestID } = req.params;
        const { firstname, lastname, emailadd, contactnum } = req.body;
        const updateGuest = await pool.query(
            "UPDATE Guest SET firstname = $1, lastname = $2, emailadd = $3, contactnum = $4 WHERE guestid = $5",
        [firstname, lastname, emailadd, contactnum, guestID]);

        res.json("Guest was updated");
    } catch (err) {
        console.error(err.message);
     
    }
});

// Update booking
app.put("/Booking/:bookingID", async(req, res) => {
    try {
        const { bookingID } = req.params;
        const { status, bookingtype, serviceid, guestid, bookingdate } = req.body;
        const updateBooking = await pool.query(
            "UPDATE Booking SET status = $1, bookingtype = $2, serviceID = $3, guestID = $4, bookingdate = $5  WHERE bookingid = $6",
        [status, bookingtype, serviceid, guestid, bookingID, bookingdate]);

        res.json("Booking was updated");
    } catch (err) {
        console.error(err.message);
     
    }
});

// Update Payment
app.put("/Payment/:paymentID", async(req, res) => {
    try {
        const { paymentID } = req.params;
        const { depositamount, totalpayment, numguests, voucher } = req.body;
        const updatePayment = await pool.query(
            "UPDATE Payment SET depositamount = $1, totalpayment = $2, numguests = $3, voucher = $4  WHERE paymentid = $5",
        [depositamount, totalpayment, numguests, voucher, paymentID]);

        res.json("Payment was updated");
    } catch (err) {
        console.error(err.message);
     
    }
});

// Update Payment
app.put("/PaymentMode/:modeID", async(req, res) => {
    try {
        const { modeID } = req.params;
        const { modedesc, paymentid } = req.body;
        const updatePaymentMode = await pool.query(
            "UPDATE PaymentMode SET modedesc = $1, paymentid = $2  WHERE modeid = $3",
        [modedesc, paymentid, modeID]);

        res.json("Payment Mode was updated");
    } catch (err) {
        console.error(err.message);
     
    }
});

// Delete Payment Mode
app.delete("/PaymentMode/:modeID", async(req, res) => {
    try {
        const { modeID } = req.params;
        const deletePaymentMode = await pool.query("DELETE FROM PaymentMode WHERE modeID = $1", [modeID]);
        res.json("Payment mode was deleted!")
    } catch (err) {
        console.error(err.message);
        
    }
})

// Delete Booking
app.delete("/Booking/:bookingID", async(req, res) => {
    try {
        const { bookingID } = req.params;
        const deleteBooking = await pool.query("DELETE FROM Booking WHERE bookingID = $1", [bookingID]);
        res.json("Booking was deleted!")
    } catch (err) {
        console.error(err.message)
        
    }
})

// Delete Payment
app.delete("/Payment/:paymentID", async(req, res) => {
    try {
        const { paymentID } = req.params;
        const deletePayment = await pool.query("DELETE FROM Payment WHERE paymentID = $1", [paymentID]);
        res.json("Payment was deleted!")
    } catch (err) {
        console.error(err.message);
        
    }
})

// User-Login with specific username
app.post("/User/login", async(req, res) => {

    const { username, password } = req.body;
    //console.log(`Inside index.js ${username}`)

    try {
        const result = await pool.query('SELECT * FROM \"User\" WHERE username = $1', [username]);
        //console.log(`Inside try: ${username}`)


        if (result.rows.length === 0) {
          return res.status(401).json({ message: 'Authentication failed' });
        }
    
        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.pass);
    
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Authentication failed' });
        }
        
        //console.log(`${password}`);
        //console.log(`${passwordMatch}`)
        res.json({ message: 'Login successful' });
        

      } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    })

// Guest-Login with specific email address
app.post("/Guest/login", async(req, res) => {

    const { emailAdd, password } = req.body;
    //console.log(`guest login postmethod: ${emailAdd}`)

    try {
        const result = await pool.query('SELECT * FROM Guest WHERE emailAdd = $1', [emailAdd]);      

        if (result.rows.length === 0) {
          return res.status(401).json({ message: 'Authentication failed' })
        }
    
        const guest = result.rows[0]
       // console.log(`${guest.firstName}`)
        const passwordMatch = await bcrypt.compare(password, guest.pass);
    
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Authentication failed' });
        }
        
        //console.log(`${password}`);
        //console.log(`${passwordMatch}`)
        res.json({ message: 'Login successful' });
        

      } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    })

    // Guest-Login with specific username
app.get("/Guest/login", async(req, res) => {

    const { emailAdd, password } = req.body;
    console.log(`Inside get/guest/login.js ${emailAdd}`)

    try {
        const result = await pool.query(`SELECT * FROM Guest WHERE emailadd = $1`, [emailAdd]);
        console.log(`Inside try: ${emailAdd}`)


        if (result.rows.length === 0) {
          return res.status(401).json({ message: 'Authentication failed' })
        }
    
        const guest = result.rows[0]
        const passwordMatch = await bcrypt.compare(password, guest.pass);
    
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Authentication failed' });
        }
        
        //console.log(`${password}`);
        //console.log(`${passwordMatch}`)
        res.json({ message: 'Login successful' });
        

      } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    })


const PORT = 5000
app.listen(PORT, () => {
    console.log("Server has started on port 5000")
})

