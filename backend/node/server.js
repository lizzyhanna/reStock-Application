const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const {
  log,
  ExpressAPILogMiddleware
} = require('@rama41222/node-logger');

//mysql connection
var connection = mysql.createConnection({
  host: 'backend-db',
  port: '3306',
  user: 'manager',
  password: 'Password',
  database: 'db'
});

//set up some configs for express.
const config = {
  name: 'sample-express-app',
  port: 8000,
  host: '0.0.0.0',
};

//create the express.js object
const app = express();

//create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({
  console: true,
  file: false,
  label: config.name
});

app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));
app.use(ExpressAPILogMiddleware(logger, {
  request: true
}));

//Attempting to connect to the database.
connection.connect(function (err) {
  if (err)
    logger.error("Cannot connect to DB!");
  logger.info("Connected to the DB!");
});

//GET /
app.get('/', (req, res) => {
  res.status(200).send('Go to 0.0.0.0:3000.');
});



//READ TABLE REQUESTS ----------------------------------------------

//GET /products
app.get('/products', (req, res) => {
  connection.query('SELECT * FROM db.products', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET /product_types
app.get('/product_types', (req, res) => {
  connection.query(`
      SELECT db.product_types.*, db.departments.dept_name, COUNT(db.products.product_id) AS in_stock
      FROM db.product_types 
        INNER JOIN db.departments ON db.product_types.dept_id = db.departments.dept_id
        LEFT OUTER JOIN db.products ON db.product_types.product_type_id = db.products.product_type_id
          AND db.products.sale_id IS NULL
      GROUP BY db.product_types.product_type_id
      ORDER BY db.product_types.product_type_id
      `, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET /departments
app.get('/departments', (req, res) => {
  connection.query('SELECT db.departments.*, db.users.first as manager_first, db.users.last as manager_last FROM db.departments JOIN db.users ON db.departments.dept_mngr = db.users.user_id', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET /orders
app.get('/orders', (req, res) => {
  connection.query('SELECT * FROM db.orders', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET /sales
app.get('/sales', (req, res) => {
  connection.query('SELECT * FROM db.sales', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET /users
app.get('/users' ,(req, res) => {
  connection.query('SELECT * FROM db.users', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});



//READ ROW REQUEST ------------------------------------------------

//GET /products/{id}
app.get('/products/:product_id', (req, res) => {
  connection.query('SELECT * FROM db.products WHERE db.products.product_id = ?', [req.params.product_id], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET /product_types/{id}
app.get('/product_types/:product_type_id', (req, res) => {
  connection.query(`
      SELECT db.product_types.*, db.departments.dept_name, COUNT(db.products.product_id) AS in_stock
      FROM db.product_types 
        INNER JOIN db.departments ON db.product_types.dept_id = db.departments.dept_id
        LEFT OUTER JOIN db.products ON db.product_types.product_type_id = db.products.product_type_id
            AND db.products.sale_id IS NULL
      WHERE db.product_types.product_type_id = ?
      GROUP BY db.product_types.product_type_id
      ORDER BY db.product_types.product_type_id
      `, [req.params.product_type_id], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET /departments/{id}
app.get('/departments/:dept_id', (req, res) => {
  connection.query('SELECT db.departments.*,db.users.first as manager_first, db.users.last as manager_last FROM db.departments JOIN db.users ON db.departments.dept_mngr = db.users.user_id WHERE db.departments.dept_id = ?', [req.params.dept_id], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET /orders/{id}
app.get('/orders/:order_id', (req, res) => {
  connection.query('SELECT * FROM db.orders WHERE db.orders.order_id = ?', [req.params.order_id], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET /sales/{id}
app.get('/sales/:sale_id', (req, res) => {
  connection.query('SELECT * FROM db.sales WHERE db.sales.sale_id = ?', [req.params.sale_id], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET /users/{id}
app.get('/users/:user_id', (req, res) => {
  connection.query('SELECT * FROM db.users WHERE db.users.user_id = ?', [req.params.user_id], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});



//CREATE ROW REQUEST ----------------------------------------------

//POST /products
app.post('/products', (req, res) => {
  console.log(req.body);

  var values_string = 'product_type_id, order_id, sale_id, exp_date, location';
  var values = [req.body.product_type_id, req.body.order_id, req.body.sale_id, req.body.exp_date, req.body.location];

  connection.query(`INSERT INTO db.products (${values_string}) VALUES(?, ?, ?, ?, ?)`, values, function (err, rows, fields) {
    if (err) {
      logger.error("Problem inserting into products table");
      throw err;
    } else {
      res.status(200).send(`added to the table!`);
    }
  });
});

//POST /product_types
app.post('/product_types', (req, res) => {
  console.log(req.body);

  var values_string = 'dept_id, product_type_name, price';
  var values = [req.body.dept_id, req.body.product_type_name, req.body.price];

  connection.query(`INSERT INTO db.product_types (${values_string}) VALUES(?, ?, ?)`, values, function (err, rows, fields) {
    if (err) {
      logger.error("Problem inserting into product_types table");
      throw err;
    } else {
      res.status(200).send(`added ${req.body.product_type_name} to the table!`);
    }
  });
});

//POST /departments
app.post('/departments', (req, res) => {
  console.log(req.body);

  var values_string = 'dept_name, dept_mngr';
  var values = [req.body.dept_name, req.body.dept_mngr];

  connection.query(`INSERT INTO db.departments (${values_string}) VALUES(?, ?)`, values, function (err, rows, fields) {
    if (err) {
      logger.error("Problem inserting into departments table");
      throw err;
    } else {
      res.status(200).send(`added ${req.body.dept_name} to the table!`);
    }
  });
});

//POST /orders
app.post('/orders', (req, res) => {
  console.log(req.body);

  var values_string = 'order_date';
  var values = [req.body.order_date];

  connection.query(`INSERT INTO db.orders (${values_string}) VALUES(?)`, values, function (err, rows, fields) {
    if (err) {
      logger.error("Problem inserting into orders table");
      throw err;
    } else {
      res.status(200).send(`added to the table!`);
    }
  });
});

//POST /sales
app.post('/sales', (req, res) => {
  console.log(req.body);

  var values_string = 'sale_date';
  var values = [req.body.sale_date];

  connection.query(`INSERT INTO db.sales (${values_string}) VALUES(?)`, values, function (err, rows, fields) {
    if (err) {
      logger.error("Problem inserting into sales table");
      throw err;
    } else {
      res.status(200).send(`added to the table!`);
    }
  });
});

//POST /users
app.post('/users', (req, res) => {
  console.log(req.body);

  var values_string = 'type, dept_id, email, password, first, last';
  var values = [req.body.type, req.body.dept_id, req.body.email, req.body.password, req.body.first, req.body.last]

  connection.query(`INSERT INTO db.users (${values_string}) VALUES(?, ?, ?, ?, ?, ?)`, values, function (err, rows, fields) {
    if (err) {
      logger.error("Problem inserting into users table");
      throw err;
    } else {
      res.status(200).send(`added to the table!`);
    }
  });
});



//UPDATE ROW REQUEST ----------------------------------------------

//PUT /products/{id}
app.put('/products/:product_id', (req, res) => {
  console.log(req.body);

  var values = [req.body.product_type_id, req.body.order_id, req.body.sale_id, req.body.exp_date, req.body.location, req.params.product_id];

  connection.query(`
      UPDATE db.products 
      SET 
        db.products.product_type_id = ?, 
        db.products.order_id = ?, 
        db.products.sale_id = ?, 
        db.products.exp_date = ?, 
        db.products.location = ?
        WHERE db.products.product_id = ?
      `, values, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//PUT /product_types/{id}
app.put('/product_types/:product_type_id', (req, res) => {
  console.log(req.body);

  var values = [req.body.dept_id, req.body.price, req.body.product_type_name, req.params.product_type_id];

  connection.query(`
      UPDATE db.product_types 
      SET 
        db.product_types.dept_id = ?, 
        db.product_types.price = ?, 
        db.product_types.product_type_name = ? 
        WHERE db.product_types.product_type_id = ?
      `, values, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//PUT /departments/{id}
app.put('/departments/:dept_id', (req, res) => {
  console.log(req.body);

  var values = [req.body.dept_name, req.body.dept_mngr, req.params.dept_id];

  connection.query(`
      UPDATE db.departments 
      SET 
        db.departments.dept_name = ?, 
        db.departments.dept_mngr = ? 
        WHERE db.departments.dept_id = ?
      `, values, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//PUT /orders/{id}
app.put('/orders/:order_id', (req, res) => {
  console.log(req.body);

  var values = [req.body.order_date, req.params.order_id];

  connection.query(`
      UPDATE db.orders 
      SET 
        db.orders.order_date = ? 
        WHERE db.orders.order_id = ?
      `, values, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//PUT /sales/{id}
app.put('/sales/:sale_id', (req, res) => {
  console.log(req.body);

  var values = [req.body.sale_date, req.params.sale_id];

  connection.query(`
      UPDATE db.sales 
      SET 
        db.sales.sale_date = ? 
        WHERE db.sales.sale_id = ?
      `, values, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//PUT /users/{id}
app.put('/users/:user_id', (req, res) => {
  console.log(req.body);

  var values = [req.body.type, req.body.dept_id, req.body.email, req.body.password, req.body.first, req.body.last, req.params.user_id];

  connection.query(`
      UPDATE db.users 
      SET 
        db.users.type = ?, 
        db.users.dept_id = ?, 
        db.users.email = ?, 
        db.users.password = ?, 
        db.users.first = ?, 
        db.users.last = ? 
        WHERE db.users.user_id = ?
      `, values, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});



//DELETE ROW REQUEST ----------------------------------------------

//DELETE /products/{id}
app.delete('/products/:product_id', (req, res) => {
  connection.query('DELETE FROM db.products WHERE db.products.product_id = ?', [req.params.product_id], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//DELETE /product_types/{id}
app.delete('/product_types/:product_type_id', (req, res) => {
  connection.query('DELETE FROM db.product_types WHERE db.product_types.product_type_id = ?', [req.params.product_type_id], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//DELETE /departments/{id}
app.delete('/departments/:dept_id', (req, res) => {
  connection.query('DELETE FROM db.departments WHERE db.departments.dept_id = ?', [req.params.dept_id], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//DELETE /orders/{id}
app.delete('/orders/:order_id', (req, res) => {
  connection.query('DELETE FROM db.orders WHERE db.orders.order_id = ?', [req.params.order_id], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//DELETE /sales/{id}
app.delete('/sales/:sale_id', (req, res) => {
  connection.query('DELETE FROM db.sales WHERE db.sales.sale_id = ?', [req.params.sale_id], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//DELETE /users/{id}
app.delete('/users/:user_id', (req, res) => {
  connection.query('DELETE FROM db.users WHERE db.users.user_id = ?', [req.params.user_id], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});



//SPECIFIC REQUESTS

//GET /product_types/:product_type_id/quantity

app.get('/product_types/:product_type_id/quantity', (req, res) => {
  console.log(req.body);

  connection.query(`
      SELECT COUNT(*) as in_stock 
      FROM db.products 
        INNER JOIN db.product_types 
          ON db.products.product_type_id = db.product_types.product_type_id 
      WHERE db.product_types.product_type_id = ?
      AND db.products.sale_id IS NULL
      `, [req.params.product_type_id], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//POST /login

app.post('/login', (req, res) => {
  console.log(req.body);

  connection.query(`
      SELECT 
        CASE 
          WHEN EXISTS (
            SELECT * 
            FROM db.users 
            WHERE db.users.email = ? AND db.users.password = ?) 
          THEN 1
          ELSE 0
        END as Valid
          `, [req.body.email, req.body.password], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET /users/department/:dept_id
app.get('/users/department/:dept_id', (req, res) => {
  console.log(req.body);

  connection.query(`
      SELECT db.users.* 
      FROM db.users 
      INNER JOIN db.departments 
        ON db.users.dept_id = db.departments.dept_id 
      WHERE db.departments.dept_id = ?
      `, [req.params.dept_id], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET /product_types/name/:product_type_name
app.get('/product_types/name/:product_type_name', (req, res) => {
  console.log(req.body);

  connection.query(`
      SELECT db.product_types.*, db.departments.dept_name, COUNT(db.products.product_id) AS in_stock
      FROM db.product_types 
        INNER JOIN db.departments ON db.product_types.dept_id = db.departments.dept_id
        LEFT OUTER JOIN db.products ON db.product_types.product_type_id = db.products.product_type_id
            AND db.products.sale_id IS NULL
      WHERE db.product_types.product_type_name LIKE ` + connection.escape('%'+req.params.product_type_name+'%') + ` 
      GROUP BY db.product_types.product_type_id
      ORDER BY db.product_types.product_type_id
    `, function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});


//GET /product_types/department/:dept_id
app.get('/product_types/department/:dept_id', (req, res) => {
  console.log(req.body);

  connection.query(`SELECT * FROM db.product_types WHERE db.product_types.dept_id = ?`, [req.params.dept_id], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET /products/product_type/:product_type_id
app.get('/products/product_type/:product_type_id', (req, res) => {
  console.log(req.body);

  connection.query(`SELECT * FROM db.products WHERE db.products.product_type_id = ?`, [req.params.product_type_id], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//GET /products/sale/:sale_id
app.get('/products/sale/:sale_id', (req, res) => {
  console.log(req.body);

  connection.query(`SELECT * FROM db.products WHERE db.products.sale_id = ?`, [req.params.sale_id], function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing query");
      res.status(400).json({
        "data": [],
        "error": "MySQL error"
      })
    } else {
      res.status(200).json({
        "data": rows
      });
    }
  });
});

//connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});