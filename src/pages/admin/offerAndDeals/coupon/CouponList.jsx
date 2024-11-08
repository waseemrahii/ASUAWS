// import React from "react";
// import { useSelector } from "react-redux";
// import ExportButton from "../../../../components/ActionButton/Export";
// import LoadingSpinner from "../../../../components/LoodingSpinner/LoadingSpinner";

// const CouponList = () => {
//   const { coupons, loading, error } = useSelector((state) => state.coupons);

//   return (
//     <div>
//       <div className="card">
//         <div className="px-3 py-4">
//           <div className="d-flex flex-wrap gap-3 align-items-center">
//             <h5 className="mb-0 text-capitalize d-flex gap-2 mr-auto">
//               Coupon list
//               <ExportButton title="Export" />
//             </h5>
//           </div>
//         </div>
//         <div className="card-body">
//           {loading ? (
//             <div className="text-center">
//               <LoadingSpinner />
//             </div>
//           ) : (
//             <table className="table table-bordered">
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Title</th>
//                   <th>Code</th>
//                   <th>Type</th>
//                   <th>Discount Amount</th>
//                   <th>Start Date</th>
//                   <th>Expiration Date</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {coupons.map((coupon, index) => (
//                   <tr key={coupon?._id}>
//                     <td>{index + 1}</td>
//                     <td>{coupon?.title}</td>
//                     <td>{coupon?.code}</td>
//                     <td>{coupon?.type}</td>
//                     <td>{coupon?.discountAmount}</td>
//                     <td>{new Date(coupon?.startDate).toLocaleDateString()}</td>
//                     <td>{new Date(coupon?.expiredDate).toLocaleDateString()}</td>
//                     <td>{coupon?.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CouponList;



import React, { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import {
  fetchCoupons,
  updateCouponStatus,
  deleteCoupon,
} from "../../../../redux/slices/admin/couponSlice";
import Switcher from "../../../../components/FormInput/Switcher";
import ConfirmationModal from "../../../../components/FormInput/ConfirmationModal";
import ActionButton from "../../../../components/ActionButton/Action";
import LoadingSpinner from "../../../../components/LoodingSpinner/LoadingSpinner";
import { FaEdit, FaTrash } from "react-icons/fa";

const LazyTableList = lazy(() =>
  import("../../../../components/FormInput/TableList")
);

const CouponList = () => {
  const dispatch = useDispatch();
  const { coupons: allCoupons, loading } = useSelector((state) => state.coupons);
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    dispatch(fetchCoupons()).then(({ payload }) => {
      setCoupons(payload);
    });
  }, [dispatch]);
  

  const handleUpdateStatus = (id, currentStatus) => {
    const newStatus = currentStatus ? "active" : "inactive";
    ConfirmationModal({
      title: "Are you sure?",
      text: `Do you want to ${newStatus} this coupon?`,
    }).then((willUpdate) => {
      if (willUpdate) {
        dispatch(updateCouponStatus({ couponId: id, status: newStatus }))
          .then(() => {
            toast.success(`Coupon status updated to ${newStatus}!`);
            setCoupons((prevCoupons) =>
              prevCoupons.map((coupon) =>
                coupon._id === id ? { ...coupon, status: newStatus } : coupon
              )
            );
          })
          .catch(() => toast.error("Failed to update coupon status."));
      } else {
        toast.info("Status update canceled.");
      }
    });
  };

  const handleDeleteCoupon = (id) => {
    ConfirmationModal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this coupon!",
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCoupon(id))
          .then(() => {
            toast.success("Coupon deleted successfully!");
            setCoupons((prevCoupons) => prevCoupons.filter((coupon) => coupon._id !== id));
          })
          .catch(() => toast.error("Failed to delete the coupon."));
      } else {
        toast.info("Coupon deletion canceled.");
      }
    });
  };

  const columns = [
   
    { key: "code", label: "Code", render: (coupon) => coupon?.code || "N/A" },
    { key: "title", label: "Title", render: (coupon) => coupon?.title || "N/A" },
    { key: "type", label: "Type", render: (coupon) => coupon?.type || "N/A" },
    { key: "discountAmount", label: "Discount Amount", render: (coupon) => coupon?.discountAmount || "0" },
    {
      key: "startDate",
      label: "Start Date",
      render: (coupon) => coupon?.startDate ? new Date(coupon.startDate).toLocaleDateString() : "N/A",
    },
    {
      key: "expiredDate",
      label: "Expiration Date",
      render: (coupon) => coupon?.expiredDate ? new Date(coupon.expiredDate).toLocaleDateString() : "N/A",
    },
    {
      key: "status",
      label: "Status",
      render: (coupon) => coupon && (
        <Switcher
          checked={coupon.status === "active"}
          onChange={() => handleUpdateStatus(coupon._id, coupon.status !== "active")}
        />
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (coupon) => coupon && (
        <div className="flex justify-center gap-2">
          <ActionButton
            onClick={() => handleDeleteCoupon(coupon._id)}
            icon={FaTrash}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <div className="">
        <React.Suspense fallback={<LoadingSpinner />}>
          <LazyTableList
            tableTitle="Coupon List"
            listData={coupons} // Pass the locally managed coupons
            columns={columns}
          />
        </React.Suspense>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CouponList;
