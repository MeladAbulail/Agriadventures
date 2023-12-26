import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardCounter = () => {
  const [usersCounts, setusersCounts] = useState({
    all: 0,
    users: 0,
    admins: 0,
    usersBan: 0,
    males: 0,
    females: 0,
  });

  const [locationsCounts, setLocationsCounts] = useState({
    all: 0,
    awaitingApproval: 0,
    zarqa: 0,
    amman: 0,
    aqaba: 0,
    ajloun: 0,
    // madaba: 0,
    irbid: 0,
  });

  const [productsCounts, setProductsCounts] = useState({
    all: 0,
    awaitingApproval: 0,
    dairy: 0,
    cropSeeds: 0,
    farmEquipments: 0,
    fertilizers: 0,
  });

  const [messagesCounts, setMessagesCounts] = useState({
    all: 0,
    readable: 0,
    notReadable: 0,
  });

  const [reservationsCounts, setReservationsCounts] = useState({
    all: 0,
    complete: 0,
    Incomplete: 0,
  });

  const [ordersCounts, setOrdersCounts] = useState({
    all: 0,
    received: 0,
    notReceived: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:4000/Get_Users_Count');
        setusersCounts({
          all: userResponse.data.allusersCount,
          users: userResponse.data.usersCount,
          admins: userResponse.data.adminsCount,
          usersBan: userResponse.data.usersBanCount,
          males: userResponse.data.males,
          females: userResponse.data.females,
        })

        const locationResponse = await axios.get('http://localhost:4000/Get_Locations_Count');
        setLocationsCounts({
          all: locationResponse.data.alllocationsCount,
          awaitingApproval: locationResponse.data.locationsAwaitingApprovalCount,
          zarqa: locationResponse.data.locationsZarqaCount,
          amman: locationResponse.data.locationsAmmanCount,
          aqaba: locationResponse.data.locationsAqabaCount,
          ajloun: locationResponse.data.locationsAjlounCount,
          // madaba: locationResponse.data.locationsMadabaCount,
          irbid: locationResponse.data.locationsIrbidCount,
        });

        const productResponse = await axios.get('http://localhost:4000/Get_Product_Count');
        setProductsCounts({
          all: productResponse.data.allproductsCount,
          awaitingApproval: productResponse.data.productsAwaitingApprovalCount,
          dairy: productResponse.data.productsDairyCount,
          cropSeeds: productResponse.data.productsCropSeedsCount,
          farmEquipments: productResponse.data.productsFarmEquipmentsCount,
          fertilizers: productResponse.data.productsFertilizersCount,
        });

        const messageResponse = await axios.get('http://localhost:4000/Get_ContactUs_Count');
        setMessagesCounts({
          all: messageResponse.data.allMessagesCount,
          readable: messageResponse.data.readableMessagesCount,
          notReadable: messageResponse.data.notReadableMessagesCount,
        });
      

      const reservationsResponse = await axios.get('http://localhost:4000/Get_Reservations_Count');
      setReservationsCounts({
        all: reservationsResponse.data.allReservationsCount,
        complete: reservationsResponse.data.completeReservationsCount,
        Incomplete: reservationsResponse.data.IncompleteReservationsCount,
      });
    

    const orderSResponse = await axios.get('http://localhost:4000/Get_Orders_Count');
    setOrdersCounts({
      all: orderSResponse.data.allOrdersCount,
      received: orderSResponse.data.receivedOrdersCount,
      notReceived: orderSResponse.data.notReceivedOrdersCount,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
    };

    fetchData();
  }, []);

  const CounterCard = ({ count, label, color, borderColor }) => {
    return (
      <div className={`rounded-md overflow-hidden border ${borderColor} shadow-default dark:border-strokedark dark:bg-boxdark ${color}`}>
        <div className="p-4 flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold text-black dark:text-white">{count}</h4>
            <span className="text-sm font-medium text-meta-3">{label}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Section 1 */}
      <div className="section mb-4 bg-gray-100 p-4 border border-gray-300">
        <h2 className="section-title">Users</h2>
        <div className="flex justify-around">
          <CounterCard count={usersCounts.all} label="All Users" color="bg-blue-500" borderColor="border-blue-500" />
          <CounterCard count={usersCounts.users} label="Users" color="bg-red-500" borderColor="border-red-500" />
          <CounterCard count={usersCounts.admins} label="Admins" color="bg-red-500" borderColor="border-red-500" />
          <CounterCard count={usersCounts.usersBan} label="Users Ban" color="bg-red-500" borderColor="border-red-500" />
          <CounterCard count={usersCounts.males} label="Males" color="bg-red-500" borderColor="border-red-500" />
          <CounterCard count={usersCounts.females} label="Females" color="bg-red-500" borderColor="border-red-500" />
        </div>
      </div>

      {/* Section 2 */}
      <div className="section mb-4 bg-gray-200 p-4 border border-gray-300">
        <h2 className="section-title">Locations</h2>
        <div className="flex justify-around mt-4">
          <CounterCard count={locationsCounts.all} label="All Locations" color="bg-green-500" borderColor="border-green-500" />
          <CounterCard count={locationsCounts.awaitingApproval} label="Locations Awaiting Approval" color="bg-yellow-500" borderColor="border-yellow-500" />
          <CounterCard count={locationsCounts.zarqa} label="Zarqa Locations" color="bg-pink-500" borderColor="border-pink-500" />
          <CounterCard count={locationsCounts.amman} label="Amman Locations" color="bg-indigo-500" borderColor="border-indigo-500" />
          <CounterCard count={locationsCounts.aqaba} label="Aqaba Locations" color="bg-purple-500" borderColor="border-purple-500" />
          <CounterCard count={locationsCounts.ajloun} label="Ajloun Locations" color="bg-teal-500" borderColor="border-teal-500" />
          {/* <CounterCard count={locationsCounts.madaba} label="Madaba Locations" color="bg-orange-500" borderColor="border-orange-500" /> */}
          <CounterCard count={locationsCounts.irbid} label="Irbid Locations" color="bg-cyan-500" borderColor="border-cyan-500" />
        </div>
      </div>

      {/* Section 3 */}
      <div className="section mb-4 bg-gray-100 p-4 border border-gray-300">
        <h2 className="section-title">Products</h2>
        <div className="flex justify-around mt-4">
          <CounterCard count={productsCounts.all} label="All Products" color="bg-blue-500" borderColor="border-blue-500" />
          <CounterCard count={productsCounts.awaitingApproval} label="Products Awaiting Approval" color="bg-red-500" borderColor="border-red-500" />
          <CounterCard count={productsCounts.dairy} label="Dairy Products" color="bg-green-500" borderColor="border-green-500" />
          <CounterCard count={productsCounts.cropSeeds} label="Crop Seeds Products" color="bg-yellow-500" borderColor="border-yellow-500" />
          <CounterCard count={productsCounts.farmEquipments} label="Farm Equipments Products" color="bg-pink-500" borderColor="border-pink-500" />
          <CounterCard count={productsCounts.fertilizers} label="Fertilizers Products" color="bg-indigo-500" borderColor="border-indigo-500" />
        </div>
      </div>

      {/* Section 4 */}
      <div className="section mb-4 bg-gray-100 p-4 border border-gray-300">
        <h2 className="section-title">Messages</h2>
        <div className="flex justify-around mt-4">
          <CounterCard count={messagesCounts.all} label="All Messages" color="bg-blue-500" borderColor="border-blue-500" />
          <CounterCard count={messagesCounts.readable} label="Readable Messages" color="bg-red-500" borderColor="border-red-500" />
          <CounterCard count={messagesCounts.notReadable} label="Not Readable Messages" color="bg-green-500" borderColor="border-green-500" />
        </div>
      </div>

        {/* Section 5 */}
        <div className="section mb-4 bg-gray-100 p-4 border border-gray-300">
        <h2 className="section-title">Reservations</h2>
        <div className="flex justify-around mt-4">
          <CounterCard count={reservationsCounts.all} label="All Reservations" color="bg-blue-500" borderColor="border-blue-500" />
          <CounterCard count={reservationsCounts.complete} label="complete Reservations" color="bg-red-500" borderColor="border-red-500" />
          <CounterCard count={reservationsCounts.Incomplete} label="Incomplete Reservations" color="bg-green-500" borderColor="border-green-500" />
        </div>
      </div>

        {/* Section 6 */}
        <div className="section mb-4 bg-gray-100 p-4 border border-gray-300">
        <h2 className="section-title">Orders</h2>
        <div className="flex justify-around mt-4">
          <CounterCard count={ordersCounts.all} label="All Orders" color="bg-blue-500" borderColor="border-blue-500" />
          <CounterCard count={ordersCounts.received} label="Received Orders" color="bg-red-500" borderColor="border-red-500" />
          <CounterCard count={ordersCounts.notReceived} label="Not Received Orders" color="bg-green-500" borderColor="border-green-500" />
        </div>
      </div>
    </div>
  );
};

export default DashboardCounter;
