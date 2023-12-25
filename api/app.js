import express from "express";
import cors from "cors";
import {
  database_operation,
  set_views_path,
  revenue_monthly_data,
} from "./helper/utils.js";

var app = express();

// setting views directory
var views_path = set_views_path();
app.set("views", views_path);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
var db = database_operation();
// console.log("========xx==========", db);
var port = 5432;

function database_poll() {
  db.all("SELECT * FROM revenues", (err, revenueData) => {
    if (err) {
      console.error(err);
      // res.status(500).send("Internal Server Error");
      setTimeout(() => {
        console.log("polling ...");
        database_poll();
      }, 1000);
    } else {
      // when the revenue table found we go with the main operations

      //   revenue_monthly_data.forEach((item, idx) => {
      //     var { month, value } = item;
      //     db.run(
      //       "INSERT INTO revenues (id, month, revenue) VALUES (?, ?, ?)",
      //       [idx + 1, month, value],
      //       (err) => {
      //         if (err) {
      //           console.error(err);
      //           //   res.status(500).send('Internal Server Error');
      //         } else {
      //           //   res.redirect('/');
      //           console.log("Added ... ... ...", month);
      //         }
      //       }
      //     );
      //   });

      //   console.log("All data", revenueData);

      //   for HTML get
      app.get("/", (req, res) => {
        return res.render("index", { revenueData });
      });

      //   for HTML post
      app.post("/update", (req, res) => {
        if (req.query.month) {
          var query_month = req.query.month;
          if (req.body[query_month]) {
            var revenue_value = req.body[query_month];
            var updatedData = [...revenueData];
            var index = revenueData.findIndex(
              (data) => data.month == query_month
            );
            if (index >= 0) {
              updatedData[index].revenue = revenue_value;
              //   console.log(query_month, revenue_value, updatedData );
              var id = updatedData[index].id;
              db.run(
                "UPDATE revenues SET revenue = ? WHERE id = ?",
                [revenue_value, id],
                (err) => {
                  if (err) {
                    console.error(err);
                    return res.status(500).send("Internal Server Error");
                  } else {
                    console.log("Data Updated!");
                    return res.render("index", { revenueData: updatedData });
                  }
                }
              );
            } else {
              return res.status(400).send("Error Data Post!");
            }
          } else {
            return res.status(400).send("Error Data Post!");
          }
        } else {
          return res.status(400).send("Error Data Post!");
        }
      });

      //   for api get
      app.get("/data", (req, res) => {
        var data = JSON.stringify(revenueData);
        return res.status(200).send(data);
      });

      app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
      });
    }
  });
}

database_poll();
