const mongoose = require("mongoose");

class DatabaseConnector {
  constructor(url, db_type) {
    this.url = url;
    this.db_type = db_type;
  }

  connect_local_db = async () => {
    await mongoose
      .connect(this.url)
      .then(() => console.log("Local database connected successfully"))
      .catch((error) => console.log({ error: error.message }));
  };

  connect_production_db = async() => {
    console.log("Production database connected successfully")
  }

  connect_database() {
    if (this.db_type === "LOCAL") {
        this.connect_local_db()
    } else if(this.db_type === "PRODUCTION") {
        this.connect_production_db()
    }
  }
}

module.exports = { DatabaseConnector }