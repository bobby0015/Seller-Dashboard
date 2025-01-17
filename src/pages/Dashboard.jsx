import BestSellerChart from "@/components/BestSellerChart";
import OrderTable from "@/components/OrderTable";
import SaleChart from "@/components/SaleChart";

const Dashboard = () => {
  return (
    <>
      <h1 className="text-xl font-semibold">Chauhan Vastra Bhandar</h1>
      <div className="my-5 flex">
        <div className="w-[60%]">
          <SaleChart/>
        </div>
        <div className="w-[40%] ml-2">
          <BestSellerChart/>
        </div>
      </div>
      <OrderTable/>
    </>
  );
};

export default Dashboard;
