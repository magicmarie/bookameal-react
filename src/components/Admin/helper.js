import { notify } from "react-notify-toast";
import axiosInstance from "../common/Apicalls";

export const postNewMeal = (values, object) => {
  const { meal_name, price } = values;
  // create new meal
  axiosInstance
    .post("/meals", { meal_name, price })
    .then(response => {
      object.reset();
      // meal created: show success message, close the modal and update th meals list
      notify.show(response.data.message, "success", 2500);
    })
    // meal not created, show errors
    .catch(error => {
      if (error.response) {
        object.setState({ message: error.response.data.message });
      } else if (error.request) {
        notify.show("Network error", "error", 2500);
      }
    });
};
