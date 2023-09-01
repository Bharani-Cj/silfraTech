//var declaration
let pool;

exports.varDec = (val) => {
  pool = val;
  const query = `CREATE TABLE IF NOT EXISTS courses (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL
    )`;

  pool.query(query, (err, result) => {
    if (err) {
      console.log(err.message + " From table 1");
    } else {
      const query = `CREATE TABLE IF NOT EXISTS students (
          student_id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) NOT NULL UNIQUE,
          phone_number VARCHAR(255) NOT NULL,
          course_id INT NOT NULL,
          FOREIGN KEY (course_id) REFERENCES courses(id)  
  )`;
      pool.query(query, (err, result) => {
        if (err) {
          console.log(err.message + " From table 2");
        } else {
          console.log(`table created successfully`);
        }
      });
    }
  });
};

//get All Users
exports.getAllUsers = (req, res) => {
  const query = `SELECT * FROM courses c 
                  JOIN students s
                  ON c.id = s.course_id`;
  pool.query(query, (err, result) => {
    res.status(200).json({
      status: "success",
      user: result,
    });
  });
};

// Create a new user
exports.createUser = (req, res) => {
  const { email, phoneNumber, courseName } = req.body;

  const query = `SELECT id FROM courses WHERE course_name=?`;
  pool.query(query, [courseName], (err, result) => {
    if (err) {
      return console.log(err.message);
    } else if (result.length === 0) {
      const query = `INSERT INTO courses (course_name) VALUES (?)`;
      pool.query(query, [courseName], (err, result) => {
        if (err) {
          res.status(426).json({
            status: "fail",
            error: err.message,
          });
        } else {
          const id = result.insertId;
          const query = `INSERT INTO students (email,phone_number,course_id) VALUES (?,?,?)`;
          pool.query(query, [email, phoneNumber, id], (err, result) => {
            if (err) {
              res.status(426).json({
                status: "Fail",
                message: err.message,
              });
            } else {
              res.status(200).json({
                status: "success",
                message: "user successfully added",
              });
            }
          });
        }
      });
    } else {
      const id = result[0].id;
      const query = `INSERT INTO students (email,phone_number,course_id) VALUES (?,?,?)`;
      pool.query(query, [email, phoneNumber, id], (err, result) => {
        if (err) {
          const error = err.message.split(/[']/)[0] === "Duplicate entry ";

          res.status(426).json({
            status: "Fail",
            error: error && "User already exists",
          });
        } else {
          res.status(200).json({
            status: "success",
            message: "user successfully added",
          });
        }
      });
    }
  });
};

//delete a user
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  console.log(id);
  const query = "DELETE FROM students WHERE student_id=?";
  pool.query(query, [id], (err, result) => {
    if (err) {
      res.status(401).json({ error: err.message });
    } else {
      res.status(200).json({
        message: "user deleted sucessfully",
        result,
      });
    }
  });
};

//update a user
exports.getUser = (req, res) => {
  const { id } = req.params;
  const query = `SELECT email,course_name,phone_number FROM courses c
                  JOIN students s
                  ON c.id=s.course_id
                  WHERE student_id=?`;
  pool.query(query, [id], (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.status(200).json({
        result,
      });
    }
  });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { email, phoneNumber, courseName } = req.body;

  const query = `SELECT id FROM courses WHERE course_name=?`;
  pool.query(query, [courseName], (err, result) => {
    if (err) {
      res.status(401).json({
        error: err.message,
      });
    } else {
      const courseID = result[0].id;
      const query = "UPDATE students SET email=?,phone_number=?,course_id=? WHERE student_id=?";
      pool.query(query, [email, phoneNumber, courseID, id], (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          res.status(200).json({
            result,
          });
        }
      });
    }
  });
};
