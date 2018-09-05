import React from "react";
import moment from "moment";

const Footer = () => {
  // moment: js lib to manage dates
  // sets the year to the current year: 4-digits Year
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
