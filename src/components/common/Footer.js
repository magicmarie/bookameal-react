import React from "react";
import moment from "moment";

const Footer = () => {
  //sets the year to the current year
  const year = moment().format("YYYY");
  return (
    <div className="footer">
      <p>
        Bookameal@
        {year}
      </p>
    </div>
  );
};
export default Footer;
