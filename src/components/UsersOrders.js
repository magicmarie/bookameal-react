// import React, { Component } from "react";
// import Loader from "react-loader";
// import { notify } from "react-notify-toast";
// import axiosInstance from "./common/Apicalls";

// const Order = props => (
//   <div className=" card mb-2 meal">
//     <div className="card-body text-center">
//       <div className="card-text"> {props.mealName}</div>
//       <div className="card-text">{props.price}</div>
//     </div>
//   </div>
// );

// class AdminDashboard extends Component {
//   state = {
//     orders: [],
//     loaded: false
//   };
//   //get all orders from admin's meals
//   getUserOrders = () => {
//     axiosInstance
//       .get("/orders")
//       .then(response => {
//         const orders = response.data;
//         this.setState({ orders, loaded: true });
//       })
//       .catch(error => {
//         if (error.response) {
//           const { status } = error.response;
//           if (status === 404) {
//             this.setState({
//               orders: []
//             });
//           } else if (status === 401) {
//             localStorage.removeItem("token");
//           }
//         } else if (error.request) {
//           notify.show("Wrong request", "warning", 4000);
//         }
//       });
//   };

//   // always called before the component's first render
//   // fetches the orders list
//   componentWillMount() {
//     this.getUserOrders();
//   }
//   render() {
//     const { orders, loaded } = this.state;

//     const ordersDetails =
//       orders.length === 0 ? (
//         <div>No orders Found</div>
//       ) : (
//         orders.map(order => (
//           <div key={order.id}>
//             <Order
//               id={order.id}
//               mealName={order.meal_name}
//               price={order.price}
//               key={order.id}
//             />
//           </div>
//         ))
//       );

//     return (
//       <div className="container-fluid">
//         <div className="row">
//           <div className="meal-list">
//             <h2 className="header text-center">Orders List</h2>
//             <Loader loaded={loaded}>
//               <div className="row">{ordersDetails}</div>
//             </Loader>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// export default AdminDashboard;
