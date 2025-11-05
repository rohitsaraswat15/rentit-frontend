import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import RequestPageLinks from "../../components/layout/RequestPageLinks";
import { useAuthContext } from "../../context/useAuthContext";
import { useNotificationContext } from "../../hooks/useNotificationContext";

const RequestPage = () => {
  const { section } = useParams();
  const { user } = useAuthContext();
  const { notifications } = useNotificationContext();

  if (!user) {
    return (
      <DashboardLayout>
        <p className="p-6 text-gray-500">Please sign in to view requests.</p>
      </DashboardLayout>
    );
  }

  const sentRequests = notifications.filter((n) => n.senderId === user.id);

  const pendingRequests = notifications.filter(
    (n) => n.receiverId === user.id && n.status === "pending"
  );
  const approvedRequests = notifications.filter(
    (n) => n.receiverId === user.id && n.status === "approved"
  );

  let data: typeof notifications = [];
  if (section === "sent") data = sentRequests;
  else if (section === "pending") data = pendingRequests;
  else if (section === "approved") data = approvedRequests;

  return (
    <DashboardLayout>
      <RequestPageLinks />

      <section className="p-6">
        <h2 className="text-lg font-semibold mb-4 capitalize">{section} Requests</h2>

        {data.length === 0 ? (
          <p className="text-gray-500">No {section} requests found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {[...data].sort((a,b) => b.timestamp -a.timestamp).map((req) => (
              <div
                key={req.id}
                className="bg-white flex border rounded-sm p-4 hover:bg-gray-200 border-r-2 border-gray-300 transition"
              >
                <div className="w-50 h-20 md:w-45 md:h-38 flex items-center justify-center">
                  <img
                    src={req.productImage}
                    alt={req.productTitle}
                    className="w-full h-full object-cover rounded-sm"
                  />
                </div>

                <div className="flex-col gap-2 ml-6">
                  <p className="font-semibold text-lg">{req.productTitle}</p>
                  <p className="font-semibold text-lg">Rent: {req.productAmount}</p>
                  <p className="text-lg text-green-500 font-bold">Available</p>

                  {section === "sent" && (
                  <>
                    <p className="text-md text-gray-800 mt-1 mb-3">
                      You requested this product from:{" "}
                      <strong>{req.receiverName}</strong> (ID: {req.receiverId})
                    </p>
                    <p className="text-sm text-gray-600">
                      Requested on: 
                      {req.date && req.time ? `${req.date} — ${req.time}` : new Date(req.timestamp).toLocaleString()}
                    </p>
                    <button
                      className="bg-purple-500 mt-4 cursor-pointer text-white w-fit px-4 py-2 rounded-sm hidden sm:block md:block"
                    >
                      View Details
                    </button>
                  </>
                )}

                {section === "pending" && (
                  <>
                    <p className="text-md text-gray-800 mt-1 mb-3">
                      Requested by:{" "}
                      <strong>{req.senderName}</strong> (ID: {req.senderId})
                    </p>
                    <p className="text-sm text-gray-600">
                      {req.date && req.time ? `${req.date} — ${req.time}` : new Date(req.timestamp).toLocaleString()}
                    </p>
                    <button
                      className="bg-green-500 mt-4 cursor-pointer text-white w-fit px-4 py-2 rounded-sm hidden sm:block md:block"
                    >
                      Approve
                    </button>
                  </>
                )}

                {section === "approved" && (
                  <p className="text-sm text-green-600 mt-1">Approved</p>
                )}
                </div>
                 
              </div>
            ))}
          </div>
        )}
      </section>
    </DashboardLayout>
  );
};

export default RequestPage;
